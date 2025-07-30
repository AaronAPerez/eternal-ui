/**
 * 🛠️ ETERNAL UI - UTILITY FUNCTIONS
 * 
 * Core utility functions for the component library
 * Optimized for performance and type safety
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 🎨 CN (CLASS NAMES) UTILITY
 * 
 * Combines clsx and tailwind-merge for optimal className handling
 * - Handles conditional classes with clsx
 * - Resolves Tailwind CSS conflicts with twMerge
 * - Provides consistent className merging across components
 * 
 * @param inputs - Any number of className values
 * @returns Merged and optimized className string
 * 
 * @example
 * ```tsx
 * cn('px-4 py-2', 'bg-blue-500', { 'text-white': isActive })
 * // Result: "px-4 py-2 bg-blue-500 text-white"
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * 🎯 FOCUS VISIBLE UTILITY
 * 
 * Consistent focus-visible styling for accessibility
 * Follows WCAG 2.1 AA guidelines for focus indicators
 */
export const focusVisibleStyles = [
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-blue-600',
  'dark:focus-visible:ring-blue-400',
].join(' ');

/**
 * 📱 TOUCH TARGET UTILITY
 * 
 * Ensures minimum 44px touch targets for mobile accessibility
 * Based on WCAG 2.1 AA guidelines
 */
export const touchTargetStyles = 'min-h-[44px] min-w-[44px]';

/**
 * 🌙 DARK MODE UTILITIES
 * 
 * Consistent dark mode class patterns
 */
export const darkModeClasses = {
  surface: 'bg-white dark:bg-gray-900',
  surfaceElevated: 'bg-white dark:bg-gray-800',
  text: 'text-gray-900 dark:text-gray-100',
  textMuted: 'text-gray-600 dark:text-gray-400',
  border: 'border-gray-200 dark:border-gray-700',
  borderMuted: 'border-gray-100 dark:border-gray-800',
};

/**
 * 🎭 ANIMATION UTILITIES
 * 
 * Consistent animation classes following design system
 */
export const animationClasses = {
  fadeIn: 'animate-in fade-in duration-200',
  fadeOut: 'animate-out fade-out duration-200',
  slideIn: 'animate-in slide-in-from-bottom-2 duration-300',
  slideOut: 'animate-out slide-out-to-bottom-2 duration-300',
  scaleIn: 'animate-in zoom-in-95 duration-200',
  scaleOut: 'animate-out zoom-out-95 duration-200',
};

/**
 * 📐 SIZE UTILITIES
 * 
 * Consistent sizing patterns across components
 */
export const sizeClasses = {
  xs: 'h-6 text-xs',
  sm: 'h-8 text-sm',
  md: 'h-10 text-sm',
  lg: 'h-12 text-base',
  xl: 'h-14 text-lg',
};

/**
 * 🎨 COLOR UTILITIES
 * 
 * Semantic color mappings for consistent theming
 */
export const colorClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700',
  success: 'bg-green-600 text-white hover:bg-green-700',
  warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
  error: 'bg-red-600 text-white hover:bg-red-700',
  info: 'bg-blue-500 text-white hover:bg-blue-600',
};

/**
 * 🔧 COMPONENT VARIANTS UTILITY
 * 
 * Helper for creating consistent variant systems
 */
export function createVariants<T extends Record<string, any>>(variants: T): T {
  return variants;
}

/**
 * 📊 RESPONSIVE UTILITIES
 * 
 * Consistent responsive breakpoint patterns
 */
export const responsiveClasses = {
  mobile: 'block sm:hidden',
  tablet: 'hidden sm:block lg:hidden',
  desktop: 'hidden lg:block',
  mobileTablet: 'block lg:hidden',
  tabletDesktop: 'hidden sm:block',
};

/**
 * 🎪 INTERACTION UTILITIES
 * 
 * Common interaction states and effects
 */
export const interactionClasses = {
  clickable: 'cursor-pointer select-none',
  disabled: 'cursor-not-allowed opacity-50 pointer-events-none',
  loading: 'cursor-wait pointer-events-none',
  hoverable: 'transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800',
  pressable: 'active:scale-[0.98] transform-gpu transition-transform duration-100',
};

/**
 * 🛡️ ACCESSIBILITY UTILITIES
 * 
 * WCAG 2.1 AA compliant accessibility helpers
 */
export const a11yClasses = {
  srOnly: 'sr-only',
  skipLink: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-blue-600 text-white rounded',
  focusTrap: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600',
  visuallyHidden: 'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0',
};

/**
 * 📏 SPACING UTILITIES
 * 
 * Consistent spacing scale following 8px grid system
 */
export const spacingClasses = {
  xs: 'p-1 gap-1', // 4px
  sm: 'p-2 gap-2', // 8px
  md: 'p-4 gap-4', // 16px
  lg: 'p-6 gap-6', // 24px
  xl: 'p-8 gap-8', // 32px
  '2xl': 'p-12 gap-12', // 48px
};

/**
 * 🎨 SHADOW UTILITIES
 * 
 * Consistent elevation system
 */
export const shadowClasses = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  inner: 'shadow-inner',
};

/**
 * 📦 EXPORT ALL UTILITIES
 */
export {
  clsx,
  twMerge,
};