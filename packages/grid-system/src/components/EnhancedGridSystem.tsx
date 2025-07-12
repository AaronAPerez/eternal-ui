import React, { forwardRef, useRef } from 'react'
import { GridSystem } from './GridSystem'
import { VisualGridOverlay } from './VisualGridOverlay'
import { cn } from '../utils'
import type { GridSystemProps, EnhancedGridSystemProps } from '../types'

/**
 * Enhanced GridSystem with Visual Overlay
 */
export const EnhancedGridSystem = forwardRef<HTMLDivElement, EnhancedGridSystemProps>(
  ({
    children,
    showOverlay = true,
    overlayVisibility = 'on-hover',
    overlayColor = '#3b82f6',
    studioMode = false,
    className,
    columns = 12,
    gap = '4',
    ...gridProps
  }, ref) => {
    
    const containerRef = useRef<HTMLDivElement>(null)

    // Convert gap string to pixels with proper typing
    const gapMap: Record<string, number> = {
      '0': 0, '1': 4, '2': 8, '3': 12, '4': 16, 
      '5': 20, '6': 24, '7': 28, '8': 32
    }
    const gapPixels = gapMap[gap] || 16

    return (
      <div 
        ref={containerRef}
        className={cn(
          "relative",
          studioMode && "border border-gray-300 border-dashed rounded-lg",
          className
        )}
      >
        {/* Visual Grid Overlay */}
        {showOverlay && containerRef.current && (
          <VisualGridOverlay
            containerRef={containerRef}
            columns={typeof columns === 'number' ? columns : 12}
            gap={gapPixels}
            visibility={overlayVisibility}
            gridColor={overlayColor}
          />
        )}

        {/* Main Grid System */}
        <GridSystem
          ref={ref}
          columns={columns}
          gap={gap}
          {...gridProps}
        >
          {children}
        </GridSystem>

        {/* Studio Mode Label */}
        {studioMode && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-blue-500 text-white text-xs rounded">
            Studio Mode
          </div>
        )}
      </div>
    )
  }
)

EnhancedGridSystem.displayName = 'EnhancedGridSystem'

export default EnhancedGridSystem