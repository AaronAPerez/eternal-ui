// src/types/component.ts
/**
 * 🧬 COMPONENT TYPE DEFINITIONS
 * 
 * Fixed: Proper TypeScript interfaces for all components
 */
import { ReactNode } from 'react'

export interface BaseComponentProps {
  className?: string
  children?: ReactNode
  'data-testid'?: string
  id?: string
}

export interface AccessibilityProps {
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-labelledby'?: string
  // 'aria-disabled'?: boolean
  // 'aria-expanded'?: boolean
  'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
  'aria-valuenow'?: number
  'aria-valuemin'?: number
  'aria-valuemax'?: number
  'aria-valuetext'?: string
}

export interface AnimationProps {
  animated?: boolean
  duration?: number
  delay?: number
}

export interface VisualProps {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  disabled?: boolean
  glow?: boolean
  floating?: boolean
  glass?: boolean
}

export type ComponentState = 'idle' | 'loading' | 'success' | 'error' | 'disabled'
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ComponentVariant = 
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'ghost'
  | 'link'

  // src/types/component.ts
export interface ComponentDefinition {
  // Component metadata
  id: string
  name: string
  description: string
  category: ComponentCategory
  tags: string[]
  
  // Visual information
  icon: React.ComponentType<{ className?: string }>
  preview: string // Preview image URL
  thumbnail: string // Thumbnail for component library
  
  // Technical specifications
  props: PropDefinition[]
  defaultProps: Record<string, any>
  styleOptions: StyleDefinition[]
  
  // Code generation
  generateCode: (props: any, framework: 'react' | 'vue' | 'html') => string
  
  // Builder integration
  builderConfig: BuilderConfig
  
  // Documentation
  examples: ComponentExample[]
  documentation: ComponentDocumentation
  
  // Rendering
  component: React.ComponentType<any>
}

export interface PropDefinition {
  name: string
  type: PropType
  label: string
  description?: string
  required?: boolean
  default?: any
  
  // UI generation for property panel
  control: ControlType
  controlConfig?: ControlConfig
  
  // Validation
  validation?: ValidationRule[]
  
  // Conditional display
  showWhen?: (props: Record<string, any>) => boolean
}

export type PropType = 
  | 'string' 
  | 'number' 
  | 'boolean' 
  | 'color' 
  | 'image' 
  | 'icon'
  | 'array'
  | 'object'
  | 'enum'

export type ControlType = 
  | 'input'
  | 'textarea' 
  | 'select'
  | 'checkbox'
  | 'slider'
  | 'colorPicker'
  | 'imagePicker'
  | 'iconPicker'
  | 'codeEditor'

export interface ComponentExample {
  id: string
  title: string
  description: string
  code: string
  props: Record<string, any>
  preview?: boolean
  featured?: boolean
}

// src/lib/componentRegistry.ts
class ComponentRegistry {
  private components = new Map<string, ComponentDefinition>()
  private categories = new Map<string, ComponentDefinition[]>()

  register(definition: ComponentDefinition): void {
    // Validate component definition
    this.validateDefinition(definition)
    
    // Register component
    this.components.set(definition.id, definition)
    
    // Add to category
    if (!this.categories.has(definition.category)) {
      this.categories.set(definition.category, [])
    }
    this.categories.get(definition.category)!.push(definition)
    
    // Generate TypeScript definitions
    this.generateTypeDefinitions(definition)
  }

  getComponent(id: string): ComponentDefinition | undefined {
    return this.components.get(id)
  }

  getByCategory(category: string): ComponentDefinition[] {
    return this.categories.get(category) || []
  }

  getAllComponents(): ComponentDefinition[] {
    return Array.from(this.components.values())
  }

  search(query: string, filters?: SearchFilters): ComponentDefinition[] {
    const searchTerm = query.toLowerCase()
    return this.getAllComponents().filter(component => {
      const matchesQuery = 
        component.name.toLowerCase().includes(searchTerm) ||
        component.description.toLowerCase().includes(searchTerm) ||
        component.tags.some(tag => tag.toLowerCase().includes(searchTerm))

      if (!matchesQuery) return false

      // Apply filters
      if (filters?.category && component.category !== filters.category) {
        return false
      }
      
      if (filters?.tags && !filters.tags.some(tag => component.tags.includes(tag))) {
        return false
      }

      return true
    })
  }

  private validateDefinition(definition: ComponentDefinition): void {
    if (!definition.id) throw new Error('Component must have an id')
    if (!definition.name) throw new Error('Component must have a name')
    if (!definition.component) throw new Error('Component must have a React component')
    
    // Validate props
    definition.props.forEach(prop => {
      if (!prop.name) throw new Error('Prop must have a name')
      if (!prop.type) throw new Error('Prop must have a type')
    })
  }

  private generateTypeDefinitions(definition: ComponentDefinition): void {
    // Generate TypeScript interface for component props
    const interfaceName = `${definition.name}Props`
    const props = definition.props.map(prop => {
      const optional = prop.required ? '' : '?'
      return `  ${prop.name}${optional}: ${this.getTypeScriptType(prop.type)}`
    }).join('\n')

    const tsDefinition = `
export interface ${interfaceName} {
${props}
}

export declare const ${definition.name}: React.FC<${interfaceName}>
    `
    
    // Save to types file or emit to build process
    this.emitTypeDefinition(definition.id, tsDefinition)
  }

  private getTypeScriptType(propType: PropType): string {
    const typeMap: Record<PropType, string> = {
      string: 'string',
      number: 'number',
      boolean: 'boolean',
      color: 'string',
      image: 'string',
      icon: 'React.ComponentType | string',
      array: 'any[]',
      object: 'Record<string, any>',
      enum: 'string'
    }
    return typeMap[propType] || 'any'
  }

  private emitTypeDefinition(componentId: string, definition: string): void {
    // Implementation would write to file system or emit to build process
    console.log(`Generated types for ${componentId}:`, definition)
  }
}

export const componentRegistry = new ComponentRegistry()