// IMMEDIATE FIX 1: apps/studio/src/components/builder/CompleteStudioBuilderInterface.tsx
// Replace the problematic import and hook usage

import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Grid,
  Layers,
  Settings,
  Palette,
  Move,
  Square,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Code,
  Save,
  Download,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react';

// TEMPORARY: Create a simple local hook instead of importing from broken package
const useGridSnap = () => {
  const [gridConfig, setGridConfig] = useState({
    visible: true,
    enabled: true,
    size: 20,
    snap: {
      enabled: true,
      threshold: 10,
      corners: true,
      edges: true,
      center: true,
    },
    style: 'lines',
    color: '#e5e7eb',
    opacity: 0.5,
    columns: 24,
    rows: 24,
  });

  const [isSnapping, setIsSnapping] = useState(false);

  const updateGridConfig = (updates: any) => {
    setGridConfig(prev => ({ ...prev, ...updates }));
  };

  const toggleGrid = () => {
    setGridConfig(prev => ({ ...prev, visible: !prev.visible }));
  };

  const calculateSnapPosition = (position: { x: number; y: number }) => {
    if (!gridConfig.snap.enabled) return position;
    
    setIsSnapping(true);
    setTimeout(() => setIsSnapping(false), 200);
    
    const cellSize = gridConfig.size;
    const snapThreshold = gridConfig.snap.threshold;
    const nearestX = Math.round(position.x / cellSize) * cellSize;
    const nearestY = Math.round(position.y / cellSize) * cellSize;
    
    const distanceX = Math.abs(position.x - nearestX);
    const distanceY = Math.abs(position.y - nearestY);
    
    return {
      x: distanceX <= snapThreshold ? nearestX : position.x,
      y: distanceY <= snapThreshold ? nearestY : position.y,
    };
  };

  const gridMetrics = {
    cellSize: gridConfig.size,
    totalWidth: gridConfig.columns * gridConfig.size,
    totalHeight: gridConfig.rows * gridConfig.size,
  };

  return {
    gridConfig,
    updateGridConfig,
    toggleGrid,
    calculateSnapPosition,
    gridMetrics,
    isSnapping
  };
};

// Complete Studio Builder Interface with Enhanced Grid Integration
const CompleteStudioBuilderInterface = () => {
  const [builderMode, setBuilderMode] = useState('visual'); // 'visual' | 'advanced' | 'components' | 'grid'
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [viewMode, setViewMode] = useState('desktop');

  // Grid system hook - now working locally
  const {
    gridConfig,
    updateGridConfig,
    toggleGrid,
    calculateSnapPosition,
    gridMetrics,
    isSnapping
  } = useGridSnap();

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Enhanced Studio Toolbar */}
      <CompleteStudioToolbar 
        mode={builderMode}
        onModeChange={setBuilderMode}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        leftPanelOpen={leftPanelOpen}
        rightPanelOpen={rightPanelOpen}
        onToggleLeftPanel={() => setLeftPanelOpen(!leftPanelOpen)}
        onToggleRightPanel={() => setRightPanelOpen(!rightPanelOpen)}
        gridConfig={gridConfig}
        onToggleGrid={toggleGrid}
        isSnapping={isSnapping}
      />
      
      {/* Main Content Based on Mode */}
      <div className="flex-1 flex overflow-hidden">
        {builderMode === 'visual' && (
          <VisualBuilderMode 
            leftPanelOpen={leftPanelOpen}
            rightPanelOpen={rightPanelOpen}
            viewMode={viewMode}
          />
        )}
        
        {builderMode === 'advanced' && (
          <AdvancedBuilderMode 
            leftPanelOpen={leftPanelOpen}
            rightPanelOpen={rightPanelOpen}
            viewMode={viewMode}
          />
        )}
        
        {builderMode === 'components' && (
          <ComponentsPageMode />
        )}

        {builderMode === 'grid' && (
          <GridBuilderMode 
            gridConfig={gridConfig}
            updateGridConfig={updateGridConfig}
            calculateSnapPosition={calculateSnapPosition}
            gridMetrics={gridMetrics}
          />
        )}
      </div>

      {/* Status Bar with Grid Info */}
      <StudioStatusBar 
        mode={builderMode}
        viewMode={viewMode}
        gridMetrics={gridMetrics}
        isSnapping={isSnapping}
      />
    </div>
  );
};

// Enhanced Studio Toolbar Component with proper TypeScript
interface ToolbarProps {
  mode: string;
  onModeChange: (mode: string) => void;
  viewMode: string;
  onViewModeChange: (view: string) => void;
  leftPanelOpen: boolean;
  rightPanelOpen: boolean;
  onToggleLeftPanel: () => void;
  onToggleRightPanel: () => void;
  gridConfig: any;
  onToggleGrid: () => void;
  isSnapping: boolean;
}

