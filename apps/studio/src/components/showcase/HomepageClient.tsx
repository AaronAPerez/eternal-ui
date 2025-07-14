'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  ArrowRight, 
  Play, 
  Zap, 
  Code, 
  Layers, 
  Rocket, 
  Users, 
  Star,
  Check,
  Download,
  Palette,
  Smartphone,
  Globe,
  Shield,
  TrendingUp,
  ChevronRight,
  ArrowUpRight,
  Moon,
  Sun,
  Sparkles,
  Eye,
  Clock,
  Award
} from 'lucide-react'

// Import the custom Eternal UI Logo
import { EternalUILogo } from '@/components/Logo/eternal-ui-logo'

// Theme Hook for Dark Mode
function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    
    // Apply theme to document
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return { theme, toggleTheme }
}

// Enhanced Button component with animations
function Button({ children, className = '', variant = 'default', size = 'default', asChild = false, ...props }: any) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform hover:scale-105 active:scale-95 group'
  
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl dark:bg-blue-500 dark:hover:bg-blue-600',
    outline: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-500',
    secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700',
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600'
  }
  
  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  if (asChild) {
    return <span className={classes} {...props}>{children}</span>
  }
  
  return <button className={classes} {...props}>{children}</button>
}

// Enhanced Badge component
function Badge({ children, className = '', variant = 'default' }: any) {
  const variants = {
    default: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700',
    outline: 'border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700'
  }
  
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 hover:scale-105 animate-fade-in ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

// Enhanced Card component with hover effects
function Card({ children, className = '', ...props }: any) {
  return (
    <div className={`rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:scale-105 group ${className}`} {...props}>
      {children}
    </div>
  )
}

// Animated Counter component
function AnimatedCounter({ value, suffix = '', duration = 2000, delay = 0 }: any) {
  const [current, setCurrent] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const timer = setTimeout(() => {
      let start = 0
      const increment = value / (duration / 16)
      
      const counter = setInterval(() => {
        start += increment
        if (start >= value) {
          setCurrent(value)
          clearInterval(counter)
        } else {
          setCurrent(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(counter)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, duration, delay, isVisible])

  return (
    <div ref={ref} className="transition-all duration-700 transform animate-fade-in-up">
      {current.toLocaleString()}{suffix}
    </div>
  )
}

// Intersection Observer Hook
function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, ...options }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

// Theme Toggle Button
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
      ) : (
        <Sun className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
      )}
    </button>
  )
}

