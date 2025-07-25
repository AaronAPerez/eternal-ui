'use client';

import { useState } from 'react';
import { Filter } from 'lucide-react';

interface ComponentFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  filters: any;
  onFiltersChange: (filters: any) => void;
  components: any[];
}

export function ComponentFilters({ 
  selectedCategory, 
  onCategoryChange, 
  filters, 
  onFiltersChange,
  components 
}: ComponentFiltersProps) {
  const categories = [
    { id: 'all', name: 'All Components', count: components.length },
    { id: 'ui', name: 'UI Components', count: components.filter(c => c.category === 'ui').length },
    { id: 'layout', name: 'Layout', count: components.filter(c => c.category === 'layout').length },
    { id: 'forms', name: 'Forms', count: components.filter(c => c.category === 'forms').length },
    { id: 'navigation', name: 'Navigation', count: components.filter(c => c.category === 'navigation').length },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-600" />
        <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Categories
        </h4>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                selectedCategory === category.id
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}