import React, { useState, useMemo, ReactNode } from 'react';
import { CanvasContext, CanvasContextType, CanvasActions, PerformanceOptimizationResult } from './CanvasContext';
import { BuilderState, CanvasElement, ViewportState, DeviceType, BuilderMode } from '../types';
import { generateReactCode, generateVueCode, generateAngularCode, generateHTMLCode } from '../utils/codeGeneration';

interface CanvasProviderProps {
  children: ReactNode;
}

export const CanvasProvider: React.FC<CanvasProviderProps> = ({ children }) => {
  const [state, setState] = useState<BuilderState>(() => ({
    elements: new Map(),
    selectedElements: new Set(),
    hoveredElement: undefined,
    draggedElement: undefined,
    clipboard: [],
    history: {
      past: [],
      present: new Map(),
      future: []
    },
    viewport: {
      zoom: 1,
      panX: 0,
      panY: 0
    },
    device: 'desktop',
    mode: 'select',
    grid: {
      enabled: true,
      size: 20,
      snap: true
    },
    layers: {
      showPanel: true,
      expandedGroups: new Set()
    }
  }));

  const actions = useMemo((): CanvasActions => ({
    addElement: (element: Omit<CanvasElement, 'id' | 'metadata'>) => {
      const id = `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newElement: CanvasElement = {
        ...element,
        id,
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          version: 1
        }
      };

      setState(prev => ({
        ...prev,
        elements: new Map(prev.elements).set(id, newElement),
        selectedElements: new Set([id]),
        history: {
          past: [...prev.history.past, prev.history.present],
          present: new Map(prev.elements).set(id, newElement),
          future: []
        }
      }));

      return id;
    },

    updateElement: (id: string, updates: Partial<CanvasElement>) => {
      setState(prev => {
        const element = prev.elements.get(id);
        if (!element) return prev;

        const updatedElement = {
          ...element,
          ...updates,
          metadata: {
            ...element.metadata,
            updatedAt: new Date().toISOString(),
            version: element.metadata.version + 1
          }
        };

        const newElements = new Map(prev.elements);
        newElements.set(id, updatedElement);

        return {
          ...prev,
          elements: newElements,
          history: {
            past: [...prev.history.past, prev.history.present],
            present: newElements,
            future: []
          }
        };
      });
    },

    deleteElement: (id: string) => {
      setState(prev => {
        const newElements = new Map(prev.elements);
        newElements.delete(id);

        return {
          ...prev,
          elements: newElements,
          selectedElements: new Set([...prev.selectedElements].filter(sel => sel !== id)),
          history: {
            past: [...prev.history.past, prev.history.present],
            present: newElements,
            future: []
          }
        };
      });
    },

    selectElement: (id: string, multi = false) => {
      setState(prev => ({
        ...prev,
        selectedElements: multi
          ? new Set([...prev.selectedElements, id])
          : new Set([id])
      }));
    },

    clearSelection: () => {
      setState(prev => ({
        ...prev,
        selectedElements: new Set()
      }));
    },

    duplicateElement: (id: string) => {
      const element = state.elements.get(id);
      if (!element) return '';

      const newId = `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const duplicatedElement: CanvasElement = {
        ...element,
        id: newId,
        style: {
          ...element.style,
          left: ((element.style.left as number) || 0) + 20,
          top: ((element.style.top as number) || 0) + 20
        },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          version: 1
        }
      };

      setState(prev => ({
        ...prev,
        elements: new Map(prev.elements).set(newId, duplicatedElement),
        selectedElements: new Set([newId])
      }));

      return newId;
    },

   moveElement: (id: string, newParent?: string, index?: number) => {
      setState(prev => {
        const element = prev.elements.get(id);
        if (!element) return prev;

        const updatedElement = { 
          ...element, 
          parent: newParent,
          ...(index !== undefined && { index })
        };
        const newElements = new Map(prev.elements);
        newElements.set(id, updatedElement);

        return { ...prev, elements: newElements };
      });
    },


    undo: () => {
      setState(prev => {
        if (prev.history.past.length === 0) return prev;

        const previous = prev.history.past[prev.history.past.length - 1];
        const newPast = prev.history.past.slice(0, -1);

        return {
          ...prev,
          elements: previous,
          history: {
            past: newPast,
            present: previous,
            future: [prev.history.present, ...prev.history.future]
          }
        };
      });
    },

    redo: () => {
      setState(prev => {
        if (prev.history.future.length === 0) return prev;

        const next = prev.history.future[0];
        const newFuture = prev.history.future.slice(1);

        return {
          ...prev,
          elements: next,
          history: {
            past: [...prev.history.past, prev.history.present],
            present: next,
            future: newFuture
          }
        };
      });
    },

    setViewport: (viewport: Partial<ViewportState>) => {
      setState(prev => ({
        ...prev,
        viewport: { ...prev.viewport, ...viewport }
      }));
    },

    setDevice: (device: DeviceType) => {
      setState(prev => ({ ...prev, device }));
    },

    setMode: (mode: BuilderMode) => {
      setState(prev => ({ ...prev, mode }));
    },

    toggleGrid: () => {
      setState(prev => ({
        ...prev,
        grid: { ...prev.grid, enabled: !prev.grid.enabled }
      }));
    },

    toggleElementVisibility: (id: string) => {
      setState(prev => {
        const element = prev.elements.get(id);
        if (!element) return prev;

        const updatedElement = { ...element, visible: !element.visible };
        const newElements = new Map(prev.elements);
        newElements.set(id, updatedElement);

        return { ...prev, elements: newElements };
      });
    },

    toggleElementLock: (id: string) => {
      setState(prev => {
        const element = prev.elements.get(id);
        if (!element) return prev;

        const updatedElement = { ...element, locked: !element.locked };
        const newElements = new Map(prev.elements);
        newElements.set(id, updatedElement);

        return { ...prev, elements: newElements };
      });
    },

    exportCode: async (format: 'react' | 'vue' | 'angular' | 'html') => {
      const elements = Array.from(state.elements.values());
      
      if (format === 'react') {
        return generateReactCode(elements);
      } else if (format === 'vue') {
        return generateVueCode(elements);
      } else if (format === 'angular') {
        return generateAngularCode(elements);
      } else {
        return generateHTMLCode(elements);
      }
    },

    generateAIComponent: async (prompt: string) => {
      console.log('Generating AI component:', prompt);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate AI component generation
      const aiComponentId = actions.addElement({
        type: 'ai-generated',
        name: 'AI Generated Component',
        component: 'button',
        props: {
          text: 'AI Generated Button',
          variant: 'primary'
        },
        style: {
          position: 'relative',
          margin: '1rem'
        },
        children: [],
        locked: false,
        visible: true
      });

      return aiComponentId;
    },

    runAccessibilityAudit: async () => {
        console.log('Running accessibility audit...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        score: 95,
        issues: [],
        suggestions: [
          'Add alt text to images',
          'Improve color contrast',
          'Add ARIA labels to interactive elements'
        ]
      };
    },

  optimizePerformance: async (): Promise<PerformanceOptimizationResult> => {
      console.log('Optimizing performance...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return {
        score: 92,
        improvements: [
          'Lazy load images',
          'Minimize bundle size',
          'Optimize render performance'
        ]
      };
    },
 }), [state.elements]);

  const contextValue: CanvasContextType = {
    state,
    actions
  };

  return (
    <CanvasContext.Provider value={contextValue}>
      {children}
    </CanvasContext.Provider>
  );
};