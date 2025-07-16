'use client'

import React from 'react'
import { ComponentData } from '../types'

interface ResponsivePreviewProps {
  component: ComponentData
  error: string | null
}

export const ResponsivePreview: React.FC<ResponsivePreviewProps> = ({
  component,
  error
}) => {
  return (
    <div className="responsive-preview p-4 border rounded-lg bg-gray-50">
      <h4 className="font-semibold mb-2 text-gray-900">
        Preview: {component.name}
      </h4>
      {error ? (
        <div className="text-red-600 p-3 bg-red-50 rounded">
          Error: {error}
        </div>
      ) : (
        <div className="text-gray-600 p-3 bg-white rounded border">
          Responsive preview will be implemented here with:
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li>Mobile, tablet, and desktop views</li>
            <li>Device frame simulation</li>
            <li>Real-time code rendering</li>
            <li>Orientation toggle</li>
          </ul>
        </div>
      )}
    </div>
  )
}