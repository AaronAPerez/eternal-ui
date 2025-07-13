/**
 * Alert Component
 * 
 * Displays important messages, notifications, and feedback to users
 * with comprehensive accessibility and multiple visual variants.
 * 
 * Features:
 * - Multiple variants (default, destructive, warning, success, info)
 * - Icon support with semantic meaning
 * - Dismissible alerts with proper focus management
 * - Screen reader accessible
 * - Flexible content layout
 * - Animation support
 */

import React, { useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive bg-destructive/10',
        warning:
          'border-yellow-500/50 text-yellow-900 dark:border-yellow-500 [&>svg]:text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20',
        success:
          'border-green-500/50 text-green-900 dark:border-green-500 [&>svg]:text-green-600 bg-green-50 dark:bg-green-900/20',
        info:
          'border-blue-500/50 text-blue-900 dark:border-blue-500 [&>svg]:text-blue-600 bg-blue-50 dark:bg-blue-900/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Alert content */
  children: React.ReactNode
  /** Icon to display */
  icon?: React.ReactNode
  /** Alert title */
  title?: string
  /** Makes alert dismissible */
  dismissible?: boolean
  /** Callback when alert is dismissed */
  onDismiss?: () => void
  /** Custom test identifier */
  'data-testid'?: string
}

/**
 * Alert Component
 * 
 * Used for displaying important messages, notifications, errors, and feedback.
 * Includes proper ARIA roles and keyboard interaction support.
 * 
 * @param props - Alert component props
 * @returns JSX.Element
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({
    className,
    variant,
    children,
    icon,
    title,
    dismissible = false,
    onDismiss,
    'data-testid': testId,
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = useState(true)

    const handleDismiss = () => {
      setIsVisible(false)
      onDismiss?.()
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (dismissible && (event.key === 'Escape' || event.key === 'Enter')) {
        handleDismiss()
      }
    }

    if (!isVisible) return null

    // Determine ARIA role based on variant
    const getAriaRole = () => {
      switch (variant) {
        case 'destructive':
          return 'alert'
        case 'warning':
          return 'alert'
        default:
          return 'status'
      }
    }

    return (
      <div
        ref={ref}
        role={getAriaRole()}
        aria-live={variant === 'destructive' ? 'assertive' : 'polite'}
        aria-atomic="true"
        className={cn(alertVariants({ variant }), className)}
        data-testid={testId}
        onKeyDown={handleKeyDown}
        tabIndex={dismissible ? 0 : undefined}
        {...props}
      >
        {/* Alert icon */}
        {icon && (
          <div className="absolute left-4 top-4" aria-hidden="true">
            {icon}
          </div>
        )}

        {/* Alert content */}
        <div className={cn(icon && 'pl-7')}>
          {title && (
            <AlertTitle className="mb-1">
              {title}
            </AlertTitle>
          )}
          <AlertDescription>
            {children}
          </AlertDescription>
        </div>

        {/* Dismiss button */}
        {dismissible && (
          <button
            type="button"
            className="absolute right-2 top-2 rounded-md p-2 text-foreground/50 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
            onClick={handleDismiss}
            aria-label="Dismiss alert"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    )
  }
)

Alert.displayName = 'Alert'

/**
 * AlertTitle Component
 * Displays the title of an alert with proper typography
 */
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
))

AlertTitle.displayName = 'AlertTitle'

/**
 * AlertDescription Component
 * Displays the description/content of an alert
 */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
))

AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }