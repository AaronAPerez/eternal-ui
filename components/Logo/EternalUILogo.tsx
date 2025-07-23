// ====================================
// ETERNAL UI LOGO WITH DARK MODE
// ====================================

'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Eternal UI Logo Component
 * 
 * Modern, scalable logo with:
 * - Dark mode support
 * - Multiple size variants
 * - Accessibility features
 * - Hover animations
 * - Gradient effects
 * - Responsive design
 */

interface EternalUILogoProps {
  /** Size variant for different use cases */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Whether to show the text alongside the icon */
  showText?: boolean;
  /** Custom className for styling */
  className?: string;
  /** Theme variant */
  variant?: 'default' | 'mono' | 'gradient' | 'outline';
  /** Whether the logo should be clickable */
  onClick?: () => void;
  /** Link destination when clickable */
  href?: string;
  /** Whether to show as a link */
  asLink?: boolean;
}

/**
 * SIZE SYSTEM
 * Consistent sizing that works across all components
 */
const sizeClasses = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8', 
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
};

const textSizeClasses = {
  xs: 'text-sm',
  sm: 'text-base',
  md: 'text-lg', 
  lg: 'text-xl',
  xl: 'text-2xl'
};

export function EternalUILogo({ 
  size = 'md', 
  showText = true, 
  className = '',
  variant = 'default',
  onClick,
  href = '/',
  asLink = false
}: EternalUILogoProps) {
  
  /**
   * LOGO ICON - Infinity Symbol with Modern UI Elements
   * 
   * Based on the project's design system:
   * - Infinity symbol represents "eternal"
   * - Geometric styling for modern tech appeal
   * - Gradient for visual appeal
   * - UI elements overlay for tech identity
   */
  const renderIcon = () => {
    const baseClasses = `${sizeClasses[size]} ${className}`;
    const iconId = `eternal-logo-${Math.random().toString(36).substr(2, 9)}`;
    
    switch (variant) {
      case 'mono':
        return (
          <div className={`${baseClasses} relative`}>
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              aria-label="Eternal UI Logo"
              role="img"
            >
              <path
                d="M20 50c0-11 9-20 20-20s20 9 20 20-9 20-20 20-20-9-20-20zm40 0c0-11 9-20 20-20s20 9 20 20-9 20-20 20-20-9-20-20z"
                fill="currentColor"
                opacity="0.9"
              />
              <path
                d="M35 35l30 30M65 35L35 65"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
            </svg>
          </div>
        );
        
      case 'outline':
        return (
          <div className={`${baseClasses} relative`}>
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              aria-label="Eternal UI Logo"
              role="img"
            >
              <path
                d="M20 50c0-11 9-20 20-20s20 9 20 20-9 20-20 20-20-9-20-20zm40 0c0-11 9-20 20-20s20 9 20 20-9 20-20 20-20-9-20-20z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                opacity="0.8"
              />
              <path
                d="M35 35l30 30M65 35L35 65"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
            </svg>
          </div>
        );
        
      case 'gradient':
      default:
        return (
          <div className={`${baseClasses} relative group`}>
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-sm"
              aria-label="Eternal UI Logo"
              role="img"
            >
              <defs>
                {/* Main gradient for infinity circles */}
                <linearGradient id={`eternal-gradient-${iconId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
                
                {/* UI elements gradient */}
                <linearGradient id={`ui-gradient-${iconId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
                
                {/* Glow effect for dark mode */}
                <filter id={`glow-${iconId}`}>
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Main infinity symbol */}
              <g className="group-hover:scale-110 transition-transform duration-300 origin-center">
                <circle 
                  cx="30" 
                  cy="50" 
                  r="18" 
                  fill={`url(#eternal-gradient-${iconId})`}
                  opacity="0.9"
                  className="dark:filter dark:brightness-110"
                />
                <circle 
                  cx="70" 
                  cy="50" 
                  r="18" 
                  fill={`url(#eternal-gradient-${iconId})`}
                  opacity="0.9" 
                  className="dark:filter dark:brightness-110"
                />
              </g>
              
              {/* UI element lines - representing the "UI" part */}
              <g opacity="0.7" className="group-hover:opacity-100 transition-opacity duration-300">
                <path
                  d="M35 35l30 30M65 35L35 65"
                  stroke={`url(#ui-gradient-${iconId})`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  className="dark:filter dark:brightness-125"
                />
              </g>
              
              {/* Highlight dots for tech feel */}
              <g className="opacity-80 dark:opacity-100">
                <circle cx="30" cy="35" r="2" fill="#FFFFFF" />
                <circle cx="70" cy="35" r="2" fill="#FFFFFF" />
                <circle cx="30" cy="65" r="1.5" fill="#FFFFFF" opacity="0.6" />
                <circle cx="70" cy="65" r="1.5" fill="#FFFFFF" opacity="0.6" />
              </g>
            </svg>
            
            {/* Subtle glow effect in dark mode */}
            <div className="absolute inset-0 opacity-0 dark:opacity-20 group-hover:opacity-30 transition-opacity duration-300">
              <div className="w-full h-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 rounded-lg blur-lg"></div>
            </div>
          </div>
        );
    }
  };
  
  /**
   * TYPOGRAPHY TREATMENT
   * 
   * Modern, clean typography that complements the icon
   * with proper dark mode support
   */
  const renderText = () => {
    if (!showText) return null;
    
    return (
      <div className="flex flex-col">
        <span className={`
          font-bold tracking-tight ${textSizeClasses[size]} 
          bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
          dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400
          bg-clip-text text-transparent
        `}>
          Eternal
        </span>
        <span className={`
          font-medium tracking-wider 
          ${size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-sm' : 'text-base'} 
          text-gray-600 dark:text-gray-400 -mt-1
        `}>
          UI
        </span>
      </div>
    );
  };
  
  /**
   * CONTENT WRAPPER
   */
  const logoContent = (
    <div className={`
      flex items-center gap-3 group
      ${onClick || asLink ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''}
    `}>
      <div className="flex-shrink-0">
        {renderIcon()}
      </div>
      {renderText()}
    </div>
  );
  
  /**
   * INTERACTIVE WRAPPER
   * 
   * Handle click events, links, and hover states
   */
  if (asLink && href) {
    return (
      <Link 
        href={href}
        className="inline-block"
        aria-label="Eternal UI Home"
      >
        {logoContent}
      </Link>
    );
  }
  
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="inline-block"
        aria-label="Eternal UI Logo"
        type="button"
      >
        {logoContent}
      </button>
    );
  }
  
  return logoContent;
}

