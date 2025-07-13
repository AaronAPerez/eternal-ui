'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Frontend Developer',
    company: 'TechCorp',
    content: 'Eternal UI has transformed how we build websites. The AI suggestions are incredibly accurate and save us hours of work.',
    rating: 5,
    avatar: '/avatars/sarah.jpg'
  },
  {
    name: 'Michael Chen',
    role: 'Design Director',
    company: 'Creative Studio',
    content: 'The code quality is outstanding. Clean, maintainable, and follows best practices. Our team productivity has increased by 300%.',
    rating: 5,
    avatar: '/avatars/michael.jpg'
  },
  {
    name: 'Emily Davis',
    role: 'Product Manager',
    company: 'StartupXYZ',
    content: 'Finally, a website builder that doesnt lock us in. We can export our code and deploy anywhere. Game changer!',
    rating: 5,
    avatar: '/avatars/emily.jpg'
  }
]

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative">
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 ${
              index === currentIndex ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="flex items-center space-x-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              "{testimonial.content}"
            </p>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.role} at {testimonial.company}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={prev}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}