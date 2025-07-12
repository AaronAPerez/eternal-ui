'use client'

import { useState } from 'react'
import { GridSystem, EnhancedGridSystem } from '@eternal-ui/grid-system'

export default function HomePage() {
  const [showEnhanced, setShowEnhanced] = useState(false)
  const [overlayMode, setOverlayMode] = useState<'always' | 'on-hover' | 'hidden'>('on-hover')
  const [columns, setColumns] = useState(12)
  const [gap, setGap] = useState('4')

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Eternal UI Grid System
          </h1>
          <p className="text-lg text-gray-600">
            Professional grid system with visual overlay capabilities
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showEnhanced}
                onChange={(e) => setShowEnhanced(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Enhanced Mode (Visual Overlay)</span>
            </label>

            {showEnhanced && (
              <>
                <select
                  value={overlayMode}
                  onChange={(e) => setOverlayMode(e.target.value as any)}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="always">Always Show Grid</option>
                  <option value="on-hover">Show on Hover</option>
                  <option value="hidden">Hide Grid</option>
                </select>

                <select
                  value={columns}
                  onChange={(e) => setColumns(Number(e.target.value))}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value={6}>6 Columns</option>
                  <option value={12}>12 Columns</option>
                </select>

                <select
                  value={gap}
                  onChange={(e) => setGap(e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="2">Small Gap</option>
                  <option value="4">Medium Gap</option>
                  <option value="6">Large Gap</option>
                </select>
              </>
            )}
          </div>

          {showEnhanced && (
            <p className="text-xs text-blue-600 mt-2">
              💡 Hover over the grid below to see the visual overlay in action!
            </p>
          )}
        </div>

        {/* Grid Demo */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">
            {showEnhanced ? 'Enhanced Grid with Visual Overlay' : 'Basic Grid System'}
          </h2>

          {showEnhanced ? (
            <EnhancedGridSystem
              columns={columns}
              gap={gap}
              showOverlay={true}
              overlayVisibility={overlayMode}
              studioMode={true}
              className="min-h-[400px]"
            >
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className={`
                    ${i === 0 ? 'bg-gradient-to-r from-blue-500 to-purple-600 col-span-full' : ''}
                    ${i === 1 ? 'bg-green-500 col-span-4' : ''}
                    ${i === 2 ? 'bg-yellow-500 col-span-4' : ''}
                    ${i === 3 ? 'bg-red-500 col-span-4' : ''}
                    ${i === 4 ? 'bg-indigo-500 col-span-6' : ''}
                    ${i === 5 ? 'bg-pink-500 col-span-6' : ''}
                    ${i === 6 ? 'bg-orange-500 col-span-8' : ''}
                    ${i === 7 ? 'bg-teal-500 col-span-4' : ''}
                    text-white p-6 rounded-lg text-center font-semibold min-h-[100px] flex items-center justify-center
                  `}
                >
                  <div>
                    <div className="text-lg">Item {i + 1}</div>
                    <div className="text-sm opacity-75 mt-1">
                      {i === 0 ? 'Hero Section' : 
                       i <= 3 ? 'Feature Card' : 
                       i <= 5 ? 'Content Block' : 
                       'Additional Content'}
                    </div>
                  </div>
                </div>
              ))}
            </EnhancedGridSystem>
          ) : (
            <GridSystem columns={columns} gap={gap} className="min-h-[400px]">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="bg-blue-500 text-white p-6 rounded-lg text-center font-semibold col-span-2"
                >
                  Item {i + 1}
                </div>
              ))}
            </GridSystem>
          )}
        </div>

        {/* Feature Comparison */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-3">🎯 Basic Grid System</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ Responsive grid layout</li>
              <li>✅ Customizable columns and gaps</li>
              <li>✅ Clean semantic HTML</li>
              <li>✅ TypeScript support</li>
              <li>✅ Accessibility built-in</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-3">⚡ Enhanced Grid System</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ Everything from Basic Grid</li>
              <li>✅ Visual grid overlay</li>
              <li>✅ Professional design tools feeling</li>
              <li>✅ Studio mode for development</li>
              <li>✅ Hover-triggered grid lines</li>
              <li>✅ Configurable visual feedback</li>
            </ul>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
          <h3 className="text-xl font-bold mb-2">🚀 What's Next?</h3>
          <p className="mb-3 opacity-90">
            This visual grid overlay is the foundation for advanced features like:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>🤖 AI-powered auto-layout</div>
            <div>🎯 Drag & drop components</div>
            <div>📱 Multi-framework export</div>
          </div>
        </div>
      </div>
    </div>
  )
}