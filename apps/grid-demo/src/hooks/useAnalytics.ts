/**
 * Analytics Hook
 * 
 * Provides analytics tracking functionality for user interactions
 * and export events with privacy-focused implementation.
 */

import { useCallback } from 'react'

interface AnalyticsEvent {
  action: string
  properties?: Record<string, any>
}

interface UseAnalyticsReturn {
  trackEvent: (action: string, properties?: Record<string, any>) => void
  trackPageView: (page: string) => void
  trackExportEvent: (event: string, config: any) => void
}

export const useAnalytics = (): UseAnalyticsReturn => {
  /**
   * Tracks user events with automatic enrichment
   */
  const trackEvent = useCallback((action: string, properties: Record<string, any> = {}) => {
    const enrichedProperties = {
      ...properties,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    }

    // Send to analytics provider in production
    if (process.env.NODE_ENV === 'production') {
      // Example: analytics.track(action, enrichedProperties)
      console.log('Analytics Event:', action, enrichedProperties)
    } else {
      console.log('Analytics Event (Dev):', action, enrichedProperties)
    }
  }, [])

  /**
   * Tracks page views
   */
  const trackPageView = useCallback((page: string) => {
    trackEvent('page_view', { page })
  }, [trackEvent])

  /**
   * Tracks export-specific events
   */
  const trackExportEvent = useCallback((event: string, config: any) => {
    trackEvent(`export_${event}`, {
      framework: config.framework,
      typescript: config.typescript,
      accessibility: config.accessibility,
      testing: config.testing,
      performance: config.performance,
      seo: config.seo
    })
  }, [trackEvent])

  return {
    trackEvent,
    trackPageView,
    trackExportEvent
  }
}