/**
 * Flex - Flexible layout component
 * Provides comprehensive flexbox layout capabilities
 */

import { forwardRef } from 'react'
import { cn, generateGapClasses } from '../utils'
import type { FlexProps } from '../types'

const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({
    children,
    direction = 'row',
    justify = 'start',
    align = 'stretch',
    wrap = 'wrap',
    gap,
    className,
    as: Component = 'div',
    ...props
  }, ref) => {
    
    const flexClasses = [
      'flex',
    ]

    // Flex direction with responsive support
    if (typeof direction === 'object') {
      Object.entries(direction).forEach(([breakpoint, dir]) => {
        if (dir) {
          if (breakpoint === 'base') {
            flexClasses.push(`flex-${dir}`)
          } else {
            flexClasses.push(`${breakpoint}:flex-${dir}`)
          }
        }
      })
    } else {
      flexClasses.push(`flex-${direction}`)
    }

    // Justify content
    switch (justify) {
      case 'start':
        flexClasses.push('justify-start')
        break
      case 'center':
        flexClasses.push('justify-center')
        break
      case 'end':
        flexClasses.push('justify-end')
        break
      case 'between':
        flexClasses.push('justify-between')
        break
      case 'around':
        flexClasses.push('justify-around')
        break
      case 'evenly':
        flexClasses.push('justify-evenly')
        break
    }

    // Align items
    switch (align) {
      case 'start':
        flexClasses.push('items-start')
        break
      case 'center':
        flexClasses.push('items-center')
        break
      case 'end':
        flexClasses.push('items-end')
        break
      case 'stretch':
        flexClasses.push('items-stretch')
        break
      case 'baseline':
        flexClasses.push('items-baseline')
        break
    }

    // Flex wrap
    switch (wrap) {
      case 'wrap':
        flexClasses.push('flex-wrap')
        break
      case 'nowrap':
        flexClasses.push('flex-nowrap')
        break
      case 'wrap-reverse':
        flexClasses.push('flex-wrap-reverse')
        break
    }

    // Gap between items
    if (gap) {
      flexClasses.push(...generateGapClasses(gap, 'gap'))
    }

    return (
      <Component
        ref={ref}
        className={cn(flexClasses, className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Flex.displayName = 'Flex'

export { Flex }

// Helper function for position classes (used in utilities)
function generatePositionClasses(
  position: any,
  type: 'col-start' | 'col-end' | 'row-start' | 'row-end'
): string[] {
  const classes: string[] = []
  
  if (typeof position === 'object' && position !== null) {
    Object.entries(position).forEach(([breakpoint, value]) => {
      if (value) {
        if (breakpoint === 'base') {
          classes.push(`${type}-${value}`)
        } else {
          classes.push(`${breakpoint}:${type}-${value}`)
        }
      }
    })
  } else if (position) {
    classes.push(`${type}-${position}`)
  }
  
  return classes
}