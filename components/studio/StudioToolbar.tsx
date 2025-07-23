'use client';

import { 
  Monitor, Tablet, Smartphone, Save, Eye, Code, Download,
  Undo, Redo, Menu, X, Users, Zap, Brain, Loader
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useStudio } from './StudioProvider';

interface StudioToolbarProps {
  canvasMode: 'desktop' | 'tablet' | 'mobile';
  onCanvasModeChange: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  onSidebarToggle: () => void;
  sidebarOpen: boolean;
  elementsCount: number;
  aiElementsCount: number;
  isLoading: boolean;
  onSave: () => void;
}

export function StudioToolbar({
  canvasMode,
  onCanvasModeChange,
  onSidebarToggle,
  sidebarOpen,
  elementsCount,
  aiElementsCount,
  isLoading,
  onSave,
}: StudioToolbarProps) {
  const { undo, redo, history, historyIndex } = useStudio();

  return (
    <div className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onSidebarToggle}
          className="p-2"
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">
            Eternal UI Pro
          </span>
        </div>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

        {/* Undo/Redo */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={undo}
            disabled={historyIndex <= 0}
            className="p-2"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="p-2"
          >
            <Redo className="w-4 h-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

        {/* Device Preview */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCanvasModeChange('desktop')}
            className={`p-2 ${canvasMode === 'desktop' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCanvasModeChange('tablet')}
            className={`p-2 ${canvasMode === 'tablet' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCanvasModeChange('mobile')}
            className={`p-2 ${canvasMode === 'mobile' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>{elementsCount} components</span>
          {aiElementsCount > 0 && (
            <div className="flex items-center gap-1">
              <Brain className="w-4 h-4 text-purple-500" />
              <span>{aiElementsCount} AI</span>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <Eye className="w-4 h-4 mr-1" />
          Preview
        </Button>
        
        <Button variant="ghost" size="sm">
          <Code className="w-4 h-4 mr-1" />
          Export
        </Button>

        <Button variant="ghost" size="sm">
          <Users className="w-4 h-4 mr-1" />
          Share
        </Button>

        <Button 
          onClick={onSave}
          disabled={isLoading}
          className="bg-indigo-500 hover:bg-indigo-600 text-white"
        >
          {isLoading ? (
            <Loader className="w-4 h-4 mr-1 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-1" />
          )}
          Save
        </Button>
      </div>
    </div>
  );
}