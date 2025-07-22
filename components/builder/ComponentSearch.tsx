import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, Tag } from 'lucide-react';
import { ENHANCED_COMPONENT_REGISTRY, COMPONENT_CATEGORIES } from '@/lib/enhanced-component-registry';

interface ComponentSearchProps {
  onComponentSelect?: (component: any) => void;
}

export function ComponentSearch({ onComponentSelect }: ComponentSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Available tags for filtering
  const availableTags = [
    'responsive', 'dark-mode', 'animated', 'interactive', 
    'form', 'navigation', 'commerce', 'marketing'
  ];

  // Filter components based on search criteria
  const filteredComponents = useMemo(() => {
    let filtered = ENHANCED_COMPONENT_REGISTRY;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(comp => comp.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(comp =>
        comp.name.toLowerCase().includes(query) ||
        comp.category.toLowerCase().includes(query) ||
        comp.id.toLowerCase().includes(query)
      );
    }

    // Filter by tags (mock implementation - you'd add actual tags to components)
    if (selectedTags.length > 0) {
      // This would check component.tags in a real implementation
      filtered = filtered.filter(comp => {
        // Mock tag matching logic
        return selectedTags.some(tag => 
          comp.name.toLowerCase().includes(tag) || 
          comp.category.includes(tag)
        );
      });
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Components Library</h3>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-1 mb-4">
          {COMPONENT_CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Tag Filters */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-medium text-gray-600">Filter by tags</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {availableTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">
            {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 gap-2">
            {filteredComponents.map(component => (
              <ComponentCard 
                key={component.id} 
                component={component} 
                onSelect={onComponentSelect}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {filteredComponents.map(component => (
              <ComponentListItem 
                key={component.id} 
                component={component} 
                onSelect={onComponentSelect}
              />
            ))}
          </div>
        )}
        
        {filteredComponents.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No components found</p>
            <p className="text-xs text-gray-400 mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Component card for grid view
function ComponentCard({ component, onSelect }) {
  return (
    <div
      onClick={() => onSelect?.(component)}
      className="bg-white border-2 border-gray-200 rounded-lg p-3 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all group"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <component.icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate">{component.name}</div>
          <div className="text-xs text-gray-500 capitalize truncate">
            {component.category.replace('-', ' ')}
          </div>
        </div>
      </div>
      
      {/* Preview or additional info */}
      <div className="mt-2 text-xs text-gray-400">
        Click to add to canvas
      </div>
    </div>
  );
}

// Component list item for list view
function ComponentListItem({ component, onSelect }) {
  return (
    <div
      onClick={() => onSelect?.(component)}
      className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded flex items-center justify-center flex-shrink-0">
        <component.icon className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{component.name}</div>
        <div className="text-xs text-gray-500 capitalize">
          {component.category.replace('-', ' ')}
        </div>
      </div>
    </div>
  );
}