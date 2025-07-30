import React from "react";
import { NumberInput } from "./NumberInput";

// GRID CONTROLS COMPONENT
export const GridControls: React.FC<{
  gridTemplateColumns: string;
  gridTemplateRows: string;
  gap: string;
  onChange: (property: string, value: string) => void;
}> = ({ gridTemplateColumns, gridTemplateRows, gap, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Grid Layout
      </label>
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Columns</label>
          <input
            type="text"
            value={gridTemplateColumns}
            onChange={(e) => onChange('gridTemplateColumns', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="1fr 1fr"
          />
        </div>
        
        <div>
          <label className="block text-xs text-gray-500 mb-1">Rows</label>
          <input
            type="text"
            value={gridTemplateRows}
            onChange={(e) => onChange('gridTemplateRows', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="auto"
          />
        </div>
        
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