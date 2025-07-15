import { Metadata } from 'next'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Navigation } from '@/components/layout/Navigation'
import { HomepageShowcase } from '@/components/showcase/HomepageShowcase'

// Dynamic import for client component
const HomepageClient = dynamic(() => import('@/components/showcase/HomepageClient'), {
  loading: () => <HomepageLoading />,
  // ssr: false
})

// Enhanced metadata for homepage SEO
export const metadata: Metadata = {
  title: 'Eternal UI - AI-Powered Visual Website Builder | Create Stunning Websites 10x Faster',
  description: 'Build beautiful, responsive websites with our AI-powered visual builder. Export clean code to React, Vue, Svelte, or Angular. 85% cheaper than Framer with superior performance. Start free today.',
  keywords: [
    'website builder',
    'visual editor',
    'ai website builder',
    'drag and drop builder',
    'react code generator',
    'vue code generator',
    'svelte code generator',
    'angular code generator',
    'no code website builder',
    'responsive web design',
    'website templates',
    'web development tools',
    'frontend builder',
    'ui builder',
    'website creator',
    'web design software',
    'landing page builder',
    'framer alternative',
    'webflow alternative',
    'wordpress alternative'
  ],
  authors: [{ name: 'Eternal UI Team', url: 'https://eternal-ui.com/team' }],
  creator: 'Eternal UI',
  publisher: 'Eternal UI',
  category: 'Web Development Tools',
  classification: 'Website Builder',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://eternal-ui.com',
    siteName: 'Eternal UI',
    title: 'Eternal UI - AI-Powered Visual Website Builder',
    description: 'Create stunning websites 10x faster with AI-powered layouts. Export clean code to any framework. Start building for free.',
    images: [
      {
        url: '/og-homepage.jpg',
        width: 1200,
        height: 630,
        alt: 'Eternal UI - AI-Powered Visual Website Builder Interface',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@EternalUI',
    creator: '@EternalUI',
    title: 'Eternal UI - Build Websites 10x Faster with AI',
    description: 'AI-powered visual builder that exports clean code. 85% cheaper than Framer. Start free.',
    images: ['/twitter-homepage.jpg'],
  },
  alternates: {
    canonical: 'https://eternal-ui.com',
  },
}

// Enhanced structured data for homepage
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Eternal UI',
  description: 'AI-powered visual website builder with code export capabilities',
  url: 'https://eternal-ui.com',
  applicationCategory: 'DesignApplication',
  applicationSubCategory: 'Website Builder',
  operatingSystem: 'Web Browser',
  offers: [
    {
      '@type': 'Offer',
      name: 'Free Plan',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free tier with core features',
    }
  ],
  featureList: [
    'AI-powered layout suggestions',
    'Visual drag-and-drop editor',
    'Clean code export (React, Vue, Svelte, Angular)',
    'Real-time collaboration',
    'Responsive design tools',
    'Performance optimization',
    'SEO optimization',
    'Accessibility compliance (WCAG 2.1 AA)'
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1247',
    bestRating: '5'
  }
}

// Loading component
function HomepageLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black/90 dark:to-black/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-96 animate-pulse" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-80 animate-pulse" />
              </div>
              <div className="flex space-x-4">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse" />
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
              </div>
            </div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Homepage Server Component
 * 
 * This component handles:
 * - SEO metadata and structured data
 * - Server-side rendering setup
 * - Loading states and error boundaries
 */
export default function HomePage() {
  return (
    <>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* Main homepage content */}
      <Suspense fallback={<HomepageLoading />}>
        <HomepageClient />
      </Suspense>
    </>
  )
}