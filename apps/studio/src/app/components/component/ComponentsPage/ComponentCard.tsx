'use client'

import React from 'react'
import { 
  Star, 
  Download, 
  Eye, 
  Code, 
  Zap, 
  Shield, 
  Smartphone,
  Palette
} from 'lucide-react'
import { ComponentMetadata } from '@/data/components'


interface ComponentCardProps {
  component: ComponentMetadata
  viewMode: 'grid' | 'list'
  onClick: () => void
}

export const ComponentCard: React.FC<ComponentCardProps> = ({
  component,
  viewMode,
  onClick
}) => {
  const {
    name,
    description,
    category,
    tags,
    features,
    complexity,
    premium,
    popularity,
    performance
  } = component

  const complexityColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  }

  const featureIcons = {
    responsive: <Smartphone className="w-4 h-4" />,
    darkMode: <Palette className="w-4 h-4" />,
    accessible: <Shield className="w-4 h-4" />,
    performanceOptimized: <Zap className="w-4 h-4" />
  }

  if (viewMode === 'list') {
    return (
      <div 
        onClick={onClick}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-all cursor-pointer group"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {name}
              </h3>
              {premium && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  Premium
                </span>
              )}
              <span className={`px-2 py-1 text-xs rounded-full ${complexityColors[complexity]}`}>
                {complexity}
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {description}
            </p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{popularity}/100</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download className="w-4 h-4" />
                <span>{performance.bundleSize}KB</span>
              </div>
              <div className="flex items-center space-x-2">
                {Object.entries(featureIcons).map(([key, icon]) => 
                  features[key as keyof typeof features] && (
                    <div key={key} className="text-indigo-500" title={key}>
                      {icon}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2 ml-4">
            <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded transition-colors">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded transition-colors">
              <Code className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-all cursor-pointer group overflow-hidden"
    >
      {/* Component Preview */}
      <div className="h-48 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
        <div className="text-4xl opacity-60">
          {category === 'layout' && '🏗️'}
          {category === 'navigation' && '🧭'}
          {category === 'content' && '📄'}
          {category === 'forms' && '📝'}
          {category === 'marketing' && '📈'}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            {name}
          </h3>
          {premium && (
            <Star className="w-4 h-4 text-yellow-500" />
          )}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
              +{tags.length - 3}
            </span>
          )}
        </div>
        
        {/* Features and Stats */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {Object.entries(featureIcons).slice(0, 3).map(([key, icon]) => 
              features[key as keyof typeof features] && (
                <div key={key} className="text-indigo-500" title={key}>
                  {icon}
                </div>
              )
            )}
          </div>
          
          <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
            <span className={`px-2 py-1 rounded-full ${complexityColors[complexity]}`}>
              {complexity}
            </span>
            <span>{popularity}★</span>
          </div>
        </div>
      </div>
    </div>
  )
}