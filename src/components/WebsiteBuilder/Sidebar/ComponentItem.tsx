import React, { useState } from 'react';

interface ComponentItemProps {
  component: {
    type: string;
    label: string;
    preview: string;
    description: string;
  };
  onDragStart: (e: React.DragEvent) => void;
}

export const ComponentItem: React.FC<ComponentItemProps> = ({
  component,
  onDragStart
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="relative p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-grab active:cursor-grabbing transition-all hover:shadow-sm group"
      title={component.description}
    >
      <div className="text-center">
        <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">
          {component.preview}
        </div>
        <div className="text-xs text-gray-600 truncate">
          {component.label}
        </div>
      </div>
      
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute z-50 left-full ml-2 top-0 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          {component.description}
        </div>
      )}
    </div>
  );
};