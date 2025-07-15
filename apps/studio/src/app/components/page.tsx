import { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Dynamic import to prevent server-side rendering issues
const ComponentShowcase = dynamic(() => import('./ComponentShowcase'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Component Showcase...</p>
      </div>
    </div>
  )
})

export const metadata: Metadata = {
  title: 'Component Showcase | Eternal UI',
  description: 'Explore our comprehensive collection of React components for building modern web applications.',
  keywords: 'React components, UI library, web development, design system, component showcase',
  openGraph: {
    title: 'Component Showcase | Eternal UI',
    description: 'Explore our comprehensive collection of React components for building modern web applications.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Component Showcase | Eternal UI',
    description: 'Explore our comprehensive collection of React components for building modern web applications.',
  }
}

/**
 * Components Page
 * 
 * Server component that renders the component showcase with proper SEO and metadata.
 * The interactive showcase logic is delegated to the client-side ComponentShowcase component.
 */
export default function ComponentsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page header - server-side rendered for SEO */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Component Showcase
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Explore our comprehensive collection of production-ready React components. 
              Each component is fully customizable, accessible, and optimized for performance.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                50+ Components
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                TypeScript Ready
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                WCAG AA Compliant
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Component showcase - client-side rendered */}
      <ComponentShowcase />
    </main>
  )
}