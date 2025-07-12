// Basic GridSystem
export { GridSystem } from './components/GridSystem'
export { GridSystem as default } from './components/GridSystem'

// Enhanced GridSystem with visual overlay
export { EnhancedGridSystem } from './components/EnhancedGridSystem'
export { VisualGridOverlay } from './components/VisualGridOverlay'

// Types
export type { 
  GridSystemProps, 
  EnhancedGridSystemProps,
  VisualGridOverlayProps 
} from './types'

// Utils
export { cn } from './utils'

// AI-powered features  
export { AutoLayoutEngine, useAutoLayout } from './ai/AutoLayoutEngine'
export type { ComponentData, LayoutSuggestion } from './ai/AutoLayoutEngine'