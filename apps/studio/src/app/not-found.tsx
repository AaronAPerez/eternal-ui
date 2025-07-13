import Link from 'next/link'
import { ArrowLeft, Home, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/" className="flex items-center justify-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <Link href="/builder" className="flex items-center justify-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Start Building</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
