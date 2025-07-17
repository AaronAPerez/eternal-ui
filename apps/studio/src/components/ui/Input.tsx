import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, type BuilderComponentProps, setDisplayName } from '@eternal-ui/core/src/lib/utils'

const inputVariants = cva(
  [
    'flex w-full rounded-md border border-gray-200',
    'bg-white px-3 py-2 text-sm',
    'transition-colors duration-200',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-gray-500',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50'
  ],
  {
    variants: {
      variant: {
        default: 'border-gray-200 focus-visible:border-blue-500',
        error: 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500',
        success: 'border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500'
      },
      inputSize: {
        default: 'h-10',
        sm: 'h-9 text-xs',
        lg: 'h-11 text-base'
      }
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default'
    }
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    BuilderComponentProps {
  variant?: 'default' | 'error' | 'success'
  inputSize?: 'default' | 'sm' | 'lg'
  label?: string
  error?: string
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant = 'default', 
    inputSize = 'default', 
    type = 'text',
    id,
    label,
    error,
    helperText,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const errorId = error ? `${inputId}-error` : undefined
    const helperTextId = helperText ? `${inputId}-helper` : undefined
    
    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        
        <input
          type={type}
          className={cn(inputVariants({ variant: error ? 'error' : variant, inputSize }), className)}
          ref={ref}
          id={inputId}
          data-builder-id={id}
          data-builder-type="input"
          data-builder-editable={true}
          aria-describedby={cn(errorId, helperTextId)}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        />
        
        {error && (
          <p id={errorId} className="text-sm text-red-600">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={helperTextId} className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

export { Input, inputVariants }
export default setDisplayName(Input, 'Input')