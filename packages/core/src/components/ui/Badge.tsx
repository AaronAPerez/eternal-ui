/**
 * Badge Component
 * 
 * A versatile badge component for status indicators, labels, and counts
 * with comprehensive accessibility features and responsive design.
 * 
 * Features:
 * - Multiple variants (default, secondary, destructive, outline)
 * - Size variations (sm, default, lg)
 * - Icon support with proper spacing
 * - Screen reader accessible
 * - Keyboard focusable when interactive
 * - Custom color support
 */

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground border-border',
        success:
          'border-transparent bg-green-100 text-green-800 hover:bg-green-200',
        warning:
          'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        info:
          'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Badge content */
  children: React.ReactNode
  /** Icon to display before text */
  icon?: React.ReactNode
  /** Icon to display after text */
  iconAfter?: React.ReactNode
  /** Makes badge interactive (focusable and clickable) */
  interactive?: boolean
  /** Accessibility label for screen readers */
  'aria-label'?: string
  /** Custom test identifier */
  'data-testid'?: string
}

/**
 * Badge Component
 * 
 * Used for status indicators, labels, counts, and categorical information.
 * Supports multiple visual variants and accessibility features.
 * 
 * @param props - Badge component props
 * @returns JSX.Element
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ 
    className, 
    variant, 
    size,
    children, 
    icon, 
    iconAfter,
    interactive = false,
    'aria-label': ariaLabel,
    'data-testid': testId,
    ...props 
  }, ref) => {
    const badgeContent = (
      <>
        {icon && (
          <span className="mr-1 inline-flex items-center" aria-hidden="true">
            {icon}
          </span>
        )}
        <span>{children}</span>
        {iconAfter && (
          <span className="ml-1 inline-flex items-center" aria-hidden="true">
            {iconAfter}
          </span>
        )}
      </>
    )

    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={ariaLabel}
        data-testid={testId}
        {...props}
      >
        {badgeContent}
      </div>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge, badgeVariants }