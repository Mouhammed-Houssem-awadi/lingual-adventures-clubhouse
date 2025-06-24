
import React, { useState } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ProgressTracker from '@/components/ProgressTracker';
import GameCard from '@/components/GameCard';
import StoryAdventure from '@/components/StoryAdventure';
import AdventureCharacter from '@/components/AdventureCharacter';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'fr'>('en');
  const [userProgress, setUserProgress] = useState({
    level: 3,
    experience: 150,
    maxExperience: 200,
    stars: 47,
    badges: ['First Steps', 'Word Master', 'Grammar Guru', 'Pronunciation Pro'],
    streakDays: 7
  });
  const [storyProgress, setStoryProgress] = useState(35);
  const [currentLocation, setCurrentLocation] = useState('magic-forest');
  
  const { toast } = useToast();

  const handleLanguageChange = (language: 'en' | 'fr') => {
    setCurrentLanguage(language);
    toast({
      title: language === 'en' ? "Switched to English!" : "Basculé en Français!",
      description: language === 'en' ? "Let's learn English together! 🇺🇸" : "Apprenons le français ensemble! 🇫🇷",
    });
  };

  const handleGameClick = (gameTitle: string) => {
    toast({
      title: currentLanguage === 'en' ? "Game Starting!" : "Jeu en cours!",
      description: `${gameTitle} ${currentLanguage === 'en' ? 'is loading...' : 'se charge...'}`,
    });
  };

  const handleContinueStory = () => {
    const newProgress = Math.min(storyProgress + 15, 100);
    setStoryProgress(newProgress);
    toast({
      title: currentLanguage === 'en' ? "Adventure continues!" : "L'aventure continue!",
      description: currentLanguage === 'en' ? "Luna is excited to explore more!" : "Luna est excitée d'explorer davantage!",
    });
  };

  const games = {
    en: [
      {
        title: "Word Wizard",
        description: "Match pictures with words to cast magic spells!",
        icon: "🧙‍♂️",
        difficulty: "easy" as const,
        progress: 85,
        locked: false
      },
      {
        title: "Sentence Builder",
        description: "Build bridges by arranging words in the right order!",
        icon: "🌉",
        difficulty: "medium" as const,
        progress: 45,
        locked: false
      },
      {
        title: "Grammar Castle",
        description: "Defend the castle by choosing the correct grammar!",
        icon: "🏰",
        difficulty: "hard" as const,
        progress: 0,
        locked: true
      },
      {
        title: "Pronunciation Palace",
        description: "Practice speaking to unlock the royal treasury!",
        icon: "🎤",
        difficulty: "medium" as const,
        progress: 60,
        locked: false
      }
    ],
    fr: [
      {
        title: "Magicien des Mots",
        description: "Associe les images aux mots pour lancer des sorts magiques!",
        icon: "🧙‍♂️",
        difficulty: "easy" as const,
        progress: 85,
        locked: false
      },
      {
        title: "Constructeur de Phrases",
        description: "Construis des ponts en arrangeant les mots dans le bon ordre!",
        icon: "🌉",
        difficulty: "medium" as const,
        progress: 45,
        locked: false
      },
      {
        title: "Château de Grammaire",
        description: "Défends le château en choisissant la bonne grammaire!",
        icon: "🏰",
        difficulty: "hard" as const,
        progress: 0,
        locked: true
      },
      {
        title: "Palais de Prononciation",
        description: "Pratique la parole pour débloquer le trésor royal!",
        icon: "🎤",
        difficulty: "medium" as const,
        progress: 60,
        locked: false
      }
    ]
  };

  const texts = {
    en: {
      welcome: "Welcome back, Explorer!",
      learningJourney: "Your Learning Journey",
      games: "Learning Games",
      readyToPlay: "Ready to play and learn?"
    },
    fr: {
      welcome: "Bon retour, Explorateur!",
      learningJourney: "Ton Voyage d'Apprentissage",
      games: "Jeux d'Apprentissage",
      readyToPlay: "Prêt à jouer et apprendre?"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-sky via-kid-blue to-kid-green p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 p-4">
        <div className="flex items-center space-x-4">
          <AdventureCharacter name="You" mood="happy" size="small" />
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              {texts[currentLanguage].welcome}
            </h1>
            <p className="text-white/80 font-medium">
              {texts[currentLanguage].readyToPlay}
            </p>
          </div>
        </div>
        <LanguageSwitcher 
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Progress and Story */}
          <div className="space-y-6">
            <ProgressTracker {...userProgress} />
            <StoryAdventure 
              currentLocation={currentLocation}
              storyProgress={storyProgress}
              onContinueStory={handleContinueStory}
              language={currentLanguage}
            />
          </div>

          {/* Right column - Games */}
          <div className="lg:col-span-2">
            <div className="kid-card mb-6">
              <h2 className="text-3xl font-bold text-kid-purple mb-2">
                {texts[currentLanguage].games}
              </h2>
              <p className="text-gray-600 mb-6">
                {texts[currentLanguage].learningJourney}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {games[currentLanguage].map((game, index) => (
                  <GameCard
                    key={index}
                    {...game}
                    onClick={() => handleGameClick(game.title)}
                  />
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="kid-card text-center">
                <div className="text-2xl mb-2">📚</div>
                <div className="text-sm text-gray-600">Words Learned</div>
                <div className="text-xl font-bold text-kid-purple">127</div>
              </div>
              <div className="kid-card text-center">
                <div className="text-2xl mb-2">🎯</div>
                <div className="text-sm text-gray-600">Games Completed</div>
                <div className="text-xl font-bold text-kid-purple">23</div>
              </div>
              <div className="kid-card text-center">
                <div className="text-2xl mb-2">⏱️</div>
                <div className="text-sm text-gray-600">Time Spent</div>
                <div className="text-xl font-bold text-kid-purple">12h</div>
              </div>
              <div className="kid-card text-center">
                <div className="text-2xl mb-2">🏆</div>
                <div className="text-sm text-gray-600">Best Score</div>
                <div className="text-xl font-bold text-kid-purple">98%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating encouragement messages */}
      <div className="fixed bottom-4 right-4 space-y-2">
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 border-2 border-kid-orange/50 shadow-lg animate-bounce-gentle">
          <span className="text-kid-orange font-bold">Keep learning! 🌟</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
