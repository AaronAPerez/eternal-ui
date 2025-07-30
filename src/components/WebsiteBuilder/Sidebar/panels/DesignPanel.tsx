import React, { useState } from 'react';
import { useBuilderStore } from '@/stores/builderStore';
import { useHistoryStore } from '@/stores/historyStore';
import { Component } from '@/types';
import { ColorPicker } from '../controls/ColorPicker';
import { SliderControl } from '../controls/SliderControl';
import { SelectControl } from '../controls/SelectControl';
import { GradientPicker } from '../controls/GradientPicker';
import { BorderControl } from '../controls/BorderControl';
import { ShadowControl } from '../controls/ShadowControl';

interface DesignPanelProps {
  component: Component;
}

export const DesignPanel: React.FC<DesignPanelProps> = ({ component }) => {
  const updateComponent = useBuilderStore(state => state.updateComponent);
  const saveToHistory = useHistoryStore(state => state.saveToHistory);
  const project = useBuilderStore(state => state.project);

  const updateStyle = (styleKey: string, value: any) => {
    updateComponent(component.id, {
      styles: { ...component.styles, [styleKey]: value }
    });
    saveToHistory(project.components, `Update ${styleKey}`);
  };

  const [backgroundType, setBackgroundType] = useState<'color' | 'gradient' | 'image'>('color');

  return (
    <div className="space-y-6">
      {/* Background Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Background
        </label>
        
        {/* Background Type Selector */}
        <div className="flex gap-1 mb-3 bg-gray-100 rounded-lg p-1">
          {['color', 'gradient', 'image'].map((type) => (
            <button
              key={type}
              onClick={() => setBackgroundType(type as any)}
              className={`flex-1 px-3 py-1 rounded text-xs capitalize transition-colors ${
                backgroundType === type
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Background Controls */}
        {backgroundType === 'color' && (
          <ColorPicker
            label="Background Color"
            value={component.styles.backgroundColor as string || '#ffffff'}
            onChange={(color) => updateStyle('backgroundColor', color)}
            showPresets
          />
        )}

        {backgroundType === 'gradient' && (
          <GradientPicker
            value={component.styles.background as string || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}
            onChange={(gradient) => updateStyle('background', gradient)}
          />
        )}

        {backgroundType === 'image' && (
          <div className="space-y-3">
            <input
              type="url"
              placeholder="Image URL"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              onChange={(e) => updateStyle('backgroundImage', `url(${e.target.value})`)}
            />
            <SelectControl
              label="Background Size"
              value={component.styles.backgroundSize as string || 'cover'}
              onChange={(value) => updateStyle('backgroundSize', value)}
              options={[
                { value: 'cover', label: 'Cover' },
                { value: 'contain', label: 'Contain' },
                { value: 'auto', label: 'Auto' },
                { value: '100% 100%', label: 'Stretch' }
              ]}
            />
            <SelectControl
              label="Background Position"
              value={component.styles.backgroundPosition as string || 'center'}
              onChange={(value) => updateStyle('backgroundPosition', value)}
              options={[
                { value: 'center', label: 'Center' },
                { value: 'top', label: 'Top' },
                { value: 'bottom', label: 'Bottom' },
                { value: 'left', label: 'Left' },
                { value: 'right', label: 'Right' }
              ]}
            />
          </div>
        )}
      </div>

      {/* Border Radius */}
      <SliderControl
        label="Corner Radius"
        value={parseInt(component.styles.borderRadius as string || '0')}
        onChange={(value) => updateStyle('borderRadius', `${value}px`)}
        min={0}
        max={50}
        unit="px"
      />

      {/* Border Control */}
      <BorderControl
        border={{
          width: component.styles.borderWidth as string || '0px',
          style: component.styles.borderStyle as string || 'solid',
          color: component.styles.borderColor as string || '#000000'
        }}
        onChange={(border) => {
          updateStyle('borderWidth', border.width);
          updateStyle('borderStyle', border.style);
          updateStyle('borderColor', border.color);
        }}
      />

      {/* Shadow Control */}
      <ShadowControl
        value={component.styles.boxShadow as string || 'none'}
        onChange={(shadow) => updateStyle('boxShadow', shadow)}
      />

      {/* Opacity */}
      <SliderControl
        label="Opacity"
        value={Math.round((parseFloat(component.styles.opacity as string || '1') * 100))}
        onChange={(value) => updateStyle('opacity', value / 100)}
        min={0}
        max={100}
        unit="%"
      />

      {/* Blend Mode */}
      <SelectControl
        label="Blend Mode"
        value={component.styles.mixBlendMode as string || 'normal'}
        onChange={(value) => updateStyle('mixBlendMode', value)}
        options={[
          { value: 'normal', label: 'Normal' },
          { value: 'multiply', label: 'Multiply' },
          { value: 'screen', label: 'Screen' },
          { value: 'overlay', label: 'Overlay' },
          { value: 'darken', label: 'Darken' },
          { value: 'lighten', label: 'Lighten' },
          { value: 'color-dodge', label: 'Color Dodge' },
          { value: 'color-burn', label: 'Color Burn' },
          { value: 'hard-light', label: 'Hard Light' },
          { value: 'soft-light', label: 'Soft Light' },
          { value: 'difference', label: 'Difference' },
          { value: 'exclusion', label: 'Exclusion' }
        ]}
      />
    </div>
  );
};