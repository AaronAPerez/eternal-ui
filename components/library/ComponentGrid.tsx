'use client';

import { useState } from 'react';
import { Star, Download, Eye } from 'lucide-react';

interface ComponentGridProps {
  components: any[];
  viewMode: 'grid' | 'list';
  onComponentSelect: (component: any) => void;
}

export function ComponentGrid({ components, viewMode, onComponentSelect }: ComponentGridProps) {
  return (
    <div className={`grid gap-6 ${
      viewMode === 'grid' 
        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
        : 'grid-cols-1'
    }`}>
      {components.map((component) => (
        <div
          key={component.id}
          onClick={() => onComponentSelect(component)}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
          {/* Preview Image */}
          <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl">{component.icon || '🧩'}</div>
            </div>
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {component.metadata?.new && (
                <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                  New
                </span>
              )}
              {component.metadata?.trending && (
                <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
                  Trending
                </span>
              )}
            </div>

            {/* Performance Score */}
            <div className="absolute top-3 right-3">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                (component.performance?.score || 90) >= 95 
                  ? 'bg-green-100 text-green-700'
                  : (component.performance?.score || 90) >= 85
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {component.performance?.score || 90}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {component.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {component.description}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {(component.tags || ['react', 'typescript']).slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Metrics */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current text-yellow-400" />
                  <span>{component.metadata?.rating || 4.5}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  <span>{((component.metadata?.downloads || 1000) / 1000).toFixed(1)}k</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  (component.accessibility?.level || 'AA') === 'AAA' 
                    ? 'bg-green-400'
                    : (component.accessibility?.level || 'AA') === 'AA'
                    ? 'bg-yellow-400'
                    : 'bg-red-400'
                }`} />
                <span className="text-xs">{component.accessibility?.level || 'AA'}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}