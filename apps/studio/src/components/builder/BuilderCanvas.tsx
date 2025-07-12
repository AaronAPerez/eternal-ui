'use client'

import { useBuilderStore } from '@/stores/builderStore'
import { SortableElement } from './SortableElement'
import { useDroppable } from '@dnd-kit/core'
import { createElementFromComponent } from '@/lib/componentRegistry'

function DroppableCanvas({ children, isPreviewMode }: { children: React.ReactNode, isPreviewMode: boolean }) {
  const { addElement } = useBuilderStore()
  
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-drop-zone',
    data: {
      accepts: ['new-component']
    }
  })
  
  const handleDrop = (componentType: string) => {
    try {
      const element = createElementFromComponent(componentType)
      addElement(element)
    } catch (error) {
      console.error('Failed to add component:', error)
    }
  }
  
  return (
    <div
      ref={setNodeRef}
      className={`relative ${
        isOver && !isPreviewMode ? 'bg-blue-50 ring-2 ring-blue-300 ring-dashed' : ''
      }`}
    >
      {/* Drop Indicator */}
      {isOver && !isPreviewMode && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-50 bg-opacity-90 z-10">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
            Drop component here
          </div>
        </div>
      )}
      
      {children}
    </div>
  )
}

export function BuilderCanvas() {
  const { elements, showGrid, zoom, deviceMode, mode, selectElement, draggedElementId } = useBuilderStore()
  
  const isPreviewMode = mode === 'preview'
  
  const getDeviceClass = () => {
    switch (deviceMode) {
      case 'mobile': return 'max-w-sm mx-auto'
      case 'tablet': return 'max-w-md mx-auto'  
      case 'desktop': return 'w-full'
      default: return 'w-full'
    }
  }
  
  const handleCanvasClick = () => {
    if (!isPreviewMode) {
      selectElement(null)
    }
  }
  
  // Handle drag end from component library
  const handleNewComponentDrop = (event: any) => {
    const { active } = event
    if (active?.data?.current?.type === 'new-component') {
      try {
        const element = createElementFromComponent(active.data.current.componentType)
        useBuilderStore.getState().addElement(element)
      } catch (error) {
        console.error('Failed to add component:', error)
      }
    }
  }
  
  return (
    <div className="relative h-full bg-gray-100 overflow-auto" onClick={handleCanvasClick}>
      {/* Grid Background (only in design mode) */}
      {showGrid && !isPreviewMode && (
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e5e7eb 1px, transparent 1px),
              linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      )}
      
      {/* Preview Mode Banner */}
      {isPreviewMode && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium z-10 shadow-lg">
          🎯 Preview Mode - Click Design to edit
        </div>
      )}
      
      {/* Canvas Content */}
      <div 
        className={`relative min-h-full ${isPreviewMode ? 'p-0' : 'p-8'} ${getDeviceClass()}`}
        style={{ 
          transform: isPreviewMode ? 'scale(1)' : `scale(${zoom / 100})`, 
          transformOrigin: 'top left' 
        }}
      >
        <DroppableCanvas isPreviewMode={isPreviewMode}>
          <div className={`${isPreviewMode ? 'min-h-screen' : 'bg-white rounded-lg shadow-sm border border-gray-200 min-h-96 p-6'}`}>
            {elements.length === 0 ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎨</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Start Building
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {isPreviewMode 
                      ? 'Switch to Design mode to add components'
                      : 'Drag components from the library or click to add them'
                    }
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {elements
                  .filter(el => !el.parent) // Only render root elements
                  .map((element) => (
                    <SortableElement 
                      key={element.id} 
                      element={element} 
                      isPreviewMode={isPreviewMode}
                    />
                  ))}
              </div>
            )}
          </div>
        </DroppableCanvas>
      </div>
    </div>
  )
}