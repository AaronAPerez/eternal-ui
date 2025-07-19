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
  Sun,
  Moon
} from 'lucide-react'

/**
 * Dark Mode Theme Hook
 */
const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = useCallback(() => {
    setIsDark(prev => {
      const newMode = !prev
      localStorage.setItem('theme', newMode ? 'dark' : 'light')
      
      if (newMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      
      return newMode
    })
  }, [])

  return { isDark, toggleDarkMode }
}

/**
 * Preview Device Definitions
 */
export const PREVIEW_DEVICES = [
  {
    id: 'desktop-large',
    name: 'Desktop Large',
    icon: Monitor,
    width: 1920,
    height: 1080,
    category: 'desktop' as const
  },
  {
    id: 'desktop-medium',
    name: 'Desktop Medium',
    icon: Monitor,
    width: 1440,
    height: 900,
    category: 'desktop' as const
  },
  {
    id: 'tablet-ipad',
    name: 'iPad',
    icon: Tablet,
    width: 768,
    height: 1024,
    category: 'tablet' as const
  },
  {
    id: 'mobile-iphone',
    name: 'iPhone 14',
    icon: Smartphone,
    width: 390,
    height: 844,
    category: 'mobile' as const
  }
]

/**
 * Mock Canvas Elements for Demo
 */
const MOCK_ELEMENTS = [
  {
    id: 'header',
    type: 'header',
    name: 'Header',
    props: {
      title: 'Eternal UI',
      subtitle: 'The Future of Web Development'
    }
  },
  {
    id: 'hero',
    type: 'hero',
    name: 'Hero Section',
    props: {
      title: 'Build Amazing Websites',
      description: 'Create stunning, responsive websites with our visual builder',
      buttonText: 'Get Started'
    }
  },
  {
    id: 'features',
    type: 'features',
    name: 'Features Grid',
    props: {
      features: [
        { title: 'Visual Builder', description: 'Drag and drop components' },
        { title: 'Dark Mode', description: 'Beautiful dark theme support' },
        { title: 'Responsive', description: 'Works on all devices' }
      ]
    }
  }
]

/**
 * Component Renderer for Preview
 */
