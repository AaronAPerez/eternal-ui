
export interface EnhancedComponentRequest {
  description: string;
  framework: 'react' | 'vue' | 'angular' | 'svelte';
  styling: 'tailwind' | 'styled-components' | 'css-modules';
  complexity: 'simple' | 'intermediate' | 'complex';
  accessibility: boolean;
  responsive: boolean;
  animations?: boolean;
  testing?: boolean;
}

export interface GeneratedComponent {
  id: string;
  name: string;
  code: string;
  preview: ComponentPreview;
  performance: PerformanceReport;
  accessibility: AccessibilityReport;
}



//  interfaces for better type safety
export interface ComponentRequest {
  description: string;
  framework: 'react' | 'vue' | 'angular' | 'svelte';
  styling: 'tailwind' | 'styled-components' | 'css-modules' | 'emotion';
  complexity: 'simple' | 'intermediate' | 'complex';
  accessibility: boolean;
  responsive: boolean;
  animations?: boolean;
  testing?: boolean;
  brandGuidelines?: BrandGuidelines;
  performance?: PerformanceOptions;
}

export interface BrandGuidelines {
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
    neutral: string[];
  };
  typography: {
    fontFamily: string;
    headingScale: string;
    bodySize: string;
  };
  spacing: {
    scale: string;
    rhythm: string;
  };
  borderRadius: string;
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
  brandVoice: string;
}

export interface PerformanceOptions {
  lazyLoad: boolean;
  codesplitting: boolean;
  memoryOptimization: boolean;
  bundleSize: 'minimal' | 'standard' | 'feature-rich';
}

export interface GeneratedComponent {
  id: string;
  name: string;
  code: string;
  types: string;
  tests?: string;
  storybook?: string;
  documentation: string;
  preview: ComponentPreview;
  performance: PerformanceReport;
  accessibility: AccessibilityReport;
  brandCompliance: BrandComplianceReport;
}

export interface ComponentPreview {
  html: string;
  css: string;
  js: string;
  responsive: ResponsivePreview[];
}

export interface ResponsivePreview {
  breakpoint: string;
  width: number;
  preview: string;
}

export interface BrandComplianceReport {
  score: number;
  issues: string[];
  suggestions: string[];
  compliance: {
    colors: boolean;
    typography: boolean;
    spacing: boolean;
    accessibility: boolean;
  }
}

  export interface PerformanceReport {
  score: number;
  metrics: {
    bundleSize: string;
    renderTime: string;
    memoryUsage: string;
    loadTime: string;
  };
  optimizations: string[];
  recommendations: string[];
}

export interface AccessibilityReport {
  score: number;
  issues: string[];
  suggestions: string[];
  compliance: {
    wcag_a: boolean;
    wcag_aa: boolean;
    wcag_aaa: boolean;
    keyboard_navigation: boolean;
    screen_reader: boolean;
    color_contrast: boolean;
  };
}