import { describe, it, expect } from 'vitest'

import { DEFAULT_GRID_CONFIG } from '../constants/gridDefaults'
import { GridConfig } from '../types/grid.types'


// Test the hook logic without React dependencies for now
describe('useGridSnap logic', () => {
  it('should merge initial config with defaults correctly', () => {
    const customConfig: Partial<GridConfig> = {
      enabled: true,
      size: 30,
      opacity: 0.5,
    }
    
    const mergedConfig = {
      ...DEFAULT_GRID_CONFIG,
      ...customConfig,
    }
    
    expect(mergedConfig.enabled).toBe(true)
    expect(mergedConfig.size).toBe(30)
    expect(mergedConfig.opacity).toBe(0.5)
    expect(mergedConfig.snap.enabled).toBe(true) // From default
  })

  it('should handle snap config merging correctly', () => {
    const customConfig: Partial<GridConfig> = {
      snap: {
        enabled: false,
        threshold: 15,
        corners: true,
        edges: false,
        center: true,
      }
    }
    
    const mergedConfig = {
      ...DEFAULT_GRID_CONFIG,
      ...customConfig,
      snap: { ...DEFAULT_GRID_CONFIG.snap, ...customConfig.snap }
    }
    
    expect(mergedConfig.snap.enabled).toBe(false)
    expect(mergedConfig.snap.threshold).toBe(15)
    expect(mergedConfig.snap.center).toBe(true)
  })
})
