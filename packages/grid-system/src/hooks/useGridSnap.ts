import { useState, useCallback, useMemo, useEffect } from 'react'
import type { GridConfig, GridState, Position, ElementSize, SnapResult, CanvasDimensions } from '../types'
import { calculateSnapPosition, calculateResponsiveGridSize, debounce } from '../utils'
import { DEFAULT_GRID_CONFIG } from '../constants'

/**
 * Custom hook for grid snap functionality
 * Manages grid state and provides snap calculations
 */
export function useGridSnap(initialConfig?: Partial<GridConfig>) {
  // Grid configuration state with defaults
  const [gridConfig, setGridConfig] = useState<GridConfig>(() => ({
    ...DEFAULT_GRID_CONFIG,
    ...initialConfig,
  }))

  // Canvas dimensions for responsive grid calculation
  const [canvasDimensions, setCanvasDimensions] = useState<CanvasDimensions>({
    width: 0,
    height: 0,
  })

  // Grid state management
  const [gridState, setGridState] = useState<GridState>({
    config: gridConfig,
    isVisible: gridConfig.enabled,
    isDragging: false,
    canvasDimensions,
  })

  /**
   * Calculate snap position with memoized configuration
   */
  const calculateSnap = useCallback(
    (position: Position, elementSize?: ElementSize): SnapResult => {
      return calculateSnapPosition(position, gridConfig, elementSize)
    },
    [gridConfig]
  )

  /**
   * Update grid configuration
   */
  const updateGridConfig = useCallback((updates: Partial<GridConfig>) => {
    setGridConfig(prev => {
      const newConfig = {
        ...prev,
        ...updates,
        snap: updates.snap ? { ...prev.snap, ...updates.snap } : prev.snap,
        breakpoints: updates.breakpoints 
          ? { ...prev.breakpoints, ...updates.breakpoints } 
          : prev.breakpoints,
      }

      // Update grid state
      setGridState(prevState => ({
        ...prevState,
        config: newConfig,
        isVisible: newConfig.enabled,
      }))

      return newConfig
    })

    return true
  }, [])

  /**
   * Toggle grid visibility
   */
  const toggleGrid = useCallback(() => {
    updateGridConfig({ enabled: !gridConfig.enabled })
  }, [gridConfig.enabled, updateGridConfig])

  /**
   * Calculate responsive grid size based on canvas width
   */
  const responsiveGridSize = useMemo(() => {
    return calculateResponsiveGridSize(canvasDimensions.width, gridConfig)
  }, [canvasDimensions.width, gridConfig])

  /**
   * Update canvas dimensions with debouncing
   */
  const updateCanvasDimensions = useCallback(
    debounce((dimensions: CanvasDimensions) => {
      setCanvasDimensions(dimensions)
      setGridState(prev => ({
        ...prev,
        canvasDimensions: dimensions,
      }))
    }, 100),
    []
  )

  /**
   * Set dragging state
   */
  const setDragging = useCallback((isDragging: boolean) => {
    setGridState(prev => ({
      ...prev,
      isDragging,
    }))
  }, [])

  return {
    // State
    gridConfig,
    gridState,
    responsiveGridSize,
    canvasDimensions,
    
    // Actions
    updateGridConfig,
    toggleGrid,
    calculateSnap,
    updateCanvasDimensions,
    setDragging,
    
    // Computed values
    isGridVisible: gridState.isVisible,
    isSnapEnabled: gridConfig.snap.enabled,
  }
}
