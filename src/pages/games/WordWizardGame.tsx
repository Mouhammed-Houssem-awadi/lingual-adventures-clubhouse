import React, { useState, useEffect } from 'react';
import GameLayout from '@/components/GameLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { wordPairs, getQuestionsByDifficulty, calculateDifficultyRange } from '@/utils/gameQuestions';

interface WordMatch {
  id: string;
  word: string;
  image: string;
  matched: boolean;
  difficulty: number;
}

const WordWizardGame: React.FC = () => {
  const [currentWords, setCurrentWords] = useState<WordMatch[]>([]);
  const [shuffledWords, setShuffledWords] = useState<WordMatch[]>([]);
  const [shuffledImages, setShuffledImages] = useState<WordMatch[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [matches, setMatches] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameComplete, setGameComplete] = useState(false);
  const [round, setRound] = useState(1);

  const { toast } = useToast();

  const loadNewRound = () => {
    const { min, max } = calculateDifficultyRange(score);
    const availableWords = getQuestionsByDifficulty(wordPairs, min, max);
    
    // Select 6 random words from available difficulty range
    const selectedWords = availableWords
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(6, availableWords.length))
      .map(word => ({ ...word, matched: false }));

    setCurrentWords(selectedWords);
    setShuffledWords([...selectedWords].sort(() => Math.random() - 0.5));
    setShuffledImages([...selectedWords].sort(() => Math.random() - 0.5));
    setMatches([]);
    setSelectedWord(null);
    setSelectedImage(null);
  };

  useEffect(() => {
    loadNewRound();
  }, [score]);

  const handleWordClick = (word: WordMatch) => {
    if (matches.includes(word.id)) return;
    setSelectedWord(word.id);
    
    if (selectedImage) {
      checkMatch(word.id, selectedImage);
    }
  };

  const handleImageClick = (image: WordMatch) => {
    if (matches.includes(image.id)) return;
    setSelectedImage(image.id);
    
    if (selectedWord) {
      checkMatch(selectedWord, image.id);
    }
  };

  const checkMatch = (wordId: string, imageId: string) => {
    if (wordId === imageId) {
      // Correct match!
      const matchedWord = currentWords.find(w => w.id === wordId);
      const basePoints = 50;
      const difficultyMultiplier = matchedWord ? matchedWord.difficulty * 25 : 25;
      const points = basePoints + difficultyMultiplier;
      
      setMatches(prev => [...prev, wordId]);
      setScore(prev => prev + points);
      setSelectedWord(null);
      setSelectedImage(null);
      
      toast({
        title: "Excellent! ⭐",
        description: `Perfect match! +${points} points!`,
      });

      if (matches.length + 1 === currentWords.length) {
        setRound(prev => prev + 1);
        toast({
          title: "🎉 Round Complete!",
          description: "Get ready for the next challenge!",
        });
        setTimeout(() => {
          loadNewRound();
        }, 2000);
      }
    } else {
      // Wrong match
      setLives(prev => prev - 1);
      setSelectedWord(null);
      setSelectedImage(null);
      
      toast({
        title: "Oops! Try again",
        description: "That's not quite right. Keep trying!",
        variant: "destructive",
      });

      if (lives <= 1) {
        setGameComplete(true);
        toast({
          title: "Game Over",
          description: `Final Score: ${score} points! Practice makes perfect!`,
          variant: "destructive",
        });
      }
    }
  };

  const resetGame = () => {
    setMatches([]);
    setScore(0);
    setLives(3);
    setRound(1);
    setGameComplete(false);
    setSelectedWord(null);
    setSelectedImage(null);
    loadNewRound();
  };

  const getDifficultyLabel = () => {
    const { min, max } = calculateDifficultyRange(score);
    if (max <= 2) return "Beginner Wizard";
    if (max <= 3) return "Apprentice Wizard";
    if (max <= 4) return "Expert Wizard";
    return "Master Wizard";
  };

  return (
    <GameLayout
      title="Word Wizard"
      description="Match pictures with words to cast magic spells!"
      icon="🧙‍♂️"
      score={score}
      lives={lives}
      level={round}
    >
      <div className="kid-card">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-kid-purple mb-2">
            {getDifficultyLabel()} - Round {round}
          </h2>
          <p className="text-gray-600">
            Match the words with the pictures to cast spells! Difficulty increases as you score more points!
          </p>
        </div>

        {gameComplete ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold text-kid-purple mb-4">
              {score >= 1000 ? "Master Wizard!" : score >= 500 ? "Expert Wizard!" : "Great Job!"}
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              You reached Round {round} and scored {score} points!
            </p>
            <Button onClick={resetGame} className="game-button">
              Cast New Spells 🔄
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Words Column */}
            <div>
              <h3 className="text-xl font-bold text-kid-purple mb-4 text-center">
                Words 📝
              </h3>
              <div className="space-y-3">
                {shuffledWords.map((word) => (
                  <Button
                    key={word.id}
                    onClick={() => handleWordClick(word)}
                    disabled={matches.includes(word.id)}
                    className={`
                      w-full p-4 text-lg font-bold rounded-xl transition-all duration-200
                      ${matches.includes(word.id)
                        ? 'bg-kid-green text-white cursor-default'
                        : selectedWord === word.id
                        ? 'bg-kid-yellow text-kid-purple scale-105 shadow-lg'
                        : 'bg-white text-kid-purple hover:bg-kid-blue/20 hover:scale-105'
                      }
                    `}
                  >
                    {word.word}
                    {matches.includes(word.id) && ' ✅'}
                    <div className="text-xs opacity-70">
                      Level {word.difficulty}
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Images Column */}
            <div>
              <h3 className="text-xl font-bold text-kid-purple mb-4 text-center">
                Pictures 🖼️
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {shuffledImages.map((image) => (
                  <Button
                    key={image.id}
                    onClick={() => handleImageClick(image)}
                    disabled={matches.includes(image.id)}
                    className={`
                      aspect-square p-4 text-4xl rounded-xl transition-all duration-200
                      ${matches.includes(image.id)
                        ? 'bg-kid-green cursor-default'
                        : selectedImage === image.id
                        ? 'bg-kid-yellow scale-105 shadow-lg'
                        : 'bg-white hover:bg-kid-pink/20 hover:scale-105'
                      }
                    `}
                  >
                    {image.image}
                    {matches.includes(image.id) && (
                      <div className="text-xs text-white mt-1">✅</div>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default WordWizardGame;
