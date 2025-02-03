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

// Définir des schémas pour chaque catégorie
const createQuizModel = (category) => {
  const quizSchema = new mongoose.Schema({
    question: String,
    answers: [
      {
        text: String,
        correct: Boolean,
      },
    ],
  });
  return mongoose.model(category, quizSchema);
};

// Créer des modèles pour chaque catégorie
const CultureGenerale = createQuizModel("quiz");
const Sciences = createQuizModel("Sciences");
const Histoire = createQuizModel("Histoire");
const Geographie = createQuizModel("Geographie");
const Sport = createQuizModel("sport");
const Divertissement = createQuizModel("Divertissement");

// Fonction pour obtenir le modèle de la catégorie appropriée
function getCategoryModel(category) {
  switch (category) {
    case "Culture Générale":
      return CultureGenerale;
    case "Sciences":
      return Sciences;
    case "Histoire":
      return Histoire;
    case "Géographie":
      return Geographie;
    case "Sport":
      return Sport;
    case "Divertissement":
      return Divertissement;
    default:
      return CultureGenerale; // Retourne le modèle par défaut si la catégorie n'est pas reconnue
  }
};

const rooms = {};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", (room, name, category) => {
    // Vérifier si le joueur est déjà dans la room
    const isPlayerAlreadyInRoom = rooms[room]?.players.some(player => 
      player.name === name || player.id === socket.id
    );

    if (isPlayerAlreadyInRoom) {
      socket.emit("error", "Vous êtes déjà connecté à cette partie");
      return;
    }

    if (rooms[room] && rooms[room].hasStarted) {
      socket.emit("error", "Cette partie a déjà commencé. Veuillez choisir un autre numéro de session.");
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
        category: category,
        playerAnswers: new Map(), // Ajout pour suivre les réponses des joueurs
        questionInProgress: false, // Nouvelle propriété pour suivre l'état de la question
        nextQuestionTimeout: null  // Nouvelle propriété pour gérer le délai entre les questions
      };
    }

    rooms[room].players.push({ id: socket.id, name, score: 0 });

    socket.emit("roomJoined");
    io.to(room).emit("playerList", rooms[room].players.map(player => player.name));
    io.to(room).emit("message", `${name} a rejoint la partie!`);
  });

  socket.on("startGame", (room) => {
    if (rooms[room] && rooms[room].host === socket.id) {
      rooms[room].hasStarted = true;
      askNewQuestion(room);
      io.to(room).emit("gameStarted");
    }
  });

  socket.on("submitAnswer", (room, answerIndex) => {
    if (!rooms[room] || !rooms[room].questionInProgress) return;
    
    const currentPlayer = rooms[room].players.find(player => player.id === socket.id);
    if (!currentPlayer) return;
  
    // Vérifier si le joueur n'a pas déjà répondu
    if (!rooms[room].playerAnswers.has(socket.id)) {
      rooms[room].playerAnswers.set(socket.id, answerIndex);
      
      const correctAnswer = rooms[room].correctAnswer;
      const isCorrect = correctAnswer === answerIndex;
      
      // Mettre à jour le score
      currentPlayer.score = (currentPlayer.score || 0) + (isCorrect ? 1 : -1);
  
      // Informer tous les joueurs de la réponse
      io.to(room).emit("playerAnswered", {
        playerName: currentPlayer.name,
        isCorrect
      });
  
      // Vérifier si tous les joueurs ont répondu
      const allPlayersAnswered = rooms[room].players.every(player => 
        rooms[room].playerAnswers.has(player.id)
      );
  
      if (allPlayersAnswered) {
        clearTimeout(rooms[room].questionTimeout);
        endQuestion(room);
      }
    }
  });

  socket.on("nextQuestion", (room) => {
    askNewQuestion(room);
  });

  socket.on("disconnect", () => {
    for (const room in rooms) {
      if (rooms[room]) {
        const disconnectedPlayer = rooms[room].players.find(player => player.id === socket.id);
        if (disconnectedPlayer) {
          rooms[room].players = rooms[room].players.filter(player => player.id !== socket.id);
  
          io.to(room).emit("playerList", rooms[room].players.map(player => player.name));
          io.to(room).emit("message", `${disconnectedPlayer.name} a quitté la partie.`);
  
          if (rooms[room].players.length === 0) {
            if (rooms[room].questionTimeout) {
              clearTimeout(rooms[room].questionTimeout);
            }
            if (rooms[room].nextQuestionTimeout) {
              clearTimeout(rooms[room].nextQuestionTimeout);
            }
            delete rooms[room];
          } else if (rooms[room].host === socket.id && rooms[room].players.length > 0) {
            rooms[room].host = rooms[room].players[0].id;
          }
        }
      }
    }
    console.log("A user disconnected");
  });
  
});

