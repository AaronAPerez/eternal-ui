'use client'

import React, { useState } from 'react'
import { ComponentData } from '../types'

interface ComponentLibraryProps {
  components: ComponentData[]
  onComponentUpdate: (id: string, updates: Partial<ComponentData>) => void
  viewMode?: 'grid' | 'list'
  showAddButton?: boolean
  className?: string
}

export const ComponentLibrary: React.FC<ComponentLibraryProps> = ({
  components,
  onComponentUpdate,
  viewMode = 'grid',
  showAddButton = true,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className={`component-library ${className}`}>
      <div className="text-center p-8 bg-white rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Component Library
        </h3>
        <p className="text-gray-600 mb-4">
          {components.length} components ready to use
        </p>
        <div className="text-sm text-gray-500">
          Component editing functionality will be added here
        </div>
        
        {/* Basic search for now */}
        <div className="mt-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        {/* Display filtered components */}
        <div className="mt-6 grid gap-4">
          {components
            .filter(comp => 
              comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              comp.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(component => (
              <div key={component.id} className="p-4 border rounded-lg text-left">
                <h4 className="font-semibold">{component.name}</h4>
                <p className="text-sm text-gray-600">{component.description}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {component.category}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}