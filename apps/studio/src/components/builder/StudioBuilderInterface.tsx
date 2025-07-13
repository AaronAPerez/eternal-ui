import React, { useState, useEffect, useRef } from 'react';
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
  ArrowDown,
  RotateCcw,
  AlertTriangle,
  Check,
  X,
  Maximize2,
  Minimize2,
  Search
} from 'lucide-react';

// Studio Integration - Advanced Builder Mode
const StudioBuilderInterface = () => {
  const [builderMode, setBuilderMode] = useState('visual'); // 'visual' | 'advanced' | 'components'
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Enhanced Toolbar with Mode Switcher */}
      <StudioToolbar 
        mode={builderMode} 
        onModeChange={setBuilderMode}
        leftPanelOpen={leftPanelOpen}
        rightPanelOpen={rightPanelOpen}
        onToggleLeftPanel={() => setLeftPanelOpen(!leftPanelOpen)}
        onToggleRightPanel={() => setRightPanelOpen(!rightPanelOpen)}
      />
      
      {/* Main Content Based on Mode */}
      <div className="flex-1 flex overflow-hidden">
        {builderMode === 'visual' && (
          <VisualBuilderMode 
            leftPanelOpen={leftPanelOpen}
            rightPanelOpen={rightPanelOpen}
          />
        )}
        
        {builderMode === 'advanced' && (
          <AdvancedBuilderMode 
            leftPanelOpen={leftPanelOpen}
            rightPanelOpen={rightPanelOpen}
          />
        )}
        
        {builderMode === 'components' && (
          <ComponentsPageMode />
        )}
      </div>
    </div>
  );
};

