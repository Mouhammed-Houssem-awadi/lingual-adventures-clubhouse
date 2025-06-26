import React, { useState, useEffect } from 'react';
import GameLayout from '@/components/GameLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { sentences, getQuestionsByDifficulty, calculateDifficultyRange } from '@/utils/gameQuestions';

interface WordBlock {
  id: string;
  word: string;
  order: number;
}

interface Sentence {
  id: string;
  sentence: string;
  words: WordBlock[];
  translation: string;
  difficulty: number;
}

const SentenceBuilderGame: React.FC = () => {
  const [currentSentence, setCurrentSentence] = useState<Sentence | null>(null);
  const [userSentence, setUserSentence] = useState<WordBlock[]>([]);
  const [availableWords, setAvailableWords] = useState<WordBlock[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameComplete, setGameComplete] = useState(false);
  const [round, setRound] = useState(1);
  const [usedSentences, setUsedSentences] = useState<Set<string>>(new Set());

  const { toast } = useToast();

  const loadNewSentence = () => {
    const { min, max } = calculateDifficultyRange(score);
    const availableSentences = getQuestionsByDifficulty(sentences, min, max);
    
    // Filter out used sentences for variety
    const unusedSentences = availableSentences.filter(s => !usedSentences.has(s.id));
    const sentencesToUse = unusedSentences.length > 0 ? unusedSentences : availableSentences;
    
    // Select random sentence
    const selectedSentence = sentencesToUse[Math.floor(Math.random() * sentencesToUse.length)];
    
    // Update used sentences
    const newUsedSentences = new Set(usedSentences);
    newUsedSentences.add(selectedSentence.id);
    setUsedSentences(newUsedSentences);
    
    setCurrentSentence(selectedSentence);
    const shuffled = [...selectedSentence.words].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
    setUserSentence([]);
  };

  useEffect(() => {
    loadNewSentence();
  }, []);

  const addWordToSentence = (word: WordBlock) => {
    setUserSentence(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter(w => w.id !== word.id));
  };

  const removeWordFromSentence = (word: WordBlock) => {
    setUserSentence(prev => prev.filter(w => w.id !== word.id));
    setAvailableWords(prev => [...prev, word]);
  };

  const checkSentence = () => {
    if (!currentSentence) return;

    const correctOrder = currentSentence.words
      .sort((a, b) => a.order - b.order)
      .map(w => w.word)
      .join(' ');
    const userOrder = userSentence.map(w => w.word).join(' ');

    if (correctOrder === userOrder) {
      const basePoints = 200;
      const difficultyBonus = currentSentence.difficulty * 50;
      const roundBonus = round * 25;
      const points = basePoints + difficultyBonus + roundBonus;
      
      setScore(prev => prev + points);
      setRound(prev => prev + 1);
      
      toast({
        title: "Perfect! 🌉",
        description: `You built the bridge correctly! +${points} points!`,
      });

      setTimeout(() => {
        loadNewSentence();
      }, 2000);
    } else {
      setLives(prev => prev - 1);
      toast({
        title: "Not quite right!",
        description: "The bridge collapsed! Try a different word order.",
        variant: "destructive",
      });

      if (lives <= 1) {
        setGameComplete(true);
        toast({
          title: "Game Over",
          description: "Keep practicing to become a Bridge Master!",
          variant: "destructive",
        });
      }
    }
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setRound(1);
    setGameComplete(false);
    setUserSentence([]);
    setUsedSentences(new Set());
    loadNewSentence();
  };

  if (!currentSentence) {
    return <div>Loading...</div>;
  }

  return (
    <GameLayout
      title="Sentence Builder"
      description="Build bridges by arranging words in the right order!"
      icon="🌉"
      score={score}
      lives={lives}
      level={round}
    >
      <div className="kid-card">
        {gameComplete ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-3xl font-bold text-kid-purple mb-4">
              Bridge Master Champion!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              You built {round - 1} bridges! Final Score: {score}
            </p>
            <Button onClick={resetGame} className="game-button">
              Build More Bridges 🔄
            </Button>
          </div>
        ) : lives <= 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌉💔</div>
            <h3 className="text-3xl font-bold text-kid-purple mb-4">
              Bridges Need Repair!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Don't give up! Every great builder learns from practice.
            </p>
            <Button onClick={resetGame} className="game-button">
              Try Again 🔨
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-kid-purple mb-2">
                Build the Bridge! 🌉 - Round {round}
              </h2>
              <p className="text-gray-600 mb-2">
                Arrange the words in the correct order to build a strong bridge.
              </p>
              <p className="text-sm text-kid-orange font-semibold">
                Target: "{currentSentence.sentence}"
              </p>
              <p className="text-xs text-gray-500">
                Translation: {currentSentence.translation}
              </p>
              <div className="inline-block bg-kid-blue/20 px-3 py-1 rounded-full text-sm font-bold text-kid-purple mt-2">
                Difficulty Level: {currentSentence.difficulty}
              </div>
            </div>

            {/* User's Sentence Area */}
            <div className="bg-gradient-to-r from-kid-blue/20 to-kid-green/20 rounded-2xl p-6 border-2 border-kid-blue/30">
              <h3 className="text-lg font-bold text-kid-purple mb-4 text-center">
                Your Bridge 🔧
              </h3>
              <div className="min-h-16 flex flex-wrap gap-2 justify-center items-center bg-white/50 rounded-xl p-4">
                {userSentence.length === 0 ? (
                  <p className="text-gray-500 italic">Click words below to build your sentence...</p>
                ) : (
                  userSentence.map((word, index) => (
                    <Button
                      key={word.id}
                      onClick={() => removeWordFromSentence(word)}
                      className="bg-kid-yellow text-kid-purple font-bold px-4 py-2 rounded-lg hover:bg-kid-orange hover:text-white transition-all duration-200"
                    >
                      {word.word}
                      {index < userSentence.length - 1 && ' '}
                    </Button>
                  ))
                )}
              </div>
              
              {userSentence.length === currentSentence.words.length && (
                <div className="text-center mt-4">
                  <Button onClick={checkSentence} className="game-button">
                    Check Bridge! 🔍
                  </Button>
                </div>
              )}
            </div>

            {/* Available Words */}
            <div className="bg-gradient-to-r from-kid-pink/20 to-kid-purple/20 rounded-2xl p-6 border-2 border-kid-pink/30">
              <h3 className="text-lg font-bold text-kid-purple mb-4 text-center">
                Word Blocks 🧱
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {availableWords.map((word) => (
                  <Button
                    key={word.id}
                    onClick={() => addWordToSentence(word)}
                    className="bg-white text-kid-purple font-bold px-6 py-3 rounded-lg hover:bg-kid-blue hover:text-white hover:scale-105 transition-all duration-200 shadow-md"
                  >
                    {word.word}
                  </Button>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-kid-purple font-bold">
                  Bridge {currentSentence + 1} of {sentences.length}
                </span>
                <div className="flex space-x-1">
                  {sentences.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index < currentSentence 
                          ? 'bg-kid-green' 
                          : index === currentSentence 
                          ? 'bg-kid-yellow animate-pulse' 
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default SentenceBuilderGame;
