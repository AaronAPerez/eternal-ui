/**
 * Position interface for element coordinates
 * Used for snap calculations and positioning
 */
export interface Position {
  x: number
  y: number
}

/**
 * Element size interface
 */
export interface ElementSize {
  width: number
  height: number
}

/**
 * Snap result interface for position adjustments
 * Provides feedback on snap behavior
 */
export interface SnapResult {
  position: Position
  snapped: boolean
  snapType: 'corner' | 'edge' | 'center' | 'none'
  gridCell: Position
  distance: number
}

/**
 * Snap point interface for snap calculations
 */
export interface SnapPoint {
  position: Position
  type: 'corner' | 'edge' | 'center'
  distance: number
}

/**
 * Drag state interface for tracking drag operations
 */
export interface DragState {
  isDragging: boolean
  startPosition: Position | null
  currentPosition: Position | null
  elementId: string | null
}
