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
import ComponentLibrary from './ComponentLibrary';
import DraggableResizableComponent from './DraggableResizableComponent';
import DarkModePropertiesPanel from './DarkModePropertiesPanel';


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
 * Browser-Style Grid System with Zoom, Scroll, and Full Page Display
 * 
 * Features:
 * - Zoom in/out controls (25% to 400%)
 * - Responsive viewport preview (Desktop, Tablet, Mobile)
 * - Scrollable canvas with proper overflow handling
 * - Web page sections (Header, Nav, Hero, Content, Sidebar, Footer)
 * - Browser-like display with realistic proportions
 * - Grid overlay that scales with zoom
 * - Professional viewport controls
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
    name: 'Desktop',
    icon: Monitor
  });

  const [zoomLevel, setZoomLevel] = useState<number>(0.75); // Default to 75% to fit full page
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });

  // Grid configuration
  const [gridConfig, setGridConfig] = useState<GridConfig>({
    visible: true,
    snapEnabled: true,
    columns: 12,
    rows: 24, // More rows for full page layout
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
    },
    {
      id: 'footer',
      name: 'Footer',
      type: 'footer',
      height: 200,
      backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb',
      order: 5,
      visible: true,
      required: true
    }
  ]);

  // Canvas components
  const [canvasComponents, setCanvasComponents] = useState<CanvasComponent[]>([
    // Sample header component
    {
      id: 'header-logo',
      type: 'logo',
      content: 'Your Logo',
      position: { x: 50, y: 25 },
      size: { width: 120, height: 30 },
      styles: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#6366f1'
      },
      sectionId: 'header'
    },
    // Sample hero content
    {
      id: 'hero-title',
      type: 'heading',
      content: 'Welcome to Our Website',
      position: { x: currentViewport.width / 2 - 200, y: 200 },
      size: { width: 400, height: 60 },
      styles: {
        fontSize: '48px',
        fontWeight: '700',
        textAlign: 'center',
        color: theme === 'dark' ? '#f3f4f6' : '#111827'
      },
      sectionId: 'hero'
    }
  ]);

  // Theme effects
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('eternal-ui-theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('eternal-ui-theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
      
      // Update grid and section colors for theme
      setGridConfig(prev => ({
        ...prev,
        color: theme === 'dark' ? '#6366f1' : '#3b82f6'
      }));
      
      setWebPageSections(prev => prev.map(section => ({
        ...section,
        backgroundColor: getSectionBackgroundColor(section.type, theme)
      })));
    }
  }, [theme, mounted]);

  // Get section background color based on type and theme
  const getSectionBackgroundColor = (type: string, currentTheme: 'light' | 'dark'): string => {
    const colors = {
      header: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
      navigation: currentTheme === 'dark' ? '#111827' : '#f8fafc',
      hero: currentTheme === 'dark' ? '#1e293b' : '#f1f5f9',
      content: currentTheme === 'dark' ? '#0f172a' : '#ffffff',
      sidebar: currentTheme === 'dark' ? '#1e293b' : '#f8fafc',
      footer: currentTheme === 'dark' ? '#111827' : '#f9fafb'
    };
    return colors[type as keyof typeof colors] || (currentTheme === 'dark' ? '#1f2937' : '#ffffff');
  };

  // Theme toggle
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  // Calculate total page height
  const totalPageHeight = webPageSections
    .filter(section => section.visible)
    .reduce((total, section) => total + section.height, 0);

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    const currentIndex = zoomLevels.findIndex(level => level.value === zoomLevel);
    if (currentIndex < zoomLevels.length - 1) {
      setZoomLevel(zoomLevels[currentIndex + 1].value);
    }
  }, [zoomLevel]);

  const handleZoomOut = useCallback(() => {
    const currentIndex = zoomLevels.findIndex(level => level.value === zoomLevel);
    if (currentIndex > 0) {
      setZoomLevel(zoomLevels[currentIndex - 1].value);
    }
  }, [zoomLevel]);

  const handleZoomReset = useCallback(() => {
    setZoomLevel(1);
  }, []);

  const handleZoomToFit = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.clientWidth - 100; // Account for padding
      const containerHeight = container.clientHeight - 100;
      
      const scaleX = containerWidth / currentViewport.width;
      const scaleY = containerHeight / totalPageHeight;
      
      const optimalZoom = Math.min(scaleX, scaleY, 1);
      const closestZoom = zoomLevels.reduce((prev, curr) => 
        Math.abs(curr.value - optimalZoom) < Math.abs(prev.value - optimalZoom) ? curr : prev
      );
      
      setZoomLevel(closestZoom.value);
    }
  }, [currentViewport.width, totalPageHeight]);

  // Viewport change handler
  const handleViewportChange = useCallback((viewport: ViewportSize) => {
    setCurrentViewport(viewport);
    
    // Reposition components that are outside new viewport
    setCanvasComponents(prev => prev.map(comp => ({
      ...comp,
      position: {
        x: Math.min(comp.position.x, viewport.width - comp.size.width),
        y: comp.position.y
      }
    })));
  }, []);

  // Add component from library
  const handleAddComponent = useCallback((template: any) => {
    const newComponent: CanvasComponent = {
      id: `${template.id}-${Date.now()}`,
      type: template.id,
      content: template.isTemplate ? template.defaultContent : template.name,
      position: { x: 100, y: 100 },
      size: template.defaultSize,
      styles: template.defaultStyles,
      zIndex: canvasComponents.length + 1
    };

    setCanvasComponents(prev => [...prev, newComponent]);
    setSelectedComponent(newComponent.id);
  }, [canvasComponents.length]);

  // Section management
  const toggleSectionVisibility = useCallback((sectionId: string) => {
    setWebPageSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, visible: !section.visible }
        : section
    ));
  }, []);

  // Color presets
  const colorPresets = [
    { name: 'Blue', value: theme === 'dark' ? '#60a5fa' : '#3b82f6' },
    { name: 'Purple', value: theme === 'dark' ? '#a78bfa' : '#8b5cf6' },
    { name: 'Green', value: theme === 'dark' ? '#4ade80' : '#10b981' },
    { name: 'Red', value: theme === 'dark' ? '#f87171' : '#ef4444' },
    { name: 'Yellow', value: theme === 'dark' ? '#fbbf24' : '#f59e0b' },
    { name: 'Pink', value: theme === 'dark' ? '#f472b6' : '#ec4899' },
    { name: 'Indigo', value: theme === 'dark' ? '#818cf8' : '#6366f1' },
    { name: 'Gray', value: theme === 'dark' ? '#9ca3af' : '#6b7280' }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Enhanced Toolbar with Browser Controls */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between shadow-sm transition-colors duration-300">
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
              {viewportSizes.map((viewport) => (
                <option key={`${viewport.width}x${viewport.height}`} value={`${viewport.width}x${viewport.height}`}>
                  {viewport.name} ({viewport.width}×{viewport.height})
                </option>
              ))}
            </select>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2 border-l border-gray-200 dark:border-gray-700 pl-4">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= zoomLevels[0].value}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            
            <select
              value={zoomLevel}
              onChange={(e) => setZoomLevel(Number(e.target.value))}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-w-[80px]"
            >
              {zoomLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
            
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= zoomLevels[zoomLevels.length - 1].value}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleZoomToFit}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              title="Zoom to fit"
              aria-label="Zoom to fit"
            >
              <Maximize className="w-4 h-4" />
            </button>

            <button
              onClick={handleZoomReset}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              title="Reset zoom"
              aria-label="Reset zoom to 100%"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* View Controls */}
          <div className="flex items-center space-x-2 border-l border-gray-200 dark:border-gray-700 pl-4">
            <button
              onClick={() => setGridConfig(prev => ({ ...prev, visible: !prev.visible }))}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-sm transition-all duration-300 ${
                gridConfig.visible 
                  ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Grid</span>
            </button>

            <button
              onClick={() => setShowSectionManager(!showSectionManager)}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-sm transition-all duration-300 ${
                showSectionManager 
                  ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>Sections</span>
            </button>

            <button
              onClick={() => setShowSectionOutlines(!showSectionOutlines)}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-sm transition-all duration-300 ${
                showSectionOutlines 
                  ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Outlines</span>
            </button>

            <button
              onClick={() => setShowComponentLibrary(!showComponentLibrary)}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-sm transition-all duration-300 ${
                showComponentLibrary 
                  ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Library className="w-4 h-4" />
              <span>Library</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Page Info */}
          <div className="hidden lg:flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700 pr-4">
            <span>Size: {currentViewport.width}×{totalPageHeight}px</span>
            <span>Zoom: {Math.round(zoomLevel * 100)}%</span>
            <span>Components: {canvasComponents.length}</span>
          </div>

          {/* Theme and Export */}
          <button
            onClick={toggleTheme}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            <span className="text-sm">{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>

          <button
            onClick={() => {
              const exportData = {
                viewport: currentViewport,
                zoom: zoomLevel,
                gridConfig,
                sections: webPageSections,
                components: canvasComponents,
                exportedAt: new Date().toISOString()
              };
              const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `website-${currentViewport.name.toLowerCase()}-${Date.now()}.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Component Library */}
        {showComponentLibrary && (
          <ComponentLibrary
            onAddComponent={handleAddComponent}
            theme={theme}
          />
        )}

        {/* Scrollable Canvas Container */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-800 relative"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)
            `,
            backgroundSize: '20px 20px'
          }}
        >
          {/* Browser-Style Canvas */}
          <div
            className="relative mx-auto my-8"
            style={{
              width: currentViewport.width * zoomLevel,
              height: totalPageHeight * zoomLevel,
              minWidth: currentViewport.width * zoomLevel,
              minHeight: totalPageHeight * zoomLevel,
            }}
          >
            {/* Browser Frame */}
            <div 
              className="relative bg-white dark:bg-gray-900 shadow-2xl rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700"
              style={{
                width: '100%',
                height: '100%',
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'top left',
              }}
            >
              {/* Browser Header */}
              <div className="h-8 bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center px-3">
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

              {/* Page Content */}
              <div 
                ref={canvasRef}
                className="relative"
                style={{ 
                  width: currentViewport.width,
                  height: totalPageHeight
                }}
              >
                {/* Web Page Sections */}
                {webPageSections
                  .filter(section => section.visible)
                  .sort((a, b) => a.order - b.order)
                  .map((section, index) => {
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
                          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                            {section.name} ({section.height}px)
                          </div>
                        )}
                      </div>
                    );
                  })}

                {/* Grid Overlay */}
                {gridConfig.visible && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, ${gridConfig.color}${Math.round(gridConfig.opacity * 255).toString(16).padStart(2, '0')} 1px, transparent 1px),
                        linear-gradient(to bottom, ${gridConfig.color}${Math.round(gridConfig.opacity * 255).toString(16).padStart(2, '0')} 1px, transparent 1px)
                      `,
                      backgroundSize: `${(gridConfig.cellSize + gridConfig.gap)}px ${(gridConfig.cellSize + gridConfig.gap)}px`,
                      backgroundPosition: `${gridConfig.gap}px ${gridConfig.gap}px`,
                      zIndex: 10
                    }}
                  />
                )}

                {/* Components */}
                {canvasComponents.map(component => (
                  <DraggableResizableComponent
                    key={component.id}
                    component={component}
                    isSelected={selectedComponent === component.id}
                    onMouseDown={() => setSelectedComponent(component.id)}
                    onResizeStart={() => {}}
                    onMinimize={() => {}}
                    onDelete={() => {
                      setCanvasComponents(prev => prev.filter(c => c.id !== component.id));
                      if (selectedComponent === component.id) {
                        setSelectedComponent(null);
                      }
                    }}
                    theme={theme}
                    gridConfig={gridConfig}
                    showGrid={gridConfig.visible}
                  />
                ))}

                {/* Empty State */}
                {canvasComponents.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                      <Globe className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        Start Building Your Website
                      </h3>
                      <p className="text-gray-500 dark:text-gray-500 max-w-sm">
                        Drag components from the library to create your webpage layout
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        {selectedComponent && (
          <DarkModePropertiesPanel 
            component={canvasComponents.find(c => c.id === selectedComponent)!}
            onUpdate={(updates) => {
              setCanvasComponents(prev => 
                prev.map(c => c.id === selectedComponent ? { ...c, ...updates } : c)
              );
            }}
            gridConfig={gridConfig}
            sections={[]} // Convert webPageSections to GridSection format if needed
            theme={theme}
          />
        )}
      </div>
    </div>
  );
};

export default BrowserGridSystem;