// =================================================================
// GRID SYSTEM IMPLEMENTATION - PHASE 2
// =================================================================

// =================================================================
// GRID CONFIGURATION & UTILITIES
// =================================================================

export const GRID_CONFIG = {
  size: 20,           // 20px grid
  color: '#6366F1',   // Indigo color matching your theme
  opacity: 0.1,       // Light visibility
  showGuides: true,   // Show alignment guides
  snapThreshold: 10,  // Snap within 10px
};

export interface GridPosition {
  x: number;
  y: number;
}

export interface GridBounds {
  width: number;
  height: number;
  top: number;
  left: number;
}

// =================================================================
// GRID UTILITY FUNCTIONS
// =================================================================

export class GridUtils {
  static snapToGrid(value: number, gridSize: number = GRID_CONFIG.size): number {
    return Math.round(value / gridSize) * gridSize;
  }

  static snapPositionToGrid(position: GridPosition, gridSize: number = GRID_CONFIG.size): GridPosition {
    return {
      x: GridUtils.snapToGrid(position.x, gridSize),
      y: GridUtils.snapToGrid(position.y, gridSize)
    };
  }

  static shouldSnap(currentValue: number, gridSize: number = GRID_CONFIG.size): boolean {
    const snappedValue = GridUtils.snapToGrid(currentValue, gridSize);
    return Math.abs(currentValue - snappedValue) <= GRID_CONFIG.snapThreshold;
  }

  static getClosestGridLines(position: GridPosition, containerBounds: GridBounds, gridSize: number = GRID_CONFIG.size) {
    const { x, y } = position;
    const { width, height } = containerBounds;

    // Find nearest grid lines
    const nearestVertical = Math.round(x / gridSize) * gridSize;
    const nearestHorizontal = Math.round(y / gridSize) * gridSize;

    // Calculate distances
    const verticalDistance = Math.abs(x - nearestVertical);
    const horizontalDistance = Math.abs(y - nearestHorizontal);

    return {
      vertical: {
        position: nearestVertical,
        distance: verticalDistance,
        shouldSnap: verticalDistance <= GRID_CONFIG.snapThreshold
      },
      horizontal: {
        position: nearestHorizontal,
        distance: horizontalDistance,
        shouldSnap: horizontalDistance <= GRID_CONFIG.snapThreshold
      }
    };
  }

  static generateGridLines(containerWidth: number, containerHeight: number, gridSize: number = GRID_CONFIG.size) {
    const verticalLines: number[] = [];
    const horizontalLines: number[] = [];

    // Generate vertical lines
    for (let x = 0; x <= containerWidth; x += gridSize) {
      verticalLines.push(x);
    }

    // Generate horizontal lines
    for (let y = 0; y <= containerHeight; y += gridSize) {
      horizontalLines.push(y);
    }

    return { verticalLines, horizontalLines };
  }
}

// =================================================================
// GRID OVERLAY COMPONENT
// =================================================================

import React from 'react';

interface GridOverlayProps {
  show: boolean;
  containerWidth: number;
  containerHeight: number;
  gridSize?: number;
  color?: string;
  opacity?: number;
  className?: string;
}

