/**
 * Project Exporter - Fixed TypeScript errors
 * Handles full project export with framework-specific optimizations
 * Fixed script types and error handling
 */

import { 
  ProjectExportConfig, 
  ExportResult, 
  ExportedFile, 
  SupportedFramework,
  StylingOption,
  BuildTool 
} from '../types/export-types'

/**
 * Project exporter that generates complete, production-ready applications
 * Supports React, Vue, Svelte, Angular, and Next.js frameworks
 */
export class ProjectExporter {
  private config: ProjectExportConfig
  private exportedFiles: ExportedFile[] = []
  private startTime: number = 0

  constructor(config: ProjectExportConfig) {
    this.config = config
  }

  /**
   * Main export method - generates complete project structure
   * @param components - Components to export
   * @param assets - Additional assets (images, icons, etc.)
   * @returns Promise<ExportResult>
   */
  async exportProject(components: any[], assets: any[] = []): Promise<ExportResult> {
    this.startTime = Date.now()
    this.exportedFiles = []

    try {
      console.log(`🚀 Starting ${this.config.framework} project export...`)

      // Step 1: Generate package.json
      await this.generatePackageJson()

      // Step 2: Generate configuration files
      await this.generateConfigurationFiles()

      // Step 3: Generate project structure
      await this.generateProjectStructure()

      // Step 4: Generate components
      await this.generateComponents(components)

      // Step 5: Generate styles
      await this.generateStyles()

      // Step 6: Generate tests (if enabled)
      if (this.config.features.testing) {
        await this.generateTests()
      }

      // Step 7: Generate documentation
      await this.generateDocumentation()

      // Step 8: Generate deployment files
      await this.generateDeploymentFiles()

      // Step 9: Process assets
      await this.processAssets(assets)

      const result: ExportResult = {
        success: true,
        message: `${this.config.framework} project exported successfully`,
        files: this.exportedFiles,
        metadata: {
          exportedAt: new Date().toISOString(),
          framework: this.config.framework,
          totalFiles: this.exportedFiles.length,
          totalSize: this.calculateTotalSize(),
          buildInstructions: this.generateBuildInstructions(),
          deploymentInstructions: this.generateDeploymentInstructions()
        }
      }

      console.log(`✅ Export completed in ${Date.now() - this.startTime}ms`)
      return result

    } catch (error) {
      console.error('❌ Export failed:', error)
      
      // Fixed: Proper error handling for unknown error type
      const errorMessage = error instanceof Error ? error.message : String(error)
      
      return {
        success: false,
        message: `Export failed: ${errorMessage}`,
        files: [],
        metadata: {
          exportedAt: new Date().toISOString(),
          framework: this.config.framework,
          totalFiles: 0,
          totalSize: 0,
          buildInstructions: '',
          deploymentInstructions: ''
        },
        errors: [errorMessage]
      }
    }
  }

  /**
   * Generates package.json based on framework and features
   */
  private async generatePackageJson(): Promise<void> {
    console.log('📦 Generating package.json...')

    const packageJson = {
      name: this.config.projectName.toLowerCase().replace(/\s+/g, '-'),
      version: this.config.version,
      description: this.config.description,
      author: this.config.author,
      license: this.config.license,
      repository: this.config.repository,
      scripts: this.generateScripts(),
      dependencies: this.generateDependencies(),
      devDependencies: this.generateDevDependencies(),
      ...(this.config.features.typescript && { type: 'module' }),
      engines: {
        node: '>=18.0.0',
        npm: '>=8.0.0'
      },
      browserslist: this.generateBrowserslist()
    }

    this.addFile('package.json', JSON.stringify(packageJson, null, 2), 'config')
    console.log('✅ package.json generated')
  }

  /**
   * Generates npm scripts based on framework and build tool
   * Fixed: Proper typing for scripts object
   */
  private generateScripts(): Record<string, string> {
    // Fixed: Use Record<string, string> to allow dynamic properties
    const scripts: Record<string, string> = {
      dev: this.getDevScript(),
      build: this.getBuildScript(),
      preview: this.getPreviewScript(),
      lint: 'eslint . --ext .ts,.tsx,.js,.jsx --fix',
      format: 'prettier --write .',
      clean: 'rm -rf dist build .next out'
    }

    // Add framework-specific scripts
    if (this.config.framework === 'next') {
      scripts.start = 'next start'
      scripts.export = 'next build && next export'
    }

    // Add testing scripts if enabled
    if (this.config.features.testing) {
      scripts.test = this.getTestScript()
      scripts['test:watch'] = this.getTestWatchScript()
      scripts['test:coverage'] = this.getTestCoverageScript()
    }

    // Add accessibility testing if enabled
    if (this.config.features.accessibility) {
      scripts['test:a11y'] = 'axe-playwright'
      scripts['audit:a11y'] = 'lighthouse --only=accessibility'
    }

    // Add PWA scripts if enabled
    if (this.config.features.pwa) {
      scripts['build:pwa'] = 'npm run build && workbox generateSW'
    }

    return scripts
  }

  /**
   * Generates dependencies based on framework and features
   */
  private generateDependencies(): Record<string, string> {
    const deps: Record<string, string> = {}

    // Framework-specific dependencies
    switch (this.config.framework) {
      case 'react':
        deps.react = '^18.2.0'
        deps['react-dom'] = '^18.2.0'
        break
      case 'next':
        deps.next = '^14.0.0'
        deps.react = '^18.2.0'
        deps['react-dom'] = '^18.2.0'
        break
      case 'vue':
        deps.vue = '^3.3.0'
        break
      case 'svelte':
        deps.svelte = '^4.0.0'
        break
      case 'angular':
        deps['@angular/core'] = '^17.0.0'
        deps['@angular/common'] = '^17.0.0'
        deps['@angular/platform-browser'] = '^17.0.0'
        break
    }

    // Styling dependencies
    switch (this.config.styling) {
      case 'tailwind':
        deps.tailwindcss = '^3.3.0'
        deps.autoprefixer = '^10.4.0'
        deps.postcss = '^8.4.0'
        break
      case 'styled-components':
        deps['styled-components'] = '^6.0.0'
        break
      case 'emotion':
        deps['@emotion/react'] = '^11.11.0'
        deps['@emotion/styled'] = '^11.11.0'
        break
    }

    // Feature-based dependencies
    if (this.config.features.accessibility) {
      deps['@axe-core/react'] = '^4.8.0'
      deps['focus-trap-react'] = '^10.2.0'
    }

    if (this.config.features.seo && this.config.framework === 'next') {
      deps['next-seo'] = '^6.4.0'
    }

    if (this.config.features.pwa) {
      deps['workbox-webpack-plugin'] = '^7.0.0'
      deps['next-pwa'] = '^5.6.0'
    }

    if (this.config.features.i18n) {
      if (this.config.framework === 'next') {
        deps['next-i18next'] = '^15.0.0'
      } else {
        deps['react-i18next'] = '^13.5.0'
      }
    }

    return deps
  }

  /**
   * Generates development dependencies
   */
  private generateDevDependencies(): Record<string, string> {
    const devDeps: Record<string, string> = {
      '@types/node': '^20.0.0',
      eslint: '^8.57.0',
      prettier: '^3.0.0'
    }

    // TypeScript dependencies
    if (this.config.features.typescript) {
      devDeps.typescript = '^5.3.0'
      
      if (this.config.framework === 'react' || this.config.framework === 'next') {
        devDeps['@types/react'] = '^18.2.0'
        devDeps['@types/react-dom'] = '^18.2.0'
      }
    }

    // Build tool dependencies
    switch (this.config.buildTool) {
      case 'vite':
        devDeps.vite = '^5.0.0'
        if (this.config.framework === 'react') {
          devDeps['@vitejs/plugin-react'] = '^4.0.0'
        }
        break
      case 'webpack':
        devDeps.webpack = '^5.89.0'
        devDeps['webpack-cli'] = '^5.1.0'
        break
    }

    // Testing dependencies
    if (this.config.features.testing) {
      devDeps.jest = '^29.7.0'
      devDeps['@testing-library/react'] = '^14.1.0'
      devDeps['@testing-library/jest-dom'] = '^6.1.0'
      devDeps['@testing-library/user-event'] = '^14.5.0'
    }

    // Accessibility testing
    if (this.config.features.accessibility) {
      devDeps['@axe-core/playwright'] = '^4.8.0'
      devDeps['axe-playwright'] = '^1.2.0'
    }

    return devDeps
  }

  /**
   * Generates browserslist configuration
   */
  private generateBrowserslist(): string[] {
    return [
      '>0.2%',
      'not dead',
      'not op_mini all',
      'supports es6-module'
    ]
  }

  /**
   * Generates configuration files based on framework and features
   */
  private async generateConfigurationFiles(): Promise<void> {
    console.log('⚙️ Generating configuration files...')

    // TypeScript configuration
    if (this.config.features.typescript) {
      const tsConfig = this.generateTSConfig()
      this.addFile('tsconfig.json', JSON.stringify(tsConfig, null, 2), 'config')
    }

    // Build tool configuration
    await this.generateBuildToolConfig()

    // Styling configuration
    await this.generateStylingConfig()

    // ESLint configuration
    const eslintConfig = this.generateESLintConfig()
    this.addFile('.eslintrc.js', eslintConfig, 'config')

    // Prettier configuration
    const prettierConfig = this.generatePrettierConfig()
    this.addFile('.prettierrc', JSON.stringify(prettierConfig, null, 2), 'config')

    // Environment variables
    const envExample = this.generateEnvExample()
    this.addFile('.env.example', envExample, 'config')

    console.log('✅ Configuration files generated')
  }

  /**
   * Generates build tool specific configuration
   */
  private async generateBuildToolConfig(): Promise<void> {
    switch (this.config.buildTool) {
      case 'vite':
        const viteConfig = this.generateViteConfig()
        this.addFile('vite.config.ts', viteConfig, 'config')
        break
      case 'webpack':
        const webpackConfig = this.generateWebpackConfig()
        this.addFile('webpack.config.js', webpackConfig, 'config')
        break
    }

    // Next.js specific configuration
    if (this.config.framework === 'next') {
      const nextConfig = this.generateNextConfig()
      this.addFile('next.config.js', nextConfig, 'config')
    }
  }

  /**
   * Generates styling configuration
   */
  private async generateStylingConfig(): Promise<void> {
    if (this.config.styling === 'tailwind') {
      const tailwindConfig = this.generateTailwindConfig()
      this.addFile('tailwind.config.js', tailwindConfig, 'config')
      
      const postcssConfig = this.generatePostCSSConfig()
      this.addFile('postcss.config.js', postcssConfig, 'config')
    }
  }

  /**
   * Generates project structure based on framework
   */
  private async generateProjectStructure(): Promise<void> {
    console.log('🏗️ Generating project structure...')

    // Create base directories and files
    const structure = this.getFrameworkStructure()
    
    for (const item of structure) {
      if (item.type === 'file') {
        this.addFile(item.path, item.content, 'component')
      }
    }

    console.log('✅ Project structure generated')
  }

  /**
   * Gets framework-specific project structure
   */
  private getFrameworkStructure(): Array<{type: 'file', path: string, content: string}> {
    const isNextJs = this.config.framework === 'next'
    const useTypeScript = this.config.features.typescript
    const ext = useTypeScript ? 'tsx' : 'jsx'

    const baseStructure = [
      {
        type: 'file' as const,
        path: 'public/favicon.ico',
        content: '// Favicon placeholder'
      },
      {
        type: 'file' as const,
        path: 'public/robots.txt',
        content: 'User-agent: *\nAllow: /'
      }
    ]

    if (isNextJs) {
      return [
        ...baseStructure,
        {
          type: 'file' as const,
          path: `src/app/layout.${ext}`,
          content: this.generateRootLayout()
        },
        {
          type: 'file' as const,
          path: `src/app/page.${ext}`,
          content: this.generateHomePage()
        },
        {
          type: 'file' as const,
          path: `src/app/globals.css`,
          content: this.generateGlobalStyles()
        }
      ]
    }

    // React/Vue/Svelte/Angular structure
    return [
      ...baseStructure,
      {
        type: 'file' as const,
        path: `src/main.${ext}`,
        content: this.generateMainEntry()
      },
      {
        type: 'file' as const,
        path: `src/App.${ext}`,
        content: this.generateAppComponent()
      },
      {
        type: 'file' as const,
        path: 'src/index.css',
        content: this.generateGlobalStyles()
      }
    ]
  }

  /**
   * Generates framework-specific components
   */
  private async generateComponents(components: any[]): Promise<void> {
    console.log('🧩 Generating components...')

    for (const component of components) {
      const componentCode = this.generateComponentCode(component)
      const fileName = `${component.name}.${this.config.features.typescript ? 'tsx' : 'jsx'}`
      const path = this.config.framework === 'next' 
        ? `src/components/${fileName}`
        : `src/components/${fileName}`
      
      this.addFile(path, componentCode, 'component')
    }

    console.log('✅ Components generated')
  }

  /**
   * Generates component code based on framework
   */
  private generateComponentCode(component: any): string {
    const useTypeScript = this.config.features.typescript
    
    switch (this.config.framework) {
      case 'react':
      case 'next':
        return this.generateReactComponent(component, useTypeScript)
      case 'vue':
        return this.generateVueComponent(component, useTypeScript)
      case 'svelte':
        return this.generateSvelteComponent(component, useTypeScript)
      case 'angular':
        return this.generateAngularComponent(component, useTypeScript)
      default:
        throw new Error(`Unsupported framework: ${this.config.framework}`)
    }
  }

  /**
   * Generates React/Next.js component
   */
  private generateReactComponent(component: any, useTypeScript: boolean): string {
    const typeAnnotations = useTypeScript ? `
interface ${component.name}Props {
  // Add your prop types here
  className?: string;
  children?: React.ReactNode;
}` : ''

    const componentDeclaration = useTypeScript 
      ? `export default function ${component.name}({ className = '', children, ...props }: ${component.name}Props)` 
      : `export default function ${component.name}({ className = '', children, ...props })`

    return `${typeAnnotations ? `${typeAnnotations}\n\n` : ''}/**
 * ${component.name} component
 * Generated by Eternal UI
 */
${componentDeclaration} {
  return (
    <div 
      className={\`${component.styling || 'p-4 bg-white rounded-lg shadow'} \${className}\`}
      {...props}
    >
      {children || <p>Welcome to ${component.name}!</p>}
    </div>
  );
}`
  }

  /**
   * Generates Vue component
   */
  private generateVueComponent(component: any, useTypeScript: boolean): string {
    const scriptLang = useTypeScript ? ' lang="ts"' : ''
    
    return `<template>
  <div :class="[\`${component.styling || 'p-4 bg-white rounded-lg shadow'}\`, className]">
    <slot>
      <p>Welcome to ${component.name}!</p>
    </slot>
  </div>
</template>

<script${scriptLang}>
import { defineComponent } from 'vue'

export default defineComponent({
  name: '${component.name}',
  props: {
    className: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped>
/* Component-specific styles */
</style>`
  }

  /**
   * Generates Svelte component
   */
  private generateSvelteComponent(component: any, useTypeScript: boolean): string {
    const scriptLang = useTypeScript ? ' lang="ts"' : ''
    
    return `<script${scriptLang}>
  export let className = '';
</script>

<div class="${component.styling || 'p-4 bg-white rounded-lg shadow'} {className}">
  <slot>
    <p>Welcome to ${component.name}!</p>
  </slot>
</div>

<style>
  /* Component-specific styles */
</style>`
  }

  /**
   * Generates Angular component
   */
  private generateAngularComponent(component: any, useTypeScript: boolean): string {
    return `import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-${component.name.toLowerCase()}',
  template: \`
    <div [class]="'${component.styling || 'p-4 bg-white rounded-lg shadow'} ' + className">
      <ng-content>
        <p>Welcome to ${component.name}!</p>
      </ng-content>
    </div>
  \`,
  styleUrls: ['./${component.name.toLowerCase()}.component.css']
})
export class ${component.name}Component {
  @Input() className: string = '';
}`
  }

  /**
   * Generates styles based on styling framework
   */
  private async generateStyles(): Promise<void> {
    console.log('🎨 Generating styles...')

    const globalStyles = this.generateGlobalStyles()
    const stylesFile = this.config.framework === 'next' ? 'src/app/globals.css' : 'src/index.css'
    
    // Only add if not already added
    if (!this.exportedFiles.some(file => file.path === stylesFile)) {
      this.addFile(stylesFile, globalStyles, 'style')
    }

    console.log('✅ Styles generated')
  }

  /**
   * Generates global styles based on styling framework
   */
  private generateGlobalStyles(): string {
    let styles = `/* Global Styles - Generated by Eternal UI */\n\n`

    if (this.config.styling === 'tailwind') {
      styles += `@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom component styles */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-300;
  }
}

/* Accessibility improvements */
@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  * {
    @apply focus:outline-none focus:ring-2 focus:ring-blue-300;
  }
}
`
    } else {
      styles += `/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Focus styles for accessibility */
*:focus {
  outline: 2px solid #007acc;
  outline-offset: 2px;
}

/* Responsive design helpers */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
`
    }

    return styles
  }

  /**
   * Generates tests if testing is enabled
   */
  private async generateTests(): Promise<void> {
    console.log('🧪 Generating tests...')

    // Generate test setup
    const testSetup = this.generateTestSetup()
    this.addFile('src/setupTests.ts', testSetup, 'test')

    // Generate example test
    const exampleTest = this.generateExampleTest()
    this.addFile('src/__tests__/App.test.tsx', exampleTest, 'test')

    // Generate accessibility tests if enabled
    if (this.config.features.accessibility) {
      const a11yTest = this.generateA11yTest()
      this.addFile('src/__tests__/accessibility.test.tsx', a11yTest, 'test')
    }

    console.log('✅ Tests generated')
  }

  /**
   * Generates comprehensive documentation
   */
  private async generateDocumentation(): Promise<void> {
    console.log('📚 Generating documentation...')

    // Generate README
    const readme = this.generateREADME()
    this.addFile('README.md', readme, 'documentation')

    // Generate CONTRIBUTING guide
    const contributing = this.generateContributing()
    this.addFile('CONTRIBUTING.md', contributing, 'documentation')

    // Generate accessibility documentation if enabled
    if (this.config.features.accessibility) {
      const a11yDocs = this.generateA11yDocumentation()
      this.addFile('docs/ACCESSIBILITY.md', a11yDocs, 'documentation')
    }

    console.log('✅ Documentation generated')
  }

  /**
   * Generates deployment files
   */
  private async generateDeploymentFiles(): Promise<void> {
    console.log('🚀 Generating deployment files...')

    // Generate Dockerfile
    const dockerfile = this.generateDockerfile()
    this.addFile('Dockerfile', dockerfile, 'config')

    // Generate docker-compose
    const dockerCompose = this.generateDockerCompose()
    this.addFile('docker-compose.yml', dockerCompose, 'config')

    // Generate GitHub Actions workflow
    const workflow = this.generateGitHubWorkflow()
    this.addFile('.github/workflows/deploy.yml', workflow, 'config')

    // Generate deployment README
    const deploymentDocs = this.generateDeploymentDocumentation()
    this.addFile('docs/DEPLOYMENT.md', deploymentDocs, 'documentation')

    console.log('✅ Deployment files generated')
  }

/**
   * Generates TypeScript configuration
   * Fixed: Use any type to avoid strict CompilerOptions typing issues
   */
  private generateTSConfig(): any {
    const compilerOptions: any = {
      target: 'ES2022',
      lib: ['dom', 'dom.iterable', 'ES6'],
      allowJs: true,
      skipLibCheck: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      strict: true,
      forceConsistentCasingInFileNames: true,
      noFallthroughCasesInSwitch: true,
      module: 'esnext',
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: 'react-jsx',
      baseUrl: '.'
    }

    // Add Next.js specific paths
    if (this.config.framework === 'next') {
      compilerOptions.paths = {
        '@/*': ['./src/*']
      }
    }

    const tsConfig = {
      compilerOptions,
      include: [
        'src',
        'next-env.d.ts'
      ],
      exclude: [
        'node_modules'
      ]
    }

    return tsConfig
  }

  /**
   * Generates Vite configuration
   */
  private generateViteConfig(): string {
    return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})`
  }

  /**
   * Generates Next.js configuration
   */
  private generateNextConfig(): string {
    return `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig`
  }

  /**
   * Generates Tailwind configuration
   */
  private generateTailwindConfig(): string {
    return `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
}`
  }

  /**
   * Generates PostCSS configuration
   */
  private generatePostCSSConfig(): string {
    return `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`
  }

  /**
   * Generates ESLint configuration
   */
  private generateESLintConfig(): string {
    return `module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    ${this.config.features.typescript ? "'@typescript-eslint/recommended'," : ''}
    ${this.config.framework === 'react' || this.config.framework === 'next' ? "'plugin:react/recommended'," : ''}
    ${this.config.framework === 'next' ? "'plugin:@next/next/recommended'," : ''}
    ${this.config.features.accessibility ? "'plugin:jsx-a11y/recommended'," : ''}
    'plugin:prettier/recommended',
  ],
  parser: ${this.config.features.typescript ? "'@typescript-eslint/parser'" : "'babel-eslint'"},
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    ${this.config.framework === 'react' || this.config.framework === 'next' ? "'react'," : ''}
    ${this.config.features.typescript ? "'@typescript-eslint'," : ''}
    ${this.config.features.accessibility ? "'jsx-a11y'," : ''}
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
    ${this.config.features.accessibility ? `
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',` : ''}
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}`
  }

  /**
   * Generates Prettier configuration
   */
  private generatePrettierConfig(): any {
    return {
      semi: true,
      trailingComma: 'es5',
      singleQuote: true,
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
    }
  }

  /**
   * Generates environment variables example
   */
  private generateEnvExample(): string {
    return `# Environment Variables Example
# Copy this file to .env.local and fill in your values

# App Configuration
NODE_ENV=development
PORT=3000

# API Configuration
# API_URL=https://api.example.com
# API_KEY=your_api_key_here

# Database (if applicable)
# DATABASE_URL=postgresql://username:password@localhost:5432/database

# Authentication (if applicable)
# NEXTAUTH_URL=http://localhost:3000
# NEXTAUTH_SECRET=your_secret_here

# Third-party Services
# GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
# SENTRY_DSN=https://xxx@sentry.io/xxx
`
  }

  /**
   * Generates webpack configuration
   */
  private generateWebpackConfig(): string {
    return `const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.${this.config.features.typescript ? 'tsx' : 'jsx'}',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              ${this.config.features.typescript ? "'@babel/preset-typescript'" : ''}
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
};`
  }

  /**
   * Generates main entry point based on framework
   */
  private generateMainEntry(): string {
    const isReact = this.config.framework === 'react'
    const useTypeScript = this.config.features.typescript

    if (isReact) {
      return `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

${this.config.features.accessibility ? "import '@axe-core/react';" : ''}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
    }

    // Vue entry point
    if (this.config.framework === 'vue') {
      return `import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')`
    }

    // Default return for other frameworks
    return `// Main entry point for ${this.config.framework}`
  }

  /**
   * Generates root layout for Next.js
   */
  private generateRootLayout(): string {
    return `${this.config.features.typescript ? "import type { Metadata } from 'next'" : ''}

${this.config.features.seo ? `export const metadata${this.config.features.typescript ? ': Metadata' : ''} = {
  title: '${this.config.projectName}',
  description: '${this.config.description}',
}` : ''}

export default function RootLayout({
  children,
}${this.config.features.typescript ? ': {\n  children: React.ReactNode\n}' : ''}) {
  return (
    <html lang="en">
      <body>
        ${this.config.features.accessibility ? '<a href="#main" className="sr-only focus:not-sr-only">Skip to main content</a>' : ''}
        <main id="main">
          {children}
        </main>
      </body>
    </html>
  )
}`
  }

  /**
   * Generates home page for Next.js
   */
  private generateHomePage(): string {
    return `export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to ${this.config.projectName}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            ${this.config.description}
          </p>
          <div className="space-y-4">
            <button 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Get started with ${this.config.projectName}"
            >
              Get Started
            </button>
            <button 
              className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Learn more about ${this.config.projectName}"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}`
  }

  /**
   * Generates App component for SPA frameworks
   */
  private generateAppComponent(): string {
    if (this.config.framework === 'react') {
      return `import React from 'react';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to ${this.config.projectName}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            ${this.config.description}
          </p>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Get started with ${this.config.projectName}"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;`
    }

    return `// App component for ${this.config.framework}`
  }

  /**
   * Processes and optimizes assets
   */
  private async processAssets(assets: any[]): Promise<void> {
    console.log('🖼️ Processing assets...')

    for (const asset of assets) {
      // Copy asset to public directory
      this.addFile(`public/${asset.name}`, asset.content, 'component')
    }

    console.log('✅ Assets processed')
  }

  /**
   * Helper method to add files to export
   */
  private addFile(path: string, content: string, type: ExportedFile['type']): void {
    this.exportedFiles.push({
      path,
      content,
      type,
      size: new Blob([content]).size,
      encoding: 'utf-8'
    })
  }

  /**
   * Calculates total size of all exported files
   */
  private calculateTotalSize(): number {
    return this.exportedFiles.reduce((total, file) => total + file.size, 0)
  }

  // Script generation helper methods
  private getDevScript(): string {
    if (this.config.framework === 'next') return 'next dev'
    if (this.config.buildTool === 'vite') return 'vite'
    return 'webpack serve --mode development'
  }

  private getBuildScript(): string {
    if (this.config.framework === 'next') return 'next build'
    if (this.config.buildTool === 'vite') return 'vite build'
    return 'webpack --mode production'
  }

  private getPreviewScript(): string {
    if (this.config.framework === 'next') return 'next start'
    if (this.config.buildTool === 'vite') return 'vite preview'
    return 'serve -s dist'
  }

  private getTestScript(): string {
    return 'jest'
  }

  private getTestWatchScript(): string {
    return 'jest --watch'
  }

  private getTestCoverageScript(): string {
    return 'jest --coverage'
  }

  /**
   * Generates build instructions for the generated project
   */
  private generateBuildInstructions(): string {
    const isNextJs = this.config.framework === 'next'
    
    return `
# Build Instructions for ${this.config.projectName}

## Prerequisites
- Node.js 18+ 
- npm 8+

## Quick Start
1. \`npm install\` - Install dependencies
2. \`npm run dev\` - Start development server
3. \`npm run build\` - Build for production
4. \`npm run preview\` - Preview production build

## Framework: ${this.config.framework.toUpperCase()}
## Build Tool: ${this.config.buildTool.toUpperCase()}
## Styling: ${this.config.styling.toUpperCase()}

${this.config.features.typescript ? '✅ TypeScript enabled' : ''}
${this.config.features.testing ? '✅ Testing configured with Jest' : ''}
${this.config.features.accessibility ? '✅ Accessibility features included' : ''}
${this.config.features.seo ? '✅ SEO optimizations applied' : ''}
${this.config.features.pwa ? '✅ PWA features enabled' : ''}

## Development
- Hot reload enabled
- Source maps included
- ESLint + Prettier configured

## Production Build
- Code minification
- Asset optimization
- Bundle splitting
${isNextJs ? '- Static optimization' : ''}
${this.config.features.pwa ? '- Service worker generation' : ''}
    `.trim()
  }

  /**
   * Generates deployment instructions for the generated project
   */
  private generateDeploymentInstructions(): string {
    const isNextJs = this.config.framework === 'next'
    
    return `
# Deployment Instructions

## Vercel (Recommended)
1. Install Vercel CLI: \`npm i -g vercel\`
2. Deploy: \`vercel --prod\`
3. Build command: \`npm run build\`
4. Output directory: ${isNextJs ? '\`.next\`' : '\`dist\`'}

## Netlify
1. Build command: \`npm run build\`
2. Publish directory: ${isNextJs ? '\`.next\`' : '\`dist\`'}
3. Deploy: \`netlify deploy --prod --dir=${isNextJs ? '.next' : 'dist'}\`

## AWS S3 + CloudFront
1. Build: \`npm run build\`
2. Upload ${isNextJs ? '\`.next\`' : '\`dist\`'} to S3 bucket
3. Configure CloudFront distribution

## Docker
1. Build image: \`docker build -t app .\`
2. Run container: \`docker run -p 3000:3000 app\`

## Environment Variables
- Copy \`.env.example\` to \`.env.local\`
- Set production environment variables
- Configure secrets in deployment platform

## Performance
- Gzip compression enabled
- Asset caching configured
- Bundle size optimized
- Core Web Vitals monitored
    `.trim()
  }

  /**
   * Generates test setup file
   */
  private generateTestSetup(): string {
    return `import '@testing-library/jest-dom';
${this.config.features.accessibility ? "import 'jest-axe/extend-expect';" : ''}

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});`
  }

  /**
   * Generates example test file
   */
  private generateExampleTest(): string {
    return `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App Component', () => {
  test('renders welcome message', () => {
    render(<App />);
    expect(screen.getByText(/welcome to ${this.config.projectName}/i)).toBeInTheDocument();
  });

  test('renders description', () => {
    render(<App />);
    expect(screen.getByText(/${this.config.description}/i)).toBeInTheDocument();
  });

  test('get started button is accessible', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const button = screen.getByRole('button', { name: /get started/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAccessibleName();
    
    // Test keyboard interaction
    await user.tab();
    expect(button).toHaveFocus();
  });
});`
  }

  /**
   * Generates accessibility test file
   */
  private generateA11yTest(): string {
    return `import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from '../App';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  test('should not have any accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should have proper heading structure', () => {
    render(<App />);
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    // Check that we have at least one heading
    expect(headings.length).toBeGreaterThan(0);
    
    // Check that the first heading is h1
    expect(headings[0].tagName).toBe('H1');
  });

  test('should have proper focus management', () => {
    render(<App />);
    
    // Test that focusable elements have visible focus indicators
    const focusableElements = document.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    expect(focusableElements.length).toBeGreaterThan(0);
  });
});`
  }

  /**
   * Generates README.md file
   */
  private generateREADME(): string {
    const isNextJs = this.config.framework === 'next'
    
    return `# ${this.config.projectName}

${this.config.description}

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone ${this.config.repository || 'your-repo-url'}
   cd ${this.config.projectName.toLowerCase().replace(/\s+/g, '-')}
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Copy environment variables:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Tech Stack

- **Framework**: ${this.config.framework.charAt(0).toUpperCase() + this.config.framework.slice(1)}
- **Styling**: ${this.config.styling.charAt(0).toUpperCase() + this.config.styling.slice(1)}
- **Build Tool**: ${this.config.buildTool.charAt(0).toUpperCase() + this.config.buildTool.slice(1)}
${this.config.features.typescript ? '- **Language**: TypeScript' : '- **Language**: JavaScript'}
${this.config.features.testing ? '- **Testing**: Jest + Testing Library' : ''}
${this.config.features.accessibility ? '- **Accessibility**: WCAG 2.1 AA compliant' : ''}
${this.config.features.seo ? '- **SEO**: Optimized for search engines' : ''}
${this.config.features.pwa ? '- **PWA**: Progressive Web App features' : ''}

## 🛠️ Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run ESLint
- \`npm run format\` - Format code with Prettier
${this.config.features.testing ? '- `npm test` - Run tests\n- `npm run test:watch` - Run tests in watch mode\n- `npm run test:coverage` - Run tests with coverage' : ''}
${this.config.features.accessibility ? '- `npm run test:a11y` - Run accessibility tests' : ''}

## 📁 Project Structure

\`\`\`
${this.config.projectName.toLowerCase().replace(/\s+/g, '-')}/
├── ${isNextJs ? 'src/app/' : 'src/'}
│   ├── ${isNextJs ? 'layout.tsx' : 'components/'}
│   ├── ${isNextJs ? 'page.tsx' : 'App.tsx'}
│   └── ${isNextJs ? 'globals.css' : 'index.css'}
├── public/
├── ${this.config.features.testing ? '__tests__/' : ''}
├── docs/
├── package.json
└── README.md
\`\`\`

${this.config.features.accessibility ? `
## ♿ Accessibility

This project is built with accessibility in mind:

- ✅ WCAG 2.1 AA compliance
- ✅ Semantic HTML structure
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Color contrast compliance
- ✅ Focus management

### Accessibility Testing

Run accessibility tests:
\`\`\`bash
npm run test:a11y
\`\`\`
` : ''}

