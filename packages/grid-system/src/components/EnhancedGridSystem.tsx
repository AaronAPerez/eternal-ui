import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { 
  Grid, 
  Settings, 
  Eye, 
  EyeOff, 
  Move, 
  RotateCw, 
  Maximize2, 
  Minimize2,
  Palette,
  Layers,
  Ruler,
  Lock,
  Unlock,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Plus,
  Minus,
  MoreHorizontal,
  Separator,
  Square,
  Circle
} from 'lucide-react';

// Enhanced Grid System with Advanced Features
const EnhancedGridSystem = () => {
  const [gridConfig, setGridConfig] = useState({
    enabled: true,
    visible: true,
    columns: 12,
    rows: 8,
    gap: 16,
    cellSize: 40,
    color: '#3B82F6',
    opacity: 0.3,
    snapEnabled: true,
    snapThreshold: 10,
    showLabels: true,
    showGuides: true,
    magneticSnap: true,
    type: 'standard' // 'standard', 'golden-ratio', 'custom'
  });

  const [sections, setSections] = useState([
    { id: 'header', name: 'Header', startRow: 1, endRow: 2, color: '#EF4444' },
    { id: 'content', name: 'Content', startRow: 2, endRow: 7, color: '#10B981' },
    { id: 'footer', name: 'Footer', startRow: 7, endRow: 8, color: '#8B5CF6' }
  ]);

  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [canvasComponents, setCanvasComponents] = useState([]);
  const [showGridControls, setShowGridControls] = useState(true);
  const canvasRef = useRef(null);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });

  // Update canvas dimensions
  useEffect(() => {
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

  // Grid calculation
  const gridMetrics = useMemo(() => {
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

  // Snap calculation
  const calculateSnapPosition = useCallback((position, elementSize) => {
    if (!gridConfig.snapEnabled) return { position, snapped: false };

    const { columnWidth, rowHeight } = gridMetrics;
    const { snapThreshold } = gridConfig;

    const snapX = Math.round(position.x / columnWidth) * columnWidth;
    const snapY = Math.round(position.y / rowHeight) * rowHeight;

    const distanceX = Math.abs(position.x - snapX);
    const distanceY = Math.abs(position.y - snapY);

    const shouldSnapX = distanceX <= snapThreshold;
    const shouldSnapY = distanceY <= snapThreshold;

    return {
      position: {
        x: shouldSnapX ? snapX : position.x,
        y: shouldSnapY ? snapY : position.y
      },
      snapped: shouldSnapX || shouldSnapY,
      snapType: shouldSnapX && shouldSnapY ? 'corner' : shouldSnapX ? 'vertical' : shouldSnapY ? 'horizontal' : 'none'
    };
  }, [gridConfig.snapEnabled, gridConfig.snapThreshold, gridMetrics]);

  // Color presets
  const colorPresets = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Yellow', value: '#F59E0B' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Gray', value: '#6B7280' },
    { name: 'Indigo', value: '#6366F1' }
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Enhanced Toolbar */}
      <EnhancedGridToolbar 
        gridConfig={gridConfig}
        setGridConfig={setGridConfig}
        sections={sections}
        setSections={setSections}
        colorPresets={colorPresets}
        showGridControls={showGridControls}
        setShowGridControls={setShowGridControls}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Grid Controls Panel */}
        {showGridControls && (
          <GridControlsPanel 
            gridConfig={gridConfig}
            setGridConfig={setGridConfig}
            sections={sections}
            setSections={setSections}
            colorPresets={colorPresets}
            selectedComponent={selectedComponent}
            gridMetrics={gridMetrics}
          />
        )}

        {/* Canvas Area with Enhanced Grid */}
        <div className="flex-1 relative overflow-auto bg-white">
          <div 
            ref={canvasRef}
            className="relative min-h-full"
            style={{ 
              width: `${gridMetrics.totalWidth + 100}px`,
              height: `${gridMetrics.totalHeight + 100}px`
            }}
          >
            {/* Enhanced Grid Overlay */}
            <EnhancedGridOverlay 
              gridConfig={gridConfig}
              gridMetrics={gridMetrics}
              sections={sections}
              canvasDimensions={canvasDimensions}
            />

            {/* Grid Components */}
            {canvasComponents.map(component => (
              <GridComponent
                key={component.id}
                component={component}
                isSelected={selectedComponent === component.id}
                onSelect={setSelectedComponent}
                gridConfig={gridConfig}
                gridMetrics={gridMetrics}
                calculateSnapPosition={calculateSnapPosition}
              />
            ))}

            {/* Drop Zones */}
            <GridDropZones 
              gridConfig={gridConfig}
              gridMetrics={gridMetrics}
              onDrop={(position) => {
                const newComponent = {
                  id: `component-${Date.now()}`,
                  type: 'element',
                  position,
                  size: { width: 2, height: 1 },
                  content: 'New Element'
                };
                setCanvasComponents(prev => [...prev, newComponent]);
              }}
            />
          </div>
        </div>

        {/* Properties Panel */}
        {selectedComponent && (
          <GridPropertiesPanel 
            component={canvasComponents.find(c => c.id === selectedComponent)}
            onUpdate={(updates) => {
              setCanvasComponents(prev => 
                prev.map(c => c.id === selectedComponent ? { ...c, ...updates } : c)
              );
            }}
            gridConfig={gridConfig}
            sections={sections}
          />
        )}
      </div>
    </div>
  );
};

