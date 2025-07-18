import { useEffect, useState } from "react"

const AnimatedCounter = ({ target, suffix = "" }: { target: number, suffix?: string }) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev < target) {
          return Math.min(prev + Math.ceil(target / 50), target)
        }
        return target
      })
    }, 50)
    
    return () => clearInterval(timer)
  }, [target])
  
  return <span>{count}{suffix}</span>
}

// Usage:
<div className="text-4xl font-bold text-green-600">
  <AnimatedCounter target={85} suffix="%" />
</div>