'use client'

import React, { useState } from 'react'
import { 
  Palette, 
  Square, 
  Type, 
  Image, 
  Layout, 
  Grid,
  Plus,
  Settings,
  Eye,
  Code,
  Save,
  Download
} from 'lucide-react'

function BuilderInterface() {
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [canvasComponents, setCanvasComponents] = useState([])

  // Basic component library
  const components = [
    { id: 'button', name: 'Button', icon: Square, color: 'bg-blue-500' },
    { id: 'text', name: 'Text', icon: Type, color: 'bg-green-500' },
    { id: 'image', name: 'Image', icon: Image, color: 'bg-purple-500' },
    { id: 'container', name: 'Container', icon: Layout, color: 'bg-orange-500' }
  ]

  const addComponent = (componentType) => {
    const newComponent = {
      id: `${componentType}-${Date.now()}`,
      type: componentType,
      content: `New ${componentType}`,
      position: { x: 50, y: 50 + canvasComponents.length * 60 }
    }
    setCanvasComponents(prev => [...prev, newComponent])
  }

  return (
    <div className="h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Palette className="w-6 h-6 text-blue-500 dark:text-blue-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Visual Builder
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
              <Eye className="w-4 h-4" />
              <span className="text-sm">Preview</span>
            </button>
            
            <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
              <Code className="w-4 h-4" />
              <span className="text-sm">Code</span>
            </button>
            
            <button className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Save className="w-4 h-4" />
              <span className="text-sm">Save</span>
            </button>
            
            <button className="flex items-center space-x-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              <Download className="w-4 h-4" />
              <span className="text-sm">Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Components */}
        <div className="w-80 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Components</h3>
          
          <div className="space-y-2">
            {components.map(component => (
              <button
                key={component.id}
                onClick={() => addComponent(component.id)}
                className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
              >
                <div className={`p-2 rounded ${component.color} text-white group-hover:scale-110 transition-transform`}>
                  <component.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {component.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Drag & drop component
                  </div>
                </div>
                <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
              </button>
            ))}
          </div>

          <div className="mt-8">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Templates</h4>
            <div className="space-y-2">
              <button className="w-full p-3 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                <div className="font-medium text-gray-900 dark:text-white">Landing Page</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Hero + Features + CTA</div>
              </button>
              <button className="w-full p-3 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                <div className="font-medium text-gray-900 dark:text-white">Dashboard</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Cards + Charts + Tables</div>
              </button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 h-full relative overflow-hidden">
            {canvasComponents.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Layout className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Start Building
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Drag components from the sidebar to get started
                  </p>
                  <div className="inline-flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Palette className="w-4 h-4" />
                    <span>Visual drag & drop builder</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                {canvasComponents.map(component => (
                  <div
                    key={component.id}
                    className={`absolute p-4 bg-white dark:bg-gray-800 border-2 rounded-lg shadow-sm cursor-move transition-all ${
                      selectedComponent === component.id 
                        ? 'border-blue-500 shadow-lg' 
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    style={{
                      left: component.position.x,
                      top: component.position.y,
                      minWidth: '120px'
                    }}
                    onClick={() => setSelectedComponent(component.id)}
                  >
                    <div className="flex items-center space-x-2">
                      {components.find(c => c.id === component.type)?.icon && (
                        React.createElement(components.find(c => c.id === component.type).icon, {
                          className: "w-4 h-4 text-gray-500"
                        })
                      )}
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {component.content}
                      </span>
                    </div>
                    
                    {selectedComponent === component.id && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Settings className="w-5 h-5 text-gray-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Properties</h3>
          </div>
          
          {selectedComponent ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content
                </label>
                <input
                  type="text"
                  value={canvasComponents.find(c => c.id === selectedComponent)?.content || ''}
                  onChange={(e) => {
                    setCanvasComponents(prev =>
                      prev.map(comp =>
                        comp.id === selectedComponent
                          ? { ...comp, content: e.target.value }
                          : comp
                      )
                    );
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Background Color
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['bg-white', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-yellow-500', 'bg-gray-500', 'bg-black'].map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded border-2 border-gray-300 ${color}`}
                      onClick={() => {
                        // Handle color change
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Size
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>
              
              <button 
                onClick={() => {
                  setCanvasComponents(prev => prev.filter(c => c.id !== selectedComponent));
                  setSelectedComponent(null);
                }}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete Component
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <Square className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Select a component to edit its properties
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BuilderInterface