// Enhanced Toolbar with Mode Switcher
const StudioToolbar = ({ mode, onModeChange, leftPanelOpen, rightPanelOpen, onToggleLeftPanel, onToggleRightPanel }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-gray-900">Eternal UI</span>
        </div>
        
        {/* Mode Switcher */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onModeChange('visual')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'visual' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Palette className="w-4 h-4 inline mr-2" />
            Visual Builder
          </button>
          <button
            onClick={() => onModeChange('advanced')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'advanced' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Grid className="w-4 h-4 inline mr-2" />
            Advanced
          </button>
          <button
            onClick={() => onModeChange('components')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'components' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Square className="w-4 h-4 inline mr-2" />
            Components
          </button>
        </div>
      </div>
      
      {/* Toolbar Actions */}
      <div className="flex items-center space-x-3">
        {mode !== 'components' && (
          <>
            <button
              onClick={onToggleLeftPanel}
              className={`p-2 rounded-lg transition-colors ${
                leftPanelOpen ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100'
              }`}
              title="Toggle Component Library"
            >
              <Layers className="w-4 h-4" />
            </button>
            <button
              onClick={onToggleRightPanel}
              className={`p-2 rounded-lg transition-colors ${
                rightPanelOpen ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100'
              }`}
              title="Toggle Properties Panel"
            >
              <Settings className="w-4 h-4" />
            </button>
          </>
        )}
        
        <div className="w-px h-6 bg-gray-300" />
        
        <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <Eye className="w-4 h-4" />
          <span className="text-sm">Preview</span>
        </button>
        
        <button className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Save className="w-4 h-4" />
          <span className="text-sm">Save</span>
        </button>
        
        <button className="flex items-center space-x-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          <Download className="w-4 h-4" />
          <span className="text-sm">Export</span>
        </button>
      </div>
    </div>
  );
};

// Visual Builder Mode (Your existing basic builder)
const VisualBuilderMode = ({ leftPanelOpen, rightPanelOpen }) => {
  return (
    <>
      {leftPanelOpen && (
        <div className="w-80 bg-white border-r border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Components</h3>
          <div className="space-y-2">
            <div className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer">
              <div className="flex items-center">
                <Square className="w-5 h-5 text-gray-500 mr-3" />
                <span className="text-sm">Button</span>
              </div>
            </div>
            <div className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer">
              <div className="flex items-center">
                <Type className="w-5 h-5 text-gray-500 mr-3" />
                <span className="text-sm">Text</span>
              </div>
            </div>
            <div className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer">
              <div className="flex items-center">
                <Image className="w-5 h-5 text-gray-500 mr-3" />
                <span className="text-sm">Image</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex-1 bg-gray-100 p-6">
        <div className="bg-white rounded-lg shadow-sm border h-full flex items-center justify-center">
          <div className="text-center text-gray-500">
            <Layout className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">Visual Builder Canvas</h3>
            <p>Drag components from the sidebar to build your interface</p>
          </div>
        </div>
      </div>
      
      {rightPanelOpen && (
        <div className="w-80 bg-white border-l border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Properties</h3>
          <div className="text-sm text-gray-500">
            Select an element to edit its properties
          </div>
        </div>
      )}
    </>
  );
};

// Advanced Builder Mode (ComponentLibraryBuilder integration)
const AdvancedBuilderMode = ({ leftPanelOpen, rightPanelOpen }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [canvasComponents, setCanvasComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [viewMode, setViewMode] = useState('desktop');
  const [showCode, setShowCode] = useState(false);
  const [activeTab, setActiveTab] = useState('components');
  const [draggedComponent, setDraggedComponent] = useState(null);

  // Component Categories for Advanced Builder
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
          defaultContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        { 
          id: 'button', 
          name: 'Button', 
          icon: Square, 
          props: { className: 'bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium' },
          defaultContent: 'Click Me'
        }
      ]
    }
  };

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
          content: 'Welcome to Our Amazing Product' 
        },
        { 
          id: 'features-1', 
          type: 'section', 
          props: { className: 'py-16 px-6 bg-gray-50' }, 
          content: 'Features & Benefits Section' 
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
      case 'container':
      case 'section':
      case 'flexbox':
      case 'grid':
      default:
        return <div className={baseClasses}>{content}</div>;
    }
  };

  return (
    <>
      {/* Left Panel - Component Library */}
      {leftPanelOpen && (
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="flex border-b bg-gray-50">
            <button
              onClick={() => setActiveTab('components')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'components' 
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-white' 
                  : 'text-gray-600 hover:text-gray-900'
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
                  : 'text-gray-600 hover:text-gray-900'
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
                      {category.components.map((component) => (
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
                {Object.entries(templates).map(([templateId, template]) => (
                  <div
                    key={templateId}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md cursor-pointer transition-all"
                    onClick={() => loadTemplate(templateId)}
                  >
                    <div className="flex items-start mb-3">
                      <span className="text-3xl mr-4">{template.preview}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{template.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Center - Canvas */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto bg-gray-100 p-6">
          <div className="bg-white min-h-full border rounded-xl shadow-sm">
            <div
              className="min-h-full p-6"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {canvasComponents.length === 0 ? (
                <div className="flex items-center justify-center h-96 text-gray-400 border-2 border-dashed border-gray-300 rounded-xl">
                  <div className="text-center">
                    <Grid className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-xl font-medium text-gray-500 mb-2">Advanced Builder</h3>
                    <p className="text-gray-400">Drag components or choose a template to get started</p>
                  </div>
                </div>
              ) : (
                canvasComponents.map((component) => (
                  <div
                    key={component.id}
                    className={`mb-4 last:mb-0 ${
                      selectedComponent === component.id 
                        ? 'ring-2 ring-blue-500 ring-opacity-50' 
                        : 'hover:ring-1 hover:ring-gray-300'
                    }`}
                    onClick={() => setSelectedComponent(component.id)}
                  >
                    {renderComponent(component)}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Properties */}
      {rightPanelOpen && (
        <div className="w-80 bg-white border-l border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <Settings className="w-5 h-5 mr-2 text-gray-500" />
            <h3 className="font-semibold text-gray-900">Advanced Properties</h3>
          </div>
          
          {selectedComponent ? (
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
                />
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              Select a component to edit its properties
            </div>
          )}
        </div>
      )}
    </>
  );
};

// Components Page Mode with Live Code Editing
const ComponentsPageMode = () => {
  const [selectedComponent, setSelectedComponent] = useState('button');
  const [code, setCode] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Component definitions with live code
  const componentLibrary = {
    button: {
      name: 'Button',
      category: 'Interactive',
      description: 'A customizable button component with variants and sizes',
      defaultCode: `const Button = ({ children, variant = 'primary', size = 'md', ...props }) => {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }
  
  return (
    <button 
      className={\`\${baseClasses} \${variants[variant]} \${sizes[size]}\`}
      {...props}
    >
      {children}
    </button>
  )
}

// Usage Example
<div className="space-x-4">
  <Button variant="primary" size="sm">Primary Small</Button>
  <Button variant="secondary" size="md">Secondary Medium</Button>
  <Button variant="outline" size="lg">Outline Large</Button>
</div>`,
      preview: () => (
        <div className="space-x-4">
          <button className="font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 px-3 py-1.5 text-sm">
            Primary Small
          </button>
          <button className="font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500 px-4 py-2 text-sm">
            Secondary Medium
          </button>
          <button className="font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 px-6 py-3 text-base">
            Outline Large
          </button>
        </div>
      )
    },
    card: {
      name: 'Card',
      category: 'Layout',
      description: 'A flexible card component with header, content, and footer sections',
      defaultCode: `const Card = ({ children, className = '', hover = false, ...props }) => {
  const baseClasses = 'bg-white rounded-lg border shadow-sm'
  const hoverClasses = hover ? 'hover:shadow-md transition-shadow duration-200' : ''
  
  return (
    <div 
      className={\`\${baseClasses} \${hoverClasses} \${className}\`}
      {...props}
    >
      {children}
    </div>
  )
}

const CardHeader = ({ children, className = '' }) => (
  <div className={\`px-6 py-4 border-b border-gray-200 \${className}\`}>
    {children}
  </div>
)

const CardContent = ({ children, className = '' }) => (
  <div className={\`px-6 py-4 \${className}\`}>
    {children}
  </div>
)

const CardFooter = ({ children, className = '' }) => (
  <div className={\`px-6 py-4 border-t border-gray-200 \${className}\`}>
    {children}
  </div>
)

// Usage Example
<Card hover={true} className="max-w-sm">
  <CardHeader>
    <h3 className="text-lg font-semibold text-gray-900">Card Title</h3>
  </CardHeader>
  <CardContent>
    <p className="text-gray-600">This is the card content area where you can put any information.</p>
  </CardContent>
  <CardFooter>
    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Action</button>
  </CardFooter>
</Card>`,
      preview: () => (
        <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200 max-w-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Card Title</h3>
          </div>
          <div className="px-6 py-4">
            <p className="text-gray-600">This is the card content area where you can put any information.</p>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Action</button>
          </div>
        </div>
      )
    },
    input: {
      name: 'Input',
      category: 'Forms',
      description: 'A styled input field with label and error state support',
      defaultCode: `const Input = ({ 
  label, 
  error, 
  helperText, 
  className = '', 
  required = false,
  ...props 
}) => {
  const inputClasses = \`
    w-full px-3 py-2 border rounded-lg text-sm 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    \${error ? 'border-red-300 text-red-900' : 'border-gray-300'}
    \${className}
  \`
  
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input className={inputClasses} {...props} />
      {(error || helperText) && (
        <p className={\`text-xs \${error ? 'text-red-600' : 'text-gray-500'}\`}>
          {error || helperText}
        </p>
      )}
    </div>
  )
}

// Usage Example
<div className="space-y-4 max-w-sm">
  <Input 
    label="Email Address" 
    type="email" 
    placeholder="Enter your email" 
    required 
  />
  <Input 
    label="Password" 
    type="password" 
    placeholder="Enter password" 
    helperText="Must be at least 8 characters"
  />
  <Input 
    label="Confirm Password" 
    type="password" 
    placeholder="Confirm password" 
    error="Passwords do not match"
  />
</div>`,
      preview: () => (
        <div className="space-y-4 max-w-sm">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              type="email" 
              placeholder="Enter your email" 
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              type="password" 
              placeholder="Enter password" 
            />
            <p className="text-xs text-gray-500">Must be at least 8 characters</p>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input 
              className="w-full px-3 py-2 border border-red-300 text-red-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              type="password" 
              placeholder="Confirm password" 
            />
            <p className="text-xs text-red-600">Passwords do not match</p>
          </div>
        </div>
      )
    },
    modal: {
      name: 'Modal',
      category: 'Overlay',
      description: 'A flexible modal component with backdrop and close functionality',
      defaultCode: `const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  closeOnBackdropClick = true 
}) => {
  if (!isOpen) return null
  
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose()
    }
  }
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className={\`bg-white rounded-lg shadow-xl w-full \${sizes[size]}\`}>
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

// Usage Example
const [isOpen, setIsOpen] = useState(false)

<div>
  <button 
    onClick={() => setIsOpen(true)}
    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
  >
    Open Modal
  </button>
  
  <Modal 
    isOpen={isOpen} 
    onClose={() => setIsOpen(false)} 
    title="Example Modal"
    size="md"
  >
    <p className="text-gray-600 mb-4">
      This is a modal dialog example. You can put any content here.
    </p>
    <div className="flex justify-end space-x-3">
      <button 
        onClick={() => setIsOpen(false)}
        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Cancel
      </button>
      <button 
        onClick={() => setIsOpen(false)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Confirm
      </button>
    </div>
  </Modal>
</div>`,
      preview: () => (
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Open Modal
          </button>
          <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-600 text-center">
              Click the button above to see the modal in action
            </p>
          </div>
        </div>
      )
    },
    badge: {
      name: 'Badge',
      category: 'Display',
      description: 'A small badge component for status indicators and labels',
      defaultCode: `const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    dark: 'bg-gray-800 text-white'
  }
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm'
  }
  
  return (
    <span 
      className={\`\${baseClasses} \${variants[variant]} \${sizes[size]} \${className}\`}
      {...props}
    >
      {children}
    </span>
  )
}

// Usage Example
<div className="flex flex-wrap gap-2">
  <Badge variant="default">Default</Badge>
  <Badge variant="primary">Primary</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning">Warning</Badge>
  <Badge variant="danger">Danger</Badge>
  <Badge variant="dark" size="lg">Dark Large</Badge>
</div>`,
      preview: () => (
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center font-medium rounded-full bg-gray-100 text-gray-800 px-2.5 py-0.5 text-sm">Default</span>
          <span className="inline-flex items-center font-medium rounded-full bg-blue-100 text-blue-800 px-2.5 py-0.5 text-sm">Primary</span>
          <span className="inline-flex items-center font-medium rounded-full bg-green-100 text-green-800 px-2.5 py-0.5 text-sm">Success</span>
          <span className="inline-flex items-center font-medium rounded-full bg-yellow-100 text-yellow-800 px-2.5 py-0.5 text-sm">Warning</span>
          <span className="inline-flex items-center font-medium rounded-full bg-red-100 text-red-800 px-2.5 py-0.5 text-sm">Danger</span>
          <span className="inline-flex items-center font-medium rounded-full bg-gray-800 text-white px-3 py-1 text-sm">Dark Large</span>
        </div>
      )
    }
  };

  const filteredComponents = Object.entries(componentLibrary).filter(([key, component]) =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const component = componentLibrary[selectedComponent];
    if (component) {
      setCode(component.defaultCode);
    }
  }, [selectedComponent]);

  const handleReset = () => {
    const component = componentLibrary[selectedComponent];
    if (component) {
      setCode(component.defaultCode);
      setShowResetModal(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  // Reset Modal Component
  const ResetModal = () => {
    if (!showResetModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 w-10 h-10 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">Reset Component Code</h3>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to reset the code? All your changes will be lost and cannot be recovered.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Reset Code
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex">
      {/* Component List Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Component Library</h2>
            <Square className="w-5 h-5 text-blue-500" />
          </div>
          
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredComponents.map(([key, component]) => (
            <div
              key={key}
              onClick={() => setSelectedComponent(key)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                selectedComponent === key ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    selectedComponent === key ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {component.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{component.description}</p>
                  <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                    selectedComponent === key 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {component.category}
                  </span>
                </div>
                {selectedComponent === key && (
                  <Check className="w-5 h-5 text-blue-500 mt-1" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Component Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {componentLibrary[selectedComponent]?.name}
              </h1>
              <p className="text-gray-600 mt-1">
                {componentLibrary[selectedComponent]?.description}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span className="text-sm">Copy</span>
              </button>
              
              <button
                onClick={() => setShowResetModal(true)}
                className="flex items-center space-x-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm">Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className={`flex-1 ${isFullscreen ? 'flex' : 'flex'}`}>
          {/* Preview Section */}
          <div className={`${isFullscreen ? 'w-1/2' : 'w-full'} bg-gray-50 border-r border-gray-200`}>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
              <div className="bg-white p-8 rounded-lg border shadow-sm">
                {componentLibrary[selectedComponent]?.preview()}
              </div>
            </div>
          </div>

          {/* Code Editor Section */}
          {(isFullscreen) && (
            <div className="w-1/2 bg-white flex flex-col">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Component Code</h3>
              </div>
              
              <div className="flex-1 relative">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full p-4 font-mono text-sm border-0 resize-none focus:outline-none bg-gray-900 text-green-400"
                  spellCheck="false"
                />
              </div>
            </div>
          )}
        </div>

        {/* Code Section (when not fullscreen) */}
        {!isFullscreen && (
          <div className="bg-white border-t border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Component Code</h3>
            </div>
            
            <div className="relative" style={{ height: '400px' }}>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full p-4 font-mono text-sm border-0 resize-none focus:outline-none bg-gray-900 text-green-400"
                spellCheck="false"
              />
            </div>
          </div>
        )}
      </div>

      {/* Reset Modal */}
      <ResetModal />
    </div>
  );
};

export default StudioBuilderInterface;