'use client';

import React, { useRef, useCallback, useState, useEffect } from 'react';
import { CanvasElement } from './CanvasElement';

interface StudioCanvasProps {
  mode: 'desktop' | 'tablet' | 'mobile';
  elements: null[];
  selectedElement: null | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: null) => void;
  onDeleteElement: (id: string) => void;
  onDuplicateElement: (id: string) => void;
  onAddElement: (component: null, position?: { x: number; y: number }) => void;
  zoom: number;
  gridEnabled: boolean;
  snapToGrid: boolean;
  isDragging: boolean;
}

export function StudioCanvas({
  mode,
  elements,
  selectedElement,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  onDuplicateElement,
  onAddElement,
  zoom,
  gridEnabled,
  snapToGrid,
  isDragging
}: StudioCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 1024, height: 768 });

  // Update canvas size based on mode and screen size
  useEffect(() => {
    const updateCanvasSize = () => {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight - 56; // Subtract toolbar height

      let width, height;
      
      switch (mode) {
        case 'mobile':
          width = Math.min(375, containerWidth - 40);
          height = Math.min(812, containerHeight - 40);
          break;
        case 'tablet':
          width = Math.min(768, containerWidth - 40);
          height = Math.min(1024, containerHeight - 40);
          break;
        case 'desktop':
        default:
          width = Math.min(1024, containerWidth - 40);
          height = Math.min(768, containerHeight - 40);
          break;
      }

      setCanvasSize({ width, height });
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [mode]);

  // Handle canvas click to deselect elements
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onSelectElement(null);
    }
  }, [onSelectElement]);

  // Handle drop events for components from library
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    
    try {
      const componentData = JSON.parse(e.dataTransfer.getData('application/json'));
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      
      if (canvasRect) {
        const position = {
          x: (e.clientX - canvasRect.left) / zoom - 100,
          y: (e.clientY - canvasRect.top) / zoom - 50
        };
        
        onAddElement(componentData, position);
      }
    } catch (error) {
      console.error('Failed to parse dropped component:', error);
    }
  }, [onAddElement, zoom]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  return (
    <div className="flex-1 bg-gray-100 dark:bg-gray-900 relative overflow-auto">
      {/* Grid Background */}
      {gridEnabled && (
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <svg width="100%" height="100%" className="text-gray-300 dark:text-gray-600">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      )}

      {/* Canvas Container */}
      <div className="flex items-center justify-center min-h-full p-4">
        <div
          ref={canvasRef}
          onClick={handleCanvasClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 relative overflow-hidden rounded-lg"
          style={{
            width: canvasSize.width,
            height: canvasSize.height,
            transform: `scale(${zoom})`,
            transformOrigin: 'center center'
          }}
        >
          {/* Canvas Header */}
          <div className="h-8 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {mode} View ({canvasSize.width}×{canvasSize.height})
            </span>
          </div>

          {/* Canvas Content Area */}
          <div className="relative h-full">
            {elements.length === 0 ? (
              <div className="flex items-center justify-center h-full p-8">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Start Building
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Drag components from the sidebar or use AI to generate your first element.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {elements.map((element) => (
                  <CanvasElement
                    key={element.id}
                    element={element}
                    isSelected={selectedElement?.id === element.id}
                    onSelect={onSelectElement}
                    onUpdate={onUpdateElement}
                    onDelete={onDeleteElement}
                    onDuplicate={onDuplicateElement}
                    canvasMode={mode}
                    scale={zoom}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Canvas Info */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 px-3 py-2">
        <div className="text-xs text-gray-600 dark:text-gray-400">
          {elements.length} element{elements.length !== 1 ? 's' : ''} • {Math.round(zoom * 100)}% zoom
        </div>
      </div>
    </div>
  );
}