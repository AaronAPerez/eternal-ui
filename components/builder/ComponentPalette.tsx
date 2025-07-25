// components/builder/ComponentPalette.tsx
'use client';

import { MousePointer, Type, Square, Grid } from 'lucide-react';

const DEMO_COMPONENTS = [
  { id: 'button', name: 'Button', icon: MousePointer, category: 'ui', description: 'Interactive button', defaultProps: {} },
  { id: 'input', name: 'Input', icon: Type, category: 'ui', description: 'Text input field', defaultProps: {} },
  { id: 'card', name: 'Card', icon: Square, category: 'ui', description: 'Content container', defaultProps: {} },
  { id: 'grid', name: 'Grid', icon: Grid, category: 'layout', description: 'Layout grid', defaultProps: {} },
];

export function ComponentPalette() {
  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        Component Palette
      </h3>
      
      <div className="space-y-2">
        {DEMO_COMPONENTS.map((component) => (
          <DraggableComponent key={component.id} component={component} />
        ))}
      </div>
    </div>
  );
}

function DraggableComponent({ component }: { component: any }) {
  const Icon = component.icon;

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(component));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-move transition-all hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="flex-1">
          <h5 className="font-medium text-gray-900 dark:text-white">{component.name}</h5>
          <p className="text-xs text-gray-600 dark:text-gray-400">{component.description}</p>
        </div>
      </div>
    </div>
  );
}