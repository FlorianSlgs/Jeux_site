const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const server = http.createServer(app);
app.use(cors());
const io = new Server(server, { cors: { origin: "*" } });

const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb+srv://flodkniman:gtD6beE1kwgEuhfA@quiz.4f4nq.mongodb.net/?retryWrites=true&w=majority&appName=Quiz";

// Connexion à MongoDB Atlas
mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

const quizSchema = new mongoose.Schema({
  question: String,
  answers: [
    {
      text: String,
      correct: Boolean,
    },
  ],
});

const Question = mongoose.model("Quiz", quizSchema);

const rooms = {};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", (room, name) => {
    if (rooms[room] && rooms[room].hasStarted) {
      socket.emit("error", "The game has already started");
      return;
    }

    socket.join(room);

    if (!rooms[room]) {
      rooms[room] = {
        players: [],
        currentQuestion: null,
        correctAnswer: null,
        questionTimeout: null,
        shouldAskNewQuestion: true,
        hasStarted: false,
        host: socket.id,
      };
    }

    rooms[room].players.push({ id: socket.id, name });

    io.to(room).emit("playerList", rooms[room].players.map(player => player.name));
    io.to(room).emit("message", `${name} has joined the game!`);
  });

  socket.on("startGame", (room) => {
    if (rooms[room] && rooms[room].host === socket.id) {
      rooms[room].hasStarted = true;
      askNewQuestion(room);
      io.to(room).emit("gameStarted");
    }
  });

  socket.on("submitAnswer", (room, answerIndex) => {
    const currentPlayer = rooms[room].players.find(player => player.id === socket.id);
    if (currentPlayer) {
      const correctAnswer = rooms[room].correctAnswer;
      const isCorrect = correctAnswer !== null && correctAnswer === answerIndex;
      currentPlayer.score = isCorrect ? (currentPlayer.score || 0) + 1 : (currentPlayer.score || 0) - 1;

      clearTimeout(rooms[room].questionTimeout);

      io.to(room).emit("answerResult", {
        playerName: currentPlayer.name,
        isCorrect,
        correctAnswer,
        scores: rooms[room].players.map(player => ({
          name: player.name,
          score: player.score || 0,
        })),
      });

      const winningThreshold = 5;
      const winner = rooms[room].players.find(player => (player.score || 0) >= winningThreshold);

      if (winner) {
        io.to(room).emit("gameOver", { winner: winner.name });
        delete rooms[room];
      } else {
        askNewQuestion(room);
      }
    }
  });

  socket.on("disconnect", () => {
    for (const room in rooms) {
      rooms[room].players = rooms[room].players.filter(player => player.id !== socket.id);
      io.to(room).emit("playerList", rooms[room].players.map(player => player.name));
    }
    console.log("A user disconnected");
  });
});

async function askNewQuestion(room) {
  if (rooms[room].players.length === 0) {
    clearTimeout(rooms[room].questionTimeout);
    delete rooms[room];
    return;
  }

  try {
    const questions = await Question.find();
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];

    rooms[room].currentQuestion = question;
    const correctAnswerIndex = question.answers.findIndex(answer => answer.correct);

    rooms[room].correctAnswer = correctAnswerIndex;
    rooms[room].shouldAskNewQuestion = true;

    io.to(room).emit("newQuestion", {
      question: question.question,
      answers: question.answers.map(answer => answer.text),
      timer: 20,
    });

    rooms[room].questionTimeout = setTimeout(() => {
      io.to(room).emit("answerResult", {
        playerName: "No one",
        isCorrect: false,
        correctAnswer: rooms[room].correctAnswer,
        scores: rooms[room].players.map(player => ({
          name: player.name,
          score: player.score || 0,
        })),
      });

      askNewQuestion(room);
    }, 20000);
  } catch (err) {
    console.error("Error fetching questions:", err);
    io.to(room).emit("error", "Failed to fetch questions from the database");
  }
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});