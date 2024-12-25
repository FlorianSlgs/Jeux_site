const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();

const server = http.createServer(app);
app.use(cors());
const io = new Server(server, { cors: { origin: "*" } });

const PORT = process.env.PORT || 5000;

const questions = [
  {
    question: "Quelle est la capitale de la France ?",
    answers: [
      { text: "Paris", correct: true },
      { text: "Marseille", correct: false },
      { text: "Lyon", correct: false },
      { text: "Bordeaux", correct: false },
    ],
  },
  {
    question: "Quel pays est le plus grand du monde par sa superficie ?",
    answers: [
      { text: "Canada", correct: true },
      { text: "Canada", correct: false },
      { text: "États-Unis", correct: false },
      { text: "Chine", correct: false },
    ],
  },
  {
    question: "Dans quel océan se trouve Madagascar ?",
    answers: [
      { text: "Océan Arctique", correct: false },
      { text: "Océan Atlantique", correct: false },
      { text: "Océan Pacifique", correct: false },
      { text: "Océan Indien", correct: true },
    ],
  },
  {
    question: "Quelle montagne est la plus haute du monde ?",
    answers: [
      { text: "Mont Everest", correct: true },
      { text: "Mont Kilimandjaro", correct: false },
      { text: "Mont Blanc", correct: false },
      { text: "Mont Fuji", correct: false },
    ],
  },
  {
    question: "Dans quel pays se trouve la ville de Tokyo ?",
    answers: [
      { text: "Corée du Sud", correct: false },
      { text: "Chine", correct: false },
      { text: "Japon", correct: true },
      { text: "Thaïlande", correct: false },
    ],
  },
  {
    question: "Qui a été le premier président des États-Unis ?",
    answers: [
      { text: "Abraham Lincoln", correct: false },
      { text: "George Washington", correct: true },
      { text: "Thomas Jefferson", correct: false },
      { text: "John Adams", correct: false },
    ],
  },

  {
    question: "En quelle année la Révolution française a-t-elle commencé ?",
    answers: [
      { text: "1804", correct: false },
      { text: "1776", correct: false },
      { text: "1799", correct: false },
      { text: "1789", correct: true },
    ],
  },
  {
    question: "Quel empereur français a été exilé sur l'île de Sainte-Hélène ?",
    answers: [
      { text: "Napoléon Ier", correct: true },
      { text: "Louis XIV", correct: false },
      { text: "Charles de Gaulle", correct: false },
      { text: "Philippe Auguste", correct: false },
    ],
  },
  {
    question: "Quelle civilisation a construit les pyramides de Gizeh ?",
    answers: [
      { text: "Les Mayas", correct: false },
      { text: "Les Égyptiens", correct: true },
      { text: "Les Romains", correct: false },
      { text: "Les Grecs", correct: false },
    ],
  },

  {
    question: "Qui était le roi de France durant la Révolution française ?",
    answers: [
      { text: "Louis XIII", correct: false },
      { text: "Louis XVI", correct: true },
      { text: "Louis XV", correct: false },
      { text: "Louis XVI", correct: false },
    ],
  },
  {
    question:
      "Quel est le plus grand organe du corps humain ?",
    answers: [
      { text: "Le foie", correct: false },
      { text: "La peau", correct: true },
      { text: "Le cœur", correct: false },
      { text: "Le cerveau", correct: false },
    ],
  },
  {
    question: "Combien de planètes composent notre système solaire ?",
    answers: [
      { text: "7", correct: false },
      { text: "8", correct: true },
      { text: "9", correct: false },
      { text: "10", correct: false },
    ],
  },

  {
    question: "Quel est l’animal terrestre le plus rapide ?",
    answers: [
      { text: "Lion", correct: false },
      { text: "Guépard", correct: true },
      { text: "Cheval", correct: false },
      { text: "Léopard", correct: false },
    ],
  },
  {
    question: "Quel gaz les plantes absorbent-elles pour réaliser la photosynthèse ?",
    answers: [
      { text: "Oxygène", correct: false },
      { text: "Dioxyde de carbone", correct: true },
      { text: "Azote", correct: false },
      { text: "Hydrogène", correct: false },
    ],
  },

  {
    question: "Lequel de ces éléments est un métal ?",
    answers: [
      { text: "L’azote", correct: false },
      { text: "L’argent", correct: true },
      { text: "Le chlorure", correct: false },
      { text: "Le carbone", correct: false },
    ],
  },
  {
    question: "Combien de pattes a une araignée ?",
    answers: [
      { text: "6", correct: false },
      { text: "10", correct: false },
      { text: "8", correct: true },
      { text: "12", correct: false },
    ],
  },
  {
    question: "Quel est le plus grand désert du monde ?",
    answers: [
      { text: "Le désert du Sahara", correct: false },
      { text: "Le désert de Gobi", correct: false },
      { text: "Le désert de Kalahari", correct: false },
      { text: "L'Antarctique", correct: true },
    ],
  },
  {
    question: "Quel est le plus grand mammifère terrestre ?",
    answers: [
      { text: "Le rhinocéros blanc", correct: false },
      { text: "L'éléphant d'Afrique", correct: true },
      { text: "La girafe", correct: false },
      { text: "L'hippopotame", correct: false },
    ],
  },
  {
    question: "En quelle année le premier iPhone a-t-il été lancé ?",
    answers: [
      { text: "2005", correct: false },
      { text: "2007", correct: true },
      { text: "2009", correct: false },
      { text: "2010", correct: false },
    ],
  },
];


const rooms = {};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", (room, name) => {
    socket.join(room);
    io.to(room).emit("message", `${name} has joined the game!`);
    if (!rooms[room]) {
      rooms[room] = {
        players: [],
        currentQuestion: null,
        correctAnswer: null,
        questionTimeout: null,
        shouldAskNewQuestion: true,
      };
    }
    // to make score zero
  //   if(rooms[room]){
  //   rooms[room].players.forEach((player) => {
  //     player.score = 0;
  //   });
  // }
  // rooms[room].players.push({ id: socket.id, name,score: 0  });
    rooms[room].players.push({ id: socket.id, name });

    if (!rooms[room].currentQuestion) {
      askNewQuestion(room);
    }
  });

  socket.on("submitAnswer", (room, answerIndex) => {
    const currentPlayer = rooms[room].players.find(
      (player) => player.id === socket.id
    );

    if (currentPlayer) {
      const correctAnswer = rooms[room].correctAnswer;
      const isCorrect = correctAnswer !== null && correctAnswer === answerIndex;
      currentPlayer.score = isCorrect
        ? (currentPlayer.score || 0) + 1
        : (currentPlayer.score || 0) - 1;

      clearTimeout(rooms[room].questionTimeout);

      io.to(room).emit("answerResult", {
        playerName: currentPlayer.name,
        isCorrect,
        correctAnswer,
        scores: rooms[room].players.map((player) => ({
          name: player.name,
          score: player.score || 0,
        })),
      });

      const winningThreshold = 5;
      const winner = rooms[room].players.find(
        (player) => (player.score || 0) >= winningThreshold
      );

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
      rooms[room].players = rooms[room].players.filter(
        (player) => player.id !== socket.id
      );
    }

    console.log("A user disconnected");
  });
});

function askNewQuestion(room) {
  if (rooms[room].players.length === 0) {
    clearTimeout(rooms[room].questionTimeout);
    delete rooms[room];
    return;
  }

  const randomIndex = Math.floor(Math.random() * questions.length);
  const question = questions[randomIndex];
  rooms[room].currentQuestion = question;
  const correctAnswerIndex = question.answers.findIndex(
    (answer) => answer.correct
  );

  rooms[room].correctAnswer = correctAnswerIndex;
  rooms[room].shouldAskNewQuestion = true;
  io.to(room).emit("newQuestion", {
    question: question.question,
    answers: question.answers.map((answer) => answer.text),
    timer: 10,
  });

  rooms[room].questionTimeout = setTimeout(() => {
    io.to(room).emit("answerResult", {
      playerName: "No one",
      isCorrect: false,
      correctAnswer: rooms[room].correctAnswer,
      scores: rooms[room].players.map((player) => ({
        name: player.name,
        score: player.score || 0,
      })),
    });

    askNewQuestion(room);
  }, 10000);
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

