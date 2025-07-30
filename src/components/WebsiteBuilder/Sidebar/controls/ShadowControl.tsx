import React from "react";

// SHADOW CONTROL COMPONENT
export const ShadowControl: React.FC<{
  value: string;
  onChange: (shadow: string) => void;
}> = ({ value, onChange }) => {
  const shadowPresets = [
    { label: 'None', value: 'none' },
    { label: 'Small', value: '0 1px 3px rgba(0,0,0,0.1)' },
    { label: 'Medium', value: '0 4px 6px rgba(0,0,0,0.1)' },
    { label: 'Large', value: '0 10px 15px rgba(0,0,0,0.1)' },
    { label: 'X-Large', value: '0 20px 25px rgba(0,0,0,0.1)' },
    { label: 'Inner', value: 'inset 0 2px 4px rgba(0,0,0,0.1)' }
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Shadow
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
      >
        {shadowPresets.map((preset) => (
          <option key={preset.value} value={preset.value}>
            {preset.label}
          </option>
        ))}
      </select>
    </div>
  );
};


