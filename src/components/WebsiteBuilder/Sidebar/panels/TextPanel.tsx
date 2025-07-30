import React from 'react';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline } from 'lucide-react';
import { useBuilderStore } from '@/stores/builderStore';
import { useHistoryStore } from '@/stores/historyStore';
import { Component } from '@/types';
import { ColorPicker } from '../controls/ColorPicker';
import { SelectControl } from '../controls/SelectControl';
import { SliderControl } from '../controls/SliderControl';
import { ToggleGroup } from '../controls/ToggleGroup';
import { NumberInput } from '../controls/NumberInput';

interface TextPanelProps {
  component: Component;
}

export const TextPanel: React.FC<TextPanelProps> = ({ component }) => {
  const updateComponent = useBuilderStore(state => state.updateComponent);
  const saveToHistory = useHistoryStore(state => state.saveToHistory);
  const project = useBuilderStore(state => state.project);

  const updateStyle = (styleKey: string, value: any) => {
    updateComponent(component.id, {
      styles: { ...component.styles, [styleKey]: value }
    });
    saveToHistory(project.components, `Update ${styleKey}`);
  };

  const fontFamilies = [
    'Inter', 'Helvetica', 'Arial', 'Times New Roman', 'Georgia', 'Verdana',
    'Courier New', 'Comic Sans MS', 'Impact', 'Trebuchet MS',
    'Playfair Display', 'Source Sans Pro', 'Roboto', 'Open Sans',
    'Lato', 'Montserrat', 'Nunito', 'Poppins'
  ];

  return (
    <div className="space-y-6">
      {/* Font Family */}
      <SelectControl
        label="Font Family"
        value={component.styles.fontFamily as string || 'Inter'}
        onChange={(value) => updateStyle('fontFamily', value)}
        options={fontFamilies.map(font => ({ value: font, label: font }))}
      />

      {/* Font Size */}
      <SliderControl
        label="Font Size"
        value={parseInt(component.styles.fontSize as string || '16')}
        onChange={(value) => updateStyle('fontSize', `${value}px`)}
        min={8}
        max={120}
        unit="px"
      />

      {/* Font Weight */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Weight
        </label>
        <div className="grid grid-cols-4 gap-1">
          {[
            { value: '100', label: 'Thin' },
            { value: '200', label: 'Light' },
            { value: '300', label: 'Light' },
            { value: '400', label: 'Normal' },
            { value: '500', label: 'Medium' },
            { value: '600', label: 'Semi' },
            { value: '700', label: 'Bold' },
            { value: '800', label: 'Extra' },
            { value: '900', label: 'Black' }
          ].map((weight) => (
            <button
              key={weight.value}
              onClick={() => updateStyle('fontWeight', weight.value)}
              className={`px-2 py-1 text-xs border rounded transition-colors ${
                component.styles.fontWeight === weight.value
                  ? 'bg-blue-100 border-blue-500 text-blue-700'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
              title={`${weight.label} (${weight.value})`}
            >
              {weight.value}
            </button>
          ))}
        </div>
      </div>

      {/* Text Style Toggles */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Style
        </label>
        <div className="flex gap-1">
          <button
            onClick={() => updateStyle('fontStyle', 
              component.styles.fontStyle === 'italic' ? 'normal' : 'italic'
            )}
            className={`p-2 border rounded transition-colors ${
              component.styles.fontStyle === 'italic'
                ? 'bg-blue-100 border-blue-500 text-blue-700'
                : 'border-gray-300 hover:bg-gray-100'
            }`}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => {
              const currentDecoration = component.styles.textDecoration as string || 'none';
              const hasUnderline = currentDecoration.includes('underline');
              updateStyle('textDecoration', hasUnderline ? 'none' : 'underline');
            }}
            className={`p-2 border rounded transition-colors ${
              (component.styles.textDecoration as string || '').includes('underline')
                ? 'bg-blue-100 border-blue-500 text-blue-700'
                : 'border-gray-300 hover:bg-gray-100'
            }`}
            title="Underline"
          >
            <Underline className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Text Alignment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Alignment
        </label>
        <ToggleGroup
          value={component.styles.textAlign as string || 'left'}
          onChange={(value) => updateStyle('textAlign', value)}
          options={[
            { value: 'left', icon: AlignLeft, label: 'Left' },
            { value: 'center', icon: AlignCenter, label: 'Center' },
            { value: 'right', icon: AlignRight, label: 'Right' },
            { value: 'justify', icon: AlignJustify, label: 'Justify' }
          ]}
        />
      </div>

      {/* Text Color */}
      <ColorPicker
        label="Text Color"
        value={component.styles.color as string || '#000000'}
        onChange={(color) => updateStyle('color', color)}
        showPresets
      />

      {/* Line Height */}
      <SliderControl
        label="Line Height"
        value={parseFloat(component.styles.lineHeight as string || '1.5')}
        onChange={(value) => updateStyle('lineHeight', value)}
        min={0.8}
        max={3}
        step={0.1}
        unit=""
      />

      {/* Letter Spacing */}
      <SliderControl
        label="Letter Spacing"
        value={parseFloat(component.styles.letterSpacing as string || '0')}
        onChange={(value) => updateStyle('letterSpacing', `${value}px`)}
        min={-2}
        max={10}
        step={0.1}
        unit="px"
      />

      {/* Word Spacing */}
      <SliderControl
        label="Word Spacing"
        value={parseFloat(component.styles.wordSpacing as string || '0')}
        onChange={(value) => updateStyle('wordSpacing', `${value}px`)}
        min={-10}
        max={20}
        step={0.5}
        unit="px"
      />

      {/* Text Transform */}
      <SelectControl
        label="Text Transform"
        value={component.styles.textTransform as string || 'none'}
        onChange={(value) => updateStyle('textTransform', value)}
        options={[
          { value: 'none', label: 'None' },
          { value: 'uppercase', label: 'UPPERCASE' },
          { value: 'lowercase', label: 'lowercase' },
          { value: 'capitalize', label: 'Capitalize' }
        ]}
      />

      {/* Text Shadow */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Shadow
        </label>
        <div className="grid grid-cols-2 gap-2">
          <NumberInput
            label="X Offset"
            value={0}
            onChange={(value) => {
              // Parse existing text shadow or create new one
              const shadow = `${value}px 0px 0px rgba(0,0,0,0.5)`;
              updateStyle('textShadow', shadow);
            }}
            unit="px"
          />
          <NumberInput
            label="Y Offset"
            value={0}
            onChange={(value) => {
              const shadow = `0px ${value}px 0px rgba(0,0,0,0.5)`;
              updateStyle('textShadow', shadow);
            }}
            unit="px"
          />
        </div>
      </div>

      {/* Content Editing for Text Components */}
      {(component.type === 'text' || component.type === 'heading') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            value={component.props.content || ''}
            onChange={(e) => {
              updateComponent(component.id, {
                props: { ...component.props, content: e.target.value }
              });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-none"
            rows={4}
            placeholder="Enter your text content..."
          />
        </div>
      )}
    </div>
  );
};