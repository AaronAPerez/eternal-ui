/**
 * GridItem - Individual grid cell component
 * Provides flexible grid item positioning and spanning capabilities
 */

import { forwardRef } from 'react'
import { cn, generateSpanClasses } from '../utils'
import type { GridItemProps } from '../types'

const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({
    children,
    span,
    start,
    end,
    rowSpan,
    rowStart,
    rowEnd,
    className,
    as: Component = 'div',
    role = 'gridcell',
    ...props
  }, ref) => {
    
    const itemClasses = [
      // Base grid item styles
      'min-w-0', // Prevent overflow issues
    ]

    // Add span classes
    if (span) {
      itemClasses.push(...generateSpanClasses(span, 'col-span'))
    }
    
    if (rowSpan) {
      itemClasses.push(...generateSpanClasses(rowSpan, 'row-span'))
    }

    // Add position classes
    if (start) {
      itemClasses.push(...generatePositionClasses(start, 'col-start'))
    }
    
    if (end) {
      itemClasses.push(...generatePositionClasses(end, 'col-end'))
    }
    
    if (rowStart) {
      itemClasses.push(...generatePositionClasses(rowStart, 'row-start'))
    }
    
    if (rowEnd) {
      itemClasses.push(...generatePositionClasses(rowEnd, 'row-end'))
    }

    return (
      <Component
        ref={ref}
        className={cn(itemClasses, className)}
        role={role}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

GridItem.displayName = 'GridItem'

export { GridItem }
