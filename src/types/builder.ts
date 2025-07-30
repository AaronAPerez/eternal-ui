import { Project } from "@/components/WebsiteBuilder/types";

/**
 * 🎯 CORE COMPONENT INTERFACE
 * 
 * Enhanced from existing component type to support advanced drag & drop
 */
export interface ComponentPosition {
  x: number;
  y: number;
}

export interface ComponentSize {
  width: number;
  height: number;
}

export interface ComponentMetadata {
  created: Date;
  modified: Date;
  version: number;
  author?: string;
  description?: string;
}

/**
 * 🔄 DRAG OPERATION TRACKING
 * 
 * Tracks active drag operations for better UX
 */
export interface DragOperation {
  id: string;
  type: 'move' | 'resize' | 'create' | 'copy';
  startPosition: ComponentPosition;
  currentPosition: ComponentPosition;
  targetDropZone?: string;
  isMultiSelect?: boolean;
  ghostElement?: HTMLElement;
}

/**
 * 📦 ENHANCED COMPONENT INTERFACE
 * 
 * Extends existing Component with drag & drop capabilities
 */
export interface Component {
  id: string;
  type: string;
  props: Record<string, any>;
  styles: Record<string, any>;
  position: ComponentPosition;
  size: ComponentSize;
  children?: Component[];
  metadata: ComponentMetadata;
  
  // Drag & Drop specific properties
  isDraggable?: boolean;
  isDroppable?: boolean;
  dropZones?: string[];
  constraints?: {
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    aspectRatio?: number;
  };
}

/**
 * 🎨 DROP ZONE CONFIGURATION
 * 
 * Defines valid drop zones and their behavior
 */
export interface DropZone {
  id: string;
  name: string;
  accepts: string[]; // Component types that can be dropped
  maxComponents?: number;
  className?: string;
  highlightClassName?: string;
  position: ComponentPosition;
  size: ComponentSize;
}

/**
 * 📋 SELECTION STATE
 * 
 * Manages component selection for bulk operations
 */
export interface SelectionState {
  selectedComponents: string[];
  selectionBox?: {
    start: ComponentPosition;
    end: ComponentPosition;
  };
  isMultiSelecting: boolean;
}

/**
 * 📚 HISTORY STATE
 * 
 * Undo/Redo functionality (50+ actions as per checklist)
 */
export interface HistoryAction {
  id: string;
  type: 'add' | 'remove' | 'move' | 'resize' | 'update' | 'bulk';
  timestamp: Date;
  componentIds: string[];
  beforeState: any;
  afterState: any;
  description: string;
}

export interface HistoryState {
  past: HistoryAction[];
  present: HistoryAction | null;
  future: HistoryAction[];
  maxHistorySize: number;
}

/**
 * 🏗️ ENHANCED BUILDER STATE
 * 
 * Complete state management for the website builder
 */
export interface BuilderState {
  deleteMultipleComponents: any;
  deleteComponent: any;
  selectedComponent: any;
  selectedComponents: any;
  // Project data
  project: Project;
  
  // Tool selection
  selectedTool: 'select' | 'text' | 'container' | 'image' | 'button' | 'ai-generate';
  
  // Component selection and drag state
  selection: SelectionState;
  dragOperation: DragOperation | null;
  
  // Viewport and canvas settings
  device: 'mobile' | 'tablet' | 'desktop' | 'wide';
  zoom: number;
  showGrid: boolean;
  gridSize: number;
  snapToGrid: boolean;
  
  // UI state
  isPreviewMode: boolean;
  showGuides: boolean;
  showRulers: boolean;
  
  // Drop zones
  dropZones: DropZone[];
  activeDropZone: string | null;
  
  // History management
  history: HistoryState;
  
  // Performance metrics
  performanceMetrics: {
    componentCount: number;
    renderTime: number;
    lastUpdate: Date;
  };
  
  // ACTIONS - Functions that modify state
  // Component management
  addComponent: (component: Component, dropZoneId?: string) => void;
  removeComponent: (id: string) => void;
  removeMultipleComponents: (ids: string[]) => void;
  updateComponent: (id: string, updates: Partial<Component>) => void;
  duplicateComponent: (id: string) => void;
  duplicateMultipleComponents: (ids: string[]) => void;
  
  // Position and size management
  moveComponent: (id: string, position: ComponentPosition) => void;
  moveMultipleComponents: (ids: string[], deltaPosition: ComponentPosition) => void;
  resizeComponent: (id: string, size: ComponentSize) => void;
  
