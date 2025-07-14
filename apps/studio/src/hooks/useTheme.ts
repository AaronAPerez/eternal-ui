'use client'

import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get saved theme or default to system
    const savedTheme = localStorage.getItem('eternal-ui-theme') as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }

    localStorage.setItem('eternal-ui-theme', theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(current => current === 'light' ? 'dark' : 'light')
  }

  return {
    theme,
    setTheme,
    toggleTheme,
    mounted
  }
}