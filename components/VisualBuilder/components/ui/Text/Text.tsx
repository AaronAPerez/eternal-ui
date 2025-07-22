import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { BaseComponentProps } from '@/types/component'

const textVariants = cva(
  [''],
  {
    variants: {
      variant: {
        h1: 'text-4xl md:text-6xl font-bold tracking-tight',
        h2: 'text-3xl md:text-5xl font-bold tracking-tight',
        h3: 'text-2xl md:text-4xl font-bold tracking-tight',
        h4: 'text-xl md:text-3xl font-semibold',
        h5: 'text-lg md:text-2xl font-semibold',
        h6: 'text-base md:text-xl font-semibold',
        body: 'text-base leading-relaxed',
        large: 'text-lg md:text-xl leading-relaxed',
        small: 'text-sm leading-relaxed',
        caption: 'text-xs text-muted-foreground',
        code: 'font-mono text-sm bg-muted px-1 py-0.5 rounded'
      },
      color: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        primary: 'text-primary',
        success: 'text-green-600 dark:text-green-400',
        warning: 'text-yellow-600 dark:text-yellow-400',
        danger: 'text-red-600 dark:text-red-400'
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify'
      },
      weight: {
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold'
      }
    },
    defaultVariants: {
      variant: 'body',
      color: 'default',
      align: 'left',
      weight: 'normal'
    }
  }
)

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof textVariants>,
    BaseComponentProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  gradient?: boolean
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ className, variant, color, align, weight, as, gradient, children, ...props }, ref) => {
    // Determine the HTML element to render
    const Component = as || (variant?.startsWith('h') ? variant as 'h1' : 'p') as any
    
    return (
      <Component
        ref={ref}
        className={cn(
          textVariants({ variant, color, align, weight }),
          gradient && 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Text.displayName = 'Text'