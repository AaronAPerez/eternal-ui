'use client'

import { ComponentLibrary } from '../../components/ComponentLibrary'

export default function ComponentLibraryTestPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Component Library Test
      </h1>
      <p className="text-gray-600 mb-8">
        Testing the integrated component library with working functionality
      </p>
      
      <ComponentLibrary 
        onComponentUpdate={(id, updates) => {
          console.log('Component updated:', id, updates)
        }}
      />
    </div>
  )
}