import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export const MainNav = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Eternal UI
            </Link>
            <Link 
              href="/builder" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Builder
            </Link>
            <Link 
              href="/ai-demo" 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Demo</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};