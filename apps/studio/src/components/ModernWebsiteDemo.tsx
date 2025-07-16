'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import FeatureCardsGrid from './ModernWebsiteComponents/FeatureCardsGrid'
import { EternalUILogo } from './Logo/eternal-ui-logo'
import ContactSection from './ModernWebsiteComponents/ContactSection'
import CTASection from './ModernWebsiteComponents/CTASection'
import FooterSection from './ModernWebsiteComponents/FooterSection'
import HeroSection from './ModernWebsiteComponents/HeroSection'
import NavigationHeader from './ModernWebsiteComponents/NavigationHeader'
import PricingTables from './ModernWebsiteComponents/PricingTables'
import TestimonialsSection from './ModernWebsiteComponents/TestimonialsSection'


const ModernWebsiteDemo: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [darkMode, setDarkMode] = useState(false)

  const sections = [
    { id: 'hero', name: 'Hero Section', icon: '🎯' },
    { id: 'navigation', name: 'Navigation', icon: '🧭' },
    { id: 'features', name: 'Features', icon: '⚡' },
    { id: 'pricing', name: 'Pricing', icon: '💰' },
    { id: 'testimonials', name: 'Testimonials', icon: '💬' },
    { id: 'contact', name: 'Contact', icon: '📧' },
    { id: 'cta', name: 'Call to Action', icon: '🚀' },
    { id: 'footer', name: 'Footer', icon: '📄' }
  ]

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'hero':
        return (
          <HeroSection
            variant="centered"
            title="Build Amazing Websites"
            subtitle="Create stunning, responsive websites with our modern component library"
            primaryCTA="Get Started Free"
            secondaryCTA="View Examples"
            showImage={true}
            backgroundVideo={false}
          />
        )
      case 'navigation':
        return (
          <NavigationHeader
            variant="simple"
            showLogo={true}
            transparent={false}
            sticky={true}
          />
        )
      case 'features':
        return (
          <FeatureCardsGrid
            variant="cards"
            columns={3}
            showIcons={true}
            animated={true}
          />
        )
      case 'pricing':
        return (
          <PricingTables
            variant="toggle"
            billing="monthly"
            showPopular={true}
          />
        )
      case 'testimonials':
        return (
          <TestimonialsSection
            variant="carousel"
            showImages={true}
            animated={true}
          />
        )
      case 'contact':
        return (
          <ContactSection
            variant="split"
            showMap={true}
            showSocial={true}
          />
        )
      case 'cta':
        return (
          <CTASection
            variant="gradient"
            title="Ready to Get Started?"
            subtitle="Join thousands of developers building amazing websites with Eternal UI"
            primaryCTA="Start Building"
            secondaryCTA="Learn More"
            showStats={true}
          />
        )
      case 'footer':
        return (
          <FooterSection
            variant="comprehensive"
            showNewsletter={true}
            showSocial={true}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} transition-colors duration-300`}>
      {/* Control Panel */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <EternalUILogo size="sm" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Modern Website Components
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Dark mode toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                <span className="text-lg">
                  {darkMode ? '☀️' : '🌙'}
                </span>
              </button>
              
              {/* Section selector */}
              <select
                value={activeSection}
                onChange={(e) => setActiveSection(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.icon} {section.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Section tabs */}
          <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeSection === section.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span>{section.icon}</span>
                <span>{section.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pt-32 bg-white dark:bg-gray-900 transition-colors duration-300">
        {renderActiveSection()}
      </div>

      {/* Component info panel */}
      <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-sm">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {sections.find(s => s.id === activeSection)?.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          This component is fully responsive, accessible, and supports dark mode. Built with React TypeScript and Tailwind CSS.
        </p>
        <div className="flex space-x-2">
          <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs rounded">
            React
          </span>
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
            TypeScript
          </span>
          <span className="px-2 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs rounded">
            Tailwind
          </span>
        </div>
      </div>
    </div>
  )
}

export default ModernWebsiteDemo;