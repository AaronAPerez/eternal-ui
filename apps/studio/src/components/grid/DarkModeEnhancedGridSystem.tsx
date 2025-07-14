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
  Palette,
  RotateCcw,
  Download,
  Upload,
  Copy,
  Trash2,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Code,
  Plus,
  Maximize,
  Minimize
} from 'lucide-react';
import DarkModePropertiesPanel from '../builder/DarkModePropertiesPanel';
import DraggableResizableComponent from '../builder/DraggableResizableComponent';
import DarkModeGridControlsPanel from '../builder/DarkModeGridControlsPanel';

// Enhanced Types for Drag & Drop and Resizing
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

interface CanvasComponent {
  id: string;
  type: string;
  content: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  styles: Record<string, string>;
  isMinimized?: boolean;
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

interface ColorPreset {
  name: string;
  value: string;
}

interface DarkModeEnhancedGridSystemProps {
  initialTheme?: 'light' | 'dark';
}

/**
 * Dark Mode Enhanced Grid System with Drag & Drop and Resizing
 * Professional-grade visual builder component
 */
const DarkModeEnhancedGridSystem: React.FC<DarkModeEnhancedGridSystemProps> = ({ 
  initialTheme = 'light' 
}) => {
  // Theme state management
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);
  const [mounted, setMounted] = useState(false);

  // Grid configuration state
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

  // Refs
  const canvasRef = useRef<HTMLDivElement>(null);

  // Grid sections state
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

  // Canvas components state with sample components
  const [canvasComponents, setCanvasComponents] = useState<CanvasComponent[]>([
    {
      id: 'comp-1',
      type: 'button',
      content: 'Click Me',
      position: { x: 100, y: 100 },
      size: { width: 120, height: 40 },
      styles: { backgroundColor: '#3b82f6', color: 'white' }
    },
    {
      id: 'comp-2',
      type: 'text',
      content: 'Sample Text',
      position: { x: 300, y: 150 },
      size: { width: 200, height: 60 },
      styles: { fontSize: '16px', padding: '10px' }
    },
    {
      id: 'comp-3',
      type: 'card',
      content: 'Card Component',
      position: { x: 150, y: 250 },
      size: { width: 250, height: 120 },
      styles: { border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }
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
      
      setGridConfig(prev => ({
        ...prev,
        color: theme === 'dark' ? '#6366f1' : '#3b82f6'
      }));
    }
  }, [theme, mounted]);

  // Theme toggle function
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  // Snap to grid function
  const snapToGrid = useCallback((x: number, y: number) => {
    if (!gridConfig.snapEnabled) return { x, y };
    
    const cellWithGap = gridConfig.cellSize + gridConfig.gap;
    const snappedX = Math.round(x / cellWithGap) * cellWithGap;
    const snappedY = Math.round(y / cellWithGap) * cellWithGap;
    
    return { x: snappedX, y: snappedY };
  }, [gridConfig.snapEnabled, gridConfig.cellSize, gridConfig.gap]);

  // Drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent, componentId: string) => {
    if (e.button !== 0) return; // Only left click
    
    const component = canvasComponents.find(c => c.id === componentId);
    if (!component) return;

    const rect = e.currentTarget.getBoundingClientRect();
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
      const newPosition = {
        x: e.clientX - canvasRect.left - dragState.dragOffset.x,
        y: e.clientY - canvasRect.top - dragState.dragOffset.y
      };

      const snappedPosition = snapToGrid(newPosition.x, newPosition.y);

