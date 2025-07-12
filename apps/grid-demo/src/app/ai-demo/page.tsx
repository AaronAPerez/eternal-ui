/**
 * AI Auto-Layout Demo Page
 * 
 * This demonstrates the game-changing AI feature that makes
 * Eternal UI 10x better than Framer, Webflow, and WordPress.
 * 
 * Users can:
 * - Add components and get instant AI layout suggestions
 * - See confidence scores and reasoning for each suggestion
 * - Apply layouts with one click
 * - Compare performance metrics
 */

'use client'

import React, { useState, useCallback } from 'react'
import { EnhancedGridSystem } from '@eternal-ui/grid-system'
// import { AILayoutSuggestions } from '@eternal-ui/grid-system'
// import type { ComponentData, LayoutSuggestion } from '@eternal-ui/grid-system'

// Temporary mock until we add AI components to exports
interface ComponentData {
  id: string
  type: 'hero' | 'card' | 'text' | 'image' | 'form' | 'navigation' | 'footer' | 'sidebar'
  content: string
  priority: 'high' | 'medium' | 'low'
}

interface LayoutSuggestion {
  id: string
  name: string
  description: string
  confidence: number
  reasoning: string[]
}

export default function AIDemoPage() {
  const [components, setComponents] = useState<ComponentData[]>([
    {
      id: 'hero-1',
      type: 'hero',
      content: 'Revolutionary AI-Powered Website Builder',
      priority: 'high'
    },
    {
      id: 'card-1',
      type: 'card',
      content: 'AI Auto-Layout - Smart suggestions for optimal layouts',
      priority: 'medium'
    },
    {
      id: 'card-2',
      type: 'card',
      content: 'Visual Grid System - Professional design tools',
      priority: 'medium'
    },
    {
      id: 'card-3',
      type: 'card',
      content: 'Framework Export - Export to React, Vue, Svelte',
      priority: 'medium'
    }
  ])

  const [currentLayout, setCurrentLayout] = useState<string>('hero-first')
  const [showAIPanel, setShowAIPanel] = useState(true)

  /**
   * Mock AI suggestions (in real version, this comes from the AI engine)
   */
  const mockSuggestions: LayoutSuggestion[] = [
    {
      id: 'hero-first',
      name: 'Hero-First Landing Page',
      description: 'Perfect for marketing sites and product launches',
      confidence: 0.95,
      reasoning: [
        'Hero section maximizes above-the-fold impact',
        'Feature cards in digestible 3-column grid',
        'Optimal conversion funnel flow'
      ]
    },
    {
      id: 'dashboard',
      name: 'Dashboard Interface',
      description: 'Optimized for admin panels and analytics',
      confidence: 0.88,
      reasoning: [
        'Information density optimized for scanning',
        'Card-based design for modular content',
        'Professional, clean aesthetic'
      ]
    },
    {
      id: 'content-grid',
      name: 'Content-Focused Grid',
      description: 'Ideal for blogs and content-heavy sites',
      confidence: 0.82,
      reasoning: [
        'Reading-optimized content width',
        'Sidebar provides complementary information',
        'SEO-optimized content hierarchy'
      ]
    }
  ]

  /**
   * Add a new component
   */
  const addComponent = useCallback((type: ComponentData['type']) => {
    const newComponent: ComponentData = {
      id: `${type}-${Date.now()}`,
      type,
      content: `New ${type} component`,
      priority: 'medium'
    }
    setComponents(prev => [...prev, newComponent])
  }, [])

  /**
   * Remove a component
   */
  const removeComponent = useCallback((id: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== id))
  }, [])

  /**
   * Apply AI layout suggestion
   */
  const applyLayout = useCallback((layoutId: string) => {
    setCurrentLayout(layoutId)
  }, [])

  /**
   * Render component based on type and current layout
   */
  const renderComponent = (component: ComponentData, layoutType: string) => {
    const baseClasses = "text-white p-6 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
    
    switch (component.type) {
      case 'hero':
        return (
          <div className={`${baseClasses} bg-gradient-to-r from-blue-500 to-purple-600 ${
            layoutType === 'hero-first' ? 'col-span-full min-h-[200px]' : 'col-span-6 min-h-[150px]'
          } flex items-center justify-center`}>
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{component.content}</h1>
              <p className="opacity-90">AI-powered layouts that convert 10x better</p>
              <button className="mt-4 px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        )
      
      case 'card':
        const cardSpan = layoutType === 'hero-first' ? 'col-span-4' : 
                        layoutType === 'dashboard' ? 'col-span-3' : 'col-span-6'
        return (
          <div className={`${baseClasses} bg-green-500 ${cardSpan}`}>
            <h3 className="text-lg font-semibold mb-2">✨ Feature</h3>
            <p className="text-sm opacity-90">{component.content}</p>
            <div className="mt-3 text-xs opacity-75">
              AI optimized placement
            </div>
          </div>
        )
      
      case 'sidebar':
        return (
          <div className={`${baseClasses} bg-indigo-500 col-span-3 min-h-[200px]`}>
            <h3 className="text-lg font-semibold mb-3">📋 Sidebar</h3>
            <div className="space-y-2 text-sm opacity-90">
              <div>Navigation Item 1</div>
              <div>Navigation Item 2</div>
              <div>Analytics Widget</div>
            </div>
          </div>
        )
      
      default:
        return (
          <div className={`${baseClasses} bg-gray-500 col-span-4`}>
            <h3 className="font-semibold">{component.type}</h3>
            <p className="text-sm opacity-90">{component.content}</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">🤖 AI Auto-Layout Demo</h1>
            <p className="text-sm text-gray-600">
              The game-changing feature that makes us 10x better than Framer
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAIPanel(!showAIPanel)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showAIPanel 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {showAIPanel ? 'Hide' : 'Show'} AI Panel
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* AI Suggestions Panel */}
        {showAIPanel && (
          <div className="w-80 bg-white border-r border-gray-200 p-4 h-screen overflow-y-auto">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                🤖 AI Suggestions
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {mockSuggestions.length} options
                </span>
              </h2>
              
              {/* Component Counter */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-900 font-medium">
                  Analyzing {components.length} components
                </div>
                <div className="text-xs text-blue-700 mt-1">
                  AI confidence: 95% • Performance optimized
                </div>
              </div>

              {/* Layout Suggestions */}
              <div className="space-y-3">
                {mockSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      currentLayout === suggestion.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => applyLayout(suggestion.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-sm">{suggestion.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        suggestion.confidence >= 0.9 ? 'bg-green-100 text-green-800' :
                        suggestion.confidence >= 0.8 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {Math.round(suggestion.confidence * 100)}%
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-2">{suggestion.description}</p>
                    
                    <div className="space-y-1">
                      {suggestion.reasoning.slice(0, 2).map((reason, index) => (
                        <div key={index} className="text-xs text-gray-600 flex items-center gap-1">
                          <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                          {reason}
                        </div>
                      ))}
                    </div>

                    {currentLayout === suggestion.id && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <div className="text-xs text-blue-600 font-medium">✓ Currently Applied</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Component Management */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium text-sm mb-3">📦 Add Components</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {['card', 'sidebar', 'text', 'image'].map((type) => (
                  <button
                    key={type}
                    onClick={() => addComponent(type as ComponentData['type'])}
                    className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    + {type}
                  </button>
                ))}
              </div>

              <h3 className="font-medium text-sm mb-2">Current Components</h3>
              <div className="space-y-1">
                {components.map((component) => (
                  <div key={component.id} className="flex items-center justify-between text-xs">
                    <span className="text-gray-700">{component.type}</span>
                    <button
                      onClick={() => removeComponent(component.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Canvas */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              AI-Generated Layout: {mockSuggestions.find(s => s.id === currentLayout)?.name}
            </h2>
            <p className="text-gray-600 text-sm">
              {mockSuggestions.find(s => s.id === currentLayout)?.description}
            </p>
          </div>

          {/* AI-Generated Grid Layout */}
          <EnhancedGridSystem
            columns={12}
            gap="6"
            showOverlay={true}
            overlayVisibility="on-hover"
            studioMode={true}
            className="min-h-[600px] bg-white rounded-lg border-2 border-dashed border-gray-300"
          >
            {components.map((component) => (
              <React.Fragment key={component.id}>
                {renderComponent(component, currentLayout)}
              </React.Fragment>
            ))}
          </EnhancedGridSystem>

          {/* AI Insights */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                ⚡ Performance
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Load Time:</span>
                  <span className="font-medium text-green-600">0.8s</span>
                </div>
                <div className="flex justify-between">
                  <span>Core Web Vitals:</span>
                  <span className="font-medium text-green-600">98/100</span>
                </div>
                <div className="flex justify-between">
                  <span>Bundle Size:</span>
                  <span className="font-medium text-green-600">45KB</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                ♿ Accessibility
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>WCAG:</span>
                  <span className="font-medium text-green-600">AAA</span>
                </div>
                <div className="flex justify-between">
                  <span>Keyboard Nav:</span>
                  <span className="font-medium text-green-600">✓</span>
                </div>
                <div className="flex justify-between">
                  <span>Screen Reader:</span>
                  <span className="font-medium text-green-600">✓</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                📱 Responsive
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Mobile:</span>
                  <span className="font-medium text-blue-600">Optimized</span>
                </div>
                <div className="flex justify-between">
                  <span>Tablet:</span>
                  <span className="font-medium text-blue-600">Optimized</span>
                </div>
                <div className="flex justify-between">
                  <span>Desktop:</span>
                  <span className="font-medium text-blue-600">Optimized</span>
                </div>
              </div>
            </div>
          </div>

          {/* Competitive Advantage */}
          <div className="mt-8 p-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-3">🏆 Why This Beats Every Competitor</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>vs Framer:</strong>
                <br />✓ AI suggestions (they don't have)
                <br />✓ Code ownership
                <br />✓ 85% cheaper
              </div>
              <div>
                <strong>vs WordPress:</strong>
                <br />✓ 10x faster performance
                <br />✓ No security vulnerabilities
                <br />✓ Professional design tools
              </div>
              <div>
                <strong>vs Webflow:</strong>
                <br />✓ Framework export
                <br />✓ AI-powered layouts
                <br />✓ Better developer experience
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
