import { ReactNode, HTMLAttributes } from 'react'

export interface GridSystemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  columns?: number
  gap?: string
  className?: string
}

export interface VisualGridOverlayProps {
  containerRef: React.RefObject<HTMLDivElement>
  columns: number
  gap: number
  visibility?: 'always' | 'on-hover' | 'hidden'
  gridColor?: string
  opacity?: string
}

export interface EnhancedGridSystemProps extends GridSystemProps {
  showOverlay?: boolean
  overlayVisibility?: 'always' | 'on-hover' | 'hidden'
  overlayColor?: string
  studioMode?: boolean
}