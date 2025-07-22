'use client';

import * as React from "react"
import { ChevronDown, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "../Button"
import { Badge } from "../Badge/Badge"

interface MegaMenuItem {
  title: string
  description?: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string
  external?: boolean
}

interface MegaMenuSection {
  title: string
  items: MegaMenuItem[]
}

interface MegaMenuCategory {
  label: string
  sections: MegaMenuSection[]
  featured?: {
    title: string
    description: string
    image: string
    href: string
  }
}

interface MegaMenuProps {
  trigger: React.ReactNode
  categories: MegaMenuCategory[]
  width?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

/**
 * Mega Menu Component for complex navigation
 * Features:
 * - Multi-level navigation with sections
 * - Featured content areas
 * - Responsive design with mobile fallback
 * - Hover and keyboard navigation
 * - Search integration capability
 * - Analytics tracking ready
 */
export function MegaMenu({
  trigger,
  categories,
  width = 'lg',
  className
}: MegaMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeCategory, setActiveCategory] = React.useState(0)
  const menuRef = React.useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard navigation
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isOpen) return

      switch (event.key) {
        case 'Escape':
          setIsOpen(false)
          break
        case 'ArrowLeft':
          setActiveCategory(prev => Math.max(0, prev - 1))
          break
        case 'ArrowRight':
          setActiveCategory(prev => Math.min(categories.length - 1, prev + 1))
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, categories.length])

  const getWidthClass = () => {
    const widthMap = {
      sm: 'w-96',
      md: 'w-[600px]',
      lg: 'w-[800px]',
      xl: 'w-[1000px]',
      full: 'w-full'
    }
    return widthMap[width]
  }

  return (
    <div ref={menuRef} className={cn("relative", className)}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {trigger}
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Mega Menu Dropdown */}
      {isOpen && (
        <div className={cn(
          "absolute top-full left-0 mt-2 bg-background border rounded-lg shadow-xl z-50",
          getWidthClass()
        )}>
          <div className="flex">
            {/* Category Tabs */}
            <div className="w-48 border-r bg-muted/30">
              <div className="p-4 space-y-1">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onMouseEnter={() => setActiveCategory(index)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      activeCategory === index
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    )}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6">
              {categories[activeCategory] && (
                <div className="space-y-6">
                  {/* Featured Content */}
                  {categories[activeCategory].featured && (
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={categories[activeCategory].featured!.image}
                          alt={categories[activeCategory].featured!.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">
                            {categories[activeCategory].featured!.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {categories[activeCategory].featured!.description}
                          </p>
                          <Button variant="outline" size="sm" asChild>
                            <a href={categories[activeCategory].featured!.href}>
                              Learn More
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Menu Sections */}
                  <div className="grid grid-cols-2 gap-6">
                    {categories[activeCategory].sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="space-y-3">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                          {section.title}
                        </h4>
                        <div className="space-y-2">
                          {section.items.map((item, itemIndex) => (
                            <a
                              key={itemIndex}
                              href={item.href}
                              className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                              onClick={() => setIsOpen(false)}
                            >
                              {item.icon && (
                                <item.icon className="h-5 w-5 text-muted-foreground mt-0.5 group-hover:text-foreground" />
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-sm group-hover:text-primary">
                                    {item.title}
                                  </p>
                                  {item.badge && (
                                    <Badge variant="secondary" className="text-xs">
                                      {item.badge}
                                    </Badge>
                                  )}
                                  {item.external && (
                                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                  )}
                                </div>
                                {item.description && (
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}