// Floating Animation Component
function FloatingElement({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <div 
      className="animate-float"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Stats data - Updated with realistic pre-launch metrics
const stats = [
  { label: 'Development Progress', value: 85, suffix: '%', icon: Code },
  { label: 'Components Ready', value: 150, suffix: '+', icon: Layers },
  { label: 'Framework Exports', value: 4, suffix: '', icon: Download },
  { label: 'Performance Score', value: 99, suffix: '/100', icon: Zap }
]

// Features data with enhanced descriptions
const features = [
  {
    icon: Zap,
    title: 'AI-Powered Layouts',
    description: 'Smart layout suggestions with 95% accuracy using advanced machine learning algorithms that understand design principles',
    badge: 'AI',
    gradient: 'from-yellow-400 to-orange-500',
    stats: '95% accuracy'
  },
  {
    icon: Code,
    title: 'Clean Code Export',
    description: 'Export production-ready, optimized code to React, Vue, Svelte, or Angular with TypeScript support',
    badge: 'Export',
    gradient: 'from-blue-400 to-purple-500',
    stats: '4 frameworks'
  },
  {
    icon: Layers,
    title: 'Component Library',
    description: '500+ pre-built, customizable components with accessibility built-in and performance optimized',
    badge: 'Library',
    gradient: 'from-green-400 to-teal-500',
    stats: '500+ components'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Responsive designs that work perfectly on all devices with touch-friendly interactions',
    badge: 'Responsive',
    gradient: 'from-pink-400 to-red-500',
    stats: '100% responsive'
  },
  {
    icon: Globe,
    title: 'Global CDN',
    description: 'Lightning-fast loading with 99.9% uptime worldwide and edge computing optimization',
    badge: 'Performance',
    gradient: 'from-indigo-400 to-blue-500',
    stats: '99.9% uptime'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with enterprise-grade security measures and data encryption',
    badge: 'Security',
    gradient: 'from-purple-400 to-indigo-500',
    stats: 'SOC 2 compliant'
  }
]

/**
 * Enhanced Homepage Client Component with Eternal UI Logo
 */
export default function HomepageClient() {
  const [activeDemo, setActiveDemo] = useState<'visual' | 'code' | 'export'>('visual')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const heroRef = useIntersectionObserver({ threshold: 0.1 })
  const statsRef = useIntersectionObserver({ threshold: 0.1 })
  const featuresRef = useIntersectionObserver({ threshold: 0.1 })

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 25,
        y: (e.clientY - window.innerHeight / 2) / 25
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      
      {/* Enhanced Theme Toggle - Floating */}
      {/* <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div> */}
      
      {/* Hero Section with Enhanced Animations */}
      <section 
        ref={heroRef.ref}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black/90 dark:to-black/80 transition-all duration-1000"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse-slow"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl animate-pulse-slow"
            style={{
              transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
              animationDelay: '1s'
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-22 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Hero Content with Staggered Animations */}
            <div className={`space-y-8 ${heroRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              
              {/* Enhanced Badges with Animations */}
              <div className="flex items-center space-x-4">
                <Badge variant="default" className="animate-slide-in-left">
                  <Zap className="w-3 h-3 mr-1 animate-pulse" />
                  AI-Powered
                </Badge>
                <Badge variant="success" className="animate-slide-in-right animation-delay-200">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  85% Cost Savings
                </Badge>
              </div>
              
              {/* Enhanced Headline with Gradient Animation */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight animate-fade-in-up animation-delay-300">
                  Build Websites{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x bg-300%">
                    10x Faster
                  </span>
                  {' '}with AI
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg animate-fade-in-up animation-delay-500">
                  Create stunning, responsive websites with our AI-powered visual builder. 
                  Export clean code to any framework. No vendor lock-in, no monthly fees.
                </p>
              </div>
              
              {/* Enhanced CTA Buttons with Eternal UI Logo */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-700">
                <Button 
                  variant="gradient"
                  size="lg"
                  className="group relative overflow-hidden"
                  asChild
                >
                  <Link href="/builder" className="flex items-center space-x-2">
                    {/* <EternalUILogo size="xs" variant="mono" className="text-white" /> */}
                    <span>Start Building Free</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
                  </Link>
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="group"
                  asChild
                >
                  <Link href="/demo" className="flex items-center space-x-2">
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>Watch Demo</span>
                  </Link>
                </Button>
              </div>
              
              {/* Authentic Features List */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 animate-fade-in-up animation-delay-1000">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="font-medium">Free forever plan</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">No credit card required</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Code className="w-4 h-4 text-purple-500" />
                  <span className="font-medium">Export clean code</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced Hero Visual with Interactive Elements */}
            <div className={`relative ${heroRef.isVisible ? 'animate-fade-in-right animation-delay-400' : 'opacity-0'}`}>
              
              {/* Floating Elements with Eternal UI Branding */}
              <FloatingElement delay={0}>
                <div className="absolute -top-6 -left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 z-30">
                  <EternalUILogo size="xs" variant="mono" showText={false} className="text-white" />
                  <span>Live Demo</span>
                </div>
              </FloatingElement>
              
              <FloatingElement delay={500}>
                <div className="absolute -top-6 -right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-30">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Real-time
                </div>
              </FloatingElement>
              
              {/* Enhanced Demo Tabs */}
              <div className="mb-4">
                <div className="flex space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg backdrop-blur-sm">
                  {[
                    { id: 'visual', label: 'Visual Builder', icon: Palette },
                    { id: 'code', label: 'Code View', icon: Code },
                    { id: 'export', label: 'Export', icon: Download }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveDemo(tab.id as any)}
                      className={`
                        flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105
                        ${activeDemo === tab.id
                          ? 'bg-white dark:bg-indigo-700 text-gray-900 dark:text-white shadow-lg scale-105'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
                        }
                      `}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Enhanced Demo Interface */}
              <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-3xl">
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse animation-delay-100" />
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse animation-delay-200" />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                      eternal-ui.com/builder
                    </div>
                  </div>
                </div>
                
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-8 relative overflow-hidden">
                  
                  {/* Background Animation */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                  
                  {activeDemo === 'visual' && (
                    <div className="h-full flex items-center justify-center animate-fade-in">
                      <div className="text-center space-y-4">
                        <div className="relative">
                          <EternalUILogo size="lg" variant="gradient" showText={false} className="mx-auto animate-pulse-glow" />
                          <div className="absolute -top-2 -right-2">
                            <Sparkles className="w-6 h-6 text-yellow-400 animate-spin-slow" />
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                          Interactive drag & drop builder
                        </p>
                        <div className="flex justify-center space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                              style={{ animationDelay: `${i * 200}ms` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeDemo === 'code' && (
                    <div className="h-full bg-black rounded-lg p-4 overflow-hidden animate-fade-in">
                      <div className="space-y-2 font-mono text-sm">
                        <div className="text-green-400 animate-slide-in-left">import React from 'react'</div>
                        <div className="text-blue-400 animate-slide-in-left animation-delay-100">import { EternalUILogo } from '@/components'</div>
                        <div className="text-blue-400 animate-slide-in-left animation-delay-200">export default function Component() </div>
                        <div className="text-gray-300 ml-4 animate-slide-in-left animation-delay-300">return (</div>
                        <div className="text-yellow-400 ml-8 animate-slide-in-left animation-delay-400">&lt;div className="hero-section"&gt;</div>
                        <div className="text-purple-400 ml-12 animate-slide-in-left animation-delay-500">&lt;EternalUILogo size="lg" /&gt;</div>
                        <div className="text-purple-400 ml-12 animate-slide-in-left animation-delay-600">&lt;h1&gt;Beautiful Website&lt;/h1&gt;</div>
                        <div className="text-yellow-400 ml-8 animate-slide-in-left animation-delay-700">&lt;/div&gt;</div>
                        <div className="text-gray-300 ml-4 animate-slide-in-left animation-delay-800">)</div>
                        <div className="text-blue-400 animate-slide-in-left animation-delay-900"></div>
                      </div>
                    </div>
                  )}
                  
                  {activeDemo === 'export' && (
                    <div className="h-full flex items-center justify-center animate-fade-in">
                      <div className="text-center space-y-4">
                        <div className="relative">
                          <Download className="w-16 h-16 mx-auto text-green-500 animate-bounce" />
                          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                          Export to any framework
                        </p>
                        <div className="flex space-x-4 justify-center">
                          {['React', 'Vue', 'Svelte', 'Angular'].map((framework, index) => (
                            <Badge 
                              key={framework}
                              className="animate-slide-in-up"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              {framework}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section 
        ref={statsRef.ref}
        className="py-16 bg-gray-50 dark:bg-gray-900/50 transition-all duration-1000"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className={`text-center group ${statsRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-8 h-8 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2000}
                    delay={index * 200}
                  />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section 
        ref={featuresRef.ref}
        className="py-24 bg-white dark:bg-black transition-all duration-1000"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Enhanced Section Header */}
          <div className={`text-center max-w-3xl mx-auto mb-16 ${featuresRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <Badge className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Features
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Everything You Need to Build
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x bg-300%">
                {' '}Amazing Websites
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              From AI-powered design to clean code export, we've got every aspect of web development covered.
            </p>
          </div>
          
          {/* Enhanced Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className={`p-6 cursor-pointer ${featuresRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="space-y-4">
                  
                  {/* Enhanced Icon with Gradient Background */}
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} p-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`absolute inset-0 w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} opacity-20 group-hover:animate-ping`} />
                  </div>
                  
                  {/* Enhanced Badge and Title */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {feature.badge}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* Feature Stats */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {feature.stats}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Comparison Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50 transition-all duration-1000">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="success" className="mb-4">
              <TrendingUp className="w-3 h-3 mr-1" />
              Comparison
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Eternal UI Over
              <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                {' '}The Competition?
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See how we stack up against other popular website builders.
            </p>
          </div>
          
          {/* Enhanced Comparison Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Framer', price: '$20/mo', features: ['❌ No AI', '✅ Export', '❌ Expensive'], popular: false },
              { name: 'Webflow', price: '$14/mo', features: ['❌ No AI', '✅ Export', '❌ Complex'], popular: false },
              { name: 'Eternal UI', price: 'Free', features: ['✅ AI-Powered', '✅ Clean Export', '✅ No Lock-in'], popular: true }
            ].map((competitor, index) => (
              <Card 
                key={competitor.name}
                className={`p-6 text-center relative ${competitor.popular ? 'ring-2 ring-blue-500 dark:ring-blue-400 scale-105' : ''} animate-fade-in-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {competitor.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge variant="default" className="bg-blue-500 text-white">
                      <EternalUILogo size="xs" variant="mono" showText={false} className="text-white mr-1" />
                      Best Choice
                    </Badge>
                  </div>
                )}
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{competitor.name}</h3>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{competitor.price}</div>
                  
                  <div className="space-y-2">
                    {competitor.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="text-sm text-gray-600 dark:text-gray-300">
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant={competitor.popular ? 'gradient' : 'outline'}
                    className="w-full"
                  >
                    {competitor.popular ? 'Start Free' : 'Learn More'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white relative overflow-hidden animate-gradient-x bg-300%">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Enhanced CTA Content with Eternal UI Logo */}
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Featured Logo */}
              <div className="flex justify-center animate-fade-in-up">
                <EternalUILogo size="lg" variant="mono" className="text-white animate-pulse-glow" />
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold animate-fade-in-up animation-delay-200">
                Ready to Build the Future?
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
                Experience the future of website building with our revolutionary visual builder. 
                Join the early access program and start creating today.
              </p>
            </div>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-500">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                asChild
              >
                <Link href="/builder" className="flex items-center space-x-2">
                  <EternalUILogo size="xs" variant="gradient" showText={false} />
                  <span>Get Early Access</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-blue-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
                </Link>
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 group"
                asChild
              >
                <Link href="/contact" className="flex items-center space-x-2">
                  <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Talk to Sales</span>
                </Link>
              </Button>
            </div>
            
            {/* Enhanced Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-blue-100 pt-8 animate-fade-in-up animation-delay-700">
              {[
                { icon: Check, text: 'Free forever plan' },
                { icon: Shield, text: 'No credit card required' },
                { icon: Code, text: 'Export clean code' },
                { icon: Zap, text: 'Early access benefits' }
              ].map((indicator, index) => (
                <div 
                  key={indicator.text}
                  className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${700 + index * 100}ms` }}
                >
                  <indicator.icon className="w-4 h-4" />
                  <span>{indicator.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}