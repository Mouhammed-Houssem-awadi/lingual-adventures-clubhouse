
import React, { useState, useEffect } from 'react';
import GameLayout from '@/components/GameLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mic, Volume2, Play } from 'lucide-react';

interface PronunciationWord {
  id: string;
  word: string;
  phonetic: string;
  audio?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tips: string;
}

const PronunciationPalaceGame: React.FC = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameComplete, setGameComplete] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [treasureChests, setTreasureChests] = useState(0);

  const { toast } = useToast();

  const words: PronunciationWord[] = [
    {
      id: '1',
      word: 'Hello',
      phonetic: '/həˈloʊ/',
      difficulty: 'easy',
      tips: 'Say "heh-LOH" with emphasis on the second syllable.'
    },
    {
      id: '2',
      word: 'Beautiful',
      phonetic: '/ˈbjuːtɪfəl/',
      difficulty: 'medium',
      tips: 'Break it down: "BYOO-ti-ful" - three syllables with stress on the first.'
    },
    {
      id: '3',
      word: 'Pronunciation',
      phonetic: '/prəˌnʌnsiˈeɪʃən/',
      difficulty: 'hard',
      tips: 'Say "pruh-nun-see-AY-shun" - five syllables, stress on the fourth.'
    },
    {
      id: '4',
      word: 'Water',
      phonetic: '/ˈwɔːtər/',
      difficulty: 'easy',
      tips: 'Say "WAW-ter" - make sure to pronounce the "t" sound clearly.'
    },
    {
      id: '5',
      word: 'Chocolate',
      phonetic: '/ˈtʃɒklət/',
      difficulty: 'medium',
      tips: 'Say "CHOK-lit" - two syllables, not three! The "o" is silent.'
    }
  ];

  const simulateRecording = () => {
    setIsRecording(true);
    
    setTimeout(() => {
      setIsRecording(false);
      setHasRecorded(true);
      
      // Simulate pronunciation evaluation (random for demo)
      const isCorrect = Math.random() > 0.3; // 70% success rate for demo
      
      if (isCorrect) {
        setScore(prev => prev + 200);
        setTreasureChests(prev => prev + 1);
        toast({
          title: "Perfect Pronunciation! 🎉",
          description: "You found a treasure chest! Excellent work!",
        });

        setTimeout(() => {
          if (currentWord + 1 >= words.length) {
            setGameComplete(true);
            toast({
              title: "🏆 Pronunciation Palace Master!",
              description: `You've unlocked all treasures! Found ${treasureChests + 1} chests!`,
            });
          } else {
            setCurrentWord(prev => prev + 1);
            setHasRecorded(false);
          }
        }, 2000);
      } else {
        setLives(prev => prev - 1);
        toast({
          title: "Try Again! 🎯",
          description: "Almost there! Check the pronunciation tips and try once more.",
          variant: "destructive",
        });

        if (lives <= 1) {
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
    // In a real app, this would play actual audio
    toast({
      title: "🔊 Playing Example",
      description: `Listen carefully to "${words[currentWord].word}"`,
    });
  };

  const skipWord = () => {
    if (currentWord + 1 >= words.length) {
      setGameComplete(true);
    } else {
      setCurrentWord(prev => prev + 1);
      setHasRecorded(false);
    }
  };

  const resetGame = () => {
    setCurrentWord(0);
    setScore(0);
    setLives(3);
    setTreasureChests(0);
    setGameComplete(false);
    setHasRecorded(false);
    setIsRecording(false);
  };

  const currentWordData = words[currentWord];

  return (
    <GameLayout
      title="Pronunciation Palace"
      description="Practice speaking to unlock the royal treasury!"
      icon="🎤"
      score={score}
      lives={lives}
      level={currentWord + 1}
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
                Speak to Unlock the Treasury!
              </h2>
              
              <div className="bg-white/80 rounded-xl p-6 border-2 border-kid-purple/30 mb-6">
                <h3 className="text-3xl font-bold text-kid-purple mb-2">
                  {currentWordData.word}
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  Pronunciation: <span className="font-mono text-kid-blue">{currentWordData.phonetic}</span>
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
                  <p className="text-gray-700">{currentWordData.tips}</p>
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

            {/* Difficulty Badge */}
            <div className="text-center">
              <div className={`
                inline-block px-4 py-2 rounded-full font-bold text-white
                ${currentWordData.difficulty === 'easy' 
                  ? 'bg-kid-green' 
                  : currentWordData.difficulty === 'medium' 
                  ? 'bg-kid-orange' 
                  : 'bg-kid-red'
                }
              `}>
                {currentWordData.difficulty.toUpperCase()} LEVEL
              </div>
            </div>

            {/* Progress */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-kid-purple font-bold">
                  Word {currentWord + 1} of {words.length}
                </span>
                <div className="flex space-x-1">
                  {words.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index < currentWord 
                          ? 'bg-kid-green' 
                          : index === currentWord 
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

export default PronunciationPalaceGame;
