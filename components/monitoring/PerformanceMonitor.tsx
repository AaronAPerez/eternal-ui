/**
 * PerformanceMonitor Component
 * 
 * Real-time performance monitoring component that tracks Core Web Vitals
 * and other performance metrics. Only runs in development or when explicitly enabled.
 * 
 * Features:
 * - Core Web Vitals tracking (LCP, FID, CLS, FCP, TTFB)
 * - Memory usage monitoring
 * - Render performance tracking
 * - Real-time performance alerts
 * - Accessibility compliant reporting
 * - Non-intrusive floating panel
 * 
 * Technical Implementation:
 * - Uses Performance Observer API for accurate metrics
 * - Web Vitals library integration
 * - Memory API for memory tracking
 * - RequestAnimationFrame for smooth updates
 * - Local storage for metric persistence
 */
export default function PerformanceMonitor() {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    webVitals: {
      lcp: null,
      fid: null,
      cls: null,
      fcp: null,
      ttfb: null
    },
    loadTime: 0,
    memoryUsage: 0,
    renderTime: 0,
    timestamp: Date.now()
  })

  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)

  /**
   * Initialize performance monitoring
   */
  useEffect(() => {
    // Only show in development or when performance monitoring is enabled
    const shouldShowMonitor = process.env.NODE_ENV === 'development' || 
                             localStorage.getItem('eternal-ui-performance-monitor') === 'enabled'
    
    if (!shouldShowMonitor) return

    setIsVisible(true)

    /**
     * Track Core Web Vitals using Performance Observer API
     */
    const trackWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries()
            const lastEntry = entries[entries.length - 1] as any
            
            setPerformanceData(prev => ({
              ...prev,
              webVitals: {
                ...prev.webVitals,
                lcp: lastEntry.startTime
              },
              timestamp: Date.now()
            }))
          })
          
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        } catch (error) {
          console.warn('LCP monitoring not supported:', error)
        }

        // First Input Delay (FID)
        try {
          const fidObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries()
            entries.forEach((entry: any) => {
              setPerformanceData(prev => ({
                ...prev,
                webVitals: {
                  ...prev.webVitals,
                  fid: entry.processingStart - entry.startTime
                },
                timestamp: Date.now()
              }))
            })
          })
          
          fidObserver.observe({ entryTypes: ['first-input'] })
        } catch (error) {
          console.warn('FID monitoring not supported:', error)
        }

        // Cumulative Layout Shift (CLS)
        try {
          let clsValue = 0
          const clsObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries()
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value
                setPerformanceData(prev => ({
                  ...prev,
                  webVitals: {
                    ...prev.webVitals,
                    cls: clsValue
                  },
                  timestamp: Date.now()
                }))
              }
            })
          })
          
          clsObserver.observe({ entryTypes: ['layout-shift'] })
        } catch (error) {
          console.warn('CLS monitoring not supported:', error)
        }

        // First Contentful Paint (FCP)
        try {
          const fcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries()
            entries.forEach((entry: any) => {
              if (entry.name === 'first-contentful-paint') {
                setPerformanceData(prev => ({
                  ...prev,
                  webVitals: {
                    ...prev.webVitals,
                    fcp: entry.startTime
                  },
                  timestamp: Date.now()
                }))
              }
            })
          })
          
          fcpObserver.observe({ entryTypes: ['paint'] })
        } catch (error) {
          console.warn('FCP monitoring not supported:', error)
        }

        // Navigation timing for TTFB
        try {
          const navigationObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries()
            entries.forEach((entry: any) => {
              setPerformanceData(prev => ({
                ...prev,
                webVitals: {
                  ...prev.webVitals,
                  ttfb: entry.responseStart - entry.requestStart
                },
                loadTime: entry.loadEventEnd - entry.loadEventStart,
                timestamp: Date.now()
              }))
            })
          })
          
          navigationObserver.observe({ entryTypes: ['navigation'] })
        } catch (error) {
          console.warn('Navigation timing not supported:', error)
        }
      }
    }

    /**
     * Track memory usage if available
     */
    const trackMemoryUsage = () => {
      if ('memory' in performance) {
        const memoryInfo = (performance as any).memory
        setPerformanceData(prev => ({
          ...prev,
          memoryUsage: memoryInfo.usedJSHeapSize / 1024 / 1024, // Convert to MB
          timestamp: Date.now()
        }))
      }
    }

    /**
     * Track render performance
     */
    const trackRenderPerformance = () => {
      const start = performance.now()
      
      requestAnimationFrame(() => {
        const end = performance.now()
        setPerformanceData(prev => ({
          ...prev,
          renderTime: end - start,
          timestamp: Date.now()
        }))
      })
    }

    // Initialize tracking
    trackWebVitals()
    
    // Set up intervals for continuous monitoring
    const memoryInterval = setInterval(trackMemoryUsage, 5000)
    const renderInterval = setInterval(trackRenderPerformance, 1000)

    // Cleanup function
    return () => {
      clearInterval(memoryInterval)
      clearInterval(renderInterval)
    }
  }, [])

  /**
   * Get performance grade based on Core Web Vitals thresholds
   */
  const getPerformanceGrade = (metric: keyof WebVitalsMetrics, value: number | null): 'good' | 'needs-improvement' | 'poor' | 'loading' => {
    if (value === null) return 'loading'

    const thresholds = {
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      fcp: { good: 1800, poor: 3000 },
      ttfb: { good: 800, poor: 1800 }
    }

    const threshold = thresholds[metric]
    if (value <= threshold.good) return 'good'
    if (value <= threshold.poor) return 'needs-improvement'
    return 'poor'
  }

  /**
   * Format metric values for display
   */
  const formatMetric = (metric: keyof WebVitalsMetrics, value: number | null): string => {
    if (value === null) return '---'

    switch (metric) {
      case 'cls':
        return value.toFixed(3)
      case 'lcp':
      case 'fid':
      case 'fcp':
      case 'ttfb':
        return `${Math.round(value)}ms`
      default:
        return value.toString()
    }
  }

  /**
   * Get color class based on performance grade
   */
  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case 'good':
        return 'text-green-600 dark:text-green-400'
      case 'needs-improvement':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'poor':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-gray-500 dark:text-gray-400'
    }
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="fixed bottom-4 right-4 z-50"
        role="complementary"
        aria-label="Performance Monitor"
      >
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-w-sm">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Performance Monitor
              </h3>
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                aria-label={isMinimized ? 'Expand performance monitor' : 'Minimize performance monitor'}
              >
                {isMinimized ? (
                  <Eye className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <motion.div
                    animate={{ rotate: 180 }}
                    className="w-4 h-4"
                  >
                    <Eye aria-hidden="true" />
                  </motion.div>
                )}
              </button>
              
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                aria-label="Close performance monitor"
              >
                ×
              </button>
            </div>
          </div>

          {/* Metrics content */}
          <AnimatePresence>
            {!isMinimized && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-3 space-y-3">
                  {/* Core Web Vitals */}
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <Zap className="w-3 h-3 mr-1" aria-hidden="true" />
                      Core Web Vitals
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {(Object.entries(performanceData.webVitals) as Array<[keyof WebVitalsMetrics, number | null]>).map(([metric, value]) => {
                        const grade = getPerformanceGrade(metric, value)
                        const colorClass = getGradeColor(grade)
                        
                        return (
                          <div key={metric} className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400 uppercase">
                              {metric}
                            </span>
                            <span className={`font-mono ${colorClass}`}>
                              {formatMetric(metric, value)}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Additional metrics */}
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <Clock className="w-3 h-3 mr-1" aria-hidden="true" />
                      Additional Metrics
                    </h4>
                    
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Load Time</span>
                        <span className="font-mono text-gray-900 dark:text-white">
                          {performanceData.loadTime ? `${Math.round(performanceData.loadTime)}ms` : '---'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Memory Usage</span>
                        <span className="font-mono text-gray-900 dark:text-white">
                          {performanceData.memoryUsage ? `${performanceData.memoryUsage.toFixed(1)}MB` : '---'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Render Time</span>
                        <span className="font-mono text-gray-900 dark:text-white">
                          {performanceData.renderTime ? `${performanceData.renderTime.toFixed(2)}ms` : '---'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Performance score */}
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Overall Score</span>
                      <div className="flex items-center space-x-1">
                        {performanceData.webVitals.lcp !== null && (
                          <motion.div
                            className={`w-2 h-2 rounded-full ${
                              getPerformanceGrade('lcp', performanceData.webVitals.lcp) === 'good' ? 'bg-green-500' :
                              getPerformanceGrade('lcp', performanceData.webVitals.lcp) === 'needs-improvement' ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            aria-hidden="true"
                          />
                        )}
                        <span className="text-xs font-medium text-gray-900 dark:text-white">
                          {performanceData.webVitals.lcp ? 
                            (getPerformanceGrade('lcp', performanceData.webVitals.lcp) === 'good' ? 'Good' :
                             getPerformanceGrade('lcp', performanceData.webVitals.lcp) === 'needs-improvement' ? 'Fair' : 'Poor') 
                            : 'Loading...'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Last updated */}
                  <div className="text-xs text-gray-500 dark:text-gray-500 text-center">
                    Last updated: {new Date(performanceData.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}