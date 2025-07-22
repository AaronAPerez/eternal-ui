import React from 'react'
import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { BaseComponentProps } from '@/types/component'

const containerVariants = cva(
  ['mx-auto px-4'],
  {
    variants: {
      size: {
        sm: 'max-w-2xl',
        md: 'max-w-4xl', 
        lg: 'max-w-6xl',
        xl: 'max-w-7xl',
        full: 'max-w-full',
        none: 'max-w-none'
      },
      padding: {
        none: 'px-0',
        sm: 'px-4',
        md: 'px-6',
        lg: 'px-8'
      }
    },
    defaultVariants: {
      size: 'lg',
      padding: 'md'
    }
  }
)

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants>,
    BaseComponentProps {}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size, padding }), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'

export default Container