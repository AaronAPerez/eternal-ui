'use client';

import React, { useState } from 'react';
import { Wand2, Sparkles, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import AIComponentGenerator from '@/lib/ai/AIComponentGenerator';
import GeneratedComponent from './utils/exportUtils';

interface AIGeneratorPanelProps {
  onComponentGenerated: (component: GeneratedComponent) => void;
  onClose: () => void;
}

export const AIGeneratorPanel: React.FC<AIGeneratorPanelProps> = ({
  onComponentGenerated,
  onClose
}) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<GeneratedComponent | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generator = new AIComponentGenerator();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const component = await generator.generateComponent({
        prompt: prompt.trim(),
        style: 'modern',
        framework: 'react'
      });

      setLastGenerated(component);
      onComponentGenerated(component);
      
      // Clear prompt after successful generation
      setPrompt('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const examplePrompts = [
    "Create a modern pricing card with gradient background",
    "Build a contact form with validation",
    "Design a hero section for a SaaS product",
    "Make a product card for an e-commerce site",
    "Create a testimonial slider component"
  ];

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI Generator
            </h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>
         <p className="text-sm text-gray-500 dark:text-gray-400">
          Describe what you want to build and AI will generate it for you.
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Input Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Describe your component:
          </label>
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Create a modern button with gradient background"
            className="w-full"
            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
          />
          
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full gap-2"
            variant="default"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Component
              </>
            )}
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
            </div>
          </div>
        )}

        {/* Success Display */}
        {lastGenerated && !isGenerating && (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                Component Generated!
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {lastGenerated.name} added to canvas
            </p>
            <div className="flex gap-1 mt-2">
              <Badge variant="secondary" className="text-xs">
                {lastGenerated.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {lastGenerated.metadata.estimatedComplexity}
              </Badge>
            </div>
          </div>
        )}

        {/* Example Prompts */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Try these examples:
          </label>
          <div className="space-y-2">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => setPrompt(example)}
                className="w-full text-left p-2 text-sm bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};