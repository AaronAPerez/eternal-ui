'use client';

import React from 'react';
import { useStudioDragDrop } from './hooks/useStudioDragDrop';
import { Wand2 } from 'lucide-react';
import { Badge } from '../VisualBuilder/components/ui/Badge';
import SelectionHandles from './SelectionHandles';

// ====================================
// CANVAS COMPONENT
// ====================================

interface StudioCanvasProps {
  mode: 'desktop' | 'tablet' | 'mobile';
  elements: any[];
  selectedElement: any;
  onSelectElement: (element: any) => void;
  onUpdateElement: (id: string, updates: any) => void;
  zoom: number;
  gridEnabled: boolean;
  isDragging: boolean;
}

const StudioCanvas: React.FC<StudioCanvasProps> = ({
  mode,
  elements,
  selectedElement,
  onSelectElement,
  onUpdateElement,
  zoom,
  gridEnabled,
  isDragging
}) => {
  const canvasWidth = mode === 'desktop' ? '100%' : mode === 'tablet' ? '768px' : '375px';
  const { isDragging: startDrag } = useStudioDragDrop();

  const handleElementClick = (element: any, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectElement(element);
  };

  const handleElementMouseDown = (element: any, e: React.MouseEvent) => {
    e.preventDefault();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const startPos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    startDrag([element.id], startPos, e);
  };

  const handleCanvasClick = () => {
    onSelectElement(null);
  };

  return (
    <div className="flex-1 bg-gray-100 dark:bg-gray-900 overflow-auto">
      <div className="min-h-full flex items-center justify-center p-8">
        <div 
          className="bg-white dark:bg-gray-800 shadow-xl rounded-lg relative"
          style={{ 
            width: canvasWidth,
            minHeight: '600px',
            transform: `scale(${zoom})`,
            transformOrigin: 'center top'
          }}
          onClick={handleCanvasClick}
        >
          {/* Grid Overlay */}
          {gridEnabled && (
            <div 
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                  linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />
          )}

          {/* Canvas Elements */}
          {elements.map(element => (
            <div
              key={element.id}
              className={`absolute cursor-move ${
                selectedElement?.id === element.id 
                  ? 'ring-2 ring-indigo-500 ring-offset-2' 
                  : 'hover:ring-1 hover:ring-gray-300'
              } ${element.metadata?.isAIGenerated ? 'ring-purple-300' : ''}`}
              style={{
                left: element.position.x,
                top: element.position.y,
                width: element.size?.width || 'auto',
                height: element.size?.height || 'auto',
                zIndex: element.zIndex || 1
              }}
              onClick={(e) => handleElementClick(element, e)}
              onMouseDown={(e) => handleElementMouseDown(element, e)}
            >
              {/* Render element content based on type */}
              {renderElement(element)}
              
              {/* AI Generated Badge */}
              {element.metadata?.isAIGenerated && (
                <div className="absolute -top-2 -right-2">
                  <Badge variant="secondary" className="text-xs">
                    <Wand2 className="w-3 h-3 mr-1" />
                    AI
                  </Badge>
                </div>
              )}
            </div>
          ))}

          {/* Selection Indicators and Handles */}
          {selectedElement && (
            <SelectionHandles
              element={selectedElement}
              onResize={(newSize) => onUpdateElement(selectedElement.id, { size: newSize })}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudioCanvas;
