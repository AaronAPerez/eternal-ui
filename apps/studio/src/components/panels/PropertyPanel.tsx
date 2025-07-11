'use client'

import { useBuilderStore } from '@/stores/builderStore'
import { getComponentByType } from '@/lib/componentRegistry'

export function PropertyPanel() {
  const { selectedElementId, elements, updateElement, deleteElement } = useBuilderStore()
  
  const selectedElement = elements.find(el => el.id === selectedElementId)
  const componentDef = selectedElement ? getComponentByType(selectedElement.type) : null
  
  if (!selectedElement || !componentDef) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Properties</h2>
        <p className="text-gray-500">Select a component to edit its properties</p>
      </div>
    )
  }
  
  const handlePropertyChange = (propertyName: string, value: any) => {
    updateElement(selectedElement.id, {
      props: {
        ...selectedElement.props,
        [propertyName]: value
      }
    })
  }
  
  const handleDelete = () => {
    deleteElement(selectedElement.id)
  }
  
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Properties</h2>
      
      {/* Component Info */}
      <div className="mb-6 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{componentDef.icon}</span>
          <h3 className="font-medium">{componentDef.name}</h3>
        </div>
        <p className="text-sm text-gray-600">{componentDef.description}</p>
      </div>
      
      {/* Property Editors */}
      <div className="space-y-4">
        {/* Text Content */}
        {selectedElement.props.children !== undefined && (
          <div>
            <label className="block text-sm font-medium mb-2">Text Content</label>
            <input
              type="text"
              value={selectedElement.props.children || ''}
              onChange={(e) => handlePropertyChange('children', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              placeholder="Enter text..."
            />
          </div>
        )}
        
        {/* Placeholder */}
        {selectedElement.props.placeholder !== undefined && (
          <div>
            <label className="block text-sm font-medium mb-2">Placeholder</label>
            <input
              type="text"
              value={selectedElement.props.placeholder || ''}
              onChange={(e) => handlePropertyChange('placeholder', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              placeholder="Enter placeholder..."
            />
          </div>
        )}
        
        {/* Button Variant */}
        {selectedElement.type === 'button' && (
          <div>
            <label className="block text-sm font-medium mb-2">Button Style</label>
            <select
              value={selectedElement.props.variant || 'default'}
              onChange={(e) => handlePropertyChange('variant', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="default">Default</option>
              <option value="destructive">Destructive</option>
              <option value="outline">Outline</option>
              <option value="secondary">Secondary</option>
              <option value="ghost">Ghost</option>
              <option value="link">Link</option>
            </select>
          </div>
        )}
        
        {/* Button/Input Size */}
        {(selectedElement.type === 'button' || selectedElement.type === 'input') && (
          <div>
            <label className="block text-sm font-medium mb-2">Size</label>
            <select
              value={selectedElement.props.size || selectedElement.props.inputSize || 'default'}
              onChange={(e) => {
                const prop = selectedElement.type === 'input' ? 'inputSize' : 'size'
                handlePropertyChange(prop, e.target.value)
              }}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="sm">Small</option>
              <option value="default">Default</option>
              <option value="lg">Large</option>
            </select>
          </div>
        )}
        
        {/* Container Size */}
        {selectedElement.type === 'container' && (
          <div>
            <label className="block text-sm font-medium mb-2">Container Size</label>
            <select
              value={selectedElement.props.size || 'lg'}
              onChange={(e) => handlePropertyChange('size', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
              <option value="2xl">2X Large</option>
              <option value="full">Full Width</option>
            </select>
          </div>
        )}
        
        {/* Grid Columns */}
        {selectedElement.type === 'grid' && (
          <div>
            <label className="block text-sm font-medium mb-2">Columns</label>
            <select
              value={selectedElement.props.cols || 3}
              onChange={(e) => handlePropertyChange('cols', Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value={1}>1 Column</option>
              <option value={2}>2 Columns</option>
              <option value={3}>3 Columns</option>
              <option value={4}>4 Columns</option>
              <option value={6}>6 Columns</option>
              <option value={12}>12 Columns</option>
            </select>
          </div>
        )}
        
        {/* Element ID (Read-only) */}
        <div>
          <label className="block text-sm font-medium mb-2">Element ID</label>
          <input
            type="text"
            value={selectedElement.id}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md text-sm bg-gray-50 font-mono text-xs"
          />
        </div>
      </div>
      
      {/* Actions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={handleDelete}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
        >
          Delete Component
        </button>
      </div>
    </div>
  )
}