'use client';

import { useState, useEffect, useMemo } from 'react';
import { ComponentGrid } from '@/components/library/ComponentGrid';
import { ComponentSearch } from '@/components/library/ComponentSearch';
import { ComponentFilters } from '@/components/library/ComponentFilters';
import { ComponentStats } from '@/components/library/ComponentStats';
import { componentLibrary, searchEngine } from '@/components/studio/ComponentLibrary/ComponentLibrary';

export default function ComponentsPage() {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch components with filters
  const filteredComponents = useMemo(() => {
    let results = componentLibrary.getAllComponents();

    if (searchQuery) {
      results = searchEngine.fuzzySearch(searchQuery);
    }

    if (selectedCategory !== 'all') {
      results = results.filter(comp => comp.category === selectedCategory);
    }

    if (Object.keys(filters).length > 0) {
      results = componentLibrary.filterComponents(filters);
    }

    return results;
  }, [searchQuery, selectedCategory, filters]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Component Library
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                120+ production-ready components for modern web development
              </p>
            </div>
            <ComponentStats components={filteredComponents} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Search & Filters */}
          <div className="lg:w-80 space-y-6">
            <ComponentSearch
              value={searchQuery}
              onChange={setSearchQuery}
              suggestions={searchEngine.getSearchSuggestions(searchQuery)}
            />
            
            <ComponentFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              filters={filters}
              onFiltersChange={setFilters}
              components={componentLibrary.getAllComponents()}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredComponents.length} components
                </span>
                {searchQuery && (
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    matching "{searchQuery}"
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                 <List className="w-4 h-4" />
               </button>
             </div>
           </div>

           <ComponentGrid
             components={filteredComponents}
             viewMode={viewMode}
             onComponentSelect={(component) => {
               console.log('Selected component:', component);
               // Handle component selection - could navigate to builder
             }}
           />
         </div>
       </div>
     </div>
   </div>
 );
}
}