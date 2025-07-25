'use client';

import { useState } from 'react';
import { Settings, Trash2, Copy, X } from 'lucide-react';

interface PropertyPanelProps {
  component: any;
  onPropsChange: (props: Record<string, any>) => void;
  onStyleChange: (style: Record<string, any>) => void;
  onDelete: () => void;
  onDuplicate?: () => void;
}

export function PropertyPanel({ 
  component, 
  onPropsChange, 
  onStyleChange, 
  onDelete,
  onDuplicate 
}: PropertyPanelProps) {
  const [activeTab, setActiveTab] = useState<'props' | 'style'>('props');

  if (!component) return null;

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 h-full overflow-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Properties
          </h3>
          <div className="flex items-center gap-1">
            {onDuplicate && (
              <button
                onClick={onDuplicate}
                className="p-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                title="Duplicate"
              >
                <Copy className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onDelete}
              className="p-1 text-red-600 hover:text-red-700"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          {component.component.name}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mt-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('props')}
            className={`flex-1 px-3 py-1 text-sm rounded ${
              activeTab === 'props'
                ? 'bg-white dark:bg-gray-600 shadow'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Props
          </button>
          <button
            onClick={() => setActiveTab('style')}
            className={`flex-1 px-3 py-1 text-sm rounded ${
              activeTab === 'style'
                ? 'bg-white dark:bg-gray-600 shadow'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Style
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'props' ? (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Component Props</h4>
            {Object.entries(component.props || {}).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {key}
                </label>
                <input
                  type="text"
                  value={String(value)}
                  onChange={(e) => {
                    onPropsChange({
                      ...component.props,
                      [key]: e.target.value
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Component Style</h4>
            
            {/* Position */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  X Position
                </label>
                <input
                  type="number"
                  value={component.x}
                  onChange={(e) => {
                    // Handle position change
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Y Position
                </label>
                <input
                  type="number"
                  value={component.y}
                  onChange={(e) => {
                    // Handle position change
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Size */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Width
                </label>
                <input
                  type="number"
                  value={component.width}
                  onChange={(e) => {
                    // Handle size change
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Height
                </label>
                <input
                  type="number"
                  value={component.height}
                  onChange={(e) => {
                    // Handle size change
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}