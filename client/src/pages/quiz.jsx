import React, { useState, useEffect } from 'react';
import './quiz.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import io from 'socket.io-client';

const socket = io(`${import.meta.env.VITE_API_URL}`);

function Quiz() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [info, setInfo] = useState(false);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [scores, setScores] = useState([]);
  const [winner, setWinner] = useState('');
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && room) {
      setInfo(true);
    }
  };

  useEffect(() => {
    if (info) {
      socket.emit('joinRoom', room, name);
    }
  }, [info]);

  useEffect(() => {
    socket.on('playerList', (players) => {
      setPlayers(players);
    });

    socket.on('message', (message) => {
      toast(`${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });

    socket.on('gameStarted', () => {
      setHasGameStarted(true);
    });

    socket.on('newQuestion', (data) => {
      setQuestion(data.question);
      setOptions(data.answers);
      setAnswered(false);
      setSeconds(data.timer);
      setSelectedAnswerIndex(null);
    });

    socket.on('answerResult', (data) => {
      if (data.isCorrect) {
        toast(`Correct! ${data.playerName} got it right.`, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      setScores(data.scores);
    });

    socket.on('gameOver', (data) => {
      setWinner(data.winner);
    });

    socket.on('error', (message) => {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });

    return () => {
      socket.off('playerList');
      socket.off('message');
      socket.off('gameStarted');
      socket.off('newQuestion');
      socket.off('answerResult');
      socket.off('gameOver');
      socket.off('error');
    };
  }, []);

  const handleAnswer = (answerIndex) => {
    if (!answered) {
      setSelectedAnswerIndex(answerIndex);
      socket.emit('submitAnswer', room, answerIndex);
      setAnswered(true);
    }
  };

  const handleStartGame = () => {
    socket.emit('startGame', room);
  };

  useEffect(() => {
    if (players.length > 0 && players[0] === name) {
      setIsHost(true);
    }
  }, [players]);

  if (winner) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-indigo-600">Le gagnant est {winner}</h1>
        </div>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-indigo-600">Quiz multijoueur💡</h1>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              required
              placeholder="Entrer votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <input
              required
              placeholder="Entrer un numéro de session"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              REJOINDRE
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!hasGameStarted) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-indigo-600">Salle d'attente</h1>
          <p className="text-center text-gray-700">Numéro de session: {room}</p>
          <ul className="mt-4">
            {players.map((player, index) => (
              <li key={index} className="py-2 px-4 bg-gray-200 rounded-lg mt-2">{player}</li>
            ))}
          </ul>
          {isHost && (
            <button
              onClick={handleStartGame}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 mt-4"
            >
              Commencer le jeu
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600">Quiz multijoueur💡</h1>
        <p className="text-sm text-gray-500 text-center mt-2">Numéro de session: {room}</p>
        <ToastContainer />
        {question ? (
          <div className="mt-6 p-4 bg-white shadow rounded-lg">
            <p className="text-lg font-medium text-gray-700 text-center mb-4">
              Temps restant: <span className="font-bold text-red-500">{seconds}s</span>
            </p>
            <div className="mb-4">
              <p className="text-lg text-gray-800 font-semibold text-center">{question}</p>
            </div>
            <ul className="space-y-2">
              {options.map((answer, index) => (
                <li key={index}>
                  <button
                    className={`w-full px-4 py-2 text-left bg-gray-200 rounded-lg hover:bg-indigo-100 focus:ring-2 focus:ring-indigo-500 ${
                      selectedAnswerIndex === index ? "bg-indigo-200" : ""
                    }`}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                  >
                    {answer}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2">
              {scores.map((player, index) => (
                <p
                  key={index}
                  className="text-sm font-medium text-gray-700 flex justify-between"
                >
                  <span>{player.name}</span> <span>{player.score} / 5</span>
                </p>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-4">Chargement des questions...</p>
        )}
      </div>
    </div>
  );
}

export default Quiz;