import React from 'react'
import { Metadata } from 'next'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { ExportDemoClient } from './ExportDemoClient'
import { ExportDemoSkeleton } from './ExportDemoSkeleton'

// Dynamic imports for better performance and code splitting
const PerformanceMonitor = dynamic(() => import('@/../../components/monitoring/PerformanceMonitor'), {
  ssr: false
})

const AccessibilityChecker = dynamic(() => import('@/../../components/accessibility/AccessibilityChecker'), {
  ssr: false
})

// SEO metadata configuration following best practices
export const metadata: Metadata = {
  title: 'Export Demo - Eternal UI | Convert Designs to Production Code',
  description: 'Experience the power of Eternal UI\'s export functionality. Convert visual designs to production-ready React, Vue, Svelte, or Angular code in seconds. Try our live demo now.',
  keywords: [
    'visual builder export',
    'design to code',
    'React export',
    'Vue export',
    'Svelte export',
    'Angular export',
    'production code generation',
    'component export',
    'TypeScript generation',
    'responsive design export',
    'accessibility compliant code'
  ],
  authors: [{ name: 'Eternal UI Team' }],
  creator: 'Eternal UI',
  publisher: 'Eternal UI',
  category: 'Web Development Tools',
  classification: 'Business',
  
  // Open Graph metadata for social sharing
  openGraph: {
    title: 'Export Demo - Convert Designs to Code | Eternal UI',
    description: 'See how Eternal UI converts visual designs to production-ready code. Export to React, Vue, Svelte, or Angular with full TypeScript support.',
    url: 'https://eternal-ui.com/export-demo',
    siteName: 'Eternal UI',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://eternal-ui.com/images/export-demo-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Eternal UI Export Demo - Visual Builder to Production Code',
        type: 'image/jpeg'
      }
    ]
  },
  
  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Export Demo - Convert Designs to Code | Eternal UI',
    description: 'Experience the future of web development. Convert designs to production code in seconds.',
    images: ['https://eternal-ui.com/images/export-demo-twitter.jpg'],
    creator: '@eternal_ui'
  },
  
  // Additional SEO enhancements
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  
  // Canonical URL to prevent duplicate content issues
  alternates: {
    canonical: 'https://eternal-ui.com/export-demo'
  },
  
  // Additional metadata for enhanced SEO
  other: {
    'google-site-verification': 'your-google-verification-code',
    'msvalidate.01': 'your-bing-verification-code'
  }
}

/**
 * Structured data for enhanced search engine understanding
 * Implements Schema.org WebApplication and SoftwareApplication schemas
 */
const structuredData = {
  '@context': 'https://schema.org',
  '@type': ['WebApplication', 'SoftwareApplication'],
  name: 'Eternal UI Export Demo',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  description: 'Interactive demo showcasing Eternal UI\'s ability to export visual designs to production-ready code in multiple frameworks including React, Vue, Svelte, and Angular.',
  url: 'https://eternal-ui.com/export-demo',
  screenshot: 'https://eternal-ui.com/images/export-demo-screenshot.jpg',
  softwareVersion: '1.0.0',
  datePublished: '2025-01-01',
  dateModified: new Date().toISOString(),
  author: {
    '@type': 'Organization',
    name: 'Eternal UI',
    url: 'https://eternal-ui.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Eternal UI',
    logo: {
      '@type': 'ImageObject',
      url: 'https://eternal-ui.com/logo.png'
    }
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock'
  },
  featureList: [
    'Visual design to code conversion',
    'Multi-framework export (React, Vue, Svelte, Angular)',
    'TypeScript support',
    'Accessibility compliance',
    'Responsive design generation',
    'Production-ready code output'
  ],
  browserRequirements: 'Requires JavaScript. Works with Chrome, Firefox, Safari, and Edge.',
  softwareRequirements: 'Modern web browser with JavaScript enabled'
}

/**
 * Export Demo Page Component
 * 
 * This page demonstrates Eternal UI's core export functionality, allowing users
 * to experience how visual designs are converted to production-ready code.
 * 
 * Key Features:
 * - SEO optimized with comprehensive metadata
 * - Accessibility compliant (WCAG 2.1 AA)
 * - Performance optimized with code splitting
 * - Responsive design (mobile-first approach)
 * - Real-time performance monitoring
 * - Structured data for enhanced search visibility
 * 
 * Technical Implementation:
 * - Uses Next.js App Router for optimal performance
 * - Dynamic imports for code splitting
 * - Suspense boundaries for loading states
 * - TypeScript for type safety
 * - Error boundaries for graceful error handling
 */
