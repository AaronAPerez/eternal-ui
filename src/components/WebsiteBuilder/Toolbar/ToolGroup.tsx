import React from 'react';
import { MousePointer, Type, Square, Image, Zap } from 'lucide-react';
import { useBuilderStore } from '@/stores/builderStore';

const tools = [
  { id: 'select', icon: MousePointer, label: 'Select', shortcut: 'V' },
  { id: 'text', icon: Type, label: 'Text', shortcut: 'T' },
  { id: 'container', icon: Square, label: 'Container', shortcut: 'R' },
  { id: 'image', icon: Image, label: 'Image', shortcut: 'I' },
  { id: 'button', icon: Zap, label: 'Button', shortcut: 'B' }
];

export const ToolGroup: React.FC = () => {
  const selectedTool = useBuilderStore(state => state.selectedTool);
  const setSelectedTool = useBuilderStore(state => state.setSelectedTool);

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => setSelectedTool(tool.id)}
          className={`p-2 rounded transition-all relative group ${
            selectedTool === tool.id
              ? 'bg-white shadow-sm text-blue-600 scale-105'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          title={`${tool.label} (${tool.shortcut})`}
        >
          <tool.icon className="w-4 h-4" />
          
          {/* Tooltip */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {tool.label} ({tool.shortcut})
          </div>
        </button>
      ))}
    </div>
  );
};