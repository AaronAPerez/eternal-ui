'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

function ComponentLibraryLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Component Library</h2>
        <p className="text-gray-600">Preparing 120+ components...</p>
      </div>
    </div>
  )
}

const ComponentLibrary = dynamic(
  () => import('@/components/ComponentLibrary'),
  { 
    ssr: false,
    loading: ComponentLibraryLoading
  }
)

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<ComponentLibraryLoading />}>
        <ComponentLibrary />
      </Suspense>
    </div>
  )
}