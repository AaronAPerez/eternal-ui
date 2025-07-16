// =================================================================
// EDIT COMPONENT & PREVIEW SYSTEM IMPLEMENTATION
// =================================================================
// Complete implementation for component editing and preview generation
// Includes code editor, live preview, and automatic image generation
// =================================================================

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { 
  Code, 
  Eye, 
  Download, 
  Save, 
  X, 
  RefreshCw, 
  Image as ImageIcon,
  Zap,
  Settings,
  Play,
  Maximize,
  ExternalLink,
  Camera
} from 'lucide-react'
import { EditComponentProps, ComponentData } from '.'


// =================================================================
// MAIN EDIT COMPONENT
// =================================================================

export const EditComponent: React.FC<EditComponentProps> = ({
  component,
  isOpen,
  onClose,
  onSave,
  onGeneratePreview
}) => {
  const [editedComponent, setEditedComponent] = useState<ComponentData>(component)
  const [activeTab, setActiveTab] = useState<'code' | 'preview' | 'settings'>('code')
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [livePreviewError, setLivePreviewError] = useState<string | null>(null)

  const codeEditorRef = useRef<HTMLTextAreaElement>(null)
  const previewRef = useRef<HTMLIFrameElement>(null)

  // Update component when prop changes
  useEffect(() => {
    setEditedComponent(component)
    setHasUnsavedChanges(false)
  }, [component])

  // Handle code changes
  const handleCodeChange = useCallback((newCode: string) => {
    setEditedComponent(prev => ({
      ...prev,
      code: newCode
    }))
    setHasUnsavedChanges(true)
    setLivePreviewError(null)
  }, [])

  // Handle metadata changes
  const handleMetadataChange = useCallback((field: string, value: any) => {
    setEditedComponent(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [field]: value
      }
    }))
    setHasUnsavedChanges(true)
  }, [])

  // Save component
  const handleSave = useCallback(async () => {
    try {
      // Generate new preview if code changed
      if (hasUnsavedChanges) {
        setIsGeneratingPreview(true)
        const newPreviewUrl = await onGeneratePreview(editedComponent.id)
        const updatedComponent = {
          ...editedComponent,
          previewImage: newPreviewUrl
        }
        onSave(updatedComponent)
        setEditedComponent(updatedComponent)
      } else {
        onSave(editedComponent)
      }
      setHasUnsavedChanges(false)
    } catch (error) {
      console.error('Failed to save component:', error)
    } finally {
      setIsGeneratingPreview(false)
    }
  }, [editedComponent, hasUnsavedChanges, onSave, onGeneratePreview])

  // Generate preview image
  const handleGeneratePreview = useCallback(async () => {
    setIsGeneratingPreview(true)
    try {
      const newPreviewUrl = await onGeneratePreview(editedComponent.id)
      setEditedComponent(prev => ({
        ...prev,
        previewImage: newPreviewUrl
      }))
      setHasUnsavedChanges(true)
    } catch (error) {
      console.error('Failed to generate preview:', error)
    } finally {
      setIsGeneratingPreview(false)
    }
  }, [editedComponent.id, onGeneratePreview])

  // Render live preview
  const renderLivePreview = useCallback(() => {
    try {
      // Create preview HTML document
      const previewHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Component Preview</title>
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { 
              margin: 0; 
              padding: 20px; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
              background: #f8fafc;
            }
            .preview-container {
              background: white;
              border-radius: 8px;
              padding: 24px;
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
            }
          </style>
        </head>
        <body>
          <div id="root" class="preview-container"></div>
          <script type="text/babel">
            ${editedComponent.code}
            
            // Render the component
            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(React.createElement(${editedComponent.name}));
          </script>
        </body>
        </html>
      `

      if (previewRef.current) {
        const blob = new Blob([previewHtml], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        previewRef.current.src = url
      }
    } catch (error) {
      setLivePreviewError(`Preview Error: ${error.message}`)
    }
  }, [editedComponent.code, editedComponent.name])

  // Update live preview when code changes
  useEffect(() => {
    if (activeTab === 'preview') {
      const timeoutId = setTimeout(renderLivePreview, 500)
      return () => clearTimeout(timeoutId)
    }
  }, [editedComponent.code, activeTab, renderLivePreview])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Edit Component: {editedComponent.name}
            </h2>
            {hasUnsavedChanges && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                Unsaved Changes
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleGeneratePreview}
              disabled={isGeneratingPreview}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 transition-colors"
            >
              {isGeneratingPreview ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Camera className="w-4 h-4" />
              )}
              {isGeneratingPreview ? 'Generating...' : 'Generate Preview'}
            </button>
            
            <button
              onClick={handleSave}
              disabled={isGeneratingPreview}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2 transition-colors"
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
            Live Preview
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
            <CodeEditor
              code={editedComponent.code}
              onChange={handleCodeChange}
              language={editedComponent.metadata.framework}
            />
          )}
          
          {activeTab === 'preview' && (
            <LivePreview
              component={editedComponent}
              error={livePreviewError}
              ref={previewRef}
            />
          )}
          
          {activeTab === 'settings' && (
            <SettingsPanel
              component={editedComponent}
              onMetadataChange={handleMetadataChange}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// =================================================================
// CODE EDITOR COMPONENT
// =================================================================

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
  language: string
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, language }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const textarea = textareaRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newValue = code.substring(0, start) + '  ' + code.substring(end)
      
      onChange(newValue)
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2
      }, 0)
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            {language.toUpperCase()} Component
          </span>
          <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
            {code.split('\n').length} lines
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
            Format
          </button>
          <button className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
            Validate
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 w-full h-full p-4 font-mono text-sm resize-none outline-none border-none bg-gray-900 text-gray-100"
          placeholder="Enter your component code here..."
          spellCheck={false}
        />
        
        {/* Line Numbers */}
        <div className="absolute left-0 top-0 w-12 h-full bg-gray-800 border-r border-gray-700 pt-4 pr-2 text-right">
          {code.split('\n').map((_, index) => (
            <div key={index} className="text-xs text-gray-500 leading-5">
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// =================================================================
// LIVE PREVIEW COMPONENT
// =================================================================

interface LivePreviewProps {
  component: ComponentData
  error: string | null
}

const LivePreview = React.forwardRef<HTMLIFrameElement, LivePreviewProps>(
  ({ component, error }, ref) => {
    return (
      <div className="h-full flex flex-col">
        {/* Preview Header */}
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Live Preview</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
              Mobile
            </button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-colors">
              Desktop
            </button>
            <button className="p-1 text-gray-600 hover:text-gray-800 transition-colors">
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 bg-gray-100 p-4">
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-800 mb-2">
                <X className="w-4 h-4" />
                <span className="font-medium">Preview Error</span>
              </div>
              <pre className="text-sm text-red-700 whitespace-pre-wrap">{error}</pre>
            </div>
          ) : (
            <iframe
              ref={ref}
              className="w-full h-full bg-white rounded-lg shadow-sm border border-gray-200"
              title="Component Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          )}
        </div>
      </div>
    )
  }
)

// =================================================================
// SETTINGS PANEL COMPONENT
// =================================================================

interface SettingsPanelProps {
  component: ComponentData
  onMetadataChange: (field: string, value: any) => void
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ component, onMetadataChange }) => {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Component Name
              </label>
              <input
                type="text"
                value={component.name}
                onChange={(e) => onMetadataChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={component.description}
                onChange={(e) => onMetadataChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Framework Settings */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Framework Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Framework
              </label>
              <select
                value={component.metadata.framework}
                onChange={(e) => onMetadataChange('framework', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="react">React</option>
                <option value="vue">Vue</option>
                <option value="angular">Angular</option>
                <option value="svelte">Svelte</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complexity Level
              </label>
              <select
                value={component.metadata.complexity}
                onChange={(e) => onMetadataChange('complexity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dependencies */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Dependencies</h3>
          <div className="space-y-2">
            {component.metadata.dependencies.map((dep, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={dep}
                  onChange={(e) => {
                    const newDeps = [...component.metadata.dependencies]
                    newDeps[index] = e.target.value
                    onMetadataChange('dependencies', newDeps)
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  onClick={() => {
                    const newDeps = component.metadata.dependencies.filter((_, i) => i !== index)
                    onMetadataChange('dependencies', newDeps)
                  }}
                  className="p-2 text-red-600 hover:text-red-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                onMetadataChange('dependencies', [...component.metadata.dependencies, ''])
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add Dependency
            </button>
          </div>
        </div>

        {/* Preview Image */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Preview Image</h3>
          <div className="space-y-4">
            {component.previewImage && (
              <div className="border border-gray-300 rounded-lg p-4">
                <img
                  src={component.previewImage}
                  alt={`${component.name} preview`}
                  className="w-full max-w-sm mx-auto rounded-lg shadow-sm"
                />
              </div>
            )}
            <p className="text-sm text-gray-600">
              Preview images are automatically generated when you save the component.
              You can also manually generate a new preview using the "Generate Preview" button.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// =================================================================
// PREVIEW IMAGE GENERATOR
// =================================================================

export const PreviewImageGenerator = {
  /**
   * Generate preview image for a component using headless browser
   */
  async generatePreviewImage(componentCode: string, componentName: string): Promise<string> {
    try {
      // Create a temporary HTML document with the component
      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${componentName} Preview</title>
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { 
              margin: 0; 
              padding: 24px; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              background: white;
              width: 400px;
              height: 300px;
              overflow: hidden;
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            ${componentCode}
            
            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(React.createElement(${componentName}));
          </script>
        </body>
        </html>
      `

      // In a real implementation, you would use a service like:
      // - Puppeteer/Playwright for server-side screenshot generation
      // - HTML Canvas API for client-side image generation
      // - External service like htmlcsstoimage.com
      
      // For demo purposes, return a placeholder URL
      // In production, this would capture the actual component render
      const response = await fetch('/api/generate-preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          html,
          componentName,
          width: 400,
          height: 300
        })
      })

      const { imageUrl } = await response.json()
      return imageUrl
    } catch (error) {
      console.error('Failed to generate preview image:', error)
      // Return a fallback image URL
      return `/images/component-preview-fallback.jpg`
    }
  },

  /**
   * Generate preview images for multiple components in batch
   */
  async generateBatchPreviewImages(components: ComponentData[]): Promise<Record<string, string>> {
    const results: Record<string, string> = {}
    
    // Process components in batches to avoid overwhelming the server
    const batchSize = 5
    for (let i = 0; i < components.length; i += batchSize) {
      const batch = components.slice(i, i + batchSize)
      const promises = batch.map(async (component) => {
        const imageUrl = await this.generatePreviewImage(component.code, component.name)
        return { id: component.id, imageUrl }
      })
      
      const batchResults = await Promise.all(promises)
      batchResults.forEach(({ id, imageUrl }) => {
        results[id] = imageUrl
      })
    }
    
    return results
  }
}

