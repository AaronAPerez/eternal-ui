import React from 'react';
import { useBuilderStore } from '@/stores/builderStore';
import { useHistoryStore } from '@/stores/historyStore';
import { Component } from '@/types';
import { NumberInput } from '../controls/NumberInput';
import { SelectControl } from '../controls/SelectControl';
import { SpacingControl } from '../controls/SpacingControl';
import { FlexboxControls } from '../controls/FlexboxControls';
import { GridControls } from '../controls/GridControls';

interface LayoutPanelProps {
  component: Component;
}

export const LayoutPanel: React.FC<LayoutPanelProps> = ({ component }) => {
  const updateComponent = useBuilderStore(state => state.updateComponent);
  const saveToHistory = useHistoryStore(state => state.saveToHistory);
  const project = useBuilderStore(state => state.project);

  const updateStyle = (styleKey: string, value: any) => {
    updateComponent(component.id, {
      styles: { ...component.styles, [styleKey]: value }
    });
    saveToHistory(project.components as any, `Update ${styleKey}`);
  };

  const updatePosition = (axis: 'x' | 'y', value: number) => {
    updateComponent(component.id, {
      position: { ...component.position, [axis]: value }
    });
    saveToHistory(project.components as any, 'Update Position');
  };

  const updateSize = (dimension: 'width' | 'height', value: number) => {
    updateComponent(component.id, {
      size: { ...component.size, [dimension]: value }
    });
    saveToHistory(project.components as any, 'Update Size');
  };

  return (
    <div className="space-y-6">
      {/* Position */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Position
        </label>
        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="X"
            value={component.position.x}
            onChange={(value) => updatePosition('x', value)}
            unit="px"
          />
          <NumberInput
            label="Y"
            value={component.position.y}
            onChange={(value) => updatePosition('y', value)}
            unit="px"
          />
        </div>
      </div>

      {/* Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Size
        </label>
        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="Width"
            value={component.size.width}
            onChange={(value) => updateSize('width', value)}
            unit="px"
            min={1}
          />
          <NumberInput
            label="Height"
            value={component.size.height}
            onChange={(value) => updateSize('height', value)}
            unit="px"
            min={1}
          />
        </div>
      </div>

      {/* Display Type */}
      <SelectControl
        label="Display"
        value={component.styles.display as string || 'block'}
        onChange={(value) => updateStyle('display', value)}
        options={[
          { value: 'block', label: 'Block' },
          { value: 'inline-block', label: 'Inline Block' },
          { value: 'flex', label: 'Flex' },
          { value: 'grid', label: 'Grid' },
          { value: 'none', label: 'None' }
        ]}
      />

      {/* Position Type */}
      <SelectControl
        label="Position Type"
        value={component.styles.position as string || 'static'}
        onChange={(value) => updateStyle('position', value)}
        options={[
          { value: 'static', label: 'Static' },
          { value: 'relative', label: 'Relative' },
          { value: 'absolute', label: 'Absolute' },
          { value: 'fixed', label: 'Fixed' },
          { value: 'sticky', label: 'Sticky' }
        ]}
      />

      {/* Z-Index */}
      <NumberInput
        label="Z-Index"
        value={parseInt(component.styles.zIndex as string || '0')}
        onChange={(value) => updateStyle('zIndex', value)}
      />

      {/* Spacing */}
      <SpacingControl
        label="Padding"
        value={{
          top: component.styles.paddingTop as string || '0px',
          right: component.styles.paddingRight as string || '0px',
          bottom: component.styles.paddingBottom as string || '0px',
          left: component.styles.paddingLeft as string || '0px'
        }}
        onChange={(spacing) => {
          updateStyle('paddingTop', spacing.top);
          updateStyle('paddingRight', spacing.right);
          updateStyle('paddingBottom', spacing.bottom);
          updateStyle('paddingLeft', spacing.left);
        }}
      />

      <SpacingControl
        label="Margin"
        value={{
          top: component.styles.marginTop as string || '0px',
          right: component.styles.marginRight as string || '0px',
          bottom: component.styles.marginBottom as string || '0px',
          left: component.styles.marginLeft as string || '0px'
        }}
        onChange={(spacing) => {
          updateStyle('marginTop', spacing.top);
          updateStyle('marginRight', spacing.right);
          updateStyle('marginBottom', spacing.bottom);
          updateStyle('marginLeft', spacing.left);
        }}
      />

      {/* Flexbox Controls */}
      {component.styles.display === 'flex' && (
        <FlexboxControls
          flexDirection={component.styles.flexDirection as string || 'row'}
          justifyContent={component.styles.justifyContent as string || 'flex-start'}
          alignItems={component.styles.alignItems as string || 'stretch'}
          gap={component.styles.gap as string || '0px'}
          onChange={(property, value) => updateStyle(property, value)}
        />
      )}

      {/* Grid Controls */}
      {component.styles.display === 'grid' && (
        <GridControls
          gridTemplateColumns={component.styles.gridTemplateColumns as string || '1fr'}
          gridTemplateRows={component.styles.gridTemplateRows as string || 'auto'}
          gap={component.styles.gap as string || '0px'}
          onChange={(property, value) => updateStyle(property, value)}
        />
      )}

      {/* Overflow */}
      <SelectControl
        label="Overflow"
        value={component.styles.overflow as string || 'visible'}
        onChange={(value) => updateStyle('overflow', value)}
        options={[
          { value: 'visible', label: 'Visible' },
          { value: 'hidden', label: 'Hidden' },
          { value: 'scroll', label: 'Scroll' },
          { value: 'auto', label: 'Auto' }
        ]}
      />
    </div>
  );
};