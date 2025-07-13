'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  ChevronDown, 
  ChevronRight,
  ArrowRight,
  Rocket,
  Download
} from 'lucide-react'

// Hooks
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'
import { useFocusTrap } from '@/hooks/useFocusTrap'

// Components
import { Button } from '@/components/ui/Button'

// Types
interface NavigationItem {
  name: string
  href: string
  description?: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string
  children?: NavigationItem[]
}

interface MobileMenuProps {
  items: NavigationItem[]
  currentPath: string
  onClose: () => void
  isOpen: boolean
}

/**
 * Mobile Menu Component
 * 
 * Provides an accessible, performant mobile navigation experience with:
 * - Smooth animations and transitions
 * - Keyboard navigation support
 * - Focus trapping for accessibility
 * - Hierarchical menu structure
 * - Touch-friendly interface
 * - Screen reader compatibility
 * 
 * Accessibility Features:
 * - Focus management and trapping
 * - ARIA labels and states
 * - Keyboard navigation (arrows, enter, escape)
 * - Screen reader announcements
 * - High contrast support
 * 
 * @param items - Navigation items to display
 * @param currentPath - Current active path for highlighting
 * @param onClose - Function to close the menu
 * @param isOpen - Whether the menu is currently open
 */
export function MobileMenu({ 
  items, 
  currentPath, 
  onClose, 
  isOpen 
}: MobileMenuProps): JSX.Element {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  
  // Focus trap for accessibility
  const focusTrapRef = useFocusTrap(isOpen)
  
  // Keyboard navigation
  useKeyboardNavigation({
    'escape': onClose,
    'tab': (event) => {
      // Focus management handled by useFocusTrap
    }
  })

  // Close menu when route changes
  useEffect(() => {
    if (isOpen) {
      setExpandedItems(new Set())
    }
  }, [currentPath, isOpen])

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  /**
   * Toggle expanded state of menu item
   */
  const toggleExpanded = (itemName: string): void => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemName)) {
        newSet.delete(itemName)
      } else {
        newSet.add(itemName)
      }
      return newSet
    })
  }

  /**
   * Check if current item or its children are active
   */
  const isActiveItem = (item: NavigationItem): boolean => {
    if (currentPath === item.href) return true
    if (item.children) {
      return item.children.some(child => currentPath === child.href)
    }
    return false
  }

  /**
   * Announce menu state changes to screen readers
   */
  const announceChange = (message: string): void => {
    const announcer = document.getElementById('live-announcer')
    if (announcer) {
      announcer.textContent = message
    }
  }

  if (!isOpen) return <></>

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Mobile Menu Panel */}
      <div 
        ref={focusTrapRef}
        className="fixed inset-y-0 left-0 w-full max-w-sm bg-white dark:bg-gray-900 z-50 lg:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        id="mobile-menu"
      >
        
        {/* Menu Content */}
        <div className="p-4 space-y-6">
          
          {/* Menu Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Navigation
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Close navigation menu"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Navigation Items */}
          <nav className="space-y-2" role="navigation" aria-label="Mobile navigation">
            {items.map((item) => (
              <div key={item.name} className="space-y-2">
                
                {/* Main Item */}
                {item.children ? (
                  // Expandable item
                  <button
                    onClick={() => {
                      toggleExpanded(item.name)
                      announceChange(
                        expandedItems.has(item.name) 
                          ? `${item.name} collapsed`
                          : `${item.name} expanded`
                      )
                    }}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 rounded-lg text-left
                      transition-colors duration-200 focus:outline-none focus:ring-2 
                      focus:ring-blue-500 focus:ring-offset-2
                      ${isActiveItem(item)
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }
                    `}
                    aria-expanded={expandedItems.has(item.name)}
                    aria-controls={`submenu-${item.name}`}
                  >
                    <span className="font-medium">{item.name}</span>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-200 ${
                        expandedItems.has(item.name) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                ) : (
                  // Direct link
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`
                      block px-4 py-3 rounded-lg font-medium transition-colors duration-200
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                      ${currentPath === item.href
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                )}
                
                {/* Submenu */}
                {item.children && expandedItems.has(item.name) && (
                  <div 
                    id={`submenu-${item.name}`}
                    className="pl-4 space-y-1 animate-fade-in-up"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={onClose}
                        className={`
                          block px-4 py-3 rounded-lg transition-colors duration-200
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                          ${currentPath === child.href
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                          }
                        `}
                      >
                        <div className="flex items-center space-x-3">
                          {child.icon && (
                            <child.icon className="w-5 h-5 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium truncate">{child.name}</span>
                              {child.badge && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300">
                                  {child.badge}
                                </span>
                              )}
                            </div>
                            {child.description && (
                              <p className="text-sm text-gray-500 dark:text-gray-500 truncate">
                                {child.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          {/* Mobile CTA Section */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800 space-y-4">
            
            {/* Sign In Link */}
            <Link
              href="/login"
              onClick={onClose}
              className="block text-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
            >
              Sign In
            </Link>
            
            {/* Primary CTA */}
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg group"
              asChild
            >
              <Link href="/builder" onClick={onClose} className="flex items-center justify-center space-x-2">
                <Rocket className="w-4 h-4" />
                <span>Start Building</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            {/* Secondary CTA */}
            <Button 
              variant="outline"
              className="w-full border-gray-300 dark:border-gray-600"
              asChild
            >
              <Link href="/export-demo" onClick={onClose} className="flex items-center justify-center space-x-2">
                <Download className="w-4 h-4" />
                <span>View Demo</span>
              </Link>
            </Button>
          </div>
          
          {/* Footer Info */}
          <div className="pt-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              © 2024 Eternal UI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}