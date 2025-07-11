export interface BuilderElement {
  id: string
  type: string
  props: Record<string, any>
  children: BuilderElement[]
  parent?: string
  position: {
    x: number
    y: number
  }
  style?: Record<string, any>
}

export interface BuilderState {
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
}