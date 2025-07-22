import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface CanvasElement {
  id: string
  type: string
  name: string
  component: string
  props: Record<string, unknown>
  style: Record<string, unknown>
  children: string[]
  parent?: string
  locked: boolean
  visible: boolean
  metadata: {
    createdAt: string
    updatedAt: string
    version: number
  }
}

interface BuilderState {
  elements: Map<string, CanvasElement>
  selectedElements: Set<string>
  viewport: {
    zoom: number
    panX: number
    panY: number
  }
  device: 'desktop' | 'tablet' | 'mobile'
  mode: 'select' | 'preview'
  
  // Actions
  addElement: (element: Omit<CanvasElement, 'id' | 'metadata'>) => string
  updateElement: (id: string, updates: Partial<CanvasElement>) => void
  deleteElement: (id: string) => void
  selectElement: (id: string, multi?: boolean) => void
  clearSelection: () => void
  setDevice: (device: BuilderState['device']) => void
  setMode: (mode: BuilderState['mode']) => void
}

export const useBuilderStore = create<BuilderState>()(
  devtools(
    (set, get) => ({
      elements: new Map(),
      selectedElements: new Set(),
      viewport: { zoom: 1, panX: 0, panY: 0 },
      device: 'desktop',
      mode: 'select',

      addElement: (element) => {
        const id = `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        const newElement: CanvasElement = {
          ...element,
          id,
          metadata: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            version: 1
          }
        }

        set((state) => ({
          elements: new Map(state.elements).set(id, newElement),
          selectedElements: new Set([id])
        }))

        return id
      },

      updateElement: (id, updates) => {
        set((state) => {
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

          return { elements: newElements }
        })
      },

      deleteElement: (id) => {
        set((state) => {
          const newElements = new Map(state.elements)
          newElements.delete(id)
          
          const newSelected = new Set(state.selectedElements)
          newSelected.delete(id)

          return {
            elements: newElements,
            selectedElements: newSelected
          }
        })
      },

      selectElement: (id, multi = false) => {
        set((state) => ({
          selectedElements: multi 
            ? new Set([...state.selectedElements, id])
            : new Set([id])
        }))
      },

      clearSelection: () => {
        set({ selectedElements: new Set() })
      },

      setDevice: (device) => set({ device }),
      setMode: (mode) => set({ mode })
    }),
    { name: 'builder-store' }
  )
)