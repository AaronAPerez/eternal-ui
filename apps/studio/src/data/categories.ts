export interface ComponentCategory {
  toLowerCase: any
  id: string
  name: string
  description: string
  icon: string
  color: string
  subcategories: string[]
  count: number
}

export const componentCategories: ComponentCategory[] = [
  {
    id: 'layout',
    name: 'Layout & Structure',
    description: 'Fundamental layout components for page structure',
    icon: '🏗️',
    color: '#6366F1',
    subcategories: ['sections', 'containers', 'grids', 'headers', 'footers'],
    count: 12,
    toLowerCase: undefined
  },
  {
    id: 'navigation',
    name: 'Navigation',
    description: 'Navigation components for user movement',
    icon: '🧭',
    color: '#8B5CF6',
    subcategories: ['headers', 'menus', 'breadcrumbs', 'pagination'],
    count: 8,
    toLowerCase: undefined
  },
  {
    id: 'content',
    name: 'Content Display',
    description: 'Components for displaying various types of content',
    icon: '📄',
    color: '#10B981',
    subcategories: ['text', 'images', 'media', 'galleries'],
    count: 15,
    toLowerCase: undefined
  },
  {
    id: 'forms',
    name: 'Forms & Input',
    description: 'Form components and input controls',
    icon: '📝',
    color: '#F59E0B',
    subcategories: ['inputs', 'forms', 'validation', 'submission'],
    count: 18,
    toLowerCase: undefined
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Marketing and conversion-focused components',
    icon: '📈',
    color: '#EF4444',
    subcategories: ['cta', 'pricing', 'testimonials', 'features'],
    count: 10,
    toLowerCase: undefined
  }
]