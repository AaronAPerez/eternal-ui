import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectControlProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}

export const SelectControl: React.FC<SelectControlProps> = ({
  label,
  value,
  onChange,
  options
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};