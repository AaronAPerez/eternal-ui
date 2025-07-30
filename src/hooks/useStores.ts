import React from "react";
import { useBuilderStore } from "@/stores/builderStore";
import { useHistoryStore } from "@/stores/historyStore";
import { useUIStore } from "@/stores/uiStore";
import { Component } from "@/types";

export const useStores = () => {
  const builder = useBuilderStore();
  const history = useHistoryStore();
  const ui = useUIStore();

  // Integrated actions that work across stores
  const integratedActions = {
    // Add component with history tracking
    addComponentWithHistory: (component: Component) => {
      builder.addComponent(component);
      history.saveToHistory([...builder.project.components, component], 'Add Component');
    },

    // Update component with history tracking
    updateComponentWithHistory: (id: string, updates: Partial<Component>) => {
      builder.updateComponent(id, updates);
      history.saveToHistory(builder.project.components, 'Update Component');
    },

    // Delete with history
    deleteComponentWithHistory: (id: string) => {
      const newComponents = builder.project.components.filter(c => c.id !== id);
      builder.deleteComponent(id);
      history.saveToHistory(newComponents, 'Delete Component');
    },

    // Delete multiple components with history
    deleteMultipleComponentsWithHistory: (ids: string[]) => {
      const newComponents = builder.project.components.filter(c => !ids.includes(c.id));
      builder.deleteMultipleComponents(ids);
      history.saveToHistory(newComponents, 'Delete Multiple Components');
    },

    // Undo with store sync
    undo: () => {
      const previousComponents = history.undo();
      if (previousComponents) {
        builder.project.components = previousComponents;
      }
    },

    // Redo with store sync
    redo: () => {
      const nextComponents = history.redo();
      if (nextComponents) {
        builder.project.components = nextComponents;
      }
    },

    // Clipboard and selection utilities
    copySelected: () => {
      if (builder.selectedComponent) {
        const component = builder.project.components.find(c => c.id === builder.selectedComponent);
        if (component) {
          // Store in localStorage or a clipboard store
          localStorage.setItem('eternal-ui-clipboard', JSON.stringify(component));
        }
      }
    },

    hasSelection: () => {
      return !!builder.selectedComponent || builder.selectedComponents.length > 0;
    },

    hasClipboard: () => {
      return !!localStorage.getItem('eternal-ui-clipboard');
    },

    paste: () => {
      const clipboardData = localStorage.getItem('eternal-ui-clipboard');
      if (clipboardData) {
        try {
          const component = JSON.parse(clipboardData);
          // Generate new ID and offset position
          const newComponent = {
            ...component,
            id: `${component.type}-${Date.now()}`,
            position: {
              x: component.position.x + 20,
              y: component.position.y + 20
            }
          };
          builder.addComponent(newComponent);
          history.saveToHistory([...builder.project.components, newComponent], 'Paste Component');
        } catch (error) {
          console.error('Failed to paste component:', error);
        }
      }
    }
  };

  return {
    builder,
    history,
    ui,
    actions: integratedActions
  };
};