import React, { useState } from 'react';
import { 
  Copy, Share, AlignLeft, AlignCenter, AlignRight,
  Bold, Italic, Underline, Palette, Settings
} from 'lucide-react';
import { getComponentById } from '@/lib/enhanced-component-registry';

interface PropertyEditorProps {
  selectedComponent: string | null;
  components: CanvasComponent[];
  onUpdateComponent: (id: string, updates: Partial<CanvasComponent>) => void;
  onDuplicateComponent: (id: string) => void;
}

export function PropertyEditor({ 
  selectedComponent, 
  components, 
  onUpdateComponent, 
  onDuplicateComponent 
}: PropertyEditorProps) {
  const [activeTab, setActiveTab] = useState<'properties' | 'styling' | 'layout' | 'typography'>('properties');
  
  const component = components.find(c => c.id === selectedComponent);
  
  if (!component) {
    return (
      <div className="text-center text-gray-500 mt-8">
        <Settings className="w-8 h-8 mx-auto mb-2 text-gray-300" />
        <p className="text-sm">Select a component</p>
        <p className="text-xs text-gray-400">Click on any element to edit its properties</p>
      </div>
    );
  }

  const componentDefinition = getComponentById(component.componentId);

  const handlePropChange = (key: string, value: any) => {
    onUpdateComponent(component.id, {
      props: { ...component.props, [key]: value }
    });
  };

  const handlePositionChange = (axis: 'x' | 'y', value: string) => {
    onUpdateComponent(component.id, {
      position: { ...component.position, [axis]: parseInt(value) || 0 }
    });
  };

  const tabs = [
    { id: 'properties', name: 'Properties', icon: Settings },
    { id: 'styling', name: 'Styling', icon: Palette },
    { id: 'layout', name: 'Layout', icon: AlignLeft },
    { id: 'typography', name: 'Typography', icon: Bold }
  ];

  return (
    <div className="space-y-4">
      {/* Component Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-gray-900">
            {componentDefinition?.name || component.componentId}
          </h4>
          <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded mt-1">
            ID: {component.id}
          </div>
        </div>
        <button
          onClick={() => onDuplicateComponent(component.id)}
          className="p-2 text-gray-400 hover:text-gray-600 rounded"
          title="Duplicate component"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-1 px-2 py-1.5 text-xs font-medium rounded transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <tab.icon className="w-3 h-3" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'properties' && (
          <>
            {/* Position Controls */}
            <div>
              <h5 className="font-medium text-sm text-gray-700 mb-2">Position</h5>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">X Position</label>
                  <input
                    type="number"
                    value={component.position.x}
                    onChange={(e) => handlePositionChange('x', e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Y Position</label>
                  <input
                    type="number"
                    value={component.position.y}
                    onChange={(e) => handlePositionChange('y', e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Component Properties */}
            <div>
              <h5 className="font-medium text-sm text-gray-700 mb-2">Component Properties</h5>
              <div className="space-y-3">
                {componentDefinition?.propSchema?.map(schema => (
                  <PropertyControl
                    key={schema.name}
                    schema={schema}
                    value={component.props[schema.name]}
                    onChange={(value) => handlePropChange(schema.name, value)}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'styling' && (
          <StylingControls component={component} onUpdate={onUpdateComponent} />
        )}

        {activeTab === 'layout' && (
          <LayoutControls component={component} onUpdate={onUpdateComponent} />
        )}

        {activeTab === 'typography' && (
          <TypographyControls component={component} onUpdate={onUpdateComponent} />
        )}
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-gray-200 space-y-2">
        <button
          onClick={() => onDuplicateComponent(component.id)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          <Copy className="w-4 h-4" />
          Duplicate Component
        </button>
        
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
          <Share className="w-4 h-4" />
          Export Component
        </button>
      </div>
    </div>
  );
}

// Property control component for dynamic form generation
function PropertyControl({ schema, value, onChange }) {
  switch (schema.type) {
    case 'text':
      return (
        <div>
          <label className="text-xs text-gray-500 block mb-1">{schema.label}</label>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={schema.description}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      );

    case 'boolean':
      return (
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
          />
          <span className="text-sm text-gray-700">{schema.label}</span>
        </label>
      );

    case 'select':
      return (
        <div>
          <label className="text-xs text-gray-500 block mb-1">{schema.label}</label>
          <select
            value={value || schema.defaultValue}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {schema.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );

    case 'color':
      return (
        <div>
          <label className="text-xs text-gray-500 block mb-1">{schema.label}</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={value || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={value || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}

// Styling controls component
function StylingControls({ component, onUpdate }) {
  return (
    <div className="space-y-4">
      <div>
        <h5 className="font-medium text-sm text-gray-700 mb-2">Colors</h5>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Background Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                defaultValue="#ffffff"
                className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                defaultValue="#ffffff"
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div>
            <label className="text-xs text-gray-500 block mb-1">Text Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                defaultValue="#000000"
                className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                defaultValue="#000000"
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h5 className="font-medium text-sm text-gray-700 mb-2">Effects</h5>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Border Radius</label>
            <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="none">None (0px)</option>
              <option value="sm">Small (4px)</option>
              <option value="md">Medium (8px)</option>
              <option value="lg">Large (12px)</option>
              <option value="xl">Extra Large (16px)</option>
              <option value="full">Full (9999px)</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Shadow</label>
            <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="none">None</option>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
              <option value="inner">Inner Shadow</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Opacity</label>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="100"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Layout controls component
function LayoutControls({ component, onUpdate }) {
  return (
    <div className="space-y-4">
      <div>
        <h5 className="font-medium text-sm text-gray-700 mb-2">Display & Position</h5>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Display</label>
            <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="block">Block</option>
              <option value="inline">Inline</option>
              <option value="inline-block">Inline Block</option>
              <option value="flex">Flex</option>
              <option value="inline-flex">Inline Flex</option>
              <option value="grid">Grid</option>
              <option value="inline-grid">Inline Grid</option>
              <option value="none">Hidden</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Width</label>
              <input
                type="text"
                placeholder="auto"
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Height</label>
              <input
                type="text"
                placeholder="auto"
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h5 className="font-medium text-sm text-gray-700 mb-2">Spacing</h5>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Padding</label>
            <div className="grid grid-cols-4 gap-1">
              <input type="text" placeholder="T" className="px-1 py-1.5 text-xs border border-gray-300 rounded text-center focus:outline-none focus:ring-1 focus:ring-indigo-500" />
              <input type="text" placeholder="R" className="px-1 py-1.5 text-xs border border-gray-300 rounded text-center focus:outline-none focus:ring-1 focus:ring-indigo-500" />
              <input type="text" placeholder="B" className="px-1 py-1.5 text-xs border border-gray-300 rounded text-center focus:outline-none focus:ring-1 focus:ring-indigo-500" />
              <input type="text" placeholder="L" className="px-1 py-1.5 text-xs border border-gray-300 rounded text-center focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Margin</label>
            <div className="grid grid-cols-4 gap-1">
              <input type="text" placeholder="T" className="px-1 py-1.5 text-xs border border-gray-300 rounded text-center focus:outline-none focus:ring-1 focus:ring-indigo-500" />
              <input type="text" placeholder="R" className="px-1 py-1.5 text-xs border border-gray-300 rounded text-center focus:outline-none focus:ring-1 focus:ring-indigo-500" />
              <input type="text" placeholder="B" className="px-1 py-1.5 text-xs border border-gray-300 rounded text-center focus:outline-none focus:ring-1 focus:ring-indigo-500" />
              <input type="text" placeholder="L" className="px-1 py-1.5 text-xs border border-gray-300 rounded text-center focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Typography controls component
function TypographyControls({ component, onUpdate }) {
  return (
    <div className="space-y-4">
      <div>
        <h5 className="font-medium text-sm text-gray-700 mb-2">Font</h5>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Font Family</label>
            <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="inter">Inter</option>
              <option value="roboto">Roboto</option>
              <option value="helvetica">Helvetica Neue</option>
              <option value="arial">Arial</option>
              <option value="georgia">Georgia</option>
              <option value="times">Times New Roman</option>
              <option value="courier">Courier New</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Size</label>
              <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="xs">12px (XS)</option>
                <option value="sm">14px (SM)</option>
                <option value="base">16px (Base)</option>
                <option value="lg">18px (LG)</option>
                <option value="xl">20px (XL)</option>
                <option value="2xl">24px (2XL)</option>
                <option value="3xl">30px (3XL)</option>
                <option value="4xl">36px (4XL)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Weight</label>
              <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="100">Thin (100)</option>
                <option value="200">Extra Light (200)</option>
                <option value="300">Light (300)</option>
                <option value="400">Normal (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semibold (600)</option>
                <option value="700">Bold (700)</option>
                <option value="800">Extra Bold (800)</option>
                <option value="900">Black (900)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h5 className="font-medium text-sm text-gray-700 mb-2">Alignment & Decoration</h5>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Text Align</label>
            <div className="flex items-center space-x-1">
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <AlignLeft className="w-4 h-4" />
              </button>
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <AlignCenter className="w-4 h-4" />
              </button>
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <AlignRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Text Decoration</label>
            <div className="flex items-center space-x-1">
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <Bold className="w-4 h-4" />
              </button>
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <Italic className="w-4 h-4" />
              </button>
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <Underline className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Line Height</label>
            <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="none">1 (None)</option>
              <option value="tight">1.25 (Tight)</option>
              <option value="snug">1.375 (Snug)</option>
              <option value="normal">1.5 (Normal)</option>
              <option value="relaxed">1.625 (Relaxed)</option>
              <option value="loose">2 (Loose)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}