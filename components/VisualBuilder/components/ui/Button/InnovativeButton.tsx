'use client';

import React from 'react'


// Innovative Button with Multiple Variants

const variants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 shadow-md hover:shadow-lg',
  success: 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl',
  warning: 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:shadow-xl',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300 hover:border-gray-400',
  glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-lg',
  neon: 'bg-black border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black shadow-lg shadow-cyan-400/50',
  gradient: '', // gradient will be handled separately in the component
}

const sizes = {
  xs: 'px-2 py-1 text-xs rounded-md',
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-lg',
  xl: 'px-8 py-4 text-lg rounded-xl',
}

interface InnovativeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  children: React.ReactNode
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  loading?: boolean
  pulse?: boolean
  gradient?: boolean
}

const InnovativeButton: React.FC<InnovativeButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon, 
  iconPosition = 'left',
  loading = false,
  pulse = false,
  gradient = false,
  ...props 
}) => {
  const baseClasses = `
    relative inline-flex items-center justify-center gap-2 font-medium 
    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group
    ${pulse ? 'animate-pulse' : ''}
  `
  
  // Handle gradient variant
  const variantClasses =
    variant === 'gradient' && gradient
      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg'
      : variants[variant]

  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${sizes[size]}`}
      {...props}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      
      {iconPosition === 'left' && icon && !loading && (
        <span className="transition-transform group-hover:scale-110">{icon}</span>
      )}
      
      {loading && (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      )}
      
      <span className="relative z-10">{children}</span>
      
      {iconPosition === 'right' && icon && !loading && (
        <span className="transition-transform group-hover:scale-110">{icon}</span>
      )}
    </button>
  )
}

export default InnovativeButton