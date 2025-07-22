import { useCallback, useMemo, useState } from 'react';
import { 
  useSensors, 
  useSensor, 
  PointerSensor, 
  KeyboardSensor,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  DragMoveEvent,
  closestCenter,
  CollisionDetection
} from '@dnd-kit/core';
import { useCanvas } from './useCanvas';
import { ComponentDefinition, CanvasElement } from '../types';

interface DragState {
  isDragging: boolean;
  draggedItem: {
    type: 'component' | 'element';
    data: ComponentDefinition | string;
  } | null;
  dropTarget: string | null;
  dragPosition: { x: number; y: number } | null;
}

export const useDragAndDrop = () => {
  const { state, actions } = useCanvas();
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedItem: null,
    dropTarget: null,
    dragPosition: null
  });

  // Helper function to check if an element is a descendant of another
  // Move this outside of useCallback to fix dependency issue
  const isDescendant = useCallback((elementId: string, potentialAncestorId: string, elements: Map<string, CanvasElement>): boolean => {
    const element = elements.get(elementId);
    if (!element || !element.parent) return false;
    
    if (element.parent === potentialAncestorId) return true;
    
    return isDescendant(element.parent, potentialAncestorId, elements);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
        tolerance: 5,
        delay: 100
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: (event, { context }) => {
        const { active, over } = context;
        
        if (!active || !over) return null;
        
        switch (event.code) {
          case 'ArrowRight':
            return { x: 1, y: 0 };
          case 'ArrowLeft':
            return { x: -1, y: 0 };
          case 'ArrowDown':
            return { x: 0, y: 1 };
          case 'ArrowUp':
            return { x: 0, y: -1 };
          default:
            return null;
        }
      }
    })
  );

  const collisionDetection: CollisionDetection = useCallback((args) => {
    const { active, droppableContainers } = args;
    
    if (!active) return [];

    if (active.data.current?.type === 'component') {
      const canvasContainer = droppableContainers.find(container => 
        container.id === 'canvas'
      );
      
      if (canvasContainer) {
        // Use proper typing instead of any
        const canvasIntersection = closestCenter({
          ...args,
          droppableContainers: [canvasContainer]
        });
        
        if (canvasIntersection.length > 0) {
          return canvasIntersection;
        }
      }
    }

    return closestCenter(args);
  }, []);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    const activeData = active.data.current;

    if (!activeData) return;

    setDragState({
      isDragging: true,
      draggedItem: {
        type: activeData.type,
        data: activeData.type === 'component' ? activeData.component : active.id
      },
      dropTarget: null,
      dragPosition: null
    });
  }, []);

  const handleDragMove = useCallback((event: DragMoveEvent) => {
    const { delta } = event;
    
    setDragState(prev => ({
      ...prev,
      dragPosition: delta ? { x: delta.x, y: delta.y } : null
    }));
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { over } = event;
    
    setDragState(prev => ({
      ...prev,
      dropTarget: over?.id as string || null
    }));
  }, []);

  // Fix line 273 & 345 - Include isDescendant in dependencies
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    const activeData = active.data.current;
    const overData = over?.data.current;

    setDragState({
      isDragging: false,
      draggedItem: null,
      dropTarget: null,
      dragPosition: null
    });

    if (!over || !activeData) return;

    try {
      if (activeData.type === 'component' && over.id === 'canvas') {
        const component = activeData.component as ComponentDefinition;
        
        actions.addElement({
          type: 'component',
          name: component.name,
          component: component.id,
          props: { ...component.defaultProps },
          style: { 
            ...component.defaultStyle,
            position: 'relative'
          },
          children: [],
          locked: false,
          visible: true
        });
      }
      else if (activeData.type === 'element' && overData?.type === 'element') {
        const draggedElementId = active.id as string;
        const targetElementId = over.id as string;
        
        const draggedElement = state.elements.get(draggedElementId);
        const targetElement = state.elements.get(targetElementId);
        
        if (draggedElement && targetElement && !targetElement.locked) {
          if (draggedElementId !== targetElementId && 
              !isDescendant(draggedElementId, targetElementId, state.elements)) {
            
            actions.moveElement(draggedElementId, targetElementId);
          }
        }
      }
    } catch (error) {
      console.error('Error during drop operation:', error);
    }
  }, [state.elements, actions, isDescendant]); // Include isDescendant

  // Fix line 290 & 298 - Replace 'any' with proper types
  const calculateDropPosition = useCallback((event: DragEndEvent) => {
    const rect = event.over?.rect;
    if (rect) {
      return {
        left: Math.max(0, rect.left || 0),
        top: Math.max(0, rect.top || 0)
      };
    }
    return {};
  }, []);

  const calculateSiblingPosition = useCallback((targetElement: CanvasElement) => { // Instead of any
    return {
      left: (targetElement.style.left as number || 0) + 20,
      top: (targetElement.style.top as number || 0) + 20
    };
  }, []);

  const isValidDropTarget = useCallback((targetId: string, draggedItem: DragState['draggedItem']) => {
    if (!draggedItem) return false;

    const target = state.elements.get(targetId);
    
    if (target?.locked) return false;
    
    if (draggedItem.type === 'element' && draggedItem.data === targetId) return false;
    
    if (draggedItem.type === 'element') {
      return !isDescendant(targetId, draggedItem.data as string, state.elements);
    }
    
    return true;
  }, [state.elements, isDescendant]); // Include isDescendant

  const dragContextProps = useMemo(() => ({
    sensors,
    collisionDetection,
    onDragStart: handleDragStart,
    onDragMove: handleDragMove,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd
  }), [
    sensors,
    collisionDetection,
    handleDragStart,
    handleDragMove,
    handleDragOver,
    handleDragEnd
  ]);

  return {
    sensors,
    dragContextProps,
    dragState,
    isDragging: dragState.isDragging,
    draggedItem: dragState.draggedItem,
    dropTarget: dragState.dropTarget,
    dragPosition: dragState.dragPosition,
    isValidDropTarget,
    collisionDetection
  };
};

export default useDragAndDrop;
