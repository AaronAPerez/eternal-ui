/**
 * ⌨️ ESCAPE KEY HOOK
 * 
 * Handles escape key presses for closing modals and dropdowns
 */
import { useEffect } from 'react'

export function useEscapeKey(
  onEscape: () => void,
  isActive: boolean = true
) {
  useEffect(() => {
    if (!isActive) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onEscape()
      }
    }

    // Add event listener
    document.addEventListener('keydown', handleEscape)

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onEscape, isActive])
}