'use client';

import React, { useState } from 'react';
import { Download, FileCode, Code, Globe, Database, X } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: string) => void;
  elements: any[];
}

export const ExportModal: React.FC<ExportModalProps> = ({ 
  isOpen, 
  onClose, 
  onExport, 
  elements 
}) => {
  const [selectedFormat, setSelectedFormat] = useState('react');
  const [includeStyles, setIncludeStyles] = useState(true);
  const [minifyCode, setMinifyCode] = useState(false);

  const exportFormats = [
    { 
      id: 'react', 
      name: 'React Components', 
      description: 'Clean React functional components with TypeScript',
      icon: Code,
      extension: '.tsx',
      color: 'bg-blue-500'
    },
    { 
      id: 'vue', 
      name: 'Vue Components', 
      description: 'Vue.js single-file components',
      icon: Code,
      extension: '.vue',
      color: 'bg-green-500'
    },
    { 
      id: 'angular', 
      name: 'Angular Components', 
      description: 'Angular components with TypeScript',
      icon: Code,
      extension: '.ts',
      color: 'bg-red-500'
    },
    { 
      id: 'html', 
      name: 'Static HTML', 
      description: 'Pure HTML with CSS styling',
      icon: Globe,
      extension: '.html',
      color: 'bg-orange-500'
    },
    { 
      id: 'json', 
      name: 'JSON Data', 
      description: 'Raw element data for further processing',
      icon: Database,
      extension: '.json',
      color: 'bg-purple-500'
    }
  ];

  const handleExport = () => {
    onExport(selectedFormat);
  };

  const selectedFormatData = exportFormats.find(f => f.id === selectedFormat);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Export Project
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Export your design to production-ready code
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Export Statistics */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Export Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {elements.length}
              </div>
              <div className="text-gray-500 dark:text-gray-400">Total Elements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {elements.filter(el => el.metadata?.isAIGenerated).length}
              </div>
              <div className="text-gray-500 dark:text-gray-400">AI Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {new Set(elements.map(el => el.type)).size}
              </div>
              <div className="text-gray-500 dark:text-gray-400">Components</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {Math.max(...elements.map(el => el.zIndex || 1), 0)}
              </div>
              <div className="text-gray-500 dark:text-gray-400">Max Layers</div>
            </div>
          </div>
        </div>

        {/* Format Selection */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Choose Export Format
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exportFormats.map(format => {
              const IconComponent = format.icon;
              return (
                <div
                  key={format.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedFormat === format.id
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedFormat(format.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 ${format.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {format.name}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {format.extension}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {format.description}
                      </p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedFormat === format.id
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {selectedFormat === format.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Export Options */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Export Options
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Include Inline Styles
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Include CSS styles directly in components
                </p>
              </div>
              <input
                type="checkbox"
                checked={includeStyles}
                onChange={(e) => setIncludeStyles(e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Minify Code
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Compress generated code for production
                </p>
              </div>
              <input
                type="checkbox"
                checked={minifyCode}
                onChange={(e) => setMinifyCode(e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {selectedFormatData && (
              <>Exporting as {selectedFormatData.name} ({selectedFormatData.extension})</>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleExport} className="gap-2">
              <Download className="w-4 h-4" />
              Export {selectedFormatData?.name}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
