import React from 'react';
import { 
  Plus, Copy, Trash2, AlignCenter, AlignLeft
} from 'lucide-react';

// Dark Mode Grid Configuration Tab
const DarkModeGridConfigTab = ({ gridConfig, setGridConfig, colorPresets, theme }) => {
  const gridMetrics = React.useMemo(() => {
    const { columns, rows, gap, cellSize } = gridConfig;
    const totalWidth = columns * cellSize + (columns - 1) * gap;
    const totalHeight = rows * cellSize + (rows - 1) * gap;
    
    return {
      totalWidth,
      totalHeight,
      cellWidth: cellSize,
      cellHeight: cellSize,
      columnWidth: cellSize + gap,
      rowHeight: cellSize + gap
    };
  }, [gridConfig]);

  return (
    <div className="space-y-6">
      {/* Grid Dimensions */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Grid Dimensions</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              Columns: {gridConfig.columns}
            </label>
            <input
              type="range"
              min="4"
              max="24"
              value={gridConfig.columns}
              onChange={(e) => setGridConfig(prev => ({ ...prev, columns: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>4</span>
              <span className="font-medium text-blue-600 dark:text-blue-400">{gridConfig.columns}</span>
              <span>24</span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              Rows: {gridConfig.rows}
            </label>
            <input
              type="range"
              min="4"
              max="20"
              value={gridConfig.rows}
              onChange={(e) => setGridConfig(prev => ({ ...prev, rows: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>4</span>
              <span className="font-medium text-blue-600 dark:text-blue-400">{gridConfig.rows}</span>
              <span>20</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cell Size & Gap */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Spacing</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              Cell Size: {gridConfig.cellSize}px
            </label>
            <input
              type="range"
              min="20"
              max="100"
              value={gridConfig.cellSize}
              onChange={(e) => setGridConfig(prev => ({ ...prev, cellSize: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>20px</span>
              <span>100px</span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              Gap: {gridConfig.gap}px
            </label>
            <input
              type="range"
              min="0"
              max="40"
              value={gridConfig.gap}
              onChange={(e) => setGridConfig(prev => ({ ...prev, gap: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>0px</span>
              <span>40px</span>
            </div>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Appearance</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Grid Color</label>
            <div className="grid grid-cols-4 gap-2">
              {colorPresets.map(color => (
                <button
                  key={color.value}
                  onClick={() => setGridConfig(prev => ({ ...prev, color: color.value }))}
                  className={`w-full h-10 rounded-lg border-2 transition-all duration-200 ${
                    gridConfig.color === color.value 
                      ? 'border-gray-700 dark:border-gray-300 scale-105 ring-2 ring-blue-500 dark:ring-blue-400' 
                      : 'border-gray-300 dark:border-gray-600 hover:scale-105 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
            
            {/* Custom Color Input */}
            <div className="mt-3">
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Custom Color</label>
              <input
                type="color"
                value={gridConfig.color}
                onChange={(e) => setGridConfig(prev => ({ ...prev, color: e.target.value }))}
                className="w-full h-8 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              Opacity: {Math.round(gridConfig.opacity * 100)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={gridConfig.opacity}
              onChange={(e) => setGridConfig(prev => ({ ...prev, opacity: parseFloat(e.target.value) }))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>10%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Type */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Grid Type</h3>
        <div className="space-y-2">
          {[
            { id: 'standard', name: 'Standard Grid', desc: 'Equal columns and rows' },
            { id: 'golden-ratio', name: 'Golden Ratio', desc: 'Proportional layout (1:1.618)' },
            { id: 'custom', name: 'Custom', desc: 'Define your own ratios' }
          ].map(type => (
            <button
              key={type.id}
              onClick={() => setGridConfig(prev => ({ ...prev, type: type.id }))}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                gridConfig.type === type.id 
                  ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-800'
              }`}
            >
              <div className="font-medium text-sm">{type.name}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{type.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Grid Info */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Grid Metrics</h4>
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
          <div className="flex justify-between">
            <span>Total Size:</span>
            <span className="font-mono">{gridMetrics.totalWidth} × {gridMetrics.totalHeight}px</span>
          </div>
          <div className="flex justify-between">
            <span>Cell Size:</span>
            <span className="font-mono">{gridMetrics.cellWidth} × {gridMetrics.cellHeight}px</span>
          </div>
          <div className="flex justify-between">
            <span>Total Cells:</span>
            <span className="font-mono">{gridConfig.columns × gridConfig.rows}</span>
          </div>
          <div className="flex justify-between">
            <span>Grid Ratio:</span>
            <span className="font-mono">{(gridConfig.columns / gridConfig.rows).toFixed(2)}:1</span>
          </div>
        </div>
      </div>

      {/* Quick Presets */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Quick Presets</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setGridConfig(prev => ({ ...prev, columns: 12, rows: 8, cellSize: 40, gap: 16 }))}
            className="p-3 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 bg-white dark:bg-gray-800"
          >
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Standard</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">12×8 Grid</div>
          </button>
          <button
            onClick={() => setGridConfig(prev => ({ ...prev, columns: 16, rows: 10, cellSize: 30, gap: 12 }))}
            className="p-3 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 bg-white dark:bg-gray-800"
          >
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Dense</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">16×10 Grid</div>
          </button>
          <button
            onClick={() => setGridConfig(prev => ({ ...prev, columns: 8, rows: 6, cellSize: 60, gap: 20 }))}
            className="p-3 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 bg-white dark:bg-gray-800"
          >
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Large</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">8×6 Grid</div>
          </button>
          <button
            onClick={() => setGridConfig(prev => ({ ...prev, columns: 13, rows: 8, cellSize: 40, gap: 16, type: 'golden-ratio' }))}
            className="p-3 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 bg-white dark:bg-gray-800"
          >
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Golden</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">1.618 Ratio</div>
          </button>
        </div>
      </div>
    </div>
  );
};

// Dark Mode Sections Configuration Tab
const DarkModeSectionsTab = ({ sections, setSections, gridConfig, theme }) => {
  const addSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      name: `Section ${sections.length + 1}`,
      startRow: Math.max(1, sections.length > 0 ? Math.max(...sections.map(s => s.endRow)) : 1),
      endRow: Math.min(gridConfig.rows, sections.length > 0 ? Math.max(...sections.map(s => s.endRow)) + 2 : 3),
      color: theme === 'dark' 
        ? `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)` 
        : `hsl(${Math.floor(Math.random() * 360)}, 60%, 50%)`
    };
    setSections(prev => [...prev, newSection]);
  };

  const updateSection = (id, updates) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const removeSection = (id) => {
    setSections(prev => prev.filter(s => s.id !== id));
  };

  const duplicateSection = (id) => {
    const section = sections.find(s => s.id === id);
    if (section) {
      const newSection = {
        ...section,
        id: `section-${Date.now()}`,
        name: `${section.name} Copy`,
        startRow: section.endRow,
        endRow: Math.min(gridConfig.rows, section.endRow + (section.endRow - section.startRow))
      };
      setSections(prev => [...prev, newSection]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Layout Sections</h3>
        <button
          onClick={addSection}
          className="flex items-center space-x-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg text-sm transition-colors duration-200"
        >
          <Plus className="w-3 h-3" />
          <span>Add Section</span>
        </button>
      </div>

      <div className="space-y-3">
        {sections.map((section, index) => (
          <div key={section.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 transition-colors duration-300">
            <div className="flex items-center justify-between mb-3">
              <input
                type="text"
                value={section.name}
                onChange={(e) => updateSection(section.id, { name: e.target.value })}
                className="text-sm font-medium bg-transparent border-0 p-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 text-gray-900 dark:text-gray-100 flex-1 mr-2"
              />
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => duplicateSection(section.id)}
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                  title="Duplicate Section"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeSection(section.id)}
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                  title="Delete Section"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Start Row</label>
                <input
                  type="number"
                  min="1"
                  max={gridConfig.rows}
                  value={section.startRow}
                  onChange={(e) => updateSection(section.id, { startRow: parseInt(e.target.value) })}
                  className="w-full text-xs border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">End Row</label>
                <input
                  type="number"
                  min="1"
                  max={gridConfig.rows}
                  value={section.endRow}
                  onChange={(e) => updateSection(section.id, { endRow: parseInt(e.target.value) })}
                  className="w-full text-xs border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Section Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={section.color}
                  onChange={(e) => updateSection(section.id, { color: e.target.value })}
                  className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={section.color}
                  onChange={(e) => updateSection(section.id, { color: e.target.value })}
                  className="flex-1 text-xs border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  placeholder="#000000"
                />
              </div>
            </div>

            {/* Section Info */}
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Height: {section.endRow - section.startRow} row{(section.endRow - section.startRow) !== 1 ? 's' : ''}
              {index === 0 && <span className="ml-2 px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">First</span>}
              {index === sections.length - 1 && sections.length > 1 && <span className="ml-2 px-1.5 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">Last</span>}
            </div>
          </div>
        ))}
      </div>

      {sections.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <div className="space-y-2">
            <div className="w-12 h-12 mx-auto bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-gray-400" />
            </div>
            <h4 className="text-sm font-medium">No sections defined</h4>
            <p className="text-xs">Create sections to organize your layout</p>
            <button
              onClick={addSection}
              className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors duration-200"
            >
              Create First Section
            </button>
          </div>
        </div>
      )}

      {/* Section Templates */}
      {sections.length === 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Quick Templates</h4>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => {
                setSections([
                  { id: 'header', name: 'Header', startRow: 1, endRow: 2, color: theme === 'dark' ? '#f87171' : '#ef4444' },
                  { id: 'content', name: 'Content', startRow: 2, endRow: 7, color: theme === 'dark' ? '#4ade80' : '#10b981' },
                  { id: 'footer', name: 'Footer', startRow: 7, endRow: 8, color: theme === 'dark' ? '#a78bfa' : '#8b5cf6' }
                ]);
              }}
              className="p-3 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 bg-white dark:bg-gray-800"
            >
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Basic Layout</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Header, Content, Footer</div>
            </button>
            <button
              onClick={() => {
                setSections([
                  { id: 'nav', name: 'Navigation', startRow: 1, endRow: 2, color: theme === 'dark' ? '#60a5fa' : '#3b82f6' },
                  { id: 'hero', name: 'Hero Section', startRow: 2, endRow: 4, color: theme === 'dark' ? '#f87171' : '#ef4444' },
                  { id: 'features', name: 'Features', startRow: 4, endRow: 6, color: theme === 'dark' ? '#4ade80' : '#10b981' },
                  { id: 'cta', name: 'Call to Action', startRow: 6, endRow: 7, color: theme === 'dark' ? '#fbbf24' : '#f59e0b' },
                  { id: 'footer', name: 'Footer', startRow: 7, endRow: 8, color: theme === 'dark' ? '#a78bfa' : '#8b5cf6' }
                ]);
              }}
              className="p-3 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 bg-white dark:bg-gray-800"
            >
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Landing Page</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Nav, Hero, Features, CTA, Footer</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Dark Mode Snap Configuration Tab
const DarkModeSnapConfigTab = ({ gridConfig, setGridConfig, theme }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Snap Settings</h3>
        
        <div className="space-y-6">
          {/* Enable Snap */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Snap</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">Automatically align elements to grid</p>
            </div>
            <button
              onClick={() => setGridConfig(prev => ({ ...prev, snapEnabled: !prev.snapEnabled }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                gridConfig.snapEnabled 
                  ? 'bg-blue-500 dark:bg-blue-600' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  gridConfig.snapEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Snap Threshold */}
          <div className={`transition-opacity duration-300 ${gridConfig.snapEnabled ? 'opacity-100' : 'opacity-50'}`}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Snap Threshold: {gridConfig.snapThreshold}px
            </label>
            <input
              type="range"
              min="5"
              max="50"
              value={gridConfig.snapThreshold}
              onChange={(e) => setGridConfig(prev => ({ ...prev, snapThreshold: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
              disabled={!gridConfig.snapEnabled}
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>5px</span>
              <span>50px</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Distance within which elements will snap to grid
            </p>
          </div>

          {/* Magnetic Snap */}
          <div className={`flex items-center justify-between transition-opacity duration-300 ${gridConfig.snapEnabled ? 'opacity-100' : 'opacity-50'}`}>
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Magnetic Snap</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">Increase snap distance when near grid lines</p>
            </div>
            <button
              onClick={() => setGridConfig(prev => ({ ...prev, magneticSnap: !prev.magneticSnap }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                gridConfig.magneticSnap && gridConfig.snapEnabled
                  ? 'bg-blue-500 dark:bg-blue-600' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
              disabled={!gridConfig.snapEnabled}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  gridConfig.magneticSnap && gridConfig.snapEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Show Labels */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show Labels</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">Display column and row numbers</p>
            </div>
            <button
              onClick={() => setGridConfig(prev => ({ ...prev, showLabels: !prev.showLabels }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                gridConfig.showLabels 
                  ? 'bg-blue-500 dark:bg-blue-600' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  gridConfig.showLabels ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Show Guides */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show Guides</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">Display alignment guides and center points</p>
            </div>
            <button
              onClick={() => setGridConfig(prev => ({ ...prev, showGuides: !prev.showGuides }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                gridConfig.showGuides 
                  ? 'bg-blue-500 dark:bg-blue-600' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  gridConfig.showGuides ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Snap Features Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">✨ Snap Features</h4>
        <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
          <li>• <strong>Corner snapping:</strong> Precise alignment to grid intersections</li>
          <li>• <strong>Edge snapping:</strong> Align to grid lines for consistency</li>
          <li>• <strong>Magnetic guides:</strong> Smart proximity detection</li>
          <li>• <strong>Visual feedback:</strong> Real-time snap indicators</li>
          <li>• <strong>Multi-element:</strong> Snap multiple selected elements</li>
        </ul>
      </div>

      {/* Snap Shortcuts */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">⌨️ Keyboard Shortcuts</h4>
        <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex justify-between">
            <span>Toggle Grid</span>
            <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded font-mono">Ctrl + G</kbd>
          </div>
          <div className="flex justify-between">
            <span>Toggle Snap</span>
            <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded font-mono">Ctrl + Shift + S</kbd>
          </div>
          <div className="flex justify-between">
            <span>Disable Snap (Hold)</span>
            <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded font-mono">Alt</kbd>
          </div>
          <div className="flex justify-between">
            <span>Precise Mode</span>
            <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded font-mono">Shift</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dark Mode Grid Canvas Component
const DarkModeGridCanvas = ({ 
  gridConfig, 
  sections, 
  canvasComponents, 
  setCanvasComponents, 
  selectedComponent, 
  setSelectedComponent,
  theme 
}) => {
  const canvasRef = React.useRef(null);
  const [canvasDimensions, setCanvasDimensions] = React.useState({ width: 0, height: 0 });

  // Calculate grid metrics
  const gridMetrics = React.useMemo(() => {
    const { columns, rows, gap, cellSize } = gridConfig;
    const totalWidth = columns * cellSize + (columns - 1) * gap;
    const totalHeight = rows * cellSize + (rows - 1) * gap;
    
    return {
      totalWidth,
      totalHeight,
      cellWidth: cellSize,
      cellHeight: cellSize,
      columnWidth: cellSize + gap,
      rowHeight: cellSize + gap
    };
  }, [gridConfig]);

  // Update canvas dimensions
  React.useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setCanvasDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Handle component drop
  const handleDrop = (e) => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Snap to grid
    const gridX = Math.round(x / gridMetrics.columnWidth) * gridMetrics.columnWidth;
    const gridY = Math.round(y / gridMetrics.rowHeight) * gridMetrics.rowHeight;

    const newComponent = {
      id: `component-${Date.now()}`,
      type: 'element',
      position: { x: gridX, y: gridY },
      size: { width: 2, height: 1 },
      content: 'New Element',
      style: {
        backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
        color: theme === 'dark' ? '#f3f4f6' : '#111827',
        border: `2px solid ${theme === 'dark' ? '#4b5563' : '#e5e7eb'}`
      }
    };

    setCanvasComponents(prev => [...prev, newComponent]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div 
      ref={canvasRef}
      className="relative min-h-full overflow-auto"
      style={{ 
        width: `${gridMetrics.totalWidth + 200}px`,
        height: `${gridMetrics.totalHeight + 200}px`
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Enhanced Grid Overlay with Dark Mode */}
      <DarkModeGridOverlay 
        gridConfig={gridConfig}
        gridMetrics={gridMetrics}
        sections={sections}
        theme={theme}
      />

      {/* Grid Components */}
      {canvasComponents.map(component => (
        <DarkModeGridComponent
          key={component.id}
          component={component}
          isSelected={selectedComponent === component.id}
          onSelect={setSelectedComponent}
          gridMetrics={gridMetrics}
          theme={theme}
        />
      ))}

      {/* Drop Zone Indicators */}
      <DarkModeDropZones 
        gridConfig={gridConfig}
        gridMetrics={gridMetrics}
        theme={theme}
      />
    </div>
  );
};

// Dark Mode Grid Overlay Component
const DarkModeGridOverlay = ({ gridConfig, gridMetrics, sections, theme }) => {
  if (!gridConfig.visible) return null;

  const { columns, rows, color, opacity, showLabels, showGuides } = gridConfig;
  const { columnWidth, rowHeight, cellWidth, cellHeight } = gridMetrics;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ 
        width: gridMetrics.totalWidth + 200,
        height: gridMetrics.totalHeight + 200
      }}
    >
      <defs>
        <pattern
          id={`grid-pattern-${theme}`}
          width={columnWidth}
          height={rowHeight}
          patternUnits="userSpaceOnUse"
        >
          <rect
            width={cellWidth}
            height={cellHeight}
            fill="none"
            stroke={color}
            strokeWidth="1"
            strokeDasharray="3,3"
            opacity={opacity}
          />
          {showGuides && (
            <>
              <circle
                cx={cellWidth / 2}
                cy={cellHeight / 2}
                r="2"
                fill={color}
                opacity={opacity * 0.8}
              />
              <line
                x1="0"
                y1={cellHeight / 2}
                x2={cellWidth}
                y2={cellHeight / 2}
                stroke={color}
                strokeWidth="0.5"
                opacity={opacity * 0.4}
              />
              <line
                x1={cellWidth / 2}
                y1="0"
                x2={cellWidth / 2}
                y2={cellHeight}
                stroke={color}
                strokeWidth="0.5"
                opacity={opacity * 0.4}
              />
            </>
          )}
        </pattern>

        {/* Gradient overlay for dark mode */}
        <linearGradient id={`grid-gradient-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity={opacity * 0.1} />
          <stop offset="100%" stopColor={color} stopOpacity={opacity * 0.3} />
        </linearGradient>
      </defs>

      {/* Grid Background */}
      <rect
        width="100%"
        height="100%"
        fill={`url(#grid-pattern-${theme})`}
      />

      {/* Section Overlays */}
      {sections.map(section => (
        <g key={section.id}>
          <rect
            x="0"
            y={(section.startRow - 1) * rowHeight}
            width={columns * columnWidth}
            height={(section.endRow - section.startRow) * rowHeight}
            fill={section.color}
            opacity="0.1"
            stroke={section.color}
            strokeWidth="2"
            strokeDasharray="8,4"
            className="transition-all duration-300"
          />
          {showLabels && (
            <text
              x="12"
              y={(section.startRow - 1) * rowHeight + 24}
              fill={section.color}
              fontSize="14"
              fontWeight="bold"
              opacity="0.9"
              className="select-none"
            >
              {section.name}
            </text>
          )}
        </g>
      ))}

      {/* Enhanced Grid Labels */}
      {showLabels && (
        <>
          {/* Column Labels */}
          {Array.from({ length: columns }, (_, i) => (
            <text
              key={`col-${i}`}
              x={i * columnWidth + cellWidth / 2}
              y="-8"
              textAnchor="middle"
              fill={color}
              fontSize="11"
              fontWeight="500"
              opacity={opacity * 3}
              className="select-none"
            >
              {i + 1}
            </text>
          ))}
          
          {/* Row Labels */}
          {Array.from({ length: rows }, (_, i) => (
            <text
              key={`row-${i}`}
              x="-20"
              y={i * rowHeight + cellHeight / 2 + 4}
              textAnchor="middle"
              fill={color}
              fontSize="11"
              fontWeight="500"
              opacity={opacity * 3}
              className="select-none"
            >
              {i + 1}
            </text>
          ))}
        </>
      )}

      {/* Enhanced Corner Markers */}
      {showGuides && (
        <>
          {Array.from({ length: columns + 1 }, (_, col) =>
            Array.from({ length: rows + 1 }, (_, row) => (
              <circle
                key={`corner-${col}-${row}`}
                cx={col * columnWidth}
                cy={row * rowHeight}
                r="4"
                fill={color}
                opacity={opacity * 0.6}
                className="hover:opacity-100 transition-opacity duration-200"
              />
            ))
          )}
        </>
      )}

      {/* Grid Ruler */}
      {showLabels && (
        <g className="grid-ruler">
          <rect
            x="-30"
            y="-30"
            width="30"
            height="30"
            fill={theme === 'dark' ? '#1f2937' : '#f9fafb'}
            stroke={theme === 'dark' ? '#374151' : '#e5e7eb'}
            strokeWidth="1"
          />
          <text
            x="-15"
            y="-10"
            textAnchor="middle"
            fill={color}
            fontSize="10"
            fontWeight="bold"
            className="select-none"
          >
            {columns}×{rows}
          </text>
        </g>
      )}
    </svg>
  );
};

// Dark Mode Grid Component (Draggable Element)
const DarkModeGridComponent = ({ component, isSelected, onSelect, gridMetrics, theme }) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    onSelect(component.id);
    e.preventDefault();
  };

  return (
    <div
      className={`absolute rounded-lg shadow-lg cursor-move transition-all duration-200 ${
        isSelected 
          ? 'ring-2 ring-blue-500 dark:ring-blue-400 shadow-xl z-20' 
          : 'hover:shadow-md z-10'
      } ${isDragging ? 'scale-105 z-30' : ''}`}
      style={{
        left: component.position.x,
        top: component.position.y,
        width: component.size.width * gridMetrics.columnWidth - 8,
        height: component.size.height * gridMetrics.rowHeight - 8,
        backgroundColor: component.style?.backgroundColor || (theme === 'dark' ? '#374151' : '#ffffff'),
        color: component.style?.color || (theme === 'dark' ? '#f3f4f6' : '#111827'),
        border: component.style?.border || `2px solid ${theme === 'dark' ? '#4b5563' : '#e5e7eb'}`
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="p-4 h-full flex items-center justify-center">
        <span className="text-sm font-medium text-center">
          {component.content}
        </span>
      </div>
      
      {isSelected && (
        <>
          {/* Resize Handles */}
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full cursor-se-resize" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full cursor-ne-resize" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full cursor-sw-resize" />
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full cursor-nw-resize" />
          
          {/* Position Indicator */}
          <div className="absolute -top-8 left-0 bg-blue-500 dark:bg-blue-400 text-white px-2 py-1 rounded text-xs font-mono">
            {Math.floor(component.position.x / gridMetrics.columnWidth) + 1},
            {Math.floor(component.position.y / gridMetrics.rowHeight) + 1}
          </div>
        </>
      )}
    </div>
  );
};

// Dark Mode Drop Zones Component
const DarkModeDropZones = ({ gridConfig, gridMetrics, theme }) => {
  const { columns, rows } = gridConfig;
  const { columnWidth, rowHeight } = gridMetrics;

  return (
    <div 
      className="absolute inset-0 grid gap-0 pointer-events-none"
      style={{
        gridTemplateColumns: `repeat(${columns}, ${columnWidth}px)`,
        gridTemplateRows: `repeat(${rows}, ${rowHeight}px)`,
        width: gridMetrics.totalWidth,
        height: gridMetrics.totalHeight
      }}
    >
      {Array.from({ length: columns * rows }, (_, index) => {
        const col = index % columns;
        const row = Math.floor(index / columns);
        
        return (
          <div
            key={index}
            className={`border border-transparent hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-crosshair pointer-events-auto grid-cell-hover`}
            title={`Drop zone ${col + 1}, ${row + 1}`}
          />
        );
      })}
    </div>
  );
};

// Dark Mode Properties Panel
const DarkModePropertiesPanel = ({ component, onUpdate, gridConfig, sections, theme }) => {
  if (!component) return null;

  return (
    <div className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Element Properties</h3>
      
      <div className="space-y-6">
        {/* Basic Properties */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Content</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Text</label>
              <input
                type="text"
                value={component.content}
                onChange={(e) => onUpdate({ content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Grid Position */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Grid Position</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Column</label>
              <input
                type="number"
                min="1"
                max={gridConfig.columns}
                value={Math.floor(component.position.x / (gridConfig.cellSize + gridConfig.gap)) + 1}
                onChange={(e) => {
                  const col = parseInt(e.target.value) - 1;
                  onUpdate({ 
                    position: { 
                      ...component.position, 
                      x: col * (gridConfig.cellSize + gridConfig.gap) 
                    } 
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Row</label>
              <input
                type="number"
                min="1"
                max={gridConfig.rows}
                value={Math.floor(component.position.y / (gridConfig.cellSize + gridConfig.gap)) + 1}
                onChange={(e) => {
                  const row = parseInt(e.target.value) - 1;
                  onUpdate({ 
                    position: { 
                      ...component.position, 
                      y: row * (gridConfig.cellSize + gridConfig.gap) 
                    } 
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Styling */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Styling</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Background Color</label>
              <input
                type="color"
                value={component.style?.backgroundColor || (theme === 'dark' ? '#374151' : '#ffffff')}
                onChange={(e) => onUpdate({ 
                  style: { 
                    ...component.style, 
                    backgroundColor: e.target.value 
                  } 
                })}
                className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Text Color</label>
              <input
                type="color"
                value={component.style?.color || (theme === 'dark' ? '#f3f4f6' : '#111827')}
                onChange={(e) => onUpdate({ 
                  style: { 
                    ...component.style, 
                    color: e.target.value 
                  } 
                })}
                className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onUpdate({ 
                position: { x: 0, y: component.position.y } 
              })}
              className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-sm transition-colors duration-200"
            >
              <AlignLeft className="w-4 h-4" />
              <span>Left</span>
            </button>
            <button
              onClick={() => {
                const centerX = ((gridConfig.columns - component.size.width) / 2) * (gridConfig.cellSize + gridConfig.gap);
                onUpdate({ position: { ...component.position, x: centerX } });
              }}
              className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-sm transition-colors duration-200"
            >
              <AlignCenter className="w-4 h-4" />
              <span>Center</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { 
  DarkModeGridConfigTab, 
  DarkModeSectionsTab, 
  DarkModeSnapConfigTab,
  DarkModeGridCanvas,
  DarkModeGridOverlay,
  DarkModeGridComponent,
  DarkModeDropZones,
  DarkModePropertiesPanel
};
// 'use client'

// import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
// import { 
//   Grid, Settings, Eye, EyeOff, Move, RotateCw, Maximize2, Minimize2,
//   Palette, Layers, Ruler, Lock, Unlock, AlignCenter, AlignLeft, AlignRight,
//   Plus, Minus, MoreHorizontal, Separator, Square, Circle, Sun, Moon, Monitor
// } from 'lucide-react';
// import { useTheme } from '@/hooks/useTheme';

// // Dark Mode Enhanced Grid System
// const DarkModeEnhancedGridSystem = () => {
//   const { theme, toggleTheme, mounted } = useTheme();
  
//   const [gridConfig, setGridConfig] = useState({
//     enabled: true,
//     visible: true,
//     columns: 12,
//     rows: 8,
//     gap: 16,
//     cellSize: 40,
//     color: theme === 'dark' ? '#6366f1' : '#3b82f6', // Adapt to theme
//     opacity: 0.3,
//     snapEnabled: true,
//     snapThreshold: 10,
//     showLabels: true,
//     showGuides: true,
//     magneticSnap: true,
//     type: 'standard'
//   });

//   const [sections, setSections] = useState([
//     { id: 'header', name: 'Header', startRow: 1, endRow: 2, color: '#ef4444' },
//     { id: 'content', name: 'Content', startRow: 2, endRow: 7, color: '#10b981' },
//     { id: 'footer', name: 'Footer', startRow: 7, endRow: 8, color: '#8b5cf6' }
//   ]);

//   const [selectedComponent, setSelectedComponent] = useState(null);
//   const [canvasComponents, setCanvasComponents] = useState([]);
//   const [showGridControls, setShowGridControls] = useState(true);

//   // Update grid color when theme changes
//   useEffect(() => {
//     if (mounted) {
//       setGridConfig(prev => ({
//         ...prev,
//         color: theme === 'dark' ? '#6366f1' : '#3b82f6'
//       }));
//     }
//   }, [theme, mounted]);

//   // Dark mode color presets
//   const colorPresets = [
//     { name: 'Blue', value: theme === 'dark' ? '#60a5fa' : '#3b82f6' },
//     { name: 'Purple', value: theme === 'dark' ? '#a78bfa' : '#8b5cf6' },
//     { name: 'Green', value: theme === 'dark' ? '#4ade80' : '#10b981' },
//     { name: 'Red', value: theme === 'dark' ? '#f87171' : '#ef4444' },
//     { name: 'Yellow', value: theme === 'dark' ? '#fbbf24' : '#f59e0b' },
//     { name: 'Pink', value: theme === 'dark' ? '#f472b6' : '#ec4899' },
//     { name: 'Indigo', value: theme === 'dark' ? '#818cf8' : '#6366f1' },
//     { name: 'Gray', value: theme === 'dark' ? '#9ca3af' : '#6b7280' }
//   ];

//   return (
//     <div className="h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
//       {/* Dark Mode Enhanced Toolbar */}
//       <DarkModeGridToolbar 
//         gridConfig={gridConfig}
//         setGridConfig={setGridConfig}
//         colorPresets={colorPresets}
//         showGridControls={showGridControls}
//         setShowGridControls={setShowGridControls}
//         theme={theme}
//         toggleTheme={toggleTheme}
//         mounted={mounted}
//       />

//       <div className="flex-1 flex overflow-hidden">
//         {/* Dark Mode Grid Controls Panel */}
//         {showGridControls && (
//           <DarkModeGridControlsPanel 
//             gridConfig={gridConfig}
//             setGridConfig={setGridConfig}
//             sections={sections}
//             setSections={setSections}
//             colorPresets={colorPresets}
//             theme={theme}
//           />
//         )}

//         {/* Dark Mode Canvas Area */}
//         <div className="flex-1 relative overflow-auto bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
//           <DarkModeGridCanvas 
//             gridConfig={gridConfig}
//             sections={sections}
//             canvasComponents={canvasComponents}
//             setCanvasComponents={setCanvasComponents}
//             selectedComponent={selectedComponent}
//             setSelectedComponent={setSelectedComponent}
//             theme={theme}
//           />
//         </div>

//         {/* Dark Mode Properties Panel */}
//         {selectedComponent && (
//           <DarkModePropertiesPanel 
//             component={canvasComponents.find(c => c.id === selectedComponent)}
//             onUpdate={(updates) => {
//               setCanvasComponents(prev => 
//                 prev.map(c => c.id === selectedComponent ? { ...c, ...updates } : c)
//               );
//             }}
//             gridConfig={gridConfig}
//             sections={sections}
//             theme={theme}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// // Dark Mode Enhanced Toolbar
// const DarkModeGridToolbar = ({ 
//   gridConfig, 
//   setGridConfig, 
//   colorPresets,
//   showGridControls,
//   setShowGridControls,
//   theme,
//   toggleTheme,
//   mounted
// }) => {
//   return (
//     <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between shadow-sm transition-colors duration-300">
//       <div className="flex items-center space-x-4">
//         <div className="flex items-center space-x-2">
//           <Grid className="w-5 h-5 text-blue-500 dark:text-blue-400" />
//           <span className="font-semibold text-gray-900 dark:text-gray-100">Enhanced Grid System</span>
//         </div>

//         {/* Grid Toggle */}
//         <button
//           onClick={() => setGridConfig(prev => ({ ...prev, visible: !prev.visible }))}
//           className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${
//             gridConfig.visible 
//               ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
//               : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
//           }`}
//         >
//           {gridConfig.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
//           <span className="text-sm">Grid</span>
//         </button>

//         {/* Snap Toggle */}
//         <button
//           onClick={() => setGridConfig(prev => ({ ...prev, snapEnabled: !prev.snapEnabled }))}
//           className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${
//             gridConfig.snapEnabled 
//               ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' 
//               : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
//           }`}
//         >
//           {gridConfig.snapEnabled ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
//           <span className="text-sm">Snap</span>
//         </button>

//         {/* Grid Size Controls */}
//         <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 transition-colors duration-300">
//           <button
//             onClick={() => setGridConfig(prev => ({ ...prev, columns: Math.max(4, prev.columns - 2) }))}
//             className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-400 transition-colors duration-200"
//           >
//             <Minus className="w-4 h-4" />
//           </button>
//           <span className="px-2 text-sm font-medium text-gray-900 dark:text-gray-100 min-w-[2rem] text-center">
//             {gridConfig.columns}
//           </span>
//           <button
//             onClick={() => setGridConfig(prev => ({ ...prev, columns: Math.min(24, prev.columns + 2) }))}
//             className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-400 transition-colors duration-200"
//           >
//             <Plus className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       <div className="flex items-center space-x-3">
//         {/* Theme Toggle */}
//         {mounted && (
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
//             title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
//           >
//             {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
//           </button>
//         )}

//         {/* Color Picker */}
//         <div className="flex items-center space-x-2">
//           <span className="text-sm text-gray-600 dark:text-gray-400">Color:</span>
//           <div className="flex space-x-1">
//             {colorPresets.slice(0, 4).map(color => (
//               <button
//                 key={color.value}
//                 onClick={() => setGridConfig(prev => ({ ...prev, color: color.value }))}
//                 className={`w-6 h-6 rounded border-2 transition-all duration-200 ${
//                   gridConfig.color === color.value 
//                     ? 'border-gray-700 dark:border-gray-300 scale-110' 
//                     : 'border-gray-300 dark:border-gray-600 hover:scale-105'
//                 }`}
//                 style={{ backgroundColor: color.value }}
//                 title={color.name}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Controls Toggle */}
//         <button
//           onClick={() => setShowGridControls(!showGridControls)}
//           className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 text-gray-700 dark:text-gray-300"
//         >
//           <Settings className="w-4 h-4" />
//           <span className="text-sm">Controls</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// // Dark Mode Grid Controls Panel
// const DarkModeGridControlsPanel = ({ 
//   gridConfig, 
//   setGridConfig, 
//   sections, 
//   setSections, 
//   colorPresets,
//   theme
// }) => {
//   const [activeTab, setActiveTab] = useState('grid');

//   return (
//     <div className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-300">
//       {/* Tabs */}
//       <div className="flex border-b border-gray-200 dark:border-gray-700">
//         {[
//           { id: 'grid', label: 'Grid', icon: Grid },
//           { id: 'sections', label: 'Sections', icon: Layers },
//           { id: 'snap', label: 'Snap', icon: Move }
//         ].map(tab => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-all duration-300 ${
//               activeTab === tab.id 
//                 ? 'border-b-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
//                 : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'
//             }`}
//           >
//             <tab.icon className="w-4 h-4" />
//             <span>{tab.label}</span>
//           </button>
//         ))}
//       </div>

//       <div className="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-900">
//         {activeTab === 'grid' && (
//           <DarkModeGridConfigTab 
//             gridConfig={gridConfig}
//             setGridConfig={setGridConfig}
//             colorPresets={colorPresets}
//             theme={theme}
//           />
//         )}

//         {activeTab === 'sections' && (
//           <DarkModeSectionsTab 
//             sections={sections}
//             setSections={setSections}
//             gridConfig={gridConfig}
//             theme={theme}
//           />
//         )}

//         {activeTab === 'snap' && (
//           <DarkModeSnapConfigTab 
//             gridConfig={gridConfig}
//             setGridConfig={setGridConfig}
//             theme={theme}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// // Additional dark mode components would be defined here...
// // (GridConfigTab, SectionsTab, SnapConfigTab, etc. with dark mode styling)

// export default DarkModeEnhancedGridSystem;