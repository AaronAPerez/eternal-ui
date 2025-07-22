import { COMPONENT_LIBRARY } from '@/components/ComponentLibrary/ComponentLibrary';
import { CanvasElement } from '../../types';


export const generateReactCode = (elements: CanvasElement[]): string => {
  const imports = new Set(['import React from "react";']);
  let componentCode = '';
  
  // Generate component JSX
  const generateElementJSX = (element: CanvasElement, depth = 0): string => {
    const componentDef = COMPONENT_LIBRARY.find((c: { id: string; }) => c.id === element.component);
    if (!componentDef) return `{/* Unknown component: ${element.component} */}`;
    
    const indent = '  '.repeat(depth + 2);
    const props = Object.entries(element.props)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => {
        if (typeof value === 'string') return `${key}="${value}"`;
        if (typeof value === 'boolean') return value ? key : '';
        return `${key}={${JSON.stringify(value)}}`;
      })
      .filter(Boolean)
      .join(' ');
    
    // Add style prop if there are custom styles
    const hasCustomStyles = Object.keys(element.style).length > 0;
    const styleString = hasCustomStyles 
      ? ` style={${JSON.stringify(element.style)}}` 
      : '';
    
    const elementName = componentDef.name.replace(/\s+/g, '');
    const propsString = props ? ` ${props}` : '';
    
    // Get children elements
    const children = elements.filter(child => child.parent === element.id);
    
    if (children.length > 0) {
      const childrenJSX = children
        .map(child => generateElementJSX(child, depth + 1))
        .join('\n');
      
      return `${indent}<${elementName}${propsString}${styleString}>
${childrenJSX}
${indent}</${elementName}>`;
    } else {
      return `${indent}<${elementName}${propsString}${styleString} />`;
    }
  };
  
  // Generate JSX for root elements
  const rootElements = elements.filter(element => !element.parent);
  componentCode = rootElements
    .map(element => generateElementJSX(element))
    .join('\n');
  
  // Generate the complete React component
  return `${Array.from(imports).join('\n')}

const GeneratedComponent = () => {
  return (
    <div className="generated-component">
${componentCode}
    </div>
  );
};

export default GeneratedComponent;`;
};