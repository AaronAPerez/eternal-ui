'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Menu, 
  X,
  ArrowRight,
  Download,
  Moon,
  Sun,
  Sparkles,
  ChevronDown,
  Grid,
  Palette,
  Square
} from 'lucide-react'

// Import the official Eternal UI Logo
import { EternalUILogo } from '@/components/Logo/eternal-ui-logo'

// Types
interface NavigationItem {
  name: string
  href: string
  description?: string
}

interface DropdownMenuProps {
  items: NavigationItem[]
  isOpen: boolean
  onClose: () => void
  trigger: React.ReactNode
  label: string
}

/**
 * Theme Hook for Dark/Light Mode Toggle
 */
function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    
    // Apply theme to document
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return { theme, toggleTheme, mounted }
}

/**
 * Theme Toggle Button Component
 */
function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()

  if (!mounted) {
    return (
      <div className="p-2 rounded-lg w-9 h-9 bg-gray-100 dark:bg-gray-800 animate-pulse" />
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
      ) : (
        <Sun className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
      )}
    </button>
  )
}

/**
 * Dropdown Menu Component
 * 
 * Accessible dropdown menu with proper keyboard navigation
 * and screen reader support
 */
const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  isOpen,
  onClose,
  trigger,
  label
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [focusIndex, setFocusIndex] = useState(-1)

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          setFocusIndex(prev => (prev + 1) % items.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setFocusIndex(prev => prev <= 0 ? items.length - 1 : prev - 1)
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (focusIndex >= 0) {
            const link = dropdownRef.current?.querySelector(`[data-index="${focusIndex}"]`) as HTMLAnchorElement
            link?.click()
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, focusIndex, items.length, onClose])

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 py-2 animate-slide-down"
      role="menu"
      aria-label={label}
    >
      {items.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          data-index={index}
          className={`block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 ${
            focusIndex === index ? 'bg-gray-100 dark:bg-gray-700' : ''
          }`}
          role="menuitem"
          onClick={onClose}
        >
          <div className="font-medium">{item.name}</div>
          {item.description && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {item.description}
            </div>
          )}
        </Link>
      ))}
    </div>
  )
}

// Navigation items with enhanced structure
const navigationItems: NavigationItem[] = [
  { 
    name: 'Features', 
    href: '/features',
    description: 'Discover all our powerful features'
  },
 {
  name: 'Builder',
  href: '/builder',
  children: [
    {
      name: 'Visual Builder',
      href: '/builder?mode=visual',
      description: 'Simple drag & drop interface',
      icon: Palette
    },
    {
      name: 'Advanced Builder',
      href: '/builder?mode=advanced',
      description: 'Professional component library',
      icon: Grid,
      badge: 'Pro'
    },
    {
      name: 'Components',
      href: '/builder?mode=components',
      description: 'Browse & customize components',
      icon: Square
    }
  ]
},
  // { 
  //   name: 'Demos', 
  //   href: '/demos',
  //   description: 'See our builder in action'
  // },
  { 
    name: 'Pricing', 
    href: '/pricing',
    description: 'Simple, transparent pricing'
  },
  { 
    name: 'Export Demo', 
    href: '/export-demo',
    description: 'Try our code export feature'
  },
  { 
    name: 'ROI Calculator', 
    href: '/roi-calculator',
    description: 'Calculate your savings'
  }
]

/**
 * Enhanced Navigation Component
 * 
 * Fixed navigation with proper spacing and official branding:
 * - Official Eternal UI logo integration
 * - Proper z-index management (z-50)
 * - Fixed layout spacing issues
 * - Enhanced accessibility (WCAG 2.1 AA)
 * - Responsive design with mobile menu
 * - Theme toggle functionality
 * - Smooth animations and transitions
 * 
 * Layout fixes:
 * - Uses sticky positioning with backdrop blur
 * - Proper height management (h-16)
 * - No content overlap issues
 * - Mobile-first responsive design
 */
export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  // Handle scroll effect for backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null)
    }

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [activeDropdown])

  /**
   * Toggle dropdown menu
   */
  const toggleDropdown = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName)
  }

  /**
   * Check if link is active
   */
  const isActiveLink = (href: string): boolean => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Skip navigation for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-[100] transition-all"
      >
        Skip to main content
      </a>

      <header 
        className={`
          sticky top-0 z-50 transition-all duration-300
          ${isScrolled 
            ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-800' 
            : 'bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-800/50'
          }
        `}
        role="banner"
      >
        <nav 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between h-16">
            
            {/* Enhanced Logo with Official Eternal UI Logo */}
            <Link 
              href="/" 
              className="flex items-center group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-lg"
              aria-label="Eternal UI - Home"
            >
              <EternalUILogo 
                size="lg" 
                variant={pathname === '/' ? 'gradient' : 'default'}
                showText={true}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation with Enhanced Styling */}
            <div className="hidden lg:flex items-center space-x-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
                    ${isActiveLink(item.href)
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300" />
                  
                  {/* Active indicator */}
                  {isActiveLink(item.href) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse" />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Sign In Link */}
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Sign In
              </Link>
              
              {/* Enhanced CTA Button */}
              <Link
                href="/builder"
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                <EternalUILogo size="xs" variant="mono" showText={false} className="text-white" />
                <span className="relative z-10">Start Building</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center space-x-2">
              <ThemeToggle />
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 transition-transform duration-300 rotate-90" />
                ) : (
                  <Menu className="w-6 h-6 transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Enhanced Mobile Navigation */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm lg:hidden z-40"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            
            {/* Mobile Menu Panel */}
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-lg z-50 animate-slide-down">
              <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
                
                {/* Mobile Navigation Items */}
                {navigationItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      group block px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 animate-fade-in
                      ${isActiveLink(item.href)
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                      }
                    `}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {item.description}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </Link>
                ))}
                
                {/* Mobile Actions */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-4 animate-fade-in">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2 transition-colors duration-300"
                  >
                    Sign In
                  </Link>
                  
                  <Link
                    href="/builder"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 text-white px-4 py-3 rounded-lg text-center font-semibold transition-all duration-300 hover:scale-105 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-center space-x-2 relative z-10">
                      <EternalUILogo size="xs" variant="mono" showText={false} className="text-white" />
                      <span>Start Building Free</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
                  </Link>
                </div>
                
                {/* Mobile Footer Info */}
                <div className="pt-4 text-center animate-fade-in">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    © 2024 Eternal UI. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  )
}