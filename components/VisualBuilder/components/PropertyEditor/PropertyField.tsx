import React from 'react';
import { PropSchemaItem } from '../../types';
import Image from 'next/image';

interface PropertyFieldProps {
  name: string;
  schema: PropSchemaItem;
  value: never;
  onChange: (value: unknown) => void;
}

export const PropertyField: React.FC<PropertyFieldProps> = ({ 
  name, 
  schema, 
  value, 
  onChange 
}) => {
  const displayName = name.replace(/([A-Z])/g, ' $1').trim();
  const capitalizedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

  const renderField = () => {
    switch (schema.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={schema.placeholder}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            rows={schema.rows || 3}
            placeholder={schema.placeholder}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
          />
        );

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            <option value="">Select...</option>
            {schema.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'boolean':
        return (
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">Enable</span>
          </label>
        );

      case 'color':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={value || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded-md cursor-pointer"
            />
            <input
              type="text"
              value={value || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#000000"
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
        );

      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(Number(e.target.value))}
            min={schema.min}
            max={schema.max}
            step={schema.step}
            placeholder={schema.placeholder}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        );

      case 'image':
        return (
          <div className="space-y-2">
            <input
              type="url"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
            {value && (
              <div className="mt-2">
                <Image
                  src={value}
                  alt="Preview"
                  className="w-full h-24 object-cover rounded-md border border-gray-200"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        );

      case 'spacing':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="e.g., 1rem, 10px 20px"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
            
            {/* Quick spacing presets */}
            <div className="flex flex-wrap gap-1">
              {['0', '0.25rem', '0.5rem', '1rem', '1.5rem', '2rem'].map((preset) => (
                <button
                  key={preset}
                  onClick={() => onChange(preset)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    value === preset
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        );
    }
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {capitalizedName}
      </label>
      {renderField()}
      {schema.description && (
        <p className="text-xs text-gray-500">{schema.description}</p>
      )}
    </div>
  );
};