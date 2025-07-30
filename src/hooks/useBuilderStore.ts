import React from 'react';
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';
import { 
  BuilderState, 
  Component, 
  DragOperation, 
  ComponentPosition, 
  ComponentSize, 
  HistoryAction,
  DropZone,
  SelectionState,
  PerformanceMetrics
} from '@/types/builder';
import { Project } from '@/types';

/**
 * 🏗️ DEFAULT PROJECT STRUCTURE
 * 
 * Enhanced default project with drop zones and better organization
 */
const createDefaultProject = (): Project => ({
  id: uuidv4(),
  name: 'My Eternal UI Website',
  components: [
    {
      id: 'hero-default',
      type: 'hero',
      props: {
        title: 'Welcome to the Future of Web Design',
        subtitle: 'Build stunning websites with AI-powered components',
        ctaText: 'Get Started',
        backgroundImage: '/hero-bg.jpg'
      },
      styles: {
        className: 'min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center',
        padding: '120px 20px',
        textAlign: 'center'
      },
      position: { x: 0, y: 0 },
      size: { width: 1200, height: 600 },
      children: [],
      metadata: {
        created: new Date(),
        modified: new Date(),
        version: 1,
        description: 'Hero section with gradient background'
      },
      isDraggable: true,
      isDroppable: false
    }
  ],
  styles: {
    colors: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#6B7280'],
    fonts: ['Inter', 'Playfair Display', 'Source Sans Pro', 'Roboto', 'Poppins'],
    spacing: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128]
  }
});

/**
 * 📍 DEFAULT DROP ZONES
 * 
 * Standard drop zones for the canvas
 */
const createDefaultDropZones = (): DropZone[] => [
  {
    id: 'main-canvas',
    name: 'Main Canvas',
    accepts: ['*'], // Accepts all component types
    position: { x: 0, y: 0 },
    size: { width: 1200, height: 2000 },
    className: 'min-h-screen bg-white',
    highlightClassName: 'bg-blue-100 border-2 border-blue-300 border-dashed'
  },
  {
    id: 'header-zone',
    name: 'Header Zone',
    accepts: ['header', 'navigation', 'logo'],
    maxComponents: 1,
    position: { x: 0, y: 0 },
    size: { width: 1200, height: 80 },
    className: 'bg-gray-50 border-b border-gray-200',
    highlightClassName: 'bg-green-100 border-2 border-green-300 border-dashed'
  },
  {
    id: 'footer-zone',
    name: 'Footer Zone',
    accepts: ['footer', 'navigation'],
    maxComponents: 1,
    position: { x: 0, y: 1920 },
    size: { width: 1200, height: 120 },
    className: 'bg-gray-800 text-white',
    highlightClassName: 'bg-purple-100 border-2 border-purple-300 border-dashed'
  }
];

/**
 * 🎯 ENHANCED BUILDER STORE
 * 
 * Complete drag & drop builder state management with performance optimization
 */
