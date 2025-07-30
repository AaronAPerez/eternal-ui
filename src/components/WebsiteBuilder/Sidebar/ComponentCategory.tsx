import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ComponentItem } from './ComponentItem';

interface Component {
  type: string;
  label: string;
  preview: string;
  description: string;
}

interface ComponentCategoryProps {
  name: string;
  components: Component[];
  isExpanded: boolean;
  onToggle: () => void;
  onDragStart: (e: React.DragEvent, componentType: string) => void;
}

export const ComponentCategory: React.FC<ComponentCategoryProps> = ({
  name,
  components,
  isExpanded,
  onToggle,
  onDragStart
}) => {
  return (
    <div className="mb-6">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-sm font-medium text-gray-700 mb-3 hover:text-gray-900 transition-colors"
      >
        <span>{name}</span>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500">({components.length})</span>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </div>
      </button>
      
      {isExpanded && (
        <div className="grid grid-cols-2 gap-2">
          {components.map((comp) => (
            <ComponentItem
              key={comp.type}
              component={comp}
              onDragStart={(e) => onDragStart(e, comp.type)}
            />
          ))}
        </div>
      )}
    </div>
  );
};