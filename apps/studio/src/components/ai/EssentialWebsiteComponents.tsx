import React, { useState, useEffect } from 'react'
import { 
  Star, 
  ArrowRight, 
  Check, 
  Menu, 
  X, 
  Play, 
  Shield, 
  Zap, 
  Users, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  ChevronDown,
  ChevronUp,
  Heart,
  Share2,
  MessageCircle,
  Eye,
  Calendar,
  Clock,
  Download,
  Search,
  Filter,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  User,
  Settings,
  LogOut,
  Sun,
  Moon
} from 'lucide-react'

// Enhanced Newsletter Component with Analytics
const NewsletterSection = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
      setEmail('')
    }, 1500)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 dark:from-indigo-800 dark:via-indigo-900 dark:to-purple-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10 dark:bg-black/20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stay Ahead of the Curve
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Get weekly insights on design trends, development tips, and exclusive updates 
            from the Eternal UI team.
          </p>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 focus:outline-none focus:ring-4 focus:ring-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
              <p className="text-sm text-indigo-200 mt-4">
                Join 12,000+ creators. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
                <Check className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Welcome aboard!
                </h3>
                <p className="text-indigo-100">
                  Check your inbox for a confirmation email. 
                  Your first newsletter arrives next Tuesday.
                </p>
              </div>
            </div>
          )}
          
          {/* Social Proof */}
          <div className="mt-12 flex items-center justify-center space-x-6 text-indigo-200">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>12,000+ subscribers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 fill-current" />
              <span>4.9/5 rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>150+ countries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Advanced Testimonials Carousel
const TestimonialsCarousel = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Lead Designer at TechCorp",
      company: "TechCorp",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b550?w=150",
      content: "Eternal UI has completely transformed our design workflow. We're shipping features 3x faster and our designs are more consistent than ever.",
      rating: 5,
      metric: "3x faster shipping"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Founder & CEO",
      company: "StartupXYZ",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      content: "As a non-technical founder, Eternal UI gave me the power to prototype and iterate without depending on developers. Game changer!",
      rating: 5,
      metric: "90% dev time saved"
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Frontend Developer",
      company: "DesignCo",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      content: "The code export quality is incredible. Clean, readable React code that I'd write myself. No more fighting with page builder spaghetti!",
      rating: 5,
      metric: "100% clean code"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Loved by 50,000+ Creators
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Join thousands of designers, developers, and entrepreneurs who are building 
            the future with Eternal UI.
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial */}
          <div className="bg-white dark:bg-black rounded-2xl shadow-2xl p-8 md:p-12 mb-8 transition-all duration-500">
            <div className="flex items-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-8 leading-relaxed">
              "{testimonials[activeTestimonial].content}"
            </blockquote>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-lg">
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {testimonials[activeTestimonial].role}
                  </div>
                  <div className="text-indigo-600 dark:text-indigo-400 font-medium">
                    {testimonials[activeTestimonial].company}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {testimonials[activeTestimonial].metric}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  improvement
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonial
                    ? 'bg-indigo-600 w-8'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {[
            { label: 'Active Users', value: '50,000+' },
            { label: 'Websites Created', value: '200,000+' },
            { label: 'Code Lines Exported', value: '50M+' },
            { label: 'User Satisfaction', value: '98%' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Advanced Blog Section with Filtering
const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const categories = ['all', 'design', 'development', 'tutorial', 'news']
  
  const posts = [
    {
      id: 1,
      title: "Building Responsive Layouts with AI Assistance",
      excerpt: "Learn how Eternal UI's AI engine helps you create perfect responsive designs without the guesswork.",
      category: "tutorial",
      author: "Sarah Chen",
      authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b550?w=150",
      publishedAt: "2024-01-15",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
      views: 2800,
      likes: 145
    },
    {
      id: 2,
      title: "The Future of Visual Development",
      excerpt: "Exploring how AI-powered tools are revolutionizing the way we build digital experiences.",
      category: "design",
      author: "Marcus Rodriguez",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      publishedAt: "2024-01-12",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      views: 3200,
      likes: 210
    },
    {
      id: 3,
      title: "Exporting Clean React Code: Best Practices",
      excerpt: "Tips and tricks for generating production-ready React components from your designs.",
      category: "development",
      author: "Emily Watson",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      publishedAt: "2024-01-10",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe472c2ef?w=800",
      views: 1950,
      likes: 89
    }
  ]

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  return (
    <section className="py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Latest from Our Blog
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Stay updated with the latest design trends, development tips, and platform updates.
          </p>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Blog Posts */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'space-y-6'
        }`}>
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className={`group cursor-pointer transition-all duration-300 hover:transform hover:scale-105 ${
                viewMode === 'list' ? 'flex space-x-6 bg-gray-50 dark:bg-gray-900 rounded-xl p-6' : ''
              }`}
            >
              <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full'}`}>
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {post.author}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-200">
            Load More Articles
          </button>
        </div>
      </div>
    </section>
  )
}

