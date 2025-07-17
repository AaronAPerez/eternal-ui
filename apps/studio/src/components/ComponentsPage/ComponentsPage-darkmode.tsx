'use client';

import React, { useState, useMemo, useCallback,useEffect } from 'react';
import { 
  Search, Grid, List, Star, Eye, Code, Zap, Accessibility, 
  Smartphone, ChevronDown, ChevronRight, Play, Pause, RotateCcw, 
  Copy, Check, Edit, Plus, Trash2, Move, Monitor, Tablet,
  Settings, Sun, Moon, Layers
} from 'lucide-react';

// Import your component data
import { componentRegistry, ComponentMetadata } from '@/data/components';
import { componentCategories } from '@/data/categories';

// =================================================================
// TYPES AND INTERFACES
// =================================================================

interface PageSection {
  id: string;
  componentId: string;
  props: Record<string, any>;
  styles: {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
    boxShadow?: string;
  };
  order: number;
}

interface SelectedElement {
  id: string;
  type: 'text' | 'component' | 'background';
  elementRef: HTMLElement | null;
}

// =================================================================
// THEME CONTEXT
// =================================================================

const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      
      if (newTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newTheme;
    });
  }, []);

  return { isDark, toggleTheme };
};

// =================================================================
// MAIN COMPONENT
// =================================================================

