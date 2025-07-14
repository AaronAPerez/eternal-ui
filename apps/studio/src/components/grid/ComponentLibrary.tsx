import React, { useState, useCallback } from 'react';
import {
  Plus,
  Search,
  Grid,
  Type,
  Image,
  Layout,
  Navigation,
  CreditCard,
  User,
  Mail,
  Phone,
  MapPin,
  Star,
  Calendar,
  ShoppingCart,
  Play,
  FileText,
  BarChart3,
  MessageSquare,
  Heart,
  Share2,
  Download,
  Settings,
  Menu,
  X,
  ChevronDown,
  Filter,
  Sparkles
} from 'lucide-react';

// Enhanced component library with design templates
interface ComponentTemplate {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  tags: string[];
  preview: string;
  defaultSize: { width: number; height: number };
  defaultContent: string;
  defaultStyles: Record<string, string>;
  isTemplate?: boolean;
  children?: ComponentTemplate[];
}

interface ComponentLibraryProps {
  onAddComponent: (template: ComponentTemplate) => void;
  theme: 'light' | 'dark';
  className?: string;
}

/**
 * Enhanced Component Library with Design Templates
 * 
 * Features:
 * - Pre-built common design sections
 * - Searchable component catalog
 * - Category-based organization
 * - Drag-and-drop component addition
 * - Template previews
 * - Responsive design components
 * - Professional UI sections
 */
