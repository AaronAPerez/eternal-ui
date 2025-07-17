'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  ArrowUpRight,
  ArrowUp,
  Heart,
  ExternalLink
} from 'lucide-react'

// Import the official Eternal UI Logo
import { EternalUILogo } from '@/components/Logo/eternal-ui-logo'

// Types
interface FooterLink {
  name: string
  href: string
  external?: boolean
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  name: string
  href: string
  icon: React.ElementType
  label: string
}

/**
 * Scroll to Top Button Component
 * 
 * Accessible button to scroll back to top of page
 */
const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false)

  // Show button when user scrolls down
  React.useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="Scroll to top of page"
    >
      <ArrowUp size={20} />
    </button>
  )
}

// Footer sections data
const footerSections: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Demos', href: '/demos' },
      { name: 'Templates', href: '/templates' },
      { name: 'Changelog', href: '/changelog' }
    ]
  },
  {
    title: 'Developers',
    links: [
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Export Demo', href: '/export-demo' },
      { name: 'GitHub', href: 'https://github.com/eternal-ui', external: true },
      { name: 'Community', href: '/community' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
      { name: 'Press Kit', href: '/press' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
      { name: 'Security', href: '/security' }
    ]
  }
]

// Social media links
const socialLinks: SocialLink[] = [
  { 
    name: 'GitHub', 
    href: 'https://github.com/eternal-ui', 
    icon: Github,
    label: 'View our GitHub repository'
  },
  { 
    name: 'Twitter', 
    href: 'https://twitter.com/EternalUI', 
    icon: Twitter,
    label: 'Follow us on Twitter'
  },
  { 
    name: 'LinkedIn', 
    href: 'https://linkedin.com/company/eternal-ui', 
    icon: Linkedin,
    label: 'Connect with us on LinkedIn'
  },
  { 
    name: 'Email', 
    href: 'mailto:hello@eternal-ui.com', 
    icon: Mail,
    label: 'Send us an email'
  }
]

/**
 * Enhanced Footer Component
 * 
 * Professional footer with official Eternal UI branding and fixed layout:
 * - Official Eternal UI logo integration
 * - Organized navigation links
 * - Social media links with accessibility
 * - Newsletter subscription functionality
 * - WCAG 2.1 AA compliance
 * - SEO-optimized structure with structured data
 * - Responsive design (mobile-first)
 * - Performance optimized
 * - No layout overlap issues
 * 
 * Layout fixes:
 * - Proper spacing from main content
 * - Responsive grid layout
 * - Consistent padding and margins
 * - No z-index conflicts
 */
export function Footer() {
  // Newsletter subscription state
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Newsletter subscription handler
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return

    setIsSubscribing(true)
    
    try {
      // Newsletter subscription API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      setSubscriptionStatus('success')
      setEmail('')
    } catch (error) {
      setSubscriptionStatus('error')
    } finally {
      setIsSubscribing(false)
    }

    // Reset status after 3 seconds
    setTimeout(() => setSubscriptionStatus('idle'), 3000)
  }

  return (
    <>
      {/* Main Footer */}
      <footer 
        className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 transition-colors duration-300"
        role="contentinfo"
        aria-label="Site footer"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12">
            
            {/* Brand Section with Official Logo */}
            <div className="lg:col-span-2 space-y-6">
              {/* Official Eternal UI Logo */}
              <Link 
                href="/" 
                className="inline-block group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black rounded-lg"
                aria-label="Eternal UI - Home"
              >
                <EternalUILogo 
                  size="md" 
                  variant="gradient"
                  showText={true}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
                Build stunning websites 10x faster with our AI-powered visual builder. 
                Export clean code to any framework. No vendor lock-in, ever.
              </p>
              
              {/* Social Links */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Follow Us
                </h3>
                <div className="flex items-center space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target={social.name !== 'Email' ? '_blank' : undefined}
                      rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                      className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Stay Updated
                </h3>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <label htmlFor="footer-email" className="sr-only">
                      Email address for newsletter
                    </label>
                    <input
                      id="footer-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      disabled={isSubscribing}
                    />
                    <button
                      type="submit"
                      disabled={isSubscribing || !email}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black disabled:cursor-not-allowed"
                    >
                      {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </div>
                  
                  {/* Subscription Status Messages */}
                  {subscriptionStatus === 'success' && (
                    <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
                      <Heart size={14} className="text-green-500" />
                      Successfully subscribed to our newsletter!
                    </p>
                  )}
                  {subscriptionStatus === 'error' && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      ✗ Failed to subscribe. Please try again.
                    </p>
                  )}
                </form>
              </div>
            </div>
            
            {/* Navigation Sections */}
            <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerSections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noopener noreferrer' : undefined}
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 text-sm flex items-center group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black rounded"
                        >
                          <span>{link.name}</span>
                          {link.external && (
                            <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span>© {new Date().getFullYear()} Eternal UI. All rights reserved.</span>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline flex items-center">
                  Made with <Heart size={14} className="mx-1 text-red-500" aria-hidden="true" /> for creators worldwide
                </span>
              </div>
              
              {/* Status & Links */}
              <div className="flex items-center space-x-6 text-sm">
                {/* Status Indicator */}
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true"></div>
                  <span className="text-gray-600 dark:text-gray-400">All systems operational</span>
                </div>
                
                {/* Quick Links */}
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/status" 
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black rounded"
                  >
                    Status
                  </Link>
                  <Link 
                    href="/support" 
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black rounded"
                  >
                    Support
                  </Link>
                  <Link 
                    href="/sitemap" 
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black rounded"
                  >
                    Sitemap
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Eternal UI',
            url: 'https://eternal-ui.com',
            logo: 'https://eternal-ui.com/logo.png',
            description: 'Advanced visual website builder with AI-powered design tools',
            sameAs: [
              'https://twitter.com/EternalUI',
              'https://github.com/eternal-ui',
              'https://linkedin.com/company/eternal-ui'
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Service',
              email: 'hello@eternal-ui.com'
            },
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'US'
            },
            foundingDate: '2024',
            numberOfEmployees: '10-50',
            industry: 'Software Development'
          })
        }}
      />
    </>
  )
}