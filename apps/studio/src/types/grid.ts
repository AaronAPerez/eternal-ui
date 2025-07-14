export interface GridConfig {
  visible: boolean;
  snapEnabled: boolean;
  columns: number;
  rows: number;
  cellSize: number;
  gap: number;
  opacity: number;
  color: string;
  style: 'lines' | 'dots' | 'solid';
}

export interface CanvasComponent {
  id: string;
  type: string;
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  styles: Record<string, string>;
  isMinimized?: boolean;
  isLocked?: boolean;
  isHidden?: boolean;
  zIndex?: number;
  sectionId?: string;
}

export interface WebPageSection {
  id: string;
  name: string;
  type: 'header' | 'navigation' | 'hero' | 'content' | 'sidebar' | 'footer';
  height: number;
  backgroundColor: string;
  order: number;
  visible: boolean;
  required: boolean;
}

export interface ViewportSize {
  width: number;
  height: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ComponentTemplate {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  tags: string[];
  preview: string;
  defaultSize: { width: number; height: number };
  defaultContent: string;
  defaultStyles: Record<string, string>;
  isTemplate?: boolean;
}

export interface GridSection {
  id: string;
  name: string;
  startCol: number;
  endCol: number;
  startRow: number;
  endRow: number;
  color: string;
  visible: boolean;
}