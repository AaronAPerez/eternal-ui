'use client';

import React, { useState } from 'react'

// Floating Action Button
interface FloatingActionButtonProps {
  icon: React.ReactNode
  onClick: React.MouseEventHandler<HTMLButtonElement>
  variant?: 'primary' | 'secondary' | 'success' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  tooltip?: string
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ icon, onClick, variant = 'primary', size = 'md', tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl',
    success: 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl',
    gradient: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg'
  }
  
  const sizes = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14'
  }
  
  return (
    <div className="relative">
      <button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          ${sizes[size]} ${variants[variant]}
          rounded-full flex items-center justify-center
          transition-all duration-300 transform hover:scale-110
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          group
        `}
      >
        <span className="transition-transform group-hover:scale-110">
          {icon}
        </span>
      </button>
      
      {tooltip && showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-50">
          {tooltip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  )
}

export default FloatingActionButton