
import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '../ui/button';

interface MemoryGameProps {
  onBack: () => void;
}

interface Card {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onBack }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const emojis = ['🚀', '🌟', '🔥', '💎', '🎮', '🎯', '🏆', '🎨'];

  const initializeGame = () => {
    // Create a deck of cards (pairs of emojis)
    const deck = [...emojis, ...emojis]
      .map((value, index) => ({
        id: index,
        value,
        flipped: false,
        matched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(deck);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameStarted(true);
    setGameOver(false);
  };

  const handleCardClick = (id: number) => {
    if (!gameStarted || gameOver) return;
    
    // Prevent clicking the same card twice
    if (flippedCards.includes(id)) return;
    
    // Prevent clicking more than 2 cards
    if (flippedCards.length === 2) return;
    
    // Prevent clicking matched cards
    const clickedCard = cards.find(card => card.id === id);
    if (clickedCard?.matched) return;

    // Flip the card
    const newCards = cards.map(card => 
      card.id === id ? { ...card, flipped: true } : card
    );
    
    const newFlippedCards = [...flippedCards, id];
    
    setCards(newCards);
    setFlippedCards(newFlippedCards);
    
    // If we have flipped 2 cards, check for a match
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find(card => card.id === firstId);
      const secondCard = newCards.find(card => card.id === secondId);
      
      if (firstCard?.value === secondCard?.value) {
        // We have a match
        const matchedCards = newCards.map(card => 
          card.id === firstId || card.id === secondId
            ? { ...card, matched: true }
            : card
        );
        
        setCards(matchedCards);
        setMatchedPairs(matchedPairs + 1);
        setFlippedCards([]);
        
        // Check if all pairs are matched
        if (matchedPairs + 1 === emojis.length) {
          setGameOver(true);
        }
      } else {
        // No match, flip the cards back after a delay
        setTimeout(() => {
          const resetCards = newCards.map(card => 
            flippedCards.includes(card.id) || card.id === id
              ? { ...card, flipped: false }
              : card
          );
          
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <h2 className="text-xl font-display text-white/90">Memory Match</h2>
        </div>
        <Button variant="outline" size="sm" onClick={initializeGame}>
          <RotateCcw className="w-3.5 h-3.5 mr-1" />
          {gameStarted ? 'Restart' : 'Start'}
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-white/80">Moves: {moves}</div>
        <div className="text-white/80">Matches: {matchedPairs}/{emojis.length}</div>
      </div>

      {gameOver && (
        <div className="text-center py-4 text-neon-blue text-xl font-medium">
          Game completed in {moves} moves!
        </div>
      )}

      {!gameStarted ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-xl text-white/80 mb-4">Press Start to begin the game</div>
          <Button onClick={initializeGame}>Start Game</Button>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-4 gap-3 mt-4">
          {cards.map(card => (
            <div 
              key={card.id}
              className={`aspect-square bg-desktop-panel border border-white/10 rounded-lg cursor-pointer flex items-center justify-center text-3xl transition-all duration-300 transform ${
                card.flipped || card.matched
                  ? 'bg-white/10 rotate-y-180'
                  : 'hover:bg-white/5'
              } ${card.matched ? 'border-neon-green/30' : ''}`}
              onClick={() => handleCardClick(card.id)}
            >
              {(card.flipped || card.matched) ? card.value : ''}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
