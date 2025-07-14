import { useState, useCallback, useEffect, useRef, useMemo } from 'react';

/**
 * Enhanced Builder Layout Management Hook
 * 
 * Comprehensive state management for the builder interface including:
 * - Viewport and zoom controls
 * - Grid system configuration
 * - Panel visibility management
 * - Theme management
 * - Component selection
 * - Keyboard shortcuts
 * - Performance optimizations
 * - Accessibility features
 */

export interface ViewportSize {
  width: number;
  height: number;
  name: string;
  icon: string;
  category: 'desktop' | 'tablet' | 'mobile';
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
  showLabels: boolean;
  magnetic: boolean;
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
  isFullscreen: boolean;
  sidebarWidth: number;
}

// Enhanced viewport sizes with more options
export const VIEWPORT_SIZES: ViewportSize[] = [
  // Desktop
  { width: 1920, height: 1080, name: 'Desktop XL', icon: 'monitor', category: 'desktop' },
  { width: 1440, height: 900, name: 'Desktop Large', icon: 'monitor', category: 'desktop' },
  { width: 1200, height: 800, name: 'Desktop', icon: 'monitor', category: 'desktop' },
  { width: 1024, height: 768, name: 'Desktop Small', icon: 'monitor', category: 'desktop' },
  
  // Tablet
  { width: 768, height: 1024, name: 'iPad Portrait', icon: 'tablet', category: 'tablet' },
  { width: 1024, height: 768, name: 'iPad Landscape', icon: 'tablet', category: 'tablet' },
  { width: 820, height: 1180, name: 'iPad Air', icon: 'tablet', category: 'tablet' },
  
  // Mobile
  { width: 375, height: 812, name: 'iPhone 12/13', icon: 'smartphone', category: 'mobile' },
  { width: 414, height: 896, name: 'iPhone 12 Pro Max', icon: 'smartphone', category: 'mobile' },
  { width: 375, height: 667, name: 'iPhone SE', icon: 'smartphone', category: 'mobile' },
  { width: 360, height: 640, name: 'Android', icon: 'smartphone', category: 'mobile' },
  { width: 320, height: 568, name: 'Mobile Small', icon: 'smartphone', category: 'mobile' },
];

// Zoom levels with more granular control
export const ZOOM_LEVELS = [0.1, 0.25, 0.33, 0.5, 0.67, 0.75, 1, 1.25, 1.5, 2, 3, 4, 5];

// Enhanced grid configuration
const DEFAULT_GRID_CONFIG: GridConfig = {
  visible: true,
  snapEnabled: true,
  columns: 12,
  rows: 24,
  cellSize: 60,
  gap: 16,
  opacity: 0.3,
  color: '#6366f1',
  style: 'lines',
  showLabels: false,
  magnetic: true
};

// Default layout state
const DEFAULT_LAYOUT_STATE: LayoutState = {
  currentViewport: VIEWPORT_SIZES[2], // Desktop
  zoomLevel: 0.75,
  canvasPosition: { x: 0, y: 0 },
  showComponentLibrary: true,
  showGridControls: false,
  showSectionManager: false,
  showSectionOutlines: true,
  selectedComponent: null,
  theme: 'light',
  isFullscreen: false,
  sidebarWidth: 320
};

/**
 * useBuilderLayout Hook Implementation
 */
