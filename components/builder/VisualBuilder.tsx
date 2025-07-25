'use client';
'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GridSystem, defaultGridConfig } from '@/lib/grid-system';
import { ComponentPalette } from './ComponentPalette';
import { PropertyPanel } from './PropertyPanel';
import { GridGuides } from './GridGuides';
import { EnhancedComponent } from '@/lib/component-library';

interface DroppedComponent {
  id: string;
  componentId: string;
  component: EnhancedComponent;
  x: number;
  y: number;
  width: number;
  height: number;
  props: Record<string, any>;
  style: Record<string, any>;
}

export function VisualBuilder() {
  const [droppedComponents, setDroppedComponents] = useState<DroppedComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [gridEnabled, setGridEnabled] = useState(true);
  const [snapEnabled, setSnapEnabled] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const [responsive, setResponsive] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [draggedComponent, setDraggedComponent] = useState<EnhancedComponent | null>(null);
  const [idCounter, setIdCounter] = useState(0);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const gridSystem = new GridSystem(defaultGridConfig);
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });

  // Generate stable IDs
  const generateId = useCallback(() => {
    setIdCounter(prev => prev + 1);
    return `component-${idCounter + 1}`;
  }, [idCounter]);

  // Handle component drop from palette
  const handleComponentDrop = useCallback((component: EnhancedComponent, x: number, y: number) => {
    const position = snapEnabled 
      ? gridSystem.snapToGrid(x, y, canvasSize.width)
      : { x, y };

    const newComponent: DroppedComponent = {
      id: generateId(),
      componentId: component.id,
      component,
      x: position.x,
      y: position.y,
      width: 300,
      height: 200,
      props: { ...component.defaultProps },
      style: {}
    };

    setDroppedComponents(prev => [...prev, newComponent]);
    setSelectedComponent(newComponent.id);
  }, [snapEnabled, canvasSize.width, generateId]);

  // Handle component position update
  const handleComponentMove = useCallback((id: string, x: number, y: number) => {
    const position = snapEnabled 
      ? gridSystem.snapToGrid(x, y, canvasSize.width)
      : { x, y };

    setDroppedComponents(prev =>
      prev.map(comp =>
        comp.id === id ? { ...comp, x: position.x, y: position.y } : comp
      )
    );
  }, [snapEnabled, canvasSize.width]);

  // Handle component resize
  const handleComponentResize = useCallback((id: string, width: number, height: number) => {
    setDroppedComponents(prev =>
      prev.map(comp =>
        comp.id === id ? { ...comp, width, height } : comp
      )
    );
  }, []);

  // Handle component deletion
  const handleComponentDelete = useCallback((id: string) => {
    setDroppedComponents(prev => prev.filter(comp => comp.id !== id));
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
  }, [selectedComponent]);

  // Handle component duplication
  const handleComponentDuplicate = useCallback((id: string) => {
    const componentToDuplicate = droppedComponents.find(comp => comp.id === id);
    if (componentToDuplicate) {
      const newComponent: DroppedComponent = {
        ...componentToDuplicate,
        id: generateId(),
        x: componentToDuplicate.x + 20,
        y: componentToDuplicate.y + 20
      };
      setDroppedComponents(prev => [...prev, newComponent]);
      setSelectedComponent(newComponent.id);
    }
  }, [droppedComponents, generateId]);

  // Handle responsive viewport changes
  const getViewportSize = () => {
    switch (responsive) {
      case 'tablet': return { width: 768, height: 1024 };
      case 'mobile': return { width: 375, height: 667 };
      default: return { width: 1200, height: 800 };
    }
  };

  useEffect(() => {
    setCanvasSize(getViewportSize());
  }, [responsive]);

  // Handle drag over canvas
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle drop on canvas
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;

    try {
      const componentData = e.dataTransfer.getData('text/plain');
      const component = JSON.parse(componentData);
      
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      handleComponentDrop(component, x, y);
    } catch (error) {
      console.error('Failed to parse dropped component:', error);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedComponent) {
        handleComponentDelete(selectedComponent);
      }
      if (e.key === 'd' && e.ctrlKey && selectedComponent) {
        e.preventDefault();
        handleComponentDuplicate(selectedComponent);
      }
      if (e.key === 'g' && e.ctrlKey) {
        e.preventDefault();
        setGridEnabled(!gridEnabled);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedComponent, gridEnabled, handleComponentDelete, handleComponentDuplicate]);

  return (
    <div className="h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Component Palette - Left Sidebar */}
      <ComponentPalette />

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                Visual Builder
              </h1>
              
              {/* Viewport Controls */}
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {['desktop', 'tablet', 'mobile'].map((viewport) => (
                  <button
                    key={viewport}
                    onClick={() => setResponsive(viewport as any)}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      responsive === viewport
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {viewport.charAt(0).toUpperCase() + viewport.slice(1)}
                  </button>
                ))}
              </div>

              {/* Component Count */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {droppedComponents.length} component{droppedComponents.length !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Grid Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGridEnabled(!gridEnabled)}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    gridEnabled 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                  title="Toggle Grid (Ctrl+G)"
                >
                  Grid: {gridEnabled ? 'On' : 'Off'}
                </button>
                <button
                  onClick={() => setSnapEnabled(!snapEnabled)}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    snapEnabled 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Snap: {snapEnabled ? 'On' : 'Off'}
                </button>
              </div>

              {/* Preview Mode */}
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  previewMode
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {previewMode ? '✏️ Edit Mode' : '👁️ Preview'}
              </button>

              {/* Export Button */}
              <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
                📤 Export Code
              </button>
            </div>
          </div>
        </div>

        {/* Canvas Container */}
        <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex justify-center">
            <Canvas
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
              gridEnabled={gridEnabled}
              previewMode={previewMode}
              components={droppedComponents}
              selectedComponent={selectedComponent}
              onComponentSelect={setSelectedComponent}
              onComponentMove={handleComponentMove}
              onComponentResize={handleComponentResize}
              onComponentDelete={handleComponentDelete}
              onComponentDuplicate={handleComponentDuplicate}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              gridSystem={gridSystem}
            />
          </div>
        </div>
      </div>

      {/* Property Panel - Right Sidebar */}
      {selectedComponent && !previewMode && (
        <PropertyPanel
          component={droppedComponents.find(c => c.id === selectedComponent)}
          onPropsChange={(props) => {
            setDroppedComponents(prev =>
              prev.map(comp =>
                comp.id === selectedComponent ? { ...comp, props } : comp
              )
            );
          }}
          onStyleChange={(style) => {
            setDroppedComponents(prev =>
              prev.map(comp =>
                comp.id === selectedComponent ? { ...comp, style } : comp
              )
            );
          }}
          onDelete={() => handleComponentDelete(selectedComponent)}
          onDuplicate={() => handleComponentDuplicate(selectedComponent)}
        />
      )}
    </div>
  );
}

