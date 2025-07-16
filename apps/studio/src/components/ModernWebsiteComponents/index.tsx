'use client'

import React from 'react'

// ========================================================================
// COMPONENT PROP INTERFACES
// ========================================================================

interface HeroSectionProps {
  variant: 'centered' | 'split' | 'video-bg' | 'gradient' | 'minimal'
  title: string
  subtitle: string
  primaryCTA: string
  secondaryCTA?: string
  showImage: boolean
  backgroundVideo: boolean
}

interface NavigationHeaderProps {
  variant: 'simple' | 'centered' | 'mega' | 'sidebar'
  showLogo: boolean
  transparent: boolean
  sticky: boolean
}

interface FeatureCardsGridProps {
  variant: 'cards' | 'icons' | 'minimal' | 'hover-effects'
  columns: 2 | 3 | 4
  showIcons: boolean
  animated: boolean
}

interface PricingTablesProps {
  variant: 'simple' | 'featured' | 'toggle' | 'comparison'
  billing: 'monthly' | 'yearly'
  showPopular: boolean
}

interface TestimonialsSectionProps {
  variant: 'carousel' | 'grid' | 'featured' | 'minimal'
  showImages: boolean
  animated: boolean
}

interface ContactSectionProps {
  variant: 'simple' | 'split' | 'centered' | 'modal'
  showMap: boolean
  showSocial: boolean
}

interface CTASectionProps {
  variant: 'simple' | 'split' | 'gradient' | 'image-bg'
  title: string
  subtitle: string
  primaryCTA: string
  secondaryCTA?: string
  showStats: boolean
}

interface FooterSectionProps {
  variant: 'simple' | 'comprehensive' | 'minimal'
  showNewsletter: boolean
  showSocial: boolean
}

// ========================================================================
// COMPONENT IMPLEMENTATIONS
// ========================================================================