async function askNewQuestion(room) {
  if (!rooms[room]) {
    console.log(`Room ${room} n'existe plus`);
    return;
  }

  if (rooms[room].players.length === 0) {
    console.log(`Room ${room} est vide`);
    if (rooms[room].questionTimeout) {
      clearTimeout(rooms[room].questionTimeout);
    }
    if (rooms[room].nextQuestionTimeout) {
      clearTimeout(rooms[room].nextQuestionTimeout);
    }
    delete rooms[room];
    return;
  }

  // Empêcher les questions multiples
  if (rooms[room].questionInProgress) {
    console.log(`Une question est déjà en cours dans la room ${room}`);
    return;
  }

  try {
    rooms[room].questionInProgress = true;
    const category = rooms[room].category;
    const QuestionModel = getCategoryModel(category);
    const questions = await QuestionModel.find();
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];

    if (!rooms[room]) {
      console.log(`Room ${room} a été supprimée pendant la requête`);
      return;
    }

    // Nettoyer les timeouts précédents
    if (rooms[room].questionTimeout) {
      clearTimeout(rooms[room].questionTimeout);
    }
    if (rooms[room].nextQuestionTimeout) {
      clearTimeout(rooms[room].nextQuestionTimeout);
    }

    // Réinitialiser les réponses des joueurs pour la nouvelle question
    rooms[room].playerAnswers = new Map();
    rooms[room].currentQuestion = question;
    const correctAnswerIndex = question.answers.findIndex(answer => answer.correct);
    rooms[room].correctAnswer = correctAnswerIndex;

    io.to(room).emit("newQuestion", {
      question: question.question,
      answers: question.answers.map(answer => answer.text),
      timer: 10,
    });

    // Définir le timeout pour la fin de la question
    rooms[room].questionTimeout = setTimeout(() => {
      if (rooms[room]) {
        endQuestion(room);
      }
    }, 10000); // 10 secondes

  } catch (err) {
    console.error("Error fetching questions:", err);
    if (rooms[room]) {
      rooms[room].questionInProgress = false;
      io.to(room).emit("error", "Failed to fetch questions from the database");
    }
  }
}

function endQuestion(room) {
  if (!rooms[room]) return;

  // Appliquer les scores pour les joueurs qui n'ont pas répondu
  rooms[room].players.forEach(player => {
    if (!rooms[room].playerAnswers.has(player.id)) {
      // Pas de réponse = 0 point
      player.score = player.score || 0;
    }
  });

  io.to(room).emit("questionEnded", {
    correctAnswer: rooms[room].correctAnswer,
    scores: rooms[room].players.map(player => ({
      name: player.name,
      score: player.score || 0,
    }))
  });

  const winningThreshold = 5;
  const winner = rooms[room].players.find(player => (player.score || 0) >= winningThreshold);

  if (winner) {
    io.to(room).emit("gameOver", { winner: winner.name });
    delete rooms[room];
  } else {
    rooms[room].questionInProgress = false;
    // Planifier la prochaine question
    rooms[room].nextQuestionTimeout = setTimeout(() => {
      askNewQuestion(room);
    }, 5000);
  }
}

// Route de la page d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur de jeu!');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});