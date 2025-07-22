// src/components/VisualBuilder/hooks/useCanvas.ts

import { useContext } from 'react';
import { CanvasContext, CanvasContextType } from '../context/CanvasContext';

/**
 * Custom hook to access canvas state and actions
 * 
 * This hook provides access to the canvas context which includes:
 * - Canvas state (elements, selection, viewport, etc.)
 * - Canvas actions (add, update, delete elements, etc.)
 * 
 * @throws {Error} If used outside of CanvasProvider
 * @returns {CanvasContextType} Canvas state and actions
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { state, actions } = useCanvas();
 *   
 *   const handleAddButton = () => {
 *     actions.addElement({
 *       type: 'component',
 *       name: 'My Button',
 *       component: 'button',
 *       props: { text: 'Click me' },
 *       style: { padding: '1rem' },
 *       children: [],
 *       locked: false,
 *       visible: true
 *     });
 *   };
 *   
 *   return (
 *     <div>
 *       <button onClick={handleAddButton}>Add Button</button>
 *       <p>Elements: {state.elements.size}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export const useCanvas = (): CanvasContextType => {
  const context = useContext(CanvasContext);
  
  if (!context) {
    throw new Error(
      'useCanvas must be used within a CanvasProvider. ' +
      'Make sure to wrap your component with <CanvasProvider>.'
    );
  }
  
  return context;
};

/**
 * Hook to get only canvas state (read-only)
 * 
 * Useful when you only need to read state without performing actions.
 * This can help with performance by avoiding unnecessary re-renders
 * when actions change.
 * 
 * @returns {BuilderState} Canvas state
 * 
 * @example
 * ```tsx
 * function ElementCounter() {
 *   const state = useCanvasState();
 *   return <span>Elements: {state.elements.size}</span>;
 * }
 * ```
 */
export const useCanvasState = () => {
  const { state } = useCanvas();
  return state;
};

/**
 * Hook to get only canvas actions
 * 
 * Useful when you only need to perform actions without reading state.
 * 
 * @returns {CanvasActions} Canvas actions
 * 
 * @example
 * ```tsx
 * function AddElementButton() {
 *   const actions = useCanvasActions();
 *   
 *   const handleAdd = () => {
 *     actions.addElement({
 *       type: 'component',
 *       name: 'New Element',
 *       component: 'container',
 *       props: {},
 *       style: {},
 *       children: [],
 *       locked: false,
 *       visible: true
 *     });
 *   };
 *   
 *   return <button onClick={handleAdd}>Add Element</button>;
 * }
 * ```
 */
export const useCanvasActions = () => {
  const { actions } = useCanvas();
  return actions;
};

/**
 * Hook to get selected elements with their full data
 * 
 * @returns {CanvasElement[]} Array of selected elements
 * 
 * @example
 * ```tsx
 * function SelectedElementsInfo() {
 *   const selectedElements = useSelectedElements();
 *   
 *   return (
 *     <div>
 *       <h3>Selected Elements ({selectedElements.length})</h3>
 *       {selectedElements.map(element => (
 *         <div key={element.id}>{element.name}</div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export const useSelectedElements = () => {
  const { state } = useCanvas();
  
  return Array.from(state.selectedElements)
    .map(id => state.elements.get(id))
    .filter(Boolean);
};

/**
 * Hook to check if a specific element is selected
 * 
 * @param {string} elementId - The ID of the element to check
 * @returns {boolean} Whether the element is selected
 * 
 * @example
 * ```tsx
 * function ElementComponent({ elementId }: { elementId: string }) {
 *   const isSelected = useElementSelection(elementId);
 *   
 *   return (
 *     <div className={isSelected ? 'selected' : ''}>
 *       Element content
 *     </div>
 *   );
 * }
 * ```
 */
export const useElementSelection = (elementId: string): boolean => {
  const { state } = useCanvas();
  return state.selectedElements.has(elementId);
};

/**
 * Hook to get viewport information and controls
 * 
 * @returns {object} Viewport state and control functions
 * 
 * @example
 * ```tsx
 * function ViewportControls() {
 *   const { viewport, setZoom, resetViewport, fitToScreen } = useViewport();
 *   
 *   return (
 *     <div>
 *       <span>Zoom: {Math.round(viewport.zoom * 100)}%</span>
 *       <button onClick={() => setZoom(viewport.zoom + 0.1)}>Zoom In</button>
 *       <button onClick={() => setZoom(viewport.zoom - 0.1)}>Zoom Out</button>
 *       <button onClick={resetViewport}>Reset</button>
 *       <button onClick={fitToScreen}>Fit to Screen</button>
 *     </div>
 *   );
 * }
 * ```
 */