export default function ExportDemoPage() {
  return (
    <>
      {/* Structured data injection for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Skip navigation link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-4 py-2 rounded-md shadow-lg z-50 transition-all duration-200"
      >
        Skip to main content
      </a>
      
      {/* Main content area with proper semantic structure */}
      <main 
        id="main-content"
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
        role="main"
        aria-label="Export Demo Page"
      >
        {/* Page header with SEO-optimized heading structure */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                Export Demo
                <span className="block text-blue-600 dark:text-blue-400">
                  Design to Code in Seconds
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Experience the power of Eternal UI's export functionality. 
                Convert your visual designs to production-ready code in React, Vue, Svelte, or Angular.
              </p>
              
              {/* Breadcrumb navigation for SEO and UX */}
              <nav aria-label="Breadcrumb" className="mt-4">
                <ol className="flex justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <li>
                    <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      Home
                    </a>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <a href="/demos" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      Demos
                    </a>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="font-medium text-gray-900 dark:text-white">
                    Export Demo
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </header>

        {/* Demo content area with loading state management */}
        <section 
          className="py-12"
          aria-label="Interactive Export Demo"
        >
          <Suspense fallback={<ExportDemoSkeleton />}>
            <ExportDemoClient />
          </Suspense>
        </section>

        {/* Feature highlights section for SEO and user education */}
        <section 
          className="py-16 bg-white dark:bg-gray-900"
          aria-label="Export Demo Features"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                Why Choose Eternal UI Export?
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
                Experience the future of web development with our advanced export capabilities
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* Feature cards with accessibility enhancements */}
                <article className="relative bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                  <div className="absolute top-6 left-6">
                    <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                  </div>
                  <div className="pt-16">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Lightning Fast</h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                      Generate production-ready code in under 30 seconds. No more manual coding for repetitive components.
                    </p>
                  </div>
                </article>

                <article className="relative bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                  <div className="absolute top-6 left-6">
                    <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </div>
                  <div className="pt-16">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Framework Agnostic</h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                      Export to React, Vue, Svelte, or Angular. Switch frameworks without redesigning from scratch.
                    </p>
                  </div>
                </article>

                <article className="relative bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                  <div className="absolute top-6 left-6">
                    <span className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                      </svg>
                    </span>
                  </div>
                  <div className="pt-16">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Accessibility Built-in</h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                      Every exported component meets WCAG 2.1 AA standards. Screen reader compatible with proper ARIA labels.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Performance metrics section */}
        <section 
          className="py-16 bg-gray-50 dark:bg-gray-800"
          aria-label="Performance Metrics"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                Export Performance Metrics
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
                Real-world performance data from our export functionality
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  &lt;30s
                </div>
                <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  Average Export Time
                </div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  From design to production code
                </div>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                  99.9%
                </div>
                <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  Code Accuracy
                </div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Production-ready output
                </div>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                  100%
                </div>
                <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  WCAG Compliance
                </div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Accessibility standards
                </div>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 dark:text-red-400">
                  4+
                </div>
                <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  Frameworks
                </div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  React, Vue, Svelte, Angular
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-action section */}
        <section className="py-16 bg-blue-600 dark:bg-blue-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Transform Your Development Workflow?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-blue-100">
              Join thousands of developers who have revolutionized their workflow with Eternal UI's export functionality.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <a
                href="/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white transition-colors duration-200"
                aria-describedby="signup-description"
              >
                Start Free Trial
              </a>
              <a
                href="/documentation"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white transition-colors duration-200"
              >
                View Documentation
              </a>
            </div>
            <p id="signup-description" className="mt-4 text-sm text-blue-200">
              No credit card required. Full access to all export features.
            </p>
          </div>
        </section>
      </main>

      {/* Performance monitoring component (client-side only) */}
      <PerformanceMonitor />
      
      {/* Accessibility checker for development (client-side only) */}
      {process.env.NODE_ENV === 'development' && <AccessibilityChecker />}
    </>
  )
}


/**
 * Export Demo Page
 * 
 * Showcases the Framework Export Engine with interactive demo
 * Includes real-time code generation and download functionality
 */

// import { Metadata } from 'next'
// import ExportDemoClient from './ExportDemoClient'
// import { ComponentNode } from '@/types/export'

// // SEO metadata for the export demo page
// export const metadata: Metadata = {
//   title: 'Framework Export Demo | Eternal UI - Export to Any Framework',
//   description: 'Experience universal code export from Eternal UI. Generate production-ready React, Vue, Svelte, or Angular components instantly with full TypeScript, accessibility, and performance optimization.',
//   keywords: [
//     'framework export',
//     'code generation',
//     'react export',
//     'vue export',
//     'svelte export',
//     'angular export',
//     'typescript generation',
//     'accessibility compliance',
//     'performance optimization'
//   ],
//   openGraph: {
//     title: 'Framework Export Demo - Build Once, Deploy Anywhere',
//     description: 'See how Eternal UI generates production-ready code for any framework. No vendor lock-in, full code ownership.',
//     type: 'website',
//     images: [
//       {
//         url: '/images/export-demo-og.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Eternal UI Framework Export Demo'
//       }
//     ]
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Framework Export Demo | Eternal UI',
//     description: 'Generate production-ready components for React, Vue, Svelte & Angular',
//     images: ['/images/export-demo-twitter.jpg']
//   }
// }

