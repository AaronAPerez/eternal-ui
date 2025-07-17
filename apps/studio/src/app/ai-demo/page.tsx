/**
 * AI Auto-Layout Demo Page with Enhanced Dark Mode Support
 * 
 * This demonstrates the game-changing AI feature that makes
 * Eternal UI 10x better than Framer, Webflow, and WordPress.
 * 
 * Features:
 * - Full dark mode support with dark:bg-black
 * - Updated indigo color scheme (#6366F1)
 * - Enhanced AI suggestions with confidence scoring
 * - Real-time layout preview
 * - Performance metrics comparison
 */
'use client';

import React, { useState, useCallback, useEffect } from 'react'
import { 
  Sparkles, 
  Layout, 
  Zap, 
  Brain, 
  Eye, 
  Code, 
  Download, 
  Settings, 
  Moon, 
  Sun,
  Monitor,
  Tablet,
  Smartphone,
  Play,
  Pause,
  RefreshCw,
  TrendingUp,
  Clock,
  Users,
  Star,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'

// Enhanced Component Data Interface
interface ComponentData {
  id: string
  type: 'hero' | 'card' | 'text' | 'image' | 'form' | 'navigation' | 'footer' | 'sidebar' | 'cta' | 'testimonial'
  content: string
  priority: 'high' | 'medium' | 'low'
  size?: 'small' | 'medium' | 'large'
  category?: 'marketing' | 'content' | 'social' | 'ecommerce'
}

// Enhanced Layout Suggestion Interface
interface LayoutSuggestion {
  id: string
  name: string
  description: string
  confidence: number
  reasoning: string[]
  performance: {
    loadTime: number
    coreWebVitals: number
    seoScore: number
    accessibility: number
  }
  preview: string
  tags: string[]
}

// Performance Metrics Component
const PerformanceMetrics = ({ layout, darkMode }: { layout: string, darkMode: boolean }) => {
  const metrics = {
    'hero-first': {
      loadTime: 1.2,
      coreWebVitals: 95,
      seoScore: 98,
      accessibility: 96,
      conversionRate: 3.8
    },
    'dashboard': {
      loadTime: 0.9,
      coreWebVitals: 92,
      seoScore: 85,
      accessibility: 99,
      conversionRate: 2.1
    },
    'content-grid': {
      loadTime: 1.4,
      coreWebVitals: 88,
      seoScore: 95,
      accessibility: 94,
      conversionRate: 2.7
    }
  }

  const currentMetrics = metrics[layout as keyof typeof metrics] || metrics['hero-first']

  return (
    <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
        Performance Preview
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {currentMetrics.loadTime}s
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Load Time</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {currentMetrics.coreWebVitals}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Core Web Vitals</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {currentMetrics.seoScore}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">SEO Score</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {currentMetrics.accessibility}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Accessibility</div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Estimated Conversion Rate
          </span>
          <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            {currentMetrics.conversionRate}%
          </span>
        </div>
      </div>
    </div>
  )
}

// AI Confidence Indicator Component
const AIConfidenceIndicator = ({ confidence, darkMode }: { confidence: number, darkMode: boolean }) => {
  const getConfidenceColor = (score: number) => {
    if (score >= 0.9) return darkMode ? 'text-green-400' : 'text-green-600'
    if (score >= 0.7) return darkMode ? 'text-yellow-400' : 'text-yellow-600'
    return darkMode ? 'text-red-400' : 'text-red-600'
  }

  const getConfidenceText = (score: number) => {
    if (score >= 0.9) return 'Highly Confident'
    if (score >= 0.7) return 'Confident'
    return 'Moderate Confidence'
  }

  return (
    <div className="flex items-center space-x-2">
      <Brain className={`w-4 h-4 ${getConfidenceColor(confidence)}`} />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            AI Confidence
          </span>
          <span className={`text-sm font-semibold ${getConfidenceColor(confidence)}`}>
            {Math.round(confidence * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              confidence >= 0.9 
                ? 'bg-green-500' 
                : confidence >= 0.7 
                ? 'bg-yellow-500' 
                : 'bg-red-500'
            }`}
            style={{ width: `${confidence * 100}%` }}
          />
        </div>
        <div className={`text-xs mt-1 ${getConfidenceColor(confidence)}`}>
          {getConfidenceText(confidence)}
        </div>
      </div>
    </div>
  )
}

// Enhanced Layout Preview Component
const LayoutPreview = ({ layout, components, darkMode }: { 
  layout: string, 
  components: ComponentData[], 
  darkMode: boolean 
}) => {
  const renderMockLayout = () => {
    switch (layout) {
      case 'hero-first':
        return (
          <div className="space-y-4">
            <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
              Hero Section
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                Feature Card 1
              </div>
              <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                Feature Card 2
              </div>
              <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                Feature Card 3
              </div>
            </div>
          </div>
        )
      
      case 'dashboard':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center text-sm text-indigo-700 dark:text-indigo-300">
              Stats Widget
            </div>
            <div className="h-16 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center text-sm text-indigo-700 dark:text-indigo-300">
              Chart Widget
            </div>
            <div className="col-span-2 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
              Data Table
            </div>
          </div>
        )
      
      case 'content-grid':
        return (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                Content {i}
              </div>
            ))}
          </div>
        )
      
      default:
        return (
          <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
            Layout Preview
          </div>
        )
    }
  }

  return (
    <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-medium text-gray-900 dark:text-white">Live Preview</h4>
        <div className="flex items-center space-x-2">
          <Monitor className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-500 dark:text-gray-400">Desktop</span>
        </div>
      </div>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
        {renderMockLayout()}
      </div>
    </div>
  )
}

// Main AI Demo Component
export default function AIDemoPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [components, setComponents] = useState<ComponentData[]>([
    {
      id: 'hero-1',
      type: 'hero',
      content: 'Revolutionary AI-Powered Website Builder',
      priority: 'high',
      size: 'large',
      category: 'marketing'
    },
    {
      id: 'card-1',
      type: 'card',
      content: 'AI Auto-Layout - Smart suggestions for optimal layouts',
      priority: 'medium',
      size: 'medium',
      category: 'marketing'
    },
    {
      id: 'card-2',
      type: 'card',
      content: 'Visual Grid System - Professional design tools',
      priority: 'medium',
      size: 'medium',
      category: 'content'
    },
    {
      id: 'card-3',
      type: 'card',
      content: 'Framework Export - Export to React, Vue, Svelte',
      priority: 'medium',
      size: 'medium',
      category: 'content'
    }
  ])

  const [currentLayout, setCurrentLayout] = useState<string>('hero-first')
  const [showAIPanel, setShowAIPanel] = useState(true)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Enhanced AI suggestions with performance metrics
  const mockSuggestions: LayoutSuggestion[] = [
    {
      id: 'hero-first',
      name: 'Hero-First Landing Page',
      description: 'Perfect for marketing sites and product launches',
      confidence: 0.95,
      reasoning: [
        'Hero section maximizes above-the-fold impact',
        'Feature cards in digestible 3-column grid',
        'Optimal conversion funnel flow',
        'Mobile-first responsive design'
      ],
      performance: {
        loadTime: 1.2,
        coreWebVitals: 95,
        seoScore: 98,
        accessibility: 96
      },
      preview: 'hero-first',
      tags: ['Marketing', 'High Converting', 'Mobile Optimized']
    },
    {
      id: 'dashboard',
      name: 'Dashboard Interface',
      description: 'Optimized for admin panels and analytics',
      confidence: 0.88,
      reasoning: [
        'Information density optimized for scanning',
        'Card-based design for modular content',
        'Professional, clean aesthetic',
        'Data visualization friendly'
      ],
      performance: {
        loadTime: 0.9,
        coreWebVitals: 92,
        seoScore: 85,
        accessibility: 99
      },
      preview: 'dashboard',
      tags: ['Professional', 'Data Heavy', 'Accessible']
    },
    {
      id: 'content-grid',
      name: 'Content-Focused Grid',
      description: 'Ideal for blogs and content-heavy sites',
      confidence: 0.82,
      reasoning: [
        'Equal weight given to all content pieces',
        'Excellent for content discovery',
        'SEO-optimized structure',
        'Reader-friendly layout'
      ],
      performance: {
        loadTime: 1.4,
        coreWebVitals: 88,
        seoScore: 95,
        accessibility: 94
      },
      preview: 'content-grid',
      tags: ['Content Rich', 'SEO Optimized', 'Readable']
    }
  ]

  const currentSuggestion = mockSuggestions.find(s => s.id === currentLayout) || mockSuggestions[0]

  const handleLayoutChange = useCallback((layoutId: string) => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setCurrentLayout(layoutId)
      setIsAnalyzing(false)
    }, 1000)
  }, [])

  const addComponent = useCallback(() => {
    const newComponent: ComponentData = {
      id: `comp-${Date.now()}`,
      type: 'card',
      content: 'New component added',
      priority: 'medium',
      size: 'medium',
      category: 'content'
    }
    setComponents(prev => [...prev, newComponent])
  }, [])

  useEffect(() => {
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  AI Auto-Layout Demo
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Watch AI generate perfect layouts in real-time
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAIPanel(!showAIPanel)}
                className={`p-2 rounded-lg transition-colors ${
                  showAIPanel 
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                <Brain className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Suggestions Panel */}
          {showAIPanel && (
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                    AI Suggestions
                  </h2>
                  <button
                    onClick={() => setIsAnalyzing(true)}
                    className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
                    disabled={isAnalyzing}
                  >
                    <RefreshCw className={`w-4 h-4 text-indigo-600 dark:text-indigo-400 ${isAnalyzing ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                {isAnalyzing ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
                      <div className="w-4 h-4 border-2 border-indigo-600 dark:border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing layout options...</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockSuggestions.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        onClick={() => handleLayoutChange(suggestion.id)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                          currentLayout === suggestion.id
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950 dark:border-indigo-400'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-900'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {suggestion.name}
                          </h3>
                          {currentLayout === suggestion.id && (
                            <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {suggestion.description}
                        </p>

                        <AIConfidenceIndicator confidence={suggestion.confidence} darkMode={darkMode} />

                        <div className="mt-3 flex flex-wrap gap-1">
                          {suggestion.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Performance Metrics */}
              <PerformanceMetrics layout={currentLayout} darkMode={darkMode} />

              {/* AI Reasoning */}
              <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                  AI Reasoning
                </h3>
                <ul className="space-y-2">
                  {currentSuggestion.reasoning.map((reason, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {reason}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className={`${showAIPanel ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-6`}>
            {/* Component Controls */}
            <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Your Components ({components.length})
                </h3>
                <button
                  onClick={addComponent}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                >
                  Add Component
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {components.map((component) => (
                  <div
                    key={component.id}
                    className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {component.type}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        component.priority === 'high' 
                          ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                          : component.priority === 'medium'
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      }`}>
                        {component.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {component.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Layout Preview */}
            <LayoutPreview layout={currentLayout} components={components} darkMode={darkMode} />

            {/* Export Options */}
            <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                Export Your Layout
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['React', 'Vue', 'Svelte', 'Angular'].map((framework) => (
                  <button
                    key={framework}
                    className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-all text-center"
                  >
                    <Download className="w-5 h-5 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {framework}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-indigo-900 dark:text-indigo-100">
                      AI-Optimized Export
                    </div>
                    <div className="text-sm text-indigo-700 dark:text-indigo-300">
                      Your exported code will be automatically optimized for performance, 
                      accessibility, and SEO based on the AI analysis.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Stats Footer */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {Math.round(currentSuggestion.confidence * 100)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">AI Confidence</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {currentSuggestion.performance.loadTime}s
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Load Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {currentSuggestion.performance.seoScore}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">SEO Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {currentSuggestion.performance.accessibility}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Accessibility</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}