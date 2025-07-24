import { useStudio } from "./useStudio";

/**
 * Hook for drag and drop operations
 */
export function useStudioDragDrop() {
  const { state, startDrag, updateDrag, endDrag } = useStudio();
  
  return {
    isDragging: state.dragState.isDragging,
    draggedItems: state.dragState.draggedItems,
    snapGuides: state.dragState.snapGuides,
    ghostPosition: state.dragState.ghostPosition,
    startDrag,
    updateDrag,
    endDrag,
  };
}
