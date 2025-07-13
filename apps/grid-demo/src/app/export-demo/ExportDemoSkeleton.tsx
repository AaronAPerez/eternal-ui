/**
 * ExportDemoSkeleton Component
 * 
 * Provides loading skeleton for the export demo page while the main content loads.
 * Implements accessibility best practices and smooth loading animations.
 * 
 * Features:
 * - Accessible loading state with screen reader announcements
 * - Smooth pulse animations
 * - Responsive design matching the main component
 * - Performance optimized with CSS animations
 */
export function ExportDemoSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="status" aria-label="Loading export demo">
      {/* Screen reader announcement */}
      <span className="sr-only">Loading export demo interface...</span>
      
      {/* Component selection skeleton */}
      <section aria-label="Component Selection Loading" className="mb-12">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-6 animate-pulse"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 animate-pulse"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Export configuration skeleton */}
      <section aria-label="Export Configuration Loading" className="mb-12">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6 animate-pulse"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-3 animate-pulse"></div>
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, optionIndex) => (
                    <div key={optionIndex} className="flex items-center">
                      <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="ml-2 h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview section skeleton */}
      <section aria-label="Component Preview Loading" className="mb-12">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
            
            <div className="flex space-x-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 w-80 h-64 animate-pulse">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                <div className="h-6 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="flex space-x-3">
                  <div className="h-10 bg-gray-200 rounded w-16"></div>
                  <div className="h-10 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Export button skeleton */}
      <section aria-label="Export Actions Loading" className="mb-12">
        <div className="text-center">
          <div className="inline-flex items-center px-8 py-4 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse">
            <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded mr-3"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
          </div>
          
          <div className="mt-2 space-y-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto animate-pulse"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Performance metrics skeleton */}
      <section aria-label="Performance Metrics Loading" className="mb-8">
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-40 mb-4 animate-pulse"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="text-center">
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-16 mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}