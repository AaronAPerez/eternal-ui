import { describe, it, expect } from 'vitest'
import { calculateSnapPosition, calculateDistance, isWithinSnapThreshold } from './snapCalculations'
import { GridConfig, Position } from 'packages/grid-system/dist/types'


const mockGridConfig: GridConfig = {
  enabled: true,
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

describe('snapCalculations', () => {
  describe('calculateDistance', () => {
    it('should calculate correct distance between two points', () => {
      const point1: Position = { x: 0, y: 0 }
      const point2: Position = { x: 3, y: 4 }
      
      const distance = calculateDistance(point1, point2)
      expect(distance).toBe(5) // 3-4-5 triangle
    })

    it('should return 0 for identical points', () => {
      const point: Position = { x: 10, y: 20 }
      const distance = calculateDistance(point, point)
      expect(distance).toBe(0)
    })
  })

  describe('calculateSnapPosition', () => {
    it('should return original position when snap is disabled', () => {
      const position: Position = { x: 15, y: 25 }
      const configWithoutSnap = {
        ...mockGridConfig,
        snap: { ...mockGridConfig.snap, enabled: false },
      }

      const result = calculateSnapPosition(position, configWithoutSnap)

      expect(result.position).toEqual(position)
      expect(result.snapped).toBe(false)
      expect(result.snapType).toBe('none')
    })

    it('should snap to nearest corner when within threshold', () => {
      const position: Position = { x: 18, y: 22 } // Close to (20, 20)
      
      const result = calculateSnapPosition(position, mockGridConfig)

      expect(result.snapped).toBe(true)
      expect(result.snapType).toBe('corner')
      expect(result.position).toEqual({ x: 20, y: 20 })
    })

    // FIXED: Use a config with smaller threshold and position that's genuinely outside
    it('should not snap when outside threshold', () => {
      const restrictiveConfig = {
        ...mockGridConfig,
        snap: {
          enabled: true,
          threshold: 3, // Very small threshold
          corners: true,
          edges: false, // Disable edges to reduce snap points
          center: false,
        },
      }
      
      // Position that's 5px away from nearest corner - outside 3px threshold
      const position: Position = { x: 25, y: 25 } // 5px from (20,20) and (20,30) etc.
      
      const result = calculateSnapPosition(position, restrictiveConfig)

      expect(result.snapped).toBe(false)
      expect(result.snapType).toBe('none')
      expect(result.position).toEqual(position)
    })

    it('should snap to edges when edge snapping is enabled', () => {
      // Position close to edge at (30, 20) - middle of top edge of grid cell
      const position: Position = { x: 32, y: 22 }
      
      const result = calculateSnapPosition(position, mockGridConfig)

      expect(result.snapped).toBe(true)
      expect(result.snapType).toBe('edge')
      expect(result.position).toEqual({ x: 30, y: 20 })
    })
  })

  describe('isWithinSnapThreshold', () => {
    it('should return true when position can snap', () => {
      const position: Position = { x: 18, y: 22 }
      
      const result = isWithinSnapThreshold(position, mockGridConfig)
      
      expect(result).toBe(true)
    })

    // FIXED: Use same restrictive config as above
    it('should return false when position cannot snap', () => {
      const restrictiveConfig = {
        ...mockGridConfig,
        snap: {
          enabled: true,
          threshold: 3, // Very small threshold
          corners: true,
          edges: false, // Disable edges
          center: false,
        },
      }
      
      const position: Position = { x: 25, y: 25 } // Outside 3px threshold
      
      const result = isWithinSnapThreshold(position, restrictiveConfig)
      
      expect(result).toBe(false)
    })
  })

  describe('snap behavior with different configurations', () => {
    it('should only snap to corners when only corners are enabled', () => {
      const cornerOnlyConfig = {
        ...mockGridConfig,
        snap: {
          enabled: true,
          threshold: 5, // Small threshold
          corners: true,
          edges: false,
          center: false,
        },
      }
      
      // Position close to an edge point but far from corners
      const position: Position = { x: 30, y: 25 } // Near edge at (30, 20) but far from corners
      
      const result = calculateSnapPosition(position, cornerOnlyConfig)
      
      // Should not snap because edges are disabled and corners are too far
      expect(result.snapped).toBe(false)
    })

    it('should snap to center when center snapping is enabled', () => {
      const centerConfig = {
        ...mockGridConfig,
        snap: {
          enabled: true,
          threshold: 8, // Reasonable threshold
          corners: false,
          edges: false,
          center: true,
        },
      }
      
      // Position close to center of grid cell at (30, 30)
      const position: Position = { x: 32, y: 28 }
      
      const result = calculateSnapPosition(position, centerConfig)
      
      expect(result.snapped).toBe(true)
      expect(result.snapType).toBe('center')
      expect(result.position).toEqual({ x: 30, y: 30 })
    })
  })
})