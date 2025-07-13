'use client'

import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number
  root?: Element | null
  rootMargin?: string
  triggerOnce?: boolean
}

interface UseIntersectionObserverResult {
  ref: React.RefObject<HTMLDivElement>
  isVisible: boolean
  entry?: IntersectionObserverEntry
}

/**
 * Hook for intersection observer to trigger animations on scroll
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverResult {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    triggerOnce = false
  } = options

  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry)
        setIsVisible(entry.isIntersecting)
        
        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(element)
        }
      },
      {
        threshold,
        root,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, root, rootMargin, triggerOnce])

  return { ref, isVisible, entry }
}