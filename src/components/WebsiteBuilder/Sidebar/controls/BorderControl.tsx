import React from 'react'
import { ColorPicker } from './ColorPicker';
import { SelectControl } from './SelectControl';
import { SliderControl } from './SliderControl';


// BORDER CONTROL COMPONENT
export const BorderControl: React.FC<{
  border: { width: string; style: string; color: string };
  onChange: (border: { width: string; style: string; color: string }) => void;
}> = ({ border, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Border
      </label>
      
      <div className="space-y-3">
        <SliderControl
          label="Width"
          value={parseInt(border.width)}
          onChange={(value) => onChange({ ...border, width: `${value}px` })}
          min={0}
          max={20}
          unit="px"
        />
        
        <SelectControl
          label="Style"
          value={border.style}
          onChange={(value) => onChange({ ...border, style: value })}
          options={[
            { value: 'solid', label: 'Solid' },
            { value: 'dashed', label: 'Dashed' },
            { value: 'dotted', label: 'Dotted' },
            { value: 'double', label: 'Double' },
            { value: 'groove', label: 'Groove' },
            { value: 'ridge', label: 'Ridge' },
            { value: 'inset', label: 'Inset' },
            { value: 'outset', label: 'Outset' }
          ]}
        />
        
        <ColorPicker
          label="Color"
          value={border.color}
          onChange={(value) => onChange({ ...border, color: value })}
        />
      </div>
    </div>
  );
};
