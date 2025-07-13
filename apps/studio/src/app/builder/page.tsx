import { Metadata } from 'next'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const StudioInterface = dynamic(() => import('@/components/builder/BuilderInterface'), {
  loading: () => (
    <div className="h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading Studio...</p>
      </div>
    </div>
  ),
  ssr: false // Disable SSR for the builder
})

export const metadata: Metadata = {
  title: 'Visual Builder | Eternal UI',
  description: 'Create stunning websites with our AI-powered visual builder. Drag, drop, and build responsive websites in minutes.',
  robots: { index: false } // Don't index the builder interface
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div>Loading builder...</div>}>
      <StudioInterface />
    </Suspense>
  )
}