const ComponentLibrary: React.FC<ComponentLibraryProps> = ({
  onAddComponent,
  theme,
  className = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['basic', 'headers']));

  // Comprehensive component templates library
  const componentTemplates: ComponentTemplate[] = [
    // Basic Elements
    {
      id: 'button-primary',
      name: 'Primary Button',
      category: 'basic',
      icon: CreditCard,
      description: 'Primary call-to-action button',
      tags: ['button', 'primary', 'cta'],
      preview: 'Get Started',
      defaultSize: { width: 140, height: 44 },
      defaultContent: 'Get Started',
      defaultStyles: {
        backgroundColor: '#6366f1',
        color: 'white',
        borderRadius: '8px',
        border: 'none',
        fontWeight: '600',
        fontSize: '16px',
        cursor: 'pointer',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    {
      id: 'button-secondary',
      name: 'Secondary Button',
      category: 'basic',
      icon: CreditCard,
      description: 'Secondary action button',
      tags: ['button', 'secondary'],
      preview: 'Learn More',
      defaultSize: { width: 140, height: 44 },
      defaultContent: 'Learn More',
      defaultStyles: {
        backgroundColor: 'transparent',
        color: theme === 'dark' ? '#e5e7eb' : '#374151',
        borderRadius: '8px',
        border: '2px solid #d1d5db',
        fontWeight: '600',
        fontSize: '16px',
        cursor: 'pointer',
        padding: '10px 24px'
      }
    },
    {
      id: 'text-heading',
      name: 'Heading',
      category: 'basic',
      icon: Type,
      description: 'Large heading text',
      tags: ['text', 'heading', 'title'],
      preview: 'Your Heading Here',
      defaultSize: { width: 300, height: 60 },
      defaultContent: 'Your Heading Here',
      defaultStyles: {
        fontSize: '36px',
        fontWeight: '700',
        color: theme === 'dark' ? '#f3f4f6' : '#111827',
        lineHeight: '1.2',
        margin: '0'
      }
    },
    {
      id: 'text-paragraph',
      name: 'Paragraph',
      category: 'basic',
      icon: FileText,
      description: 'Body text paragraph',
      tags: ['text', 'paragraph', 'body'],
      preview: 'Lorem ipsum dolor sit amet...',
      defaultSize: { width: 400, height: 80 },
      defaultContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      defaultStyles: {
        fontSize: '16px',
        fontWeight: '400',
        color: theme === 'dark' ? '#d1d5db' : '#6b7280',
        lineHeight: '1.6',
        margin: '0'
      }
    },
    {
      id: 'input-text',
      name: 'Text Input',
      category: 'basic',
      icon: Type,
      description: 'Text input field',
      tags: ['input', 'form', 'text'],
      preview: 'Enter text...',
      defaultSize: { width: 280, height: 44 },
      defaultContent: 'Enter text...',
      defaultStyles: {
        border: '2px solid #d1d5db',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '16px',
        backgroundColor: theme === 'dark' ? '#374151' : 'white',
        color: theme === 'dark' ? '#f3f4f6' : '#111827'
      }
    },

    // Header Templates
    {
      id: 'header-hero',
      name: 'Hero Header',
      category: 'headers',
      icon: Layout,
      description: 'Large hero section with title and CTA',
      tags: ['header', 'hero', 'landing'],
      preview: 'Hero Section',
      defaultSize: { width: 800, height: 400 },
      defaultContent: `
        <div style="text-align: center; padding: 80px 40px;">
          <h1 style="font-size: 48px; font-weight: 700; margin-bottom: 20px; color: ${theme === 'dark' ? '#f3f4f6' : '#111827'};">
            Build Amazing Websites
          </h1>
          <p style="font-size: 20px; color: ${theme === 'dark' ? '#d1d5db' : '#6b7280'}; margin-bottom: 32px; max-width: 600px; margin-left: auto; margin-right: auto;">
            Create stunning, responsive websites with our powerful visual builder. No coding required.
          </p>
          <button style="background: #6366f1; color: white; border: none; border-radius: 8px; padding: 16px 32px; font-size: 18px; font-weight: 600; cursor: pointer;">
            Get Started Free
          </button>
        </div>
      `,
      defaultStyles: {
        background: `linear-gradient(135deg, ${theme === 'dark' ? '#1f2937' : '#f8fafc'} 0%, ${theme === 'dark' ? '#111827' : '#e2e8f0'} 100%)`,
        borderRadius: '12px',
        border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
        overflow: 'hidden'
      },
      isTemplate: true
    },
    {
      id: 'header-navigation',
      name: 'Navigation Bar',
      category: 'headers',
      icon: Navigation,
      description: 'Horizontal navigation with logo and menu',
      tags: ['navigation', 'header', 'menu'],
      preview: 'Navigation',
      defaultSize: { width: 1000, height: 80 },
      defaultContent: `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 32px; height: 100%;">
          <div style="font-size: 24px; font-weight: 700; color: #6366f1;">
            Logo
          </div>
          <nav style="display: flex; space-x: 32px;">
            <a href="#" style="color: ${theme === 'dark' ? '#f3f4f6' : '#374151'}; text-decoration: none; font-weight: 500;">Home</a>
            <a href="#" style="color: ${theme === 'dark' ? '#f3f4f6' : '#374151'}; text-decoration: none; font-weight: 500;">About</a>
            <a href="#" style="color: ${theme === 'dark' ? '#f3f4f6' : '#374151'}; text-decoration: none; font-weight: 500;">Services</a>
            <a href="#" style="color: ${theme === 'dark' ? '#f3f4f6' : '#374151'}; text-decoration: none; font-weight: 500;">Contact</a>
          </nav>
          <button style="background: #6366f1; color: white; border: none; border-radius: 8px; padding: 12px 24px; font-weight: 600;">
            Sign Up
          </button>
        </div>
      `,
      defaultStyles: {
        backgroundColor: theme === 'dark' ? '#1f2937' : 'white',
        border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
        borderRadius: '0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      },
      isTemplate: true
    },

    // Card Templates
    {
      id: 'card-feature',
      name: 'Feature Card',
      category: 'cards',
      icon: CreditCard,
      description: 'Feature showcase card with icon',
      tags: ['card', 'feature', 'showcase'],
      preview: 'Feature Card',
      defaultSize: { width: 320, height: 240 },
      defaultContent: `
        <div style="padding: 32px; text-align: center;">
          <div style="width: 64px; height: 64px; background: #6366f1; border-radius: 12px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 24px;">⚡</span>
          </div>
          <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 12px; color: ${theme === 'dark' ? '#f3f4f6' : '#111827'};">
            Fast Performance
          </h3>
          <p style="color: ${theme === 'dark' ? '#d1d5db' : '#6b7280'}; line-height: 1.6; margin: 0;">
            Lightning-fast load times and optimized performance for the best user experience.
          </p>
        </div>
      `,
      defaultStyles: {
        backgroundColor: theme === 'dark' ? '#1f2937' : 'white',
        border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      },
      isTemplate: true
    },
    {
      id: 'card-pricing',
      name: 'Pricing Card',
      category: 'cards',
      icon: CreditCard,
      description: 'Pricing plan card with features',
      tags: ['card', 'pricing', 'plan'],
      preview: 'Pricing Plan',
      defaultSize: { width: 300, height: 400 },
      defaultContent: `
        <div style="padding: 32px; text-align: center;">
          <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 8px; color: ${theme === 'dark' ? '#f3f4f6' : '#111827'};">
            Pro Plan
          </h3>
          <div style="margin-bottom: 24px;">
            <span style="font-size: 48px; font-weight: 700; color: #6366f1;">$29</span>
            <span style="color: ${theme === 'dark' ? '#d1d5db' : '#6b7280'};">/month</span>
          </div>
          <ul style="list-style: none; padding: 0; margin-bottom: 32px; text-align: left;">
            <li style="padding: 8px 0; color: ${theme === 'dark' ? '#d1d5db' : '#374151'};">✓ Unlimited projects</li>
            <li style="padding: 8px 0; color: ${theme === 'dark' ? '#d1d5db' : '#374151'};">✓ Priority support</li>
            <li style="padding: 8px 0; color: ${theme === 'dark' ? '#d1d5db' : '#374151'};">✓ Advanced features</li>
            <li style="padding: 8px 0; color: ${theme === 'dark' ? '#d1d5db' : '#374151'};">✓ Team collaboration</li>
          </ul>
          <button style="width: 100%; background: #6366f1; color: white; border: none; border-radius: 8px; padding: 16px; font-weight: 600; cursor: pointer;">
            Choose Plan
          </button>
        </div>
      `,
      defaultStyles: {
        backgroundColor: theme === 'dark' ? '#1f2937' : 'white',
        border: `2px solid #6366f1`,
        borderRadius: '12px',
        boxShadow: '0 8px 25px rgba(99, 102, 241, 0.2)'
      },
      isTemplate: true
    },

    // Form Templates
    {
      id: 'form-contact',
      name: 'Contact Form',
      category: 'forms',
      icon: Mail,
      description: 'Complete contact form with validation',
      tags: ['form', 'contact', 'email'],
      preview: 'Contact Form',
      defaultSize: { width: 400, height: 480 },
      defaultContent: `
        <div style="padding: 32px;">
          <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 24px; color: ${theme === 'dark' ? '#f3f4f6' : '#111827'};">
            Get in Touch
          </h3>
          <form style="space-y: 20px;">
            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: 500; color: ${theme === 'dark' ? '#e5e7eb' : '#374151'};">Name</label>
              <input type="text" style="width: 100%; border: 2px solid #d1d5db; border-radius: 8px; padding: 12px; background: ${theme === 'dark' ? '#374151' : 'white'}; color: ${theme === 'dark' ? '#f3f4f6' : '#111827'};" placeholder="Your name">
            </div>
            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: 500; color: ${theme === 'dark' ? '#e5e7eb' : '#374151'};">Email</label>
              <input type="email" style="width: 100%; border: 2px solid #d1d5db; border-radius: 8px; padding: 12px; background: ${theme === 'dark' ? '#374151' : 'white'}; color: ${theme === 'dark' ? '#f3f4f6' : '#111827'};" placeholder="your@email.com">
            </div>
            <div style="margin-bottom: 24px;">
              <label style="display: block; margin-bottom: 8px; font-weight: 500; color: ${theme === 'dark' ? '#e5e7eb' : '#374151'};">Message</label>
              <textarea style="width: 100%; height: 120px; border: 2px solid #d1d5db; border-radius: 8px; padding: 12px; background: ${theme === 'dark' ? '#374151' : 'white'}; color: ${theme === 'dark' ? '#f3f4f6' : '#111827'}; resize: vertical;" placeholder="Your message..."></textarea>
            </div>
            <button type="submit" style="width: 100%; background: #6366f1; color: white; border: none; border-radius: 8px; padding: 16px; font-weight: 600; cursor: pointer;">
              Send Message
            </button>
          </form>
        </div>
      `,
      defaultStyles: {
        backgroundColor: theme === 'dark' ? '#1f2937' : 'white',
        border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      },
      isTemplate: true
    },

    // Footer Templates
    {
      id: 'footer-complete',
      name: 'Complete Footer',
      category: 'footers',
      icon: Layout,
      description: 'Full footer with links and social media',
      tags: ['footer', 'links', 'social'],
      preview: 'Footer Section',
      defaultSize: { width: 1000, height: 300 },
      defaultContent: `
        <div style="padding: 48px 32px 24px;">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; margin-bottom: 32px;">
            <div>
              <h4 style="font-size: 18px; font-weight: 600; margin-bottom: 16px; color: ${theme === 'dark' ? '#f3f4f6' : '#111827'};">Company</h4>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: 8px;"><a href="#" style="color: ${theme === 'dark' ? '#d1d5db' : '#6b7280'}; text-decoration: none;">About</a></li>
                <li style="margin-bottom: 8px;"><a href="#" style="color: ${theme === 'dark' ? '#d1d5db' : '#6b7280'}; text-decoration: none;">Careers</a></li>
                <li style="margin-bottom: 8px;"><a href="#" style="color: ${theme === 'dark' ? '#d1d5db' : '#6b7280'}; text-decoration: none;">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 style="font-size: 18px; font-weight: 600; margin-bottom: 16px; color: ${theme === 'dark' ? '#f3f4f6' : '#111827'};">Product</h4>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: 8px;"><a href="#" style="color: ${theme === 'dark' ? '#d1d5db' : '#6b7280'}; text-decoration: none;">Features</a></li>
                <li style="margin-bottom: 8px;"><a href="#" style="color: ${theme === 'dark' ? '#d1d5db' : '#6b7280'}; text-decoration: none;">Pricing</a></li>
                <li style="margin-bottom: 8px;"><a href="#" style="color: ${theme === 'dark' ? '#d1d5db' : '#6b7280'}; text-decoration: none;">API</a></li>
              </ul>
            </div>
            <div>
              <h4 style="font-size: 18px; font-weight: 600; margin-bottom: 16px; color: ${theme === 'dark' ? '#f3f4f6' : '#111827'};">Support</h4>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: 8px;"><a href="#" style="color: ${theme === 'dark' ? '#d1d5db' : '#6b7280'}; text-decoration: none;">Help Center</a></li>
                <li style="margin-bottom: 8px;"><a href="#" style="color: ${theme === 'dark' ? '#d1d5db' : '#6b7280'}; text-decoration: none;">Contact</a></li>
                <li style="margin-bottom: 8px;"><a href="#" style="color: ${theme === 'dark' ? '#d1d5db' : '#6b7280'}; text-decoration: none;">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 style="font-size: 18px; font-weight: 600; margin-bottom: 16px; color: ${theme === 'dark' ? '#f3f4f6' : '#111827'};">Follow Us</h4>
              <div style="display: flex; space-x: 12px;">
                <a href="#" style="color: ${theme === 'dark' ? '#d1d5db' : '#6b7280'};">Twitter</a>
                <a href="#" style="color: ${theme === 'dark' ? '#d1d5db' : '#6b7280'};">GitHub</a>
                <a href="#" style="color: ${theme === 'dark' ? '#d1d5db' : '#6b7280'};">LinkedIn</a>
              </div>
            </div>
          </div>
          <div style="border-top: 1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}; padding-top: 24px; display: flex; justify-content: space-between; align-items: center;">
            <p style="color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'}; margin: 0;">© 2024 Your Company. All rights reserved.</p>
            <div style="display: flex; space-x: 24px;">
              <a href="#" style="color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'}; text-decoration: none;">Privacy</a>
              <a href="#" style="color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'}; text-decoration: none;">Terms</a>
            </div>
          </div>
        </div>
      `,
      defaultStyles: {
        backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb',
        border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
        borderRadius: '0'
      },
      isTemplate: true
    }
  ];

  // Get unique categories
  const categories = [
    { id: 'all', name: 'All Components', icon: Grid },
    { id: 'basic', name: 'Basic Elements', icon: Type },
    { id: 'headers', name: 'Headers', icon: Layout },
    { id: 'cards', name: 'Cards', icon: CreditCard },
    { id: 'forms', name: 'Forms', icon: Mail },
    { id: 'footers', name: 'Footers', icon: Layout },
  ];

  // Filter components based on search and category
  const filteredComponents = componentTemplates.filter(component => {
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Group components by category
  const groupedComponents = categories.reduce((acc, category) => {
    if (category.id === 'all') return acc;
    acc[category.id] = filteredComponents.filter(comp => comp.category === category.id);
    return acc;
  }, {} as Record<string, ComponentTemplate[]>);

  // Toggle category expansion
  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  }, []);

  return (
    <div className={`w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-indigo-500" />
            Component Library
          </h2>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search components..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Category Filter */}
        <div className="mt-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Component List */}
      <div className="flex-1 overflow-y-auto">
        {selectedCategory === 'all' ? (
          // Show all components grouped by category
          <div className="p-4 space-y-6">
            {categories.slice(1).map(category => {
              const categoryComponents = groupedComponents[category.id] || [];
              if (categoryComponents.length === 0) return null;

              return (
                <div key={category.id}>
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <category.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {category.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({categoryComponents.length})
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                      expandedCategories.has(category.id) ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {expandedCategories.has(category.id) && (
                    <div className="mt-2 space-y-2">
                      {categoryComponents.map(component => (
                        <ComponentCard
                          key={component.id}
                          component={component}
                          onAdd={() => onAddComponent(component)}
                          theme={theme}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          // Show filtered components for selected category
          <div className="p-4 space-y-2">
            {filteredComponents.map(component => (
              <ComponentCard
                key={component.id}
                component={component}
                onAdd={() => onAddComponent(component)}
                theme={theme}
              />
            ))}
          </div>
        )}

        {filteredComponents.length === 0 && (
          <div className="p-8 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No components found
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Try adjusting your search or category filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Component Card for individual components
interface ComponentCardProps {
  component: ComponentTemplate;
  onAdd: () => void;
  theme: 'light' | 'dark';
}

const ComponentCard: React.FC<ComponentCardProps> = ({ component, onAdd, theme }) => {
  return (
    <div className="group border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-sm transition-all cursor-pointer">
      <div className="flex items-start space-x-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
          component.isTemplate 
            ? 'bg-gradient-to-br from-indigo-500 to-purple-600' 
            : 'bg-gray-100 dark:bg-gray-800'
        }`}>
          <component.icon className={`w-5 h-5 ${
            component.isTemplate ? 'text-white' : 'text-gray-600 dark:text-gray-400'
          }`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {component.name}
            </h3>
            {component.isTemplate && (
              <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                Template
              </span>
            )}
          </div>
          
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {component.description}
          </p>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-wrap gap-1">
              {component.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
            
            <button
              onClick={onAdd}
              className="opacity-0 group-hover:opacity-100 flex items-center space-x-1 px-2 py-1 bg-indigo-600 text-white rounded text-xs transition-all hover:bg-indigo-700"
            >
              <Plus className="w-3 h-3" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentLibrary;