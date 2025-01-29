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
        category: category, // Enregistrer la catégorie
      };
    }

    rooms[room].players.push({ id: socket.id, name });

    // Émettre un événement de confirmation de connexion
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
        setTimeout(() => {
          askNewQuestion(room);
        }, 5000);
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

          // Informer les autres joueurs
          io.to(room).emit("playerList", rooms[room].players.map(player => player.name));
          io.to(room).emit("message", `${disconnectedPlayer.name} a quitté la partie.`);

          // Si la room est vide
          if (rooms[room].players.length === 0) {
            // Nettoyer le timeout s'il existe
            if (rooms[room].questionTimeout) {
              clearTimeout(rooms[room].questionTimeout);
            }
            delete rooms[room];
          }
          // Si c'était l'hôte qui s'est déconnecté
          else if (rooms[room].host === socket.id && rooms[room].players.length > 0) {
            rooms[room].host = rooms[room].players[0].id;
          }
        }
      }
    }
    console.log("A user disconnected");
  });
});

// Fonction pour obtenir le modèle de la catégorie appropriée
const getCategoryModel = (category) => {
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
      throw new Error("Catégorie inconnue");
  }
};

// Fonction pour poser une nouvelle question
async function askNewQuestion(room) {
  // Vérification de sécurité au début de la fonction
  if (!rooms[room]) {
    console.log(`Room ${room} n'existe plus`);
    return;
  }

  // Vérification des joueurs
  if (rooms[room].players.length === 0) {
    console.log(`Room ${room} est vide`);
    if (rooms[room].questionTimeout) {
      clearTimeout(rooms[room].questionTimeout);
    }
    delete rooms[room];
    return;
  }

  try {
    const category = rooms[room].category;
    const QuestionModel = getCategoryModel(category);
    const questions = await QuestionModel.find();
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];

    // Vérification supplémentaire avant d'accéder à rooms[room]
    if (!rooms[room]) {
      console.log(`Room ${room} a été supprimée pendant la requête`);
      return;
    }

    rooms[room].currentQuestion = question;
    const correctAnswerIndex = question.answers.findIndex(answer => answer.correct);
    rooms[room].correctAnswer = correctAnswerIndex;
    rooms[room].shouldAskNewQuestion = true;

    // Envoi de la nouvelle question
    io.to(room).emit("newQuestion", {
      question: question.question,
      answers: question.answers.map(answer => answer.text),
      timer: 20,
    });

    // Gestion du timeout avec vérification supplémentaire
    rooms[room].questionTimeout = setTimeout(() => {
      // Vérification critique ici pour éviter l'erreur
      if (rooms[room]) {
        io.to(room).emit("answerResult", {
          playerName: "Personne",
          isCorrect: false,
          correctAnswer: rooms[room].correctAnswer,
          scores: rooms[room].players.map(player => ({
            name: player.name,
            score: player.score || 0,
          })),
        });

        // Planification de la prochaine question
        setTimeout(() => {
          askNewQuestion(room);
        }, 5000);
      }
    }, 20000);

  } catch (err) {
    console.error("Error fetching questions:", err);
    if (rooms[room]) {
      io.to(room).emit("error", "Failed to fetch questions from the database");
    }
  }
}

// Route de la page d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur de jeu!');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});