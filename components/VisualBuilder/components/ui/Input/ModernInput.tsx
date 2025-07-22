'use client';

import { Check, Eye, EyeOff, X } from "lucide-react"
import React, { useState } from "react"

// Advanced Input Component
interface ModernInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  error?: string;
  success?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  loading?: boolean;
}

const ModernInput: React.FC<ModernInputProps> = ({ 
  label, 
  type = 'text', 
  error, 
  success, 
  helperText, 
  leftIcon, 
  rightIcon,
  showPasswordToggle = false,
  loading = false,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState(false)
  
  const inputType = type === 'password' && showPassword ? 'text' : type
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <input
          type={inputType}
          className={`
            w-full px-4 py-3 rounded-xl border transition-all duration-200
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon || showPasswordToggle ? 'pr-10' : ''}
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
              : success 
                ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }
            ${focused ? 'ring-2 ring-opacity-50' : ''}
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            disabled:bg-gray-50 disabled:cursor-not-allowed
            dark:bg-gray-800 dark:border-gray-600 dark:text-white
            placeholder:text-gray-400
          `}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        
        {(rightIcon || showPasswordToggle || loading) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {loading && (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
            )}
            
            {showPasswordToggle && type === 'password' && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            )}
            
            {rightIcon && <span className="text-gray-400">{rightIcon}</span>}
          </div>
        )}
      </div>
      
      {(error || success || helperText) && (
        <div className="flex items-center gap-1 text-xs">
          {error && (
            <>
              <X className="w-3 h-3 text-red-500" />
              <span className="text-red-600">{error}</span>
            </>
          )}
          {success && (
            <>
              <Check className="w-3 h-3 text-green-500" />
              <span className="text-green-600">{success}</span>
            </>
          )}
          {helperText && !error && !success && (
            <span className="text-gray-500">{helperText}</span>
          )}
        </div>
      )}
    </div>
  )
}


export default ModernInput