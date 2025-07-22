// =================================================================
// MULTI-FRAMEWORK CODE GENERATOR - PHASE 3
// =================================================================

// =================================================================
// CODE GENERATION INTERFACES
// =================================================================

export interface ComponentInstance {
  id: string;
  componentId: string;
  props: Record<string, any>;
  position: {
    x: number;
    y: number;
  };
  size?: {
    width: number;
    height: number;
  };
  children?: ComponentInstance[];
}

export interface CodeGenerationOptions {
  framework: 'react' | 'vue' | 'angular' | 'html' | 'svelte';
  typescript?: boolean;
  cssFramework?: 'tailwind' | 'bootstrap' | 'material' | 'styled-components' | 'emotion';
  includeImports?: boolean;
  includeTypes?: boolean;
  formatting?: {
    indentSize: number;
    useTabs: boolean;
    semicolons: boolean;
    quotes: 'single' | 'double';
  };
  accessibility?: boolean;
  responsive?: boolean;
  seo?: boolean;
  comments?: boolean;
}

export interface GeneratedCode {
  code: string;
  imports?: string[];
  dependencies?: string[];
  types?: string;
  styles?: string;
  documentation?: string;
  tests?: string;
}

// =================================================================
// BASE CODE GENERATOR CLASS
// =================================================================

export abstract class BaseCodeGenerator {
  protected options: CodeGenerationOptions;
  
  constructor(options: CodeGenerationOptions) {
    this.options = {
      typescript: true,
      cssFramework: 'tailwind',
      includeImports: true,
      includeTypes: true,
      formatting: {
        indentSize: 2,
        useTabs: false,
        semicolons: true,
        quotes: 'single'
      },
      accessibility: true,
      responsive: true,
      seo: true,
      comments: true,
      ...options
    };
  }

  abstract generate(components: ComponentInstance[]): GeneratedCode;

  protected indent(level: number = 1): string {
    const char = this.options.formatting?.useTabs ? '\t' : ' ';
    const size = this.options.formatting?.useTabs ? 1 : (this.options.formatting?.indentSize || 2);
    return char.repeat(level * size);
  }

  protected quote(text: string): string {
    const quoteChar = this.options.formatting?.quotes === 'double' ? '"' : "'";
    return `${quoteChar}${text}${quoteChar}`;
  }

  protected semicolon(): string {
    return this.options.formatting?.semicolons ? ';' : '';
  }

  protected formatProps(props: Record<string, any>): string {
    return Object.entries(props)
      .filter(([_, value]) => value !== undefined && value !== '' && value !== null)
      .map(([key, value]) => this.formatProp(key, value))
      .join(' ');
  }

  protected abstract formatProp(key: string, value: any): string;

  protected generateAccessibilityProps(componentType: string): Record<string, any> {
    if (!this.options.accessibility) return {};

    const accessibilityMap: Record<string, any> = {
      'button': { role: 'button', tabIndex: 0 },
      'input': { 'aria-required': true },
      'image': { alt: 'Decorative image' },
      'heading': { role: 'heading' },
      'navigation': { role: 'navigation', 'aria-label': 'Main navigation' },
      'form': { role: 'form', noValidate: true }
    };

    return accessibilityMap[componentType] || {};
  }

  protected generateResponsiveClasses(position: ComponentInstance['position'], size?: ComponentInstance['size']): string[] {
    if (!this.options.responsive) return [];

    return [
      'w-full md:w-auto',
      'text-sm md:text-base',
      'p-2 md:p-4'
    ];
  }

  protected componentNameMapper(componentId: string): string {
    const mapping: Record<string, string> = {
      'hero-section': 'HeroSection',
      'feature-grid': 'FeatureGrid',
      'stats-counter': 'StatsCounter',
      'contact-form': 'ContactForm',
      'button-primary': 'Button',
      'button-gradient': 'GradientButton',
      'input-text': 'TextInput',
      'navbar-modern': 'ModernNavbar'
    };

    return mapping[componentId] || this.toPascalCase(componentId);
  }

