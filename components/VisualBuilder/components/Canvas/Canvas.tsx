import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Layers } from 'lucide-react';
import { useCanvas } from '../../hooks/useCanvas';
import { CanvasElementComponent } from './CanvasElement';
import { CanvasElement } from '../../types';

export const Canvas: React.FC = () => {
  const { state, actions } = useCanvas();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null);

  // Set up droppable canvas
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
    data: { type: 'canvas' }
  });

  // Get root elements (elements without parent)
  const rootElements = Array.from(state.elements.values()).filter(el => !el.parent);

  // Handle canvas click to clear selection
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    // Only clear selection if clicking directly on canvas (not on elements)
    if (e.target === e.currentTarget) {
      actions.clearSelection();
    }
  }, [actions]);

  // Handle canvas keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle shortcuts when canvas is focused or no input is focused
      const activeElement = document.activeElement;
      const isInputFocused = activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.contentEditable === 'true'
      );

      if (isInputFocused) return;

      switch (e.key) {
        case 'Delete':
        case 'Backspace':
          if (state.selectedElements.size > 0) {
            e.preventDefault();
            state.selectedElements.forEach(id => actions.deleteElement(id));
          }
          break;
        
        case 'c':
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            // Copy selected elements to clipboard
            const selectedElements = Array.from(state.selectedElements)
              .map(id => state.elements.get(id))
              .filter(Boolean) as CanvasElement[];
            
            if (selectedElements.length > 0) {
              // Store in clipboard (simplified - in real app would use actual clipboard API)
              console.log('Copied elements:', selectedElements);
            }
          }
          break;
        
        case 'd':
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            // Duplicate selected elements
            state.selectedElements.forEach(id => actions.duplicateElement(id));
          }
          break;
        
        case 'z':
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            if (e.shiftKey) {
              actions.redo();
            } else {
              actions.undo();
            }
          }
          break;
        
        case 'a':
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            // Select all elements
            const allElementIds = Array.from(state.elements.keys());
            allElementIds.forEach(id => actions.selectElement(id, true));
          }
          break;
        
        case 'Escape':
          actions.clearSelection();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state.selectedElements, state.elements, actions]);

  // Handle drag over for visual feedback
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setDragPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragPosition(null);
  }, []);

  // Calculate device-specific styles
  const getDeviceStyles = () => {
    const baseStyles = {
      minHeight: '100vh',
      transition: 'all 0.3s ease',
      backgroundColor: 'white',
      position: 'relative' as const
    };

    switch (state.device) {
      case 'mobile':
        return {
          ...baseStyles,
          maxWidth: '375px',
          margin: '0 auto',
          boxShadow: '0 0 20px rgba(0,0,0,0.1)'
        };
      case 'tablet':
        return {
          ...baseStyles,
          maxWidth: '768px',
          margin: '0 auto',
          boxShadow: '0 0 20px rgba(0,0,0,0.1)'
        };
      case 'desktop':
      default:
        return {
          ...baseStyles,
          width: '100%'
        };
    }
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        if (canvasRef.current !== node) {
          canvasRef.current = node;
        }
      }}
      className={`flex-1 relative overflow-auto transition-colors duration-200 ${
        isOver ? 'bg-indigo-50' : 'bg-gray-50'
      }`}
      style={{
        transform: `scale(${state.viewport.zoom}) translate(${state.viewport.panX}px, ${state.viewport.panY}px)`,
        transformOrigin: 'top left'
      }}
      onClick={handleCanvasClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {/* Grid overlay */}
      {state.grid.enabled && (
        <div
          className="absolute inset-0 opacity-20 pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: `${state.grid.size}px ${state.grid.size}px`,
            backgroundPosition: `${state.viewport.panX}px ${state.viewport.panY}px`
          }}
        />
      )}

      {/* Device frame */}
      <div
        className="mx-auto shadow-lg"
        style={getDeviceStyles()}
      >
        {/* Device header (for mobile/tablet preview) */}
        {(state.device === 'mobile' || state.device === 'tablet') && (
          <div className="h-6 bg-gray-900 rounded-t-lg flex items-center justify-center">
            <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
          </div>
        )}

        {/* Canvas content area */}
        <div className="relative p-8 min-h-screen">
          {/* Render all root elements */}
          {rootElements.map(element => (
            <CanvasElementComponent
              key={element.id}
              element={element}
              isSelected={state.selectedElements.has(element.id)}
              isHovered={state.hoveredElement === element.id}
              onSelect={() => actions.selectElement(element.id)}
              onHover={() => {
                // Could implement hover state if needed
              }}
              onUnhover={() => {
                // Could implement hover state cleanup if needed
              }}
            />
          ))}

          {/* Empty state */}
          {rootElements.length === 0 && !isOver && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
              <div className="text-center max-w-md">
                <Layers className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2 text-gray-600">Start Building Your Website</h3>
                <p className="text-sm leading-relaxed">
                  Drag components from the left panel to begin creating your masterpiece.
                  Every element is responsive and accessible by default.
                </p>
                <div className="mt-4 text-xs text-gray-500">
                  <p>💡 Pro tip: Use keyboard shortcuts for faster editing</p>
                  <div className="mt-2 space-y-1">
                    <p><kbd className="bg-gray-200 px-1 rounded">Cmd/Ctrl + D</kbd> Duplicate</p>
                    <p><kbd className="bg-gray-200 px-1 rounded">Cmd/Ctrl + Z</kbd> Undo</p>
                    <p><kbd className="bg-gray-200 px-1 rounded">Delete</kbd> Remove element</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Drop indicator */}
          {isOver && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
              <div className="bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="font-medium">Drop component here</span>
                </div>
              </div>
            </div>
          )}

          {/* Drag position indicator */}
          {dragPosition && isOver && (
            <div
              className="absolute w-2 h-2 bg-indigo-500 rounded-full pointer-events-none z-40 transform -translate-x-1 -translate-y-1"
              style={{
                left: dragPosition.x,
                top: dragPosition.y
              }}
            />
          )}

          {/* Zoom indicator */}
          {state.viewport.zoom !== 1 && (
            <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white text-xs px-3 py-1 rounded-full z-50">
              {Math.round(state.viewport.zoom * 100)}%
            </div>
          )}
        </div>

        {/* Device footer (for mobile/tablet preview) */}
        {(state.device === 'mobile' || state.device === 'tablet') && (
          <div className="h-6 bg-gray-900 rounded-b-lg"></div>
        )}
      </div>

      {/* Selection info */}
      {state.selectedElements.size > 1 && (
        <div className="fixed bottom-4 left-4 bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg shadow-lg z-50">
          {state.selectedElements.size} elements selected
        </div>
      )}

      {/* Preview mode overlay */}
      {state.mode === 'preview' && (
        <div className="absolute inset-0 bg-transparent z-30 cursor-default" />
      )}
    </div>
  );
};