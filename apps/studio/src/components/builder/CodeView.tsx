'use client'

import { useBuilderStore } from '@/stores/builderStore'
import { useState } from 'react'
import { Copy, Download } from 'lucide-react'

export function CodeView() {
  const { elements } = useBuilderStore()
  const [copied, setCopied] = useState(false)
  
  const generateReactCode = () => {
    const imports = `import React from 'react'\n\n`
    const component = `export default function App() {\n  return (\n    <div className="p-8">\n${generateElementsCode(elements, 6)}\n    </div>\n  )\n}`
    return imports + component
  }
  
  const generateElementsCode = (elements: any[], indent: number): string => {
    return elements
      .filter(el => !el.parent)
      .map(el => generateElementCode(el, indent))
      .join('\n')
  }
  
  const generateElementCode = (element: any, indent: number): string => {
    const spaces = ' '.repeat(indent)
    
    switch (element.type) {
      case 'button':
        return `${spaces}<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">\n${spaces}  ${element.props.children || 'Button'}\n${spaces}</button>`
      
      case 'input':
        return `${spaces}<input\n${spaces}  type="text"\n${spaces}  placeholder="${element.props.placeholder || ''}"\n${spaces}  className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"\n${spaces}/>`
      
      case 'container':
        return `${spaces}<div className="container mx-auto px-4">\n${spaces}  {/* Container content */}\n${spaces}</div>`
      
      case 'grid':
        const cols = element.props.cols || 3
        return `${spaces}<div className="grid grid-cols-${cols} gap-4">\n${Array.from({ length: cols }).map((_, i) => `${spaces}  <div>Grid Item ${i + 1}</div>`).join('\n')}\n${spaces}</div>`
      
      case 'card':
        return `${spaces}<div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">\n${spaces}  <h3 className="text-lg font-semibold mb-2">Card Title</h3>\n${spaces}  <p className="text-gray-600">Card content goes here.</p>\n${spaces}</div>`
      
      default:
        return `${spaces}<div className="p-4 border border-gray-200 rounded">\n${spaces}  {/* ${element.type} component */}\n${spaces}</div>`
    }
  }
  
  const code = generateReactCode()
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'App.jsx'
    a.click()
    URL.revokeObjectURL(url)
  }
  
  return (
    <div className="h-full bg-gray-900 text-gray-100 flex flex-col">
      {/* Code Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Generated React Code</h2>
          <p className="text-sm text-gray-400">Copy this code to your React project</p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          
          <button
            onClick={handleDownload}
            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
      
      {/* Code Content */}
      <div className="flex-1 overflow-auto">
        <pre className="p-6 text-sm leading-relaxed">
          <code className="language-jsx">{code}</code>
        </pre>
      </div>
      
      {/* Code Footer */}
      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            {elements.length} component{elements.length !== 1 ? 's' : ''} • {code.split('\n').length} lines
          </span>
          
          <span className="text-gray-400">
            React JSX • Copy and paste into your project
          </span>
        </div>
      </div>
    </div>
  )
}