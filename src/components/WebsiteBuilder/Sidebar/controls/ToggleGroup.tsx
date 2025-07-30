import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ToggleOption {
  value: string;
  icon: LucideIcon;
  label: string;
}

interface ToggleGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: ToggleOption[];
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  value,
  onChange,
  options
}) => {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex-1 flex items-center justify-center p-2 rounded transition-colors ${
            value === option.value
              ? 'bg-white shadow-sm text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          title={option.label}
        >
          <option.icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
};