// Enhanced FAQ Section with Search
const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqs = [
    {
      id: 1,
      category: "Getting Started",
      question: "How do I get started with Eternal UI?",
      answer: "Getting started is simple! Sign up for a free account, choose a template or start from scratch, and begin building with our intuitive drag-and-drop interface. Our onboarding guide will walk you through the basics in under 5 minutes."
    },
    {
      id: 2,
      category: "AI Features",
      question: "How does the AI layout suggestion feature work?",
      answer: "Our AI analyzes your content, brand guidelines, and current design trends to suggest optimal layouts. It considers factors like readability, conversion optimization, mobile responsiveness, and accessibility to provide intelligent recommendations."
    },
    {
      id: 3,
      category: "Code Export",
      question: "What frameworks can I export my designs to?",
      answer: "Eternal UI supports export to React, Vue.js, Svelte, Angular, and vanilla HTML/CSS. The exported code is clean, production-ready, and follows best practices for each framework."
    },
    {
      id: 4,
      category: "Pricing",
      question: "Is there a free plan available?",
      answer: "Yes! Our free plan includes access to basic components, 3 projects, and community support. Perfect for getting started and small personal projects."
    },
    {
      id: 5,
      category: "Integration",
      question: "Can I integrate with my existing development workflow?",
      answer: "Absolutely! Eternal UI integrates with GitHub, GitLab, Figma, and popular CI/CD pipelines. You can sync your designs, export code directly to repositories, and maintain version control."
    },
    {
      id: 6,
      category: "Support",
      question: "What kind of support do you offer?",
      answer: "We offer comprehensive support including documentation, video tutorials, community forums, and email support. Pro and Enterprise plans include priority support and dedicated customer success managers."
    }
  ]

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Everything you need to know about Eternal UI. Can't find what you're looking for? 
            <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline ml-1">
              Contact our support team
            </a>.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1">
                      {faq.category}
                    </div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {faq.question}
                    </div>
                  </div>
                  {openItems.includes(faq.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </div>
              </button>
              
              {openItems.includes(faq.id) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg">
              No FAQs found matching "{searchTerm}"
            </div>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

// Enhanced Pricing Component with Annual/Monthly Toggle
const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for getting started',
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        'Up to 3 projects',
        'Basic components library',
        'Community support',
        'HTML/CSS export',
        'Basic templates'
      ],
      limitations: [
        'No AI features',
        'No team collaboration',
        'Eternal UI branding'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For serious creators',
      monthlyPrice: 29,
      annualPrice: 20,
      features: [
        'Unlimited projects',
        'AI layout suggestions',
        'All framework exports',
        'Premium components',
        'Custom themes',
        'Priority support',
        'Team collaboration (3 seats)',
        'Advanced analytics'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For teams and organizations',
      monthlyPrice: 99,
      annualPrice: 79,
      features: [
        'Everything in Pro',
        'Unlimited team members',
        'Custom AI training',
        'White-label solution',
        'SSO integration',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>

          {/* Annual/Monthly Toggle */}
          <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-lg transition-all duration-200 ${
                !isAnnual
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-lg transition-all duration-200 relative ${
                isAnnual
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                30% off
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative bg-white dark:bg-gray-900 rounded-2xl border-2 transition-all duration-300 ${
                plan.popular
                  ? 'border-indigo-500 shadow-2xl scale-105'
                  : hoveredPlan === plan.id
                  ? 'border-indigo-300 dark:border-indigo-700 shadow-xl scale-102'
                  : 'border-gray-200 dark:border-gray-700 shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {plan.description}
                  </p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      /month
                    </span>
                    {isAnnual && plan.monthlyPrice > 0 && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span className="line-through">${plan.monthlyPrice}/month</span>
                        <span className="text-green-600 dark:text-green-400 ml-2">
                          Save ${((plan.monthlyPrice - plan.annualPrice) * 12)}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    What's included:
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Limitations:
                      </h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {limitation}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Need a custom solution?
            </h3>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              We work with enterprise teams to create custom pricing and features 
              that fit your specific needs.
            </p>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Enhanced Footer with Newsletter Integration
const FooterSection = () => {
  const [email, setEmail] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  const footerLinks = {
    product: [
      { name: 'Features', href: '#' },
      { name: 'Templates', href: '#' },
      { name: 'Components', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'Changelog', href: '#' }
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Partners', href: '#' }
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Tutorials', href: '#' },
      { name: 'Community', href: '#' },
      { name: 'Support', href: '#' },
      { name: 'Status', href: '#' }
    ],
    legal: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'Security', href: '#' },
      { name: 'Cookies', href: '#' }
    ]
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <footer className="bg-gray-900 dark:bg-black text-white transition-colors duration-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Stay in the loop
              </h3>
              <p className="text-gray-400 text-lg">
                Get the latest updates, tutorials, and exclusive offers delivered 
                straight to your inbox.
              </p>
            </div>
            <div>
              <form onSubmit={handleNewsletterSubmit} className="flex space-x-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 bg-gray-800 dark:bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-sm text-gray-500 mt-3">
                Join 25,000+ subscribers. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Eternal UI</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              The AI-powered visual website builder that exports clean code. 
              Build stunning websites 10x faster than traditional tools.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 bg-gray-800 dark:bg-gray-900 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a href="#" className="p-2 bg-gray-800 dark:bg-gray-900 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 dark:bg-gray-900 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-gray-700 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Eternal UI. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>All systems operational</span>
            </div>
            <div className="text-sm text-gray-400">
              Built with ❤️ in San Francisco
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main Component Showcase
const EssentialWebsiteComponents = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('newsletter')

  const sections = [
    { id: 'newsletter', name: 'Newsletter', icon: '📧', component: NewsletterSection },
    { id: 'testimonials', name: 'Testimonials', icon: '⭐', component: TestimonialsCarousel },
    { id: 'blog', name: 'Blog', icon: '📝', component: BlogSection },
    { id: 'faq', name: 'FAQ', icon: '❓', component: FAQSection },
    { id: 'pricing', name: 'Pricing', icon: '💰', component: PricingSection },
    { id: 'footer', name: 'Footer', icon: '🔗', component: FooterSection }
  ]

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || NewsletterSection

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Essential Components
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Section Tabs */}
          <div className="flex space-x-1 pb-4 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
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
      <div className="pt-32 bg-white dark:bg-black transition-colors duration-300">
        <ActiveComponent />
      </div>

      {/* Component info panel */}
      <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-sm">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {sections.find(s => s.id === activeSection)?.name} Component
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Production-ready component with dark mode, responsive design, and accessibility features. 
          Built with React TypeScript and Tailwind CSS using the new indigo color scheme.
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
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded">
            Indigo Theme
          </span>
        </div>
      </div>
    </div>
  )
}

export default EssentialWebsiteComponents;