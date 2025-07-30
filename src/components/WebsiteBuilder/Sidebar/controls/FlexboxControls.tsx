import React from "react";
import { NumberInput } from "./NumberInput";
import { SelectControl } from "./SelectControl";


// FLEXBOX CONTROLS COMPONENT
export const FlexboxControls: React.FC<{
  flexDirection: string;
  justifyContent: string;
  alignItems: string;
  gap: string;
  onChange: (property: string, value: string) => void;
}> = ({ flexDirection, justifyContent, alignItems, gap, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Flexbox Layout
      </label>
      
      <div className="space-y-3">
        <SelectControl
          label="Direction"
          value={flexDirection}
          onChange={(value) => onChange('flexDirection', value)}
          options={[
            { value: 'row', label: 'Row' },
            { value: 'row-reverse', label: 'Row Reverse' },
            { value: 'column', label: 'Column' },
            { value: 'column-reverse', label: 'Column Reverse' }
          ]}
        />
        
        <SelectControl
          label="Justify Content"
          value={justifyContent}
          onChange={(value) => onChange('justifyContent', value)}
          options={[
            { value: 'flex-start', label: 'Start' },
            { value: 'center', label: 'Center' },
            { value: 'flex-end', label: 'End' },
            { value: 'space-between', label: 'Space Between' },
            { value: 'space-around', label: 'Space Around' },
            { value: 'space-evenly', label: 'Space Evenly' }
          ]}
        />
        
        <SelectControl
          label="Align Items"
          value={alignItems}
          onChange={(value) => onChange('alignItems', value)}
          options={[
            { value: 'stretch', label: 'Stretch' },
            { value: 'flex-start', label: 'Start' },
            { value: 'center', label: 'Center' },
            { value: 'flex-end', label: 'End' },
            { value: 'baseline', label: 'Baseline' }
          ]}
        />
        
        <NumberInput
          label="Gap"
          value={parseInt(gap)}
          onChange={(value) => onChange('gap', `${value}px`)}
          unit="px"
        />
      </div>
    </div>
  );
};