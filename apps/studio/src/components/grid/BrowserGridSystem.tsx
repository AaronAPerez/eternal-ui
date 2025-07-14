import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Grid, 
  Eye, 
  EyeOff, 
  Move, 
  Settings, 
  Layers, 
  Sun, 
  Moon, 
  Code,
  Plus,
  Download,
  Library,
  ZoomIn,
  ZoomOut,
  Maximize,
  Monitor,
  Tablet,
  Smartphone,
  RotateCcw,
  Ruler,
  Navigation,
  Globe,
  Layout
} from 'lucide-react';

// Enhanced Types for Browser-Style Display
interface ViewportSize {
  width: number;
  height: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ZoomLevel {
  value: number;
  label: string;
}

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

interface GridConfig {
  visible: boolean;
  snapEnabled: boolean;
  columns: number;
  rows: number;
  cellSize: number;
  gap: number;
  opacity: number;
  color: string;
  style: 'lines' | 'dots' | 'solid';
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

interface BrowserGridSystemProps {
  initialTheme?: 'light' | 'dark';
}

/**
 * Fixed Browser-Style Grid System with Proper Layout
 * 
 * Key Fixes:
 * - Proper viewport calculation and scrolling
 * - No overflow hidden on main containers
 * - Responsive canvas that doesn't cut off
 * - Proper zoom controls that maintain grid visibility
 * - Fixed toolbar that doesn't overlap content
 */
const BrowserGridSystem: React.FC<BrowserGridSystemProps> = ({ 
  initialTheme = 'light' 
}) => {
  // Theme and mount state
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);
  const [mounted, setMounted] = useState(false);

  // Viewport and zoom controls
  const [currentViewport, setCurrentViewport] = useState<ViewportSize>({
    width: 1440,
    height: 900,
    name: 'Desktop Large',
    icon: Monitor
  });

