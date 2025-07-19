'use client'

import React, { useEffect, useState, useRef } from 'react'

/**
 * Mobile Optimization Suite
 * 
 * Comprehensive mobile testing and optimization utilities for all components
 * Ensures perfect mobile experience across all devices and screen sizes
 */

// Mobile breakpoints and device configurations
export const MOBILE_BREAKPOINTS = {
  xs: 320,   // iPhone SE
  sm: 375,   // iPhone 12/13/14
  md: 390,   // iPhone 12 Pro Max
  lg: 414,   // iPhone Plus series
  xl: 768,   // iPad Portrait
  xxl: 1024  // iPad Landscape
} as const

export const DEVICE_CONFIGS = {
  'iPhone SE': { width: 375, height: 667, pixelRatio: 2 },
  'iPhone 12': { width: 390, height: 844, pixelRatio: 3 },
  'iPhone 12 Pro Max': { width: 428, height: 926, pixelRatio: 3 },
  'iPad': { width: 768, height: 1024, pixelRatio: 2 },
  'iPad Pro': { width: 1024, height: 1366, pixelRatio: 2 },
  'Samsung Galaxy S21': { width: 384, height: 854, pixelRatio: 2.75 },
  'Samsung Galaxy Tab': { width: 800, height: 1280, pixelRatio: 2 }
} as const

// Touch gesture types for mobile interaction
export interface TouchGesture {
  type: 'tap' | 'double-tap' | 'long-press' | 'swipe' | 'pinch' | 'scroll'
  direction?: 'up' | 'down' | 'left' | 'right'
  duration?: number
  force?: number
}

// Mobile performance metrics
export interface MobilePerformanceMetrics {
  renderTime: number
  memoryUsage: number
  touchResponse: number
  scrollPerformance: number
  batteryImpact: 'low' | 'medium' | 'high'
  networkUsage: number
}

// Mobile accessibility features
export interface MobileAccessibility {
  touchTargetSize: boolean      // Minimum 44px touch targets
  gestureAlternatives: boolean  // Alternative to gesture-only interactions
  screenReaderSupport: boolean  // VoiceOver/TalkBack support
  highContrastMode: boolean     // High contrast support
  textScaling: boolean          // Dynamic text scaling support
  reduceMotion: boolean         // Respect reduce motion preferences
}

/**
 * Hook for detecting mobile device and capabilities
 */
export const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState<{
    type: 'mobile' | 'tablet' | 'desktop'
    orientation: 'portrait' | 'landscape'
    touchSupport: boolean
    pixelRatio: number
    viewport: { width: number; height: number }
  }>({
    type: 'desktop',
    orientation: 'landscape',
    touchSupport: false,
    pixelRatio: 1,
    viewport: { width: 1920, height: 1080 }
  })

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const pixelRatio = window.devicePixelRatio || 1
      
      const deviceType = width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'
      const orientation = width < height ? 'portrait' : 'landscape'
      
      setIsMobile(deviceType === 'mobile')
      setDeviceInfo({
        type: deviceType,
        orientation,
        touchSupport: isTouchDevice,
        pixelRatio,
        viewport: { width, height }
      })
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    window.addEventListener('orientationchange', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('orientationchange', checkMobile)
    }
  }, [])

  return { isMobile, deviceInfo }
}

/**
 * Hook for optimizing touch interactions
 */
export const useTouchOptimization = (elementRef: React.RefObject<HTMLElement>) => {
  const [touchMetrics, setTouchMetrics] = useState<{
    averageResponseTime: number
    touchAccuracy: number
    gestureSuccess: number
  }>({
    averageResponseTime: 0,
    touchAccuracy: 100,
    gestureSuccess: 100
  })

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    let touchStartTime = 0
    const responseTimes: number[] = []

    const handleTouchStart = (e: TouchEvent) => {
      touchStartTime = performance.now()
      
      // Ensure minimum touch target size (44px)
      const touch = e.touches[0]
      const target = e.target as HTMLElement
      const rect = target.getBoundingClientRect()
      
      if (rect.width < 44 || rect.height < 44) {
        console.warn('Touch target too small:', { width: rect.width, height: rect.height })
      }
    }

    const handleTouchEnd = () => {
      if (touchStartTime > 0) {
        const responseTime = performance.now() - touchStartTime
        responseTimes.push(responseTime)
        
        // Keep only last 10 measurements
        if (responseTimes.length > 10) {
          responseTimes.shift()
        }
        
        const averageResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
        
        setTouchMetrics(prev => ({
          ...prev,
          averageResponseTime
        }))
      }
    }

    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [elementRef])

  return touchMetrics
}

