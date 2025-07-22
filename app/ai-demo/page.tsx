'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

function AIDemoLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading AI Features</h2>
        <p className="text-gray-600">Initializing AI engines...</p>
      </div>
    </div>
  )
}

const AIFeaturesDemo = dynamic(
  () => import('@/components/ai/AIFeaturesDemo'),
  { 
    ssr: false,
    loading: AIDemoLoading
  }
)

export default function AIDemoPage() {
  return (
    <Suspense fallback={<AIDemoLoading />}>
      <AIFeaturesDemo />
    </Suspense>
  )
}