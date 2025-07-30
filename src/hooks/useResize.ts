import React from "react";
import { useBuilderStore } from "@/stores/builderStore";
import { useHistoryStore } from "@/stores/historyStore";
import { useUIStore } from "@/stores/uiStore";
import { useRef, useCallback, useEffect } from "react";

export const useResize = () => {
  const zoom = useBuilderStore(state => state.zoom);
  const showGrid = useBuilderStore(state => state.showGrid);
  const gridSize = useBuilderStore(state => state.gridSize);
  const updateComponent = useBuilderStore(state => state.updateComponent);
  const project = useBuilderStore(state => state.project);
  
  const saveToHistory = useHistoryStore(state => state.saveToHistory);
  const { isResizing, setResizeState } = useUIStore();
  
  const resizeHandle = useRef<string | null>(null);
  const resizeComponent = useRef<string | null>(null);
  const initialSize = useRef({ width: 0, height: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleResizeStart = useCallback((
    e: React.MouseEvent, 
    componentId: string, 
    handle: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const component = project.components.find(c => c.id === componentId);
    if (!component || component.locked) return;

    setResizeState(true);
    resizeHandle.current = handle;
    resizeComponent.current = componentId;
    initialSize.current = { ...component.size };
  }, [project.components, setResizeState]);

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !resizeComponent.current || !resizeHandle.current || !canvasRef.current) return;

    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const zoomFactor = zoom / 100;
    const component = project.components.find(c => c.id === resizeComponent.current);
    if (!component) return;

    const mouseX = (e.clientX - rect.left) / zoomFactor;
    const mouseY = (e.clientY - rect.top) / zoomFactor;

    let newWidth = component.size.width;
    let newHeight = component.size.height;
    let newX = component.position.x;
    let newY = component.position.y;

    // Handle different resize directions
    switch (resizeHandle.current) {
      case 'se': // Bottom-right
        newWidth = Math.max(50, mouseX - component.position.x);
        newHeight = Math.max(30, mouseY - component.position.y);
        break;
      case 'sw': // Bottom-left
        newWidth = Math.max(50, component.position.x + component.size.width - mouseX);
        newHeight = Math.max(30, mouseY - component.position.y);
        newX = mouseX;
        break;
      case 'ne': // Top-right
        newWidth = Math.max(50, mouseX - component.position.x);
        newHeight = Math.max(30, component.position.y + component.size.height - mouseY);
        newY = mouseY;
        break;
      case 'nw': // Top-left
        newWidth = Math.max(50, component.position.x + component.size.width - mouseX);
        newHeight = Math.max(30, component.position.y + component.size.height - mouseY);
        newX = mouseX;
        newY = mouseY;
        break;
      case 'e': // Right
        newWidth = Math.max(50, mouseX - component.position.x);
        break;
      case 'w': // Left
        newWidth = Math.max(50, component.position.x + component.size.width - mouseX);
        newX = mouseX;
        break;
      case 's': // Bottom
        newHeight = Math.max(30, mouseY - component.position.y);
        break;
      case 'n': // Top
        newHeight = Math.max(30, component.position.y + component.size.height - mouseY);
        newY = mouseY;
        break;
    }

    // Grid snapping
    if (showGrid) {
      newWidth = Math.round(newWidth / gridSize) * gridSize;
      newHeight = Math.round(newHeight / gridSize) * gridSize;
      newX = Math.round(newX / gridSize) * gridSize;
      newY = Math.round(newY / gridSize) * gridSize;
    }

    // Update component
    updateComponent(resizeComponent.current, {
      position: { x: newX, y: newY },
      size: { width: newWidth, height: newHeight }
    });
  }, [isResizing, zoom, showGrid, gridSize, updateComponent, project.components]);

  const handleResizeEnd = useCallback(() => {
    if (isResizing && resizeComponent.current) {
      const component = project.components.find(c => c.id === resizeComponent.current);
      if (component) {
        // Only save if size actually changed
        const sizeChanged = 
          component.size.width !== initialSize.current.width ||
          component.size.height !== initialSize.current.height;
          
        if (sizeChanged) {
          saveToHistory(project.components, 'Resize Component');
        }
      }
    }
    
    setResizeState(false);
    resizeHandle.current = null;
    resizeComponent.current = null;
  }, [isResizing, project.components, saveToHistory, setResizeState]);

  // Global event listeners
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      document.body.style.cursor = 'nw-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  return {
    handleResizeStart,
    isResizing,
    canvasRef
  };
};