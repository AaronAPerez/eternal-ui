/**
 * AI Layout Suggestions UI Component
 * 
 * Beautiful interface that shows AI-generated layout suggestions
 * with confidence scores, reasoning, and one-click application
 */

import React, { useState } from 'react'
import type { LayoutSuggestion, ComponentData } from '../ai/AutoLayoutEngine'
import { useAutoLayout } from '../ai/AutoLayoutEngine'
import { cn } from '../utils'

export interface AILayoutSuggestionsProps {
  components: ComponentData[]
  onLayoutSelect: (suggestion: LayoutSuggestion) => void
  className?: string
}

/**
 * Layout Suggestion Card Component
 */
const SuggestionCard: React.FC<{
  suggestion: LayoutSuggestion
  isSelected: boolean
  onSelect: () => void
}> = ({ suggestion, isSelected, onSelect }) => {
  return (
    <div
      className={cn(
        "border rounded-lg p-4 cursor-pointer transition-all duration-200",
        isSelected 
          ? "border-blue-500 bg-blue-50 shadow-md" 
          : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
      )}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{suggestion.name}</h3>
        <div className="flex items-center gap-2">
          <div className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            suggestion.confidence >= 0.9 ? "bg-green-100 text-green-800" :
            suggestion.confidence >= 0.8 ? "bg-yellow-100 text-yellow-800" :
            "bg-gray-100 text-gray-800"
          )}>
            {Math.round(suggestion.confidence * 100)}% match
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
        <div className="text-center">
          <div className="font-medium text-gray-900">{suggestion.performance.estimatedLoadTime}s</div>
          <div className="text-gray-500">Load Time</div>
        </div>
        <div className="text-center">
          <div className="font-medium text-gray-900">{suggestion.performance.coreWebVitalsScore}</div>
          <div className="text-gray-500">Performance</div>
        </div>
        <div className="text-center">
          <div className="font-medium text-gray-900">{suggestion.accessibility.wcagCompliance}</div>
          <div className="text-gray-500">Accessibility</div>
        </div>
      </div>

      {/* Reasoning */}
      <div className="space-y-1">
        {suggestion.reasoning.slice(0, 2).map((reason, index) => (
          <div key={index} className="text-xs text-gray-600 flex items-center gap-1">
            <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
            {reason}
          </div>
        ))}
      </div>

      {/* Apply Button */}
      {isSelected && (
        <button className="w-full mt-3 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
          Apply This Layout
        </button>
      )}
    </div>
  )
}

/**
 * AI Layout Suggestions Component
 */
export const AILayoutSuggestions: React.FC<AILayoutSuggestionsProps> = ({
  components,
  onLayoutSelect,
  className
}) => {
  const { suggestions, selectedSuggestion, isLoading, generateSuggestions, applySuggestion } = useAutoLayout()
  const [showDetails, setShowDetails] = useState(false)

  // Generate suggestions when components change
  React.useEffect(() => {
    if (components.length > 0) {
      generateSuggestions(components)
    }
  }, [components, generateSuggestions])

  const handleSuggestionSelect = (suggestion: LayoutSuggestion) => {
    applySuggestion(suggestion)
    onLayoutSelect(suggestion)
  }

  if (isLoading) {
    return (
      <div className={cn("bg-white rounded-lg border p-6", className)}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <h2 className="text-lg font-semibold">🤖 AI is analyzing your content...</h2>
        </div>
        <p className="text-gray-600 text-sm">
          Generating optimal layout suggestions based on your components, content type, and best practices.
        </p>
      </div>
    )
  }

  if (suggestions.length === 0) {
    return (
      <div className={cn("bg-white rounded-lg border p-6", className)}>
        <h2 className="text-lg font-semibold mb-2">🤖 AI Layout Suggestions</h2>
        <p className="text-gray-600 text-sm">
          Add some components to get AI-powered layout suggestions!
        </p>
      </div>
    )
  }

  return (
    <div className={cn("bg-white rounded-lg border", className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            🤖 AI Layout Suggestions
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {suggestions.length} options
            </span>
          </h2>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {showDetails ? 'Hide' : 'Show'} Details
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          AI analyzed your {components.length} components and suggests these layouts
        </p>
      </div>

      {/* Suggestions Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((suggestion) => (
            <SuggestionCard
              key={suggestion.id}
              suggestion={suggestion}
              isSelected={selectedSuggestion?.id === suggestion.id}
              onSelect={() => handleSuggestionSelect(suggestion)}
            />
          ))}
        </div>
      </div>

      {/* Detailed Analysis */}
      {showDetails && selectedSuggestion && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <h3 className="font-semibold mb-3">📊 Detailed Analysis: {selectedSuggestion.name}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Performance Metrics */}
            <div>
              <h4 className="font-medium text-sm text-gray-900 mb-2">⚡ Performance</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Load Time:</span>
                  <span className="font-medium">{selectedSuggestion.performance.estimatedLoadTime}s</span>
                </div>
                <div className="flex justify-between">
                  <span>Core Web Vitals:</span>
                  <span className="font-medium">{selectedSuggestion.performance.coreWebVitalsScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span>Bundle Size:</span>
                  <span className="font-medium">{selectedSuggestion.performance.bundleSize}</span>
                </div>
              </div>
            </div>

            {/* Accessibility */}
            <div>
              <h4 className="font-medium text-sm text-gray-900 mb-2">♿ Accessibility</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>WCAG Compliance:</span>
                  <span className="font-medium">{selectedSuggestion.accessibility.wcagCompliance}</span>
                </div>
                <div className="flex justify-between">
                  <span>Keyboard Navigation:</span>
                  <span className="font-medium">{selectedSuggestion.accessibility.keyboardNavigation ? '✅' : '❌'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Screen Reader:</span>
                  <span className="font-medium">{selectedSuggestion.accessibility.screenReaderFriendly ? '✅' : '❌'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full Reasoning */}
          <div className="mt-4">
            <h4 className="font-medium text-sm text-gray-900 mb-2">🧠 AI Reasoning</h4>
            <ul className="space-y-1">
              {selectedSuggestion.reasoning.map((reason, index) => (
                <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          {/* Responsive Layout Info */}
          <div className="mt-4">
            <h4 className="font-medium text-sm text-gray-900 mb-2">📱 Responsive Layout</h4>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 bg-white rounded border">
                <div className="font-medium">Mobile</div>
                <div className="text-gray-600">{selectedSuggestion.responsive.mobile.columns} cols</div>
              </div>
              <div className="text-center p-2 bg-white rounded border">
                <div className="font-medium">Tablet</div>
                <div className="text-gray-600">{selectedSuggestion.responsive.tablet.columns} cols</div>
              </div>
              <div className="text-center p-2 bg-white rounded border">
                <div className="font-medium">Desktop</div>
                <div className="text-gray-600">{selectedSuggestion.responsive.desktop.columns} cols</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AILayoutSuggestions
