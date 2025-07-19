'use client'

import React, { useState, useCallback, useMemo } from 'react'
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCcw,
  Maximize,
  Minimize,
  RefreshCw,
  Eye,
  EyeOff,
  Settings,
  Download,
  Share,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Wifi,
  Battery,
  Signal
} from 'lucide-react'
import { useCanvas } from '../Canvas/CanvasSystem'
import { COMPONENT_LIBRARY } from '../DragDrop/DragDropInterface'

/**
 * Responsive Preview Types
 */

interface PreviewDevice {
  id: string
  name: string
  width: number
  height: number
  pixelRatio: number
  category: 'desktop' | 'tablet' | 'mobile'
  icon: React.ComponentType<{ className?: string }>
  frame?: 'none' | 'browser' | 'device'
  userAgent?: string
}

interface PreviewSettings {
  showAllDevices: boolean
  orientation: 'portrait' | 'landscape'
  showFrames: boolean
  showInteractions: boolean
  showNetworkStatus: boolean
  throttleNetwork: 'fast-3g' | 'slow-3g' | 'offline' | 'none'
  zoom: number
}

/**
 * Device Definitions
 */
const RESPONSIVE_DEVICES: PreviewDevice[] = [
  // Desktop Devices
  {
    id: 'desktop-large',
    name: 'Desktop Large',
    width: 1920,
    height: 1080,
    pixelRatio: 1,
    category: 'desktop',
    icon: Monitor,
    frame: 'browser'
  },
  {
    id: 'desktop-medium',
    name: 'Desktop Medium',
    width: 1440,
    height: 900,
    pixelRatio: 1,
    category: 'desktop',
    icon: Monitor,
    frame: 'browser'
  },
  {
    id: 'desktop-small',
    name: 'Laptop',
    width: 1024,
    height: 768,
    pixelRatio: 1,
    category: 'desktop',
    icon: Monitor,
    frame: 'browser'
  },

  // Tablet Devices
  {
    id: 'ipad-pro',
    name: 'iPad Pro',
    width: 1024,
    height: 1366,
    pixelRatio: 2,
    category: 'tablet',
    icon: Tablet,
    frame: 'device',
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    id: 'ipad',
    name: 'iPad',
    width: 768,
    height: 1024,
    pixelRatio: 2,
    category: 'tablet',
    icon: Tablet,
    frame: 'device'
  },
  {
    id: 'tablet-android',
    name: 'Android Tablet',
    width: 800,
    height: 1280,
    pixelRatio: 2,
    category: 'tablet',
    icon: Tablet,
    frame: 'device'
  },

  // Mobile Devices
  {
    id: 'iphone-14-pro',
    name: 'iPhone 14 Pro',
    width: 390,
    height: 844,
    pixelRatio: 3,
    category: 'mobile',
    icon: Smartphone,
    frame: 'device',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    id: 'iphone-se',
    name: 'iPhone SE',
    width: 375,
    height: 667,
    pixelRatio: 2,
    category: 'mobile',
    icon: Smartphone,
    frame: 'device'
  },
  {
    id: 'android-phone',
    name: 'Android Phone',
    width: 360,
    height: 640,
    pixelRatio: 3,
    category: 'mobile',
    icon: Smartphone,
    frame: 'device'
  }
]

/**
 * Component Renderer for Preview
 */
const PreviewComponentRenderer: React.FC<{
  element: any
  previewMode?: boolean
}> = ({ element, previewMode = true }) => {
  const componentDef = useMemo(() => 
    COMPONENT_LIBRARY.find(comp => comp.type === element.type),
    [element.type]
  )

  if (!componentDef) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
        Unknown component: {element.type}
      </div>
    )
  }

  const PreviewComponent = componentDef.previewComponent

  return (
    <div
      className="preview-component-wrapper"
      style={{
        ...element.styling.style,
        width: element.constraints.width,
        height: element.constraints.height
      }}
    >
      <PreviewComponent {...element.props}>
        {element.children?.length > 0 && (
          <div className="preview-children">
            {element.children.map((child: any) => (
              <PreviewComponentRenderer
                key={child.id}
                element={child}
                previewMode={previewMode}
              />
            ))}
          </div>
        )}
      </PreviewComponent>
    </div>
  )
}

/**
 * Device Frame Components
 */
const BrowserFrame: React.FC<{
  device: PreviewDevice
  children: React.ReactNode
  scale: number
}> = ({ device, children, scale }) => {
  return (
    <div
      className="browser-frame bg-gray-100 rounded-lg shadow-lg overflow-hidden"
      style={{
        width: device.width * scale,
        height: (device.height + 40) * scale // Extra height for browser chrome
      }}
    >
      {/* Browser Chrome */}
      <div className="browser-chrome h-10 bg-white border-b flex items-center px-3 space-x-2">
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-gray-100 rounded px-3 py-1 text-xs text-gray-600">
            https://preview.eternal-ui.com
          </div>
        </div>
        <RefreshCw className="w-4 h-4 text-gray-400" />
      </div>
      
      {/* Content Area */}
      <div
        className="browser-content bg-white overflow-auto"
        style={{
          width: device.width * scale,
          height: device.height * scale,
          transform: `scale(${1 / scale})`,
          transformOrigin: 'top left'
        }}
      >
        {children}
      </div>
    </div>
  )
}