export const GridOverlay: React.FC<GridOverlayProps> = ({
  show,
  containerWidth,
  containerHeight,
  gridSize = GRID_CONFIG.size,
  color = GRID_CONFIG.color,
  opacity = GRID_CONFIG.opacity,
  className = ''
}) => {
  if (!show) return null;

  const { verticalLines, horizontalLines } = GridUtils.generateGridLines(
    containerWidth,
    containerHeight,
    gridSize
  );

  return (
    <div 
      className={`absolute inset-0 pointer-events-none select-none ${className}`}
      style={{ opacity }}
    >
      {/* SVG Grid Pattern */}
      <svg
        width={containerWidth}
        height={containerHeight}
        className="absolute inset-0"
        style={{ overflow: 'visible' }}
      >
        {/* Vertical Lines */}
        {verticalLines.map(x => (
          <line
            key={`v-${x}`}
            x1={x}
            y1={0}
            x2={x}
            y2={containerHeight}
            stroke={color}
            strokeWidth={1}
            opacity={0.3}
          />
        ))}
        
        {/* Horizontal Lines */}
        {horizontalLines.map(y => (
          <line
            key={`h-${y}`}
            x1={0}
            y1={y}
            x2={containerWidth}
            y2={y}
            stroke={color}
            strokeWidth={1}
            opacity={0.3}
          />
        ))}

        {/* Major Grid Lines (every 5th line) */}
        {verticalLines.filter((_, index) => index % 5 === 0).map(x => (
          <line
            key={`v-major-${x}`}
            x1={x}
            y1={0}
            x2={x}
            y2={containerHeight}
            stroke={color}
            strokeWidth={2}
            opacity={0.5}
          />
        ))}
        
        {horizontalLines.filter((_, index) => index % 5 === 0).map(y => (
          <line
            key={`h-major-${y}`}
            x1={0}
            y1={y}
            x2={containerWidth}
            y2={y}
            stroke={color}
            strokeWidth={2}
            opacity={0.5}
          />
        ))}
      </svg>

      {/* Grid Dots at Intersections */}
      <svg
        width={containerWidth}
        height={containerHeight}
        className="absolute inset-0"
      >
        {verticalLines.map(x =>
          horizontalLines.map(y => (
            <circle
              key={`dot-${x}-${y}`}
              cx={x}
              cy={y}
              r={1}
              fill={color}
              opacity={0.4}
            />
          ))
        )}
      </svg>
    </div>
  );
};

// =================================================================
// SNAP GUIDES COMPONENT
// =================================================================

interface SnapGuidesProps {
  show: boolean;
  position: GridPosition;
  containerBounds: GridBounds;
  gridSize?: number;
  color?: string;
}

export const SnapGuides: React.FC<SnapGuidesProps> = ({
  show,
  position,
  containerBounds,
  gridSize = GRID_CONFIG.size,
  color = GRID_CONFIG.color
}) => {
  if (!show) return null;

  const guidelines = GridUtils.getClosestGridLines(position, containerBounds, gridSize);
  const { width, height } = containerBounds;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        width={width}
        height={height}
        className="absolute inset-0"
        style={{ overflow: 'visible' }}
      >
        {/* Vertical Snap Guide */}
        {guidelines.vertical.shouldSnap && (
          <line
            x1={guidelines.vertical.position}
            y1={0}
            x2={guidelines.vertical.position}
            y2={height}
            stroke={color}
            strokeWidth={2}
            strokeDasharray="4,4"
            opacity={0.8}
            className="animate-pulse"
          />
        )}

        {/* Horizontal Snap Guide */}
        {guidelines.horizontal.shouldSnap && (
          <line
            x1={0}
            y1={guidelines.horizontal.position}
            x2={width}
            y2={guidelines.horizontal.position}
            stroke={color}
            strokeWidth={2}
            strokeDasharray="4,4"
            opacity={0.8}
            className="animate-pulse"
          />
        )}

        {/* Snap Point Indicator */}
        {(guidelines.vertical.shouldSnap || guidelines.horizontal.shouldSnap) && (
          <circle
            cx={guidelines.vertical.shouldSnap ? guidelines.vertical.position : position.x}
            cy={guidelines.horizontal.shouldSnap ? guidelines.horizontal.position : position.y}
            r={6}
            fill="transparent"
            stroke={color}
            strokeWidth={2}
            className="animate-ping"
          />
        )}
      </svg>
    </div>
  );
};

// =================================================================
// GRID-ENABLED DRAGGABLE COMPONENT
// =================================================================

import { useDraggable } from '@dnd-kit/core';
import { useState, useEffect } from 'react';

interface GridDraggableProps {
  id: string;
  children: React.ReactNode;
  initialPosition: GridPosition;
  snapToGrid?: boolean;
  gridSize?: number;
  onPositionChange?: (position: GridPosition) => void;
  className?: string;
}

