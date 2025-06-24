
import React from 'react';

interface ProgressTrackerProps {
  level: number;
  experience: number;
  maxExperience: number;
  stars: number;
  badges: string[];
  streakDays: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  level,
  experience,
  maxExperience,
  stars,
  badges,
  streakDays
}) => {
  const progressPercentage = (experience / maxExperience) * 100;

  return (
    <div className="kid-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-kid-purple">Progress</h3>
        <div className="flex items-center space-x-2">
          <span className="text-2xl animate-star-twinkle">⭐</span>
          <span className="text-xl font-bold text-kid-orange">{stars}</span>
        </div>
      </div>
      
      {/* Level Display */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-kid-purple">Level {level}</span>
          <span className="text-sm text-gray-600">{experience}/{maxExperience} XP</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-kid-green to-kid-blue rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="h-full bg-white/30 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Streak Counter */}
      <div className="flex items-center justify-center mb-4 p-3 bg-gradient-to-r from-kid-orange/20 to-kid-yellow/20 rounded-2xl border-2 border-kid-orange/30">
        <span className="text-2xl mr-2">🔥</span>
        <span className="text-lg font-bold text-kid-orange">{streakDays} day streak!</span>
      </div>

      {/* Badges */}
      <div>
        <h4 className="text-lg font-semibold text-kid-purple mb-3">Latest Badges</h4>
        <div className="flex flex-wrap gap-2">
          {badges.slice(0, 4).map((badge, index) => (
            <div 
              key={index}
              className="reward-badge flex items-center space-x-1"
            >
              <span className="text-lg">{getBadgeEmoji(badge)}</span>
              <span className="text-xs">{badge}</span>
            </div>
          ))}
          {badges.length > 4 && (
            <div className="reward-badge">
              +{badges.length - 4} more
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getBadgeEmoji = (badge: string): string => {
  const emojiMap: { [key: string]: string } = {
    'First Steps': '👶',
    'Word Master': '📚',
    'Grammar Guru': '✏️',
    'Pronunciation Pro': '🎤',
    'Story Teller': '📖',
    'Quiz Champion': '🏆',
    'Speed Reader': '⚡',
    'Perfect Score': '💯'
  };
  return emojiMap[badge] || '🎉';
};

export default ProgressTracker;
