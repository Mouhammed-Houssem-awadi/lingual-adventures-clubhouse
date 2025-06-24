
import React from 'react';

interface AdventureCharacterProps {
  name: string;
  mood?: 'happy' | 'excited' | 'thinking' | 'celebrating';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const AdventureCharacter: React.FC<AdventureCharacterProps> = ({ 
  name, 
  mood = 'happy', 
  size = 'medium',
  className = '' 
}) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  };

  const moodAnimations = {
    happy: 'animate-bounce-gentle',
    excited: 'animate-wiggle',
    thinking: 'animate-float',
    celebrating: 'animate-star-twinkle'
  };

  return (
    <div className={`${sizeClasses[size]} ${moodAnimations[mood]} ${className} relative`}>
      {/* Character body */}
      <div className="w-full h-full bg-gradient-to-br from-kid-blue to-kid-purple rounded-full border-4 border-white shadow-lg relative overflow-hidden">
        {/* Face */}
        <div className="absolute inset-2 bg-gradient-to-br from-kid-pink/20 to-kid-orange/20 rounded-full">
          {/* Eyes */}
          <div className="absolute top-3 left-3 w-2 h-2 bg-white rounded-full shadow-inner">
            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-gray-800 rounded-full"></div>
          </div>
          <div className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full shadow-inner">
            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-gray-800 rounded-full"></div>
          </div>
          
          {/* Mouth */}
          {mood === 'happy' && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-2 border-2 border-gray-800 border-t-0 rounded-b-full"></div>
          )}
          {mood === 'excited' && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-kid-yellow rounded-full border-2 border-gray-800"></div>
          )}
          {mood === 'thinking' && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rounded-full"></div>
          )}
          {mood === 'celebrating' && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-5 h-3 border-2 border-gray-800 border-t-0 rounded-b-full bg-kid-yellow"></div>
          )}
        </div>
        
        {/* Hat */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-gradient-to-r from-kid-orange to-kid-red rounded-t-full border-2 border-white shadow-lg">
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-kid-yellow rounded-full"></div>
        </div>
      </div>
      
      {/* Sparkles for celebrating mood */}
      {mood === 'celebrating' && (
        <>
          <div className="absolute -top-2 -left-2 w-2 h-2 bg-kid-yellow rounded-full animate-star-twinkle"></div>
          <div className="absolute -top-1 -right-1 w-1 h-1 bg-kid-pink rounded-full animate-star-twinkle delay-100"></div>
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-kid-orange rounded-full animate-star-twinkle delay-200"></div>
        </>
      )}
      
      {/* Thought bubble for thinking mood */}
      {mood === 'thinking' && (
        <div className="absolute -top-6 -right-4 bg-white rounded-full p-2 border-2 border-gray-300 shadow-lg">
          <div className="text-xs">?</div>
          <div className="absolute bottom-0 left-4 w-2 h-2 bg-white border-r-2 border-b-2 border-gray-300 transform rotate-45 translate-y-1"></div>
        </div>
      )}
      
      {/* Name label */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-full border-2 border-kid-blue text-xs font-bold text-kid-purple whitespace-nowrap">
        {name}
      </div>
    </div>
  );
};

export default AdventureCharacter;
