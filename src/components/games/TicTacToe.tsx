
import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '../ui/button';

interface TicTacToeProps {
  onBack: () => void;
}

const TicTacToe: React.FC<TicTacToeProps> = ({ onBack }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const calculateWinner = (squares: Array<string | null>): string | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    if (!squares.includes(null)) {
      return 'draw';
    }

    return null;
  };

  const handleClick = (i: number) => {
    if (winner || board[i] || !gameStarted) return;

    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setGameStarted(true);
  };

  // Check for winner
  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setWinner(result);
    }
  }, [board]);

  const renderSquare = (i: number) => (
    <button
      className={`w-full h-24 bg-desktop-panel border border-white/10 flex items-center justify-center text-3xl font-bold transition-all duration-200 ${
        board[i] ? (board[i] === 'X' ? 'text-neon-blue' : 'text-neon-pink') : 'text-white/10 hover:bg-white/5'
      }`}
      onClick={() => handleClick(i)}
      disabled={!!winner || !!board[i]}
    >
      {board[i]}
    </button>
  );

  const status = winner
    ? winner === 'draw'
      ? 'Game ended in a draw!'
      : `Winner: ${winner}`
    : gameStarted
    ? `Next player: ${isXNext ? 'X' : 'O'}`
    : 'Press Start to begin';

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <h2 className="text-xl font-display text-white/90">Tic Tac Toe</h2>
        </div>
        <Button variant="outline" size="sm" onClick={resetGame}>
          <RotateCcw className="w-3.5 h-3.5 mr-1" />
          {gameStarted ? 'Restart' : 'Start'}
        </Button>
      </div>

      <div className="text-center mb-4 text-lg font-medium text-white/80">
        {status}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-2 w-80">
          {Array(9).fill(null).map((_, i) => (
            <div key={i}>{renderSquare(i)}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
