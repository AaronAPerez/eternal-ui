import React from 'react';
import { Settings, Eye, EyeOff, Lock, Unlock, Copy, Trash2 } from 'lucide-react';
import { useCanvas } from '../../hooks/useCanvas';
import { COMPONENT_LIBRARY } from '@/components/ComponentLibrary/ComponentLibrary';
import { PropertyField } from './PropertyField';


export const PropertyEditor: React.FC = () => {
  const { state, actions } = useCanvas();
  
  // Get the selected element (only if single selection)
  const selectedElement = state.selectedElements.size === 1
    ? state.elements.get([...state.selectedElements][0])
    : null;

  // Find the component definition for the selected element
  const componentDef = selectedElement
    ? COMPONENT_LIBRARY.find(c => c.id === selectedElement.component)
    : null;

  // Show empty state if no element is selected
  if (!selectedElement || !componentDef) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <div className="text-center py-12 text-gray-500">
          <Settings className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <h3 className="text-sm font-medium text-gray-900 mb-2">No Element Selected</h3>
          <p className="text-sm">Select an element to edit its properties</p>
        </div>
      </div>
    );
  }

  // Handle property updates
  const updateElementProp = (key: string, value: unknown) => {
    actions.updateElement(selectedElement.id, {
      props: { ...selectedElement.props, [key]: value }
    });
  };

  const updateElementStyle = (key: string, value: unknown) => {
    actions.updateElement(selectedElement.id, {
      style: { ...selectedElement.style, [key]: value }
    });
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Properties</h3>
          
          {/* Element actions */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => actions.toggleElementVisibility(selectedElement.id)}
              className="p-1 text-gray-500 hover:text-gray-700 rounded transition-colors"
              title={selectedElement.visible ? 'Hide element' : 'Show element'}
            >
              {selectedElement.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
            
            <button
              onClick={() => actions.toggleElementLock(selectedElement.id)}
              className="p-1 text-gray-500 hover:text-gray-700 rounded transition-colors"
              title={selectedElement.locked ? 'Unlock element' : 'Lock element'}
            >
              {selectedElement.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            </button>
            
            <button
              onClick={() => actions.duplicateElement(selectedElement.id)}
              className="p-1 text-gray-500 hover:text-gray-700 rounded transition-colors"
              title="Duplicate element"
            >
              <Copy className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => actions.deleteElement(selectedElement.id)}
              className="p-1 text-gray-500 hover:text-red-500 rounded transition-colors"
              title="Delete element"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Element info */}
        <div className="flex items-center space-x-2">
          <componentDef.icon className="w-5 h-5 text-gray-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">{componentDef.name}</p>
            <p className="text-xs text-gray-500 capitalize">{componentDef.category}</p>
          </div>
        </div>
      </div>

      {/* Properties panels */}
      <div className="flex-1 overflow-y-auto">
        {/* Component Properties */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Component Properties</h4>
          <div className="space-y-4">
            {Object.entries(componentDef.propsSchema).map(([key, schema]) => (
              <PropertyField
                key={key}
                name={key}
                schema={schema}
                value={selectedElement.props[key]}
                onChange={(value) => updateElementProp(key, value)}
              />
            ))}
          </div>
        </div>

        {/* Style Properties */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Style Properties</h4>
          <div className="space-y-4">
            {/* Layout Properties */}
            <div>
              <h5 className="text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">Layout</h5>
              <div className="space-y-3">
                <PropertyField
                  name="width"
                  schema={{ type: 'text', placeholder: 'e.g., 100%, 400px, auto', description: 'Element width' }}
                  value={selectedElement.style.width || ''}
                  onChange={(value) => updateElementStyle('width', value)}
                />
                <PropertyField
                  name="height"
                  schema={{ type: 'text', placeholder: 'e.g., auto, 300px', description: 'Element height' }}
                  value={selectedElement.style.height || ''}
                  onChange={(value) => updateElementStyle('height', value)}
                />
              </div>
            </div>

            {/* Spacing Properties */}
            <div>
              <h5 className="text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">Spacing</h5>
              <div className="space-y-3">
                <PropertyField
                  name="margin"
                  schema={{ type: 'text', placeholder: 'e.g., 1rem, 10px 20px', description: 'External spacing' }}
                  value={selectedElement.style.margin || ''}
                  onChange={(value) => updateElementStyle('margin', value)}
                />
                <PropertyField
                  name="padding"
                  schema={{ type: 'text', placeholder: 'e.g., 1rem, 10px 20px', description: 'Internal spacing' }}
                  value={selectedElement.style.padding || ''}
                  onChange={(value) => updateElementStyle('padding', value)}
                />
              </div>
            </div>

            {/* Appearance Properties */}
            <div>
              <h5 className="text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">Appearance</h5>
              <div className="space-y-3">
                <PropertyField
                  name="backgroundColor"
                  schema={{ type: 'color', description: 'Background color' }}
                  value={selectedElement.style.backgroundColor || '#ffffff'}
                  onChange={(value) => updateElementStyle('backgroundColor', value)}
                />
                <PropertyField
                  name="borderRadius"
                  schema={{ type: 'text', placeholder: 'e.g., 4px, 50%', description: 'Border radius' }}
                  value={selectedElement.style.borderRadius || ''}
                  onChange={(value) => updateElementStyle('borderRadius', value)}
                />
                <PropertyField
                  name="border"
                  schema={{ type: 'text', placeholder: 'e.g., 1px solid #ccc', description: 'Border style' }}
                  value={selectedElement.style.border || ''}
                  onChange={(value) => updateElementStyle('border', value)}
                />
                <PropertyField
                  name="boxShadow"
                  schema={{ type: 'text', placeholder: 'e.g., 0 2px 4px rgba(0,0,0,0.1)', description: 'Box shadow' }}
                  value={selectedElement.style.boxShadow || ''}
                  onChange={(value) => updateElementStyle('boxShadow', value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">AI Suggestions</h4>
          <div className="space-y-2">
            <button
              onClick={() => actions.runAccessibilityAudit()}
              className="w-full text-left p-3 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">🎨</span>
                <div>
                  <div className="font-medium">Improve Accessibility</div>
                  <div className="text-xs text-blue-600">Check contrast and ARIA labels</div>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => actions.optimizePerformance()}
              className="w-full text-left p-3 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">⚡</span>
                <div>
                  <div className="font-medium">Optimize Performance</div>
                  <div className="text-xs text-green-600">Reduce bundle size and improve loading</div>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => actions.generateAIComponent('Enhance this component with modern design')}
              className="w-full text-left p-3 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">🔍</span>
                <div>
                  <div className="font-medium">Enhance Design</div>
                  <div className="text-xs text-purple-600">AI-powered design improvements</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
