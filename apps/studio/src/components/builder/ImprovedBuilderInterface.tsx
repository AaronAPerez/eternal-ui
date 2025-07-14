import React from 'react';
import { 
  Grid, 
  Eye, 
  EyeOff, 
  Move, 
  Settings, 
  Layers, 
  Sun, 
  Moon, 
  Code,
  Plus,
  Download,
  Library,
  ZoomIn,
  ZoomOut,
  Maximize,
  Monitor,
  Tablet,
  Smartphone,
  RotateCcw,
  Ruler,
  Navigation,
  Globe,
  Layout,
  Save
} from 'lucide-react';
import useBuilderLayout from '@/hooks/useBuilderLayout';
import BuilderToolbar from '../builder/BuilderToolbar';
import BuilderSidebar from '../builder/BuilderSidebar';
import BuilderCanvas from './BuilderCanvas';
import GridControlsPanel from '../grid/GridControlsPanel';

/**
 * Improved Builder Interface
 * 
 * Complete builder interface with fixed layout structure:
 * - Fixed toolbar at the top
 * - Collapsible sidebar for components
 * - Scrollable canvas with proper overflow handling
 * - Grid controls panel
 * - Responsive design that works on all screen sizes
 */
const ImprovedBuilderInterface: React.FC = () => {
  const builderLayout = useBuilderLayout();

  const {
    currentViewport,
    zoomLevel,
    showComponentLibrary,
    showGridControls,
    showSectionOutlines,
    selectedComponent,
    theme,
    gridConfig,
    scaledViewport,
    canZoomIn,
    canZoomOut,
    themeColors,
    // Actions
    setViewport,
    setZoom,
    zoomIn,
    zoomOut,
    resetZoom,
    fitToScreen,
    toggleComponentLibrary,
    toggleGridControls,
    toggleSectionOutlines,
    selectComponent,
    toggleTheme,
    updateGridConfig,
    // Refs
    canvasRef,
    scrollContainerRef,
    // Constants
    VIEWPORT_SIZES,
    ZOOM_LEVELS
  } = builderLayout;

  return (
    <div className="builder-main">
      {/* Fixed Toolbar */}
      <BuilderToolbar
        currentViewport={currentViewport}
        zoomLevel={zoomLevel}
        canZoomIn={canZoomIn}
        canZoomOut={canZoomOut}
        theme={theme}
        showGridControls={showGridControls}
        showComponentLibrary={showComponentLibrary}
        gridVisible={gridConfig.visible}
        viewportSizes={VIEWPORT_SIZES}
        onViewportChange={setViewport}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onResetZoom={resetZoom}
        onFitToScreen={fitToScreen}
        onToggleGrid={toggleGridControls}
        onToggleLibrary={toggleComponentLibrary}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <div className="builder-main">
        {/* Component Library Sidebar */}
        {showComponentLibrary && (
          <BuilderSidebar
            theme={theme}
            onClose={() => toggleComponentLibrary()}
          />
        )}

        {/* Canvas Container */}
        <div className="builder-canvas-container">
          {/* Grid Controls Panel */}
          {showGridControls && (
            <GridControlsPanel
              gridConfig={gridConfig}
              theme={theme}
              onConfigChange={updateGridConfig}
              onToggleOutlines={toggleSectionOutlines}
              showOutlines={showSectionOutlines}
            />
          )}

          {/* Scrollable Canvas */}
          <BuilderCanvas
            ref={scrollContainerRef}
            canvasRef={canvasRef}
            currentViewport={currentViewport}
            zoomLevel={zoomLevel}
            gridConfig={gridConfig}
            showSectionOutlines={showSectionOutlines}
            selectedComponent={selectedComponent}
            theme={theme}
            themeColors={themeColors}
            onSelectComponent={selectComponent}
          />
        </div>
      </div>
    </div>
  );
};

export default ImprovedBuilderInterface;