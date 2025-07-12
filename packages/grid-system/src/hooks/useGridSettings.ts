import { useState, useCallback } from 'react'
import { GridConfig } from '../types/grid.types'


/**
 * Hook for managing grid settings UI state
 */
export function useGridSettings(
  gridConfig: GridConfig,
  onConfigUpdate: (updates: Partial<GridConfig>) => void
) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  /**
   * Handle configuration changes with dirty tracking
   */
  const handleConfigChange = useCallback(
    (updates: Partial<GridConfig>) => {
      onConfigUpdate(updates)
      setIsDirty(true)
    },
    [onConfigUpdate]
  )

  /**
   * Reset to default configuration
   */
  const resetToDefaults = useCallback(() => {
    onConfigUpdate({
      size: 20,
      opacity: 0.3,
      color: '#3b82f6',
      snap: {
        enabled: true,
        threshold: 10,
        corners: true,
        edges: true,
        center: false,
      },
    })
    setIsDirty(false)
  }, [onConfigUpdate])

  /**
   * Toggle settings panel expansion
   */
  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  /**
   * Save current configuration
   */
  const saveConfiguration = useCallback(() => {
    try {
      localStorage.setItem('eternal-ui-grid-config', JSON.stringify(gridConfig))
      setIsDirty(false)
    } catch (error) {
      console.warn('Failed to save grid configuration:', error)
    }
  }, [gridConfig])

  /**
   * Load saved configuration
   */
  const loadConfiguration = useCallback(() => {
    try {
      const saved = localStorage.getItem('eternal-ui-grid-config')
      if (saved) {
        const config = JSON.parse(saved) as Partial<GridConfig>
        onConfigUpdate(config)
        setIsDirty(false)
      }
    } catch (error) {
      console.warn('Failed to load grid configuration:', error)
    }
  }, [onConfigUpdate])

  return {
    isExpanded,
    isDirty,
    toggleExpanded,
    handleConfigChange,
    resetToDefaults,
    saveConfiguration,
    loadConfiguration,
  }
}
