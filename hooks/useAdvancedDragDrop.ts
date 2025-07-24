import React from "react";
import { useState, useRef, useCallback } from "react";

/**
 * Advanced Drag & Drop Hook
 */
export function useAdvancedDragDrop(elements: any[], onUpdateElements: (elements: any[]) => void) {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedItems: [],
    dragOffset: { x: 0, y: 0 },
    ghostPosition: { x: 0, y: 0 },
    snapGuides: [],
    dropZones: []
  });

  const canvasRef = useRef<HTMLDivElement>(null);
  const [gridSize, setGridSize] = useState(20);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  // Calculate snap guides
  const calculateSnapGuides = useCallback((draggedElement: any, allElements: any[]) => {
    const guides: SnapGuide[] = [];
    const threshold = 5;

    allElements.forEach(element => {
      if (element.id === draggedElement.id) return;

      // Horizontal guides
      guides.push({
        id: `h-${element.id}-top`,
        type: 'horizontal',
        position: element.position.y,
        elements: [element.id],
        visible: Math.abs(element.position.y - draggedElement.position.y) < threshold
      });

      guides.push({
        id: `h-${element.id}-center`,
        type: 'center',
        position: element.position.y + (element.size?.height || 100) / 2,
        elements: [element.id],
        visible: Math.abs(element.position.y + (element.size?.height || 100) / 2 - draggedElement.position.y) < threshold
      });

      // Vertical guides
      guides.push({
        id: `v-${element.id}-left`,
        type: 'vertical',
        position: element.position.x,
        elements: [element.id],
        visible: Math.abs(element.position.x - draggedElement.position.x) < threshold
      });

      guides.push({
        id: `v-${element.id}-center`,
        type: 'center',
        position: element.position.x + (element.size?.width || 100) / 2,
        elements: [element.id],
        visible: Math.abs(element.position.x + (element.size?.width || 100) / 2 - draggedElement.position.x) < threshold
      });
    });

    return guides.filter(guide => guide.visible);
  }, []);

  // Handle drag start
  const handleDragStart = useCallback((itemIds: string[], startPosition: { x: number; y: number }) => {
    const draggedElement = elements.find(el => el.id === itemIds[0]);
    if (!draggedElement) return;

    const snapGuides = calculateSnapGuides(draggedElement, elements);

    setDragState({
      isDragging: true,
      draggedItems: itemIds,
      dragOffset: { x: 0, y: 0 },
      ghostPosition: startPosition,
      snapGuides,
      dropZones: []
    });
  }, [elements, calculateSnapGuides]);

  // Handle drag move
  const handleDragMove = useCallback((currentPosition: { x: number; y: number }) => {
    if (!dragState.isDragging) return;

    let newPosition = currentPosition;

    // Snap to grid if enabled
    if (snapToGrid) {
      newPosition = {
        x: Math.round(currentPosition.x / gridSize) * gridSize,
        y: Math.round(currentPosition.y / gridSize) * gridSize
      };
    }

    // Snap to guides
    const activeGuides = dragState.snapGuides.filter(guide => {
      const distance = guide.type === 'horizontal' || guide.type === 'center'
        ? Math.abs(guide.position - newPosition.y)
        : Math.abs(guide.position - newPosition.x);
      return distance < 10;
    });

    if (activeGuides.length > 0) {
      const closestGuide = activeGuides.reduce((closest, guide) => {
        const currentDistance = guide.type === 'horizontal' || guide.type === 'center'
          ? Math.abs(guide.position - newPosition.y)
          : Math.abs(guide.position - newPosition.x);
        const closestDistance = guide.type === 'horizontal' || guide.type === 'center'
          ? Math.abs(closest.position - newPosition.y)
          : Math.abs(closest.position - newPosition.x);
        return currentDistance < closestDistance ? guide : closest;
      });

      if (closestGuide.type === 'horizontal' || closestGuide.type === 'center') {
        newPosition.y = closestGuide.position;
      } else {
        newPosition.x = closestGuide.position;
      }
    }

    setDragState(prev => ({
      ...prev,
      ghostPosition: newPosition,
      snapGuides: prev.snapGuides.map(guide => ({
        ...guide,
        visible: activeGuides.includes(guide)
      }))
    }));
  }, [dragState.isDragging, snapToGrid, gridSize]);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    if (!dragState.isDragging) return;

    const updatedElements = elements.map(element => {
      if (dragState.draggedItems.includes(element.id)) {
        return {
          ...element,
          position: {
            x: dragState.ghostPosition.x,
            y: dragState.ghostPosition.y
          }
        };
      }
      return element;
    });

    onUpdateElements(updatedElements);

    setDragState({
      isDragging: false,
      draggedItems: [],
      dragOffset: { x: 0, y: 0 },
      ghostPosition: { x: 0, y: 0 },
      snapGuides: [],
      dropZones: []
    });
  }, [dragState, elements, onUpdateElements]);

  return {
    dragState,
    gridSize,
    setGridSize,
    snapToGrid,
    setSnapToGrid,
    showGrid,
    setShowGrid,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    canvasRef
  };
}