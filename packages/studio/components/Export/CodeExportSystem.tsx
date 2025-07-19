'use client'

import React, { useState, useMemo, useCallback } from 'react'
import JSZip from 'jszip'
import { 
  Download, 
  Copy, 
  FileText, 
  Code, 
  Package, 
  Settings,
  CheckCircle,
  AlertCircle,
  Eye,
  Layers,
  Zap,
  Globe
} from 'lucide-react'
import { COMPONENT_LIBRARY } from '../DragDrop/DragDropInterface'
import { CanvasElement, ComponentDefinition, useCanvas } from '../Canvas/CanvasSystem'


/**
 * Code Export Types and Interfaces
 */

export interface ExportOptions {
  framework: 'react' | 'vue' | 'angular' | 'svelte' | 'html'
  styling: 'tailwind' | 'css-modules' | 'styled-components' | 'emotion' | 'vanilla-css'
  typescript: boolean
  includeTests: boolean
  includeStorybook: boolean
  optimizeBundle: boolean
  includeAssets: boolean
  exportFormat: 'single-file' | 'component-files' | 'full-project'
  targetEnvironment: 'development' | 'production'
}

export interface ExportResult {
  success: boolean
  files: ExportFile[]
  assets: Asset[]
  dependencies: Dependency[]
  buildInstructions: string[]
  metrics: {
    componentCount: number
    totalLines: number
    bundleSize: string
    performanceScore: number
  }
  warnings: string[]
  errors: string[]
}

export interface ExportFile {
  path: string
  name: string
  content: string
  type: 'component' | 'style' | 'test' | 'story' | 'config' | 'documentation'
  language: 'typescript' | 'javascript' | 'css' | 'json' | 'markdown'
}

export interface Asset {
  name: string
  path: string
  type: 'image' | 'font' | 'icon' | 'video' | 'audio'
  size: number
  optimized: boolean
}

export interface Dependency {
  name: string
  version: string
  type: 'dependency' | 'devDependency' | 'peerDependency'
  description: string
  required: boolean
}

/**
 * Framework-specific code generators
 */

class ReactExporter {
  static generateComponent(element: CanvasElement, options: ExportOptions): string {
    const componentDef = COMPONENT_LIBRARY.find(c => c.type === element.type)
    if (!componentDef) return ''

    const componentName = this.toPascalCase(element.name)
    const propsInterface = options.typescript ? this.generatePropsInterface(element, componentDef) : ''
    const imports = this.generateImports(element, options)
    const componentBody = this.generateComponentBody(element, componentDef, options)

    return `${imports}

${propsInterface}

${options.typescript ? 'export ' : ''}const ${componentName}${options.typescript ? ': React.FC<' + componentName + 'Props>' : ''} = (${options.typescript ? '{ ...props }' : 'props'}) => {
  return (
${componentBody}
  )
}

export default ${componentName}`
  }

  static generatePropsInterface(element: CanvasElement, componentDef: ComponentDefinition): string {
    const propsSchema = componentDef.propSchema
    const interfaceName = this.toPascalCase(element.name) + 'Props'
    
    const props = Object.entries(propsSchema).map(([key, schema]) => {
      const optional = !schema.validation?.required ? '?' : ''
      const type = this.mapSchemaTypeToTS(schema.type)
      return `  ${key}${optional}: ${type}`
    }).join('\n')

    return `interface ${interfaceName} {
${props}
  children?: React.ReactNode
  className?: string
}`
  }

  static generateImports(element: CanvasElement, options: ExportOptions): string {
    const imports = ['import React from \'react\'']
    
    if (options.styling === 'styled-components') {
      imports.push('import styled from \'styled-components\'')
    }
    
    // Add child component imports
    element.children.forEach(child => {
      const childName = this.toPascalCase(child.name)
      imports.push(`import ${childName} from './${childName}'`)
    })

    return imports.join('\n')
  }

