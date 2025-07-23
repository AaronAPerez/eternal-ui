// src/components/ui/ThemeToggle.tsx
/**
 * 🌓 THEME TOGGLE COMPONENT
 * 
 * Beautiful theme switcher with animation
 * Addresses: Proper theme management for modern UI
 */
'use client'

import React from 'react'

import { Sun, Moon, Monitor } from 'lucide-react'
import { Button } from './Button/Button'

// Simple theme toggle without complex context for now
export function ThemeToggle() {
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'system'>('system')

  React.useEffect(() => {
    const root = window.document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else if (theme === 'light') {
      root.classList.remove('dark')
      root.classList.add('light')
    } else {
      // System theme
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.remove('light', 'dark')
      root.classList.add(systemTheme)
    }
  }, [theme])

  const themes = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    { value: 'system' as const, icon: Monitor, label: 'System' },
  ]

  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {themes.map(({ value, icon: Icon, label }) => (
        <Button
          key={value}
          variant={theme === value ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setTheme(value)}
          icon={<Icon className="w-4 h-4" />}
          className="transition-all duration-200"
          aria-label={`Switch to ${label} theme`}
        >
          {label}
        </Button>
      ))}
    </div>
  )
}