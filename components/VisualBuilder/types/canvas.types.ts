export interface CanvasElement {
  id: string;
  type: string;
  name: string;
  component: string;
  props: Record<string, any>;
  style: CanvasElementStyle;
  children: string[];
  parent?: string;
  locked: boolean;
  visible: boolean;
  metadata: ElementMetadata;
}

export interface CanvasElementStyle {
  position?: 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: number | string;
  left?: number | string;
  width?: number | string;
  height?: number | string;
  zIndex?: number;
  transform?: string;
  margin?: string;
  padding?: string;
  backgroundColor?: string;
  color?: string;
  borderRadius?: string;
  border?: string;
  boxShadow?: string;
  opacity?: number;
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  [key: string]: any;
}

export interface ElementMetadata {
  createdAt: string;
  updatedAt: string;
  version: number;
  componentLibraryId?: string;
  aiGenerated?: boolean;
  accessibilityScore?: number;
  performanceScore?: number;
}