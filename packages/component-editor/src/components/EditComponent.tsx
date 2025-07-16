'use client'

import React from 'react'
import { ComponentData } from '../types'

interface EditComponentProps {
  component: ComponentData
  isOpen: boolean
  onClose: () => void
  onSave: (component: ComponentData) => void
  onGeneratePreview: (componentId: string) => Promise<string>
}

export const EditComponent: React.FC<EditComponentProps> = ({
  component,
  isOpen,
  onClose,
  onSave,
  onGeneratePreview
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Edit Component: {component.name}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Component Name
            </label>
            <input
              type="text"
              defaultValue={component.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              defaultValue={component.description}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-lg">
            Full component editor will be implemented here with:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Code editor with syntax highlighting</li>
              <li>Live responsive preview</li>
              <li>Property editor</li>
              <li>Preview image generation</li>
            </ul>
          </div>
        </div>
        
        <div className="flex gap-2 mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            Close
          </button>
          <button 
            onClick={() => onSave(component)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}