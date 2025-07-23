
// ====================================
// COMPONENT LIBRARY
// ====================================

'use client';

import { useState, useMemo } from 'react';
import { 
  Type, Layout, MousePointer, Image, Grid, Square, 
  Plus, Brain, Star, Heart, ShoppingCart, Mail,
  Users, MessageCircle, Share, Code, Palette,
  Search, Filter, Layers, Zap, Play
} from 'lucide-react';

/**
 * Component library data structure
 */
const COMPONENT_LIBRARY = [
  {
    category: 'AI Generated',
    icon: Brain,
    color: 'purple',
    components: [] // Dynamically populated with AI-generated components
  },
  {
    category: 'Typography',
    icon: Type,
    color: 'blue',
    components: [
      { id: 'h1', name: 'H1 Heading', icon: Type, color: 'bg-blue-500', description: 'Main page heading' },
      { id: 'h2', name: 'H2 Heading', icon: Type, color: 'bg-blue-500', description: 'Section heading' },
      { id: 'h3', name: 'H3 Heading', icon: Type, color: 'bg-blue-500', description: 'Subsection heading' },
      { id: 'paragraph', name: 'Paragraph', icon: Type, color: 'bg-blue-400', description: 'Body text content' },
      { id: 'quote', name: 'Quote', icon: Type, color: 'bg-blue-300', description: 'Blockquote with citation' },
      { id: 'list', name: 'List', icon: Type, color: 'bg-blue-300', description: 'Bulleted list items' }
    ]
  },
  {
    category: 'Layout',
    icon: Layout,
    color: 'green',
    components: [
      { id: 'hero', name: 'Hero Section', icon: Layout, color: 'bg-green-500', description: 'Landing page header with CTA' },
      { id: 'container', name: 'Container', icon: Square, color: 'bg-green-400', description: 'Content wrapper' },
      { id: 'section', name: 'Section', icon: Layout, color: 'bg-green-400', description: 'Page section divider' },
      { id: 'features', name: 'Features Grid', icon: Grid, color: 'bg-green-600', description: 'Feature showcase grid' },
      { id: 'cta', name: 'Call to Action', icon: MousePointer, color: 'bg-green-700', description: 'Conversion section' }
    ]
  },
  {
    category: 'Forms',
    icon: Square,
    color: 'purple',
    components: [
      { id: 'contactForm', name: 'Contact Form', icon: Mail, color: 'bg-purple-500', description: 'Multi-field contact form' },
      { id: 'newsletter', name: 'Newsletter', icon: Mail, color: 'bg-purple-600', description: 'Email subscription form' },
      { id: 'input', name: 'Input Field', icon: Type, color: 'bg-purple-400', description: 'Text input field' },
      { id: 'textarea', name: 'Textarea', icon: Type, color: 'bg-purple-400', description: 'Multi-line text input' },
      { id: 'select', name: 'Select', icon: Type, color: 'bg-purple-400', description: 'Dropdown selection' }
    ]
  },
  {
    category: 'E-commerce',
    icon: ShoppingCart,
    color: 'orange',
    components: [
      { id: 'productCard', name: 'Product Card', icon: ShoppingCart, color: 'bg-orange-500', description: 'Product showcase with pricing' },
      { id: 'pricingCard', name: 'Pricing Card', icon: ShoppingCart, color: 'bg-orange-600', description: 'Subscription plan card' },
      { id: 'shoppingCart', name: 'Shopping Cart', icon: ShoppingCart, color: 'bg-orange-400', description: 'Cart with items and total' }
    ]
  },
  {
    category: 'Social',
    icon: Users,
    color: 'pink',
    components: [
      { id: 'testimonial', name: 'Testimonial', icon: MessageCircle, color: 'bg-pink-500', description: 'Customer review card' },
      { id: 'teamMember', name: 'Team Member', icon: Users, color: 'bg-pink-600', description: 'Staff profile card' },
      { id: 'socialLinks', name: 'Social Links', icon: Share, color: 'bg-pink-400', description: 'Social media icons' }
    ]
  },
  {
    category: 'Interactive',
    icon: MousePointer,
    color: 'red',
    components: [
      { id: 'button', name: 'Button', icon: MousePointer, color: 'bg-red-500', description: 'Call-to-action button' },
      { id: 'link', name: 'Link', icon: MousePointer, color: 'bg-red-400', description: 'Text link' },
      { id: 'modal', name: 'Modal', icon: Square, color: 'bg-red-600', description: 'Popup dialog' }
    ]
  },
  {
    category: 'Media',
    icon: Image,
    color: 'yellow',
    components: [
      { id: 'image', name: 'Image', icon: Image, color: 'bg-yellow-500', description: 'Responsive image' },
      { id: 'video', name: 'Video', icon: Play, color: 'bg-yellow-400', description: 'Video player' },
      { id: 'gallery', name: 'Gallery', icon: Image, color: 'bg-yellow-600', description: 'Image gallery grid' }
    ]
  }
];

interface ComponentLibraryProps {
  searchTerm: string;
  onAddComponent: (component: any, position?: { x: number; y: number }) => void;
  existingElements: any[];
  className?: string;
}

/**
 * ComponentLibrary Component
 * 
 * Provides a searchable, categorized library of components with:
 * - AI-generated components integration
 * - Drag and drop functionality  
 * - Search and filter capabilities
 * - Accessibility support
 * - Responsive design
 */
