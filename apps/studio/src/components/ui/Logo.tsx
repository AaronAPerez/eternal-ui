'use client'

import { Rocket } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg">
        <Rocket className={sizeClasses[size]} />
      </div>
      {showText && (
        <span className={`font-bold text-gray-900 dark:text-white ${textSizes[size]}`}>
          Eternal UI
        </span>
      )}
    </div>
  )
}
