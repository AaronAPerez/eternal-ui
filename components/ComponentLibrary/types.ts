
export interface ComponentDefinition {
  id: string;
  type: string;
  name: string;
  description?: string;
  category?: string;
  icon?: React.ComponentType<any>;
  tags?: string[];
  complexity?: 'basic' | 'intermediate' | 'advanced';
  popularity?: number;
  isPremium?: boolean;
  props?: Record<string, any>;
  defaultProps?: Record<string, any>;
  style?: Record<string, any>;
  defaultStyle?: Record<string, any>;
  propSchema?: Record<string, PropSchemaItem>;
  accessibility?: {
    wcagLevel: 'A' | 'AA' | 'AAA';
    screenReader: boolean;
    keyboardNav: boolean;
  };
  performance?: {
    bundleSize: number;
    renderScore: number;
  };
  frameworks?: string[];
  features?: string[];
  previewComponent?: React.ComponentType<any>;
}

export interface PropSchemaItem {
  type: 'text' | 'textarea' | 'select' | 'boolean' | 'color' | 'number' | 'image' | 'spacing';
  options?: string[] | number[];
  placeholder?: string;
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
  description?: string;
}

export interface DraggableComponentProps {
  component: ComponentDefinition;
  onComponentSelect?: (component: ComponentDefinition) => void;
  className?: string;
}