import React from "react";
import { useBuilderStore } from "@/stores/builderStore";
import { useEffect } from "react";
import { useStores } from "./useStores";

export const useKeyboardShortcuts = () => {
  const { actions } = useStores();
  const selectedComponent = useBuilderStore(state => state.selectedComponent);
  const selectedComponents = useBuilderStore(state => state.selectedComponents);
  const zoom = useBuilderStore(state => state.zoom);
  const setZoom = useBuilderStore(state => state.setZoom);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

      // Copy/Paste
      if (ctrlOrCmd && e.key === 'c') {
        e.preventDefault();
        actions.copySelected();
        return;
      }

      if (ctrlOrCmd && e.key === 'v') {
        e.preventDefault();
        actions.paste();
        return;
      }

      // Duplicate
      if (ctrlOrCmd && e.key === 'd') {
        e.preventDefault();
        actions.duplicate();
        return;
      }

      // Select all
      if (ctrlOrCmd && e.key === 'a') {
        e.preventDefault();
        actions.selectAll();
        return;
      }

      // Zoom
      if (ctrlOrCmd && e.key === '=') {
        e.preventDefault();
        setZoom(Math.min(zoom + 25, 300));
        return;
      }

      if (ctrlOrCmd && e.key === '-') {
        e.preventDefault();
        setZoom(Math.max(zoom - 25, 25));
        return;
      }

      if (ctrlOrCmd && e.key === '0') {
        e.preventDefault();
        setZoom(100);
        return;
      }

      // Undo/Redo
      if (ctrlOrCmd && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        actions.undo();
        return;
      }

      if (ctrlOrCmd && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        actions.redo();
        return;
      }

      // Delete
      if ((e.key === 'Delete' || e.key === 'Backspace') && 
          (selectedComponent || selectedComponents.length > 0)) {
        e.preventDefault();
        if (selectedComponent) {
          actions.deleteComponentWithHistory(selectedComponent);
        } else if (selectedComponents.length > 0) {
          actions.deleteMultipleComponentsWithHistory(selectedComponents);
        }
        return;
      }

      // Arrow key movement
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const moveDistance = e.shiftKey ? 10 : 1;
        actions.moveComponents(moveDistance, e.key);
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [actions, selectedComponent, selectedComponents, zoom, setZoom]);
};

// ============================================
// HELPER FUNCTIONS
// ============================================

const getDeviceWidth = (device: string): number => {
  const widths = {
    mobile: 375,
    tablet: 768,
    desktop: 1200,
    wide: 1920
  };
  return widths[device as keyof typeof widths] || 1200;
};