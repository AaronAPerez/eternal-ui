// =================================================================
// TYPES AND INTERFACES
// =================================================================

export interface ComponentMeta {
  id: string;
  name: string;
  description: string;
  category: 'layout' | 'navigation' | 'content' | 'forms' | 'data' | 'interactive' | 'ecommerce' | 'marketing' | 'social' | 'media';
  tags: string[];
  complexity: 'beginner' | 'intermediate' | 'advanced';
  popularity: number;
  isPremium: boolean;
  propsSchema: Record<string, PropSchema>;
  defaultProps: Record<string, any>;
  codeExample: string;
  bundleSize: number;
  renderScore: number;
  wcagLevel: 'A' | 'AA' | 'AAA';
  rating: number;
  downloadCount: number;
  lastUpdated: string;
  component: React.ComponentType<any>;
}

export interface PropSchema {
  type: 'string' | 'number' | 'boolean' | 'color' | 'select' | 'slider' | 'textarea' | 'image';
  label: string;
  description?: string;
  default?: any;
  options?: Array<{ label: string; value: any }>;
  min?: number;
  max?: number;
}

export interface PageSection {
  id: string;
  componentId: string;
  props: Record<string, any>;
  styles: {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
    boxShadow?: string;
  };
  order: number;
}

export interface SelectedElement {
  id: string;
  type: 'text' | 'component' | 'background';
  elementRef: HTMLElement | null;
}