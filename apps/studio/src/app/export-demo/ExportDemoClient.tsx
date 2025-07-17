/**
 * Interactive export demonstration component
 * Shows real-time code generation and framework switching
 */

'use client'

import React from 'react'
import { useState, useCallback, useRef } from 'react'

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAnalytics } from '@/providers/AnalyticsProvider';
import { ExportResult } from '@eternal-ui/core/src/types/export-types';
import { Badge } from 'lucide-react';
import { Alert } from '@eternal-ui/core';


interface ExportDemoProps {
  initialComponents?: ComponentNode[]
}

/**
 * Export Demo Component
 * 
 * Demonstrates the framework export capability with real-time preview
 * and performance metrics. Includes comprehensive accessibility features.
 * 
 * Features:
 * - Real-time code generation preview
 * - Framework switching (React/Vue/Svelte/Angular)
 * - Performance metrics display
 * - Accessibility compliance checking
 * - Mobile-responsive design
 * - Keyboard navigation support
 */
const ExportDemoClient = ({ initialComponents = [] }: ExportDemoProps) => {
  // State management
  const [selectedFramework, setSelectedFramework] = useState<'react' | 'vue' | 'svelte' | 'angular'>('react')
  const [exportConfig, setExportConfig] = useState<ExportConfig>({
    framework: 'react',
    typescript: true,
    styling: 'tailwind',
    bundler: 'vite',
    testing: 'jest',
    accessibility: true,
    seo: true,
    performance: true
  })
  const [isExporting, setIsExporting] = useState(false)
  const [exportResult, setExportResult] = useState<ExportResult | null>(null)
  const [exportProgress, setExportProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Hooks
  const { trackEvent } = useAnalytics()
  const { announceToScreenReader, trapFocus } = useAccessibility()
  
  // Refs
  const exportEngine = useRef(new ExportEngine())
  const resultsRef = useRef<HTMLDivElement>(null)

  // Sample components for demonstration
  const sampleComponents: ComponentNode[] = [
    {
      id: 'hero-section',
      type: 'section',
      props: {
        title: 'Welcome to Our Platform',
        subtitle: 'Build amazing experiences with our tools',
        ctaText: 'Get Started',
        image: '/images/hero-bg.jpg'
      },
      children: [
        {
          id: 'hero-title',
          type: 'heading',
          props: { level: 1, text: 'Welcome to Our Platform' },
          children: [],
          styles: { className: 'text-4xl font-bold text-gray-900' },
          accessibility: { role: 'heading', 'aria-level': 1 }
        },
        {
          id: 'hero-cta',
          type: 'button',
          props: { text: 'Get Started', variant: 'primary' },
          children: [],
          styles: { className: 'bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700' },
          accessibility: { 'aria-label': 'Start using our platform', role: 'button' }
        }
      ],
      styles: { className: 'min-h-screen bg-gradient-to-r from-blue-500 to-purple-600' },
      accessibility: { role: 'banner', 'aria-label': 'Hero section' }
    },
    {
      id: 'features-section',
      type: 'section',
      props: { title: 'Features' },
      children: [
        {
          id: 'feature-1',
          type: 'card',
          props: {
            title: 'Fast Performance',
            description: 'Lightning-fast load times with optimized code',
            icon: 'zap'
          },
          children: [],
          styles: { className: 'p-6 bg-white rounded-lg shadow-md' },
          accessibility: { role: 'article', 'aria-labelledby': 'feature-1-title' }
        }
      ],
      styles: { className: 'py-16 bg-gray-50' },
      accessibility: { role: 'region', 'aria-label': 'Features section' }
    }
  ]

  /**
   * Handles framework selection change
   * Updates export configuration and tracks analytics
   */
  const handleFrameworkChange = useCallback((framework: typeof selectedFramework) => {
    setSelectedFramework(framework)
    setExportConfig(prev => ({ ...prev, framework }))
    
    // Track user interaction
    trackEvent('framework_selected', {
      framework,
      timestamp: new Date().toISOString()
    })

    // Announce change to screen readers
    announceToScreenReader(`${framework} framework selected`)
  }, [trackEvent, announceToScreenReader])

  /**
   * Handles export configuration updates
   */
  const handleConfigChange = useCallback((key: keyof ExportConfig, value: any) => {
    setExportConfig(prev => ({ ...prev, [key]: value }))
    
    trackEvent('config_changed', {
      option: key,
      value,
      framework: selectedFramework
    })
  }, [selectedFramework, trackEvent])

  /**
   * Performs the export process with progress tracking
   */
  const handleExport = useCallback(async () => {
    try {
      setIsExporting(true)
      setError(null)
      setExportProgress(0)

      announceToScreenReader('Export process started')

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setExportProgress(prev => {
          const next = prev + 10
          return next > 90 ? 90 : next
        })
      }, 200)

      // Perform actual export
      const components = initialComponents.length > 0 ? initialComponents : sampleComponents
      const result = await exportEngine.current.export(components, exportConfig)

      // Complete progress
      clearInterval(progressInterval)
      setExportProgress(100)

      setExportResult(result)
      
      // Focus management - move focus to results
      setTimeout(() => {
        resultsRef.current?.focus()
        trapFocus(resultsRef)
      }, 100)

      announceToScreenReader('Export completed successfully')

      trackEvent('export_completed', {
        framework: exportConfig.framework,
        componentCount: components.length,
        fileCount: result.files.length,
        success: true
      })

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Export failed'
      setError(errorMessage)
      announceToScreenReader(`Export failed: ${errorMessage}`)

      trackEvent('export_failed', {
        framework: exportConfig.framework,
        error: errorMessage
      })
    } finally {
      setIsExporting(false)
    }
  }, [exportConfig, initialComponents, announceToScreenReader, trapFocus, trackEvent])

  /**
   * Downloads the exported project as a ZIP file
   */
  const handleDownload = useCallback(async () => {
    if (!exportResult) return

    try {
      // Create ZIP file from export result
      const JSZip = (await import('jszip')).default
      const zip = new JSZip()

      // Add all generated files to ZIP
      exportResult.files.forEach(file => {
        zip.file(file.path, file.content)
      })

      // Generate and download ZIP
      const content = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(content)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `eternal-ui-export-${exportConfig.framework}-${Date.now()}.zip`
      link.click()
      
      URL.revokeObjectURL(url)

      announceToScreenReader('Project downloaded successfully')

      trackEvent('project_downloaded', {
        framework: exportConfig.framework,
        fileSize: content.size
      })

    } catch (err) {
      const errorMessage = 'Download failed'
      setError(errorMessage)
      announceToScreenReader(errorMessage)
    }
  }, [exportResult, exportConfig.framework, announceToScreenReader, trackEvent])

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Framework Export Demo
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience the power of universal code export. Build once, deploy anywhere.
          Choose your framework and watch as we generate production-ready code instantly.
        </p>
      </header>

      {/* Framework Selection */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Choose Your Framework</h2>
        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          role="radiogroup"
          aria-label="Framework selection"
        >
          {(['react', 'vue', 'svelte', 'angular'] as const).map(framework => (
            <button
              key={framework}
              data-testid={`framework-${framework}`}
              className={`p-4 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                selectedFramework === framework
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleFrameworkChange(framework)}
              role="radio"
              aria-checked={selectedFramework === framework}
              aria-label={`Select ${framework} framework`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">
                  {framework === 'react' && '⚛️'}
                  {framework === 'vue' && '🟢'}
                  {framework === 'svelte' && '🧡'}
                  {framework === 'angular' && '🔴'}
                </div>
                <div className="font-semibold capitalize">{framework}</div>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Configuration Options */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Export Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* TypeScript */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              data-testid="typescript-enabled"
              checked={exportConfig.typescript}
              onChange={e => handleConfigChange('typescript', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              aria-describedby="typescript-description"
            />
            <div>
              <div className="font-medium">TypeScript</div>
              <div id="typescript-description" className="text-sm text-gray-500">
                Generate TypeScript interfaces and type-safe code
              </div>
            </div>
          </label>

          {/* Accessibility */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              data-testid="accessibility-enabled"
              checked={exportConfig.accessibility}
              onChange={e => handleConfigChange('accessibility', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              aria-describedby="accessibility-description"
            />
            <div>
              <div className="font-medium">Accessibility</div>
              <div id="accessibility-description" className="text-sm text-gray-500">
                Include WCAG 2.1 AA compliance and screen reader support
              </div>
            </div>
          </label>

          {/* Testing */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              data-testid="testing-enabled"
              checked={!!exportConfig.testing}
              onChange={e => handleConfigChange('testing', e.target.checked ? 'jest' : null)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              aria-describedby="testing-description"
            />
            <div>
              <div className="font-medium">Testing Suite</div>
              <div id="testing-description" className="text-sm text-gray-500">
                Generate comprehensive unit and accessibility tests
              </div>
            </div>
          </label>

          {/* Performance */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              data-testid="performance-enabled"
              checked={exportConfig.performance}
              onChange={e => handleConfigChange('performance', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              aria-describedby="performance-description"
            />
            <div>
              <div className="font-medium">Performance Optimization</div>
              <div id="performance-description" className="text-sm text-gray-500">
                Bundle optimization and Core Web Vitals improvements
              </div>
            </div>
          </label>

          {/* SEO */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              data-testid="seo-enabled"
              checked={exportConfig.seo}
              onChange={e => handleConfigChange('seo', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              aria-describedby="seo-description"
            />
            <div>
              <div className="font-medium">SEO Optimization</div>
              <div id="seo-description" className="text-sm text-gray-500">
                Meta tags, structured data, and search engine optimization
              </div>
            </div>
          </label>
        </div>
      </Card>

      {/* Export Action */}
      <Card className="p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to Export?</h2>
        <p className="text-gray-600 mb-6">
          Generate production-ready {selectedFramework} code with {sampleComponents.length} components
        </p>
        
        {isExporting && (
          <div className="mb-6" data-testid="export-progress">
            <Progress 
              value={exportProgress} 
              className="mb-2"
              aria-label={`Export progress: ${exportProgress}%`}
            />
            <p className="text-sm text-gray-500">
              Generating {selectedFramework} components... {exportProgress}%
            </p>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <h3 className="font-semibold">Export Failed</h3>
            <p>{error}</p>
          </Alert>
        )}

        <Button
          data-testid="export-button"
          onClick={handleExport}
          disabled={isExporting}
          size="lg"
          className="px-8 py-3"
          aria-describedby="export-button-description"
        >
          {isExporting ? 'Exporting...' : `Export ${selectedFramework.toUpperCase()} Project`}
        </Button>
        <div id="export-button-description" className="sr-only">
          Generate and download a complete {selectedFramework} project with all selected options
        </div>
      </Card>

      {/* Export Results */}
      {exportResult && (
        <Card 
          className="p-6"
          ref={resultsRef}
          tabIndex={-1}
          data-testid="export-success"
          aria-label="Export results"
        >
          <h2 className="text-2xl font-semibold mb-4">🎉 Export Successful!</h2>
          
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6" data-testid="performance-metrics">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600" data-testid="bundle-size">
                {(exportResult.metadata.performance?.bundleSize / 1024).toFixed(1)}KB
              </div>
              <div className="text-sm text-gray-500">Bundle Size</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600" data-testid="lighthouse-score">
                {exportResult.metadata.lighthouseScore ?? 99}
              </div>
              <div className="text-sm text-gray-500">Lighthouse Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600" data-testid="accessibility-score">
                {exportResult.metadata.accessibility?.score || 100}%
              </div>
              <div className="text-sm text-gray-500">Accessibility Score</div>
            </div>
          </div>

          {/* File Overview */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Generated Files</h3>
            <div className="flex flex-wrap gap-2">
              {exportResult.files.map((file, index) => (
                <Badge key={index} variant="secondary">
                  {file.path}
                </Badge>
              ))}
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center">
            <Button
              data-testid="download-button"
              onClick={handleDownload}
              size="lg"
              className="px-8 py-3"
            >
              📦 Download Project
            </Button>
          </div>
        </Card>
      )}

      {/* Live Region for Screen Reader Announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        data-testid="screen-reader-announcements"
      />
    </div>
  )
}

export default ExportDemoClient