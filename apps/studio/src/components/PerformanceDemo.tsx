import { useState } from "react"

const PerformanceDemo = () => {
  const [isLoading, setIsLoading] = useState(false)
  
  const simulateLoad = (type: 'wordpress' | 'eternal') => {
    setIsLoading(true)
    const loadTime = type === 'wordpress' ? 3200 : 800
    
    setTimeout(() => {
      setIsLoading(false)
    }, loadTime)
  }
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <button 
        onClick={() => simulateLoad('wordpress')}
        className="p-4 border-2 border-red-200 rounded-lg"
      >
        <h4 className="font-bold text-red-600">WordPress Load Test</h4>
        <p className="text-red-500">~3.2 seconds</p>
      </button>
      
      <button 
        onClick={() => simulateLoad('eternal')}
        className="p-4 border-2 border-green-200 rounded-lg"
      >
        <h4 className="font-bold text-green-600">Eternal UI Load Test</h4>
        <p className="text-green-500">~0.8 seconds</p>
      </button>
    </div>
  )
}