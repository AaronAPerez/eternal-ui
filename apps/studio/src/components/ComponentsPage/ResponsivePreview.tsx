// =================================================================
// RESPONSIVE PREVIEW COMPONENT WITH PROPER SCALING
// =================================================================

import React, { useState, useRef, useEffect } from 'react'
import { Monitor, Tablet, Smartphone, RotateCcw, X } from 'lucide-react'
import { ComponentData } from '.'

interface ResponsivePreviewProps {
  component: ComponentData
  error: string | null
}

type DeviceType = 'mobile' | 'tablet' | 'desktop'
type Orientation = 'portrait' | 'landscape'

const deviceConfigs = {
  mobile: {
    portrait: { width: 375, height: 667, scale: 0.8 },
    landscape: { width: 667, height: 375, scale: 0.6 }
  },
  tablet: {
    portrait: { width: 768, height: 1024, scale: 0.6 },
    landscape: { width: 1024, height: 768, scale: 0.7 }
  },
  desktop: {
    portrait: { width: 1200, height: 800, scale: 0.8 },
    landscape: { width: 1200, height: 800, scale: 0.8 }
  }
}

export const ResponsivePreview = React.forwardRef<HTMLIFrameElement, ResponsivePreviewProps>(
  ({ component, error }, ref) => {
    const [deviceType, setDeviceType] = useState<DeviceType>('desktop')
    const [orientation, setOrientation] = useState<Orientation>('portrait')
    const [isLoading, setIsLoading] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const currentConfig = deviceConfigs[deviceType][orientation]

    // Generate responsive preview HTML with proper breakpoints
    const generateResponsiveHTML = (device: DeviceType) => {
      const breakpoints = {
        mobile: 'max-width: 640px',
        tablet: 'min-width: 641px and max-width: 1024px',
        desktop: 'min-width: 1025px'
      }

      return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${component.name} - ${device} Preview</title>
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            * {
              box-sizing: border-box;
            }
            
            body { 
              margin: 0; 
              padding: 16px; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
              background: #f8fafc;
              min-height: 100vh;
              line-height: 1.5;
            }
            
            .preview-container {
              background: white;
              border-radius: 8px;
              padding: 20px;
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
              width: 100%;
              max-width: 100%;
              overflow-x: auto;
            }

            /* Mobile-first responsive styles */
            @media (max-width: 640px) {
              body { padding: 8px; font-size: 14px; }
              .preview-container { padding: 12px; border-radius: 6px; }
              
              /* Mobile text sizing */
              h1 { font-size: 1.875rem; line-height: 2.25rem; }
              h2 { font-size: 1.5rem; line-height: 2rem; }
              h3 { font-size: 1.25rem; line-height: 1.75rem; }
              h4 { font-size: 1.125rem; line-height: 1.75rem; }
              p { font-size: 0.875rem; line-height: 1.25rem; }
              
              /* Mobile spacing */
              .space-y-6 > * + * { margin-top: 1rem; }
              .space-y-4 > * + * { margin-top: 0.75rem; }
              .space-y-2 > * + * { margin-top: 0.5rem; }
              
              /* Mobile padding/margins */
              .p-6 { padding: 1rem; }
              .p-4 { padding: 0.75rem; }
              .py-8 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
              .px-8 { padding-left: 1rem; padding-right: 1rem; }
              
              /* Mobile grid adjustments */
              .grid-cols-3 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
              .grid-cols-2 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
              .gap-6 { gap: 1rem; }
              .gap-4 { gap: 0.75rem; }
              
              /* Mobile flex adjustments */
              .flex-row { flex-direction: column; }
              .justify-between { justify-content: flex-start; }
              .items-center { align-items: flex-start; }
              
              /* Mobile button sizing */
              .px-6 { padding-left: 1rem; padding-right: 1rem; }
              .py-3 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
              
              /* Mobile image sizing */
              img { max-width: 100%; height: auto; }
              .w-full { width: 100%; }
              .max-w-sm { max-width: 100%; }
            }
            
            @media (min-width: 641px) and (max-width: 1024px) {
              body { padding: 12px; font-size: 15px; }
              .preview-container { padding: 16px; }
              
              /* Tablet text sizing */
              h1 { font-size: 2.25rem; line-height: 2.5rem; }
              h2 { font-size: 1.875rem; line-height: 2.25rem; }
              h3 { font-size: 1.5rem; line-height: 2rem; }
              h4 { font-size: 1.25rem; line-height: 1.75rem; }
              p { font-size: 1rem; line-height: 1.5rem; }
              
              /* Tablet spacing */
              .space-y-6 > * + * { margin-top: 1.25rem; }
              .space-y-4 > * + * { margin-top: 1rem; }
              
              /* Tablet grid adjustments */
              .grid-cols-3 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
              .grid-cols-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
              .gap-6 { gap: 1.25rem; }
              
              /* Tablet padding adjustments */
              .p-6 { padding: 1.25rem; }
              .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
              .px-8 { padding-left: 1.5rem; padding-right: 1.5rem; }
            }
            
            @media (min-width: 1025px) {
              /* Desktop keeps original sizing */
              body { padding: 20px; }
              .preview-container { padding: 24px; }
            }

            /* Component-specific responsive adjustments */
            .component-card {
              border: 1px solid #e5e7eb;
              border-radius: 0.5rem;
              overflow: hidden;
              transition: all 0.2s;
            }
            
            @media (max-width: 640px) {
              .component-card {
                margin-bottom: 1rem;
              }
              
              .component-card h3 {
                font-size: 1rem;
                margin-bottom: 0.5rem;
              }
              
              .component-card p {
                font-size: 0.875rem;
                line-height: 1.25rem;
              }
              
              .component-card button {
                font-size: 0.875rem;
                padding: 0.5rem 1rem;
              }
            }
            
            @media (min-width: 641px) and (max-width: 1024px) {
              .component-card h3 {
                font-size: 1.125rem;
              }
              
              .component-card p {
                font-size: 0.9375rem;
              }
            }

            /* Responsive utilities */
            .responsive-text {
              font-size: clamp(0.875rem, 2.5vw, 1.125rem);
            }
            
            .responsive-heading {
              font-size: clamp(1.5rem, 4vw, 2.25rem);
              line-height: 1.2;
            }
            
            .responsive-container {
              max-width: 100%;
              margin: 0 auto;
              padding: clamp(1rem, 3vw, 2rem);
            }

            /* Debug helper for responsive testing */
            .debug-device::before {
              content: '${device.toUpperCase()}';
              position: fixed;
              top: 10px;
              right: 10px;
              background: rgba(0, 0, 0, 0.8);
              color: white;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              z-index: 9999;
            }
          </style>
        </head>
        <body class="debug-device">
          <div id="root" class="preview-container"></div>
          <script type="text/babel">
            // Enhanced component code with responsive utilities
            ${component.code}
            
            // Render the component
            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(React.createElement(${component.name}));
          </script>
        </body>
        </html>
      `
    }

    // Update preview when device type or orientation changes
    const updatePreview = () => {
      if (ref && 'current' in ref && ref.current) {
        setIsLoading(true)
        const html = generateResponsiveHTML(deviceType)
        const blob = new Blob([html], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        ref.current.src = url
        
        // Clean up previous blob URL
        ref.current.onload = () => {
          setIsLoading(false)
          URL.revokeObjectURL(url)
        }
      }
    }

    useEffect(() => {
      updatePreview()
    }, [deviceType, orientation, component.code])

    const toggleOrientation = () => {
      setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait')
    }

    return (
      <div className="h-full flex flex-col bg-gray-50">
        {/* Enhanced Preview Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Responsive Preview</span>
            </div>
            
            {/* Device Size Indicator */}
            <div className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
              {currentConfig.width} × {currentConfig.height}
            </div>
            
            {isLoading && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <div className="w-3 h-3 border border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                Loading...
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Device Type Buttons */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setDeviceType('mobile')}
                className={`px-3 py-2 text-sm flex items-center gap-1 transition-colors ${
                  deviceType === 'mobile'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Smartphone className="w-3 h-3" />
                Mobile
              </button>
              <button
                onClick={() => setDeviceType('tablet')}
                className={`px-3 py-2 text-sm flex items-center gap-1 border-l border-gray-300 transition-colors ${
                  deviceType === 'tablet'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Tablet className="w-3 h-3" />
                Tablet
              </button>
              <button
                onClick={() => setDeviceType('desktop')}
                className={`px-3 py-2 text-sm flex items-center gap-1 border-l border-gray-300 transition-colors ${
                  deviceType === 'desktop'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Monitor className="w-3 h-3" />
                Desktop
              </button>
            </div>
            
            {/* Orientation Toggle */}
            {(deviceType === 'mobile' || deviceType === 'tablet') && (
              <button
                onClick={toggleOrientation}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="Toggle orientation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
            
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 ml-2">
              <span className="text-xs text-gray-500">
                {Math.round(currentConfig.scale * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Preview Content with Device Frame */}
        <div className="flex-1 p-6 overflow-auto flex items-center justify-center">
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
              <div className="flex items-center gap-2 text-red-800 mb-2">
                <X className="w-4 h-4" />
                <span className="font-medium">Preview Error</span>
              </div>
              <pre className="text-sm text-red-700 whitespace-pre-wrap">{error}</pre>
            </div>
          ) : (
            <div 
              className="relative bg-white rounded-lg shadow-xl overflow-hidden"
              style={{
                width: currentConfig.width * currentConfig.scale,
                height: currentConfig.height * currentConfig.scale,
                transform: `scale(${currentConfig.scale})`,
                transformOrigin: 'center center'
              }}
            >
              {/* Device Frame */}
              <div className="absolute inset-0 pointer-events-none">
                {deviceType === 'mobile' && (
                  <div className="absolute inset-x-0 top-0 h-6 bg-black rounded-t-lg flex items-center justify-center">
                    <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                  </div>
                )}
                {deviceType === 'tablet' && (
                  <div className="absolute inset-x-0 top-0 h-4 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <div className="w-8 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                )}
              </div>
              
              {/* Preview iframe */}
              <iframe
                ref={ref}
                className="w-full h-full border-none"
                style={{
                  width: currentConfig.width,
                  height: currentConfig.height,
                  paddingTop: deviceType === 'mobile' ? '24px' : deviceType === 'tablet' ? '16px' : '0'
                }}
                title={`${component.name} - ${deviceType} preview`}
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          )}
        </div>

        {/* Preview Info Footer */}
        <div className="flex items-center justify-between p-4 bg-white border-t border-gray-200 text-xs text-gray-500">
          <div>
            Device: {deviceType} ({orientation}) • 
            Scale: {Math.round(currentConfig.scale * 100)}%
          </div>
          <div>
            Component: {component.name}
          </div>
        </div>
      </div>
    )
  }
)


// =================================================================
// RESPONSIVE COMPONENT CODE GENERATOR
// =================================================================

export const ResponsiveCodeGenerator = {
  /**
   * Transform component code to be responsive-ready
   */
  makeResponsive(componentCode: string): string {
    // Add responsive utilities and proper breakpoint classes
    let responsiveCode = componentCode

    // Replace common non-responsive patterns with responsive ones
    const replacements = [
      // Text sizing
      { from: /text-xl/g, to: 'text-lg md:text-xl lg:text-2xl' },
      { from: /text-2xl/g, to: 'text-xl md:text-2xl lg:text-3xl' },
      { from: /text-3xl/g, to: 'text-2xl md:text-3xl lg:text-4xl' },
      { from: /text-4xl/g, to: 'text-3xl md:text-4xl lg:text-5xl' },
      
      // Spacing
      { from: /p-6/g, to: 'p-4 md:p-6' },
      { from: /p-8/g, to: 'p-6 md:p-8' },
      { from: /py-8/g, to: 'py-6 md:py-8' },
      { from: /px-8/g, to: 'px-4 md:px-6 lg:px-8' },
      { from: /space-y-6/g, to: 'space-y-4 md:space-y-6' },
      { from: /gap-6/g, to: 'gap-4 md:gap-6' },
      
      // Grid layouts
      { from: /grid-cols-3/g, to: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' },
      { from: /grid-cols-4/g, to: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' },
      { from: /grid-cols-2/g, to: 'grid-cols-1 md:grid-cols-2' },
      
      // Flex layouts
      { from: /flex-row/g, to: 'flex-col md:flex-row' },
      { from: /justify-between/g, to: 'justify-start md:justify-between' },
      
      // Container sizing
      { from: /max-w-4xl/g, to: 'max-w-full md:max-w-2xl lg:max-w-4xl' },
      { from: /max-w-6xl/g, to: 'max-w-full md:max-w-4xl lg:max-w-6xl' },
      
      // Button sizing
      { from: /px-6 py-3/g, to: 'px-4 py-2 md:px-6 md:py-3' },
      { from: /px-8 py-4/g, to: 'px-6 py-3 md:px-8 md:py-4' }
    ]

    replacements.forEach(({ from, to }) => {
      responsiveCode = responsiveCode.replace(from, to)
    })

    // Add responsive container wrapper if not present
    if (!responsiveCode.includes('responsive-container')) {
      responsiveCode = responsiveCode.replace(
        /className="([^"]*?)"/g,
        (match, classes) => {
          if (classes.includes('container') || classes.includes('max-w')) {
            return `className="${classes} responsive-container"`
          }
          return match
        }
      )
    }

    return responsiveCode
  },

  /**
   * Add responsive utility classes to component
   */
  addResponsiveUtils(componentCode: string): string {
    const utilsCode = `
// Responsive utility hooks and components
import { useState, useEffect } from 'react'

const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState('desktop')
  
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

const ResponsiveText = ({ mobile, tablet, desktop, className = '', ...props }) => {
  const breakpoint = useResponsive()
  const text = breakpoint === 'mobile' ? mobile : breakpoint === 'tablet' ? tablet : desktop
  return <span className={className} {...props}>{text}</span>
}

const ResponsiveContainer = ({ children, className = '' }) => (
  <div className={\`responsive-container \${className}\`}>
    {children}
  </div>
)

${componentCode}
    `
    
    return utilsCode
  }
}