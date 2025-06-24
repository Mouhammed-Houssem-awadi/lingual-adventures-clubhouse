
import React, { useState } from 'react';
import GameLayout from '@/components/GameLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface GrammarQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const GrammarCastleGame: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [castleHealth, setCastleHealth] = useState(100);

  const { toast } = useToast();

  const questions: GrammarQuestion[] = [
    {
      id: '1',
      question: 'Choose the correct verb: "She _____ to school every day."',
      options: ['go', 'goes', 'going', 'gone'],
      correctAnswer: 1,
      explanation: 'We use "goes" because "she" is third person singular, so we add -es to the verb.',
      difficulty: 'easy'
    },
    {
      id: '2',
      question: 'Which sentence is correct?',
      options: [
        'I have ate lunch',
        'I have eaten lunch',
        'I has eaten lunch',
        'I have eat lunch'
      ],
      correctAnswer: 1,
      explanation: 'The present perfect tense uses "have/has + past participle". "Eaten" is the past participle of "eat".',
      difficulty: 'medium'
    },
    {
      id: '3',
      question: 'Choose the correct article: "I saw _____ elephant at the zoo."',
      options: ['a', 'an', 'the', 'no article'],
      correctAnswer: 1,
      explanation: 'We use "an" before words that start with a vowel sound. "Elephant" starts with "e".',
      difficulty: 'easy'
    },
    {
      id: '4',
      question: 'Which is the correct past tense: "Yesterday, I _____ my homework."',
      options: ['do', 'did', 'done', 'doing'],
      correctAnswer: 1,
      explanation: '"Did" is the past tense of "do". We use past tense for actions that happened yesterday.',
      difficulty: 'medium'
    },
    {
      id: '5',
      question: 'Choose the correct possessive form: "This is _____ book."',
      options: ['Johns', 'John\'s', 'Johns\'', 'John'],
      correctAnswer: 1,
      explanation: 'We use an apostrophe + s to show possession for singular nouns.',
      difficulty: 'hard'
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(prev => prev + 150);
      toast({
        title: "Excellent Defense! 🛡️",
        description: "The castle is safe! Great grammar knowledge!",
      });
    } else {
      setLives(prev => prev - 1);
      setCastleHealth(prev => Math.max(0, prev - 20));
      toast({
        title: "Castle Under Attack! ⚔️",
        description: "The enemies broke through! Study the explanation.",
        variant: "destructive",
      });

      if (lives <= 1) {
        toast({
          title: "Castle Fallen! 🏰💔",
          description: "Don't give up! Every knight learns from defeat!",
          variant: "destructive",
        });
        return;
      }
    }

    setTimeout(() => {
      if (currentQuestion + 1 >= questions.length) {
        setGameComplete(true);
        toast({
          title: "🏆 Castle Defender Champion!",
          description: "You've protected the Grammar Castle! Outstanding!",
        });
      } else {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      }
    }, 3000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setLives(3);
    setCastleHealth(100);
    setGameComplete(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const currentQ = questions[currentQuestion];

  return (
    <GameLayout
      title="Grammar Castle"
      description="Defend the castle by choosing the correct grammar!"
      icon="🏰"
      score={score}
      lives={lives}
      level={currentQuestion + 1}
    >
      <div className="kid-card">
        {gameComplete ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏆👑</div>
            <h3 className="text-3xl font-bold text-kid-purple mb-4">
              Grammar Castle Champion!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              You've successfully defended the realm! Final Score: {score}
            </p>
            <Button onClick={resetGame} className="game-button">
              Defend Another Castle 🏰
            </Button>
          </div>
        ) : lives <= 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏰💔</div>
            <h3 className="text-3xl font-bold text-kid-purple mb-4">
              Castle Needs Rebuilding!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Every great defender learns from experience. Try again!
            </p>
            <Button onClick={resetGame} className="game-button">
              Rebuild Castle 🔨
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Castle Health Bar */}
            <div className="bg-gradient-to-r from-kid-red/20 to-kid-orange/20 rounded-2xl p-4 border-2 border-kid-red/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-kid-purple">Castle Health</span>
                <span className="text-lg font-bold text-kid-red">{castleHealth}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="h-full bg-gradient-to-r from-kid-green to-kid-yellow rounded-full transition-all duration-500"
                  style={{ width: `${castleHealth}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="text-center">
              <div className="text-6xl mb-4">🏰⚔️</div>
              <h2 className="text-2xl font-bold text-kid-purple mb-4">
                Defend the Castle!
              </h2>
              <div className="bg-white/80 rounded-xl p-6 border-2 border-kid-purple/30">
                <h3 className="text-xl font-bold text-kid-purple mb-4">
                  Question {currentQuestion + 1} of {questions.length}
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  {currentQ.question}
                </p>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => !showExplanation && handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`
                    p-6 text-lg font-bold rounded-xl transition-all duration-200 min-h-16
                    ${showExplanation
                      ? index === currentQ.correctAnswer
                        ? 'bg-kid-green text-white cursor-default'
                        : selectedAnswer === index
                        ? 'bg-kid-red text-white cursor-default'
                        : 'bg-gray-300 text-gray-500 cursor-default'
                      : 'bg-white text-kid-purple hover:bg-kid-blue hover:text-white hover:scale-105 shadow-md'
                    }
                  `}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="bg-kid-purple text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showExplanation && index === currentQ.correctAnswer && (
                      <span className="text-2xl">✅</span>
                    )}
                    {showExplanation && selectedAnswer === index && index !== currentQ.correctAnswer && (
                      <span className="text-2xl">❌</span>
                    )}
                  </div>
                </Button>
              ))}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="bg-gradient-to-r from-kid-yellow/20 to-kid-orange/20 rounded-2xl p-6 border-2 border-kid-yellow/50">
                <h4 className="text-lg font-bold text-kid-purple mb-2 flex items-center">
                  <span className="text-2xl mr-2">🧙‍♂️</span>
                  Grammar Wizard Explains:
                </h4>
                <p className="text-gray-700">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Progress */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-kid-purple font-bold">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <div className="flex space-x-1">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index < currentQuestion 
                          ? 'bg-kid-green' 
                          : index === currentQuestion 
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

export default GrammarCastleGame;
