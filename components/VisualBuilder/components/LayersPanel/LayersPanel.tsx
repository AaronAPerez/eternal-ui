import React from 'react';
import { Layers, Eye, EyeOff, Lock, Unlock } from 'lucide-react';
import { useCanvas } from '../../hooks/useCanvas';
import { COMPONENT_LIBRARY } from '@/lib/components';
import { CanvasElement } from '../../types';




export const LayersPanel: React.FC = () => {
  const { state, actions } = useCanvas();

  const renderElement = (element: CanvasElement, depth = 0) => {
    const componentDef = COMPONENT_LIBRARY.find(c => c.id === element.component);
    const Icon = componentDef?.icon || Layers;
    const isSelected = state.selectedElements.has(element.id);

    return (
      <div key={element.id} style={{ marginLeft: `${depth * 16}px` }}>
        <div
          className={`flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors ${
            isSelected ? 'bg-indigo-50 border-l-2 border-indigo-500' : ''
          }`}
          onClick={() => actions.selectElement(element.id)}
        >
          <Icon className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <span className="flex-1 text-sm truncate">{element.name}</span>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                actions.toggleElementVisibility(element.id);
              }}
              className="p-0.5 text-gray-400 hover:text-gray-600 rounded transition-colors"
              title={element.visible ? 'Hide element' : 'Show element'}
            >
              {element.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                actions.toggleElementLock(element.id);
              }}
              className="p-0.5 text-gray-400 hover:text-gray-600 rounded transition-colors"
              title={element.locked ? 'Unlock element' : 'Lock element'}
            >
              {element.locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Render children */}
        {element.children.map(childId => {
          const childElement = state.elements.get(childId);
          return childElement ? renderElement(childElement, depth + 1) : null;
        })}
      </div>
    );
  };

  const rootElements = Array.from(state.elements.values()).filter(el => !el.parent);

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Layers</h3>
        <p className="text-xs text-gray-500 mt-1">
          {rootElements.length} element{rootElements.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      {/* Elements list */}
      <div className="flex-1 overflow-y-auto p-2">
        {rootElements.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Layers className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm font-medium">No elements yet</p>
            <p className="text-xs mt-1">Start building by dragging components to the canvas</p>
          </div>
        ) : (
          <div className="space-y-1">
            {rootElements.map(element => renderElement(element))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      {rootElements.length > 0 && (
        <div className="p-3 border-t border-gray-200 bg-white">
          <div className="text-xs text-gray-600">
            {state.selectedElements.size > 0 && (
              <span>{state.selectedElements.size} selected</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
