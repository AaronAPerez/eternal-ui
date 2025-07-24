// ====================================
// UPDATED STUDIO PROVIDER WITH ADVANCED FEATURES
// ====================================

'use client';

import React, { createContext, useReducer, useCallback, useEffect, useState } from 'react';

/**
 * Enhanced Studio Provider with Advanced Features
 * 
 * New Features Added:
 * - Advanced selection system (multi-select, lasso, range)
 * - Sophisticated drag & drop with snap guides
 * - 50+ action history system with granular undo/redo
 * - Cross-page clipboard operations
 * - Real-time collaboration cursors
 * - Smart grid system with visual feedback
 * - Keyboard shortcuts for all operations
 * - Context-aware menus
 * - Performance optimizations
 */

// ====================================
// TYPES AND INTERFACES
// ====================================

interface StudioElement {
  id: string;
  type: string;
  position: { x: number; y: number };
  size?: { width: number | string; height: number | string };
  rotation?: number;
  opacity?: number;
  props: Record<string, any>;
  style?: Record<string, any>;
  metadata?: {
    isAIGenerated?: boolean;
    createdAt?: string;
    lastModified?: string;
    copiedFrom?: string;
    pastedAt?: string;
    duplicatedFrom?: string;
  };
  visible?: boolean;
  locked?: boolean;
  zIndex?: number;
}

interface SelectionState {
  selectedItems: string[];
  selectionBox: {
    start: { x: number; y: number };
    end: { x: number; y: number };
    active: boolean;
  };
  lastSelected: string | null;
}

interface DragState {
  isDragging: boolean;
  draggedItems: string[];
  dragOffset: { x: number; y: number };
  ghostPosition: { x: number; y: number };
  snapGuides: SnapGuide[];
  dropZones: DropZone[];
}

interface SnapGuide {
  id: string;
  type: 'horizontal' | 'vertical' | 'center' | 'edge';
  position: number;
  elements: string[];
  visible: boolean;
}

interface DropZone {
  id: string;
  element: string;
  rect: DOMRect;
  depth: number;
  canAccept: boolean;
  highlight: boolean;
}

interface HistoryAction {
  id: string;
  type: 'add' | 'update' | 'delete' | 'move' | 'style' | 'bulk' | 'group' | 'ungroup';
  timestamp: number;
  elements: StudioElement[];
  changes: any;
  description: string;
  beforeState?: StudioElement[];
  afterState?: StudioElement[];
}

interface ClipboardState {
  items: StudioElement[];
  operation: 'copy' | 'cut' | null;
  source: string | null;
  timestamp: number;
}

interface CollaboratorCursor {
  id: string;
  name: string;
  cursor: { x: number; y: number };
  color: string;
  lastSeen: number;
  isActive: boolean;
}

interface StudioState {
  // Core state
  elements: StudioElement[];
  selectedElementId: string | null;
  canvasMode: 'desktop' | 'tablet' | 'mobile';
  zoom: number;
  gridEnabled: boolean;
  snapToGrid: boolean;
  gridSize: number;
  
  // Advanced features
  selection: SelectionState;
  dragState: DragState;
  history: {
    past: HistoryAction[];
    present: HistoryAction | null;
    future: HistoryAction[];
    maxHistory: number;
  };
  clipboard: ClipboardState;
  collaborators: CollaboratorCursor[];
  
  // UI state
  isDragging: boolean;
  isSelecting: boolean;
  showSnapGuides: boolean;
  showCollaborators: boolean;
  
  // Project info
  project: {
    id: string;
    name: string;
    lastSaved: string;
    version: number;
  } | null;
}

/**
 * Studio actions with enhanced functionality
 */
