'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'

// Loading component
const LoadingSpinner = () => (
  <div className="h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-600 dark:text-gray-400">Loading Builder...</p>
    </div>
  </div>
)

// ✅ CORRECT - Simple dynamic imports (components should have default exports)
const BuilderInterface = dynamic(
  () => import('@/components/builder/BuilderInterface'),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
)

const DarkModeEnhancedGridSystem = dynamic(
  () => import('@/components/builder/DarkModeEnhancedGridSystem'),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
)

function BuilderContent() {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode') || 'visual'
  
  return (
    <div className="min-h-screen">
      {mode === 'grid' ? (
        <DarkModeEnhancedGridSystem />
      ) : (
        <BuilderInterface />
      )}
    </div>
  )
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BuilderContent />
    </Suspense>
  )
}