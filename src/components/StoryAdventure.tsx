
import React from 'react';
import AdventureCharacter from './AdventureCharacter';

interface StoryAdventureProps {
  currentLocation: string;
  storyProgress: number;
  onContinueStory: () => void;
  language: 'en' | 'fr';
}

const StoryAdventure: React.FC<StoryAdventureProps> = ({
  currentLocation,
  storyProgress,
  onContinueStory,
  language
}) => {
  const locations = {
    en: {
      'magic-forest': {
        name: 'Magic Forest',
        description: 'Help Luna find the hidden words among the talking trees!',
        emoji: '🌲'
      },
      'crystal-cave': {
        name: 'Crystal Cave',
        description: 'Solve word puzzles to unlock the cave of crystals!',
        emoji: '💎'
      },
      'floating-islands': {
        name: 'Floating Islands',
        description: 'Build sentences to create bridges between islands!',
        emoji: '🏝️'
      },
      'rainbow-valley': {
        name: 'Rainbow Valley',
        description: 'Practice pronunciation to make the rainbow shine!',
        emoji: '🌈'
      }
    },
    fr: {
      'magic-forest': {
        name: 'Forêt Magique',
        description: 'Aide Luna à trouver les mots cachés parmi les arbres parlants!',
        emoji: '🌲'
      },
      'crystal-cave': {
        name: 'Grotte de Cristal',
        description: 'Résous des énigmes de mots pour débloquer la grotte de cristaux!',
        emoji: '💎'
      },
      'floating-islands': {
        name: 'Îles Flottantes',
        description: 'Construis des phrases pour créer des ponts entre les îles!',
        emoji: '🏝️'
      },
      'rainbow-valley': {
        name: 'Vallée Arc-en-ciel',
        description: 'Pratique la prononciation pour faire briller l\'arc-en-ciel!',
        emoji: '🌈'
      }
    }
  };

  const currentLocationData = locations[language][currentLocation as keyof typeof locations[typeof language]];

  const texts = {
    en: {
      adventureWith: 'Adventure with',
      continueJourney: 'Continue Journey',
      storyProgress: 'Story Progress'
    },
    fr: {
      adventureWith: 'Aventure avec',
      continueJourney: 'Continuer l\'Aventure',
      storyProgress: 'Progrès de l\'Histoire'
    }
  };

  return (
    <div className="story-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-kid-purple">{texts[language].adventureWith}</h2>
        <AdventureCharacter name="Luna" mood="excited" size="medium" />
      </div>
      
      {/* Current location */}
      <div className="bg-gradient-to-r from-kid-yellow/20 to-kid-orange/20 rounded-2xl p-4 mb-4 border-2 border-kid-orange/30">
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-3xl">{currentLocationData.emoji}</span>
          <h3 className="text-xl font-bold text-kid-purple">{currentLocationData.name}</h3>
        </div>
        <p className="text-gray-700">{currentLocationData.description}</p>
      </div>
      
      {/* Story progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-kid-purple">{texts[language].storyProgress}</span>
          <span className="text-sm text-gray-600">{storyProgress}%</span>
        </div>
        <div className="w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-kid-green via-kid-blue to-kid-purple rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${storyProgress}%` }}
          >
            <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Adventure path preview */}
      <div className="flex justify-center space-x-2 mb-6">
        {Object.entries(locations[language]).map(([key, location], index) => (
          <div 
            key={key}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 transition-all duration-300
              ${key === currentLocation 
                ? 'bg-kid-orange border-kid-orange text-white animate-pulse-rainbow' 
                : storyProgress > index * 25 
                  ? 'bg-kid-green border-kid-green text-white' 
                  : 'bg-gray-300 border-gray-300 text-gray-500'
              }
            `}
          >
            {location.emoji}
          </div>
        ))}
      </div>
      
      {/* Continue button */}
      <div className="flex justify-center">
        <button 
          onClick={onContinueStory}
          className="game-button flex items-center space-x-2"
        >
          <span>{texts[language].continueJourney}</span>
          <span className="text-2xl animate-bounce-gentle">🚀</span>
        </button>
      </div>
    </div>
  );
};

export default StoryAdventure;
