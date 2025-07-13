'use client'

import { useState, useEffect } from 'react'

/**
 * Hook for parallax scrolling effects
 */
export function useParallax(speed: number = 0.5): number {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return offset
}
