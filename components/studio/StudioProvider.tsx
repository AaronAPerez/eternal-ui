
// ====================================
// STUDIO PROVIDER (CONTEXT)
// ====================================

'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';

/**
 * Studio state interface
 */
interface StudioState {
  elements: any[];
  selectedElementId: string | null;
  canvasMode: 'desktop' | 'tablet' | 'mobile';
  zoom: number;
  gridEnabled: boolean;
  snapToGrid: boolean;
  history: {
    past: any[];
    present: any;
    future: any[];
  };
  isDragging: boolean;
  draggedElement: any | null;
  clipboard: any[];
  project: {
    id: string;
    name: string;
    lastSaved: string;
  } | null;
}

/**
 * Studio actions
 */
type StudioAction =
  | { type: 'ADD_ELEMENT'; payload: any }
  | { type: 'UPDATE_ELEMENT'; payload: { id: string; updates: any } }
  | { type: 'DELETE_ELEMENT'; payload: string }
  | { type: 'SELECT_ELEMENT'; payload: string | null }
  | { type: 'DUPLICATE_ELEMENT'; payload: string }
  | { type: 'SET_CANVAS_MODE'; payload: 'desktop' | 'tablet' | 'mobile' }
  | { type: 'SET_ZOOM'; payload: number }
  | { type: 'TOGGLE_GRID' }
  | { type: 'TOGGLE_SNAP_TO_GRID' }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'COPY_ELEMENTS'; payload: string[] }
  | { type: 'PASTE_ELEMENTS' }
  | { type: 'SET_DRAGGING'; payload: boolean }
  | { type: 'SET_DRAGGED_ELEMENT'; payload: any | null }
  | { type: 'LOAD_PROJECT'; payload: any }
  | { type: 'SAVE_PROJECT' };

/**
 * Initial studio state
 */
const initialState: StudioState = {
  elements: [],
  selectedElementId: null,
  canvasMode: 'desktop',
  zoom: 1,
  gridEnabled: true,
  snapToGrid: true,
  history: {
    past: [],
    present: null,
    future: []
  },
  isDragging: false,
  draggedElement: null,
  clipboard: [],
  project: null
};

/**
 * Studio reducer
 */
