import React, { useState } from 'react';
import { useBuilderStore } from '@/stores/builderStore';
import { useHistoryStore } from '@/stores/historyStore';
import { Component } from '@/types';
import { SliderControl } from '../controls/SliderControl';
import { SelectControl } from '../controls/SelectControl';
import { NumberInput } from '../controls/NumberInput';
import { ToggleSwitch } from '../controls/ToggleSwitch';

interface EffectsPanelProps {
  component: Component;
}

export const EffectsPanel: React.FC<EffectsPanelProps> = ({ component }) => {
  const updateComponent = useBuilderStore(state => state.updateComponent);
  const saveToHistory = useHistoryStore(state => state.saveToHistory);
  const project = useBuilderStore(state => state.project);

  const updateStyle = (styleKey: string, value: any) => {
    updateComponent(component.id, {
      styles: { ...component.styles, [styleKey]: value }
    });
    saveToHistory(project.components, `Update ${styleKey}`);
  };

  const [transformValues, setTransformValues] = useState({
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    skewX: 0,
    skewY: 0,
    translateX: 0,
    translateY: 0
  });

  const updateTransform = () => {
    const transform = [
      `rotate(${transformValues.rotate}deg)`,
      `scale(${transformValues.scaleX}, ${transformValues.scaleY})`,
      `skew(${transformValues.skewX}deg, ${transformValues.skewY}deg)`,
      `translate(${transformValues.translateX}px, ${transformValues.translateY}px)`
    ].join(' ');
    
    updateStyle('transform', transform);
  };

  return (
    <div className="space-y-6">
      {/* Opacity */}
      <SliderControl
        label="Opacity"
        value={Math.round((parseFloat(component.styles.opacity as string || '1') * 100))}
        onChange={(value) => updateStyle('opacity', value / 100)}
        min={0}
        max={100}
        unit="%"
      />

      {/* Transform Controls */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Transform
        </label>
        
        <div className="space-y-3">
          {/* Rotation */}
          <SliderControl
            label="Rotation"
            value={transformValues.rotate}
            onChange={(value) => {
              setTransformValues(prev => ({ ...prev, rotate: value }));
              setTimeout(updateTransform, 0);
            }}
            min={-180}
            max={180}
            unit="°"
          />

          {/* Scale */}
          <div className="grid grid-cols-2 gap-2">
            <SliderControl
              label="Scale X"
              value={transformValues.scaleX}
              onChange={(value) => {
                setTransformValues(prev => ({ ...prev, scaleX: value }));
                setTimeout(updateTransform, 0);
              }}
              min={0.1}
              max={3}
              step={0.1}
              unit=""
            />
            <SliderControl
              label="Scale Y"
              value={transformValues.scaleY}
              onChange={(value) => {
                setTransformValues(prev => ({ ...prev, scaleY: value }));
                setTimeout(updateTransform, 0);
              }}
              min={0.1}
              max={3}
              step={0.1}
              unit=""
            />
          </div>

          {/* Skew */}
          <div className="grid grid-cols-2 gap-2">
            <SliderControl
              label="Skew X"
              value={transformValues.skewX}
              onChange={(value) => {
                setTransformValues(prev => ({ ...prev, skewX: value }));
                setTimeout(updateTransform, 0);
              }}
              min={-45}
              max={45}
              unit="°"
            />
            <SliderControl
              label="Skew Y"
              value={transformValues.skewY}
              onChange={(value) => {
                setTransformValues(prev => ({ ...prev, skewY: value }));
                setTimeout(updateTransform, 0);
              }}
              min={-45}
              max={45}
              unit="°"
            />
          </div>

          {/* Translate */}
          <div className="grid grid-cols-2 gap-2">
            <NumberInput
              label="Move X"
              value={transformValues.translateX}
              onChange={(value) => {
                setTransformValues(prev => ({ ...prev, translateX: value }));
                setTimeout(updateTransform, 0);
              }}
              unit="px"
            />
            <NumberInput
              label="Move Y"
              value={transformValues.translateY}
              onChange={(value) => {
                setTransformValues(prev => ({ ...prev, translateY: value }));
                setTimeout(updateTransform, 0);
              }}
              unit="px"
            />
          </div>
        </div>
      </div>

      {/* Filter Effects */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Filters
        </label>
        
        <div className="space-y-3">
          {/* Blur */}
          <SliderControl
            label="Blur"
            value={0}
            onChange={(value) => updateStyle('filter', `blur(${value}px)`)}
            min={0}
            max={20}
            unit="px"
          />

          {/* Brightness */}
          <SliderControl
            label="Brightness"
            value={100}
            onChange={(value) => updateStyle('filter', `brightness(${value}%)`)}
            min={0}
            max={200}
            unit="%"
          />

          {/* Contrast */}
          <SliderControl
            label="Contrast"
            value={100}
            onChange={(value) => updateStyle('filter', `contrast(${value}%)`)}
            min={0}
            max={200}
            unit="%"
          />

          {/* Saturation */}
          <SliderControl
            label="Saturation"
            value={100}
            onChange={(value) => updateStyle('filter', `saturate(${value}%)`)}
            min={0}
            max={200}
            unit="%"
          />

          {/* Hue Rotate */}
          <SliderControl
            label="Hue"
            value={0}
            onChange={(value) => updateStyle('filter', `hue-rotate(${value}deg)`)}
            min={0}
            max={360}
            unit="°"
          />

          {/* Sepia */}
          <SliderControl
            label="Sepia"
            value={0}
            onChange={(value) => updateStyle('filter', `sepia(${value}%)`)}
            min={0}
            max={100}
            unit="%"
          />

          {/* Grayscale */}
          <SliderControl
            label="Grayscale"
            value={0}
            onChange={(value) => updateStyle('filter', `grayscale(${value}%)`)}
            min={0}
            max={100}
            unit="%"
          />
        </div>
      </div>

      {/* Backdrop Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Backdrop Filter
        </label>
        
        <div className="space-y-3">
          <SliderControl
            label="Backdrop Blur"
            value={0}
            onChange={(value) => updateStyle('backdropFilter', `blur(${value}px)`)}
            min={0}
            max={20}
            unit="px"
          />
        </div>
      </div>

      {/* Transition Effects */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Transitions
        </label>
        
        <div className="space-y-3">
          <SelectControl
            label="Transition Property"
            value={component.styles.transitionProperty as string || 'all'}
            onChange={(value) => updateStyle('transitionProperty', value)}
            options={[
              { value: 'all', label: 'All Properties' },
              { value: 'opacity', label: 'Opacity' },
              { value: 'transform', label: 'Transform' },
              { value: 'background-color', label: 'Background Color' },
              { value: 'color', label: 'Text Color' },
              { value: 'border-color', label: 'Border Color' }
            ]}
          />

          <SliderControl
            label="Duration"
            value={parseFloat(component.styles.transitionDuration as string || '0')}
            onChange={(value) => updateStyle('transitionDuration', `${value}s`)}
            min={0}
            max={2}
            step={0.1}
            unit="s"
          />

          <SelectControl
            label="Timing Function"
            value={component.styles.transitionTimingFunction as string || 'ease'}
            onChange={(value) => updateStyle('transitionTimingFunction', value)}
            options={[
              { value: 'ease', label: 'Ease' },
              { value: 'ease-in', label: 'Ease In' },
              { value: 'ease-out', label: 'Ease Out' },
              { value: 'ease-in-out', label: 'Ease In Out' },
              { value: 'linear', label: 'Linear' },
              { value: 'cubic-bezier(0.25, 0.1, 0.25, 1)', label: 'Custom Curve' }
            ]}
          />
        </div>
      </div>

      {/* Animation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Animation
        </label>
        
        <SelectControl
          label="Animation Preset"
          value=""
          onChange={(value) => {
            if (value) {
              updateStyle('animation', value);
            }
          }}
          options={[
            { value: '', label: 'None' },
            { value: 'pulse 2s infinite', label: 'Pulse' },
            { value: 'bounce 1s infinite', label: 'Bounce' },
            { value: 'shake 0.5s infinite', label: 'Shake' },
            { value: 'fadeIn 1s ease-in', label: 'Fade In' },
            { value: 'slideInUp 0.5s ease-out', label: 'Slide In Up' },
            { value: 'zoomIn 0.5s ease-out', label: 'Zoom In' },
            { value: 'rotateIn 0.5s ease-out', label: 'Rotate In' }
          ]}
        />
      </div>

      {/* Cursor */}
      <SelectControl
        label="Cursor"
        value={component.styles.cursor as string || 'default'}
        onChange={(value) => updateStyle('cursor', value)}
        options={[
          { value: 'default', label: 'Default' },
          { value: 'pointer', label: 'Pointer' },
          { value: 'crosshair', label: 'Crosshair' },
          { value: 'move', label: 'Move' },
          { value: 'text', label: 'Text' },
          { value: 'wait', label: 'Wait' },
          { value: 'help', label: 'Help' },
          { value: 'not-allowed', label: 'Not Allowed' },
          { value: 'grab', label: 'Grab' },
          { value: 'grabbing', label: 'Grabbing' }
        ]}
      />

      {/* Pointer Events */}
      <ToggleSwitch
        label="Pointer Events"
        checked={component.styles.pointerEvents !== 'none'}
        onChange={(checked) => updateStyle('pointerEvents', checked ? 'auto' : 'none')}
        description="Enable/disable mouse interactions"
      />

      {/* User Select */}
      <SelectControl
        label="User Select"
        value={component.styles.userSelect as string || 'auto'}
        onChange={(value) => updateStyle('userSelect', value)}
        options={[
          { value: 'auto', label: 'Auto' },
          { value: 'none', label: 'None' },
          { value: 'text', label: 'Text' },
          { value: 'all', label: 'All' }
        ]}
      />
    </div>
  );
};