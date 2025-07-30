import React from 'react';
import { useBuilderStore } from '@/stores/builderStore';
import { useUIStore } from '@/stores/uiStore';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { GridOverlay } from './GridOverlay';
import { RulerOverlay } from './RulerOverlay';
import { SnapGuides } from './SnapGuides';
import { SelectionBox } from './SelectionBox';
import { DesignGuideOverlay } from './DesignGuideOverlay';
import { ComponentRenderer } from './ComponentRenderer';
import { PerformanceOverlay } from './PerformanceOverlay';
import { TouchSimulation } from './TouchSimulation';

interface CanvasProps {
  className?: string;
  zoom?: number;
  showGrid?: boolean;
  showRulers?: boolean;
  showDesignGuide?: boolean;
  device?: 'mobile' | 'tablet' | 'desktop' | 'wide';
  onDrop?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  performanceMetrics?: {
    renderTime: number;
    memoryUsage: number;
    domNodes: number;
    fps: number;
  };
}

export const Canvas: React.FC<CanvasProps> = ({ 
  className = '',
  zoom: propZoom,
  showGrid: propShowGrid,
  showRulers: propShowRulers,
  showDesignGuide: propShowDesignGuide,
  device: propDevice,
  onDrop,
  onDragOver,
  performanceMetrics: propPerformanceMetrics
}) => {
  // Store selectors (use props when provided, fallback to store)
  const storeZoom = useBuilderStore(state => state.zoom);
  const storeDevice = useBuilderStore(state => state.device);
  const storeShowGrid = useBuilderStore(state => state.showGrid);
  const project = useBuilderStore(state => state.project);
  const selectComponent = useBuilderStore(state => state.selectComponent);
  const selectedComponents = useBuilderStore(state => state.selectedComponents);
  
  const storeShowRulers = useUIStore(state => state.showRulers);
  const storeShowDesignGuide = useUIStore(state => state.showDesignGuide);
  const storePerformanceMetrics = useUIStore(state => state.performanceMetrics);

  // Use props or fallback to store values
  const zoom = propZoom ?? storeZoom;
  const device = propDevice ?? storeDevice;
  const showGrid = propShowGrid ?? storeShowGrid;
  const showRulers = propShowRulers ?? storeShowRulers;
  const showDesignGuide = propShowDesignGuide ?? storeShowDesignGuide;
  const performanceMetrics = propPerformanceMetrics ?? storePerformanceMetrics;
  
  // Custom hooks
  const dragAndDrop = useDragAndDrop();
  
  // Device dimensions
  const getDeviceWidth = () => {
    const widths = { mobile: 375, tablet: 768, desktop: 1200, wide: 1920 };
    return widths[device as keyof typeof widths] || 1200;
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      selectComponent(null);
    }
  };

  return (
    <div className={`flex-1 flex flex-col bg-gray-100 ${className}`}>
      {/* Rulers */}
      {showRulers && <RulerOverlay zoom={zoom} deviceWidth={getDeviceWidth()} />}
      
      {/* Canvas Container */}
      <div className="flex-1 overflow-auto">
        <div 
          className="min-h-full flex justify-center p-8"
          style={{ 
            paddingTop: showRulers ? '56px' : '32px',
            paddingLeft: showRulers ? '56px' : '32px' 
          }}
        >
          <div
            ref={dragAndDrop.canvasRef}
            className="bg-white shadow-lg relative overflow-hidden"
            style={{
              width: `${getDeviceWidth()}px`,
              minHeight: '800px',
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top left'
            }}
            onDrop={onDrop || dragAndDrop.handleDrop}
            onDragOver={onDragOver || dragAndDrop.handleDragOver}
            onClick={handleCanvasClick}
          >
            {/* Grid System */}
            {showGrid && <GridOverlay />}
            
            {/* Design Guide */}
            {showDesignGuide && <DesignGuideOverlay />}
            
            {/* Snap Guides */}
            <SnapGuides />
            
            {/* Selection Box */}
            <SelectionBox />
            
            {/* Touch Simulation for Mobile */}
            {device === 'mobile' && <TouchSimulation />}
            
            {/* Component Renderer */}
            <ComponentRenderer 
              components={project.components}
              onComponentMouseDown={dragAndDrop.handleComponentDragStart}
            />
            
            {/* Performance Overlay */}
            <PerformanceOverlay 
              metrics={performanceMetrics}
              zoom={zoom}
              showGrid={showGrid}
              componentCount={project.components.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};