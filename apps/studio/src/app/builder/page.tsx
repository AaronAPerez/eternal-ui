'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';

// Correct dynamic import with proper default export handling
const DarkModeEnhancedGridSystem = dynamic(
  () => import('@/components/grid/DarkModeEnhancedGridSystem'),
  {
    ssr: false,
    loading: () => <BuilderSkeleton />,
  }
);

// Alternative component for demonstration
const BuilderInterface = dynamic(
  () => import('@/components/builder/BuilderInterface'),
  {
    ssr: false,
    loading: () => <div>Loading Builder Interface...</div>,
  }
);

function BuilderSkeleton() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
        <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Loading Grid Builder
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Preparing your visual design environment...
        </p>
      </div>
    </div>
  );
}

export default function BuilderPage() {
  const [mode, setMode] = useState<'grid' | 'interface'>('grid');

  return (
    <main className="h-full w-full">
      {/* Mode Selector */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setMode('grid')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              mode === 'grid'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Grid Builder
          </button>
          <button
            onClick={() => setMode('interface')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              mode === 'interface'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Interface Builder
          </button>
        </div>
      </div>

      {/* Builder Content */}
      <div className="h-[calc(100vh-80px)]">
        <Suspense fallback={<BuilderSkeleton />}>
          {mode === 'grid' ? (
            <DarkModeEnhancedGridSystem />
          ) : (
            <BuilderInterface />
          )}
        </Suspense>
      </div>
    </main>
  );
}