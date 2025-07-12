/**
 * Main export file for the grid system package
 * Fixed JSX issues by removing inline components
 */

// Export main GridSystem component
export { GridSystem, default as GridSystemDefault } from '../../components/GridSystem'

// Export types
export type {
  GridSystemProps,
  ResponsiveValue,
  BreakpointConfig,
  GridColumns,
  GridSpacing,
  GridSnapHookProps,
  GridSnapResult
} from '../../types'

// Export utility functions
export {
  cn,
  generateGridClasses,
  generateGapClasses,
  generateSpanClasses,
  generatePositionClasses,
  parseResponsiveValue,
  createBreakpointStyles,
  debounce,
  calculateSnapPosition,
  calculateResponsiveGridSize,
  throttle,
  getCurrentBreakpoint,
  validateGridConfig
} from '../../utils'

// Export hooks
export { useGridSnap, useResponsiveGrid } from '../../hooks/useGridSnap'

// Default export for compatibility
export { GridSystem as default } from '../../components/GridSystem'