const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

// Configuration constants
const CONFIG = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  WINNING_THRESHOLD: 5,
  QUESTION_TIMEOUT: 10000,
  NEXT_QUESTION_DELAY: 5000,
  CORS_OPTIONS: {
    origin: ["https://quiz-multijoueur.fr"],
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }
};

// Initialize Express and Socket.IO
const app = express();
const server = http.createServer(app);
app.use(cors());
const io = new Server(server, { cors: CONFIG.CORS_OPTIONS });

// MongoDB connection
mongoose.connect(CONFIG.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Quiz schema and models
const quizSchema = new mongoose.Schema({
  question: String,
  answers: [{
    text: String,
    correct: Boolean,
  }],
});

// Create category models using a map for better maintainability
const CATEGORIES = {
  "Culture Générale": "quiz",
  "Sciences": "Sciences",
  "Histoire": "Histoire",
  "Géographie": "Geographie",
  "Sport": "sport",
  "Divertissement": "Divertissement"
};

const categoryModels = Object.fromEntries(
  Object.entries(CATEGORIES).map(([key, value]) => [
    key,
    mongoose.model(value, quizSchema)
  ])
);

// Game state management
class GameRoom {
  constructor(category, hostId) {
    this.players = [];
    this.currentQuestion = null;
    this.correctAnswer = null;
    this.questionTimeout = null;
    this.hasStarted = false;
    this.host = hostId;
    this.category = category;
    this.playerAnswers = new Map();
    this.questionInProgress = false;
    this.nextQuestionTimeout = null;
  }

  clearTimeouts() {
    if (this.questionTimeout) {
      clearTimeout(this.questionTimeout);
      this.questionTimeout = null;
    }
    if (this.nextQuestionTimeout) {
      clearTimeout(this.nextQuestionTimeout);
      this.nextQuestionTimeout = null;
    }
  }

  addPlayer(id, name) {
    this.players.push({ id, name, score: 0 });
  }

  removePlayer(id) {
    this.players = this.players.filter(player => player.id !== id);
    return this.players.length === 0;
  }

  getPlayerNames() {
    return this.players.map(player => player.name);
  }

  resetForNewQuestion() {
    this.playerAnswers.clear();
    this.questionInProgress = true;
  }
}

const rooms = new Map();

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", (room, name, category) => {
    const currentRoom = rooms.get(room);
    
    // Validate join conditions
    if (currentRoom?.players.some(player => player.name === name || player.id === socket.id)) {
      socket.emit("error", "Vous êtes déjà connecté à cette partie");
      return;
    }

    if (currentRoom?.hasStarted) {
      socket.emit("error", "Cette partie a déjà commencé. Veuillez choisir un autre numéro de session.");
      return;
    }

    socket.join(room);

    if (!currentRoom) {
      rooms.set(room, new GameRoom(category, socket.id));
    }

    const gameRoom = rooms.get(room);
    gameRoom.addPlayer(socket.id, name);

    socket.emit("roomJoined");
    io.to(room).emit("playerList", gameRoom.getPlayerNames());
    io.to(room).emit("message", `${name} a rejoint la partie!`);
  });

  const handleDisconnect = () => {
    for (const [roomName, gameRoom] of rooms.entries()) {
      const player = gameRoom.players.find(p => p.id === socket.id);
      if (player) {
        const isEmpty = gameRoom.removePlayer(socket.id);
        
        if (isEmpty) {
          gameRoom.clearTimeouts();
          rooms.delete(roomName);
        } else {
          if (gameRoom.host === socket.id) {
            gameRoom.host = gameRoom.players[0].id;
          }
          io.to(roomName).emit("playerList", gameRoom.getPlayerNames());
          io.to(roomName).emit("message", `${player.name} a quitté la partie.`);
        }
      }
    }
  };

  socket.on("disconnect", handleDisconnect);

  socket.on("startGame", (room) => {
    const gameRoom = rooms.get(room);
    if (gameRoom?.host === socket.id) {
      gameRoom.hasStarted = true;
      askNewQuestion(room);
      io.to(room).emit("gameStarted");
    }
  });

  socket.on("submitAnswer", (room, answerIndex) => {
    const gameRoom = rooms.get(room);
    if (!gameRoom?.questionInProgress) return;

    const currentPlayer = gameRoom.players.find(player => player.id === socket.id);
    if (!currentPlayer || gameRoom.playerAnswers.has(socket.id)) return;

    gameRoom.playerAnswers.set(socket.id, answerIndex);
    const isCorrect = gameRoom.correctAnswer === answerIndex;
    currentPlayer.score += isCorrect ? 1 : -1;

    io.to(room).emit("playerAnswered", {
      playerName: currentPlayer.name,
      isCorrect
    });

    if (gameRoom.players.every(player => gameRoom.playerAnswers.has(player.id))) {
      clearTimeout(gameRoom.questionTimeout);
      endQuestion(room);
    }
  });

  socket.on("nextQuestion", (room) => {
    const gameRoom = rooms.get(room);
    if (gameRoom && !gameRoom.questionInProgress) {
      askNewQuestion(room);
    }
  });
});

async function askNewQuestion(room) {
  const gameRoom = rooms.get(room);
  if (!gameRoom || gameRoom.players.length === 0 || gameRoom.questionInProgress) {
    if (!gameRoom?.players.length) rooms.delete(room);
    return;
  }

  try {
    gameRoom.clearTimeouts();
    gameRoom.resetForNewQuestion();

    const QuestionModel = categoryModels[gameRoom.category];
    const questions = await QuestionModel.find();
    const question = questions[Math.floor(Math.random() * questions.length)];

    if (!rooms.has(room)) return;

    gameRoom.currentQuestion = question;
    gameRoom.correctAnswer = question.answers.findIndex(answer => answer.correct);

    io.to(room).emit("newQuestion", {
      question: question.question,
      answers: question.answers.map(answer => answer.text),
      timer: CONFIG.QUESTION_TIMEOUT / 1000,
    });

    gameRoom.questionTimeout = setTimeout(() => {
      if (rooms.has(room) && gameRoom.questionInProgress) {
        endQuestion(room);
      }
    }, CONFIG.QUESTION_TIMEOUT);

  } catch (err) {
    console.error("Error fetching questions:", err);
    if (rooms.has(room)) {
      gameRoom.questionInProgress = false;
      io.to(room).emit("error", "Failed to fetch questions from the database");
    }
  }
}

function endQuestion(room) {
  const gameRoom = rooms.get(room);
  if (!gameRoom?.questionInProgress) return;

  gameRoom.clearTimeouts();
  gameRoom.players.forEach(player => {
    if (!gameRoom.playerAnswers.has(player.id)) {
      player.score = player.score || 0;
    }
  });

  const scores = gameRoom.players.map(player => ({
    name: player.name,
    score: player.score || 0,
  }));

  io.to(room).emit("questionEnded", {
    correctAnswer: gameRoom.correctAnswer,
    scores
  });

  const winner = gameRoom.players.find(player => (player.score || 0) >= CONFIG.WINNING_THRESHOLD);

  if (winner) {
    io.to(room).emit("gameOver", { winner: winner.name });
    rooms.delete(room);
  } else {
    gameRoom.questionInProgress = false;
    gameRoom.nextQuestionTimeout = setTimeout(() => {
      askNewQuestion(room);
    }, CONFIG.NEXT_QUESTION_DELAY);
  }
}

// Express routes
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur de jeu!');
});

server.listen(CONFIG.PORT, () => {
  console.log(`Server is running on port ${CONFIG.PORT}`);
});