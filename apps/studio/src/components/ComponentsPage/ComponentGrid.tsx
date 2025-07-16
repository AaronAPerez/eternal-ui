'use client'

import React from 'react'
import { ComponentCard } from './ComponentCard'
import { ComponentMetadata } from '@/data/components'


interface ComponentGridProps {
  components: ComponentMetadata[]
  viewMode: 'grid' | 'list'
  onComponentSelect: (id: string) => void
}

export const ComponentGrid: React.FC<ComponentGridProps> = ({
  components,
  viewMode,
  onComponentSelect
}) => {
  if (components.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No components found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your search criteria or explore different categories
        </p>
      </div>
    )
  }

  return (
    <div className={`
      ${viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
        : 'space-y-4'
      }
    `}>
      {components.map((component) => (
        <ComponentCard
          key={component.id}
          component={component}
          viewMode={viewMode}
          onClick={() => onComponentSelect(component.id)}
        />
      ))}
    </div>
  )
}