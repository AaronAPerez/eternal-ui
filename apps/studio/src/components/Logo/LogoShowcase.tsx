import React from 'react'
import { EternalUILogo } from './eternal-ui-logo'


/**
 * 📚 LOGO SHOWCASE
 * 
 * Interactive demonstration of the logo component
 */
export default function LogoShowcase() {
  const [selectedVariant, setSelectedVariant] = React.useState<'default' | 'mono' | 'gradient' | 'outline'>('default')
  const [selectedSize, setSelectedSize] = React.useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
  const [showText, setShowText] = React.useState(true)
  
  const variants = [
    { value: 'default', label: 'Default' },
    { value: 'gradient', label: 'Gradient' },
    { value: 'mono', label: 'Monochrome' },
    { value: 'outline', label: 'Outline' }
  ] as const
  
  const sizes = [
    { value: 'xs', label: 'Extra Small' },
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'xl', label: 'Extra Large' }
  ] as const
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Eternal UI Logo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A timeless logo design that embodies infinite possibilities and modern elegance.
          </p>
        </div>
        
        {/* Interactive Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Interactive Preview
          </h2>
          
          {/* Logo Display */}
          <div className="flex justify-center items-center min-h-[200px] mb-8 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
            <EternalUILogo
              variant={selectedVariant}
              size={selectedSize}
              showText={showText}
            />
          </div>
          
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Variant Selector */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Variant
              </label>
              <div className="grid grid-cols-2 gap-2">
                {variants.map((variant) => (
                  <button
                    key={variant.value}
                    onClick={() => setSelectedVariant(variant.value)}
                    className={`
                      px-3 py-2 text-sm rounded-lg border transition-colors
                      ${selectedVariant === variant.value
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                      }
                    `}
                  >
                    {variant.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Size Selector */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setSelectedSize(size.value)}
                    className={`
                      px-2 py-2 text-xs rounded-lg border transition-colors
                      ${selectedSize === size.value
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                      }
                    `}
                  >
                    {size.value.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Text Toggle */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Options
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showText}
                  onChange={(e) => setShowText(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Show Text
                </span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Usage Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Different Contexts */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Usage Examples
            </h3>
            
            <div className="space-y-6">
              
              {/* Navigation Bar */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center justify-between">
                  <EternalUILogo size="sm" />
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">Login</button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Navigation bar usage</p>
              </div>
              
              {/* Footer */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-900 text-white">
                <div className="flex items-center justify-between">
                  <EternalUILogo size="sm" variant="mono" />
                  <div className="text-xs">© 2024 Eternal UI</div>
                </div>
                <p className="text-xs text-gray-400 mt-2">Footer usage (dark theme)</p>
              </div>
              
              {/* Loading Screen */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white text-center">
                <EternalUILogo size="lg" variant="mono" className="text-white mx-auto mb-2" />
                <div className="text-sm opacity-80">Loading your experience...</div>
                <p className="text-xs text-blue-100 mt-2">Loading screen usage</p>
              </div>
            </div>
          </div>
          
          {/* Code Examples */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Code Examples
            </h3>
            
            <div className="space-y-4">
              
              {/* Basic Usage */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Basic Usage
                </h4>
                <pre className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 text-xs overflow-x-auto">
                  <code className="text-gray-800 dark:text-gray-200">
{`// Basic logo with text
<EternalUILogo size="md" showText={true} />

// Icon only for compact spaces
<EternalUILogo size="sm" showText={false} />

// Clickable logo for navigation
<EternalUILogo 
  size="lg"
  onClick={() => router.push('/')}
/>`}
                  </code>
                </pre>
              </div>
              
              {/* Advanced Usage */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Advanced Usage
                </h4>
                <pre className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 text-xs overflow-x-auto">
                  <code className="text-gray-800 dark:text-gray-200">
{`// Custom styling
<EternalUILogo 
  variant="outline"
  size="xl"
  className="text-blue-600 hover:text-blue-700"
/>

// Responsive sizing
<EternalUILogo 
  size="sm"
  className="md:w-16 md:h-16"
  showText={false}
/>`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
        
        {/* Design Philosophy */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Design Philosophy
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Eternal</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                The infinity symbol represents timeless design that never goes out of style.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Modern</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Clean geometry and gradients create a contemporary, tech-forward appearance.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Scalable</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Vector-based design ensures crisp appearance at any size, from favicons to billboards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}