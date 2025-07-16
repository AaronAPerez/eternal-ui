'use client'

import React, { useState, useRef, useEffect } from 'react'
import { 
  X, 
  Code, 
  Eye, 
  Settings, 
  Save, 
  Smartphone, 
  Tablet, 
  Monitor, 
  RotateCcw,
  Wand2,
  Camera
} from 'lucide-react'

interface ComponentData {
  id: string
  name: string
  description: string
  category: string
  code?: string
  tags: string[]
  complexity: 'beginner' | 'intermediate' | 'advanced'
  isPremium: boolean
  popularity: number
}

interface EditComponentModalProps {
  component: ComponentData
  isOpen: boolean
  onClose: () => void
  onSave: (component: ComponentData) => void
}

type DeviceType = 'mobile' | 'tablet' | 'desktop'
type TabType = 'code' | 'preview' | 'settings'

export const EditComponentModal: React.FC<EditComponentModalProps> = ({
  component,
  isOpen,
  onClose,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('code')
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop')
  const [editedComponent, setEditedComponent] = useState<ComponentData>(component)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false)
  
  const previewRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    setEditedComponent(component)
    setHasUnsavedChanges(false)
  }, [component])

  const deviceConfigs = {
    mobile: { width: 375, height: 667, scale: 0.8 },
    tablet: { width: 768, height: 1024, scale: 0.6 },
    desktop: { width: 1200, height: 800, scale: 0.8 }
  }

  const currentConfig = deviceConfigs[deviceType]

  const sampleCode = `const ${editedComponent.name.replace(/\s+/g, '')} = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            ${editedComponent.name}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            ${editedComponent.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}`

  const [code, setCode] = useState(sampleCode)

  const generateResponsiveHTML = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${editedComponent.name} Preview</title>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { 
            margin: 0; 
            padding: ${deviceType === 'mobile' ? '12px' : deviceType === 'tablet' ? '16px' : '20px'}; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: white;
            line-height: 1.6;
          }
          
          ${deviceType === 'mobile' ? `
            .text-4xl { font-size: 1.875rem !important; }
            .text-6xl { font-size: 2.25rem !important; }
            .text-xl { font-size: 1.125rem !important; }
            .text-2xl { font-size: 1.5rem !important; }
            .py-20 { padding-top: 3rem !important; padding-bottom: 3rem !important; }
            .px-8 { padding-left: 1rem !important; padding-right: 1rem !important; }
            .flex-row { flex-direction: column !important; }
            .gap-4 { gap: 1rem !important; }
          ` : ''}
          
          .device-indicator {
            position: fixed;
            top: 8px;
            right: 8px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            z-index: 9999;
          }
        </style>
      </head>
      <body>
        <div class="device-indicator">${deviceType.toUpperCase()}</div>
        <div id="root"></div>
        <script type="text/babel">
          ${code}
          
          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(React.createElement(${editedComponent.name.replace(/\s+/g, '')}));
        </script>
      </body>
      </html>
    `
  }

  const updatePreview = () => {
    if (previewRef.current) {
      const html = generateResponsiveHTML()
      const blob = new Blob([html], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      previewRef.current.src = url
    }
  }

  useEffect(() => {
    if (activeTab === 'preview') {
      const timeoutId = setTimeout(updatePreview, 500)
      return () => clearTimeout(timeoutId)
    }
  }, [code, deviceType, activeTab, editedComponent])

  const handleSave = () => {
    const updatedComponent = {
      ...editedComponent,
      code
    }
    onSave(updatedComponent)
    setHasUnsavedChanges(false)
  }

  const makeResponsive = () => {
    const responsiveCode = code
      .replace(/text-4xl/g, 'text-2xl md:text-4xl lg:text-5xl')
      .replace(/text-6xl/g, 'text-3xl md:text-5xl lg:text-6xl')
      .replace(/text-xl/g, 'text-lg md:text-xl lg:text-2xl')
      .replace(/text-2xl/g, 'text-xl md:text-2xl lg:text-3xl')
      .replace(/py-20/g, 'py-12 md:py-16 lg:py-20')
      .replace(/px-8/g, 'px-4 md:px-6 lg:px-8')
      .replace(/flex-row/g, 'flex-col sm:flex-row')
      .replace(/gap-4/g, 'gap-3 sm:gap-4')
    
    setCode(responsiveCode)
    setHasUnsavedChanges(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-full max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Edit: {editedComponent.name}
            </h2>
            {hasUnsavedChanges && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                Unsaved Changes
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={makeResponsive}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <Wand2 className="w-4 h-4" />
              Make Responsive
            </button>
            
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
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
            <Eye className="w-4 h-4 inline mr-2" />
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
            <Settings className="w-4 h-4 inline mr-2" />
            Settings
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'code' && (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
                <span className="text-sm font-medium text-gray-700">React Component</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{code.split('\n').length} lines</span>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50">
                    Format
                  </button>
                </div>
              </div>
              <div className="flex-1 relative">
                <textarea
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value)
                    setHasUnsavedChanges(true)
                  }}
                  className="absolute inset-0 w-full h-full p-4 font-mono text-sm resize-none outline-none border-none bg-gray-900 text-gray-100"
                  placeholder="Enter your component code here..."
                  spellCheck={false}
                />
              </div>
            </div>
          )}
          
          {activeTab === 'preview' && (
            <div className="h-full flex flex-col bg-gray-50">
              {/* Preview Controls */}
              <div className="flex items-center justify-between p-4 bg-white border-b">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Live Preview</span>
                </div>
                
                <div className="flex items-center gap-2">
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
                </div>
              </div>

              {/* Preview Area */}
              <div className="flex-1 p-6 overflow-auto flex items-center justify-center">
                <div 
                  className="relative bg-white rounded-lg shadow-xl overflow-hidden"
                  style={{
                    width: currentConfig.width * currentConfig.scale,
                    height: currentConfig.height * currentConfig.scale,
                  }}
                >
                  {/* Device Frame */}
                  {deviceType === 'mobile' && (
                    <div className="absolute inset-x-0 top-0 h-6 bg-black flex items-center justify-center">
                      <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
                    </div>
                  )}
                  
                  <iframe
                    ref={previewRef}
                    className="w-full h-full border-none"
                    style={{
                      width: currentConfig.width,
                      height: currentConfig.height,
                      paddingTop: deviceType === 'mobile' ? '24px' : '0'
                    }}
                    title={`${editedComponent.name} preview`}
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="h-full overflow-y-auto p-6">
              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Component Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Component Name
                      </label>
                      <input
                        type="text"
                        value={editedComponent.name}
                        onChange={(e) => {
                          setEditedComponent(prev => ({ ...prev, name: e.target.value }))
                          setHasUnsavedChanges(true)
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={editedComponent.description}
                        onChange={(e) => {
                          setEditedComponent(prev => ({ ...prev, description: e.target.value }))
                          setHasUnsavedChanges(true)
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={editedComponent.category}
                        onChange={(e) => {
                          setEditedComponent(prev => ({ ...prev, category: e.target.value }))
                          setHasUnsavedChanges(true)
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="layout">Layout</option>
                        <option value="content">Content</option>
                        <option value="forms">Forms</option>
                        <option value="data">Data</option>
                        <option value="commerce">Commerce</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Complexity
                      </label>
                      <select
                        value={editedComponent.complexity}
                        onChange={(e) => {
                          setEditedComponent(prev => ({ ...prev, complexity: e.target.value as any }))
                          setHasUnsavedChanges(true)
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}