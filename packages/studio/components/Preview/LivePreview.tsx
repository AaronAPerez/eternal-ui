'use client'

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCcw,
  Eye,
  EyeOff,
  Settings,
  Maximize,
  Minimize,
  RefreshCw,
  Download,
  Share,
  Code,
  Layers,
  Grid,
  Ruler,
  MousePointer,
  Hand,
  ZoomIn,
  ZoomOut,
  Move,
  Square,
  Circle,
  Type,
  Image,
  Play,
  Pause,
  Volume2,
  Wifi,
  Battery,
  Signal,
  X
} from 'lucide-react'
import { useCanvas } from '../Canvas/CanvasSystem'
import { COMPONENT_LIBRARY } from '../DragDrop/DragDropInterface'

/**
 * Live Preview Types and Interfaces
 */

interface PreviewDevice {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  width: number
  height: number
  pixelRatio?: number
  category: 'desktop' | 'tablet' | 'mobile'
  userAgent?: string
}

interface PreviewSettings {
  device: PreviewDevice
  showRulers: boolean
  showGrid: boolean
  showOutlines: boolean
  interactiveMode: boolean
  darkMode: boolean
  zoom: number
  orientation: 'portrait' | 'landscape'
  showDeviceFrame: boolean
  showNetworkStatus: boolean
  autoRefresh: boolean
}

interface PreviewState {
  isLoading: boolean
  hasError: boolean
  errorMessage?: string
  lastUpdated: number
  renderMode: 'live' | 'iframe' | 'static'
  performance: {
    renderTime: number
    componentCount: number
    memoryUsage?: number
  }
}

/**
 * Preview Device Definitions
 */
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
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
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
 * Component Renderer for Live Preview
 */