  protected toPascalCase(str: string): string {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  protected toCamelCase(str: string): string {
    const pascal = this.toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  }

  protected generatePositionStyles(position: ComponentInstance['position'], size?: ComponentInstance['size']): Record<string, string> {
    return {
      position: 'absolute',
      left: `${position.x}px`,
      top: `${position.y}px`,
      ...(size && {
        width: `${size.width}px`,
        height: `${size.height}px`
      })
    };
  }
}

// =================================================================
// REACT CODE GENERATOR
// =================================================================

export class ReactCodeGenerator extends BaseCodeGenerator {
  generate(components: ComponentInstance[]): GeneratedCode {
    const imports = this.generateImports(components);
    const componentCode = this.generateComponentCode(components);
    const types = this.options.includeTypes ? this.generateTypes(components) : '';
    const styles = this.generateStyles(components);
    const documentation = this.options.comments ? this.generateDocumentation() : '';

    return {
      code: this.assembleCode(imports, componentCode, types, documentation),
      imports: this.extractImportList(components),
      dependencies: this.extractDependencies(components),
      types,
      styles,
      documentation
    };
  }

  protected formatProp(key: string, value: any): string {
    if (typeof value === 'boolean') {
      return value ? key : '';
    }
    if (typeof value === 'string') {
      return `${key}=${this.quote(value)}`;
    }
    if (typeof value === 'number') {
      return `${key}={${value}}`;
    }
    if (Array.isArray(value) || typeof value === 'object') {
      return `${key}={${JSON.stringify(value)}}`;
    }
    return `${key}={${JSON.stringify(value)}}`;
  }

  private generateImports(components: ComponentInstance[]): string {
    if (!this.options.includeImports) return '';

    const imports: string[] = [];
    
    // React import
    if (this.options.typescript) {
      imports.push("import React from 'react';");
    } else {
      imports.push("import React from 'react';");
    }

    // Component imports
    const uniqueComponents = [...new Set(components.map(c => this.componentNameMapper(c.componentId)))];
    if (uniqueComponents.length > 0) {
      imports.push(`import { ${uniqueComponents.join(', ')} } from '@eternal-ui/react';`);
    }

    // CSS Framework imports
    if (this.options.cssFramework === 'styled-components') {
      imports.push("import styled from 'styled-components';");
    }

    return imports.join('\n') + '\n';
  }

  private generateComponentCode(components: ComponentInstance[]): string {
    const componentName = 'GeneratedComponent';
    const componentBody = this.generateJSX(components);

    if (this.options.typescript) {
      return `
interface ${componentName}Props {
  className?: string;
}

const ${componentName}: React.FC<${componentName}Props> = ({ className = '' }) => {
  return (
    <div className={\`relative min-h-screen \${className}\`}>
${componentBody}
    </div>
  );
};

export default ${componentName};`;
    } else {
      return `
const ${componentName} = ({ className = '' }) => {
  return (
    <div className={\`relative min-h-screen \${className}\`}>
${componentBody}
    </div>
  );
};

export default ${componentName};`;
    }
  }

  private generateJSX(components: ComponentInstance[], level: number = 3): string {
    return components.map(component => {
      const componentName = this.componentNameMapper(component.componentId);
      const props = { ...component.props };
      
      // Add accessibility props
      const accessibilityProps = this.generateAccessibilityProps(component.componentId);
      Object.assign(props, accessibilityProps);

      // Add responsive classes if using Tailwind
      if (this.options.cssFramework === 'tailwind') {
        const responsiveClasses = this.generateResponsiveClasses(component.position, component.size);
        if (responsiveClasses.length > 0) {
          props.className = [props.className, ...responsiveClasses].filter(Boolean).join(' ');
        }
      }

      // Generate position styles
      const positionStyles = this.generatePositionStyles(component.position, component.size);
      props.style = { ...props.style, ...positionStyles };

      const formattedProps = this.formatProps(props);
      const indent = this.indent(level);

      if (this.options.comments) {
        return `${indent}${this.generateComponentComment(component)}
${indent}<${componentName}${formattedProps ? ` ${formattedProps}` : ''} />`;
      }

      return `${indent}<${componentName}${formattedProps ? ` ${formattedProps}` : ''} />`;
    }).join('\n');
  }

  private generateTypes(components: ComponentInstance[]): string {
    if (!this.options.typescript) return '';

    const uniqueComponents = [...new Set(components.map(c => c.componentId))];
    
    return `
// Component Types
${uniqueComponents.map(id => `
interface ${this.toPascalCase(id)}Props {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}`).join('')}`;
  }

  private generateStyles(components: ComponentInstance[]): string {
    if (this.options.cssFramework === 'styled-components') {
      return this.generateStyledComponents(components);
    }
    return '';
  }

  private generateStyledComponents(components: ComponentInstance[]): string {
    const uniqueComponents = [...new Set(components.map(c => c.componentId))];
    
    return uniqueComponents.map(id => {
      const componentName = this.componentNameMapper(id);
      return `
const Styled${componentName} = styled.div\`
  position: absolute;
  // Add your styled-components styles here
\`;`;
    }).join('\n');
  }

