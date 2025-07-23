'use client';

import { useState } from 'react';
import { Search, Brain, Layers } from 'lucide-react';
import { IntegratedAIGenerator } from './AIGenerator/IntegratedAIGenerator';
import { ComponentLibrary } from './ComponentLibrary';
import { useStudio } from './StudioProvide';


interface StudioSidebarProps {
  isOpen: boolean;
  existingElements: any[];
}

export function StudioSidebar({ isOpen, existingElements }: StudioSidebarProps) {
  const [activeTab, setActiveTab] = useState<'ai' | 'components'>('ai');
  const [searchTerm, setSearchTerm] = useState('');
  const { addElement } = useStudio();

  if (!isOpen) {
    return (
      <div className="w-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-4 gap-4">
        <button
          onClick={() => setActiveTab('ai')}
          className={`p-3 rounded-lg transition-colors ${
            activeTab === 'ai' 
              ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title="AI Generator"
        >
          <Brain className="w-5 h-5" />
        </button>
        <button
          onClick={() => setActiveTab('components')}
          className={`p-3 rounded-lg transition-colors ${
            activeTab === 'components' 
              ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title="Component Library"
        >
          <Layers className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'ai'
                ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Brain className="w-4 h-4 inline mr-2" />
            AI Generator
          </button>
          <button
            onClick={() => setActiveTab('components')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'components'
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 inline mr-2" />
            Components
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'ai' ? (
          <div className="p-4">
            <IntegratedAIGenerator
              onComponentGenerate={(component) => {
                addElement(component, {
                  x: Math.random() * 300 + 100,
                  y: Math.random() * 200 + 100,
                });
              }}
              existingComponents={existingElements}
            />
          </div>
        ) : (
          <ComponentLibrary
            searchTerm={searchTerm}
            onAddComponent={addElement}
            existingElements={existingElements}
          />
        )}
      </div>

      {/* Sidebar Footer */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-3 gap-2 text-xs text-center">
          <div>
            <div className="font-semibold text-indigo-600 dark:text-indigo-400">
              {existingElements.length}
            </div>
            <div className="text-gray-500 dark:text-gray-400">Total</div>
          </div>
          <div>
            <div className="font-semibold text-purple-600 dark:text-purple-400">
              {existingElements.filter(el => el.metadata?.isAIGenerated).length}
            </div>
            <div className="text-gray-500 dark:text-gray-400">AI Generated</div>
          </div>
          <div>
            <div className="font-semibold text-green-600 dark:text-green-400">
              80+
            </div>
            <div className="text-gray-500 dark:text-gray-400">Available</div>
          </div>
        </div>
      </div>
    </div>
  );
}