// Canvas Component
interface CanvasProps {
  width: number;
  height: number;
  gridEnabled: boolean;
  previewMode: boolean;
  components: DroppedComponent[];
  selectedComponent: string | null;
  onComponentSelect: (id: string | null) => void;
  onComponentMove: (id: string, x: number, y: number) => void;
  onComponentResize: (id: string, width: number, height: number) => void;
  onComponentDelete: (id: string) => void;
  onComponentDuplicate: (id: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  gridSystem: GridSystem;
}

const Canvas = React.forwardRef<HTMLDivElement, CanvasProps>(({
  width,
  height,
  gridEnabled,
  previewMode,
  components,
  selectedComponent,
  onComponentSelect,
  onComponentMove,
  onComponentResize,
  onComponentDelete,
  onComponentDuplicate,
  onDragOver,
  onDrop,
  gridSystem
}, ref) => {
  const gridLines = gridEnabled ? gridSystem.getGridLines(width, height) : null;

  return (
    <div
      ref={ref}
      className={`relative bg-white dark:bg-gray-900 shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 ${
        previewMode ? 'rounded-lg overflow-hidden' : ''
      }`}
      style={{ width, height, minHeight: height }}
      onClick={() => !previewMode && onComponentSelect(null)}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {/* Grid Guidelines */}
      {gridEnabled && gridLines && !previewMode && (
        <GridGuides
          vertical={gridLines.vertical}
          horizontal={gridLines.horizontal}
          width={width}
          height={height}
        />
      )}

      {/* Empty State */}
      {components.length === 0 && !previewMode && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-400 dark:text-gray-600">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-lg font-medium mb-2">Start Building</h3>
            <p className="text-sm">Drag components from the palette to get started</p>
          </div>
        </div>
      )}

      {/* Rendered Components */}
      <AnimatePresence>
        {components.map((comp) => (
          <DraggableComponent
            key={comp.id}
            component={comp}
            isSelected={selectedComponent === comp.id}
            previewMode={previewMode}
            onSelect={() => onComponentSelect(comp.id)}
            onMove={(x, y) => onComponentMove(comp.id, x, y)}
            onResize={(width, height) => onComponentResize(comp.id, width, height)}
            onDelete={() => onComponentDelete(comp.id)}
            onDuplicate={() => onComponentDuplicate(comp.id)}
          />
        ))}
      </AnimatePresence>

      {/* Canvas Info */}
      {!previewMode && (
        <div className="absolute top-4 left-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded px-2 py-1 text-xs text-gray-600 dark:text-gray-400">
          {width} × {height}px
        </div>
      )}
    </div>
  );
});

