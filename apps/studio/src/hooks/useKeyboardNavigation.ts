'use client'

import { useEffect } from 'react'

type KeyboardShortcuts = Record<string, (event: KeyboardEvent) => void>

/**
 * Hook for keyboard navigation and shortcuts
 */
export function useKeyboardNavigation(shortcuts: KeyboardShortcuts): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      const metaKey = event.metaKey || event.ctrlKey
      
      // Create key combination string
      let keyCombo = ''
      if (metaKey) keyCombo += event.metaKey ? 'cmd+' : 'ctrl+'
      if (event.shiftKey) keyCombo += 'shift+'
      if (event.altKey) keyCombo += 'alt+'
      keyCombo += key

      // Check if we have a handler for this combination
      if (shortcuts[keyCombo]) {
        event.preventDefault()
        shortcuts[keyCombo](event)
      } else if (shortcuts[key]) {
        // Check for simple key without modifiers
        shortcuts[key](event)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}