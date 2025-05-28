
import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '../ui/button';

interface PuzzleGameProps {
  onBack: () => void;
}

interface Tile {
  value: number;
  position: number;
}

const PuzzleGame: React.FC<PuzzleGameProps> = ({ onBack }) => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  
  // Grid dimensions (4x4)
  const size = 4;
  
  const initializeGame = () => {
    const newTiles: Tile[] = [];
    
    // Create tiles
    for (let i = 0; i < size * size - 1; i++) {
      newTiles.push({
        value: i + 1,
        position: i
      });
    }
    
    // Add empty tile
    newTiles.push({
      value: 0, // 0 represents the empty tile
      position: size * size - 1
    });
    
    // Shuffle tiles
    shuffleTiles(newTiles);
    
    setTiles(newTiles);
    setMoves(0);
    setGameStarted(true);
    setGameWon(false);
  };
  
  const shuffleTiles = (tiles: Tile[]) => {
    // Fisher-Yates shuffle
    for (let i = tiles.length - 2; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const pos = tiles[i].position;
      tiles[i].position = tiles[j].position;
      tiles[j].position = pos;
    }
    
    // Ensure the puzzle is solvable
    if (!isSolvable(tiles)) {
      // Swap two tiles to make it solvable
      const pos1 = tiles[0].position;
      tiles[0].position = tiles[1].position;
      tiles[1].position = pos1;
    }
  };
  
  const isSolvable = (tiles: Tile[]): boolean => {
    let inversions = 0;
    const values = tiles.map(tile => tile.value === 0 ? 0 : tile.value);
    
    for (let i = 0; i < values.length - 1; i++) {
      for (let j = i + 1; j < values.length; j++) {
        if (values[i] > values[j] && values[i] !== 0 && values[j] !== 0) {
          inversions++;
        }
      }
    }
    
    // For a 4x4 grid, the puzzle is solvable if:
    // 1. The blank is on an even row from the bottom and the number of inversions is odd
    // 2. The blank is on an odd row from the bottom and the number of inversions is even
    const emptyTile = tiles.find(tile => tile.value === 0)!;
    const emptyRow = Math.floor(emptyTile.position / size);
    const distanceFromBottom = size - emptyRow;
    
    return (distanceFromBottom % 2 === 0 && inversions % 2 === 1) || 
           (distanceFromBottom % 2 === 1 && inversions % 2 === 0);
  };
  
  const canMoveTile = (tile: Tile): boolean => {
    if (tile.value === 0) return false;
    
    const tileX = tile.position % size;
    const tileY = Math.floor(tile.position / size);
    
    // Find empty tile
    const emptyTile = tiles.find(t => t.value === 0)!;
    const emptyX = emptyTile.position % size;
    const emptyY = Math.floor(emptyTile.position / size);
    
    // Tile can move if it's adjacent to the empty tile
    return (
      (Math.abs(tileX - emptyX) === 1 && tileY === emptyY) ||
      (Math.abs(tileY - emptyY) === 1 && tileX === emptyX)
    );
  };
  
  const moveTile = (tile: Tile) => {
    if (!gameStarted || gameWon || !canMoveTile(tile)) return;
    
    // Find empty tile
    const emptyTile = tiles.find(t => t.value === 0)!;
    
    // Swap positions
    const newTiles = tiles.map(t => {
      if (t.value === tile.value) {
        return { ...t, position: emptyTile.position };
      } else if (t.value === 0) {
        return { ...t, position: tile.position };
      }
      return t;
    });
    
    setTiles(newTiles);
    setMoves(moves + 1);
    
    // Check if puzzle is solved
    checkWinCondition(newTiles);
  };
  
  const checkWinCondition = (currentTiles: Tile[]) => {
    // Puzzle is solved if every tile is in the correct position (value-1 for 1-based indexing)
    const isSolved = currentTiles.every(tile => 
      tile.value === 0 || tile.position === tile.value - 1
    );
    
    if (isSolved) {
      setGameWon(true);
    }
  };
  
  const getTileStyle = (tile: Tile) => {
    const x = tile.position % size;
    const y = Math.floor(tile.position / size);
    
    return {
      left: `${x * 25}%`,
      top: `${y * 25}%`,
    };
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <h2 className="text-xl font-display text-white/90">15 Puzzle</h2>
        </div>
        <Button variant="outline" size="sm" onClick={initializeGame}>
          <RotateCcw className="w-3.5 h-3.5 mr-1" />
          {gameStarted ? 'Restart' : 'Start'}
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-white/80">Moves: {moves}</div>
        {gameWon && (
          <div className="text-neon-green font-medium">Puzzle Solved!</div>
        )}
      </div>

      {!gameStarted ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-xl text-white/80 mb-4">Press Start to begin the puzzle</div>
          <Button onClick={initializeGame}>Start Game</Button>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-[280px] h-[280px] bg-desktop-window border border-white/10 rounded-md">
            {tiles.map(tile => (
              <div
                key={tile.value}
                className={`absolute w-[24%] h-[24%] transition-all duration-200 ${
                  tile.value === 0 
                    ? 'bg-transparent' 
                    : 'bg-desktop-panel border border-white/10 hover:border-white/30 cursor-pointer flex items-center justify-center'
                } ${
                  canMoveTile(tile) ? 'hover:bg-white/10' : ''
                } ${
                  gameWon ? 'border-neon-green' : ''
                }`}
                style={getTileStyle(tile)}
                onClick={() => moveTile(tile)}
              >
                {tile.value !== 0 && (
                  <span className={`text-xl font-medium ${
                    tile.position === tile.value - 1 
                      ? 'text-neon-blue' 
                      : 'text-white/80'
                  }`}>
                    {tile.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PuzzleGame;
