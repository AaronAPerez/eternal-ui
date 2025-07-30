import { duplicateComponent } from "@/components/WebsiteBuilder/utils/componentHelpers";
import { BuilderState } from "@/stores/builderStore";
import { Project } from "@/types";
import { create } from "zustand";
import React from "react";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// Default project to start with
const defaultProject: Project = {
  id: "1",
  name: "My Website",
  components: [
    {
      id: "hero-1",
      type: "hero",
      props: {
        title: "Welcome to the Future",
        subtitle: "Build amazing websites",
        ctaText: "Get Started",
      },
      styles: {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "80px 20px",
        textAlign: "center",
      },
      position: { x: 0, y: 0 },
      size: { width: 1200, height: 400 },
    },
  ],
  styles: {
    colors: ["#667eea", "#764ba2", "#f093fb", "#f5576c", "#4ecdc4", "#45b7d1"],
    fonts: ["Inter", "Playfair Display", "Source Sans Pro", "Roboto"],
    spacing: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96],
  },
};
// Creating the store with middleware
export const useBuilderStore = create<BuilderState>()(
  // WHY THESE MIDDLEWARES?
  devtools(
    // Adds Redux DevTools support for debugging
    subscribeWithSelector(
      // Allows subscribing to specific state changes
      immer(
        // Makes immutable updates easier (like Redux Toolkit)
        (set, get) => ({
          // INITIAL STATE
          project: defaultProject,
          selectedTool: "select",
          selectedComponent: null,
          selectedComponents: [],
          device: "desktop",
          zoom: 100,
          showGrid: true,
          gridSize: 20,
          isPreviewMode: false,

          // ACTIONS IMPLEMENTATION

          // Simple state updates
          setSelectedTool: (tool) => set({ selectedTool: tool }),
          setZoom: (zoom) => set({ zoom: Math.max(25, Math.min(300, zoom)) }),
          toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
          setDevice: (device) => set({ device }),
          setGridSize: (size) => set({ gridSize: size }),
          togglePreviewMode: () =>
            set((state) => ({ isPreviewMode: !state.isPreviewMode })),
          updateProjectName: (name) =>
            set((state) => {
              state.project.name = name; // Immer makes this mutation safe
            }),

          // Component selection logic
          selectComponent: (id) =>
            set({
              selectedComponent: id,
              selectedComponents: [], // Clear multi-select when selecting single
            }),

          selectMultipleComponents: (ids) =>
            set({
              selectedComponents: ids,
              selectedComponent: null, // Clear single select when multi-selecting
            }),

          // Toggle selection for multi-select (Ctrl+Click behavior)
          toggleComponentSelection: (id) =>
            set((state) => {
              const currentSelected = state.selectedComponents;
              if (currentSelected.includes(id)) {
                state.selectedComponents = currentSelected.filter(
                  (cId) => cId !== id
                );
              } else {
                state.selectedComponents = [...currentSelected, id];
              }
              state.selectedComponent = null; // Always clear single selection
            }),

          // Complex component operations using Immer
          updateComponent: (id, updates) =>
            set((state) => {
              const component = state.project.components.find(
                (c) => c.id === id
              );
              if (component) {
                Object.assign(component, updates); // Immer makes this safe
              }
            }),

          addComponent: (component) =>
            set((state) => {
              state.project.components.push(component);
            }),

          deleteComponent: (id) =>
            set((state) => {
              state.project.components = state.project.components.filter(
                (c) => c.id !== id
              );
              // Clean up selection
              if (state.selectedComponent === id) {
                state.selectedComponent = null;
              }
              state.selectedComponents = state.selectedComponents.filter(
                (cId) => cId !== id
              );
            }),

          deleteMultipleComponents: (ids) =>
            set((state) => {
              state.project.components = state.project.components.filter(
                (c) => !ids.includes(c.id)
              );
              // Clean up selections
              state.selectedComponent = null;
              state.selectedComponents = [];
            }),
          duplicateComponent: (id) =>
            set((state) => {
              const component = state.project.components.find(
                (c) => c.id === id
              );
              if (!component) return state;

              const duplicated = duplicateComponent(component);
              return {
                project: {
                  ...state.project,
                  components: [...state.project.components, duplicated],
                },
                selectedComponent: duplicated.id,
              };
            }),

          moveComponent: (id, position) =>
            set((state) => ({
              project: {
                ...state.project,
                components: state.project.components.map((comp) =>
                  comp.id === id ? { ...comp, position } : comp
                ),
              },
            })),

          resizeComponent: (id, size) =>
            set((state) => ({
              project: {
                ...state.project,
                components: state.project.components.map((comp) =>
                  comp.id === id ? { ...comp, size } : comp
                ),
              },
            })),
        })
      )
    )
  )
);
