'use client';

import React from 'react';
import { 
  Sparkles, Play, Download, Palette, Info,
  ZoomIn, ZoomOut, Maximize2, Grid, Ruler,
  RotateCcw, Users 
} from 'lucide-react';

// Import stores and hooks
import { useBuilderStore } from '@/hooks/useBuilderStore';
import { useHistoryStore } from '@/stores/historyStore';
import { useUIStore } from '@/stores/uiStore';
import { useStores } from '@/hooks/useStores';

// Import custom hooks 
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

// Import components 
import { Toolbar } from './Toolbar/Toolbar';
import { ComponentLibrary } from './Sidebar/ComponentLibrary';
import { PropertiesPanel } from './Sidebar/PropertiesPanel';
import { Canvas } from './Canvas/Canvas';
import { PreviewMode } from './Preview/PreviewMode';
import { StatusBar } from './StatusBar/StatusBar';
import { useBulkOperations } from '@/hooks/useBulkOperations';

const WebsiteBuilderStudio = () => {
  // ============================================
  // STORE SELECTORS (Replace all useState)
  // ============================================
  
  // Builder state
  const isPreviewMode = useBuilderStore(state => state.isPreviewMode);
  const selectedTool = useBuilderStore(state => state.selectedTool);
  const device = useBuilderStore(state => state.device);
  const zoom = useBuilderStore(state => state.zoom);
  const showGrid = useBuilderStore(state => state.showGrid);
  const projectName = useBuilderStore(state => state.project.name);
  const componentCount = useBuilderStore(state => state.project.components.length);
  
  // UI state  
  const showDesignGuide = useUIStore(state => state.showDesignGuide);
  const showRulers = useUIStore(state => state.showRulers);
  const performanceMetrics = useUIStore(state => state.performanceMetrics);
  
  // History state
  const canUndo = useHistoryStore(state => state.canUndo());
  const canRedo = useHistoryStore(state => state.canRedo());
  
  // Actions (no manual state setters)
  const { togglePreviewMode, setSelectedTool, setDevice, setZoom, toggleGrid } = useBuilderStore();
  const { toggleDesignGuide, toggleRulers } = useUIStore();
  const { actions } = useStores(); // Integrated actions
  
  // ============================================
  // CUSTOM HOOKS 
  // ============================================
  
  // All drag & drop logic moved to custom hook
  const dragAndDrop = useDragAndDrop();

  const bulkOps = useBulkOperations(); // Available for multi-select operations
  
  // All keyboard shortcuts moved to custom hook
  useKeyboardShortcuts();
  
  // Performance monitoring moved to custom hook
  usePerformanceMonitor();

  
  // ============================================
  // SIMPLE EVENT HANDLERS 
  // ============================================
  
  const handleZoomIn = () => setZoom(Math.min(zoom + 25, 300));
  const handleZoomOut = () => setZoom(Math.max(zoom - 25, 25));
  const handleFitToCanvas = () => setZoom(100);
  
  // ============================================
  // RENDER 
  // ============================================
  
  // Early return for preview mode
  if (isPreviewMode) {
    return <PreviewMode />;
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Top Toolbar */}
      <Toolbar
        projectName={projectName}
        selectedTool={selectedTool}
        onToolChange={setSelectedTool}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={actions.undo}
        onRedo={actions.redo}
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFitToCanvas={handleFitToCanvas}
        showGrid={showGrid}
        onToggleGrid={toggleGrid}
        showRulers={showRulers}
        onToggleRulers={toggleRulers}
        device={device}
        onDeviceChange={setDevice}
        showDesignGuide={showDesignGuide}
        onToggleDesignGuide={toggleDesignGuide}
        onTogglePreview={togglePreviewMode}
      />

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Component Library */}
        <ComponentLibrary 
          onDragStart={dragAndDrop.handleDragStart}
        />

        {/* Center Canvas */}
        <Canvas
          zoom={zoom}
          showGrid={showGrid}
          showRulers={showRulers}
          showDesignGuide={showDesignGuide}
          device={device}
          onDrop={dragAndDrop.handleDrop}
          onDragOver={dragAndDrop.handleDragOver}
          performanceMetrics={performanceMetrics}
        />

        {/* Right Sidebar - Properties */}
        <PropertiesPanel />
      </div>

      {/* Bottom Status Bar */}
      <StatusBar
        componentCount={componentCount}
        device={device}
        zoom={zoom}
        performanceMetrics={performanceMetrics}
      />
    </div>
  );
};

export default WebsiteBuilderStudio;