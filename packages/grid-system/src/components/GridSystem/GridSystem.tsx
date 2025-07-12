import React, { useRef, useEffect, useCallback } from 'react'
import { clsx } from 'clsx'
import type { GridConfig, Position } from '@/types'
import { useGridSnap } from '@/hooks'
import { GridOverlay } from '../GridOverlay'
import { GridControls } from '../GridControls'

interface GridSystemProps {
  /** Initial grid configuration */
  initialConfig?: Partial<GridConfig>
  /** Canvas container ref for dimension tracking */
  canvasRef?: React.RefObject<HTMLDivElement> // FIXED: Changed from HTMLElement to HTMLDivElement
  /** Show grid controls panel */
  showControls?: boolean
  /** Controls panel position */
  controlsPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  /** Component selection handler for drag operations */
  onComponentDrag?: (elementId: string, position: Position) => void
  /** Optional className for canvas container */
  className?: string
  /** Children to render inside the canvas */
  children?: React.ReactNode
}

/**
 * Main Grid System component that integrates overlay and controls
 * Provides complete grid functionality for visual builders
 */
export const GridSystem: React.FC<GridSystemProps> = ({
  initialConfig,
  canvasRef: externalCanvasRef,
  showControls = true,
  controlsPosition = 'top-right',
  onComponentDrag,
  className = '',
  children,
}) => {
  // FIXED: Use HTMLDivElement type for internal ref
  const internalCanvasRef = useRef<HTMLDivElement>(null)
  const canvasRef = externalCanvasRef || internalCanvasRef

  const {
    gridConfig,
    gridState,
    responsiveGridSize,
    canvasDimensions,
    updateGridConfig,
    toggleGrid,
    calculateSnap,
    updateCanvasDimensions,
    setDragging,
  } = useGridSnap(initialConfig)

  /**
   * Update canvas dimensions on mount and resize
   */
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect()
        updateCanvasDimensions({ width, height })
      }
    }

    updateDimensions()
    
    const resizeObserver = new ResizeObserver(updateDimensions)
    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [canvasRef, updateCanvasDimensions])

  /**
   * Handle drag start for canvas elements
   */
  const handleDragStart = useCallback((e: React.DragEvent) => {
    setDragging(true)
    
    // Add drag data if element has data attributes
    const target = e.target as HTMLElement
    const elementId = target.dataset.elementId
    
    if (elementId) {
      e.dataTransfer.setData('application/json', JSON.stringify({
        type: 'canvas-element',
        elementId,
      }))
    }
  }, [setDragging])

  /**
   * Handle drag end
   */
  const handleDragEnd = useCallback(() => {
    setDragging(false)
  }, [setDragging])

  /**
   * Handle drop with snap calculations
   */
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    
    if (!canvasRef.current || !onComponentDrag) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const rawPosition: Position = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    
    // Calculate snap position
    const snapResult = calculateSnap(rawPosition, { width: 100, height: 60 })
    
    try {
      const dragData = JSON.parse(e.dataTransfer.getData('application/json'))
      
      if (dragData.type === 'canvas-element' || dragData.type === 'component') {
        onComponentDrag(dragData.elementId || dragData.componentId, snapResult.position)
        
        // Provide haptic feedback for snaps
        if (snapResult.snapped && 'vibrate' in navigator) {
          navigator.vibrate(10)
        }
      }
    } catch (error) {
      console.warn('Failed to parse drop data:', error)
    }
  }, [canvasRef, onComponentDrag, calculateSnap, setDragging])

  /**
   * Handle drag over for drop zone
   */
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }, [])

  /**
   * Get controls positioning classes
   */
  const getControlsClasses = () => {
    const baseClasses = 'absolute z-20'
    
    switch (controlsPosition) {
      case 'top-left':
        return `${baseClasses} top-4 left-4`
      case 'top-right':
        return `${baseClasses} top-4 right-4`
      case 'bottom-left':
        return `${baseClasses} bottom-4 left-4`
      case 'bottom-right':
        return `${baseClasses} bottom-4 right-4`
      default:
        return `${baseClasses} top-4 right-4`
    }
  }

  return (
    <div className="relative w-full h-full">
      {/* Main canvas container */}
      <div
        ref={canvasRef} // FIXED: Now properly typed as HTMLDivElement
        className={clsx(
          'relative w-full h-full overflow-hidden',
          'bg-white border border-gray-200',
          className
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        role="application"
        aria-label="Design canvas with grid system"
        data-testid="grid-canvas"
      >
        {/* Grid overlay */}
        <GridOverlay
          config={gridConfig}
          canvasWidth={canvasDimensions.width}
          canvasHeight={canvasDimensions.height}
          gridSize={responsiveGridSize}
        />

        {/* Canvas content */}
        {children}
      </div>

      {/* Grid controls */}
      {showControls && (
        <GridControls
          config={gridConfig}
          onConfigUpdate={updateGridConfig}
          onToggle={toggleGrid}
          className={getControlsClasses()}
        />
      )}
    </div>
  )
}

GridSystem.displayName = 'GridSystem'

// Export types
export type { GridSystemProps }