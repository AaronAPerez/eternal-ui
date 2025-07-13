/**
 * Comprehensive test suite for the export engine
 * Ensures export quality and framework compatibility
 */

import { ExportEngine } from '../ExportEngine'
import { ComponentNode, ExportConfig } from '../../types/types'
import { ReactGenerator } from '../generators/ReactGenerator'

describe('ExportEngine', () => {
  let exportEngine: ExportEngine
  let mockComponents: ComponentNode[]
  let mockConfig: ExportConfig

  beforeEach(() => {
    exportEngine = new ExportEngine()
    
    mockComponents = [
      {
        id: 'button-1',
        type: 'button',
        props: {
          text: 'Click me',
          variant: 'primary',
          disabled: false
        },
        children: [],
        styles: {
          className: 'bg-blue-500 text-white px-4 py-2 rounded'
        },
        accessibility: {
          'aria-label': 'Primary action button',
          'role': 'button',
          'tabIndex': 0
        }
      }
    ]

    mockConfig = {
      framework: 'react',
      typescript: true,
      styling: 'tailwind',
      bundler: 'vite',
      testing: 'jest',
      accessibility: true,
      seo: true,
      performance: true
    }
  })

  describe('React Export', () => {
    test('should generate production-ready React component', async () => {
      const result = await exportEngine.export(mockComponents, mockConfig)
      
      expect(result.files).toHaveLength(8) // Component, test, story, docs, etc.
      
      const componentFile = result.files.find(f => f.path.includes('Button.tsx'))
      expect(componentFile).toBeDefined()
      expect(componentFile?.content).toContain('interface ButtonProps')
      expect(componentFile?.content).toContain('aria-label')
      expect(componentFile?.content).toContain('WCAG 2.1 AA compliant')
    })

    test('should include accessibility features', async () => {
      const result = await exportEngine.export(mockComponents, mockConfig)
      
      const componentFile = result.files.find(f => f.path.includes('Button.tsx'))
      
      // Check for accessibility props in interface
      expect(componentFile?.content).toContain("'aria-label'?: string")
      expect(componentFile?.content).toContain("'aria-labelledby'?: string")
      expect(componentFile?.content).toContain('tabIndex?: number')
      
      // Check for accessibility documentation
      expect(componentFile?.content).toContain('Accessibility Features:')
      expect(componentFile?.content).toContain('Screen reader compatible')
      expect(componentFile?.content).toContain('Keyboard navigation support')
    })

    test('should generate comprehensive tests', async () => {
      const result = await exportEngine.export(mockComponents, mockConfig)
      
      const testFile = result.files.find(f => f.path.includes('Button.test.tsx'))
      expect(testFile).toBeDefined()
      
      // Check for accessibility tests
      expect(testFile?.content).toContain('should be accessible to screen readers')
      expect(testFile?.content).toContain('should support keyboard navigation')
      expect(testFile?.content).toContain('toHaveNoViolations()')
    })

    test('should include performance optimizations', async () => {
      const result = await exportEngine.export(mockComponents, mockConfig)
      
      expect(result.metadata.performance).toBeDefined()
      expect(result.files.some(f => f.content.includes('React.memo'))).toBeTruthy()
    })
  })

  describe('TypeScript Support', () => {
    test('should generate proper TypeScript interfaces', async () => {
      mockConfig.typescript = true
      const result = await exportEngine.export(mockComponents, mockConfig)
      
      const componentFile = result.files.find(f => f.path.includes('Button.tsx'))
      
      expect(componentFile?.content).toContain('interface ButtonProps')
      expect(componentFile?.content).toContain('text: string')
      expect(componentFile?.content).toContain('variant?: string')
      expect(componentFile?.content).toContain(': ButtonProps')
    })

    test('should include JSDoc documentation', async () => {
      const result = await exportEngine.export(mockComponents, mockConfig)
      
      const componentFile = result.files.find(f => f.path.includes('Button.tsx'))
      
      expect(componentFile?.content).toContain('/**')
      expect(componentFile?.content).toContain('@description')
      expect(componentFile?.content).toContain('@param props')
      expect(componentFile?.content).toContain('@returns JSX.Element')
    })
  })

  describe('Framework Compatibility', () => {
    test('should export to Vue 3', async () => {
      mockConfig.framework = 'vue'
      const result = await exportEngine.export(mockComponents, mockConfig)
      
      const componentFile = result.files.find(f => f.path.includes('Button.vue'))
      expect(componentFile).toBeDefined()
      expect(componentFile?.content).toContain('<template>')
      expect(componentFile?.content).toContain('<script setup')
      expect(componentFile?.content).toContain('defineProps')
    })

    test('should export to Svelte', async () => {
      mockConfig.framework = 'svelte'
      const result = await exportEngine.export(mockComponents, mockConfig)
      
      const componentFile = result.files.find(f => f.path.includes('Button.svelte'))
      expect(componentFile).toBeDefined()
      expect(componentFile?.content).toContain('export let')
      expect(componentFile?.content).toContain('<button')
    })
  })

  describe('Bundle Optimization', () => {
    test('should optimize bundle size', async () => {
      const result = await exportEngine.export(mockComponents, mockConfig)
      
      expect(result.metadata.performance.bundleSize).toBeLessThan(100000) // < 100KB
      
      const packageJson = result.files.find(f => f.path === 'package.json')
      const pkg = JSON.parse(packageJson?.content || '{}')
      
      // Should include tree-shaking friendly dependencies
      expect(pkg.dependencies).not.toContain('lodash')
      expect(pkg.dependencies).toContain('lodash-es') // Tree-shakeable version
    })
  })

  describe('SEO Features', () => {
    test('should include SEO optimizations', async () => {
      const result = await exportEngine.export(mockComponents, mockConfig)
      
      expect(result.metadata.seo).toBeDefined()
      expect(result.metadata.seo.score).toBeGreaterThan(90)
      
      const documentationFile = result.files.find(f => f.path.includes('SEO'))
      expect(documentationFile).toBeDefined()
    })
  })

  describe('Error Handling', () => {
    test('should handle invalid components gracefully', async () => {
      const invalidComponents = [
        {
          id: '',
          type: '',
          props: {},
          children: [],
          styles: {},
          accessibility: {}
        }
      ] as ComponentNode[]

      await expect(
        exportEngine.export(invalidComponents, mockConfig)
      ).rejects.toThrow('Invalid component: missing id or type')
    })

    test('should handle unsupported framework', async () => {
      mockConfig.framework = 'unsupported' as any

      await expect(
        exportEngine.export(mockComponents, mockConfig)
      ).rejects.toThrow('Unsupported framework: unsupported')
    })
  })
})