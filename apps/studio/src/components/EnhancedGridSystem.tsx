/**
 * Enhanced Grid System Component
 * Provides visual grid overlay and responsive design capabilities
 */

'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface EnhancedGridSystemProps {
  children: React.ReactNode
  columns?: number
  gap?: string
  showOverlay?: boolean
  overlayVisibility?: 'always' | 'on-hover' | 'never'
  studioMode?: boolean
  className?: string
}

export function EnhancedGridSystem({
  children,
  columns = 12,
  gap = '4',
  showOverlay = false,
  overlayVisibility = 'on-hover',
  studioMode = false,
  className
}: EnhancedGridSystemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showGrid, setShowGrid] = useState(false)

  useEffect(() => {
    if (overlayVisibility === 'always') {
      setShowGrid(true)
    } else if (overlayVisibility === 'on-hover') {
      setShowGrid(isHovered)
    } else {
      setShowGrid(false)
    }
  }, [overlayVisibility, isHovered])

  // Generate grid column lines
  const gridLines = Array.from({ length: columns + 1 }, (_, i) => i)

  return (
    <div
      className={cn(
        'relative w-full',
        `grid grid-cols-${columns} gap-${gap}`,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Grid Overlay */}
      {(showOverlay || showGrid) && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Vertical grid lines */}
          {gridLines.map((line, index) => (
            <div
              key={`vertical-${index}`}
              className="absolute top-0 bottom-0 w-px bg-blue-200 opacity-30"
              style={{
                left: `${(index / columns) * 100}%`
              }}
            />
          ))}
          
          {/* Horizontal grid lines every 20px */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(to bottom, #3b82f6 1px, transparent 1px)',
              backgroundSize: '1px 20px'
            }}
          />
          
          {/* Grid info overlay (studio mode only) */}
          {studioMode && showGrid && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-lg">
              {columns} Columns • {gap} Gap
            </div>
          )}
        </div>
      )}

      {/* Content */}
      {children}

      {/* Studio Mode Controls */}
      {studioMode && (
        <div className="absolute bottom-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={cn(
              'px-2 py-1 text-xs rounded shadow-lg transition-colors',
              showGrid 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-700 border border-gray-300'
            )}
          >
            Grid {showGrid ? 'ON' : 'OFF'}
          </button>
        </div>
      )}
    </div>
  )
}