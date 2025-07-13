'use client'

import React, { createContext, useContext } from 'react'

interface AnalyticsContextType {
  track: (event: string, properties?: Record<string, any>) => void
  identify: (userId: string, traits?: Record<string, any>) => void
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const track = (event: string, properties?: Record<string, any>) => {
    // Implement your analytics tracking here
    console.log('Analytics track:', event, properties)
  }

  const identify = (userId: string, traits?: Record<string, any>) => {
    // Implement user identification here
    console.log('Analytics identify:', userId, traits)
  }

  return (
    <AnalyticsContext.Provider value={{ track, identify }}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}