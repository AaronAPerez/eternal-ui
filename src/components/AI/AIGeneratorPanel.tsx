import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sparkles, Wand2, Clock, CheckCircle, AlertCircle, X, RefreshCw } from 'lucide-react';
import { useAIGenerator } from '@/hooks/ai/useAIGenerator';
import { cn } from '@/lib/utils';
import { Component as BuilderComponent } from '@/types/builder';

/**
 * 📝 GENERATION FORM SCHEMA
 */
const GenerationFormSchema = z.object({
  prompt: z.string().min(5, 'Prompt must be at least 5 characters').max(500, 'Prompt too long'),
  complexity: z.enum(['simple', 'moderate', 'complex']),
  targetDevice: z.enum(['mobile', 'tablet', 'desktop', 'responsive']),
  includeAnimations: z.boolean(),
  accessibility: z.enum(['basic', 'enhanced', 'wcag-aa']),
});

type GenerationFormData = z.infer<typeof GenerationFormSchema>;

/**
 * 🎨 AI GENERATOR PANEL PROPS
 */
interface AIGeneratorPanelProps {
  onComponentGenerated?: (component: BuilderComponent) => void;
  onClose?: () => void;
  className?: string;
}

/**
 * 🤖 AI GENERATOR PANEL
 * 
 * Comprehensive UI for AI component generation
 */
/**
 * 🔘 AI GENERATOR BUTTON PROPS
 */
interface AIGeneratorButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onGenerate?: (component: any) => void;
  className?: string;
}

/**
 * 🚀 AI GENERATOR BUTTON
 * 
 * Simple button to trigger AI component generation
 */
