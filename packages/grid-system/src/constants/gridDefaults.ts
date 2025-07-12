import type { GridConfig } from '../types'

/**
 * Default grid configuration
 * Provides sensible defaults for all grid settings
 */
export const DEFAULT_GRID_CONFIG: GridConfig = {
  enabled: false,
  size: 20,
  type: 'square',
  opacity: 0.3,
  color: '#3b82f6',
  snap: {
    enabled: true,
    threshold: 10,
    corners: true,
    edges: true,
    center: false,
  },
  breakpoints: {
    mobile: 375,
    tablet: 768,
    desktop: 1200,
  },
}

/**
 * Grid size constraints
 */
export const GRID_SIZE_CONSTRAINTS = {
  MIN_SIZE: 5,
  MAX_SIZE: 100,
  DEFAULT_SIZE: 20,
  STEP_SIZE: 5,
} as const

/**
 * Snap threshold constraints
 */
export const SNAP_CONSTRAINTS = {
  MIN_THRESHOLD: 1,
  MAX_THRESHOLD: 50,
  DEFAULT_THRESHOLD: 10,
} as const

/**
 * Opacity constraints
 */
export const OPACITY_CONSTRAINTS = {
  MIN_OPACITY: 0.1,
  MAX_OPACITY: 1.0,
  DEFAULT_OPACITY: 0.3,
  STEP: 0.1,
} as const
