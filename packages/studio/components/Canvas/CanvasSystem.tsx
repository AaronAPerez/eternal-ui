'use client'

import React, { useRef, useCallback, useEffect } from 'react'
import { 
  DndContext, 
  DragOverlay, 
  useSensor, 
  useSensors, 
  PointerSensor,
  KeyboardSensor,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  rectIntersection
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'

/**
 * Canvas System Types and Interfaces
 * 
 * Comprehensive type system for the visual builder canvas,
 * supporting complex component hierarchies, responsive layouts,
 * and real-time collaboration.
 */

export interface CanvasElement {
  id: string
  type: string
  name: string
  props: Record<string, any>
  children: CanvasElement[]
  parent?: string
  position: {
    x: number
    y: number
    z: number
  }
  constraints: {
    width: string | number
    height: string | number
    minWidth?: string | number
    maxWidth?: string | number
    responsive: boolean
    locked: boolean
  }
  styling: {
    className?: string
    style?: React.CSSProperties
    variants?: Record<string, any>
  }
  metadata: {
    createdAt: string
    updatedAt: string
    version: number
    author?: string
  }
}

export interface CanvasState {
  elements: Map<string, CanvasElement>
  selectedElements: Set<string>
  hoveredElement: string | null
  draggedElement: string | null
  viewport: {
    zoom: number
    panX: number
    panY: number
    width: number
    height: number
  }
  history: {
    past: CanvasElement[][]
    present: CanvasElement[]
    future: CanvasElement[][]
  }
  collaboration: {
    cursors: Map<string, { x: number; y: number; user: string }>
    locks: Map<string, string> // elementId -> userId
  }
}

export interface ComponentDefinition {
  type: string
  name: string
  category: string
  icon: React.ComponentType
  defaultProps: Record<string, any>
  propSchema: PropertySchema
  previewComponent: React.ComponentType<any>
  exportTemplate: {
    react: string
    vue: string
    angular: string
  }
}

export interface PropertySchema {
  [key: string]: {
    type: 'string' | 'number' | 'boolean' | 'color' | 'image' | 'select' | 'array' | 'object'
    label: string
    description?: string
    default: any
    validation?: {
      required?: boolean
      min?: number
      max?: number
      pattern?: RegExp
    }
    options?: Array<{ label: string; value: any }>
    group?: string
    conditional?: {
      field: string
      value: any
    }
  }
}

/**
 * Canvas Context for Global State Management
 */
interface CanvasContextType {
  state: CanvasState
  dispatch: React.Dispatch<CanvasAction>
  selectedElement: CanvasElement | null
  addElement: (element: Omit<CanvasElement, 'id' | 'metadata'>) => void
  updateElement: (id: string, updates: Partial<CanvasElement>) => void
  deleteElement: (id: string) => void
  selectElement: (id: string | null, multi?: boolean) => void
  duplicateElement: (id: string) => void
  moveElement: (id: string, parentId: string | null, index?: number) => void
  undo: () => void
  redo: () => void
  exportToCode: (framework: 'react' | 'vue' | 'angular') => string
}

type CanvasAction = 
  | { type: 'ADD_ELEMENT'; payload: CanvasElement }
  | { type: 'UPDATE_ELEMENT'; payload: { id: string; updates: Partial<CanvasElement> } }
  | { type: 'DELETE_ELEMENT'; payload: string }
  | { type: 'SELECT_ELEMENT'; payload: { id: string | null; multi: boolean } }
  | { type: 'SET_HOVER'; payload: string | null }
  | { type: 'SET_DRAG'; payload: string | null }
  | { type: 'UPDATE_VIEWPORT'; payload: Partial<CanvasState['viewport']> }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SAVE_STATE' }

const CanvasContext = React.createContext<CanvasContextType | null>(null)

/**
 * Canvas Reducer for State Management
 */
function canvasReducer(state: CanvasState, action: CanvasAction): CanvasState {
  switch (action.type) {
    case 'ADD_ELEMENT': {
      const newElements = new Map(state.elements)
      newElements.set(action.payload.id, action.payload)
      
      return {
        ...state,
        elements: newElements,
        history: {
          past: [...state.history.past, Array.from(state.elements.values())],
          present: Array.from(newElements.values()),
          future: []
        }
      }
    }
    
    case 'UPDATE_ELEMENT': {
      const { id, updates } = action.payload
      const element = state.elements.get(id)
      if (!element) return state
      
      const updatedElement = {
        ...element,
        ...updates,
        metadata: {
          ...element.metadata,
          updatedAt: new Date().toISOString(),
          version: element.metadata.version + 1
        }
      }
      
      const newElements = new Map(state.elements)
      newElements.set(id, updatedElement)
      
      return {
        ...state,
        elements: newElements,
        history: {
          past: [...state.history.past, Array.from(state.elements.values())],
          present: Array.from(newElements.values()),
          future: []
        }
      }
    }
    
    case 'DELETE_ELEMENT': {
      const newElements = new Map(state.elements)
      const deleteElementRecursive = (elementId: string) => {
        const element = newElements.get(elementId)
        if (element) {
          // Delete children first
          element.children.forEach(child => deleteElementRecursive(child.id))
          newElements.delete(elementId)
        }
      }
      
      deleteElementRecursive(action.payload)
      
      return {
        ...state,
        elements: newElements,
        selectedElements: new Set(
          Array.from(state.selectedElements).filter(id => newElements.has(id))
        ),
        history: {
          past: [...state.history.past, Array.from(state.elements.values())],
          present: Array.from(newElements.values()),
          future: []
        }
      }
    }
    
    case 'SELECT_ELEMENT': {
      const { id, multi } = action.payload
      let newSelection = new Set<string>()
      
      if (id) {
        if (multi && state.selectedElements.has(id)) {
          newSelection = new Set(state.selectedElements)
          newSelection.delete(id)
        } else if (multi) {
          newSelection = new Set(state.selectedElements)
          newSelection.add(id)
        } else {
          newSelection.add(id)
        }
      }
      
      return {
        ...state,
        selectedElements: newSelection
      }
    }
    
    case 'SET_HOVER': {
      return {
        ...state,
        hoveredElement: action.payload
      }
    }
    
    case 'SET_DRAG': {
      return {
        ...state,
        draggedElement: action.payload
      }
    }
    
    case 'UPDATE_VIEWPORT': {
      return {
        ...state,
        viewport: {
          ...state.viewport,
          ...action.payload
        }
      }
    }
    
    case 'UNDO': {
      if (state.history.past.length === 0) return state
      
      const previous = state.history.past[state.history.past.length - 1]
      const newPast = state.history.past.slice(0, -1)
      
      return {
        ...state,
        elements: new Map(previous.map(el => [el.id, el])),
        history: {
          past: newPast,
          present: previous,
          future: [state.history.present, ...state.history.future]
        }
      }
    }
    
    case 'REDO': {
      if (state.history.future.length === 0) return state
      
      const next = state.history.future[0]
      const newFuture = state.history.future.slice(1)
      
      return {
        ...state,
        elements: new Map(next.map(el => [el.id, el])),
        history: {
          past: [...state.history.past, state.history.present],
          present: next,
          future: newFuture
        }
      }
    }
    
    default:
      return state
  }
}

/**
 * Canvas Provider Component
 */
export const CanvasProvider: React.FC<{
  children: React.ReactNode
  initialElements?: CanvasElement[]
}> = ({ children, initialElements = [] }) => {
  const [state, dispatch] = React.useReducer(canvasReducer, {
    elements: new Map(initialElements.map(el => [el.id, el])),
    selectedElements: new Set(),
    hoveredElement: null,
    draggedElement: null,
    viewport: {
      zoom: 1,
      panX: 0,
      panY: 0,
      width: 1200,
      height: 800
    },
    history: {
      past: [],
      present: initialElements,
      future: []
    },
    collaboration: {
      cursors: new Map(),
      locks: new Map()
    }
  })

  // Helper functions
  const generateId = () => `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  const addElement = useCallback((elementData: Omit<CanvasElement, 'id' | 'metadata'>) => {
    const element: CanvasElement = {
      ...elementData,
      id: generateId(),
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1
      }
    }
    dispatch({ type: 'ADD_ELEMENT', payload: element })
  }, [])

  const updateElement = useCallback((id: string, updates: Partial<CanvasElement>) => {
    dispatch({ type: 'UPDATE_ELEMENT', payload: { id, updates } })
  }, [])

  const deleteElement = useCallback((id: string) => {
    dispatch({ type: 'DELETE_ELEMENT', payload: id })
  }, [])

  const selectElement = useCallback((id: string | null, multi = false) => {
    dispatch({ type: 'SELECT_ELEMENT', payload: { id, multi } })
  }, [])

  const duplicateElement = useCallback((id: string) => {
    const element = state.elements.get(id)
    if (!element) return

    const duplicateElementRecursive = (el: CanvasElement): CanvasElement => ({
      ...el,
      id: generateId(),
      name: `${el.name} Copy`,
      position: {
        ...el.position,
        x: el.position.x + 20,
        y: el.position.y + 20
      },
      children: el.children.map(duplicateElementRecursive),
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1
      }
    })

    const duplicated = duplicateElementRecursive(element)
    dispatch({ type: 'ADD_ELEMENT', payload: duplicated })
  }, [state.elements])

  const moveElement = useCallback((id: string, parentId: string | null, index?: number) => {
    // Implementation for moving elements in hierarchy
    const element = state.elements.get(id)
    if (!element) return

    updateElement(id, { parent: parentId || undefined })
  }, [state.elements, updateElement])

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' })
  }, [])

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' })
  }, [])

  const exportToCode = useCallback((framework: 'react' | 'vue' | 'angular') => {
    // Implementation will be in CodeExporter component
    return `// ${framework} code export will be implemented`
  }, [state.elements])

  const selectedElement = state.selectedElements.size === 1 
    ? state.elements.get(Array.from(state.selectedElements)[0]) || null 
    : null

  const contextValue: CanvasContextType = {
    state,
    dispatch,
    selectedElement,
    addElement,
    updateElement,
    deleteElement,
    selectElement,
    duplicateElement,
    moveElement,
    undo,
    redo,
    exportToCode
  }

  return (
    <CanvasContext.Provider value={contextValue}>
      {children}
    </CanvasContext.Provider>
  )
}

