'use client';

import React from 'react';
import { 
  Layout, Grid, Library, Settings, Monitor, Tablet, Smartphone,
  ZoomIn, ZoomOut, RotateCcw, Maximize2, Sun, Moon, Save, Download,
  Eye, Code, Share, Undo, Redo, Play, Settings2
} from 'lucide-react';

interface BuilderToolbarProps {
  currentMode: string;
  currentViewport: any;
  zoomLevel: number;
  canZoomIn: boolean;
  canZoomOut: boolean;
  theme: 'light' | 'dark';
  showGridControls: boolean;
  showComponentLibrary: boolean;
  gridVisible: boolean;
  viewportSizes: any[];
  builderModes: any[];
  onModeChange: (mode: string) => void;
  onViewportChange: (viewport: any) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onFitToScreen: () => void;
  onToggleGrid: () => void;
  onToggleLibrary: () => void;
  onToggleTheme: () => void;
}

/**
 * Enhanced Builder Toolbar Component
 * 
 * Professional toolbar with all builder controls:
 * - Mode switching (Visual, Grid, Components, Advanced)
 * - Viewport controls (Desktop, Tablet, Mobile)
 * - Zoom controls with keyboard shortcuts
 * - Grid system toggle
 * - Theme switching
 * - Save/Export functionality
 * - Accessibility features
 */
const BuilderToolbar: React.FC<BuilderToolbarProps> = ({
  currentMode,
  currentViewport,
  zoomLevel,
  canZoomIn,
  canZoomOut,
  theme,
  showGridControls,
  showComponentLibrary,
  gridVisible,
  viewportSizes,
  builderModes,
  onModeChange,
  onViewportChange,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onFitToScreen,
  onToggleGrid,
  onToggleLibrary,
  onToggleTheme
}) => {
  return (
    <div className="builder-toolbar bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between shadow-sm">
      {/* Left Section - Logo & Mode Switcher */}
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-lg flex items-center justify-center">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-gray-900 dark:text-white">Eternal UI</span>
        </div>
        
        {/* Mode Switcher */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {builderModes.map((mode) => {
            const IconComponent = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => onModeChange(mode.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center space-x-2 ${
                  currentMode === mode.id 
                    ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
                title={mode.description}
                aria-label={`Switch to ${mode.name} mode`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{mode.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Center Section - Viewport & Zoom Controls */}
      <div className="flex items-center space-x-4">
        {/* Viewport Selector */}
        <div className="flex items-center space-x-2">
          <select
            value={currentViewport.name}
            onChange={(e) => {
              const viewport = viewportSizes.find(v => v.name === e.target.value);
              if (viewport) onViewportChange(viewport);
            }}
            className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            aria-label="Select viewport size"
          >
            <optgroup label="Desktop">
              {viewportSizes.filter(v => v.category === 'desktop').map(viewport => (
                <option key={viewport.name} value={viewport.name}>
                  {viewport.name} ({viewport.width}×{viewport.height})
                </option>
              ))}
            </optgroup>
            <optgroup label="Tablet">
              {viewportSizes.filter(v => v.category === 'tablet').map(viewport => (
                <option key={viewport.name} value={viewport.name}>
                  {viewport.name} ({viewport.width}×{viewport.height})
                </option>
              ))}
            </optgroup>
            <optgroup label="Mobile">
              {viewportSizes.filter(v => v.category === 'mobile').map(viewport => (
                <option key={viewport.name} value={viewport.name}>
                  {viewport.name} ({viewport.width}×{viewport.height})
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={onZoomOut}
            disabled={!canZoomOut}
            className="p-1.5 rounded text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Zoom out (Ctrl+-)"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          
          <button
            onClick={onResetZoom}
            className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 min-w-[60px]"
            title="Reset zoom (Ctrl+0)"
            aria-label={`Current zoom: ${Math.round(zoomLevel * 100)}%`}
          >
            {Math.round(zoomLevel * 100)}%
          </button>
          
          <button
            onClick={onZoomIn}
            disabled={!canZoomIn}
            className="p-1.5 rounded text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Zoom in (Ctrl++)"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          
          <button
            onClick={onFitToScreen}
            className="p-1.5 rounded text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            title="Fit to screen"
            aria-label="Fit to screen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right Section - Actions & Settings */}
      <div className="flex items-center space-x-2">
        {/* Grid Toggle */}
        <button
          onClick={onToggleGrid}
          className={`p-2 rounded-lg transition-colors ${
            gridVisible
              ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          title="Toggle grid (G)"
          aria-label={`${gridVisible ? 'Hide' : 'Show'} grid`}
        >
          <Grid className="w-4 h-4" />
        </button>

        {/* Component Library Toggle */}
        <button
          onClick={onToggleLibrary}
          className={`p-2 rounded-lg transition-colors ${
            showComponentLibrary
              ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          title="Toggle component library"
          aria-label={`${showComponentLibrary ? 'Hide' : 'Show'} component library`}
        >
          <Library className="w-4 h-4" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-600" />

        {/* Action Buttons */}
        <button
          className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Preview (Ctrl+P)"
          aria-label="Preview design"
        >
          <Eye className="w-4 h-4" />
        </button>

        <button
          className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          title="View code (Ctrl+<)"
          aria-label="View generated code"
        >
          <Code className="w-4 h-4" />
        </button>

        <button
          className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Save (Ctrl+S)"
          aria-label="Save project"
        >
          <Save className="w-4 h-4" />
        </button>

        <button
          className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Export"
          aria-label="Export project"
        >
          <Download className="w-4 h-4" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme (T)`}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default BuilderToolbar;