  static generateComponentBody(element: CanvasElement, componentDef: ComponentDefinition, options: ExportOptions): string {
    let template = componentDef.exportTemplate.react
    
    // Replace template variables
    Object.entries(element.props).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`
      template = template.replace(new RegExp(placeholder, 'g'), value?.toString() || '')
    })

    // Handle children
    if (element.children.length > 0) {
      const childrenCode = element.children.map(child => {
        const childName = this.toPascalCase(child.name)
        return `        <${childName} {...props.${child.name.toLowerCase()}Props} />`
      }).join('\n')
      
      template = template.replace('{{children}}', childrenCode)
    } else {
      template = template.replace('{{children}}', '')
    }

    // Add styling classes
    const classes = this.generateClassNames(element, options)
    template = template.replace('{{className}}', classes)

    return template
  }

  static generateClassNames(element: CanvasElement, options: ExportOptions): string {
    const classes: string[] = []
    
    if (element.styling.className) {
      classes.push(element.styling.className)
    }

    // Add responsive classes for Tailwind
    if (options.styling === 'tailwind' && element.constraints.responsive) {
      classes.push('w-full', 'h-auto')
    }

    return classes.join(' ')
  }

  static toPascalCase(str: string): string {
    return str.replace(/(?:^|[\s-_])(\w)/g, (_, char) => char.toUpperCase()).replace(/[\s-_]/g, '')
  }

  static mapSchemaTypeToTS(type: string): string {
    const typeMap = {
      'string': 'string',
      'number': 'number',
      'boolean': 'boolean',
      'color': 'string',
      'image': 'string',
      'select': 'string',
      'array': 'any[]',
      'object': 'Record<string, any>'
    }
    return typeMap[type as keyof typeof typeMap] || 'any'
  }
}

class VueExporter {
  static generateComponent(element: CanvasElement, options: ExportOptions): string {
    const componentDef = COMPONENT_LIBRARY.find(c => c.type === element.type)
    if (!componentDef) return ''

    const componentName = element.name
    const template = this.generateTemplate(element, componentDef)
    const script = this.generateScript(element, componentDef, options)
    const style = this.generateStyle(element, options)

    return `<template>
${template}
</template>

<script${options.typescript ? ' lang="ts"' : ''}>
${script}
</script>

${style ? `<style${options.styling === 'css-modules' ? ' module' : ''}>\n${style}\n</style>` : ''}`
  }

  static generateTemplate(element: CanvasElement, componentDef: ComponentDefinition): string {
    let template = componentDef.exportTemplate.vue
    
    // Replace template variables with Vue bindings
    Object.entries(element.props).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`
      template = template.replace(new RegExp(placeholder, 'g'), value?.toString() || '')
    })

    return template
  }

  static generateScript(element: CanvasElement, componentDef: ComponentDefinition, options: ExportOptions): string {
    const propsDefinition = this.generatePropsDefinition(componentDef, options)
    
    return `${options.typescript ? 'import { defineComponent, PropType } from \'vue\'' : 'import { defineComponent } from \'vue\''}

export default defineComponent({
  name: '${element.name}',
${propsDefinition}
})`
  }

  static generatePropsDefinition(componentDef: ComponentDefinition, options: ExportOptions): string {
    if (!options.typescript) {
      const props = Object.keys(componentDef.propSchema).map(key => `'${key}'`).join(', ')
      return `  props: [${props}],`
    }

    const props = Object.entries(componentDef.propSchema).map(([key, schema]) => {
      const type = this.mapSchemaTypeToVue(schema.type)
      const required = schema.validation?.required || false
      const defaultValue = schema.default

      return `    ${key}: {
      type: ${type},
      required: ${required},
      default: ${JSON.stringify(defaultValue)}
    }`
    }).join(',\n')

    return `  props: {
${props}
  },`
  }

  static generateStyle(element: CanvasElement, options: ExportOptions): string {
    if (options.styling === 'tailwind') return ''
    
    // Generate vanilla CSS for the component
    const styles: string[] = []
    
    if (element.styling.style) {
      const cssRules = Object.entries(element.styling.style).map(([prop, value]) => 
        `  ${this.camelToKebab(prop)}: ${value};`
      ).join('\n')
      
      styles.push(`.${element.name.toLowerCase()} {\n${cssRules}\n}`)
    }

    return styles.join('\n\n')
  }

  static mapSchemaTypeToVue(type: string): string {
    const typeMap = {
      'string': 'String',
      'number': 'Number',
      'boolean': 'Boolean',
      'color': 'String',
      'image': 'String',
      'select': 'String',
      'array': 'Array',
      'object': 'Object'
    }
    return typeMap[type as keyof typeof typeMap] || 'String'
  }

  static camelToKebab(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  }
}

