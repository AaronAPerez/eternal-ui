'use client'

import { useEffect, useState } from 'react'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number
  delay?: number
}

export function AnimatedCounter({ value, suffix = '', duration = 2000, delay = 0 }: AnimatedCounterProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0
      const increment = value / (duration / 16)
      
      const counter = setInterval(() => {
        start += increment
        if (start >= value) {
          setCurrent(value)
          clearInterval(counter)
        } else {
          setCurrent(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(counter)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, duration, delay])

  return <span>{current.toLocaleString()}{suffix}</span>
}
