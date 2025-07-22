// =================================================================
// FEATURE FLAG SYSTEM - PHASE 5
// =================================================================

import { FeatureFlagAnalytics } from "@/components/FeatureFlagAnalytics";

// =================================================================
// FEATURE FLAG CONFIGURATION
// =================================================================

export interface FeatureFlag {
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage?: number;
  userSegments?: string[];
  environments?: ('development' | 'staging' | 'production')[];
  startDate?: Date;
  endDate?: Date;
  dependencies?: string[];
  metrics?: {
    conversionGoal?: string;
    successMetric?: string;
  };
}

export interface FeatureFlagContext {
  userId?: string;
  userSegment?: string;
  environment: 'development' | 'staging' | 'production';
  version?: string;
  beta?: boolean;
}

// =================================================================
// FEATURE FLAGS CONFIGURATION
// =================================================================

export const FEATURE_FLAGS: Record<string, FeatureFlag> = {
  // Phase 1: Enhanced Component Registry
  ENHANCED_COMPONENT_REGISTRY: {
    key: 'ENHANCED_COMPONENT_REGISTRY',
    name: 'Enhanced Component Registry',
    description: 'Enable 120+ component library with advanced metadata',
    enabled: true,
    rolloutPercentage: 100,
    environments: ['development', 'staging', 'production'],
    metrics: {
      conversionGoal: 'component_usage',
      successMetric: 'components_per_project'
    }
  },

  // Phase 2: Grid System
  GRID_SNAP_SYSTEM: {
    key: 'GRID_SNAP_SYSTEM',
    name: 'Grid Snap System',
    description: 'Enable grid overlay and snap-to-grid functionality',
    enabled: true,
    rolloutPercentage: 90,
    userSegments: ['premium', 'beta'],
    environments: ['development', 'staging', 'production']
  },

  ADVANCED_GRID_FEATURES: {
    key: 'ADVANCED_GRID_FEATURES',
    name: 'Advanced Grid Features',
    description: 'Enable custom grid sizes and smart guidelines',
    enabled: false,
    rolloutPercentage: 25,
    userSegments: ['premium'],
    environments: ['development', 'staging'],
    dependencies: ['GRID_SNAP_SYSTEM']
  },

  // Phase 3: Code Generation
  MULTI_FRAMEWORK_CODEGEN: {
    key: 'MULTI_FRAMEWORK_CODEGEN',
    name: 'Multi-Framework Code Generation',
    description: 'Enable React, Vue, Angular, HTML, Svelte code generation',
    enabled: true,
    rolloutPercentage: 80,
    environments: ['development', 'staging', 'production']
  },

  ADVANCED_CODE_FEATURES: {
    key: 'ADVANCED_CODE_FEATURES',
    name: 'Advanced Code Features',
    description: 'Enable TypeScript, accessibility, and optimization options',
    enabled: false,
    rolloutPercentage: 50,
    userSegments: ['premium', 'beta'],
    environments: ['development', 'staging'],
    dependencies: ['MULTI_FRAMEWORK_CODEGEN']
  },

  CODE_EXPORT_FORMATS: {
    key: 'CODE_EXPORT_FORMATS',
    name: 'Additional Export Formats',
    description: 'Enable Figma, Sketch, and Adobe XD export formats',
    enabled: false,
    rolloutPercentage: 0,
    userSegments: ['premium'],
    environments: ['development']
  },

  // Phase 4: Advanced UI Features
  INLINE_TEXT_EDITING: {
    key: 'INLINE_TEXT_EDITING',
    name: 'Inline Text Editing',
    description: 'Enable double-click to edit component text',
    enabled: true,
    rolloutPercentage: 95,
    environments: ['development', 'staging', 'production']
  },

  ADVANCED_PROPERTY_EDITOR: {
    key: 'ADVANCED_PROPERTY_EDITOR',
    name: 'Advanced Property Editor',
    description: 'Enable tabbed property editor with styling controls',
    enabled: false,
    rolloutPercentage: 70,
    environments: ['development', 'staging'],
    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-03-01')
  },

  COMPONENT_VARIANTS: {
    key: 'COMPONENT_VARIANTS',
    name: 'Component Variants',
    description: 'Enable component variants and presets',
    enabled: false,
    rolloutPercentage: 30,
    userSegments: ['premium'],
    environments: ['development'],
    dependencies: ['ENHANCED_COMPONENT_REGISTRY']
  },

  // Phase 5: Performance & Polish
  PERFORMANCE_MONITORING: {
    key: 'PERFORMANCE_MONITORING',
    name: 'Performance Monitoring',
    description: 'Enable real-time performance metrics and optimization',
    enabled: true,
    rolloutPercentage: 100,
    environments: ['development', 'staging', 'production']
  },

  CANVAS_VIRTUALIZATION: {
    key: 'CANVAS_VIRTUALIZATION',
    name: 'Canvas Virtualization',
    description: 'Enable virtualization for large component sets',
    enabled: false,
    rolloutPercentage: 40,
    environments: ['development', 'staging'],
    metrics: {
      successMetric: 'render_performance'
    }
  },

  // Future Features
  REAL_TIME_COLLABORATION: {
    key: 'REAL_TIME_COLLABORATION',
    name: 'Real-time Collaboration',
    description: 'Enable Google Docs-style real-time editing',
    enabled: false,
    rolloutPercentage: 0,
    userSegments: ['premium'],
    environments: ['development'],
    dependencies: ['ENHANCED_COMPONENT_REGISTRY', 'GRID_SNAP_SYSTEM']
  },

  AI_DESIGN_ASSISTANT: {
    key: 'AI_DESIGN_ASSISTANT',
    name: 'AI Design Assistant',
    description: 'Enable AI-powered design suggestions and automation',
    enabled: false,
    rolloutPercentage: 0,
    userSegments: ['beta'],
    environments: ['development']
  },

  COMPONENT_MARKETPLACE: {
    key: 'COMPONENT_MARKETPLACE',
    name: 'Component Marketplace',
    description: 'Enable community component sharing and marketplace',
    enabled: false,
    rolloutPercentage: 0,
    environments: ['development']
  }
};



// =================================================================
// DEPLOYMENT ROLLOUT PLAN
// =================================================================

export const ROLLOUT_PHASES = {
  PHASE_1: {
    name: 'Enhanced Component Registry',
    duration: '2 weeks',
    flags: ['ENHANCED_COMPONENT_REGISTRY'],
    rolloutSchedule: [
      { day: 1, percentage: 10, segment: 'beta' },
      { day: 3, percentage: 25, segment: 'beta' },
      { day: 7, percentage: 50, segment: 'all' },
      { day: 10, percentage: 75, segment: 'all' },
      { day: 14, percentage: 100, segment: 'all' }
    ]
  },
  
  PHASE_2: {
    name: 'Grid System',
    duration: '2 weeks',
    flags: ['GRID_SNAP_SYSTEM', 'ADVANCED_GRID_FEATURES'],
    dependencies: ['ENHANCED_COMPONENT_REGISTRY'],
    rolloutSchedule: [
      { day: 1, percentage: 15, segment: 'premium' },
      { day: 5, percentage: 40, segment: 'beta' },
      { day: 10, percentage: 70, segment: 'all' },
      { day: 14, percentage: 90, segment: 'all' }
    ]
  },
  
  PHASE_3: {
    name: 'Code Generation',
    duration: '3 weeks',
    flags: ['MULTI_FRAMEWORK_CODEGEN', 'ADVANCED_CODE_FEATURES'],
    rolloutSchedule: [
      { day: 1, percentage: 20, segment: 'beta' },
      { day: 7, percentage: 50, segment: 'all' },
      { day: 14, percentage: 80, segment: 'all' },
      { day: 21, percentage: 100, segment: 'all' }
    ]
  },
  
  PHASE_4: {
    name: 'Advanced UI Features',
    duration: '2 weeks',
    flags: ['INLINE_TEXT_EDITING', 'ADVANCED_PROPERTY_EDITOR', 'COMPONENT_VARIANTS'],
    rolloutSchedule: [
      { day: 1, percentage: 25, segment: 'premium' },
      { day: 7, percentage: 70, segment: 'all' },
      { day: 14, percentage: 95, segment: 'all' }
    ]
  },
  
  PHASE_5: {
    name: 'Performance & Polish',
    duration: '1 week',
    flags: ['PERFORMANCE_MONITORING', 'CANVAS_VIRTUALIZATION'],
    rolloutSchedule: [
      { day: 1, percentage: 50, segment: 'all' },
      { day: 4, percentage: 100, segment: 'all' }
    ]
  }
};
