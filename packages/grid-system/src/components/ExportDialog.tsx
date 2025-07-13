/**
 * Export Dialog Component
 * 
 * Beautiful UI for exporting layouts to different frameworks.
 * This is the interface that makes developers say "WOW!"
 */

import React, { useState, useCallback } from 'react'
import { ReactProjectGenerator, ReactCodeGenerator } from '../export/ReactExportEngine'
import type { LayoutExportData, ExportOptions } from '../export/ReactExportEngine'
import { cn } from '../utils'

export interface ExportDialogProps {
  isOpen: boolean
  onClose: () => void
  layoutData: LayoutExportData
  className?: string
}

interface ExportPreview {
  framework: string
  code: string
  icon: string
  description: string
  features: string[]
}

/**
 * Framework Selection Card
 */
const FrameworkCard: React.FC<{
  framework: string
  icon: string
  title: string
  description: string
  features: string[]
  isSelected: boolean
  onSelect: () => void
  comingSoon?: boolean
}> = ({ framework, icon, title, description, features, isSelected, onSelect, comingSoon = false }) => {
  return (
    <div
      className={cn(
        "border rounded-lg p-4 cursor-pointer transition-all duration-200",
        isSelected 
          ? "border-blue-500 bg-blue-50 shadow-md" 
          : "border-gray-200 hover:border-gray-300 hover:shadow-sm",
        comingSoon && "opacity-60 cursor-not-allowed"
      )}
      onClick={!comingSoon ? onSelect : undefined}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{icon}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {comingSoon && (
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                Coming Soon
              </span>
            )}
          </div>
        </div>
        {isSelected && !comingSoon && (
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        )}
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      
      <div className="space-y-1">
        {features.slice(0, 3).map((feature, index) => (
          <div key={index} className="text-xs text-gray-600 flex items-center gap-2">
            <span className="w-1 h-1 bg-green-500 rounded-full"></span>
            {feature}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Export Options Panel
 */
const ExportOptionsPanel: React.FC<{
  options: ExportOptions
  onOptionsChange: (options: ExportOptions) => void
}> = ({ options, onOptionsChange }) => {
  const updateOption = <K extends keyof ExportOptions>(key: K, value: ExportOptions[K]) => {
    onOptionsChange({ ...options, [key]: value })
  }

  return (
    <div className="space-y-6">
      {/* Project Settings */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Project Settings</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              value={options.projectName}
              onChange={(e) => updateOption('projectName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="my-awesome-website"
            />
          </div>
        </div>
      </div>

      {/* Code Options */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Code Options</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={options.typescript}
              onChange={(e) => updateOption('typescript', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <div>
              <div className="text-sm font-medium text-gray-900">TypeScript</div>
              <div className="text-xs text-gray-600">Full type safety and better IDE support</div>
            </div>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={options.includeTailwind}
              onChange={(e) => updateOption('includeTailwind', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <div>
              <div className="text-sm font-medium text-gray-900">Tailwind CSS</div>
              <div className="text-xs text-gray-600">Utility-first CSS framework</div>
            </div>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={options.includeAccessibility}
              onChange={(e) => updateOption('includeAccessibility', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <div>
              <div className="text-sm font-medium text-gray-900">Accessibility Features</div>
              <div className="text-xs text-gray-600">WCAG AA compliant code</div>
            </div>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={options.optimizePerformance}
              onChange={(e) => updateOption('optimizePerformance', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <div>
              <div className="text-sm font-medium text-gray-900">Performance Optimizations</div>
              <div className="text-xs text-gray-600">Code splitting, lazy loading, and more</div>
            </div>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={options.includeTests}
              onChange={(e) => updateOption('includeTests', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <div>
              <div className="text-sm font-medium text-gray-900">Unit Tests</div>
              <div className="text-xs text-gray-600">Jest/Vitest testing setup</div>
            </div>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={options.includeDocs}
              onChange={(e) => updateOption('includeDocs', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <div>
              <div className="text-sm font-medium text-gray-900">Documentation</div>
              <div className="text-xs text-gray-600">README and deployment guides</div>
            </div>
          </label>
        </div>
      </div>

      {/* Framework-specific Options */}
      {options.framework === 'nextjs' && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Next.js Options</h3>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              ✅ App Router support<br/>
              ✅ Image optimization<br/>
              ✅ SEO configuration<br/>
              ✅ API routes setup
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Code Preview Panel
 */
const CodePreview: React.FC<{
  layoutData: LayoutExportData
  options: ExportOptions
}> = ({ layoutData, options }) => {
  const [previewCode, setPreviewCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePreview = useCallback(async () => {
    setIsGenerating(true)
    try {
      const generator = new ReactCodeGenerator()
      const code = generator.generateComponent(layoutData, options)
      setPreviewCode(code)
    } catch (error) {
      console.error('Failed to generate preview:', error)
    } finally {
      setIsGenerating(false)
    }
  }, [layoutData, options])

  React.useEffect(() => {
    generatePreview()
  }, [generatePreview])

  if (isGenerating) {
    return (
      <div className="bg-gray-900 rounded-lg p-4 h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <div className="text-green-400 text-sm">Generating code...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-auto">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-white font-medium">Preview</h4>
        <span className="text-green-400 text-xs">
          {options.framework.toUpperCase()} • {options.typescript ? 'TypeScript' : 'JavaScript'}
        </span>
      </div>
      <pre className="text-green-400 text-xs leading-relaxed">
        <code>{previewCode}</code>
      </pre>
    </div>
  )
}

/**
 * Main Export Dialog Component
 */
export const ExportDialog: React.FC<ExportDialogProps> = ({
  isOpen,
  onClose,
  layoutData,
  className
}) => {
  const [currentStep, setCurrentStep] = useState<'framework' | 'options' | 'preview'>('framework')
  const [selectedFramework, setSelectedFramework] = useState<'react' | 'nextjs' | 'vite'>('nextjs')
  const [isExporting, setIsExporting] = useState(false)
  
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    framework: 'nextjs',
    typescript: true,
    includeTests: false,
    includeTailwind: true,
    includeAccessibility: true,
    optimizePerformance: true,
    includeDocs: true,
    projectName: 'my-eternal-ui-project'
  })

  // Framework options
  const frameworks = [
    {
      id: 'nextjs' as const,
      icon: '▲',
      title: 'Next.js',
      description: 'Full-stack React framework with SSR, routing, and API routes',
      features: [
        'Server-side rendering',
        'Automatic code splitting',
        'Built-in optimization',
        'API routes included'
      ]
    },
    {
      id: 'react' as const,
      icon: '⚛️',
      title: 'React (CRA)',
      description: 'Classic Create React App setup with all the essentials',
      features: [
        'Fast development setup',
        'Hot reloading',
        'Production ready',
        'Easy deployment'
      ]
    },
    {
      id: 'vite' as const,
      icon: '⚡',
      title: 'Vite + React',
      description: 'Lightning-fast development with modern build tools',
      features: [
        'Instant hot reload',
        'Lightning fast builds',
        'Modern ES modules',
        'Optimized production'
      ]
    }
  ]

  // Handle framework selection
  const handleFrameworkSelect = (framework: 'react' | 'nextjs' | 'vite') => {
    setSelectedFramework(framework)
    setExportOptions(prev => ({ ...prev, framework }))
  }

  // Handle export
  const handleExport = async () => {
    setIsExporting(true)
    try {
      const generator = new ReactProjectGenerator()
      await generator.generateProject(layoutData, exportOptions)
      
      // Show success message
      alert('Project exported successfully! Check your downloads folder.')
      onClose()
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={cn("bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden", className)}>
        
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">🚀 Export Your Design</h2>
              <p className="text-gray-600 mt-1">
                Download production-ready code that you own forever
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mt-4">
            {['framework', 'options', 'preview'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    currentStep === step || (['options', 'preview'].includes(currentStep) && index < 2) || (currentStep === 'preview' && index < 3)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  )}
                >
                  {index + 1}
                </div>
                <span className={cn(
                  "ml-2 text-sm font-medium capitalize",
                  currentStep === step ? "text-blue-600" : "text-gray-500"
                )}>
                  {step}
                </span>
                {index < 2 && (
                  <div className="w-8 h-px bg-gray-300 mx-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {currentStep === 'framework' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose Your Framework</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {frameworks.map((framework) => (
                  <FrameworkCard
                    key={framework.id}
                    framework={framework.id}
                    icon={framework.icon}
                    title={framework.title}
                    description={framework.description}
                    features={framework.features}
                    isSelected={selectedFramework === framework.id}
                    onSelect={() => handleFrameworkSelect(framework.id)}
                  />
                ))}
              </div>

              {/* Coming Soon Frameworks */}
              <div className="mt-8">
                <h4 className="text-md font-medium text-gray-700 mb-3">Coming Soon</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FrameworkCard
                    framework="vue"
                    icon="💚"
                    title="Vue.js"
                    description="Progressive framework for building user interfaces"
                    features={['Composition API', 'Single file components', 'Built-in optimization']}
                    isSelected={false}
                    onSelect={() => {}}
                    comingSoon={true}
                  />
                  <FrameworkCard
                    framework="svelte"
                    icon="🧡"
                    title="Svelte"
                    description="Compile-time optimized framework"
                    features={['No virtual DOM', 'Smaller bundles', 'Better performance']}
                    isSelected={false}
                    onSelect={() => {}}
                    comingSoon={true}
                  />
                  <FrameworkCard
                    framework="angular"
                    icon="🅰️"
                    title="Angular"
                    description="Platform for building mobile and desktop web apps"
                    features={['TypeScript first', 'Dependency injection', 'Enterprise ready']}
                    isSelected={false}
                    onSelect={() => {}}
                    comingSoon={true}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 'options' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ExportOptionsPanel
                options={exportOptions}
                onOptionsChange={setExportOptions}
              />
              <div>
                <h3 className="text-lg font-semibold mb-4">What You'll Get</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-sm">📦</span>
                    </div>
                    <div>
                      <div className="font-medium">Complete Project</div>
                      <div className="text-sm text-gray-600">Ready to run and deploy</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-sm">⚡</span>
                    </div>
                    <div>
                      <div className="font-medium">Optimized Performance</div>
                      <div className="text-sm text-gray-600">99+ Lighthouse score guaranteed</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 text-sm">♿</span>
                    </div>
                    <div>
                      <div className="font-medium">Accessibility Built-in</div>
                      <div className="text-sm text-gray-600">WCAG AA compliant</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 text-sm">📱</span>
                    </div>
                    <div>
                      <div className="font-medium">Mobile Responsive</div>
                      <div className="text-sm text-gray-600">Perfect on all devices</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'preview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CodePreview layoutData={layoutData} options={exportOptions} />
              <div>
                <h3 className="text-lg font-semibold mb-4">Export Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Framework:</span>
                    <span className="font-medium">{exportOptions.framework.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Language:</span>
                    <span className="font-medium">{exportOptions.typescript ? 'TypeScript' : 'JavaScript'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Styling:</span>
                    <span className="font-medium">{exportOptions.includeTailwind ? 'Tailwind CSS' : 'CSS'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Components:</span>
                    <span className="font-medium">{layoutData.components.length} components</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tests:</span>
                    <span className="font-medium">{exportOptions.includeTests ? 'Included' : 'Not included'}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">🎉 Ready to Export!</h4>
                  <p className="text-sm text-green-800">
                    Your project will be downloaded as a ZIP file containing all the code,
                    configuration, and documentation you need to deploy immediately.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {currentStep !== 'framework' && (
              <button
                onClick={() => {
                  const steps = ['framework', 'options', 'preview']
                  const currentIndex = steps.indexOf(currentStep)
                  if (currentIndex > 0) {
                    setCurrentStep(steps[currentIndex - 1] as any)
                  }
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {currentStep !== 'preview' && (
              <button
                onClick={() => {
                  const steps = ['framework', 'options', 'preview']
                  const currentIndex = steps.indexOf(currentStep)
                  if (currentIndex < steps.length - 1) {
                    setCurrentStep(steps[currentIndex + 1] as any)
                  }
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue →
              </button>
            )}

            {currentStep === 'preview' && (
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Exporting...
                  </>
                ) : (
                  <>
                    📦 Download Project
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExportDialog