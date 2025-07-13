'use client'

import { useState, useEffect } from 'react'

type ScrollDirection = 'up' | 'down' | null

/**
 * Hook to detect scroll direction
 * Useful for hiding/showing navigation on scroll
 */
export function useScrollDirection(): ScrollDirection {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? 'down' : 'up'
      
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction)
      }
      
      setLastScrollY(scrollY > 0 ? scrollY : 0)
    }

    const handleScroll = () => {
      requestAnimationFrame(updateScrollDirection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollDirection, lastScrollY])

  return scrollDirection
}