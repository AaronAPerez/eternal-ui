import { create } from 'zustand'

interface BuilderState {
  // UI State
  leftPanelOpen: boolean
  rightPanelOpen: boolean
  mode: 'visual' | 'advanced' | 'components'
  
  // Visual Builder State
  selectedElement: string | null
  canvasElements: any[]
  
  // Advanced Builder State
  selectedComponent: string | null
  canvasComponents: any[]
  selectedTemplate: string | null
  viewMode: 'desktop' | 'tablet' | 'mobile'
  showCode: boolean
  activeTab: 'components' | 'templates'
  
  // Components Page State
  selectedLibraryComponent: string
  componentCode: string
  showResetModal: boolean
  isFullscreen: boolean
  searchTerm: string
  
  // Actions
  setLeftPanelOpen: (open: boolean) => void
  setRightPanelOpen: (open: boolean) => void
  setMode: (mode: 'visual' | 'advanced' | 'components') => void
  setSelectedElement: (id: string | null) => void
  setSelectedComponent: (id: string | null) => void
  setCanvasComponents: (components: any[]) => void
  setSelectedTemplate: (id: string | null) => void
  setViewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void
  setShowCode: (show: boolean) => void
  setActiveTab: (tab: 'components' | 'templates') => void
  setSelectedLibraryComponent: (component: string) => void
  setComponentCode: (code: string) => void
  setShowResetModal: (show: boolean) => void
  setIsFullscreen: (fullscreen: boolean) => void
  setSearchTerm: (term: string) => void
}

export const useBuilderStore = create<BuilderState>((set) => ({
  // Initial State
  leftPanelOpen: true,
  rightPanelOpen: true,
  mode: 'visual',
  selectedElement: null,
  canvasElements: [],
  selectedComponent: null,
  canvasComponents: [],
  selectedTemplate: null,
  viewMode: 'desktop',
  showCode: false,
  activeTab: 'components',
  selectedLibraryComponent: 'button',
  componentCode: '',
  showResetModal: false,
  isFullscreen: false,
  searchTerm: '',
  
  // Actions
  setLeftPanelOpen: (open) => set({ leftPanelOpen: open }),
  setRightPanelOpen: (open) => set({ rightPanelOpen: open }),
  setMode: (mode) => set({ mode }),
  setSelectedElement: (id) => set({ selectedElement: id }),
  setSelectedComponent: (id) => set({ selectedComponent: id }),
  setCanvasComponents: (components) => set({ canvasComponents: components }),
  setSelectedTemplate: (id) => set({ selectedTemplate: id }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setShowCode: (show) => set({ showCode: show }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedLibraryComponent: (component) => set({ selectedLibraryComponent: component }),
  setComponentCode: (code) => set({ componentCode: code }),
  setShowResetModal: (show) => set({ showResetModal: show }),
  setIsFullscreen: (fullscreen) => set({ isFullscreen: fullscreen }),
  setSearchTerm: (term) => set({ searchTerm: term }),
}))