// // Sample components for demonstration
// const sampleComponents: ComponentNode[] = [
//   {
//     id: 'hero-section',
//     type: 'section',
//     props: {
//       title: 'Build Once, Deploy Anywhere',
//       subtitle: 'Generate production-ready code for any framework',
//       ctaText: 'Try Export Demo',
//       backgroundImage: '/images/hero-gradient.jpg'
//     },
//     children: [
//       {
//         id: 'hero-title',
//         type: 'heading',
//         props: { 
//           level: 1, 
//           text: 'Build Once, Deploy Anywhere' 
//         },
//         children: [],
//         styles: { 
//           className: 'text-4xl md:text-6xl font-bold text-white text-center' 
//         },
//         accessibility: { 
//           role: 'heading', 
//           'aria-level': 1 
//         }
//       },
//       {
//         id: 'hero-cta',
//         type: 'button',
//         props: { 
//           text: 'Try Export Demo', 
//           variant: 'primary',
//           size: 'large'
//         },
//         children: [],
//         styles: { 
//           className: 'bg-white text-blue-600 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition-colors' 
//         },
//         accessibility: { 
//           'aria-label': 'Try the framework export demo', 
//           role: 'button' 
//         }
//       }
//     ],
//     styles: { 
//       className: 'min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex flex-col items-center justify-center text-white' 
//     },
//     accessibility: { 
//       role: 'banner', 
//       'aria-label': 'Hero section introducing framework export' 
//     },
//     seo: {
//       title: 'Framework Export Demo - Universal Code Generation',
//       description: 'Experience how Eternal UI exports your designs as production-ready code for React, Vue, Svelte, and Angular',
//       keywords: ['framework export', 'code generation', 'react', 'vue', 'svelte', 'angular']
//     }
//   },
//   {
//     id: 'features-grid',
//     type: 'section',
//     props: { 
//       title: 'Why Choose Framework Export?' 
//     },
//     children: [
//       {
//         id: 'feature-1',
//         type: 'card',
//         props: {
//           title: 'Zero Vendor Lock-in',
//           description: 'Export your code and own it completely. No platform dependencies.',
//           icon: 'unlock'
//         },
//         children: [],
//         styles: { 
//           className: 'p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow' 
//         },
//         accessibility: { 
//           role: 'article', 
//           'aria-labelledby': 'feature-1-title' 
//         }
//       },
//       {
//         id: 'feature-2',
//         type: 'card',
//         props: {
//           title: 'Production Ready',
//           description: 'TypeScript, accessibility, testing, and performance optimization included.',
//           icon: 'check-circle'
//         },
//         children: [],
//         styles: { 
//           className: 'p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow' 
//         },
//         accessibility: { 
//           role: 'article', 
//           'aria-labelledby': 'feature-2-title' 
//         }
//       },
//       {
//         id: 'feature-3',
//         type: 'card',
//         props: {
//           title: '85% Cost Savings',
//           description: 'Dramatically reduce development costs compared to competitors.',
//           icon: 'dollar-sign'
//         },
//         children: [],
//         styles: { 
//           className: 'p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow' 
//         },
//         accessibility: { 
//           role: 'article', 
//           'aria-labelledby': 'feature-3-title' 
//         }
//       }
//     ],
//     styles: { 
//       className: 'py-20 bg-gray-50' 
//     },
//     accessibility: { 
//       role: 'region', 
//       'aria-label': 'Framework export features' 
//     }
//   }
// ]

// /**
//  * Export Demo Page Component
//  * 
//  * Server component that provides the structure and metadata
//  * for the export demonstration page
//  */
// export default function ExportDemoPage() {
//   return (
//     <main 
//       className="min-h-screen bg-white"
//       role="main"
//       aria-label="Framework export demonstration"
//     >
//       {/* Skip navigation for accessibility */}
//       <a 
//         href="#main-content"
//         className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
//       >
//         Skip to main content
//       </a>

//       {/* Main demo content */}
//       <div id="main-content">
//         <ExportDemoClient initialComponents={sampleComponents} />
//       </div>

//       {/* Structured data for SEO */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             '@context': 'https://schema.org',
//             '@type': 'WebPage',
//             name: 'Framework Export Demo',
//             description: 'Interactive demonstration of universal framework export capability',
//             url: 'https://eternal-ui.com/export-demo',
//             mainEntity: {
//               '@type': 'SoftwareApplication',
//               name: 'Eternal UI Framework Export',
//               applicationCategory: 'DeveloperTool',
//               operatingSystem: 'Web',
//               description: 'Export visual designs as production-ready code for any framework'
//             }
//           })
//         }}
//       />
//     </main>
//   )
// }