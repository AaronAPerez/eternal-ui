// =================================================================
// ENHANCED COMPONENT SYSTEM WITH RESPONSIVE UTILITIES
// =================================================================
// Complete system for responsive component editing and preview
// Includes auto-responsive code generation and device simulation
// =================================================================

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  RotateCcw, 
  Code, 
  Wand2,
} from 'lucide-react'
import { ComponentData, EditComponentProps } from '.'

// =================================================================
// RESPONSIVE UTILITIES AND HOOKS
// =================================================================

export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  
  useEffect(() => {
    const checkBreakpoint = () => {
      if (window.innerWidth < 640) setBreakpoint('mobile')
      else if (window.innerWidth < 1024) setBreakpoint('tablet')
      else setBreakpoint('desktop')
    }
    
    checkBreakpoint()
    window.addEventListener('resize', checkBreakpoint)
    return () => window.removeEventListener('resize', checkBreakpoint)
  }, [])
  
  return breakpoint
}

// Responsive utility components that can be used in generated code
export const ResponsiveText: React.FC<{
  mobile?: string
  tablet?: string
  desktop: string
  className?: string
  children?: React.ReactNode
}> = ({ mobile, tablet, desktop, className = '', children }) => {
  const breakpoint = useResponsive()
  const text = breakpoint === 'mobile' ? mobile : breakpoint === 'tablet' ? tablet : desktop
  return <span className={className}>{text || children}</span>
}

export const ResponsiveContainer: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => (
  <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
)

// =================================================================
// RESPONSIVE CODE TRANSFORMER
// =================================================================

