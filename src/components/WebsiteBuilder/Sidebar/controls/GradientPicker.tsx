import React from "react";


// GRADIENT PICKER COMPONENT
export const GradientPicker: React.FC<{
  value: string;
  onChange: (gradient: string) => void;
}> = ({ value, onChange }) => {
  const gradientPresets = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {gradientPresets.map((gradient, index) => (
          <button
            key={index}
            onClick={() => onChange(gradient)}
            className="w-full h-12 rounded border-2 border-gray-300 hover:border-blue-500 transition-colors"
            style={{ background: gradient }}
          />
        ))}
      </div>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
        rows={3}
        placeholder="Custom gradient CSS..."
      />
    </div>
  );
};
