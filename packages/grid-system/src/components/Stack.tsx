/**
 * Stack - Vertical layout component
 * Provides consistent vertical spacing between child elements
 */

import { forwardRef } from 'react'
import { cn, generateGapClasses } from '../utils'
import type { StackProps } from '../types'

const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({
    children,
    space = '4',
    align = 'stretch',
    justify = 'start',
    className,
    as: Component = 'div',
    ...props
  }, ref) => {
    
    const stackClasses = [
      'flex',
      'flex-col',
    ]

    // Spacing between items
    if (space) {
      stackClasses.push(...generateGapClasses(space, 'gap'))
    }

    // Horizontal alignment
    switch (align) {
      case 'start':
        stackClasses.push('items-start')
        break
      case 'center':
        stackClasses.push('items-center')
        break
      case 'end':
        stackClasses.push('items-end')
        break
      case 'stretch':
        stackClasses.push('items-stretch')
        break
    }

    // Vertical alignment
    switch (justify) {
      case 'start':
        stackClasses.push('justify-start')
        break
      case 'center':
        stackClasses.push('justify-center')
        break
      case 'end':
        stackClasses.push('justify-end')
        break
      case 'between':
        stackClasses.push('justify-between')
        break
      case 'around':
        stackClasses.push('justify-around')
        break
      case 'evenly':
        stackClasses.push('justify-evenly')
        break
    }

    return (
      <Component
        ref={ref}
        className={cn(stackClasses, className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Stack.displayName = 'Stack'

export { Stack }