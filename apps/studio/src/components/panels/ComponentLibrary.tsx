'use client'

import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { useBuilderStore } from '@/stores/builderStore'
import { componentRegistry, getComponentsByCategory, createElementFromComponent } from '@/lib/componentRegistry'

const categories = [
  { id: 'layout', name: 'Layout', icon: '📐' },
  { id: 'ui', name: 'UI Elements', icon: '🎨' },
  { id: 'data', name: 'Data Display', icon: '📊' },
  { id: 'feedback', name: 'Feedback', icon: '💬' }
]

function DraggableComponent({ component }: { component: any }) {
  const { addElement } = useBuilderStore()
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: `new-${component.type}`,
    data: {
      type: 'new-component',
      componentType: component.type
    }
  })
  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
  } : undefined
  
  const handleClick = () => {
    try {
      const element = createElementFromComponent(component.type)
      addElement(element)
    } catch (error) {
      console.error('Failed to add component:', error)
    }
  }
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className={`p-3 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors hover:bg-blue-50 ${
        isDragging ? 'ring-2 ring-blue-400' : ''
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xl">{component.icon}</span>
        <div>
          <h3 className="font-medium">{component.name}</h3>
          <p className="text-sm text-gray-600">{component.description}</p>
        </div>
      </div>
    </div>
  )
}

export function ComponentLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('layout')
  
  const components = getComponentsByCategory(selectedCategory)
  
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      
      {/* Category Tabs */}
      <div className="space-y-1 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors ${
              selectedCategory === category.id 
                ? 'bg-blue-100 text-blue-700' 
                : 'hover:bg-gray-100'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>
      
      {/* Component List */}
      <div className="space-y-2">
        {components.map((component) => (
          <DraggableComponent key={component.type} component={component} />
        ))}
      </div>
      
      {/* Usage Hint */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          💡 <strong>Tip:</strong> Click to add or drag components to the canvas
        </p>
      </div>
    </div>
  )
}