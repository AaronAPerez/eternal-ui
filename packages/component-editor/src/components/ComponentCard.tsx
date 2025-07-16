'use client'

import React from 'react'
import { ComponentData } from '../types'

interface ComponentCardProps {
  component: ComponentData
  viewMode: 'grid' | 'list'
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
  onEdit: () => void
  onUse: (id: string) => void
}

export const ComponentCard: React.FC<ComponentCardProps> = ({
  component,
  viewMode,
  isFavorite,
  onToggleFavorite,
  onEdit,
  onUse
}) => {
  return (
    <div className="component-card p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <h4 className="font-semibold text-gray-900">{component.name}</h4>
      <p className="text-sm text-gray-600 mt-1">{component.description}</p>
      
      <div className="flex items-center justify-between mt-3">
        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded capitalize">
          {component.category}
        </span>
        <div className="flex gap-2">
          <button 
            onClick={onEdit}
            className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-colors"
          >
            Edit
          </button>
          <button 
            onClick={() => onUse(component.id)}
            className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
          >
            Use
          </button>
        </div>
      </div>
    </div>
  )
}