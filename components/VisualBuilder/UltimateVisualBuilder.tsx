import React, { useState } from 'react';
import { DndContext, DragOverlay, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import { CanvasProvider } from './context/CanvasProvider';
import useDragAndDrop from './hooks/useDragAndDrop';
import { useCanvas } from './hooks/useCanvas';
import { Canvas } from './components/Canvas/Canvas';
import { Toolbar } from './components/Toolbar/Toolbar';
import { ComponentPalette } from './components/ComponentPalette/ComponentPalette';
import { LayersPanel } from './components/LayersPanel/LayersPanel';
import { PropertyEditor } from './components/PropertyEditor/PropertyEditor';



// Inner component that uses the canvas context
const VisualBuilderInner: React.FC = () => {
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const { sensors } = useDragAndDrop();
  const { actions } = useCanvas();

  const handleDragStart = (event: DragStartEvent) => {
    setActiveElement(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.id === 'canvas' && active.data.current?.type === 'component') {
      const componentData = active.data.current.component;
      
      // Add the component to the canvas
      actions.addElement({
        type: 'component',
        name: componentData.name,
        component: componentData.id,
        props: { ...componentData.defaultProps },
        style: { 
          ...componentData.defaultStyle,
          position: 'relative'
        },
        children: [],
        locked: false,
        visible: true
      });
    }

    setActiveElement(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen flex flex-col bg-gray-100">
        {/* Toolbar */}
        <Toolbar />

        {/* Main content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left sidebar - Components */}
          <ComponentPalette />

          {/* Layers panel */}
          <LayersPanel />

          {/* Canvas */}
          <div className="flex-1 flex flex-col">
            <Canvas />
          </div>

          {/* Right sidebar - Properties */}
          <PropertyEditor />
        </div>

        {/* Drag overlay */}
        <DragOverlay>
          {activeElement ? (
            <div className="bg-white p-3 rounded-lg shadow-lg border-2 border-indigo-500">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">Dragging component...</span>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

// Main exported component
export const UltimateVisualBuilder: React.FC = () => {
  return (
    <CanvasProvider>
      <VisualBuilderInner />
    </CanvasProvider>
  );
};
