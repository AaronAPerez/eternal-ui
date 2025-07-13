/**
 * Export Types - Fixed TypeScript definitions
 * Resolves missing properties and framework type mismatches
 */

// Base framework types - Updated to include Next.js
export type SupportedFramework = 'react' | 'vue' | 'svelte' | 'angular' | 'next'

// Styling options
export type StylingOption = 'tailwind' | 'styled-components' | 'css-modules' | 'sass' | 'emotion'

// Build tools
export type BuildTool = 'vite' | 'webpack' | 'rollup' | 'esbuild' | 'turbo'

// Compliance levels for enterprise features
export type ComplianceLevel = 'standard' | 'enhanced' | 'enterprise' | 'government'

// Enterprise configuration - Added missing interface
export interface EnterpriseConfig {
  compliance: ComplianceLevel
  auditLogging: boolean
  sso: boolean
  rbac: boolean
  encryption: boolean
  dataRetention: number // days
  customBranding: boolean
  whiteLabel: boolean
}

// Advanced export configuration - Fixed with enterprise property
export interface AdvancedExportConfig {
  framework: SupportedFramework
  styling: StylingOption
  buildTool: BuildTool
  typescript: boolean
  testing: boolean
  linting: boolean
  formatting: boolean
  accessibility: boolean
  seo: boolean
  performance: boolean
  pwa: boolean
  
  // Enterprise features - Added missing property
  enterprise?: EnterpriseConfig
  
  // Bundle optimization
  bundleOptimization: {
    treeshaking: boolean
    codesplitting: boolean
    minification: boolean
    compression: boolean
  }
  
  // Deployment configuration
  deployment: {
    platform: 'vercel' | 'netlify' | 'aws' | 'docker' | 'static'
    environment: 'development' | 'staging' | 'production'
    customDomain?: string
    ssl: boolean
  }
  
  // Analytics and monitoring
  monitoring: {
    analytics: boolean
    errorTracking: boolean
    performanceMonitoring: boolean
    accessibilityMonitoring: boolean
  }
}

// Project export configuration
export interface ProjectExportConfig {
  projectName: string
  description: string
  version: string
  author: string
  license: string
  repository?: string
  
  // Technical configuration
  framework: SupportedFramework
  styling: StylingOption
  buildTool: BuildTool
  
  // Feature flags
  features: {
    typescript: boolean
    testing: boolean
    linting: boolean
    accessibility: boolean
    seo: boolean
    pwa: boolean
    i18n: boolean
  }
  
  // Advanced options
  advanced?: AdvancedExportConfig
}

// Export result interface
export interface ExportResult {
  success: boolean
  message: string
  files: ExportedFile[]
  metadata: ExportMetadata
  warnings?: string[]
  errors?: string[]
}

// Exported file structure
export interface ExportedFile {
  path: string
  content: string
  type: 'component' | 'style' | 'config' | 'documentation' | 'test'
  size: number
  encoding: 'utf-8' | 'base64'
}

// Export metadata
export interface ExportMetadata {
  exportedAt: string
  framework: SupportedFramework
  totalFiles: number
  totalSize: number
  buildInstructions: string
  deploymentInstructions: string
  performanceScore?: number
  accessibilityScore?: number
  seoScore?: number
}

// Framework-specific configurations
export interface ReactConfig {
  version: '18' | '17'
  router: 'react-router' | 'reach-router' | 'next-router'
  stateManagement: 'useState' | 'zustand' | 'redux' | 'jotai'
  testing: 'jest' | 'vitest' | 'testing-library'
}

export interface NextConfig extends ReactConfig {
  appRouter: boolean
  serverComponents: boolean
  middleware: boolean
  staticGeneration: boolean
  imageOptimization: boolean
}

export interface VueConfig {
  version: '3' | '2'
  composition: boolean
  router: boolean
  stateManagement: 'pinia' | 'vuex'
  testing: 'vitest' | 'jest'
}

export interface SvelteConfig {
  kit: boolean
  typescript: boolean
  adapter: 'auto' | 'static' | 'vercel' | 'netlify'
  testing: 'vitest' | 'jest'
}

export interface AngularConfig {
  version: '17' | '16' | '15'
  standalone: boolean
  routing: boolean
  stateManagement: 'ngrx' | 'akita' | 'ngxs'
  testing: 'jasmine' | 'jest'
}

// Union type for framework-specific configs
export type FrameworkConfig = ReactConfig | NextConfig | VueConfig | SvelteConfig | AngularConfig

// Component export interface
export interface ComponentExport {
  name: string
  props: Record<string, any>
  children?: ComponentExport[]
  styling: Record<string, any>
  accessibility: {
    ariaLabel?: string
    ariaDescribedBy?: string
    role?: string
    tabIndex?: number
  }
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

// Performance optimization settings
export interface PerformanceConfig {
  lazyLoading: boolean
  imageOptimization: boolean
  bundleSplitting: boolean
  treeShaking: boolean
  minification: boolean
  compression: boolean
  caching: {
    strategy: 'aggressive' | 'moderate' | 'conservative'
    duration: number
  }
}

// Accessibility configuration
export interface AccessibilityConfig {
  wcagLevel: 'A' | 'AA' | 'AAA'
  screenReaderSupport: boolean
  keyboardNavigation: boolean
  colorContrast: boolean
  motionReduction: boolean
  focusManagement: boolean
  ariaLabels: boolean
  semanticHtml: boolean
}

// SEO configuration
export interface SEOConfig {
  metaTags: boolean
  structuredData: boolean
  sitemap: boolean
  robotsTxt: boolean
  openGraph: boolean
  twitterCards: boolean
  canonicalUrls: boolean
  performanceOptimization: boolean
}

// Testing configuration
export interface TestingConfig {
  unit: boolean
  integration: boolean
  e2e: boolean
  accessibility: boolean
  performance: boolean
  visual: boolean
  framework: 'jest' | 'vitest' | 'cypress' | 'playwright'
}

// Error handling
export class ExportError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message)
    this.name = 'ExportError'
  }
}

// Export progress tracking
export interface ExportProgress {
  stage: 'initializing' | 'analyzing' | 'generating' | 'optimizing' | 'finalizing'
  progress: number // 0-100
  currentFile?: string
  message: string
  startTime: number
  estimatedCompletion?: number
}