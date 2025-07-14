import { Grid, Layers, Settings } from 'lucide-react';

export default function BuilderLoading() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <Grid className="absolute inset-0 m-auto w-6 h-6 text-indigo-600" />
        </div>
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