export const useBuilderStore = create<BuilderState>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        // INITIAL STATE
        project: createDefaultProject(),
        selectedTool: 'select',
        
        // Selection and drag state
        selection: {
          selectedComponents: [],
          isMultiSelecting: false
        },
        dragOperation: null,
        
        // Canvas settings
        device: 'desktop',
        zoom: 100,
        showGrid: true,
        gridSize: 20,
        snapToGrid: true,
        
        // UI state
        isPreviewMode: false,
        showGuides: true,
        showRulers: false,
        
        // Drop zones
        dropZones: createDefaultDropZones(),
        activeDropZone: null,
        
        // History state (50+ actions as per checklist)
        history: {
          past: [],
          present: null,
          future: [],
          maxHistorySize: 50
        },
        
        // Performance metrics
        performanceMetrics: {
          componentCount: 1,
          renderTime: 0,
          lastUpdate: new Date()
        },

        // =================================================================
        // COMPONENT MANAGEMENT ACTIONS
        // =================================================================

        /**
         * ➕ Add Component with History Tracking
         */
        addComponent: (component: Component, dropZoneId?: string) => {
          const startTime = performance.now();
          
          set((state) => {
            const newComponent = {
              ...component,
              id: component.id || uuidv4(),
              metadata: {
                ...component.metadata,
                created: new Date(),
                modified: new Date()
              }
            };

            // Add to project
            state.project.components.push(newComponent);
            
            // Update performance metrics
            state.performanceMetrics.componentCount = state.project.components.length;
            state.performanceMetrics.renderTime = performance.now() - startTime;
            state.performanceMetrics.lastUpdate = new Date();
            
            // Add to history
            state.history.past.push({
              id: uuidv4(),
              type: 'add',
              timestamp: new Date(),
              componentIds: [newComponent.id],
              beforeState: null,
              afterState: newComponent,
              description: `Added ${component.type} component`
            });
            
            // Clear future history
            state.history.future = [];
            
            // Limit history size
            if (state.history.past.length > state.history.maxHistorySize) {
              state.history.past.shift();
            }
          });
        },

        /**
         * 🗑️ Remove Component with History
         */
        removeComponent: (id: string) => {
          set((state) => {
            const componentIndex = state.project.components.findIndex(c => c.id === id);
            if (componentIndex === -1) return;
            
            const removedComponent = state.project.components[componentIndex];
            
            // Remove from project
            state.project.components.splice(componentIndex, 1);
            
            // Remove from selection if selected
            const selectionIndex = state.selection.selectedComponents.indexOf(id);
            if (selectionIndex > -1) {
              state.selection.selectedComponents.splice(selectionIndex, 1);
            }
            
            // Update performance metrics
            state.performanceMetrics.componentCount = state.project.components.length;
            state.performanceMetrics.lastUpdate = new Date();
            
            // Add to history
            state.history.past.push({
              id: uuidv4(),
              type: 'remove',
              timestamp: new Date(),
              componentIds: [id],
              beforeState: removedComponent,
              afterState: null,
              description: `Removed ${removedComponent.type} component`
            });
            
            state.history.future = [];
          });
        },

        /**
         * 🗑️ Remove Multiple Components (Bulk Operation)
         */
        removeMultipleComponents: (ids: string[]) => {
          set((state) => {
            const removedComponents: Component[] = [];
            
            // Remove components and track what was removed
            ids.forEach(id => {
              const componentIndex = state.project.components.findIndex(c => c.id === id);
              if (componentIndex > -1) {
                removedComponents.push(state.project.components[componentIndex]);
                state.project.components.splice(componentIndex, 1);
              }
            });
            
            // Clear selection
            state.selection.selectedComponents = [];
            
            // Update performance metrics
            state.performanceMetrics.componentCount = state.project.components.length;
            state.performanceMetrics.lastUpdate = new Date();
            
            // Add to history
            if (removedComponents.length > 0) {
              state.history.past.push({
                id: uuidv4(),
                type: 'bulk',
                timestamp: new Date(),
                componentIds: ids,
                beforeState: removedComponents,
                afterState: null,
                description: `Removed ${removedComponents.length} components`
              });
              
              state.history.future = [];
            }
          });
        },

        /**
         * ✏️ Update Component with History
         */
        updateComponent: (id: string, updates: Partial<Component>) => {
          set((state) => {
            const component = state.project.components.find(c => c.id === id);
            if (!component) return;
            
            const beforeState = { ...component };
            
            // Apply updates
            Object.assign(component, updates, {
              metadata: {
                ...component.metadata,
                modified: new Date(),
                version: component.metadata.version + 1
              }
            });
            
            // Update performance metrics
            state.performanceMetrics.lastUpdate = new Date();
            
            // Add to history
            state.history.past.push({
              id: uuidv4(),
              type: 'update',
              timestamp: new Date(),
              componentIds: [id],
              beforeState,
              afterState: { ...component },
              description: `Updated ${component.type} component`
            });
            
            state.history.future = [];
          });
        },

        /**
         * 📋 Duplicate Component
         */
        duplicateComponent: (id: string) => {
          const component = get().project.components.find(c => c.id === id);
          if (!component) return;
          
          const duplicated: Component = {
            ...component,
            id: uuidv4(),
            position: {
              x: component.position.x + 20,
              y: component.position.y + 20
            },
            metadata: {
              created: new Date(),
              modified: new Date(),
              version: 1,
              description: `Copy of ${component.type} component`
            }
          };
          
          get().addComponent(duplicated);
        },

        // =================================================================
        // POSITION AND SIZE MANAGEMENT
        // =================================================================

        /**
         * 🚚 Move Component with Snap-to-Grid
         */
        moveComponent: (id: string, position: ComponentPosition) => {
          set((state) => {
            const component = state.project.components.find(c => c.id === id);
            if (!component) return;
            
            const beforePosition = { ...component.position };
            
            // Apply snap-to-grid if enabled
            if (state.snapToGrid) {
              position = {
                x: Math.round(position.x / state.gridSize) * state.gridSize,
                y: Math.round(position.y / state.gridSize) * state.gridSize
              };
            }
            
            component.position = position;
            component.metadata.modified = new Date();
            
            // Add to history
            state.history.past.push({
              id: uuidv4(),
              type: 'move',
              timestamp: new Date(),
              componentIds: [id],
              beforeState: { position: beforePosition },
              afterState: { position },
              description: `Moved ${component.type} component`
            });
            
            state.history.future = [];
          });
        },

        /**
         * 🚚 Move Multiple Components (Bulk Operation)
         */
        moveMultipleComponents: (ids: string[], deltaPosition: ComponentPosition) => {
          set((state) => {
            const beforeStates: Record<string, ComponentPosition> = {};
            const afterStates: Record<string, ComponentPosition> = {};
            
            ids.forEach(id => {
              const component = state.project.components.find(c => c.id === id);
              if (!component) return;
              
              beforeStates[id] = { ...component.position };
              
              let newPosition = {
                x: component.position.x + deltaPosition.x,
                y: component.position.y + deltaPosition.y
              };
              
              // Apply snap-to-grid if enabled
              if (state.snapToGrid) {
                newPosition = {
                  x: Math.round(newPosition.x / state.gridSize) * state.gridSize,
                  y: Math.round(newPosition.y / state.gridSize) * state.gridSize
                };
              }
              
              component.position = newPosition;
              component.metadata.modified = new Date();
              afterStates[id] = newPosition;
            });
            
            // Add to history
            if (Object.keys(beforeStates).length > 0) {
              state.history.past.push({
                id: uuidv4(),
                type: 'bulk',
                timestamp: new Date(),
                componentIds: ids,
                beforeState: beforeStates,
                afterState: afterStates,
                description: `Moved ${ids.length} components`
              });
              
              state.history.future = [];
            }
          });
        },

        /**
         * 📏 Resize Component
         */
        resizeComponent: (id: string, size: ComponentSize) => {
          set((state) => {
            const component = state.project.components.find(c => c.id === id);
            if (!component) return;
            
            const beforeSize = { ...component.size };
            
            // Apply constraints if they exist
            if (component.constraints) {
              const { minWidth, minHeight, maxWidth, maxHeight } = component.constraints;
              
              if (minWidth && size.width < minWidth) size.width = minWidth;
              if (minHeight && size.height < minHeight) size.height = minHeight;
              if (maxWidth && size.width > maxWidth) size.width = maxWidth;
              if (maxHeight && size.height > maxHeight) size.height = maxHeight;
            }
            
            component.size = size;
            component.metadata.modified = new Date();
            
            // Add to history
            state.history.past.push({
              id: uuidv4(),
              type: 'resize',
              timestamp: new Date(),
              componentIds: [id],
              beforeState: { size: beforeSize },
              afterState: { size },
              description: `Resized ${component.type} component`
            });
            
            state.history.future = [];
          });
        },

        // =================================================================
        // SELECTION MANAGEMENT
        // =================================================================

        /**
         * 🎯 Select Single Component
         */
        selectComponent: (id: string | null) => {
          set((state) => {
            state.selection.selectedComponents = id ? [id] : [];
            state.selection.isMultiSelecting = false;
          });
        },

        /**
         * 🎯 Select Multiple Components
         */
        selectMultipleComponents: (ids: string[]) => {
          set((state) => {
            state.selection.selectedComponents = ids;
            state.selection.isMultiSelecting = ids.length > 1;
          });
        },

        /**
         * 🔀 Toggle Component Selection
         */
        toggleComponentSelection: (id: string) => {
          set((state) => {
            const index = state.selection.selectedComponents.indexOf(id);
            if (index > -1) {
              state.selection.selectedComponents.splice(index, 1);
            } else {
              state.selection.selectedComponents.push(id);
            }
            state.selection.isMultiSelecting = state.selection.selectedComponents.length > 1;
          });
        },

        /**
         * 🚫 Clear Selection
         */
        clearSelection: () => {
          set((state) => {
            state.selection.selectedComponents = [];
            state.selection.isMultiSelecting = false;
          });
        },

        /**
         * 🎯 Select All Components
         */
        selectAll: () => {
          set((state) => {
            state.selection.selectedComponents = state.project.components.map(c => c.id);
            state.selection.isMultiSelecting = true;
          });
        },

        // =================================================================
        // DRAG & DROP OPERATIONS
        // =================================================================

        /**
         * 🚀 Start Drag Operation
         */
        startDragOperation: (operation: DragOperation) => {
          set((state) => {
            state.dragOperation = {
              ...operation,
              id: operation.id || uuidv4()
            };
          });
        },

        /**
         * 🔄 Update Drag Operation
         */
        updateDragOperation: (updates: Partial<DragOperation>) => {
          set((state) => {
            if (state.dragOperation) {
              Object.assign(state.dragOperation, updates);
            }
          });
        },

        /**
         * 🏁 End Drag Operation
         */
        endDragOperation: () => {
          set((state) => {
            state.dragOperation = null;
            state.activeDropZone = null;
          });
        },

        // =================================================================
        // DROP ZONE MANAGEMENT
        // =================================================================

        /**
         * ➕ Add Drop Zone
         */
        addDropZone: (dropZone: DropZone) => {
          set((state) => {
            state.dropZones.push(dropZone);
          });
        },

        /**
         * 🗑️ Remove Drop Zone
         */
        removeDropZone: (id: string) => {
          set((state) => {
            const index = state.dropZones.findIndex(dz => dz.id === id);
            if (index > -1) {
              state.dropZones.splice(index, 1);
            }
          });
        },

        /**
         * 🎯 Set Active Drop Zone
         */
        setActiveDropZone: (id: string | null) => {
          set((state) => {
            state.activeDropZone = id;
          });
        },

        // =================================================================
        // CANVAS CONTROLS
        // =================================================================

        /**
         * 🛠️ Set Selected Tool
         */
        setSelectedTool: (tool: BuilderState['selectedTool']) => {
          set((state) => {
            state.selectedTool = tool;
            
            // Clear selection when switching to certain tools
            if (tool === 'ai-generate' || tool === 'text' || tool === 'image') {
              state.selection.selectedComponents = [];
              state.selection.isMultiSelecting = false;
            }
          });
        },

        /**
         * 🔍 Set Zoom Level
         */
        setZoom: (zoom: number) => {
          set((state) => {
            state.zoom = Math.max(25, Math.min(300, zoom));
          });
        },

        /**
         * 📐 Set Grid Size
         */
        setGridSize: (size: number) => {
          set((state) => {
            state.gridSize = Math.max(5, Math.min(100, size));
          });
        },

        /**
         * 🔲 Toggle Grid Visibility
         */
        toggleGrid: () => {
          set((state) => {
            state.showGrid = !state.showGrid;
          });
        },

        /**
         * 🧲 Toggle Snap to Grid
         */
        toggleSnapToGrid: () => {
          set((state) => {
            state.snapToGrid = !state.snapToGrid;
          });
        },

        /**
         * 📱 Set Device Preview
         */
        setDevice: (device: BuilderState['device']) => {
          set((state) => {
            state.device = device;
          });
        },

        /**
         * 👁️ Toggle Preview Mode
         */
        togglePreviewMode: () => {
          set((state) => {
            state.isPreviewMode = !state.isPreviewMode;
            
            // Clear selection in preview mode
            if (state.isPreviewMode) {
              state.selection.selectedComponents = [];
              state.selection.isMultiSelecting = false;
            }
          });
        },

        /**
         * 📏 Toggle Guides
         */
        toggleGuides: () => {
          set((state) => {
            state.showGuides = !state.showGuides;
          });
        },

        // =================================================================
        // HISTORY MANAGEMENT (50+ Actions as per Checklist)
        // =================================================================

        /**
         * ↶ Undo Last Action
         */
        undo: () => {
          set((state) => {
            if (state.history.past.length === 0) return;
            
            const lastAction = state.history.past.pop()!;
            
            // Move current state to future
            if (state.history.present) {
              state.history.future.unshift(state.history.present);
            }
            
            // Apply undo logic based on action type
            switch (lastAction.type) {
              case 'add':
                // Remove the component that was added
                const addIndex = state.project.components.findIndex(c => c.id === lastAction.componentIds[0]);
                if (addIndex > -1) {
                  state.project.components.splice(addIndex, 1);
                }
                break;
                
              case 'remove':
                // Re-add the component that was removed
                if (lastAction.beforeState) {
                  state.project.components.push(lastAction.beforeState as Component);
                }
                break;
                
              case 'move':
                // Restore previous position
                const moveComponent = state.project.components.find(c => c.id === lastAction.componentIds[0]);
                if (moveComponent && lastAction.beforeState) {
                  moveComponent.position = (lastAction.beforeState as any).position;
                }
                break;
                
              case 'update':
                // Restore previous state
                const updateComponent = state.project.components.find(c => c.id === lastAction.componentIds[0]);
                if (updateComponent && lastAction.beforeState) {
                  Object.assign(updateComponent, lastAction.beforeState);
                }
                break;
                
              case 'bulk':
                // Handle bulk operations
                if (lastAction.beforeState && Array.isArray(lastAction.beforeState)) {
                  // Restore removed components
                  lastAction.beforeState.forEach((component: Component) => {
                    state.project.components.push(component);
                  });
                }
                break;
            }
            
            state.history.present = lastAction;
            
            // Update performance metrics
            state.performanceMetrics.componentCount = state.project.components.length;
            state.performanceMetrics.lastUpdate = new Date();
          });
        },

        /**
         * ↷ Redo Last Undone Action
         */
        redo: () => {
          set((state) => {
            if (state.history.future.length === 0) return;
            
            const nextAction = state.history.future.shift()!;
            
            // Move current state to past
            if (state.history.present) {
              state.history.past.push(state.history.present);
            }
            
            // Apply redo logic (essentially re-execute the action)
            switch (nextAction.type) {
              case 'add':
                if (nextAction.afterState) {
                  state.project.components.push(nextAction.afterState as Component);
                }
                break;
                
              case 'remove':
                const removeIndex = state.project.components.findIndex(c => c.id === nextAction.componentIds[0]);
                if (removeIndex > -1) {
                  state.project.components.splice(removeIndex, 1);
                }
                break;
                
              case 'move':
                const moveComponent = state.project.components.find(c => c.id === nextAction.componentIds[0]);
                if (moveComponent && nextAction.afterState) {
                  moveComponent.position = (nextAction.afterState as any).position;
                }
                break;
                
              case 'update':
                const updateComponent = state.project.components.find(c => c.id === nextAction.componentIds[0]);
                if (updateComponent && nextAction.afterState) {
                  Object.assign(updateComponent, nextAction.afterState);
                }
                break;
            }
            
            state.history.present = nextAction;
            
            // Update performance metrics
            state.performanceMetrics.componentCount = state.project.components.length;
            state.performanceMetrics.lastUpdate = new Date();
          });
        },

        /**
         * 📝 Add Action to History
         */
        addToHistory: (action: Omit<HistoryAction, 'id' | 'timestamp'>) => {
          set((state) => {
            const historyAction: HistoryAction = {
              ...action,
              id: uuidv4(),
              timestamp: new Date()
            };
            
            state.history.past.push(historyAction);
            state.history.future = []; // Clear future when new action is added
            
            // Limit history size
            if (state.history.past.length > state.history.maxHistorySize) {
              state.history.past.shift();
            }
          });
        },

        /**
         * 🗑️ Clear History
         */
        clearHistory: () => {
          set((state) => {
            state.history.past = [];
            state.history.present = null;
            state.history.future = [];
          });
        },

        // =================================================================
        // BULK OPERATIONS (Copy, Paste, Delete, Group)
        // =================================================================

        /**
         * 📋 Copy Selected Components to Clipboard
         */
        copySelectedComponents: () => {
          const state = get();
          const selectedComponents = state.project.components.filter(
            c => state.selection.selectedComponents.includes(c.id)
          );
          
          if (selectedComponents.length > 0) {
            // Store in localStorage for now (in production, use proper clipboard API)
            localStorage.setItem('eternal-ui-clipboard', JSON.stringify(selectedComponents));
          }
        },

        /**
         * 📄 Paste Components from Clipboard
         */
        pasteComponents: (position?: ComponentPosition) => {
          const clipboardData = localStorage.getItem('eternal-ui-clipboard');
          if (!clipboardData) return;
          
          try {
            const components: Component[] = JSON.parse(clipboardData);
            const basePosition = position || { x: 20, y: 20 };
            
            const newComponents = components.map((comp, index) => ({
              ...comp,
              id: uuidv4(),
              position: {
                x: basePosition.x + (index * 20),
                y: basePosition.y + (index * 20)
              },
              metadata: {
                created: new Date(),
                modified: new Date(),
                version: 1,
                description: `Pasted ${comp.type} component`
              }
            }));
            
            // Add all components
            newComponents.forEach(comp => {
              get().addComponent(comp);
            });
            
            // Select the pasted components
            get().selectMultipleComponents(newComponents.map(c => c.id));
            
          } catch (error) {
            console.error('Failed to paste components:', error);
          }
        },

        /**
         * 🗑️ Delete Selected Components
         */
        deleteSelectedComponents: () => {
          const state = get();
          if (state.selection.selectedComponents.length > 0) {
            get().removeMultipleComponents(state.selection.selectedComponents);
          }
        },

        /**
         * 📦 Group Selected Components
         */
        groupSelectedComponents: () => {
          const state = get();
          const selectedComponents = state.project.components.filter(
            c => state.selection.selectedComponents.includes(c.id)
          );
          
          if (selectedComponents.length < 2) return;
          
          // Calculate bounding box
          const minX = Math.min(...selectedComponents.map(c => c.position.x));
          const minY = Math.min(...selectedComponents.map(c => c.position.y));
          const maxX = Math.max(...selectedComponents.map(c => c.position.x + c.size.width));
          const maxY = Math.max(...selectedComponents.map(c => c.position.y + c.size.height));
          
          // Create group container
          const groupComponent: Component = {
            id: uuidv4(),
            type: 'group',
            props: {
              name: `Group ${Date.now()}`
            },
            styles: {
              className: 'relative'
            },
            position: { x: minX, y: minY },
            size: { width: maxX - minX, height: maxY - minY },
            children: selectedComponents.map(comp => ({
              ...comp,
              position: {
                x: comp.position.x - minX,
                y: comp.position.y - minY
              }
            })),
            metadata: {
              created: new Date(),
              modified: new Date(),
              version: 1,
              description: 'Component group'
            },
            isDraggable: true,
            isDroppable: true
          };
          
          // Remove original components and add group
          get().removeMultipleComponents(state.selection.selectedComponents);
          get().addComponent(groupComponent);
          get().selectComponent(groupComponent.id);
        },

        /**
         * 📤 Ungroup Component
         */
        ungroupComponent: (id: string) => {
          const state = get();
          const groupComponent = state.project.components.find(c => c.id === id);
          
          if (!groupComponent || groupComponent.type !== 'group' || !groupComponent.children) {
            return;
          }
          
          // Extract children and position them in the canvas
          const extractedComponents = groupComponent.children.map(child => ({
            ...child,
            id: uuidv4(),
            position: {
              x: groupComponent.position.x + child.position.x,
              y: groupComponent.position.y + child.position.y
            },
            metadata: {
              created: new Date(),
              modified: new Date(),
              version: 1,
              description: `Ungrouped ${child.type} component`
            }
          }));
          
          // Remove group and add extracted components
          get().removeComponent(id);
          extractedComponents.forEach(comp => {
            get().addComponent(comp);
          });
          
          // Select the extracted components
          get().selectMultipleComponents(extractedComponents.map(c => c.id));
        },

        /**
         * 📋 Duplicate Multiple Components
         */
        duplicateMultipleComponents: (ids: string[]) => {
          const state = get();
          const components = state.project.components.filter(c => ids.includes(c.id));
          
          const duplicatedComponents = components.map(comp => ({
            ...comp,
            id: uuidv4(),
            position: {
              x: comp.position.x + 20,
              y: comp.position.y + 20
            },
            metadata: {
              created: new Date(),
              modified: new Date(),
              version: 1,
              description: `Copy of ${comp.type} component`
            }
          }));
          
          duplicatedComponents.forEach(comp => {
            get().addComponent(comp);
          });
          
          // Select the duplicated components
          get().selectMultipleComponents(duplicatedComponents.map(c => c.id));
        },

        // =================================================================
        // PROJECT MANAGEMENT
        // =================================================================

        /**
         * ✏️ Update Project Name
         */
        updateProjectName: (name: string) => {
          set((state) => {
            state.project.name = name;
          });
        },

        /**
         * 💾 Save Project
         */
        saveProject: async () => {
          const state = get();
          try {
            // In production, save to backend API
            localStorage.setItem(`eternal-ui-project-${state.project.id}`, JSON.stringify(state.project));
            console.log('Project saved successfully');
          } catch (error) {
            console.error('Failed to save project:', error);
            throw error;
          }
        },

        /**
         * 📂 Load Project
         */
        loadProject: async (projectId: string) => {
          try {
            // In production, load from backend API
            const savedProject = localStorage.getItem(`eternal-ui-project-${projectId}`);
            if (savedProject) {
              const project = JSON.parse(savedProject);
              set((state) => {
                state.project = project;
                state.selection.selectedComponents = [];
                state.selection.isMultiSelecting = false;
                state.performanceMetrics.componentCount = project.components.length;
                state.performanceMetrics.lastUpdate = new Date();
              });
            }
          } catch (error) {
            console.error('Failed to load project:', error);
            throw error;
          }
        },

        /**
         * 📤 Export Project
         */
        exportProject: async (format: 'json' | 'react' | 'vue' | 'angular') => {
          const state = get();
          
          switch (format) {
            case 'json':
              return JSON.stringify(state.project, null, 2);
              
            case 'react':
              // This will be implemented with the CodeGenerator
              return '// React export will be implemented with CodeGenerator';
              
            case 'vue':
              return '// Vue export will be implemented with CodeGenerator';
              
            case 'angular':
              return '// Angular export will be implemented with CodeGenerator';
              
            default:
              throw new Error(`Unsupported export format: ${format}`);
          }
        }
      })),
      {
        name: 'eternal-ui-builder-store',
        partialize: (state) => ({
          project: state.project,
          zoom: state.zoom,
          gridSize: state.gridSize,
          showGrid: state.showGrid,
          snapToGrid: state.snapToGrid,
          device: state.device
        })
      }
    )
  )
);
