import { describe, it, expect } from 'vitest'
import { calculateSnapPosition } from './snapCalculations'
import { generateGridLines } from './gridHelpers'
import { GridConfig } from '../types/grid.types'


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

describe('Performance Tests', () => {
  it('should calculate snap positions efficiently', () => {
    const iterations = 100 // Reduced for faster tests
    const startTime = performance.now()

    // Measure performance of snap calculations
    for (let i = 0; i < iterations; i++) {
      calculateSnapPosition(
        { x: Math.random() * 400, y: Math.random() * 300 },
        mockGridConfig
      )
    }

    const endTime = performance.now()
    const totalTime = endTime - startTime
    const avgTime = totalTime / iterations

    // Should complete in reasonable time (less than 10ms per calculation)
    expect(avgTime).toBeLessThan(10)
  })

  it('should generate grid lines efficiently for large canvases', () => {
    const largeDimensions = { width: 1000, height: 800 } // Reduced for faster tests
    const gridSize = 20

    const startTime = performance.now()
    
    const { vertical, horizontal } = generateGridLines(largeDimensions, gridSize)
    
    const endTime = performance.now()
    const totalTime = endTime - startTime

    // Should generate lines quickly even for large canvases
    expect(totalTime).toBeLessThan(100) // Less than 100ms
    
    // Verify correct number of lines
    expect(vertical.length).toBe(Math.floor(largeDimensions.width / gridSize) + 1)
    expect(horizontal.length).toBe(Math.floor(largeDimensions.height / gridSize) + 1)
  })
})
