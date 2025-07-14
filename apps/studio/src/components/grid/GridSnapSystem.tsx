import React, { useCallback } from 'react';

// Enhanced Grid Snap System with proper alignment
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

interface SnapResult {
  position: { x: number; y: number };
  snapped: boolean;
  snapType: 'grid' | 'component' | 'section' | 'none';
  snapPoint: { x: number; y: number } | null;
}

/**
 * Enhanced Grid Snap Utilities
 * Fixes alignment issues and provides accurate snapping
 */
export class GridSnapSystem {
  constructor(
    private gridConfig: GridConfig,
    private canvasOffset: { x: number; y: number } = { x: 0, y: 0 }
  ) {}

  /**
   * Calculate accurate snap position with proper grid alignment
   */
  public calculateSnapPosition(
    position: { x: number; y: number },
    componentSize: { width: number; height: number },
    sensitivity: number = 15
  ): SnapResult {
    if (!this.gridConfig.snapEnabled) {
      return {
        position,
        snapped: false,
        snapType: 'none',
        snapPoint: null
      };
    }

    // Calculate grid cell size including gap
    const cellWithGap = this.gridConfig.cellSize + this.gridConfig.gap;
    
    // Account for canvas offset and padding
    const adjustedX = position.x - this.canvasOffset.x;
    const adjustedY = position.y - this.canvasOffset.y;

    // Find nearest grid intersection
    const nearestGridX = Math.round(adjustedX / cellWithGap) * cellWithGap;
    const nearestGridY = Math.round(adjustedY / cellWithGap) * cellWithGap;

    // Calculate distance to nearest snap point
    const distanceX = Math.abs(adjustedX - nearestGridX);
    const distanceY = Math.abs(adjustedY - nearestGridY);

    // Check if within snap sensitivity
    const shouldSnapX = distanceX <= sensitivity;
    const shouldSnapY = distanceY <= sensitivity;

    if (shouldSnapX || shouldSnapY) {
      const snappedPosition = {
        x: shouldSnapX ? nearestGridX + this.canvasOffset.x : position.x,
        y: shouldSnapY ? nearestGridY + this.canvasOffset.y : position.y
      };

      return {
        position: snappedPosition,
        snapped: true,
        snapType: 'grid',
        snapPoint: {
          x: nearestGridX + this.canvasOffset.x,
          y: nearestGridY + this.canvasOffset.y
        }
      };
    }

    return {
      position,
      snapped: false,
      snapType: 'none',
      snapPoint: null
    };
  }

  /**
   * Get all grid snap points for visual guides
   */
  public getGridSnapPoints(): Array<{ x: number; y: number }> {
    const points: Array<{ x: number; y: number }> = [];
    const cellWithGap = this.gridConfig.cellSize + this.gridConfig.gap;

    for (let col = 0; col <= this.gridConfig.columns; col++) {
      for (let row = 0; row <= this.gridConfig.rows; row++) {
        points.push({
          x: col * cellWithGap + this.canvasOffset.x,
          y: row * cellWithGap + this.canvasOffset.y
        });
      }
    }

    return points;
  }

  /**
   * Generate accurate grid background with proper alignment
   */
  public generateGridBackground(theme: 'light' | 'dark'): string {
    const cellWithGap = this.gridConfig.cellSize + this.gridConfig.gap;
    const color = this.gridConfig.color;
    const opacity = Math.round(this.gridConfig.opacity * 255).toString(16).padStart(2, '0');

    switch (this.gridConfig.style) {
      case 'dots':
        return `radial-gradient(circle at center, ${color}${opacity} 2px, transparent 2px)`;
        
      case 'lines':
        return `
          linear-gradient(to right, ${color}${opacity} 1px, transparent 1px),
          linear-gradient(to bottom, ${color}${opacity} 1px, transparent 1px)
        `;
        
      case 'solid':
        return `
          repeating-linear-gradient(
            to right,
            ${color}${opacity} 0px,
            ${color}${opacity} 1px,
            transparent 1px,
            transparent ${cellWithGap}px
          ),
          repeating-linear-gradient(
            to bottom,
            ${color}${opacity} 0px,
            ${color}${opacity} 1px,
            transparent 1px,
            transparent ${cellWithGap}px
          )
        `;
        
      default:
        return 'none';
    }
  }

  /**
   * Get grid background size for proper alignment
   */
  public getBackgroundSize(): string {
    const cellWithGap = this.gridConfig.cellSize + this.gridConfig.gap;
    return `${cellWithGap}px ${cellWithGap}px`;
  }

  /**
   * Get grid background position for proper alignment
   */
  public getBackgroundPosition(): string {
    // Start grid at canvas padding offset
    return `${this.canvasOffset.x}px ${this.canvasOffset.y}px`;
  }

  /**
   * Convert pixel position to grid coordinates
   */
  public pixelToGrid(position: { x: number; y: number }): { col: number; row: number } {
    const cellWithGap = this.gridConfig.cellSize + this.gridConfig.gap;
    const adjustedX = position.x - this.canvasOffset.x;
    const adjustedY = position.y - this.canvasOffset.y;

    return {
      col: Math.round(adjustedX / cellWithGap),
      row: Math.round(adjustedY / cellWithGap)
    };
  }

