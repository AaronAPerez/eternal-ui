'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button/Button'
import { Menu, X, Github } from 'lucide-react'
import ToggleSwitch from '../ui/ToggleSwitch'
import { EternalUILogo } from '../Logo/eternal-ui-logo'

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* 🏠 MAIN LOGO */}
          <EternalUILogo 
            size="sm" 
            showText={true}
            onClick={() => router.push('/')}
            className="hover:scale-105 transition-transform duration-200 cursor-pointer"
          />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/docs" className="nav-link">
              Documentation
            </Link>
            <Link href="/components" className="nav-link">
              Components
            </Link>
            <Link href="/studio" className="nav-link">
              Studio
            </Link>
            <Link href="/builder" className="nav-link">
              Website Builder
            </Link>
            <Link href="/playground" className="nav-link">
              Playground
            </Link>
          </div>
          
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ToggleSwitch checked={false} onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error('Function not implemented.')
            } }/>
            <Button variant="ghost" size="sm" icon={<Github />}>
              {/* GitHub */}
            </Button>
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        
        {/* 📱 MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 pt-4 pb-6 space-y-4">
              
              {/* Mobile Logo */}
              <div className="flex justify-center pb-4 border-b border-gray-200 dark:border-gray-700">
                <EternalUILogo size="md" showText={true} />
              </div>
              
              <div className="space-y-2">
                <Link href="/docs" className="mobile-nav-link">
                  Documentation
                </Link>
                <Link href="/components" className="mobile-nav-link">
                  Components
                </Link>
                <Link href="/playground" className="mobile-nav-link">
                  Playground
                </Link>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="primary" size="sm" fullWidth>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}