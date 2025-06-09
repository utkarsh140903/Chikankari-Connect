
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  language: 'en' | 'hi';
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  language
}: FeatureCardProps) => {
  return (
    <Card className="bg-white hover:shadow-lg transition-all duration-300 hover-lift">
      <CardContent className="p-6 text-center">
        <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-rose-100 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
        
        <h4 className={`text-lg font-semibold text-indigo-900 mb-3 ${language === 'hi' ? 'hindi-text' : ''}`}>
          {title}
        </h4>
        
        <p className={`text-indigo-600 text-sm leading-relaxed ${language === 'hi' ? 'hindi-text' : ''}`}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
};
