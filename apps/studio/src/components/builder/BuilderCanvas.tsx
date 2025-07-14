import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { ViewportSize, GridConfig } from '@/hooks/useBuilderLayout';

interface WebPageSection {
  id: string;
  name: string;
  type: 'header' | 'navigation' | 'hero' | 'content' | 'sidebar' | 'footer';
  height: number;
  backgroundColor: string;
  order: number;
  visible: boolean;
  required: boolean;
}

interface CanvasComponent {
  id: string;
  type: string;
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  styles: Record<string, string>;
  isMinimized?: boolean;
  isLocked?: boolean;
  isHidden?: boolean;
  zIndex?: number;
  sectionId?: string;
}

interface BuilderCanvasProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  currentViewport: ViewportSize;
  zoomLevel: number;
  gridConfig: GridConfig;
  showSectionOutlines: boolean;
  selectedComponent: string | null;
  theme: 'light' | 'dark';
  themeColors: {
    background: string;
    surface: string;
    border: string;
    text: string;
    textSecondary: string;
  };
  onSelectComponent: (id: string | null) => void;
}

/**
 * Builder Canvas Component - Fixed Layout Version
 * 
 * Key fixes implemented:
 * - Proper scrollable container with min-height: 0
 * - Canvas that doesn't cut off at zoom levels
 * - Proper grid overlay that scales with zoom
 * - Browser mock that contains the scalable content
 * - Section-based layout for realistic web page structure
 */
