import React from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = ''
}) => {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full px-3 py-2 pr-8 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {unit && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};