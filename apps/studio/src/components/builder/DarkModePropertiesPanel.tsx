import React from 'react';
import { 
  Palette,
  Move,
  Maximize2,
  RotateCcw,
  Copy,
  Eye,
  EyeOff,
  Type,
  Box,
  Layout,
  Settings
} from 'lucide-react';

// Types for the Properties Panel
interface CanvasComponent {
  id: string;
  type: string;
  content: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  styles: Record<string, string>;
  isMinimized?: boolean;
}

interface GridConfig {
  visible: boolean;
  snapEnabled: boolean;
  columns: number;
  rows: number;
  cellSize: number;
  gap: number;
  opacity: number;
  color: string;
  style: 'lines' | 'dots' | 'solid';
}

interface GridSection {
  id: string;
  name: string;
  startCol: number;
  endCol: number;
  startRow: number;
  endRow: number;
  color: string;
  visible: boolean;
}

interface DarkModePropertiesPanelProps {
  component: CanvasComponent;
  onUpdate: (updates: Partial<CanvasComponent>) => void;
  gridConfig: GridConfig;
  sections: GridSection[];
  theme: 'light' | 'dark';
}

/**
 * Enhanced Properties Panel Component
 * Professional-grade component property editor with comprehensive controls
 * 
 * Features:
 * - Content editing (text, type selection)
 * - Position and size controls with live preview
 * - Advanced styling options (colors, spacing, borders)
 * - Grid-aware positioning helpers
 * - Component state management
 * - Quick action buttons for common operations
 * - Accessibility features and keyboard shortcuts
 */
