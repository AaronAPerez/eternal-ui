import { EternalUILogo } from '@/components/Logo/eternal-ui-logo'
import React, { useEffect, useState } from 'react'

const NavigationHeader: React.FC<{
  variant: 'simple' | 'centered' | 'mega' | 'sidebar'
  showLogo: boolean
  transparent: boolean
  sticky: boolean
}> = ({ variant, showLogo, transparent, sticky }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['Features', 'Pricing', 'About', 'Contact']

  const baseClasses = `w-full transition-all duration-300 z-50 ${
    sticky ? 'sticky top-0' : 'relative'
  } ${
    transparent && !isScrolled 
      ? 'bg-transparent' 
      : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700'
  }`

  const handleKeyDown = (event: React.KeyboardEvent, callback: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      callback()
    }
  }

  if (variant === 'mega') {
    return (
      <nav className={baseClasses} role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {showLogo && <EternalUILogo size="md" />}
            
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item} className="relative group">
                  <button 
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {item}
                  </button>
                  <div 
                    className="absolute top-full left-0 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-2"
                    role="menu"
                  >
                    <div className="p-4">
                      <div className="grid grid-cols-1 gap-2">
                        <a href="#" className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded text-sm" role="menuitem">Submenu Item</a>
                        <a href="#" className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded text-sm" role="menuitem">Another Item</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button className="hidden lg:block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium">
                Sign In
              </button>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                Get Started
              </button>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={(e) => handleKeyDown(e, () => setIsOpen(!isOpen))}
                className="lg:hidden p-2 text-gray-700 dark:text-gray-300"
                aria-label="Toggle mobile menu"
                aria-expanded={isOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div className="lg:hidden border-t border-gray-200 dark:border-gray-700" role="menu">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium"
                    role="menuitem"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    )
  }

  return (
    <nav className={baseClasses} role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {showLogo && <EternalUILogo size="md" />}
          
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="hidden lg:block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium">
              Sign In
            </button>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
              Get Started
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              onKeyDown={(e) => handleKeyDown(e, () => setIsOpen(!isOpen))}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-300"
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700" role="menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium"
                  role="menuitem"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavigationHeader;