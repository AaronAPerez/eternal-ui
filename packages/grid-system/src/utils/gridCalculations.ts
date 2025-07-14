import { GridConfig, Position, ElementSize } from '../types'

export function calculateGridDimensions(config: GridConfig) {
  const { columns, rows, cellSize, gap } = config
  
  return {
    totalWidth: columns * cellSize + (columns - 1) * gap,
    totalHeight: rows * cellSize + (rows - 1) * gap,
    cellWidth: cellSize,
    cellHeight: cellSize,
    columnWidth: cellSize + gap,
    rowHeight: cellSize + gap
  }
}

export function positionToGridCell(
  position: Position, 
  gridMetrics: ReturnType<typeof calculateGridDimensions>
) {
  return {
    column: Math.floor(position.x / gridMetrics.columnWidth),
    row: Math.floor(position.y / gridMetrics.rowHeight)
  }
}

export function gridCellToPosition(
  column: number, 
  row: number, 
  gridMetrics: ReturnType<typeof calculateGridDimensions>
) {
  return {
    x: column * gridMetrics.columnWidth,
    y: row * gridMetrics.rowHeight
  }
}

export function calculateOptimalGridSize(
  canvasWidth: number, 
  canvasHeight: number, 
  targetColumns: number = 12
) {
  const gap = 16
  const cellSize = Math.floor((canvasWidth - (targetColumns - 1) * gap) / targetColumns)
  const rows = Math.floor(canvasHeight / (cellSize + gap))
  
  return {
    columns: targetColumns,
    rows: Math.max(4, rows),
    cellSize: Math.max(20, cellSize),
    gap
  }
}

// Golden ratio grid calculations
export function calculateGoldenRatioGrid(
  containerWidth: number, 
  containerHeight: number
) {
  const goldenRatio = 1.618
  const columns = 13 // Fibonacci number
  const gap = 16
  
  // Calculate cell sizes based on golden ratio
  const majorCellWidth = (containerWidth - (columns - 1) * gap) / (columns * goldenRatio)
  const minorCellWidth = majorCellWidth * goldenRatio
  
  return {
    columns,
    rows: Math.floor(containerHeight / (majorCellWidth + gap)),
    majorCellWidth,
    minorCellWidth,
    gap
  }
}