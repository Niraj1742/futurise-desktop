
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import TicTacToe from '../games/TicTacToe';
import MemoryGame from '../games/MemoryGame';
import SnakeGame from '../games/SnakeGame';
import PuzzleGame from '../games/PuzzleGame';
import { Gamepad2, Trophy, Clock, Star, RotateCcw } from 'lucide-react';

interface GameStats {
  played: number;
  won: number;
  bestTime: string | null;
}

interface Game {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  stats: GameStats;
}

const GameApp: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');
  const [favorites, setFavorites] = useState<string[]>(['tictactoe', 'snake']);

  // Sample game data
  const games: Game[] = [
    { 
      id: 'tictactoe', 
      name: 'Tic Tac Toe', 
      description: 'Classic game of X and O. Be the first to get three in a row!',
      icon: <div className="text-2xl">❌⭕</div>,
      stats: { played: 12, won: 8, bestTime: '0:45' }
    },
    { 
      id: 'memory', 
      name: 'Memory Match', 
      description: 'Find all matching pairs of cards in the fewest moves possible.',
      icon: <div className="text-2xl">🃏🎴</div>,
      stats: { played: 8, won: 6, bestTime: '1:23' } 
    },
    { 
      id: 'snake', 
      name: 'Snake', 
      description: 'Control the snake to eat food and grow without hitting the walls or yourself.',
      icon: <div className="text-2xl">🐍</div>,
      stats: { played: 15, won: 0, bestTime: '3:47' }
    },
    { 
      id: 'puzzle', 
      name: 'Puzzle', 
      description: 'Slide the tiles to arrange them in the correct order.',
      icon: <div className="text-2xl">🧩</div>,
      stats: { played: 5, won: 3, bestTime: '2:15' }
    }
  ];

  useEffect(() => {
    // Load saved favorites from local storage
    const savedFavorites = localStorage.getItem('gameFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (gameId: string) => {
    let newFavorites;
    if (favorites.includes(gameId)) {
      newFavorites = favorites.filter(id => id !== gameId);
    } else {
      newFavorites = [...favorites, gameId];
    }
    setFavorites(newFavorites);
    localStorage.setItem('gameFavorites', JSON.stringify(newFavorites));
  };

  const renderGame = () => {
    switch (selectedGame) {
      case 'tictactoe':
        return <TicTacToe onBack={() => setSelectedGame(null)} />;
      case 'memory':
        return <MemoryGame onBack={() => setSelectedGame(null)} />;
      case 'snake':
        return <SnakeGame onBack={() => setSelectedGame(null)} />;
      case 'puzzle':
        return <PuzzleGame onBack={() => setSelectedGame(null)} />;
      default:
        return null;
    }
  };

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || (activeTab === 'favorites' && favorites.includes(game.id));
    return matchesSearch && matchesTab;
  });

  return (
    <div className="h-full bg-desktop-window p-6 text-white">
      {!selectedGame ? (
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Gamepad2 className="w-6 h-6 mr-3 text-neon-blue" />
              <h2 className="text-2xl font-display text-white/90">Game Center</h2>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white/80 w-48 focus:outline-none focus:ring-1 focus:ring-neon-blue/50"
              />
            </div>
          </div>
          
          <div className="flex gap-2 mb-6">
            <Button 
              variant={activeTab === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('all')}
            >
              All Games
            </Button>
            <Button 
              variant={activeTab === 'favorites' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('favorites')}
            >
              Favorites
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6 overflow-auto pb-4">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="desktop-panel p-6 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer border border-white/5 relative group"
              >
                <div className="absolute top-4 right-4 z-10">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(game.id);
                    }} 
                    className="text-white/40 hover:text-yellow-400 transition-colors"
                  >
                    <Star className={`w-5 h-5 ${favorites.includes(game.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  </button>
                </div>
                
                <div className="flex">
                  <div className="w-16 h-16 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-xl flex items-center justify-center mr-4">
                    {game.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white/80 mb-1">{game.name}</h3>
                    <p className="text-sm text-white/50 mb-4 line-clamp-2">{game.description}</p>
                    
                    <div className="flex space-x-4 text-xs text-white/50">
                      <div className="flex items-center">
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        {game.stats.played} plays
                      </div>
                      <div className="flex items-center">
                        <Trophy className="w-3.5 h-3.5 mr-1" />
                        {game.stats.won} wins
                      </div>
                      {game.stats.bestTime && (
                        <div className="flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1" />
                          {game.stats.bestTime}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                  onClick={() => setSelectedGame(game.id)}
                >
                  <Button>Play Now</Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredGames.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl text-white/70 mb-2">No games found</h3>
              <p className="text-white/50 text-center">
                {activeTab === 'favorites' ? 
                  "You haven't added any favorites yet" : 
                  "Try a different search term"}
              </p>
            </div>
          )}
        </div>
      ) : (
        renderGame()
      )}
    </div>
  );
};

export default GameApp;
