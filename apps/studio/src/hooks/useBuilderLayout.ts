import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Builder Layout Management Hook
 * 
 * Manages the complex state and behavior of the builder interface,
 * including viewport, zoom, grid, and panel states.
 */

export interface ViewportSize {
  width: number;
  height: number;
  name: string;
  icon: string;
}

export interface GridConfig {
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

export interface LayoutState {
  currentViewport: ViewportSize;
  zoomLevel: number;
  canvasPosition: { x: number; y: number };
  showComponentLibrary: boolean;
  showGridControls: boolean;
  showSectionManager: boolean;
  showSectionOutlines: boolean;
  selectedComponent: string | null;
  theme: 'light' | 'dark';
}

export interface LayoutActions {
  setViewport: (viewport: ViewportSize) => void;
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  fitToScreen: () => void;
  toggleComponentLibrary: () => void;
  toggleGridControls: () => void;
  toggleSectionManager: () => void;
  toggleSectionOutlines: () => void;
  selectComponent: (id: string | null) => void;
  toggleTheme: () => void;
  updateGridConfig: (updates: Partial<GridConfig>) => void;
  resetLayout: () => void;
}

// Default viewport sizes
export const VIEWPORT_SIZES: ViewportSize[] = [
  { width: 1440, height: 900, name: 'Desktop Large', icon: 'monitor' },
  { width: 1200, height: 800, name: 'Desktop', icon: 'monitor' },
  { width: 1024, height: 768, name: 'Desktop Small', icon: 'monitor' },
  { width: 768, height: 1024, name: 'Tablet Portrait', icon: 'tablet' },
  { width: 1024, height: 768, name: 'Tablet Landscape', icon: 'tablet' },
  { width: 375, height: 812, name: 'Mobile Large', icon: 'smartphone' },
  { width: 375, height: 667, name: 'Mobile', icon: 'smartphone' },
  { width: 320, height: 568, name: 'Mobile Small', icon: 'smartphone' },
];

// Zoom levels
export const ZOOM_LEVELS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];

// Default grid configuration
const DEFAULT_GRID_CONFIG: GridConfig = {
  visible: true,
  snapEnabled: true,
  columns: 12,
  rows: 24,
  cellSize: 60,
  gap: 16,
  opacity: 0.3,
  color: '#3b82f6',
  style: 'lines'
};

// Default layout state
const DEFAULT_LAYOUT_STATE: LayoutState = {
  currentViewport: VIEWPORT_SIZES[0],
  zoomLevel: 0.75,
  canvasPosition: { x: 0, y: 0 },
  showComponentLibrary: true,
  showGridControls: false,
  showSectionManager: false,
  showSectionOutlines: true,
  selectedComponent: null,
  theme: 'light'
};

/**
 * useBuilderLayout Hook
 * 
 * Central state management for the builder interface layout.
 * Provides all necessary state and actions for layout management.
 */
