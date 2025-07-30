import { useCallback } from 'react';
import { useBuilderStore } from '@/stores/builderStore';
import { useHistoryStore } from '@/stores/historyStore';
import { Component } from '@/types';

export const useBulkOperations = () => {
  const selectedComponents = useBuilderStore(state => state.selectedComponents);
  const project = useBuilderStore(state => state.project);
  const updateComponent = useBuilderStore(state => state.updateComponent);
  const deleteMultipleComponents = useBuilderStore(state => state.deleteMultipleComponents);
  const addComponent = useBuilderStore(state => state.addComponent);
  const selectMultipleComponents = useBuilderStore(state => state.selectMultipleComponents);
  const selectComponent = useBuilderStore(state => state.selectComponent);
  const saveToHistory = useHistoryStore(state => state.saveToHistory);

  // Alignment operations
  const align = useCallback((alignment: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => {
    if (selectedComponents.length < 2) return;

    const components = project.components.filter(c => selectedComponents.includes(c.id));
    
    if (['left', 'center', 'right'].includes(alignment)) {
      // Horizontal alignment
      const referenceX = alignment === 'left' ? 
        Math.min(...components.map(c => c.position.x)) :
        alignment === 'right' ?
        Math.max(...components.map(c => c.position.x + c.size.width)) :
        components.reduce((sum, c) => sum + c.position.x + c.size.width / 2, 0) / components.length;

      components.forEach(comp => {
        let newX = referenceX;
        if (alignment === 'center') newX -= comp.size.width / 2;
        if (alignment === 'right') newX -= comp.size.width;

        updateComponent(comp.id, {
          position: { ...comp.position, x: newX }
        });
      });
    } else {
      // Vertical alignment
      const referenceY = alignment === 'top' ?
        Math.min(...components.map(c => c.position.y)) :
        alignment === 'bottom' ?
        Math.max(...components.map(c => c.position.y + c.size.height)) :
        components.reduce((sum, c) => sum + c.position.y + c.size.height / 2, 0) / components.length;

      components.forEach(comp => {
        let newY = referenceY;
        if (alignment === 'middle') newY -= comp.size.height / 2;
        if (alignment === 'bottom') newY -= comp.size.height;

        updateComponent(comp.id, {
          position: { ...comp.position, y: newY }
        });
      });
    }

    saveToHistory(project.components, `Align ${alignment}`);
  }, [selectedComponents, project.components, updateComponent, saveToHistory]);

  // Distribution operations
  const distribute = useCallback((direction: 'horizontal' | 'vertical') => {
    if (selectedComponents.length < 3) return;

    const components = project.components
      .filter(c => selectedComponents.includes(c.id))
      .sort((a, b) => direction === 'horizontal' ? 
        a.position.x - b.position.x : 
        a.position.y - b.position.y
      );

    const first = components[0];
    const last = components[components.length - 1];
    
    const totalSpace = direction === 'horizontal' ?
      (last.position.x + last.size.width) - first.position.x :
      (last.position.y + last.size.height) - first.position.y;

    const totalComponentSize = components.reduce((sum, c) => 
      sum + (direction === 'horizontal' ? c.size.width : c.size.height), 0
    );

    const spacing = (totalSpace - totalComponentSize) / (components.length - 1);
    let currentPos = direction === 'horizontal' ? first.position.x : first.position.y;
    
    components.forEach((comp, index) => {
      if (index === 0) return; // Keep first component in place

      if (direction === 'horizontal') {
        updateComponent(comp.id, {
          position: { ...comp.position, x: currentPos }
        });
        currentPos += comp.size.width + spacing;
      } else {
        updateComponent(comp.id, {
          position: { ...comp.position, y: currentPos }
        });
        currentPos += comp.size.height + spacing;
      }
    });

    saveToHistory(project.components, `Distribute ${direction}`);
  }, [selectedComponents, project.components, updateComponent, saveToHistory]);

  // Group operation
  const group = useCallback(() => {
    if (selectedComponents.length < 2) return;

    const groupId = `group-${Date.now()}`;
    const components = project.components.filter(c => selectedComponents.includes(c.id));
    
    // Calculate group bounds
    const minX = Math.min(...components.map(c => c.position.x));
    const minY = Math.min(...components.map(c => c.position.y));
    const maxX = Math.max(...components.map(c => c.position.x + c.size.width));
    const maxY = Math.max(...components.map(c => c.position.y + c.size.height));

    const groupComponent: Component = {
      id: groupId,
      type: 'group',
      props: { name: 'Group' },
      styles: {
        border: '2px dashed #3b82f6',
        background: 'rgba(59, 130, 246, 0.05)',
        borderRadius: '4px'
      },
      position: { x: minX - 10, y: minY - 10 },
      size: { width: maxX - minX + 20, height: maxY - minY + 20 },
      children: components.map(c => ({
        ...c,
        position: { x: c.position.x - minX + 10, y: c.position.y - minY + 10 }
      }))
    };

    // Remove original components and add group
    const updatedComponents = [
      ...project.components.filter(c => !selectedComponents.includes(c.id)),
      groupComponent
    ];

    // Update the project components
    project.components.splice(0, project.components.length, ...updatedComponents);
    
    selectComponent(groupId);
    saveToHistory(updatedComponents, 'Group Components');
  }, [selectedComponents, project.components, addComponent, selectComponent, saveToHistory]);

  // Ungroup operation
  const ungroup = useCallback((groupId: string) => {
    const groupComponent = project.components.find(c => c.id === groupId);
    if (!groupComponent || groupComponent.type !== 'group' || !groupComponent.children) return;

    const ungroupedComponents = groupComponent.children.map(child => ({
      ...child,
      position: {
        x: child.position.x + groupComponent.position.x,
        y: child.position.y + groupComponent.position.y
      }
    }));

    const updatedComponents = [
      ...project.components.filter(c => c.id !== groupId),
      ...ungroupedComponents
    ];

    // Update the project components
    project.components.splice(0, project.components.length, ...updatedComponents);
    
    selectMultipleComponents(ungroupedComponents.map(c => c.id));
    saveToHistory(updatedComponents, 'Ungroup Components');
  }, [project.components, selectMultipleComponents, saveToHistory]);

  // Delete selected components
  const deleteSelected = useCallback(() => {
    if (selectedComponents.length === 0) return;
    
    deleteMultipleComponents(selectedComponents);
    saveToHistory(
      project.components.filter(c => !selectedComponents.includes(c.id)), 
      'Delete Components'
    );
  }, [selectedComponents, deleteMultipleComponents, project.components, saveToHistory]);
  

  return {
    align,
    distribute,
    group,
    ungroup,
    deleteSelected,
    canAlign: selectedComponents.length >= 2,
    canDistribute: selectedComponents.length >= 3,
    canGroup: selectedComponents.length >= 2,
    canDelete: selectedComponents.length > 0
  };
};