  /**
   * Convert grid coordinates to pixel position
   */
  public gridToPixel(grid: { col: number; row: number }): { x: number; y: number } {
    const cellWithGap = this.gridConfig.cellSize + this.gridConfig.gap;

    return {
      x: grid.col * cellWithGap + this.canvasOffset.x,
      y: grid.row * cellWithGap + this.canvasOffset.y
    };
  }

  /**
   * Update canvas offset (when canvas size or position changes)
   */
  public updateCanvasOffset(offset: { x: number; y: number }): void {
    this.canvasOffset = offset;
  }

  /**
   * Update grid configuration
   */
  public updateGridConfig(newConfig: Partial<GridConfig>): void {
    this.gridConfig = { ...this.gridConfig, ...newConfig };
  }
}

/**
 * React Hook for Grid Snap System
 */
export const useGridSnap = (
  gridConfig: GridConfig,
  canvasRef: React.RefObject<HTMLElement>
) => {
  const [snapSystem] = React.useState(() => new GridSnapSystem(gridConfig));

  // Update snap system when grid config changes
  React.useEffect(() => {
    snapSystem.updateGridConfig(gridConfig);
  }, [gridConfig, snapSystem]);

  // Update canvas offset when canvas size changes
  React.useEffect(() => {
    const updateOffset = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const padding = 16; // Canvas padding
        snapSystem.updateCanvasOffset({ x: padding, y: padding });
      }
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, [canvasRef, snapSystem]);

  // Snap calculation function
  const calculateSnapPosition = useCallback((
    position: { x: number; y: number },
    componentSize: { width: number; height: number },
    sensitivity: number = 15
  ): SnapResult => {
    return snapSystem.calculateSnapPosition(position, componentSize, sensitivity);
  }, [snapSystem]);

  // Grid utilities
  const getGridSnapPoints = useCallback(() => {
    return snapSystem.getGridSnapPoints();
  }, [snapSystem]);

  const pixelToGrid = useCallback((position: { x: number; y: number }) => {
    return snapSystem.pixelToGrid(position);
  }, [snapSystem]);

  const gridToPixel = useCallback((grid: { col: number; row: number }) => {
    return snapSystem.gridToPixel(grid);
  }, [snapSystem]);

  // Background generation
  const generateGridBackground = useCallback((theme: 'light' | 'dark') => {
    return snapSystem.generateGridBackground(theme);
  }, [snapSystem]);

  const getBackgroundSize = useCallback(() => {
    return snapSystem.getBackgroundSize();
  }, [snapSystem]);

  const getBackgroundPosition = useCallback(() => {
    return snapSystem.getBackgroundPosition();
  }, [snapSystem]);

  return {
    calculateSnapPosition,
    getGridSnapPoints,
    pixelToGrid,
    gridToPixel,
    generateGridBackground,
    getBackgroundSize,
    getBackgroundPosition,
    snapSystem
  };
};

/**
 * Visual Snap Guides Component
 */
interface SnapGuidesProps {
  snapResult: SnapResult | null;
  gridConfig: GridConfig;
  theme: 'light' | 'dark';
}

export const SnapGuides: React.FC<SnapGuidesProps> = ({ snapResult, gridConfig, theme }) => {
  if (!snapResult?.snapped || !snapResult.snapPoint) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {/* Snap point indicator */}
      <div
        className="absolute w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
        style={{
          left: snapResult.snapPoint.x,
          top: snapResult.snapPoint.y,
        }}
      />
      
      {/* Vertical snap guide */}
      <div
        className="absolute border-l-2 border-green-400 border-dashed opacity-70"
        style={{
          left: snapResult.snapPoint.x,
          top: 0,
          height: '100%',
        }}
      />
      
      {/* Horizontal snap guide */}
      <div
        className="absolute border-t-2 border-green-400 border-dashed opacity-70"
        style={{
          left: 0,
          top: snapResult.snapPoint.y,
          width: '100%',
        }}
      />

      {/* Snap feedback tooltip */}
      <div
        className="absolute bg-green-600 text-white px-2 py-1 rounded text-xs font-mono shadow-lg transform -translate-x-1/2"
        style={{
          left: snapResult.snapPoint.x,
          top: snapResult.snapPoint.y - 30,
        }}
      >
        Grid Snap
      </div>
    </div>
  );
};

/**
 * Enhanced Grid Overlay Component with proper alignment
 */
interface EnhancedGridOverlayProps {
  gridConfig: GridConfig;
  theme: 'light' | 'dark';
  canvasRef: React.RefObject<HTMLDivElement>;
}

export const EnhancedGridOverlay: React.FC<EnhancedGridOverlayProps> = ({
  gridConfig,
  theme,
  canvasRef
}) => {
  const { generateGridBackground, getBackgroundSize, getBackgroundPosition } = useGridSnap(gridConfig, canvasRef);

  if (!gridConfig.visible) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: generateGridBackground(theme),
        backgroundSize: getBackgroundSize(),
        backgroundPosition: getBackgroundPosition(),
        backgroundRepeat: 'repeat',
      }}
    />
  );
};

export default GridSnapSystem;