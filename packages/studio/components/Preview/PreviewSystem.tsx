'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Settings,
  Maximize,
  Minimize,
  RefreshCw,
  Download,
  Share,
  Code,
  Layers
} from 'lucide-react'
import { CanvasElement } from '../Canvas/CanvasSystem'
import { COMPONENT_LIBRARY } from '../DragDrop/DragDropInterface'



/**
 * Preview System Types and Interfaces
 */

export interface PreviewDevice {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  width: number
  height: number
  userAgent?: string
  pixelRatio?: number
  category: 'desktop' | 'tablet' | 'mobile'
}

export interface PreviewSettings {
  device: PreviewDevice
  showRulers: boolean
  showGrid: boolean
  showOutlines: boolean
  interactiveMode: boolean
  darkMode: boolean
  zoom: number
  orientation: 'portrait' | 'landscape'
}

export interface PreviewState {
  isLoading: boolean
  hasError: boolean
  errorMessage?: string
  lastUpdated: number
  renderMode: 'live' | 'iframe' | 'static'
}

// Common device presets
export const PREVIEW_DEVICES: PreviewDevice[] = [
  // Desktop
  {
    id: 'desktop-large',
    name: 'Desktop Large',
    icon: Monitor,
    width: 1920,
    height: 1080,
    category: 'desktop'
  },
  {
    id: 'desktop-medium',
    name: 'Desktop Medium',
    icon: Monitor,
    width: 1440,
    height: 900,
    category: 'desktop'
  },
  {
    id: 'desktop-small',
    name: 'Desktop Small',
    icon: Monitor,
    width: 1024,
    height: 768,
    category: 'desktop'
  },
  
  // Tablet
  {
    id: 'tablet-ipad',
    name: 'iPad',
    icon: Tablet,
    width: 768,
    height: 1024,
    pixelRatio: 2,
    category: 'tablet',
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    id: 'tablet-android',
    name: 'Android Tablet',
    icon: Tablet,
    width: 800,
    height: 1280,
    pixelRatio: 2,
    category: 'tablet'
  },
  
  // Mobile
  {
    id: 'mobile-iphone',
    name: 'iPhone 14',
    icon: Smartphone,
    width: 390,
    height: 844,
    pixelRatio: 3,
    category: 'mobile',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    id: 'mobile-android',
    name: 'Android Phone',
    icon: Smartphone,
    width: 360,
    height: 640,
    pixelRatio: 3,
    category: 'mobile'
  }
]

/**
 * Component Renderer
 * 
 * Renders canvas elements as React components with real-time updates
 */
const ComponentRenderer: React.FC<{
  element: CanvasElement
  isSelected?: boolean
  isHovered?: boolean
  onSelect?: (id: string) => void
  onHover?: (id: string | null) => void
  previewMode?: boolean
}> = ({ 
  element, 
  isSelected, 
  isHovered, 
  onSelect, 
  onHover, 
  previewMode = false 
}) => {
  // Find component definition
  const componentDef = useMemo(() => 
    COMPONENT_LIBRARY.find(comp => comp.type === element.type),
    [element.type]
  )

  if (!componentDef) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded text-red-600">
        Unknown component: {element.type}
      </div>
    )
  }

  // Render component with current props
  const PreviewComponent = componentDef.previewComponent
  
  const handleClick = (e: React.MouseEvent) => {
    if (!previewMode && onSelect) {
      e.stopPropagation()
      onSelect(element.id)
    }
  }

  const handleMouseEnter = () => {
    if (!previewMode && onHover) {
      onHover(element.id)
    }
  }

  const handleMouseLeave = () => {
    if (!previewMode && onHover) {
      onHover(null)
    }
  }

  return (
    <div
      className={`
        component-wrapper relative
        ${!previewMode && isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : ''}
        ${!previewMode && isHovered ? 'ring-1 ring-gray-300' : ''}
        ${!previewMode ? 'cursor-pointer' : ''}
      `}
      style={{
        ...element.styling.style,
        width: element.constraints.width,
        height: element.constraints.height
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <PreviewComponent {...element.props}>
        {/* Render children recursively */}
        {element.children.length > 0 && (
          <div className="component-children">
            {element.children.map(child => (
              <ComponentRenderer
                key={child.id}
                element={child}
                onSelect={onSelect}
                onHover={onHover}
                previewMode={previewMode}
              />
            ))}
          </div>
        )}
      </PreviewComponent>
      
      {/* Component label for editing mode */}
      {!previewMode && isSelected && (
        <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          {element.name}
        </div>
      )}
    </div>
  )
}

/**
 * Preview Toolbar
 */
const PreviewToolbar: React.FC<{
  settings: PreviewSettings
  onSettingsChange: (settings: Partial<PreviewSettings>) => void
  onRefresh: () => void
  onExport: () => void
  onShare: () => void
}> = ({ settings, onSettingsChange, onRefresh, onExport, onShare }) => {
  const handleDeviceChange = (device: PreviewDevice) => {
    onSettingsChange({ device })
  }

  const handleOrientationToggle = () => {
    const newOrientation = settings.orientation === 'portrait' ? 'landscape' : 'portrait'
    onSettingsChange({ orientation: newOrientation })
  }

  const handleZoomChange = (zoom: number) => {
    onSettingsChange({ zoom: Math.max(0.25, Math.min(2, zoom)) })
  }

  return (
    <div className="preview-toolbar flex items-center justify-between p-3 bg-white border-b">
      {/* Device Selection */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          {PREVIEW_DEVICES.slice(0, 6).map(device => (
            <button
              key={device.id}
              onClick={() => handleDeviceChange(device)}
              className={`
                flex items-center space-x-1 px-2 py-1 rounded text-xs
                ${settings.device.id === device.id 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
              title={device.name}
            >
              <device.icon className="w-3 h-3" />
              <span className="hidden sm:inline">{device.name}</span>
            </button>
          ))}
        </div>
        </div>
        </div>
  )
};

        
