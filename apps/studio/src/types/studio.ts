export interface ComponentDefinition {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  props: Record<string, any>
  defaultContent: string
}

export interface ComponentCategory {
  name: string
  icon: React.ComponentType<{ className?: string }>
  components: ComponentDefinition[]
}

export interface Template {
  name: string
  preview: string
  description: string
  components: TemplateComponent[]
}

export interface TemplateComponent {
  id: string
  type: string
  props: Record<string, any>
  content: string
}

export interface LibraryComponent {
  name: string
  category: string
  description: string
  defaultCode: string
  preview: () => React.ReactNode
}

export type BuilderMode = 'visual' | 'advanced' | 'components'
export type ViewMode = 'desktop' | 'tablet' | 'mobile'
export type ActiveTab = 'components' | 'templates'