import { createContext } from 'react';
import { BuilderMode, BuilderState, CanvasElement, DeviceType, ViewportState } from '../types';

export interface CanvasContextType {
  state: BuilderState;
  actions: CanvasActions;
}

export interface CanvasActions {
  addElement: (element: Omit<CanvasElement, 'id' | 'metadata'>) => string;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string, multi?: boolean) => void;
  clearSelection: () => void;
  duplicateElement: (id: string) => string;
  moveElement: (id: string, newParent?: string, index?: number) => void;
  undo: () => void;
  redo: () => void;
  setViewport: (viewport: Partial<ViewportState>) => void;
  setDevice: (device: DeviceType) => void;
  setMode: (mode: BuilderMode) => void;
  toggleGrid: () => void;
  toggleElementVisibility: (id: string) => void;
  toggleElementLock: (id: string) => void;
  exportCode: (format: 'react' | 'vue' | 'angular' | 'html') => Promise<string>;
  generateAIComponent: (prompt: string) => Promise<string>;
  runAccessibilityAudit: () => Promise<AccessibilityAuditResult>;
  optimizePerformance: () => Promise<PerformanceOptimizationResult>;
}

// Add proper return types instead of any
export interface AccessibilityAuditResult {
  score: number;
  issues: string[];
  suggestions: string[];
}

export interface PerformanceOptimizationResult {
  score: number;
  improvements: string[];
}

export const CanvasContext = createContext<CanvasContextType | null>(null);