function studioReducer(state: StudioState, action: StudioAction): StudioState {
  switch (action.type) {
    case 'ADD_ELEMENT': {
      const newElement = {
        ...action.payload,
        id: action.payload.id || `element-${Date.now()}`,
        metadata: {
          ...action.payload.metadata,
          createdAt: new Date().toISOString()
        }
      };
      
      return {
        ...state,
        elements: [...state.elements, newElement],
        selectedElementId: newElement.id,
        history: {
          past: [...state.history.past, state.elements],
          present: [...state.elements, newElement],
          future: []
        }
      };
    }

    case 'UPDATE_ELEMENT': {
      const updatedElements = state.elements.map(element =>
        element.id === action.payload.id
          ? { 
              ...element, 
              ...action.payload.updates,
              metadata: {
                ...element.metadata,
                lastModified: new Date().toISOString()
              }
            }
          : element
      );

      return {
        ...state,
        elements: updatedElements,
        history: {
          past: [...state.history.past, state.elements],
          present: updatedElements,
          future: []
        }
      };
    }

    case 'DELETE_ELEMENT': {
      const filteredElements = state.elements.filter(el => el.id !== action.payload);
      
      return {
        ...state,
        elements: filteredElements,
        selectedElementId: state.selectedElementId === action.payload ? null : state.selectedElementId,
        history: {
          past: [...state.history.past, state.elements],
          present: filteredElements,
          future: []
        }
      };
    }

    case 'SELECT_ELEMENT':
      return {
        ...state,
        selectedElementId: action.payload
      };

    case 'DUPLICATE_ELEMENT': {
      const elementToDuplicate = state.elements.find(el => el.id === action.payload);
      if (!elementToDuplicate) return state;

      const duplicatedElement = {
        ...elementToDuplicate,
        id: `${elementToDuplicate.type}-${Date.now()}`,
        position: {
          x: elementToDuplicate.position.x + 20,
          y: elementToDuplicate.position.y + 20
        },
        metadata: {
          ...elementToDuplicate.metadata,
          createdAt: new Date().toISOString(),
          duplicatedFrom: elementToDuplicate.id
        }
      };

      return {
        ...state,
        elements: [...state.elements, duplicatedElement],
        selectedElementId: duplicatedElement.id,
        history: {
          past: [...state.history.past, state.elements],
          present: [...state.elements, duplicatedElement],
          future: []
        }
      };
    }

    case 'SET_CANVAS_MODE':
      return {
        ...state,
        canvasMode: action.payload
      };

    case 'SET_ZOOM':
      return {
        ...state,
        zoom: Math.max(0.1, Math.min(5, action.payload))
      };

    case 'TOGGLE_GRID':
      return {
        ...state,
        gridEnabled: !state.gridEnabled
      };

    case 'TOGGLE_SNAP_TO_GRID':
      return {
        ...state,
        snapToGrid: !state.snapToGrid
      };

    case 'UNDO': {
      if (state.history.past.length === 0) return state;

      const previous = state.history.past[state.history.past.length - 1];
      const newPast = state.history.past.slice(0, state.history.past.length - 1);

      return {
        ...state,
        elements: previous,
        history: {
          past: newPast,
          present: previous,
          future: [state.elements, ...state.history.future]
        }
      };
    }

    case 'REDO': {
      if (state.history.future.length === 0) return state;

      const next = state.history.future[0];
      const newFuture = state.history.future.slice(1);

      return {
        ...state,
        elements: next,
        history: {
          past: [...state.history.past, state.elements],
          present: next,
          future: newFuture
        }
      };
    }

    case 'COPY_ELEMENTS': {
      const elementsToCopy = state.elements.filter(el => 
        action.payload.includes(el.id)
      );
      
      return {
        ...state,
        clipboard: elementsToCopy
      };
    }

    case 'PASTE_ELEMENTS': {
      if (state.clipboard.length === 0) return state;

      const pastedElements = state.clipboard.map(element => ({
        ...element,
        id: `${element.type}-${Date.now()}-${Math.random()}`,
        position: {
          x: element.position.x + 20,
          y: element.position.y + 20
        },
        metadata: {
          ...element.metadata,
          createdAt: new Date().toISOString(),
          pastedFrom: element.id
        }
      }));

      return {
        ...state,
        elements: [...state.elements, ...pastedElements],
        history: {
          past: [...state.history.past, state.elements],
          present: [...state.elements, ...pastedElements],
          future: []
        }
      };
    }

    case 'SET_DRAGGING':
      return {
        ...state,
        isDragging: action.payload
      };

    case 'SET_DRAGGED_ELEMENT':
      return {
        ...state,
        draggedElement: action.payload
      };

    case 'LOAD_PROJECT':
      return {
        ...state,
        project: action.payload,
        elements: action.payload.elements || [],
        selectedElementId: null,
        history: {
          past: [],
          present: action.payload.elements || [],
          future: []
        }
      };

    case 'SAVE_PROJECT':
      return {
        ...state,
        project: state.project ? {
          ...state.project,
          lastSaved: new Date().toISOString()
        } : null
      };

    default:
      return state;
  }
}

/**
 * Studio context interface
 */
interface StudioContextType {
  state: StudioState;
  // Element actions
  addElement: (element: any, position?: { x: number; y: number }) => void;
  updateElement: (id: string, updates: any) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  duplicateElement: (id: string) => void;
  // Canvas actions
  setCanvasMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  setZoom: (zoom: number) => void;
  toggleGrid: () => void;
  toggleSnapToGrid: () => void;
  // History actions
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  // Clipboard actions
  copyElements: (elementIds: string[]) => void;
  pasteElements: () => void;
  // Drag actions
  setDragging: (isDragging: boolean) => void;
  setDraggedElement: (element: any | null) => void;
  // Project actions
  loadProject: (project: any) => void;
  saveProject: () => void;
  // Computed values
  selectedElement: any | null;
  canvasElements: any[];
}

/**
 * Studio context
 */
const StudioContext = createContext<StudioContextType | null>(null);

/**
 * Studio provider props
 */
interface StudioProviderProps {
  children: React.ReactNode;
  initialProject?: any;
}

/**
 * StudioProvider Component
 * 
 * Provides studio state management with:
 * - Element CRUD operations
 * - Undo/redo functionality
 * - Canvas state management
 * - Drag and drop support
 * - Project persistence
 * - Keyboard shortcuts
 */