const ComponentRenderer: React.FC<{
  element: any
  isSelected?: boolean
  isHovered?: boolean
  onSelect?: (id: string) => void
  onHover?: (id: string | null) => void
  previewMode?: boolean
  showOutlines?: boolean
}> = ({ 
  element, 
  isSelected, 
  isHovered, 
  onSelect, 
  onHover, 
  previewMode = false,
  showOutlines = false 
}) => {
  // Find component definition
  const componentDef = useMemo(() => 
    COMPONENT_LIBRARY.find(comp => comp.type === element.type),
    [element.type]
  )

  if (!componentDef) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
        <div className="flex items-center space-x-2">
          <Square className="w-4 h-4" />
          <span>Unknown component: {element.type}</span>
        </div>
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
        component-wrapper relative transition-all duration-200
        ${!previewMode && isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : ''}
        ${!previewMode && isHovered ? 'ring-1 ring-gray-300' : ''}
        ${!previewMode ? 'cursor-pointer' : ''}
        ${showOutlines ? 'outline outline-1 outline-blue-200' : ''}
      `}
      style={{
        ...element.styling?.style,
        width: element.constraints?.width,
        height: element.constraints?.height
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-element-id={element.id}
      data-element-type={element.type}
    >
      <PreviewComponent {...element.props}>
        {/* Render children recursively */}
        {element.children?.length > 0 && (
          <div className="component-children">
            {element.children.map((child: any) => (
              <ComponentRenderer
                key={child.id}
                element={child}
                onSelect={onSelect}
                onHover={onHover}
                previewMode={previewMode}
                showOutlines={showOutlines}
              />
            ))}
          </div>
        )}
      </PreviewComponent>
      
      {/* Component label for editing mode */}
      {!previewMode && isSelected && (
        <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10 pointer-events-none">
          {element.name}
        </div>
      )}

      {/* Resize handles for selected elements */}
      {!previewMode && isSelected && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full pointer-events-auto cursor-nw-resize"></div>
          <div className="absolute -top-1 right-1/2 w-2 h-2 bg-blue-500 rounded-full pointer-events-auto cursor-n-resize"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full pointer-events-auto cursor-ne-resize"></div>
          <div className="absolute top-1/2 -right-1 w-2 h-2 bg-blue-500 rounded-full pointer-events-auto cursor-e-resize"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full pointer-events-auto cursor-se-resize"></div>
          <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-blue-500 rounded-full pointer-events-auto cursor-s-resize"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 rounded-full pointer-events-auto cursor-sw-resize"></div>
          <div className="absolute top-1/2 -left-1 w-2 h-2 bg-blue-500 rounded-full pointer-events-auto cursor-w-resize"></div>
        </div>
      )}
    </div>
  )
}

/**
 * Preview Toolbar Component
 */
const PreviewToolbar: React.FC<{
  settings: PreviewSettings
  onSettingsChange: (settings: Partial<PreviewSettings>) => void
  onRefresh: () => void
  onExport: () => void
  onShare: () => void
  onFullscreen: () => void
  state: PreviewState
}> = ({ settings, onSettingsChange, onRefresh, onExport, onShare, onFullscreen, state }) => {
  const handleDeviceChange = (device: PreviewDevice) => {
    onSettingsChange({ device })
  }

  const handleOrientationToggle = () => {
    const newOrientation = settings.orientation === 'portrait' ? 'landscape' : 'portrait'
    onSettingsChange({ orientation: newOrientation })
  }

  const handleZoomChange = (zoom: number) => {
    onSettingsChange({ zoom: Math.max(0.25, Math.min(3, zoom)) })
  }

  const zoomLevels = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3]

  return (
    <div className="preview-toolbar flex items-center justify-between p-3 bg-white border-b shadow-sm">
      {/* Left: Device Selection */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          {PREVIEW_DEVICES.slice(0, 6).map(device => (
            <button
              key={device.id}
              onClick={() => handleDeviceChange(device)}
              className={`
                flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors
                ${settings.device.id === device.id 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
              title={`${device.name} (${device.width}×${device.height})`}
            >
              <device.icon className="w-3 h-3" />
              <span className="hidden sm:inline">{device.name}</span>
            </button>
          ))}
        </div>

        {/* Orientation Toggle */}
        <button
          onClick={handleOrientationToggle}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
          title="Toggle Orientation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-1 bg-gray-100 rounded px-2 py-1">
          <button
            onClick={() => handleZoomChange(settings.zoom - 0.25)}
            disabled={settings.zoom <= 0.25}
            className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ZoomOut className="w-3 h-3" />
          </button>
          
          <select
            value={settings.zoom}
            onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
            className="text-xs bg-transparent border-none outline-none"
          >
            {zoomLevels.map(level => (
              <option key={level} value={level}>
                {Math.round(level * 100)}%
              </option>
            ))}
          </select>
          
          <button
            onClick={() => handleZoomChange(settings.zoom + 0.25)}
            disabled={settings.zoom >= 3}
            className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ZoomIn className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Center: Preview Options */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onSettingsChange({ showGrid: !settings.showGrid })}
          className={`p-2 rounded transition-colors ${
            settings.showGrid ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
          }`}
          title="Toggle Grid"
        >
          <Grid className="w-4 h-4" />
        </button>

        <button
          onClick={() => onSettingsChange({ showRulers: !settings.showRulers })}
          className={`p-2 rounded transition-colors ${
            settings.showRulers ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
          }`}
          title="Toggle Rulers"
        >
          <Ruler className="w-4 h-4" />
        </button>

        <button
          onClick={() => onSettingsChange({ showOutlines: !settings.showOutlines })}
          className={`p-2 rounded transition-colors ${
            settings.showOutlines ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
          }`}
          title="Show Element Outlines"
        >
          {settings.showOutlines ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>

        <button
          onClick={() => onSettingsChange({ interactiveMode: !settings.interactiveMode })}
          className={`p-2 rounded transition-colors ${
            settings.interactiveMode ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'
          }`}
          title="Interactive Mode"
        >
          {settings.interactiveMode ? <MousePointer className="w-4 h-4" /> : <Hand className="w-4 h-4" />}
        </button>

        <button
          onClick={() => onSettingsChange({ showDeviceFrame: !settings.showDeviceFrame })}
          className={`p-2 rounded transition-colors ${
            settings.showDeviceFrame ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
          }`}
          title="Device Frame"
        >
          <Monitor className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-2">
        {/* Performance Info */}
        {state.performance.renderTime > 0 && (
          <div className="text-xs text-gray-500 hidden lg:block">
            {state.performance.renderTime}ms • {state.performance.componentCount} components
          </div>
        )}

        <div className="w-px h-6 bg-gray-300" />

        <button
          onClick={onRefresh}
          disabled={state.isLoading}
          className="p-2 rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
          title="Refresh Preview"
        >
          <RefreshCw className={`w-4 h-4 ${state.isLoading ? 'animate-spin' : ''}`} />
        </button>

        <button
          onClick={onFullscreen}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
          title="Fullscreen Preview"
        >
          <Maximize className="w-4 h-4" />
        </button>

        <button
          onClick={onExport}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
          title="Export Preview"
        >
          <Download className="w-4 h-4" />
        </button>

        <button
          onClick={onShare}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
        >
          <Share className="w-4 h-4 mr-1 inline" />
          Share
        </button>
      </div>
    </div>
  )
}

