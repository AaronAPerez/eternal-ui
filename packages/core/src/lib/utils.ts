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
 * Helper for creating component prop interfaces
 */
export interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

/**
 * Builder-specific component props - using optional id to avoid conflicts
 */
export interface BuilderComponentProps {
  'data-builder-id'?: string
  'data-builder-type'?: string
  'data-builder-editable'?: boolean
  'data-builder-selected'?: boolean
}

// Additional utilities specific to components
export interface BaseComponentProps extends ComponentProps {
  asChild?: boolean
}

// Forwarded ref utility type
export type ForwardedRef<T> = React.ForwardedRef<T>

// Component display name utility
export function setDisplayName<T extends React.ComponentType<any>>(
  component: T,
  name: string
): T {
  component.displayName = name
  return component
}

// Merge refs utility for complex components
export function mergeRefs<T = any>(
  ...refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}