/**
 * Code Exporter Service
 */
class CodeExporter {
  static async exportProject(elements: CanvasElement[], options: ExportOptions): Promise<ExportResult> {
    try {
      const files: ExportFile[] = []
      const assets: Asset[] = []
      const dependencies: Dependency[] = []
      const warnings: string[] = []
      const errors: string[] = []

      // Generate component files
      for (const element of elements) {
        try {
          const componentFile = await this.generateComponentFile(element, options)
          if (componentFile) {
            files.push(componentFile)
          }

          // Generate tests if requested
          if (options.includeTests) {
            const testFile = await this.generateTestFile(element, options)
            if (testFile) {
              files.push(testFile)
            }
          }

          // Generate Storybook stories if requested
          if (options.includeStorybook) {
            const storyFile = await this.generateStoryFile(element, options)
            if (storyFile) {
              files.push(storyFile)
            }
          }
        } catch (error) {
          errors.push(`Failed to generate component ${element.name}: ${error}`)
        }
      }

      // Generate project configuration files
      if (options.exportFormat === 'full-project') {
        files.push(...await this.generateConfigFiles(options))
        dependencies.push(...await this.generateDependencies(options))
      }

      // Calculate metrics
      const metrics = {
        componentCount: elements.length,
        totalLines: files.reduce((total, file) => total + file.content.split('\n').length, 0),
        bundleSize: this.estimateBundleSize(files),
        performanceScore: this.calculatePerformanceScore(elements, options)
      }

      return {
        success: errors.length === 0,
        files,
        assets,
        dependencies,
        buildInstructions: this.generateBuildInstructions(options),
        metrics,
        warnings,
        errors
      }
    } catch (error) {
      return {
        success: false,
        files: [],
        assets: [],
        dependencies: [],
        buildInstructions: [],
        metrics: { componentCount: 0, totalLines: 0, bundleSize: '0KB', performanceScore: 0 },
        warnings: [],
        errors: [`Export failed: ${error}`]
      }
    }
  }

  static async generateComponentFile(element: CanvasElement, options: ExportOptions): Promise<ExportFile | null> {
    let content = ''
    let language: 'typescript' | 'javascript' = options.typescript ? 'typescript' : 'javascript'
    let extension = options.typescript ? '.tsx' : '.jsx'

    switch (options.framework) {
      case 'react':
        content = ReactExporter.generateComponent(element, options)
        break
      case 'vue':
        content = VueExporter.generateComponent(element, options)
        extension = '.vue'
        language = options.typescript ? 'typescript' : 'javascript'
        break
      case 'angular':
        content = this.generateAngularComponent(element, options)
        extension = options.typescript ? '.component.ts' : '.component.js'
        break
      case 'svelte':
        content = this.generateSvelteComponent(element, options)
        extension = '.svelte'
        break
      case 'html':
        content = this.generateHTMLComponent(element, options)
        extension = '.html'
        language = 'javascript'
        break
      default:
        return null
    }

    const componentName = ReactExporter.toPascalCase(element.name)
    
    return {
      path: `components/${componentName}${extension}`,
      name: `${componentName}${extension}`,
      content,
      type: 'component',
      language
    }
  }

  static async generateTestFile(element: CanvasElement, options: ExportOptions): Promise<ExportFile | null> {
    const componentName = ReactExporter.toPascalCase(element.name)
    let content = ''

    switch (options.framework) {
      case 'react':
        content = `import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import ${componentName} from './${componentName}'

test('renders ${componentName} component', () => {
  render(<${componentName} />)
  expect(screen.getByRole('${this.getComponentRole(element.type)}')).toBeInTheDocument()
})

test('accepts custom props', () => {
  const props = ${JSON.stringify(element.props, null, 2)}
  render(<${componentName} {...props} />)
  // Add specific assertions based on component type
})`
        break
      case 'vue':
        content = `import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import ${componentName} from './${componentName}.vue'

test('renders ${componentName} component', () => {
  const wrapper = mount(${componentName})
  expect(wrapper.exists()).toBe(true)
})

test('accepts custom props', () => {
  const props = ${JSON.stringify(element.props, null, 2)}
  const wrapper = mount(${componentName}, { props })
  // Add specific assertions based on component type
})`
        break
    }

    const extension = options.typescript ? '.test.tsx' : '.test.jsx'
    
    return {
      path: `components/__tests__/${componentName}${extension}`,
      name: `${componentName}${extension}`,
      content,
      type: 'test',
      language: options.typescript ? 'typescript' : 'javascript'
    }
  }

  static async generateStoryFile(element: CanvasElement, options: ExportOptions): Promise<ExportFile | null> {
    const componentName = ReactExporter.toPascalCase(element.name)
    
    const content = `import type { Meta, StoryObj } from '@storybook/react'
import ${componentName} from './${componentName}'

const meta: Meta<typeof ${componentName}> = {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Generated component from Eternal UI'
      }
    }
  },
  argTypes: {
    ${Object.entries(element.props).map(([key, value]) => 
      `${key}: { control: '${this.getStorybookControl(typeof value)}' }`
    ).join(',\n    ')}
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: ${JSON.stringify(element.props, null, 4)}
}

export const Interactive: Story = {
  args: {
    ...Default.args,
  }
}`

    return {
      path: `components/${componentName}.stories.tsx`,
      name: `${componentName}.stories.tsx`,
      content,
      type: 'story',
      language: 'typescript'
    }
  }

  static async generateConfigFiles(options: ExportOptions): Promise<ExportFile[]> {
    const files: ExportFile[] = []

    // Package.json
    const packageJson = {
      name: 'eternal-ui-export',
      version: '1.0.0',
      description: 'Exported project from Eternal UI',
      main: 'index.js',
      scripts: this.generateScripts(options),
      dependencies: this.getFrameworkDependencies(options),
      devDependencies: this.getDevDependencies(options)
    }

    files.push({
      path: 'package.json',
      name: 'package.json',
      content: JSON.stringify(packageJson, null, 2),
      type: 'config',
      language: 'json'
    })

    // TypeScript config
    if (options.typescript) {
      const tsConfig = {
        compilerOptions: {
          target: 'ES2020',
          lib: ['DOM', 'DOM.Iterable', 'ES6'],
          allowJs: true,
          skipLibCheck: true,
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          strict: true,
          forceConsistentCasingInFileNames: true,
          moduleResolution: 'node',
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: options.framework === 'react' ? 'react-jsx' : 'preserve'
        },
        include: ['src/**/*'],
        exclude: ['node_modules']
      }

      files.push({
        path: 'tsconfig.json',
        name: 'tsconfig.json',
        content: JSON.stringify(tsConfig, null, 2),
        type: 'config',
        language: 'json'
      })
    }

    // Tailwind config
    if (options.styling === 'tailwind') {
      const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {},
  },
  plugins: [],
}`

      files.push({
        path: 'tailwind.config.js',
        name: 'tailwind.config.js',
        content: tailwindConfig,
        type: 'config',
        language: 'javascript'
      })
    }

    // Vite config (default bundler)
    const viteConfig = `import { defineConfig } from 'vite'
import ${options.framework} from '@vitejs/plugin-${options.framework}'

export default defineConfig({
  plugins: [${options.framework}()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'EternalUIExport',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})`

    files.push({
      path: 'vite.config.js',
      name: 'vite.config.js',
      content: viteConfig,
      type: 'config',
      language: 'javascript'
    })

    // README
    const readme = this.generateReadme(options)
    files.push({
      path: 'README.md',
      name: 'README.md',
      content: readme,
      type: 'documentation',
      language: 'markdown'
    })

    return files
  }

  static generateAngularComponent(element: CanvasElement, options: ExportOptions): string {
    const componentName = ReactExporter.toPascalCase(element.name)
    const selector = element.name.toLowerCase().replace(/\s+/g, '-')
    
    return `import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-${selector}',
  template: \`
    <div class="${this.generateAngularClasses(element, options)}">
      ${this.generateAngularTemplate(element)}
    </div>
  \`,
  ${options.styling !== 'tailwind' ? `styleUrls: ['./${selector}.component.css']` : ''}
})
export class ${componentName}Component {
${Object.entries(element.props).map(([key, value]) => 
  `  @Input() ${key}: ${typeof value} = ${JSON.stringify(value)}`
).join('\n')}
}`
  }

  static generateSvelteComponent(element: CanvasElement, options: ExportOptions): string {
    const props = Object.entries(element.props).map(([key, value]) => 
      `export let ${key} = ${JSON.stringify(value)}`
    ).join('\n')

    return `<script${options.typescript ? ' lang="ts"' : ''}>
${props}
</script>

<div class="${this.generateSvelteClasses(element, options)}">
  ${this.generateSvelteTemplate(element)}
</div>

${options.styling !== 'tailwind' ? '<style>\n/* Component styles */\n</style>' : ''}`
  }

  static generateHTMLComponent(element: CanvasElement, options: ExportOptions): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${element.name}</title>
  ${options.styling === 'tailwind' ? '<script src="https://cdn.tailwindcss.com"></script>' : '<link rel="stylesheet" href="styles.css">'}
</head>
<body>
  <div class="${this.generateHTMLClasses(element, options)}">
    ${this.generateHTMLTemplate(element)}
  </div>
</body>
</html>`
  }

  static generateAngularClasses(element: CanvasElement, options: ExportOptions): string {
    return element.styling.className || ''
  }

  static generateSvelteClasses(element: CanvasElement, options: ExportOptions): string {
    return element.styling.className || ''
  }

  static generateHTMLClasses(element: CanvasElement, options: ExportOptions): string {
    return element.styling.className || ''
  }

  static generateAngularTemplate(element: CanvasElement): string {
    return `<!-- ${element.name} content -->`
  }

  static generateSvelteTemplate(element: CanvasElement): string {
    return `<!-- ${element.name} content -->`
  }

  static generateHTMLTemplate(element: CanvasElement): string {
    return `<!-- ${element.name} content -->`
  }

  static async generateDependencies(options: ExportOptions): Promise<Dependency[]> {
    const dependencies: Dependency[] = []

    // Framework dependencies
    const frameworkDeps = this.getFrameworkDependencies(options)
    Object.entries(frameworkDeps).forEach(([name, version]) => {
      dependencies.push({
        name,
        version,
        type: 'dependency',
        description: `${options.framework} framework dependency`,
        required: true
      })
    })

    // Dev dependencies
    const devDeps = this.getDevDependencies(options)
    Object.entries(devDeps).forEach(([name, version]) => {
      dependencies.push({
        name,
        version,
        type: 'devDependency',
        description: 'Development dependency',
        required: false
      })
    })

    return dependencies
  }

  static getFrameworkDependencies(options: ExportOptions): Record<string, string> {
    const deps: Record<string, string> = {}

    switch (options.framework) {
      case 'react':
        deps['react'] = '^18.2.0'
        deps['react-dom'] = '^18.2.0'
        break
      case 'vue':
        deps['vue'] = '^3.3.0'
        break
      case 'angular':
        deps['@angular/core'] = '^16.0.0'
        deps['@angular/common'] = '^16.0.0'
        deps['@angular/platform-browser'] = '^16.0.0'
        break
      case 'svelte':
        deps['svelte'] = '^4.0.0'
        break
    }

    if (options.styling === 'tailwind') {
      deps['tailwindcss'] = '^3.3.0'
      deps['autoprefixer'] = '^10.4.14'
      deps['postcss'] = '^8.4.24'
    } else if (options.styling === 'styled-components') {
      deps['styled-components'] = '^6.0.0'
    }

    return deps
  }

  static getDevDependencies(options: ExportOptions): Record<string, string> {
    const devDeps: Record<string, string> = {
      'vite': '^4.4.0',
      '@vitejs/plugin-react': '^4.0.0'
    }

    if (options.typescript) {
      devDeps['typescript'] = '^5.0.0'
      devDeps['@types/react'] = '^18.2.0'
      devDeps['@types/react-dom'] = '^18.2.0'
    }

    if (options.includeTests) {
      devDeps['vitest'] = '^0.34.0'
      devDeps['@testing-library/react'] = '^13.4.0'
      devDeps['@testing-library/jest-dom'] = '^5.17.0'
    }

    if (options.includeStorybook) {
      devDeps['@storybook/react'] = '^7.0.0'
      devDeps['@storybook/addon-essentials'] = '^7.0.0'
    }

    return devDeps
  }

  static generateScripts(options: ExportOptions): Record<string, string> {
    const scripts: Record<string, string> = {
      'dev': 'vite',
      'build': 'vite build',
      'preview': 'vite preview'
    }

    if (options.includeTests) {
      scripts['test'] = 'vitest'
      scripts['test:ui'] = 'vitest --ui'
    }

    if (options.includeStorybook) {
      scripts['storybook'] = 'storybook dev -p 6006'
      scripts['build-storybook'] = 'storybook build'
    }

    if (options.typescript) {
      scripts['type-check'] = 'tsc --noEmit'
    }

    return scripts
  }

  static generateBuildInstructions(options: ExportOptions): string[] {
    const instructions = [
      'npm install',
      'npm run dev'
    ]

    if (options.includeTests) {
      instructions.push('npm run test')
    }

    if (options.includeStorybook) {
      instructions.push('npm run storybook')
    }

    instructions.push('npm run build')

    return instructions
  }

  static generateReadme(options: ExportOptions): string {
    return `# Eternal UI Export

This project was exported from Eternal UI visual builder.

## Framework: ${options.framework.charAt(0).toUpperCase() + options.framework.slice(1)}
## Styling: ${options.styling}
## TypeScript: ${options.typescript ? 'Yes' : 'No'}

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Build for production:
   \`\`\`bash
   npm run build
   \`\`\`

${options.includeTests ? `
## Testing

Run tests:
\`\`\`bash
npm run test
\`\`\`

Run tests with UI:
\`\`\`bash
npm run test:ui
\`\`\`
` : ''}

${options.includeStorybook ? `
## Storybook

Run Storybook:
\`\`\`bash
npm run storybook
\`\`\`

Build Storybook:
\`\`\`bash
npm run build-storybook
\`\`\`
` : ''}

## Project Structure

- \`components/\` - React components
${options.includeTests ? '- `components/__tests__/` - Component tests' : ''}
${options.includeStorybook ? '- `components/*.stories.tsx` - Storybook stories' : ''}
- \`assets/\` - Static assets

## License

This project was generated by Eternal UI.
`
  }

  static estimateBundleSize(files: ExportFile[]): string {
    const totalBytes = files.reduce((total, file) => total + file.content.length, 0)
    const kb = Math.round(totalBytes / 1024)
    return `${kb}KB`
  }

  static calculatePerformanceScore(elements: CanvasElement[], options: ExportOptions): number {
    let score = 100

    // Penalize for large number of components
    if (elements.length > 20) score -= 10
    if (elements.length > 50) score -= 20

    // Bonus for optimization options
    if (options.optimizeBundle) score += 5
    if (options.typescript) score += 5
    if (options.styling === 'tailwind') score += 5

    return Math.max(0, Math.min(100, score))
  }

  static getComponentRole(type: string): string {
    const roleMap: Record<string, string> = {
      'button': 'button',
      'heading': 'heading',
      'image': 'img',
      'container': 'region',
      'navigation': 'navigation',
      'form': 'form'
    }
    return roleMap[type] || 'generic'
  }

  static getStorybookControl(type: string): string {
    const controlMap: Record<string, string> = {
      'string': 'text',
      'number': 'number',
      'boolean': 'boolean',
      'object': 'object'
    }
    return controlMap[type] || 'text'
  }
}

/**
 * Export UI Component
 */
