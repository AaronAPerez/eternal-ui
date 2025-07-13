import { Check } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '..'
import EmailTemplate from '../../../lib/email/EmailTemplate'
import DocumentationSidebar from '../../../lib/navigation/DocumentationSidebar'
import NavigationHeader from '../../../lib/navigation/NavigationHeader'
import Footer from '../../layout/Footer'
import LoadingScreen from '../../layout/LoadingScreen'
import PlaygroundInterface from '../../PlaygroundInterface'
import HeroSection from '../../sections/HeroSection'
import { Button } from '../Button/Button'
import ErrorPage from '../ErrorPage'
import { EternalUILogo } from './eternal-ui-logo'

/**
 * 🎯 IMPLEMENTATION SHOWCASE
 * 
 * Interactive demonstration of all logo implementations
 */
export default function LogoImplementationGuide() {
  const [activeDemo, setActiveDemo] = useState('navigation')
  
  const demos = [
    { id: 'navigation', name: 'Navigation Header', component: NavigationHeader },
    { id: 'hero', name: 'Hero Section', component: HeroSection },
    { id: 'docs', name: 'Documentation Sidebar', component: DocumentationSidebar },
    { id: 'loading', name: 'Loading Screen', component: LoadingScreen },
    { id: 'error', name: 'Error Page', component: ErrorPage },
    { id: 'footer', name: 'Footer', component: Footer },
    { id: 'email', name: 'Email Template', component: EmailTemplate },
    { id: 'playground', name: 'Playground', component: PlaygroundInterface }
  ]
  
  const ActiveComponent = demos.find(demo => demo.id === activeDemo)?.component || NavigationHeader
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      
      {/* Control Panel */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Logo Implementation Guide
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                See how to implement the Eternal UI logo across your entire website
              </p>
            </div>
            <EternalUILogo size="md" />
          </div>
          
          {/* Demo Selector */}
          <div className="flex flex-wrap gap-2">
            {demos.map(demo => (
              <Button
                key={demo.id}
                variant={activeDemo === demo.id ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveDemo(demo.id)}
              >
                {demo.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Live Demo */}
      <div className="relative">
        <div className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
            Current Demo:
          </div>
          <div className="text-sm text-blue-600 dark:text-blue-400">
            {demos.find(demo => demo.id === activeDemo)?.name}
          </div>
        </div>
        
        <ActiveComponent />
      </div>
      
      {/* Implementation Code */}
      <div className="bg-gray-900 text-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-white">
            Implementation Code
          </h2>
          
          <div className="bg-gray-800 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm">
              <code>
               {`// ${demos.find(demo => demo.id === activeDemo)?.name} Implementation

${activeDemo === 'navigation' ? `// Navigation Header
<EternalUILogo 
  size="sm" 
  showText={true}
  onClick={() => router.push('/')}
  className="hover:scale-105 transition-transform"
/>` : ''}

${activeDemo === 'hero' ? `// Hero Section
<EternalUILogo 
  size="xl" 
  variant="gradient"
  showText={true}
  className="animate-float"
/>` : ''}

${activeDemo === 'docs' ? `// Documentation Sidebar
<EternalUILogo 
  size="sm" 
  showText={true}
  onClick={() => router.push('/')}
/>` : ''}

${activeDemo === 'loading' ? `// Loading Screen
<EternalUILogo 
  size="lg" 
  variant="gradient"
  showText={false}
  className="animate-pulse"
/>` : ''}

${activeDemo === 'error' ? `// Error Page
<EternalUILogo 
  size="lg" 
  variant="mono"
  showText={true}
  className="opacity-60"
/>` : ''}

${activeDemo === 'footer' ? `// Footer
<EternalUILogo 
  size="md" 
  variant="mono"
  className="text-white"
/>` : ''}

${activeDemo === 'email' ? `// Email Template
<EternalUILogo 
  size="md" 
  variant="mono"
  className="text-white mx-auto"
/>` : ''}

${activeDemo === 'playground' ? `// Playground Interface
<EternalUILogo size="sm" />` : ''}`}
              </code>
            </pre>
          </div>
        </div>
      </div>
      
      {/* Implementation Checklist */}
      <div className="bg-white dark:bg-gray-900 p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Complete Implementation Checklist
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Primary Locations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  Primary Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Navigation header (size: sm)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Homepage hero (size: xl)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Footer branding (size: md)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Documentation sidebar (size: sm)
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Secondary Locations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  Secondary Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Loading screens (size: lg)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Error pages (size: lg)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Email templates (size: md)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Mobile menu (size: md)
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Technical Implementation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  Technical Assets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    Favicon (16x16, 32x32)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    Apple touch icons
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    Social media cards
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    PWA manifest icons
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}