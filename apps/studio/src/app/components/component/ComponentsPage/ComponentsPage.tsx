'use client'

import React, { useState, useMemo } from 'react'
import { Search, Filter, Grid, List, Zap, Star } from 'lucide-react'
import { ComponentSearch } from './ComponentSearch'
import { ComponentCategories } from './ComponentCategories'
import { ComponentGrid } from './ComponentGrid'
import { ComponentPreview } from './ComponentPreview'
import { componentCategories } from '@/data/categories'
import { useComponentSearch } from '@/hooks/useComponentSearch'
import { componentRegistry } from '@/data/components'


interface ComponentsPageProps {
  initialCategory?: string
}

export const ComponentsPage: React.FC<ComponentsPageProps> = ({
  initialCategory = 'all'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showPreview, setShowPreview] = useState(false)

  const {
    searchQuery,
    setSearchQuery,
    filteredComponents,
    searchStats
  } = useComponentSearch(componentRegistry, selectedCategory)

  // Component statistics
  const stats = useMemo(() => ({
    total: componentRegistry.length,
    categories: componentCategories.length,
    premium: componentRegistry.filter(c => c.premium).length,
    popular: componentRegistry.filter(c => c.popularity > 90).length
  }), [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Component Library
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Professional-grade components for modern web development
              </p>
            </div>
            
            {/* Stats */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{stats.total}</div>
                <div className="text-sm text-gray-500">Components</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.categories}</div>
                <div className="text-sm text-gray-500">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.popular}</div>
                <div className="text-sm text-gray-500">Popular</div>
              </div>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <ComponentSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              searchStats={searchStats}
            />
            
            <div className="flex items-center space-x-3">
              {/* View Mode Toggle */}
              <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid'
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list'
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Premium Filter */}
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">Premium</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <ComponentCategories
              categories={componentCategories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <ComponentGrid
              components={filteredComponents}
              viewMode={viewMode}
              onComponentSelect={(id) => {
                setSelectedComponent(id)
                setShowPreview(true)
              }}
            />
          </div>
        </div>
      </div>

      {/* Component Preview Modal */}
      {showPreview && selectedComponent && (
        <ComponentPreview
          componentId={selectedComponent}
          onClose={() => {
            setShowPreview(false)
            setSelectedComponent(null)
          }}
        />
      )}
    </div>
  )
}