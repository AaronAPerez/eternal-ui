'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { 
  Sparkles, 
  Code, 
  Eye, 
  Download, 
  Copy, 
  Settings,
  Loader2,
  CheckCircle,
  AlertCircle,
  Wand2,
  Palette,
  Accessibility,
  Zap
} from 'lucide-react';
import { EnhancedAIGenerator, EnhancedComponentRequest, GeneratedComponent } from '@eternal-ui/ai-engine';

/**
 * AI Generator Interface Component
 * 
 * This component provides the interface for the Enhanced AI Generator,
 * integrating with your existing builder to provide:
 * - Natural language component generation
 * - Brand-aware code generation
 * - Real-time preview
 * - Performance optimization
 * - Accessibility compliance
 * - Code export functionality
 */

interface AIGeneratorInterfaceProps {
  onComponentGenerated?: (component: GeneratedComponent) => void;
  onAddToCanvas?: (component: GeneratedComponent) => void;
  brandGuidelines?: any;
  theme?: 'light' | 'dark';
}

export const AIGeneratorInterface: React.FC<AIGeneratorInterfaceProps> = ({
  onComponentGenerated,
  onAddToCanvas,
  brandGuidelines,
  theme = 'light'
}) => {
  // Component state
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedComponent, setGeneratedComponent] = useState<GeneratedComponent | null>(null);
  const [activeTab, setActiveTab] = useState<'generate' | 'preview' | 'code' | 'settings'>('generate');
  const [error, setError] = useState<string | null>(null);
  
  // Generation settings
  const [settings, setSettings] = useState<Partial<EnhancedComponentRequest>>({
    framework: 'react',
    styling: 'tailwind',
    complexity: 'intermediate',
    accessibility: true,
    responsive: true,
    animations: true,
    testing: true
  });

  // Initialize the AI Generator
  const generator = new EnhancedAIGenerator(process.env.NEXT_PUBLIC_OPENAI_API_KEY!);

  // Generate component
  const handleGenerate = useCallback(async () => {
    if (!description.trim()) {
      setError('Please provide a component description');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const request: EnhancedComponentRequest = {
        description,
        brandGuidelines,
        ...settings
      };

      const component = await generator.generateComponent(request);
      
      setGeneratedComponent(component);
      setActiveTab('preview');
      
      if (onComponentGenerated) {
        onComponentGenerated(component);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate component');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  }, [description, settings, brandGuidelines, generator, onComponentGenerated]);

  // Handle adding to canvas
  const handleAddToCanvas = useCallback(() => {
    if (generatedComponent && onAddToCanvas) {
      onAddToCanvas(generatedComponent);
    }
  }, [generatedComponent, onAddToCanvas]);

  // Copy code to clipboard
  const handleCopyCode = useCallback(async () => {
    if (generatedComponent?.code) {
      try {
        await navigator.clipboard.writeText(generatedComponent.code);
        // Show success toast
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  }, [generatedComponent]);

  // Predefined example prompts
  const examplePrompts = [
    "Create a modern pricing table with 3 tiers, hover animations, and popular badge",
    "Build a testimonial carousel with star ratings and smooth auto-play",
    "Design a feature section with icons, descriptions, and CTA buttons",
    "Create a contact form with validation, loading states, and success message",
    "Build a dashboard card with metrics, charts, and trend indicators"
  ];

  const themeClasses = theme === 'dark' 
    ? 'bg-gray-900 text-white border-gray-700' 
    : 'bg-white text-gray-900 border-gray-200';

  return (
    <div className={`ai-generator-interface ${themeClasses} border rounded-lg shadow-lg`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">AI Component Generator</h2>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">Powered by GPT-4</span>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {[
          { key: 'generate', label: 'Generate', icon: Wand2 },
          { key: 'preview', label: 'Preview', icon: Eye },
          { key: 'code', label: 'Code', icon: Code },
          { key: 'settings', label: 'Settings', icon: Settings }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'generate' && (
          <div className="space-y-4">
            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Describe your component
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Create a modern pricing table with 3 tiers, hover animations, and a 'most popular' badge..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-800"
                rows={4}
              />
            </div>

            {/* Example Prompts */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Or try an example:
              </label>
              <div className="grid grid-cols-1 gap-2">
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setDescription(prompt)}
                    className="text-left p-2 text-sm bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Framework</label>
                <select
                  value={settings.framework}
                  onChange={(e) => setSettings(prev => ({ ...prev, framework: e.target.value as any }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                >
                  <option value="react">React</option>
                  <option value="vue">Vue</option>
                  <option value="angular">Angular</option>
                  <option value="svelte">Svelte</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Complexity</label>
                <select
                  value={settings.complexity}
                  onChange={(e) => setSettings(prev => ({ ...prev, complexity: e.target.value as any }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                >
                  <option value="simple">Simple</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="complex">Complex</option>
                </select>
              </div>
            </div>

            {/* Feature Toggles */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.accessibility}
                    onChange={(e) => setSettings(prev => ({ ...prev, accessibility: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <Accessibility className="w-4 h-4" />
                  <span className="text-sm">Accessibility</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.responsive}
                    onChange={(e) => setSettings(prev => ({ ...prev, responsive: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm">Responsive</span>
                </label>
              </div>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.animations}
                    onChange={(e) => setSettings(prev => ({ ...prev, animations: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">Animations</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.testing}
                    onChange={(e) => setSettings(prev => ({ ...prev, testing: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm">Generate Tests</span>
                </label>
              </div>
            </div>

            {/* Brand Guidelines Indicator */}
            {brandGuidelines && (
              <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Palette className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-700 dark:text-blue-300">
                  Brand guidelines will be applied automatically
                </span>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !description.trim()}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Component</span>
                </>
              )}
            </button>

            {/* Error Display */}
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
              </div>
            )}
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="space-y-4">
            {generatedComponent ? (
              <>
                {/* Component Info */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <h3 className="font-semibold">{generatedComponent.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Generated {new Date().toLocaleString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleAddToCanvas}
                      className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      Add to Canvas
                    </button>
                    <button
                      onClick={handleCopyCode}
                      className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
                    >
                      Copy Code
                    </button>
                  </div>
                </div>

                {/* Quality Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Performance</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-blue-600">
                      {generatedComponent.performance.score}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {generatedComponent.performance.metrics.loadTime}
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Accessibility</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                      {generatedComponent.accessibility.score}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      WCAG 2.1 AA
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Brand</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-purple-600">
                      {generatedComponent.brandCompliance?.score || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Compliant
                    </p>
                  </div>
                </div>

                {/* Responsive Previews */}
                <div>
                  <h4 className="font-medium mb-3">Responsive Preview</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {generatedComponent.preview.responsive.map((preview, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{preview.breakpoint}</span>
                          <span className="text-xs text-gray-500">{preview.width}px</span>
                        </div>
                        <div 
                          className="preview-container bg-gray-50 dark:bg-gray-800 rounded p-4"
                          style={{ width: `${Math.min(preview.width, 300)}px` }}
                        >
                          <div dangerouslySetInnerHTML={{ __html: preview.preview }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Generate a component to see the preview</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-4">
            {generatedComponent ? (
              <>
                {/* Code Actions */}
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Generated Code</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center space-x-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={() => {
                        const blob = new Blob([generatedComponent.code], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${generatedComponent.name}.tsx`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                {/* Code Display */}
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
                    <code>{generatedComponent.code}</code>
                  </pre>
                </div>

                {/* Additional Files */}
                {generatedComponent.tests && (
                  <div>
                    <h5 className="font-medium mb-2">Generated Tests</h5>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        <code>{generatedComponent.tests}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {generatedComponent.storybook && (
                  <div>
                    <h5 className="font-medium mb-2">Storybook Stories</h5>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        <code>{generatedComponent.storybook}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Generate a component to see the code</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Framework Settings */}
            <div>
              <h4 className="font-medium mb-3">Framework & Styling</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Framework</label>
                  <select
                    value={settings.framework}
                    onChange={(e) => setSettings(prev => ({ ...prev, framework: e.target.value as any }))}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                  >
                    <option value="react">React</option>
                    <option value="vue">Vue</option>
                    <option value="angular">Angular</option>
                    <option value="svelte">Svelte</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Styling</label>
                  <select
                    value={settings.styling}
                    onChange={(e) => setSettings(prev => ({ ...prev, styling: e.target.value as any }))}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                  >
                    <option value="tailwind">Tailwind CSS</option>
                    <option value="styled-components">Styled Components</option>
                    <option value="css-modules">CSS Modules</option>
                    <option value="emotion">Emotion</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Quality Settings */}
            <div>
              <h4 className="font-medium mb-3">Quality & Features</h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Accessibility className="w-4 h-4" />
                    <span className="text-sm">Accessibility Compliance</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.accessibility}
                    onChange={(e) => setSettings(prev => ({ ...prev, accessibility: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm">Responsive Design</span>
                  <input
                    type="checkbox"
                    checked={settings.responsive}
                    onChange={(e) => setSettings(prev => ({ ...prev, responsive: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">Animations & Interactions</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.animations}
                    onChange={(e) => setSettings(prev => ({ ...prev, animations: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm">Generate Tests</span>
                  <input
                    type="checkbox"
                    checked={settings.testing}
                    onChange={(e) => setSettings(prev => ({ ...prev, testing: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </label>
              </div>
            </div>

            {/* Complexity Settings */}
            <div>
              <h4 className="font-medium mb-3">Complexity Level</h4>
              <div className="space-y-2">
                {[
                  { value: 'simple', label: 'Simple', description: 'Basic components with minimal features' },
                  { value: 'intermediate', label: 'Intermediate', description: 'Feature-rich components with interactions' },
                  { value: 'complex', label: 'Complex', description: 'Advanced components with full functionality' }
                ].map(option => (
                  <label key={option.value} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="complexity"
                      value={option.value}
                      checked={settings.complexity === option.value}
                      onChange={(e) => setSettings(prev => ({ ...prev, complexity: e.target.value as any }))}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="text-sm font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Guidelines Display */}
            {brandGuidelines && (
              <div>
                <h4 className="font-medium mb-3">Brand Guidelines</h4>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Primary Color:</strong> {brandGuidelines.colors?.primary || 'Not set'}
                    </div>
                    <div>
                      <strong>Typography:</strong> {brandGuidelines.typography?.fontFamily || 'Not set'}
                    </div>
                    <div>
                      <strong>Spacing:</strong> {brandGuidelines.spacing?.scale || 'Not set'}
                    </div>
                    <div>
                      <strong>Border Radius:</strong> {brandGuidelines.borderRadius || 'Not set'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIGeneratorInterface;