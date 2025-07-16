'use client'

import React, { useState } from 'react'
import { Search, Filter, X, Zap, Star, Users } from 'lucide-react'

interface ComponentSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  searchStats: {
    total: number
    filtered: number
  }
}

export const ComponentSearch: React.FC<ComponentSearchProps> = ({
  searchQuery,
  onSearchChange,
  searchStats
}) => {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    complexity: 'all',
    features: [] as string[],
    premium: 'all'
  })

  const complexityOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ]

  const featureOptions = [
    { value: 'responsive', label: 'Responsive', icon: '📱' },
    { value: 'darkMode', label: 'Dark Mode', icon: '🌙' },
    { value: 'animations', label: 'Animations', icon: '✨' },
    { value: 'accessible', label: 'Accessible', icon: '♿' },
    { value: 'seoOptimized', label: 'SEO Optimized', icon: '🔍' }
  ]

  return (
    <div className="flex-1 max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search components, features, or categories..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded ${
            showFilters ? 'text-indigo-600 bg-indigo-100' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Search Stats */}
      {searchQuery && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Found {searchStats.filtered} of {searchStats.total} components
        </div>
      )}

      {/* Advanced Filters */}
      {showFilters && (
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Advanced Filters
            </h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Complexity Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Complexity Level
              </label>
              <select
                value={filters.complexity}
                onChange={(e) => setFilters(prev => ({ ...prev, complexity: e.target.value }))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              >
                {complexityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Feature Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Features
              </label>
              <div className="grid grid-cols-2 gap-2">
                {featureOptions.map(feature => (
                  <label key={feature.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.features.includes(feature.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters(prev => ({
                            ...prev,
                            features: [...prev.features, feature.value]
                          }))
                        } else {
                          setFilters(prev => ({
                            ...prev,
                            features: prev.features.filter(f => f !== feature.value)
                          }))
                        }
                      }}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {feature.icon} {feature.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 pt-2">
              <button className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs hover:bg-indigo-200">
                <Zap className="w-3 h-3 inline mr-1" />
                High Performance
              </button>
              <button className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs hover:bg-yellow-200">
                <Star className="w-3 h-3 inline mr-1" />
                Most Popular
              </button>
              <button className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs hover:bg-green-200">
                <Users className="w-3 h-3 inline mr-1" />
                Community Favorites
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}