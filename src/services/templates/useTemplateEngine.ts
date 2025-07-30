import { useState, useCallback, useRef, useEffect } from 'react';
import { AdvancedTemplateEngine, Template, INDUSTRY_TEMPLATES } from '@/services/templates/advancedTemplateEngine';
import { AIComponentGenerator } from '@/services/ai/aiComponentGenerator';
import { useBuilderStore } from '@/hooks/useBuilderStore';

/**
 * 🎯 TEMPLATE GENERATION STATE
 */
interface TemplateGenerationState {
  isGenerating: boolean;
  progress: number;
  currentStep: string;
  templates: Template[];
  selectedTemplate: Template | null;
  error: string | null;
  analytics: any;
}

/**
 * 🎪 TEMPLATE ENGINE HOOK OPTIONS
 */
interface UseTemplateEngineOptions {
  onTemplateGenerated?: (template: Template) => void;
  onTemplateApplied?: (template: Template) => void;
  onError?: (error: string) => void;
  autoGenerateMarketplace?: boolean;
  cacheTemplates?: boolean;
}

/**
 * 🏗️ USE TEMPLATE ENGINE HOOK
 * 
 * Comprehensive template management with AI-powered generation
 */
export function useTemplateEngine(options: UseTemplateEngineOptions = {}) {
  const [state, setState] = useState<TemplateGenerationState>({
    isGenerating: false,
    progress: 0,
    currentStep: '',
    templates: [],
    selectedTemplate: null,
    error: null,
    analytics: null,
  });

  const { project, addComponent, clearSelection } = useBuilderStore();
  const engineRef = useRef<AdvancedTemplateEngine | null>(null);
  const aiGeneratorRef = useRef<AIComponentGenerator | null>(null);

  // Initialize engines
  useEffect(() => {
    if (!aiGeneratorRef.current) {
      aiGeneratorRef.current = new AIComponentGenerator({
        openaiApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
        anthropicApiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || '',
      });
    }

    if (!engineRef.current) {
      engineRef.current = new AdvancedTemplateEngine(aiGeneratorRef.current);
    }

    // Auto-generate marketplace templates
    if (options.autoGenerateMarketplace && state.templates.length === 0) {
      generateMarketplaceTemplates(50); // Generate 50 starter templates
    }
  }, [options.autoGenerateMarketplace, state.templates.length]);

  /**
   * 🎯 GENERATE SINGLE TEMPLATE
   * 
   * Generate template for specific industry and requirements
   */
  const generateTemplate = useCallback(async (request: {
    industry: keyof typeof INDUSTRY_TEMPLATES;
    style?: string;
    pages?: string[];
    customization?: {
      brandName: string;
      brandColors: string[];
      content?: Record<string, string>;
    };
    options?: {
      complexity?: 'simple' | 'moderate' | 'complex';
      includeEcommerce?: boolean;
      includeBlog?: boolean;
      seoOptimized?: boolean;
    };
  }) => {
    if (!engineRef.current) {
      const error = 'Template engine not initialized';
      setState(prev => ({ ...prev, error }));
      options.onError?.(error);
      return null;
    }

    setState(prev => ({
      ...prev,
      isGenerating: true,
      progress: 0,
      currentStep: 'Preparing template generation...',
      error: null,
    }));

    try {
      // Progress updates
      const updateProgress = (step: string, progress: number) => {
        setState(prev => ({ ...prev, currentStep: step, progress }));
      };

      updateProgress('Analyzing industry requirements...', 10);
      
      updateProgress('Generating AI components...', 30);
      
      const template = await engineRef.current.generateTemplate(request);
      
      updateProgress('Optimizing template structure...', 70);
      
      updateProgress('Finalizing template...', 90);

      // Add to templates list
      setState(prev => ({
        ...prev,
        isGenerating: false,
        progress: 100,
        currentStep: 'Template generated successfully!',
        templates: [...prev.templates, template],
        selectedTemplate: template,
      }));

      options.onTemplateGenerated?.(template);
      return template;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Template generation failed';
      setState(prev => ({
        ...prev,
        isGenerating: false,
        progress: 0,
        currentStep: '',
        error: errorMessage,
      }));

      options.onError?.(errorMessage);
      return null;
    }
  }, [options]);

  /**
   * 🏭 GENERATE MARKETPLACE TEMPLATES
   * 
   * Batch generate templates for marketplace
   */
  const generateMarketplaceTemplates = useCallback(async (count: number = 100) => {
    if (!engineRef.current) return;

    setState(prev => ({
      ...prev,
      isGenerating: true,
      progress: 0,
      currentStep: 'Generating marketplace templates...',
    }));

    try {
      const templates = await engineRef.current.batchGenerateTemplates(count, {
        onProgress: (progress, template) => {
          setState(prev => ({
            ...prev,
            progress,
            currentStep: `Generated: ${template.metadata.name}`,
            templates: [...prev.templates, template],
          }));
        },
      });

      setState(prev => ({
        ...prev,
        isGenerating: false,
        progress: 100,
        currentStep: `Generated ${templates.length} templates successfully!`,
        analytics: engineRef.current?.getTemplateAnalytics(),
      }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        isGenerating: false,
        error: 'Failed to generate marketplace templates',
      }));
    }
  }, []);

  /**
   * 🎨 CUSTOMIZE TEMPLATE
   * 
   * Apply brand customization to template
   */
  const customizeTemplate = useCallback(async (
    templateId: string,
    customization: {
      brandName: string;
      brandColors: string[];
      logo?: string;
      fonts?: string[];
      content?: Record<string, string>;
    }
  ) => {
    if (!engineRef.current) return null;

    try {
      setState(prev => ({ ...prev, isGenerating: true, currentStep: 'Customizing template...' }));

      const customizedTemplate = await engineRef.current.customizeTemplate(templateId, customization);

      setState(prev => ({
        ...prev,
        isGenerating: false,
        selectedTemplate: customizedTemplate,
        templates: [...prev.templates, customizedTemplate],
      }));

      return customizedTemplate;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isGenerating: false,
        error: 'Failed to customize template',
      }));
      return null;
    }
  }, []);

  /**
   * 🚀 APPLY TEMPLATE TO PROJECT
   * 
   * Apply selected template to current project
   */
  const applyTemplate = useCallback(async (template: Template) => {
    try {
      setState(prev => ({ ...prev, isGenerating: true, currentStep: 'Applying template...' }));

      // Clear current project
      clearSelection();

      // Add template components to project
      template.components.forEach(component => {
        addComponent(component);
      });

      setState(prev => ({
        ...prev,
        isGenerating: false,
        currentStep: 'Template applied successfully!',
      }));

      options.onTemplateApplied?.(template);

    } catch (error) {
      setState(prev => ({
        ...prev,
        isGenerating: false,
        error: 'Failed to apply template',
      }));
    }
  }, [addComponent, clearSelection, options]);

  /**
   * 🔍 SEARCH TEMPLATES
   */
  const searchTemplates = useCallback((criteria: {
    industry?: string;
    style?: string;
    complexity?: string;
    tags?: string[];
    featured?: boolean;
    trending?: boolean;
    rating?: number;
  }) => {
    if (!engineRef.current) return [];
    return engineRef.current.searchTemplates(criteria);
  }, []);

  /**
   * 📊 GET ANALYTICS
   */
  const getAnalytics = useCallback(() => {
    if (!engineRef.current) return null;
    return engineRef.current.getTemplateAnalytics();
  }, []);

  /**
   * 📦 EXPORT TEMPLATE
   */
  const exportTemplate = useCallback(async (templateId: string) => {
    if (!engineRef.current) return null;
    return await engineRef.current.exportTemplatePackage(templateId);
  }, []);

  return {
    // State
    ...state,
    
    // Actions
    generateTemplate,
    generateMarketplaceTemplates,
    customizeTemplate,
    applyTemplate,
    searchTemplates,
    exportTemplate,
    
    // Utilities
    getAnalytics,
    
    // Computed
    canGenerate: !state.isGenerating && engineRef.current !== null,
    industryOptions: Object.keys(INDUSTRY_TEMPLATES),
    templateCount: state.templates.length,
  };
}
