import React from 'react'

/**
 * 🎨 ETERNAL UI LOGO COMPONENT
 * 
 * A modern, scalable logo that embodies the concept of eternal, timeless design.
 * Features:
 * - Infinity symbol representing "eternal"
 * - Gradient styling for modern appeal
 * - Multiple size variants for different use cases
 * - Accessible with proper ARIA labels
 * - Responsive and crisp at any scale
 */

interface EternalUILogoProps {
  /** Size variant for different use cases */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Whether to show the text alongside the icon */
  showText?: boolean
  /** Custom className for styling */
  className?: string
  /** Theme variant */
  variant?: 'default' | 'mono' | 'gradient' | 'outline'
  /** Whether the logo should be clickable */
  onClick?: () => void
}

/**
 * SIZE SYSTEM
 * Consistent sizing that works across all components
 */
const sizeClasses = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8', 
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
  full: 'w-full h-auto'
}

const textSizeClasses = {
  xs: 'text-sm',
  sm: 'text-base',
  md: 'text-lg', 
  lg: 'text-xl',
  xl: 'text-2xl',
  full: 'text-3xl'
}

export function EternalUILogo({ 
  size = 'md', 
  showText = true, 
  className = '',
  variant = 'default',
  onClick 
}: EternalUILogoProps) {
  
  /**
   * 🎨 LOGO ICON - Infinity Symbol with Modern Twist
   * 
   * The infinity symbol represents "eternal" while the geometric
   * styling gives it a modern, tech-forward appearance
   */
  const renderIcon = () => {
    const baseClasses = `${sizeClasses[size]} ${className}`
    
    switch (variant) {
      case 'mono':
        return (
          <svg
            viewBox="0 0 100 100"
            className={baseClasses}
            aria-label="Eternal UI Logo"
            role="img"
          >
            <defs>
              <style>
                {`.eternal-path { fill: currentColor; }`}
              </style>
            </defs>
            <path
              className="eternal-path"
              d="M20 50c0-11 9-20 20-20s20 9 20 20-9 20-20 20-20-9-20-20zm40 0c0-11 9-20 20-20s20 9 20 20-9 20-20 20-20-9-20-20z"
              opacity="0.9"
            />
            <path
              className="eternal-path"
              d="M35 35l30 30M65 35L35 65"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
          </svg>
        )
        
      case 'outline':
        return (
          <svg
            viewBox="0 0 100 100"
            className={baseClasses}
            aria-label="Eternal UI Logo"
            role="img"
          >
            <defs>
              <style>
                {`.eternal-outline { fill: none; stroke: currentColor; stroke-width: 3; }`}
              </style>
            </defs>
            <circle cx="30" cy="50" r="18" className="eternal-outline" />
            <circle cx="70" cy="50" r="18" className="eternal-outline" />
            <path
              d="M35 35l30 30M65 35L35 65"
              className="eternal-outline"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        )
        
      case 'gradient':
      default:
        return (
          <svg
            viewBox="0 0 100 100"
            className={baseClasses}
            aria-label="Eternal UI Logo"
            role="img"
          >
            <defs>
              {/* Primary gradient for the infinity symbol */}
              <linearGradient id="eternal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
              
              {/* Secondary gradient for the UI elements */}
              <linearGradient id="ui-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
              
              {/* Subtle shadow effect */}
              <filter id="eternal-shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1"/>
              </filter>
            </defs>
            
            {/* Main infinity symbol */}
            <g filter="url(#eternal-shadow)">
              <circle cx="30" cy="50" r="18" fill="url(#eternal-gradient)" opacity="0.9" />
              <circle cx="70" cy="50" r="18" fill="url(#eternal-gradient)" opacity="0.9" />
            </g>
            
            {/* UI element lines */}
            <g opacity="0.7">
              <path
                d="M35 35l30 30M65 35L35 65"
                stroke="url(#ui-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </g>
            
            {/* Highlight dots for modern tech feel */}
            <circle cx="30" cy="35" r="2" fill="#FFFFFF" opacity="0.8" />
            <circle cx="70" cy="35" r="2" fill="#FFFFFF" opacity="0.8" />
          </svg>
        )
    }
  }
  
  /**
   * 🔤 TYPOGRAPHY TREATMENT
   * 
   * Modern, clean typography that complements the icon
   */
  const renderText = () => {
    if (!showText) return null
    
    return (
      <div className="flex flex-col">
        <span className={`font-bold tracking-tight ${textSizeClasses[size]} bg-gradient-to-r from-indigo-600 via-purple-600 to-orange-600 bg-clip-text text-transparent`}>
          Eternal
        </span>
        {/* <span className={`font-medium tracking-wider ${size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-sm' : 'text-base'} text-gray-600 dark:text-gray-400 -mt-1`}>
          UI
        </span>  */}
      </div>
    )
  }
  
  /**
   * 🎯 INTERACTIVE WRAPPER
   * 
   * Handle click events and hover states
   */
  const WrapperComponent = onClick ? 'button' : 'div'
  
  return (
    <WrapperComponent
      className={`
        flex items-center
        ${onClick ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''}
      `}
      onClick={onClick}
      {...(onClick && {
        'aria-label': 'Eternal UI Home',
        role: 'button'
      })}
    >
      <div className="flex-shrink-0">
        {renderIcon()}
      </div>
      {renderText()}
    </WrapperComponent>
  )
}


