'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Sparkles } from 'lucide-react';
import { EternalUILogo } from '@/components/ui/Logo/eternal-ui-logo';


interface NavigationProps {
  variant?: 'default' | 'studio';
  showCTA?: boolean;
}

export function Navigation({ variant = 'default', showCTA = true }: NavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isStudioRoute = pathname?.startsWith('/studio');
  const isActive = (path: string) => pathname === path;

  // Studio navigation has different styling
  const navStyles = variant === 'studio' 
    ? 'bg-gray-900 border-gray-700' 
    : 'bg-white border-gray-200';
  
  const textStyles = variant === 'studio' 
    ? 'text-gray-300 hover:text-white' 
    : 'text-gray-600 hover:text-gray-900';
    

  const navigationItems = [
    { name: 'Components', href: '/components' },
    { name: 'Templates', href: '/templates' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <nav className={`${navStyles} border-b sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {/* 🏠 MAIN LOGO */}
          <EternalUILogo 
            size="sm" 
            showText={true}
            className="hover:scale-105 transition-transform duration-200 cursor-pointer"
          />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${textStyles} transition-colors ${
                  isActive(item.href) ? 'font-semibold' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {showCTA && (
              <div className="flex items-center space-x-4">
                {!isStudioRoute && (
                  <Link 
                    href="/studio" 
                    className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                  >
                    Launch Studio
                  </Link>
                )}
                
                <button
                  onClick={() => router.push('/studio/new')}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Building</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 ${textStyles}`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={`md:hidden py-4 border-t ${variant === 'studio' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block ${textStyles} ${
                    isActive(item.href) ? 'font-semibold' : ''
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {!isStudioRoute && (
                <Link 
                  href="/studio" 
                  className="block text-indigo-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Launch Studio
                </Link>
              )}
              
              {showCTA && (
                <button
                  onClick={() => {
                    router.push('/studio/new');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Start Building
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}