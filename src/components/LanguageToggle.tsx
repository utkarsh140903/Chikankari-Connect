
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  language: 'en' | 'hi';
  onLanguageChange: (language: 'en' | 'hi') => void;
}

export const LanguageToggle = ({ language, onLanguageChange }: LanguageToggleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-indigo-600" />
      <div className="flex bg-indigo-100 rounded-lg p-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onLanguageChange('en')}
          className={`px-3 py-1 text-sm rounded-md transition-all ${
            language === 'en' 
              ? 'bg-white text-indigo-900 shadow-sm' 
              : 'text-indigo-600 hover:text-indigo-900'
          }`}
        >
          English
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onLanguageChange('hi')}
          className={`px-3 py-1 text-sm rounded-md transition-all hindi-text ${
            language === 'hi' 
              ? 'bg-white text-indigo-900 shadow-sm' 
              : 'text-indigo-600 hover:text-indigo-900'
          }`}
        >
          हिंदी
        </Button>
      </div>
    </div>
  );
};
