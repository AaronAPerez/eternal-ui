'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'

// =================================================================
// ETERNAL UI LOGO COMPONENT
// =================================================================

interface EternalUILogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  className?: string
  variant?: 'default' | 'mono' | 'gradient'
  theme?: 'light' | 'dark'
  onClick?: () => void
}

const EternalUILogo: React.FC<EternalUILogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '',
  variant = 'default',
  theme = 'light',
  onClick 
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8', 
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  const textSizeClasses = {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-lg', 
    lg: 'text-xl',
    xl: 'text-2xl'
  }

  const logoIcon = (
    <svg
      viewBox="0 0 100 100"
      className={`${sizeClasses[size]} ${className}`}
      aria-label="Eternal UI Logo"
      role="img"
    >
      <defs>
        <linearGradient id="eternal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      
      {/* Infinity symbol base */}
      <g opacity="0.9">
        <circle cx="30" cy="50" r="18" fill="url(#eternal-gradient)" />
        <circle cx="70" cy="50" r="18" fill="url(#eternal-gradient)" />
      </g>
      
      {/* UI element overlay */}
      <g opacity="0.7">
        <path
          d="M35 35l30 30M65 35L35 65"
          stroke={theme === 'dark' ? '#FFFFFF' : '#1F2937'}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      
      {/* Highlight dots */}
      <circle cx="30" cy="35" r="2" fill="#FFFFFF" opacity="0.8" />
      <circle cx="70" cy="35" r="2" fill="#FFFFFF" opacity="0.8" />
    </svg>
  )

  const textColor = theme === 'dark' 
    ? 'text-white' 
    : variant === 'gradient' 
      ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent'
      : 'text-gray-900'

  const WrapperComponent = onClick ? 'button' : 'div'
  
  return (
    <WrapperComponent
      className={`flex items-center gap-3 group ${onClick ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''}`}
      onClick={onClick}
      {...(onClick && { 'aria-label': 'Eternal UI Home', role: 'button' })}
    >
      <div className="flex-shrink-0">{logoIcon}</div>
      {showText && (
        <div className="flex flex-col">
          <h1 className={`font-bold tracking-tight ${textSizeClasses[size]} ${textColor}`}>
            Eternal UI
          </h1>
          <p className="text-xs text-gray-600 dark:text-gray-400">Visual Builder</p>
        </div>
      )}
    </WrapperComponent>
  )
}

// =================================================================
// MODERN WEBSITE COMPONENTS COLLECTION
// =================================================================

