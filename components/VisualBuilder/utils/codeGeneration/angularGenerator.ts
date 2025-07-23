import { COMPONENT_LIBRARY } from '@/components/studio/ComponentLibrary/ComponentLibrary';
import { CanvasElement } from '../../types';

export const generateAngularCode = (elements: CanvasElement[]): string => {
  const generateElementTemplate = (element: CanvasElement, depth = 0): string => {
    const componentDef = COMPONENT_LIBRARY.find(c => c.id === element.component);
    if (!componentDef) return `<!-- Unknown component: ${element.component} -->`;
    
    const indent = '  '.repeat(depth + 2);
    const elementName = componentDef.name.toLowerCase().replace(/\s+/g, '-');
    
    // Convert props to Angular format
    const props = Object.entries(element.props)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => {
        if (typeof value === 'string') return `[${key}]="'${value}'"`;
        if (typeof value === 'boolean') return value ? `[${key}]="true"` : '';
        return `[${key}]="${JSON.stringify(value)}"`;
      })
      .filter(Boolean)
      .join(' ');
    
    const propsString = props ? ` ${props}` : '';
    const styleBinding = Object.keys(element.style).length > 0 
      ? ` [ngStyle]="${JSON.stringify(element.style).replace(/"/g, "'")}"`
      : '';
    
    const children = elements.filter(child => child.parent === element.id);
    
    if (children.length > 0) {
      const childrenTemplate = children
        .map(child => generateElementTemplate(child, depth + 1))
        .join('\n');
      
      return `${indent}<${elementName}${propsString}${styleBinding}>
${childrenTemplate}
${indent}</${elementName}>`;
    } else {
      return `${indent}<${elementName}${propsString}${styleBinding}></${elementName}>`;
    }
  };
  
  const rootElements = elements.filter(element => !element.parent);
  const template = rootElements
    .map(element => generateElementTemplate(element))
    .join('\n');
  
  return `import { Component } from '@angular/core';

@Component({
  selector: 'app-generated',
  template: \`
    <div class="generated-component">
${template}
    </div>
  \`,
  styleUrls: ['./generated.component.css']
})
export class GeneratedComponent {
  constructor() {}
  
  // Component logic
}`;
};
