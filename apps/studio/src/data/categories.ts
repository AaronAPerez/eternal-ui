// =================================================================
// @/data/categories.ts - Component Categories Configuration
// =================================================================

export interface ComponentCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const componentCategories: ComponentCategory[] = [
  {
    id: 'buttons',
    name: 'Buttons',
    description: 'Interactive button components with various styles and states',
    icon: 'MousePointer',
    color: 'blue'
  },
  {
    id: 'forms',
    name: 'Forms',
    description: 'Form inputs, controls, and validation components',
    icon: 'FormInput',
    color: 'green'
  },
  {
    id: 'navigation',
    name: 'Navigation',
    description: 'Navigation menus, breadcrumbs, and routing components',
    icon: 'Navigation',
    color: 'purple'
  },
  {
    id: 'layout',
    name: 'Layout',
    description: 'Grid systems, containers, and structural components',
    icon: 'Layout',
    color: 'orange'
  },
  {
    id: 'data-display',
    name: 'Data Display',
    description: 'Tables, lists, cards, and data visualization components',
    icon: 'BarChart3',
    color: 'red'
  },
  {
    id: 'feedback',
    name: 'Feedback',
    description: 'Alerts, notifications, modals, and status indicators',
    icon: 'Bell',
    color: 'yellow'
  },
  {
    id: 'media',
    name: 'Media',
    description: 'Image galleries, video players, and media components',
    icon: 'Image',
    color: 'pink'
  },
  {
    id: 'commerce',
    name: 'Commerce',
    description: 'Shopping carts, product displays, and e-commerce components',
    icon: 'ShoppingCart',
    color: 'indigo'
  }
];

// =================================================================
// @/data/components.ts - Component Registry and Metadata
// =================================================================

import React from 'react';

// Type definitions for component metadata
export interface PropType {
  type: 'string' | 'number' | 'boolean' | 'select' | 'color' | 'array';
  default?: any;
  options?: string[];
  description?: string;
  required?: boolean;
}

export interface ComponentVariant {
  name: string;
  description: string;
  props: Record<string, any>;
  propTypes: Record<string, PropType>;
  code: string;
}

export interface ComponentMetadata {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  component: React.ComponentType<any>;
  variants: ComponentVariant[];
  accessibility: {
    ariaSupport: boolean;
    keyboardSupport: boolean;
    screenReaderSupport: boolean;
    wcagLevel: 'A' | 'AA' | 'AAA';
  };
  responsive: boolean;
  dependencies: string[];
  version: string;
  lastUpdated: string;
}
