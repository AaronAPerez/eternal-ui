export interface Component {
  isDraggable: any;
  id: string;
  type: 'text' | 'heading' | 'image' | 'button' | 'container' | 'hero' | 'navigation' | 'footer' | 'logo' | 'group';
  props: Record<string, any>;
  styles: React.CSSProperties;
  children?: Component[];
  position: { x: number; y: number };
  size: { width: number; height: number };
  locked?: boolean;
}

export interface Project {
  id: string;
  name: string;
  components: Component[];
  styles: {
    colors: string[];
    fonts: string[];
    spacing: number[];
  };
}

export interface HistoryState {
  components: Component[];
  selectedComponent: string | null;
  timestamp: number;
  action: string;
}