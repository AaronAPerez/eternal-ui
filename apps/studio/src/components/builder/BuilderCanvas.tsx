'use client';

import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import { Monitor, Globe, Ruler, Smartphone, Tablet } from 'lucide-react';

interface BuilderCanvasProps {
  currentViewport: any;
  zoomLevel: number;
  gridConfig: any;
  showSectionOutlines: boolean;
  selectedComponent: string | null;
  theme: 'light' | 'dark';
  themeColors: any;
  currentMode: string;
  onSelectComponent: (id: string | null) => void;
}

/**
 * Enhanced Builder Canvas Component
 * 
 * Professional canvas with:
 * - Responsive viewport simulation
 * - Grid overlay system
 * - Drag and drop functionality
 * - Component selection and highlighting
 * - Performance optimized rendering
 * - Accessibility features
 * - Professional browser mockup
 */
const BuilderCanvas = forwardRef<HTMLDivElement, BuilderCanvasProps>(({
  currentViewport,
  zoomLevel,
  gridConfig,
  showSectionOutlines,
  selectedComponent,
  theme,
  themeColors,
  currentMode,
  onSelectComponent
}, ref) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragPreview, setDragPreview] = useState<{ x: number; y: number } | null>(null);
  const [canvasComponents, setCanvasComponents] = useState<any[]>([]);
  
  const canvasContentRef = useRef<HTMLDivElement>(null);

  // Sample components for demonstration
  const sampleComponents = [
    {
      id: 'hero-1',
      type: 'hero',
      content: 'Hero Section',
      position: { x: 0, y: 0 },
      size: { width: currentViewport.width, height: 400 },
      styles: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        fontWeight: 'bold'
      }
    },
    {
      id: 'features-1',
      type: 'section',
      content: 'Features Section',
      position: { x: 0, y: 420 },
      size: { width: currentViewport.width, height: 300 },
      styles: {
        background: theme === 'dark' ? '#1f2937' : '#f9fafb',
        color: theme === 'dark' ? '#f3f4f6' : '#111827',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`
      }
    }
  ];

  // Initialize sample components
  useEffect(() => {
    if (canvasComponents.length === 0) {
      setCanvasComponents(sampleComponents);
    }
  }, [currentViewport.width, theme]);

  // Handle component selection
  const handleComponentClick = useCallback((componentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectComponent(componentId);
  }, [onSelectComponent]);

  // Handle canvas click (deselect)
  const handleCanvasClick = useCallback(() => {
    onSelectComponent(null);
  }, [onSelectComponent]);

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    
    const componentType = e.dataTransfer.getData('application/component-type');
    if (!componentType) return;

    const rect = canvasContentRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / zoomLevel;
    const y = (e.clientY - rect.top) / zoomLevel;

    // Snap to grid if enabled
    const snappedPosition = gridConfig.snapEnabled 
      ? snapToGrid(x, y)
      : { x, y };

    const newComponent = {
      id: `${componentType}-${Date.now()}`,
      type: componentType,
      content: `New ${componentType}`,
      position: snappedPosition,
      size: { width: 200, height: 100 },
      styles: {
        background: theme === 'dark' ? '#374151' : '#f3f4f6',
        color: theme === 'dark' ? '#f3f4f6' : '#111827',
        border: `2px solid ${themeColors.primary}`,
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }
    };

    setCanvasComponents(prev => [...prev, newComponent]);
    onSelectComponent(newComponent.id);
  }, [zoomLevel, gridConfig.snapEnabled, theme, themeColors.primary, onSelectComponent]);

  // Snap to grid function
  const snapToGrid = (x: number, y: number) => {
    const cellWidth = currentViewport.width / gridConfig.columns;
    const cellHeight = gridConfig.cellSize;
    
    return {
      x: Math.round(x / cellWidth) * cellWidth,
      y: Math.round(y / cellHeight) * cellHeight
    };
  };

  // Generate grid pattern
  const generateGridPattern = () => {
    if (!gridConfig.visible) return null;

    const cellWidth = currentViewport.width / gridConfig.columns;
    const cellHeight = gridConfig.cellSize;
    const patternId = `grid-pattern-${theme}`;

    return (
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 10 }}
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width={cellWidth}
            height={cellHeight}
            patternUnits="userSpaceOnUse"
          >
            {gridConfig.style === 'lines' && (
              <>
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2={cellHeight}
                  stroke={gridConfig.color}
                  strokeWidth="1"
                  opacity={gridConfig.opacity}
                />
                <line
                  x1="0"
                  y1="0"
                  x2={cellWidth}
                  y2="0"
                  stroke={gridConfig.color}
                  strokeWidth="1"
                  opacity={gridConfig.opacity}
                />
              </>
            )}
            {gridConfig.style === 'dots' && (
              <circle
                cx="0"
                cy="0"
                r="1"
                fill={gridConfig.color}
                opacity={gridConfig.opacity}
              />
            )}
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
        />
      </svg>
    );
  };

  return (
    <div className="builder-canvas-scroll flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 p-6">
      {/* Browser Mockup */}
      <div 
        className="builder-browser-mock mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        style={{
          width: currentViewport.width * zoomLevel,
          height: (currentViewport.height * zoomLevel) + 40, // Add space for browser header
          minHeight: '600px',
          maxWidth: '100%'
        }}
      >
        {/* Browser Header */}
        <div className="builder-browser-header bg-gray-100 dark:bg-gray-700 px-4 py-2 flex items-center justify-between border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <Globe className="w-3 h-3" />
            <span>preview.eternal-ui.com</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
            {currentViewport.category === 'desktop' && <Monitor className="w-3 h-3" />}
            {currentViewport.category === 'tablet' && <Tablet className="w-3 h-3" />}
            {currentViewport.category === 'mobile' && <Smartphone className="w-3 h-3" />}
            <span>{currentViewport.width}×{currentViewport.height}</span>
          </div>
        </div>

        {/* Canvas Content */}
        <div
          ref={canvasContentRef}
          className="builder-canvas-content relative bg-white dark:bg-gray-900"
          style={{
            width: currentViewport.width * zoomLevel,
            height: currentViewport.height * zoomLevel,
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top left',
            overflow: 'visible'
          }}
          onClick={handleCanvasClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* Grid Overlay */}
          {generateGridPattern()}

          {/* Canvas Components */}
          {canvasComponents.map((component) => (
            <div
              key={component.id}
              className={`absolute transition-all duration-200 ${
                selectedComponent === component.id 
                  ? 'ring-2 ring-indigo-500 ring-offset-2' 
                  : 'hover:ring-2 hover:ring-indigo-300'
              }`}
              style={{
                left: component.position.x,
                top: component.position.y,
                width: component.size.width,
                height: component.size.height,
                ...component.styles,
                zIndex: selectedComponent === component.id ? 20 : 1
              }}
              onClick={(e) => handleComponentClick(component.id, e)}
            >
              {component.content}
              
              {/* Selection Handles */}
              {selectedComponent === component.id && (
                <>
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-indigo-500 border border-white rounded-full cursor-nw-resize"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 border border-white rounded-full cursor-ne-resize"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-indigo-500 border border-white rounded-full cursor-sw-resize"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-indigo-500 border border-white rounded-full cursor-se-resize"></div>
                </>
              )}
            </div>
          ))}

          {/* Empty State */}
          {canvasComponents.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <div className="w-16 h-16 mx-auto mb-4 opacity-30">
                  <Monitor className="w-full h-full" />
                </div>
                <h3 className="text-lg font-medium mb-2">Start Building</h3>
                <p className="text-sm">Drag components from the sidebar to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Canvas Info */}
      <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        Canvas: {currentViewport.name} • Zoom: {Math.round(zoomLevel * 100)}% • Mode: {currentMode}
      </div>
    </div>
  );
});

BuilderCanvas.displayName = 'BuilderCanvas';

export default BuilderCanvas;
`: '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
`