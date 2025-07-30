'use client';

import React, { useState } from 'react';
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
// import { useBulkOperations } from '@/hooks/useBulkOperations';
import { DragDropProvider } from './DragDrop/DragDropProvider';
import { AIGeneratorButton } from '../AI/AIGeneratorPanel';
import { DraggableComponent } from './DragDrop/DraggableComponent';
import { ExportDialog } from '@/hooks/export/ExportDialog';
import TemplateMarketplace from '@/hooks/templates/TemplateMarketplace';

const WebsiteBuilderStudio = () => {
  const [showTemplates, setShowTemplates] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
    const { 
    project, 
    selection, 
    selectComponent, 
    toggleComponentSelection,
    undo, 
    redo, 
    history 
  } = useBuilderStore();

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

  // const bulkOps = useBulkOperations(); // Available for multi-select operations
  
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
    <DragDropProvider>
      <div className="h-screen flex flex-col">
        {/* Toolbar */}
            <div className="h-16 bg-white border-b flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">Eternal UI Studio</span>
              {/* Undo/Redo buttons */}
              <button 
                onClick={undo}
                disabled={history.past.length === 0}
                className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
                title="Undo (Ctrl+Z)"
              >
                ↶
              </button>
              <button 
                onClick={redo}
                disabled={history.future.length === 0}
                className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
                title="Redo (Ctrl+Y)"
              >
                ↷
              </button>
            </div>
            
            {/* AI Generator Button */}
            <AIGeneratorButton 
              variant="primary" 
              size="md"
              onGenerate={(component) => {
                console.log('AI Generated component:', component);
              }}
            />
          </div>

           <button
            onClick={() => setShowTemplates(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            📚 Templates
          </button>
          
          <button
            onClick={() => setShowExport(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            📤 Export
          </button>
          
          <div className="flex items-center gap-2">
            {/* Selection info */}
            {selection.selectedComponents.length > 0 && (
              <span className="text-sm text-gray-600">
                {selection.selectedComponents.length} component{selection.selectedComponents.length !== 1 ? 's' : ''} selected
              </span>
            )}
          </div>
        </div>
        
        {/* Main Canvas Area */}
        <div className="flex-1 flex">
          {/* Your existing canvas implementation */}
          <div className="flex-1 relative bg-gray-100">
            {/* Canvas with enhanced components */}
            {project.components.map(component => (
              <DraggableComponent
                key={component.id}
                id={component.id}
                component={component as any}
                isSelected={selection.selectedComponents.includes(component.id)}
                onSelect={(id, multiSelect) => {
                  if (multiSelect) {
                    toggleComponentSelection(id);
                  } else {
                    selectComponent(id);
                  }
                }}
              >
                <div>{component.type}</div>
              </DraggableComponent>
            ))}
          </div>
        </div>
      </div>
        {/* Template Marketplace Modal */}
      {showTemplates && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-6xl mx-4 h-[90vh]">
            <TemplateMarketplace
              onTemplateSelect={setSelectedTemplate}
              onTemplateApply={(template) => {
                console.log('Applied template:', template);
                setShowTemplates(false);
              }}
            />
            <button
              onClick={() => setShowTemplates(false)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Export Dialog */}
      {showExport && selectedTemplate && (
        <ExportDialog
          template={selectedTemplate}
          isOpen={showExport}
          onClose={() => setShowExport(false)}
          onExportComplete={(downloadUrl) => {
            console.log('Export ready:', downloadUrl);
          }}
        />
      )}
    </DragDropProvider>
  );
};

export default WebsiteBuilderStudio;