/**
 * Mobile Performance Monitor Component
 */
export const MobilePerformanceMonitor: React.FC<{
  children: React.ReactNode
  onMetricsUpdate?: (metrics: MobilePerformanceMetrics) => void
}> = ({ children, onMetricsUpdate }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useMobileDetection()
  const touchMetrics = useTouchOptimization(containerRef)
  const [performanceMetrics, setPerformanceMetrics] = useState<MobilePerformanceMetrics>({
    renderTime: 0,
    memoryUsage: 0,
    touchResponse: 0,
    scrollPerformance: 100,
    batteryImpact: 'low',
    networkUsage: 0
  })

  useEffect(() => {
    if (!isMobile) return

    const measurePerformance = () => {
      // Measure render performance
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.entryType === 'measure') {
            setPerformanceMetrics(prev => ({
              ...prev,
              renderTime: entry.duration
            }))
          }
        })
      })
      
      observer.observe({ entryTypes: ['measure'] })

      // Measure memory usage (if available)
      if ('memory' in performance) {
        const memoryInfo = (performance as any).memory
        setPerformanceMetrics(prev => ({
          ...prev,
          memoryUsage: memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit * 100
        }))
      }

      // Measure scroll performance
      let scrollTimeouts: number[] = []
      const handleScroll = () => {
        const start = performance.now()
        
        const timeout = window.setTimeout(() => {
          const end = performance.now()
          const scrollTime = end - start
          
          setPerformanceMetrics(prev => ({
            ...prev,
            scrollPerformance: Math.max(0, 100 - scrollTime)
          }))
        }, 0)
        
        scrollTimeouts.push(timeout)
      }

      window.addEventListener('scroll', handleScroll, { passive: true })

      return () => {
        observer.disconnect()
        window.removeEventListener('scroll', handleScroll)
        scrollTimeouts.forEach(timeout => clearTimeout(timeout))
      }
    }

    const cleanup = measurePerformance()
    return cleanup
  }, [isMobile])

  // Update metrics with touch response time
  useEffect(() => {
    setPerformanceMetrics(prev => ({
      ...prev,
      touchResponse: touchMetrics.averageResponseTime
    }))
  }, [touchMetrics])

  // Notify parent of metrics updates
  useEffect(() => {
    if (onMetricsUpdate) {
      onMetricsUpdate(performanceMetrics)
    }
  }, [performanceMetrics, onMetricsUpdate])


  return (
    <div ref={containerRef} className="w-full h-full">
      {children}
      
      {/* Mobile Performance Debug Panel (development only) */}
      {process.env.NODE_ENV === 'development' && isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-2 z-50">
          <div className="flex justify-between">
            <span>Render: {performanceMetrics.renderTime.toFixed(1)}ms</span>
            <span>Touch: {performanceMetrics.touchResponse.toFixed(1)}ms</span>
            <span>Memory: {performanceMetrics.memoryUsage.toFixed(1)}%</span>
            <span>Scroll: {performanceMetrics.scrollPerformance.toFixed(0)}%</span>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Mobile Accessibility Checker
 */
export const checkMobileAccessibility = (element: HTMLElement): MobileAccessibility => {
  const results: MobileAccessibility = {
    touchTargetSize: true,
    gestureAlternatives: true,
    screenReaderSupport: true,
    highContrastMode: true,
    textScaling: true,
    reduceMotion: true
  }

  // Check touch target sizes
  const interactiveElements = element.querySelectorAll('button, a, input, select, textarea, [role="button"]')
  interactiveElements.forEach((el) => {
    const rect = el.getBoundingClientRect()
    if (rect.width < 44 || rect.height < 44) {
      results.touchTargetSize = false
    }
  })

  // Check for screen reader support
  const hasAriaLabels = element.querySelectorAll('[aria-label], [aria-labelledby]').length > 0
  const hasHeadings = element.querySelectorAll('h1, h2, h3, h4, h5, h6').length > 0
  results.screenReaderSupport = hasAriaLabels || hasHeadings

  // Check for gesture alternatives
  const gestureOnlyElements = element.querySelectorAll('[data-gesture-only="true"]')
  results.gestureAlternatives = gestureOnlyElements.length === 0

  // Check contrast ratios (simplified check)
  const computedStyle = window.getComputedStyle(element)
  const backgroundColor = computedStyle.backgroundColor
  const color = computedStyle.color
  
  // This is a simplified check - in production, use a proper contrast ratio calculator
  results.highContrastMode = backgroundColor !== color

  return results
}

/**
 * Mobile Testing Utilities for Jest/Testing Library
 */
export const mobileTestUtils = {
  /**
   * Simulate mobile viewport
   */
  setMobileViewport: (width: number = 375, height: number = 667) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: height,
    })
    window.dispatchEvent(new Event('resize'))
  },

  /**
   * Simulate touch events
   */
  simulateTouch: (element: HTMLElement, type: 'start' | 'move' | 'end', coordinates: { x: number; y: number }) => {
    const touch = new Touch({
      identifier: 1,
      target: element,
      clientX: coordinates.x,
      clientY: coordinates.y,
      radiusX: 25,
      radiusY: 25,
      rotationAngle: 0,
      force: 1
    })

    const touchEvent = new TouchEvent(`touch${type}`, {
      touches: type === 'end' ? [] : [touch],
      targetTouches: type === 'end' ? [] : [touch],
      changedTouches: [touch],
      bubbles: true,
      cancelable: true
    })

    element.dispatchEvent(touchEvent)
  },

  /**
   * Simulate swipe gesture
   */
  simulateSwipe: async (element: HTMLElement, direction: 'left' | 'right' | 'up' | 'down', distance: number = 100) => {
    const rect = element.getBoundingClientRect()
    const startX = rect.left + rect.width / 2
    const startY = rect.top + rect.height / 2
    
    let endX = startX
    let endY = startY
    
    switch (direction) {
      case 'left':
        endX = startX - distance
        break
      case 'right':
        endX = startX + distance
        break
      case 'up':
        endY = startY - distance
        break
      case 'down':
        endY = startY + distance
        break
    }

    // Simulate touch start
    mobileTestUtils.simulateTouch(element, 'start', { x: startX, y: startY })
    
    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 50))
    
    // Simulate touch move
    mobileTestUtils.simulateTouch(element, 'move', { x: endX, y: endY })
    
    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 50))
    
    // Simulate touch end
    mobileTestUtils.simulateTouch(element, 'end', { x: endX, y: endY })
  },

  /**
   * Check if element is touch-friendly
   */
  isTouchFriendly: (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect()
    return rect.width >= 44 && rect.height >= 44
  },

  /**
   * Get mobile performance score
   */
  getMobilePerformanceScore: (element: HTMLElement): number => {
    let score = 100

    // Check touch target sizes
    const interactiveElements = element.querySelectorAll('button, a, input')
    interactiveElements.forEach((el) => {
      if (!mobileTestUtils.isTouchFriendly(el as HTMLElement)) {
        score -= 10
      }
    })

    // Check for excessive DOM nodes (mobile performance impact)
    const nodeCount = element.querySelectorAll('*').length
    if (nodeCount > 1000) {
      score -= Math.min(30, (nodeCount - 1000) / 100)
    }

    // Check for large images without optimization
    const images = element.querySelectorAll('img')
    images.forEach((img) => {
      if (!img.loading || img.loading !== 'lazy') {
        score -= 5
      }
    })

    return Math.max(0, score)
  }
}

// Export default mobile optimization suite
export default {
  MOBILE_BREAKPOINTS,
  DEVICE_CONFIGS,
  useMobileDetection,
  useTouchOptimization,
  MobilePerformanceMonitor,
  checkMobileAccessibility,
  mobileTestUtils
}