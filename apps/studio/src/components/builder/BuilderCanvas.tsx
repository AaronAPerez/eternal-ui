'use client'

import { useBuilderStore } from '@/stores/builderStore'
import { getComponentByType } from '@/lib/componentRegistry'
import { ComponentRenderer } from './ComponentRenderer'

function RenderableElement({ element }: { element: any }) {
  const { selectElement, selectedElementId, hoveredElementId, hoverElement } = useBuilderStore()
  const componentDef = getComponentByType(element.type)
  
  const isSelected = selectedElementId === element.id
  const isHovered = hoveredElementId === element.id
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    selectElement(element.id)
  }
  
  const handleMouseEnter = () => {
    hoverElement(element.id)
  }
  
  const handleMouseLeave = () => {
    hoverElement(null)
  }
  
  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative group cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      } ${
        isHovered && !isSelected ? 'ring-1 ring-blue-300' : ''
      }`}
    >
      {/* Selection Label */}
      {isSelected && (
        <div className="absolute -top-8 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10">
          {componentDef?.name || element.type}
        </div>
      )}
      
      {/* Actual Component */}
      <ComponentRenderer element={element} />
    </div>
  )
}

export function BuilderCanvas() {
  const { elements, showGrid, zoom, deviceMode, selectElement } = useBuilderStore()
  
  const getDeviceClass = () => {
    switch (deviceMode) {
      case 'mobile': return 'max-w-sm mx-auto'
      case 'tablet': return 'max-w-md mx-auto'
      case 'desktop': return 'w-full'
      default: return 'w-full'
    }
  }
  
  const handleCanvasClick = () => {
    selectElement(null)
  }
  
  return (
    <div className="relative h-full bg-gray-100 overflow-auto" onClick={handleCanvasClick}>
      {/* Grid Background */}
      {showGrid && (
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
      
      {/* Canvas Content */}
      <div 
        className={`relative min-h-full p-8 ${getDeviceClass()}`}
        style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
      >
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-96 p-6">
          {elements.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Start Building
                </h3>
                <p className="text-gray-500 mb-4">
                  Click on components from the library to add them to your design
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {elements.map((element) => (
                <RenderableElement key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}