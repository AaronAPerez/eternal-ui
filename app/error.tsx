// src/app/error.tsx
/**
 * 🚨 CUSTOM ERROR PAGE
 * 
 * Next.js App Router error boundary
 * Fixes: Export errors for 500 page
 */
'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { RefreshCw, Home, AlertTriangle } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center space-y-8">
        
        {/* Error Visual */}
        <div className="space-y-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Something went wrong!
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300">
            We encountered an unexpected error. This has been reported to our team.
          </p>
          
          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <summary className="cursor-pointer text-sm font-medium mb-2">
                Error Details (Development)
              </summary>
              <pre className="text-xs text-red-600 dark:text-red-400 overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary" 
            icon={<RefreshCw className="w-4 h-4" />}
            onClick={reset}
            className="w-full sm:w-auto"
          >
            Try Again
          </Button>
          
          <Link href="/">
            <Button 
              variant="outline" 
              icon={<Home className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Go Home
            </Button>
          </Link>
        </div>

        {/* Support Info */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Error ID: {error.digest}
          </p>
        </div>
      </div>
    </div>
  )
}