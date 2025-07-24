import React from "react";
import { useState, useCallback } from "react";

/**
 * Advanced Multi-Select Hook
 */
export function useAdvancedSelection() {
  const [selection, setSelection] = useState<SelectionState>({
    selectedItems: [],
    selectionBox: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, active: false },
    lastSelected: null
  });

  const selectItem = useCallback((itemId: string, multi = false) => {
    setSelection(prev => {
      if (multi) {
        const isSelected = prev.selectedItems.includes(itemId);
        return {
          ...prev,
          selectedItems: isSelected 
            ? prev.selectedItems.filter(id => id !== itemId)
            : [...prev.selectedItems, itemId],
          lastSelected: itemId
        };
      } else {
        return {
          ...prev,
          selectedItems: [itemId],
          lastSelected: itemId
        };
      }
    });
  }, []);

  const selectRange = useCallback((fromId: string, toId: string, elements: any[]) => {
    const fromIndex = elements.findIndex(el => el.id === fromId);
    const toIndex = elements.findIndex(el => el.id === toId);
    const start = Math.min(fromIndex, toIndex);
    const end = Math.max(fromIndex, toIndex);
    
    const rangeItems = elements.slice(start, end + 1).map(el => el.id);
    setSelection(prev => ({
      ...prev,
      selectedItems: [...new Set([...prev.selectedItems, ...rangeItems])],
      lastSelected: toId
    }));
  }, []);

  const selectAll = useCallback((elements: any[]) => {
    setSelection(prev => ({
      ...prev,
      selectedItems: elements.map(el => el.id),
      lastSelected: elements[elements.length - 1]?.id || null
    }));
  }, []);

  const clearSelection = useCallback(() => {
    setSelection(prev => ({
      ...prev,
      selectedItems: [],
      lastSelected: null
    }));
  }, []);

  return {
    selection,
    selectItem,
    selectRange,
    selectAll,
    clearSelection,
    setSelection
  };
}