export const useViewport = () => {
  const { state, actions } = useCanvas();
  
  const setZoom = (zoom: number) => {
    const clampedZoom = Math.max(0.1, Math.min(5, zoom));
    actions.setViewport({ zoom: clampedZoom });
  };
  
  const setPan = (panX: number, panY: number) => {
    actions.setViewport({ panX, panY });
  };
  
  const resetViewport = () => {
    actions.setViewport({ zoom: 1, panX: 0, panY: 0 });
  };
  
  const fitToScreen = () => {
    // Calculate zoom to fit all elements on screen
    // This is a simplified implementation
    const elements = Array.from(state.elements.values());
    if (elements.length === 0) {
      resetViewport();
      return;
    }
    
    // For now, just reset - in a real implementation,
    // you'd calculate the bounding box of all elements
    resetViewport();
  };
  
  return {
    viewport: state.viewport,
    setZoom,
    setPan,
    resetViewport,
    fitToScreen
  };
};

/**
 * Hook to get history state and controls
 * 
 * @returns {object} History state and control functions
 * 
 * @example
 * ```tsx
 * function HistoryControls() {
 *   const { canUndo, canRedo, undo, redo, historyLength } = useHistory();
 *   
 *   return (
 *     <div>
 *       <button onClick={undo} disabled={!canUndo}>Undo</button>
 *       <button onClick={redo} disabled={!canRedo}>Redo</button>
 *       <span>History: {historyLength} actions</span>
 *     </div>
 *   );
 * }
 * ```
 */
export const useHistory = () => {
  const { state, actions } = useCanvas();
  
  return {
    canUndo: state.history.past.length > 0,
    canRedo: state.history.future.length > 0,
    historyLength: state.history.past.length,
    undo: actions.undo,
    redo: actions.redo
  };
};

/**
 * Hook to get device state and controls
 * 
 * @returns {object} Device state and control functions
 * 
 * @example
 * ```tsx
 * function DeviceControls() {
 *   const { device, setDevice, isDesktop, isMobile, isTablet } = useDevice();
 *   
 *   return (
 *     <div>
 *       <span>Current: {device}</span>
 *       <button onClick={() => setDevice('desktop')} disabled={isDesktop}>
 *         Desktop
 *       </button>
 *       <button onClick={() => setDevice('tablet')} disabled={isTablet}>
 *         Tablet
 *       </button>
 *       <button onClick={() => setDevice('mobile')} disabled={isMobile}>
 *         Mobile
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export const useDevice = () => {
  const { state, actions } = useCanvas();
  
  return {
    device: state.device,
    setDevice: actions.setDevice,
    isDesktop: state.device === 'desktop',
    isTablet: state.device === 'tablet',
    isMobile: state.device === 'mobile'
  };
};

/**
 * Hook to get element operations with better error handling
 * 
 * @returns {object} Element operation functions with error handling
 * 
 * @example
 * ```tsx
 * function ElementOperations() {
 *   const { safeAddElement, safeUpdateElement, safeDeleteElement } = useElementOperations();
 *   
 *   const handleAddElement = async () => {
 *     try {
 *       const id = await safeAddElement({
 *         type: 'component',
 *         name: 'New Element',
 *         component: 'button',
 *         props: { text: 'Click me' },
 *         style: {},
 *         children: [],
 *         locked: false,
 *         visible: true
 *       });
 *       console.log('Added element:', id);
 *     } catch (error) {
 *       console.error('Failed to add element:', error);
 *     }
 *   };
 *   
 *   return <button onClick={handleAddElement}>Add Element</button>;
 * }
 * ```
 */
export const useElementOperations = () => {
  const { actions } = useCanvas();
  
  const safeAddElement = async (element: Parameters<typeof actions.addElement>[0]) => {
    try {
      return actions.addElement(element);
    } catch (error) {
      console.error('Failed to add element:', error);
      throw error;
    }
  };
  
  const safeUpdateElement = async (id: string, updates: Parameters<typeof actions.updateElement>[1]) => {
    try {
      return actions.updateElement(id, updates);
    } catch (error) {
      console.error('Failed to update element:', error);
      throw error;
    }
  };
  
  const safeDeleteElement = async (id: string) => {
    try {
      return actions.deleteElement(id);
    } catch (error) {
      console.error('Failed to delete element:', error);
      throw error;
    }
  };
  
  const safeDuplicateElement = async (id: string) => {
    try {
      return actions.duplicateElement(id);
    } catch (error) {
      console.error('Failed to duplicate element:', error);
      throw error;
    }
  };
  
  return {
    safeAddElement,
    safeUpdateElement,
    safeDeleteElement,
    safeDuplicateElement
  };
};