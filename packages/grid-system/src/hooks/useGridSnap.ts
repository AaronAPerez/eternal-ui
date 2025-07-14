import { useState, useCallback, useMemo } from 'react'
import { GridConfig, SnapResult, Position, ElementSize } from '../types'

export interface UseGridSnapReturn {
  gridConfig: GridConfig
  updateGridConfig: (updates: Partial<GridConfig>) => void
  toggleGrid: () => void
  calculateSnapPosition: (position: Position, elementSize: ElementSize) => SnapResult
  responsiveGridSize: number
  setCanvasDimensions: (dimensions: { width: number; height: number }) => void
  gridMetrics: GridMetrics
  isSnapping: boolean
}

export interface GridMetrics {
  totalWidth: number
  totalHeight: number
  cellWidth: number
  cellHeight: number
  columnWidth: number
  rowHeight: number
}

export function useGridSnap(): UseGridSnapReturn {
  const [gridConfig, setGridConfig] = useState<GridConfig>({
    enabled: true,
    visible: true,
    columns: 12,
    rows: 8,
    gap: 16,
    cellSize: 40,
    color: '#3B82F6',
    opacity: 0.3,
    snapEnabled: true,
    snapThreshold: 10,
    showLabels: true,
    showGuides: true,
    magneticSnap: true,
    type: 'standard'
  })

  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 })
  const [isSnapping, setIsSnapping] = useState(false)

  const updateGridConfig = useCallback((updates: Partial<GridConfig>) => {
    setGridConfig(prev => ({ ...prev, ...updates }))
  }, [])

  const toggleGrid = useCallback(() => {
    setGridConfig(prev => ({ ...prev, visible: !prev.visible }))
  }, [])

  // Calculate grid metrics
  const gridMetrics = useMemo((): GridMetrics => {
    const { columns, rows, gap, cellSize } = gridConfig
    const totalWidth = columns * cellSize + (columns - 1) * gap
    const totalHeight = rows * cellSize + (rows - 1) * gap
    
    return {
      totalWidth,
      totalHeight,
      cellWidth: cellSize,
      cellHeight: cellSize,
      columnWidth: cellSize + gap,
      rowHeight: cellSize + gap
    }
  }, [gridConfig])

  // Enhanced snap calculation with magnetic behavior
  const calculateSnapPosition = useCallback((
    position: Position, 
    elementSize: ElementSize
  ): SnapResult => {
    if (!gridConfig.snapEnabled) {
      return { position, snapped: false, snapType: 'none', gridCell: position, distance: 0 }
    }

    const { columnWidth, rowHeight } = gridMetrics
    const { snapThreshold, magneticSnap } = gridConfig

    // Calculate nearest grid positions
    const nearestGridX = Math.round(position.x / columnWidth) * columnWidth
    const nearestGridY = Math.round(position.y / rowHeight) * rowHeight

    const distanceX = Math.abs(position.x - nearestGridX)
    const distanceY = Math.abs(position.y - nearestGridY)
    const totalDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

    // Enhanced magnetic snapping
    let threshold = snapThreshold
    if (magneticSnap) {
      // Increase threshold when close to grid lines
      const proximityMultiplier = Math.max(1, 3 - (totalDistance / snapThreshold))
      threshold = snapThreshold * proximityMultiplier
    }

    const shouldSnapX = distanceX <= threshold
    const shouldSnapY = distanceY <= threshold

    const finalPosition = {
      x: shouldSnapX ? nearestGridX : position.x,
      y: shouldSnapY ? nearestGridY : position.y
    }

    const snapped = shouldSnapX || shouldSnapY
    const snapType = shouldSnapX && shouldSnapY ? 'corner' : 
                    shouldSnapX ? 'vertical' : 
                    shouldSnapY ? 'horizontal' : 'none'

    // Trigger snapping state for visual feedback
    if (snapped !== isSnapping) {
      setIsSnapping(snapped)
    }

    return {
      position: finalPosition,
      snapped,
      snapType,
      gridCell: {
        x: Math.floor(finalPosition.x / columnWidth),
        y: Math.floor(finalPosition.y / rowHeight)
      },
      distance: totalDistance
    }
  }, [gridConfig, gridMetrics, isSnapping])

  // Responsive grid size based on canvas dimensions
  const responsiveGridSize = useMemo(() => {
    if (canvasDimensions.width < 768) return 20 // Mobile
    if (canvasDimensions.width < 1024) return 30 // Tablet
    return gridConfig.cellSize // Desktop
  }, [canvasDimensions.width, gridConfig.cellSize])

  return {
    gridConfig,
    updateGridConfig,
    toggleGrid,
    calculateSnapPosition,
    responsiveGridSize,
    setCanvasDimensions,
    gridMetrics,
    isSnapping
  }
}