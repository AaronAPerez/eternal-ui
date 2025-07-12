/**
 * Container - Responsive container component
 * Provides consistent max-width and padding across breakpoints
 */

import { forwardRef } from 'react'
import { cn, generateGapClasses } from '../utils'
import type { ContainerProps } from '../types'

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({
    children,
    maxWidth = 'xl',
    center = true,
    px = '4',
    py,
    className,
    as: Component = 'div',
    ...props
  }, ref) => {
    
    const containerClasses = [
      'w-full',
    ]

    // Max width classes
    if (maxWidth !== 'none') {
      containerClasses.push(`max-w-${maxWidth}`)
    }

    // Center horizontally
    if (center) {
      containerClasses.push('mx-auto')
    }

    // Padding classes
    if (px) {
      containerClasses.push(...generateGapClasses(px, 'px' as any))
    }
    
    if (py) {
      containerClasses.push(...generateGapClasses(py, 'py' as any))
    }

    return (
      <Component
        ref={ref}
        className={cn(containerClasses, className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Container.displayName = 'Container'

export { Container }