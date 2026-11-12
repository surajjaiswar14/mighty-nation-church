import React from 'react';
import { Link } from 'react-router-dom';

interface ChurchLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  lightText?: boolean;
}

export const ChurchLogo: React.FC<ChurchLogoProps> = ({
  size = 'md',
  showTagline = true,
  lightText = false
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14'
  };

  const titleSizes = {
    sm: 'text-base font-bold',
    md: 'text-xl font-bold',
    lg: 'text-2xl font-extrabold'
  };

  return (
    <Link to="/" className="flex items-center gap-3 group transition-transform duration-200">
      <div className={`relative ${iconSizes[size]} shrink-0 rounded-xl bg-gradient-to-br from-church-primary via-blue-800 to-sky-600 p-1.5 shadow-md flex items-center justify-center border border-church-gold/40 group-hover:border-church-gold transition-colors`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <defs>
            <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          {/* Crown */}
          <path
            d="M26 44 L34 52 L50 36 L66 52 L74 44 L68 60 L32 60 Z"
            fill="url(#logoGold)"
            opacity="0.95"
          />
          <circle cx="26" cy="42" r="3" fill="#FEF3C7" />
          <circle cx="50" cy="34" r="3.5" fill="#FEF3C7" />
          <circle cx="74" cy="42" r="3" fill="#FEF3C7" />
          {/* Cross */}
          <rect x="46" y="22" width="8" height="56" rx="2" fill="#FFFFFF" />
          <rect x="32" y="38" width="36" height="8" rx="2" fill="#FFFFFF" />
        </svg>
      </div>

      <div className="flex flex-col text-left">
        <span className={`font-serif tracking-tight leading-tight transition-colors ${titleSizes[size]} ${lightText ? 'text-white' : 'text-slate-900'}`}>
          MIGHTY NATION <span className="text-church-gold">CHURCH</span>
        </span>
        {showTagline && (
          <span className={`text-[10px] sm:text-xs font-medium tracking-wider uppercase ${lightText ? 'text-sky-200' : 'text-slate-500'}`}>
            Wadala, Mumbai
          </span>
        )}
      </div>
    </Link>
  );
};

