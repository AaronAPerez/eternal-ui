/**
 * ⏭️ SKIP NAVIGATION LINK
 * 
 * Accessibility feature for keyboard users
 */
import React from 'react'
import { cn } from '@/lib/utils'

interface SkipLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function SkipLink({ href, children, className }: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'sr-only focus:not-sr-only',
        'fixed top-4 left-4 z-[100]',
        'bg-primary text-primary-foreground',
        'px-4 py-2 rounded-md font-medium',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'transition-all duration-200',
        'transform -translate-y-full focus:translate-y-0',
        className
      )}
    >
      {children}
    </a>
  )
}