const DeviceFrame: React.FC<{
  device: PreviewDevice
  children: React.ReactNode
  scale: number
  orientation: 'portrait' | 'landscape'
}> = ({ device, children, scale, orientation }) => {
  const isLandscape = orientation === 'landscape'
  const frameWidth = isLandscape ? Math.max(device.width, device.height) : Math.min(device.width, device.height)
  const frameHeight = isLandscape ? Math.min(device.width, device.height) : Math.max(device.width, device.height)
  
  const isMobile = device.category === 'mobile'
  const isTablet = device.category === 'tablet'

  return (
    <div
      className={`device-frame relative ${
        isMobile ? 'bg-black rounded-3xl p-2' : 
        isTablet ? 'bg-gray-800 rounded-2xl p-3' : 
        'bg-gray-200 rounded-lg p-1'
      } shadow-2xl`}
      style={{
        width: frameWidth * scale + (isMobile ? 16 : isTablet ? 24 : 8),
        height: frameHeight * scale + (isMobile ? 16 : isTablet ? 24 : 8)
      }}
    >
      {/* Mobile Status Bar */}
      {isMobile && (
        <div className="absolute top-2 left-2 right-2 h-6 flex items-center justify-between px-4 text-white text-xs">
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
          width: frameWidth * scale,
          height: frameHeight * scale - (isMobile ? 24 : 0), // Account for status bar
          marginTop: isMobile ? 24 : 0
        }}
      >
        <div
          className="device-content overflow-auto h-full"
          style={{
            transform: `scale(${1 / scale})`,
            transformOrigin: 'top left',
            width: frameWidth,
            height: frameHeight - (isMobile ? 24 : 0)
          }}
        >
          {children}
        </div>
      </div>

      {/* Home Indicator for iPhone */}
      {isMobile && device.id.includes('iphone') && (
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
      )}
    </div>
  )
}

/**
 * Single Device Preview
 */