export function ComponentLibrary({ 
  searchTerm, 
  onAddComponent, 
  existingElements,
  className = ''
}: ComponentLibraryProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Generate AI component library from existing elements
  const aiGeneratedComponents = useMemo(() => {
    return existingElements
      .filter(el => el.metadata?.isAIGenerated)
      .map(el => ({
        id: `ai-${el.type}-${el.id}`,
        name: `AI ${el.type.charAt(0).toUpperCase() + el.type.slice(1)}`,
        icon: Brain,
        color: 'bg-purple-500',
        description: `AI-generated ${el.type} component`,
        template: el
      }));
  }, [existingElements]);

  // Update AI Generated category with dynamic components
  const enhancedLibrary = useMemo(() => {
    return COMPONENT_LIBRARY.map(category => 
      category.category === 'AI Generated' 
        ? { ...category, components: aiGeneratedComponents }
        : category
    );
  }, [aiGeneratedComponents]);

  // Filter components based on search term and category
  const filteredComponents = useMemo(() => {
    let components = enhancedLibrary.flatMap(category => 
      category.components.map(comp => ({ ...comp, category: category.category }))
    );

    // Filter by category
    if (activeCategory !== 'all') {
      components = components.filter(comp => comp.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      components = components.filter(comp =>
        comp.name.toLowerCase().includes(searchLower) ||
        comp.description.toLowerCase().includes(searchLower) ||
        comp.category.toLowerCase().includes(searchLower)
      );
    }

    return components;
  }, [enhancedLibrary, activeCategory, searchTerm]);

  // Get categories with component counts
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    enhancedLibrary.forEach(category => {
      counts[category.category] = category.components.length;
    });
    counts['all'] = enhancedLibrary.reduce((total, cat) => total + cat.components.length, 0);
    return counts;
  }, [enhancedLibrary]);

  /**
   * Handle component drag start
   */
  const handleDragStart = (e: React.DragEvent, component: any) => {
    e.dataTransfer.setData('application/json', JSON.stringify(component));
    e.dataTransfer.effectAllowed = 'copy';
    
    // Create drag preview
    const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;
    dragImage.style.transform = 'rotate(5deg)';
    dragImage.style.opacity = '0.8';
    e.dataTransfer.setDragImage(dragImage, 50, 25);
  };

  /**
   * Handle component click to add
   */
  const handleComponentClick = (component: any) => {
    // Generate random position for new component
    const position = {
      x: Math.random() * 300 + 100,
      y: Math.random() * 200 + 100
    };
    onAddComponent(component, position);
  };

  return (
    <div className={`h-full flex flex-col bg-white dark:bg-gray-800 ${className}`}>
      {/* Library Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Component Library
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
            >
              {viewMode === 'grid' ? <Layers className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1 mb-4">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeCategory === 'all'
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            All ({categoriesWithCounts.all || 0})
          </button>
          {enhancedLibrary.map(category => {
            const IconComponent = category.icon;
            const count = categoriesWithCounts[category.category] || 0;
            
            return (
              <button
                key={category.category}
                onClick={() => setActiveCategory(category.category)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                  activeCategory === category.category
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                disabled={count === 0}
              >
                <IconComponent className="w-3.5 h-3.5" />
                {category.category} ({count})
              </button>
            );
          })}
        </div>

        {/* Stats */}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''} 
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
      </div>

      {/* Component Grid/List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredComponents.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No components found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
              {searchTerm 
                ? `No components match "${searchTerm}". Try a different search term.`
                : `No components in ${activeCategory}. Try a different category.`
              }
            </p>
          </div>
        ) : (
          <div className={`gap-3 ${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2' 
              : 'flex flex-col space-y-2'
          }`}>
            {filteredComponents.map((component) => {
              const IconComponent = component.icon;
              
              return (
                <div
                  key={component.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, component)}
                  onClick={() => handleComponentClick(component)}
                  className={`group cursor-pointer bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg transition-all duration-200 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-white dark:hover:bg-gray-600 ${
                    viewMode === 'grid' ? 'p-4' : 'p-3 flex items-center gap-3'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Add ${component.name} component`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleComponentClick(component);
                    }
                  }}
                >
                  {viewMode === 'grid' ? (
                    <>
                      {/* Grid View */}
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-8 h-8 ${component.color} rounded-lg flex items-center justify-center shadow-sm`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Plus className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                        {component.name}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                        {component.description}
                      </p>
                      {component.template?.metadata?.isAIGenerated && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                          <Brain className="w-3 h-3" />
                          <span>AI Generated</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/* List View */}
                      <div className={`w-8 h-8 ${component.color} rounded-lg flex items-center justify-center shadow-sm flex-shrink-0`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                            {component.name}
                          </h3>
                          {component.template?.metadata?.isAIGenerated && (
                            <Brain className="w-3 h-3 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {component.description}
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <Plus className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Library Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
        <div className="text-center">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
            Drag components to canvas or click to add
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <div className="font-semibold text-indigo-600 dark:text-indigo-400">
                {enhancedLibrary.reduce((total, cat) => total + cat.components.length, 0)}
              </div>
              <div>Components</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-indigo-600 dark:text-indigo-400">
                {enhancedLibrary.length}
              </div>
              <div>Categories</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-indigo-600 dark:text-indigo-400">
                {aiGeneratedComponents.length}
              </div>
              <div>AI Generated</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}