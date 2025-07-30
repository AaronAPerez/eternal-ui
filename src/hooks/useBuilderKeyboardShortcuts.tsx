import { useBuilderStore } from "./useBuilderStore";

/**
 * 🎯 KEYBOARD SHORTCUTS HOOK
 * 
 * Provides keyboard shortcuts for power users
 */
export const useBuilderKeyboardShortcuts = () => {
  const {
    undo,
    redo,
    copySelectedComponents,
    pasteComponents,
    deleteSelectedComponents,
    duplicateMultipleComponents,
    selectAll,
    clearSelection,
    groupSelectedComponents,
    ungroupComponent,
    selection,
    moveMultipleComponents
  } = useBuilderStore();

  // In a real implementation, use react-hotkeys-hook
  const shortcuts = {
    'ctrl+z': undo,
    'ctrl+y': redo,
    'ctrl+c': copySelectedComponents,
    'ctrl+v': () => pasteComponents(),
    'ctrl+x': () => {
      copySelectedComponents();
      deleteSelectedComponents();
    },
    'ctrl+a': selectAll,
    'delete': deleteSelectedComponents,
    'ctrl+d': () => duplicateMultipleComponents(selection.selectedComponents),
    'ctrl+g': groupSelectedComponents,
    'ctrl+shift+g': () => {
      if (selection.selectedComponents.length === 1) {
        ungroupComponent(selection.selectedComponents[0]);
      }
    },
    'escape': clearSelection,
    'arrowup': () => moveMultipleComponents(selection.selectedComponents, { x: 0, y: -1 }),
    'arrowdown': () => moveMultipleComponents(selection.selectedComponents, { x: 0, y: 1 }),
    'arrowleft': () => moveMultipleComponents(selection.selectedComponents, { x: -1, y: 0 }),
    'arrowright': () => moveMultipleComponents(selection.selectedComponents, { x: 1, y: 0 })
  };

  return shortcuts;
};
