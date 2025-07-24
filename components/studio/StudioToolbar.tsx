'use client';

import React from 'react';
import { 
  Monitor, Tablet, Smartphone, Save, Eye, Code, Download,
  Undo, Redo, Menu, X, Users, Zap, Brain, Loader, Plus,
  Minus, RotateCcw, Grid, Move, Share, Settings, Layers
} from 'lucide-react';
import { EternalUILogo, ThemeToggle } from '@/components/ui';

interface StudioToolbarProps {
  canvasMode: 'desktop' | 'tablet' | 'mobile';
  onCanvasModeChange: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  onSidebarToggle: () => void;
  sidebarOpen: boolean;
  elementsCount: number;
  aiElementsCount: number;
  isLoading: boolean;
  onSave: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  projectId?: string;
  onPropertiesToggle: () => void;
  propertiesOpen: boolean;
  isMobile: boolean;
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
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  zoom,
  onZoomChange,
  projectId,
  onPropertiesToggle,
  propertiesOpen,
  isMobile
}: StudioToolbarProps) {
  const zoomPercentage = Math.round(zoom * 100);

  return (
    <div className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-2 sm:px-4 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Sidebar Toggle */}
        <button
          onClick={onSidebarToggle}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        {/* Logo */}
        <div className="hidden sm:block">
          <EternalUILogo size="sm" asLink href="/" />
        </div>

        {/* Mobile Logo */}
        <div className="sm:hidden">
          <EternalUILogo size="xs" showText={false} asLink href="/" />
        </div>

        {/* Project Info */}
        {projectId && !isMobile && (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Project: {projectId.slice(0, 8)}...
          </div>
        )}

        {/* History Controls */}
        <div className="hidden md:flex items-center gap-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Undo"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Redo"
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Section - Device Preview */}
      <div className="hidden md:flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        <button
          onClick={() => onCanvasModeChange('desktop')}
          className={`p-2 rounded transition-colors ${
            canvasMode === 'desktop'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          aria-label="Desktop view"
          title="Desktop (1024px+)"
        >
          <Monitor className="w-4 h-4" />
        </button>
        <button
          onClick={() => onCanvasModeChange('tablet')}
          className={`p-2 rounded transition-colors ${
            canvasMode === 'tablet'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          aria-label="Tablet view"
          title="Tablet (768px)"
        >
          <Tablet className="w-4 h-4" />
        </button>
        <button
          onClick={() => onCanvasModeChange('mobile')}
          className={`p-2 rounded transition-colors ${
            canvasMode === 'mobile'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          aria-label="Mobile view"
          title="Mobile (375px)"
        >
          <Smartphone className="w-4 h-4" />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Stats - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mr-2">
          <div className="flex items-center gap-1">
            <Grid className="w-3 h-3" />
            <span>{elementsCount}</span>
          </div>
          {aiElementsCount > 0 && (
            <div className="flex items-center gap-1">
              <Brain className="w-3 h-3 text-purple-600" />
              <span>{aiElementsCount}</span>
            </div>
          )}
        </div>

        {/* Zoom Controls - Hidden on mobile */}
        <div className="hidden sm:flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => onZoomChange(Math.max(0.1, zoom - 0.1))}
            className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded"
            aria-label="Zoom out"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="px-2 text-xs font-medium text-gray-700 dark:text-gray-300 min-w-[3rem] text-center">
            {zoomPercentage}%
          </span>
          <button
            onClick={() => onZoomChange(Math.min(5, zoom + 0.1))}
            className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded"
            aria-label="Zoom in"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        {/* Properties Toggle - Mobile Only */}
        {isMobile && (
          <button
            onClick={onPropertiesToggle}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            aria-label="Toggle properties panel"
          >
            <Layers className="w-4 h-4" />
          </button>
        )}

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Save Button */}
        <button
          onClick={onSave}
          disabled={isLoading}
          className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-md transition-colors text-sm font-medium"
          aria-label={isLoading ? 'Saving...' : 'Save project'}
        >
          {isLoading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">{isLoading ? 'Saving...' : 'Save'}</span>
        </button>
      </div>
    </div>
  );
}