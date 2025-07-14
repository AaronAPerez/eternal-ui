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
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useGridSnap, EnhancedGridOverlay, SnapGuides } from './GridSnapSystem';

import ComponentLibrary from './ComponentLibrary';
import DraggableResizableComponent from './DraggableResizableComponent';
import DarkModePropertiesPanel from './DarkModePropertiesPanel';
import DarkModeGridControlsPanel from './DarkModeGridControlsPanel';


// Enhanced Types
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
}

interface ComponentTemplate {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  tags: string[];
  preview: string;
  defaultSize: { width: number; height: number };
  defaultContent: string;
  defaultStyles: Record<string, string>;
  isTemplate?: boolean;
}

interface GridSection {
  id: string;
  name: string;
  startCol: number;
  endCol: number;
  startRow: number;
  endRow: number;
  color: string;
  visible: boolean;
}

interface DragState {
  isDragging: boolean;
  draggedId: string | null;
  dragOffset: { x: number; y: number };
  startPosition: { x: number; y: number };
}

interface ResizeState {
  isResizing: boolean;
  resizeId: string | null;
  resizeHandle: string | null;
  startSize: { width: number; height: number };
  startPosition: { x: number; y: number };
}

interface DarkModeEnhancedGridSystemProps {
  initialTheme?: 'light' | 'dark';
}

/**
 * Enhanced Grid System with Component Library and Fixed Snap Alignment
 */