// =================================================================
// USAGE EXAMPLE
// =================================================================

export const ComponentLibraryWithEdit: React.FC = () => {
  const [components, setComponents] = useState<ComponentData[]>([])
  const [editingComponent, setEditingComponent] = useState<ComponentData | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleEditComponent = (component: ComponentData) => {
    setEditingComponent(component)
    setIsEditModalOpen(true)
  }

  const handleSaveComponent = (updatedComponent: ComponentData) => {
    setComponents(prev => 
      prev.map(comp => 
        comp.id === updatedComponent.id ? updatedComponent : comp
      )
    )
    setIsEditModalOpen(false)
  }

  const handleGeneratePreview = async (componentId: string): Promise<string> => {
    const component = components.find(c => c.id === componentId)
    if (!component) throw new Error('Component not found')
    
    return await PreviewImageGenerator.generatePreviewImage(
      component.code, 
      component.name
    )
  }

  return (
    <div>
      {/* Component Library UI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map(component => (
          <div
            key={component.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Preview Image */}
            {component.previewImage ? (
              <img
                src={component.previewImage}
                alt={`${component.name} preview`}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
            )}
            
            {/* Component Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{component.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{component.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 capitalize">
                  {component.metadata.complexity}
                </span>
                <button
                  onClick={() => handleEditComponent(component)}
                  className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingComponent && (
        <EditComponent
          component={editingComponent}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveComponent}
          onGeneratePreview={handleGeneratePreview}
        />
      )}
    </div>
  )
}