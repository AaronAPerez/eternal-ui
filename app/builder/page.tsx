'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

function BuilderLoading() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Visual Builder</h2>
        <p className="text-gray-600">Preparing your development environment...</p>
      </div>
    </div>
  )
}

const UltimateVisualBuilder = dynamic(
  () => import('@/components/builder/UltimateVisualBuilder'),
  { 
    ssr: false,
    loading: BuilderLoading
  }
)

export default function BuilderPage() {
  return (
    <Suspense fallback={<BuilderLoading />}>
      <UltimateVisualBuilder />
    </Suspense>
  )
}