      setCanvasComponents(prev => 
        prev.map(comp => 
          comp.id === dragState.draggedId 
            ? { ...comp, position: snappedPosition }
            : comp
        )
      );
    }

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
        case 'se': // Southeast
          newSize.width = Math.max(50, resizeState.startSize.width + deltaX);
          newSize.height = Math.max(30, resizeState.startSize.height + deltaY);
          break;
        case 'sw': // Southwest
          newSize.width = Math.max(50, resizeState.startSize.width - deltaX);
          newSize.height = Math.max(30, resizeState.startSize.height + deltaY);
          newPosition.x = component.position.x + deltaX;
          break;
        case 'ne': // Northeast
          newSize.width = Math.max(50, resizeState.startSize.width + deltaX);
          newSize.height = Math.max(30, resizeState.startSize.height - deltaY);
          newPosition.y = component.position.y + deltaY;
          break;
        case 'nw': // Northwest
          newSize.width = Math.max(50, resizeState.startSize.width - deltaX);
          newSize.height = Math.max(30, resizeState.startSize.height - deltaY);
          newPosition.x = component.position.x + deltaX;
          newPosition.y = component.position.y + deltaY;
          break;
        case 'e': // East
          newSize.width = Math.max(50, resizeState.startSize.width + deltaX);
          break;
        case 'w': // West
          newSize.width = Math.max(50, resizeState.startSize.width - deltaX);
          newPosition.x = component.position.x + deltaX;
          break;
        case 'n': // North
          newSize.height = Math.max(30, resizeState.startSize.height - deltaY);
          newPosition.y = component.position.y + deltaY;
          break;
        case 's': // South
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
  }, [dragState, resizeState, snapToGrid, canvasComponents]);

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

  // Add new component
  const addComponent = useCallback(() => {
    const newComponent: CanvasComponent = {
      id: `comp-${Date.now()}`,
      type: 'element',
      content: 'New Element',
      position: { x: 50, y: 50 },
      size: { width: 150, height: 80 },
      styles: { 
        backgroundColor: theme === 'dark' ? '#374151' : '#f3f4f6',
        border: '2px solid #6366f1',
        borderRadius: '8px',
        padding: '12px'
      }
    };
    
    setCanvasComponents(prev => [...prev, newComponent]);
    setSelectedComponent(newComponent.id);
  }, [theme]);

  // Toggle component minimized state
  const toggleMinimize = useCallback((componentId: string) => {
    setCanvasComponents(prev => 
      prev.map(comp => 
        comp.id === componentId 
          ? { ...comp, isMinimized: !comp.isMinimized }
          : comp
      )
    );
  }, []);

  // Delete component
  const deleteComponent = useCallback((componentId: string) => {
    setCanvasComponents(prev => prev.filter(comp => comp.id !== componentId));
    setSelectedComponent(null);
  }, []);

  // Color presets for theme-aware colors
  const colorPresets: ColorPreset[] = [
    { name: 'Blue', value: theme === 'dark' ? '#60a5fa' : '#3b82f6' },
    { name: 'Purple', value: theme === 'dark' ? '#a78bfa' : '#8b5cf6' },
    { name: 'Green', value: theme === 'dark' ? '#4ade80' : '#10b981' },
    { name: 'Red', value: theme === 'dark' ? '#f87171' : '#ef4444' },
    { name: 'Yellow', value: theme === 'dark' ? '#fbbf24' : '#f59e0b' },
    { name: 'Pink', value: theme === 'dark' ? '#f472b6' : '#ec4899' },
    { name: 'Indigo', value: theme === 'dark' ? '#818cf8' : '#6366f1' },
    { name: 'Gray', value: theme === 'dark' ? '#9ca3af' : '#6b7280' }
  ];

  // Prevent hydration mismatch
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

          {/* Add Component */}
          <button
            onClick={addComponent}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800/50 transition-all duration-300"
            aria-label="Add new component"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add</span>
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
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300"
            aria-label="Export grid configuration"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
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
              backgroundImage: gridConfig.visible ? generateGridBackground(gridConfig, theme) : 'none',
              backgroundSize: `${gridConfig.cellSize + gridConfig.gap}px ${gridConfig.cellSize + gridConfig.gap}px`,
              backgroundPosition: `${gridConfig.gap}px ${gridConfig.gap}px`
            }}
          >
            {/* Grid Sections Overlay */}
            {gridConfig.visible && sections.filter(section => section.visible).map(section => (
              <div
                key={section.id}
                className="absolute pointer-events-none border-2 border-dashed rounded-lg"
                style={{
                  left: (section.startCol - 1) * (gridConfig.cellSize + gridConfig.gap) + gridConfig.gap,
                  top: (section.startRow - 1) * (gridConfig.cellSize + gridConfig.gap) + gridConfig.gap,
                  width: (section.endCol - section.startCol + 1) * gridConfig.cellSize + (section.endCol - section.startCol) * gridConfig.gap,
                  height: (section.endRow - section.startRow + 1) * gridConfig.cellSize + (section.endRow - section.startRow) * gridConfig.gap,
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
            ))}

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
                theme={theme}
              />
            ))}
          </div>
        </div>

        {/* Code View Panel */}
        {showCode && (
          <div className="w-96 bg-gray-900 text-green-400 p-4 font-mono text-sm overflow-auto">
            <div className="mb-4">
              <h3 className="text-white font-bold mb-2">Generated Code</h3>
              <pre className="whitespace-pre-wrap">
{`// Grid Configuration
const gridConfig = ${JSON.stringify(gridConfig, null, 2)};

// Components
const components = [
${canvasComponents.map(comp => `  {
    id: "${comp.id}",
    type: "${comp.type}",
    content: "${comp.content}",
    position: { x: ${comp.position.x}, y: ${comp.position.y} },
    size: { width: ${comp.size.width}, height: ${comp.size.height} }
  }`).join(',\n')}
];`}
              </pre>
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

// Helper function to generate grid background
const generateGridBackground = (gridConfig: GridConfig, theme: 'light' | 'dark'): string => {
  const size = gridConfig.cellSize + gridConfig.gap;
  const color = gridConfig.color;
  const opacity = gridConfig.opacity;
  
  if (gridConfig.style === 'dots') {
    return `radial-gradient(circle, ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 1px, transparent 1px)`;
  } else if (gridConfig.style === 'lines') {
    return `
      linear-gradient(to right, ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 1px, transparent 1px),
      linear-gradient(to bottom, ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 1px, transparent 1px)
    `;
  } else {
    return `
      repeating-linear-gradient(
        to right,
        ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')},
        ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 1px,
        transparent 1px,
        transparent ${size}px
      ),
      repeating-linear-gradient(
        to bottom,
        ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')},
        ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 1px,
        transparent 1px,
        transparent ${size}px
      )
    `;
  }
};

export default DarkModeEnhancedGridSystem;

// // Draggable and Resizable Component
// interface DraggableResizableComponentProps {
//   component: CanvasComponent;
//   isSelected: boolean;
//   onMouseDown: (e: React.MouseEvent) => void;
//   onResizeStart: (e: React.MouseEvent, handle: string) => void;
//   onMinimize: () => void;
//   onDelete: () => void;
//   theme: 'light' | 'dark';
// }

// const DraggableResizableComponent: React.FC<DraggableResizableComponentProps> = ({
//   component,
//   isSelected,
//   onMouseDown,
//   onResizeStart,
//   onMinimize,
//   onDelete,
//   theme
// }) => {
//   const resizeHandles = [
//     { id: 'nw', className: 'top-0 left-0 cursor-nw-resize' },
//     { id: 'n', className: 'top-0 left-1/2 -translate-x-1/2 cursor-n-resize' },
//     { id: 'ne', className: 'top-0 right-0 cursor-ne-resize' },
//     { id: 'e', className: 'top-1/2 right-0 -translate-y-1/2 cursor-e-resize' },
//     { id: 'se', className: 'bottom-0 right-0 cursor-se-resize' },
//     { id: 's', className: 'bottom-0 left-1/2 -translate-x-1/2 cursor-s-resize' },
//     { id: 'sw', className: 'bottom-0 left-0 cursor-sw-resize' },
//     { id: 'w', className: 'top-1/2 left-0 -translate-y-1/2 cursor-w-resize' },
//   ];

//   return (