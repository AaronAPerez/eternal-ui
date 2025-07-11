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
  
  // Actions
  addElement: (element: Omit<BuilderElement, 'id'>) => void
  updateElement: (id: string, updates: Partial<BuilderElement>) => void
  deleteElement: (id: string) => void
  selectElement: (id: string | null) => void
  hoverElement: (id: string | null) => void
  setMode: (mode: 'design' | 'preview' | 'code') => void
  setZoom: (zoom: number) => void
  setDeviceMode: (mode: 'desktop' | 'tablet' | 'mobile') => void
  toggleGrid: () => void
  toggleLeftPanel: () => void
  toggleRightPanel: () => void
  setDraggedElement: (id: string | null) => void
}

export const useBuilderStore = create<BuilderState>()(
  devtools(
    (set) => ({
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
      
      // Element actions
      addElement: (elementData: Omit<BuilderElement, 'id'>) => {
        const element: BuilderElement = {
          ...elementData,
          id: uuidv4()
        }
        
        set((state) => ({
          elements: [...state.elements, element],
          selectedElementId: element.id
        }))
      },
      
      updateElement: (id: string, updates: Partial<BuilderElement>) => {
        set((state) => ({
          elements: state.elements.map(el => 
            el.id === id ? { ...el, ...updates } : el
          )
        }))
      },
      
      deleteElement: (id: string) => {
        set((state) => ({
          elements: state.elements.filter(el => el.id !== id),
          selectedElementId: state.selectedElementId === id ? null : state.selectedElementId
        }))
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
      
      setDraggedElement: (id: string | null) => {
        set({ draggedElementId: id })
      }
    }),
    { name: 'builder-store' }
  )
)