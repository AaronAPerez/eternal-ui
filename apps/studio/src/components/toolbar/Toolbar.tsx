'use client'

import { useEffect } from 'react'
import { useBuilderStore } from '@/stores/builderStore'
import { 
  Play, 
  Square, 
  Grid3X3, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  RotateCw,
  Save,
  Download,
  PanelLeftClose,
  PanelRightClose,
  Monitor,
  Tablet,
  Smartphone,
  Copy,
  Trash2,
  Code
} from 'lucide-react'

export function Toolbar() {
  const { 
    mode, 
    showGrid, 
    zoom, 
    deviceMode,
    leftPanelOpen,
    rightPanelOpen,
    selectedElementId,
    setMode, 
    toggleGrid, 
    setZoom,
    setDeviceMode,
    toggleLeftPanel,
    toggleRightPanel,
    elements,
    duplicateElement,
    deleteElement,
    undo,
    redo,
    canUndo,
    canRedo
  } = useBuilderStore()
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }
      
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault()
            if (e.shiftKey) {
              redo()
            } else {
              undo()
            }
            break
          case 'y':
            e.preventDefault()
            redo()
            break
          case 'd':
            e.preventDefault()
            if (selectedElementId) {
              duplicateElement(selectedElementId)
            }
            break
          case 's':
            e.preventDefault()
            handleSave()
            break
        }
      } else {
        switch (e.key) {
          case 'Delete':
          case 'Backspace':
            e.preventDefault()
            if (selectedElementId) {
              deleteElement(selectedElementId)
            }
            break
          case 'Escape':
            e.preventDefault()
            useBuilderStore.getState().selectElement(null)
            break
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedElementId, undo, redo, duplicateElement, deleteElement])
  
  const handleSave = () => {
    // Implement save functionality
    console.log('Saving project...')
  }
  
  const handleExport = () => {
    if (mode === 'code') {
      // Export as code
      const code = generateReactCode()
      downloadFile('App.jsx', code, 'text/javascript')
    } else {
      // Export as JSON
      const exportData = {
        version: '1.0.0',
        elements: elements,
        timestamp: new Date().toISOString()
      }
      downloadFile('eternal-ui-project.json', JSON.stringify(exportData, null, 2), 'application/json')
    }
  }
  
  const downloadFile = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }
  
  const generateReactCode = () => {
    // Basic React code generation
    const imports = `import React from 'react'\n\n`
    const component = `export default function App() {\n  return (\n    <div className="p-8">\n${generateElementsCode(elements, 6)}\n    </div>\n  )\n}`
    return imports + component
  }
  
  const generateElementsCode = (elements: any[], indent: number): string => {
    return elements
      .filter(el => !el.parent)
      .map(el => generateElementCode(el, indent))
      .join('\n')
  }
  
  const generateElementCode = (element: any, indent: number): string => {
    const spaces = ' '.repeat(indent)
    const props = Object.entries(element.props)
      .filter(([key, value]) => value !== undefined && value !== '')
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}="${value}"`
        }
        return `${key}={${JSON.stringify(value)}}`
      })
      .join(' ')
    
    const tag = element.type === 'input' ? 'input' : 'div'
    const className = getElementClassName(element)
    
    if (element.children?.length > 0) {
      return `${spaces}<${tag} className="${className}" ${props}>\n${generateElementsCode(element.children, indent + 2)}\n${spaces}</${tag}>`
    } else {
      return `${spaces}<${tag} className="${className}" ${props} />`
    }
  }
  
  const getElementClassName = (element: any) => {
    // Generate appropriate CSS classes based on component type
    switch (element.type) {
      case 'button': return 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
      case 'input': return 'px-3 py-2 border border-gray-300 rounded'
      case 'container': return 'container mx-auto'
      case 'grid': return `grid grid-cols-${element.props.cols || 3} gap-${element.props.gap || 4}`
      case 'card': return 'p-6 bg-white border border-gray-200 rounded-lg shadow-sm'
      default: return ''
    }
  }
  
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left Side - Logo & Project */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">EU</span>
          </div>
          <h1 className="text-lg font-semibold">Eternal UI Studio</h1>
        </div>
        
        <div className="text-sm text-gray-500">
          Untitled Project
        </div>
      </div>
      
      {/* Center - Mode Toggle & Device Selector */}
      <div className="flex items-center gap-4">
        {/* Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('design')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              mode === 'design' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Square className="w-4 h-4 mr-2 inline" />
            Design
          </button>
          
          <button
            onClick={() => setMode('preview')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              mode === 'preview' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Play className="w-4 h-4 mr-2 inline" />
            Preview
          </button>
          
          <button
            onClick={() => setMode('code')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              mode === 'code' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Code className="w-4 h-4 mr-2 inline" />
            Code
          </button>
        </div>
        
        {/* Device Selector */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-md p-1">
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`p-2 rounded transition-colors ${
              deviceMode === 'desktop'
                ? 'bg-white shadow-sm'
                : 'hover:bg-gray-200'
            }`}
            title="Desktop View"
          >
            <Monitor className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setDeviceMode('tablet')}
            className={`p-2 rounded transition-colors ${
              deviceMode === 'tablet'
                ? 'bg-white shadow-sm'
                : 'hover:bg-gray-200'
            }`}
            title="Tablet View"
          >
            <Tablet className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`p-2 rounded transition-colors ${
              deviceMode === 'mobile'
                ? 'bg-white shadow-sm'
                : 'hover:bg-gray-200'
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Right Side - Tools */}
      <div className="flex items-center gap-2">
        {/* History Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={undo}
            disabled={!canUndo()}
            className="p-2 rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button
            onClick={redo}
            disabled={!canRedo()}
            className="p-2 rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
            title="Redo (Ctrl+Y)"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
        
        {/* Element Actions */}
        {selectedElementId && (
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={() => duplicateElement(selectedElementId)}
              className="p-2 rounded-md transition-colors hover:bg-gray-100"
              title="Duplicate (Ctrl+D)"
            >
              <Copy className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => deleteElement(selectedElementId)}
              className="p-2 rounded-md transition-colors hover:bg-red-100 text-red-600"
              title="Delete (Del)"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
        
        {/* Panel Toggles */}
        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={toggleLeftPanel}
            className={`p-2 rounded-md transition-colors ${
              leftPanelOpen
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Toggle Component Library"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
          
          <button
            onClick={toggleRightPanel}
            className={`p-2 rounded-md transition-colors ${
              rightPanelOpen
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Toggle Properties Panel"
          >
            <PanelRightClose className="w-4 h-4" />
          </button>
        </div>
        
        {/* Grid Toggle */}
        <button
          onClick={toggleGrid}
          className={`p-2 rounded-md transition-colors ${
            showGrid
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title="Toggle Grid"
        >
          <Grid3X3 className="w-4 h-4" />
        </button>
        
        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-md p-1">
          <button
            onClick={() => setZoom(Math.max(25, zoom - 25))}
            disabled={zoom <= 25}
            className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          
          <span className="text-sm text-gray-600 min-w-[50px] text-center px-2">
            {zoom}%
          </span>
          
          <button
            onClick={() => setZoom(Math.min(200, zoom + 25))}
            disabled={zoom >= 200}
            className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2 ml-4">
          <button 
            onClick={handleSave}
            className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            title="Save Project (Ctrl+S)"
          >
            <Save className="w-4 h-4 mr-2 inline" />
            Save
          </button>
          
          <button 
            onClick={handleExport}
            className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            title={mode === 'code' ? 'Export React Code' : 'Export Project JSON'}
          >
            <Download className="w-4 h-4 mr-2 inline" />
            {mode === 'code' ? 'Export Code' : 'Export'}
          </button>
        </div>
      </div>
    </div>
  )
}