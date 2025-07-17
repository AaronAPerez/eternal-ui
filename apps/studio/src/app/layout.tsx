import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';


const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Optimize font loading
  preload: true
});

// SEO-optimized metadata
export const metadata: Metadata = {
  title: {
    default: 'Eternal UI - Visual Website Builder',
    template: '%s | Eternal UI'
  },
  description: 'Professional drag-and-drop website builder with responsive design, advanced grid system, and AI-powered features.',
  keywords: [
    'website builder', 'visual design', 'drag and drop', 'responsive design',
    'ui builder', 'landing page builder', 'web design tool'
  ],
  authors: [{ name: 'Eternal UI Team' }],
  creator: 'Eternal UI',
  publisher: 'Eternal UI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://eternal-ui.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://eternal-ui.com',
    siteName: 'Eternal UI',
    title: 'Eternal UI - Visual Website Builder',
    description: 'Professional drag-and-drop website builder with responsive design',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Eternal UI Visual Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eternal UI - Visual Website Builder',
    description: 'Professional drag-and-drop website builder',
    images: ['/twitter-image.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Performance optimizations */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#6366f1" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Eternal UI",
              "description": "Professional visual website builder",
              "url": "https://eternal-ui.com",
              "applicationCategory": "DesignApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
 
      <body className={inter.className}>
        <noscript>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            zIndex: 9999
          }}>
            <h1>JavaScript Required</h1>
            <p>This application requires JavaScript to function properly.</p>
          </div>
        </noscript>
        
        {/* Main content with proper accessibility landmarks */}
        <div className="min-h-screen flex flex-col">
          <main 
            id="main-content"
            className="flex-grow"
            role="main"
            tabIndex={-1}
          >
            {children}
          </main>
        </div>

        {/* Performance monitoring script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Performance monitoring
              if (typeof window !== 'undefined') {
                window.addEventListener('load', () => {
                  // Theme detection and application
                  const theme = localStorage.getItem('theme') || 
                               (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                });
              }
            `
          }}
        />
      </body>
    </html>
  );
}