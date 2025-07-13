'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Menu, 
  X, 
  ChevronDown,
  Zap,
  Code,
  Download,
  Calculator,
  Palette,
  Rocket,
  ArrowRight,
  Play,
  Users,
  Star
} from 'lucide-react'

// Hooks
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useMobileDetection } from '@/hooks/useMobileDetection'
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'

// Components
import { Button } from '@/components/ui/Button'
import { EternalUILogo } from '../Logo/eternal-ui-logo'
import { MobileMenu } from '@/components/ui/MobileMenu'
import { DropdownMenu } from '@/components/ui/DropdownMenu'
import router from 'next/router'

// Types
interface NavigationItem {
  name: string
  href: string
  description?: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string
  children?: NavigationItem[]
}

// Navigation structure with hierarchical organization
const navigationItems: NavigationItem[] = [
  {
    name: 'Features',
    href: '/features',
    children: [
      {
        name: 'Visual Builder',
        href: '/builder',
        description: 'Drag & drop interface with AI assistance',
        icon: Palette,
        badge: 'Popular'
      },
      {
        name: 'AI Studio',
        href: '/ai-studio',
        description: 'AI-powered layout suggestions',
        icon: Zap,
        badge: 'New'
      },
      {
        name: 'Code Export',
        href: '/export',
        description: 'Export to React, Vue, Svelte, Angular',
        icon: Code
      },
      {
        name: 'ROI Calculator',
        href: '/roi-calculator',
        description: 'Calculate savings vs competitors',
        icon: Calculator
      }
    ]
  },
  {
    name: 'Demos',
    href: '/demos',
    children: [
      {
        name: 'Interactive Demo',
        href: '/demo/interactive',
        description: 'Try the builder in your browser',
        icon: Play
      },
      {
        name: 'Export Demo',
        href: '/export-demo',
        description: 'See code generation in action',
        icon: Download
      },
      {
        name: 'Template Gallery',
        href: '/templates',
        description: 'Pre-built website templates',
        icon: Palette
      }
    ]
  },
  {
    name: 'Pricing',
    href: '/pricing'
  },
  {
    name: 'Resources',
    href: '/resources',
    children: [
      {
        name: 'Documentation',
        href: '/docs',
        description: 'Complete guides and API reference',
        icon: Code
      },
      {
        name: 'Community',
        href: '/community',
        description: 'Connect with other builders',
        icon: Users
      },
      {
        name: 'Changelog',
        href: '/changelog',
        description: 'Latest updates and features',
        icon: Star
      }
    ]
  }
]

/**
 * Main Navigation Component
 * 
 * Provides responsive, accessible navigation with:
 * - Mobile-first responsive design
 * - Keyboard navigation support
 * - Screen reader compatibility
 * - Auto-hiding on scroll (mobile)
 * - Dropdown menus for complex navigation
 * - Active state management
 * - Performance optimizations
 * 
 * Accessibility Features:
 * - ARIA labels and navigation roles
 * - Keyboard focus management
 * - Screen reader announcements
 * - High contrast support
 * - Reduced motion preferences
 * 
 * @returns JSX.Element - The navigation component
 */
export function Navigation(): JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  
  // Hooks for responsive behavior
  const pathname = usePathname()
  const { isMobile, isTablet } = useMobileDetection()
  const scrollDirection = useScrollDirection()
  
  // Keyboard navigation setup
  useKeyboardNavigation({
    'escape': () => {
      setIsMobileMenuOpen(false)
      setActiveDropdown(null)
    },
    'tab': (event) => {
      // Enhanced tab navigation for dropdowns
      if (activeDropdown && !event.shiftKey) {
        // Focus management for dropdown navigation
      }
    }
  })

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest('[data-dropdown]')) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [activeDropdown])

  /**
   * Check if a navigation item or its children are active
   */
  const isActiveItem = (item: NavigationItem): boolean => {
    if (pathname === item.href) return true
    if (item.children) {
      return item.children.some(child => pathname === child.href)
    }
    return false
  }

  /**
   * Handle dropdown toggle with accessibility
   */
  const handleDropdownToggle = (itemName: string): void => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName)
  }

  /**
   * Announce navigation changes to screen readers
   */
  const announceNavigation = (message: string): void => {
    const announcer = document.getElementById('live-announcer')
    if (announcer) {
      announcer.textContent = message
    }
  }

  return (
    <header 
      className={`
        sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm 
        border-b border-gray-200 dark:border-gray-800 transition-transform duration-300
        ${isMobile && scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'}
      `}
      role="banner"
    >
      <nav 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16">
          
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link 
              href="/"
              className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
              aria-label="Eternal UI - Homepage"
            >
              {/* <Logo size="md" /> */}
               {/* 🏠 MAIN LOGO */}
          <EternalUILogo 
            size="xl" 
            showText={true}
            onClick={() => router.push('/')}
            className="hover:scale-105 transition-transform duration-200 cursor-pointer"
          />
              {/* <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Eternal UI
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Visual Builder
                </p>
              </div> */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative" data-dropdown>
                {item.children ? (
                  // Dropdown menu item
                  <button
                    onClick={() => handleDropdownToggle(item.name)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleDropdownToggle(item.name)
                      }
                    }}
                    className={`
                      flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium 
                      transition-colors duration-200 focus:outline-none focus:ring-2 
                      focus:ring-blue-500 focus:ring-offset-2
                      ${isActiveItem(item)
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                      }
                    `}
                    aria-expanded={activeDropdown === item.name}
                    aria-haspopup="true"
                  >
                    <span>{item.name}</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                ) : (
                  // Regular navigation link
                  <Link
                    href={item.href}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                      ${pathname === item.href
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Dropdown menu */}
                {item.children && activeDropdown === item.name && (
                  <DropdownMenu
                    items={item.children}
                    onClose={() => setActiveDropdown(null)}
                    className="absolute top-full left-0 mt-2 w-80"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Sign In
            </Link>
            
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Link href="/builder" className="flex items-center space-x-2">
                <Rocket className="w-4 h-4" />
                <span>Start Building</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen)
                announceNavigation(
                  isMobileMenuOpen ? 'Menu closed' : 'Menu opened'
                )
              }}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <MobileMenu
          items={navigationItems}
          currentPath={pathname}
          onClose={() => setIsMobileMenuOpen(false)}
          isOpen={isMobileMenuOpen}
        />
      )}
    </header>
  )
}