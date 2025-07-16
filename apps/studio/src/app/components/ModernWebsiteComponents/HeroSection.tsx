import React from 'react'

const HeroSection: React.FC<{
  variant: 'centered' | 'split' | 'video-bg' | 'gradient' | 'minimal'
  title: string
  subtitle: string
  primaryCTA: string
  secondaryCTA: string
  showImage: boolean
  backgroundVideo: boolean
}> = ({ variant, title, subtitle, primaryCTA, secondaryCTA, showImage, backgroundVideo }) => {
  const baseClasses = "relative min-h-screen flex items-center justify-center overflow-hidden"
  
  if (variant === 'video-bg' && backgroundVideo) {
    return (
      <section className={`${baseClasses} text-white`}>
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-r from-indigo-900/80 to-purple-900/80" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">{subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
              aria-label={primaryCTA}
            >
              {primaryCTA}
            </button>
            <button 
              className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 rounded-lg font-semibold transition-all"
              aria-label={secondaryCTA}
            >
              {secondaryCTA}
            </button>
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'split') {
    return (
      <section className="min-h-screen flex items-center py-20 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              {title}
            </h1>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">{subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all"
                aria-label={primaryCTA}
              >
                {primaryCTA}
              </button>
              <button 
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 rounded-lg font-semibold transition-all"
                aria-label={secondaryCTA}
              >
                {secondaryCTA}
              </button>
            </div>
          </div>
          {showImage && (
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-white text-6xl" role="img" aria-label="Rocket">🚀</span>
              </div>
            </div>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className={`${baseClasses} bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-900`}>
      <div className="text-center max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
            aria-label={primaryCTA}
          >
            {primaryCTA}
          </button>
          <button 
            className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 rounded-lg font-semibold transition-all"
            aria-label={secondaryCTA}
          >
            {secondaryCTA}
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection;