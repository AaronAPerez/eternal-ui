import React, { useState, useEffect, useRef } from 'react'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Maximize,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Bookmark,
  User,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  AlertCircle,
  CheckCircle,
  Info,
  Upload,
  Download,
  Eye,
  EyeOff,
  MessageSquare,
  Send,
  Image as ImageIcon,
  Video,
  FileText,
  Paperclip,
  Mic,
  MicOff,
  Settings,
  Bell,
  Moon,
  Sun,
  Globe,
  Shield,
  Zap,
  TrendingUp,
  Award,
  Target,
  Coffee,
  Briefcase,
  Users,
  Building
} from 'lucide-react'

// Enhanced Video Player Component
const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white dark:bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full h-64 object-cover"
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          poster="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800"
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
        </video>
        
        {/* Video Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="p-2 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>
            
            <div className="flex-1">
              <div className="w-full bg-white/20 rounded-full h-1">
                <div
                  className="bg-indigo-500 h-1 rounded-full transition-all"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
            </div>
            
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            
            <button
              onClick={toggleMute}
              className="p-2 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
            
            <button className="p-2 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition-colors">
              <Maximize className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Product Demo: AI-Powered Website Builder
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Watch how Eternal UI's AI engine automatically generates perfect layouts 
          and exports clean, production-ready code.
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">12.5K views</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">3 min</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Heart className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Share2 className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Bookmark className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced E-commerce Product Card
const ProductCard = () => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)

  const sizes = ['XS', 'S', 'M', 'L', 'XL']
  const images = [
    'https://images.unsplash.com/photo-1556821324-5d7b9c8b8d2a?w=400',
    'https://images.unsplash.com/photo-1556821324-5d7b9c8b8d2a?w=400',
    'https://images.unsplash.com/photo-1556821324-5d7b9c8b8d2a?w=400'
  ]

  return (
    <div className="bg-white dark:bg-black rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 group">
      <div className="relative">
        <img
          src={images[0]}
          alt="Premium Designer T-Shirt"
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
            25% OFF
          </span>
          <span className="bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded">
            Best Seller
          </span>
        </div>
        
        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors"
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </button>
        
        {/* Quick Actions */}
        <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors">
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors">
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Premium Designer T-Shirt
          </h3>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
            <span className="text-sm text-gray-500 ml-1">(124)</span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          Ultra-soft organic cotton with modern fit. Perfect for everyday wear 
          and special occasions.
        </p>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">$49</span>
            <span className="text-lg text-gray-500 line-through">$65</span>
          </div>
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 text-xs font-semibold rounded">
            Save $16
          </span>
        </div>
        
        {/* Size Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Size
          </label>
          <div className="flex space-x-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 rounded-lg border-2 text-sm font-medium transition-all ${
                  selectedSize === size
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        
        {/* Quantity and Add to Cart */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 text-gray-900 dark:text-white font-medium">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <button className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
        </div>
        
        {/* Additional Info */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Shield className="w-4 h-4" />
            <span>Free returns</span>
          </div>
          <div className="flex items-center space-x-1">
            <Zap className="w-4 h-4" />
            <span>Fast shipping</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced Contact Form with Validation
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    subject: 'general',
    subscribe: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const subjects = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'sales', label: 'Sales Question' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'media', label: 'Media & Press' }
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    else if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsSubmitting(false)
    }, 2000)
  }

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Thank you for reaching out. We'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false)
            setFormData({
              name: '',
              email: '',
              company: '',
              message: '',
              subject: 'general',
              subscribe: false
            })
          }}
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Get in Touch
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Have a question or want to work together? We'd love to hear from you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-white ${
                errors.name 
                  ? 'border-red-300 dark:border-red-700' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-white ${
                errors.email 
                  ? 'border-red-300 dark:border-red-700' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Your company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Subject
            </label>
            <select
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              {subjects.map((subject) => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Message *
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none ${
              errors.message 
                ? 'border-red-300 dark:border-red-700' 
                : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Tell us about your project or question..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
          )}
          <div className="mt-1 text-right text-sm text-gray-500 dark:text-gray-400">
            {formData.message.length}/500
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="subscribe"
            checked={formData.subscribe}
            onChange={(e) => handleChange('subscribe', e.target.checked)}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="subscribe" className="text-sm text-gray-600 dark:text-gray-400">
            Subscribe to our newsletter for updates and tips
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>

      {/* Contact Info */}
      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
          Other ways to reach us
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">Email</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">hello@eternal-ui.com</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">Phone</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">+1 (555) 123-4567</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">Office</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">San Francisco, CA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced Team Section
const TeamSection = () => {
  const team = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'CEO & Co-founder',
      bio: 'Former design lead at Apple with 10+ years of experience building user-centric products.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b550?w=400',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      },
      expertise: ['Product Strategy', 'Design Systems', 'Team Leadership']
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      role: 'CTO & Co-founder',
      bio: 'Full-stack engineer and AI researcher, previously at Google and Tesla.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      },
      expertise: ['AI/ML', 'Backend Systems', 'Architecture']
    },
    {
      id: 3,
      name: 'Emily Watson',
      role: 'Head of Design',
      bio: 'Award-winning designer passionate about creating accessible and beautiful interfaces.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      },
      expertise: ['UI/UX Design', 'Accessibility', 'Visual Design']
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Lead Developer',
      bio: 'React expert and open-source contributor building the future of web development.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      },
      expertise: ['Frontend Development', 'React/Vue', 'Performance']
    }
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We're a diverse group of designers, developers, and innovators united by our 
            passion for creating the future of web development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-black rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Social Links */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={member.social.linkedin}
                    className="p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors"
                  >
                    <Users className="w-4 h-4 text-gray-600" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-gray-600" />
                  </a>
                  <a
                    href={member.social.github}
                    className="p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors"
                  >
                    <Globe className="w-4 h-4 text-gray-600" />
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Expertise:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {member.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Us CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Want to Join Our Team?</h3>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion 
              for innovation and excellence. Check out our open positions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors flex items-center justify-center space-x-2">
                <Briefcase className="w-5 h-5" />
                <span>View Open Positions</span>
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition-colors flex items-center justify-center space-x-2">
                <Coffee className="w-5 h-5" />
                <span>Coffee Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main Component Showcase
const ModernWebsiteComponents = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [activeComponent, setActiveComponent] = useState('video')

  const components = [
    { id: 'video', name: 'Video Player', icon: '🎥', component: VideoPlayer },
    { id: 'product', name: 'Product Card', icon: '🛍️', component: ProductCard },
    { id: 'contact', name: 'Contact Form', icon: '📞', component: ContactForm },
    { id: 'team', name: 'Team Section', icon: '👥', component: TeamSection }
  ]

  const ActiveComponent = components.find(c => c.id === activeComponent)?.component || VideoPlayer

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

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
                Modern Components
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

          {/* Component Tabs */}
          <div className="flex space-x-1 pb-4 overflow-x-auto">
            {components.map((component) => (
              <button
                key={component.id}
                onClick={() => setActiveComponent(component.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                  activeComponent === component.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span>{component.icon}</span>
                <span>{component.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pt-32 bg-white dark:bg-black transition-colors duration-300 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ActiveComponent />
        </div>
      </div>
    </div>
  )
}

export default ModernWebsiteComponents