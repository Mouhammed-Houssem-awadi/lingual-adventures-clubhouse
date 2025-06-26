import React, { useState, useEffect } from 'react';
import GameLayout from '@/components/GameLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mic, Volume2 } from 'lucide-react';
import { pronunciationWords, getQuestionsByDifficulty, calculateDifficultyRange } from '@/utils/gameQuestions';

interface PronunciationWord {
  id: string;
  word: string;
  phonetic: string;
  difficulty: number;
  tips: string;
  category: string;
}

const PronunciationPalaceGame: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<PronunciationWord | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameComplete, setGameComplete] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [treasureChests, setTreasureChests] = useState(0);
  const [round, setRound] = useState(1);
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set());

  const { toast } = useToast();

  const loadNewWord = () => {
    const { min, max } = calculateDifficultyRange(score);
    const availableWords = getQuestionsByDifficulty(pronunciationWords, min, max);
    
    // Filter out used words for variety
    const unusedWords = availableWords.filter(w => !usedWords.has(w.id));
    const wordsToUse = unusedWords.length > 0 ? unusedWords : availableWords;
    
    // Select random word
    const selectedWord = wordsToUse[Math.floor(Math.random() * wordsToUse.length)];
    
    // Update used words
    const newUsedWords = new Set(usedWords);
    newUsedWords.add(selectedWord.id);
    setUsedWords(newUsedWords);
    
    setCurrentWord(selectedWord);
    setHasRecorded(false);
  };

  useEffect(() => {
    loadNewWord();
  }, []);

  const simulateRecording = () => {
    setIsRecording(true);
    
    setTimeout(() => {
      setIsRecording(false);
      setHasRecorded(true);
      
      // Simulate pronunciation evaluation with difficulty-based success rate
      const difficultyFactor = currentWord ? (7 - currentWord.difficulty) / 6 : 0.7;
      const isCorrect = Math.random() < difficultyFactor;
      
      if (isCorrect) {
        const basePoints = 200;
        const difficultyBonus = currentWord ? currentWord.difficulty * 75 : 75;
        const roundBonus = round * 30;
        const points = basePoints + difficultyBonus + roundBonus;
        
        setScore(prev => prev + points);
        setTreasureChests(prev => prev + 1);
        setRound(prev => prev + 1);
        
        toast({
          title: "Perfect Pronunciation! 🎉",
          description: `You found a treasure chest! +${points} points!`,
        });

        setTimeout(() => {
          loadNewWord();
        }, 2000);
      } else {
        setLives(prev => prev - 1);
        toast({
          title: "Try Again! 🎯",
          description: "Almost there! Check the pronunciation tips and try once more.",
          variant: "destructive",
        });

        if (lives <= 1) {
          setGameComplete(true);
          toast({
            title: "Palace Challenge Failed!",
            description: "Keep practicing! Every expert started as a beginner.",
            variant: "destructive",
          });
        } else {
          setHasRecorded(false);
        }
      }
    }, 3000);
  };

  const playExampleAudio = () => {
    if (!currentWord) return;
    toast({
      title: "🔊 Playing Example",
      description: `Listen carefully to "${currentWord.word}"`,
    });
  };

  const skipWord = () => {
    setRound(prev => prev + 1);
    loadNewWord();
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setTreasureChests(0);
    setGameComplete(false);
    setHasRecorded(false);
    setIsRecording(false);
    setRound(1);
    setUsedWords(new Set());
    loadNewWord();
  };

  if (!currentWord) {
    return <div>Loading...</div>;
  }

  const getDifficultyColor = () => {
    if (currentWord.difficulty <= 2) return 'bg-kid-green';
    if (currentWord.difficulty <= 4) return 'bg-kid-orange';
    return 'bg-kid-red';
  };

  return (
    <GameLayout
      title="Pronunciation Palace"
      description="Practice speaking to unlock the royal treasury!"
      icon="🎤"
      score={score}
      lives={lives}
      level={round}
    >
      <div className="kid-card">
        {gameComplete ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👑💎</div>
            <h3 className="text-3xl font-bold text-kid-purple mb-4">
              Royal Pronunciation Master!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              You've unlocked the royal treasury! Found {treasureChests} treasure chests!
              <br />Final Score: {score}
            </p>
            <Button onClick={resetGame} className="game-button">
              Enter Another Palace 🏰
            </Button>
          </div>
        ) : lives <= 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏰🔒</div>
            <h3 className="text-3xl font-bold text-kid-purple mb-4">
              Palace Doors Closed!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Practice makes perfect! Try again to unlock more treasures.
            </p>
            <Button onClick={resetGame} className="game-button">
              Try Again 🗝️
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Treasure Progress */}
            <div className="bg-gradient-to-r from-kid-yellow/20 to-kid-orange/20 rounded-2xl p-4 border-2 border-kid-yellow/50">
              <div className="flex items-center justify-center space-x-4">
                <span className="text-2xl">💎</span>
                <span className="text-lg font-bold text-kid-purple">
                  Treasure Chests Found: {treasureChests}
                </span>
                <span className="text-2xl">🏆</span>
              </div>
            </div>

            {/* Current Word */}
            <div className="text-center">
              <div className="text-6xl mb-4">🏰🎤</div>
              <h2 className="text-2xl font-bold text-kid-purple mb-4">
                Speak to Unlock the Treasury! - Round {round}
              </h2>
              
              <div className="bg-white/80 rounded-xl p-6 border-2 border-kid-purple/30 mb-6">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="bg-kid-blue/20 px-3 py-1 rounded-full text-sm font-bold text-kid-purple">
                    Category: {currentWord.category.charAt(0).toUpperCase() + currentWord.category.slice(1)}
                  </div>
                  <div className={`${getDifficultyColor()} px-3 py-1 rounded-full text-sm font-bold text-white`}>
                    Level: {currentWord.difficulty}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-kid-purple mb-2">
                  {currentWord.word}
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  Pronunciation: <span className="font-mono text-kid-blue">{currentWord.phonetic}</span>
                </p>
                
                <div className="flex justify-center space-x-4 mb-4">
                  <Button
                    onClick={playExampleAudio}
                    className="bg-kid-blue text-white hover:bg-kid-purple px-6 py-3 rounded-xl"
                  >
                    <Volume2 className="w-5 h-5 mr-2" />
                    Listen
                  </Button>
                </div>

                <div className="bg-kid-yellow/20 rounded-lg p-4">
                  <h4 className="font-bold text-kid-purple mb-2">💡 Pronunciation Tip:</h4>
                  <p className="text-gray-700">{currentWord.tips}</p>
                </div>
              </div>
            </div>

            {/* Recording Section */}
            <div className="bg-gradient-to-r from-kid-green/20 to-kid-blue/20 rounded-2xl p-6 border-2 border-kid-green/30">
              <h3 className="text-xl font-bold text-kid-purple mb-4 text-center">
                Your Turn to Speak! 🎙️
              </h3>
              
              <div className="flex flex-col items-center space-y-4">
                {!hasRecorded ? (
                  <Button
                    onClick={simulateRecording}
                    disabled={isRecording}
                    className={`
                      w-24 h-24 rounded-full text-white font-bold text-lg transition-all duration-200
                      ${isRecording 
                        ? 'bg-kid-red animate-pulse cursor-not-allowed' 
                        : 'bg-kid-green hover:bg-kid-blue hover:scale-110'
                      }
                    `}
                  >
                    <Mic className="w-8 h-8" />
                  </Button>
                ) : (
                  <div className="flex space-x-4">
                    <Button
                      onClick={simulateRecording}
                      className="bg-kid-orange text-white hover:bg-kid-red px-6 py-3 rounded-xl"
                    >
                      <Mic className="w-5 h-5 mr-2" />
                      Try Again
                    </Button>
                    <Button
                      onClick={skipWord}
                      className="bg-gray-500 text-white hover:bg-gray-600 px-6 py-3 rounded-xl"
                    >
                      Skip Word ⏭️
                    </Button>
                  </div>
                )}
                
                <p className="text-center text-gray-600">
                  {isRecording 
                    ? "🎙️ Recording... Speak clearly!" 
                    : hasRecorded 
                    ? "Great job! Try again or move to the next word."
                    : "Click the microphone and say the word clearly!"
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default PronunciationPalaceGame;
