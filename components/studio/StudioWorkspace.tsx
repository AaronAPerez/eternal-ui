'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { StudioToolbar } from './StudioToolbar';
import { StudioSidebar } from './StudioSidebar';
import { StudioCanvas } from './StudioCanvas';
import { StudioProperties } from './StudioProperties';
import { useStudio } from './StudioProvider';
import { useToasterSafe } from '@/hooks/useToasterSafe';

interface StudioWorkspaceProps {
  projectId?: string;
  initialProject?: any;
}

export function StudioWorkspace({ projectId, initialProject }: StudioWorkspaceProps) {
  const {
    state,
    addElement,
    updateElement,
    deleteElement,
    selectElement,
    duplicateElement,
    setCanvasMode,
    setZoom,
    undo,
    redo,
    canUndo,
    canRedo,
    saveProject,
    selectedElement,
    canvasElements
  } = useStudio();

  const { success, error } = useToasterSafe();

  // Responsive state management
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [propertiesOpen, setPropertiesOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close sidebars on mobile
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
        setPropertiesOpen(false);
      } else if (window.innerWidth >= 1024) {
        // Auto-open on desktop
        setSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Initialize project if provided
  useEffect(() => {
    if (initialProject && initialProject.elements) {
      initialProject.elements.forEach((element: any) => {
        addElement(element);
      });
    }
  }, [initialProject, addElement]);

  // Handle saving
  const handleSave = useCallback(async () => {
    setIsLoading(true);
    try {
      await saveProject();
      success('Project saved successfully!');
    } catch (err) {
      error('Failed to save project', 'Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [saveProject, success, error]);

  // Handle element addition from component library
  const handleAddElement = useCallback((component: any, position?: { x: number; y: number }) => {
    const newElement = {
      id: `${component.id}-${Date.now()}`,
      type: component.id,
      position: position || { x: 100, y: 100 },
      size: { width: 'auto', height: 'auto' },
      props: getDefaultProps(component.id),
      metadata: {
        createdAt: new Date().toISOString(),
        isAIGenerated: component.template?.metadata?.isAIGenerated || false
      }
    };

    addElement(newElement, position);
    success(`${component.name} added to canvas!`);
    
    // Close sidebar on mobile after adding
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [addElement, success, isMobile]);

  // Handle AI component generation
  const handleAIGeneration = useCallback((generatedComponent: any) => {
    addElement(generatedComponent);
    success('AI component generated and added to canvas!');
    
    // Close sidebar on mobile after adding
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [addElement, success, isMobile]);

  // Get default props for component types
  const getDefaultProps = (type: string) => {
    const defaults: Record<string, any> = {
      hero: {
        title: 'Welcome to Our Platform',
        subtitle: 'Build amazing experiences with our tools',
        primaryCta: 'Get Started',
        secondaryCta: 'Learn More'
      },
      productCard: {
        name: 'Amazing Product',
        price: '99.99',
        description: 'A fantastic product that will change your life',
        rating: 4.5,
        reviews: 24
      },
      contactForm: {
        title: 'Get In Touch',
        description: 'We\'d love to hear from you'
      },
      pricingCard: {
        plan: 'Pro Plan',
        price: '29',
        period: 'month',
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
        featured: false
      },
      testimonial: {
        quote: 'This is an amazing service that has transformed our business.',
        name: 'John Doe',
        role: 'CEO, Company Inc.'
      },
      teamMember: {
        name: 'Team Member',
        role: 'Position',
        bio: 'Brief description of the team member.'
      }
    };
    return defaults[type] || {};
  };

  // Handle backdrop click to close panels on mobile
  const handleBackdropClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
      setPropertiesOpen(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 relative">
      {/* Studio Toolbar */}
      <StudioToolbar
        canvasMode={state.canvasMode}
        onCanvasModeChange={setCanvasMode}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
        elementsCount={canvasElements.length}
        aiElementsCount={canvasElements.filter(el => el.metadata?.isAIGenerated).length}
        isLoading={isLoading}
        onSave={handleSave}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        zoom={state.zoom}
        onZoomChange={setZoom}
        projectId={projectId}
        onPropertiesToggle={() => setPropertiesOpen(!propertiesOpen)}
        propertiesOpen={propertiesOpen}
        isMobile={isMobile}
      />

      {/* Main Studio Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Backdrop */}
        {isMobile && (sidebarOpen || propertiesOpen) && (
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 z-30"
            onClick={handleBackdropClick}
          />
        )}

        {/* Left Sidebar - Component Library & AI Generator */}
        <div className={`
          ${isMobile ? 'absolute left-0 top-0 h-full z-40' : 'relative'}
          ${sidebarOpen ? 'block' : 'hidden'}
          transition-all duration-300 ease-in-out
        `}>
          <StudioSidebar
            onAddElement={handleAddElement}
            onAIGeneration={handleAIGeneration}
            existingElements={canvasElements}
            onClose={() => setSidebarOpen(false)}
            isMobile={isMobile}
          />
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 min-w-0">
          <StudioCanvas
            mode={state.canvasMode}
            elements={canvasElements}
            selectedElement={selectedElement}
            onSelectElement={selectElement}
            onUpdateElement={updateElement}
            onDeleteElement={deleteElement}
            onDuplicateElement={duplicateElement}
            onAddElement={handleAddElement}
            zoom={state.zoom}
            gridEnabled={state.gridEnabled}
            snapToGrid={state.snapToGrid}
            isDragging={state.isDragging}
          />
        </div>

        {/* Right Sidebar - Properties Panel */}
        <div className={`
          ${isMobile ? 'absolute right-0 top-0 h-full z-40' : 'relative'}
          ${selectedElement && propertiesOpen ? 'block' : 'hidden'}
          transition-all duration-300 ease-in-out
        `}>
          <StudioProperties
            element={selectedElement}
            onUpdateElement={updateElement}
            onDeleteElement={deleteElement}
            onDuplicateElement={duplicateElement}
            onClose={() => setPropertiesOpen(false)}
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  );
}