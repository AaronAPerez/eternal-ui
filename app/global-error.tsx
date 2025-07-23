// src/app/global-error.tsx
/**
 * 🌐 GLOBAL ERROR HANDLER
 * 
 * Next.js App Router global error boundary
 * Fixes: Global error handling during export
 */
'use client'

import React from 'react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center space-y-4 p-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Application Error
            </h1>
            <p className="text-gray-600">
              Something went wrong with the application.
            </p>
            <button
              onClick={reset}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}