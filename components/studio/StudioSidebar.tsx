'use client';

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { ComponentLibrary } from './ComponentLibrary';
import { IntegratedAIGenerator } from './AIGenerator/IntegratedAIGenerator';

interface StudioSidebarProps {
  onAddElement: (component: null, position?: { x: number; y: number }) => void;
  onAIGeneration: (component: null) => void;
  existingElements: null[];
  onClose: () => void;
  isMobile?: boolean;
}

export function StudioSidebar({ 
  onAddElement, 
  onAIGeneration, 
  existingElements, 
  onClose,
  isMobile = false
}: StudioSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'components' | 'ai'>('ai');

  return (
    <div className={`
      ${isMobile ? 'w-80 max-w-[90vw]' : 'w-80'} 
      bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
      flex flex-col h-full shadow-lg
    `}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Design Tools
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'ai'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            AI Generator
          </button>
          <button
            onClick={() => setActiveTab('components')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'components'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Components
          </button>
        </div>

        {/* Search Bar - Only show for components tab */}
        {activeTab === 'components' && (
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        )}
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'ai' ? (
          <div className="p-4">
            <IntegratedAIGenerator
              onComponentGenerate={onAIGeneration}
              existingElements={existingElements}
            />
          </div>
        ) : (
          <ComponentLibrary
            searchTerm={searchTerm}
            onAddComponent={onAddElement}
            existingElements={existingElements}
          />
        )}
      </div>
    </div>
  );
}
