import React, { useState } from "react";
import { NumberInput } from "./NumberInput";


// SPACING CONTROL COMPONENT
export const SpacingControl: React.FC<{
  label: string;
  value: { top: string; right: string; bottom: string; left: string };
  onChange: (spacing: { top: string; right: string; bottom: string; left: string }) => void;
}> = ({ label, value, onChange }) => {
  const [isLinked, setIsLinked] = useState(true);
  
  const handleChange = (side: keyof typeof value, newValue: string) => {
    if (isLinked) {
      onChange({
        top: newValue,
        right: newValue,
        bottom: newValue,
        left: newValue
      });
    } else {
      onChange({ ...value, [side]: newValue });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <button
          onClick={() => setIsLinked(!isLinked)}
          className={`text-xs px-2 py-1 rounded ${
            isLinked ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
          }`}
        >
          {isLinked ? '🔗' : '🔓'}
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <NumberInput
          label="Top"
          value={parseInt(value.top)}
          onChange={(val) => handleChange('top', `${val}px`)}
          unit="px"
        />
        <NumberInput
          label="Right"
          value={parseInt(value.right)}
          onChange={(val) => handleChange('right', `${val}px`)}
          unit="px"
        />
        <NumberInput
          label="Bottom"
          value={parseInt(value.bottom)}
          onChange={(val) => handleChange('bottom', `${val}px`)}
          unit="px"
        />
        <NumberInput
          label="Left"
          value={parseInt(value.left)}
          onChange={(val) => handleChange('left', `${val}px`)}
          unit="px"
        />
      </div>
    </div>
  );
};