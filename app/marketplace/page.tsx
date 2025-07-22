'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

function MarketplaceLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Marketplace</h2>
        <p className="text-gray-600">Connecting to component marketplace...</p>
      </div>
    </div>
  )
}

const ComponentMarketplace = dynamic(
  () => import('@/components/marketplace/ComponentMarketplace'),
  { 
    ssr: false,
    loading: MarketplaceLoading
  }
)

export default function MarketplacePage() {
  return (
    <Suspense fallback={<MarketplaceLoading />}>
      <ComponentMarketplace />
    </Suspense>
  )
}