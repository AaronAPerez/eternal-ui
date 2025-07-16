import React from 'react'

const FeatureCardsGrid: React.FC<{
  variant: 'cards' | 'icons' | 'minimal' | 'hover-effects'
  columns: 2 | 3 | 4
  showIcons: boolean
  animated: boolean
}> = ({ variant, columns, showIcons, animated }) => {
  const features = [
    { icon: '⚡', title: 'Lightning Fast', description: 'Optimized for speed and performance across all devices' },
    { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security with end-to-end encryption' },
    { icon: '📱', title: 'Mobile First', description: 'Designed for mobile with responsive layouts' },
    { icon: '🎨', title: 'Customizable', description: 'Fully customizable components and themes' },
    { icon: '🚀', title: 'Easy Deploy', description: 'One-click deployment to any platform' },
    { icon: '📊', title: 'Analytics', description: 'Built-in analytics and performance monitoring' }
  ]

  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to build modern, scalable applications
          </p>
        </div>

        <div className={`grid ${gridClasses[columns]} gap-8`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group ${
                variant === 'cards'
                  ? 'bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all'
                  : variant === 'hover-effects'
                  ? 'p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl'
                  : 'p-6'
              } ${animated ? 'opacity-0 animate-fade-in' : ''}`}
              style={{ 
                animationDelay: animated ? `${index * 100}ms` : undefined,
                animationFillMode: animated ? 'forwards' : undefined
              }}
            >
              {showIcons && (
                <div className={`${
                  variant === 'icons' 
                    ? 'w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4'
                    : 'mb-4'
                }`}>
                  <span className="text-2xl" role="img" aria-label={feature.title}>{feature.icon}</span>
                </div>
              )}
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </section>
  )
}

export default FeatureCardsGrid;