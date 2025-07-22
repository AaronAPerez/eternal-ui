/**
 * 🔘 TOGGLE COMPONENT
 * 
 * Accessible toggle switch with:
 * - Smooth animations
 * - Multiple sizes
 * - Loading states
 * - Custom colors
 * - Disabled states
 */

import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BaseComponentProps, AccessibilityProps } from '@/types/component'

/**
 * 🎨 TOGGLE VARIANTS SYSTEM
 */
const toggleVariants = cva(
  [
    // Base styles
    'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
    'transition-colors duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:cursor-not-allowed disabled:opacity-50',
    // Default state (off)
    'bg-input',
    // Checked state (on)
    'data-[state=checked]:bg-primary',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-7',
        md: 'h-5 w-9',
        lg: 'h-6 w-11',
        xl: 'h-7 w-12',
      },
      variant: {
        default: '',
        success: 'data-[state=checked]:bg-green-500',
        warning: 'data-[state=checked]:bg-yellow-500',
        destructive: 'data-[state=checked]:bg-destructive',
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
)

const toggleThumbVariants = cva(
  [
    // Base thumb styles
    'pointer-events-none block rounded-full bg-background shadow-lg ring-0',
    'transition-transform duration-200 ease-in-out',
    'flex items-center justify-center',
  ],
  {
    variants: {
      size: {
        sm: 'h-3 w-3 data-[state=checked]:translate-x-3',
        md: 'h-4 w-4 data-[state=checked]:translate-x-4', 
        lg: 'h-5 w-5 data-[state=checked]:translate-x-5',
        xl: 'h-6 w-6 data-[state=checked]:translate-x-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

/**
 * 🧬 TOGGLE PROPS INTERFACE
 */
export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof toggleVariants>,
    BaseComponentProps,
    AccessibilityProps {
  
  /** Whether the toggle is checked */
  checked?: boolean
  
  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean
  
  /** Change handler */
  onChange?: (checked: boolean) => void
  
  /** Loading state */
  loading?: boolean
  
  /** Label text */
  label?: string
  
  /** Description text */
  description?: string
  
  /** Custom icons for checked/unchecked states */
  icons?: {
    checked?: React.ReactNode
    unchecked?: React.ReactNode
  }
  
  /** Whether to show the label inline */
  inline?: boolean
}

/**
 * 🔘 TOGGLE COMPONENT
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      size,
      variant,
      checked,
      defaultChecked = false,
      onChange,
      loading = false,
      disabled,
      label,
      description,
      icons,
      inline = false,
      'data-testid': testId,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    ref
  ) => {
    // Internal state for uncontrolled usage
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
    
    // Determine if controlled or uncontrolled
    const isControlled = checked !== undefined
    const isChecked = isControlled ? checked : internalChecked
    
    // Handle toggle
    const handleToggle = () => {
      if (disabled || loading) return
      
      const newChecked = !isChecked
      
      if (!isControlled) {
        setInternalChecked(newChecked)
      }
      
      onChange?.(newChecked)
    }
    
    // Handle keyboard interaction
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        handleToggle()
      }
    }
    
    // Icon rendering
    const renderIcon = () => {
      if (loading) {
        return <Loader2 className="h-2 w-2 animate-spin" />
      }
      
      if (icons) {
        return isChecked ? icons.checked : icons.unchecked
      }
      
      return null
    }
    
    // Wrapper classes for layout
    const wrapperClasses = cn(
      'flex gap-3',
      inline ? 'items-center' : 'flex-col space-y-2'
    )
    
    const toggleButton = (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-label={ariaLabel || label}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        data-state={isChecked ? 'checked' : 'unchecked'}
        data-testid={testId}
        className={cn(toggleVariants({ size, variant }), className)}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled || loading}
        {...props}
      >
        <span
          className={toggleThumbVariants({ size })}
          data-state={isChecked ? 'checked' : 'unchecked'}
        >
          {renderIcon()}
        </span>
      </button>
    )
    
    // If no label, return just the toggle
    if (!label && !description) {
      return toggleButton
    }
    
    // Return toggle with label and description
    return (
      <div className={wrapperClasses}>
        {toggleButton}
        
        <div className="space-y-1">
          {label && (
            <label
              className={cn(
                'text-sm font-medium leading-none cursor-pointer',
                disabled && 'cursor-not-allowed opacity-70'
              )}
              onClick={!disabled ? handleToggle : undefined}
            >
              {label}
            </label>
          )}
          
          {description && (
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Toggle.displayName = 'Toggle'

// Export variants
export { toggleVariants, toggleThumbVariants }

/**
 * 📚 USAGE EXAMPLES
 */

/*
// Basic Toggle
const [enabled, setEnabled] = useState(false)

<Toggle
  checked={enabled}
  onChange={setEnabled}
  label="Enable notifications"
  description="Receive email notifications about your account activity"
/>

// Inline Toggle
<Toggle
  checked={darkMode}
  onChange={setDarkMode}
  label="Dark Mode"
  inline
  size="lg"
/>

// Custom Icons
<Toggle
  checked={isVisible}
  onChange={setIsVisible}
  icons={{
    checked: <Eye className="h-3 w-3" />,
    unchecked: <EyeOff className="h-3 w-3" />
  }}
  label="Show password"
/>

// Different Variants
<Toggle variant="success" label="Enable feature" />
<Toggle variant="warning" label="Warning mode" />
<Toggle variant="destructive" label="Danger zone" />

// Loading State
<Toggle
  loading
  label="Saving preferences..."
  disabled
/>
*/