function useBuilderLayout() {
  // Core state
  const [layoutState, setLayoutState] = useState<LayoutState>(DEFAULT_LAYOUT_STATE);
  const [gridConfig, setGridConfig] = useState<GridConfig>(DEFAULT_GRID_CONFIG);
  
  // Refs for DOM elements
  const canvasRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Computed values with memoization for performance
  const computedValues = useMemo(() => {
    const scaledViewport = {
      width: layoutState.currentViewport.width * layoutState.zoomLevel,
      height: layoutState.currentViewport.height * layoutState.zoomLevel
    };

    const canZoomIn = layoutState.zoomLevel < ZOOM_LEVELS[ZOOM_LEVELS.length - 1];
    const canZoomOut = layoutState.zoomLevel > ZOOM_LEVELS[0];

    const gridCellWidth = layoutState.currentViewport.width / gridConfig.columns;

    const themeColors = {
      primary: layoutState.theme === 'dark' ? '#6366f1' : '#3b82f6',
      background: layoutState.theme === 'dark' ? '#111827' : '#ffffff',
      surface: layoutState.theme === 'dark' ? '#1f2937' : '#f9fafb',
      border: layoutState.theme === 'dark' ? '#374151' : '#e5e7eb',
      text: layoutState.theme === 'dark' ? '#f3f4f6' : '#111827',
      textSecondary: layoutState.theme === 'dark' ? '#d1d5db' : '#6b7280'
    };

    return {
      scaledViewport,
      canZoomIn,
      canZoomOut,
      gridCellWidth,
      themeColors
    };
  }, [layoutState, gridConfig]);

  // Actions with useCallback for performance
  const actions = useMemo(() => ({
    setViewport: (viewport: ViewportSize) => {
      setLayoutState(prev => ({ ...prev, currentViewport: viewport }));
    },

    setZoom: (zoom: number) => {
      const clampedZoom = Math.max(ZOOM_LEVELS[0], Math.min(ZOOM_LEVELS[ZOOM_LEVELS.length - 1], zoom));
      setLayoutState(prev => ({ ...prev, zoomLevel: clampedZoom }));
    },

    zoomIn: () => {
      const currentIndex = ZOOM_LEVELS.findIndex(z => z >= layoutState.zoomLevel);
      const nextIndex = Math.min(currentIndex + 1, ZOOM_LEVELS.length - 1);
      setLayoutState(prev => ({ ...prev, zoomLevel: ZOOM_LEVELS[nextIndex] }));
    },

    zoomOut: () => {
      const currentIndex = ZOOM_LEVELS.findIndex(z => z >= layoutState.zoomLevel);
      const prevIndex = Math.max(currentIndex - 1, 0);
      setLayoutState(prev => ({ ...prev, zoomLevel: ZOOM_LEVELS[prevIndex] }));
    },

    resetZoom: () => {
      setLayoutState(prev => ({ ...prev, zoomLevel: 1 }));
    },

    fitToScreen: () => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const containerWidth = container.clientWidth - 48;
      const containerHeight = container.clientHeight - 48;
      
      const scaleX = containerWidth / layoutState.currentViewport.width;
      const scaleY = containerHeight / layoutState.currentViewport.height;
      
      const scale = Math.min(scaleX, scaleY, 1);
      const clampedScale = Math.max(ZOOM_LEVELS[0], Math.min(ZOOM_LEVELS[ZOOM_LEVELS.length - 1], scale));
      
      setLayoutState(prev => ({ ...prev, zoomLevel: clampedScale }));
    },

    toggleComponentLibrary: () => {
      setLayoutState(prev => ({ ...prev, showComponentLibrary: !prev.showComponentLibrary }));
    },

    toggleGridControls: () => {
      setLayoutState(prev => ({ ...prev, showGridControls: !prev.showGridControls }));
    },

    toggleSectionOutlines: () => {
      setLayoutState(prev => ({ ...prev, showSectionOutlines: !prev.showSectionOutlines }));
    },

    selectComponent: (id: string | null) => {
      setLayoutState(prev => ({ ...prev, selectedComponent: id }));
    },

    toggleTheme: () => {
      setLayoutState(prev => ({ 
        ...prev, 
        theme: prev.theme === 'light' ? 'dark' : 'light'
      }));
    },

    updateGridConfig: (updates: Partial<GridConfig>) => {
      setGridConfig(prev => ({ ...prev, ...updates }));
    },

    toggleFullscreen: () => {
      setLayoutState(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }));
    },

    resetLayout: () => {
      setLayoutState(DEFAULT_LAYOUT_STATE);
      setGridConfig(DEFAULT_GRID_CONFIG);
    },

    // Grid snap functionality
    snapToGrid: (x: number, y: number) => {
      if (!gridConfig.snapEnabled) return { x, y };
      
      const cellWidth = computedValues.gridCellWidth;
      const cellHeight = gridConfig.cellSize;
      
      return {
        x: Math.round(x / cellWidth) * cellWidth,
        y: Math.round(y / cellHeight) * cellHeight
      };
    }
  }), [layoutState, gridConfig, computedValues]);

  // Keyboard shortcuts effect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return; // Don't trigger shortcuts when typing in inputs
      }

      // Grid toggle with 'G' key
      if (e.key === 'g' || e.key === 'G') {
        e.preventDefault();
        actions.toggleGridControls();
      }

      // Theme toggle with 'T' key
      if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        actions.toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [actions]);

  // Theme persistence
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('builder-theme', layoutState.theme);
      document.documentElement.classList.toggle('dark', layoutState.theme === 'dark');
    }
  }, [layoutState.theme]);

  return {
    // State
    ...layoutState,
    gridConfig,
    
    // Actions
    ...actions,
    
    // Computed values
    ...computedValues,
    
    // Refs
    canvasRef,
    scrollContainerRef,
    
    // Constants
    VIEWPORT_SIZES,
    ZOOM_LEVELS
  };
}

export default useBuilderLayout;