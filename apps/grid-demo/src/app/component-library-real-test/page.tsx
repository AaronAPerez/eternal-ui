'use client'

import React from 'react'

// Try to import from the built package
let ComponentLibrary: any = null
let ComponentDataManager: any = null

try {
  // Attempt to require the built files
  const componentEditor = require('../../../../../packages/component-editor/dist/index.js')
  ComponentLibrary = componentEditor.ComponentLibrary
  ComponentDataManager = componentEditor.ComponentDataManager
} catch (error) {
  console.error('Failed to import component-editor:', error)
}

export default function ComponentLibraryRealTest() {
  if (!ComponentLibrary) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-red-600">
          Import Error
        </h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p>Could not import @repo/component-editor</p>
          <p className="text-sm text-gray-600 mt-2">
            Check the console for detailed error information
          </p>
        </div>
      </div>
    )
  }

  const components = ComponentDataManager.getAllComponents()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Real Component Library Test
      </h1>
      
      <ComponentLibrary 
        components={components}
        onComponentUpdate={(id: string, updates: any) => {
          console.log('Component updated:', id, updates)
        }}
      />
    </div>
  )
}