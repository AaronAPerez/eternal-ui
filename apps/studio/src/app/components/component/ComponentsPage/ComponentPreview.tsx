'use client'

import React, { useState } from 'react'
import { 
  X, 
  Code, 
  Eye, 
  Download, 
  Copy, 
  Settings,
  Smartphone,
  Tablet,
  Monitor,
  Palette
} from 'lucide-react'
import { componentRegistry } from '@/data/components'


interface ComponentPreviewProps {
  componentId: string
  onClose: () => void
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  componentId,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'props'>('preview')
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [darkMode, setDarkMode] = useState(false)

  const component = componentRegistry.find(c => c.id === componentId)
  if (!component) return null

  const currentVariant = component.variants[selectedVariant]
  const Component = component.component

  const viewportSizes = {
    desktop: 'w-full',
    tablet: 'w-96',
    mobile: 'w-80'
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="relative h-full flex">
        {/* Main Preview Area */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {component.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {component.description}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Viewport Controls */}
              <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 p-1">
                <button
                  onClick={() => setViewport('desktop')}
                  className={`p-2 rounded ${
                    viewport === 'desktop'
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewport('tablet')}
                  className={`p-2 rounded ${
                    viewport === 'tablet'
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewport('mobile')}
                  className={`p-2 rounded ${
                    viewport === 'mobile'
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Palette className="w-4 h-4" />
              </button>
              
              <button
                onClick={onClose}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'preview'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <Eye className="w-4 h-4 inline mr-2" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'code'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <Code className="w-4 h-4 inline mr-2" />
              Code
            </button>
            <button
              onClick={() => setActiveTab('props')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'props'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Props
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {activeTab === 'preview' && (
              <div className={`h-full ${darkMode ? 'dark' : ''}`}>
                <div className="h-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-8">
                  <div className={`${viewportSizes[viewport]} transition-all duration-300`}>
                    <Component {...currentVariant.props} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="h-full bg-gray-900 text-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    {currentVariant.name}
                  </h3>
                  <button className="flex items-center space-x-2 px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 transition-colors">
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </button>
                </div>
                
                <pre className="bg-gray-800 p-4 rounded-lg overflow-auto text-sm">
                  <code>{currentVariant.code}</code>
                </pre>
                
                {/* Installation Instructions */}
                <div className="mt-6">
                  <h4 className="text-md font-semibold mb-2">Installation</h4>
                  <pre className="bg-gray-800 p-4 rounded-lg text-sm">
                    <code>{`npm install @eternal-ui/components
import { ${component.name.replace(/\s+/g, '')} } from '@eternal-ui/components'`}</code>
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'props' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Component Properties
                </h3>
                
                <div className="space-y-4">
                  {component.props.map((prop) => (
                    <div key={prop.name} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {prop.name}
                        </h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {prop.type}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                        {prop.description}
                      </p>
                      {prop.default && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Default: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                            {prop.default}
                          </code>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Component Features */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Features
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(component.features).map(([feature, enabled]) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          enabled ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                        <span className={`text-sm ${
                          enabled ? 'text-gray-900 dark:text-white' : 'text-gray-500'
                        }`}>
                          {feature.charAt(0).toUpperCase() + feature.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-6">
          {/* Variants */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Variants
            </h3>
            <div className="space-y-2">
              {component.variants.map((variant, index) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(index)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedVariant === index
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900'
                      : 'border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="font-medium text-gray-900 dark:text-white">
                    {variant.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {variant.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Component Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Category:</span>
                <span className="text-gray-900 dark:text-white capitalize">
                  {component.category}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Complexity:</span>
                <span className="text-gray-900 dark:text-white capitalize">
                  {component.complexity}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Bundle Size:</span>
                <span className="text-gray-900 dark:text-white">
                  {component.performance.bundleSize}KB
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Popularity:</span>
                <span className="text-gray-900 dark:text-white">
                  {component.popularity}/100
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Add to Project</span>
            </button>
            
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Copy className="w-4 h-4" />
              <span>Copy Code</span>
            </button>
          </div>

          {/* Tags */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Tags
            </h4>
            <div className="flex flex-wrap gap-1">
              {component.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}