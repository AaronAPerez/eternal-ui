import { CanvasElement } from '../../types';
import { COMPONENT_LIBRARY } from '../../library/componentDefinitions';

export const generateVueCode = (elements: CanvasElement[]): string => {
  const generateElementTemplate = (element: CanvasElement, depth = 0): string => {
    const componentDef = COMPONENT_LIBRARY.find(c => c.id === element.component);
    if (!componentDef) return `<!-- Unknown component: ${element.component} -->`;
    
    const indent = '  '.repeat(depth + 2);
    const elementName = componentDef.name.toLowerCase().replace(/\s+/g, '-');
    
    // Convert props to Vue format
    const props = Object.entries(element.props)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => {
        const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        if (typeof value === 'string') return `:${kebabKey}="'${value}'"`;
        if (typeof value === 'boolean') return value ? kebabKey : '';
        return `:${kebabKey}="${JSON.stringify(value)}"`;
      })
      .filter(Boolean)
      .join(' ');
    
    const propsString = props ? ` ${props}` : '';
    const styleBinding = Object.keys(element.style).length > 0 
      ? ` :style="${JSON.stringify(element.style).replace(/"/g, "'")}"`
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
      return `${indent}<${elementName}${propsString}${styleBinding} />`;
    }
  };
  
  const rootElements = elements.filter(element => !element.parent);
  const template = rootElements
    .map(element => generateElementTemplate(element))
    .join('\n');
  
  return `<template>
  <div class="generated-component">
${template}
  </div>
</template>

<script>
export default {
  name: 'GeneratedComponent',
  data() {
    return {
      // Component data
    };
  },
  methods: {
    // Component methods
  }
};
</script>

<style scoped>
.generated-component {
  /* Component styles */
}
</style>`;
};
