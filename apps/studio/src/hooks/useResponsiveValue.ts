// src/hooks/useResponsiveValue.ts
/**
 * 🎯 RESPONSIVE VALUE HOOK
 * 
 * Returns different values based on screen size
 */
import { useMediaQuery } from './useMediaQuery'

interface ResponsiveValue<T> {
  base: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}

export function useResponsiveValue<T>(values: ResponsiveValue<T>): T {
  const is2xl = useMediaQuery('2xl')
  const isXl = useMediaQuery('xl')
  const isLg = useMediaQuery('lg')
  const isMd = useMediaQuery('md')
  const isSm = useMediaQuery('sm')

  if (is2xl && values['2xl'] !== undefined) return values['2xl']
  if (isXl && values.xl !== undefined) return values.xl
  if (isLg && values.lg !== undefined) return values.lg
  if (isMd && values.md !== undefined) return values.md
  if (isSm && values.sm !== undefined) return values.sm

  return values.base
}

// Example usage:
// const columns = useResponsiveValue({
//   base: 1,
//   md: 2,
//   lg: 3,
//   xl: 4
// })
