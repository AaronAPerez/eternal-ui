'use client'

import React from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme()

  if (!mounted) {
    return (
      <div className="w-24 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
    )
  }

  const themes = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    { value: 'system' as const, icon: Monitor, label: 'Auto' },
  ]

  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 transition-colors duration-300">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
            theme === value
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
          aria-label={`Switch to ${label} theme`}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}