/**
 * Canvas Hook for Component Access
 */
export const useCanvas = () => {
  const context = React.useContext(CanvasContext)
  if (!context) {
    throw new Error('useCanvas must be used within a CanvasProvider')
  }
  return context
}

/**
 * Sortable Canvas Element Component
 */
interface SortableElementProps {
  element: CanvasElement
  children: React.ReactNode
  onSelect: (id: string, multi: boolean) => void
  onHover: (id: string | null) => void
  isSelected: boolean
  isHovered: boolean
}

const SortableElement: React.FC<SortableElementProps> = ({
  element,
  children,
  onSelect,
  onHover,
  isSelected,
  isHovered
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: element.id,
    data: {
      type: 'canvas-element',
      element
    }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative' as const,
    cursor: isDragging ? 'grabbing' : 'grab'
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        canvas-element
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        ${isHovered ? 'ring-1 ring-gray-300' : ''}
        ${isDragging ? 'z-50' : ''}
      `}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(element.id, e.metaKey || e.ctrlKey)
      }}
      onMouseEnter={() => onHover(element.id)}
      onMouseLeave={() => onHover(null)}
    >
      {children}
      
      {/* Selection Indicators */}
      {isSelected && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Resize handles */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="absolute -top-1 right-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="absolute top-1/2 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="absolute top-1/2 -left-1 w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
      )}
    </div>
  )
}

/**
 * Main Canvas Component
 */
export const Canvas: React.FC<{
  className?: string
  renderElement: (element: CanvasElement) => React.ReactNode
}> = ({ className, renderElement }) => {
  const { state, dispatch } = useCanvas()
  const canvasRef = useRef<HTMLDivElement>(null)
  
  // Setup sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Drag handlers
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    dispatch({ type: 'SET_DRAG', payload: active.id as string })
  }

  const handleDragOver = (event: DragOverEvent) => {
    // Handle drag over logic for drop zones
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    dispatch({ type: 'SET_DRAG', payload: null })
    
    if (over && active.id !== over.id) {
      // Handle element reordering
      const activeElement = state.elements.get(active.id as string)
      const overElement = state.elements.get(over.id as string)
      
      if (activeElement && overElement) {
        // Implement move logic
      }
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        dispatch({ type: 'UNDO' })
      } else if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        dispatch({ type: 'REDO' })
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        state.selectedElements.forEach(id => {
          dispatch({ type: 'DELETE_ELEMENT', payload: id })
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [state.selectedElements, dispatch])

  // Render root elements (elements without parents)
  const rootElements = Array.from(state.elements.values()).filter(el => !el.parent)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div
        ref={canvasRef}
        className={`canvas-viewport ${className || ''}`}
        style={{
          transform: `scale(${state.viewport.zoom}) translate(${state.viewport.panX}px, ${state.viewport.panY}px)`,
          transformOrigin: 'top left',
          width: state.viewport.width,
          height: state.viewport.height,
          position: 'relative',
          overflow: 'hidden'
        }}
        onClick={() => dispatch({ type: 'SELECT_ELEMENT', payload: { id: null, multi: false } })}
      >
        <SortableContext
          items={rootElements.map(el => el.id)}
          strategy={verticalListSortingStrategy}
        >
          {rootElements.map(element => (
            <SortableElement
              key={element.id}
              element={element}
              isSelected={state.selectedElements.has(element.id)}
              isHovered={state.hoveredElement === element.id}
              onSelect={(id, multi) => dispatch({ type: 'SELECT_ELEMENT', payload: { id, multi } })}
              onHover={(id) => dispatch({ type: 'SET_HOVER', payload: id })}
            >
              {renderElement(element)}
            </SortableElement>
          ))}
        </SortableContext>
      </div>
      
      <DragOverlay>
        {state.draggedElement ? (
          <div className="opacity-80">
            {renderElement(state.elements.get(state.draggedElement)!)}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

/**
 * Canvas Toolbar Component
 */
export const CanvasToolbar: React.FC = () => {
  const { state, undo, redo, exportToCode } = useCanvas()
  
  return (
    <div className="canvas-toolbar flex items-center gap-2 p-2 bg-white border-b">
      <button
        onClick={undo}
        disabled={state.history.past.length === 0}
        className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
      >
        Undo
      </button>
      <button
        onClick={redo}
        disabled={state.history.future.length === 0}
        className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
      >
        Redo
      </button>
      <div className="flex-1"></div>
      <span className="text-sm text-gray-600">
        {state.elements.size} elements
      </span>
      <button
        onClick={() => console.log(exportToCode('react'))}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Export Code
      </button>
    </div>
  )
}

// Export types for external use
export type {
  CanvasElement,
  CanvasState,
  ComponentDefinition,
  PropertySchema,
  CanvasContextType
}