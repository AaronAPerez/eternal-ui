import React from 'react';
import { GridConfig } from '@/hooks/useBuilderLayout';
import { Grid, Eye, EyeOff, Settings } from 'lucide-react';

interface GridControlsPanelProps {
  gridConfig: GridConfig;
  theme: 'light' | 'dark';
  onConfigChange: (updates: Partial<GridConfig>) => void;
  onToggleOutlines: () => void;
  showOutlines: boolean;
}

const GridControlsPanel: React.FC<GridControlsPanelProps> = ({
  gridConfig,
  theme,
  onConfigChange,
  onToggleOutlines,
  showOutlines
}) => {
  return (
    <div className="builder-grid-controls">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Grid className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">Grid Settings</span>
          </div>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={gridConfig.visible}
              onChange={(e) => onConfigChange({ visible: e.target.checked })}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Show Grid</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={gridConfig.snapEnabled}
              onChange={(e) => onConfigChange({ snapEnabled: e.target.checked })}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Snap to Grid</span>
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Columns:</span>
            <input
              type="number"
              value={gridConfig.columns}
              onChange={(e) => onConfigChange({ columns: parseInt(e.target.value) })}
              className="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              min="1"
              max="24"
            />
          </label>

          <label className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Cell Size:</span>
            <input
              type="number"
              value={gridConfig.cellSize}
              onChange={(e) => onConfigChange({ cellSize: parseInt(e.target.value) })}
              className="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              min="10"
              max="200"
            />
          </label>

          <label className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Opacity:</span>
            <input
              type="range"
              value={gridConfig.opacity}
              onChange={(e) => onConfigChange({ opacity: parseFloat(e.target.value) })}
              className="w-20"
              min="0"
              max="1"
              step="0.1"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 w-8">
              {Math.round(gridConfig.opacity * 100)}%
            </span>
          </label>

          <button
            onClick={onToggleOutlines}
            className={`p-2 rounded ${showOutlines ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'}`}
            title="Toggle Section Outlines"
          >
            {showOutlines ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GridControlsPanel;
          