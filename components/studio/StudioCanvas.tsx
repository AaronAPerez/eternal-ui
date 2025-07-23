'use client';

import { useRef, useCallback } from 'react';
import { Brain } from 'lucide-react';


interface StudioCanvasProps {
  mode: 'desktop' | 'tablet' | 'mobile';
  elements: any[];
  selectedElement: string | null;
  onSelectElement: (id: string | null) => void;
}

export function StudioCanvas({
  mode,
  elements,
  selectedElement,
  onSelectElement,
}: StudioCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { addElement, updateElement, deleteElement } = useStudio();

  // Canvas dimensions
  const getCanvasDimensions = () => {
    switch (mode) {
      case 'mobile':
        return { width: '375px', height: '812px' };
      case 'tablet':
        return { width: '768px', height: '1024px' };
      default:
        return { width: '100%', height: '100%' };
    }
  };

  // Handle element updates
  const handleElementUpdate = useCallback((elementId: string, updates: any) => {
    updateElement(elementId, updates);
  }, [updateElement]);

  const handleElementDelete = useCallback((elementId: string) => {
    deleteElement(elementId);
  }, [deleteElement]);

  // Handle drop operations
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    
    if (data) {
      try {
        const componentData = JSON.parse(data);
        const canvasRect = canvasRef.current?.getBoundingClientRect();
        
        if (canvasRect) {
          const position = {
            x: e.clientX - canvasRect.left - 100,
            y: e.clientY - canvasRect.top - 50,
          };
          
          addElement(componentData, position);
        }
      } catch (error) {
        console.error('Failed to parse drop data:', error);
      }
    }
  }, [addElement]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  return (
    <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 p-8">
      <div
        ref={canvasRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => onSelectElement(null)}
        className="relative bg-white dark:bg-gray-800 shadow-xl rounded-lg mx-auto min-h-screen transition-all duration-300"
        style={{
          ...getCanvasDimensions(),
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      >
        {/* Canvas Mode Indicator */}
        <div className="absolute top-4 right-4 z-10">
          <div className="px-3 py-1 bg-black bg-opacity-75 text-white text-xs rounded-full">
            {mode.charAt(0).toUpperCase() + mode.slice(1)} View
          </div>
        </div>

        {/* Empty State */}
        {elements.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-purple-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400 mb-3">
                Start Building with AI
              </h3>
              <p className="text-gray-400 dark:text-gray-500 mb-6">
                Describe what you want to create using AI, or drag components from the library
              </p>
              <div className="flex flex-col gap-2">
                <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg text-sm">
                  💡 Try: &quot;Hero section with welcome title&quot;
                </div>
                <div className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm">
                  🎨 Or drag components from the sidebar
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Render Elements */}
        {elements.map((element) => (
          <CanvasElement
            key={element.id}
            element={element}
            isSelected={selectedElement === element.id}
            onSelect={(id) => {
              onSelectElement(id);
            }}
            onUpdate={handleElementUpdate}
            onDelete={handleElementDelete}
            canvasMode={mode}
          />
        ))}

        {/* Grid overlay for alignment */}
        {elements.length > 0 && (
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />
        )}
      </div>
    </div>
  );
}