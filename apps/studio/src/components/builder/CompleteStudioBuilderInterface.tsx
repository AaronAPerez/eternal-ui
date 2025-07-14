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
import { EnhancedGridSystem } from '../EnhancedGridSystem';

// Import your enhanced grid system


// Complete Studio Builder Interface with Enhanced Grid Integration
const CompleteStudioBuilderInterface = () => {
  const [builderMode, setBuilderMode] = useState('visual'); // 'visual' | 'advanced' | 'components' | 'grid'
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [viewMode, setViewMode] = useState('desktop');

  // Grid system hook
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
        gridConfig={gridConfig}
        gridMetrics={gridMetrics}
        isSnapping={isSnapping}
      />
    </div>
  );
};

// Enhanced Studio Toolbar with Grid Controls
const CompleteStudioToolbar = ({ 
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
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-gray-900">Eternal UI Studio</span>
        </div>
        
        {/* Enhanced Mode Switcher */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onModeChange('visual')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'visual' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Palette className="w-4 h-4 inline mr-2" />
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
            <Square className="w-4 h-4 inline mr-2" />
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
                gridConfig.snapEnabled 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Snap to Grid"
            >
              {gridConfig.snapEnabled ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
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
                viewMode === 'desktop' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('tablet')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'tablet' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200'
              }`}
              title="Tablet View"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('mobile')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'mobile' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200'
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      
      {/* Toolbar Actions */}
      <div className="flex items-center space-x-3">
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

// Grid Builder Mode - Full Enhanced Grid System
const GridBuilderMode = ({ gridConfig, updateGridConfig, calculateSnapPosition, gridMetrics }) => {
  return (
    <div className="flex-1">
      <EnhancedGridSystem children={undefined} />
    </div>
  );
};

// Visual Builder Mode (Your existing basic builder)
const VisualBuilderMode = ({ leftPanelOpen, rightPanelOpen, viewMode }) => {
  return (
    <>
      {leftPanelOpen && (
        <div className="w-80 bg-white border-r border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Basic Components</h3>
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
      
      <div className={`flex-1 bg-gray-100 p-6`}>
        <div className={`bg-white rounded-lg shadow-sm border h-full flex items-center justify-center ${
          viewMode === 'mobile' ? 'max-w-sm mx-auto' :
          viewMode === 'tablet' ? 'max-w-2xl mx-auto' : 'w-full'
        }`}>
          <div className="text-center text-gray-500">
            <Layout className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">Visual Builder Canvas</h3>
            <p>Simple drag & drop interface for beginners</p>
          </div>
        </div>
      </div>
      
      {rightPanelOpen && (
        <div className="w-80 bg-white border-l border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Properties</h3>
          <div className="text-sm text-gray-500">
            Select an element to edit its properties
          </div>
        </div>
      )}
    </>
  );
};

// Advanced Builder Mode (Your enhanced component builder)
const AdvancedBuilderMode = ({ leftPanelOpen, rightPanelOpen, viewMode }) => {
  // Your existing advanced builder implementation
  return (
    <div className="flex-1 flex">
      <div className="flex-1 bg-gray-100 p-6">
        <div className={`bg-white rounded-lg shadow-sm border h-full flex items-center justify-center ${
          viewMode === 'mobile' ? 'max-w-sm mx-auto' :
          viewMode === 'tablet' ? 'max-w-2xl mx-auto' : 'w-full'
        }`}>
          <div className="text-center text-gray-500">
            <Grid className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">Advanced Component Builder</h3>
            <p>Professional drag & drop with component library</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Components Page Mode (Your component library page)
const ComponentsPageMode = () => {
  return (
    <div className="flex-1 bg-white">
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Layers className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">Component Library</h3>
          <p>Browse and customize components with live code editing</p>
        </div>
      </div>
    </div>
  );
};

// Enhanced Status Bar with Grid Information
const StudioStatusBar = ({ mode, viewMode, gridConfig, gridMetrics, isSnapping }) => {
  return (
    <div className="bg-white border-t border-gray-200 px-6 py-2 flex items-center justify-between text-sm text-gray-600">
      <div className="flex items-center space-x-6">
        <span className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span>Builder: {mode}</span>
        </span>
        
        {(mode === 'visual' || mode === 'advanced' || mode === 'grid') && (
          <>
            <span>View: {viewMode}</span>
            
            {gridConfig.visible && (
              <span className="flex items-center space-x-4">
                <span>Grid: {gridConfig.columns}×{gridConfig.rows}</span>
                <span>Cell: {gridConfig.cellSize}px</span>
                <span>Gap: {gridConfig.gap}px</span>
              </span>
            )}
            
            {isSnapping && (
              <span className="flex items-center space-x-1 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Snap Active</span>
              </span>
            )}
          </>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <span>Performance: Excellent</span>
        <span className="flex items-center space-x-1">
          <Eye className="w-4 h-4" />
          <span>Live Preview</span>
        </span>
      </div>
    </div>
  );
};

export default CompleteStudioBuilderInterface;