const DarkModeEnhancedGridSystem: React.FC<DarkModeEnhancedGridSystemProps> = ({ 
  initialTheme = 'light' 
}) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);
  const [mounted, setMounted] = useState(false);

  // Grid configuration
  const [gridConfig, setGridConfig] = useState<GridConfig>({
    visible: true,
    snapEnabled: true,
    columns: 12,
    rows: 8,
    cellSize: 60,
    gap: 16,
    opacity: 0.3,
    color: theme === 'dark' ? '#6366f1' : '#3b82f6',
    style: 'lines'
  });

  // UI state
  const [showGridControls, setShowGridControls] = useState(true);
  const [showComponentLibrary, setShowComponentLibrary] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);

  // Drag and resize states
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedId: null,
    dragOffset: { x: 0, y: 0 },
    startPosition: { x: 0, y: 0 }
  });

  const [resizeState, setResizeState] = useState<ResizeState>({
    isResizing: false,
    resizeId: null,
    resizeHandle: null,
    startSize: { width: 0, height: 0 },
    startPosition: { x: 0, y: 0 }
  });

  // Snap state
  const [currentSnapResult, setCurrentSnapResult] = useState<any>(null);

  // Refs
  const canvasRef = useRef<HTMLDivElement>(null);

  // Grid snap system
  const { 
    calculateSnapPosition, 
    pixelToGrid, 
    gridToPixel,
    generateGridBackground,
    getBackgroundSize,
    getBackgroundPosition 
  } = useGridSnap(gridConfig, canvasRef);

  // Sample sections
  const [sections, setSections] = useState<GridSection[]>([
    {
      id: '1',
      name: 'Header',
      startCol: 1,
      endCol: 12,
      startRow: 1,
      endRow: 2,
      color: theme === 'dark' ? '#10b981' : '#059669',
      visible: true
    },
    {
      id: '2',
      name: 'Main Content',
      startCol: 1,
      endCol: 9,
      startRow: 3,
      endRow: 6,
      color: theme === 'dark' ? '#8b5cf6' : '#7c3aed',
      visible: true
    },
    {
      id: '3',
      name: 'Sidebar',
      startCol: 10,
      endCol: 12,
      startRow: 3,
      endRow: 6,
      color: theme === 'dark' ? '#f59e0b' : '#d97706',
      visible: true
    },
    {
      id: '4',
      name: 'Footer',
      startCol: 1,
      endCol: 12,
      startRow: 7,
      endRow: 8,
      color: theme === 'dark' ? '#ef4444' : '#dc2626',
      visible: true
    }
  ]);

  // Canvas components
  const [canvasComponents, setCanvasComponents] = useState<CanvasComponent[]>([]);

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
      
      setGridConfig(prev => ({
        ...prev,
        color: theme === 'dark' ? '#6366f1' : '#3b82f6'
      }));
    }
  }, [theme, mounted]);

  // Theme toggle
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  // Add component from library
  const handleAddComponent = useCallback((template: ComponentTemplate) => {
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

  // Enhanced drag handlers with snap
  const handleMouseDown = useCallback((e: React.MouseEvent, componentId: string) => {
    if (e.button !== 0) return;
    
    const component = canvasComponents.find(c => c.id === componentId);
    if (!component || component.isLocked) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;

    setDragState({
      isDragging: true,
      draggedId: componentId,
      dragOffset: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      },
      startPosition: component.position
    });

    setSelectedComponent(componentId);
    e.preventDefault();
  }, [canvasComponents]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (dragState.isDragging && dragState.draggedId && canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const rawPosition = {
        x: e.clientX - canvasRect.left - dragState.dragOffset.x,
        y: e.clientY - canvasRect.top - dragState.dragOffset.y
      };

      const component = canvasComponents.find(c => c.id === dragState.draggedId);
      if (!component) return;

      // Calculate snap position
      const snapResult = calculateSnapPosition(rawPosition, component.size);
      setCurrentSnapResult(snapResult);

      // Update component position
      setCanvasComponents(prev => 
        prev.map(comp => 
          comp.id === dragState.draggedId 
            ? { ...comp, position: snapResult.position }
            : comp
        )
      );
    }

    // Handle resize logic (existing code)
    if (resizeState.isResizing && resizeState.resizeId && canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const currentX = e.clientX - canvasRect.left;
      const currentY = e.clientY - canvasRect.top;

      const component = canvasComponents.find(c => c.id === resizeState.resizeId);
      if (!component) return;

      let newSize = { ...component.size };
      let newPosition = { ...component.position };

      const deltaX = currentX - resizeState.startPosition.x;
      const deltaY = currentY - resizeState.startPosition.y;

      switch (resizeState.resizeHandle) {
        case 'se':
          newSize.width = Math.max(50, resizeState.startSize.width + deltaX);
          newSize.height = Math.max(30, resizeState.startSize.height + deltaY);
          break;
        case 'sw':
          newSize.width = Math.max(50, resizeState.startSize.width - deltaX);
          newSize.height = Math.max(30, resizeState.startSize.height + deltaY);
          newPosition.x = component.position.x + deltaX;
          break;
        case 'ne':
          newSize.width = Math.max(50, resizeState.startSize.width + deltaX);
          newSize.height = Math.max(30, resizeState.startSize.height - deltaY);
          newPosition.y = component.position.y + deltaY;
          break;
        case 'nw':
          newSize.width = Math.max(50, resizeState.startSize.width - deltaX);
          newSize.height = Math.max(30, resizeState.startSize.height - deltaY);
          newPosition.x = component.position.x + deltaX;
          newPosition.y = component.position.y + deltaY;
          break;
        case 'e':
          newSize.width = Math.max(50, resizeState.startSize.width + deltaX);
          break;
        case 'w':
          newSize.width = Math.max(50, resizeState.startSize.width - deltaX);
          newPosition.x = component.position.x + deltaX;
          break;
        case 'n':
          newSize.height = Math.max(30, resizeState.startSize.height - deltaY);
          newPosition.y = component.position.y + deltaY;
          break;
        case 's':
          newSize.height = Math.max(30, resizeState.startSize.height + deltaY);
          break;
      }

      setCanvasComponents(prev => 
        prev.map(comp => 
          comp.id === resizeState.resizeId 
            ? { ...comp, size: newSize, position: newPosition }
            : comp
        )
      );
    }
  }, [dragState, resizeState, canvasComponents, calculateSnapPosition]);

  const handleMouseUp = useCallback(() => {
    setDragState({
      isDragging: false,
      draggedId: null,
      dragOffset: { x: 0, y: 0 },
      startPosition: { x: 0, y: 0 }
    });

    setResizeState({
      isResizing: false,
      resizeId: null,
      resizeHandle: null,
      startSize: { width: 0, height: 0 },
      startPosition: { x: 0, y: 0 }
    });

    setCurrentSnapResult(null);
  }, []);

  // Resize handlers
  const handleResizeStart = useCallback((e: React.MouseEvent, componentId: string, handle: string) => {
    e.stopPropagation();
    
    const component = canvasComponents.find(c => c.id === componentId);
    if (!component || !canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    
    setResizeState({
      isResizing: true,
      resizeId: componentId,
      resizeHandle: handle,
      startSize: component.size,
      startPosition: {
        x: e.clientX - canvasRect.left,
        y: e.clientY - canvasRect.top
      }
    });

    setSelectedComponent(componentId);
    e.preventDefault();
  }, [canvasComponents]);

  // Component management
  const toggleMinimize = useCallback((componentId: string) => {
    setCanvasComponents(prev => 
      prev.map(comp => 
        comp.id === componentId 
          ? { ...comp, isMinimized: !comp.isMinimized }
          : comp
      )
    );
  }, []);

  const deleteComponent = useCallback((componentId: string) => {
    setCanvasComponents(prev => prev.filter(comp => comp.id !== componentId));
    if (selectedComponent === componentId) {
      setSelectedComponent(null);
    }
  }, [selectedComponent]);

  const duplicateComponent = useCallback((componentId: string) => {
    const component = canvasComponents.find(c => c.id === componentId);
    if (!component) return;

    const newComponent: CanvasComponent = {
      ...component,
      id: `${component.id}-copy-${Date.now()}`,
      position: {
        x: component.position.x + 20,
        y: component.position.y + 20
      },
      zIndex: (component.zIndex || 0) + 1
    };

    setCanvasComponents(prev => [...prev, newComponent]);
    setSelectedComponent(newComponent.id);
  }, [canvasComponents]);

  // Global mouse events
  useEffect(() => {
    if (dragState.isDragging || resizeState.isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = dragState.isDragging ? 'grabbing' : 'resizing';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'default';
      };
    }
  }, [dragState.isDragging, resizeState.isResizing, handleMouseMove, handleMouseUp]);

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
      {/* Enhanced Toolbar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between shadow-sm transition-colors duration-300">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Grid className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
            <span className="font-semibold text-gray-900 dark:text-gray-100">Enhanced Grid System</span>
          </div>

          {/* Grid Toggle */}
          <button
            onClick={() => setGridConfig(prev => ({ ...prev, visible: !prev.visible }))}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${
              gridConfig.visible 
                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            aria-label="Toggle grid visibility"
          >
            {gridConfig.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span className="text-sm">Grid</span>
          </button>

          {/* Snap Toggle */}
          <button
            onClick={() => setGridConfig(prev => ({ ...prev, snapEnabled: !prev.snapEnabled }))}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${
              gridConfig.snapEnabled 
                ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            aria-label="Toggle snap to grid"
          >
            <Move className="w-4 h-4" />
            <span className="text-sm">Snap</span>
          </button>

          {/* Component Library Toggle */}
          <button
            onClick={() => setShowComponentLibrary(!showComponentLibrary)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${
              showComponentLibrary 
                ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            aria-label="Toggle component library"
          >
            <Library className="w-4 h-4" />
            <span className="text-sm">Library</span>
          </button>

          {/* Controls Panel Toggle */}
          <button
            onClick={() => setShowGridControls(!showGridControls)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${
              showGridControls 
                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            aria-label="Toggle controls panel"
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Controls</span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          {/* Stats Display */}
          <div className="hidden md:flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
            <span>Components: {canvasComponents.length}</span>
            <span>Grid: {gridConfig.columns}×{gridConfig.rows}</span>
            {selectedComponent && (
              <span className="text-indigo-600 dark:text-indigo-400">
                Selected: {pixelToGrid(canvasComponents.find(c => c.id === selectedComponent)?.position || { x: 0, y: 0 }).col},{pixelToGrid(canvasComponents.find(c => c.id === selectedComponent)?.position || { x: 0, y: 0 }).row}
              </span>
            )}
          </div>

          {/* Code Toggle */}
          <button
            onClick={() => setShowCode(!showCode)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${
              showCode 
                ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            aria-label="Toggle code view"
          >
            <Code className="w-4 h-4" />
            <span className="text-sm">Code</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            <span className="text-sm">{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>

          {/* Export Button */}
          <button
            onClick={() => {
              const exportData = {
                gridConfig,
                components: canvasComponents,
                sections,
                exportedAt: new Date().toISOString()
              };
              const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'grid-layout.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300"
            aria-label="Export grid configuration"
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

        {/* Grid Controls Panel */}
        {showGridControls && (
          <DarkModeGridControlsPanel 
            gridConfig={gridConfig}
            setGridConfig={setGridConfig}
            sections={sections}
            setSections={setSections}
            colorPresets={colorPresets}
            theme={theme}
          />
        )}

        {/* Canvas Area */}
        <div className="flex-1 relative overflow-auto bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <div 
            ref={canvasRef}
            className="relative min-h-full min-w-full p-4"
            style={{ 
              backgroundImage: gridConfig.visible ? generateGridBackground(theme) : 'none',
              backgroundSize: getBackgroundSize(),
              backgroundPosition: getBackgroundPosition(),
              backgroundRepeat: 'repeat'
            }}
          >
            {/* Enhanced Grid Overlay */}
            <EnhancedGridOverlay 
              gridConfig={gridConfig}
              theme={theme}
              canvasRef={canvasRef}
            />

            {/* Grid Sections Overlay */}
            {gridConfig.visible && sections.filter(section => section.visible).map(section => {
              const startPos = gridToPixel({ col: section.startCol - 1, row: section.startRow - 1 });
              const endPos = gridToPixel({ col: section.endCol, row: section.endRow });
              
              return (
                <div
                  key={section.id}
                  className="absolute pointer-events-none border-2 border-dashed rounded-lg"
                  style={{
                    left: startPos.x,
                    top: startPos.y,
                    width: endPos.x - startPos.x,
                    height: endPos.y - startPos.y,
                    borderColor: section.color,
                    backgroundColor: `${section.color}10`,
                  }}
                >
                  <div 
                    className="absolute -top-6 left-0 text-xs font-medium px-2 py-1 rounded"
                    style={{ 
                      backgroundColor: section.color,
                      color: 'white'
                    }}
                  >
                    {section.name}
                  </div>
                </div>
              );
            })}

            {/* Snap Guides */}
            <SnapGuides 
              snapResult={currentSnapResult}
              gridConfig={gridConfig}
              theme={theme}
            />

            {/* Canvas Components */}
            {canvasComponents.map(component => (
              <DraggableResizableComponent
                key={component.id}
                component={component}
                isSelected={selectedComponent === component.id}
                onMouseDown={(e) => handleMouseDown(e, component.id)}
                onResizeStart={(e, handle) => handleResizeStart(e, component.id, handle)}
                onMinimize={() => toggleMinimize(component.id)}
                onDelete={() => deleteComponent(component.id)}
                onDuplicate={() => duplicateComponent(component.id)}
                theme={theme}
                gridConfig={gridConfig}
                showGrid={gridConfig.visible}
              />
            ))}

            {/* Empty State */}
            {canvasComponents.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <Grid className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Start Building
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500 max-w-sm">
                    Drag components from the library to start building your layout
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Code View Panel */}
        {showCode && (
          <div className="w-96 bg-gray-900 text-green-400 p-4 font-mono text-sm overflow-auto">
            <div className="mb-4">
              <h3 className="text-white font-bold mb-2 flex items-center">
                <Code className="w-4 h-4 mr-2" />
                Generated Code
              </h3>
              <div className="mb-4">
                <h4 className="text-green-300 text-xs mb-2">GRID CONFIGURATION:</h4>
                <pre className="whitespace-pre-wrap text-xs">
{`const gridConfig = ${JSON.stringify(gridConfig, null, 2)};`}
                </pre>
              </div>
              
              <div className="mb-4">
                <h4 className="text-green-300 text-xs mb-2">COMPONENTS:</h4>
                <pre className="whitespace-pre-wrap text-xs">
{`const components = [
${canvasComponents.map(comp => `  {
    id: "${comp.id}",
    type: "${comp.type}",
    content: "${comp.content.replace(/"/g, '\\"')}",
    position: { x: ${comp.position.x}, y: ${comp.position.y} },
    size: { width: ${comp.size.width}, height: ${comp.size.height} },
    grid: { col: ${pixelToGrid(comp.position).col}, row: ${pixelToGrid(comp.position).row} }
  }`).join(',\n')}
];`}
                </pre>
              </div>

              <div>
                <h4 className="text-green-300 text-xs mb-2">REACT COMPONENT:</h4>
                <pre className="whitespace-pre-wrap text-xs">
{`function GridLayout() {
  return (
    <div className="grid-layout" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(${gridConfig.columns}, 1fr)',
      gridTemplateRows: 'repeat(${gridConfig.rows}, 1fr)',
      gap: '${gridConfig.gap}px',
      minHeight: '100vh'
    }}>
${canvasComponents.map(comp => {
  const gridPos = pixelToGrid(comp.position);
  return `      <div className="${comp.type}" style={{
        gridColumn: '${gridPos.col + 1}',
        gridRow: '${gridPos.row + 1}',
        ...${JSON.stringify(comp.styles, null, 8).replace(/\n/g, '\n        ')}
      }}>
        ${comp.content}
      </div>`;
}).join('\n')}
    </div>
  );
}`}
                </pre>
              </div>
            </div>
          </div>
        )}

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
            sections={sections}
            theme={theme}
          />
        )}
      </div>
    </div>
  );
};

export default DarkModeEnhancedGridSystem;