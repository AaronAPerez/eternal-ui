import { create } from 'zustand'

interface BuilderState {
  // UI State
  leftPanelOpen: boolean
  rightPanelOpen: boolean
  mode: 'visual' | 'advanced' | 'components' | 'grid' // Add grid mode
  
  // Theme state
  theme: 'light' | 'dark' | 'system'
  
  // Grid state
  gridConfig: {
    enabled: boolean
    visible: boolean
    columns: number
    rows: number
    gap: number
    cellSize: number
    color: string
    opacity: number
    snapEnabled: boolean
    snapThreshold: number
    showLabels: boolean
    showGuides: boolean
    magneticSnap: boolean
    type: string
  }
  
  // Actions
  setLeftPanelOpen: (open: boolean) => void
  setRightPanelOpen: (open: boolean) => void
  setMode: (mode: 'visual' | 'advanced' | 'components' | 'grid') => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  updateGridConfig: (updates: Partial<typeof initialGridConfig>) => void
}

const initialGridConfig = {
  enabled: true,
  visible: true,
  columns: 12,
  rows: 8,
  gap: 16,
  cellSize: 40,
  color: '#3b82f6',
  opacity: 0.3,
  snapEnabled: true,
  snapThreshold: 10,
  showLabels: true,
  showGuides: true,
  magneticSnap: true,
  type: 'standard'
}

export const useBuilderStore = create<BuilderState>((set) => ({
  // Initial State
  leftPanelOpen: true,
  rightPanelOpen: true,
  mode: 'visual',
  theme: 'system',
  gridConfig: initialGridConfig,
  
  // Actions
  setLeftPanelOpen: (open) => set({ leftPanelOpen: open }),
  setRightPanelOpen: (open) => set({ rightPanelOpen: open }),
  setMode: (mode) => set({ mode }),
  setTheme: (theme) => set({ theme }),
  updateGridConfig: (updates) => set((state) => ({
    gridConfig: { ...state.gridConfig, ...updates }
  })),
}))