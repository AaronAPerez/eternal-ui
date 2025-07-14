import { useState, useCallback, useEffect, useRef } from 'react';

export interface GridConfig {
  enabled: boolean;
  visible: boolean;
  size: number;
  snap: {
    enabled: boolean;
    threshold: number;
    corners: boolean;
    edges: boolean;
    center: boolean;
  };
  style: 'dots' | 'lines' | 'solid';
  color: string;
  opacity: number;
  columns: number;
  rows: number;
}

export interface GridSnapResult {
  gridConfig: GridConfig;
  updateGridConfig: (updates: Partial<GridConfig>) => void;
  toggleGrid: () => void;
  calculateSnapPosition: (position: { x: number; y: number }) => { x: number; y: number };
  gridMetrics: {
    cellSize: number;
    totalWidth: number;
    totalHeight: number;
  };
  isSnapping: boolean;
}

const DEFAULT_GRID_CONFIG: GridConfig = {
  enabled: true,
  visible: true,
  size: 20,
  snap: {
    enabled: true,
    threshold: 10,
    corners: true,
    edges: true,
    center: true,
  },
  style: 'lines',
  color: '#e5e7eb',
  opacity: 0.5,
  columns: 24,
  rows: 24,
};

export const useGridSnap = (
  initialConfig?: Partial<GridConfig>
): GridSnapResult => {
  const [gridConfig, setGridConfig] = useState<GridConfig>(() => ({
    ...DEFAULT_GRID_CONFIG,
    ...initialConfig,
    snap: {
      ...DEFAULT_GRID_CONFIG.snap,
      ...initialConfig?.snap,
    },
  }));

  const [isSnapping, setIsSnapping] = useState(false);
  const snapTimeoutRef = useRef<NodeJS.Timeout>();

  const updateGridConfig = useCallback((updates: Partial<GridConfig>) => {
    setGridConfig(prev => ({
      ...prev,
      ...updates,
      snap: updates.snap ? { ...prev.snap, ...updates.snap } : prev.snap,
    }));
  }, []);

  const toggleGrid = useCallback(() => {
    updateGridConfig({ visible: !gridConfig.visible });
  }, [gridConfig.visible, updateGridConfig]);

  const calculateSnapPosition = useCallback((position: { x: number; y: number }) => {
    if (!gridConfig.snap.enabled) {
      return position;
    }

    setIsSnapping(true);
    
    if (snapTimeoutRef.current) {
      clearTimeout(snapTimeoutRef.current);
    }

    snapTimeoutRef.current = setTimeout(() => {
      setIsSnapping(false);
    }, 200);

    const cellSize = gridConfig.size;
    const snapThreshold = gridConfig.snap.threshold;
    const nearestX = Math.round(position.x / cellSize) * cellSize;
    const nearestY = Math.round(position.y / cellSize) * cellSize;

    const distanceX = Math.abs(position.x - nearestX);
    const distanceY = Math.abs(position.y - nearestY);

    const snappedPosition = {
      x: distanceX <= snapThreshold ? nearestX : position.x,
      y: distanceY <= snapThreshold ? nearestY : position.y,
    };

    return snappedPosition;
  }, [gridConfig.snap.enabled, gridConfig.size, gridConfig.snap.threshold]);

  const gridMetrics = {
    cellSize: gridConfig.size,
    totalWidth: gridConfig.columns * gridConfig.size,
    totalHeight: gridConfig.rows * gridConfig.size,
  };

  useEffect(() => {
    return () => {
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
    };
  }, []);

  return {
    gridConfig,
    updateGridConfig,
    toggleGrid,
    calculateSnapPosition,
    gridMetrics,
    isSnapping,
  };
};