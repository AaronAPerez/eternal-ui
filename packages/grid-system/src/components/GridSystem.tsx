/**
 * Minimal GridSystem component that definitely works
 */

import React, { forwardRef } from 'react'
import { cn } from '../utils'
import type { GridSystemProps } from '../types'

const GridSystem = forwardRef<HTMLDivElement, GridSystemProps>(
  ({ children, columns = 12, gap = '4', className, ...props }, ref) => {
    
    const gridClasses = cn(
      'grid',
      'w-full',
      `grid-cols-${columns}`,
      `gap-${gap}`,
      className
    )

    return (
      <div
        ref={ref}
        className={gridClasses}
        role="grid"
        aria-label="Grid layout"
        {...props}
      >
        {children}
      </div>
    )
  }
)

GridSystem.displayName = 'GridSystem'

export { GridSystem }
export default GridSystem