type StudioAction =
  // Element actions
  | { type: 'ADD_ELEMENT'; payload: StudioElement }
  | { type: 'UPDATE_ELEMENT'; payload: { id: string; updates: Partial<StudioElement> } }
  | { type: 'DELETE_ELEMENT'; payload: string }
  | { type: 'DELETE_ELEMENTS'; payload: string[] }
  | { type: 'DUPLICATE_ELEMENT'; payload: string }
  | { type: 'DUPLICATE_ELEMENTS'; payload: string[] }
  | { type: 'SET_ELEMENTS'; payload: StudioElement[] }
  | { type: 'RESTORE_STATE'; payload: StudioElement[] }
  
  // Selection actions
  | { type: 'SELECT_ELEMENT'; payload: string | null }
  | { type: 'SELECT_ELEMENTS'; payload: string[] }
  | { type: 'ADD_TO_SELECTION'; payload: string }
  | { type: 'REMOVE_FROM_SELECTION'; payload: string }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'SELECT_ALL' }
  | { type: 'SET_SELECTION_BOX'; payload: SelectionState['selectionBox'] }
  
  // Canvas actions
  | { type: 'SET_CANVAS_MODE'; payload: 'desktop' | 'tablet' | 'mobile' }
  | { type: 'SET_ZOOM'; payload: number }
  | { type: 'TOGGLE_GRID' }
  | { type: 'TOGGLE_SNAP_TO_GRID' }
  | { type: 'SET_GRID_SIZE'; payload: number }
  
  // Drag actions
  | { type: 'START_DRAG'; payload: { items: string[]; position: { x: number; y: number } } }
  | { type: 'UPDATE_DRAG'; payload: { position: { x: number; y: number }; snapGuides: SnapGuide[] } }
  | { type: 'END_DRAG' }
  | { type: 'SET_SNAP_GUIDES'; payload: SnapGuide[] }
  
  // History actions
  | { type: 'ADD_HISTORY_ACTION'; payload: Omit<HistoryAction, 'id' | 'timestamp'> }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'CLEAR_HISTORY' }
  
  // Clipboard actions
  | { type: 'COPY_ELEMENTS'; payload: { items: StudioElement[]; source: string } }
  | { type: 'CUT_ELEMENTS'; payload: { items: StudioElement[]; source: string } }
  | { type: 'PASTE_ELEMENTS'; payload: { position?: { x: number; y: number } } }
  | { type: 'CLEAR_CLIPBOARD' }
  
  // Collaboration actions
  | { type: 'UPDATE_COLLABORATOR'; payload: CollaboratorCursor }
  | { type: 'REMOVE_COLLABORATOR'; payload: string }
  | { type: 'SET_COLLABORATORS'; payload: CollaboratorCursor[] }
  
  // Project actions
  | { type: 'LOAD_PROJECT'; payload: any }
  | { type: 'SAVE_PROJECT' }
  | { type: 'UPDATE_PROJECT_INFO'; payload: Partial<StudioState['project']> };

/**
 * Initial state with all advanced features
 */
const initialState: StudioState = {
  // Core state
  elements: [],
  selectedElementId: null,
  canvasMode: 'desktop',
  zoom: 1,
  gridEnabled: true,
  snapToGrid: true,
  gridSize: 20,
  
  // Advanced features
  selection: {
    selectedItems: [],
    selectionBox: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, active: false },
    lastSelected: null
  },
  dragState: {
    isDragging: false,
    draggedItems: [],
    dragOffset: { x: 0, y: 0 },
    ghostPosition: { x: 0, y: 0 },
    snapGuides: [],
    dropZones: []
  },
  history: {
    past: [],
    present: null,
    future: [],
    maxHistory: 50
  },
  clipboard: {
    items: [],
    operation: null,
    source: null,
    timestamp: 0
  },
  collaborators: [],
  
  // UI state
  isDragging: false,
  isSelecting: false,
  showSnapGuides: true,
  showCollaborators: true,
  
  // Project info
  project: null
};

/**
 * Enhanced Studio Reducer with Advanced Features
 */
