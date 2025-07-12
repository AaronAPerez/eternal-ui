// Types
export type {
  GridConfig,
  SnapConfig,
  BreakpointConfig,
  GridState,
  CanvasDimensions,
  Position,
  ElementSize,
  SnapResult,
  SnapPoint,
  DragState,
} from './types'

// Hooks
export { useGridSnap } from './hooks/useGridSnap'
export { useGridSettings } from './hooks/useGridSettings'

// Utilities
export {
  calculateSnapPosition,
  calculateDistance,
  isWithinSnapThreshold,
  calculateResponsiveGridSize,
  generateGridLines,
  clamp,
  debounce,
} from './utils'

// Constants
export {
  DEFAULT_GRID_CONFIG,
  GRID_SIZE_CONSTRAINTS,
  SNAP_CONSTRAINTS,
  OPACITY_CONSTRAINTS,
} from './constants'