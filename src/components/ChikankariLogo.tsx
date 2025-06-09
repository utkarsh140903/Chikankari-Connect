import React from 'react';

interface ChikankariLogoProps {
  size?: number;
  className?: string;
}

export const ChikankariLogo: React.FC<ChikankariLogoProps> = ({ 
  size = 32, 
  className = '' 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background adapts to theme */}
      <rect 
        width="32" 
        height="32" 
        fill="currentColor" 
        className="text-indigo-50 dark:text-indigo-800" 
        rx="6"
      />
      
      {/* Chikankari-inspired embroidery pattern */}
      <g className="text-indigo-600 dark:text-indigo-100" opacity="0.9">
        {/* Central flower motif */}
        <circle 
          cx="16" 
          cy="16" 
          r="3" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
        />
        <circle cx="16" cy="16" r="1.5" fill="currentColor"/>
        
        {/* Petals around center */}
        <ellipse 
          cx="16" 
          cy="9" 
          rx="1.5" 
          ry="2.5" 
          fill="currentColor" 
          opacity="0.7"
        />
        <ellipse 
          cx="23" 
          cy="16" 
          rx="2.5" 
          ry="1.5" 
          fill="currentColor" 
          opacity="0.7"
        />
        <ellipse 
          cx="16" 
          cy="23" 
          rx="1.5" 
          ry="2.5" 
          fill="currentColor" 
          opacity="0.7"
        />
        <ellipse 
          cx="9" 
          cy="16" 
          rx="2.5" 
          ry="1.5" 
          fill="currentColor" 
          opacity="0.7"
        />
        
        {/* Corner decorative elements with accent */}
        <circle 
          cx="6" 
          cy="6" 
          r="1" 
          className="fill-amber-600 dark:fill-amber-500" 
          opacity="0.8"
        />
        <circle 
          cx="26" 
          cy="6" 
          r="1" 
          className="fill-amber-600 dark:fill-amber-500" 
          opacity="0.8"
        />
        <circle 
          cx="6" 
          cy="26" 
          r="1" 
          className="fill-amber-600 dark:fill-amber-500" 
          opacity="0.8"
        />
        <circle 
          cx="26" 
          cy="26" 
          r="1" 
          className="fill-amber-600 dark:fill-amber-500" 
          opacity="0.8"
        />
        
        {/* Delicate connecting lines */}
        <path 
          d="M12 12 L20 20 M20 12 L12 20" 
          stroke="currentColor" 
          strokeWidth="0.5" 
          opacity="0.3"
        />
      </g>
    </svg>
  );
};