const DevicePreview: React.FC<{
  device: PreviewDevice
  settings: PreviewSettings
  elements: any[]
  maxWidth?: number
  maxHeight?: number
}> = ({ device, settings, elements, maxWidth = 400, maxHeight = 600 }) => {
  const { orientation, showFrames, zoom } = settings
  
  // Calculate device dimensions based on orientation
  const isLandscape = orientation === 'landscape'
  const deviceWidth = isLandscape ? Math.max(device.width, device.height) : Math.min(device.width, device.height)
  const deviceHeight = isLandscape ? Math.min(device.width, device.height) : Math.max(device.width, device.height)
  
  // Calculate scale to fit in container
  const scaleX = maxWidth / deviceWidth
  const scaleY = maxHeight / deviceHeight
  const autoScale = Math.min(scaleX, scaleY, 1)
  const finalScale = zoom > 0 ? zoom : autoScale

  const renderContent = () => (
    <div className="preview-canvas bg-white min-h-full">
      {elements.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-400">
          <div className="text-center">
            <Monitor className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No content</p>
          </div>
        </div>
      ) : (
        <div className="preview-elements">
          {elements.map(element => (
            <PreviewComponentRenderer
              key={element.id}
              element={element}
              previewMode={true}
            />
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="device-preview flex flex-col items-center">
      {/* Device Info */}
      <div className="mb-3 text-center">
        <div className="flex items-center justify-center space-x-2 mb-1">
          <device.icon className="w-4 h-4 text-gray-600" />
          <h3 className="text-sm font-medium text-gray-700">{device.name}</h3>
        </div>
        <p className="text-xs text-gray-500">
          {deviceWidth} × {deviceHeight} • {Math.round(finalScale * 100)}%
        </p>
      </div>

      {/* Device Frame */}
      <div className="device-container">
        {showFrames && device.frame === 'browser' ? (
          <BrowserFrame device={device} scale={finalScale}>
            {renderContent()}
          </BrowserFrame>
        ) : showFrames && device.frame === 'device' ? (
          <DeviceFrame device={device} scale={finalScale} orientation={orientation}>
            {renderContent()}
          </DeviceFrame>
        ) : (
          <div
            className="preview-frame bg-white border rounded shadow-lg overflow-hidden"
            style={{
              width: deviceWidth * finalScale,
              height: deviceHeight * finalScale
            }}
          >
            <div
              className="preview-content overflow-auto h-full"
              style={{
                transform: `scale(${1 / finalScale})`,
                transformOrigin: 'top left',
                width: deviceWidth,
                height: deviceHeight
              }}
            >
              {renderContent()}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Preview Controls
 */
const PreviewControls: React.FC<{
  settings: PreviewSettings
  onSettingsChange: (settings: Partial<PreviewSettings>) => void
  selectedDevices: string[]
  onDeviceToggle: (deviceId: string) => void
}> = ({ settings, onSettingsChange, selectedDevices, onDeviceToggle }) => {
  return (
    <div className="preview-controls bg-white border-b p-3 space-y-3">
      {/* Device Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preview Devices
        </label>
        <div className="flex flex-wrap gap-2">
          {RESPONSIVE_DEVICES.map(device => (
            <button
              key={device.id}
              onClick={() => onDeviceToggle(device.id)}
              className={`
                flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors
                ${selectedDevices.includes(device.id)
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              <device.icon className="w-4 h-4" />
              <span>{device.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={settings.showFrames}
            onChange={(e) => onSettingsChange({ showFrames: e.target.checked })}
            className="rounded"
          />
          <span>Show Frames</span>
        </label>

        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={settings.showInteractions}
            onChange={(e) => onSettingsChange({ showInteractions: e.target.checked })}
            className="rounded"
          />
          <span>Interactions</span>
        </label>

        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={settings.showNetworkStatus}
            onChange={(e) => onSettingsChange({ showNetworkStatus: e.target.checked })}
            className="rounded"
          />
          <span>Network Status</span>
        </label>

        <button
          onClick={() => onSettingsChange({ 
            orientation: settings.orientation === 'portrait' ? 'landscape' : 'portrait' 
          })}
          className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{settings.orientation === 'portrait' ? 'Landscape' : 'Portrait'}</span>
        </button>
      </div>

      {/* Network Throttling */}
      {settings.showNetworkStatus && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Network Throttling
          </label>
          <select
            value={settings.throttleNetwork}
            onChange={(e) => onSettingsChange({ throttleNetwork: e.target.value as any })}
            className="px-2 py-1 border rounded text-sm"
          >
            <option value="none">No Throttling</option>
            <option value="fast-3g">Fast 3G</option>
            <option value="slow-3g">Slow 3G</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      )}
    </div>
  )
}

/**
 * Main Responsive Preview Component
 */
export const ResponsivePreview: React.FC<{
  className?: string
}> = ({ className }) => {
  const { state } = useCanvas()
  const [selectedDevices, setSelectedDevices] = useState<string[]>([
    'desktop-medium',
    'ipad',
    'iphone-14-pro'
  ])
  const [settings, setSettings] = useState<PreviewSettings>({
    showAllDevices: false,
    orientation: 'portrait',
    showFrames: true,
    showInteractions: true,
    showNetworkStatus: false,
    throttleNetwork: 'none',
    zoom: 0 // 0 = auto
  })

  // Get root elements for preview
  const elements = useMemo(() => 
    Array.from(state.elements.values()).filter(el => !el.parent),
    [state.elements]
  )

  const handleSettingsChange = useCallback((newSettings: Partial<PreviewSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }, [])

  const handleDeviceToggle = useCallback((deviceId: string) => {
    setSelectedDevices(prev => 
      prev.includes(deviceId)
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    )
  }, [])

  const devicesToShow = RESPONSIVE_DEVICES.filter(device => 
    selectedDevices.includes(device.id)
  )

  return (
    <div className={`responsive-preview h-full flex flex-col bg-gray-50 ${className || ''}`}>
      {/* Controls */}
      <PreviewControls
        settings={settings}
        onSettingsChange={handleSettingsChange}
        selectedDevices={selectedDevices}
        onDeviceToggle={handleDeviceToggle}
      />

      {/* Preview Grid */}
      <div className="flex-1 overflow-auto p-4">
        {devicesToShow.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Monitor className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No Devices Selected</h3>
              <p className="text-sm">Select devices from the controls above to see previews</p>
            </div>
          </div>
        ) : (
          <div className={`
            preview-grid gap-6
            ${devicesToShow.length === 1 ? 'flex justify-center' :
              devicesToShow.length === 2 ? 'grid grid-cols-1 lg:grid-cols-2' :
              'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
            }
          `}>
            {devicesToShow.map(device => (
              <DevicePreview
                key={device.id}
                device={device}
                settings={settings}
                elements={elements}
              />
            ))}
          </div>
        )}
      </div>

      {/* Status */}
      {settings.showNetworkStatus && (
        <div className="bg-white border-t px-4 py-2 flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center space-x-4">
            <span>Network: {settings.throttleNetwork}</span>
            <span>Devices: {devicesToShow.length}</span>
            <span>Elements: {elements.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wifi className={`w-3 h-3 ${settings.throttleNetwork === 'offline' ? 'text-red-500' : 'text-green-500'}`} />
            <span>Connected</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResponsivePreview
export { RESPONSIVE_DEVICES }
export type { PreviewDevice, PreviewSettings }
