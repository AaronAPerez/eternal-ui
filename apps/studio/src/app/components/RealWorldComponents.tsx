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
// COMPLETE REAL WORLD COMPONENTS COLLECTION
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>
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
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full mr-3" />
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
              <img src={currentTestimonial.avatar} alt={currentTestimonial.name} className="w-12 h-12 rounded-full mr-4" />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">{currentTestimonial.name}</h4>
                <p className="text-gray-500">{currentTestimonial.role}</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'}`}
              style={{ backgroundColor: index === currentIndex ? accentColor : undefined }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// 3. FAQ Section
const FAQSection: React.FC<{
  title: string
  style: 'accordion' | 'grid' | 'simple'
  accentColor: string
  searchable: boolean
}> = ({ title, style, accentColor, searchable }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [searchTerm, setSearchTerm] = useState('')

  const faqs = [
    {
      question: 'How do I get started with the component library?',
      answer: 'Getting started is easy! Simply install our npm package, import the components you need, and start building. Our comprehensive documentation includes examples and best practices.'
    },
    {
      question: 'Can I customize the components to match my brand?',
      answer: 'Absolutely! All components are fully customizable with props for colors, sizes, styles, and more. You can also override CSS classes for complete control over the appearance.'
    },
    {
      question: 'Do the components work with TypeScript?',
      answer: 'Yes! Our entire library is built with TypeScript and includes full type definitions. You\'ll get excellent IntelliSense support and type safety out of the box.'
    },
    {
      question: 'What about browser compatibility?',
      answer: 'Our components support all modern browsers including Chrome, Firefox, Safari, and Edge. We also provide polyfills for older browser versions when needed.'
    },
    {
      question: 'Is there a free tier available?',
      answer: 'Yes! We offer a generous free tier that includes access to basic components and limited customization options. Premium features are available with our paid plans.'
    },
    {
      question: 'How do I report bugs or request features?',
      answer: 'You can report issues and request features through our GitHub repository, support email, or community Discord server. We actively monitor all channels and respond quickly.'
    }
  ]

  const filteredFAQs = useMemo(() => {
    if (!searchTerm) return faqs
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  if (style === 'grid') {
    return (
      <div className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{title}</h2>
          {searchable && (
            <div className="max-w-md mx-auto mb-8">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search FAQs..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{title}</h2>
        {searchable && (
          <div className="mb-8">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border">
              {style === 'accordion' ? (
                <>
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 4. CTA Section
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
      <div className="py-16 px-8 text-center text-white" style={{ backgroundColor }}>
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
                <button className="px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity" style={{ backgroundColor }}>
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
          <button className="px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity" style={{ backgroundColor }}>
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

// 5. Stats Section
const StatsSection: React.FC<{
  title: string
  layout: 'horizontal' | 'grid' | 'cards'
  animated: boolean
  accentColor: string
}> = ({ title, layout, animated, accentColor }) => {
  const [inView, setInView] = useState(false)
  const [counts, setCounts] = useState({ users: 0, projects: 0, countries: 0, satisfaction: 0 })

  const finalStats = { users: 50000, projects: 125000, countries: 120, satisfaction: 99 }

  useEffect(() => {
    if (!animated || !inView) return
    const duration = 2000
    const steps = 60
    const stepTime = duration / steps

    const intervals = Object.keys(finalStats).map(key => {
      const finalValue = finalStats[key as keyof typeof finalStats]
      const stepValue = finalValue / steps
      let currentValue = 0

      return setInterval(() => {
        currentValue += stepValue
        if (currentValue >= finalValue) {
          setCounts(prev => ({ ...prev, [key]: finalValue }))
        } else {
          setCounts(prev => ({ ...prev, [key]: Math.floor(currentValue) }))
        }
      }, stepTime)
    })

    return () => intervals.forEach(clearInterval)
  }, [inView, animated])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 })
    const element = document.getElementById('stats-section')
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const stats = [
    { label: 'Happy Users', value: animated ? counts.users : finalStats.users, suffix: '+' },
    { label: 'Projects Built', value: animated ? counts.projects : finalStats.projects, suffix: '+' },
    { label: 'Countries', value: animated ? counts.countries : finalStats.countries, suffix: '' },
    { label: 'Satisfaction', value: animated ? counts.satisfaction : finalStats.satisfaction, suffix: '%' }
  ]

  const layoutClasses = {
    horizontal: 'flex flex-wrap justify-center gap-8',
    grid: 'grid grid-cols-2 md:grid-cols-4 gap-8',
    cards: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
  }

  return (
    <div id="stats-section" className="py-16 px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{title}</h2>
        <div className={layoutClasses[layout]}>
          {stats.map((stat, index) => (
            <div key={index} className={`text-center ${layout === 'cards' ? 'bg-white p-6 rounded-lg shadow-lg' : ''}`}>
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: accentColor }}>
                {stat.value.toLocaleString()}{stat.suffix}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// =================================================================
// COMPONENT LIBRARY DATA - COMPLETE & ORGANIZED
// =================================================================

export const REAL_WORLD_COMPONENT_LIBRARY: ComponentMeta[] = [
  {
    id: 'feature-grid',
    name: 'Feature Grid',
    description: 'Responsive feature grid with customizable layouts and styles',
    category: 'content',
    tags: ['features', 'grid', 'responsive', 'icons'],
    complexity: 'intermediate',
    popularity: 89,
    isPremium: false,
    bundleSize: 16,
    renderScore: 94,
    wcagLevel: 'AA',
    rating: 4.7,
    downloadCount: 12800,
    lastUpdated: '2025-01-12',
    component: FeatureGrid,
    propsSchema: {
      title: { type: 'string', label: 'Section Title', default: 'Why Choose Us' },
      subtitle: { type: 'string', label: 'Section Subtitle', default: 'Discover the features that set us apart' },
      features: { type: 'slider', label: 'Number of Features', min: 3, max: 8, default: 6 },
      layout: { 
        type: 'select', 
        label: 'Grid Layout', 
        options: [
          { label: '2 Columns', value: 'grid-2' },
          { label: '3 Columns', value: 'grid-3' },
          { label: '4 Columns', value: 'grid-4' }
        ], 
        default: 'grid-3' 
      },
      style: { 
        type: 'select', 
        label: 'Display Style', 
        options: [
          { label: 'Cards', value: 'cards' },
          { label: 'Minimal', value: 'minimal' },
          { label: 'With Icons', value: 'icons' }
        ], 
        default: 'cards' 
      },
      accentColor: { type: 'color', label: 'Accent Color', default: '#6366f1' }
    },
    defaultProps: {
      title: 'Why Choose Us',
      subtitle: 'Discover the features that set us apart',
      features: 6,
      layout: 'grid-3',
      style: 'cards',
      accentColor: '#6366f1'
    },
    codeExample: `<FeatureGrid 
  title="Why Choose Us"
  subtitle="Discover the features that set us apart"
  features={6}
  layout="grid-3"
  style="cards"
  accentColor="#6366f1"
/>`
  },
  {
    id: 'testimonial-carousel',
    name: 'Testimonial Carousel',
    description: 'Interactive testimonial carousel with multiple display styles',
    category: 'social',
    tags: ['testimonials', 'carousel', 'reviews', 'social-proof'],
    complexity: 'advanced',
    popularity: 92,
    isPremium: true,
    bundleSize: 22,
    renderScore: 88,
    wcagLevel: 'AA',
    rating: 4.9,
    downloadCount: 8900,
    lastUpdated: '2025-01-11',
    component: TestimonialCarousel,
    propsSchema: {
      autoPlay: { type: 'boolean', label: 'Auto Play', default: true },
      showAvatars: { type: 'boolean', label: 'Show Avatars', default: true },
      style: { 
        type: 'select', 
        label: 'Display Style', 
        options: [
          { label: 'Cards', value: 'cards' },
          { label: 'Centered', value: 'centered' },
          { label: 'Grid', value: 'grid' }
        ], 
        default: 'centered' 
      },
      accentColor: { type: 'color', label: 'Accent Color', default: '#10b981' }
    },
    defaultProps: {
      autoPlay: true,
      showAvatars: true,
      style: 'centered',
      accentColor: '#10b981'
    },
    codeExample: `<TestimonialCarousel 
  autoPlay={true}
  showAvatars={true}
  style="centered"
  accentColor="#10b981"
/>`
  },
  {
    id: 'faq-section',
    name: 'FAQ Section',
    description: 'Interactive FAQ section with search and multiple layouts',
    category: 'content',
    tags: ['faq', 'accordion', 'search', 'support'],
    complexity: 'intermediate',
    popularity: 85,
    isPremium: false,
    bundleSize: 18,
    renderScore: 91,
    wcagLevel: 'AAA',
    rating: 4.6,
    downloadCount: 11200,
    lastUpdated: '2025-01-09',
    component: FAQSection,
    propsSchema: {
      title: { type: 'string', label: 'Section Title', default: 'Frequently Asked Questions' },
      style: { 
        type: 'select', 
        label: 'Display Style', 
        options: [
          { label: 'Accordion', value: 'accordion' },
          { label: 'Grid', value: 'grid' },
          { label: 'Simple', value: 'simple' }
        ], 
        default: 'accordion' 
      },
      accentColor: { type: 'color', label: 'Accent Color', default: '#6366f1' },
      searchable: { type: 'boolean', label: 'Enable Search', default: true }
    },
    defaultProps: {
      title: 'Frequently Asked Questions',
      style: 'accordion',
      accentColor: '#6366f1',
      searchable: true
    },
    codeExample: `<FAQSection 
  title="Frequently Asked Questions"
  style="accordion"
  accentColor="#6366f1"
  searchable={true}
/>`
  },
  {
    id: 'cta-section',
    name: 'Call-to-Action Section',
    description: 'Versatile CTA section with multiple layouts and styles',
    category: 'marketing',
    tags: ['cta', 'conversion', 'marketing', 'action'],
    complexity: 'beginner',
    popularity: 96,
    isPremium: false,
    bundleSize: 10,
    renderScore: 95,
    wcagLevel: 'AA',
    rating: 4.8,
    downloadCount: 18500,
    lastUpdated: '2025-01-13',
    component: CTASection,
    propsSchema: {
      title: { type: 'string', label: 'CTA Title', default: 'Ready to Get Started?' },
      subtitle: { type: 'string', label: 'CTA Subtitle', default: 'Join thousands of satisfied customers today' },
      primaryButton: { type: 'string', label: 'Primary Button Text', default: 'Get Started' },
      secondaryButton: { type: 'string', label: 'Secondary Button Text', default: 'Learn More' },
      layout: { 
        type: 'select', 
        label: 'Layout Style', 
        options: [
          { label: 'Centered', value: 'centered' },
          { label: 'Split', value: 'split' },
          { label: 'Banner', value: 'banner' }
        ], 
        default: 'centered' 
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
  },
  {
    id: 'stats-section',
    name: 'Statistics Section',
    description: 'Animated statistics display with multiple layouts',
    category: 'data',
    tags: ['statistics', 'numbers', 'animation', 'metrics'],
    complexity: 'intermediate',
    popularity: 87,
    isPremium: false,
    bundleSize: 15,
    renderScore: 89,
    wcagLevel: 'AA',
    rating: 4.5,
    downloadCount: 9600,
    lastUpdated: '2025-01-07',
    component: StatsSection,
    propsSchema: {
      title: { type: 'string', label: 'Section Title', default: 'Our Impact in Numbers' },
      layout: { 
        type: 'select', 
        label: 'Layout Style', 
        options: [
          { label: 'Horizontal', value: 'horizontal' },
          { label: 'Grid', value: 'grid' },
          { label: 'Cards', value: 'cards' }
        ], 
        default: 'grid' 
      },
      animated: { type: 'boolean', label: 'Animated Counters', default: true },
      accentColor: { type: 'color', label: 'Accent Color', default: '#10b981' }
    },
    defaultProps: {
      title: 'Our Impact in Numbers',
      layout: 'grid',
      animated: true,
      accentColor: '#10b981'
    },
    codeExample: `<StatsSection 
  title="Our Impact in Numbers"
  layout="grid"
  animated={true}
  accentColor="#10b981"
/>`
  }
]