/**
 * Device Frame Component
 */
const DeviceFrame: React.FC<{
  device: PreviewDevice
  settings: PreviewSettings
  children: React.ReactNode
}> = ({ device, settings, children }) => {
  const { orientation } = settings
  const isMobile = device.category === 'mobile'
  const isTablet = device.category === 'tablet'
  
  // Calculate device dimensions based on orientation
  const isLandscape = orientation === 'landscape'
  const frameWidth = isLandscape ? Math.max(device.width, device.height) : Math.min(device.width, device.height)
  const frameHeight = isLandscape ? Math.min(device.width, device.height) : Math.max(device.width, device.height)

  if (!settings.showDeviceFrame) {
    return <>{children}</>
  }

  return (
    <div
      className={`device-frame relative ${
        isMobile ? 'bg-black rounded-3xl p-2' : 
        isTablet ? 'bg-gray-800 rounded-2xl p-3' : 
        'bg-gray-200 rounded-lg p-1'
      } shadow-2xl`}
      style={{
        width: frameWidth + (isMobile ? 16 : isTablet ? 24 : 8),
        height: frameHeight + (isMobile ? 16 : isTablet ? 24 : 8)
      }}
    >
      {/* Mobile Status Bar */}
      {isMobile && (
        <div className="absolute top-2 left-2 right-2 h-6 flex items-center justify-between px-4 text-white text-xs z-10">
          <div className="flex items-center space-x-1">
            <span>9:41</span>
          </div>
          <div className="flex items-center space-x-1">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-4 h-2" />
          </div>
        </div>
      )}

      {/* Screen */}
      <div
        className={`device-screen bg-white overflow-hidden ${
          isMobile ? 'rounded-2xl' : 
          isTablet ? 'rounded-lg' : 
          'rounded'
        }`}
        style={{
          width: frameWidth,
          height: frameHeight - (isMobile ? 24 : 0),
          marginTop: isMobile ? 24 : 0
        }}
      >
        {children}
      </div>

      {/* Home Indicator for iPhone */}
      {isMobile && device.id.includes('iphone') && (
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
      )}
    </div>
  )
}

/**
 * Preview Viewport Component
 */
