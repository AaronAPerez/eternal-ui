/**
 * 📜 VIRTUAL SCROLLING HOOK
 * 
 * Efficiently handles large lists by only rendering visible items
 */
import { useState, useEffect, useMemo } from 'react'

interface VirtualizerOptions {
  count: number
  getScrollElement: () => HTMLElement | null
  estimateSize: (index: number) => number
  enabled?: boolean
  overscan?: number
}

interface VirtualItem {
  key: string
  index: number
  start: number
  size: number
  end: number
}

export function useVirtualizer({
  count,
  getScrollElement,
  estimateSize,
  enabled = true,
  overscan = 5
}: VirtualizerOptions) {
  const [scrollTop, setScrollTop] = useState(0)
  const [height, setHeight] = useState(0)

  // Update scroll position and height
  useEffect(() => {
    if (!enabled) return

    const scrollElement = getScrollElement()
    if (!scrollElement) return

    const handleScroll = () => {
      setScrollTop(scrollElement.scrollTop)
    }

    const updateHeight = () => {
      setHeight(scrollElement.clientHeight)
    }

    // Initial values
    updateHeight()
    handleScroll()

    // Event listeners
    scrollElement.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', updateHeight)

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateHeight)
    }
  }, [getScrollElement, enabled])

  // Calculate virtual items
  const virtualItems = useMemo(() => {
    if (!enabled || count === 0) return []

    const items: VirtualItem[] = []
    let start = 0

    // Calculate which items are visible
    const startIndex = Math.max(0, Math.floor(scrollTop / estimateSize(0)) - overscan)
    const endIndex = Math.min(count - 1, Math.floor((scrollTop + height) / estimateSize(0)) + overscan)

    // Generate virtual items
    for (let i = 0; i < count; i++) {
      const size = estimateSize(i)
      
      if (i >= startIndex && i <= endIndex) {
        items.push({
          key: i.toString(),
          index: i,
          start,
          size,
          end: start + size
        })
      }
      
      start += size
    }

    return items
  }, [count, scrollTop, height, estimateSize, overscan, enabled])

  // Calculate total size
  const totalSize = useMemo(() => {
    let size = 0
    for (let i = 0; i < count; i++) {
      size += estimateSize(i)
    }
    return size
  }, [count, estimateSize])

  return {
    virtualItems,
    totalSize,
    enabled,
    getVirtualItems: () => virtualItems,
    getTotalSize: () => totalSize
  }
}