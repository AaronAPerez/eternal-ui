/**
 * Progress Component
 * 
 * Displays progress for tasks and operations with comprehensive accessibility.
 * Supports determinate and indeterminate states with smooth animations.
 * 
 * Features:
 * - ARIA-compliant progress indicator
 * - Smooth animations and transitions
 * - Multiple size variants
 * - Color variants for different states
 * - Screen reader announcements
 * - Percentage display option
 */

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const progressVariants = cva(
  'relative overflow-hidden rounded-full bg-secondary',
  {
    variants: {
      size: {
        sm: 'h-1',
        default: 'h-2',
        lg: 'h-3',
        xl: 'h-4',
      },
      variant: {
        default: 'bg-secondary',
        success: 'bg-green-200',
        warning: 'bg-yellow-200',
        error: 'bg-red-200',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
)

const progressIndicatorVariants = cva(
  'h-full w-full flex-1 transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        success: 'bg-green-600',
        warning: 'bg-yellow-600',
        error: 'bg-red-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  /** Progress value (0-100) */
  value?: number
  /** Maximum value (default: 100) */
  max?: number
  /** Show percentage text */
  showPercentage?: boolean
  /** Indeterminate state (animated loading) */
  indeterminate?: boolean
  /** Label for the progress bar */
  label?: string
  /** Custom test identifier */
  'data-testid'?: string
}

/**
 * Progress Component
 * 
 * Displays progress for tasks, file uploads, form completion, etc.
 * Includes comprehensive accessibility features and visual feedback.
 * 
 * @param props - Progress component props
 * @returns JSX.Element
 */
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({
    className,
    value = 0,
    max = 100,
    size,
    variant,
    showPercentage = false,
    indeterminate = false,
    label,
    'data-testid': testId,
    ...props
  }, ref) => {
    // Calculate percentage for display and accessibility
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    const progressValue = indeterminate ? undefined : value
    const progressMax = indeterminate ? undefined : max

    return (
      <div className="space-y-2">
        {/* Progress label and percentage */}
        {(label || showPercentage) && (
          <div className="flex justify-between items-center text-sm">
            {label && (
              <span className="font-medium text-foreground">{label}</span>
            )}
            {showPercentage && !indeterminate && (
              <span className="text-muted-foreground">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}

        {/* Progress bar container */}
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={progressValue}
          aria-valuemin={0}
          aria-valuemax={progressMax}
          aria-valuetext={
            indeterminate 
              ? 'Loading...' 
              : `${Math.round(percentage)}% complete`
          }
          aria-label={label || 'Progress indicator'}
          className={cn(progressVariants({ size, variant }), className)}
          data-testid={testId}
          {...props}
        >
          {/* Progress indicator */}
          {indeterminate ? (
            // Indeterminate animation
            <div
              className={cn(
                progressIndicatorVariants({ variant }),
                'animate-pulse'
              )}
              style={{
                background: `linear-gradient(
                  90deg,
                  transparent,
                  currentColor,
                  transparent
                )`,
                animation: 'progress-indeterminate 1.5s ease-in-out infinite',
              }}
            />
          ) : (
            // Determinate progress
            <div
              className={cn(progressIndicatorVariants({ variant }))}
              style={{
                transform: `translateX(-${100 - percentage}%)`,
              }}
            />
          )}
        </div>
      </div>
    )
  }
)

Progress.displayName = 'Progress'

export { Progress, progressVariants }