'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface DropdownItem {
  name: string
  href: string
  description?: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string
}

interface DropdownMenuProps {
  items: DropdownItem[]
  onClose: () => void
  className?: string
}

export function DropdownMenu({ items, onClose, className = '' }: DropdownMenuProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 ${className}`}>
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={onClose}
          className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-start space-x-3">
            {item.icon && (
              <item.icon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.name}
                </span>
                {item.badge && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300">
                    {item.badge}
                  </span>
                )}
                <ArrowUpRight className="w-3 h-3 text-gray-400" />
              </div>
              {item.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}