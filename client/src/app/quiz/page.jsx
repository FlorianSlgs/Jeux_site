'use client';

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
import io from 'socket.io-client';

let socket;

const initSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Socket connected successfully!');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }
  return socket;
};

export default function Quiz() {
  const [category, setCategory] = useState(null);
  const searchParams = useSearchParams();

  // Move the searchParams.get into useEffect to avoid hydration issues
  useEffect(() => {
    if (searchParams) {
      setCategory(searchParams.get('category'));
    }
  }, [searchParams]);

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [info, setInfo] = useState(false);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [scores, setScores] = useState([]);
  const [winner, setWinner] = useState('');
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [previousRoom, setPreviousRoom] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [questionEnded, setQuestionEnded] = useState(false);
  const [playerAnswers, setPlayerAnswers] = useState(new Map());

  useEffect(() => {
    socket = initSocket();

    socket.on('playerList', (players) => {
      console.log('Received player list:', players);
      setPlayers(players);
    });

    socket.on('roomJoined', () => {
      console.log('Room joined successfully');
      setIsConnecting(false);
      setInfo(true);
    });

    socket.on('message', (message) => {
      toast(message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });

    socket.on('gameStarted', () => {
      console.log('Game started');
      setHasGameStarted(true);
    });

    socket.on('newQuestion', (data) => {
      console.log('New question received:', data);
      setQuestion(data.question);
      setOptions(data.answers);
      setSeconds(data.timer);
      setSelectedAnswerIndex(null);
      setCorrectAnswerIndex(null);
      setHasAnswered(false);
      setQuestionEnded(false);
      setPlayerAnswers(new Map());
    });

    socket.on('playerAnswered', (data) => {
      setPlayerAnswers(prev => {
        const newMap = new Map(prev);
        newMap.set(data.playerName, data.isCorrect);
        return newMap;
      });
    });

    socket.on('questionEnded', (data) => {
      console.log('Question ended:', data);
      setCorrectAnswerIndex(data.correctAnswer);
      setQuestionEnded(true);
      setScores(data.scores);
      
      setTimeout(() => {
        setQuestionEnded(false);
        setHasAnswered(false);
        setSelectedAnswerIndex(null);
      }, 5000);
    });

    socket.on('gameOver', (data) => {
      console.log('Game over, winner:', data.winner);
      setWinner(data.winner);
    });

    socket.on('error', (message) => {
      setIsConnecting(false);
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
      setRoom('');
    });

    socket.on('leaveRoom', () => {
      setInfo(false);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      setPreviousRoom('');
    });

    // Cleanup function
    return () => {
      if (socket) {
        socket.off('playerList');
        socket.off('roomJoined');
        socket.off('message');
        socket.off('gameStarted');
        socket.off('newQuestion');
        socket.off('playerAnswered');
        socket.off('questionEnded');
        socket.off('gameOver');
        socket.off('error');
        socket.off('leaveRoom');
        socket.off('disconnect');
      }
    };
  }, []);

  useEffect(() => {
    if (seconds > 0 && !questionEnded) {
      const timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [seconds, questionEnded]);

  useEffect(() => {
    if (players.length > 0 && players[0] === name) {
      setIsHost(true);
    }
  }, [players, name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && room && !isConnecting) {
      console.log('Attempting to join room:', room);
      setIsConnecting(true);
      if (previousRoom) {
        socket.emit('leaveRoom', previousRoom);
      }
      socket.emit('joinRoom', room, name, category);
      setPreviousRoom(room);
    }
  };

  const handleAnswer = (answerIndex) => {
    if (!hasAnswered && !questionEnded) {
      setSelectedAnswerIndex(answerIndex);
      setHasAnswered(true);
      socket.emit('submitAnswer', room, answerIndex);
    }
  };

  const handleStartGame = () => {
    socket.emit('startGame', room, category);
  };

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
          <h1 className="text-3xl font-bold text-center text-indigo-600">Quiz en ligne</h1>
          <p className="pt-3 text-justify text-gray-700"><strong>Fonctionnement :</strong><br/>
          Pour créer une partie il suffit de rentrer un numéro de session et choisir un pseudo, les autres joueurs devront ensuite choisir le même numéro.</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              required
              placeholder="Entrer votre pseudo"
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
              disabled={isConnecting}
            >
              {isConnecting ? 'CONNEXION...' : 'REJOINDRE'}
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    );
  }

  if (!hasGameStarted) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center"> 
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-indigo-600">Salle d&apos;attente</h1>
          <p className="text-center text-gray-700">Numéro de session: {room}</p>
          <p className="text-justify text-gray-700"><strong>Règles du jeu :</strong><br/>
          Chaque joueur dispose de 10 secondes pour répondre à la question.
          Une bonne réponse rapporte 1 point, une mauvaise réponse fait perdre 1 point, et l&apos;absence de réponse ne rapporte aucun point.<br/>
          <strong>Le premier joueur à atteindre 5 points remporte la partie.</strong></p>
          <ToastContainer />
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
              Commencer
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">  
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600">Quiz en ligne</h1>
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
                    className={`w-full px-4 py-2 text-left rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
                      questionEnded ? (
                        correctAnswerIndex === index 
                          ? "bg-green-200" 
                          : selectedAnswerIndex === index 
                            ? (correctAnswerIndex === selectedAnswerIndex ? "bg-green-200" : "bg-red-200")
                            : "bg-gray-200"
                      ) : hasAnswered && selectedAnswerIndex === index
                        ? "bg-yellow-200"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    onClick={() => handleAnswer(index)}
                    disabled={hasAnswered || questionEnded}
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
                  className={`
                    text-sm font-medium flex justify-between p-2 rounded
                    ${questionEnded && playerAnswers.has(player.name)
                      ? playerAnswers.get(player.name)
                        ? 'text-green-600 bg-green-100'
                        : 'text-red-600 bg-red-100'
                      : 'text-gray-700'
                    }
                  `}
                >
                  <span>{player.name}</span>
                  <span>{player.score} / 5</span>
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