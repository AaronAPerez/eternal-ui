import { tokens } from '../tokens'

export const defaultTheme = {
  name: 'default',
  colors: {
    ...tokens.colors,
    // Theme-specific semantic mappings
    background: tokens.colors.neutral[0],
    foreground: tokens.colors.neutral[950],
    muted: tokens.colors.neutral[100],
    'muted-foreground': tokens.colors.neutral[500],
    border: tokens.colors.neutral[200],
    input: tokens.colors.neutral[200],
    ring: tokens.colors.primary[500],
    accent: tokens.colors.neutral[100],
    'accent-foreground': tokens.colors.neutral[900]
  },
  typography: tokens.typography,
  spacing: tokens.spacing,
  shadows: tokens.shadows
} as const

export type Theme = typeof defaultTheme