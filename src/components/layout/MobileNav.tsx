
import { Home, Search, MessageCircle, User, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  labelHi: string;
  path: string;
}

interface MobileNavProps {
  language: 'en' | 'hi';
}

export const MobileNav = ({ language }: MobileNavProps) => {
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      icon: Home,
      label: "Home",
      labelHi: "होम",
      path: "/"
    },
    {
      icon: Search,
      label: "Market",
      labelHi: "बाज़ार",
      path: "/marketplace"
    },
    {
      icon: MessageCircle,
      label: "Chat",
      labelHi: "चैट",
      path: "/chat"
    },
    {
      icon: BookOpen,
      label: "Learn",
      labelHi: "सीखें",
      path: "/learn"
    },
    {
      icon: User,
      label: "Profile",
      labelHi: "प्रोफ़ाइल",
      path: "/artisan/profile"
    }
  ];

  // Don't show mobile nav on auth pages
  const hideNavPages = ['/auth/phone', '/auth/setup'];
  if (hideNavPages.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-2 z-50 shadow-lg dark:bg-gray-900/95 dark:border-gray-700">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0 flex-1",
                isActive 
                  ? "text-indigo-600 bg-indigo-50 scale-105 dark:text-indigo-400 dark:bg-indigo-900/50" 
                  : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/30"
              )}
            >
              <Icon className="w-6 h-6 mb-1 flex-shrink-0" />
              <span className={cn(
                "text-xs font-medium truncate w-full text-center",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {language === 'hi' ? item.labelHi : item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
