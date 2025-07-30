import { useState, useCallback, useRef, useEffect } from 'react';

import { useBuilderStore } from '@/hooks/useBuilderStore';
import { Component } from '@/types/builder';
import { v4 as uuidv4 } from 'uuid';
import AIComponentGenerator, { GenerationContext, GenerationResult } from '@/components/AI/AIComponentGenerator';

/**
 * 🎯 AI GENERATION STATE
 */
interface AIGenerationState {
  isGenerating: boolean;
  result: GenerationResult | null;
  error: string | null;
  progress: number;
  timeRemaining: number;
}

/**
 * 🎪 AI GENERATOR HOOK OPTIONS
 */
interface UseAIGeneratorOptions {
  onSuccess?: (component: Component) => void;
  onError?: (error: string) => void;
  autoAddToCanvas?: boolean;
  includeVariations?: boolean;
  maxGenerationTime?: number; // milliseconds
}

/**
 * 🤖 USE AI GENERATOR HOOK
 * 
 * React hook for AI-powered component generation with real-time feedback
 */
export function useAIGenerator(options: UseAIGeneratorOptions = {}) {
  const [state, setState] = useState<AIGenerationState>({
    isGenerating: false,
    result: null,
    error: null,
    progress: 0,
    timeRemaining: 0,
  });

  const { project, addComponent } = useBuilderStore();
  const generatorRef = useRef<AIComponentGenerator | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize AI generator
  useEffect(() => {
    if (!generatorRef.current) {
      try {
        generatorRef.current = new AIComponentGenerator({
          openaiApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
          anthropicApiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || '',
        });
      } catch (error) {
        console.error('Failed to initialize AI generator:', error);
      }
    }
  }, []);

  /**
   * 🎯 GENERATE COMPONENT
   * 
   * Main generation function with progress tracking
   */
  const generateComponent = useCallback(async (
    prompt: string,
    customContext?: Partial<GenerationContext>
  ) => {
    if (!generatorRef.current) {
      const error = 'AI generator not initialized';
      setState(prev => ({ ...prev, error }));
      options.onError?.(error);
      return;
    }

    if (state.isGenerating) {
      console.warn('AI generation already in progress');
      return;
    }

    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController();

    // Reset state
    setState({
      isGenerating: true,
      result: null,
      error: null,
      progress: 0,
      timeRemaining: 2000, // 2s target
    });

    // Start progress simulation
    const startTime = Date.now();
    const maxTime = options.maxGenerationTime || 2000;

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / maxTime) * 100, 95); // Max 95% until complete
      const timeRemaining = Math.max(maxTime - elapsed, 0);

      setState(prev => ({
        ...prev,
        progress,
        timeRemaining,
      }));
    }, 100);

    try {
      // Build generation context
      const context: GenerationContext = {
        existingComponents: project.components as any,
        brandColors: project.styles?.colors || ['#3B82F6', '#10B981'],
        brandFonts: project.styles?.fonts || ['Inter'],
        framework: 'react',
        ...customContext,
      };

      // Generate component
      const result = await generatorRef.current.generateComponent(
        prompt,
        context,
        {
          useCache: true,
          fallbackToSimpler: true,
          includeVariations: options.includeVariations,
          optimizeForPerformance: true,
        }
      );

      // Clear progress interval
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }

      // Convert to full Component
      const fullComponent: Component = {
        id: uuidv4(),
        type: result.component.type,
        props: result.component.props,
        styles: result.component.styles,
        position: { x: 100, y: 100 }, // Default position
        size: { width: 400, height: 300 }, // Default size
        children: result.component.children || [],
        metadata: {
          created: new Date(),
          modified: new Date(),
          version: 1,
          ...result.component.metadata,
        },
        isDraggable: true,
        isDroppable: false,
      };

      // Update state
      setState({
        isGenerating: false,
        result,
        error: null,
        progress: 100,
        timeRemaining: 0,
      });

      // Auto-add to canvas if requested
      if (options.autoAddToCanvas) {
        addComponent(fullComponent);
      }

      // Success callback
      options.onSuccess?.(fullComponent);

      return fullComponent;

    } catch (error) {
      // Clear progress interval
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }

      const errorMessage = error instanceof Error ? error.message : 'Generation failed';
      
      setState({
        isGenerating: false,
        result: null,
        error: errorMessage,
        progress: 0,
        timeRemaining: 0,
      });

      options.onError?.(errorMessage);
      throw error;
    }
  }, [state.isGenerating, project, addComponent, options]);

  /**
   * 🔄 GENERATE VARIATIONS
   * 
   * Generate multiple variations of a component
   */
  const generateVariations = useCallback(async (
    baseComponent: Component,
    variationTypes: string[]
  ) => {
    if (!generatorRef.current) {
      throw new Error('AI generator not initialized');
    }

    const context: GenerationContext = {
      existingComponents: [baseComponent, ...project.components] as any,
      brandColors: project.styles?.colors || ['#3B82F6', '#10B981'],
      framework: 'react',
    };

    const variations = await generatorRef.current.generateVariations(
      baseComponent,
      variationTypes,
      context
    );

    return variations.map(result => ({
      id: uuidv4(),
      type: result.component.type,
      props: result.component.props,
      styles: result.component.styles,
      position: { x: 100, y: 100 },
      size: { width: 400, height: 300 },
      children: result.component.children || [],
      metadata: {
        created: new Date(),
        modified: new Date(),
        version: 1,
        ...result.component.metadata,
      },
      isDraggable: true,
      isDroppable: false,
    }));
  }, [project]);

  /**
   * ❌ CANCEL GENERATION
   * 
   * Cancels ongoing generation
   */
  const cancelGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    setState({
      isGenerating: false,
      result: null,
      error: 'Generation cancelled',
      progress: 0,
      timeRemaining: 0,
    });
  }, []);

  /**
   * 📊 GET PERFORMANCE METRICS
   */
  const getMetrics = useCallback(() => {
    return generatorRef.current?.getMetrics() || null;
  }, []);

  /**
   * 🔍 ANALYZE PROMPT
   */
  const analyzePrompt = useCallback((prompt: string) => {
    return generatorRef.current?.analyzePrompt(prompt) || null;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    // State
    ...state,
    
    // Actions
    generateComponent,
    generateVariations,
    cancelGeneration,
    
    // Utilities
    getMetrics,
    analyzePrompt,
    
    // Computed
    canGenerate: !state.isGenerating && generatorRef.current !== null,
    isInitialized: generatorRef.current !== null,
  };
}