import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface UIState {
  // Panels and modals
  showTemplateLibrary: boolean;
  showDesignGuide: boolean;
  showRulers: boolean;
  selectedStylePanel: 'design' | 'layout' | 'text' | 'effects';
  
  // Drag and drop state
  isDragging: boolean;
  draggedComponent: string | null;
  isResizing: boolean;
  
  // Selection state
  isSelecting: boolean;
  selectionBox: {
    start: { x: number; y: number };
    end: { x: number; y: number };
  } | null;
  
  // Performance metrics (changes frequently)
  performanceMetrics: {
    renderTime: number;
    memoryUsage: number;
    domNodes: number;
    fps: number;
  };
  
  // Touch gestures and snap guides
  touchGestures: Array<any>;
  showSnapGuides: boolean;
  snapGuides: { x: number[]; y: number[] };
  
  // Actions
  toggleTemplateLibrary: () => void;
  toggleDesignGuide: () => void;
  toggleRulers: () => void;
  setStylePanel: (panel: UIState['selectedStylePanel']) => void;
  setDragState: (isDragging: boolean, componentId?: string) => void;
  setResizeState: (isResizing: boolean) => void;
  setSelectionBox: (box: UIState['selectionBox']) => void;
  updatePerformanceMetrics: (metrics: Partial<UIState['performanceMetrics']>) => void;
  setTouchGestures: (gestures: Array<any>) => void;
  addTouchGesture: (gesture: any) => void;
  setSnapGuides: (guides: { x: number[]; y: number[] }) => void;
  setShowSnapGuides: (show: boolean) => void;
}


export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      // Initial state
      showTemplateLibrary: false,
      showDesignGuide: false,
      showRulers: false,
      selectedStylePanel: 'design',
      isDragging: false,
      draggedComponent: null,
      isResizing: false,
      isSelecting: false,
      selectionBox: null,
      touchGestures: [],
      showSnapGuides: false,
      snapGuides: { x: [], y: [] },
      performanceMetrics: {
        renderTime: 0,
        memoryUsage: 0,
        domNodes: 0,
        fps: 60
      },

      // Actions
      toggleTemplateLibrary: () => set((state) => ({ 
        showTemplateLibrary: !state.showTemplateLibrary 
      })),
      
      toggleDesignGuide: () => set((state) => ({ 
        showDesignGuide: !state.showDesignGuide 
      })),
      
      toggleRulers: () => set((state) => ({ 
        showRulers: !state.showRulers 
      })),
      
      setStylePanel: (panel) => set({ selectedStylePanel: panel }),
      
      setDragState: (isDragging, componentId) => set({ 
        isDragging, 
        draggedComponent: componentId || null 
      }),
      
      setResizeState: (isResizing) => set({ isResizing }),
      
      setSelectionBox: (box) => set({ selectionBox: box }),
      
      updatePerformanceMetrics: (metrics) => set((state) => ({
        performanceMetrics: { ...state.performanceMetrics, ...metrics }
      })),

      setTouchGestures: (gestures) => set({ touchGestures: gestures }),
  
      addTouchGesture: (gesture) => set((state) => ({
       touchGestures: [...state.touchGestures.slice(-9), gesture] // Keep last 10 gestures
      })),
  
      setSnapGuides: (guides) => set({ snapGuides: guides }),
      setShowSnapGuides: (show) => set({ showSnapGuides: show })
    })
  )
);
