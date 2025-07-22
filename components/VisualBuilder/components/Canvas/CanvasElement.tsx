import React from 'react';
import { Lock } from 'lucide-react';
import { CanvasElement } from '../../types';
import { COMPONENT_LIBRARY } from '../../library/componentDefinitions';

interface CanvasElementComponentProps {
  element: CanvasElement;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHover: () => void;
  onUnhover: () => void;
}

export const CanvasElementComponent: React.FC<CanvasElementComponentProps> = ({
  element,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  onUnhover,
}) => {
  // Find the component definition
  const componentDef = COMPONENT_LIBRARY.find(c => c.id === element.component);

  if (!componentDef) {
    return (
      <div className="p-4 border-2 border-red-300 bg-red-50 rounded text-red-600">
        <div className="text-sm font-medium">Unknown Component</div>
        <div className="text-xs">{element.component}</div>
      </div>
    );
  }

  const PreviewComponent = componentDef.previewComponent;

  return (
    <div
      className={`relative group transition-all ${
        isSelected ? 'ring-2 ring-indigo-500' : ''
      } ${isHovered ? 'ring-1 ring-indigo-300' : ''}`}
      style={{
        ...element.style,
        cursor: element.locked ? 'not-allowed' : 'pointer',
        opacity: element.visible ? (element.style.opacity || 1) : 0.3,
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!element.locked) {
          onSelect();
        }
      }}
      onMouseEnter={(e) => {
        e.stopPropagation();
        onHover();
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        onUnhover();
      }}
    >
      {/* Render the actual component */}
      <PreviewComponent {...element.props} />

      {/* Selection indicators */}
      {isSelected && (
        <>
          {/* Selection outline */}
          <div className="absolute -inset-1 border-2 border-indigo-500 pointer-events-none rounded" />
          
          {/* Element label */}
          <div className="absolute -top-6 left-0 bg-indigo-500 text-white text-xs px-2 py-1 rounded text-center min-w-max z-10">
            {element.name}
          </div>
          
          {/* Resize handles */}
          <div className="absolute -inset-1 pointer-events-none">
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-indigo-500 border border-white rounded-full"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 border border-white rounded-full"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-indigo-500 border border-white rounded-full"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-indigo-500 border border-white rounded-full"></div>
            
            {/* Middle handles */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-indigo-500 border border-white rounded-full"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-indigo-500 border border-white rounded-full"></div>
            <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-indigo-500 border border-white rounded-full"></div>
            <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-indigo-500 border border-white rounded-full"></div>
          </div>
        </>
      )}

      {/* Hover indicator */}
      {isHovered && !isSelected && (
        <div className="absolute -inset-px border border-indigo-300 pointer-events-none rounded" />
      )}

      {/* Lock indicator */}
      {element.locked && (
        <div className="absolute top-2 right-2 bg-gray-800 text-white p-1 rounded shadow-sm z-10">
          <Lock className="w-3 h-3" />
        </div>
      )}

      {/* Hidden indicator */}
      {!element.visible && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center rounded z-10">
          <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
            Hidden
          </div>
        </div>
      )}

      {/* Component badge (shows on hover for non-selected elements) */}
      {isHovered && !isSelected && (
        <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded z-10">
          {componentDef.name}
        </div>
      )}
    </div>
  );
};