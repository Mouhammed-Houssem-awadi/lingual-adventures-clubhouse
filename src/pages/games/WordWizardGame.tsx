
import React, { useState, useEffect } from 'react';
import GameLayout from '@/components/GameLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface WordMatch {
  id: string;
  word: string;
  image: string;
  matched: boolean;
}

const WordWizardGame: React.FC = () => {
  const [words] = useState<WordMatch[]>([
    { id: '1', word: 'Cat', image: '🐱', matched: false },
    { id: '2', word: 'Dog', image: '🐶', matched: false },
    { id: '3', word: 'Bird', image: '🐦', matched: false },
    { id: '4', word: 'Fish', image: '🐠', matched: false },
    { id: '5', word: 'Butterfly', image: '🦋', matched: false },
    { id: '6', word: 'Flower', image: '🌸', matched: false },
  ]);

  const [shuffledWords, setShuffledWords] = useState<WordMatch[]>([]);
  const [shuffledImages, setShuffledImages] = useState<WordMatch[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [matches, setMatches] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameComplete, setGameComplete] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    // Shuffle words and images separately
    setShuffledWords([...words].sort(() => Math.random() - 0.5));
    setShuffledImages([...words].sort(() => Math.random() - 0.5));
  }, []);

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
      setMatches(prev => [...prev, wordId]);
      setScore(prev => prev + 100);
      setSelectedWord(null);
      setSelectedImage(null);
      
      toast({
        title: "Excellent! ⭐",
        description: "Perfect match! Keep going!",
      });

      if (matches.length + 1 === words.length) {
        setGameComplete(true);
        toast({
          title: "🎉 Congratulations!",
          description: "You've completed Word Wizard! Amazing work!",
        });
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
        toast({
          title: "Game Over",
          description: "Don't worry! Practice makes perfect!",
          variant: "destructive",
        });
      }
    }
  };

  const resetGame = () => {
    setMatches([]);
    setScore(0);
    setLives(3);
    setGameComplete(false);
    setSelectedWord(null);
    setSelectedImage(null);
    setShuffledWords([...words].sort(() => Math.random() - 0.5));
    setShuffledImages([...words].sort(() => Math.random() - 0.5));
  };

  return (
    <GameLayout
      title="Word Wizard"
      description="Match pictures with words to cast magic spells!"
      icon="🧙‍♂️"
      score={score}
      lives={lives}
    >
      <div className="kid-card">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-kid-purple mb-2">
            Match the words with the pictures!
          </h2>
          <p className="text-gray-600">
            Click on a word, then click on its matching picture to cast a spell!
          </p>
        </div>

        {gameComplete ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold text-kid-purple mb-4">
              Magical Success!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              You've mastered all the word spells! Final Score: {score}
            </p>
            <Button onClick={resetGame} className="game-button">
              Play Again 🔄
            </Button>
          </div>
        ) : lives <= 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😢</div>
            <h3 className="text-3xl font-bold text-kid-purple mb-4">
              Try Again!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Practice makes perfect! Let's try once more.
            </p>
            <Button onClick={resetGame} className="game-button">
              Try Again 🔄
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
