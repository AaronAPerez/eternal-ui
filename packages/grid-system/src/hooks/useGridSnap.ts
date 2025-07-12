/**
 * Minimal hook implementations for basic functionality
 */

import { useCallback } from 'react'
import { calculateSnapPosition } from '../utils'
import type { GridSnapHookProps, GridSnapResult } from '../types'

/**
 * Simple grid snap hook
 */
export function useGridSnap({
  gridSize = 20,
  enabled = true
}: GridSnapHookProps = {}): GridSnapResult {
  
  const snapToGrid = useCallback((x: number, y: number) => {
    if (!enabled) return { x, y }
    return calculateSnapPosition(x, y, gridSize)
  }, [gridSize, enabled])

  const getGridSize = useCallback(() => gridSize, [gridSize])

  return {
    snapToGrid,
    getGridSize,
    isEnabled: enabled
  }
}

/**
 * Simple responsive grid hook
 */
export function useResponsiveGrid() {
  return {
    currentBreakpoint: 'base' as const,
    currentColumns: 12,
    containerWidth: typeof window !== 'undefined' ? window.innerWidth : 1024
  }
}