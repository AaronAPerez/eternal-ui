import type { BuilderElement } from '@/types/builder'

export interface ComponentDefinition {
  type: string
  name: string
  category: 'layout' | 'ui' | 'data' | 'feedback'
  defaultProps: Record<string, any>
  icon: string
  description: string
  acceptsChildren?: boolean
  maxChildren?: number
  childrenTypes?: string[] // What types of children it accepts
}

export const componentRegistry: ComponentDefinition[] = [
  {
    type: 'button',
    name: 'Button',
    category: 'ui',
    defaultProps: {
      children: 'Click me',
      variant: 'default',
      size: 'default'
    },
    icon: '🔘',
    description: 'A clickable button component',
    acceptsChildren: false
  },
  
  {
    type: 'input',
    name: 'Input',
    category: 'ui',
    defaultProps: {
      placeholder: 'Enter text...',
      variant: 'default',
      inputSize: 'default'
    },
    icon: '📝',
    description: 'Text input field',
    acceptsChildren: false
  },
  
  {
    type: 'container',
    name: 'Container',
    category: 'layout',
    defaultProps: {
      size: 'lg',
      padding: 'md'
    },
    icon: '📦',
    description: 'A responsive container for content',
    acceptsChildren: true,
    maxChildren: 10,
    childrenTypes: ['button', 'input', 'card', 'grid'] // Can accept most components
  },
  
  {
    type: 'grid',
    name: 'Grid',
    category: 'layout',
    defaultProps: {
      cols: 3,
      gap: 4,
      responsive: false
    },
    icon: '🔲',
    description: 'A flexible grid layout system',
    acceptsChildren: true,
    maxChildren: 12,
    childrenTypes: ['button', 'input', 'card', 'container'] // Grid items
  },
  
  {
    type: 'card',
    name: 'Card',
    category: 'ui',
    defaultProps: {
      variant: 'default',
      padding: 'md',
      hover: false
    },
    icon: '🃏',
    description: 'A card component with header, content, and footer',
    acceptsChildren: true,
    maxChildren: 5,
    childrenTypes: ['button', 'input'] // Cards can have buttons and inputs
  }
]

export function getComponentByType(type: string): ComponentDefinition | undefined {
  return componentRegistry.find(comp => comp.type === type)
}

export function getComponentsByCategory(category: string): ComponentDefinition[] {
  return componentRegistry.filter(comp => comp.category === category)
}

export function createElementFromComponent(type: string, parentId?: string): Omit<BuilderElement, 'id'> {
  const componentDef = getComponentByType(type)
  
  if (!componentDef) {
    throw new Error(`Component type "${type}" not found`)
  }
  
  return {
    type,
    props: { ...componentDef.defaultProps },
    children: [],
    position: { x: 0, y: 0 },
    parent: parentId,
    acceptsChildren: componentDef.acceptsChildren,
    maxChildren: componentDef.maxChildren
  }
}

export function canAcceptChild(parentType: string, childType: string): boolean {
  const parentDef = getComponentByType(parentType)
  if (!parentDef || !parentDef.acceptsChildren) return false
  
  if (!parentDef.childrenTypes) return true // Accept all if not specified
  
  return parentDef.childrenTypes.includes(childType)
}