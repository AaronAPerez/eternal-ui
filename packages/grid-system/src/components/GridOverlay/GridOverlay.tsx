import React, { memo } from 'react'
import type { GridConfig, CanvasDimensions } from '@/types'
import { generateGridLines } from '@/utils'

export interface GridOverlayProps {
  /** Grid configuration */
  config: GridConfig
  /** Canvas dimensions */
  canvasWidth: number
  canvasHeight: number
  /** Optional responsive grid size override */
  gridSize?: number
  /** Accessibility label for screen readers */
  'aria-label'?: string
  /** Optional className for styling */
  className?: string
}

/**
 * Grid overlay component that renders visual grid lines
 * Provides visual guidance for component positioning
 * Supports responsive grid sizing and customizable appearance
 */
export const GridOverlay = memo<GridOverlayProps>(({
  config,
  canvasWidth,
  canvasHeight,
  gridSize,
  'aria-label': ariaLabel = 'Grid overlay for component positioning',
  className = '',
}) => {
  const effectiveGridSize = gridSize || config.size

  // Skip rendering if grid is disabled or dimensions are invalid
  if (!config.enabled || canvasWidth <= 0 || canvasHeight <= 0) {
    return null
  }

  // Generate grid lines
  const { vertical, horizontal } = generateGridLines(
    { width: canvasWidth, height: canvasHeight },
    effectiveGridSize
  )

  return (
    <svg
      className={`absolute inset-0 pointer-events-none z-10 ${className}`}
      width={canvasWidth}
      height={canvasHeight}
      aria-label={ariaLabel}
      role="img"
      data-testid="grid-overlay"
    >
      <defs>
        {/* Pattern definition for optimized rendering */}
        <pattern
          id="grid-pattern"
          x={0}
          y={0}
          width={effectiveGridSize}
          height={effectiveGridSize}
          patternUnits="userSpaceOnUse"
        >
          <rect
            width={effectiveGridSize}
            height={effectiveGridSize}
            fill="none"
            stroke={config.color}
            strokeWidth={1}
            opacity={config.opacity}
          />
        </pattern>
      </defs>

      {/* Render grid using pattern for better performance */}
      <rect
        width="100%"
        height="100%"
        fill="url(#grid-pattern)"
        data-testid="grid-pattern"
      />

      {/* Add grid origin indicator */}
      <circle
        cx={0}
        cy={0}
        r={3}
        fill={config.color}
        opacity={config.opacity * 2}
        data-testid="grid-origin"
      />
    </svg>
  )
})

GridOverlay.displayName = 'GridOverlay'