  // Selection management
  selectComponent: (id: string | null) => void;
  selectMultipleComponents: (ids: string[]) => void;
  toggleComponentSelection: (id: string) => void;
  clearSelection: () => void;
  selectAll: () => void;
  
  // Drag & Drop operations
  startDragOperation: (operation: DragOperation) => void;
  updateDragOperation: (updates: Partial<DragOperation>) => void;
  endDragOperation: () => void;
  
  // Drop zone management
  addDropZone: (dropZone: DropZone) => void;
  removeDropZone: (id: string) => void;
  setActiveDropZone: (id: string | null) => void;
  
  // Canvas controls
  setSelectedTool: (tool: BuilderState['selectedTool']) => void;
  setZoom: (zoom: number) => void;
  setGridSize: (size: number) => void;
  toggleGrid: () => void;
  toggleSnapToGrid: () => void;
  setDevice: (device: BuilderState['device']) => void;
  togglePreviewMode: () => void;
  toggleGuides: () => void;
  
  // History management
  undo: () => void;
  redo: () => void;
  addToHistory: (action: Omit<HistoryAction, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  
  // Bulk operations
  copySelectedComponents: () => void;
  pasteComponents: (position?: ComponentPosition) => void;
  deleteSelectedComponents: () => void;
  groupSelectedComponents: () => void;
  ungroupComponent: (id: string) => void;
  
  // Project management
  updateProjectName: (name: string) => void;
  saveProject: () => Promise<void>;
  loadProject: (projectId: string) => Promise<void>;
  exportProject: (format: 'json' | 'react' | 'vue' | 'angular') => Promise<string>;
}

/**
 * 🎪 KEYBOARD SHORTCUTS
 * 
 * Keyboard shortcuts for power users
 */
export interface KeyboardShortcuts {
  'ctrl+z': () => void; // Undo
  'ctrl+y': () => void; // Redo
  'ctrl+c': () => void; // Copy
  'ctrl+v': () => void; // Paste
  'ctrl+x': () => void; // Cut
  'ctrl+a': () => void; // Select all
  'delete': () => void; // Delete selected
  'ctrl+d': () => void; // Duplicate
  'ctrl+g': () => void; // Group
  'ctrl+shift+g': () => void; // Ungroup
  'escape': () => void; // Clear selection
  'arrow-keys': (direction: 'up' | 'down' | 'left' | 'right') => void; // Move components
}

/**
 * 🎨 CANVAS SETTINGS
 * 
 * Canvas-specific configuration
 */
export interface CanvasSettings {
  backgroundColor: string;
  showGrid: boolean;
  gridSize: number;
  gridColor: string;
  snapThreshold: number;
  zoomLevels: number[];
  minZoom: number;
  maxZoom: number;
  rulers: {
    show: boolean;
    color: string;
    majorTicks: number;
    minorTicks: number;
  };
  guides: {
    show: boolean;
    color: string;
    snapDistance: number;
  };
}

/**
 * 🏷️ COMPONENT LIBRARY ITEM
 * 
 * Items in the component library panel
 */
export interface ComponentLibraryItem {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  preview: string;
  template: Omit<Component, 'id' | 'position' | 'metadata'>;
  tags: string[];
  isPremium?: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

/**
 * 📊 PERFORMANCE METRICS
 * 
 * Real-time performance tracking
 */
export interface PerformanceMetrics {
  componentCount: number;
  renderTime: number;
  memoryUsage: number;
  bundleSize: number;
  lighthouseScore: number;
  loadTime: number;
  interactionLatency: number;
  lastMeasurement: Date;
}

/**
 * 🤝 COLLABORATION TYPES
 * 
 * Real-time collaboration support
 */
export interface CollaborationUser {
  id: string;
  name: string;
  avatar: string;
  color: string;
  cursor: ComponentPosition;
  selection: string[];
  lastSeen: Date;
}

export interface CollaborationEvent {
  id: string;
  type: 'component_update' | 'selection_change' | 'cursor_move' | 'user_join' | 'user_leave';
  userId: string;
  timestamp: Date;
  data: any;
}

export interface CollaborationState {
  users: CollaborationUser[];
  events: CollaborationEvent[];
  isConnected: boolean;
  roomId: string;
  conflicts: string[]; // Component IDs with conflicts
}