const CompleteStudioToolbar: React.FC<ToolbarProps> = ({ 
  mode, 
  onModeChange, 
  viewMode, 
  onViewModeChange,
  leftPanelOpen,
  rightPanelOpen,
  onToggleLeftPanel,
  onToggleRightPanel,
  gridConfig,
  onToggleGrid,
  isSnapping 
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-6">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-2">
          <Layout className="w-6 h-6 text-blue-600" />
          <span className="font-bold text-gray-900">Eternal UI Studio</span>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onModeChange('visual')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'visual' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Square className="w-4 h-4 inline mr-2" />
            Visual
          </button>
          <button
            onClick={() => onModeChange('advanced')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'advanced' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Advanced
          </button>
          <button
            onClick={() => onModeChange('grid')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'grid' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Grid className="w-4 h-4 inline mr-2" />
            Grid System
          </button>
          <button
            onClick={() => onModeChange('components')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'components' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Layers className="w-4 h-4 inline mr-2" />
            Components
          </button>
        </div>

        {/* Grid Quick Controls */}
        {(mode === 'visual' || mode === 'advanced' || mode === 'grid') && (
          <div className="flex items-center space-x-2 border-l border-gray-300 pl-4">
            <button
              onClick={onToggleGrid}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors ${
                gridConfig.visible 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Toggle Grid Overlay"
            >
              {gridConfig.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="text-sm">Grid</span>
            </button>
            
            <button
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors ${
                gridConfig.snap.enabled 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Snap to Grid"
            >
              {gridConfig.snap.enabled ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              <span className="text-sm">Snap</span>
            </button>

            {isSnapping && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-green-50 border border-green-200 rounded text-xs text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Snapping</span>
              </div>
            )}
          </div>
        )}

        {/* View Mode Controls */}
        {mode !== 'components' && (
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('desktop')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'desktop' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('tablet')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'tablet' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Tablet View"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('mobile')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'mobile' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Panel Controls */}
        {mode !== 'components' && (
          <>
            <button
              onClick={onToggleLeftPanel}
              className={`p-2 rounded-lg transition-colors ${
                leftPanelOpen ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100'
              }`}
              title="Toggle Left Panel"
            >
              <Layers className="w-4 h-4" />
            </button>
            <button
              onClick={onToggleRightPanel}
              className={`p-2 rounded-lg transition-colors ${
                rightPanelOpen ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100'
              }`}
              title="Toggle Properties Panel"
            >
              <Settings className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-2">
        <div className="w-px h-6 bg-gray-300" />
        
        <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <Eye className="w-4 h-4" />
          <span className="text-sm">Preview</span>
        </button>
        
        <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
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
  );
};

// Placeholder components for different modes
interface ModeProps {
  leftPanelOpen?: boolean;
  rightPanelOpen?: boolean;
  viewMode?: string;
}

const VisualBuilderMode: React.FC<ModeProps> = ({ leftPanelOpen, rightPanelOpen, viewMode }) => (
  <div className="flex-1 flex">
    {leftPanelOpen && (
      <div className="w-80 bg-white border-r border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Components</h3>
        <div className="space-y-2">
          {['Button', 'Text', 'Image', 'Container'].map(component => (
            <div key={component} className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer">
              <div className="flex items-center">
                <Square className="w-5 h-5 text-gray-500 mr-3" />
                <span className="text-sm">{component}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
    
    <div className="flex-1 bg-gray-100 p-6">
      <div className={`bg-white rounded-lg shadow-sm border h-full flex items-center justify-center ${
        viewMode === 'mobile' ? 'max-w-sm mx-auto' : 
        viewMode === 'tablet' ? 'max-w-md mx-auto' : 'w-full'
      }`}>
        <p className="text-gray-500">Canvas Area - Drag components here</p>
      </div>
    </div>

    {rightPanelOpen && (
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Properties</h3>
        <p className="text-gray-500 text-sm">Select a component to edit properties</p>
      </div>
    )}
  </div>
);

const AdvancedBuilderMode: React.FC<ModeProps> = ({ leftPanelOpen, rightPanelOpen, viewMode }) => (
  <div className="flex-1 flex items-center justify-center bg-gray-50">
    <p className="text-gray-500">Advanced Builder Mode - Coming Soon</p>
  </div>
);

const ComponentsPageMode: React.FC = () => (
  <div className="flex-1 flex items-center justify-center bg-gray-50">
    <p className="text-gray-500">Components Page Mode - Coming Soon</p>
  </div>
);

interface GridModeProps {
  gridConfig: any;
  updateGridConfig: (updates: any) => void;
  calculateSnapPosition: (pos: { x: number; y: number }) => { x: number; y: number };
  gridMetrics: any;
}

const GridBuilderMode: React.FC<GridModeProps> = ({ gridConfig, updateGridConfig, calculateSnapPosition, gridMetrics }) => (
  <div className="flex-1 flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Grid Builder Mode</h2>
      <p className="text-gray-500 mb-4">Advanced grid system with snap-to-grid functionality</p>
      <div className="bg-white p-4 rounded-lg shadow-sm border inline-block">
        <p className="text-sm text-gray-600">
          Grid Size: {gridMetrics.cellSize}px | 
          Columns: {gridConfig.columns} | 
          Rows: {gridConfig.rows}
        </p>
      </div>
    </div>
  </div>
);

interface StatusProps {
  mode: string;
  viewMode: string;
  gridMetrics: any;
  isSnapping: boolean;
}

const StudioStatusBar: React.FC<StatusProps> = ({ mode, viewMode, gridMetrics, isSnapping }) => (
  <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 flex items-center justify-between text-xs text-gray-600">
    <div className="flex items-center space-x-4">
      <span>Mode: {mode}</span>
      <span>View: {viewMode}</span>
      {gridMetrics && (
        <span>Grid: {gridMetrics.cellSize}px</span>
      )}
      {isSnapping && (
        <span className="text-green-600 font-medium">● Snapping Active</span>
      )}
    </div>
    <div>Ready</div>
  </div>
);

export default CompleteStudioBuilderInterface;