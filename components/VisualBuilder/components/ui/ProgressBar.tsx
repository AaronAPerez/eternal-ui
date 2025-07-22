import React from 'react'

// Progress Bar with Animation
type ProgressBarProps = {
  value: number
  max?: number
  showLabel?: boolean
  animated?: boolean
  gradient?: boolean
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max = 100, showLabel = true, animated = true, gradient = false }) => {
  const percentage = Math.min((value / max) * 100, 100)
  
  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`
            h-full transition-all duration-500 ease-out rounded-full
            ${gradient 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
              : 'bg-blue-600'
            }
            ${animated ? 'relative overflow-hidden' : ''}
          `}
          style={{ width: `${percentage}%` }}
        >
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProgressBar