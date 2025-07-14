export function BuilderSkeleton() {
  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900 animate-pulse">
      {/* Toolbar Skeleton */}
      <div className="w-full">
        <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 space-x-4">
          <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="flex space-x-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
            ))}
          </div>
        </div>

        <div className="flex h-[calc(100vh-4rem)]">
          {/* Left Panel Skeleton */}
          <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>

          {/* Canvas Skeleton */}
          <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-4">
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>

          {/* Right Panel Skeleton */}
          <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4">
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}