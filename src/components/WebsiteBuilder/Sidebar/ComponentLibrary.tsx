import React from 'react';
import { useState } from 'react';
import { Search, X, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';

// Extended component library with more components
const componentLibrary = [
  {
    category: 'Layout',
    components: [
      { type: 'hero', label: 'Hero Section', preview: '🎯', description: 'Eye-catching header section with title, subtitle, and CTA' },
      { type: 'container', label: 'Container', preview: '📦', description: 'Flexible container for nested components' },
      { type: 'card', label: 'Card', preview: '🃏', description: 'Content card with shadow and rounded corners' },
      { type: 'navigation', label: 'Navigation', preview: '🧭', description: 'Site navigation bar with logo and links' },
      { type: 'grid', label: 'Grid Layout', preview: '⚏', description: 'CSS Grid container for complex layouts' },
      { type: 'flexbox', label: 'Flex Container', preview: '📏', description: 'Flexbox layout container' },
      { type: 'sidebar', label: 'Sidebar', preview: '📂', description: 'Side navigation or content panel' },
      { type: 'header', label: 'Header', preview: '📋', description: 'Page header section' }
    ]
  },
  {
    category: 'Content',
    components: [
      { type: 'text', label: 'Text Block', preview: 'T', description: 'Editable text block with rich formatting' },
      { type: 'heading', label: 'Heading', preview: 'H1', description: 'SEO-friendly headings (H1-H6)' },
      { type: 'image', label: 'Image', preview: '🖼️', description: 'Responsive image element' },
      { type: 'button', label: 'Button', preview: '🔘', description: 'Interactive button with hover effects' },
      { type: 'logo', label: 'Logo', preview: '🏷️', description: 'Brand logo element' },
      { type: 'icon', label: 'Icon', preview: '⭐', description: 'Scalable vector icon' },
      { type: 'video', label: 'Video', preview: '📹', description: 'Embedded video player' },
      { type: 'list', label: 'List', preview: '📝', description: 'Bulleted or numbered list' },
      { type: 'quote', label: 'Quote', preview: '💬', description: 'Blockquote with citation' }
    ]
  },
  {
    category: 'Forms & Interactive',
    components: [
      { type: 'form', label: 'Contact Form', preview: '📝', description: 'Complete contact form with validation' },
      { type: 'input', label: 'Input Field', preview: '📄', description: 'Text input field' },
      { type: 'textarea', label: 'Text Area', preview: '📃', description: 'Multi-line text input' },
      { type: 'select', label: 'Dropdown', preview: '📋', description: 'Selection dropdown menu' },
      { type: 'checkbox', label: 'Checkbox', preview: '☑️', description: 'Checkbox input with label' },
      { type: 'slider', label: 'Slider', preview: '🎚️', description: 'Range slider input' },
      { type: 'toggle', label: 'Toggle Switch', preview: '🎛️', description: 'On/off toggle switch' }
    ]
  },
  {
    category: 'Sections',
    components: [
      { type: 'footer', label: 'Footer', preview: '📄', description: 'Site footer with links and copyright' },
      { type: 'testimonial', label: 'Testimonial', preview: '💬', description: 'Customer testimonial with photo' },
      { type: 'pricing', label: 'Pricing Table', preview: '💰', description: 'Pricing comparison table' },
      { type: 'gallery', label: 'Image Gallery', preview: '🖼️', description: 'Photo gallery grid' },
      { type: 'team', label: 'Team Section', preview: '👥', description: 'Team member cards' },
      { type: 'faq', label: 'FAQ Section', preview: '❓', description: 'Frequently asked questions' },
      { type: 'cta', label: 'Call to Action', preview: '📢', description: 'Action-oriented section' },
      { type: 'stats', label: 'Statistics', preview: '📊', description: 'Number statistics display' }
    ]
  },
  {
    category: 'Advanced',
    components: [
      { type: 'tabs', label: 'Tabs', preview: '📑', description: 'Tabbed content interface' },
      { type: 'accordion', label: 'Accordion', preview: '🪗', description: 'Collapsible content sections' },
      { type: 'modal', label: 'Modal', preview: '🖼️', description: 'Popup modal dialog' },
      { type: 'carousel', label: 'Carousel', preview: '🎠', description: 'Image/content slider' },
      { type: 'timeline', label: 'Timeline', preview: '⏰', description: 'Event timeline' },
      { type: 'map', label: 'Map', preview: '🗺️', description: 'Interactive map embed' }
    ]
  }
];

interface ComponentLibraryProps {
  onDragStart?: (e: React.DragEvent, componentType: string) => void;
}

export const ComponentLibrary: React.FC<ComponentLibraryProps> = ({ onDragStart }) => {
  const { handleDragStart: defaultHandleDragStart } = useDragAndDrop();
  const handleDragStart = onDragStart || defaultHandleDragStart;
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Layout', 'Content']);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  const filteredLibrary = componentLibrary.map(category => ({
    ...category,
    components: category.components.filter(comp =>
      comp.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.components.length > 0);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(cat => cat !== categoryName)
        : [...prev, categoryName]
    );
  };

  const totalComponents = filteredLibrary.reduce((sum, cat) => sum + cat.components.length, 0);

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Components</h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {totalComponents}
          </span>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search components..."
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      {/* Component Categories */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredLibrary.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="font-medium">No components found</p>
            <p className="text-sm">Try adjusting your search</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredLibrary.map((category) => {
              const isExpanded = expandedCategories.includes(category.category);
              
              return (
                <div key={category.category}>
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.category)}
                    className="flex items-center justify-between w-full text-sm font-medium text-gray-700 mb-3 hover:text-gray-900 transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      {category.category}
                      <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded group-hover:bg-gray-200 transition-colors">
                        {category.components.length}
                      </span>
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 transition-transform" />
                    ) : (
                      <ChevronRight className="w-4 h-4 transition-transform" />
                    )}
                  </button>
                  
                  {/* Components Grid */}
                  {isExpanded && (
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      {category.components.map((comp) => (
                        <div
                          key={comp.type}
                          draggable
                          onDragStart={(e) => handleDragStart(e, comp.type)}
                          onMouseEnter={() => setHoveredComponent(comp.type)}
                          onMouseLeave={() => setHoveredComponent(null)}
                          className="relative p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 cursor-grab active:cursor-grabbing transition-all hover:shadow-sm group"
                          title={comp.description}
                        >
                          <div className="text-center">
                            <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                              {comp.preview}
                            </div>
                            <div className="text-xs text-gray-600 truncate font-medium">
                              {comp.label}
                            </div>
                          </div>
                          
                          {/* Hover Tooltip */}
                          {hoveredComponent === comp.type && (
                            <div className="absolute z-50 left-full ml-2 top-0 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                              <div className="font-medium mb-1">{comp.label}</div>
                              <div className="text-gray-300 max-w-xs">{comp.description}</div>
                              <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                            </div>
                          )}

                          {/* Drag Indicator */}
                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Plus className="w-3 h-3 text-blue-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Tips */}
        {searchTerm === '' && (
          <div className="mt-8 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm font-medium text-blue-800 mb-2">💡 Quick Tips</div>
            <div className="text-xs text-blue-700 space-y-1">
              <div>• Drag components to the canvas</div>
              <div>• Use search to find specific components</div>
              <div>• Hover for detailed descriptions</div>
              <div>• Start with Hero + Navigation</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
