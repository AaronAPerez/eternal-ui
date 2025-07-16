'use client'

import React, { useState } from 'react'
import { 
  LayoutGrid,
  Navigation,
  FileText,
  FormInput,
  BarChart3,
  ShoppingCart,
  Users,
  TrendingUp,
  MousePointer,
  Bell,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Star,
  Zap,
  Crown,
  Clock
} from 'lucide-react'

interface ComponentCategory {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  color: string
  subcategories: Subcategory[]
  count: number
  premium?: boolean
  new?: boolean
  popular?: boolean
}

interface Subcategory {
  id: string
  name: string
  count: number
  description?: string
}

interface ComponentCategoriesProps {
  categories: ComponentCategory[]
  selectedCategory: string
  onCategorySelect: (categoryId: string) => void
  className?: string
}

/**
 * Component Categories Navigation Sidebar
 * 
 * Features:
 * - Hierarchical category structure with subcategories
 * - Visual category indicators with icons and colors
 * - Component count badges for each category
 * - Search within categories
 * - Premium/new/popular category badges
 * - Collapsible subcategory sections
 * - Responsive mobile-friendly design
 */
export const ComponentCategories: React.FC<ComponentCategoriesProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  className = ''
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['layout']))
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Enhanced categories with icons and metadata
  const enhancedCategories: ComponentCategory[] = [
    {
      id: 'all',
      name: 'All Components',
      description: 'Browse all available components',
      icon: LayoutGrid,
      color: '#6366F1',
      count: 78,
      subcategories: []
    },
    {
      id: 'layout',
      name: 'Layout & Structure',
      description: 'Fundamental layout components for page structure',
      icon: LayoutGrid,
      color: '#6366F1',
      count: 12,
      popular: true,
      subcategories: [
        { id: 'sections', name: 'Sections', count: 4, description: 'Hero, content, and page sections' },
        { id: 'containers', name: 'Containers', count: 3, description: 'Wrapper and container components' },
        { id: 'grids', name: 'Grids', count: 2, description: 'Grid and flexbox layouts' },
        { id: 'headers', name: 'Headers', count: 2, description: 'Page and section headers' },
        { id: 'footers', name: 'Footers', count: 1, description: 'Page footer components' }
      ]
    },
    {
      id: 'navigation',
      name: 'Navigation',
      description: 'Navigation components for user movement',
      icon: Navigation,
      color: '#8B5CF6',
      count: 8,
      subcategories: [
        { id: 'navbars', name: 'Navigation Bars', count: 3, description: 'Main navigation headers' },
        { id: 'menus', name: 'Menus', count: 2, description: 'Dropdown and context menus' },
        { id: 'breadcrumbs', name: 'Breadcrumbs', count: 1, description: 'Navigation breadcrumb trails' },
        { id: 'pagination', name: 'Pagination', count: 2, description: 'Page navigation controls' }
      ]
    },
    {
      id: 'content',
      name: 'Content Display',
      description: 'Components for displaying various types of content',
      icon: FileText,
      color: '#10B981',
      count: 15,
      subcategories: [
        { id: 'text', name: 'Text & Typography', count: 4, description: 'Headings, paragraphs, and text blocks' },
        { id: 'images', name: 'Images & Media', count: 3, description: 'Image galleries and media players' },
        { id: 'cards', name: 'Cards', count: 5, description: 'Content cards and containers' },
        { id: 'lists', name: 'Lists & Feeds', count: 3, description: 'Data lists and content feeds' }
      ]
    },
    {
      id: 'forms',
      name: 'Forms & Input',
      description: 'Form components and input controls',
      icon: FormInput,
      color: '#F59E0B',
      count: 18,
      new: true,
      subcategories: [
        { id: 'inputs', name: 'Input Fields', count: 6, description: 'Text inputs and form fields' },
        { id: 'forms', name: 'Complete Forms', count: 4, description: 'Pre-built form templates' },
        { id: 'validation', name: 'Validation', count: 3, description: 'Form validation components' },
        { id: 'submission', name: 'Form Submission', count: 2, description: 'Submit buttons and handlers' },
        { id: 'advanced', name: 'Advanced Inputs', count: 3, description: 'File uploads, date pickers, etc.' }
      ]
    },
    {
      id: 'data',
      name: 'Data Display',
      description: 'Components for displaying and visualizing data',
      icon: BarChart3,
      color: '#EF4444',
      count: 10,
      subcategories: [
        { id: 'tables', name: 'Tables', count: 3, description: 'Data tables and grids' },
        { id: 'charts', name: 'Charts & Graphs', count: 4, description: 'Data visualization components' },
        { id: 'statistics', name: 'Statistics', count: 2, description: 'Stats and metrics display' },
        { id: 'timelines', name: 'Timelines', count: 1, description: 'Timeline and progress components' }
      ]
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      description: 'Shopping and e-commerce components',
      icon: ShoppingCart,
      color: '#8B5CF6',
      count: 6,
      premium: true,
      subcategories: [
        { id: 'products', name: 'Product Cards', count: 2, description: 'Product display components' },
        { id: 'cart', name: 'Shopping Cart', count: 2, description: 'Cart and checkout components' },
        { id: 'checkout', name: 'Checkout Flow', count: 2, description: 'Payment and order forms' }
      ]
    },
    {
      id: 'social',
      name: 'Social & Reviews',
      description: 'Social proof and review components',
      icon: Users,
      color: '#06B6D4',
      count: 7,
      subcategories: [
        { id: 'testimonials', name: 'Testimonials', count: 3, description: 'Customer testimonial displays' },
        { id: 'reviews', name: 'Reviews', count: 2, description: 'Review and rating components' },
        { id: 'social-feeds', name: 'Social Feeds', count: 1, description: 'Social media integrations' },
        { id: 'sharing', name: 'Social Sharing', count: 1, description: 'Share buttons and widgets' }
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing',
      description: 'Marketing and conversion-focused components',
      icon: TrendingUp,
      color: '#EF4444',
      count: 10,
      popular: true,
      subcategories: [
        { id: 'cta', name: 'Call-to-Action', count: 4, description: 'CTA buttons and sections' },
        { id: 'pricing', name: 'Pricing Tables', count: 3, description: 'Pricing and plan displays' },
        { id: 'banners', name: 'Banners', count: 2, description: 'Promotional banners' },
        { id: 'popups', name: 'Popups & Modals', count: 1, description: 'Marketing popups and overlays' }
      ]
    },
    {
      id: 'interactive',
      name: 'Interactive',
      description: 'Interactive and dynamic components',
      icon: MousePointer,
      color: '#F59E0B',
      count: 9,
      subcategories: [
        { id: 'modals', name: 'Modals & Dialogs', count: 3, description: 'Modal windows and dialogs' },
        { id: 'tabs', name: 'Tabs & Accordions', count: 3, description: 'Tabbed and collapsible content' },
        { id: 'carousels', name: 'Carousels', count: 2, description: 'Image and content carousels' },
        { id: 'tooltips', name: 'Tooltips & Popovers', count: 1, description: 'Contextual help components' }
      ]
    },
    {
      id: 'feedback',
      name: 'Feedback',
      description: 'User feedback and notification components',
      icon: Bell,
      color: '#10B981',
      count: 5,
      subcategories: [
        { id: 'alerts', name: 'Alerts & Messages', count: 2, description: 'Alert and message components' },
        { id: 'notifications', name: 'Notifications', count: 2, description: 'Toast and notification systems' },
        { id: 'progress', name: 'Progress Indicators', count: 1, description: 'Loading and progress bars' }
      ]
    }
  ]

  // Filter categories based on search
  const filteredCategories = enhancedCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.subcategories.some(sub => 
      sub.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  // Get category badge
  const getCategoryBadge = (category: ComponentCategory) => {
    if (category.premium) {
      return (
        <span className="flex items-center px-1.5 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
          <Crown className="w-3 h-3 mr-1" />
          Pro
        </span>
      )
    }
    if (category.new) {
      return (
        <span className="flex items-center px-1.5 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
          <Zap className="w-3 h-3 mr-1" />
          New
        </span>
      )
    }
    if (category.popular) {
      return (
        <span className="flex items-center px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
          <Star className="w-3 h-3 mr-1" />
          Popular
        </span>
      )
    }
    return null
  }

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Categories
          </h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Quick Filters */}
        {showFilters && (
          <div className="mt-3 space-y-2">
            <div className="flex flex-wrap gap-1">
              <button className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded hover:bg-yellow-200 transition-colors">
                <Crown className="w-3 h-3 inline mr-1" />
                Premium
              </button>
              <button className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded hover:bg-green-200 transition-colors">
                <Zap className="w-3 h-3 inline mr-1" />
                New
              </button>
              <button className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded hover:bg-blue-200 transition-colors">
                <Star className="w-3 h-3 inline mr-1" />
                Popular
              </button>
              <button className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded hover:bg-purple-200 transition-colors">
                <Clock className="w-3 h-3 inline mr-1" />
                Recent
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Categories List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredCategories.map((category) => {
          const IconComponent = category.icon
          const isSelected = selectedCategory === category.id
          const isExpanded = expandedCategories.has(category.id)
          const hasSubcategories = category.subcategories.length > 0

          return (
            <div key={category.id} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              {/* Main Category */}
              <button
                onClick={() => {
                  onCategorySelect(category.id)
                  if (hasSubcategories) {
                    toggleCategory(category.id)
                  }
                }}
                className={`w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  isSelected ? 'bg-indigo-50 dark:bg-indigo-900 border-r-2 border-indigo-600' : ''
                }`}
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div 
                    className="p-2 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: `${category.color}15`, color: category.color }}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-0.5">
                      <span className={`font-medium text-sm truncate ${
                        isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-white'
                      }`}>
                        {category.name}
                      </span>
                      {getCategoryBadge(category)}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                  {hasSubcategories && (
                    <div className="text-gray-400">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  )}
                </div>
              </button>

              {/* Subcategories */}
              {hasSubcategories && isExpanded && (
                <div className="bg-gray-50 dark:bg-gray-750">
                  {category.subcategories.map((subcategory) => (
                    <button
                      key={subcategory.id}
                      onClick={() => onCategorySelect(`${category.id}-${subcategory.id}`)}
                      className="w-full flex items-center justify-between p-3 pl-12 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border-t border-gray-200 dark:border-gray-600 first:border-t-0"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-800 dark:text-gray-200 mb-0.5">
                          {subcategory.name}
                        </div>
                        {subcategory.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {subcategory.description}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full flex-shrink-0">
                        {subcategory.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {enhancedCategories.reduce((total, cat) => total + cat.count, 0)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Total Components
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComponentCategories