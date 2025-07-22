export interface ComponentDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<unknown>;
  tags: string[];
  complexity: 'basic' | 'intermediate' | 'advanced';
  popularity: number;
  isPremium: boolean;
  defaultProps: Record<string, unknown>;
  defaultStyle: Record<string, unknown>;
  propSchema: Record<string, PropSchemaItem>;
  accessibility: AccessibilityInfo;
  performance: PerformanceInfo;
  frameworks: string[];
  features: string[];
  previewComponent: React.ComponentType<unknown>;
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

export interface AccessibilityInfo {
  wcagLevel: 'A' | 'AA' | 'AAA';
  screenReader: boolean;
  keyboardNav: boolean;
}

export interface PerformanceInfo {
  bundleSize: number;
  renderScore: number;
  memoryImpact?: 'low' | 'medium' | 'high';
  lazyLoading?: boolean;
  treeShaking?: boolean;
}