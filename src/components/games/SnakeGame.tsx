
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, RotateCcw, Play, Pause } from 'lucide-react';
import { Button } from '../ui/button';

interface SnakeGameProps {
  onBack: () => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const GAME_SPEED = 100;

const SnakeGame: React.FC<SnakeGameProps> = ({ onBack }) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(true);
  const [score, setScore] = useState(0);
  const gameLoopRef = useRef<number | null>(null);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(getRandomFoodPosition());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setPaused(true);
  };

  const getRandomFoodPosition = (): Position => {
    const position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    
    // Make sure food doesn't spawn on snake
    if (snake.some(segment => segment.x === position.x && segment.y === position.y)) {
      return getRandomFoodPosition();
    }
    
    return position;
  };

  const togglePause = () => {
    setPaused(!paused);
  };

  const moveSnake = useCallback(() => {
    if (paused || gameOver) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };
      
      // Move head based on direction
      switch (direction) {
        case 'UP':
          head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case 'DOWN':
          head.y = (head.y + 1) % GRID_SIZE;
          break;
        case 'LEFT':
          head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case 'RIGHT':
          head.x = (head.x + 1) % GRID_SIZE;
          break;
      }
      
      // Check if snake hits itself
      if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setPaused(true);
        return prevSnake;
      }
      
      const newSnake = [head, ...prevSnake];
      
      // Check if snake eats food
      if (head.x === food.x && head.y === food.y) {
        setFood(getRandomFoodPosition());
        setScore(prevScore => prevScore + 1);
      } else {
        // Remove tail if no food eaten
        newSnake.pop();
      }
      
      return newSnake;
    });
  }, [direction, food, paused, gameOver]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          togglePause();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameOver]);

  useEffect(() => {
    if (!paused && !gameOver) {
      gameLoopRef.current = window.setInterval(moveSnake, GAME_SPEED);
    } else if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
    
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [paused, gameOver, moveSnake]);

  const renderGrid = () => {
    const grid = [];
    
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isSnake = snake.some(segment => segment.x === x && segment.y === y);
        const isHead = snake[0].x === x && snake[0].y === y;
        const isFood = food.x === x && food.y === y;
        
        grid.push(
          <div 
            key={`${x}-${y}`}
            className={`${isHead ? 'bg-neon-blue' : isSnake ? 'bg-neon-green' : 'bg-desktop-panel'} ${isFood ? 'bg-neon-pink' : ''} border border-white/5`}
          />
        );
      }
    }
    
    return grid;
  };

  const handleDirectionClick = (newDirection: Direction) => {
    // Don't allow 180 degree turns
    if (
      (direction === 'UP' && newDirection === 'DOWN') ||
      (direction === 'DOWN' && newDirection === 'UP') ||
      (direction === 'LEFT' && newDirection === 'RIGHT') ||
      (direction === 'RIGHT' && newDirection === 'LEFT')
    ) {
      return;
    }
    
    setDirection(newDirection);
    if (paused && !gameOver) {
      setPaused(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <h2 className="text-xl font-display text-white/90">Snake</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={togglePause}
            disabled={gameOver}
          >
            {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </Button>
          <Button variant="outline" size="sm" onClick={resetGame}>
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-white/80 font-medium">Score: {score}</div>
        {gameOver && (
          <div className="text-neon-pink font-medium">Game Over!</div>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div 
          className="grid w-[300px] h-[300px] bg-desktop-window"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
        >
          {renderGrid()}
        </div>

        {/* Mobile controls */}
        <div className="mt-6 grid grid-cols-3 gap-2 w-[180px]">
          <div></div>
          <Button 
            variant="outline" 
            className="p-3"
            onClick={() => handleDirectionClick('UP')}
          >
            ↑
          </Button>
          <div></div>
          
          <Button 
            variant="outline" 
            className="p-3"
            onClick={() => handleDirectionClick('LEFT')}
          >
            ←
          </Button>
          <Button 
            variant="outline" 
            className="p-3"
            onClick={() => togglePause()}
          >
            {paused ? '▶' : '⏸'}
          </Button>
          <Button 
            variant="outline" 
            className="p-3"
            onClick={() => handleDirectionClick('RIGHT')}
          >
            →
          </Button>
          
          <div></div>
          <Button 
            variant="outline" 
            className="p-3"
            onClick={() => handleDirectionClick('DOWN')}
          >
            ↓
          </Button>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