export function StudioProvider({ children, initialProject }: StudioProviderProps) {
  const [state, dispatch] = useReducer(studioReducer, {
    ...initialState,
    project: initialProject || null,
    elements: initialProject?.elements || []
  });

  // Element actions
  const addElement = useCallback((element: any, position?: { x: number; y: number }) => {
    const elementWithPosition = {
      ...element,
      position: position || element.position || { x: 100, y: 100 }
    };
    dispatch({ type: 'ADD_ELEMENT', payload: elementWithPosition });
  }, []);

  const updateElement = useCallback((id: string, updates: any) => {
    dispatch({ type: 'UPDATE_ELEMENT', payload: { id, updates } });
  }, []);

  const deleteElement = useCallback((id: string) => {
    dispatch({ type: 'DELETE_ELEMENT', payload: id });
  }, []);

  const selectElement = useCallback((id: string | null) => {
    dispatch({ type: 'SELECT_ELEMENT', payload: id });
  }, []);

  const duplicateElement = useCallback((id: string) => {
    dispatch({ type: 'DUPLICATE_ELEMENT', payload: id });
  }, []);

  // Canvas actions
  const setCanvasMode = useCallback((mode: 'desktop' | 'tablet' | 'mobile') => {
    dispatch({ type: 'SET_CANVAS_MODE', payload: mode });
  }, []);

  const setZoom = useCallback((zoom: number) => {
    dispatch({ type: 'SET_ZOOM', payload: zoom });
  }, []);

  const toggleGrid = useCallback(() => {
    dispatch({ type: 'TOGGLE_GRID' });
  }, []);

  const toggleSnapToGrid = useCallback(() => {
    dispatch({ type: 'TOGGLE_SNAP_TO_GRID' });
  }, []);

  // History actions
  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' });
  }, []);

  // Clipboard actions
  const copyElements = useCallback((elementIds: string[]) => {
    dispatch({ type: 'COPY_ELEMENTS', payload: elementIds });
  }, []);

  const pasteElements = useCallback(() => {
    dispatch({ type: 'PASTE_ELEMENTS' });
  }, []);

  // Drag actions
  const setDragging = useCallback((isDragging: boolean) => {
    dispatch({ type: 'SET_DRAGGING', payload: isDragging });
  }, []);

  const setDraggedElement = useCallback((element: any | null) => {
    dispatch({ type: 'SET_DRAGGED_ELEMENT', payload: element });
  }, []);

  // Project actions
  const loadProject = useCallback((project: any) => {
    dispatch({ type: 'LOAD_PROJECT', payload: project });
  }, []);

  const saveProject = useCallback(() => {
    dispatch({ type: 'SAVE_PROJECT' });
    // In a real app, this would trigger an API call
    console.log('Saving project...', state.project);
  }, [state.project]);

  // Computed values
  const selectedElement = state.elements.find(el => el.id === state.selectedElementId) || null;
  const canUndo = state.history.past.length > 0;
  const canRedo = state.history.future.length > 0;
  const canvasElements = state.elements;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle shortcuts when not typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Undo/Redo
      if (e.metaKey || e.ctrlKey) {
        if (e.key === 'z' && !e.shiftKey) {
          e.preventDefault();
          undo();
        } else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
          e.preventDefault();
          redo();
        } else if (e.key === 'c') {
          e.preventDefault();
          if (state.selectedElementId) {
            copyElements([state.selectedElementId]);
          }
        } else if (e.key === 'v') {
          e.preventDefault();
          pasteElements();
        } else if (e.key === 'd') {
          e.preventDefault();
          if (state.selectedElementId) {
            duplicateElement(state.selectedElementId);
          }
        } else if (e.key === 's') {
          e.preventDefault();
          saveProject();
        }
      }

      // Delete selected element
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (state.selectedElementId) {
          e.preventDefault();
          deleteElement(state.selectedElementId);
        }
      }

      // Escape to deselect
      if (e.key === 'Escape') {
        selectElement(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state.selectedElementId, undo, redo, copyElements, pasteElements, duplicateElement, deleteElement, selectElement, saveProject]);

  // Auto-save functionality
  useEffect(() => {
    if (!state.project) return;

    const autoSaveInterval = setInterval(() => {
      saveProject();
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [state.project, saveProject]);

  const contextValue: StudioContextType = {
    state,
    // Element actions
    addElement,
    updateElement,
    deleteElement,
    selectElement,
    duplicateElement,
    // Canvas actions
    setCanvasMode,
    setZoom,
    toggleGrid,
    toggleSnapToGrid,
    // History actions
    undo,
    redo,
    canUndo,
    canRedo,
    // Clipboard actions
    copyElements,
    pasteElements,
    // Drag actions
    setDragging,
    setDraggedElement,
    // Project actions
    loadProject,
    saveProject,
    // Computed values
    selectedElement,
    canvasElements
  };

  return (
    <StudioContext.Provider value={contextValue}>
      {children}
    </StudioContext.Provider>
  );
}


/**
 * Hook to use studio context
 */
export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
}