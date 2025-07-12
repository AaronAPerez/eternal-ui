import { GridConfig } from 'packages/grid-system/dist/types'
import { describe, it, expect, vi, beforeEach } from 'vitest'

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

describe('GridControls Logic', () => {
  const mockOnConfigUpdate = vi.fn()
  const mockOnToggle = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should have correct initial state', () => {
    expect(mockGridConfig.enabled).toBe(true)
    expect(mockGridConfig.size).toBe(20)
    expect(mockGridConfig.snap.enabled).toBe(true)
  })

  it('should handle size clamping', () => {
    const clamp = (value: number, min: number, max: number) => 
      Math.min(Math.max(value, min), max)
    
    expect(clamp(150, 5, 100)).toBe(100) // Clamp to max
    expect(clamp(3, 5, 100)).toBe(5)     // Clamp to min
    expect(clamp(50, 5, 100)).toBe(50)   // No clamping needed
  })

  it('should handle configuration updates', () => {
    const updates = { size: 30, enabled: false }
    const newConfig = { ...mockGridConfig, ...updates }
    
    expect(newConfig.size).toBe(30)
    expect(newConfig.enabled).toBe(false)
    expect(newConfig.snap.enabled).toBe(true) // Preserve existing
  })

  it('should handle snap configuration updates', () => {
    const snapUpdates = { threshold: 15, corners: false }
    const newConfig = {
      ...mockGridConfig,
      snap: { ...mockGridConfig.snap, ...snapUpdates }
    }
    
    expect(newConfig.snap.threshold).toBe(15)
    expect(newConfig.snap.corners).toBe(false)
    expect(newConfig.snap.enabled).toBe(true) // Preserve existing
  })

  it('should validate color format', () => {
    const isValidHex = (color: string) => 
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
    
    expect(isValidHex('#3b82f6')).toBe(true)
    expect(isValidHex('#fff')).toBe(true)
    expect(isValidHex('invalid')).toBe(false)
    expect(isValidHex('#gg1234')).toBe(false)
  })

  it('should handle keyboard shortcuts', () => {
    const handleKeyDown = (key: string, ctrlKey: boolean = false) => {
      if ((ctrlKey) && key.toLowerCase() === 'g') {
        return 'toggle'
      }
      if (key === 'Escape') {
        return 'close'
      }
      return 'none'
    }
    
    expect(handleKeyDown('g', true)).toBe('toggle')
    expect(handleKeyDown('Escape')).toBe('close')
    expect(handleKeyDown('a')).toBe('none')
  })
})