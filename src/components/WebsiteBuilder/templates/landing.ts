import React from 'react';
import { Template } from '../types';

export const landingTemplates: Template[] = [
  {
    id: 'saas-landing',
    name: 'SaaS Landing Page',
    preview: '🚀',
    description: 'Modern SaaS product landing with hero, features, pricing',
    components: [
      {
        id: 'header-nav',
        type: 'container',
        props: { name: 'Navigation Header' },
        styles: {
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          padding: '16px 24px'
        },
        position: { x: 0, y: 0 },
        size: { width: 1200, height: 80 },
        locked: false
      },
      // ... more components
    ]
  }
  // ... more templates
];