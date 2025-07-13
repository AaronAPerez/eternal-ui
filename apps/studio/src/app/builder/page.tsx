'use client'

import { Suspense, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { useBuilderStore } from '@/stores/builderStore'

const StudioBuilderInterface = dynamic(
  () => import('@/components/builder/StudioBuilderInterface'), 
  {
    loading: () => (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Studio...</p>
        </div>
      </div>
    ),
    ssr: false
  }
)

function BuilderContent() {
  const searchParams = useSearchParams()
  const { setMode } = useBuilderStore()
  
  useEffect(() => {
    const mode = searchParams.get('mode')
    if (mode && ['visual', 'advanced', 'components'].includes(mode)) {
      setMode(mode as any)
    }
  }, [searchParams, setMode])
  
  return <StudioBuilderInterface />
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div>Loading builder...</div>}>
      <BuilderContent />
    </Suspense>
  )
}