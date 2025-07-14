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
  Square,
  Layers
} from 'lucide-react'

// Import the official Eternal UI Logo
import { EternalUILogo } from '@/components/Logo/eternal-ui-logo'

// FIXED TYPES - Added children property and icon
interface NavigationItem {
  name: string
  href: string
  description?: string
  icon?: React.ComponentType<{ className?: string }> // Fixed icon type
  badge?: string
  children?: NavigationItem[] // Added children property
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
    const savedTheme = localStorage.getItem('eternal-ui-theme') as 'light' | 'dark' | null
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
    localStorage.setItem('eternal-ui-theme', newTheme)
    
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
        <Moon className="w-5 h-5 transition-transform group-hover:rotate-12" />
      ) : (
        <Sun className="w-5 h-5 transition-transform group-hover:rotate-12" />
      )}
    </button>
  )
}

/**
 * Enhanced Dropdown Menu Component
 */
function DropdownMenu({ items, isOpen, onClose, trigger, label }: DropdownMenuProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 transition-all duration-200 opacity-100 scale-100"
      role="menu"
      aria-label={label}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-start space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
          role="menuitem"
          onClick={onClose}
        >
          {item.icon && (
            <item.icon className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
          )}
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <div className="font-medium">{item.name}</div>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            {item.description && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {item.description}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}

// FIXED Navigation items with proper typing
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
        name: 'Grid System',
        href: '/builder?mode=grid',
        description: 'Advanced grid layout system',
        icon: Grid,
        badge: 'New'
      },
      {
        name: 'Components',
        href: '/builder?mode=components',
        description: 'Browse & customize components',
        icon: Square
      }
    ]
  },
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
 * Enhanced Navigation Component with Builder Modes
 */
export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { theme, toggleTheme, mounted } = useTheme()
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null)
    }

    if (openDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [openDropdown])

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="flex items-center space-x-3 group"
              aria-label="Eternal UI Home"
            >
              <EternalUILogo className="w-10 h-10 transition-transform group-hover:scale-110"
              size='lg' />
              {/* <span className="text-xl font-bold text-gray-900 dark:text-white">
                Eternal UI
              </span> */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpenDropdown(openDropdown === item.name ? null : item.name)
                      }}
                      className="flex items-center space-x-1 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
                      aria-expanded={openDropdown === item.name}
                      aria-haspopup="true"
                    >
                      <span className="font-medium">{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        openDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    <DropdownMenu
                      items={item.children}
                      isOpen={openDropdown === item.name}
                      onClose={() => setOpenDropdown(null)}
                      trigger={<span>{item.name}</span>}
                      label={`${item.name} menu`}
                    />
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      pathname === item.href
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* CTA Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              <Link
                href="/builder"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
              >
                <Sparkles className="w-4 h-4" />
                <span>Try Builder</span>
              </Link>

                  <Link
                href="/export-demo"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Export Demo</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-4 py-6 space-y-4">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <div className="space-y-2">
                    <div className="font-medium text-gray-900 dark:text-white px-3 py-2">
                      {item.name}
                    </div>
                    <div className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center space-x-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.icon && <child.icon className="w-4 h-4" />}
                          <span>{child.name}</span>
                          {child.badge && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                              {child.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 rounded-lg font-medium transition-colors ${
                      pathname === item.href
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile CTA Buttons */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
              <Link
                href="/builder"
                className="flex items-center justify-center space-x-2 w-full px-4 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Sparkles className="w-4 h-4" />
                <span>Try Builder</span>
              </Link>
              
              <Link
                href="/export-demo"
                className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Download className="w-4 h-4" />
                <span>Export Demo</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}