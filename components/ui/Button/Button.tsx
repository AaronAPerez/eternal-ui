// src/components/ui/Button/Button.tsx

 /* 🎭 BUTTON COMPONENT - CLIENT COMPONENT FIX
 * 
 * Fixed: Added 'use client' directive for interactivity
 */
'use client'

import React, { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// Button variants system
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'whitespace-nowrap rounded-md text-sm font-medium',
    'ring-offset-background transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'relative overflow-hidden group',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary text-primary-foreground',
          'hover:bg-primary/90',
          'shadow-md hover:shadow-lg',
          'transform hover:-translate-y-0.5',
          'transition-all duration-200',
        ],
        secondary: [
          'bg-secondary text-secondary-foreground',
          'hover:bg-secondary/80',
          'border border-input',
          'shadow-sm hover:shadow-md',
        ],
        destructive: [
          'bg-destructive text-destructive-foreground',
          'hover:bg-destructive/90',
          'shadow-md hover:shadow-lg',
          'hover:shadow-destructive/25',
        ],
        outline: [
          'border border-input bg-background',
          'hover:bg-accent hover:text-accent-foreground',
          'shadow-sm hover:shadow-md',
        ],
        ghost: [
          'hover:bg-accent hover:text-accent-foreground',
          'transition-colors duration-200',
        ],
        link: [
          'text-primary underline-offset-4',
          'hover:underline',
          'transition-all duration-200',
        ],
        gradient: [
          'bg-gradient-to-r from-purple-500 to-pink-500',
          'hover:from-purple-600 hover:to-pink-600',
          'text-white shadow-lg hover:shadow-xl',
          'transform hover:scale-105',
        ],
        glass: [
          'bg-white/10 backdrop-blur-lg border border-white/20',
          'text-white hover:bg-white/20',
          'shadow-xl hover:shadow-2xl',
        ],
        neon: [
          'bg-black border-2 border-cyan-400 text-cyan-400',
          'hover:bg-cyan-400 hover:text-black',
          'shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/75',
          'transition-all duration-300',
        ],
      },
      size: {
        xs: 'h-6 px-2 text-xs',
        sm: 'h-8 px-3 text-sm',
        md: 'h-9 px-4 py-2',
        lg: 'h-10 px-6',
        xl: 'h-12 px-8 text-lg',
        icon: 'h-9 w-9',
      },
      glow: {
        true: 'shadow-lg shadow-primary/25 hover:shadow-primary/40',
      },
      floating: {
        true: 'hover:-translate-y-1 hover:shadow-xl',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        glow: true,
        class: 'shadow-primary/30 hover:shadow-primary/50',
      },
      {
        variant: 'destructive', 
        glow: true,
        class: 'shadow-destructive/30 hover:shadow-destructive/50',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  asChild?: boolean
  loadingText?: string
  pulse?: boolean
  'data-testid'?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      glow,
      floating,
      fullWidth,
      loading = false,
      disabled,
      icon,
      iconPosition = 'left',
      asChild = false,
      loadingText,
      pulse = false,
      children,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isDisabled = disabled || loading
    
    const loadingSpinner = loading && (
      <Loader2 
        className="h-4 w-4 animate-spin" 
        aria-hidden="true"
        data-testid={testId ? `${testId}-loading-spinner` : undefined}
      />
    )
    
    const renderIcon = () => {
      if (!icon || loading) return null
      
      return (
        <span 
          className="flex-shrink-0 transition-transform group-hover:scale-110" 
          aria-hidden="true"
          data-testid={testId ? `${testId}-icon` : undefined}
        >
          {icon}
        </span>
      )
    }
    
    const renderContent = () => {
      if (loading) {
        return (
          <>
            {loadingSpinner}
            <span className="relative z-10">
              {loadingText || children}
            </span>
          </>
        )
      }
      
      if (iconPosition === 'left') {
        return (
          <>
            {renderIcon()}
            <span className="relative z-10">{children}</span>
          </>
        )
      }
      
      return (
        <>
          <span className="relative z-10">{children}</span>
          {renderIcon()}
        </>
      )
    }
    
    const shimmerEffect = (
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    )
    
    const pulseAnimation = pulse ? 'animate-pulse' : ''
    
    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ 
            variant, 
            size, 
            glow, 
            floating, 
            fullWidth 
          }),
          pulseAnimation,
          className
        )}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        data-testid={testId}
        {...props}
      >
        {!asChild && shimmerEffect}
        {renderContent()}
      </Comp>
    )
  }
)

Button.displayName = 'Button'
export { buttonVariants }