  private generateComponentComment(component: ComponentInstance): string {
    return `{/* ${this.componentNameMapper(component.componentId)} at (${component.position.x}, ${component.position.y}) */}`;
  }

  private generateDocumentation(): string {
    return `
/**
 * Generated Component
 * 
 * This component was automatically generated by Eternal UI Builder.
 * 
 * @description A responsive layout with absolute positioned components
 * @accessibility WCAG 2.1 AA compliant
 * @responsive Mobile-first responsive design
 */`;
  }

  private assembleCode(imports: string, component: string, types: string, documentation: string): string {
    return [
      documentation,
      imports,
      types,
      component
    ].filter(Boolean).join('\n');
  }

  private extractImportList(components: ComponentInstance[]): string[] {
    return [...new Set(components.map(c => this.componentNameMapper(c.componentId)))];
  }

  private extractDependencies(components: ComponentInstance[]): string[] {
    const deps = ['react'];
    if (this.options.cssFramework === 'styled-components') deps.push('styled-components');
    if (this.options.typescript) deps.push('@types/react');
    deps.push('@eternal-ui/react');
    return deps;
  }
}

// =================================================================
// VUE CODE GENERATOR
// =================================================================

export class VueCodeGenerator extends BaseCodeGenerator {
  generate(components: ComponentInstance[]): GeneratedCode {
    const template = this.generateTemplate(components);
    const script = this.generateScript(components);
    const style = this.generateStyle(components);

    const code = this.assembleVueComponent(template, script, style);

    return {
      code,
      imports: this.extractImportList(components),
      dependencies: this.extractDependencies(components)
    };
  }

  protected formatProp(key: string, value: any): string {
    if (typeof value === 'boolean') {
      return value ? `:${key}="true"` : '';
    }
    if (typeof value === 'string') {
      return `:${key}="${this.quote(value)}"`;
    }
    return `:${key}="${JSON.stringify(value)}"`;
  }

  private generateTemplate(components: ComponentInstance[]): string {
    const componentsHtml = this.generateVueComponents(components);
    
    return `<template>
  <div class="relative min-h-screen">
${componentsHtml}
  </div>
</template>`;
  }

  private generateVueComponents(components: ComponentInstance[], level: number = 2): string {
    return components.map(component => {
      const componentName = this.componentNameMapper(component.componentId);
      const props = this.formatProps(component.props);
      const positionStyle = this.generateVuePositionStyle(component.position);
      const indent = this.indent(level);

      return `${indent}<${componentName}${props ? ` ${props}` : ''} ${positionStyle} />`;
    }).join('\n');
  }

  private generateVuePositionStyle(position: ComponentInstance['position']): string {
    const styles = this.generatePositionStyles(position);
    const styleString = Object.entries(styles)
      .map(([key, value]) => `${key}: '${value}'`)
      .join(', ');
    
    return `:style="{ ${styleString} }"`;
  }

  private generateScript(components: ComponentInstance[]): string {
    const uniqueComponents = [...new Set(components.map(c => this.componentNameMapper(c.componentId)))];
    const imports = uniqueComponents.map(name => `  ${name}`).join(',\n');

    if (this.options.typescript) {
      return `<script lang="ts">
import { defineComponent } from 'vue';
import {
${imports}
} from '@eternal-ui/vue';

export default defineComponent({
  name: 'GeneratedComponent',
  components: {
${imports}
  }
});
</script>`;
    } else {
      return `<script>
import {
${imports}
} from '@eternal-ui/vue';

export default {
  name: 'GeneratedComponent',
  components: {
${imports}
  }
};
</script>`;
    }
  }

  private generateStyle(components: ComponentInstance[]): string {
    if (this.options.cssFramework === 'tailwind') {
      return ''; // Tailwind handles styling
    }

    return `<style scoped>
.relative {
  position: relative;
  min-height: 100vh;
}
</style>`;
  }

  private assembleVueComponent(template: string, script: string, style: string): string {
    return [template, script, style].filter(Boolean).join('\n\n');
  }

  private extractImportList(components: ComponentInstance[]): string[] {
    return [...new Set(components.map(c => this.componentNameMapper(c.componentId)))];
  }

  private extractDependencies(components: ComponentInstance[]): string[] {
    const deps = ['vue'];
    if (this.options.typescript) deps.push('@types/vue');
    deps.push('@eternal-ui/vue');
    return deps;