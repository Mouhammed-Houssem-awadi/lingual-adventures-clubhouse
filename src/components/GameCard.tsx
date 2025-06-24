
import React from 'react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface GameCardProps {
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  progress: number;
  locked?: boolean;
  onClick?: () => void;
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  icon,
  difficulty,
  progress,
  locked = false,
  onClick
}) => {
  const navigate = useNavigate();
  
  const difficultyColors = {
    easy: 'from-kid-green to-kid-blue',
    medium: 'from-kid-orange to-kid-yellow',
    hard: 'from-kid-red to-kid-pink'
  };

  const difficultyLabels = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard'
  };

  // Map game titles to routes
  const getGameRoute = (gameTitle: string) => {
    const routes: { [key: string]: string } = {
      'Word Wizard': '/games/word-wizard',
      'Magicien des Mots': '/games/word-wizard',
      'Sentence Builder': '/games/sentence-builder',
      'Constructeur de Phrases': '/games/sentence-builder',
      'Grammar Castle': '/games/grammar-castle',
      'Château de Grammaire': '/games/grammar-castle',
      'Pronunciation Palace': '/games/pronunciation-palace',
      'Palais de Prononciation': '/games/pronunciation-palace'
    };
    return routes[gameTitle];
  };

  const handleClick = () => {
    if (locked) return;
    
    const route = getGameRoute(title);
    if (route) {
      navigate(route);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <Card 
      className={`
        relative overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
        ${locked 
          ? 'opacity-50 cursor-not-allowed bg-gray-300' 
          : 'kid-card hover:animate-pulse-rainbow'
        }
      `}
      onClick={handleClick}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-kid-blue/20 to-kid-purple/20"></div>
      </div>
      
      {/* Lock overlay */}
      {locked && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-500/20 backdrop-blur-sm z-10">
          <div className="text-6xl opacity-70">🔒</div>
        </div>
      )}
      
      <div className="relative z-20 p-6">
        {/* Icon and title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-4xl animate-bounce-gentle">{icon}</div>
            <div>
              <h3 className="text-xl font-bold text-kid-purple">{title}</h3>
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${difficultyColors[difficulty]}`}>
                {difficultyLabels[difficulty]}
              </div>
            </div>
          </div>
          
          {/* Progress circle */}
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-300"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${progress * 0.628} 62.8`}
                className="text-kid-green"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-kid-purple">
              {progress}%
            </div>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        {/* Play button */}
        <div className="flex justify-center">
          <button className={`
            px-6 py-2 rounded-full font-bold text-white transition-all duration-200 transform
            ${locked 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'game-button hover:scale-110 active:scale-95'
            }
          `}>
            {locked ? 'Locked' : 'Play Now!'}
          </button>
        </div>
        
        {/* Stars for completed */}
        {progress === 100 && !locked && (
          <div className="absolute top-2 right-2 flex space-x-1">
            {[1, 2, 3].map((star) => (
              <span key={star} className="text-kid-yellow text-lg animate-star-twinkle">⭐</span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default GameCard;
