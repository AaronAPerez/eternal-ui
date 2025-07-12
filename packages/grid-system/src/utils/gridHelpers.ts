import type { GridConfig, CanvasDimensions } from '../types'

/**
 * Calculate responsive grid size based on canvas width
 */
export function calculateResponsiveGridSize(
  canvasWidth: number,
  gridConfig: GridConfig
): number {
  const { breakpoints, size } = gridConfig

  if (canvasWidth <= breakpoints.mobile) {
    return Math.max(size * 0.5, 10) // Smaller grid on mobile
  } else if (canvasWidth <= breakpoints.tablet) {
    return Math.max(size * 0.75, 15) // Medium grid on tablet
  }
  return size // Full size on desktop
}

/**
 * Generate grid lines for SVG rendering
 */
export function generateGridLines(
  canvasDimensions: CanvasDimensions,
  gridSize: number
): { vertical: number[]; horizontal: number[] } {
  const { width, height } = canvasDimensions
  const vertical: number[] = []
  const horizontal: number[] = []

  // Generate vertical lines
  for (let x = 0; x <= width; x += gridSize) {
    vertical.push(x)
  }

  // Generate horizontal lines
  for (let y = 0; y <= height; y += gridSize) {
    horizontal.push(y)
  }

  return { vertical, horizontal }
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
      timeout = null
    }, wait)
  }
}