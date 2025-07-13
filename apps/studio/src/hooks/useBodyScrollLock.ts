/**
 * 📜 BODY SCROLL LOCK HOOK
 * 
 * Prevents body scrolling when modals are open
 */
import { useEffect } from 'react'

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return

    // Store original styles
    const originalStyle = window.getComputedStyle(document.body).overflow
    const originalPaddingRight = document.body.style.paddingRight

    // Calculate scrollbar width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    // Apply scroll lock
    document.body.style.overflow = 'hidden'
    
    // Compensate for scrollbar width to prevent layout shift
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = originalStyle
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [isLocked])
}