export const CodeExportPanel: React.FC = () => {
  const { state } = useCanvas()
  const [options, setOptions] = useState<ExportOptions>({
    framework: 'react',
    styling: 'tailwind',
    typescript: true,
    includeTests: false,
    includeStorybook: false,
    optimizeBundle: true,
    includeAssets: true,
    exportFormat: 'component-files',
    targetEnvironment: 'production'
  })
  const [isExporting, setIsExporting] = useState(false)
  const [exportResult, setExportResult] = useState<ExportResult | null>(null)

  const elements = useMemo(() => 
    Array.from(state.elements.values()),
    [state.elements]
  )

  const handleExport = useCallback(async () => {
    setIsExporting(true)
    try {
      const result = await CodeExporter.exportProject(elements as CanvasElement[], options)
      setExportResult(result)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }, [elements, options])

  const handleDownload = useCallback(() => {
    if (!exportResult) return

    // Create zip file with all exported files
    const zip = new JSZip()
    
    exportResult.files.forEach(file => {
      zip.file(file.path, file.content)
    })

    zip.generateAsync({ type: 'blob' }).then(content => {
      const url = URL.createObjectURL(content)
      const a = document.createElement('a')
      a.href = url
      a.download = 'eternal-ui-export.zip'
      a.click()
      URL.revokeObjectURL(url)
    })
  }, [exportResult])

  return (
    <div className="code-export-panel h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center">
          <Code className="w-5 h-5 mr-2" />
          Export Code
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Export your design as production-ready code
        </p>
      </div>

      {/* Options */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Framework Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Framework</label>
          <select
            value={options.framework}
            onChange={(e) => setOptions(prev => ({ ...prev, framework: e.target.value as any }))}
            className="w-full p-2 border rounded-lg"
          >
            <option value="react">React</option>
            <option value="vue">Vue.js</option>
            <option value="angular">Angular</option>
            <option value="svelte">Svelte</option>
            <option value="html">HTML/CSS</option>
          </select>
        </div>

        {/* Styling */}
        <div>
          <label className="block text-sm font-medium mb-2">Styling</label>
          <select
            value={options.styling}
            onChange={(e) => setOptions(prev => ({ ...prev, styling: e.target.value as any }))}
            className="w-full p-2 border rounded-lg"
          >
            <option value="tailwind">Tailwind CSS</option>
            <option value="css-modules">CSS Modules</option>
            <option value="styled-components">Styled Components</option>
            <option value="emotion">Emotion</option>
            <option value="vanilla-css">Vanilla CSS</option>
          </select>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.typescript}
              onChange={(e) => setOptions(prev => ({ ...prev, typescript: e.target.checked }))}
              className="mr-2"
            />
            <span className="text-sm">Use TypeScript</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.includeTests}
              onChange={(e) => setOptions(prev => ({ ...prev, includeTests: e.target.checked }))}
              className="mr-2"
            />
            <span className="text-sm">Include Tests</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.includeStorybook}
              onChange={(e) => setOptions(prev => ({ ...prev, includeStorybook: e.target.checked }))}
              className="mr-2"
            />
            <span className="text-sm">Include Storybook</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.optimizeBundle}
              onChange={(e) => setOptions(prev => ({ ...prev, optimizeBundle: e.target.checked }))}
              className="mr-2"
            />
            <span className="text-sm">Optimize Bundle</span>
          </label>
        </div>

        {/* Export Format */}
        <div>
          <label className="block text-sm font-medium mb-2">Export Format</label>
          <select
            value={options.exportFormat}
            onChange={(e) => setOptions(prev => ({ ...prev, exportFormat: e.target.value as any }))}
            className="w-full p-2 border rounded-lg"
          >
            <option value="single-file">Single File</option>
            <option value="component-files">Component Files</option>
            <option value="full-project">Full Project</option>
          </select>
        </div>
      </div>

      {/* Export Button */}
      <div className="p-4 border-t">
        <button
          onClick={handleExport}
          disabled={isExporting || elements.length === 0}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isExporting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Export Code
            </>
          )}
        </button>

        {exportResult && (
          <div className="mt-4">
            {exportResult.success ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center text-green-600 mb-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Export Successful
                </div>
                <div className="text-sm text-green-700 space-y-1">
                  <p>{exportResult.files.length} files generated</p>
                  <p>Bundle size: {exportResult.metrics.bundleSize}</p>
                  <p>Performance score: {exportResult.metrics.performanceScore}/100</p>
                </div>
                <button
                  onClick={handleDownload}
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                >
                  Download ZIP
                </button>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center text-red-600 mb-2">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Export Failed
                </div>
                <div className="text-sm text-red-700">
                  {exportResult.errors.map((error, i) => (
                    <p key={i}>{error}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}


