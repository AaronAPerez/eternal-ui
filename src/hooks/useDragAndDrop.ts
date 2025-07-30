import { useCallback, useRef, useEffect } from 'react';
import { useBuilderStore } from './useBuilderStore';
import { useHistoryStore } from '@/stores/historyStore';
import { useUIStore } from '@/stores/uiStore';
import { createDefaultComponent } from '@/components/WebsiteBuilder/utils/componentHelpers';


export const useDragAndDrop = () => {
  // ============================================
  // STORE SELECTORS
  // ============================================
  
  const zoom = useBuilderStore(state => state.zoom);
  const device = useBuilderStore(state => state.device);
  const showGrid = useBuilderStore(state => state.showGrid);
  const gridSize = useBuilderStore(state => state.gridSize);
  const selectedTool = useBuilderStore(state => state.selectedTool);
  const addComponent = useBuilderStore(state => state.addComponent);
  const updateComponent = useBuilderStore(state => state.updateComponent);
  const selectComponent = useBuilderStore(state => state.selectComponent);
  const project = useBuilderStore(state => state.project);
  
  const saveToHistory = useHistoryStore(state => state.saveToHistory);
  
  const { 
    isDragging, 
    draggedComponent, 
    setDragState,
    isResizing,
    setResizeState 
  } = useUIStore();

  // ============================================
  // REFS FOR DRAG STATE
  // ============================================
  
  const dragOffset = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const initialPosition = useRef({ x: 0, y: 0 });

  // ============================================
  // COMPONENT DRAG START (From Library)
  // ============================================
  
  const handleDragStart = useCallback((e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData('componentType', componentType);
    e.dataTransfer.effectAllowed = 'copy';

    // Enhanced ghost element with animations
    const ghostElement = e.currentTarget.cloneNode(true) as HTMLElement;
    ghostElement.style.opacity = '0.7';
    ghostElement.style.transform = 'rotate(3deg) scale(1.05)';
    ghostElement.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    ghostElement.style.borderRadius = '8px';
    ghostElement.style.background = 'rgba(59, 130, 246, 0.1)';
    ghostElement.style.border = '2px dashed #3b82f6';
    ghostElement.style.zIndex = '9999';
    ghostElement.style.pointerEvents = 'none';
    
    document.body.appendChild(ghostElement);
    e.dataTransfer.setDragImage(ghostElement, 50, 25);

    // Cleanup with animation
    setTimeout(() => {
      if (document.body.contains(ghostElement)) {
        ghostElement.style.transition = 'all 0.2s ease-out';
        ghostElement.style.opacity = '0';
        ghostElement.style.transform = 'rotate(3deg) scale(0.8)';
        setTimeout(() => {
          if (document.body.contains(ghostElement)) {
            document.body.removeChild(ghostElement);
          }
        }, 200);
      }
    }, 0);
  }, []);

  // ============================================
  // CANVAS DROP HANDLER
  // ============================================
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('componentType');
    
    if (!componentType || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const zoomFactor = zoom / 100;
    
    let x = (e.clientX - rect.left) / zoomFactor;
    let y = (e.clientY - rect.top) / zoomFactor;

    // Grid snapping
    if (showGrid) {
      x = Math.round(x / gridSize) * gridSize;
      y = Math.round(y / gridSize) * gridSize;
    }

    // Create new component
    const newComponent = createDefaultComponent(componentType, { x, y });
    
    // Add to store
    addComponent(newComponent);
    selectComponent(newComponent.id);
    
    // Save to history
    saveToHistory([...project.components, newComponent], `Add ${componentType}`);
    
  }, [zoom, showGrid, gridSize, addComponent, selectComponent, saveToHistory, project.components]);

  // ============================================
  // DRAG OVER HANDLER
  // ============================================
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  // ============================================
  // COMPONENT MOVE START
  // ============================================
  
  const handleComponentDragStart = useCallback((e: React.MouseEvent, componentId: string) => {
    if (selectedTool !== 'select') return;

    e.preventDefault();
    e.stopPropagation();

    const component = project.components.find(c => c.id === componentId);
    if (!component || component.locked) return;

    setDragState(true, componentId);
    selectComponent(componentId);

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const zoomFactor = zoom / 100;
      dragOffset.current = {
        x: (e.clientX - rect.left) / zoomFactor - component.position.x,
        y: (e.clientY - rect.top) / zoomFactor - component.position.y
      };
      initialPosition.current = { ...component.position };
    }
  }, [selectedTool, project.components, zoom, setDragState, selectComponent]);

  // ============================================
  // COMPONENT MOVE HANDLER
  // ============================================
  
  const handleComponentMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !draggedComponent || !canvasRef.current) return;

    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const zoomFactor = zoom / 100;

    let newX = (e.clientX - rect.left) / zoomFactor - dragOffset.current.x;
    let newY = (e.clientY - rect.top) / zoomFactor - dragOffset.current.y;

    // Grid snapping
    if (showGrid) {
      newX = Math.round(newX / gridSize) * gridSize;
      newY = Math.round(newY / gridSize) * gridSize;
    }

    // Constrain to canvas bounds
    const getDeviceWidth = (device: string) => {
      const widths = { mobile: 375, tablet: 768, desktop: 1200, wide: 1920 };
      return widths[device as keyof typeof widths] || 1200;
    };
    const deviceWidth = getDeviceWidth(device);
    const component = project.components.find(c => c.id === draggedComponent);
    if (component) {
      newX = Math.max(0, Math.min(newX, deviceWidth - component.size.width));
      newY = Math.max(0, newY);

      // Update component position
      updateComponent(draggedComponent, {
        position: { x: newX, y: newY }
      });
    }
  }, [isDragging, draggedComponent, zoom, showGrid, gridSize, device, updateComponent, project.components]);

  // ============================================
  // DRAG END HANDLER
  // ============================================
  
  const handleDragEnd = useCallback(() => {
    if (isDragging && draggedComponent) {
      const component = project.components.find(c => c.id === draggedComponent);
      if (component) {
        // Only save to history if position actually changed
        const positionChanged = 
          component.position.x !== initialPosition.current.x ||
          component.position.y !== initialPosition.current.y;
          
        if (positionChanged) {
          saveToHistory(project.components, 'Move Component');
        }
      }
    }
    
    setDragState(false);
  }, [isDragging, draggedComponent, project.components, saveToHistory, setDragState]);

  // ============================================
  // GLOBAL EVENT LISTENERS
  // ============================================
  
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleComponentMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleComponentMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleComponentMove, handleDragEnd]);

  // ============================================
  // RETURN API
  // ============================================
  
  return {
    // Component library drag & drop
    handleDragStart,
    handleDrop,
    handleDragOver,
    
    // Component movement
    handleComponentDragStart,
    
    // State
    isDragging,
    draggedComponent,
    
    // Refs
    canvasRef
  };
};