import React from 'react'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Components
import { NavigationProvider } from '@/providers/NavigationProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { AnalyticsProvider } from '@/providers/AnalyticsProvider'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/ui/Footer'
import { SkipNavigation } from '@/components/ui/SkipNavigation'

// Font optimization
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Global metadata configuration for SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://eternal-ui.com'),
  title: {
    default: 'Eternal UI - Advanced Visual Website Builder | AI-Powered Design Tools',
    template: '%s | Eternal UI'
  },
  description: 'Create stunning websites with our AI-powered visual builder. Export clean code to React, Vue, Svelte, or Angular. 85% cheaper than Framer with superior performance.',
  keywords: [
    'website builder',
    'visual editor',
    'no code',
    'react',
    'vue',
    'svelte',
    'angular',
    'ai design',
    'drag and drop',
    'web development',
    'responsive design',
    'accessibility',
    'performance optimization'
  ],
  authors: [{ name: 'Eternal UI Team', url: 'https://eternal-ui.com' }],
  creator: 'Eternal UI',
  publisher: 'Eternal UI',
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
    title: 'Eternal UI - Advanced Visual Website Builder',
    description: 'Create stunning websites with our AI-powered visual builder. Export clean code to any framework.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Eternal UI - Visual Website Builder Interface',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@EternalUI',
    creator: '@EternalUI',
    title: 'Eternal UI - Advanced Visual Website Builder',
    description: 'Create stunning websites with our AI-powered visual builder.',
    images: ['/twitter-card.jpg'],
  },
  alternates: {
    canonical: 'https://eternal-ui.com',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'technology',
}

// Structured data for better SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Eternal UI',
  description: 'Advanced visual website builder with AI-powered design tools',
  url: 'https://eternal-ui.com',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free tier available'
  },
  creator: {
    '@type': 'Organization',
    name: 'Eternal UI',
    url: 'https://eternal-ui.com'
  }
}

/**
 * Root Layout Component
 * 
 * Provides the base layout structure for the entire application including:
 * - Global navigation system
 * - Theme and accessibility providers
 * - Error boundaries for graceful failure handling
 * - Performance monitoring
 * - SEO optimization
 * 
 * This layout follows accessibility best practices and ensures consistent
 * navigation experience across all pages.
 * 
 * @param children - Page content to render
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html 
      lang="en" 
      className={inter.variable}
      suppressHydrationWarning
    >
      <head>
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        
        {/* Performance hints */}
        <link rel="dns-prefetch" href="//cdn.eternal-ui.com" />
        <link rel="preload" href="/hero-image.webp" as="image" />
      </head>
      
      <body className="font-sans antialiased bg-white text-gray-900 dark:bg-black dark:text-white">
        {/* Skip navigation for accessibility */}
        <SkipNavigation />
        
        {/* Global providers for app functionality */}
        <ThemeProvider>
          <AnalyticsProvider>
            <NavigationProvider>
              <ErrorBoundary>
                {/* Screen reader announcements */}
                <div 
                  id="live-announcer"
                  className="sr-only"
                  aria-live="polite"
                  aria-atomic="true"
                />
                
                {/* Main application structure */}
                <div className="min-h-screen flex flex-col">
                  {/* Global navigation */}
                  <Navigation />
                  
                  {/* Main content area */}
                  <main 
                    id="main-content"
                    className="flex-1"
                    role="main"
                    tabIndex={-1}
                  >
                    <ErrorBoundary>
                      {children}
                    </ErrorBoundary>
                  </main>
                  
                  {/* Global footer */}
                  <Footer />
                </div>
              </ErrorBoundary>
            </NavigationProvider>
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}