import React from 'react';
import { ViewportSize } from '@/hooks/useBuilderLayout';
import { Globe, ZoomOut, ZoomIn, Maximize, Grid, Library, Moon, Sun, Eye, Code, Save, Download } from 'lucide-react';

interface BuilderToolbarProps {
  currentViewport: ViewportSize;
  zoomLevel: number;
  canZoomIn: boolean;
  canZoomOut: boolean;
  theme: 'light' | 'dark';
  showGridControls: boolean;
  showComponentLibrary: boolean;
  gridVisible: boolean;
  viewportSizes: ViewportSize[];
  onViewportChange: (viewport: ViewportSize) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onFitToScreen: () => void;
  onToggleGrid: () => void;
  onToggleLibrary: () => void;
  onToggleTheme: () => void;
}

const BuilderToolbar: React.FC<BuilderToolbarProps> = ({
  currentViewport,
  zoomLevel,
  canZoomIn,
  canZoomOut,
  theme,
  showGridControls,
  showComponentLibrary,
  gridVisible,
  viewportSizes,
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
    <div className="builder-toolbar">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
            <span className="font-semibold text-gray-900 dark:text-gray-100">Website Builder</span>
          </div>

          {/* Viewport Selector */}
          <div className="flex items-center space-x-2 border-l border-gray-200 dark:border-gray-700 pl-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Viewport:</span>
            <select
              value={`${currentViewport.width}x${currentViewport.height}`}
              onChange={(e) => {
                const [width, height] = e.target.value.split('x').map(Number);
                const viewport = viewportSizes.find(v => v.width === width && v.height === height);
                if (viewport) onViewportChange(viewport);
              }}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {viewportSizes.map(viewport => (
                <option key={`${viewport.width}x${viewport.height}`} value={`${viewport.width}x${viewport.height}`}>
                  {viewport.name} ({viewport.width}×{viewport.height})
                </option>
              ))}
            </select>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2 border-l border-gray-200 dark:border-gray-700 pl-4">
            <button
              onClick={onZoomOut}
              disabled={!canZoomOut}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-50"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            
            <button
              onClick={onResetZoom}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 min-w-[3rem] text-center px-1"
              title="Reset Zoom"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            
            <button
              onClick={onZoomIn}
              disabled={!canZoomIn}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-50"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            
            <button
              onClick={onFitToScreen}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              title="Fit to Screen"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleGrid}
            className={`p-2 rounded ${gridVisible ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'}`}
            title="Toggle Grid"
          >
            <Grid className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleLibrary}
            className={`p-2 rounded ${showComponentLibrary ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'}`}
            title="Toggle Component Library"
          >
            <Library className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleTheme}
            className="p-2 rounded text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            title="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />

          <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Eye className="w-4 h-4" />
            <span className="text-sm">Preview</span>
          </button>
          
          <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Code className="w-4 h-4" />
            <span className="text-sm">Code</span>
          </button>
          
          <button className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Save className="w-4 h-4" />
            <span className="text-sm">Save</span>
          </button>
          
          <button className="flex items-center space-x-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuilderToolbar;