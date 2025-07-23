'use client';

import { useState, useCallback } from 'react';
import { StudioSidebar } from './StudioSidebar';
import { StudioCanvas } from './StudioCanvas';
import { StudioProperties } from './StudioProperties';
import { StudioToolbar } from './StudioToolbar';
import { useStudio } from './StudioProvider';

interface StudioWorkspaceProps {
  projectId?: string;
  initialProject?: Project;
}

export function StudioWorkspace({ projectId, initialProject }: StudioWorkspaceProps) {
  const {
    elements,
    selectedElement,
    addElement,
    updateElement,
    deleteElement,
    setSelectedElement,
  } = useStudio();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [canvasMode, setCanvasMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <>
      {/* Studio Toolbar */}
      <StudioToolbar
        canvasMode={canvasMode}
        onCanvasModeChange={setCanvasMode}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        projectId={projectId}
      />

      {/* Main Studio Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar - AI Generator + Component Library */}
        <StudioSidebar
          isOpen={sidebarOpen}
          onAddElement={addElement}
          existingElements={elements}
        />

        {/* Main Canvas */}
        <StudioCanvas
          mode={canvasMode}
          elements={elements}
          selectedElement={selectedElement}
          onSelectElement={setSelectedElement}
          onUpdateElement={updateElement}
          onDeleteElement={deleteElement}
          onAddElement={addElement}
        />

        {/* Right Sidebar - Properties */}
        {selectedElement && (
          <StudioProperties
            element={selectedElement}
            onUpdateElement={updateElement}
            onDeleteElement={deleteElement}
          />
        )}
      </div>
    </>
  );
}