const ComponentRenderer: React.FC<{
  element: any
  isDark?: boolean
}> = ({ element, isDark = false }) => {
  switch (element.type) {
    case 'header':
      return (
        <header className={`p-6 border-b ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded ${isDark ? 'bg-indigo-400' : 'bg-indigo-600'} flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {element.props.title}
              </h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              {['Features', 'Pricing', 'Docs', 'Contact'].map(item => (
                <a key={item} href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </header>
      )

    case 'hero':
      return (
        <section className={`py-20 px-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {element.props.title}
            </h2>
            <p className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {element.props.description}
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              {element.props.buttonText}
            </button>
          </div>
        </section>
      )

    case 'features':
      return (
        <section className={`py-16 px-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {element.props.features.map((feature: any, index: number) => (
                <div key={index} className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )

    default:
      return (
        <div className={`p-4 border-2 border-dashed rounded-lg ${isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Unknown component: {element.type}
          </span>
        </div>
      )
  }
}

/**
 * Preview Toolbar Component
 */
const PreviewToolbar: React.FC<{
  selectedDevice: any
  onDeviceChange: (device: any) => void
  orientation: 'portrait' | 'landscape'
  onOrientationChange: () => void
  zoom: number
  onZoomChange: (zoom: number) => void
  showGrid: boolean
  onToggleGrid: () => void
  isDark: boolean
  onToggleDarkMode: () => void
  onRefresh: () => void
  onFullscreen: () => void
}> = ({
  selectedDevice,
  onDeviceChange,
  orientation,
  onOrientationChange,
  zoom,
  onZoomChange,
  showGrid,
  onToggleGrid,
  isDark,
  onToggleDarkMode,
  onRefresh,
  onFullscreen
}) => {
  return (
    <div className={`flex items-center justify-between p-3 border-b ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
      {/* Left: Device Selection */}
      <div className="flex items-center space-x-2">
        <div className={`flex items-center rounded-lg p-1 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          {PREVIEW_DEVICES.map(device => (
            <button
              key={device.id}
              onClick={() => onDeviceChange(device)}
              className={`
                flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors
                ${selectedDevice.id === device.id 
                  ? isDark ? 'bg-gray-700 text-indigo-400' : 'bg-white shadow-sm text-indigo-600'
                  : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
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
          onClick={onOrientationChange}
          className={`p-2 rounded transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          title="Toggle Orientation"
        >
          <RotateCcw className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
        </button>

        {/* Zoom Controls */}
        <div className={`flex items-center space-x-1 rounded px-2 py-1 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <button
            onClick={() => onZoomChange(Math.max(0.25, zoom - 0.25))}
            disabled={zoom <= 0.25}
            className={`p-1 rounded transition-colors disabled:opacity-50 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
          >
            <ZoomOut className="w-3 h-3" />
          </button>
          
          <span className={`text-xs min-w-[3rem] text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {Math.round(zoom * 100)}%
          </span>
          
          <button
            onClick={() => onZoomChange(Math.min(3, zoom + 0.25))}
            disabled={zoom >= 3}
            className={`p-1 rounded transition-colors disabled:opacity-50 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
          >
            <ZoomIn className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Center: Preview Options */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleGrid}
          className={`p-2 rounded transition-colors ${
            showGrid 
              ? isDark ? 'bg-indigo-900 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
              : isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
          }`}
          title="Toggle Grid"
        >
          <Grid className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleDarkMode}
          className={`p-2 rounded transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          title="Toggle Dark Mode"
        >
          {isDark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onRefresh}
          className={`p-2 rounded transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          title="Refresh Preview"
        >
          <RefreshCw className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
        </button>

        <button
          onClick={onFullscreen}
          className={`p-2 rounded transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          title="Fullscreen Preview"
        >
          <Maximize className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
        </button>

        <button
          className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-colors"
        >
          <Share className="w-4 h-4 mr-1 inline" />
          Share
        </button>
      </div>
    </div>
  )
}

/**
 * Device Frame Component with Dark Mode
 */
const DeviceFrame: React.FC<{
  device: any
  orientation: 'portrait' | 'landscape'
  scale: number
  children: React.ReactNode
  isDark: boolean
}> = ({ device, orientation, scale, children, isDark }) => {
  const isLandscape = orientation === 'landscape'
  const frameWidth = isLandscape ? Math.max(device.width, device.height) : Math.min(device.width, device.height)
  const frameHeight = isLandscape ? Math.min(device.width, device.height) : Math.max(device.width, device.height)
  
  const isMobile = device.category === 'mobile'
  const isTablet = device.category === 'tablet'

  return (
    <div
      className={`device-frame relative shadow-2xl ${
        isMobile ? 'bg-black rounded-3xl p-2' : 
        isTablet ? 'bg-gray-800 rounded-2xl p-3' : 
        isDark ? 'bg-gray-800 rounded-lg p-1' : 'bg-gray-200 rounded-lg p-1'
      }`}
      style={{
        width: frameWidth * scale + (isMobile ? 16 : isTablet ? 24 : 8),
        height: frameHeight * scale + (isMobile ? 16 : isTablet ? 24 : 8)
      }}
    >
      {/* Mobile Status Bar */}
      {isMobile && (
        <div className="absolute top-2 left-2 right-2 h-6 flex items-center justify-between px-4 text-white text-xs z-10">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-4 h-2" />
          </div>
        </div>
      )}

      {/* Screen */}
      <div
        className={`device-screen overflow-hidden ${
          isMobile ? 'rounded-2xl' : 
          isTablet ? 'rounded-lg' : 
          'rounded'
        } ${isDark ? 'bg-gray-900' : 'bg-white'}`}
        style={{
          width: frameWidth * scale,
          height: frameHeight * scale - (isMobile ? 24 : 0),
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
 * Main Live Preview Component with Dark Mode
 */
export const LivePreview: React.FC<{
  className?: string
  elements?: any[]
  enableDarkMode?: boolean
}> = ({ 
  className = '', 
  elements = MOCK_ELEMENTS,
  enableDarkMode = true 
}) => {
  const { isDark, toggleDarkMode } = useDarkMode()
  const [selectedDevice, setSelectedDevice] = useState(PREVIEW_DEVICES[0])
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')
  const [zoom, setZoom] = useState(1)
  const [showGrid, setShowGrid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const viewportRef = useRef<HTMLDivElement>(null)

  const handleRefresh = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const handleFullscreen = useCallback(() => {
    if (viewportRef.current) {
      viewportRef.current.requestFullscreen()
    }
  }, [])

  // Calculate device dimensions and scale
  const deviceDimensions = useMemo(() => {
    const { width, height } = selectedDevice
    return orientation === 'landscape' 
      ? { width: Math.max(width, height), height: Math.min(width, height) }
      : { width: Math.min(width, height), height: Math.max(width, height) }
  }, [selectedDevice, orientation])

  return (
    <div className={`live-preview flex flex-col h-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'} ${className}`}>
      {/* Toolbar */}
      <PreviewToolbar
        selectedDevice={selectedDevice}
        onDeviceChange={setSelectedDevice}
        orientation={orientation}
        onOrientationChange={() => setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait')}
        zoom={zoom}
        onZoomChange={setZoom}
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid(prev => !prev)}
        isDark={isDark}
        onToggleDarkMode={enableDarkMode ? toggleDarkMode : () => {}}
        onRefresh={handleRefresh}
        onFullscreen={handleFullscreen}
      />

      {/* Viewport */}
      <div 
        ref={viewportRef}
        className={`flex-1 overflow-hidden relative ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}
      >
        {/* Grid Background */}
        {showGrid && (
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px),
                linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
        )}

        {/* Device Frame and Content */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          {isLoading ? (
            <div className="flex items-center space-x-2 text-gray-500">
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span>Refreshing preview...</span>
            </div>
          ) : (
            <DeviceFrame
              device={selectedDevice}
              orientation={orientation}
              scale={Math.min(zoom, 1)}
              isDark={isDark}
            >
              <div className={`preview-content min-h-full ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                {elements.map(element => (
                  <ComponentRenderer
                    key={element.id}
                    element={element}
                    isDark={isDark}
                  />
                ))}
              </div>
            </DeviceFrame>
          )}
        </div>

        {/* Device Info */}
        <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-black bg-opacity-75 text-white'}`}>
          {selectedDevice.name} • {deviceDimensions.width} × {deviceDimensions.height}
        </div>
      </div>
    </div>
  )
}

export default LivePreview