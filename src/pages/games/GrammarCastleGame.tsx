
import React, { useState, useEffect } from 'react';
import GameLayout from '@/components/GameLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { grammarQuestions, getQuestionsByDifficulty, calculateDifficultyRange } from '@/utils/gameQuestions';

interface GrammarQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: number;
  topic: string;
}

const GrammarCastleGame: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<GrammarQuestion | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [castleHealth, setCastleHealth] = useState(100);
  const [round, setRound] = useState(1);
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set());

  const { toast } = useToast();

  const loadNewQuestion = () => {
    const { min, max } = calculateDifficultyRange(score);
    const availableQuestions = getQuestionsByDifficulty(grammarQuestions, min, max);
    
    // Filter out used questions for variety
    const unusedQuestions = availableQuestions.filter(q => !usedQuestions.has(q.id));
    const questionsToUse = unusedQuestions.length > 0 ? unusedQuestions : availableQuestions;
    
    // Select random question
    const selectedQuestion = questionsToUse[Math.floor(Math.random() * questionsToUse.length)];
    
    // Update used questions
    const newUsedQuestions = new Set(usedQuestions);
    newUsedQuestions.add(selectedQuestion.id);
    setUsedQuestions(newUsedQuestions);
    
    setCurrentQuestion(selectedQuestion);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  useEffect(() => {
    loadNewQuestion();
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!currentQuestion) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    if (isCorrect) {
      const basePoints = 150;
      const difficultyBonus = currentQuestion.difficulty * 50;
      const roundBonus = round * 20;
      const points = basePoints + difficultyBonus + roundBonus;
      
      setScore(prev => prev + points);
      toast({
        title: "Excellent Defense! 🛡️",
        description: `The castle is safe! +${points} points!`,
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
        setGameComplete(true);
        toast({
          title: "Castle Fallen! 🏰💔",
          description: "Don't give up! Every knight learns from defeat!",
          variant: "destructive",
        });
        return;
      }
    }

    setTimeout(() => {
      setRound(prev => prev + 1);
      loadNewQuestion();
    }, 3000);
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setCastleHealth(100);
    setGameComplete(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setRound(1);
    setUsedQuestions(new Set());
    loadNewQuestion();
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <GameLayout
      title="Grammar Castle"
      description="Defend the castle by choosing the correct grammar!"
      icon="🏰"
      score={score}
      lives={lives}
      level={round}
    >
      <div className="kid-card">
        {gameComplete ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏆👑</div>
            <h3 className="text-3xl font-bold text-kid-purple mb-4">
              Grammar Castle Champion!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              You defended for {round - 1} rounds! Final Score: {score}
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
                Defend the Castle! - Round {round}
              </h2>
              <div className="bg-white/80 rounded-xl p-6 border-2 border-kid-purple/30">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="bg-kid-blue/20 px-3 py-1 rounded-full text-sm font-bold text-kid-purple">
                    Topic: {currentQuestion.topic.charAt(0).toUpperCase() + currentQuestion.topic.slice(1)}
                  </div>
                  <div className="bg-kid-orange/20 px-3 py-1 rounded-full text-sm font-bold text-kid-purple">
                    Level: {currentQuestion.difficulty}
                  </div>
                </div>
                <p className="text-lg text-gray-700 mb-6">
                  {currentQuestion.question}
                </p>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => !showExplanation && handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`
                    p-6 text-lg font-bold rounded-xl transition-all duration-200 min-h-16
                    ${showExplanation
                      ? index === currentQuestion.correctAnswer
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
                    {showExplanation && index === currentQuestion.correctAnswer && (
                      <span className="text-2xl">✅</span>
                    )}
                    {showExplanation && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
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
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default GrammarCastleGame;
