import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import * as React from 'react'

/**
 * Combines class names with Tailwind CSS merge
 * Handles conditional classes and removes duplicates
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Type-safe variant handler for component variants
 */
export type VariantProps<T> = T extends (...args: any[]) => any
  ? Parameters<T>[0]
  : never

/**
 * Helper for creating component prop interfaces
 */
export interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

/**
 * Builder-specific component props
 */
export interface BuilderComponentProps extends ComponentProps {
  id: string
  'data-builder-id'?: string
  'data-builder-type'?: string
  'data-builder-editable'?: boolean
  'data-builder-selected'?: boolean
}