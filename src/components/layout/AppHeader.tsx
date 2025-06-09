
import { ArrowLeft, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  title: string;
  titleHi?: string;
  showBack?: boolean;
  backTo?: string;
  language: 'en' | 'hi';
  onLanguageChange: (language: 'en' | 'hi') => void;
  showMenu?: boolean;
  onMenuClick?: () => void;
}

export const AppHeader = ({ 
  title, 
  titleHi, 
  showBack = false, 
  backTo = "/", 
  language, 
  onLanguageChange,
  showMenu = false,
  onMenuClick 
}: AppHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/60 px-4 py-3 shadow-sm dark:bg-gray-900/95 dark:border-gray-700/60">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center gap-3">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="p-2 hover:bg-indigo-50 rounded-lg transition-colors dark:hover:bg-indigo-900/50"
            >
              <ArrowLeft className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </Button>
          )}
          
          {showMenu && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="p-2 hover:bg-indigo-50 rounded-lg transition-colors dark:hover:bg-indigo-900/50"
            >
              <Menu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </Button>
          )}

          {/* Logo and Title */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              {/* Light theme logo */}
              <img 
                src="/favicon-light.svg" 
                alt="Logo" 
                className="w-8 h-8 dark:hidden transition-transform hover:scale-105"
              />
              {/* Dark theme logo */}
              <img 
                src="/favicon-dark.svg" 
                alt="Logo" 
                className="w-8 h-8 hidden dark:block transition-transform hover:scale-105"
              />
            </div>
            <h1 className={cn(
              "text-lg font-bold text-indigo-900 truncate dark:text-indigo-100",
              "tracking-tight",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {language === 'hi' && titleHi ? titleHi : title}
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle language={language} onLanguageChange={onLanguageChange} />
        </div>
      </div>
    </header>
  );
};
