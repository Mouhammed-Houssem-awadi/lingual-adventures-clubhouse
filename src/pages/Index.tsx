import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import GameCard from '@/components/GameCard';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ProgressTracker from '@/components/ProgressTracker';
import StoryAdventure from '@/components/StoryAdventure';
import TeacherQuestionForm from '@/components/TeacherQuestionForm';
import AdventureCharacter from '@/components/AdventureCharacter';
import { MessageSquare, BookOpen, Trophy, Star } from 'lucide-react';

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'fr'>('en');
  const [showTeacherForm, setShowTeacherForm] = useState(false);

  const content = {
    en: {
      title: 'Welcome to KidZone!',
      subtitle: 'Explore fun games and learning adventures!',
      gamesTitle: 'Explore Our Games',
      gamesSubtitle: 'Fun and educational games for kids of all ages.',
      achievementsTitle: 'Your Achievements',
      games: [
        {
          title: 'Word Wizard',
          description: 'Match pictures with words to cast magic spells!',
          icon: '🧙‍♂️',
          difficulty: 'easy',
          progress: 75,
          locked: false
        },
        {
          title: 'Sentence Builder',
          description: 'Build bridges by arranging words in the right order!',
          icon: '🌉',
          difficulty: 'medium',
          progress: 30,
          locked: false
        },
        {
          title: 'Grammar Castle',
          description: 'Defend the castle by choosing the correct grammar!',
          icon: '🏰',
          difficulty: 'hard',
          progress: 0,
          locked: false
        },
        {
          title: 'Pronunciation Palace',
          description: 'Practice speaking to unlock the royal treasury!',
          icon: '🎤',
          difficulty: 'medium',
          progress: 100,
          locked: false
        }
      ]
    },
    fr: {
      title: 'Bienvenue à KidZone!',
      subtitle: 'Explorez des jeux amusants et des aventures d\'apprentissage!',
      gamesTitle: 'Découvrez Nos Jeux',
      gamesSubtitle: 'Des jeux amusants et éducatifs pour les enfants de tous âges.',
      achievementsTitle: 'Vos Réalisations',
      games: [
        {
          title: 'Magicien des Mots',
          description: 'Associez des images avec des mots pour lancer des sorts magiques!',
          icon: '🧙‍♂️',
          difficulty: 'facile',
          progress: 75,
          locked: false
        },
        {
          title: 'Constructeur de Phrases',
          description: 'Construisez des ponts en arrangeant les mots dans le bon ordre!',
          icon: '🌉',
          difficulty: 'moyen',
          progress: 30,
          locked: false
        },
        {
          title: 'Château de Grammaire',
          description: 'Défendez le château en choisissant la grammaire correcte!',
          icon: '🏰',
          difficulty: 'difficile',
          progress: 0,
          locked: false
        },
        {
          title: 'Palais de Prononciation',
          description: 'Entraînez-vous à parler pour débloquer le trésor royal!',
          icon: '🎤',
          difficulty: 'moyen',
          progress: 100,
          locked: false
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-sky via-kid-blue to-kid-green">
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-4xl animate-bounce-gentle">🌟</div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {content[currentLanguage].title}
              </h1>
              <p className="text-white/80">{content[currentLanguage].subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowTeacherForm(!showTeacherForm)}
              className="bg-kid-purple text-white hover:bg-kid-pink px-6 py-3 rounded-full font-bold flex items-center space-x-2"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{currentLanguage === 'en' ? 'Ask Teacher' : 'Demander au Professeur'}</span>
            </Button>
            <LanguageSwitcher 
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {showTeacherForm && (
          <div className="animate-fade-in">
            <TeacherQuestionForm />
          </div>
        )}

        
        <div className="text-center">
          <AdventureCharacter />
        </div>

        <ProgressTracker />

        <StoryAdventure currentLanguage={currentLanguage} />

        <section>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center space-x-2">
              <Trophy className="text-kid-yellow" />
              <span>{content[currentLanguage].gamesTitle}</span>
              <Trophy className="text-kid-yellow" />
            </h2>
            <p className="text-white/90 text-xl">{content[currentLanguage].gamesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content[currentLanguage].games.map((game, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <GameCard
                  title={game.title}
                  description={game.description}
                  icon={game.icon}
                  difficulty={game.difficulty}
                  progress={game.progress}
                  locked={game.locked}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <div className="kid-card inline-block">
            <h3 className="text-2xl font-bold text-kid-purple mb-4 flex items-center justify-center space-x-2">
              <Star className="text-kid-yellow" />
              <span>{content[currentLanguage].achievementsTitle}</span>
              <Star className="text-kid-yellow" />
            </h3>
            <div className="flex justify-center space-x-4">
              <div className="reward-badge">
                🏆 {currentLanguage === 'en' ? 'First Steps' : 'Premiers Pas'}
              </div>
              <div className="reward-badge">
                ⭐ {currentLanguage === 'en' ? 'Word Master' : 'Maître des Mots'}
              </div>
              <div className="reward-badge">
                🎯 {currentLanguage === 'en' ? 'Grammar Hero' : 'Héros de Grammaire'}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
