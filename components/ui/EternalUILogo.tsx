'use client';

import React from 'react';
import Link from 'next/link';

interface EternalUILogoProps {
  asLink?: boolean;
  href?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const EternalUILogo: React.FC<EternalUILogoProps> = ({
  asLink = false,
  href = '/',
  className = '',
  size = 'md',
  showText = true
}) => {
  // ✅ FIXED: Use completely static IDs (no dynamic generation)
  const staticLogoId = 'eternal-ui-static-logo';
  const eternalGradientId = `eternal-gradient-${staticLogoId}`;
  const uiGradientId = `ui-gradient-${staticLogoId}`;
  const glowFilterId = `glow-${staticLogoId}`;

  const sizeConfig = {
    sm: { container: 'w-8 h-8', text: 'text-lg' },
    md: { container: 'w-10 h-10', text: 'text-xl' },
    lg: { container: 'w-12 h-12', text: 'text-2xl' }
  };

  const LogoSVG = () => (
    <div className={`${sizeConfig[size].container} relative group ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full transition-all duration-300 group-hover:scale-105" 
        aria-label="Eternal UI Logo" 
        role="img"
      >
        <defs>
          <linearGradient
            id={eternalGradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
          
          <linearGradient
            id={uiGradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          
          <filter id={glowFilterId}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <g className="group-hover:filter group-hover:brightness-110 transition-all duration-300">
          <circle
            cx="30"
            cy="50"
            r="18"
            fill={`url(#${eternalGradientId})`}
            opacity="0.9"
            className="dark:filter dark:brightness-110"
          />
          
          <circle
            cx="70"
            cy="50"
            r="18"
            fill={`url(#${eternalGradientId})`}
            opacity="0.9"
            className="dark:filter dark:brightness-110"
          />
        </g>
        
        <g opacity="0.7" className="group-hover:opacity-90 transition-opacity duration-300">
          <path
            d="M35 35l30 30M65 35L35 65"
            stroke={`url(#${uiGradientId})`}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            className="dark:filter dark:brightness-125"
          />
        </g>
        
        <circle
          cx="50"
          cy="50"
          r="5"
          fill={`url(#${uiGradientId})`}
          filter={`url(#${glowFilterId})`}
          opacity="0.6"
          className="group-hover:opacity-80 transition-opacity duration-300"
        />
      </svg>
    </div>
  );

  const content = (
    <div className="flex items-center gap-3">
      <LogoSVG />
      {showText && (
        <span className={`font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent ${sizeConfig[size].text}`}>
          Eternal UI
        </span>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link 
        href={href} 
        className="inline-block hover:opacity-80 transition-opacity duration-200"
        aria-label="Eternal UI Home"
      >
        {content}
      </Link>
    );
  }

  return content;
};