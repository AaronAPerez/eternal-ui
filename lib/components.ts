import { 
  Layout, Settings, Edit, Image, Type, Grid, Navigation, 
  ShoppingCart, BarChart, Bell, Star, Download 
} from 'lucide-react'

export interface ComponentDefinition {
  id: string
  name: string
  description: string
  category: string
  icon: unknown
  tags: string[]
  complexity: 'basic' | 'intermediate' | 'advanced'
  popularity: number
  isPremium: boolean
  defaultProps: Record<string, unknown>
  defaultStyle: Record<string, unknown>
  propSchema: Record<string, unknown>
  accessibility: {
    wcagLevel: 'A' | 'AA' | 'AAA'
    screenReader: boolean
    keyboardNav: boolean
  }
  performance: {
    bundleSize: number
    renderScore: number
    memoryImpact: 'low' | 'medium' | 'high'
  }
  frameworks: string[]
  features: string[]
  previewComponent: React.ComponentType<unknown>
}

// Import all your component definitions here
export const COMPONENT_LIBRARY: ComponentDefinition[] = [
  // Copy the component definitions from the artifact
]