import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useBuilderStore } from '@/stores/builderStore';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  showPresets?: boolean;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ 
  label, 
  value, 
  onChange, 
  showPresets = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customColor, setCustomColor] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const project = useBuilderStore(state => state.project);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const presetColors = [
    '#000000', '#ffffff', '#f3f4f6', '#9ca3af', '#374151',
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
    '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
    '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
    '#ec4899', '#f43f5e'
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-6 h-6 rounded border border-gray-300"
            style={{ backgroundColor: value }}
          />
          <span className="text-sm text-gray-700">{value}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-3">
          {/* Custom Color Input */}
          <div className="mb-3">
            <input
              type="color"
              value={customColor}
              onChange={(e) => {
                setCustomColor(e.target.value);
                onChange(e.target.value);
              }}
              className="w-full h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={customColor}
              onChange={(e) => {
                setCustomColor(e.target.value);
                onChange(e.target.value);
              }}
              className="w-full mt-2 px-3 py-1 border border-gray-300 rounded text-sm"
              placeholder="#000000"
            />
          </div>

          {/* Preset Colors */}
          {showPresets && (
            <>
              <div className="mb-2">
                <div className="text-xs font-medium text-gray-600 mb-2">Presets</div>
                <div className="grid grid-cols-6 gap-1">
                  {presetColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        onChange(color);
                        setCustomColor(color);
                        setIsOpen(false);
                      }}
                      className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Brand Colors */}
              <div>
                <div className="text-xs font-medium text-gray-600 mb-2">Brand Colors</div>
                <div className="grid grid-cols-6 gap-1">
                  {project.styles.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        onChange(color);
                        setCustomColor(color);
                        setIsOpen(false);
                      }}
                      className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};