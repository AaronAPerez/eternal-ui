'use client'

import React from 'react'

interface EternalUILogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'full' | 'icon' | 'text'
  theme?: 'light' | 'dark' | 'auto'
  className?: string
}

export const EternalUILogo: React.FC<EternalUILogoProps> = ({
  size = 'md',
  variant = 'full',
  theme = 'auto',
  className = ''
}) => {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-lg', spacing: 'gap-2' },
    md: { icon: 'w-10 h-10', text: 'text-xl', spacing: 'gap-3' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', spacing: 'gap-3' },
    xl: { icon: 'w-16 h-16', text: 'text-3xl', spacing: 'gap-4' }
  }

  const themeClasses = {
    light: 'text-gray-900',
    dark: 'text-white',
    auto: 'text-gray-900 dark:text-white'
  }

  const IconComponent = () => (
    <div className={`${sizes[size].icon} relative`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer ring */}
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="url(#gradient1)"
          strokeWidth="2"
          className="drop-shadow-sm"
        />
        
        {/* Inner geometric pattern */}
        <path
          d="M12 12 L28 12 L28 20 L20 20 L20 28 L12 28 Z"
          fill="url(#gradient2)"
          className="drop-shadow-sm"
        />
        
        {/* Accent dot */}
        <circle
          cx="24"
          cy="16"
          r="2"
          fill="url(#gradient3)"
          className="drop-shadow-sm"
        />
        
        {/* Gradients */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#e0e7ff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )

  const TextComponent = () => (
    <div className={`font-bold ${sizes[size].text} ${themeClasses[theme]}`}>
      <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
        Eternal
      </span>
      <span className="ml-1">UI</span>
    </div>
  )

  if (variant === 'icon') {
    return <IconComponent />
  }

  if (variant === 'text') {
    return <TextComponent />
  }

  return (
    <div className={`flex items-center ${sizes[size].spacing} ${className}`}>
      <IconComponent />
      <TextComponent />
    </div>
  )
}