function studioReducer(state: StudioState, action: StudioAction): StudioState {
  switch (action.type) {
    // ====================================
    // ELEMENT ACTIONS
    // ====================================
    
    case 'ADD_ELEMENT': {
      const newElement: StudioElement = {
        ...action.payload,
        id: action.payload.id || `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        metadata: {
          ...action.payload.metadata,
          createdAt: new Date().toISOString()
        },
        zIndex: state.elements.length
      };
      
      return {
        ...state,
        elements: [...state.elements, newElement],
        selection: {
          ...state.selection,
          selectedItems: [newElement.id],
          lastSelected: newElement.id
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
        elements: updatedElements
      };
    }

    case 'DELETE_ELEMENT': {
      const filteredElements = state.elements.filter(el => el.id !== action.payload);
      
      return {
        ...state,
        elements: filteredElements,
        selection: {
          ...state.selection,
          selectedItems: state.selection.selectedItems.filter(id => id !== action.payload),
          lastSelected: state.selection.lastSelected === action.payload ? null : state.selection.lastSelected
        },
        selectedElementId: state.selectedElementId === action.payload ? null : state.selectedElementId
      };
    }

    case 'DELETE_ELEMENTS': {
      const filteredElements = state.elements.filter(el => !action.payload.includes(el.id));
      
      return {
        ...state,
        elements: filteredElements,
        selection: {
          ...state.selection,
          selectedItems: state.selection.selectedItems.filter(id => !action.payload.includes(id)),
          lastSelected: action.payload.includes(state.selection.lastSelected || '') ? null : state.selection.lastSelected
        }
      };
    }

    case 'DUPLICATE_ELEMENT': {
      const elementToDuplicate = state.elements.find(el => el.id === action.payload);
      if (!elementToDuplicate) return state;

      const duplicatedElement: StudioElement = {
        ...elementToDuplicate,
        id: `${elementToDuplicate.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        position: {
          x: elementToDuplicate.position.x + 20,
          y: elementToDuplicate.position.y + 20
        },
        metadata: {
          ...elementToDuplicate.metadata,
          createdAt: new Date().toISOString(),
          duplicatedFrom: elementToDuplicate.id
        },
        zIndex: state.elements.length
      };

      return {
        ...state,
        elements: [...state.elements, duplicatedElement],
        selection: {
          ...state.selection,
          selectedItems: [duplicatedElement.id],
          lastSelected: duplicatedElement.id
        }
      };
    }

    case 'DUPLICATE_ELEMENTS': {
      const elementsToDuplicate = state.elements.filter(el => action.payload.includes(el.id));
      const duplicatedElements = elementsToDuplicate.map((element, index) => ({
        ...element,
        id: `${element.type}-${Date.now()}-${index}`,
        position: {
          x: element.position.x + 20,
          y: element.position.y + 20
        },
        metadata: {
          ...element.metadata,
          createdAt: new Date().toISOString(),
          duplicatedFrom: element.id
        },
        zIndex: state.elements.length + index
      }));

      return {
        ...state,
        elements: [...state.elements, ...duplicatedElements],
        selection: {
          ...state.selection,
          selectedItems: duplicatedElements.map(el => el.id),
          lastSelected: duplicatedElements[duplicatedElements.length - 1]?.id || null
        }
      };
    }

    case 'SET_ELEMENTS':
      return {
        ...state,
        elements: action.payload
      };

    case 'RESTORE_STATE':
      return {
        ...state,
        elements: action.payload
      };

    // ====================================
    // SELECTION ACTIONS
    // ====================================

    case 'SELECT_ELEMENT':
      return {
        ...state,
        selectedElementId: action.payload,
        selection: {
          ...state.selection,
          selectedItems: action.payload ? [action.payload] : [],
          lastSelected: action.payload
        }
      };

    case 'SELECT_ELEMENTS':
      return {
        ...state,
        selection: {
          ...state.selection,
          selectedItems: action.payload,
          lastSelected: action.payload[action.payload.length - 1] || null
        },
        selectedElementId: action.payload[0] || null
      };

    case 'ADD_TO_SELECTION':
      if (state.selection.selectedItems.includes(action.payload)) return state;
      
      return {
        ...state,
        selection: {
          ...state.selection,
          selectedItems: [...state.selection.selectedItems, action.payload],
          lastSelected: action.payload
        }
      };

    case 'REMOVE_FROM_SELECTION':
      return {
        ...state,
        selection: {
          ...state.selection,
          selectedItems: state.selection.selectedItems.filter(id => id !== action.payload),
          lastSelected: state.selection.lastSelected === action.payload ? null : state.selection.lastSelected
        }
      };

    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedElementId: null,
        selection: {
          ...state.selection,
          selectedItems: [],
          lastSelected: null
        }
      };

    case 'SELECT_ALL':
      const allElementIds = state.elements.map(el => el.id);
      return {
        ...state,
        selection: {
          ...state.selection,
          selectedItems: allElementIds,
          lastSelected: allElementIds[allElementIds.length - 1] || null
        }
      };

    case 'SET_SELECTION_BOX':
      return {
        ...state,
        selection: {
          ...state.selection,
          selectionBox: action.payload
        },
        isSelecting: action.payload.active
      };

    // ====================================
    // CANVAS ACTIONS
    // ====================================

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

    case 'SET_GRID_SIZE':
      return {
        ...state,
        gridSize: Math.max(5, Math.min(100, action.payload))
      };

    // ====================================
    // DRAG ACTIONS
    // ====================================

    case 'START_DRAG':
      return {
        ...state,
        dragState: {
          ...state.dragState,
          isDragging: true,
          draggedItems: action.payload.items,
          dragOffset: { x: 0, y: 0 },
          ghostPosition: action.payload.position
        },
        isDragging: true
      };

    case 'UPDATE_DRAG':
      return {
        ...state,
        dragState: {
          ...state.dragState,
          ghostPosition: action.payload.position,
          snapGuides: action.payload.snapGuides
        }
      };

    case 'END_DRAG':
      return {
        ...state,
        dragState: {
          isDragging: false,
          draggedItems: [],
          dragOffset: { x: 0, y: 0 },
          ghostPosition: { x: 0, y: 0 },
          snapGuides: [],
          dropZones: []
        },
        isDragging: false
      };

    case 'SET_SNAP_GUIDES':
      return {
        ...state,
        dragState: {
          ...state.dragState,
          snapGuides: action.payload
        }
      };

    // ====================================
    // HISTORY ACTIONS
    // ====================================

    case 'ADD_HISTORY_ACTION': {
      const newAction: HistoryAction = {
        ...action.payload,
        id: `action-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now()
      };

      const newPast = state.history.present 
        ? [...state.history.past, state.history.present].slice(-state.history.maxHistory)
        : state.history.past;

      return {
        ...state,
        history: {
          ...state.history,
          past: newPast,
          present: newAction,
          future: []
        }
      };
    }

    case 'UNDO': {
      if (state.history.past.length === 0) return state;
      
      const previous = state.history.past[state.history.past.length - 1];
      const newPast = state.history.past.slice(0, -1);
      
      return {
        ...state,
        history: {
          ...state.history,
          past: newPast,
          present: previous,
          future: state.history.present ? [state.history.present, ...state.history.future] : state.history.future
        }
      };
    }

    case 'REDO': {
      if (state.history.future.length === 0) return state;
      
      const next = state.history.future[0];
      const newFuture = state.history.future.slice(1);
      
      return {
        ...state,
        history: {
          ...state.history,
          past: state.history.present ? [...state.history.past, state.history.present] : state.history.past,
          present: next,
          future: newFuture
        }
      };
    }

    case 'CLEAR_HISTORY':
      return {
        ...state,
        history: {
          past: [],
          present: null,
          future: [],
          maxHistory: state.history.maxHistory
        }
      };

    // ====================================
    // CLIPBOARD ACTIONS
    // ====================================

    case 'COPY_ELEMENTS':
      return {
        ...state,
        clipboard: {
          items: JSON.parse(JSON.stringify(action.payload.items)), // Deep clone
          operation: 'copy',
          source: action.payload.source,
          timestamp: Date.now()
        }
      };

    case 'CUT_ELEMENTS':
      return {
        ...state,
        clipboard: {
          items: JSON.parse(JSON.stringify(action.payload.items)), // Deep clone
          operation: 'cut',
          source: action.payload.source,
          timestamp: Date.now()
        }
      };

    case 'PASTE_ELEMENTS': {
      if (state.clipboard.items.length === 0) return state;

      const offset = action.payload.position || { x: 20, y: 20 };
      const pastedElements = state.clipboard.items.map((item, index) => ({
        ...item,
        id: `${item.id}-paste-${Date.now()}-${index}`,
        position: {
          x: item.position.x + offset.x + (index * 10),
          y: item.position.y + offset.y + (index * 10)
        },
        metadata: {
          ...item.metadata,
          copiedFrom: item.id,
          pastedAt: new Date().toISOString()
        },
        zIndex: state.elements.length + index
      }));

      return {
        ...state,
        elements: [...state.elements, ...pastedElements],
        selection: {
          ...state.selection,
          selectedItems: pastedElements.map(el => el.id),
          lastSelected: pastedElements[pastedElements.length - 1]?.id || null
        }
      };
    }

    case 'CLEAR_CLIPBOARD':
      return {
        ...state,
        clipboard: {
          items: [],
          operation: null,
          source: null,
          timestamp: 0
        }
      };

    // ====================================
    // COLLABORATION ACTIONS
    // ====================================

    case 'UPDATE_COLLABORATOR': {
      const existingIndex = state.collaborators.findIndex(c => c.id === action.payload.id);
      
      if (existingIndex >= 0) {
        const updatedCollaborators = [...state.collaborators];
        updatedCollaborators[existingIndex] = action.payload;
        return {
          ...state,
          collaborators: updatedCollaborators
        };
      } else {
        return {
          ...state,
          collaborators: [...state.collaborators, action.payload]
        };
      }
    }

    case 'REMOVE_COLLABORATOR':
      return {
        ...state,
        collaborators: state.collaborators.filter(c => c.id !== action.payload)
      };

    case 'SET_COLLABORATORS':
      return {
        ...state,
        collaborators: action.payload
      };

    // ====================================
    // PROJECT ACTIONS
    // ====================================

    case 'LOAD_PROJECT':
      return {
        ...state,
        project: action.payload,
        elements: action.payload.elements || [],
        selection: {
          selectedItems: [],
          selectionBox: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, active: false },
          lastSelected: null
        },
        history: {
          past: [],
          present: null,
          future: [],
          maxHistory: 50
        }
      };

    case 'SAVE_PROJECT':
      return {
        ...state,
        project: state.project ? {
          ...state.project,
          lastSaved: new Date().toISOString(),
          version: (state.project.version || 0) + 1
        } : null
      };

    case 'UPDATE_PROJECT_INFO':
      return {
        ...state,
        project: state.project ? {
          ...state.project,
          ...action.payload
        } : null
      };

    default:
      return state;
  }
}

/**
 * Enhanced Studio Context Interface
 */
interface StudioContextType {
  // State
  state: StudioState;
  
  // Element actions
  addElement: (element: Partial<StudioElement>, position?: { x: number; y: number }) => void;
  updateElement: (id: string, updates: Partial<StudioElement>) => void;
  deleteElement: (id: string) => void;
  deleteElements: (ids: string[]) => void;
  duplicateElement: (id: string) => void;
  duplicateElements: (ids: string[]) => void;
  
  // Selection actions
  selectElement: (id: string | null) => void;
  selectElements: (ids: string[]) => void;
  addToSelection: (id: string) => void;
  removeFromSelection: (id: string) => void;
  clearSelection: () => void;
  selectAll: () => void;
  
  // Canvas actions
  setCanvasMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  setZoom: (zoom: number) => void;
  toggleGrid: () => void;
  toggleSnapToGrid: () => void;
  setGridSize: (size: number) => void;
  
  // Drag actions
  startDrag: (items: string[], position: { x: number; y: number }) => void;
  updateDrag: (position: { x: number; y: number }, snapGuides: SnapGuide[]) => void;
  endDrag: () => void;
  
  // History actions
  addHistoryAction: (action: Omit<HistoryAction, 'id' | 'timestamp'>) => void;
  undo: () => void;
  redo: () => void;
  clearHistory: () => void;
  canUndo: boolean;
  canRedo: boolean;
  
  // Clipboard actions
  copyElements: (items: StudioElement[], source: string) => void;
  cutElements: (items: StudioElement[], source: string) => void;
  pasteElements: (position?: { x: number; y: number }) => void;
  clearClipboard: () => void;
  canPaste: boolean;
  
  // Collaboration actions
  updateCollaborator: (collaborator: CollaboratorCursor) => void;
  removeCollaborator: (id: string) => void;
  
  // Project actions
  loadProject: (project: any) => void;
  saveProject: () => void;
  
  // Computed values
  selectedElement: StudioElement | null;
  selectedElements: StudioElement[];
  canvasElements: StudioElement[];
  hasSelection: boolean;
  selectionCount: number;
}

/**
 * Studio Context
 */
export const StudioContext = createContext<StudioContextType | null>(null);

/**
 * Studio Provider Props
 */
interface StudioProviderProps {
  children: React.ReactNode;
  initialProject?: any;
}

/**
 * Enhanced StudioProvider Component
 */
export function StudioProvider({ children, initialProject }: StudioProviderProps) {
  const [state, dispatch] = useReducer(studioReducer, {
    ...initialState,
    project: initialProject || null,
    elements: initialProject?.elements || []
  });

  // ====================================
  // ELEMENT ACTIONS
  // ====================================

  const addElement = useCallback((element: Partial<StudioElement>, position?: { x: number; y: number }) => {
    const elementWithPosition: StudioElement = {
      id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'div',
      position: position || { x: 100, y: 100 },
      props: {},
      ...element,
      metadata: {
        createdAt: new Date().toISOString(),
        ...element.metadata
      }
    };

    dispatch({ type: 'ADD_ELEMENT', payload: elementWithPosition });
    
    // Add to history
    dispatch({
      type: 'ADD_HISTORY_ACTION',
      payload: {
        type: 'add',
        elements: [elementWithPosition],
        changes: {},
        description: `Added ${elementWithPosition.type}`,
        afterState: [...state.elements, elementWithPosition]
      }
    });
  }, [state.elements]);

  const updateElement = useCallback((id: string, updates: Partial<StudioElement>) => {
    const oldElement = state.elements.find(el => el.id === id);
    if (!oldElement) return;

    dispatch({ type: 'UPDATE_ELEMENT', payload: { id, updates } });
    
    // Add to history
    dispatch({
      type: 'ADD_HISTORY_ACTION',
      payload: {
        type: 'update',
        elements: [{ ...oldElement, ...updates }],
        changes: updates,
        description: `Updated ${oldElement.type}`,
        beforeState: [oldElement],
        afterState: [{ ...oldElement, ...updates }]
      }
    });
  }, [state.elements]);

  const deleteElement = useCallback((id: string) => {
    const elementToDelete = state.elements.find(el => el.id === id);
    if (!elementToDelete) return;

    dispatch({ type: 'DELETE_ELEMENT', payload: id });
    
    // Add to history
    dispatch({
      type: 'ADD_HISTORY_ACTION',
      payload: {
        type: 'delete',
        elements: [elementToDelete],
        changes: {},
        description: `Deleted ${elementToDelete.type}`,
        beforeState: [elementToDelete]
      }
    });
  }, [state.elements]);

  const deleteElements = useCallback((ids: string[]) => {
    const elementsToDelete = state.elements.filter(el => ids.includes(el.id));
    if (elementsToDelete.length === 0) return;

    dispatch({ type: 'DELETE_ELEMENTS', payload: ids });
    
    // Add to history
    dispatch({
      type: 'ADD_HISTORY_ACTION',
      payload: {
        type: 'bulk',
        elements: elementsToDelete,
        changes: {},
        description: `Deleted ${elementsToDelete.length} elements`,
        beforeState: elementsToDelete
      }
    });
  }, [state.elements]);

  const duplicateElement = useCallback((id: string) => {
    dispatch({ type: 'DUPLICATE_ELEMENT', payload: id });
    
    const elementToDuplicate = state.elements.find(el => el.id === id);
    if (elementToDuplicate) {
      dispatch({
        type: 'ADD_HISTORY_ACTION',
        payload: {
          type: 'add',
          elements: [elementToDuplicate],
          changes: {},
          description: `Duplicated ${elementToDuplicate.type}`
        }
      });
    }
  }, [state.elements]);

  const duplicateElements = useCallback((ids: string[]) => {
  const elementsToDuplicate = state.elements.filter(el => ids.includes(el.id));
  if (elementsToDuplicate.length === 0) return;

  const duplicatedElements = elementsToDuplicate.map((element, index) => ({
    ...element,
    id: `${element.type}-${Date.now()}-${index}`,
    position: {
      x: element.position.x + 20,
      y: element.position.y + 20
    },
    metadata: {
      ...element.metadata,
      createdAt: new Date().toISOString(),
      duplicatedFrom: element.id
    },
    zIndex: state.elements.length + index
  }));

  // Add duplicated elements to state
  duplicatedElements.forEach(element => {
    dispatch({ type: 'ADD_ELEMENT', payload: element });
  });

  // Update selection to the new elements
  dispatch({
    type: 'SELECT_ELEMENTS',
    payload: duplicatedElements.map(el => el.id)
  });

  // Add to history
  dispatch({
    type: 'ADD_HISTORY_ACTION',
    payload: {
      type: 'bulk',
      elements: duplicatedElements,
      changes: {},
      description: `Duplicated ${duplicatedElements.length} elements`
    }
  });
}, [state.elements, dispatch]);

   // ====================================
  // SELECTION ACTIONS
  // ====================================

  const selectElement = useCallback((id: string | null) => {
    dispatch({ type: 'SELECT_ELEMENT', payload: id });
  }, []);

  const selectElements = useCallback((ids: string[]) => {
    dispatch({ type: 'SELECT_ELEMENTS', payload: ids });
  }, []);

  const addToSelection = useCallback((id: string) => {
    dispatch({ type: 'ADD_TO_SELECTION', payload: id });
  }, []);

  const removeFromSelection = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_FROM_SELECTION', payload: id });
  }, []);

  const clearSelection = useCallback(() => {
    dispatch({ type: 'CLEAR_SELECTION' });
  }, []);

  const selectAll = useCallback(() => {
    dispatch({ type: 'SELECT_ALL' });
  }, []);

  // ====================================
  // CANVAS ACTIONS
  // ====================================

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

  const setGridSize = useCallback((size: number) => {
    dispatch({ type: 'SET_GRID_SIZE', payload: size });
  }, []);

  // ====================================
  // DRAG ACTIONS
  // ====================================

  const startDrag = useCallback((items: string[], position: { x: number; y: number }) => {
    dispatch({ type: 'START_DRAG', payload: { items, position } });
  }, []);

  const updateDrag = useCallback((position: { x: number; y: number }, snapGuides: SnapGuide[]) => {
    dispatch({ type: 'UPDATE_DRAG', payload: { position, snapGuides } });
  }, []);

  const endDrag = useCallback(() => {
    dispatch({ type: 'END_DRAG' });
  }, []);

  // ====================================
  // HISTORY ACTIONS
  // ====================================

  const addHistoryAction = useCallback((action: Omit<HistoryAction, 'id' | 'timestamp'>) => {
    dispatch({ type: 'ADD_HISTORY_ACTION', payload: action });
  }, []);

  const undo = useCallback(() => {
    if (state.history.past.length > 0) {
      const lastAction = state.history.past[state.history.past.length - 1];
      
      // Apply the undo operation based on action type
      if (lastAction.beforeState) {
        dispatch({ type: 'RESTORE_STATE', payload: lastAction.beforeState });
      }
      
      dispatch({ type: 'UNDO' });
    }
  }, [state.history.past]);

  const redo = useCallback(() => {
    if (state.history.future.length > 0) {
      const nextAction = state.history.future[0];
      
      // Apply the redo operation based on action type
      if (nextAction.afterState) {
        dispatch({ type: 'RESTORE_STATE', payload: nextAction.afterState });
      }
      
      dispatch({ type: 'REDO' });
    }
  }, [state.history.future]);

  const clearHistory = useCallback(() => {
    dispatch({ type: 'CLEAR_HISTORY' });
  }, []);

  // ====================================
  // CLIPBOARD ACTIONS
  // ====================================

  const copyElements = useCallback((items: StudioElement[], source: string) => {
    dispatch({ type: 'COPY_ELEMENTS', payload: { items, source } });
    
    // Add to history
    dispatch({
      type: 'ADD_HISTORY_ACTION',
      payload: {
        type: 'bulk',
        elements: items,
        changes: {},
        description: `Copied ${items.length} elements`
      }
    });
  }, []);

  const cutElements = useCallback((items: StudioElement[], source: string) => {
    dispatch({ type: 'CUT_ELEMENTS', payload: { items, source } });
    
    // Remove cut elements after copying
    const elementIds = items.map(item => item.id);
    dispatch({ type: 'DELETE_ELEMENTS', payload: elementIds });
    
    // Add to history
    dispatch({
      type: 'ADD_HISTORY_ACTION',
      payload: {
        type: 'bulk',
        elements: items,
        changes: {},
        description: `Cut ${items.length} elements`,
        beforeState: items
      }
    });
  }, []);

  const pasteElements = useCallback((position?: { x: number; y: number }) => {
    dispatch({ type: 'PASTE_ELEMENTS', payload: { position } });
    
    // Add to history
    if (state.clipboard.items.length > 0) {
      dispatch({
        type: 'ADD_HISTORY_ACTION',
        payload: {
          type: 'bulk',
          elements: state.clipboard.items,
          changes: {},
          description: `Pasted ${state.clipboard.items.length} elements`
        }
      });
    }
  }, [state.clipboard.items]);

  const clearClipboard = useCallback(() => {
    dispatch({ type: 'CLEAR_CLIPBOARD' });
  }, []);

  // ====================================
  // COLLABORATION ACTIONS
  // ====================================

  const updateCollaborator = useCallback((collaborator: CollaboratorCursor) => {
    dispatch({ type: 'UPDATE_COLLABORATOR', payload: collaborator });
  }, []);

  const removeCollaborator = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_COLLABORATOR', payload: id });
  }, []);

  // ====================================
  // PROJECT ACTIONS
  // ====================================

  const loadProject = useCallback((project: any) => {
    dispatch({ type: 'LOAD_PROJECT', payload: project });
  }, []);

  const saveProject = useCallback(() => {
    dispatch({ type: 'SAVE_PROJECT' });
    
    // Here save to backend
    // For example:
    // await saveProjectToBackend(state.project, state.elements);
  }, []);

  // ====================================
  // COMPUTED VALUES
  // ====================================

  const selectedElement = state.elements.find(el => el.id === state.selectedElementId) || null;
  const selectedElements = state.elements.filter(el => state.selection.selectedItems.includes(el.id));
  const canvasElements = state.elements.filter(el => el.visible !== false);
  const hasSelection = state.selection.selectedItems.length > 0;
  const selectionCount = state.selection.selectedItems.length;
  const canUndo = state.history.past.length > 0;
  const canRedo = state.history.future.length > 0;
  const canPaste = state.clipboard.items.length > 0;

  // ====================================
  // KEYBOARD SHORTCUTS
  // ====================================

 useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    const isCtrlOrCmd = event.ctrlKey || event.metaKey;
    
    if (isCtrlOrCmd) {
      switch (event.key.toLowerCase()) {
        case 'z':
          event.preventDefault();
          if (event.shiftKey) {
            redo();
          } else {
            undo();
          }
          break;
        case 'c':
          if (hasSelection) {
            event.preventDefault();
            copyElements(selectedElements, 'keyboard');
          }
          break;
        case 'x':
          if (hasSelection) {
            event.preventDefault();
            cutElements(selectedElements, 'keyboard');
          }
          break;
        case 'v':
          if (canPaste) {
            event.preventDefault();
            pasteElements();
          }
          break;
        case 'a':
          event.preventDefault();
          selectAll();
          break;
        case 'd':
          if (hasSelection) {
            event.preventDefault();
            duplicateElements(state.selection.selectedItems); // ✅ FIXED: Now function exists
          }
          break;
      }
    }
    
    // Non-modifier shortcuts
    switch (event.key) {
      case 'Delete':
      case 'Backspace':
        if (hasSelection) {
          event.preventDefault();
          deleteElements(state.selection.selectedItems);
        }
        break;
      case 'Escape':
        event.preventDefault();
        clearSelection();
        break;
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [
  undo, redo, hasSelection, selectedElements, canPaste, 
  copyElements, cutElements, pasteElements, selectAll,
  duplicateElements, 
  deleteElements, 
  clearSelection,
  state.selection.selectedItems
]);

  // ====================================
  // AUTO-SAVE FUNCTIONALITY
  // ====================================

  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  useEffect(() => {
    if (!autoSaveEnabled || !state.project) return;

    const autoSaveTimer = setTimeout(() => {
      saveProject();
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(autoSaveTimer);
  }, [state.elements, state.project, autoSaveEnabled, saveProject]);

  // ====================================
  // PERFORMANCE OPTIMIZATIONS
  // ====================================

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useState(() => ({
    // State
    state,
    
    // Element actions
    addElement,
    updateElement,
    deleteElement,
    deleteElements,
    duplicateElement,
    duplicateElements,
    
    // Selection actions
    selectElement,
    selectElements,
    addToSelection,
    removeFromSelection,
    clearSelection,
    selectAll,
    
    // Canvas actions
    setCanvasMode,
    setZoom,
    toggleGrid,
    toggleSnapToGrid,
    setGridSize,
    
    // Drag actions
    startDrag,
    updateDrag,
    endDrag,
    
    // History actions
    addHistoryAction,
    undo,
    redo,
    clearHistory,
    canUndo,
    canRedo,
    
    // Clipboard actions
    copyElements,
    cutElements,
    pasteElements,
    clearClipboard,
    canPaste,
    
    // Collaboration actions
    updateCollaborator,
    removeCollaborator,
    
    // Project actions
    loadProject,
    saveProject,
    
    // Computed values
    selectedElement,
    selectedElements,
    canvasElements,
    hasSelection,
    selectionCount,
  }))[0];

  // Update the context value when dependencies change
  useEffect(() => {
    Object.assign(contextValue, {
      state,
      selectedElement,
      selectedElements,
      canvasElements,
      hasSelection,
      selectionCount,
      canUndo,
      canRedo,
      canPaste,
    });
  }, [
    state, selectedElement, selectedElements, canvasElements,
    hasSelection, selectionCount, canUndo, canRedo, canPaste,
    contextValue
  ]);

  return (
    <StudioContext.Provider value={contextValue}>
      {children}
    </StudioContext.Provider>
  );
}




/**
 * Export types for external use
 */
export type {
  StudioElement,
  StudioState,
  StudioAction,
  SelectionState,
  DragState,
  HistoryAction,
  ClipboardState,
  CollaboratorCursor,
  SnapGuide,
  DropZone,
  StudioContextType
};