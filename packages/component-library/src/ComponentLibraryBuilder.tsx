import React, { useState, useCallback } from 'react';
import { 
  Layout, 
  Type, 
  Image, 
  Square, 
  List, 
  Grid, 
  Calendar,
  BarChart3,
  Navigation,
  Menu,
  Play,
  Star,
  ShoppingCart,
  Users,
  MessageSquare,
  Settings,
  Eye,
  Code,
  Save,
  Download,
  Upload,
  Trash2,
  Copy,
  Move,
  Palette,
  Layers,
  Smartphone,
  Tablet,
  Monitor,
  Plus,
  Edit,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const ComponentLibraryBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [canvasComponents, setCanvasComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [viewMode, setViewMode] = useState('desktop');
  const [showCode, setShowCode] = useState(false);
  const [activeTab, setActiveTab] = useState('components');
  const [draggedComponent, setDraggedComponent] = useState(null);

  // Component Library Categories
  const componentCategories = {
    layout: {
      name: 'Layout',
      icon: Layout,
      components: [
        { 
          id: 'container', 
          name: 'Container', 
          icon: Square, 
          props: { className: 'p-6 border-2 border-dashed border-gray-300 min-h-32 rounded-lg' },
          defaultContent: 'Container - Drop components here'
        },
        { 
          id: 'flexbox', 
          name: 'Flex Container', 
          icon: Layout, 
          props: { className: 'flex gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50' },
          defaultContent: 'Flex Container'
        },
        { 
          id: 'grid', 
          name: 'Grid Layout', 
          icon: Grid, 
          props: { className: 'grid grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50' },
          defaultContent: 'Grid Layout'
        },
        { 
          id: 'section', 
          name: 'Section', 
          icon: Square, 
          props: { className: 'py-16 px-6 bg-white' },
          defaultContent: 'Section Content'
        }
      ]
    },
    content: {
      name: 'Content',
      icon: Type,
      components: [
        { 
          id: 'heading', 
          name: 'Heading', 
          icon: Type, 
          props: { className: 'text-3xl font-bold text-gray-900 mb-4' },
          defaultContent: 'Your Amazing Heading'
        },
        { 
          id: 'paragraph', 
          name: 'Paragraph', 
          icon: Type, 
          props: { className: 'text-gray-600 leading-relaxed' },
          defaultContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        { 
          id: 'image', 
          name: 'Image', 
          icon: Image, 
          props: { 
            src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            className: 'w-full h-64 object-cover rounded-lg shadow-md' 
          },
          defaultContent: ''
        },
        { 
          id: 'list', 
          name: 'List', 
          icon: List, 
          props: { className: 'space-y-2' },
          defaultContent: 'Feature One\nFeature Two\nFeature Three'
        }
      ]
    },
    interactive: {
      name: 'Interactive',
      icon: Square,
      components: [
        { 
          id: 'button', 
          name: 'Button', 
          icon: Square, 
          props: { className: 'bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium' },
          defaultContent: 'Click Me'
        },
        { 
          id: 'input', 
          name: 'Input Field', 
          icon: Edit, 
          props: { 
            placeholder: 'Enter text...', 
            className: 'w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
          },
          defaultContent: ''
        },
        { 
          id: 'card', 
          name: 'Card', 
          icon: Square, 
          props: { className: 'bg-white p-6 rounded-lg shadow-lg border hover:shadow-xl transition-shadow' },
          defaultContent: 'Card Content'
        },
        { 
          id: 'form', 
          name: 'Form', 
          icon: Edit, 
          props: { className: 'space-y-6 p-6 border border-gray-200 rounded-lg bg-white' },
          defaultContent: 'Form Elements'
        }
      ]
    },
    navigation: {
      name: 'Navigation',
      icon: Navigation,
      components: [
        { 
          id: 'navbar', 
          name: 'Navigation Bar', 
          icon: Menu, 
          props: { className: 'bg-white border-b shadow-sm p-4 flex items-center justify-between' },
          defaultContent: 'Navigation Bar'
        },
        { 
          id: 'sidebar', 
          name: 'Sidebar', 
          icon: Menu, 
          props: { className: 'bg-gray-50 w-64 h-full p-6 border-r' },
          defaultContent: 'Sidebar Menu'
        },
        { 
          id: 'breadcrumb', 
          name: 'Breadcrumb', 
          icon: Navigation, 
          props: { className: 'text-sm text-gray-500 flex items-center space-x-2' },
          defaultContent: 'Home > Category > Page'
        },
        { 
          id: 'tabs', 
          name: 'Tabs', 
          icon: Menu, 
          props: { className: 'border-b bg-white' },
          defaultContent: 'Tab Navigation'
        }
      ]
    },
    media: {
      name: 'Media',
      icon: Play,
      components: [
        { 
          id: 'video', 
          name: 'Video Player', 
          icon: Play, 
          props: { className: 'w-full aspect-video bg-black rounded-lg flex items-center justify-center text-white' },
          defaultContent: '▶️ Video Player'
        },
        { 
          id: 'gallery', 
          name: 'Image Gallery', 
          icon: Image, 
          props: { className: 'grid grid-cols-3 gap-4' },
          defaultContent: 'Image Gallery'
        },
        { 
          id: 'carousel', 
          name: 'Carousel', 
          icon: Image, 
          props: { className: 'relative overflow-hidden rounded-lg bg-gray-100 h-64 flex items-center justify-center' },
          defaultContent: '🎠 Carousel'
        },
        { 
          id: 'icon', 
          name: 'Icon', 
          icon: Star, 
          props: { className: 'w-12 h-12 text-blue-500' },
          defaultContent: '⭐'
        }
      ]
    },
    ecommerce: {
      name: 'E-commerce',
      icon: ShoppingCart,
      components: [
        { 
          id: 'product-card', 
          name: 'Product Card', 
          icon: ShoppingCart, 
          props: { className: 'bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow' },
          defaultContent: 'Product Card'
        },
        { 
          id: 'cart', 
          name: 'Shopping Cart', 
          icon: ShoppingCart, 
          props: { className: 'bg-white p-6 rounded-lg border' },
          defaultContent: '🛒 Shopping Cart'
        },
        { 
          id: 'checkout', 
          name: 'Checkout Form', 
          icon: ShoppingCart, 
          props: { className: 'bg-white p-8 rounded-lg border max-w-md' },
          defaultContent: 'Checkout Form'
        },
        { 
          id: 'pricing', 
          name: 'Pricing Table', 
          icon: BarChart3, 
          props: { className: 'bg-white p-6 rounded-lg border text-center' },
          defaultContent: 'Pricing Plans'
        }
      ]
    }
  };

  // Real-world Templates
  const templates = {
    landing: {
      name: 'Landing Page',
      preview: '🚀',
      description: 'Modern landing page with hero section, features, and CTA',
      components: [
        { 
          id: 'hero-1', 
          type: 'section', 
          props: { className: 'bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 px-6 text-center' }, 
          content: 'Welcome to Our Amazing Product\nTransform your business today' 
        },
        { 
          id: 'features-1', 
          type: 'section', 
          props: { className: 'py-16 px-6 bg-gray-50' }, 
          content: 'Features & Benefits Section' 
        },
        { 
          id: 'cta-1', 
          type: 'section', 
          props: { className: 'bg-white py-16 px-6 text-center border-t' }, 
          content: 'Ready to Get Started?' 
        }
      ]
    },
    dashboard: {
      name: 'Dashboard',
      preview: '📊',
      description: 'Analytics dashboard with charts and metrics',
      components: [
        { 
          id: 'dash-nav', 
          type: 'navbar', 
          props: { className: 'bg-white border-b p-4 flex items-center justify-between' }, 
          content: 'Dashboard Navigation' 
        },
        { 
          id: 'dash-main', 
          type: 'grid', 
          props: { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6' }, 
          content: 'Analytics Cards' 
        },
        { 
          id: 'dash-charts', 
          type: 'section', 
          props: { className: 'p-6 bg-white m-6 rounded-lg shadow' }, 
          content: 'Charts & Graphs' 
        }
      ]
    },
    ecommerce: {
      name: 'E-commerce Store',
      preview: '🛍️',
      description: 'Complete online store with product listings',
      components: [
        { 
          id: 'store-header', 
          type: 'navbar', 
          props: { className: 'bg-white border-b p-4 flex items-center justify-between' }, 
          content: 'Store Header & Cart' 
        },
        { 
          id: 'product-grid', 
          type: 'grid', 
          props: { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6' }, 
          content: 'Product Showcase' 
        },
        { 
          id: 'store-footer', 
          type: 'section', 
          props: { className: 'bg-gray-900 text-white py-12 px-6' }, 
          content: 'Store Footer & Links' 
        }
      ]
    },
    blog: {
      name: 'Blog Platform',
      preview: '📝',
      description: 'Modern blog with articles and sidebar',
      components: [
        { 
          id: 'blog-header', 
          type: 'navbar', 
          props: { className: 'bg-white border-b p-4' }, 
          content: 'Blog Header & Menu' 
        },
        { 
          id: 'blog-main', 
          type: 'flexbox', 
          props: { className: 'flex gap-8 p-6 max-w-7xl mx-auto' }, 
          content: 'Blog Content Area' 
        },
        { 
          id: 'blog-article', 
          type: 'card', 
          props: { className: 'flex-1 bg-white p-8 rounded-lg shadow' }, 
          content: 'Article Content' 
        }
      ]
    },
    portfolio: {
      name: 'Portfolio',
      preview: '🎨',
      description: 'Creative portfolio showcase',
      components: [
        { 
          id: 'port-hero', 
          type: 'section', 
          props: { className: 'bg-black text-white py-20 px-6 text-center' }, 
          content: 'Creative Portfolio\nShowcase Your Work' 
        },
        { 
          id: 'port-gallery', 
          type: 'grid', 
          props: { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6' }, 
          content: 'Portfolio Gallery' 
        },
        { 
          id: 'port-contact', 
          type: 'section', 
          props: { className: 'bg-gray-50 py-16 px-6 text-center' }, 
          content: 'Get In Touch' 
        }
      ]
    },
    saas: {
      name: 'SaaS Platform',
      preview: '⚡',
      description: 'Software as a Service application interface',
      components: [
        { 
          id: 'saas-nav', 
          type: 'navbar', 
          props: { className: 'bg-white border-b p-4 flex items-center justify-between shadow-sm' }, 
          content: 'SaaS Navigation' 
        },
        { 
          id: 'saas-sidebar', 
          type: 'sidebar', 
          props: { className: 'bg-gray-50 w-64 p-6 fixed h-full' }, 
          content: 'App Menu' 
        },
        { 
          id: 'saas-content', 
          type: 'container', 
          props: { className: 'ml-64 p-6' }, 
          content: 'Main App Content' 
        }
      ]
    }
  };

  const handleDragStart = (componentType, componentData) => {
    setDraggedComponent({ type: componentType, data: componentData });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedComponent) {
      const newComponent = {
        id: `${draggedComponent.type}-${Date.now()}`,
        type: draggedComponent.type,
        props: { ...draggedComponent.data.props },
        content: draggedComponent.data.defaultContent || draggedComponent.data.name
      };
      setCanvasComponents(prev => [...prev, newComponent]);
      setDraggedComponent(null);
    }
  };

  const loadTemplate = (templateId) => {
    const template = templates[templateId];
    if (template) {
      setCanvasComponents(template.components);
      setSelectedTemplate(templateId);
    }
  };

  const removeComponent = (componentId) => {
    setCanvasComponents(prev => prev.filter(comp => comp.id !== componentId));
    setSelectedComponent(null);
  };

  const duplicateComponent = (componentId) => {
    const component = canvasComponents.find(comp => comp.id === componentId);
    if (component) {
      const newComponent = {
        ...component,
        id: `${component.type}-${Date.now()}`
      };
      setCanvasComponents(prev => [...prev, newComponent]);
    }
  };

  const moveComponent = (componentId, direction) => {
    const currentIndex = canvasComponents.findIndex(comp => comp.id === componentId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= canvasComponents.length) return;

    const newComponents = [...canvasComponents];
    [newComponents[currentIndex], newComponents[newIndex]] = [newComponents[newIndex], newComponents[currentIndex]];
    setCanvasComponents(newComponents);
  };

  const generateCode = () => {
    let code = `import React from 'react';\n\nconst GeneratedComponent = () => {\n  return (\n    <div className="min-h-screen">`;
    
    canvasComponents.forEach(component => {
      const content = component.content.split('\n').map(line => line.trim()).join('\\n');
      if (component.type === 'image') {
        code += `\n      <img src="${component.props.src}" className="${component.props.className || ''}" alt="Generated" />`;
      } else if (component.type === 'input') {
        code += `\n      <input placeholder="${component.props.placeholder}" className="${component.props.className || ''}" />`;
      } else if (component.type === 'button') {
        code += `\n      <button className="${component.props.className || ''}">${content}</button>`;
      } else if (component.type === 'heading') {
        code += `\n      <h1 className="${component.props.className || ''}">${content}</h1>`;
      } else if (component.type === 'paragraph') {
        code += `\n      <p className="${component.props.className || ''}">${content}</p>`;
      } else if (component.type === 'list') {
        const items = content.split('\n');
        code += `\n      <ul className="${component.props.className || ''}">`;
        items.forEach(item => {
          code += `\n        <li>${item}</li>`;
        });
        code += `\n      </ul>`;
      } else {
        code += `\n      <div className="${component.props.className || ''}">${content}</div>`;
      }
    });
    
    code += `\n    </div>\n  );\n};\n\nexport default GeneratedComponent;`;
    return code;
  };

  const renderComponent = (component) => {
    const baseClasses = component.props.className || '';
    const content = component.content || '';
    
    switch (component.type) {
      case 'heading':
        return <h1 className={baseClasses}>{content}</h1>;
      case 'paragraph':
        return <p className={baseClasses}>{content}</p>;
      case 'button':
        return <button className={baseClasses}>{content}</button>;
      case 'input':
        return <input className={baseClasses} placeholder={component.props.placeholder} />;
      case 'image':
        return <img src={component.props.src} className={baseClasses} alt="Component" />;
      case 'list':
        return (
          <ul className={baseClasses}>
            {content.split('\n').map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                {item}
              </li>
            ))}
          </ul>
        );
      case 'container':
      case 'section':
      case 'flexbox':
      case 'grid':
      default:
        return <div className={baseClasses}>{content}</div>;
    }
  };

  const getViewportClasses = () => {
    switch (viewMode) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Layout className="w-8 h-8 mr-3 text-blue-500" />
            Component Builder Pro
          </h1>
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'desktop' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('tablet')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'tablet' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
              title="Tablet View"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'mobile' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCode(!showCode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              showCode ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Code</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r flex flex-col shadow-sm">
          {/* Sidebar Tabs */}
          <div className="flex border-b bg-gray-50">
            <button
              onClick={() => setActiveTab('components')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'components' 
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-white' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Layers className="w-4 h-4 inline mr-2" />
              Components
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'templates' 
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-white' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Layout className="w-4 h-4 inline mr-2" />
              Templates
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {activeTab === 'components' && (
              <div>
                {Object.entries(componentCategories).map(([categoryId, category]) => (
                  <div key={categoryId} className="border-b border-gray-100">
                    <div className="px-4 py-3 bg-gray-50 font-medium text-sm text-gray-700 flex items-center">
                      <category.icon className="w-4 h-4 mr-2 text-gray-500" />
                      {category.name}
                    </div>
                    <div className="p-2">
                      {category.components.map((component, index) => (
                        <div
                          key={component.id}
                          draggable
                          onDragStart={() => handleDragStart(component.id, component)}
                          className="flex items-center p-3 rounded-lg hover:bg-blue-50 cursor-move mb-1 transition-colors group"
                        >
                          <component.icon className="w-5 h-5 text-gray-500 mr-3 group-hover:text-blue-500" />
                          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">{component.name}</span>
                          <Plus className="w-4 h-4 text-gray-400 ml-auto group-hover:text-blue-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'templates' && (
              <div className="p-4 space-y-4">
                <div className="text-sm font-medium text-gray-700 mb-4">Ready-to-use Templates</div>
                {Object.entries(templates).map(([templateId, template]) => (
                  <div
                    key={templateId}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md cursor-pointer transition-all group"
                    onClick={() => loadTemplate(templateId)}
                  >
                    <div className="flex items-start mb-3">
                      <span className="text-3xl mr-4">{template.preview}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{template.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {template.components.length} components
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col">
          {showCode ? (
            <div className="flex-1 bg-gray-900 text-green-400 p-6 font-mono text-sm overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Generated React Code</h3>
                <button 
                  onClick={() => navigator.clipboard.writeText(generateCode())}
                  className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                >
                  Copy Code
                </button>
              </div>
              <pre className="whitespace-pre-wrap">{generateCode()}</pre>
            </div>
          ) : (
            <div className="flex-1 overflow-auto bg-gray-100 p-6">
              <div className={`bg-white min-h-full border rounded-xl shadow-sm ${getViewportClasses()}`}>
                <div
                  className="min-h-full p-6"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {canvasComponents.length === 0 ? (
                    <div className="flex items-center justify-center h-96 text-gray-400 border-2 border-dashed border-gray-300 rounded-xl">
                      <div className="text-center">
                        <Layout className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-xl font-medium text-gray-500 mb-2">Start Building</h3>
                        <p className="text-gray-400">Drag components from the sidebar or choose a template</p>
                      </div>
                    </div>
                  ) : (
                    canvasComponents.map((component, index) => (
                      <div
                        key={component.id}
                        className="relative group mb-4 last:mb-0"
                      >
                        <div
                          className={`transition-all ${
                            selectedComponent === component.id 
                              ? 'ring-2 ring-blue-500 ring-opacity-50' 
                              : 'hover:ring-1 hover:ring-gray-300'
                          }`}
                          onClick={() => setSelectedComponent(component.id)}
                        >
                          {renderComponent(component)}
                        </div>
                        
                        {selectedComponent === component.id && (
                          <div className="absolute -top-2 -right-2 flex space-x-1 bg-white border rounded-lg shadow-lg p-1 z-10">
                            <button
                              onClick={() => moveComponent(component.id, 'up')}
                              className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-blue-600"
                              disabled={index === 0}
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => moveComponent(component.id, 'down')}
                              className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-blue-600"
                              disabled={index === canvasComponents.length - 1}
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => duplicateComponent(component.id)}
                              className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-green-600"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeComponent(component.id)}
                              className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Properties Panel */}
        {selectedComponent && (
          <div className="w-80 bg-white border-l p-6 overflow-y-auto">
            <div className="flex items-center mb-6">
              <Settings className="w-5 h-5 mr-2 text-gray-500" />
              <h3 className="font-semibold text-gray-900">Properties</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={canvasComponents.find(c => c.id === selectedComponent)?.content || ''}
                  onChange={(e) => {
                    setCanvasComponents(prev =>
                      prev.map(comp =>
                        comp.id === selectedComponent
                          ? { ...comp, content: e.target.value }
                          : comp
                      )
                    );
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Enter content..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CSS Classes</label>
                <textarea
                  value={canvasComponents.find(c => c.id === selectedComponent)?.props.className || ''}
                  onChange={(e) => {
                    setCanvasComponents(prev =>
                      prev.map(comp =>
                        comp.id === selectedComponent
                          ? { ...comp, props: { ...comp.props, className: e.target.value } }
                          : comp
                      )
                    );
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  placeholder="Enter Tailwind classes..."
                />
              </div>

              {/* Component-specific properties */}
              {canvasComponents.find(c => c.id === selectedComponent)?.type === 'input' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Placeholder Text</label>
                  <input
                    type="text"
                    value={canvasComponents.find(c => c.id === selectedComponent)?.props.placeholder || ''}
                    onChange={(e) => {
                      setCanvasComponents(prev =>
                        prev.map(comp =>
                          comp.id === selectedComponent
                            ? { ...comp, props: { ...comp.props, placeholder: e.target.value } }
                            : comp
                        )
                      );
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter placeholder text..."
                  />
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => duplicateComponent(selectedComponent)}
                    className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate Component
                  </button>
                  <button
                    onClick={() => removeComponent(selectedComponent)}
                    className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Component
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Style Presets</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      const component = canvasComponents.find(c => c.id === selectedComponent);
                      if (component) {
                        let newClasses = '';
                        switch (component.type) {
                          case 'button':
                            newClasses = 'bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium';
                            break;
                          case 'card':
                            newClasses = 'bg-white p-6 rounded-lg shadow-lg border hover:shadow-xl transition-shadow';
                            break;
                          case 'heading':
                            newClasses = 'text-3xl font-bold text-gray-900 mb-4';
                            break;
                          case 'paragraph':
                            newClasses = 'text-gray-600 leading-relaxed';
                            break;
                          default:
                            newClasses = 'p-4 rounded-lg border border-gray-200';
                        }
                        setCanvasComponents(prev =>
                          prev.map(comp =>
                            comp.id === selectedComponent
                              ? { ...comp, props: { ...comp.props, className: newClasses } }
                              : comp
                          )
                        );
                      }
                    }}
                    className="px-3 py-2 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                  >
                    Primary
                  </button>
                  <button
                    onClick={() => {
                      const component = canvasComponents.find(c => c.id === selectedComponent);
                      if (component) {
                        let newClasses = '';
                        switch (component.type) {
                          case 'button':
                            newClasses = 'bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium';
                            break;
                          case 'card':
                            newClasses = 'bg-gray-50 p-6 rounded-lg border hover:shadow-sm transition-shadow';
                            break;
                          case 'heading':
                            newClasses = 'text-2xl font-semibold text-gray-700 mb-3';
                            break;
                          case 'paragraph':
                            newClasses = 'text-gray-500 text-sm';
                            break;
                          default:
                            newClasses = 'p-4 bg-gray-50 border border-gray-200';
                        }
                        setCanvasComponents(prev =>
                          prev.map(comp =>
                            comp.id === selectedComponent
                              ? { ...comp, props: { ...comp.props, className: newClasses } }
                              : comp
                          )
                        );
                      }
                    }}
                    className="px-3 py-2 text-xs bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition-colors"
                  >
                    Secondary
                  </button>
                  <button
                    onClick={() => {
                      const component = canvasComponents.find(c => c.id === selectedComponent);
                      if (component) {
                        let newClasses = '';
                        switch (component.type) {
                          case 'button':
                            newClasses = 'bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium';
                            break;
                          case 'card':
                            newClasses = 'bg-green-50 p-6 rounded-lg border border-green-200 hover:shadow-md transition-shadow';
                            break;
                          case 'heading':
                            newClasses = 'text-3xl font-bold text-green-700 mb-4';
                            break;
                          case 'paragraph':
                            newClasses = 'text-green-600 leading-relaxed';
                            break;
                          default:
                            newClasses = 'p-4 bg-green-50 border border-green-200 rounded-lg';
                        }
                        setCanvasComponents(prev =>
                          prev.map(comp =>
                            comp.id === selectedComponent
                              ? { ...comp, props: { ...comp.props, className: newClasses } }
                              : comp
                          )
                        );
                      }
                    }}
                    className="px-3 py-2 text-xs bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors"
                  >
                    Success
                  </button>
                  <button
                    onClick={() => {
                      const component = canvasComponents.find(c => c.id === selectedComponent);
                      if (component) {
                        let newClasses = '';
                        switch (component.type) {
                          case 'button':
                            newClasses = 'bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium';
                            break;
                          case 'card':
                            newClasses = 'bg-red-50 p-6 rounded-lg border border-red-200 hover:shadow-md transition-shadow';
                            break;
                          case 'heading':
                            newClasses = 'text-3xl font-bold text-red-700 mb-4';
                            break;
                          case 'paragraph':
                            newClasses = 'text-red-600 leading-relaxed';
                            break;
                          default:
                            newClasses = 'p-4 bg-red-50 border border-red-200 rounded-lg';
                        }
                        setCanvasComponents(prev =>
                          prev.map(comp =>
                            comp.id === selectedComponent
                              ? { ...comp, props: { ...comp.props, className: newClasses } }
                              : comp
                          )
                        );
                      }
                    }}
                    className="px-3 py-2 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors"
                  >
                    Danger
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-white border-t px-6 py-2 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span>{canvasComponents.length} components</span>
          {selectedTemplate && (
            <span className="flex items-center">
              <Layout className="w-4 h-4 mr-1" />
              Template: {templates[selectedTemplate]?.name}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <span>View: {viewMode}</span>
          <span className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            Live Preview
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComponentLibraryBuilder;