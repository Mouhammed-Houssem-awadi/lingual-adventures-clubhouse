
import React from 'react';
import { Button } from '@/components/ui/button';

interface LanguageSwitcherProps {
  currentLanguage: 'en' | 'fr';
  onLanguageChange: (language: 'en' | 'fr') => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  currentLanguage, 
  onLanguageChange 
}) => {
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  return (
    <div className="flex bg-white/20 backdrop-blur-sm rounded-full p-1 border-2 border-white/30">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          onClick={() => onLanguageChange(lang.code as 'en' | 'fr')}
          className={`
            px-4 py-2 rounded-full font-bold transition-all duration-300 text-sm
            ${currentLanguage === lang.code 
              ? 'bg-white text-kid-purple shadow-lg scale-105' 
              : 'bg-transparent text-white hover:bg-white/20 hover:scale-105'
            }
          `}
          variant="ghost"
        >
          <span className="text-lg mr-2">{lang.flag}</span>
          {lang.name}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
