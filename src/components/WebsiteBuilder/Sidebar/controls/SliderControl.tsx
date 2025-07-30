import React from 'react';

interface SliderControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

export const SliderControl: React.FC<SliderControlProps> = ({
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
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <span className="text-sm text-gray-500">
          {value}{unit}
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
        />
      </div>
    </div>
  );
};
