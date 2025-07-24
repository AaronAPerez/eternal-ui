import { StudioElement } from "@/components/studio/StudioProvider";
import { PerformanceMetrics } from "../performance/performanceMonitor";

export class ReactCodeGenerator extends CodeGeneratorBase {
  generateComponent(element: StudioElement): CodeFile {
    const componentName = this.generateComponentName(element);
    const props = this.generateProps(element);
    const hasChildren = element.children && element.children.length > 0;

    const interfaceName = `${componentName}Props`;
    
    let code = '';

    // TypeScript interface (if enabled)
    if (this.options.typescript) {
      code += `interface ${interfaceName} {\n`;
      code += `  className?: string;\n`;
      code += `  style?: React.CSSProperties;\n`;
      
      // Add specific props based on element type
      Object.keys(props).forEach(key => {
        if (key !== 'className' && key !== 'style') {
          const value = props[key];
          const type = typeof value === 'string' ? 'string' : 
                      typeof value === 'number' ? 'number' : 
                      typeof value === 'boolean' ? 'boolean' : 'any';
          code += `  ${key}?: ${type};\n`;
        }
      });

      if (hasChildren) {
        code += `  children?: React.ReactNode;\n`;
      }
      
      code += `}\n\n`;
    }

    // React component
    const propsType = this.options.typescript ? `: React.FC<${interfaceName}>` : '';
    
    code += `export const ${componentName}${propsType} = ({\n`;
    code += `  className = "${props.className || ''}",\n`;
    code += `  style = {},\n`;
    
    Object.keys(props).forEach(key => {
      if (key !== 'className' && key !== 'style') {
        const value = props[key];
        const defaultValue = typeof value === 'string' ? `"${value}"` : value;
        code += `  ${key} = ${defaultValue},\n`;
      }
    });

    if (hasChildren) {
      code += `  children,\n`;
    }
    
    code += `}) => {\n`;
    code += `  return (\n`;
    code += this.generateJSX(element, 2);
    code += `  );\n`;
    code += `};\n`;

    return {
      name: `${componentName}.tsx`,
      path: `components/${componentName}.tsx`,
      content: this.optimizeCode(code),
      type: 'component'
    };
  }

  private generateJSX(element: StudioElement, indent: number = 0): string {
    const indentStr = '  '.repeat(indent);
    const tagName = this.getHTMLTag(element.type);
    
    let jsx = `${indentStr}<${tagName}`;
    
    // Add className
    if (element.props.className) {
      jsx += ` className={\`\${className} ${element.props.className}\`}`;
    } else {
      jsx += ` className={className}`;
    }
    
    // Add style
    jsx += ` style={{...style, ...${JSON.stringify(element.style || {})}}}`;
    
    // Add other props
    Object.entries(element.props).forEach(([key, value]) => {
      if (key !== 'className' && key !== 'children' && key !== 'text') {
        if (typeof value === 'string') {
          jsx += ` ${key}="${value}"`;
        } else {
          jsx += ` ${key}={${key}}`;
        }
      }
    });
    
    jsx += `>\n`;
    
    // Add content
    if (element.props.text) {
      jsx += `${indentStr}  {${element.props.text}}\n`;
    }
    
    if (element.children && element.children.length > 0) {
      jsx += `${indentStr}  {children}\n`;
    }
    
    jsx += `${indentStr}</${tagName}>\n`;
    
    return jsx;
  }

  private getHTMLTag(elementType: string): string {
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

  generateProject(elements: StudioElement[]): GeneratedCodeOutput {
    const files: CodeFile[] = [];
    
    // Generate individual components
    elements.forEach(element => {
      files.push(this.generateComponent(element));
    });
    
    // Generate main App component
    files.push(this.generateAppComponent(elements));
    
    // Generate package.json
    files.push(this.generatePackageJson());
    
    // Generate styles if needed
    if (this.options.styling === 'css-modules') {
      files.push(...this.generateStyles(elements));
    }
    
    return {
      files,
      dependencies: this.getRequiredDependencies(),
      devDependencies: this.getDevDependencies(),
      scripts: this.getScripts(),
      readme: this.generateReadme(),
      metadata: {
        framework: 'React',
        bundleSize: this.estimateBundleSize(files),
        performance: this.analyzePerformance(elements)
      }
    };
  }

  private generateAppComponent(elements: StudioElement[]): CodeFile {
    const imports = elements.map(el => {
      const componentName = this.generateComponentName(el);
      return `import { ${componentName} } from './components/${componentName}';`;
    }).join('\n');

    const components = elements.map(el => {
      const componentName = this.generateComponentName(el);
      return `      <${componentName} />`;
    }).join('\n');

    const code = `${imports}

export const App${this.options.typescript ? ': React.FC' : ''} = () => {
  return (
    <div className="app">
${components}
    </div>
  );
};`;

    return {
      name: 'App.tsx',
      path: 'App.tsx',
      content: code,
      type: 'component'
    };
  }

  private generatePackageJson(): CodeFile {
    const packageJson = {
      name: 'eternal-ui-generated-project',
      version: '1.0.0',
      private: true,
      dependencies: {
        'react': '^18.2.0',
        'react-dom': '^18.2.0',
        ...(this.options.styling === 'tailwind' && {
          'tailwindcss': '^3.3.0',
          'autoprefixer': '^10.4.14',
          'postcss': '^8.4.24'
        })
      },
      devDependencies: {
        ...(this.options.typescript && {
          '@types/react': '^18.2.0',
          '@types/react-dom': '^18.2.0',
          'typescript': '^5.0.0'
        }),
        'vite': '^4.4.0',
        '@vitejs/plugin-react': '^4.0.0'
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

  generateStyles(elements: StudioElement[]): CodeFile[] {
    // Implementation for CSS modules, styled-components, etc.
    return [];
  }

  private getRequiredDependencies(): string[] {
    return ['react', 'react-dom'];
  }

  private getDevDependencies(): string[] {
    const deps = ['vite', '@vitejs/plugin-react'];
    if (this.options.typescript) {
      deps.push('typescript', '@types/react', '@types/react-dom');
    }
    return deps;
  }

  private getScripts(): Record<string, string> {
    return {
      'dev': 'vite',
      'build': 'vite build',
      'preview': 'vite preview'
    };
  }

  private generateReadme(): string {
    return `# Generated Project

This project was generated by Eternal UI Studio.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Project Structure

- \`components/\` - Generated React components
- \`App.tsx\` - Main application component

## Technologies Used

- React ${this.options.typescript ? '+ TypeScript' : ''}
- ${this.options.styling === 'tailwind' ? 'Tailwind CSS' : 'CSS'}
- Vite (build tool)

Generated on: ${new Date().toISOString()}
`;
  }

  private estimateBundleSize(files: CodeFile[]): string {
    const totalSize = files.reduce((acc, file) => acc + file.content.length, 0);
    return `${(totalSize / 1024).toFixed(1)}KB`;
  }

  private analyzePerformance(elements: StudioElement[]): PerformanceMetrics {
    return {
      componentCount: elements.length,
      estimatedRenderTime: `${elements.length * 0.5}ms`,
      memoryUsage: `${elements.length * 2}KB`,
      bundleSize: '45KB'
    };
  }
}