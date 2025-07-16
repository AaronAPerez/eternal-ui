
// =================================================================
// TYPES & export INTERFACES
// =================================================================

export interface ComponentData {
  id: string
  name: string
  description: string
  category: string
  code: string
  previewImage?: string
  metadata: {
    framework: 'react' | 'vue' | 'angular' | 'svelte'
    dependencies: string[]
    props: Record<string, any>
    complexity: 'beginner' | 'intermediate' | 'advanced'
  }
}

export interface EditComponentProps {
  component: ComponentData
  isOpen: boolean
  onClose: () => void
  onSave: (updatedComponent: ComponentData) => void
  onGeneratePreview: (componentId: string) => Promise<string>
}

export interface PreviewGeneratorProps {
  componentCode: string
  framework: string
  onImageGenerated: (imageUrl: string) => void
}