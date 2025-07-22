import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { ComponentDefinition, DraggableComponentProps } from './types';

export const DraggableComponent: React.FC<DraggableComponentProps> = ({ 
  component, 
  onComponentSelect,
  className = ''
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `component-${component.id}`,
    data: {
      type: 'component',
      component
    }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto'
  } : undefined;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComponentSelect?.(component);
  };

  const Icon = component.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group bg-white rounded-lg border-2 border-gray-200 p-3 cursor-grab hover:border-indigo-300 hover:shadow-md transition-all select-none ${className}`}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-3">
        {Icon && (
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
         {Icon && <Icon size={20} color="white" />}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-gray-900 truncate">
            {component.name}
          </div>
          {component.category && (
            <div className="text-xs text-gray-500 capitalize truncate">
              {component.category}
            </div>
          )}
          {component.description && (
            <div className="text-xs text-gray-400 mt-1 line-clamp-2">
              {component.description}
            </div>
          )}
        </div>

        {component.isPremium && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-1 rounded-full font-medium">
            PRO
          </div>
        )}
      </div>

      {/* Tags */}
      {component.tags && component.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {component.tags.slice(0, 3).map(tag => (
            <span 
              key={tag} 
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
          {component.tags.length > 3 && (
            <span className="text-xs text-gray-400">
              +{component.tags.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default DraggableComponent;