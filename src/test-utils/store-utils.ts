import { act } from '@testing-library/react';
import { useBuilderStore } from '@/stores/builderStore';
import { useHistoryStore } from '@/stores/historyStore';
import { useUIStore } from '@/stores/uiStore';
import { Component } from '@/types';

// Reset all stores before each test
export const resetStores = () => {
  act(() => {
    // Reset builder store to initial state
    useBuilderStore.setState({
      project: {
        id: '1',
        name: 'Test Project',
        components: [],
        styles: {
          colors: ['#667eea', '#764ba2'],
          fonts: ['Inter'],
          spacing: [8, 16, 24]
        },
        history: [],
        historyIndex: 0
      },
      selectedTool: 'select',
      selectedComponent: null,
      selectedComponents: [],
      device: 'desktop',
      zoom: 100,
      showGrid: true,
      gridSize: 20,
      isPreviewMode: false,
    });

    // Reset history store
    useHistoryStore.setState({
      history: [],
      historyIndex: -1,
    });

    // Reset UI store
    useUIStore.setState({
      showTemplateLibrary: false,
      showDesignGuide: false,
      showRulers: false,
      selectedStylePanel: 'design',
      isDragging: false,
      draggedComponent: null,
      isResizing: false,
      isSelecting: false,
      selectionBox: null,
      performanceMetrics: {
        renderTime: 0,
        memoryUsage: 0,
        domNodes: 0
      }
    });
  });
};

// Create test component helper
export const createTestComponent = (overrides: Partial<Component> = {}): Component => ({
  id: 'test-1',
  type: 'text',
  props: { content: 'Test content' },
  styles: { fontSize: '16px', color: '#000' },
  position: { x: 100, y: 100 },
  size: { width: 200, height: 50 },
  ...overrides
});

// Helper to get store state
export const getStoreState = () => ({
  builder: useBuilderStore.getState(),
  history: useHistoryStore.getState(),
  ui: useUIStore.getState(),
});
