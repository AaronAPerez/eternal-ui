/**
 * Export Engine Type Definitions
 * 
 * Fixed and complete type definitions for the export engine functionality
 */

export interface ComponentNode {
  /** Unique identifier for the component */
  id: string
  /** Component type (button, card, section, etc.) */
  type: string
  /** Component properties and configuration */
  props: Record<string, any>
  /** Child components */
  children: ComponentNode[]
  /** Styling information */
  styles: StyleProperties
  /** Accessibility properties */
  accessibility: AccessibilityProps
  /** SEO properties */
  seo?: SEOProps
}

export interface ExportConfig {
  /** Target framework for export */
  framework: 'react' | 'vue' | 'svelte' | 'angular'
  /** Enable TypeScript generation */
  typescript: boolean
  /** Styling approach */
  styling: 'tailwind' | 'css-modules' | 'styled-components' | 'sass'
  /** Build tool configuration */
  bundler: 'vite' | 'webpack' | 'rollup'
  /** Testing framework */
  testing: 'jest' | 'vitest' | 'cypress' | 'playwright' | null
  /** Enable accessibility features */
  accessibility: boolean
  /** Enable SEO optimization */
  seo: boolean
  /** Enable performance optimization */
  performance: boolean
}

export interface GeneratedFile {
  /** File path relative to project root */
  path: string
  /** File content */
  content: string
  /** File type for categorization */
  type: 'component' | 'config' | 'style' | 'test' | 'documentation'
}

export interface ExportResult {
  /** Generated files array */
  files: GeneratedFile[]
  /** Production dependencies */
  dependencies: Record<string, string>
  /** Development dependencies */
  devDependencies: Record<string, string>
  /** Package.json scripts */
  scripts: Record<string, string>
  /** Export metadata and analytics */
  metadata: ExportMetadata
}

export interface AccessibilityProps {
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'aria-expanded'?: boolean
  'aria-hidden'?: boolean
  'role'?: string
  'tabIndex'?: number
}

export interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonicalUrl?: string
}

export interface StyleProperties {
  className?: string
  style?: Record<string, string | number>
  responsive?: ResponsiveStyles
}

export interface ResponsiveStyles {
  mobile?: Record<string, string | number>
  tablet?: Record<string, string | number>
  desktop?: Record<string, string | number>
}

export interface ExportMetadata {
  generatedAt: Date
  framework: string
  version: string
  performance: PerformanceMetrics
  accessibility: AccessibilityReport
  seo: SEOReport
}

export interface PerformanceMetrics {
  bundleSize: number
  lighthouseScore: number
  coreWebVitals: CoreWebVitals
}

export interface AccessibilityReport {
  wcagLevel: 'A' | 'AA' | 'AAA'
  violations: AccessibilityViolation[]
  score: number
  recommendations: string[]
}

export interface SEOReport {
  score: number
  metaTags: MetaTagAnalysis
  structuredData: StructuredDataAnalysis
  recommendations: string[]
}

export interface CoreWebVitals {
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
}

export interface AccessibilityViolation {
  id: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  element: string
  fix: string
}

export interface MetaTagAnalysis {
  title: { present: boolean; length: number; optimal: boolean }
  description: { present: boolean; length: number; optimal: boolean }
  keywords: { present: boolean; count: number }
}

export interface StructuredDataAnalysis {
  schemas: string[]
  valid: boolean
  warnings: string[]
}

// Enterprise types
export interface EnterpriseAnalytics {
  componentCount: number
  testCount: number
  bundleAnalysis: {
    totalSize: number
    componentSizes: Array<{ path: string; size: number }>
  }
  performanceMetrics: {
    estimatedLoadTime: number
    coreWebVitalsScore: number
    bundleOptimization: BundleOptimization
  }
  accessibilityMetrics: {
    wcagCompliance: string
    screenReaderCompatibility: boolean
    keyboardNavigation: boolean
    colorContrast: boolean
  }
  securityAnalysis: {
    vulnerabilities: any[]
    securityScore: number
    complianceLevel: string
  }
  projectCount?: number
  totalComponents?: number
  frameworks?: string[]
}

export interface BundleOptimization {
  treeshaking: boolean
  codesplitting: boolean
  minification: boolean
  compressionRatio: number
  unusedCodeElimination: boolean
}

export interface EnterpriseExportResult {
  files: GeneratedFile[]
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
  scripts: Record<string, string>
  metadata: ExportMetadata
  analytics: EnterpriseAnalytics
  compliance?: 'SOC2' | 'HIPAA' | 'GDPR'
  whiteLabel: boolean
}
