'use client'

// Simulate our components since we can't import them directly yet
// In a real implementation, these would be imports from @eternal-ui/core

function SimulatedButton({ children, variant = 'default', size = 'default', ...props }: any) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'destructive': return 'bg-red-500 text-white hover:bg-red-600'
      case 'outline': return 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
      case 'secondary': return 'bg-gray-100 text-gray-900 hover:bg-gray-200'
      case 'ghost': return 'text-gray-900 hover:bg-gray-100'
      case 'link': return 'text-blue-500 underline hover:text-blue-600'
      default: return 'bg-blue-500 text-white hover:bg-blue-600'
    }
  }
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'h-9 px-3 text-sm'
      case 'lg': return 'h-11 px-8 text-base'
      default: return 'h-10 px-4 text-sm'
    }
  }
  
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors ${getVariantClasses()} ${getSizeClasses()}`}
      {...props}
    >
      {children}
    </button>
  )
}

function SimulatedInput({ placeholder, inputSize = 'default', ...props }: any) {
  const getSizeClasses = () => {
    switch (inputSize) {
      case 'sm': return 'h-9 text-xs'
      case 'lg': return 'h-11 text-base'
      default: return 'h-10 text-sm'
    }
  }
  
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 ${getSizeClasses()} placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      {...props}
    />
  )
}

function SimulatedContainer({ children, size = 'lg', padding = 'md', ...props }: any) {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'max-w-screen-sm'
      case 'md': return 'max-w-screen-md'
      case 'lg': return 'max-w-screen-lg'
      case 'xl': return 'max-w-screen-xl'
      case '2xl': return 'max-w-screen-2xl'
      case 'full': return 'max-w-full'
      default: return 'max-w-screen-lg'
    }
  }
  
  const getPaddingClasses = () => {
    switch (padding) {
      case 'none': return ''
      case 'sm': return 'px-4'
      case 'md': return 'px-6'
      case 'lg': return 'px-8'
      case 'xl': return 'px-12'
      default: return 'px-6'
    }
  }
  
  return (
    <div className={`mx-auto w-full ${getSizeClasses()} ${getPaddingClasses()}`} {...props}>
      {children}
    </div>
  )
}

function SimulatedGrid({ children, cols = 3, gap = 4, ...props }: any) {
  const getColsClasses = () => {
    switch (cols) {
      case 1: return 'grid-cols-1'
      case 2: return 'grid-cols-2'
      case 3: return 'grid-cols-3'
      case 4: return 'grid-cols-4'
      case 6: return 'grid-cols-6'
      case 12: return 'grid-cols-12'
      default: return 'grid-cols-3'
    }
  }
  
  const getGapClasses = () => {
    switch (gap) {
      case 0: return 'gap-0'
      case 1: return 'gap-1'
      case 2: return 'gap-2'
      case 3: return 'gap-3'
      case 4: return 'gap-4'
      case 6: return 'gap-6'
      case 8: return 'gap-8'
      case 12: return 'gap-12'
      default: return 'gap-4'
    }
  }
  
  return (
    <div className={`grid ${getColsClasses()} ${getGapClasses()}`} {...props}>
      {children}
    </div>
  )
}

function SimulatedCard({ children, variant = 'default', padding = 'md', ...props }: any) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'elevated': return 'border border-gray-200 shadow-md'
      case 'outlined': return 'border-2 border-gray-300 shadow-none'
      default: return 'border border-gray-200 shadow-sm'
    }
  }
  
  const getPaddingClasses = () => {
    switch (padding) {
      case 'none': return ''
      case 'sm': return 'p-4'
      case 'md': return 'p-6'
      case 'lg': return 'p-8'
      default: return 'p-6'
    }
  }
  
  return (
    <div className={`rounded-lg bg-white ${getVariantClasses()} ${getPaddingClasses()}`} {...props}>
      {children || <p className="text-gray-500">Card Content</p>}
    </div>
  )
}

export function ComponentRenderer({ element }: { element: any }) {
  const { type, props } = element
  
  switch (type) {
    case 'button':
      return <SimulatedButton {...props} />
    
    case 'input':
      return <SimulatedInput {...props} />
    
    case 'container':
      return (
        <SimulatedContainer {...props}>
          <p className="text-gray-600 text-center py-8">Container - Add components inside</p>
        </SimulatedContainer>
      )
    
    case 'grid':
      return (
        <SimulatedGrid {...props}>
          {Array.from({ length: props.cols || 3 }).map((_, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded text-center text-gray-600">
              Grid Item {index + 1}
            </div>
          ))}
        </SimulatedGrid>
      )
    
    case 'card':
      return <SimulatedCard {...props} />
    
    default:
      return (
        <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <p className="text-gray-600">Unknown component: {type}</p>
        </div>
      )
  }
}