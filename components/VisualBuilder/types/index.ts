export interface AccessibilityAuditResult {
  score: number;
  issues: string[];
  suggestions: string[];
}

export interface PerformanceOptimizationResult {
  score: number;
  improvements: string[];
}

export * from './canvas.types';
export * from './component.types';
export * from './builder.types';
