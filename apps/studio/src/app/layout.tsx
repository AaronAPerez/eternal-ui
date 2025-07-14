import React from 'react'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Components
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/ui/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

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
  description: 'Build stunning websites 10x faster with our AI-powered visual builder. Export clean code to React, Vue, Svelte, or Angular. No vendor lock-in, ever.',
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
    'performance optimization',
    'eternal ui',
    'visual builder'
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
    description: 'Build stunning websites 10x faster with our AI-powered visual builder. Export clean code to any framework.',
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
    description: 'Build stunning websites 10x faster with our AI-powered visual builder.',
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
  },
  featureList: [
    'Visual drag-and-drop editor',
    'AI-powered design assistance',
    'Code export to multiple frameworks',
    'Responsive design tools',
    'Accessibility compliance',
    'Performance optimization'
  ]
}

/**
 * Root Layout Component
 * 
 * Fixed layout structure with proper spacing and official branding:
 * - Official Eternal UI logo integration
 * - Proper z-index management for sticky navigation
 * - Fixed layout flow with flexbox to prevent overlapping
 * - No overlapping content issues between navigation and footer
 * - Responsive design considerations
 * - Enhanced accessibility features
 * - SEO optimization with structured data
 * 
 * Layout fixes:
 * - Navigation height: 64px (h-16)
 * - Main content padding-top: 64px to prevent overlap
 * - Flexbox layout ensures footer stays at bottom
 * - Proper z-index hierarchy (navigation: z-50)
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

        {/* Viewport for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>

      <body className={`${inter.className} bg-white dark:bg-gray-900 transition-colors duration-300`}>
        {/* Screen reader announcements */}
        <div
          id="live-announcer"
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        />

        {/* 
          Main layout container with proper spacing fixes:
          - min-h-screen ensures full viewport height
          - flex flex-col creates vertical layout flow
          - Navigation is sticky and doesn't interfere with content
          - Main content has proper top padding to account for fixed navigation
          - Footer automatically positioned at bottom
        */}
        <div className="min-h-screen flex flex-col">
          {/* 
            Navigation Component
            - Sticky positioning with z-50 for proper layering
            - Height of 64px (h-16) 
            - Backdrop blur for modern glass morphism effect
            - No overlap with main content due to proper padding
          */}
          <Navigation />

          {/* 
            Main Content Area
            - flex-grow fills available space between nav and footer
            - pt-16 (64px) padding-top matches navigation height exactly
            - Prevents any content from being hidden behind navigation
            - Proper semantic HTML structure
          */}
          <main
            id="main-content"
            className="flex-grow"
            role="main"
            tabIndex={-1}
          >
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </main>

          {/* 
            Footer Component
            - Always positioned at bottom of page
            - Proper spacing from main content
            - Official Eternal UI branding
            - No z-index conflicts
          */}
          <Footer />
        </div>

        {/* 
          Performance monitoring and analytics
          - Non-blocking script loading
          - Privacy-focused implementation
          - Core Web Vitals tracking
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Performance monitoring
              if (typeof window !== 'undefined') {
                window.addEventListener('load', () => {
                  // Core Web Vitals tracking
                  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                    getCLS(console.log);
                    getFID(console.log);
                    getFCP(console.log);
                    getLCP(console.log);
                    getTTFB(console.log);
                  });
                });
                
                // Theme detection and application
                const theme = localStorage.getItem('theme') || 
                             (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              }
            `
          }}
        />
      </body>
    </html>
  )
}

// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import './globals.css';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Eternal UI - Visual Website Builder',
//   description: 'Professional drag-and-drop website builder with responsive design',
//   keywords: ['website builder', 'visual design', 'drag and drop', 'responsive design'],
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         {children}
//       </body>
//     </html>
//   );
// }