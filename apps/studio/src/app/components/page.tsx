'use client';

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
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
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

// 4. Call-to-Action Section
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

// 5. Stats Section
const StatsSection: React.FC<{
  title: string
  layout: 'horizontal' | 'grid' | 'cards'
  animated: boolean
  accentColor: string
}> = ({ title, layout, animated, accentColor }) => {
  const [inView, setInView] = useState(false)
  const [counts, setCounts] = useState({ users: 0, projects: 0, countries: 0, satisfaction: 0 })

  const finalStats = {
    users: 50000,
    projects: 125000,
    countries: 120,
    satisfaction: 99
  }

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
          clearInterval(intervals.find(i => i === interval))
        } else {
          setCounts(prev => ({ ...prev, [key]: Math.floor(currentValue) }))
        }
      }, stepTime)
    })

    return () => intervals.forEach(clearInterval)
  }, [inView, animated])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    )

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
            <div
              key={index}
              className={`text-center ${
                layout === 'cards' ? 'bg-white p-6 rounded-lg shadow-lg' : ''
              }`}
            >
              <div 
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: accentColor }}
              >
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

// 6. Newsletter Signup
const NewsletterSignup: React.FC<{
  title: string
  subtitle: string
  placeholder: string
  buttonText: string
  style: 'inline' | 'stacked' | 'modal'
  accentColor: string
}> = ({ title, subtitle, placeholder, buttonText, style, accentColor }) => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail('')
      if (style === 'modal') setIsModalOpen(false)
    }, 3000)
  }

  const content = (
    <div className={style === 'modal' ? '' : 'py-16 px-8'}>
      <div className={`max-w-2xl mx-auto text-center ${style === 'modal' ? 'p-8' : ''}`}>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-xl text-gray-600 mb-8">{subtitle}</p>
        
        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-800 font-medium">Thanks for subscribing! Check your email.</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={`${style === 'inline' ? 'flex flex-col sm:flex-row gap-4' : 'space-y-4'}`}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className={`px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                style === 'inline' ? 'flex-1' : 'w-full'
              }`}
              required
            />
            <button
              type="submit"
              className="px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: accentColor }}
            >
              {buttonText}
            </button>
          </form>
        )}
      </div>
    </div>
  )

  if (style === 'modal') {
    return (
      <>
        <div className="py-16 px-8 text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: accentColor }}
          >
            Subscribe to Newsletter
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsModalOpen(false)}
            />
            <div className="relative bg-white rounded-lg shadow-xl max-w-md mx-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {content}
            </div>
          </div>
        )}
      </>
    )
  }

  return <div className="bg-gray-50">{content}</div>
}

// 7. Product Showcase
const ProductShowcase: React.FC<{
  title: string
  layout: 'carousel' | 'grid' | 'featured'
  showPricing: boolean
  accentColor: string
}> = ({ title, layout, showPricing, accentColor }) => {
  const [currentProduct, setCurrentProduct] = useState(0)

  const products = [
    {
      name: 'Pro Dashboard',
      description: 'Advanced analytics dashboard with real-time data visualization',
      price: 99,
      image: '📊',
      features: ['Real-time Analytics', 'Custom Reports', 'Team Collaboration', 'API Access']
    },
    {
      name: 'Enterprise Suite',
      description: 'Complete business solution with advanced integrations',
      price: 299,
      image: '🏢',
      features: ['Unlimited Users', 'Priority Support', 'Custom Integrations', 'White Label']
    },
    {
      name: 'Starter Kit',
      description: 'Perfect for small teams and getting started quickly',
      price: 29,
      image: '🚀',
      features: ['5 Team Members', 'Basic Analytics', 'Email Support', 'Core Features']
    }
  ]

  if (layout === 'carousel') {
    return (
      <div className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{title}</h2>
          
          <div className="relative">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">{products[currentProduct].image}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{products[currentProduct].name}</h3>
              <p className="text-gray-600 mb-6">{products[currentProduct].description}</p>
              
              {showPricing && (
                <div className="text-3xl font-bold mb-6" style={{ color: accentColor }}>
                  ${products[currentProduct].price}/month
                </div>
              )}
              
              <ul className="text-left max-w-sm mx-auto space-y-2 mb-8">
                {products[currentProduct].features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                className="px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: accentColor }}
              >
                Get Started
              </button>
            </div>
            
            <div className="flex justify-center mt-6 space-x-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProduct(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentProduct ? 'bg-gray-800' : 'bg-gray-300'
                  }`}
                  style={{ backgroundColor: index === currentProduct ? accentColor : undefined }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{title}</h2>
        
        <div className={`grid ${layout === 'featured' ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
          {products.map((product, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg p-6 text-center ${
                layout === 'featured' && index === 1 ? 'transform scale-105 border-2' : ''
              }`}
              style={{
                borderColor: layout === 'featured' && index === 1 ? accentColor : undefined
              }}
            >
              {layout === 'featured' && index === 1 && (
                <div
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 text-xs font-semibold text-white rounded-full"
                  style={{ backgroundColor: accentColor }}
                >
                  Most Popular
                </div>
              )}
              
              <div className="text-4xl mb-4">{product.image}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              {showPricing && (
                <div className="text-2xl font-bold mb-4" style={{ color: accentColor }}>
                  ${product.price}/month
                </div>
              )}
              
              <ul className="text-left space-y-2 mb-6">
                {product.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                className="w-full py-2 px-4 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: accentColor }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 8. Team Section
const TeamSection: React.FC<{
  title: string
  subtitle: string
  layout: 'grid' | 'carousel' | 'list'
  showSocial: boolean
}> = ({ title, subtitle, layout, showSocial }) => {
  const team = [
    {
      name: 'Alex Thompson',
      role: 'CEO & Founder',
      bio: 'Visionary leader with 15+ years in tech, passionate about building products that make a difference.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      social: { twitter: '@alexthompson', linkedin: 'alexthompson' }
    },
    {
      name: 'Sarah Mitchell',
      role: 'CTO',
      bio: 'Expert in scalable systems and AI, leading our technical innovation and engineering excellence.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      social: { twitter: '@sarahmitchell', linkedin: 'sarahmitchell' }
    },
    {
      name: 'David Kim',
      role: 'Head of Design',
      bio: 'Creative director focused on user experience and beautiful, functional design systems.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      social: { twitter: '@davidkim', linkedin: 'davidkim' }
    },
    {
      name: 'Emily Rodriguez',
      role: 'VP of Marketing',
      bio: 'Growth expert helping companies scale through strategic marketing and community building.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      social: { twitter: '@emilyrodriguez', linkedin: 'emilyrodriguez' }
    }
  ]

  if (layout === 'list') {
    return (
      <div className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-xl text-gray-600">{subtitle}</p>
          </div>
          
          <div className="space-y-8">
            {team.map((member, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 bg-white p-6 rounded-lg shadow-lg">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  {showSocial && (
                    <div className="flex justify-center md:justify-start space-x-4">
                      <a href="#" className="text-blue-400 hover:text-blue-600">Twitter</a>
                      <a href="#" className="text-blue-600 hover:text-blue-800">LinkedIn</a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-lg shadow-lg">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
              {showSocial && (
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-blue-400 hover:text-blue-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 9. Blog Preview Section
const BlogPreview: React.FC<{
  title: string
  layout: 'grid' | 'list' | 'featured'
  showAuthor: boolean
  showDate: boolean
}> = ({ title, layout, showAuthor, showDate }) => {
  const posts = [
    {
      title: 'Building Modern Web Applications with Component Libraries',
      excerpt: 'Learn how to leverage pre-built components to accelerate your development workflow and maintain consistency across your applications.',
      author: 'Sarah Mitchell',
      date: '2025-01-10',
      readTime: '5 min read',
      category: 'Development',
      image: '📝'
    },
    {
      title: 'The Future of Design Systems',
      excerpt: 'Exploring how design systems are evolving and what developers need to know about the next generation of component libraries.',
      author: 'David Kim',
      date: '2025-01-08',
      readTime: '7 min read',
      category: 'Design',
      image: '🎨'
    },
    {
      title: 'Performance Optimization Techniques',
      excerpt: 'Advanced strategies for optimizing React components and improving your application\'s performance metrics.',
      author: 'Alex Thompson',
      date: '2025-01-05',
      readTime: '6 min read',
      category: 'Performance',
      image: '⚡'
    }
  ]

  if (layout === 'list') {
    return (
      <div className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{title}</h2>
          
          <div className="space-y-8">
            {posts.map((post, index) => (
              <article key={index} className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="w-full md:w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white text-2xl">
                  {post.image}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">{post.category}</span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    {showAuthor && <span>By {post.author}</span>}
                    {showDate && <span>{new Date(post.date).toLocaleDateString()}</span>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (layout === 'featured') {
    return (
      <div className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{title}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Featured Post */}
            <article className="lg:row-span-2 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl">
                {posts[0].image}
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">{posts[0].category}</span>
                  <span className="text-sm text-gray-500">{posts[0].readTime}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                  {posts[0].title}
                </h3>
                <p className="text-gray-600 mb-4">{posts[0].excerpt}</p>
                {(showAuthor || showDate) && (
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    {showAuthor && <span>By {posts[0].author}</span>}
                    {showDate && <span>{new Date(posts[0].date).toLocaleDateString()}</span>}
                  </div>
                )}
              </div>
            </article>

            {/* Side Posts */}
            <div className="space-y-6">
              {posts.slice(1).map((post, index) => (
                <article key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">{post.category}</span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                  {(showAuthor || showDate) && (
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      {showAuthor && <span>By {post.author}</span>}
                      {showDate && <span>{new Date(post.date).toLocaleDateString()}</span>}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="h-32 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl">
                {post.image}
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">{post.category}</span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                {(showAuthor || showDate) && (
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    {showAuthor && <span>By {post.author}</span>}
                    {showDate && <span>{new Date(post.date).toLocaleDateString()}</span>}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

// 10. Logo Cloud
const LogoCloud: React.FC<{
  title: string
  subtitle: string
  animated: boolean
  style: 'simple' | 'cards' | 'carousel'
}> = ({ title, subtitle, animated, style }) => {
  const logos = [
    { name: 'TechCorp', logo: '🏢' },
    { name: 'StartupXYZ', logo: '🚀' },
    { name: 'Enterprise Co', logo: '🏭' },
    { name: 'Innovation Labs', logo: '🔬' },
    { name: 'Digital Agency', logo: '💻' },
    { name: 'Creative Studio', logo: '🎨' },
    { name: 'Data Solutions', logo: '📊' },
    { name: 'Cloud Systems', logo: '☁️' }
  ]

  if (style === 'carousel') {
    return (
      <div className="py-16 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-xl text-gray-600">{subtitle}</p>
          </div>
          
          <div className="overflow-hidden">
            <div className={`flex space-x-12 ${animated ? 'animate-scroll' : ''}`}>
              {[...logos, ...logos].map((logo, index) => (
                <div key={index} className="flex-shrink-0 flex items-center justify-center w-24 h-24">
                  <span className="text-4xl">{logo.logo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (style === 'cards') {
    return (
      <div className="py-16 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-xl text-gray-600">{subtitle}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {logos.map((logo, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-2">{logo.logo}</div>
                <h3 className="text-sm font-medium text-gray-900">{logo.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center opacity-60">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center">
              <span className="text-3xl grayscale hover:grayscale-0 transition-all">{logo.logo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// =================================================================
// EXPANDED COMPONENT LIBRARY DATA
// =================================================================

const REAL_WORLD_COMPONENT_LIBRARY: ComponentMeta[] = [
  // Existing components from previous implementation...
  {
    id: 'hero-section',
    name: 'Hero Section',
    description: 'Eye-catching hero section with gradient background and call-to-action',
    category: 'layout',
    tags: ['hero', 'landing', 'cta', 'gradient'],
    complexity: 'intermediate',
    popularity: 95,
    isPremium: false,
    bundleSize: 12,
    renderScore: 92,
    wcagLevel: 'AA',
    rating: 4.8,
    downloadCount: 15420,
    lastUpdated: '2025-01-10',
    component: () => <div className="bg-indigo-600 text-white p-8 rounded-lg text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Platform</h1>
      <p className="text-xl mb-6">Build amazing experiences</p>
      <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold">Get Started</button>
    </div>,
    propsSchema: {
      title: { type: 'string', label: 'Title', default: 'Welcome to Our Platform' },
      subtitle: { type: 'string', label: 'Subtitle', default: 'Build amazing experiences' },
      backgroundColor: { type: 'color', label: 'Background Color', default: '#6366f1' },
      showButton: { type: 'boolean', label: 'Show CTA Button', default: true },
      buttonText: { type: 'string', label: 'Button Text', default: 'Get Started' }
    },
    defaultProps: {
      title: 'Welcome to Our Platform',
      subtitle: 'Build amazing experiences',
      backgroundColor: '#6366f1',
      showButton: true,
      buttonText: 'Get Started'
    },
    codeExample: `<HeroSection 
  title="Welcome to Our Platform"
  subtitle="Build amazing experiences"
  backgroundColor="#6366f1"
  showButton={true}
  buttonText="Get Started"
/>`
  },

  // New Real-World Components
  {
    id: 'feature-grid',
    name: 'Feature Grid',
    description: 'Responsive feature grid with customizable layouts and styles',
    category: '',
      tags: ['hero', 'landing', 'cta', 'gradient'],
    complexity: 'intermediate',
    popularity: 95,
    isPremium: false,
    bundleSize: 12,
    renderScore: 92,
    wcagLevel: 'AA',
    rating: 4.8,
    downloadCount: 15420,
    lastUpdated: '2025-01-10',
    component: () => <div className="bg-indigo-600 text-white p-8 rounded-lg text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Platform</h1>
      <p className="text-xl mb-6">Build amazing experiences</p>
      <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold">Get Started</button>
    </div>,
    propsSchema: {
      title: { type: 'string', label: 'Title', default: 'Welcome to Our Platform' },
      subtitle: { type: 'string', label: 'Subtitle', default: 'Build amazing experiences' },
      backgroundColor: { type: 'color', label: 'Background Color', default: '#6366f1' },
      showButton: { type: 'boolean', label: 'Show CTA Button', default: true },
      buttonText: { type: 'string', label: 'Button Text', default: 'Get Started' }
    },
    defaultProps: {
      title: 'Welcome to Our Platform',
      subtitle: 'Build amazing experiences',
      backgroundColor: '#6366f1',
      showButton: true,
      buttonText: 'Get Started'
    },
    codeExample: `<HeroSection 
  title="Welcome to Our Platform"
  subtitle="Build amazing experiences"
  backgroundColor="#6366f1"
  showButton={true}
  buttonText="Get Started"
/>`
  },
];