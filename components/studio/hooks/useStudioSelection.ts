import { useStudio } from "./useStudio";

/**
 * Hook for element selection utilities
 */
export function useStudioSelection() {
  const { state, selectElement, selectElements, addToSelection, removeFromSelection, clearSelection } = useStudio();
  
  return {
    selectedItems: state.selection.selectedItems,
    lastSelected: state.selection.lastSelected,
    hasSelection: state.selection.selectedItems.length > 0,
    selectionCount: state.selection.selectedItems.length,
    selectElement,
    selectElements,
    addToSelection,
    removeFromSelection,
    clearSelection,
    isSelected: (id: string) => state.selection.selectedItems.includes(id),
  };
}
