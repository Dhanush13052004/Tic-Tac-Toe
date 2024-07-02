import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
  const [turn, setTurn] = useState(1);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [message, setMessage] = useState("PLAYER 1 TURN FOLLOWS");
  const [winningIndices, setWinningIndices] = useState([]);

  const handleClick = (index) => {
    if (board[index] !== null || winningIndices.length > 0) {
      // Square already taken or game over
      return;
    }

    const newBoard = [...board];
    newBoard[index] = turn === 1 ? 'check' : 'times';
    setBoard(newBoard);

    if (checkWinner(newBoard, turn === 1 ? 'check' : 'times')) {
      setMessage(`PLAYER ${turn} WINS!`);
      setWinningIndices(getWinningIndices(newBoard, turn === 1 ? 'check' : 'times'));
    } else {
      setTurn(turn === 1 ? 2 : 1);
      setMessage(turn === 1 ? "PLAYER 2 TURN FOLLOWS" : "PLAYER 1 TURN FOLLOWS");
    }
  };

  const checkWinner = (board, symbol) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    return winningCombinations.some(combination => 
      combination.every(index => board[index] === symbol)
    );
  };

  const getWinningIndices = (board, symbol) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
      if (combination.every(index => board[index] === symbol)) {
        return combination;
      }
    }
    return [];
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(1);
    setMessage("PLAYER 1 TURN FOLLOWS");
    setWinningIndices([]);
  };

  const renderSquare = (index) => {
    const value = board[index];
    const isWinningSquare = winningIndices.includes(index);
    return (
      <button 
        className="square" 
        onClick={() => handleClick(index)}
        style={{ color: isWinningSquare ? 'green' : 'black' }}
      >
        {value && <FontAwesomeIcon icon={value === 'check' ? faCheck : faTimes} />}
      </button>
    );
  };

  return (
    <div className="container-fluid text-center">
      <h1 style={{ color: 'white' }}>TIC-TAC-TOE</h1>
      <h4 id="screen" style={{ color: 'white' }}>{message}</h4>
      <div className="board">
        {Array(9).fill(null).map((_, index) => renderSquare(index))}
      </div>
      <button className="reset btn btn-lg btn-danger btn-block" onClick={resetGame}>
        RESET
      </button>
    </div>
  );
};

export default App;