export const HeroSection: React.FC<HeroSectionProps> = ({
  variant,
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  showImage,
  backgroundVideo
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'split':
        return 'min-h-screen flex items-center py-20 dark:bg-gray-900'
      case 'video-bg':
        return 'relative min-h-screen flex items-center justify-center overflow-hidden text-white bg-gradient-to-r from-indigo-900 to-purple-900'
      case 'gradient':
        return 'relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-600 text-white'
      case 'minimal':
        return 'min-h-screen flex items-center justify-center bg-white dark:bg-gray-900'
      default:
        return 'relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-900'
    }
  }

  if (variant === 'split') {
    return (
      <section className={getVariantStyles()}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              {title}
            </h1>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">{subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all">
                {primaryCTA}
              </button>
              {secondaryCTA && (
                <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 rounded-lg font-semibold transition-all">
                  {secondaryCTA}
                </button>
              )}
            </div>
          </div>
          {showImage && (
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-white text-6xl">🚀</span>
              </div>
            </div>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className={getVariantStyles()}>
      <div className="text-center max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105">
            {primaryCTA}
          </button>
          {secondaryCTA && (
            <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 rounded-lg font-semibold transition-all">
              {secondaryCTA}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  variant,
  showLogo,
  transparent,
  sticky
}) => {
  const navItems = ['Features', 'Pricing', 'About', 'Contact']
  
  const baseClasses = `w-full transition-all duration-300 z-50 ${
    sticky ? 'sticky top-0' : 'relative'
  } ${
    transparent 
      ? 'bg-transparent' 
      : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700'
  }`

  return (
    <nav className={baseClasses}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {showLogo && (
            <div className="flex items-center">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Eternal UI
              </span>
            </div>
          )}
          
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="hidden lg:block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 text-sm font-medium">
              Sign In
            </button>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export const FeatureCardsGrid: React.FC<FeatureCardsGridProps> = ({
  variant,
  columns,
  showIcons,
  animated
}) => {
  const features = [
    { icon: '⚡', title: 'Lightning Fast', description: 'Optimized for speed and performance' },
    { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security features' },
    { icon: '📱', title: 'Mobile First', description: 'Designed for mobile devices' },
    { icon: '🎨', title: 'Customizable', description: 'Fully customizable components' },
    { icon: '🚀', title: 'Easy Deploy', description: 'One-click deployment' },
    { icon: '📊', title: 'Analytics', description: 'Built-in analytics' }
  ]

  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to build modern applications
          </p>
        </div>

        <div className={`grid ${gridClasses[columns]} gap-8`}>
          {features.slice(0, columns * 2).map((feature, index) => (
            <div
              key={index}
              className={`group ${
                variant === 'cards'
                  ? 'bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all'
                  : variant === 'hover-effects'
                  ? 'p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl'
                  : 'p-6'
              }`}
            >
              {showIcons && (
                <div className={`${
                  variant === 'icons' 
                    ? 'w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4'
                    : 'mb-4'
                }`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
              )}
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const PricingTables: React.FC<PricingTablesProps> = ({
  variant,
  billing,
  showPopular
}) => {
  const plans = [
    {
      name: 'Starter',
      price: { monthly: 29, yearly: 290 },
      description: 'Perfect for small teams',
      features: ['Up to 5 team members', '10GB storage', 'Basic support'],
      popular: false
    },
    {
      name: 'Professional',
      price: { monthly: 99, yearly: 990 },
      description: 'Best for growing businesses',
      features: ['Up to 25 team members', '100GB storage', 'Priority support', 'Advanced features'],
      popular: showPopular
    },
    {
      name: 'Enterprise',
      price: { monthly: 299, yearly: 2990 },
      description: 'For large organizations',
      features: ['Unlimited team members', '1TB storage', '24/7 support', 'Custom integrations'],
      popular: false
    }
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border p-8 ${
                plan.popular
                  ? 'border-indigo-500 bg-white dark:bg-gray-900 shadow-xl scale-105 z-10'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {plan.description}
                </p>
                
                <div className="mt-4 mb-8">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${plan.price[billing]}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    /{billing === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  Get Started
                </button>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  variant,
  showImages,
  animated
}) => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior Designer',
      company: 'TechCorp',
      content: 'Eternal UI has transformed our design workflow. The component library is incredibly comprehensive.',
      avatar: '👩‍💻',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Lead Developer',
      company: 'InnovateLab',
      content: 'The best design system I\'ve ever worked with. Clean code and excellent documentation.',
      avatar: '👨‍💻',
      rating: 5
    }
  ]

  if (variant === 'grid') {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-4">
                  {showImages && (
                    <div className="w-12 h-12 text-2xl">
                      {testimonial.avatar}
                    </div>
                  )}
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={`text-lg ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  "{testimonial.content}"
                </blockquote>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-indigo-50 dark:bg-indigo-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-16">
          Customer Testimonials
        </h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          {showImages && (
            <div className="w-16 h-16 mx-auto mb-4 text-4xl">
              {testimonials[0].avatar}
            </div>
          )}
          
          <div className="flex justify-center mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className="text-lg text-yellow-400">⭐</span>
            ))}
          </div>
          
          <blockquote className="text-xl text-gray-700 dark:text-gray-300 mb-6 italic">
            "{testimonials[0].content}"
          </blockquote>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {testimonials[0].name}
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              {testimonials[0].role} at {testimonials[0].company}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  variant,
  showMap,
  showSocial
}) => {
  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'hello@eternalui.com' },
    { icon: '📞', label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: '📍', label: 'Address', value: '123 Design Street, Tech City' }
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Ready to transform your design workflow? Let's talk.
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-2xl mr-4">{info.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {info.label}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {showMap && (
          <div className="mt-16">
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl mb-2 block">🗺️</span>
                <p className="text-gray-600 dark:text-gray-400">Interactive Map Placeholder</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export const CTASection: React.FC<CTASectionProps> = ({
  variant,
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  showStats
}) => {
  const stats = [
    { value: '50K+', label: 'Developers' },
    { value: '2M+', label: 'Components Used' },
    { value: '99.9%', label: 'Uptime' },
    { value: '4.9/5', label: 'Rating' }
  ]

  if (variant === 'gradient') {
    return (
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {title}
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
              {primaryCTA}
            </button>
            {secondaryCTA && (
              <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-indigo-600 rounded-lg font-semibold transition-all">
                {secondaryCTA}
              </button>
            )}
          </div>

          {showStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm opacity-80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {title}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105">
            {primaryCTA}
          </button>
          {secondaryCTA && (
            <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 rounded-lg font-semibold transition-all">
              {secondaryCTA}
            </button>
          )}
        </div>

        {showStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-200 dark:border-gray-700">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  variant,
  showNewsletter,
  showSocial
}) => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: ['Features', 'Pricing', 'Security', 'Roadmap'],
    company: ['About', 'Blog', 'Careers', 'Contact'],
    resources: ['Documentation', 'Help Center', 'Community', 'API'],
    legal: ['Privacy', 'Terms', 'Cookies', 'Licenses']
  }

  const socialLinks = [
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'GitHub', icon: '🐙', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' },
    { name: 'Discord', icon: '💬', href: '#' }
  ]

  if (variant === 'minimal') {
    return (
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Eternal UI
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-4 md:mt-0">
              © {currentYear} Eternal UI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="ml-2 text-xl font-bold">Eternal UI</span>
            </div>
            <p className="text-gray-300 mt-4 max-w-sm">
              Build beautiful, accessible, and performant web applications with our comprehensive component library.
            </p>
            
            {showSocial && (
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4 capitalize">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {showNewsletter && (
          <div className="border-t border-gray-800 mt-12 pt-12">
            <div className="max-w-md">
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-4">
                Get the latest updates and announcements delivered to your inbox.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400"
                />
                <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-r-lg font-semibold transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Eternal UI. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Export all components and their prop types
export type {
  HeroSectionProps,
  NavigationHeaderProps,
  FeatureCardsGridProps,
  PricingTablesProps,
  TestimonialsSectionProps,
  ContactSectionProps,
  CTASectionProps,
  FooterSectionProps
}