Canvas.displayName = 'Canvas';

// Draggable Component (without react-dnd)
interface DraggableComponentProps {
  component: DroppedComponent;
  isSelected: boolean;
  previewMode: boolean;
  onSelect: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (width: number, height: number) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

function DraggableComponent({
  component,
  isSelected,
  previewMode,
  onSelect,
  onMove,
  onResize,
  onDelete,
  onDuplicate
}: DraggableComponentProps) {
  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Render the actual component based on its type
  const renderComponent = () => {
    const { component: componentDef, props, style } = component;
    
    const baseStyles = {
      width: '100%',
      height: '100%',
      ...style
    };

    return (
      <div
        className="w-full h-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 transition-all duration-200 hover:from-indigo-50 hover:to-indigo-100 dark:hover:from-indigo-900 dark:hover:to-indigo-800"
        style={baseStyles}
      >
        <div className="text-center p-4">
          <div className="text-2xl mb-2">🧩</div>
          <div className="text-lg font-medium text-gray-900 dark:text-white">
            {componentDef.name}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {componentDef.description}
          </div>
          {Object.keys(props).length > 0 && (
            <div className="mt-2 text-xs text-gray-500 bg-gray-200 dark:bg-gray-600 rounded px-2 py-1 max-w-full overflow-hidden">
              {Object.entries(props).slice(0, 2).map(([key, value]) => (
                <div key={key}>{key}: {String(value)}</div>
              ))}
              {Object.keys(props).length > 2 && <div>...</div>}
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (previewMode) return;
    
    e.preventDefault();
    e.stopPropagation();
    onSelect();
    
    const startX = e.clientX - component.x;
    const startY = e.clientY - component.y;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - startX;
      const newY = e.clientY - startY;
      onMove(newX, newY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    setIsDragging(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`absolute group ${previewMode ? '' : 'cursor-move'} ${
        isSelected ? 'z-50' : 'z-10'
      } ${isDragging ? 'opacity-50' : ''}`}
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
      onMouseDown={handleMouseDown}
    >
      {/* Component Content */}
      <div className="w-full h-full">
        {renderComponent()}
      </div>

      {/* Selection Overlay */}
      {isSelected && !previewMode && (
        <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none">
          {/* Resize handles - simplified for now */}
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />
        </div>
      )}

      {/* Component Toolbar */}
      {isSelected && !previewMode && (
        <div className="absolute -top-10 left-0 flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded text-xs z-10">
          <span className="font-medium">{component.component.name}</span>
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
              }}
              className="p-1 hover:bg-blue-600 rounded"
              title="Duplicate (Ctrl+D)"
            >
              📋
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1 hover:bg-red-500 rounded"
              title="Delete (Del)"
            >
              🗑️
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default VisualBuilder;