// src/app/not-found.tsx
/**
 * 🔍 CUSTOM 404 PAGE
 * 
 * Next.js App Router custom 404 page
 * Fixes: Export errors for 404 page
 */
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center space-y-8">
        
        {/* 404 Visual */}
        <div className="space-y-4">
          <div className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            404
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button 
              variant="primary" 
              icon={<Home className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Go Home
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            Go Back
          </Button>
        </div>

        {/* Search Suggestion */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Looking for something specific?
          </p>
          <Link href="/components">
            <Button 
              variant="ghost" 
              icon={<Search className="w-4 h-4" />}
              className="text-blue-600 dark:text-blue-400"
            >
              Browse Components
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
