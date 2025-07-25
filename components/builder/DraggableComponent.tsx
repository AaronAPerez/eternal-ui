'use client';

import { useState, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';
import { Resize } from 'react-resize-detector';
import { Move, RotateCcw, Copy, Trash2 } from 'lucide-react';
import { DroppedComponent } from './VisualBuilder';
import { GridSystem } from '@/lib/grid-system';

interface DraggableComponentProps {
  component: DroppedComponent;
  isSelected: boolean;
  previewMode: boolean;
  onSelect: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (width: number, height: number) => void;
  gridSystem: GridSystem;
  canvasWidth: number;
}

export function DraggableComponent({
  component,
  isSelected,
  previewMode,
  onSelect,
  onMove,
  onResize,
  gridSystem,
  canvasWidth
}: DraggableComponentProps) {
  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const [{ isDragging: dragMonitor }, drag, preview] = useDrag({
    type: 'placed-component',
    item: { id: component.id },
    begin: () => {
      setIsDragging(true);
      onSelect();
    },
    end: () => {
      setIsDragging(false);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Render the actual component based on its type
  const renderComponent = () => {
    const { component: componentDef, props, style } = component;
    
    // This would render the actual component implementation
    // For demo purposes, we'll render a placeholder
    return (
      <div
        className="w-full h-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-800"
        style={style}
      >
        <div className="text-center">
          <div className="text-lg font-medium text-gray-900 dark:text-white">
            {componentDef.name}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {componentDef.description}
          </div>
          {/* Preview of actual component would go here */}
          <div className="mt-2 text-xs text-gray-500">
            {JSON.stringify(props, null, 2).slice(0, 100)}...
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`absolute group ${previewMode ? '' : 'cursor-move'} ${
        isSelected ? 'z-50' : 'z-10'
      }`}
      style={{
        left: component.x,
        top: component.y,
        width: component.width,
        height: component.height,
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!previewMode) onSelect();
      }}
      onMouseDown={(e) => {
        if (previewMode) return;
        
        const startX = e.clientX - component.x;
        const startY = e.clientY - component.y;

        const handleMouseMove = (e: MouseEvent) => {
          const newX = e.clientX - startX;
          const newY = e.clientY - startY;
          onMove(newX, newY);
        };

        const handleMouseUp = () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }}
    >
      {/* Component Content */}
      <div className="w-full h-full">
        {renderComponent()}
      </div>

      {/* Selection Overlay */}
      {isSelected && !previewMode && (
        <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none">
          {/* Corner Handles for Resizing */}
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full pointer-events-auto cursor-nw-resize" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full pointer-events-auto cursor-ne-resize" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full pointer-events-auto cursor-sw-resize" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full pointer-events-auto cursor-se-resize" />
          
          {/* Edge Handles */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full pointer-events-auto cursor-n-resize" />
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full pointer-events-auto cursor-s-resize" />
          <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full pointer-events-auto cursor-w-resize" />
          <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full pointer-events-auto cursor-e-resize" />
        </div>
      )}

      {/* Component Toolbar */}
      {isSelected && !previewMode && (
        <div className="absolute -top-10 left-0 flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded text-xs">
          <span className="font-medium">{component.component.name}</span>
          <div className="flex items-center gap-1 ml-2">
            <button className="p-1 hover:bg-blue-600 rounded">
              <Move className="w-3 h-3" />
            </button>
            <button className="p-1 hover:bg-blue-600 rounded">
              <Copy className="w-3 h-3" />
            </button>
            <button className="p-1 hover:bg-red-500 rounded">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Resize Detector */}
      <Resize
        handleWidth
        handleHeight
        onResize={(width, height) => {
          if (width && height) {
            onResize(width, height);
          }
        }}
      />

      {/* Snap Guidelines */}
      {isDragging && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid snap indicators would be rendered here */}
        </div>
      )}
    </motion.div>
  );
}