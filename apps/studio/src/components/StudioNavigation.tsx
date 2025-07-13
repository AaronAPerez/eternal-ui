/**
 * Studio Navigation Component
 * Provides navigation between all studio features
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Palette, 
  Download, 
  Calculator, 
  Rocket,
  Menu,
  X,
  Zap,
  Code,
  Layers
} from 'lucide-react'

const navigationItems = [
  {
    name: 'Visual Builder',
    href: '/builder',
    icon: Palette,
    description: 'Drag & drop visual website builder'
  },
  {
    name: 'AI Studio Demo',
    href: '/studio-demo',
    icon: Zap,
    description: 'AI-powered layout suggestions'
  },
  {
    name: 'Export Demo',
    href: '/export-demo',
    icon: Download,
    description: 'Framework export demonstration'
  },
  {
    name: 'ROI Calculator',
    href: '/roi-calculator',
    icon: Calculator,
    description: 'Calculate cost savings vs competitors'
  },
  {
    name: 'Code Generator',
    href: '/code-generator',
    icon: Code,
    description: 'Generate production-ready code'
  }
]

export function StudioNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Eternal UI Studio</h1>
              <p className="text-sm text-gray-600">Visual Website Builder</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Action Button */}
          <Link
            href="/export-demo"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Code</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Mobile Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-1.5 rounded-lg">
                <Rocket className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-gray-900">Eternal UI</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mt-4 pb-4 border-t border-gray-200 pt-4">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  href="/export-demo"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Code</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Feature Showcase Banner */}
      {pathname === '/' && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Visual Builder That Destroys All Competition
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Build with AI-powered layouts, export to any framework, and save 85% vs Framer
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                <Zap className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">AI-Powered Layouts</h3>
                <p className="text-blue-100 text-sm">Smart layout suggestions with 95% confidence</p>
              </div>
              
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                <Code className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Framework Export</h3>
                <p className="text-blue-100 text-sm">Export to React, Vue, Svelte, Angular</p>
              </div>
              
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                <Calculator className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">85% Cost Savings</h3>
                <p className="text-blue-100 text-sm">Massive savings vs Framer & Webflow</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Link
                href="/builder"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <Palette className="w-5 h-5" />
                <span>Try Visual Builder</span>
              </Link>
              
              <Link
                href="/export-demo"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>See Export Demo</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}