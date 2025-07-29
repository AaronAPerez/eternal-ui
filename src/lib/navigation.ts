import { 
  BookOpen, Package, Layers,Home, 
  Code, Palette,
  Zap,
  Shield,
  Bug,
  Grid
} from 'lucide-react'

export interface NavigationItem {
  id: string
  name: string
  path: string
  icon?: React.ComponentType<any>
  badge?: string
  status: 'stable' | 'beta' | 'alpha' | 'planned' | 'new' | 'updated'
  description?: string
  tags?: string[]
  category: string
  component?: React.ComponentType<any> // For dynamic content
}

export interface NavigationSection {
  id: string
  title: string
  icon: React.ComponentType<any>
  items: NavigationItem[]
  collapsed?: boolean
}

export const NAVIGATION_CONFIG: NavigationSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: BookOpen,
    items: [
      {
        id: 'introduction',
        name: 'Introduction',
        path: '/docs',
        icon: Home,
        status: 'stable',
        description: 'Welcome to our component library',
        tags: ['overview', 'welcome', 'getting-started'],
        category: 'getting-started'
      },
      {
        id: 'installation',
        name: 'Installation',
        path: '/docs/installation',
        icon: Package,
        status: 'stable',
        description: 'How to install and set up the library',
        tags: ['setup', 'npm', 'install', 'configuration'],
        category: 'getting-started'
      },
      {
        id: 'quick-start',
        name: 'Quick Start',
        path: '/docs/quick-start',
        status: 'stable',
        description: 'Get up and running in 5 minutes',
        tags: ['tutorial', 'guide', 'quick', 'start'],
        category: 'getting-started'
      },
      {
        id: 'theming',
        name: 'Theming',
        path: '/docs/theming',
        icon: Palette,
        status: 'stable',
        description: 'Customize colors and design tokens',
        tags: ['theme', 'colors', 'customization', 'css'],
        category: 'getting-started'
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        path: '/docs/typescript',
        icon: Code,
        status: 'stable',
        description: 'TypeScript support and type definitions',
        tags: ['typescript', 'types', 'definitions'],
        category: 'getting-started'
      }
    ]
  },
  {
    id: 'components',
    title: 'Components',
    icon: Layers,
    items: [
      {
        id: 'button',
        name: 'Button',
        path: '/docs/components/button',
        status: 'stable',
        badge: 'Updated',
        description: 'Interactive button with multiple variants',
        tags: ['interactive', 'form', 'action', 'click'],
        category: 'components'
      },
      {
        id: 'input',
        name: 'Input',
        path: '/docs/components/input',
        status: 'stable',
        description: 'Form input with validation and accessibility',
        tags: ['form', 'validation', 'text', 'input'],
        category: 'components'
      },
      {
        id: 'card',
        name: 'Card',
        path: '/docs/components/card',
        status: 'stable',
        badge: 'New',
        description: 'Flexible container with hover effects',
        tags: ['container', 'layout', 'content', 'card'],
        category: 'components'
      },
      // Add more components as you build them
      {
        id: 'modal',
        name: 'Modal',
        path: '/docs/components/modal',
        status: 'beta',
        badge: 'Beta',
        description: 'Overlay dialog with focus management',
        tags: ['overlay', 'dialog', 'popup', 'modal'],
        category: 'components'
      }
    ]
  },
    {
    id: 'tools',
    title: 'Free Tools',
    icon: Zap,
    items: [
      {
        id: 'favicon-generator',
        name: 'Favicon Generator',
        path: '/tools/favicon-generator',
        icon: Palette,
        status: 'stable',
        badge: 'Free',
        description: 'Generate professional favicons and PWA icons',
        tags: ['favicon', 'icons', 'PWA', 'free', 'generator'],
        category: 'tools'
      },
      
      // Add more tools here later
    ]
  },
   {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    icon: Bug,
    items: [
      {
        id: 'error-solutions',
        name: 'Fix Errors & Solutions',
        path: '/docs/troubleshooting',
        status: 'stable',
        badge: 'New',
        description: 'Searchable error solutions and debugging guide',
        tags: ['errors', 'debugging', 'troubleshooting', 'solutions'],
        category: 'troubleshooting'
      },
      {
        id: 'common-issues',
        name: 'Common Issues',
        path: '/docs/troubleshooting/common',
        status: 'stable',
        description: 'Frequently encountered problems and fixes',
        tags: ['faq', 'common', 'issues'],
        category: 'troubleshooting'
      },
      {
        id: 'debugging-guide',
        name: 'Debugging Guide',
        path: '/docs/troubleshooting/debugging',
        status: 'stable',
        description: 'Step-by-step debugging methodology',
        tags: ['debugging', 'methodology', 'tools'],
        category: 'troubleshooting'
      }
    ]
  },
  {
    id: 'resources',
    title: 'Resources',
    icon: Shield,
    items: [
      {
        id: 'best-practices',
        name: 'Best Practices',
        path: '/docs/best-practices',
        status: 'stable',
        description: 'Recommended patterns and practices',
        tags: ['best-practices', 'patterns', 'guidelines'],
        category: 'resources'
      },
      {
        id: 'accessibility',
        name: 'Accessibility Guide',
        path: '/docs/accessibility',
        status: 'stable',
        description: 'WCAG compliance and accessibility patterns',
        tags: ['accessibility', 'a11y', 'wcag'],
        category: 'resources'
      },
      {
        id: 'performance',
        name: 'Performance Tips',
        path: '/docs/performance',
        status: 'stable',
        description: 'Optimization techniques and monitoring',
        tags: ['performance', 'optimization', 'monitoring'],
        category: 'resources'
      }
    ]
  }
]

export const BUILDER_NAVIGATION = {
  title: 'Tools',
  icon: Grid,
  items: [
    { 
      name: 'Website Builder', 
      path: '/builder', 
      badge: 'New', 
      status: 'stable',
      description: 'Build professional websites with drag-and-drop'
    },
    { 
      name: 'Component Playground', 
      path: '/playground', 
      badge: null, 
      status: 'stable',
      description: 'Interactive component testing environment'
    }
  ]
}

// Utility functions
export function findNavigationItem(path: string): NavigationItem | null {
  for (const section of NAVIGATION_CONFIG) {
    for (const item of section.items) {
      if (item.path === path) {
        return item
      }
    }
  }
  return null
}

export function getAllNavigationItems(): NavigationItem[] {
  return NAVIGATION_CONFIG.flatMap(section => section.items)
}

export function getNavigationItemsByCategory(category: string): NavigationItem[] {
  return getAllNavigationItems().filter(item => item.category === category)
}