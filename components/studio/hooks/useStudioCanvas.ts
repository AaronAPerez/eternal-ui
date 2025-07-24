import { useStudio } from "./useStudio";

/**
 * Hook for canvas utilities
 */
export function useStudioCanvas() {
  const { state, setCanvasMode, setZoom, toggleGrid, toggleSnapToGrid, setGridSize } = useStudio();
  
  return {
    canvasMode: state.canvasMode,
    zoom: state.zoom,
    gridEnabled: state.gridEnabled,
    snapToGrid: state.snapToGrid,
    gridSize: state.gridSize,
    setCanvasMode,
    setZoom,
    toggleGrid,
    toggleSnapToGrid,
    setGridSize,
    zoomIn: () => setZoom(state.zoom + 0.1),
    zoomOut: () => setZoom(state.zoom - 0.1),
    resetZoom: () => setZoom(1),
  };
}