const BuilderCanvas = forwardRef<HTMLDivElement, BuilderCanvasProps>(({
  canvasRef,
  currentViewport,
  zoomLevel,
  gridConfig,
  showSectionOutlines,
  selectedComponent,
  theme,
  themeColors,
  onSelectComponent
}, ref) => {
  // Component state
  const [canvasComponents, setCanvasComponents] = useState<CanvasComponent[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Web page sections with realistic proportions
  const [webPageSections, setWebPageSections] = useState<WebPageSection[]>([
    {
      id: 'header',
      name: 'Header',
      type: 'header',
      height: 80,
      backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
      order: 1,
      visible: true,
      required: true
    },
    {
      id: 'navigation',
      name: 'Navigation',
      type: 'navigation',
      height: 60,
      backgroundColor: theme === 'dark' ? '#111827' : '#f8fafc',
      order: 2,
      visible: true,
      required: false
    },
    {
      id: 'hero',
      name: 'Hero Section',
      type: 'hero',
      height: 400,
      backgroundColor: theme === 'dark' ? '#1e293b' : '#f1f5f9',
      order: 3,
      visible: true,
      required: false
    },
    {
      id: 'content',
      name: 'Main Content',
      type: 'content',
      height: 600,
      backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
      order: 4,
      visible: true,
      required: true
    }
  ]);

  // Calculate total page height
  const totalPageHeight = webPageSections
    .filter(section => section.visible)
    .reduce((sum, section) => sum + section.height, 0);

  // Update section backgrounds when theme changes
  useEffect(() => {
    setWebPageSections(prev => prev.map(section => ({
      ...section,
      backgroundColor: theme === 'dark' 
        ? getDarkBackground(section.type)
        : getLightBackground(section.type)
    })));
  }, [theme]);

  // Helper functions for theme backgrounds
  const getDarkBackground = (type: string) => {
    switch (type) {
      case 'header': return '#1f2937';
      case 'navigation': return '#111827';
      case 'hero': return '#1e293b';
      case 'content': return '#0f172a';
      default: return '#1f2937';
    }
  };

  const getLightBackground = (type: string) => {
    switch (type) {
      case 'header': return '#ffffff';
      case 'navigation': return '#f8fafc';
      case 'hero': return '#f1f5f9';
      case 'content': return '#ffffff';
      default: return '#ffffff';
    }
  };

  // Handle component drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('text/plain');
    
    if (!componentType || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoomLevel;
    const y = (e.clientY - rect.top) / zoomLevel;

    // Create new component
    const newComponent: CanvasComponent = {
      id: `${componentType}-${Date.now()}`,
      type: componentType,
      content: getDefaultContent(componentType),
      position: { x: Math.max(0, x - 50), y: Math.max(0, y - 25) },
      size: getDefaultSize(componentType),
      styles: {},
      zIndex: canvasComponents.length + 1
    };

    setCanvasComponents(prev => [...prev, newComponent]);
    onSelectComponent(newComponent.id);
  }, [canvasRef, zoomLevel, canvasComponents.length, onSelectComponent]);

  // Get default content for component types
  const getDefaultContent = (type: string): string => {
    switch (type) {
      case 'button': return 'Click Me';
      case 'text': return 'Lorem ipsum dolor sit amet';
      case 'heading': return 'Heading Text';
      case 'image': return 'Image Placeholder';
      case 'container': return 'Container';
      case 'grid': return 'Grid Layout';
      case 'flexbox': return 'Flex Layout';
      case 'navbar': return 'Navigation';
      case 'card': return 'Card Content';
      default: return type;
    }
  };

  // Get default size for component types
  const getDefaultSize = (type: string): { width: number; height: number } => {
    switch (type) {
      case 'button': return { width: 120, height: 40 };
      case 'text': return { width: 200, height: 60 };
      case 'heading': return { width: 250, height: 50 };
      case 'image': return { width: 200, height: 150 };
      case 'container': return { width: 300, height: 200 };
      case 'grid': return { width: 400, height: 300 };
      case 'flexbox': return { width: 400, height: 200 };
      case 'navbar': return { width: 600, height: 60 };
      case 'card': return { width: 250, height: 200 };
      default: return { width: 150, height: 100 };
    }
  };

  // Handle component click
  const handleComponentClick = useCallback((e: React.MouseEvent, componentId: string) => {
    e.stopPropagation();
    onSelectComponent(componentId);
  }, [onSelectComponent]);

  // Handle canvas click (deselect)
  const handleCanvasClick = useCallback(() => {
    onSelectComponent(null);
  }, [onSelectComponent]);

  return (
    <div 
      ref={ref}
      className="builder-canvas-scroll"
    >
      {/* Browser Mock Container */}
      <div 
        className="builder-browser-mock"
        style={{
          width: Math.max(currentViewport.width * zoomLevel + 32, 320),
          minHeight: totalPageHeight * zoomLevel + 100
        }}
      >
        {/* Browser Header */}
        <div className="builder-browser-header">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white dark:bg-gray-700 px-3 py-1 rounded text-xs text-gray-600 dark:text-gray-300 flex items-center space-x-2">
              <Globe className="w-3 h-3" />
              <span>yourwebsite.com</span>
            </div>
          </div>
        </div>

        {/* Scalable Canvas Content */}
        <div 
          ref={canvasRef}
          className="builder-canvas-content"
          style={{ 
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top left',
            width: currentViewport.width,
            height: totalPageHeight
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleCanvasClick}
        >
          {/* Web Page Sections */}
          {webPageSections
            .filter(section => section.visible)
            .sort((a, b) => a.order - b.order)
            .map((section) => {
              const yOffset = webPageSections
                .filter(s => s.visible && s.order < section.order)
                .reduce((sum, s) => sum + s.height, 0);

              return (
                <div
                  key={section.id}
                  className={`absolute w-full transition-all duration-300 ${
                    showSectionOutlines ? 'ring-2 ring-inset ring-blue-300 dark:ring-blue-600' : ''
                  }`}
                  style={{
                    top: yOffset,
                    height: section.height,
                    backgroundColor: section.backgroundColor,
                    zIndex: 1
                  }}
                >
                  {showSectionOutlines && (
                    <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium z-10">
                      {section.name} ({section.height}px)
                    </div>
                  )}
                  
                  {/* Welcome Message for Hero Section */}
                  {section.type === 'hero' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                          Welcome to Our Website
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                          Start building your amazing website
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Sample content for other sections */}
                  {section.type === 'header' && (
                    <div className="flex items-center justify-between px-6 h-full">
                      <div className="font-bold text-lg text-gray-800 dark:text-gray-200">
                        Your Logo
                      </div>
                      <div className="flex space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>Home</span>
                        <span>About</span>
                        <span>Services</span>
                        <span>Contact</span>
                      </div>
                    </div>
                  )}

                  {section.type === 'navigation' && (
                    <div className="flex items-center px-6 h-full">
                      <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">Products</span>
                        <span>Solutions</span>
                        <span>Resources</span>
                        <span>Pricing</span>
                        <span>Support</span>
                      </div>
                    </div>
                  )}

                  {section.type === 'content' && (
                    <div className="p-6">
                      <div className="max-w-4xl mx-auto">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                          Main Content Area
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                              <div className="h-32 bg-gray-200 dark:bg-gray-600 rounded mb-3"></div>
                              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                                Content Block {i}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Sample content for demonstration purposes.
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          {/* Grid Overlay */}
          {gridConfig.visible && (
            <div
              className="builder-grid-overlay"
              style={{
                backgroundImage: `
                  linear-gradient(to right, ${gridConfig.color}${Math.round(gridConfig.opacity * 255).toString(16).padStart(2, '0')} 1px, transparent 1px),
                  linear-gradient(to bottom, ${gridConfig.color}${Math.round(gridConfig.opacity * 255).toString(16).padStart(2, '0')} 1px, transparent 1px)
                `,
                backgroundSize: `${currentViewport.width / gridConfig.columns}px ${gridConfig.cellSize}px`
              }}
            />
          )}

          {/* Canvas Components */}
          {canvasComponents.map(component => (
            <div
              key={component.id}
              className={`builder-component ${selectedComponent === component.id ? 'selected' : ''}`}
              style={{
                left: component.position.x,
                top: component.position.y,
                width: component.size.width,
                height: component.size.height,
                zIndex: component.zIndex || 10,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(2px)'
              }}
              onClick={(e) => handleComponentClick(e, component.id)}
            >
              <div className="p-2 text-xs text-gray-600 dark:text-gray-400 h-full flex items-center justify-center">
                {component.content}
              </div>
              
              {/* Selection handles */}
              {selectedComponent === component.id && (
                <>
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 border border-white rounded-full"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 border border-white rounded-full"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 border border-white rounded-full"></div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 border border-white rounded-full"></div>
                </>
              )}
            </div>
          ))}

          {/* Drop zone indicator */}
          <div className="absolute inset-0 pointer-events-none">
            {/* This will show drop zones when dragging */}
          </div>
        </div>
      </div>

      {/* Empty state message */}
      {canvasComponents.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <div className="text-center">
            <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">🎨</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              Drag components from the library to start building
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

BuilderCanvas.displayName = 'BuilderCanvas';

export default BuilderCanvas;