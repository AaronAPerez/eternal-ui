export * from './colors'
export * from './typography'
export * from './spacing'
export * from './shadows'

// Re-export all tokens as a single object
import { colors } from './colors'
import { typography } from './typography'
import { spacing } from './spacing'
import { shadows } from './shadows'

export const tokens = {
  colors,
  typography,
  spacing,
  shadows
} as const

export type DesignTokens = typeof tokens