export const GridDraggable: React.FC<GridDraggableProps> = ({
  id,
  children,
  initialPosition,
  snapToGrid = true,
  gridSize = GRID_CONFIG.size,
  onPositionChange,
  className = ''
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging: dndIsDragging
  } = useDraggable({
    id,
    data: { position }
  });

  // Update dragging state
  useEffect(() => {
    setIsDragging(dndIsDragging);
  }, [dndIsDragging]);

  // Handle position updates
  useEffect(() => {
    if (transform) {
      let newPosition = {
        x: initialPosition.x + transform.x,
        y: initialPosition.y + transform.y
      };

      if (snapToGrid) {
        newPosition = GridUtils.snapPositionToGrid(newPosition, gridSize);
      }

      setPosition(newPosition);
      onPositionChange?.(newPosition);
    }
  }, [transform, initialPosition, snapToGrid, gridSize, onPositionChange]);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`absolute cursor-grab active:cursor-grabbing ${
        isDragging ? 'z-50' : ''
      } ${className}`}
      style={{
        left: position.x,
        top: position.y,
        transform: isDragging ? 'scale(1.02)' : 'scale(1)',
        transition: isDragging ? 'none' : 'transform 0.2s ease-out'
      }}
    >
      {children}
    </div>
  );
};

// =================================================================
// GRID SETTINGS PANEL
// =================================================================

interface GridSettingsProps {
  gridEnabled: boolean;
  onToggleGrid: (enabled: boolean) => void;
  gridSize: number;
  onGridSizeChange: (size: number) => void;
  snapEnabled: boolean;
  onToggleSnap: (enabled: boolean) => void;
  showGuides: boolean;
  onToggleGuides: (enabled: boolean) => void;
}

