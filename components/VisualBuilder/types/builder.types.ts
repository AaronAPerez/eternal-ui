import { CanvasElement } from "./canvas.types";

export interface BuilderState {
  elements: Map<string, CanvasElement>;
  selectedElements: Set<string>;
  hoveredElement?: string;
  draggedElement?: string;
  clipboard: CanvasElement[];
  history: HistoryState;
  viewport: ViewportState;
  device: DeviceType;
  mode: BuilderMode;
  grid: GridState;
  layers: LayersState;
}

export interface HistoryState {
  past: Map<string, CanvasElement>[];
  present: Map<string, CanvasElement>;
  future: Map<string, CanvasElement>[];
}

export interface ViewportState {
  zoom: number;
  panX: number;
  panY: number;
}

export type DeviceType = 'desktop' | 'tablet' | 'mobile';
export type BuilderMode = 'select' | 'pan' | 'text' | 'draw' | 'preview';

export interface GridState {
  enabled: boolean;
  size: number;
  snap: boolean;
}

export interface LayersState {
  showPanel: boolean;
  expandedGroups: Set<string>;
}