export default function IntegratedComponentsPage() {
  const { isDark, toggleTheme } = useTheme();
  
  // State management
  const [selectedComponent, setSelectedComponent] = useState<ComponentMetadata | null>(
    componentRegistry[0] || null
  );
  const [props, setProps] = useState<Record<string, any>>(
    componentRegistry[0]?.variants[0]?.props || {}
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showCode, setShowCode] = useState(false);
  const [isPropsOpen, setIsPropsOpen] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);
  
  // Quick Build Feature
  const [pageSections, setPageSections] = useState<PageSection[]>([]);
  const [isQuickBuildMode, setIsQuickBuildMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<SelectedElement | null>(null);
  
  // Selected variant
  const [selectedVariant, setSelectedVariant] = useState(0);

  // Filter components using your search function
  const filteredComponents = useMemo(() => {
    let components = componentRegistry;
    
    if (searchTerm) {
      components = searchComponents(searchTerm);
    }
    
    if (selectedCategory && selectedCategory !== 'all') {
      components = components.filter(component => 
        component.category === selectedCategory
      );
    }
    
    return components;
  }, [searchTerm, selectedCategory]);

  // Get categories from your data
  const categories = useMemo(() => {
    const categoryIds = componentCategories.map(cat => cat.id);
    return ['all', ...categoryIds];
  }, []);

  // Handle component selection
  const handleComponentSelect = useCallback((component: ComponentMetadata) => {
    setSelectedComponent(component);
    setSelectedVariant(0);
    setProps(component.variants[0]?.props || {});
    setShowCode(false);
  }, []);

  // Handle variant selection
  const handleVariantSelect = useCallback((variantIndex: number) => {
    if (selectedComponent) {
      setSelectedVariant(variantIndex);
      setProps(selectedComponent.variants[variantIndex]?.props || {});
    }
  }, [selectedComponent]);

  // Handle prop changes
  const handlePropChange = useCallback((key: string, value: any) => {
    setProps(prev => ({ ...prev, [key]: value }));
  }, []);

  // Handle favorites
  const toggleFavorite = useCallback((componentId: string) => {
    setFavorites(prev => 
      prev.includes(componentId) 
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  }, []);

  // Copy code to clipboard
  const copyCodeToClipboard = useCallback(async () => {
    if (selectedComponent && selectedComponent.variants[selectedVariant]) {
      try {
        await navigator.clipboard.writeText(selectedComponent.variants[selectedVariant].code);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  }, [selectedComponent, selectedVariant]);

  // Quick Build Functions
  const addSectionToPage = useCallback((componentId: string) => {
    const component = componentRegistry.find(c => c.id === componentId);
    if (component) {
      const newSection: PageSection = {
        id: `section-${Date.now()}`,
        componentId,
        props: { ...component.variants[0]?.props || {} },
        styles: {
          backgroundColor: '#FFFFFF',
          textColor: '#111827',
          padding: '16px',
          margin: '0px'
        },
        order: pageSections.length
      };
      setPageSections(prev => [...prev, newSection]);
    }
  }, [pageSections.length]);

  const removeSectionFromPage = useCallback((sectionId: string) => {
    setPageSections(prev => prev.filter(section => section.id !== sectionId));
  }, []);

  const updateSectionProps = useCallback((sectionId: string, newProps: Record<string, any>) => {
    setPageSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, props: { ...section.props, ...newProps } }
          : section
      )
    );
  }, []);

  const updateSectionStyles = useCallback((sectionId: string, newStyles: Record<string, any>) => {
    setPageSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, styles: { ...section.styles, ...newStyles } }
          : section
      )
    );
  }, []);

  // Generate full page code
  const generatePageCode = useCallback(() => {
    const importStatements = Array.from(new Set(pageSections.map(section => {
      const component = componentRegistry.find(c => c.id === section.componentId);
      return component ? `import ${component.name.replace(/\s+/g, '')} from '@/components/ModernWebsiteComponents/${component.name.replace(/\s+/g, '')}';` : '';
    }))).filter(Boolean).join('\n');

    const pageComponents = pageSections
      .sort((a, b) => a.order - b.order)
      .map(section => {
        const component = componentRegistry.find(c => c.id === section.componentId);
        if (!component) return '';
        
        const componentName = component.name.replace(/\s+/g, '');
        const propsString = Object.entries(section.props)
          .map(([key, value]) => {
            if (typeof value === 'string') return `  ${key}="${value}"`;
            if (typeof value === 'number') return `  ${key}={${value}}`;
            if (typeof value === 'boolean') return `  ${key}={${value}}`;
            return `  ${key}="${value}"`;
          })
          .join('\n');

        return `      <${componentName}\n${propsString}\n      />`;
      })
      .join('\n\n');

    return `${importStatements}

export default function GeneratedPage() {
  return (
    <div className="min-h-screen">
${pageComponents}
    </div>
  );
}`;
  }, [pageSections]);

  // Copy page code
  const copyPageCode = useCallback(async () => {
    try {
      const pageCode = generatePageCode();
      await navigator.clipboard.writeText(pageCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy page code:', err);
    }
  }, [generatePageCode]);

  // Device preview dimensions
  const deviceDimensions = {
    desktop: { width: '100%', height: 'auto' },
    tablet: { width: '768px', height: 'auto' },
    mobile: { width: '375px', height: 'auto' }
  };

  // Render prop editor
  const renderPropEditor = useCallback((propConfig: any) => {
    const value = props[propConfig.name] || propConfig.default;

    switch (propConfig.type) {
      case 'string':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handlePropChange(propConfig.name, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder={propConfig.description}
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handlePropChange(propConfig.name, parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        );
      
      case 'boolean':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handlePropChange(propConfig.name, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{propConfig.description}</span>
          </label>
        );
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handlePropChange(propConfig.name, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {propConfig.options?.map((option: string) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        );
      
      default:
        return null;
    }
  }, [props, handlePropChange]);

  if (!selectedComponent) {
    return (
      <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-900">
        <div className="text-gray-500 dark:text-gray-400">No components available</div>
      </div>
    );
  }

  return (
    <div className={`h-screen flex transition-colors duration-200 ${isDark ? 'dark' : ''}`}>
      <div className="h-screen bg-gray-50 dark:bg-gray-900 flex">
        {/* Left Sidebar - Component Library */}
        <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Components</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  title="Toggle theme"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsQuickBuildMode(!isQuickBuildMode)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    isQuickBuildMode 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {isQuickBuildMode ? 'Exit Build' : 'Quick Build'}
                </button>
              </div>
            </div>
            
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {categories.map((category) => {
                const categoryData = componentCategories.find(cat => cat.id === category);
                return (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : categoryData?.name || category}
                  </option>
                );
              })}
            </select>

            {/* View Mode Toggle */}
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Grid className="w-4 h-4 mr-2" />
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <List className="w-4 h-4 mr-2" />
                List
              </button>
            </div>
          </div>

          {/* Component List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className={`space-y-2 ${viewMode === 'grid' ? 'grid grid-cols-1 gap-2' : ''}`}>
              {filteredComponents.map((component) => {
                const categoryData = componentCategories.find(cat => cat.id === component.category);
                
                return (
                  <div
                    key={component.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedComponent?.id === component.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div 
                        className="flex-1"
                        onClick={() => handleComponentSelect(component)}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{categoryData?.icon}</span>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">{component.name}</h3>
                          {component.premium && (
                            <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded">
                              Pro
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {component.description}
                        </p>
                        
                        {viewMode === 'list' && (
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center">
                              <Star className="w-3 h-3 mr-1" />
                              {component.popularity}
                            </span>
                            <span className="flex items-center">
                              <Zap className="w-3 h-3 mr-1" />
                              {component.performance.bundleSize}KB
                            </span>
                            <span className="flex items-center">
                              <Accessibility className="w-3 h-3 mr-1" />
                              {component.accessibility.wcagLevel}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col space-y-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(component.id);
                          }}
                          className={`p-1 rounded transition-colors ${
                            favorites.includes(component.id)
                              ? 'text-yellow-500'
                              : 'text-gray-400 dark:text-gray-500 hover:text-yellow-500'
                          }`}
                        >
                          <Star className="w-4 h-4" fill={favorites.includes(component.id) ? 'currentColor' : 'none'} />
                        </button>
                        
                        {isQuickBuildMode && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addSectionToPage(component.id);
                            }}
                            className="p-1 rounded text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                            title="Add to page"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/* Component Preview */}
          <div className="flex-1 flex flex-col">
            {/* Preview Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{selectedComponent.name}</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedComponent.description}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Device Mode Toggle */}
                  <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => setDeviceMode('desktop')}
                      className={`p-2 rounded transition-colors ${
                        deviceMode === 'desktop' 
                          ? 'bg-white dark:bg-gray-600 shadow-sm' 
                          : ''
                      }`}
                      title="Desktop view"
                    >
                      <Monitor className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button
                      onClick={() => setDeviceMode('tablet')}
                      className={`p-2 rounded transition-colors ${
                        deviceMode === 'tablet' 
                          ? 'bg-white dark:bg-gray-600 shadow-sm' 
                          : ''
                      }`}
                      title="Tablet view"
                    >
                      <Tablet className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button
                      onClick={() => setDeviceMode('mobile')}
                      className={`p-2 rounded transition-colors ${
                        deviceMode === 'mobile' 
                          ? 'bg-white dark:bg-gray-600 shadow-sm' 
                          : ''
                      }`}
                      title="Mobile view"
                    >
                      <Smartphone className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      showCode 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Code className="w-4 h-4 mr-2" />
                    {showCode ? 'Hide Code' : 'Show Code'}
                  </button>
                  
                  {isQuickBuildMode && (
                    <button
                      onClick={copyPageCode}
                      className="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                    >
                      {copiedCode ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copiedCode ? 'Copied!' : 'Copy Page'}
                    </button>
                  )}
                  
                  <button
                    onClick={copyCodeToClipboard}
                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                  >
                    {copiedCode ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copiedCode ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
              </div>
              
              {/* Component Stats */}
              <div className="flex items-center space-x-6 mt-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  <span>{selectedComponent.popularity}/100</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-1" />
                  <span>{selectedComponent.performance.bundleSize}KB bundle</span>
                </div>
                <div className="flex items-center">
                  <Accessibility className="w-4 h-4 mr-1" />
                  <span>WCAG {selectedComponent.accessibility.wcagLevel}</span>
                </div>
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-1" />
                  <span>Responsive</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>v{selectedComponent.version}</span>
                </div>
              </div>

              {/* Variant Selector */}
              {selectedComponent.variants.length > 1 && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Component Variant
                  </label>
                  <div className="flex space-x-2">
                    {selectedComponent.variants.map((variant, index) => (
                      <button
                        key={variant.id}
                        onClick={() => handleVariantSelect(index)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedVariant === index
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {variant.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900">
              {showCode ? (
                <div className="p-6">
                  <div className="bg-gray-900 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <div className="bg-gray-800 dark:bg-gray-700 px-4 py-2 text-white text-sm font-medium flex items-center justify-between">
                      <span>{isQuickBuildMode ? 'Complete Page Code' : 'React Component Code'}</span>
                      <button
                        onClick={isQuickBuildMode ? copyPageCode : copyCodeToClipboard}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <pre className="p-4 text-green-400 text-sm overflow-x-auto">
                      <code>
                        {isQuickBuildMode 
                          ? generatePageCode() 
                          : selectedComponent.variants[selectedVariant]?.code || ''
                        }
                      </code>
                    </pre>
                  </div>
                  
                  {/* Usage Instructions */}
                  <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
                      {isQuickBuildMode ? 'Page Usage Instructions' : 'Component Usage Instructions'}
                    </h3>
                    <div className="text-blue-800 dark:text-blue-200 space-y-2">
                      {isQuickBuildMode ? (
                        <>
                          <p>1. Copy the complete page code above</p>
                          <p>2. Create a new React component file in your project</p>
                          <p>3. Ensure all component imports are available in your ModernWebsiteComponents folder</p>
                          <p>4. The page includes all sections with your customizations</p>
                        </>
                      ) : (
                        <>
                          <p>1. Copy the component code above</p>
                          <p>2. Import the component from your ModernWebsiteComponents folder</p>
                          <p>3. Use the props panel to customize the component</p>
                          <p>4. All components are fully responsive and accessible</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Component Features */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Features</h4>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        {selectedComponent.features.responsive && (
                          <li className="flex items-center">
                            <Check className="w-3 h-3 mr-2 text-green-500" />
                            Fully responsive design
                          </li>
                        )}
                        {selectedComponent.features.darkMode && (
                          <li className="flex items-center">
                            <Check className="w-3 h-3 mr-2 text-green-500" />
                            Dark mode support
                          </li>
                        )}
                        {selectedComponent.features.accessible && (
                          <li className="flex items-center">
                            <Check className="w-3 h-3 mr-2 text-green-500" />
                            Accessibility compliant
                          </li>
                        )}
                        {selectedComponent.features.animations && (
                          <li className="flex items-center">
                            <Check className="w-3 h-3 mr-2 text-green-500" />
                            Smooth animations
                          </li>
                        )}
                        {selectedComponent.features.seoOptimized && (
                          <li className="flex items-center">
                            <Check className="w-3 h-3 mr-2 text-green-500" />
                            SEO optimized
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Performance</h4>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-center">
                          <Zap className="w-3 h-3 mr-2 text-blue-500" />
                          Bundle Size: {selectedComponent.performance.bundleSize}KB
                        </li>
                        <li className="flex items-center">
                          <Zap className="w-3 h-3 mr-2 text-blue-500" />
                          Render Score: {selectedComponent.performance.renderScore}/100
                        </li>
                        <li className="flex items-center">
                          <Accessibility className="w-3 h-3 mr-2 text-purple-500" />
                          Complexity: {selectedComponent.complexity}
                        </li>
                        <li className="flex items-center">
                          <Smartphone className="w-3 h-3 mr-2 text-green-500" />
                          Memory: {selectedComponent.performance.memoryUsage}
                        </li>
                        <li className="flex items-center">
                          <Eye className="w-3 h-3 mr-2 text-indigo-500" />
                          Version: {selectedComponent.version}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 flex justify-center">
                  {/* Responsive Preview Container */}
                  <div 
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 mx-auto border border-gray-200 dark:border-gray-700"
                    style={{
                      ...deviceDimensions[deviceMode],
                      maxWidth: deviceMode === 'desktop' ? '100%' : deviceDimensions[deviceMode].width
                    }}
                  >
                    {isQuickBuildMode ? (
                      // Quick Build Mode - Show full page preview
                      <div className="min-h-screen bg-white dark:bg-gray-900">
                        {pageSections.length === 0 ? (
                          <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                            <div className="text-center">
                              <Layers className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                              <p className="text-lg font-medium mb-2">No sections added yet</p>
                              <p className="text-sm">Click the + button on components to add them to your page</p>
                            </div>
                          </div>
                        ) : (
                          pageSections
                            .sort((a, b) => a.order - b.order)
                            .map((section) => {
                              const component = componentRegistry.find(c => c.id === section.componentId);
                              if (!component) return null;
                              
                              return (
                                <div 
                                  key={section.id} 
                                  className="relative group"
                                  style={section.styles}
                                >
                                  {/* Section Controls */}
                                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex items-center z-10">
                                    <button
                                      onClick={() => setSelectedElement({ id: section.id, type: 'component', elementRef: null })}
                                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                      title="Edit section"
                                    >
                                      <Settings className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => removeSectionFromPage(section.id)}
                                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                      title="Remove section"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  
                                  {/* Render the actual component */}
                                  <component.component {...section.props} />
                                </div>
                              );
                            })
                        )}
                      </div>
                    ) : (
                      // Single Component Preview
                      <div className="min-h-96 bg-white dark:bg-gray-900">
                        {selectedComponent.component && (
                          <selectedComponent.component {...props} />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Props Editor */}
          <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setIsPropsOpen(!isPropsOpen)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {isQuickBuildMode ? 'Page Builder' : 'Component Props'}
                </h3>
                {isPropsOpen ? (
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
            </div>

            {isPropsOpen && (
              <div className="flex-1 overflow-y-auto p-4">
                {isQuickBuildMode ? (
                  // Quick Build Panel
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Page Sections</h4>
                      {pageSections.length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400">No sections added yet. Use the + button on components to add them.</p>
                      ) : (
                        <div className="space-y-2">
                          {pageSections
                            .sort((a, b) => a.order - b.order)
                            .map((section) => {
                              const component = componentRegistry.find(c => c.id === section.componentId);
                              return (
                                <div 
                                  key={section.id}
                                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                    selectedElement?.id === section.id 
                                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                  }`}
                                  onClick={() => setSelectedElement({ id: section.id, type: 'component', elementRef: null })}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{component?.name}</span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removeSectionFromPage(section.id);
                                      }}
                                      className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>

                    {/* Quick Actions for Build Mode */}
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Quick Actions</h4>
                      <div className="space-y-2">
                        <button
                          onClick={() => setPageSections([])}
                          className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Clear All Sections
                        </button>
                        
                        <button
                          onClick={copyPageCode}
                          className="w-full flex items-center justify-center px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Export Page Code
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Component Props Editor
                  <div className="space-y-4">
                    {selectedComponent.props.map((propConfig) => (
                      <div key={propConfig.name} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {propConfig.name.charAt(0).toUpperCase() + propConfig.name.slice(1)}
                          {propConfig.required && <span className="text-red-500 ml-1">*</span>}
                          {propConfig.description && (
                            <span className="block text-xs text-gray-500 dark:text-gray-400 font-normal mt-1">
                              {propConfig.description}
                            </span>
                          )}
                        </label>
                        {renderPropEditor(propConfig)}
                      </div>
                    ))}

                    {/* Quick Actions */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Quick Actions</h4>
                      <div className="space-y-2">
                        <button
                          onClick={() => setProps(selectedComponent.variants[selectedVariant]?.props || {})}
                          className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Reset to Default
                        </button>
                        
                        <button
                          onClick={() => toggleFavorite(selectedComponent.id)}
                          className={`w-full flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            favorites.includes(selectedComponent.id)
                              ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                          }`}
                        >
                          <Star 
                            className="w-4 h-4 mr-2" 
                            fill={favorites.includes(selectedComponent.id) ? 'currentColor' : 'none'}
                          />
                          {favorites.includes(selectedComponent.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>

                        {isQuickBuildMode && (
                          <button
                            onClick={() => addSectionToPage(selectedComponent.id)}
                            className="w-full flex items-center justify-center px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add to Page
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Component Info */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Information</h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Category:</span>
                          <span className="text-gray-700 dark:text-gray-300 capitalize">{selectedComponent.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Complexity:</span>
                          <span className="text-gray-700 dark:text-gray-300 capitalize">{selectedComponent.complexity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Popularity:</span>
                          <span className="text-gray-700 dark:text-gray-300">{selectedComponent.popularity}/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Bundle Size:</span>
                          <span className="text-gray-700 dark:text-gray-300">{selectedComponent.performance.bundleSize}KB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">WCAG Level:</span>
                          <span className="text-gray-700 dark:text-gray-300">{selectedComponent.accessibility.wcagLevel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Last Updated:</span>
                          <span className="text-gray-700 dark:text-gray-300">{selectedComponent.lastUpdated}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Version:</span>
                          <span className="text-gray-700 dark:text-gray-300">{selectedComponent.version}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {copiedCode && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center transition-all duration-300">
          <Check className="w-4 h-4 mr-2" />
          <span>Code copied to clipboard!</span>
        </div>
      )}

      {/* Quick Build Instructions Overlay */}
      {isQuickBuildMode && pageSections.length === 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-40 pointer-events-none">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4 shadow-xl pointer-events-auto border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Quick Build Mode Active</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start building your page by clicking the + button next to any component in the sidebar.
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Plus className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400" />
                    <span>Add sections to build your page</span>
                  </div>
                  <div className="flex items-center">
                    <Settings className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400" />
                    <span>Customize each section individually</span>
                  </div>
                  <div className="flex items-center">
                    <Copy className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400" />
                    <span>Export complete page code when done</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsQuickBuildMode(false)}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Exit Quick Build Mode
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}