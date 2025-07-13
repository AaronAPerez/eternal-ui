/**
 * Accessibility Hook
 * 
 * Provides accessibility utilities including screen reader announcements,
 * focus management, and keyboard navigation support.
 */

import { useCallback, useRef } from 'react'

interface UseAccessibilityReturn {
  announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void
  trapFocus: (containerRef: React.RefObject<HTMLElement>) => () => void
  manageFocus: (element: HTMLElement) => void
}

export const useAccessibility = (): UseAccessibilityReturn => {
  const liveRegionRef = useRef<HTMLDivElement | null>(null)

  /**
   * Announces messages to screen readers using ARIA live regions
   */
  const announceToScreenReader = useCallback((
    message: string, 
    priority: 'polite' | 'assertive' = 'polite'
  ) => {
    // Create or update live region
    if (!liveRegionRef.current) {
      const liveRegion = document.createElement('div')
      liveRegion.setAttribute('aria-live', priority)
      liveRegion.setAttribute('aria-atomic', 'true')
      liveRegion.className = 'sr-only absolute -left-10000 w-1 h-1 overflow-hidden'
      
      document.body.appendChild(liveRegion)
      liveRegionRef.current = liveRegion
    }

    // Update the live region content
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = message
      
      // Clear after announcement to allow repeated announcements
      setTimeout(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = ''
        }
      }, 1000)
    }
  }, [])

  /**
   * Traps focus within a container for modal dialogs
   */
  const trapFocus = useCallback((containerRef: React.RefObject<HTMLElement>) => {
    const container = containerRef.current
    if (!container) return () => {}

    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)
    firstElement?.focus()

    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  }, [])

  /**
   * Manages focus for interactive elements
   */
  const manageFocus = useCallback((element: HTMLElement) => {
    // Ensure element is focusable
    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '0')
    }

    // Add focus styles if not present
    if (!element.classList.contains('focus:ring')) {
      element.classList.add('focus:ring-2', 'focus:ring-blue-500', 'focus:ring-offset-2')
    }
  }, [])

  return {
    announceToScreenReader,
    trapFocus,
    manageFocus
  }
}
