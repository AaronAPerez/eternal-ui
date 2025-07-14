import React from 'react';
import { X, Layers, Square, Type, Image, Container, Grid, Layout, Navigation, Box } from 'lucide-react';

interface BuilderSidebarProps {
  theme: 'light' | 'dark';
  onClose: () => void;
}

const BuilderSidebar: React.FC<BuilderSidebarProps> = ({ theme, onClose }) => {
  const componentLibraryItems = [
    { 
      id: 'button', 
      name: 'Button', 
      icon: Square, 
      category: 'basic',
      description: 'Interactive button element'
    },
    { 
      id: 'text', 
      name: 'Text', 
      icon: Type, 
      category: 'basic',
      description: 'Text content element'
    },
    { 
      id: 'heading', 
      name: 'Heading', 
      icon: Type, 
      category: 'basic',
      description: 'Heading text element'
    },
    { 
      id: 'image', 
      name: 'Image', 
      icon: Image, 
      category: 'media',
      description: 'Image content element'
    },
    { 
      id: 'container', 
      name: 'Container', 
      icon: Container, 
      category: 'layout',
      description: 'Layout container element'
    },
    { 
      id: 'grid', 
      name: 'Grid', 
      icon: Grid, 
      category: 'layout',
      description: 'CSS Grid layout'
    },
    { 
      id: 'flexbox', 
      name: 'Flexbox', 
      icon: Layout, 
      category: 'layout',
      description: 'Flexbox layout'
    },
    { 
      id: 'navbar', 
      name: 'Navigation', 
      icon: Navigation, 
      category: 'navigation',
      description: 'Navigation component'
    },
    { 
      id: 'card', 
      name: 'Card', 
      icon: Box, 
      category: 'layout',
      description: 'Card component'
    }
  ];

  const categories = [
    { id: 'basic', name: 'Basic Elements', icon: Square },
    { id: 'layout', name: 'Layout', icon: Layout },
    { id: 'media', name: 'Media', icon: Image },
    { id: 'navigation', name: 'Navigation', icon: Navigation }
  ];

  return (
    <div className="builder-sidebar">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <Layers className="w-5 h-5 mr-2" />
            Component Library
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 lg:hidden"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search components..."
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {/* Categories */}
        {categories.map(category => (
          <div key={category.id} className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center text-sm">
              <category.icon className="w-4 h-4 mr-2" />
              {category.name}
            </h4>
            
            <div className="space-y-2">
              {componentLibraryItems
                .filter(item => item.category === category.id)
                .map(item => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="group p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer bg-white dark:bg-gray-700 transition-colors"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', item.id);
                        e.dataTransfer.effectAllowed = 'copy';
                      }}
                    >
                      <div className="flex items-start">
                        <IconComponent className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 text-sm">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}

        {/* Templates Section */}
        <div className="mt-8">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 text-sm">Templates</h4>
          <div className="space-y-2">
            <button className="w-full p-3 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
              <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">Landing Page</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hero + Features + CTA</div>
            </button>
            <button className="w-full p-3 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
              <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">Dashboard</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Cards + Charts + Tables</div>
            </button>
            <button className="w-full p-3 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
              <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">Portfolio</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Gallery + About + Contact</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderSidebar;
