import React from 'react';
import { Navigation, Target, Type, Mail, Minus } from 'lucide-react';

const designGuideComponents = [
  {
    id: 'navigation',
    name: 'Navigation',
    icon: Navigation,
    description: 'Essential for user navigation and site structure',
    benefits: ['Improves user experience', 'Reduces bounce rate', 'SEO benefits'],
    position: { x: 0, y: 0 },
    size: { width: 1200, height: 80 },
    color: '#3b82f6'
  },
  {
    id: 'hero',
    name: 'Hero Section',
    icon: Target,
    description: 'First impression that captures visitor attention',
    benefits: ['Communicates value proposition', 'Drives conversions', 'Sets brand tone'],
    position: { x: 0, y: 80 },
    size: { width: 1200, height: 400 },
    color: '#10b981'
  },
  {
    id: 'content',
    name: 'Content Area',
    icon: Type,
    description: 'Main content that provides value to visitors',
    benefits: ['Educates users', 'Builds trust', 'Improves SEO'],
    position: { x: 0, y: 480 },
    size: { width: 1200, height: 300 },
    color: '#f59e0b'
  },
  {
    id: 'contact',
    name: 'Contact Section',
    icon: Mail,
    description: 'Enable visitors to get in touch',
    benefits: ['Generates leads', 'Builds relationships', 'Increases conversions'],
    position: { x: 0, y: 780 },
    size: { width: 1200, height: 200 },
    color: '#8b5cf6'
  },
  {
    id: 'footer',
    name: 'Footer',
    icon: Minus,
    description: 'Secondary navigation and important links',
    benefits: ['SEO benefits', 'Legal compliance', 'Additional navigation'],
    position: { x: 0, y: 980 },
    size: { width: 1200, height: 120 },
    color: '#6b7280'
  }
];

export const DesignGuideOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-40">
      {designGuideComponents.map((guide) => (
        <div
          key={guide.id}
          className="absolute border-2 border-dashed"
          style={{
            left: `${guide.position.x}px`,
            top: `${guide.position.y}px`,
            width: `${guide.size.width}px`,
            height: `${guide.size.height}px`,
            borderColor: guide.color,
            backgroundColor: `${guide.color}10`
          }}
        >
          <div 
            className="absolute -top-8 left-0 text-xs font-medium px-2 py-1 rounded text-white flex items-center gap-1"
            style={{ backgroundColor: guide.color }}
          >
            <guide.icon className="w-3 h-3" />
            {guide.name}
          </div>
          <div className="absolute top-2 left-2 text-xs text-gray-600 bg-white p-2 rounded shadow-sm max-w-xs">
            <div className="font-medium mb-1">{guide.description}</div>
            <ul className="text-xs text-gray-500">
              {guide.benefits.map((benefit, index) => (
                <li key={index}>• {benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};