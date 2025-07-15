'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { REAL_WORLD_COMPONENT_LIBRARY } from './RealWorldComponents'

// Use the same interfaces as the real-world components
interface ComponentMeta {
  id: string
  name: string
  description: string
  category: 'layout' | 'navigation' | 'content' | 'forms' | 'data' | 'interactive' | 'ecommerce' | 'marketing' | 'social' | 'media'
  tags: string[]
  complexity: 'beginner' | 'intermediate' | 'advanced'
  popularity: number
  isPremium: boolean
  propsSchema: Record<string, PropSchema>
  defaultProps: Record<string, any>
  codeExample: string
  bundleSize: number
  renderScore: number
  wcagLevel: 'A' | 'AA' | 'AAA'
  rating: number
  downloadCount: number
  lastUpdated: string
  component: React.ComponentType<any>
}

interface PropSchema {
  type: 'string' | 'number' | 'boolean' | 'color' | 'select' | 'slider' | 'textarea'
  label: string
  description?: string
  default?: any
  options?: Array<{ label: string; value: any }>
  min?: number
  max?: number
}

export default function ComponentShowcase() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentMeta | null>(
    REAL_WORLD_COMPONENT_LIBRARY[0] || null
  )
  const [props, setProps] = useState<Record<string, any>>(
    REAL_WORLD_COMPONENT_LIBRARY[0]?.defaultProps || {}
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isPropsOpen, setIsPropsOpen] = useState(true)

  // Use the imported real-world components
  const components = REAL_WORLD_COMPONENT_LIBRARY

  // Filter components based on search and category
  const filteredComponents = useMemo(() => {
    return components.filter(component => {
      const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           component.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory, components])

  // Get unique categories
  const categories = useMemo(() => {
    const cats = components.reduce((acc, component) => {
      if (!acc.includes(component.category)) {
        acc.push(component.category)
      }
      return acc
    }, [] as string[])
    return ['all', ...cats]
  }, [components])

  // Handle component selection
  const handleComponentSelect = useCallback((component: ComponentMeta) => {
    setSelectedComponent(component)
    setProps(component.defaultProps)
  }, [])

  // Handle prop changes
  const handlePropChange = useCallback((key: string, value: any) => {
    setProps(prev => ({ ...prev, [key]: value }))
  }, [])

  // Render prop editor
  const renderPropEditor = useCallback((key: string, schema: PropSchema) => {
    const value = props[key]

    switch (schema.type) {
      case 'string':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handlePropChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder={schema.default}
          />
        )
      
      case 'number':
        return (
          <input
            type="number"
            value={value || 0}
            onChange={(e) => handlePropChange(key, parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            min={schema.min}
            max={schema.max}
          />
        )
      
      case 'boolean':
        return (
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => handlePropChange(key, e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">{schema.label}</span>
          </label>
        )
      
      case 'color':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={value || schema.default}
              onChange={(e) => handlePropChange(key, e.target.value)}
              className="h-10 w-16 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={value || schema.default}
              onChange={(e) => handlePropChange(key, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="#6366f1"
            />
          </div>
        )
      
      case 'select':
        return (
          <select
            value={value || schema.default}
            onChange={(e) => handlePropChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {schema.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      
      case 'slider':
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={schema.min || 0}
              max={schema.max || 100}
              value={value || schema.default}
              onChange={(e) => handlePropChange(key, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{schema.min || 0}</span>
              <span className="font-medium">{value || schema.default}</span>
              <span>{schema.max || 100}</span>
            </div>
          </div>
        )
      
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handlePropChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={4}
            placeholder={schema.default}
          />
        )
      
      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handlePropChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        )
    }
  }, [props, handlePropChange])

  if (!components.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-gray-400 text-lg mb-2">Loading components...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Search and Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <svg
                className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Component List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            {filteredComponents.map((component) => (
              <button
                key={component.id}
                onClick={() => handleComponentSelect(component)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                  selectedComponent?.id === component.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{component.name}</h3>
                  <div className="flex items-center space-x-1">
                    {component.isPremium && (
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        Pro
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      component.complexity === 'beginner' ? 'bg-green-100 text-green-800' :
                      component.complexity === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {component.complexity}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{component.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {component.rating}
                  </span>
                  <span>{component.downloadCount.toLocaleString()} downloads</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedComponent ? (
          <>
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{selectedComponent.name}</h1>
                  <p className="text-gray-600">{selectedComponent.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>WCAG {selectedComponent.wcagLevel}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{selectedComponent.bundleSize}KB</span>
                  </div>
                  <button
                    onClick={() => setIsPropsOpen(!isPropsOpen)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {isPropsOpen ? 'Hide Props' : 'Show Props'}
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex">
              {/* Preview */}
              <div className="flex-1 p-6 overflow-auto">
                <div className="bg-white rounded-lg shadow-lg min-h-full">
                  {selectedComponent.component && (
                    <selectedComponent.component {...props} />
                  )}
                </div>
              </div>

              {/* Props Panel */}
              {isPropsOpen && (
                <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
                    <p className="text-sm text-gray-600">Customize the component</p>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {Object.entries(selectedComponent.propsSchema).map(([key, schema]) => (
                      <div key={key} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          {schema.label}
                          {schema.description && (
                            <span className="block text-xs text-gray-500 font-normal">
                              {schema.description}
                            </span>
                          )}
                        </label>
                        {renderPropEditor(key, schema)}
                      </div>
                    ))}
                  </div>

                  {/* Code Example */}
                  <div className="border-t border-gray-200 p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Code Example</h3>
                    <div className="bg-gray-100 rounded-lg p-3 text-xs font-mono text-gray-800 overflow-x-auto">
                      <pre>{selectedComponent.codeExample}</pre>
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText(selectedComponent.codeExample)}
                      className="mt-2 w-full px-3 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                    >
                      Copy Code
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Welcome Screen */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Real-World Component Library</h2>
              <p className="text-gray-600 mb-4">
                Explore our collection of production-ready React components. 
                Select a component from the sidebar to see it in action with live prop editing.
              </p>
              <div className="text-sm text-gray-500">
                <div className="flex items-center justify-center space-x-4">
                  <span>{components.length} Components</span>
                  <span>•</span>
                  <span>Live Editing</span>
                  <span>•</span>
                  <span>TypeScript Ready</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}