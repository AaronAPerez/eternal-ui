import { Check } from 'lucide-react';
import React from 'react'
// Animated Toggle Switch
type ToggleSwitchProps = {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, label, size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-4',
    md: 'w-10 h-5',
    lg: 'w-12 h-6'
  }
  
  const thumbSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4', 
    lg: 'w-5 h-5'
  }
  
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className={`
          ${sizes[size]} rounded-full transition-all duration-300 ease-in-out
          ${checked 
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30' 
            : 'bg-gray-300 dark:bg-gray-600'
          }
        `}>
          <div className={`
            ${thumbSizes[size]} bg-white rounded-full shadow-md transform transition-all duration-300 ease-in-out
            absolute top-0.5 ${checked ? 'translate-x-full' : 'translate-x-0.5'}
            flex items-center justify-center
          `}>
            {checked && <Check className="w-2 h-2 text-blue-500" />}
          </div>
        </div>
      </div>
      
      {label && (
        <span className="text-gray-700 dark:text-gray-300 select-none group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
          {label}
        </span>
      )}
    </label>
  )
}

export default ToggleSwitch