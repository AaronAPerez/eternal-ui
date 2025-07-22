/**
 * 👁️ SCREEN READER ONLY CONTENT
 * 
 * Content visible to screen readers but hidden visually
 */
import React from 'react'
import { cn } from '@/lib/utils'

interface VisuallyHiddenProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

export function VisuallyHidden({ 
  children, 
  className, 
  asChild = false 
}: VisuallyHiddenProps) {
  const Comp = asChild ? 'span' : 'span'
  
  return (
    <Comp
      className={cn(
        'sr-only absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0',
        className
      )}
    >
      {children}
    </Comp>
  )
}