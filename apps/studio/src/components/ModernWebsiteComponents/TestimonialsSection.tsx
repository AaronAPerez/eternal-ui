import React, { useCallback, useEffect, useState } from 'react'

const TestimonialsSection: React.FC<{
  variant: 'carousel' | 'grid' | 'featured' | 'minimal'
  showImages: boolean
  animated: boolean
}> = ({ variant, showImages, animated }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior Designer',
      company: 'TechCorp',
      content: 'Eternal UI has transformed our design workflow. The component library is incredibly comprehensive and the code quality is outstanding.',
      avatar: '👩‍💻',
      rating: 5
    },
    {
      name: 'Elena Vasquez',
      role: 'Product Manager',
      company: 'StartupCo',
      content: 'Implementation was a breeze. Our time-to-market improved by 40% thanks to the ready-to-use components.',
      avatar: '👩‍💼',
      rating: 5
    },
    {
      name: 'James Park',
      role: 'CTO',
      company: 'ScaleUp Inc',
      content: 'Exceptional accessibility features and performance optimization. Our users love the improved experience.',
      avatar: '👨‍💼',
      rating: 5
    }
  ]

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  // Auto-advance carousel
  useEffect(() => {
    if (variant === 'carousel') {
      const interval = setInterval(nextTestimonial, 5000)
      return () => clearInterval(interval)
    }
  }, [variant, nextTestimonial])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ⭐
      </span>
    ))
  }

  if (variant === 'carousel') {
    return (
      <section className="py-20 bg-indigo-50 dark:bg-indigo-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Trusted by thousands of developers and designers worldwide
            </p>
          </div>

          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <div className="text-center">
                {showImages && (
                  <div className="w-16 h-16 mx-auto mb-4 text-4xl flex items-center justify-center">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                )}
                
                <div className="flex justify-center mb-4">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>
                
                <blockquote className="text-xl text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'grid') {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Loved by Developers & Designers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what our community has to say
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 ${
                  animated ? 'opacity-0 animate-fade-in' : ''
                }`}
                style={{ 
                  animationDelay: animated ? `${index * 200}ms` : undefined,
                  animationFillMode: animated ? 'forwards' : undefined
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  {showImages && (
                    <div className="w-12 h-12 text-2xl flex items-center justify-center">
                      {testimonial.avatar}
                    </div>
                  )}
                  <div className="flex">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                
                <blockquote className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  "{testimonial.content}"
                </blockquote>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Featured variant (single large testimonial)
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          {renderStars(testimonials[0].rating)}
        </div>
        
        <blockquote className="text-2xl md:text-3xl font-light mb-8 italic">
          "{testimonials[0].content}"
        </blockquote>
        
        {showImages && (
          <div className="w-20 h-20 mx-auto mb-4 text-5xl flex items-center justify-center">
            {testimonials[0].avatar}
          </div>
        )}
        
        <div>
          <h4 className="text-xl font-semibold">{testimonials[0].name}</h4>
          <p className="text-indigo-200">
            {testimonials[0].role} at {testimonials[0].company}
          </p>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection;