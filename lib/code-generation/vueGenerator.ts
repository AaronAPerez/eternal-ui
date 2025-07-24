class VueCodeGenerator extends CodeGeneratorBase {
  generateComponent(element: StudioElement): CodeFile {
    const componentName = this.generateComponentName(element);
    const props = this.generateProps(element);

    let code = '<template>\n';
    code += this.generateTemplate(element, 1);
    code += '</template>\n\n';

    // Script section
    code += '<script';
    if (this.options.typescript) {
      code += ' setup lang="ts"';
    } else {
      code += ' setup';
    }
    code += '>\n';

    // Props definition
    if (Object.keys(props).length > 0) {
      if (this.options.typescript) {
        code += 'interface Props {\n';
        Object.entries(props).forEach(([key, value]) => {
          const type = typeof value === 'string' ? 'string' : 
                      typeof value === 'number' ? 'number' : 
                      typeof value === 'boolean' ? 'boolean' : 'any';
          code += `  ${key}?: ${type};\n`;
        });
        code += '}\n\n';
        code += 'const props = withDefaults(defineProps<Props>(), {\n';
      } else {
        code += 'const props = defineProps({\n';
      }

      Object.entries(props).forEach(([key, value]) => {
        if (this.options.typescript) {
          code += `  ${key}: ${JSON.stringify(value)},\n`;
        } else {
          const type = typeof value === 'string' ? 'String' : 
                      typeof value === 'number' ? 'Number' : 
                      typeof value === 'boolean' ? 'Boolean' : 'Object';
          code += `  ${key}: {\n    type: ${type},\n    default: ${JSON.stringify(value)}\n  },\n`;
        }
      });

      if (this.options.typescript) {
        code += '});\n';
      } else {
        code += '});\n';
      }
    }

    code += '</script>\n\n';

    // Style section
    if (this.options.styling === 'css-modules') {
      code += '<style module>\n';
      code += this.generateVueStyles(element);
      code += '</style>\n';
    }

    return {
      name: `${componentName}.vue`,
      path: `components/${componentName}.vue`,
      content: this.optimizeCode(code),
      type: 'component'
    };
  }

  private generateTemplate(element: StudioElement, indent: number): string {
    const indentStr = '  '.repeat(indent);
    const tagName = this.getHTMLTag(element.type);
    
    let template = `${indentStr}<${tagName}`;
    
    // Add class binding
    if (element.props.className) {
      template += ` :class="['${element.props.className}', props.className]"`;
    }
    
    // Add style binding
    if (element.style) {
      template += ` :style="{ ...${JSON.stringify(element.style)}, ...props.style }"`;
    }
    
    // Add other props
    Object.entries(element.props).forEach(([key, value]) => {
      if (key !== 'className' && key !== 'children' && key !== 'text') {
        template += ` :${key}="props.${key}"`;
      }
    });
    
    template += '>\n';
    
    // Add content
    if (element.props.text) {
      template += `${indentStr}  {{ props.${element.props.text} || "${element.props.text}" }}\n`;
    }
    
    template += `${indentStr}</${tagName}>\n`;
    
    return template;
  }

  private getHTMLTag(elementType: string): string {
    // Same as React generator
    const tagMap: Record<string, string> = {
      'text': 'span',
      'heading': 'h1',
      'button': 'button',
      'input': 'input',
      'textarea': 'textarea',
      'image': 'img',
      'container': 'div',
      'section': 'section',
      'card': 'div',
      'navbar': 'nav',
      'grid': 'div',
      'flexbox': 'div'
    };
    
    return tagMap[elementType] || 'div';
  }

  private generateVueStyles(element: StudioElement): string {
    return `/* Styles for ${element.type} component */\n`;
  }

  generateProject(elements: StudioElement[]): GeneratedCodeOutput {
    const files: CodeFile[] = [];
    
    // Generate components
    elements.forEach(element => {
      files.push(this.generateComponent(element));
    });
    
    // Generate App.vue
    files.push(this.generateAppVue(elements));
    
    // Generate package.json
    files.push(this.generateVuePackageJson());
    
    // Generate vite.config
    files.push(this.generateViteConfig());
    
    return {
      files,
      dependencies: ['vue'],
      devDependencies: ['@vitejs/plugin-vue', 'vite'],
      scripts: {
        'dev': 'vite',
        'build': 'vite build',
        'preview': 'vite preview'
      },
      readme: this.generateVueReadme(),
      metadata: {
        framework: 'Vue',
        bundleSize: this.estimateBundleSize(files),
        performance: this.analyzePerformance(elements)
      }
    };
  }

  private generateAppVue(elements: StudioElement[]): CodeFile {
    const imports = elements.map(el => {
      const componentName = this.generateComponentName(el);
      return `import ${componentName} from './components/${componentName}.vue';`;
    }).join('\n');

    const components = elements.map(el => {
      const componentName = this.generateComponentName(el);
      return `    <${componentName} />`;
    }).join('\n');

    const code = `<template>
  <div class="app">
${components}
  </div>
</template>

<script setup${this.options.typescript ? ' lang="ts"' : ''}>
${imports}
</script>`;

    return {
      name: 'App.vue',
      path: 'App.vue',
      content: code,
      type: 'component'
    };
  }

  private generateVuePackageJson(): CodeFile {
    const packageJson = {
      name: 'eternal-ui-vue-project',
      version: '1.0.0',
      private: true,
      dependencies: {
        'vue': '^3.3.0'
      },
      devDependencies: {
        '@vitejs/plugin-vue': '^4.0.0',
        'vite': '^4.4.0',
        ...(this.options.typescript && {
          'vue-tsc': '^1.8.0',
          'typescript': '^5.0.0'
        })
      },
      scripts: {
        'dev': 'vite',
        'build': 'vite build',
        'preview': 'vite preview'
      }
    };

    return {
      name: 'package.json',
      path: 'package.json',
      content: JSON.stringify(packageJson, null, 2),
      type: 'config'
    };
  }

  private generateViteConfig(): CodeFile {
    const config = `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
})`;

    return {
      name: 'vite.config.js',
      path: 'vite.config.js',
      content: config,
      type: 'config'
    };
  }

  private generateVueReadme(): string {
    return `# Vue Generated Project

This Vue.js project was generated by Eternal UI Studio.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Technologies Used

- Vue.js 3 ${this.options.typescript ? '+ TypeScript' : ''}
- Composition API
- Vite

Generated on: ${new Date().toISOString()}
`;
  }

  generateStyles(elements: StudioElement[]): CodeFile[] {
    return [];
  }

  private estimateBundleSize(files: CodeFile[]): string {
    const totalSize = files.reduce((acc, file) => acc + file.content.length, 0);
    return `${(totalSize / 1024).toFixed(1)}KB`;
  }

  private analyzePerformance(elements: StudioElement[]): PerformanceMetrics {
    return {
      componentCount: elements.length,
      estimatedRenderTime: `${elements.length * 0.3}ms`,
      memoryUsage: `${elements.length * 1.5}KB`,
      bundleSize: '35KB'
    };
  }
}

