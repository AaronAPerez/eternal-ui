
import React from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Code, Palette, Globe, Star, CheckCircle, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Eternal UI
              </span>
              <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full font-medium">
                Pro
              </span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/components" className="text-gray-600 hover:text-gray-900 transition-colors">
                Components
              </Link>
              <Link href="/builder" className="text-gray-600 hover:text-gray-900 transition-colors">
                Builder
              </Link>
              <Link href="/ai-demo" className="text-gray-600 hover:text-gray-900 transition-colors">
                AI Demo
              </Link>
              <Link href="/marketplace" className="text-gray-600 hover:text-gray-900 transition-colors">
                Marketplace
              </Link>
            </nav>
            
            <Link href="/builder">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all">
                Start Building
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              <span>120+ Premium Components</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            The Ultimate
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Visual Builder
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create stunning, production-ready websites with our AI-powered visual builder. 
            Complete with testing suite, Storybook integration, and enterprise features.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/builder">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all">
                Start Building Free
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
            </Link>
            <Link href="/components">
              <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-medium text-lg transition-all">
                Explore Components
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">120+</div>
              <div className="text-gray-600">Components</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">AAA</div>
              <div className="text-gray-600">Accessibility</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">Performance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Build Amazing Websites
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional tools that make development 10x faster and more enjoyable
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition-colors">
                <Code className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">120+ Components</h3>
              <p className="text-gray-600">Production-ready components with TypeScript, tests, and complete documentation.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-600">Generate layouts, optimize performance, and ensure accessibility with advanced AI.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Palette className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Visual Builder</h3>
              <p className="text-gray-600">Drag-and-drop interface with real-time preview and multi-device testing.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <Globe className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Export Anywhere</h3>
              <p className="text-gray-600">Export to React, Vue, Angular, or HTML. Deploy to any platform instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Professional Development Tools
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Complete Testing Suite</h3>
                    <p className="text-gray-600">Unit tests, accessibility audits, and performance monitoring built-in.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Storybook Integration</h3>
                    <p className="text-gray-600">Auto-generated stories with interactive controls and documentation.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Theme Customization</h3>
                    <p className="text-gray-600">Design token management with dark mode and custom theme creation.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Component Marketplace</h3>
                    <p className="text-gray-600">Browse, download, and publish components with the community.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Join the Community</h3>
              <p className="text-gray-600 mb-6">
                Connect with thousands of developers and designers building amazing websites.
              </p>
              <Link href="/marketplace">
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Explore Marketplace
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build the Future?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers and designers creating amazing websites with Eternal UI. 
            Start building your next project today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors">
                Start Your First Project
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
            </Link>
            <Link href="/components">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-colors">
                View Components
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Eternal UI</span>
              </div>
              <p className="text-gray-400">
                The ultimate visual website builder with AI-powered features and enterprise capabilities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/components">Components</Link></li>
                <li><Link href="/builder">Visual Builder</Link></li>
                <li><Link href="/ai-demo">AI Features</Link></li>
                <li><Link href="/marketplace">Marketplace</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Tutorials</a></li>
                <li><a href="#">Examples</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#">About</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Eternal UI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// src/app/page.tsx 
/**
 * 🏠 HOMEPAGE - CLIENT COMPONENT FIX
 * 
 * Fixed: Added 'use client' since it uses interactive components
 */
// 'use client'

// import React from 'react'
// import Link from 'next/link'
// import { Button } from '@/components/ui/Button'
// import { ArrowRight, Code, Sparkles, Zap } from 'lucide-react'
// import { Navigation } from '../components/layout/Navigation'

// export default function HomePage() {
//   return (
//   <>
//     <Navigation/>
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900">
      
//       {/* Hero Section */}
//       <section className="relative py-24 px-4 overflow-hidden">
//         <div className="relative max-w-6xl mx-auto text-center space-y-8">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
//             <Sparkles className="w-4 h-4" />
//             Revolutionary Component Library
//           </div>
          
//           <h1 className="text-6xl md:text-7xl font-bold leading-tight">
//             <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//               Build Beautiful
//             </span>
//             <br />
//             <span className="text-gray-900 dark:text-white">
//               User Interfaces
//             </span>
//           </h1>
          
//           <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             Professional React components with TypeScript support, accessibility built-in, 
//             and animations that bring your ideas to life.
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-6 justify-center">
//             <Link href="/docs">
//               <Button variant="primary" size="lg" icon={<Zap className="w-5 h-5" />}>
//                 Explore Components
//               </Button>
//             </Link>
//             <Link href="/docs/installation">
//               <Button variant="outline" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right">
//                 Get Started
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//     </>
//   )
// }