const PreviewViewport: React.FC<{
  settings: PreviewSettings
  state: PreviewState
  children: React.ReactNode
}> = ({ settings, state, children }) => {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 })

  // Calculate device dimensions based on orientation
  const deviceDimensions = useMemo(() => {
    const { width, height } = settings.device
    return settings.orientation === 'landscape' 
      ? { width: Math.max(width, height), height: Math.min(width, height) }
      : { width: Math.min(width, height), height: Math.max(width, height) }
  }, [settings.device, settings.orientation])

  // Update viewport size on mount and resize
  useEffect(() => {
    const updateSize = () => {
      if (viewportRef.current) {
        const { offsetWidth, offsetHeight } = viewportRef.current
        setViewportSize({ width: offsetWidth, height: offsetHeight })
      }
    }

    updateSize()
    const resizeObserver = new ResizeObserver(updateSize)
    if (viewportRef.current) {
      resizeObserver.observe(viewportRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [])

  // Calculate scale to fit device in viewport
  const scale = useMemo(() => {
    if (viewportSize.width === 0 || viewportSize.height === 0) return settings.zoom
    
    const padding = 40
    const availableWidth = viewportSize.width - padding
    const availableHeight = viewportSize.height - padding
    
    const scaleX = availableWidth / deviceDimensions.width
    const scaleY = availableHeight / deviceDimensions.height
    
    const autoScale = Math.min(scaleX, scaleY, 1)
    return settings.zoom === 1 ? autoScale : settings.zoom
  }, [viewportSize, deviceDimensions, settings.zoom])

  return (
    <div 
      ref={viewportRef}
      className="preview-viewport flex-1 bg-gray-100 overflow-hidden relative"
    >
      {/* Grid Background */}
      {settings.showGrid && (
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: `${20 * scale}px ${20 * scale}px`
          }}
        />
      )}

      {/* Rulers */}
      {settings.showRulers && (
        <>
          {/* Horizontal Ruler */}
          <div className="absolute top-0 left-8 right-0 h-8 bg-white border-b flex items-end text-xs text-gray-500">
            {Array.from({ length: Math.ceil(deviceDimensions.width / 50) }, (_, i) => (
              <div key={i} className="relative" style={{ width: 50 * scale }}>
                <div className="absolute bottom-0 left-0 w-px h-2 bg-gray-400"></div>
                <span className="absolute bottom-3 left-1 text-xs">{i * 50}</span>
              </div>
            ))}
          </div>

          {/* Vertical Ruler */}
          <div className="absolute top-8 left-0 bottom-0 w-8 bg-white border-r flex flex-col text-xs text-gray-500">
            {Array.from({ length: Math.ceil(deviceDimensions.height / 50) }, (_, i) => (
              <div key={i} className="relative" style={{ height: 50 * scale }}>
                <div className="absolute top-0 right-0 h-px w-2 bg-gray-400"></div>
                <span 
                  className="absolute top-1 right-3 text-xs transform -rotate-90 origin-center"
                  style={{ transform: 'rotate(-90deg) translateY(-50%)' }}
                >
                  {i * 50}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Device Frame and Content */}
      <div className={`absolute inset-0 flex items-center justify-center ${settings.showRulers ? 'ml-8 mt-8' : ''}`}>
        <DeviceFrame device={settings.device} settings={settings}>
          <div
            className="preview-content relative overflow-auto"
            style={{
              width: deviceDimensions.width,
              height: deviceDimensions.height,
              transform: `scale(${scale})`,
              transformOrigin: 'top left'
            }}
          >
            {state.isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                <div className="flex items-center space-x-2 text-gray-600">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                  <span className="text-sm">Rendering...</span>
                </div>
              </div>
            )}

            {state.hasError ? (
              <div className="p-8 text-center">
                <div className="text-red-500 mb-4">
                  <Code className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-red-900 mb-2">Preview Error</h3>
                <p className="text-red-600 text-sm mb-4">{state.errorMessage}</p>
                <button className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors">
                  Retry
                </button>
              </div>
            ) : (
              children
            )}
          </div>
        </DeviceFrame>

        {/* Device Info Overlay */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white text-xs px-3 py-1 rounded-full pointer-events-none">
          {settings.device.name} • {deviceDimensions.width} × {deviceDimensions.height} • {Math.round(scale * 100)}%
        </div>
      </div>
    </div>
  )
}

/**
 * Main Live Preview Component
 */
export const LivePreview: React.FC<{
  className?: string
  previewMode?: boolean
  selectedDevice?: string
  onDeviceChange?: (deviceId: string) => void
}> = ({ className, previewMode = true, selectedDevice, onDeviceChange }) => {
  const { state: canvasState, selectElement } = useCanvas()
  const [previewSettings, setPreviewSettings] = useState<PreviewSettings>({
    device: PREVIEW_DEVICES.find(d => d.id === selectedDevice) || PREVIEW_DEVICES[0],
    showRulers: false,
    showGrid: false,
    showOutlines: !previewMode,
    interactiveMode: previewMode,
    darkMode: false,
    zoom: 1,
    orientation: 'portrait',
    showDeviceFrame: true,
    showNetworkStatus: false,
    autoRefresh: true
  })

  const [previewState, setPreviewState] = useState<PreviewState>({
    isLoading: false,
    hasError: false,
    lastUpdated: Date.now(),
    renderMode: 'live',
    performance: {
      renderTime: 0,
      componentCount: 0
    }
  })

  // Get root elements (elements without parents)
  const rootElements = useMemo(() => 
    Array.from(canvasState.elements.values()).filter(el => !el.parent),
    [canvasState.elements]
  )

  // Update performance metrics
  useEffect(() => {
    const startTime = performance.now()
    setPreviewState(prev => ({ 
      ...prev, 
      lastUpdated: Date.now(),
      performance: {
        ...prev.performance,
        componentCount: rootElements.length
      }
    }))

    // Simulate render time calculation
    const renderTime = performance.now() - startTime
    setPreviewState(prev => ({
      ...prev,
      performance: {
        ...prev.performance,
        renderTime: Math.round(renderTime * 10) / 10
      }
    }))
  }, [canvasState.elements, rootElements.length])

  // Handle device change from parent
  useEffect(() => {
    if (selectedDevice) {
      const device = PREVIEW_DEVICES.find(d => d.id === selectedDevice)
      if (device) {
        setPreviewSettings(prev => ({ ...prev, device }))
      }
    }
  }, [selectedDevice])

  const handleSettingsChange = useCallback((newSettings: Partial<PreviewSettings>) => {
    setPreviewSettings(prev => {
      const updated = { ...prev, ...newSettings }
      
      // Notify parent of device change
      if (newSettings.device && onDeviceChange) {
        onDeviceChange(newSettings.device.id)
      }
      
      return updated
    })
  }, [onDeviceChange])

  const handleRefresh = useCallback(() => {
    setPreviewState(prev => ({ 
      ...prev, 
      isLoading: true, 
      hasError: false,
      lastUpdated: Date.now() 
    }))
    
    // Simulate refresh delay
    setTimeout(() => {
      setPreviewState(prev => ({ ...prev, isLoading: false }))
    }, 500)
  }, [])

  const handleExport = useCallback(() => {
    console.log('Exporting preview as image...')
    // Implementation for exporting preview as image or PDF
  }, [])

  const handleShare = useCallback(() => {
    console.log('Generating shareable preview link...')
    // Implementation for sharing preview link
  }, [])

  const handleFullscreen = useCallback(() => {
    console.log('Opening fullscreen preview...')
    // Implementation for fullscreen preview
  }, [])

  const handleElementSelect = useCallback((elementId: string) => {
    if (!previewMode) {
      selectElement(elementId)
    }
  }, [previewMode, selectElement])

  return (
    <div className={`live-preview flex flex-col h-full bg-gray-50 ${className || ''}`}>
      {/* Toolbar */}
      <PreviewToolbar
        settings={previewSettings}
        onSettingsChange={handleSettingsChange}
        onRefresh={handleRefresh}
        onExport={handleExport}
        onShare={handleShare}
        onFullscreen={handleFullscreen}
        state={previewState}
      />

      {/* Viewport */}
      <PreviewViewport settings={previewSettings} state={previewState}>
        <div className={`preview-canvas min-h-full ${previewSettings.darkMode ? 'dark' : ''}`}>
          {rootElements.length === 0 ? (
            <div className="flex items-center justify-center h-screen text-gray-500">
              <div className="text-center">
                <Monitor className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium mb-2">No Components</h3>
                <p className="text-sm max-w-sm">
                  {previewMode 
                    ? 'Add components to your canvas to see them here'
                    : 'Drag components from the library to get started'
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="preview-elements">
              {rootElements.map(element => (
                <ComponentRenderer
                  key={element.id}
                  element={element}
                  isSelected={canvasState.selectedElements.has(element.id)}
                  isHovered={canvasState.hoveredElement === element.id}
                  onSelect={handleElementSelect}
                  onHover={(id) => {/* Handle hover if needed */}}
                  previewMode={previewMode}
                  showOutlines={previewSettings.showOutlines}
                />
              ))}
            </div>
          )}
        </div>
      </PreviewViewport>

      {/* Network Status Bar */}
      {previewSettings.showNetworkStatus && (
        <div className="bg-white border-t px-4 py-2 flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Preview</span>
            </div>
            <span>Last updated: {new Date(previewState.lastUpdated).toLocaleTimeString()}</span>
            <span>Components: {previewState.performance.componentCount}</span>
            {previewState.performance.renderTime > 0 && (
              <span>Render: {previewState.performance.renderTime}ms</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Wifi className="w-3 h-3 text-green-500" />
            <span>Connected</span>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Preview Manager Hook for External Use
 */
export const usePreview = () => {
  const { state: canvasState } = useCanvas()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePreviewUrl = useCallback(async () => {
    setIsGenerating(true)
    try {
      // In a real implementation, this would:
      // 1. Generate static HTML from canvas elements
      // 2. Upload to a preview service
      // 3. Return a shareable URL
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mockUrl = `https://preview.eternal-ui.com/${Date.now()}`
      setPreviewUrl(mockUrl)
    } catch (error) {
      console.error('Failed to generate preview URL:', error)
    } finally {
      setIsGenerating(false)
    }
  }, [canvasState.elements])

  const copyPreviewUrl = useCallback(() => {
    if (previewUrl) {
      navigator.clipboard.writeText(previewUrl)
    }
  }, [previewUrl])

  return {
    previewUrl,
    isGenerating,
    generatePreviewUrl,
    copyPreviewUrl
  }
}

/**
 * Fullscreen Preview Modal
 */
export const FullscreenPreview: React.FC<{
  isOpen: boolean
  onClose: () => void
  device?: PreviewDevice
}> = ({ isOpen, onClose, device }) => {
  const [currentDevice, setCurrentDevice] = useState(device || PREVIEW_DEVICES[0])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col">
      {/* Fullscreen Toolbar */}
      <div className="bg-black bg-opacity-50 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium">Fullscreen Preview</h2>
          <div className="flex items-center space-x-2">
            {PREVIEW_DEVICES.slice(0, 4).map(dev => (
              <button
                key={dev.id}
                onClick={() => setCurrentDevice(dev)}
                className={`flex items-center space-x-1 px-3 py-1 rounded text-sm ${
                  currentDevice.id === dev.id 
                    ? 'bg-white text-black' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <dev.icon className="w-4 h-4" />
                <span>{dev.name}</span>
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Fullscreen Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <LivePreview 
          className="w-full h-full max-w-none"
          previewMode={true}
          selectedDevice={currentDevice.id}
          onDeviceChange={(deviceId) => {
            const newDevice = PREVIEW_DEVICES.find(d => d.id === deviceId)
            if (newDevice) setCurrentDevice(newDevice)
          }}
        />
      </div>
    </div>
  )
}

/**
 * Performance Monitor Component
 */
export const PreviewPerformanceMonitor: React.FC<{
  className?: string
}> = ({ className }) => {
  const { state } = useCanvas()
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    componentCount: 0,
    memoryUsage: 0,
    frameRate: 60
  })

  useEffect(() => {
    const updateMetrics = () => {
      const startTime = performance.now()
      
      // Calculate component count
      const componentCount = Array.from(state.elements.values()).length
      
      // Simulate memory usage calculation
      const memoryUsage = (performance as any).memory 
        ? Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)
        : 0

      const renderTime = performance.now() - startTime

      setMetrics({
        renderTime: Math.round(renderTime * 100) / 100,
        componentCount,
        memoryUsage,
        frameRate: 60 // Would be calculated from actual frame timing
      })
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 1000)
    
    return () => clearInterval(interval)
  }, [state.elements])

  return (
    <div className={`performance-monitor bg-gray-900 text-green-400 p-3 font-mono text-xs ${className || ''}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-semibold">Performance Monitor</span>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Live</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <div className="text-gray-400">Render Time</div>
          <div className="text-lg">{metrics.renderTime}ms</div>
        </div>
        <div>
          <div className="text-gray-400">Components</div>
          <div className="text-lg">{metrics.componentCount}</div>
        </div>
        <div>
          <div className="text-gray-400">Memory</div>
          <div className="text-lg">{metrics.memoryUsage}MB</div>
        </div>
        <div>
          <div className="text-gray-400">FPS</div>
          <div className="text-lg">{metrics.frameRate}</div>
        </div>
      </div>
    </div>
  )
}

// CSS for smooth transitions and animations
const previewStyles = `
  .preview-canvas {
    transition: all 0.2s ease-in-out;
  }
  
  .component-wrapper {
    transition: all 0.15s ease-in-out;
  }
  
  .device-frame {
    transition: transform 0.3s ease-in-out;
  }
  
  .preview-viewport {
    scrollbar-width: thin;
    scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
  }
  
  .preview-viewport::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  .preview-viewport::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .preview-viewport::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.5);
    border-radius: 4px;
  }
  
  .preview-viewport::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.7);
  }
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = previewStyles
  document.head.appendChild(styleSheet)
}

// Export everything
export default LivePreview
export { 
  // PREVIEW_DEVICES, 
  ComponentRenderer, 
  // FullscreenPreview, 
  // PreviewPerformanceMonitor,
  // usePreview 
}
export type { 
  PreviewDevice, 
  PreviewSettings, 
  PreviewState 
}