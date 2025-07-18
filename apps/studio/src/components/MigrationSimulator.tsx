import { useState } from "react"

const MigrationSimulator = () => {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  
  const migrationSteps = [
    { name: 'Analyzing WordPress site...', duration: 2000 },
    { name: 'Extracting content...', duration: 3000 },
    { name: 'Converting theme to React...', duration: 4000 },
    { name: 'Optimizing performance...', duration: 2000 },
    { name: 'Generating components...', duration: 3000 },
    { name: 'Finalizing migration...', duration: 1000 }
  ]
  
  const startMigration = async () => {
    setIsRunning(true)
    setProgress(0)
    
    for (let i = 0; i < migrationSteps.length; i++) {
      const step = migrationSteps[i]
      setCurrentStep(step.name)
      
      // Animate progress for this step
      const stepProgress = 100 / migrationSteps.length
      const startProgress = i * stepProgress
      
      for (let p = 0; p <= stepProgress; p += 2) {
        setProgress(startProgress + p)
        await new Promise(resolve => setTimeout(resolve, step.duration / (stepProgress / 2)))
      }
    }
    
    setCurrentStep('Migration complete! 🎉')
    setIsRunning(false)
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border">
      <h3 className="text-lg font-bold mb-4">🚀 Live Migration Demo</h3>
      
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">{currentStep}</span>
          <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <button
        onClick={startMigration}
        disabled={isRunning}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isRunning ? 'Migration in Progress...' : 'Start Live Demo'}
      </button>
    </div>
  )
}