export const AIGeneratorButton: React.FC<AIGeneratorButtonProps> = ({
  variant = 'primary',
  size = 'md',
  onGenerate,
  className,
}) => {
  const [showPanel, setShowPanel] = useState(false);

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white',
    secondary: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700',
  };

  return (
    <>
      <button
        onClick={() => setShowPanel(true)}
        className={cn(
          'flex items-center gap-2 rounded-lg font-medium transition-all shadow-sm',
          'focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
      >
        <Sparkles className="w-4 h-4" />
        AI Generate
      </button>

      {showPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full max-w-2xl mx-4">
            <AIGeneratorPanel
              onComponentGenerated={(component) => {
                onGenerate?.(component);
                setShowPanel(false);
              }}
              onClose={() => setShowPanel(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export const AIGeneratorPanel: React.FC<AIGeneratorPanelProps> = ({
  onComponentGenerated,
  onClose,
  className,
}) => {
  const {
    isGenerating,
    result,
    error,
    progress,
    timeRemaining,
    generateComponent,
    cancelGeneration,
    analyzePrompt,
    getMetrics,
    canGenerate,
  } = useAIGenerator({
    autoAddToCanvas: true,
    onSuccess: onComponentGenerated,
  });

  const [promptAnalysis, setPromptAnalysis] = useState<any>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm<GenerationFormData>({
    resolver: zodResolver(GenerationFormSchema),
    defaultValues: {
      prompt: '',
      complexity: 'moderate',
      targetDevice: 'responsive',
      includeAnimations: true,
      accessibility: 'wcag-aa',
    },
  });

  const watchedPrompt = watch('prompt');

  // Analyze prompt in real-time
  useEffect(() => {
    if (watchedPrompt && watchedPrompt.length > 5) {
      const analysis = analyzePrompt(watchedPrompt);
      setPromptAnalysis(analysis);
    } else {
      setPromptAnalysis(null);
    }
  }, [watchedPrompt, analyzePrompt]);

  /**
   * 🚀 HANDLE GENERATION SUBMIT
   */
  const onSubmit = async (data: GenerationFormData) => {
    try {
      await generateComponent(data.prompt, {
        targetDevice: data.targetDevice,
        userPreferences: {
          complexity: data.complexity,
          accessibility: data.accessibility,
          animations: data.includeAnimations,
        },
      });
    } catch (error) {
      console.error('Generation failed:', error);
    }
  };

  /**
   * 🎯 PROMPT SUGGESTIONS
   */
  const promptSuggestions = [
    'Create a hero section for a tech startup',
    'Build a pricing table with 3 tiers',
    'Design a contact form with validation',
    'Make a product card for e-commerce',
    'Create a testimonial carousel',
    'Build a navigation header with logo',
    'Design a call-to-action button',
    'Create a feature showcase grid',
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setValue('prompt', suggestion);
  };

  return (
    <div className={cn('bg-white rounded-lg shadow-xl border border-gray-200', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">AI Component Generator</h2>
            <p className="text-sm text-gray-500">Generate components with natural language</p>
          </div>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close AI Generator"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Generation Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Prompt Input */}
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
              Describe your component
            </label>
            <div className="relative">
              <textarea
                {...register('prompt')}
                id="prompt"
                rows={3}
                className={cn(
                  'w-full px-4 py-3 border rounded-lg resize-none transition-colors',
                  'focus:ring-2 focus:ring-purple-500 focus:border-transparent',
                  errors.prompt ? 'border-red-500' : 'border-gray-300'
                )}
                placeholder="e.g., Create a hero section for a tech startup with a call-to-action button"
                disabled={isGenerating}
              />
              
              {/* Character counter */}
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                {watchedPrompt?.length || 0}/500
              </div>
            </div>
            
            {errors.prompt && (
              <p className="mt-1 text-sm text-red-600">{errors.prompt.message}</p>
            )}

            {/* Prompt Analysis */}
            {promptAnalysis && (
              <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-blue-800">AI Analysis</span>
                </div>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>Component type: <span className="font-medium">{promptAnalysis.componentType}</span></p>
                  <p>Complexity: <span className="font-medium">{promptAnalysis.complexity}</span></p>
                  <p>Confidence: <span className="font-medium">{(promptAnalysis.confidence * 100).toFixed(0)}%</span></p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick suggestions
            </label>
            <div className="flex flex-wrap gap-2">
              {promptSuggestions.slice(0, 4).map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  disabled={isGenerating}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Options Toggle */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 transition-colors"
          >
            <RefreshCw className={cn('w-4 h-4 transition-transform', showAdvanced && 'rotate-180')} />
            Advanced options
          </button>

          {/* Advanced Options */}
          {showAdvanced && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                {/* Complexity */}
                <div>
                  <label htmlFor="complexity" className="block text-sm font-medium text-gray-700 mb-1">
                    Complexity
                  </label>
                  <select
                    {...register('complexity')}
                    id="complexity"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={isGenerating}
                  >
                    <option value="simple">Simple</option>
                    <option value="moderate">Moderate</option>
                    <option value="complex">Complex</option>
                  </select>
                </div>

                {/* Target Device */}
                <div>
                  <label htmlFor="targetDevice" className="block text-sm font-medium text-gray-700 mb-1">
                    Target Device
                  </label>
                  <select
                    {...register('targetDevice')}
                    id="targetDevice"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={isGenerating}
                  >
                    <option value="responsive">Responsive</option>
                    <option value="mobile">Mobile</option>
                    <option value="tablet">Tablet</option>
                    <option value="desktop">Desktop</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Accessibility */}
                <div>
                  <label htmlFor="accessibility" className="block text-sm font-medium text-gray-700 mb-1">
                    Accessibility
                  </label>
                  <select
                    {...register('accessibility')}
                    id="accessibility"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={isGenerating}
                  >
                    <option value="basic">Basic</option>
                    <option value="enhanced">Enhanced</option>
                    <option value="wcag-aa">WCAG AA</option>
                  </select>
                </div>

                {/* Animations */}
                <div className="flex items-center pt-6">
                  <input
                    {...register('includeAnimations')}
                    type="checkbox"
                    id="includeAnimations"
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    disabled={isGenerating}
                  />
                  <label htmlFor="includeAnimations" className="ml-2 text-sm text-gray-700">
                    Include animations
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Generate Button */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={!canGenerate || !isValid || isGenerating}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all',
                'focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
                canGenerate && isValid && !isGenerating
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              )}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Component
                </>
              )}
            </button>

            {isGenerating && (
              <button
                type="button"
                onClick={cancelGeneration}
                className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Progress Indicator */}
        {isGenerating && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Generating component...</span>
              <span className="flex items-center gap-1 text-purple-600">
                <Clock className="w-4 h-4" />
                {(timeRemaining / 1000).toFixed(1)}s remaining
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              Target: 2&apos;s generation time • Current: {progress.toFixed(0)}% complete
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-red-800">Generation Failed</h4>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <button
                onClick={() => handleSubmit(onSubmit)()}
                className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Success State */}
        {result && !isGenerating && !error && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-green-800">Component Generated Successfully!</h4>
                <p className="text-sm text-green-700 mt-1">
                  Generated in {result.performance.generationTime.toFixed(0)}ms
                  {result.performance.generationTime > 2000 && ' (exceeded 2s target)'}
                </p>
              </div>
            </div>

            {/* Component Preview */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">Generated Component</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Confidence: {(result.confidence * 100).toFixed(0)}%</span>
                  <span>•</span>
                  <span>{result.component.type}</span>
                </div>
              </div>
              
              {/* Component Details */}
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Type:</span>
                  <span className="ml-2 text-gray-600">{result.component.type}</span>
                </div>
                
                <div>
                  <span className="font-medium text-gray-700">Classes:</span>
                  <span className="ml-2 text-gray-600 font-mono text-xs">
                    {result.component.styles.className}
                  </span>
                </div>
                
                {result.suggestions && result.suggestions.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-700">Suggestions:</span>
                    <ul className="ml-2 mt-1 space-y-1">
                      {result.suggestions.map((suggestion: string, index: number) => (
                        <li key={index} className="text-gray-600 text-xs">
                          • {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Performance Metrics */}
        {process.env.NODE_ENV === 'development' && (
          <details className="text-sm">
            <summary className="cursor-pointer text-gray-500">Performance Metrics</summary>
            <div className="mt-2 p-3 bg-gray-50 rounded border font-mono text-xs">
              <pre>{JSON.stringify(getMetrics(), null, 2)}</pre>
            </div>
          </details>
        )}
      </div>
    </div>
  );
};