  const [zoomLevel, setZoomLevel] = useState<number>(0.75);
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });

  // Grid configuration
  const [gridConfig, setGridConfig] = useState<GridConfig>({
    visible: true,
    snapEnabled: true,
    columns: 12,
    rows: 24,
    cellSize: 60,
    gap: 16,
    opacity: 0.3,
    color: theme === 'dark' ? '#6366f1' : '#3b82f6',
    style: 'lines'
  });

  // UI state
  const [showGridControls, setShowGridControls] = useState(false);
  const [showComponentLibrary, setShowComponentLibrary] = useState(true);
  const [showSectionManager, setShowSectionManager] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [showSectionOutlines, setShowSectionOutlines] = useState(true);

  // Component state
  const [canvasComponents, setCanvasComponents] = useState<CanvasComponent[]>([]);

  // Refs
  const canvasRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Predefined viewport sizes
  const viewportSizes: ViewportSize[] = [
    { width: 1440, height: 900, name: 'Desktop Large', icon: Monitor },
    { width: 1024, height: 768, name: 'Desktop', icon: Monitor },
    { width: 768, height: 1024, name: 'Tablet', icon: Tablet },
    { width: 375, height: 667, name: 'Mobile', icon: Smartphone },
    { width: 320, height: 568, name: 'Mobile Small', icon: Smartphone },
  ];

  // Zoom levels
  const zoomLevels: ZoomLevel[] = [
    { value: 0.25, label: '25%' },
    { value: 0.5, label: '50%' },
    { value: 0.75, label: '75%' },
    { value: 1, label: '100%' },
    { value: 1.25, label: '125%' },
    { value: 1.5, label: '150%' },
    { value: 2, label: '200%' },
    { value: 4, label: '400%' },
  ];

  // Web page sections
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
    },
  ]);

  // Calculate total page height
  const totalPageHeight = webPageSections
    .filter(section => section.visible)
    .reduce((sum, section) => sum + section.height, 0);

  // Mount effect
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update grid color when theme changes
  useEffect(() => {
    setGridConfig(prev => ({
      ...prev,
      color: theme === 'dark' ? '#6366f1' : '#3b82f6'
    }));
    
    // Update section backgrounds
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

  // Event handlers
  const handleViewportChange = useCallback((viewport: ViewportSize) => {
    setCurrentViewport(viewport);
  }, []);

  const handleZoomChange = useCallback((zoom: number) => {
    setZoomLevel(zoom);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const handleGridConfigChange = useCallback((key: keyof GridConfig, value: any) => {
    setGridConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  // Component library mock data
  const componentLibraryItems = [
    { id: 'button', name: 'Button', icon: '🔘', category: 'basic' },
    { id: 'text', name: 'Text', icon: '📝', category: 'basic' },
    { id: 'image', name: 'Image', icon: '🖼️', category: 'media' },
    { id: 'container', name: 'Container', icon: '📦', category: 'layout' },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Fixed Toolbar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between shadow-sm transition-colors duration-300 flex-shrink-0 z-10">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
            <span className="font-semibold text-gray-900 dark:text-gray-100">Website Builder</span>
          </div>

          {/* Viewport Selector */}
          <div className="flex items-center space-x-2 border-l border-gray-200 dark:border-gray-700 pl-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Viewport:</span>
            <select
              value={`${currentViewport.width}x${currentViewport.height}`}
              onChange={(e) => {
                const [width, height] = e.target.value.split('x').map(Number);
                const viewport = viewportSizes.find(v => v.width === width && v.height === height);
                if (viewport) handleViewportChange(viewport);
              }}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {viewportSizes.map(viewport => (
                <option key={`${viewport.width}x${viewport.height}`} value={`${viewport.width}x${viewport.height}`}>
                  {viewport.name} ({viewport.width}×{viewport.height})
                </option>
              ))}
            </select>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2 border-l border-gray-200 dark:border-gray-700 pl-4">
            <button
              onClick={() => {
                const currentIndex = zoomLevels.findIndex(z => z.value === zoomLevel);
                if (currentIndex > 0) handleZoomChange(zoomLevels[currentIndex - 1].value);
              }}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              disabled={zoomLevel <= zoomLevels[0].value}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => {
                const currentIndex = zoomLevels.findIndex(z => z.value === zoomLevel);
                if (currentIndex < zoomLevels.length - 1) handleZoomChange(zoomLevels[currentIndex + 1].value);
              }}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              disabled={zoomLevel >= zoomLevels[zoomLevels.length - 1].value}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowGridControls(!showGridControls)}
            className={`p-2 rounded ${gridConfig.visible ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            title="Toggle Grid"
          >
            <Grid className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowComponentLibrary(!showComponentLibrary)}
            className={`p-2 rounded ${showComponentLibrary ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            title="Toggle Component Library"
          >
            <Library className="w-4 h-4" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded text-gray-600 hover:bg-gray-100"
            title="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Content Area - Fixed Layout */}
      <div className="flex-1 flex min-h-0">
        {/* Component Library Panel */}
        {showComponentLibrary && (
          <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 overflow-y-auto">
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <Layers className="w-5 h-5 mr-2" />
                Component Library
              </h3>
              
              <div className="space-y-2">
                {componentLibraryItems.map(item => (
                  <div
                    key={item.id}
                    className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 cursor-pointer bg-white dark:bg-gray-700 transition-colors"
                    draggable
                  >
                    <div className="flex items-center">
                      <span className="text-lg mr-3">{item.icon}</span>
                      <span className="text-sm text-gray-900 dark:text-gray-100">{item.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Canvas Container - Properly Scrollable */}
        <div className="flex-1 bg-gray-100 dark:bg-gray-800 flex flex-col min-h-0">
          {/* Grid Controls Panel */}
          {showGridControls && (
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={gridConfig.visible}
                    onChange={(e) => handleGridConfigChange('visible', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Show Grid</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Columns:</span>
                  <input
                    type="number"
                    value={gridConfig.columns}
                    onChange={(e) => handleGridConfigChange('columns', parseInt(e.target.value))}
                    className="w-16 px-2 py-1 text-sm border rounded"
                    min="1"
                    max="24"
                  />
                </label>
                
                <label className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Opacity:</span>
                  <input
                    type="range"
                    value={gridConfig.opacity}
                    onChange={(e) => handleGridConfigChange('opacity', parseFloat(e.target.value))}
                    className="w-20"
                    min="0"
                    max="1"
                    step="0.1"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Scrollable Canvas Area */}
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-auto p-6"
            style={{ 
              minHeight: 0 // Critical for proper flex behavior
            }}
          >
            {/* Browser Mock Container */}
            <div 
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 mx-auto"
              style={{
                width: Math.max(currentViewport.width * zoomLevel + 32, 320), // Ensure minimum width
                minHeight: totalPageHeight * zoomLevel + 100 // Ensure proper height
              }}
            >
              {/* Browser Header */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-t-lg p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
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
              </div>

              {/* Scalable Canvas Content */}
              <div 
                className="relative overflow-hidden"
                style={{ 
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'top left',
                  width: currentViewport.width,
                  height: totalPageHeight
                }}
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
                      </div>
                    );
                  })}

                {/* Grid Overlay */}
                {gridConfig.visible && (
                  <div
                    className="absolute inset-0 pointer-events-none z-20"
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
                    className="absolute border border-dashed border-gray-400 bg-white bg-opacity-90 rounded cursor-move"
                    style={{
                      left: component.position.x,
                      top: component.position.y,
                      width: component.size.width,
                      height: component.size.height,
                      zIndex: component.zIndex || 10
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedComponent(component.id);
                    }}
                  >
                    <div className="p-2 text-xs text-gray-600">
                      {component.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowserGridSystem;