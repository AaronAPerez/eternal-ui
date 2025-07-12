import React, { useCallback } from 'react'
import { Grid, Settings } from 'lucide-react'
import { clsx } from 'clsx'
import { useGridSettings } from '@/hooks'
import { clamp, GridConfig } from '../GridSystem'


interface GridControlsProps {
  /** Grid configuration */
  config: GridConfig
  /** Configuration update handler */
  onConfigUpdate: (updates: Partial<GridConfig>) => void
  /** Grid toggle handler */
  onToggle: () => void
  /** Optional className for styling */
  className?: string
}

/**
 * Grid controls panel component
 * Provides UI for adjusting grid settings and snap behavior
 * Includes accessibility features and keyboard navigation
 */
export const GridControls: React.FC<GridControlsProps> = ({
  config,
  onConfigUpdate,
  onToggle,
  className = '',
}) => {
  const {
    isExpanded,
    isDirty,
    toggleExpanded,
    handleConfigChange,
    resetToDefaults,
    saveConfiguration,
    loadConfiguration,
  } = useGridSettings(config, onConfigUpdate)

  /**
   * Handle grid size adjustment with validation
   */
  const handleSizeChange = useCallback((size: number) => {
    const clampedSize = clamp(size, 5, 100)
    handleConfigChange({ size: clampedSize })
  }, [handleConfigChange])

  /**
   * Handle snap threshold adjustment
   */
  const handleThresholdChange = useCallback((threshold: number) => {
    const clampedThreshold = clamp(threshold, 1, 50)
    handleConfigChange({ 
      snap: { ...config.snap, threshold: clampedThreshold }
    })
  }, [config.snap, handleConfigChange])

  /**
   * Handle keyboard shortcuts for grid controls
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'g':
      case 'G':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault()
          onToggle()
        }
        break
      case 'Escape':
        if (isExpanded) {
          toggleExpanded()
        }
        break
    }
  }, [onToggle, isExpanded, toggleExpanded])

  return (
    <div 
      className={clsx(
        'bg-white border border-gray-200 rounded-lg shadow-sm',
        className
      )}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Grid controls"
      data-testid="grid-controls"
    >
      {/* Grid toggle header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Grid 
            size={16} 
            className={clsx(
              config.enabled ? 'text-blue-600' : 'text-gray-400'
            )}
            aria-hidden="true"
          />
          <span className="text-sm font-medium text-gray-700">
            Grid System
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Grid enabled indicator */}
          <div 
            className={clsx(
              'w-2 h-2 rounded-full',
              config.enabled ? 'bg-green-500' : 'bg-gray-300'
            )}
            aria-label={config.enabled ? 'Grid enabled' : 'Grid disabled'}
            data-testid="grid-status-indicator"
          />
          
          {/* Main toggle button */}
          <button
            onClick={onToggle}
            className={clsx(
              'px-3 py-1 text-xs font-medium rounded transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
              config.enabled 
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
            aria-pressed={config.enabled}
            title="Toggle grid (Ctrl+G)"
            data-testid="grid-toggle-button"
          >
            {config.enabled ? 'ON' : 'OFF'}
          </button>
          
          {/* Settings toggle */}
          <button
            onClick={toggleExpanded}
            className={clsx(
              'p-1 rounded transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
              isExpanded 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            )}
            aria-expanded={isExpanded}
            aria-label="Grid settings"
            data-testid="grid-settings-toggle"
          >
            <Settings size={14} />
          </button>
        </div>
      </div>

      {/* Basic controls - always visible */}
      <div className="p-3">
        <div className="flex items-center gap-2">
          <label htmlFor="grid-size-quick" className="text-xs text-gray-600">
            Size:
          </label>
          <input
            id="grid-size-quick"
            type="number"
            min={5}
            max={100}
            value={config.size}
            onChange={(e) => handleSizeChange(Number(e.target.value))}
            className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
          />
          <span className="text-xs text-gray-500">px</span>
        </div>
      </div>
    </div>
  )
}

GridControls.displayName = 'GridControls'

// Export types
export type { GridControlsProps }