export function useBuilderLayout() {
  // Core state
  const [layoutState, setLayoutState] = useState<LayoutState>(DEFAULT_LAYOUT_STATE);
  const [gridConfig, setGridConfig] = useState<GridConfig>(DEFAULT_GRID_CONFIG);
  
  // Refs for DOM elements
  const canvasRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Local storage key for persistence
  const STORAGE_KEY = 'eternal-ui-builder-layout';

  // Load saved state on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedState = JSON.parse(saved);
        setLayoutState(prev => ({ ...prev, ...parsedState.layout }));
        setGridConfig(prev => ({ ...prev, ...parsedState.grid }));
      }
    } catch (error) {
      console.warn('Failed to load builder layout state:', error);
    }
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    try {
      const stateToSave = {
        layout: {
          currentViewport: layoutState.currentViewport,
          zoomLevel: layoutState.zoomLevel,
          showComponentLibrary: layoutState.showComponentLibrary,
          showGridControls: layoutState.showGridControls,
          showSectionOutlines: layoutState.showSectionOutlines,
          theme: layoutState.theme
        },
        grid: gridConfig
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.warn('Failed to save builder layout state:', error);
    }
  }, [layoutState, gridConfig]);

  // Update grid color when theme changes
  useEffect(() => {
    setGridConfig(prev => ({
      ...prev,
      color: layoutState.theme === 'dark' ? '#6366f1' : '#3b82f6'
    }));
  }, [layoutState.theme]);

  // Actions
  const actions: LayoutActions = {
    setViewport: useCallback((viewport: ViewportSize) => {
      setLayoutState(prev => ({ ...prev, currentViewport: viewport }));
    }, []),

    setZoom: useCallback((zoom: number) => {
      const clampedZoom = Math.max(ZOOM_LEVELS[0], Math.min(ZOOM_LEVELS[ZOOM_LEVELS.length - 1], zoom));
      setLayoutState(prev => ({ ...prev, zoomLevel: clampedZoom }));
    }, []),

    zoomIn: useCallback(() => {
      const currentIndex = ZOOM_LEVELS.findIndex(z => z >= layoutState.zoomLevel);
      const nextIndex = Math.min(currentIndex + 1, ZOOM_LEVELS.length - 1);
      setLayoutState(prev => ({ ...prev, zoomLevel: ZOOM_LEVELS[nextIndex] }));
    }, [layoutState.zoomLevel]),

    zoomOut: useCallback(() => {
      const currentIndex = ZOOM_LEVELS.findIndex(z => z >= layoutState.zoomLevel);
      const prevIndex = Math.max(currentIndex - 1, 0);
      setLayoutState(prev => ({ ...prev, zoomLevel: ZOOM_LEVELS[prevIndex] }));
    }, [layoutState.zoomLevel]),

    resetZoom: useCallback(() => {
      setLayoutState(prev => ({ ...prev, zoomLevel: 1 }));
    }, []),

    fitToScreen: useCallback(() => {
      if (!scrollContainerRef.current || !canvasRef.current) return;
      
      const container = scrollContainerRef.current;
      const canvas = canvasRef.current;
      
      const containerWidth = container.clientWidth - 48; // Account for padding
      const containerHeight = container.clientHeight - 48;
      
      const scaleX = containerWidth / layoutState.currentViewport.width;
      const scaleY = containerHeight / layoutState.currentViewport.height;
      
      const scale = Math.min(scaleX, scaleY, 1); // Don't zoom in beyond 100%
      const clampedScale = Math.max(ZOOM_LEVELS[0], Math.min(ZOOM_LEVELS[ZOOM_LEVELS.length - 1], scale));
      
      setLayoutState(prev => ({ ...prev, zoomLevel: clampedScale }));
    }, [layoutState.currentViewport]),

    toggleComponentLibrary: useCallback(() => {
      setLayoutState(prev => ({ ...prev, showComponentLibrary: !prev.showComponentLibrary }));
    }, []),

    toggleGridControls: useCallback(() => {
      setLayoutState(prev => ({ ...prev, showGridControls: !prev.showGridControls }));
    }, []),

    toggleSectionManager: useCallback(() => {
      setLayoutState(prev => ({ ...prev, showSectionManager: !prev.showSectionManager }));
    }, []),

    toggleSectionOutlines: useCallback(() => {
      setLayoutState(prev => ({ ...prev, showSectionOutlines: !prev.showSectionOutlines }));
    }, []),

    selectComponent: useCallback((id: string | null) => {
      setLayoutState(prev => ({ ...prev, selectedComponent: id }));
    }, []),

    toggleTheme: useCallback(() => {
      setLayoutState(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
    }, []),

    updateGridConfig: useCallback((updates: Partial<GridConfig>) => {
      setGridConfig(prev => ({ ...prev, ...updates }));
    }, []),

    resetLayout: useCallback(() => {
      setLayoutState(DEFAULT_LAYOUT_STATE);
      setGridConfig(DEFAULT_GRID_CONFIG);
      localStorage.removeItem(STORAGE_KEY);
    }, [])
  };

  // Computed values
  const computedValues = {
    // Calculate the scaled viewport dimensions
    scaledViewport: {
      width: layoutState.currentViewport.width * layoutState.zoomLevel,
      height: layoutState.currentViewport.height * layoutState.zoomLevel
    },
    
    // Grid cell size based on viewport and columns
    gridCellWidth: layoutState.currentViewport.width / gridConfig.columns,
    
    // Zoom level index for UI
    zoomIndex: ZOOM_LEVELS.findIndex(z => z === layoutState.zoomLevel),
    
    // Can zoom in/out flags
    canZoomIn: layoutState.zoomLevel < ZOOM_LEVELS[ZOOM_LEVELS.length - 1],
    canZoomOut: layoutState.zoomLevel > ZOOM_LEVELS[0],
    
    // Theme-aware colors
    themeColors: {
      background: layoutState.theme === 'dark' ? '#111827' : '#ffffff',
      surface: layoutState.theme === 'dark' ? '#1f2937' : '#f9fafb',
      border: layoutState.theme === 'dark' ? '#374151' : '#e5e7eb',
      text: layoutState.theme === 'dark' ? '#f3f4f6' : '#111827',
      textSecondary: layoutState.theme === 'dark' ? '#d1d5db' : '#6b7280'
    }
  };

  // Helper functions
  const helpers = {
    // Convert canvas coordinates to grid coordinates
    snapToGrid: useCallback((x: number, y: number) => {
      if (!gridConfig.snapEnabled) return { x, y };
      
      const cellWidth = computedValues.gridCellWidth;
      const cellHeight = gridConfig.cellSize;
      
      return {
        x: Math.round(x / cellWidth) * cellWidth,
        y: Math.round(y / cellHeight) * cellHeight
      };
    }, [gridConfig.snapEnabled, computedValues.gridCellWidth, gridConfig.cellSize]),

    // Get viewport by name
    getViewportByName: useCallback((name: string) => {
      return VIEWPORT_SIZES.find(v => v.name === name);
    }, []),

    // Calculate canvas bounds
    getCanvasBounds: useCallback(() => {
      if (!canvasRef.current) return { width: 0, height: 0 };
      
      const rect = canvasRef.current.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height
      };
    }, []),

    // Check if point is within canvas
    isPointInCanvas: useCallback((x: number, y: number) => {
      if (!canvasRef.current) return false;
      
      const rect = canvasRef.current.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    }, [])
  };

  return {
    // State
    ...layoutState,
    gridConfig,
    
    // Actions
    ...actions,
    
    // Computed values
    ...computedValues,
    
    // Helpers
    ...helpers,
    
    // Refs
    canvasRef,
    scrollContainerRef,
    
    // Constants
    VIEWPORT_SIZES,
    ZOOM_LEVELS
  };
}

export default useBuilderLayout;