// 1. Hero Section with Multiple Variants
const HeroSection: React.FC<{
  variant: 'centered' | 'split' | 'video-bg' | 'gradient' | 'minimal'
  title: string
  subtitle: string
  primaryCTA: string
  secondaryCTA: string
  showImage: boolean
  backgroundVideo: boolean
}> = ({ variant, title, subtitle, primaryCTA, secondaryCTA, showImage, backgroundVideo }) => {
  const baseClasses = "relative min-h-screen flex items-center justify-center overflow-hidden"
  
  if (variant === 'video-bg' && backgroundVideo) {
    return (
      <section className={`${baseClasses} text-white`}>
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-r from-indigo-900/80 to-purple-900/80" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">{subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
              aria-label={primaryCTA}
            >
              {primaryCTA}
            </button>
            <button 
              className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 rounded-lg font-semibold transition-all"
              aria-label={secondaryCTA}
            >
              {secondaryCTA}
            </button>
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'split') {
    return (
      <section className="min-h-screen flex items-center py-20 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              {title}
            </h1>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">{subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all"
                aria-label={primaryCTA}
              >
                {primaryCTA}
              </button>
              <button 
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 rounded-lg font-semibold transition-all"
                aria-label={secondaryCTA}
              >
                {secondaryCTA}
              </button>
            </div>
          </div>
          {showImage && (
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-white text-6xl" role="img" aria-label="Rocket">🚀</span>
              </div>
            </div>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className={`${baseClasses} bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-900`}>
      <div className="text-center max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
            aria-label={primaryCTA}
          >
            {primaryCTA}
          </button>
          <button 
            className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 rounded-lg font-semibold transition-all"
            aria-label={secondaryCTA}
          >
            {secondaryCTA}
          </button>
        </div>
      </div>
    </section>
  )
}

// 2. Navigation Header
const NavigationHeader: React.FC<{
  variant: 'simple' | 'centered' | 'mega' | 'sidebar'
  showLogo: boolean
  transparent: boolean
  sticky: boolean
}> = ({ variant, showLogo, transparent, sticky }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['Features', 'Pricing', 'About', 'Contact']

  const baseClasses = `w-full transition-all duration-300 z-50 ${
    sticky ? 'sticky top-0' : 'relative'
  } ${
    transparent && !isScrolled 
      ? 'bg-transparent' 
      : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700'
  }`

  const handleKeyDown = (event: React.KeyboardEvent, callback: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      callback()
    }
  }

  if (variant === 'mega') {
    return (
      <nav className={baseClasses} role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {showLogo && <EternalUILogo size="md" />}
            
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item} className="relative group">
                  <button 
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {item}
                  </button>
                  <div 
                    className="absolute top-full left-0 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-2"
                    role="menu"
                  >
                    <div className="p-4">
                      <div className="grid grid-cols-1 gap-2">
                        <a href="#" className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded text-sm" role="menuitem">Submenu Item</a>
                        <a href="#" className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded text-sm" role="menuitem">Another Item</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button className="hidden lg:block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium">
                Sign In
              </button>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                Get Started
              </button>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={(e) => handleKeyDown(e, () => setIsOpen(!isOpen))}
                className="lg:hidden p-2 text-gray-700 dark:text-gray-300"
                aria-label="Toggle mobile menu"
                aria-expanded={isOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div className="lg:hidden border-t border-gray-200 dark:border-gray-700" role="menu">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium"
                    role="menuitem"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    )
  }

  return (
    <nav className={baseClasses} role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {showLogo && <EternalUILogo size="md" />}
          
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
            <button className="hidden lg:block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium">
              Sign In
            </button>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
              Get Started
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              onKeyDown={(e) => handleKeyDown(e, () => setIsOpen(!isOpen))}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-300"
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700" role="menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium"
                  role="menuitem"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// 3. Feature Cards Grid
const FeatureCardsGrid: React.FC<{
  variant: 'cards' | 'icons' | 'minimal' | 'hover-effects'
  columns: 2 | 3 | 4
  showIcons: boolean
  animated: boolean
}> = ({ variant, columns, showIcons, animated }) => {
  const features = [
    { icon: '⚡', title: 'Lightning Fast', description: 'Optimized for speed and performance across all devices' },
    { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security with end-to-end encryption' },
    { icon: '📱', title: 'Mobile First', description: 'Designed for mobile with responsive layouts' },
    { icon: '🎨', title: 'Customizable', description: 'Fully customizable components and themes' },
    { icon: '🚀', title: 'Easy Deploy', description: 'One-click deployment to any platform' },
    { icon: '📊', title: 'Analytics', description: 'Built-in analytics and performance monitoring' }
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
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to build modern, scalable applications
          </p>
        </div>

        <div className={`grid ${gridClasses[columns]} gap-8`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group ${
                variant === 'cards'
                  ? 'bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all'
                  : variant === 'hover-effects'
                  ? 'p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl'
                  : 'p-6'
              } ${animated ? 'opacity-0 animate-fade-in' : ''}`}
              style={{ 
                animationDelay: animated ? `${index * 100}ms` : undefined,
                animationFillMode: animated ? 'forwards' : undefined
              }}
            >
              {showIcons && (
                <div className={`${
                  variant === 'icons' 
                    ? 'w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4'
                    : 'mb-4'
                }`}>
                  <span className="text-2xl" role="img" aria-label={feature.title}>{feature.icon}</span>
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
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </section>
  )
}

// 4. Pricing Tables
const PricingTables: React.FC<{
  variant: 'simple' | 'featured' | 'toggle' | 'comparison'
  billing: 'monthly' | 'yearly'
  showPopular: boolean
}> = ({ variant, billing, showPopular }) => {
  const [billingPeriod, setBillingPeriod] = useState(billing)

  const plans = [
    {
      name: 'Starter',
      price: { monthly: 29, yearly: 290 },
      description: 'Perfect for small teams getting started',
      features: ['Up to 5 team members', '10GB storage', 'Basic support', 'Core features'],
      popular: false
    },
    {
      name: 'Professional',
      price: { monthly: 99, yearly: 990 },
      description: 'Best for growing businesses',
      features: ['Up to 25 team members', '100GB storage', 'Priority support', 'Advanced features', 'Analytics'],
      popular: showPopular
    },
    {
      name: 'Enterprise',
      price: { monthly: 299, yearly: 2990 },
      description: 'For large organizations',
      features: ['Unlimited team members', '1TB storage', '24/7 support', 'Custom integrations', 'Advanced analytics', 'White label'],
      popular: false
    }
  ]

  const handleToggle = () => {
    setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')
  }

  const handleKeyDownToggle = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleToggle()
    }
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Choose the perfect plan for your needs
          </p>

          {variant === 'toggle' && (
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`${billingPeriod === 'monthly' ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={handleToggle}
                onKeyDown={handleKeyDownToggle}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                role="switch"
                aria-checked={billingPeriod === 'yearly'}
                aria-label="Toggle billing period"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`${billingPeriod === 'yearly' ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500'}`}>
                Yearly <span className="text-green-600">(Save 20%)</span>
              </span>
            </div>
          )}
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
                    ${plan.price[billingPeriod]}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    /{billingPeriod === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  aria-label={`Get started with ${plan.name} plan`}
                >
                  Get Started
                </button>
              </div>

              <ul className="mt-8 space-y-3" role="list">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
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

// 5. Testimonials Section
const TestimonialsSection: React.FC<{
  variant: 'carousel' | 'grid' | 'featured' | 'minimal'
  showImages: boolean
  animated: boolean
}> = ({ variant, showImages, animated }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior Designer',
      company: 'TechCorp',
      content: 'Eternal UI has transformed our design workflow. The component library is incredibly comprehensive and the code quality is outstanding.',
      avatar: '👩‍💻',
      rating: 5
    },
    {
      name: 'Elena Vasquez',
      role: 'Product Manager',
      company: 'StartupCo',
      content: 'Implementation was a breeze. Our time-to-market improved by 40% thanks to the ready-to-use components.',
      avatar: '👩‍💼',
      rating: 5
    },
    {
      name: 'James Park',
      role: 'CTO',
      company: 'ScaleUp Inc',
      content: 'Exceptional accessibility features and performance optimization. Our users love the improved experience.',
      avatar: '👨‍💼',
      rating: 5
    }
  ]

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  // Auto-advance carousel
  useEffect(() => {
    if (variant === 'carousel') {
      const interval = setInterval(nextTestimonial, 5000)
      return () => clearInterval(interval)
    }
  }, [variant, nextTestimonial])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ⭐
      </span>
    ))
  }

  if (variant === 'carousel') {
    return (
      <section className="py-20 bg-indigo-50 dark:bg-indigo-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Trusted by thousands of developers and designers worldwide
            </p>
          </div>

          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <div className="text-center">
                {showImages && (
                  <div className="w-16 h-16 mx-auto mb-4 text-4xl flex items-center justify-center">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                )}
                
                <div className="flex justify-center mb-4">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>
                
                <blockquote className="text-xl text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'grid') {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Loved by Developers & Designers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what our community has to say
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 ${
                  animated ? 'opacity-0 animate-fade-in' : ''
                }`}
                style={{ 
                  animationDelay: animated ? `${index * 200}ms` : undefined,
                  animationFillMode: animated ? 'forwards' : undefined
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  {showImages && (
                    <div className="w-12 h-12 text-2xl flex items-center justify-center">
                      {testimonial.avatar}
                    </div>
                  )}
                  <div className="flex">
                    {renderStars(testimonial.rating)}
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

  // Featured variant (single large testimonial)
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          {renderStars(testimonials[0].rating)}
        </div>
        
        <blockquote className="text-2xl md:text-3xl font-light mb-8 italic">
          "{testimonials[0].content}"
        </blockquote>
        
        {showImages && (
          <div className="w-20 h-20 mx-auto mb-4 text-5xl flex items-center justify-center">
            {testimonials[0].avatar}
          </div>
        )}
        
        <div>
          <h4 className="text-xl font-semibold">{testimonials[0].name}</h4>
          <p className="text-indigo-200">
            {testimonials[0].role} at {testimonials[0].company}
          </p>
        </div>
      </div>
    </section>
  )
}

// 6. Contact Section with Form
const ContactSection: React.FC<{
  variant: 'simple' | 'split' | 'centered' | 'modal'
  showMap: boolean
  showSocial: boolean
}> = ({ variant, showMap, showSocial }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000)
  }

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'hello@eternalui.com' },
    { icon: '📞', label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: '📍', label: 'Address', value: '123 Design Street, Tech City, TC 12345' },
    { icon: '⏰', label: 'Hours', value: 'Mon-Fri 9AM-6PM PST' }
  ]

  const socialLinks = [
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' },
    { name: 'GitHub', icon: '🐙', href: '#' },
    { name: 'Discord', icon: '💬', href: '#' }
  ]

  if (variant === 'split') {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Ready to transform your design workflow? Let's talk about how Eternal UI can help your team.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-2xl mr-4" role="img" aria-label={info.label}>
                      {info.icon}
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {info.label}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {showSocial && (
                <div className="mt-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Follow Us
                  </h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
                        aria-label={social.name}
                      >
                        <span className="text-lg">{social.icon}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white resize-vertical"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 transform hover:scale-[1.02]'
                  } text-white`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitted && (
                  <div className="p-4 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
                    <p className="text-green-800 dark:text-green-200 text-center">
                      ✅ Message sent successfully! We'll get back to you soon.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Map placeholder */}
          {showMap && (
            <div className="mt-16">
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl mb-2 block" role="img" aria-label="Map">🗺️</span>
                  <p className="text-gray-600 dark:text-gray-400">Interactive Map Would Be Here</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    )
  }

  // Centered variant
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Have a project in mind? We'd love to hear from you.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name-centered" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name-centered"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email-centered" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email-centered"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject-centered" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject-centered"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label htmlFor="message-centered" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                id="message-centered"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white resize-vertical"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 transform hover:scale-[1.02]'
              } text-white`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>

            {submitted && (
              <div className="p-4 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
                <p className="text-green-800 dark:text-green-200 text-center">
                  ✅ Thank you! Your message has been sent successfully.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

// 7. Footer Section
const FooterSection: React.FC<{
  variant: 'simple' | 'comprehensive' | 'minimal'
  showNewsletter: boolean
  showSocial: boolean
}> = ({ variant, showNewsletter, showSocial }) => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: ['Features', 'Pricing', 'Security', 'Roadmap', 'API'],
    company: ['About', 'Blog', 'Careers', 'Contact', 'Press'],
    resources: ['Documentation', 'Help Center', 'Community', 'Tutorials', 'Templates'],
    legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Licenses']
  }

  const socialLinks = [
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'GitHub', icon: '🐙', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' },
    { name: 'Discord', icon: '💬', href: '#' },
    { name: 'YouTube', icon: '📺', href: '#' }
  ]

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    // Simulate newsletter subscription
    await new Promise(resolve => setTimeout(resolve, 500))
    setSubscribed(true)
    setEmail('')
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubscribed(false), 3000)
  }

  if (variant === 'minimal') {
    return (
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <EternalUILogo size="sm" theme="light" />
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              {showSocial && (
                <div className="flex space-x-4">
                  {socialLinks.slice(0, 3).map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      aria-label={social.name}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </a>
                  ))}
                </div>
              )}
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                © {currentYear} Eternal UI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <EternalUILogo size="md" theme="dark" showText={true} />
            <p className="text-gray-300 mt-4 max-w-sm">
              Build beautiful, accessible, and performant web applications with our comprehensive component library and design system.
            </p>
            
            {showSocial && (
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors group"
                    aria-label={social.name}
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4 capitalize">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter section */}
        {showNewsletter && (
          <div className="border-t border-gray-800 mt-12 pt-12">
            <div className="max-w-md">
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-4">
                Get the latest updates, feature releases, and design tips delivered straight to your inbox.
              </p>
              
              {subscribed ? (
                <div className="p-4 bg-green-900 border border-green-700 rounded-lg">
                  <p className="text-green-200 text-center">
                    ✅ Successfully subscribed! Thank you for joining our community.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                    required
                  />
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-r-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Bottom section */}
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
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// 8. Call-to-Action Section
const CTASection: React.FC<{
  variant: 'simple' | 'split' | 'gradient' | 'image-bg'
  title: string
  subtitle: string
  primaryCTA: string
  secondaryCTA?: string
  showStats: boolean
}> = ({ variant, title, subtitle, primaryCTA, secondaryCTA, showStats }) => {
  const stats = [
    { value: '50K+', label: 'Developers' },
    { value: '2M+', label: 'Components Used' },
    { value: '99.9%', label: 'Uptime' },
    { value: '4.9/5', label: 'Rating' }
  ]

  if (variant === 'gradient') {
    return (
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
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

  if (variant === 'split') {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {subtitle}
              </p>
              
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
            
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <div className="text-center text-white">
                  <span className="text-6xl mb-4 block" role="img" aria-label="Rocket">🚀</span>
                  <p className="text-xl font-semibold">Ready to Launch?</p>
                </div>
              </div>
              
              {showStats && (
                <div className="absolute -bottom-6 left-6 right-6 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4">
                    {stats.slice(0, 2).map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Simple variant
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

// =================================================================
// DEMO COMPONENT - Interactive Showcase
// =================================================================

const ModernWebsiteDemo: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [darkMode, setDarkMode] = useState(false)

  const sections = [
    { id: 'hero', name: 'Hero Section', icon: '🎯' },
    { id: 'navigation', name: 'Navigation', icon: '🧭' },
    { id: 'features', name: 'Features', icon: '⚡' },
    { id: 'pricing', name: 'Pricing', icon: '💰' },
    { id: 'testimonials', name: 'Testimonials', icon: '💬' },
    { id: 'contact', name: 'Contact', icon: '📧' },
    { id: 'cta', name: 'Call to Action', icon: '🚀' },
    { id: 'footer', name: 'Footer', icon: '📄' }
  ]

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'hero':
        return (
          <HeroSection
            variant="centered"
            title="Build Amazing Websites"
            subtitle="Create stunning, responsive websites with our modern component library"
            primaryCTA="Get Started Free"
            secondaryCTA="View Examples"
            showImage={true}
            backgroundVideo={false}
          />
        )
      case 'navigation':
        return (
          <NavigationHeader
            variant="simple"
            showLogo={true}
            transparent={false}
            sticky={true}
          />
        )
      case 'features':
        return (
          <FeatureCardsGrid
            variant="cards"
            columns={3}
            showIcons={true}
            animated={true}
          />
        )
      case 'pricing':
        return (
          <PricingTables
            variant="toggle"
            billing="monthly"
            showPopular={true}
          />
        )
      case 'testimonials':
        return (
          <TestimonialsSection
            variant="carousel"
            showImages={true}
            animated={true}
          />
        )
      case 'contact':
        return (
          <ContactSection
            variant="split"
            showMap={true}
            showSocial={true}
          />
        )
      case 'cta':
        return (
          <CTASection
            variant="gradient"
            title="Ready to Get Started?"
            subtitle="Join thousands of developers building amazing websites with Eternal UI"
            primaryCTA="Start Building"
            secondaryCTA="Learn More"
            showStats={true}
          />
        )
      case 'footer':
        return (
          <FooterSection
            variant="comprehensive"
            showNewsletter={true}
            showSocial={true}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} transition-colors duration-300`}>
      {/* Control Panel */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <EternalUILogo size="sm" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Modern Website Components
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Dark mode toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                <span className="text-lg">
                  {darkMode ? '☀️' : '🌙'}
                </span>
              </button>
              
              {/* Section selector */}
              <select
                value={activeSection}
                onChange={(e) => setActiveSection(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.icon} {section.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Section tabs */}
          <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeSection === section.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span>{section.icon}</span>
                <span>{section.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pt-32 bg-white dark:bg-gray-900 transition-colors duration-300">
        {renderActiveSection()}
      </div>

      {/* Component info panel */}
      <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-sm">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {sections.find(s => s.id === activeSection)?.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          This component is fully responsive, accessible, and supports dark mode. Built with React TypeScript and Tailwind CSS.
        </p>
        <div className="flex space-x-2">
          <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs rounded">
            React
          </span>
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
            TypeScript
          </span>
          <span className="px-2 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs rounded">
            Tailwind
          </span>
        </div>
      </div>
    </div>
  )
}

export default ModernWebsiteDemo;