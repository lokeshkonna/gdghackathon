import React from 'react';
import { Sprout } from 'lucide-react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showIcon?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = '', 
  size = 'md',
  showIcon = true 
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl'
  };

  const iconSizes = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-10 w-10',
    xl: 'h-16 w-16'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIcon && (
        <div className="relative">
          <Sprout className={`${iconSizes[size]} text-primary animate-float`} />
          <div className="absolute inset-0 animate-pulse">
            <Sprout className={`${iconSizes[size]} text-primary-glow opacity-50`} />
          </div>
        </div>
      )}
      <h1 className={`brand-title font-bold ${sizeClasses[size]} tracking-tight`}>
        <span className="brand-kisan">KISAN</span>
        <span className="brand-ai">AI</span>
      </h1>
    </div>
  );
};