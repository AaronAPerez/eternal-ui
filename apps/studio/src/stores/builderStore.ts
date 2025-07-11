import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import type { BuilderElement } from '@/types/builder'

interface BuilderState {
  elements: BuilderElement[]
  selectedElementId: string | null
  hoveredElementId: string | null
  draggedElementId: string | null
  mode: 'design' | 'preview' | 'code'
  showGrid: boolean
  zoom: number
  deviceMode: 'desktop' | 'tablet' | 'mobile'
  leftPanelOpen: boolean
  rightPanelOpen: boolean
  history: BuilderElement[][]
  historyIndex: number
  
  // Actions
  addElement: (element: Omit<BuilderElement, 'id'>, parentId?: string) => void
  updateElement: (id: string, updates: Partial<BuilderElement>) => void
  deleteElement: (id: string) => void
  duplicateElement: (id: string) => void
  selectElement: (id: string | null) => void
  hoverElement: (id: string | null) => void
  setMode: (mode: 'design' | 'preview' | 'code') => void
  setZoom: (zoom: number) => void
  setDeviceMode: (mode: 'desktop' | 'tablet' | 'mobile') => void
  toggleGrid: () => void
  toggleLeftPanel: () => void
  toggleRightPanel: () => void
  setDraggedElement: (id: string | null) => void
  moveElement: (draggedId: string, targetId: string, position: 'before' | 'after' | 'inside') => void
  
  // History
  saveToHistory: () => void
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean
}

export const useBuilderStore = create<BuilderState>()(
  devtools(
    (set, get) => ({
      // Initial state
      elements: [],
      selectedElementId: null,
      hoveredElementId: null,
      draggedElementId: null,
      mode: 'design',
      showGrid: true,
      zoom: 100,
      deviceMode: 'desktop',
      leftPanelOpen: true,
      rightPanelOpen: true,
      history: [[]],
      historyIndex: 0,
      
      // Element actions
      addElement: (elementData: Omit<BuilderElement, 'id'>, parentId?: string) => {
        const element: BuilderElement = {
          ...elementData,
          id: uuidv4(),
          parent: parentId
        }
        
        set((state) => ({
          elements: [...state.elements, element],
          selectedElementId: element.id
        }))
        
        get().saveToHistory()
      },
      
      updateElement: (id: string, updates: Partial<BuilderElement>) => {
        set((state) => ({
          elements: state.elements.map(el => 
            el.id === id ? { ...el, ...updates } : el
          )
        }))
        get().saveToHistory()
      },
      
      deleteElement: (id: string) => {
        set((state) => {
          // Also delete all children
          const toDelete = new Set([id])
          const findChildren = (parentId: string) => {
            state.elements.forEach(el => {
              if (el.parent === parentId) {
                toDelete.add(el.id)
                findChildren(el.id)
              }
            })
          }
          findChildren(id)
          
          return {
            elements: state.elements.filter(el => !toDelete.has(el.id)),
            selectedElementId: state.selectedElementId === id ? null : state.selectedElementId
          }
        })
        get().saveToHistory()
      },
      
      duplicateElement: (id: string) => {
        const state = get()
        const element = state.elements.find(el => el.id === id)
        if (!element) return
        
        const newElement: BuilderElement = {
          ...element,
          id: uuidv4(),
          position: {
            x: element.position.x + 10,
            y: element.position.y + 10
          }
        }
        
        set((state) => ({
          elements: [...state.elements, newElement],
          selectedElementId: newElement.id
        }))
        get().saveToHistory()
      },
      
      selectElement: (id: string | null) => {
        set({ selectedElementId: id })
      },
      
      hoverElement: (id: string | null) => {
        set({ hoveredElementId: id })
      },
      
      // UI actions
      setMode: (mode: 'design' | 'preview' | 'code') => {
        set({ mode })
      },
      
      setZoom: (zoom: number) => {
        set({ zoom })
      },
      
      setDeviceMode: (deviceMode: 'desktop' | 'tablet' | 'mobile') => {
        set({ deviceMode })
      },
      
      toggleGrid: () => {
        set((state) => ({ showGrid: !state.showGrid }))
      },
      
      toggleLeftPanel: () => {
        set((state) => ({ leftPanelOpen: !state.leftPanelOpen }))
      },
      
      toggleRightPanel: () => {
        set((state) => ({ rightPanelOpen: !state.rightPanelOpen }))
      },
      
      // Drag and drop
      setDraggedElement: (id: string | null) => {
        set({ draggedElementId: id })
      },
      
      moveElement: (draggedId: string, targetId: string, position: 'before' | 'after' | 'inside') => {
        set((state) => {
          const elements = [...state.elements]
          const draggedIndex = elements.findIndex(el => el.id === draggedId)
          const targetIndex = elements.findIndex(el => el.id === targetId)
          
          if (draggedIndex === -1 || targetIndex === -1) return state
          
          const draggedElement = elements[draggedIndex]
          elements.splice(draggedIndex, 1)
          
          let insertIndex = targetIndex
          if (draggedIndex < targetIndex) insertIndex--
          
          if (position === 'after') insertIndex++
          
          if (position === 'inside') {
            // Add as child
            draggedElement.parent = targetId
          } else {
            // Add as sibling
            const targetElement = elements.find(el => el.id === targetId)
            draggedElement.parent = targetElement?.parent
          }
          
          elements.splice(insertIndex, 0, draggedElement)
          
          return { elements }
        })
        get().saveToHistory()
      },
      
      // History management
      saveToHistory: () => {
        set((state) => {
          const newHistory = state.history.slice(0, state.historyIndex + 1)
          newHistory.push([...state.elements])
          
          // Keep only last 50 states
          if (newHistory.length > 50) {
            newHistory.shift()
          } else {
            return {
              history: newHistory,
              historyIndex: newHistory.length - 1
            }
          }
          
          return {
            history: newHistory,
            historyIndex: newHistory.length - 1
          }
        })
      },
      
      undo: () => {
        const state = get()
        if (state.historyIndex > 0) {
          const newIndex = state.historyIndex - 1
          set({
            elements: [...state.history[newIndex]],
            historyIndex: newIndex,
            selectedElementId: null
          })
        }
      },
      
      redo: () => {
        const state = get()
        if (state.historyIndex < state.history.length - 1) {
          const newIndex = state.historyIndex + 1
          set({
            elements: [...state.history[newIndex]],
            historyIndex: newIndex,
            selectedElementId: null
          })
        }
      },
      
      canUndo: () => {
        const state = get()
        return state.historyIndex > 0
      },
      
      canRedo: () => {
        const state = get()
        return state.historyIndex < state.history.length - 1
      }
    }),
    { name: 'builder-store' }
  )
)