export class ResponsiveCodeTransformer {
  private static responsivePatterns = [
    // Text sizing patterns
    {
      pattern: /text-(\w+)/g,
      transform: (match: string, size: string) => {
        const sizeMap: Record<string, string> = {
          'xs': 'text-xs sm:text-sm',
          'sm': 'text-sm sm:text-base',
          'base': 'text-sm sm:text-base lg:text-lg',
          'lg': 'text-base sm:text-lg lg:text-xl',
          'xl': 'text-lg sm:text-xl lg:text-2xl',
          '2xl': 'text-xl sm:text-2xl lg:text-3xl',
          '3xl': 'text-2xl sm:text-3xl lg:text-4xl',
          '4xl': 'text-3xl sm:text-4xl lg:text-5xl',
          '5xl': 'text-4xl sm:text-5xl lg:text-6xl',
          '6xl': 'text-5xl sm:text-6xl lg:text-7xl'
        }
        return sizeMap[size] || match
      }
    },
    
    // Padding patterns
    {
      pattern: /p-(\d+)/g,
      transform: (match: string, size: string) => {
        const num = parseInt(size)
        if (num >= 6) return `p-4 sm:p-${size}`
        if (num >= 4) return `p-3 sm:p-${size}`
        return match
      }
    },
    
    // Margin patterns
    {
      pattern: /m-(\d+)/g,
      transform: (match: string, size: string) => {
        const num = parseInt(size)
        if (num >= 6) return `m-4 sm:m-${size}`
        if (num >= 4) return `m-3 sm:m-${size}`
        return match
      }
    },
    
    // Spacing patterns
    {
      pattern: /space-([xy])-(\d+)/g,
      transform: (match: string, axis: string, size: string) => {
        const num = parseInt(size)
        if (num >= 6) return `space-${axis}-4 sm:space-${axis}-${size}`
        if (num >= 4) return `space-${axis}-3 sm:space-${axis}-${size}`
        return match
      }
    },
    
    // Gap patterns
    {
      pattern: /gap-(\d+)/g,
      transform: (match: string, size: string) => {
        const num = parseInt(size)
        if (num >= 6) return `gap-4 sm:gap-${size}`
        if (num >= 4) return `gap-3 sm:gap-${size}`
        return match
      }
    },
    
    // Grid column patterns
    {
      pattern: /grid-cols-(\d+)/g,
      transform: (match: string, cols: string) => {
        const numCols = parseInt(cols)
        if (numCols >= 4) return `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${cols}`
        if (numCols === 3) return `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
        if (numCols === 2) return `grid-cols-1 sm:grid-cols-2`
        return match
      }
    },
    
    // Flex direction patterns
    {
      pattern: /flex-row/g,
      transform: () => 'flex-col sm:flex-row'
    },
    
    // Width patterns
    {
      pattern: /w-(\d+\/\d+|\d+)/g,
      transform: (match: string, size: string) => {
        if (size.includes('/')) {
          // Fractional widths
          if (size === '1/2') return 'w-full sm:w-1/2'
          if (size === '1/3') return 'w-full sm:w-1/2 lg:w-1/3'
          if (size === '2/3') return 'w-full sm:w-2/3'
          if (size === '1/4') return 'w-full sm:w-1/2 lg:w-1/4'
          if (size === '3/4') return 'w-full sm:w-3/4'
        }
        return match
      }
    },
    
    // Height patterns for large heights
    {
      pattern: /h-(\d+)/g,
      transform: (match: string, size: string) => {
        const num = parseInt(size)
        if (num >= 64) return `h-48 sm:h-${size}`
        if (num >= 32) return `h-32 sm:h-${size}`
        return match
      }
    }
  ]

  static makeResponsive(code: string): string {
    let responsiveCode = code

    // Apply all responsive patterns
    this.responsivePatterns.forEach(({ pattern, transform }) => {
      responsiveCode = responsiveCode.replace(pattern, transform as any)
    })

    // Add responsive container wrappers
    responsiveCode = this.addResponsiveContainers(responsiveCode)
    
    // Add responsive utilities import
    responsiveCode = this.addResponsiveImports(responsiveCode)

    return responsiveCode
  }

  private static addResponsiveContainers(code: string): string {
    // Wrap main containers with responsive containers
    return code.replace(
      /(<div className="[^"]*(?:container|max-w-[^"]*)[^"]*"[^>]*>)/g,
      (match) => {
        if (match.includes('responsive-container')) return match
        return match.replace(/className="([^"]*)"/, 'className="$1 responsive-container"')
      }
    )
  }

  private static addResponsiveImports(code: string): string {
    // Add responsive utilities to the top of the component
    const imports = `
// Responsive utilities
const useResponsive = () => {
  const [breakpoint, setBreakpoint] = React.useState('desktop')
  
  React.useEffect(() => {
    const checkBreakpoint = () => {
      if (window.innerWidth < 640) setBreakpoint('mobile')
      else if (window.innerWidth < 1024) setBreakpoint('tablet')
      else setBreakpoint('desktop')
    }
    
    checkBreakpoint()
    window.addEventListener('resize', checkBreakpoint)
    return () => window.removeEventListener('resize', checkBreakpoint)
  }, [])
  
  return breakpoint
}

const ResponsiveText = ({ mobile, tablet, desktop, className = '', children }) => {
  const breakpoint = useResponsive()
  const text = breakpoint === 'mobile' ? (mobile || children) : 
               breakpoint === 'tablet' ? (tablet || children) : 
               (desktop || children)
  return React.createElement('span', { className }, text)
}

`

    // Insert before the main component definition
    return code.replace(
      /(const \w+\s*=\s*\([^)]*\)\s*=>\s*{|function \w+\s*\([^)]*\)\s*{)/,
      `${imports}$1`
    )
  }
}

// =================================================================
// ENHANCED PREVIEW COMPONENT WITH BETTER RESPONSIVE SIMULATION
// =================================================================



interface EnhancedPreviewProps {
  component: ComponentData
  onCodeUpdate: (code: string) => void
}

export const EnhancedPreview: React.FC<EnhancedPreviewProps> = ({ 
  component, 
  onCodeUpdate 
}) => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')
  const [isAutoResponsive, setIsAutoResponsive] = useState(false)
  const [previewScale, setPreviewScale] = useState(1)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const deviceConfigs = {
    mobile: {
      portrait: { width: 375, height: 667, userAgent: 'iPhone' },
      landscape: { width: 667, height: 375, userAgent: 'iPhone' }
    },
    tablet: {
      portrait: { width: 768, height: 1024, userAgent: 'iPad' },
      landscape: { width: 1024, height: 768, userAgent: 'iPad' }
    },
    desktop: {
      portrait: { width: 1200, height: 800, userAgent: 'Desktop' },
      landscape: { width: 1200, height: 800, userAgent: 'Desktop' }
    }
  }

  const currentConfig = deviceConfigs[deviceType][orientation]

  // Auto-calculate scale based on container size
  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return

      const container = containerRef.current.getBoundingClientRect()
      const padding = 48 // 24px padding on each side
      const availableWidth = container.width - padding
      const availableHeight = container.height - padding - 80 // Extra space for controls

      const scaleX = availableWidth / currentConfig.width
      const scaleY = availableHeight / currentConfig.height
      const optimalScale = Math.min(scaleX, scaleY, 1) // Never scale up

      setPreviewScale(optimalScale)
    }

    calculateScale()
    window.addEventListener('resize', calculateScale)
    return () => window.removeEventListener('resize', calculateScale)
  }, [currentConfig])

  // Generate enhanced responsive HTML
  const generateEnhancedHTML = useCallback(() => {
    const responsiveCode = isAutoResponsive 
      ? ResponsiveCodeTransformer.makeResponsive(component.code)
      : component.code

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <title>${component.name} - ${deviceType} Preview</title>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          * {
            box-sizing: border-box;
          }
          
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            background: #ffffff;
            line-height: 1.6;
          }

          #root {
            width: 100%;
            min-height: 100vh;
            padding: ${deviceType === 'mobile' ? '12px' : deviceType === 'tablet' ? '16px' : '20px'};
          }

          /* Mobile-first responsive overrides */
          ${deviceType === 'mobile' ? `
            /* Force mobile styles */
            .text-xl { font-size: 1.125rem !important; line-height: 1.75rem !important; }
            .text-2xl { font-size: 1.5rem !important; line-height: 2rem !important; }
            .text-3xl { font-size: 1.875rem !important; line-height: 2.25rem !important; }
            .text-4xl { font-size: 2.25rem !important; line-height: 2.5rem !important; }
            
            .p-6 { padding: 1rem !important; }
            .p-8 { padding: 1.5rem !important; }
            .py-8 { padding-top: 1.5rem !important; padding-bottom: 1.5rem !important; }
            .px-8 { padding-left: 1rem !important; padding-right: 1rem !important; }
            
            .space-y-6 > * + * { margin-top: 1rem !important; }
            .space-y-8 > * + * { margin-top: 1.5rem !important; }
            .gap-6 { gap: 1rem !important; }
            .gap-8 { gap: 1.5rem !important; }
            
            .grid-cols-2 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
            .grid-cols-3 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
            .grid-cols-4 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
            
            .flex-row { flex-direction: column !important; }
            .justify-between { justify-content: flex-start !important; }
            .items-center { align-items: flex-start !important; }
            
            .max-w-4xl, .max-w-6xl, .max-w-7xl { max-width: 100% !important; }
            .w-1/2, .w-1/3, .w-1/4 { width: 100% !important; }
            
            /* Mobile button adjustments */
            button, .btn {
              width: 100% !important;
              margin-bottom: 0.5rem !important;
              padding: 0.75rem 1rem !important;
              font-size: 1rem !important;
            }
            
            /* Mobile image adjustments */
            img {
              max-width: 100% !important;
              height: auto !important;
            }
          ` : deviceType === 'tablet' ? `
            /* Tablet-specific overrides */
            .text-4xl { font-size: 2.5rem !important; line-height: 1.2 !important; }
            .text-5xl { font-size: 3rem !important; line-height: 1.2 !important; }
            
            .grid-cols-4 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
            .grid-cols-3 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
            
            .px-8 { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
            .py-8 { padding-top: 2rem !important; padding-bottom: 2rem !important; }
            
            .max-w-6xl, .max-w-7xl { max-width: 48rem !important; }
          ` : ''}

          /* Device indicator */
          .device-indicator {
            position: fixed;
            top: 8px;
            right: 8px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 500;
            z-index: 9999;
            font-family: monospace;
          }

          /* Responsive helper classes */
          .responsive-container {
            width: 100%;
            max-width: 100%;
            margin: 0 auto;
            padding-left: ${deviceType === 'mobile' ? '1rem' : deviceType === 'tablet' ? '1.5rem' : '2rem'};
            padding-right: ${deviceType === 'mobile' ? '1rem' : deviceType === 'tablet' ? '1.5rem' : '2rem'};
          }

          .responsive-text {
            font-size: ${deviceType === 'mobile' ? '0.875rem' : deviceType === 'tablet' ? '1rem' : '1.125rem'};
            line-height: ${deviceType === 'mobile' ? '1.25rem' : deviceType === 'tablet' ? '1.5rem' : '1.75rem'};
          }

          .responsive-heading {
            font-size: ${deviceType === 'mobile' ? '1.5rem' : deviceType === 'tablet' ? '2rem' : '2.5rem'};
            line-height: 1.2;
            margin-bottom: ${deviceType === 'mobile' ? '0.75rem' : '1rem'};
          }

          /* Animation for smooth transitions */
          * {
            transition: all 0.2s ease-in-out;
          }

          /* Touch-friendly sizing for mobile */
          ${deviceType === 'mobile' ? `
            button, a, [role="button"] {
              min-height: 44px;
              min-width: 44px;
            }
          ` : ''}
        </style>
      </head>
      <body>
        <div class="device-indicator">
          ${deviceType.toUpperCase()} ${orientation} • ${currentConfig.width}×${currentConfig.height}
        </div>
        <div id="root"></div>
        <script type="text/babel">
          ${responsiveCode}
          
          // Enhanced error handling
          window.addEventListener('error', (e) => {
            console.error('Preview Error:', e.error);
            document.body.innerHTML = \`
              <div style="padding: 20px; background: #fee; border: 1px solid #fcc; border-radius: 8px; margin: 20px; color: #c33;">
                <h3 style="margin: 0 0 10px 0;">Preview Error</h3>
                <pre style="margin: 0; font-size: 12px; overflow: auto;">\${e.error.toString()}</pre>
              </div>
            \`;
          });
          
          try {
            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(React.createElement(${component.name}));
          } catch (error) {
            console.error('Render Error:', error);
            document.getElementById('root').innerHTML = \`
              <div style="padding: 20px; background: #fee; border: 1px solid #fcc; border-radius: 8px; color: #c33;">
                <h3 style="margin: 0 0 10px 0;">Component Render Error</h3>
                <pre style="margin: 0; font-size: 12px; white-space: pre-wrap;">\${error.toString()}</pre>
              </div>
            \`;
          }
        </script>
      </body>
      </html>
    `
  }, [component.code, component.name, deviceType, orientation, isAutoResponsive, currentConfig])

  // Update iframe when config changes
  useEffect(() => {
    if (iframeRef.current) {
      const html = generateEnhancedHTML()
      const blob = new Blob([html], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      iframeRef.current.src = url
      
      return () => URL.revokeObjectURL(url)
    }
  }, [generateEnhancedHTML])

  const handleMakeResponsive = () => {
    const responsiveCode = ResponsiveCodeTransformer.makeResponsive(component.code)
    onCodeUpdate(responsiveCode)
    setIsAutoResponsive(true)
  }

  const toggleOrientation = () => {
    setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait')
  }

  return (
    <div className="h-full flex flex-col bg-gray-50" ref={containerRef}>
      {/* Enhanced Control Bar */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Responsive className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-gray-700">Responsive Preview</span>
          </div>
          
          {/* Device Info */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="px-2 py-1 bg-gray-100 rounded font-mono">
              {currentConfig.width} × {currentConfig.height}
            </span>
            <span className="px-2 py-1 bg-gray-100 rounded">
              {Math.round(previewScale * 100)}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Auto-Responsive Toggle */}
          <button
            onClick={handleMakeResponsive}
            disabled={isAutoResponsive}
            className={`px-3 py-1.5 text-xs rounded-lg flex items-center gap-1 transition-colors ${
              isAutoResponsive
                ? 'bg-green-100 text-green-700'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <Wand2 className="w-3 h-3" />
            {isAutoResponsive ? 'Responsive Applied' : 'Make Responsive'}
          </button>

          {/* Device Type Selector */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            {(['mobile', 'tablet', 'desktop'] as const).map((device) => {
              const Icon = device === 'mobile' ? Smartphone : device === 'tablet' ? Tablet : Monitor
              return (
                <button
                  key={device}
                  onClick={() => setDeviceType(device)}
                  className={`px-3 py-2 text-xs flex items-center gap-1 transition-colors ${
                    deviceType === device
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } ${device !== 'mobile' ? 'border-l border-gray-300' : ''}`}
                >
                  <Icon className="w-3 h-3" />
                  {device.charAt(0).toUpperCase() + device.slice(1)}
                </button>
              )
            })}
          </div>

          {/* Orientation Toggle */}
          {(deviceType === 'mobile' || deviceType === 'tablet') && (
            <button
              onClick={toggleOrientation}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title={`Switch to ${orientation === 'portrait' ? 'landscape' : 'portrait'}`}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-6 overflow-hidden flex items-center justify-center">
        <div className="relative">
          {/* Device Frame */}
          <div 
            className={`relative bg-white rounded-lg shadow-2xl overflow-hidden ${
              deviceType === 'mobile' 
                ? 'border-8 border-gray-800' 
                : deviceType === 'tablet' 
                ? 'border-4 border-gray-600' 
                : 'border border-gray-300'
            }`}
            style={{
              width: currentConfig.width * previewScale,
              height: currentConfig.height * previewScale,
              transform: `scale(${previewScale})`,
              transformOrigin: 'center center'
            }}
          >
            {/* Device chrome */}
            {deviceType === 'mobile' && (
              <div className="absolute inset-x-0 top-0 h-6 bg-black flex items-center justify-center">
                <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
              </div>
            )}

            {deviceType === 'tablet' && (
              <div className="absolute inset-x-0 top-0 h-4 bg-gray-100 flex items-center justify-center">
                <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
              </div>
            )}

            {/* Preview iframe */}
            <iframe
              ref={iframeRef}
              className="w-full h-full border-none"
              style={{
                width: currentConfig.width,
                height: currentConfig.height,
                paddingTop: deviceType === 'mobile' ? '24px' : deviceType === 'tablet' ? '16px' : '0'
              }}
              title={`${component.name} - ${deviceType} ${orientation} preview`}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>

          {/* Scale Indicator */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
            Scale: {Math.round(previewScale * 100)}%
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-t border-gray-200 text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span>Device: {deviceType}</span>
          <span>Orientation: {orientation}</span>
          <span>Viewport: {currentConfig.width}×{currentConfig.height}</span>
        </div>
        <div className="flex items-center gap-2">
          {isAutoResponsive && (
            <span className="text-green-600 font-medium">✓ Responsive</span>
          )}
          <span>Component: {component.name}</span>
        </div>
      </div>
    </div>
  )
}


export const EditComponentWithResponsive: React.FC<EditComponentProps> = (props) => {
  const [activeTab, setActiveTab] = useState<'code' | 'preview' | 'settings'>('preview')
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-full max-h-[95vh] flex flex-col">
        {/* Header - same as before */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          {/* Header content */}
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'code'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Code className="w-4 h-4 inline mr-2" />
            Code Editor
          </button>
          
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'preview'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Responsive className="w-4 h-4 inline mr-2" />
            Responsive Preview
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'preview' && (
            <EnhancedPreview
              component={props.component}
              onCodeUpdate={(code) => {
                // Update the component code
                const updatedComponent = { ...props.component, code }
                props.onSave(updatedComponent)
              }}
            />
          )}
          {/* Other tabs would render here */}
        </div>
      </div>
    </div>
  )
}