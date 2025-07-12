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
  // Add container-specific properties
  acceptsChildren?: boolean
  maxChildren?: number
}

export interface DragData {
  type: 'existing-component' | 'new-component'
  componentType?: string
  elementId?: string
  isContainer?: boolean
}

export interface DropZone {
  id: string
  type: 'canvas' | 'container' | 'between'
  position?: 'before' | 'after' | 'inside'
  parentId?: string
  index?: number
}