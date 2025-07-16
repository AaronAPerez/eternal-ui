'use client'

import React, { useState } from 'react'
import { ArrowLeft, ExternalLink, Download, Copy, Github } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { componentRegistry } from '@/data/components'
import { ComponentPreview } from './ComponentPreview'

interface ComponentDetailPageProps {
  componentId: string
}

export const ComponentDetailPage: React.FC<ComponentDetailPageProps> = ({
  componentId
}) => {
  const router = useRouter()
  const [activeVariant, setActiveVariant] = useState(0)
  const [showCode, setShowCode] = useState(false)

  const component = componentRegistry.find(c => c.id === componentId)

  if (!component) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Component Not Found
          </h1>
          <button
            onClick={() => router.back()}
            className="text-indigo-600 hover:text-indigo-700"
          >
            ← Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {component.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {component.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Add to Project</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Github className="w-4 h-4" />
                <span>View Source</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Component Preview */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <ComponentPreview 
          componentId={componentId}
          fullPage={true}
        />
      </div>
    </div>
  )
}