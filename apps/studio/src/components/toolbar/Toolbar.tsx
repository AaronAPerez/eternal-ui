'use client'

import { useBuilderStore } from '@/stores/builderStore'
import { 
  Play, 
  Square, 
  Grid3X3, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Save,
  Download,
  PanelLeftClose,
  PanelRightClose,
  Monitor,
  Tablet,
  Smartphone
} from 'lucide-react'

export function Toolbar() {
  const { 
    mode, 
    showGrid, 
    zoom, 
    deviceMode,
    leftPanelOpen,
    rightPanelOpen,
    setMode, 
    toggleGrid, 
    setZoom,
    setDeviceMode,
    toggleLeftPanel,
    toggleRightPanel,
    elements 
  } = useBuilderStore()
  
  const handleExport = () => {
    const exportData = {
      version: '1.0.0',
      elements: elements,
      timestamp: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'eternal-ui-project.json'
    a.click()
    URL.revokeObjectURL(url)
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
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Right Side - Tools */}
      <div className="flex items-center gap-2">
        {/* Panel Toggles */}
        <button
          onClick={toggleLeftPanel}
          className={`p-2 rounded-md transition-colors ${
            leftPanelOpen
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
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
        >
          <PanelRightClose className="w-4 h-4" />
        </button>
        
        {/* Grid Toggle */}
        <button
          onClick={toggleGrid}
          className={`p-2 rounded-md transition-colors ${
            showGrid
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Grid3X3 className="w-4 h-4" />
        </button>
        
        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-md p-1">
          <button
            onClick={() => setZoom(Math.max(25, zoom - 25))}
            disabled={zoom <= 25}
            className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
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
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2 ml-4">
          <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
            <Save className="w-4 h-4 mr-2 inline" />
            Save
          </button>
          
          <button 
            onClick={handleExport}
            className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <Download className="w-4 h-4 mr-2 inline" />
            Export
          </button>
        </div>
      </div>
    </div>
  )
}