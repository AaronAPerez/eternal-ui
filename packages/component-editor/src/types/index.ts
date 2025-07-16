export interface ComponentData {
  id: string
  name: string
  description: string
  category: ComponentCategory
  code: string
  previewImage?: string
  metadata: ComponentMetadata
  tags: string[]
  complexity: 'beginner' | 'intermediate' | 'advanced'
  isPremium: boolean
  popularity: number
  createdAt: Date
  updatedAt: Date
}

export type ComponentCategory = 
  | 'layout' | 'navigation' | 'content' | 'forms' 
  | 'data' | 'commerce' | 'social' | 'marketing' 
  | 'interactive' | 'feedback'

export interface ComponentMetadata {
  framework: 'react' | 'vue' | 'angular' | 'svelte'
  dependencies: string[]
  props: Record<string, any>
  variants: ComponentVariant[]
  accessibility: AccessibilityFeatures
  performance: PerformanceInfo
}

export interface ComponentVariant {
  name: string
  props: Record<string, any>
  description: string
}

export interface AccessibilityFeatures {
  screenReaderSupport: boolean
  keyboardNavigation: boolean
  colorContrast: 'AA' | 'AAA'
  ariaLabels: boolean
}

export interface PerformanceInfo {
  bundleSize: number
  renderTime: number
  memoryUsage: number
}
