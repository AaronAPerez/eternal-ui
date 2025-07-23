// ====================================
// INTEGRATED AI GENERATOR
// ====================================

'use client';

import { useState, useCallback } from 'react';
import { Wand2, Loader, Sparkles, Send, AlertCircle, CheckCircle } from 'lucide-react';

interface IntegratedAIGeneratorProps {
    onComponentGenerate: (component: any) => void;
    existingElements: any[];
    className?: string;
}

/**
 * IntegratedAIGenerator Component
 * 
 * Provides AI-powered component generation with:
 * - Natural language prompts
 * - Component type suggestions  
 * - Real-time generation feedback
 * - Integration with canvas
 * - Accessibility support
 */
export function IntegratedAIGenerator({
    onComponentGenerate,
    existingElements,
    className = ''
}: IntegratedAIGeneratorProps) {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [lastGenerated, setLastGenerated] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Suggested prompts for better UX
    const suggestedPrompts = [
        "Create a modern product card with pricing",
        "Design a hero section for a SaaS landing page",
        "Build a contact form with validation",
        "Make a testimonial card with 5-star rating",
        "Create a pricing table with 3 tiers",
        "Design a team member profile card"
    ];

    /**
     * Handle AI component generation
     */
    const handleGenerate = useCallback(async () => {
        if (!prompt.trim() || isGenerating) return;

        setIsGenerating(true);
        setError(null);

        try {
            // Simulate AI generation API call
            // In a real implementation, this would call your AI service
            const response = await simulateAIGeneration(prompt, existingElements);

            if (response.success) {
                onComponentGenerate(response.component);
                setLastGenerated(prompt);
                setPrompt('');
            } else {
                setError(response.error || 'Failed to generate component');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    }, [prompt, onComponentGenerate, existingElements, isGenerating]);

    /**
     * Handle Enter key press for generation
     */
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleGenerate();
        }
    };

    /**
     * Use suggested prompt
     */
    const useSuggestedPrompt = (suggestedPrompt: string) => {
        setPrompt(suggestedPrompt);
        setError(null);
    };

    return (
        <div className={`bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6 ${className}`}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        AI Component Generator
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Describe what you want to build
                    </p>
                </div>
            </div>

            {/* Input Section */}
            <div className="space-y-4">
                <div className="relative">
                    <label htmlFor="ai-prompt" className="sr-only">
                        Describe your component
                    </label>
                    <textarea
                        id="ai-prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Describe the component you want to create..."
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                        rows={3}
                        disabled={isGenerating}
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                        {prompt.length}/500
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                        <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                    </div>
                )}

                {/* Success Display */}
                {lastGenerated && !error && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <p className="text-sm text-green-700 dark:text-green-300">
                            Generated component for: "{lastGenerated}"
                        </p>
                    </div>
                )}

                {/* Generate Button */}
                <button
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                    {isGenerating ? (
                        <>
                            <Loader className="w-4 h-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Wand2 className="w-4 h-4" />
                            Generate & Add to Canvas
                        </>
                    )}
                </button>
            </div>

            {/* Suggested Prompts */}
            <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Quick Start Ideas:
                </h4>
                <div className="space-y-2">
                    {suggestedPrompts.map((suggestedPrompt, index) => (
                        <button
                            key={index}
                            onClick={() => useSuggestedPrompt(suggestedPrompt)}
                            className="w-full text-left px-3 py-2 text-sm text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 border border-purple-200 dark:border-purple-800 rounded-lg transition-colors"
                            disabled={isGenerating}
                        >
                            {suggestedPrompt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400 border-t border-purple-200 dark:border-purple-800 pt-4 mt-6">
                <div className="text-center">
                    <div className="font-semibold text-purple-600 dark:text-purple-400">
                        {existingElements.filter(el => el.metadata?.isAIGenerated).length}
                    </div>
                    <div>AI Components</div>
                </div>
                <div className="text-center">
                    <div className="font-semibold text-purple-600 dark:text-purple-400">50+</div>
                    <div>AI Types</div>
                </div>
                <div className="text-center">
                    <div className="font-semibold text-purple-600 dark:text-purple-400">&lt;2s</div>
                    <div>Generation</div>
                </div>
            </div>
        </div>
    );
}

/**
 * Simulate AI generation for demo purposes
 * In production, replace with actual AI service call
 */
async function simulateAIGeneration(prompt: string, existingElements: any[]) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple prompt analysis to determine component type
    const promptLower = prompt.toLowerCase();
    let componentType = 'hero';
    let props: Record<string, any> = {};

    if (promptLower.includes('product') || promptLower.includes('card')) {
        componentType = 'productCard';
        props = {
            name: 'AI Generated Product',
            price: '49.99',
            description: 'An amazing product created by AI',
            rating: 4.5,
            reviews: 42
        };
    } else if (promptLower.includes('contact') || promptLower.includes('form')) {
        componentType = 'contactForm';
        props = {
            title: 'Contact Us',
            description: 'Get in touch with our team'
        };
    } else if (promptLower.includes('testimonial') || promptLower.includes('review')) {
        componentType = 'testimonial';
        props = {
            quote: 'This AI-generated component exceeded my expectations!',
            name: 'Alex Johnson',
            role: 'Product Manager, TechCorp'
        };
    } else if (promptLower.includes('pricing') || promptLower.includes('plan')) {
        componentType = 'pricingCard';
        props = {
            plan: 'AI Pro Plan',
            price: '29',
            period: 'month',
            features: ['AI-powered features', 'Priority support', 'Advanced analytics', 'Custom integrations'],
            featured: true
        };
    } else if (promptLower.includes('team') || promptLower.includes('member')) {
        componentType = 'teamMember';
        props = {
            name: 'AI Assistant',
            role: 'Digital Team Member',
            bio: 'Specialized in creating amazing user experiences'
        };
    } else {
        // Default hero section
        props = {
            title: 'AI-Powered Solution',
            subtitle: 'Built with artificial intelligence',
            primaryCta: 'Get Started',
            secondaryCta: 'Learn More'
        };
    }

    return {
        success: true,
        component: {
            id: `ai-${componentType}-${Date.now()}`,
            type: componentType,
            position: {
                x: Math.random() * 300 + 100,
                y: Math.random() * 200 + 100
            },
            size: { width: 'auto', height: 'auto' },
            props,
            metadata: {
                isAIGenerated: true,
                createdAt: new Date().toISOString(),
                generatedFrom: prompt
            }
        }
    }
};