import { ComponentData, ComponentCategory } from '../types'

// Sample data for testing
const sampleComponents: ComponentData[] = [
  {
    id: 'hero-section',
    name: 'Hero Section',
    description: 'A beautiful hero section with gradient background and call-to-action buttons',
    category: 'layout',
    code: `const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Build Amazing Websites
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Create stunning, responsive designs with our visual builder
        </p>
        <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  )
}`,
    tags: ['hero', 'header', 'gradient'],
    complexity: 'beginner',
    isPremium: false,
    popularity: 95,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    metadata: {
      framework: 'react',
      dependencies: [],
      props: {},
      variants: [],
      accessibility: {
        screenReaderSupport: true,
        keyboardNavigation: true,
        colorContrast: 'AA',
        ariaLabels: true
      },
      performance: {
        bundleSize: 1.2,
        renderTime: 10,
        memoryUsage: 0.8
      }
    }
  },
  {
    id: 'feature-card',
    name: 'Feature Card',
    description: 'A clean feature card with icon, title, and description',
    category: 'content',
    code: `const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}`,
    tags: ['card', 'feature', 'icon'],
    complexity: 'beginner',
    isPremium: false,
    popularity: 88,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
    metadata: {
      framework: 'react',
      dependencies: [],
      props: {},
      variants: [],
      accessibility: {
        screenReaderSupport: true,
        keyboardNavigation: true,
        colorContrast: 'AA',
        ariaLabels: true
      },
      performance: {
        bundleSize: 1.0,
        renderTime: 8,
        memoryUsage: 0.6
      }
    }
  }
]

export class ComponentDataManager {
  private static components: ComponentData[] = [...sampleComponents]

  static getAllComponents(): ComponentData[] {
    return this.components
  }

  static getComponentById(id: string): ComponentData | undefined {
    return this.components.find(comp => comp.id === id)
  }

  static updateComponent(id: string, updates: Partial<ComponentData>): void {
  const index = this.components.findIndex(comp => comp.id === id)
  if (index !== -1) {
    this.components[index] = { 
      ...this.components[index], 
      ...updates,
      id: this.components[index].id, // Ensure id is preserved
      updatedAt: new Date()
    }
  }
}

  static addComponent(component: ComponentData): void {
    this.components.push(component)
  }

  static deleteComponent(id: string): void {
    this.components = this.components.filter(comp => comp.id !== id)
  }

  static searchComponents(query: string): ComponentData[] {
    const lowercaseQuery = query.toLowerCase()
    return this.components.filter(comp =>
      comp.name.toLowerCase().includes(lowercaseQuery) ||
      comp.description.toLowerCase().includes(lowercaseQuery) ||
      comp.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }

  static getComponentsByCategory(category: ComponentCategory): ComponentData[] {
    return this.components.filter(comp => comp.category === category)
  }
}