import { Globe, Grid, Layers } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-indigo-600 mx-auto"></div>
          <Globe className="absolute inset-0 m-auto w-8 h-8 text-indigo-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Loading Website Builder
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Preparing your visual design environment...
        </p>
        
        <div className="flex justify-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Grid className="w-4 h-4" />
            <span>Grid System</span>
          </div>
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4" />
            <span>Components</span>
          </div>
        </div>
      </div>
    </div>
  );
}