// ====================================
// LOGO SHOWCASE COMPONENT
// ====================================

/**
 * Logo showcase component for documentation and testing
 */
export function EternalUILogoShowcase() {
  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Eternal UI Logo System
        </h1>
        
        {/* Size Variants */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Size Variants
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="text-center">
              <EternalUILogo size="xs" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">XS</p>
            </div>
            <div className="text-center">
              <EternalUILogo size="sm" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">SM</p>
            </div>
            <div className="text-center">
              <EternalUILogo size="md" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">MD</p>
            </div>
            <div className="text-center">
              <EternalUILogo size="lg" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">LG</p>
            </div>
            <div className="text-center">
              <EternalUILogo size="xl" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">XL</p>
            </div>
          </div>
        </div>

        {/* Style Variants */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Style Variants
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <EternalUILogo variant="default" size="lg" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Default (Gradient)</p>
            </div>
            <div className="text-center">
              <EternalUILogo variant="mono" size="lg" className="text-gray-700 dark:text-gray-300" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Monochrome</p>
            </div>
            <div className="text-center">
              <EternalUILogo variant="outline" size="lg" className="text-indigo-600 dark:text-indigo-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Outline</p>
            </div>
            <div className="text-center">
              <EternalUILogo variant="gradient" size="lg" showText={false} />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Icon Only</p>
            </div>
          </div>
        </div>

        {/* Dark Mode Demonstration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Light Mode
            </h3>
            <div className="flex items-center justify-center py-8">
              <EternalUILogo size="xl" />
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Dark Mode
            </h3>
            <div className="flex items-center justify-center py-8">
              <div className="dark">
                <EternalUILogo size="xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Usage Examples
          </h2>
          
          <div className="space-y-6">
            {/* Navigation Header */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Navigation Header</h4>
              <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-4 rounded">
                <EternalUILogo size="sm" asLink href="/" />
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Menu items...</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Footer</h4>
              <div className="bg-gray-900 dark:bg-gray-800 p-6 rounded">
                <div className="dark">
                  <EternalUILogo size="md" variant="gradient" />
                </div>
              </div>
            </div>

            {/* Loading Screen */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Loading Screen</h4>
              <div className="bg-indigo-600 p-8 rounded flex items-center justify-center">
                <div className="text-center">
                  <EternalUILogo size="xl" variant="gradient" className="animate-pulse" />
                  <p className="text-white mt-4">Loading...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Code Examples
          </h2>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Basic Usage</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200">
{`// Basic logo
<EternalUILogo />

// Large logo without text
<EternalUILogo size="xl" showText={false} />

// Clickable logo as link
<EternalUILogo asLink href="/" size="md" />

// Custom click handler
<EternalUILogo 
  onClick={() => console.log('Logo clicked')} 
  size="lg" 
/>`}
                </code>
              </pre>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Style Variants</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200">
{`// Monochrome for backgrounds
<EternalUILogo 
  variant="mono" 
  className="text-white"
/>

// Outline for minimal look
<EternalUILogo 
  variant="outline"
  className="text-indigo-600 dark:text-indigo-400"
/>

// Custom styling
<EternalUILogo 
  className="hover:scale-110 transition-transform"
  size="lg"
/>`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Design Principles */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Design Principles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Eternal</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                The infinity symbol represents timeless design that never goes out of style.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Modern</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Clean geometry and gradients create a contemporary, tech-forward appearance.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Accessible</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Built with accessibility in mind, supporting screen readers and keyboard navigation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ====================================
// DARK MODE THEME HOOK
// ====================================

/**
 * Theme hook for managing dark mode
 */
export function useTheme() {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('eternal-ui-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = React.useCallback(() => {
    setIsDark(prev => {
      const newTheme = !prev;
      localStorage.setItem('eternal-ui-theme', newTheme ? 'dark' : 'light');
      
      if (newTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newTheme;
    });
  }, []);

  return { isDark, toggleTheme };
}

// ====================================
// THEME TOGGLE COMPONENT
// ====================================

/**
 * Theme toggle button component
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        p-2 rounded-lg bg-gray-100 dark:bg-gray-800 
        text-gray-700 dark:text-gray-300
        hover:bg-gray-200 dark:hover:bg-gray-700
        transition-colors duration-200
        ${className}
      `}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
    >
      {isDark ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}

// Export as default
export default EternalUILogo;