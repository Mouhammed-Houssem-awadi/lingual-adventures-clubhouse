
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

interface GameLayoutProps {
  title: string;
  description: string;
  icon: string;
  children: React.ReactNode;
  score?: number;
  lives?: number;
  level?: number;
}

const GameLayout: React.FC<GameLayoutProps> = ({
  title,
  description,
  icon,
  children,
  score = 0,
  lives = 3,
  level = 1
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-sky via-kid-blue to-kid-green p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Button 
            onClick={() => navigate('/')}
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center space-x-2">
            <span className="text-4xl">{icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-white">{title}</h1>
              <p className="text-white/80 text-sm">{description}</p>
            </div>
          </div>
        </div>

        {/* Game Stats */}
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border-2 border-white/30">
            <span className="text-white font-bold">Score: {score}</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border-2 border-white/30">
            <span className="text-white font-bold">Level: {level}</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border-2 border-white/30">
            <span className="text-white font-bold">Lives: {'❤️'.repeat(lives)}</span>
          </div>
        </div>
      </header>

      {/* Game Content */}
      <main className="max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default GameLayout;