const DarkModePropertiesPanel: React.FC<DarkModePropertiesPanelProps> = ({ 
  component, 
  onUpdate, 
  gridConfig, 
  sections, 
  theme 
}) => {
  if (!component) {
    return (
      <div className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300 overflow-y-auto">
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          <Box className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-sm">Select a component to edit its properties</p>
        </div>
      </div>
    );
  }

  // Helper function to get component type options
  const componentTypes = [
    { value: 'button', label: 'Button', icon: '🔘' },
    { value: 'text', label: 'Text', icon: '📝' },
    { value: 'card', label: 'Card', icon: '🃏' },
    { value: 'image', label: 'Image', icon: '🖼️' },
    { value: 'input', label: 'Input', icon: '📝' },
    { value: 'container', label: 'Container', icon: '📦' },
    { value: 'header', label: 'Header', icon: '📰' },
    { value: 'navigation', label: 'Navigation', icon: '🧭' }
  ];

  // Helper function to calculate grid position
  const getGridPosition = () => {
    const cellWithGap = gridConfig.cellSize + gridConfig.gap;
    const gridCol = Math.round(component.position.x / cellWithGap) + 1;
    const gridRow = Math.round(component.position.y / cellWithGap) + 1;
    return { col: gridCol, row: gridRow };
  };

  // Helper function to snap to grid
  const snapToGrid = (x: number, y: number) => {
    const cellWithGap = gridConfig.cellSize + gridConfig.gap;
    return {
      x: Math.round(x / cellWithGap) * cellWithGap,
      y: Math.round(y / cellWithGap) * cellWithGap
    };
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 transition-colors duration-300 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-indigo-500 dark:text-indigo-400" />
            Properties
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              {component.id}
            </span>
            <div className={`w-2 h-2 rounded-full ${component.isMinimized ? 'bg-orange-500' : 'bg-green-500'}`} />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Component Information */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
            <Type className="w-4 h-4 mr-2" />
            Component Details
          </h4>
          <div className="space-y-3">
            {/* Component Type */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Type</label>
              <select
                value={component.type}
                onChange={(e) => onUpdate({ type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
              >
                {componentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Component Content */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Content</label>
              <textarea
                value={component.content}
                onChange={(e) => onUpdate({ content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors resize-none"
                rows={3}
                placeholder="Enter component content..."
              />
            </div>
          </div>
        </div>

        {/* Position & Size */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
            <Move className="w-4 h-4 mr-2" />
            Position & Size
          </h4>
          
          {/* Grid Position Display */}
          <div className="mb-3 p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <div className="text-xs text-indigo-600 dark:text-indigo-400 mb-1">Grid Position</div>
            <div className="text-sm font-mono text-indigo-800 dark:text-indigo-200">
              Col {getGridPosition().col}, Row {getGridPosition().row}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Position Controls */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">X Position</label>
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  value={component.position.x}
                  onChange={(e) => onUpdate({ 
                    position: { ...component.position, x: parseInt(e.target.value) || 0 }
                  })}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <button
                  onClick={() => {
                    const snapped = snapToGrid(component.position.x, component.position.y);
                    onUpdate({ position: snapped });
                  }}
                  className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                  title="Snap to grid"
                >
                  <Layout className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Y Position</label>
              <input
                type="number"
                value={component.position.y}
                onChange={(e) => onUpdate({ 
                  position: { ...component.position, y: parseInt(e.target.value) || 0 }
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            
            {/* Size Controls */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Width</label>
              <input
                type="number"
                min="50"
                value={component.size.width}
                onChange={(e) => onUpdate({ 
                  size: { ...component.size, width: Math.max(50, parseInt(e.target.value) || 50) }
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Height</label>
              <input
                type="number"
                min="30"
                value={component.size.height}
                onChange={(e) => onUpdate({ 
                  size: { ...component.size, height: Math.max(30, parseInt(e.target.value) || 30) }
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Styling */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Styling
          </h4>
          <div className="space-y-4">
            {/* Background Color */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Background Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={component.styles.backgroundColor || (theme === 'dark' ? '#374151' : '#ffffff')}
                  onChange={(e) => onUpdate({ 
                    styles: { ...component.styles, backgroundColor: e.target.value }
                  })}
                  className="w-12 h-10 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
                />
                <input
                  type="text"
                  value={component.styles.backgroundColor || (theme === 'dark' ? '#374151' : '#ffffff')}
                  onChange={(e) => onUpdate({ 
                    styles: { ...component.styles, backgroundColor: e.target.value }
                  })}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono"
                  placeholder="#ffffff"
                />
              </div>
            </div>
            
            {/* Text Color */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Text Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={component.styles.color || (theme === 'dark' ? '#f3f4f6' : '#111827')}
                  onChange={(e) => onUpdate({ 
                    styles: { ...component.styles, color: e.target.value }
                  })}
                  className="w-12 h-10 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
                />
                <input
                  type="text"
                  value={component.styles.color || (theme === 'dark' ? '#f3f4f6' : '#111827')}
                  onChange={(e) => onUpdate({ 
                    styles: { ...component.styles, color: e.target.value }
                  })}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono"
                  placeholder="#111827"
                />
              </div>
            </div>

            {/* Border Radius */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                Border Radius: {component.styles.borderRadius || '8px'}
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={parseInt(component.styles.borderRadius?.replace('px', '') || '8')}
                onChange={(e) => onUpdate({ 
                  styles: { ...component.styles, borderRadius: `${e.target.value}px` }
                })}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${(parseInt(component.styles.borderRadius?.replace('px', '') || '8') / 50) * 100}%, #e5e7eb ${(parseInt(component.styles.borderRadius?.replace('px', '') || '8') / 50) * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>

            {/* Padding */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                Padding: {component.styles.padding || '12px'}
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={parseInt(component.styles.padding?.replace('px', '') || '12')}
                onChange={(e) => onUpdate({ 
                  styles: { ...component.styles, padding: `${e.target.value}px` }
                })}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${(parseInt(component.styles.padding?.replace('px', '') || '12') / 50) * 100}%, #e5e7eb ${(parseInt(component.styles.padding?.replace('px', '') || '12') / 50) * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>

            {/* Border */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Border</label>
              <input
                type="text"
                value={component.styles.border || '2px solid #6366f1'}
                onChange={(e) => onUpdate({ 
                  styles: { ...component.styles, border: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono"
                placeholder="2px solid #6366f1"
              />
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Font Size</label>
              <select
                value={component.styles.fontSize || '16px'}
                onChange={(e) => onUpdate({ 
                  styles: { ...component.styles, fontSize: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="12px">12px - Small</option>
                <option value="14px">14px - Normal</option>
                <option value="16px">16px - Medium</option>
                <option value="18px">18px - Large</option>
                <option value="20px">20px - X-Large</option>
                <option value="24px">24px - XX-Large</option>
              </select>
            </div>
          </div>
        </div>

        {/* Component State */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            Component State
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-2">
                {component.isMinimized ? (
                  <EyeOff className="w-4 h-4 text-orange-500" />
                ) : (
                  <Eye className="w-4 h-4 text-green-500" />
                )}
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {component.isMinimized ? 'Minimized' : 'Visible'}
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <div>ID: {component.id}</div>
                <div>Type: {component.type}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
            <RotateCcw className="w-4 h-4 mr-2" />
            Quick Actions
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onUpdate({ 
                position: { x: 0, y: 0 }
              })}
              className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-1"
            >
              <Move className="w-3 h-3" />
              <span>Reset Position</span>
            </button>
            
            <button
              onClick={() => onUpdate({ 
                size: { width: 150, height: 80 }
              })}
              className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-1"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Reset Size</span>
            </button>
            
            <button
              onClick={() => onUpdate({ 
                styles: {
                  backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                  color: theme === 'dark' ? '#f3f4f6' : '#111827',
                  border: '2px solid #6366f1',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '16px'
                }
              })}
              className="px-3 py-2 text-sm bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800/50 transition-colors flex items-center justify-center space-x-1"
            >
              <Palette className="w-3 h-3" />
              <span>Reset Styles</span>
            </button>

            <button
              onClick={() => {
                const duplicatedComponent = {
                  ...component,
                  id: `${component.id}-copy`,
                  position: {
                    x: component.position.x + 20,
                    y: component.position.y + 20
                  }
                };
                // This would need to be handled by parent component
                console.log('Duplicate component:', duplicatedComponent);
              }}
              className="px-3 py-2 text-sm bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors flex items-center justify-center space-x-1"
            >
              <Copy className="w-3 h-3" />
              <span>Duplicate</span>
            </button>
          </div>
        </div>

        {/* Grid Information */}
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
            <Layout className="w-4 h-4 mr-2" />
            Grid Information
          </h4>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <div className="flex justify-between">
              <span>Grid Size:</span>
              <span className="font-mono">{gridConfig.columns}×{gridConfig.rows}</span>
            </div>
            <div className="flex justify-between">
              <span>Cell Size:</span>
              <span className="font-mono">{gridConfig.cellSize}px</span>
            </div>
            <div className="flex justify-between">
              <span>Gap:</span>
              <span className="font-mono">{gridConfig.gap}px</span>
            </div>
            <div className="flex justify-between">
              <span>Snap:</span>
              <span className={`font-medium ${gridConfig.snapEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {gridConfig.snapEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
            Keyboard Shortcuts
          </h4>
          <div className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
            <div><kbd className="bg-blue-100 dark:bg-blue-800 px-1 rounded">Delete</kbd> Remove component</div>
            <div><kbd className="bg-blue-100 dark:bg-blue-800 px-1 rounded">Ctrl+D</kbd> Duplicate</div>
            <div><kbd className="bg-blue-100 dark:bg-blue-800 px-1 rounded">Ctrl+Z</kbd> Undo</div>
            <div><kbd className="bg-blue-100 dark:bg-blue-800 px-1 rounded">Arrow Keys</kbd> Fine positioning</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkModePropertiesPanel;