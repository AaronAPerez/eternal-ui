'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react'

// Enhanced TypeScript interfaces
interface ComponentMeta {
  id: string
  name: string
  description: string
  category: 'layout' | 'navigation' | 'content' | 'forms' | 'data' | 'interactive' | 'ecommerce' | 'marketing' | 'social' | 'media'
  tags: string[]
  complexity: 'beginner' | 'intermediate' | 'advanced'
  popularity: number
  isPremium: boolean
  propsSchema: Record<string, PropSchema>
  defaultProps: Record<string, any>
  codeExample: string
  bundleSize: number
  renderScore: number
  wcagLevel: 'A' | 'AA' | 'AAA'
  rating: number
  downloadCount: number
  lastUpdated: string
  component: React.ComponentType<any>
}

interface PropSchema {
  type: 'string' | 'number' | 'boolean' | 'color' | 'select' | 'slider' | 'textarea'
  label: string
  description?: string
  default?: any
  options?: Array<{ label: string; value: any }>
  min?: number
  max?: number
}

// =================================================================
// REAL WORLD COMPONENTS COLLECTION
// =================================================================

// 1. Feature Grid Component
const FeatureGrid: React.FC<{
  title: string
  subtitle: string
  features: number
  layout: 'grid-2' | 'grid-3' | 'grid-4'
  style: 'cards' | 'minimal' | 'icons'
  accentColor: string
}> = ({ title, subtitle, features, layout, style, accentColor }) => {
  const featureData = [
    { icon: '🚀', title: 'Fast Performance', description: 'Lightning-fast load times and optimized performance' },
    { icon: '🔒', title: 'Secure by Default', description: 'Enterprise-grade security built into every component' },
    { icon: '📱', title: 'Mobile First', description: 'Responsive design that works perfectly on all devices' },
    { icon: '🎨', title: 'Customizable', description: 'Easily customize colors, fonts, and layouts to match your brand' },
    { icon: '⚡', title: 'Easy Integration', description: 'Drop-in components that work with any React application' },
    { icon: '📊', title: 'Analytics Ready', description: 'Built-in analytics and tracking capabilities' },
    { icon: '🌐', title: 'Global CDN', description: 'Worldwide content delivery for optimal performance' },
    { icon: '🛠️', title: 'Developer Tools', description: 'Comprehensive debugging and development tools' }
  ].slice(0, features)

  const gridClasses = {
    'grid-2': 'grid-cols-1 md:grid-cols-2',
    'grid-3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    'grid-4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className="py-16 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Features Grid */}
        <div className={`grid ${gridClasses[layout]} gap-8`}>
          {featureData.map((feature, index) => (
            <div
              key={index}
              className={`group ${
                style === 'cards' 
                  ? 'bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow'
                  : style === 'minimal'
                  ? 'text-center'
                  : 'bg-white p-6 rounded-lg border hover:border-gray-300 transition-colors'
              }`}
            >
              {style === 'icons' && (
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto"
                  style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                >
                  <span className="text-2xl">{feature.icon}</span>
                </div>
              )}
              
              <div className={style === 'minimal' ? 'text-center' : ''}>
                {style !== 'icons' && (
                  <span className="text-3xl mb-4 block">{feature.icon}</span>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 2. Testimonial Carousel
const TestimonialCarousel: React.FC<{
  autoPlay: boolean
  showAvatars: boolean
  style: 'cards' | 'centered' | 'grid'
  accentColor: string
}> = ({ autoPlay, showAvatars, style, accentColor }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechCorp',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      content: 'This component library has transformed our development process. We can build beautiful interfaces in minutes instead of hours.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Lead Developer, StartupXYZ',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: 'The live editing feature is game-changing. Our designers can now iterate on components without touching code.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Product Manager, Enterprise Co',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      content: 'Outstanding quality and performance. These components helped us launch our product 3 months ahead of schedule.',
      rating: 5
    }
  ]

  useEffect(() => {
    if (!autoPlay) return
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [autoPlay, testimonials.length])

  if (style === 'grid') {
    return (
      <div className="py-16 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                {showAvatars && (
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="py-16 px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">What Our Users Say</h2>
        
        <div className={`${style === 'cards' ? 'bg-white p-8 rounded-lg shadow-lg' : ''}`}>
          <div className="flex justify-center mb-6">
            {Array.from({ length: 5 }, (_, i) => (
              <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          
          <blockquote className="text-xl md:text-2xl text-gray-600 italic mb-8">
            "{currentTestimonial.content}"
          </blockquote>
          
          {showAvatars && (
            <div className="flex items-center justify-center">
              <img
                src={currentTestimonial.avatar}
                alt={currentTestimonial.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">{currentTestimonial.name}</h4>
                <p className="text-gray-500">{currentTestimonial.role}</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
              }`}
              style={{ backgroundColor: index === currentIndex ? accentColor : undefined }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// 3. CTA Section
const CTASection: React.FC<{
  title: string
  subtitle: string
  primaryButton: string
  secondaryButton: string
  layout: 'centered' | 'split' | 'banner'
  backgroundColor: string
  showImage: boolean
}> = ({ title, subtitle, primaryButton, secondaryButton, layout, backgroundColor, showImage }) => {
  if (layout === 'banner') {
    return (
      <div 
        className="py-16 px-8 text-center text-white"
        style={{ backgroundColor }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl mb-8 opacity-90">{subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {primaryButton}
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
              {secondaryButton}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (layout === 'split') {
    return (
      <div className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
              <p className="text-xl text-gray-600 mb-8">{subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  className="px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor }}
                >
                  {primaryButton}
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition-colors">
                  {secondaryButton}
                </button>
              </div>
            </div>
            {showImage && (
              <div className="flex justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-6xl">🚀</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 px-8 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-xl text-gray-600 mb-8">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            className="px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor }}
          >
            {primaryButton}
          </button>
          <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition-colors">
            {secondaryButton}
          </button>
        </div>
      </div>
    </div>
  )
}

// =================================================================
// COMPONENT LIBRARY DATA
// =================================================================

const REAL_WORLD_COMPONENT_LIBRARY: ComponentMeta[] = [
  {
    id: 'feature-grid',
    name: 'Feature Grid',
    description: 'Responsive feature grid with customizable layouts and styles',
    category: 'content',
    tags: ['features', 'grid', 'responsive', 'marketing'],
    complexity: 'intermediate',
    popularity: 88,
    isPremium: false,
    bundleSize: 18,
    renderScore: 90,
    wcagLevel: 'AA',
    rating: 4.7,
    downloadCount: 12840,
    lastUpdated: '2025-01-12',
    component: FeatureGrid,
    propsSchema: {
      title: { type: 'string', label: 'Title', default: 'Our Amazing Features' },
      subtitle: { type: 'string', label: 'Subtitle', default: 'Everything you need to build modern applications' },
      features: { type: 'slider', label: 'Number of Features', default: 6, min: 2, max: 8 },
      layout: { 
        type: 'select', 
        label: 'Grid Layout', 
        default: 'grid-3',
        options: [
          { label: '2 Columns', value: 'grid-2' },
          { label: '3 Columns', value: 'grid-3' },
          { label: '4 Columns', value: 'grid-4' }
        ]
      },
      style: {
        type: 'select',
        label: 'Style',
        default: 'cards',
        options: [
          { label: 'Cards', value: 'cards' },
          { label: 'Minimal', value: 'minimal' },
          { label: 'With Icons', value: 'icons' }
        ]
      },
      accentColor: { type: 'color', label: 'Accent Color', default: '#6366f1' }
    },
    defaultProps: {
      title: 'Our Amazing Features',
      subtitle: 'Everything you need to build modern applications',
      features: 6,
      layout: 'grid-3',
      style: 'cards',
      accentColor: '#6366f1'
    },
    codeExample: `<FeatureGrid 
  title="Our Amazing Features"
  subtitle="Everything you need to build modern applications"
  features={6}
  layout="grid-3"
  style="cards"
  accentColor="#6366f1"
/>`
  },
  {
    id: 'testimonial-carousel',
    name: 'Testimonial Carousel',
    description: 'Interactive testimonial section with multiple display styles',
    category: 'social',
    tags: ['testimonials', 'carousel', 'social-proof', 'marketing'],
    complexity: 'intermediate',
    popularity: 92,
    isPremium: false,
    bundleSize: 22,
    renderScore: 88,
    wcagLevel: 'AA',
    rating: 4.9,
    downloadCount: 18750,
    lastUpdated: '2025-01-11',
    component: TestimonialCarousel,
    propsSchema: {
      autoPlay: { type: 'boolean', label: 'Auto Play', default: true },
      showAvatars: { type: 'boolean', label: 'Show Avatars', default: true },
      style: {
        type: 'select',
        label: 'Display Style',
        default: 'cards',
        options: [
          { label: 'Cards', value: 'cards' },
          { label: 'Centered', value: 'centered' },
          { label: 'Grid', value: 'grid' }
        ]
      },
      accentColor: { type: 'color', label: 'Accent Color', default: '#6366f1' }
    },
    defaultProps: {
      autoPlay: true,
      showAvatars: true,
      style: 'cards',
      accentColor: '#6366f1'
    },
    codeExample: `<TestimonialCarousel 
  autoPlay={true}
  showAvatars={true}
  style="cards"
  accentColor="#6366f1"
/>`
  },
  {
    id: 'cta-section',
    name: 'Call-to-Action Section',
    description: 'Versatile CTA section with multiple layout options',
    category: 'marketing',
    tags: ['cta', 'conversion', 'marketing', 'buttons'],
    complexity: 'beginner',
    popularity: 95,
    isPremium: false,
    bundleSize: 14,
    renderScore: 94,
    wcagLevel: 'AAA',
    rating: 4.8,
    downloadCount: 22150,
    lastUpdated: '2025-01-10',
    component: CTASection,
    propsSchema: {
      title: { type: 'string', label: 'Title', default: 'Ready to Get Started?' },
      subtitle: { type: 'string', label: 'Subtitle', default: 'Join thousands of satisfied customers today' },
      primaryButton: { type: 'string', label: 'Primary Button', default: 'Get Started' },
      secondaryButton: { type: 'string', label: 'Secondary Button', default: 'Learn More' },
      layout: {
        type: 'select',
        label: 'Layout',
        default: 'centered',
        options: [
          { label: 'Centered', value: 'centered' },
          { label: 'Split', value: 'split' },
          { label: 'Banner', value: 'banner' }
        ]
      },
      backgroundColor: { type: 'color', label: 'Background Color', default: '#6366f1' },
      showImage: { type: 'boolean', label: 'Show Image', default: true }
    },
    defaultProps: {
      title: 'Ready to Get Started?',
      subtitle: 'Join thousands of satisfied customers today',
      primaryButton: 'Get Started',
      secondaryButton: 'Learn More',
      layout: 'centered',
      backgroundColor: '#6366f1',
      showImage: true
    },
    codeExample: `<CTASection 
  title="Ready to Get Started?"
  subtitle="Join thousands of satisfied customers today"
  primaryButton="Get Started"
  secondaryButton="Learn More"
  layout="centered"
  backgroundColor="#6366f1"
  showImage={true}
/>`
  }
]

// =================================================================
// MAIN COMPONENT SHOWCASE
// =================================================================

export default function ComponentShowcase() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentMeta | null>(
    REAL_WORLD_COMPONENT_LIBRARY[0]
  )
  const [props, setProps] = useState<Record<string, any>>(
    REAL_WORLD_COMPONENT_LIBRARY[0]?.defaultProps || {}
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isPropsOpen, setIsPropsOpen] = useState(true)

  // Filter components based on search and category
  const filteredComponents = useMemo(() => {
    return REAL_WORLD_COMPONENT_LIBRARY.filter(component => {
      const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           component.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  // Get unique categories
  const categories = useMemo(() => {
    const cats = REAL_WORLD_COMPONENT_LIBRARY.reduce((acc, component) => {
      if (!acc.includes(component.category)) {
        acc.push(component.category)
      }
      return acc
    }, [] as string[])
    return ['all', ...cats]
  }, [])

  // Handle component selection
  const handleComponentSelect = useCallback((component: ComponentMeta) => {
    setSelectedComponent(component)
    setProps(component.defaultProps)
  }, [])

  // Handle prop changes
  const handlePropChange = useCallback((key: string, value: any) => {
    setProps(prev => ({ ...prev, [key]: value }))
  }, [])

  // Render prop editor
  const renderPropEditor = useCallback((key: string, schema: PropSchema) => {
    const value = props[key]

    switch (schema.type) {
      case 'string':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handlePropChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder={schema.default}
          />
        )
      
      case 'number':
        return (
          <input
            type="number"
            value={value || 0}
            onChange={(e) => handlePropChange(key, parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            min={schema.min}
            max={schema.max}
          />
        )
      
      case 'boolean':
        return (
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => handlePropChange(key, e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">{schema.label}</span>
          </label>
        )
      
      case 'color':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={value || schema.default}
              onChange={(e) => handlePropChange(key, e.target.value)}
              className="h-10 w-16 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={value || schema.default}
              onChange={(e) => handlePropChange(key, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="#6366f1"
            />
          </div>
        )
      
      case 'select':
        return (
          <select
            value={value || schema.default}
            onChange={(e) => handlePropChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {schema.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      
      case 'slider':
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={schema.min || 0}
              max={schema.max || 100}
              value={value || schema.default}
              onChange={(e) => handlePropChange(key, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{schema.min || 0}</span>
              <span className="font-medium">{value || schema.default}</span>
              <span>{schema.max || 100}</span>
            </div>
          </div>
        )
      
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handlePropChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={4}
            placeholder={schema.default}
          />
        )
      
      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handlePropChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        )
    }
  }, [props, handlePropChange])

  if (!selectedComponent) return null

  const SelectedComponentToRender = selectedComponent.component

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Search and Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <svg
                className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Component List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            {filteredComponents.map((component) => (
              <button
                key={component.id}
                onClick={() => handleComponentSelect(component)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                  selectedComponent?.id === component.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{component.name}</h3>
                  <div className="flex items-center space-x-1">
                    {component.isPremium && (
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        Pro
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      component.complexity === 'beginner' ? 'bg-green-100 text-green-800' :
                      component.complexity === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {component.complexity}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{component.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {component.rating}
                  </span>
                  <span>{component.downloadCount.toLocaleString()} downloads</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedComponent.name}</h1>
              <p className="text-gray-600">{selectedComponent.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>WCAG {selectedComponent.wcagLevel}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{selectedComponent.bundleSize}KB</span>
              </div>
              <button
                onClick={() => setIsPropsOpen(!isPropsOpen)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {isPropsOpen ? 'Hide Props' : 'Show Props'}
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex">
          {/* Preview */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="bg-white rounded-lg shadow-lg min-h-full">
              <SelectedComponentToRender {...props} />
            </div>
          </div>

          {/* Props Panel */}
          {isPropsOpen && (
            <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
                <p className="text-sm text-gray-600">Customize the component</p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {Object.entries(selectedComponent.propsSchema).map(([key, schema]) => (
                  <div key={key} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {schema.label}
                      {schema.description && (
                        <span className="block text-xs text-gray-500 font-normal">
                          {schema.description}
                        </span>
                      )}
                    </label>
                    {renderPropEditor(key, schema)}
                  </div>
                ))}
              </div>

              {/* Code Example */}
              <div className="border-t border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Code Example</h3>
                <div className="bg-gray-100 rounded-lg p-3 text-xs font-mono text-gray-800 overflow-x-auto">
                  <pre>{selectedComponent.codeExample}</pre>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(selectedComponent.codeExample)}
                  className="mt-2 w-full px-3 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                >
                  Copy Code
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}