// Enhanced Grid Toolbar
const EnhancedGridToolbar = ({ 
  gridConfig, 
  setGridConfig, 
  sections, 
  setSections, 
  colorPresets,
  showGridControls,
  setShowGridControls 
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Grid className="w-5 h-5 text-blue-500" />
          <span className="font-semibold text-gray-900">Enhanced Grid System</span>
        </div>

        {/* Grid Toggle */}
        <button
          onClick={() => setGridConfig(prev => ({ ...prev, visible: !prev.visible }))}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors ${
            gridConfig.visible 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {gridConfig.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          <span className="text-sm">Grid</span>
        </button>

        {/* Snap Toggle */}
        <button
          onClick={() => setGridConfig(prev => ({ ...prev, snapEnabled: !prev.snapEnabled }))}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors ${
            gridConfig.snapEnabled 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {gridConfig.snapEnabled ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          <span className="text-sm">Snap</span>
        </button>

        {/* Quick Grid Size */}
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setGridConfig(prev => ({ ...prev, columns: Math.max(4, prev.columns - 2) }))}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-2 text-sm font-medium">{gridConfig.columns}</span>
          <button
            onClick={() => setGridConfig(prev => ({ ...prev, columns: Math.min(24, prev.columns + 2) }))}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Color Picker */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Color:</span>
          <div className="flex space-x-1">
            {colorPresets.slice(0, 4).map(color => (
              <button
                key={color.value}
                onClick={() => setGridConfig(prev => ({ ...prev, color: color.value }))}
                className={`w-6 h-6 rounded border-2 transition-all ${
                  gridConfig.color === color.value ? 'border-gray-700 scale-110' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Controls Toggle */}
        <button
          onClick={() => setShowGridControls(!showGridControls)}
          className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm">Controls</span>
        </button>
      </div>
    </div>
  );
};

// Grid Controls Panel
const GridControlsPanel = ({ 
  gridConfig, 
  setGridConfig, 
  sections, 
  setSections, 
  colorPresets,
  selectedComponent,
  gridMetrics 
}) => {
  const [activeTab, setActiveTab] = useState('grid');

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'grid', label: 'Grid', icon: Grid },
          { id: 'sections', label: 'Sections', icon: Layers },
          { id: 'snap', label: 'Snap', icon: Move }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id 
                ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'grid' && (
          <GridConfigTab 
            gridConfig={gridConfig}
            setGridConfig={setGridConfig}
            colorPresets={colorPresets}
            gridMetrics={gridMetrics}
          />
        )}

        {activeTab === 'sections' && (
          <SectionsTab 
            sections={sections}
            setSections={setSections}
            gridConfig={gridConfig}
          />
        )}

        {activeTab === 'snap' && (
          <SnapConfigTab 
            gridConfig={gridConfig}
            setGridConfig={setGridConfig}
          />
        )}
      </div>
    </div>
  );
};

// Grid Configuration Tab
const GridConfigTab = ({ gridConfig, setGridConfig, colorPresets, gridMetrics }) => {
  return (
    <div className="space-y-6">
      {/* Grid Dimensions */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Grid Dimensions</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Columns</label>
            <input
              type="range"
              min="4"
              max="24"
              value={gridConfig.columns}
              onChange={(e) => setGridConfig(prev => ({ ...prev, columns: parseInt(e.target.value) }))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>4</span>
              <span className="font-medium">{gridConfig.columns}</span>
              <span>24</span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Rows</label>
            <input
              type="range"
              min="4"
              max="20"
              value={gridConfig.rows}
              onChange={(e) => setGridConfig(prev => ({ ...prev, rows: parseInt(e.target.value) }))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>4</span>
              <span className="font-medium">{gridConfig.rows}</span>
              <span>20</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cell Size & Gap */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Spacing</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Cell Size ({gridConfig.cellSize}px)</label>
            <input
              type="range"
              min="20"
              max="100"
              value={gridConfig.cellSize}
              onChange={(e) => setGridConfig(prev => ({ ...prev, cellSize: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Gap ({gridConfig.gap}px)</label>
            <input
              type="range"
              min="0"
              max="40"
              value={gridConfig.gap}
              onChange={(e) => setGridConfig(prev => ({ ...prev, gap: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Appearance</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Grid Color</label>
            <div className="grid grid-cols-4 gap-2">
              {colorPresets.map(color => (
                <button
                  key={color.value}
                  onClick={() => setGridConfig(prev => ({ ...prev, color: color.value }))}
                  className={`w-full h-8 rounded border-2 transition-all ${
                    gridConfig.color === color.value ? 'border-gray-700 scale-105' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Opacity ({Math.round(gridConfig.opacity * 100)}%)</label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={gridConfig.opacity}
              onChange={(e) => setGridConfig(prev => ({ ...prev, opacity: parseFloat(e.target.value) }))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Grid Type */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Grid Type</h3>
        <div className="space-y-2">
          {[
            { id: 'standard', name: 'Standard Grid', desc: 'Equal columns and rows' },
            { id: 'golden-ratio', name: 'Golden Ratio', desc: 'Proportional layout' },
            { id: 'custom', name: 'Custom', desc: 'Define your own ratios' }
          ].map(type => (
            <button
              key={type.id}
              onClick={() => setGridConfig(prev => ({ ...prev, type: type.id }))}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                gridConfig.type === type.id 
                  ? 'border-blue-500 bg-blue-50 text-blue-900' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium text-sm">{type.name}</div>
              <div className="text-xs text-gray-600">{type.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Grid Info */}
      <div className="bg-gray-50 p-3 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Grid Info</h4>
        <div className="text-xs text-gray-600 space-y-1">
          <div>Total Size: {gridMetrics.totalWidth} × {gridMetrics.totalHeight}px</div>
          <div>Cell Size: {gridMetrics.cellWidth} × {gridMetrics.cellHeight}px</div>
          <div>Total Cells: {gridConfig.columns × gridConfig.rows}</div>
        </div>
      </div>
    </div>
  );
};

// Sections Configuration Tab
const SectionsTab = ({ sections, setSections, gridConfig }) => {
  const addSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      name: `Section ${sections.length + 1}`,
      startRow: Math.max(1, sections.length > 0 ? Math.max(...sections.map(s => s.endRow)) : 1),
      endRow: Math.min(gridConfig.rows, sections.length > 0 ? Math.max(...sections.map(s => s.endRow)) + 2 : 3),
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    };
    setSections(prev => [...prev, newSection]);
  };

  const updateSection = (id, updates) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const removeSection = (id) => {
    setSections(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Layout Sections</h3>
        <button
          onClick={addSection}
          className="flex items-center space-x-1 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
        >
          <Plus className="w-3 h-3" />
          <span>Add</span>
        </button>
      </div>

      <div className="space-y-3">
        {sections.map(section => (
          <div key={section.id} className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <input
                type="text"
                value={section.name}
                onChange={(e) => updateSection(section.id, { name: e.target.value })}
                className="text-sm font-medium bg-transparent border-0 p-0 focus:outline-none focus:ring-0"
              />
              <button
                onClick={() => removeSection(section.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <label className="text-xs text-gray-600 w-12">Start:</label>
                <input
                  type="number"
                  min="1"
                  max={gridConfig.rows}
                  value={section.startRow}
                  onChange={(e) => updateSection(section.id, { startRow: parseInt(e.target.value) })}
                  className="flex-1 text-xs border border-gray-300 rounded px-2 py-1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-xs text-gray-600 w-12">End:</label>
                <input
                  type="number"
                  min="1"
                  max={gridConfig.rows}
                  value={section.endRow}
                  onChange={(e) => updateSection(section.id, { endRow: parseInt(e.target.value) })}
                  className="flex-1 text-xs border border-gray-300 rounded px-2 py-1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-xs text-gray-600 w-12">Color:</label>
                <input
                  type="color"
                  value={section.color}
                  onChange={(e) => updateSection(section.id, { color: e.target.value })}
                  className="flex-1 h-6 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {sections.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Layers className="w-8 h-8 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">No sections defined</p>
          <p className="text-xs">Add sections to organize your layout</p>
        </div>
      )}
    </div>
  );
};

// Snap Configuration Tab
const SnapConfigTab = ({ gridConfig, setGridConfig }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Snap Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Enable Snap</span>
            <button
              onClick={() => setGridConfig(prev => ({ ...prev, snapEnabled: !prev.snapEnabled }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                gridConfig.snapEnabled ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  gridConfig.snapEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Snap Threshold ({gridConfig.snapThreshold}px)
            </label>
            <input
              type="range"
              min="5"
              max="50"
              value={gridConfig.snapThreshold}
              onChange={(e) => setGridConfig(prev => ({ ...prev, snapThreshold: parseInt(e.target.value) }))}
              className="w-full"
              disabled={!gridConfig.snapEnabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Magnetic Snap</span>
            <button
              onClick={() => setGridConfig(prev => ({ ...prev, magneticSnap: !prev.magneticSnap }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                gridConfig.magneticSnap ? 'bg-blue-500' : 'bg-gray-200'
              }`}
              disabled={!gridConfig.snapEnabled}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  gridConfig.magneticSnap ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Show Labels</span>
            <button
              onClick={() => setGridConfig(prev => ({ ...prev, showLabels: !prev.showLabels }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                gridConfig.showLabels ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  gridConfig.showLabels ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Show Guides</span>
            <button
              onClick={() => setGridConfig(prev => ({ ...prev, showGuides: !prev.showGuides }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                gridConfig.showGuides ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  gridConfig.showGuides ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-3 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Snap Features</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Corner snapping for precise alignment</li>
          <li>• Edge snapping for layout consistency</li>
          <li>• Magnetic guides for professional layouts</li>
          <li>• Visual feedback during drag operations</li>
        </ul>
      </div>
    </div>
  );
};

// Enhanced Grid Overlay Component
const EnhancedGridOverlay = ({ gridConfig, gridMetrics, sections, canvasDimensions }) => {
  if (!gridConfig.visible) return null;

  const { columns, rows, color, opacity, showLabels, showGuides } = gridConfig;
  const { columnWidth, rowHeight, cellWidth, cellHeight } = gridMetrics;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ 
        width: gridMetrics.totalWidth + 100,
        height: gridMetrics.totalHeight + 100
      }}
    >
      <defs>
        <pattern
          id="grid-pattern"
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
            strokeDasharray="2,2"
            opacity={opacity}
          />
          {showGuides && (
            <>
              <circle
                cx={cellWidth / 2}
                cy={cellHeight / 2}
                r="2"
                fill={color}
                opacity={opacity * 0.6}
              />
              <line
                x1="0"
                y1={cellHeight / 2}
                x2={cellWidth}
                y2={cellHeight / 2}
                stroke={color}
                strokeWidth="0.5"
                opacity={opacity * 0.3}
              />
              <line
                x1={cellWidth / 2}
                y1="0"
                x2={cellWidth / 2}
                y2={cellHeight}
                stroke={color}
                strokeWidth="0.5"
                opacity={opacity * 0.3}
              />
            </>
          )}
        </pattern>
      </defs>

      {/* Grid Background */}
      <rect
        width="100%"
        height="100%"
        fill="url(#grid-pattern)"
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
            strokeDasharray="5,5"
          />
          {showLabels && (
            <text
              x="10"
              y={(section.startRow - 1) * rowHeight + 20}
              fill={section.color}
              fontSize="12"
              fontWeight="bold"
              opacity="0.8"
            >
              {section.name}
            </text>
          )}
        </g>
      ))}

      {/* Column and Row Labels */}
      {showLabels && (
        <>
          {/* Column Labels */}
          {Array.from({ length: columns }, (_, i) => (
            <text
              key={`col-${i}`}
              x={i * columnWidth + cellWidth / 2}
              y="-5"
              textAnchor="middle"
              fill={color}
              fontSize="10"
              opacity={opacity * 2}
            >
              {i + 1}
            </text>
          ))}
          
          {/* Row Labels */}
          {Array.from({ length: rows }, (_, i) => (
            <text
              key={`row-${i}`}
              x="-15"
              y={i * rowHeight + cellHeight / 2 + 3}
              textAnchor="middle"
              fill={color}
              fontSize="10"
              opacity={opacity * 2}
            >
              {i + 1}
            </text>
          ))}
        </>
      )}

      {/* Corner Markers for Snap Points */}
      {showGuides && (
        <>
          {Array.from({ length: columns + 1 }, (_, col) =>
            Array.from({ length: rows + 1 }, (_, row) => (
              <circle
                key={`corner-${col}-${row}`}
                cx={col * columnWidth}
                cy={row * rowHeight}
                r="3"
                fill={color}
                opacity={opacity * 0.5}
                className="hover:opacity-100 transition-opacity"
              />
            ))
          )}
        </>
      )}
    </svg>
  );
};

// Grid Drop Zones Component
const GridDropZones = ({ gridConfig, gridMetrics, onDrop }) => {
  const { columns, rows } = gridConfig;
  const { columnWidth, rowHeight } = gridMetrics;

  const handleDrop = useCallback((e, col, row) => {
    e.preventDefault();
    onDrop({
      column: col,
      row: row,
      x: col * columnWidth,
      y: row * rowHeight
    });
  }, [columnWidth, rowHeight, onDrop]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <div className="absolute inset-0 grid gap-0" style={{
      gridTemplateColumns: `repeat(${columns}, ${columnWidth}px)`,
      gridTemplateRows: `repeat(${rows}, ${rowHeight}px)`,
      width: gridMetrics.totalWidth,
      height: gridMetrics.totalHeight
    }}>
      {Array.from({ length: columns * rows }, (_, index) => {
        const col = index % columns;
        const row = Math.floor(index / columns);
        
        return (
          <div
            key={index}
            className="border border-transparent hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-crosshair"
            onDrop={(e) => handleDrop(e, col, row)}
            onDragOver={handleDragOver}
            title={`Drop zone ${col + 1}, ${row + 1}`}
          />
        );
      })}
    </div>
  );
};

// Grid Component (draggable element)
const GridComponent = ({ 
  component, 
  isSelected, 
  onSelect, 
  gridConfig, 
  gridMetrics, 
  calculateSnapPosition 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return; // Only left click
    
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
    onSelect(component.id);
    
    e.preventDefault();
  }, [component.id, onSelect]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    const canvas = e.currentTarget.closest('[data-canvas]');
    if (!canvas) return;

    const canvasRect = canvas.getBoundingClientRect();
    const newPosition = {
      x: e.clientX - canvasRect.left - dragOffset.x,
      y: e.clientY - canvasRect.top - dragOffset.y
    };

    const snapResult = calculateSnapPosition(newPosition, {
      width: component.size.width * gridMetrics.columnWidth,
      height: component.size.height * gridMetrics.rowHeight
    });

    // Update component position
    // This would typically update through a parent callback
    console.log('New position:', snapResult.position);
  }, [isDragging, dragOffset, calculateSnapPosition, component.size, gridMetrics]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      className={`absolute bg-white border-2 rounded-lg shadow-md cursor-move transition-all ${
        isSelected ? 'border-blue-500 shadow-lg' : 'border-gray-300 hover:border-gray-400'
      } ${isDragging ? 'z-50' : 'z-10'}`}
      style={{
        left: component.position.x,
        top: component.position.y,
        width: component.size.width * gridMetrics.columnWidth - gridConfig.gap,
        height: component.size.height * gridMetrics.rowHeight - gridConfig.gap
      }}
      onMouseDown={handleMouseDown}
      data-component={component.id}
    >
      <div className="p-4 h-full flex items-center justify-center">
        <span className="text-sm font-medium text-gray-700">
          {component.content}
        </span>
      </div>
      
      {isSelected && (
        <>
          {/* Resize Handles */}
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-se-resize" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-ne-resize" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-sw-resize" />
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-nw-resize" />
          
          {/* Grid Position Indicator */}
          <div className="absolute -top-8 left-0 bg-blue-500 text-white px-2 py-1 rounded text-xs">
            {Math.floor(component.position.x / gridMetrics.columnWidth) + 1},
            {Math.floor(component.position.y / gridMetrics.rowHeight) + 1}
          </div>
        </>
      )}
    </div>
  );
};

// Grid Properties Panel
const GridPropertiesPanel = ({ component, onUpdate, gridConfig, sections }) => {
  if (!component) return null;

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Element Properties</h3>
      
      <div className="space-y-6">
        {/* Basic Properties */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Basic</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Content</label>
              <input
                type="text"
                value={component.content}
                onChange={(e) => onUpdate({ content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Grid Position */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Grid Position</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Column</label>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Row</label>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Grid Size */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Grid Size</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Width (cols)</label>
              <input
                type="number"
                min="1"
                max={gridConfig.columns}
                value={component.size.width}
                onChange={(e) => onUpdate({ size: { ...component.size, width: parseInt(e.target.value) } })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Height (rows)</label>
              <input
                type="number"
                min="1"
                max={gridConfig.rows}
                value={component.size.height}
                onChange={(e) => onUpdate({ size: { ...component.size, height: parseInt(e.target.value) } })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section Assignment */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Section</h4>
          <select
            value={component.section || ''}
            onChange={(e) => onUpdate({ section: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">No section</option>
            {sections.map(section => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Actions */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onUpdate({ 
                position: { x: 0, y: component.position.y } 
              })}
              className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
            >
              <AlignLeft className="w-4 h-4" />
              <span>Left</span>
            </button>
            <button
              onClick={() => {
                const centerX = ((gridConfig.columns - component.size.width) / 2) * (gridConfig.cellSize + gridConfig.gap);
                onUpdate({ position: { ...component.position, x: centerX } });
              }}
              className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
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

export default EnhancedGridSystem;