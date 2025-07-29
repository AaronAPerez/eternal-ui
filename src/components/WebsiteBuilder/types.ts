// src/components/WebsiteBuilder/types.ts
export interface Component {
  id: string;
  type: 'text' | 'image' | 'button' | 'container' | 'hero' | 'card' | 'form' | 'group' | 'auto-layout';
  props: Record<string, any>;
  styles: React.CSSProperties;
  children?: Component[];
  position: { x: number; y: number };
  size: { width: number; height: number };
  grouped?: boolean;
  groupId?: string;
  autoLayout?: {
    direction: 'horizontal' | 'vertical';
    spacing: number;
    padding: number;
    align: 'start' | 'center' | 'end';
    justify: 'start' | 'center' | 'end' | 'space-between';
  };
}

export interface HistoryState {
  components: Component[];
  selectedComponent: string | null;
  timestamp: number;
  action: string;
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
  history: HistoryState[];
  historyIndex: number;
}

export interface Template {
  id: string;
  name: string;
  preview: string;
  description: string;
  components: Component[];
}

export interface TemplateCategory {
  name: string;
  templates: Template[];
}