export const GridSettings: React.FC<GridSettingsProps> = ({
  gridEnabled,
  onToggleGrid,
  gridSize,
  onGridSizeChange,
  snapEnabled,
  onToggleSnap,
  showGuides,
  onToggleGuides
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h4 className="font-semibold text-gray-900 mb-3">Grid Settings</h4>
      
      <div className="space-y-3">
        {/* Grid Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Show Grid</label>
          <button
            onClick={() => onToggleGrid(!gridEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              gridEnabled ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                gridEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Grid Size */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Grid Size: {gridSize}px
          </label>
          <input
            type="range"
            min="10"
            max="50"
            step="5"
            value={gridSize}
            onChange={(e) => onGridSizeChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>10px</span>
            <span>30px</span>
            <span>50px</span>
          </div>
        </div>

        {/* Snap to Grid */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Snap to Grid</label>
          <button
            onClick={() => onToggleSnap(!snapEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              snapEnabled ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                snapEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Show Guides */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Snap Guides</label>
          <button
            onClick={() => onToggleGuides(!showGuides)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showGuides ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showGuides ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Quick Grid Presets */}
      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700 block mb-2">Quick Presets</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onGridSizeChange(10)}
            className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            Fine (10px)
          </button>
          <button
            onClick={() => onGridSizeChange(20)}
            className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            Default (20px)
          </button>
          <button
            onClick={() => onGridSizeChange(40)}
            className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            Coarse (40px)
          </button>
        </div>
      </div>
    </div>
  );
};

// =================================================================
// GRID-ENABLED CANVAS HOOK
// =================================================================

import { useCallback, useMemo } from 'react';

interface UseGridCanvasProps {
  containerRef: React.RefObject<HTMLElement>;
  gridSize?: number;
  snapEnabled?: boolean;
}

export const useGridCanvas = ({
  containerRef,
  gridSize = GRID_CONFIG.size,
  snapEnabled = true
}: UseGridCanvasProps) => {
  const [gridSettings, setGridSettings] = useState({
    enabled: true,
    size: gridSize,
    snapEnabled,
    showGuides: true
  });

  const containerBounds = useMemo(() => {
    if (!containerRef.current) {
      return { width: 800, height: 600, top: 0, left: 0 };
    }
    
    const rect = containerRef.current.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left
    };
  }, [containerRef]);

  const snapToGrid = useCallback((position: GridPosition): GridPosition => {
    if (!gridSettings.snapEnabled) return position;
    return GridUtils.snapPositionToGrid(position, gridSettings.size);
  }, [gridSettings.snapEnabled, gridSettings.size]);

  const getSnapGuides = useCallback((position: GridPosition) => {
    if (!gridSettings.showGuides) return null;
    return GridUtils.getClosestGridLines(position, containerBounds, gridSettings.size);
  }, [gridSettings.showGuides, containerBounds, gridSettings.size]);

  const updateGridSettings = useCallback((updates: Partial<typeof gridSettings>) => {
    setGridSettings(prev => ({ ...prev, ...updates }));
  }, []);

  return {
    gridSettings,
    updateGridSettings,
    containerBounds,
    snapToGrid,
    getSnapGuides,
    GridOverlay: (props: Omit<GridOverlayProps, 'containerWidth' | 'containerHeight' | 'gridSize'>) => (
      <GridOverlay
        {...props}
        containerWidth={containerBounds.width}
        containerHeight={containerBounds.height}
        gridSize={gridSettings.size}
      />
    ),
    GridSettings: (props: Omit<GridSettingsProps, keyof typeof gridSettings | 'onToggleGrid' | 'onGridSizeChange' | 'onToggleSnap' | 'onToggleGuides'>) => (
      <GridSettings
        {...props}
        gridEnabled={gridSettings.enabled}
        onToggleGrid={(enabled) => updateGridSettings({ enabled })}
        gridSize={gridSettings.size}
        onGridSizeChange={(size) => updateGridSettings({ size })}
        snapEnabled={gridSettings.snapEnabled}
        onToggleSnap={(snapEnabled) => updateGridSettings({ snapEnabled })}
        showGuides={gridSettings.showGuides}
        onToggleGuides={(showGuides) => updateGridSettings({ showGuides })}
      />
    )
  };
};

// =================================================================
// GRID KEYBOARD SHORTCUTS
// =================================================================

export const useGridKeyboardShortcuts = (
  gridSettings: { enabled: boolean; size: number },
  updateGridSettings: (updates: any) => void
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd/Ctrl + G: Toggle Grid
      if ((event.metaKey || event.ctrlKey) && event.key === 'g') {
        event.preventDefault();
        updateGridSettings({ enabled: !gridSettings.enabled });
      }
      
      // Cmd/Ctrl + Shift + G: Toggle Snap
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'G') {
        event.preventDefault();
        updateGridSettings({ snapEnabled: !gridSettings.snapEnabled });
      }
      
      // [ and ]: Decrease/Increase grid size
      if (event.key === '[' && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        const newSize = Math.max(10, gridSettings.size - 5);
        updateGridSettings({ size: newSize });
      }
      
      if (event.key === ']' && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        const newSize = Math.min(50, gridSettings.size + 5);
        updateGridSettings({ size: newSize });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gridSettings, updateGridSettings]);
};

// =================================================================
// USAGE EXAMPLE COMPONENT
// =================================================================

export const GridEnabledCanvas: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    gridSettings,
    updateGridSettings,
    containerBounds,
    snapToGrid,
    GridOverlay,
    GridSettings
  } = useGridCanvas({ containerRef });

  // Enable keyboard shortcuts
  useGridKeyboardShortcuts(gridSettings, updateGridSettings);

  return (
    <div className="flex h-full">
      {/* Canvas Container */}
      <div className="flex-1 relative">
        <div
          ref={containerRef}
          className={`relative w-full h-full overflow-hidden ${className}`}
        >
          {/* Grid Overlay */}
          <GridOverlay show={gridSettings.enabled} />
          
          {/* Canvas Content */}
          {children}
        </div>
      </div>

      {/* Grid Settings Panel */}
      <div className="w-64 border-l border-gray-200 p-4">
        <GridSettings />
        
        {/* Keyboard shortcuts help */}
        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Keyboard Shortcuts</h5>
          <div className="text-xs text-gray-600 space-y-1">
            <div><kbd className="bg-gray-200 px-1 rounded">⌘G</kbd> Toggle Grid</div>
            <div><kbd className="bg-gray-200 px-1 rounded">⌘⇧G</kbd> Toggle Snap</div>
            <div><kbd className="bg-gray-200 px-1 rounded">[</kbd> / <kbd className="bg-gray-200 px-1 rounded">]</kbd> Grid Size</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =================================================================
// EXPORTS
// =================================================================

export {
  GRID_CONFIG,
  GridUtils,
  GridOverlay,
  SnapGuides,
  GridDraggable,
  GridSettings,
  useGridCanvas,
  useGridKeyboardShortcuts
};