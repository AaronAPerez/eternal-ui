import { CanvasElement } from '../../types';
import { COMPONENT_LIBRARY } from '../../library/componentDefinitions';

export const generateHTMLCode = (elements: CanvasElement[]): string => {
  const generateElementHTML = (element: CanvasElement, depth = 0): string => {
    const componentDef = COMPONENT_LIBRARY.find(c => c.id === element.component);
    if (!componentDef) return `<!-- Unknown component: ${element.component} -->`;
    
    const indent = '  '.repeat(depth + 2);
    let htmlTag = 'div';
    let content = '';
    let attributes = '';
    
    // Map components to HTML elements
    switch (element.component) {
      case 'heading':
        htmlTag = element.props.level || 'h1';
        content = element.props.text || 'Heading';
        break;
      case 'paragraph':
        htmlTag = 'p';
        content = element.props.text || 'Paragraph text';
        break;
      case 'button':
        htmlTag = 'button';
        content = element.props.text || 'Button';
        if (element.props.disabled) attributes += ' disabled';
        break;
      case 'image':
        htmlTag = 'img';
        attributes += ` src="${element.props.src || ''}" alt="${element.props.alt || ''}"`;
        break;
      case 'text-input':
        htmlTag = 'input';
        attributes += ` type="${element.props.type || 'text'}"`;
        if (element.props.placeholder) attributes += ` placeholder="${element.props.placeholder}"`;
        if (element.props.required) attributes += ' required';
        if (element.props.disabled) attributes += ' disabled';
        break;
      case 'container':
        htmlTag = 'div';
        attributes += ' class="container"';
        break;
      default:
        htmlTag = 'div';
        attributes += ` class="${element.component}"`;
    }
    
    // Add style attribute if there are custom styles
    if (Object.keys(element.style).length > 0) {
      const styleString = Object.entries(element.style)
        .map(([key, value]) => {
          const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
          return `${cssKey}: ${value}`;
        })
        .join('; ');
      attributes += ` style="${styleString}"`;
    }
    
    // Add data attributes for metadata
    attributes += ` data-component="${element.component}"`;
    if (element.name) attributes += ` data-name="${element.name}"`;
    
    const children = elements.filter(child => child.parent === element.id);
    
    if (htmlTag === 'img' || (htmlTag === 'input' && element.component === 'text-input')) {
      return `${indent}<${htmlTag}${attributes} />`;
    } else if (children.length > 0) {
      const childrenHTML = children
        .map(child => generateElementHTML(child, depth + 1))
        .join('\n');
      
      return `${indent}<${htmlTag}${attributes}>
${content ? `${indent}  ${content}` : ''}
${childrenHTML}
${indent}</${htmlTag}>`;
    } else {
      return `${indent}<${htmlTag}${attributes}>${content}</${htmlTag}>`;
    }
  };
  
  const rootElements = elements.filter(element => !element.parent);
  const bodyContent = rootElements
    .map(element => generateElementHTML(element))
    .join('\n');
  
  // Generate CSS for components
  const generateCSS = (): string => {
    const baseStyles = `
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      margin: 0;
      padding: 20px;
      line-height: 1.6;
      color: #333;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }
    
    button {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s;
    }
    
    button:hover:not(:disabled) {
      background: #2563eb;
    }
    
    button:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
    
    input[type="text"],
    input[type="email"],
    input[type="password"],
    input[type="tel"],
    input[type="url"] {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #d1d5db;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }
    
    input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    img {
      max-width: 100%;
      height: auto;
      display: block;
    }
    
    h1, h2, h3, h4, h5, h6 {
      margin: 0 0 1rem 0;
      line-height: 1.2;
    }
    
    p {
      margin: 0 0 1rem 0;
    }`;
    
    return baseStyles;
  };
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Website</title>
  <style>
${generateCSS()}
  </style>
</head>
<body>
  <div class="generated-website">
${bodyContent}
  </div>
</body>
</html>`;
};