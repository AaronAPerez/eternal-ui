// Multi-framework code generator
export interface CodeGenerationOptions {
  framework: 'react' | 'vue' | 'angular' | 'html';
  components: CanvasComponent[];
  includeStyles?: boolean;
  includeImports?: boolean;
  typescript?: boolean;
}

export class CodeGenerator {
  generateCode(options: CodeGenerationOptions): string {
    const { framework, components } = options;
    
    switch (framework) {
      case 'react':
        return this.generateReactCode(components, options);
      case 'vue':
        return this.generateVueCode(components, options);
      case 'angular':
        return this.generateAngularCode(components, options);
      case 'html':
        return this.generateHTMLCode(components, options);
      default:
        throw new Error(`Unsupported framework: ${framework}`);
    }
  }

  private generateReactCode(components: CanvasComponent[], options: CodeGenerationOptions): string {
    const { typescript = true, includeImports = true } = options;
    
    const imports = includeImports ? [
      typescript ? 'import React from "react";' : 'import React from "react";',
      'import { Button, Card, Input } from "@eternal-ui/react";'
    ] : [];

    const componentJSX = components.map(comp => {
      const props = this.generateProps(comp.props);
      const position = `style={{ position: 'absolute', left: '${comp.position.x}px', top: '${comp.position.y}px' }}`;
      
      return `      <${this.getComponentName(comp.componentId)}${props} ${position} />`;
    }).join('\n');

    return `${imports.join('\n')}

export default function GeneratedComponent() {
  return (
    <div className="relative min-h-screen">
${componentJSX}
    </div>
  );
}`;
  }

  private generateVueCode(components: CanvasComponent[], options: CodeGenerationOptions): string {
    const componentTemplate = components.map(comp => {
      const props = this.generateVueProps(comp.props);
      const position = `:style="{ position: 'absolute', left: '${comp.position.x}px', top: '${comp.position.y}px' }"`;
      
      return `    <${this.getComponentName(comp.componentId)}${props} ${position} />`;
    }).join('\n');

    return `<template>
  <div class="relative min-h-screen">
${componentTemplate}
  </div>
</template>

<script>
import { Button, Card, Input } from '@eternal-ui/vue';

export default {
  name: 'GeneratedComponent',
  components: {
    Button,
    Card,
    Input
  }
}
</script>`;
  }

  private generateAngularCode(components: CanvasComponent[], options: CodeGenerationOptions): string {
    const componentTemplate = components.map(comp => {
      const props = this.generateAngularProps(comp.props);
      const position = `[ngStyle]="{ position: 'absolute', left: '${comp.position.x}px', top: '${comp.position.y}px' }"`;
      
      return `  <${this.getComponentName(comp.componentId)}${props} ${position}></${this.getComponentName(comp.componentId)}>`;
    }).join('\n');

    return `<div class="relative min-h-screen">
${componentTemplate}
</div>`;
  }

  private generateHTMLCode(components: CanvasComponent[], options: CodeGenerationOptions): string {
    const componentHTML = components.map(comp => {
      const props = this.generateHTMLProps(comp.props);
      const position = `style="position: absolute; left: ${comp.position.x}px; top: ${comp.position.y}px;"`;
      
      return `  <div class="${this.getComponentName(comp.componentId)}"${props} ${position}>
    ${comp.props.children || comp.props.text || 'Component'}
  </div>`;
    }).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Component</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="relative min-h-screen">
${componentHTML}
  </div>
</body>
</html>`;
  }

  private generateProps(props: Record<string, any>): string {
    return Object.entries(props)
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? ` ${key}` : '';
        }
        return ` ${key}="${value}"`;
      })
      .join('');
  }

  private generateVueProps(props: Record<string, any>): string {
    return Object.entries(props)
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? ` :${key}="true"` : '';
        }
        return ` :${key}="${JSON.stringify(value)}"`;
      })
      .join('');
    private generateAngularProps(props: Record<string, any>): string {
    return Object.entries(props)
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? ` [${key}]="true"` : '';
        }
        return ` [${key}]="${JSON.stringify(value)}"`;
      })
      .join('');
  }

  private generateHTMLProps(props: Record<string, any>): string {
    return Object.entries(props)
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(([key, value]) => ` ${key}="${value}"`)
      .join('');
  }

  private getComponentName(componentId: string): string {
    const mapping = {
      'button-primary': 'Button',
      'button-secondary': 'Button',
      'button-outline': 'Button',
      'input-text': 'Input',
      'input-email': 'Input',
      'card': 'Card',
      'navbar': 'Navbar',
      'hero': 'HeroSection'
    };
    return mapping[componentId] || 'div';
  }
}

// Usage example
export const codeGenerator = new CodeGenerator();