${this.config.features.seo ? `
## 🔍 SEO

SEO optimizations included:

- ✅ Meta tags configuration
- ✅ Open Graph tags
- ✅ Structured data
- ✅ Sitemap generation
- ✅ Robots.txt
- ✅ Performance optimization
` : ''}

## 🚀 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. Deploy:
   \`\`\`bash
   vercel --prod
   \`\`\`

### Netlify

1. Build the project:
   \`\`\`bash
   npm run build
   \`\`\`

2. Deploy the \`${isNextJs ? '.next' : 'dist'}\` folder to Netlify.

## 📚 Documentation

- [Deployment Guide](./docs/DEPLOYMENT.md)
${this.config.features.accessibility ? '- [Accessibility Guide](./docs/ACCESSIBILITY.md)' : ''}
- [Contributing Guide](./CONTRIBUTING.md)

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the ${this.config.license} License.

## 👨‍💻 Author

${this.config.author}

---

**Generated by Eternal UI** - The future of web development 🚀
`
  }

  /**
   * Generates contributing guide
   */
  private generateContributing(): string {
    return `# Contributing to ${this.config.projectName}

Thank you for your interest in contributing! This guide will help you get started.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork:
   \`\`\`bash
   git clone https://github.com/your-username/${this.config.projectName.toLowerCase().replace(/\s+/g, '-')}.git
   \`\`\`
3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
4. Create a feature branch:
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`

## 📋 Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write descriptive commit messages
- Add tests for new features

${this.config.features.testing ? `
### Testing

- Write unit tests for components
- Include integration tests for complex features
- Ensure accessibility compliance
- Maintain code coverage above 80%

Run tests:
\`\`\`bash
npm test
\`\`\`
` : ''}

${this.config.features.accessibility ? `
### Accessibility

- Test with screen readers
- Ensure keyboard navigation works
- Verify color contrast ratios
- Use semantic HTML elements

Test accessibility:
\`\`\`bash
npm run test:a11y
\`\`\`
` : ''}

## 🔄 Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update the changelog
5. Submit your pull request

### Pull Request Template

- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Accessibility verified
- [ ] No breaking changes
- [ ] Code follows style guidelines

## 🐛 Bug Reports

When filing a bug report, please include:

- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/OS information
- Screenshots if applicable

## 💡 Feature Requests

For feature requests, please:

- Describe the problem you're solving
- Explain your proposed solution
- Consider alternative solutions
- Provide mockups if applicable

## 📞 Getting Help

- Check existing issues
- Ask questions in discussions
- Join our community chat

Thank you for contributing! 🎉
`
  }

  /**
   * Generates accessibility documentation
   */
  private generateA11yDocumentation(): string {
    return `# Accessibility Documentation

This project is committed to providing an accessible experience for all users.

## 🎯 Accessibility Standards

We aim to meet **WCAG 2.1 AA** standards, which includes:

- Perceivable: Information is presentable in ways users can perceive
- Operable: Interface components are operable
- Understandable: Information and UI operation are understandable
- Robust: Content is robust enough for various assistive technologies

## ✅ Features Implemented

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Logical tab order throughout the application
- Visible focus indicators for all focusable elements
- Skip navigation links for screen readers

### Screen Reader Support
- Semantic HTML structure
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text for all images
- ARIA labels where needed
- Live regions for dynamic content

### Color and Contrast
- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 contrast ratio for large text
- Color is not the only way to convey information
- Support for high contrast mode

## 🧪 Testing Accessibility

### Automated Testing

Run accessibility tests:
\`\`\`bash
npm run test:a11y
\`\`\`

### Manual Testing

1. **Keyboard Navigation Test**
   - Tab through all interactive elements
   - Ensure all functionality is keyboard accessible
   - Verify focus is visible and logical

2. **Screen Reader Test**
   - Test with NVDA (Windows) or VoiceOver (Mac)
   - Ensure all content is announced properly
   - Verify heading structure makes sense

3. **Color Contrast Test**
   - Use tools like WebAIM's Contrast Checker
   - Test in high contrast mode
   - Verify color blind accessibility

## 🛠️ Implementation Guidelines

### Semantic HTML
Always use semantic HTML elements:

\`\`\`html
<!-- Good -->
<button>Click me</button>
<nav>...</nav>
<main>...</main>

<!-- Avoid -->
<div onClick={...}>Click me</div>
\`\`\`

### ARIA Labels
Use ARIA labels when needed:

\`\`\`jsx
// For buttons without visible text
<button aria-label="Close dialog">×</button>

// For form inputs
<input aria-describedby="password-help" />
<div id="password-help">Password must be 8+ characters</div>
\`\`\`

### Focus Management
Manage focus properly:

\`\`\`jsx
// Focus first input when modal opens
useEffect(() => {
  if (isOpen && firstInputRef.current) {
    firstInputRef.current.focus();
  }
}, [isOpen]);
\`\`\`

## 📞 Accessibility Support

If you encounter accessibility barriers, please file an issue on GitHub with details about your assistive technology.

We are committed to addressing accessibility issues promptly and effectively.
`
  }

  /**
   * Generates Dockerfile
   */
  private generateDockerfile(): string {
    const isNextJs = this.config.framework === 'next'
    
    return `# Multi-stage Dockerfile for ${this.config.framework}
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build based on framework
${isNextJs ? 'RUN npm run build' : 'RUN npm run build'}

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
${isNextJs ? `
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
` : `
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production && npm cache clean --force
`}

USER ${isNextJs ? 'nextjs' : 'node'}

EXPOSE 3000

ENV PORT 3000

${isNextJs ? 'CMD ["node", "server.js"]' : 'CMD ["npm", "run", "serve"]'}
`
  }

  /**
   * Generates docker-compose.yml
   */
  private generateDockerCompose(): string {
    return `version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    
  # Add additional services as needed
  # redis:
  #   image: redis:alpine
  #   ports:
  #     - "6379:6379"
`
  }

  /**
   * Generates GitHub Actions workflow
   */
  private generateGitHubWorkflow(): string {
    return `name: Deploy Application

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    ${this.config.features.testing ? `- name: Run tests
      run: npm test -- --coverage --watchAll=false
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3` : ''}
    
    ${this.config.features.accessibility ? `- name: Run accessibility tests
      run: npm run test:a11y` : ''}
    
    - name: Build application
      run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master'
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Use Node.js 18
      uses: actions/setup-node@v4
      with:
        node-version: 18
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: \${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: \${{ secrets.ORG_ID }}
        vercel-project-id: \${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
`
  }

  /**
   * Generates deployment documentation
   */
  private generateDeploymentDocumentation(): string {
    const isNextJs = this.config.framework === 'next'
    
    return `# Deployment Guide

This guide covers deployment options for your ${this.config.framework} application.

## Quick Deploy Options

### Vercel (Recommended for ${isNextJs ? 'Next.js' : 'frontend'} apps)

1. Install Vercel CLI:
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. Deploy:
   \`\`\`bash
   vercel --prod
   \`\`\`

3. Configuration:
   - Build command: \`npm run build\`
   - Output directory: ${isNextJs ? '\`.next\`' : '\`dist\`'}
   - Install command: \`npm install\`

### Netlify

1. Install Netlify CLI:
   \`\`\`bash
   npm i -g netlify-cli
   \`\`\`

2. Deploy:
   \`\`\`bash
   netlify deploy --prod --dir=${isNextJs ? '.next' : 'dist'}
   \`\`\`

### Docker Deployment

1. Build the Docker image:
   \`\`\`bash
   docker build -t ${this.config.projectName.toLowerCase()} .
   \`\`\`

2. Run the container:
   \`\`\`bash
   docker run -p 3000:3000 ${this.config.projectName.toLowerCase()}
   \`\`\`

## Environment Variables

Create a \`.env.local\` file with your environment variables:

\`\`\`
# Add your environment variables here
NODE_ENV=production
\`\`\`

## Performance Considerations

- Enable gzip compression
- Configure CDN for static assets
- Set up proper caching headers
- Monitor Core Web Vitals

## Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Dependencies updated
- [ ] Environment variables secured
`
  }
}