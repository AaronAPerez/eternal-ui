import { StudioElement } from "@/components/studio/StudioProvider";
import { PerformanceMetrics } from "../performance/performanceMonitor";

interface CodeGenerationOptions {
  framework: 'react' | 'vue' | 'angular' | 'svelte' | 'html';
  typescript: boolean;
  styling: 'tailwind' | 'css-modules' | 'styled-components' | 'inline';
  formatting: 'prettier' | 'none';
  minify: boolean;
  includeTests: boolean;
}

interface GeneratedCodeOutput {
  files: CodeFile[];
  dependencies: string[];
  devDependencies: string[];
  scripts: Record<string, string>;
  readme: string;
  metadata: {
    framework: string;
    bundleSize: string;
    performance: PerformanceMetrics;
  };
}

interface CodeFile {
  name: string;
  path: string;
  content: string;
  type: 'component' | 'style' | 'test' | 'config' | 'utility';
}

abstract class CodeGeneratorBase {
  protected options: CodeGenerationOptions;

  constructor(options: CodeGenerationOptions) {
    this.options = options;
  }

  abstract generateComponent(element: StudioElement): CodeFile;
  abstract generateStyles(elements: StudioElement[]): CodeFile[];
  abstract generateProject(elements: StudioElement[]): GeneratedCodeOutput;

  protected generateComponentName(element: StudioElement): string {
    const baseName = element.type.charAt(0).toUpperCase() + element.type.slice(1);
    return `${baseName}Component`;
  }

  protected generateProps(element: StudioElement): Record<string, any> {
    return {
      ...element.props,
      className: element.props.className || '',
      style: element.style || {}
    };
  }

  protected optimizeCode(code: string): string {
    if (this.options.minify) {
      // Basic minification - remove extra whitespace
      return code.replace(/\s+/g, ' ').trim();
    }
    return code;
  }
}
