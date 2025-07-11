'use client'

import { useBuilderStore } from '@/stores/builderStore'
import { ComponentLibrary } from '@/components/panels/ComponentLibrary'
import { PropertyPanel } from '@/components/panels/PropertyPanel'
import { BuilderCanvas } from './BuilderCanvas'
import { CodeView } from './CodeView'
import { Toolbar } from '@/components/toolbar/Toolbar'

export function BuilderInterface() {
  const { leftPanelOpen, rightPanelOpen, mode } = useBuilderStore()

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Top Toolbar */}
      <Toolbar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Component Library (hidden in code mode) */}
        {leftPanelOpen && mode !== 'code' && (
          <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
            <ComponentLibrary />
          </div>
        )}
        
        {/* Center - Canvas or Code View */}
        <div className="flex-1 relative bg-gray-100">
          {mode === 'code' ? (
            <CodeView />
          ) : (
            <BuilderCanvas />
          )}
        </div>
        {/* Right Sidebar - Properties (hidden in code mode) */}
        {rightPanelOpen && mode !== 'code' && (
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <PropertyPanel />
          </div>
        )}
      </div>
    </div>
  )
}