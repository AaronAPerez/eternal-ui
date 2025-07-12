/**
 * Grid configuration interface for customizable grid settings
 * Supports multiple grid types and snap behaviors
 */
export interface GridConfig {
  /** Enable/disable grid visibility */
  enabled: boolean
  /** Grid cell size in pixels */
  size: number
  /** Grid type for different layout approaches */
  type: 'square' | 'rectangular' | 'responsive'
  /** Visual appearance settings */
  opacity: number
  color: string
  /** Snap behavior configuration */
  snap: SnapConfig
  /** Responsive grid breakpoints */
  breakpoints: BreakpointConfig
}

/**
 * Snap configuration for precise positioning
 */
export interface SnapConfig {
  enabled: boolean
  threshold: number // Snap distance threshold in pixels
  corners: boolean // Snap to grid corners
  edges: boolean // Snap to grid edges
  center: boolean // Snap to grid center points
}

/**
 * Responsive breakpoint configuration
 */
export interface BreakpointConfig {
  mobile: number
  tablet: number
  desktop: number
}

/**
 * Grid state interface for hook management
 */
export interface GridState {
  config: GridConfig
  isVisible: boolean
  isDragging: boolean
  canvasDimensions: CanvasDimensions
}

/**
 * Canvas dimensions interface
 */
export interface CanvasDimensions {
  width: number
  height: number
}
