import { X, Eye, EyeOff, Unlock, Wand2, Lock } from 'lucide-react';
import React, { useState } from 'react'
import { Badge, Button, Tabs, TabsList, TabsTrigger, ScrollArea, TabsContent, Input } from '../ui';


// ====================================
// PROPERTIES PANEL COMPONENT
// ====================================

interface PropertiesPanelProps {
  element: any;
  onUpdate: (updates: any) => void;
  onClose: () => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ element, onUpdate, onClose }) => {
  const [activeTab, setActiveTab] = useState('properties');

  const handleStyleChange = (property: string, value: any) => {
    onUpdate({
      style: {
        ...element.style,
        [property]: value
      }
    });
  };

  const handlePropChange = (property: string, value: any) => {
    onUpdate({
      props: {
        ...element.props,
        [property]: value
      }
    });
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Properties
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {element.type} • {element.id}
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="properties">Props</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="properties" className="space-y-4">
              {/* Position & Size */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Position & Size
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">X</label>
                    <Input
                      type="number"
                      value={element.position.x}
                      onChange={(e) => onUpdate({
                        position: { ...element.position, x: Number(e.target.value) }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Y</label>
                    <Input
                      type="number"
                      value={element.position.y}
                      onChange={(e) => onUpdate({
                        position: { ...element.position, y: Number(e.target.value) }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Width</label>
                    <Input
                      type="number"
                      value={element.size?.width || 200}
                      onChange={(e) => onUpdate({
                        size: { ...element.size, width: Number(e.target.value) }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Height</label>
                    <Input
                      type="number"
                      value={element.size?.height || 100}
                      onChange={(e) => onUpdate({
                        size: { ...element.size, height: Number(e.target.value) }
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* Element-specific properties */}
              {element.type === 'text' && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Text Properties
                  </h4>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Content</label>
                    <Input
                      value={element.props.text || ''}
                      onChange={(e) => handlePropChange('text', e.target.value)}
                      placeholder="Enter text content..."
                    />
                  </div>
                </div>
              )}

              {element.type === 'button' && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Button Properties
                  </h4>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Button Text</label>
                    <Input
                      value={element.props.text || ''}
                      onChange={(e) => handlePropChange('text', e.target.value)}
                      placeholder="Button text..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Variant</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={element.props.variant || 'default'}
                      onChange={(e) => handlePropChange('variant', e.target.value)}
                    >
                      <option value="default">Default</option>
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                      <option value="outline">Outline</option>
                      <option value="ghost">Ghost</option>
                    </select>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="style" className="space-y-4">
              {/* Background */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Background
                </h4>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Background Color</label>
                  <Input
                    type="color"
                    value={element.style?.backgroundColor || '#ffffff'}
                    onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  />
                </div>
              </div>

              {/* Typography */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Typography
                </h4>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Font Size</label>
                  <Input
                    value={element.style?.fontSize || '16px'}
                    onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                    placeholder="16px"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Color</label>
                  <Input
                    type="color"
                    value={element.style?.color || '#000000'}
                    onChange={(e) => handleStyleChange('color', e.target.value)}
                  />
                </div>
              </div>

              {/* Spacing */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Spacing
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Padding</label>
                    <Input
                      value={element.style?.padding || '8px'}
                      onChange={(e) => handleStyleChange('padding', e.target.value)}
                      placeholder="8px"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Margin</label>
                    <Input
                      value={element.style?.margin || '0px'}
                      onChange={(e) => handleStyleChange('margin', e.target.value)}
                      placeholder="0px"
                    />
                  </div>
                </div>
              </div>

              {/* Border */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Border
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Width</label>
                    <Input
                      value={element.style?.borderWidth || '0px'}
                      onChange={(e) => handleStyleChange('borderWidth', e.target.value)}
                      placeholder="0px"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Color</label>
                    <Input
                      type="color"
                      value={element.style?.borderColor || '#000000'}
                      onChange={(e) => handleStyleChange('borderColor', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Radius</label>
                  <Input
                    value={element.style?.borderRadius || '0px'}
                    onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                    placeholder="0px"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              {/* Element Controls */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Element Controls
                </h4>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdate({ visible: !element.visible })}
                    className="gap-2"
                  >
                    {element.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    {element.visible ? 'Hide' : 'Show'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdate({ locked: !element.locked })}
                    className="gap-2"
                  >
                    {element.locked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    {element.locked ? 'Unlock' : 'Lock'}
                  </Button>
                </div>
              </div>

              {/* Z-Index */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Layer Order (Z-Index)
                </h4>
                <Input
                  type="number"
                  value={element.zIndex || 1}
                  onChange={(e) => onUpdate({ zIndex: Number(e.target.value) })}
                />
              </div>

              {/* Metadata */}
              {element.metadata && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Metadata
                  </h4>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Created: {new Date(element.metadata.createdAt).toLocaleString()}</p>
                    {element.metadata.lastModified && (
                      <p>Modified: {new Date(element.metadata.lastModified).toLocaleString()}</p>
                    )}
                    {element.metadata.isAIGenerated && (
                      <Badge variant="secondary" className="text-xs">
                        <Wand2 className="w-3 h-3 mr-1" />
                        AI Generated
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
};

export default PropertiesPanel