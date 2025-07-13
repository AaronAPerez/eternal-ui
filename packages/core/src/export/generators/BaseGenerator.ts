/**
 * Base Generator Class
 * 
 * Abstract base class for all framework generators
 */

import { ComponentNode, ExportConfig, GeneratedFile } from '../../types/types'

export abstract class BaseGenerator {
  /**
   * Main generate method that each framework must implement
   */
  abstract generate(
    components: ComponentNode[], 
    config: ExportConfig
  ): Promise<GeneratedFile[]>

  /**
   * Converts string to PascalCase
   */
  protected pascalCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
      .replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  }

  /**
   * Converts string to camelCase
   */
  protected camelCase(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1)
      .replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  }

  /**
   * Gets semantic HTML tag for component type
   */
  protected getSemanticHTMLTag(type: string): string {
    const tagMap: Record<string, string> = {
      'button': 'button',
      'link': 'a',
      'heading': 'h1',
      'paragraph': 'p',
      'image': 'img',
      'section': 'section',
      'article': 'article',
      'header': 'header',
      'footer': 'footer',
      'nav': 'nav',
      'main': 'main'
    }
    return tagMap[type] || 'div'
  }

  /**
   * Infers TypeScript type from value
   */
  protected inferTypeScriptType(value: any): string {
    if (typeof value === 'string') return 'string'
    if (typeof value === 'number') return 'number'
    if (typeof value === 'boolean') return 'boolean'
    if (Array.isArray(value)) return 'string[]'
    if (typeof value === 'function') return '() => void'
    return 'any'
  }

  /**
   * Generates prop description for documentation
   */
  protected generatePropDescription(key: string, value: any): string {
    const descriptions: Record<string, string> = {
      'title': 'The main heading text',
      'description': 'Descriptive text content',
      'variant': 'Visual style variant',
      'size': 'Component size option',
      'disabled': 'Whether the component is disabled',
      'onClick': 'Click event handler',
      'children': 'Child elements or content'
    }
    return descriptions[key] || `${key} property`
  }

  /**
   * Checks if component needs state
   */
  protected componentNeedsState(component: ComponentNode): boolean {
    return !!component.props?.onClick || !!component.props?.onChange
  }

  /**
   * Generates className string
   */
  protected generateClassName(component: ComponentNode, config: ExportConfig): string {
    return component.styles?.className || ''
  }

  /**
   * Generates accessibility props string
   */
  protected generateAccessibilityProps(component: ComponentNode): string {
    const props = component.accessibility || {}
    return Object.entries(props)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ')
  }

  /**
   * Generates children JSX
   */
  protected generateChildrenJSX(component: ComponentNode, config: ExportConfig): string {
    if (component.children.length === 0) {
      return component.props?.text || component.props?.children || ''
    }

    return component.children
      .map(child => `<${this.pascalCase(child.type)} />`)
      .join('\n      ')
  }
}