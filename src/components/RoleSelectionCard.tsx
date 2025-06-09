
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface RoleSelectionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  language: 'en' | 'hi';
  gradient: string;
}

export const RoleSelectionCard = ({
  icon: Icon,
  title,
  description,
  isSelected,
  onClick,
  language,
  gradient
}: RoleSelectionCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover-lift ${
        isSelected 
          ? 'ring-2 ring-indigo-500 bg-gradient-to-br from-indigo-50 to-rose-50' 
          : 'hover:shadow-lg bg-white'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6 text-center">
        <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        <h4 className={`text-xl font-bold text-indigo-900 mb-3 ${language === 'hi' ? 'hindi-text' : ''}`}>
          {title}
        </h4>
        
        <p className={`text-indigo-600 leading-relaxed ${language === 'hi' ? 'hindi-text' : ''}`}>
          {description}
        </p>
        
        {isSelected && (
          <div className="mt-4 text-sm text-indigo-500 font-medium animate-fade-in">
            {language === 'en' ? '✓ Selected' : '✓ चयनित'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
