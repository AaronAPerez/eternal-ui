import type { BuilderElement } from '@/types/builder'

export interface ComponentDefinition {
  type: string
  name: string
  category: 'layout' | 'ui' | 'data' | 'feedback'
  defaultProps: Record<string, any>
  icon: string
  description: string
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
    description: 'A clickable button component'
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
    description: 'Text input field'
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
    description: 'A responsive container for content'
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
    description: 'A flexible grid layout system'
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
    description: 'A card component with header, content, and footer'
  }
]

export function getComponentByType(type: string): ComponentDefinition | undefined {
  return componentRegistry.find(comp => comp.type === type)
}

export function getComponentsByCategory(category: string): ComponentDefinition[] {
  return componentRegistry.filter(comp => comp.category === category)
}

export function createElementFromComponent(type: string): Omit<BuilderElement, 'id'> {
  const componentDef = getComponentByType(type)
  
  if (!componentDef) {
    throw new Error(`Component type "${type}" not found`)
  }
  
  return {
    type,
    props: { ...componentDef.defaultProps },
    children: [],
    position: { x: 0, y: 0 }
  }
}