// import OpenAI from 'openai';
// import Anthropic from '@anthropic-ai/sdk';
// import { z } from 'zod';
// import { Component } from '@/types/builder';

// /**
//  * 🎯 AI GENERATED COMPONENT SCHEMA
//  * 
//  * Strict validation for AI-generated components
//  */
// const GeneratedComponentSchema = z.object({
//   type: z.string().min(1),
//   props: z.record(z.any()),
//   styles: z.object({
//     className: z.string(),
//   }).passthrough(),
//   children: z.array(z.any()).optional(),
//   metadata: z.object({
//     aiGenerated: z.boolean().default(true),
//     prompt: z.string(),
//     model: z.string(),
//     generationTime: z.number(),
//     confidence: z.number().min(0).max(1).optional(),
//   }).optional(),
// });

// export type GeneratedComponent = z.infer<typeof GeneratedComponentSchema>;

// /**
//  * 🎨 GENERATION CONTEXT
//  * 
//  * Context information for AI generation
//  */
// export interface GenerationContext {
//   existingComponents: Component[];
//   brandColors: string[];
//   brandFonts?: string[];
//   framework: 'react' | 'vue' | 'angular' | 'svelte';
//   targetDevice?: 'mobile' | 'tablet' | 'desktop' | 'responsive';
//   industry?: string;
//   styleGuide?: {
//     primary: string;
//     secondary: string;
//     accent: string;
//     neutral: string;
//   };
//   userPreferences?: {
//     complexity: 'simple' | 'moderate' | 'complex';
//     accessibility: 'basic' | 'enhanced' | 'wcag-aa';
//     animations: boolean;
//   };
// }

// /**
//  * ⚡ GENERATION OPTIONS
//  * 
//  * Configuration for AI generation behavior
//  */
// interface GenerationOptions {
//   maxRetries?: number;
//   timeout?: number; // milliseconds
//   useCache?: boolean;
//   fallbackToSimpler?: boolean;
//   includeVariations?: boolean;
//   optimizeForPerformance?: boolean;
// }

// /**
//  * 📊 GENERATION RESULT
//  * 
//  * Complete result with metadata and performance info
//  */
// export interface GenerationResult {
//   component: GeneratedComponent;
//   variations?: GeneratedComponent[];
//   performance: {
//     generationTime: number;
//     model: string;
//     tokensUsed: number;
//     cacheHit: boolean;
//   };
//   confidence: number;
//   suggestions?: string[];
// }

// /**
//  * 🤖 AI COMPONENT GENERATOR
//  * 
//  * High-performance AI component generator with <2s target
//  */
// export class AIComponentGenerator {
//   private openai: OpenAI;
//   private anthropic: Anthropic;
//   private cache = new Map<string, GenerationResult>();
//   private rateLimiter = new Map<string, number[]>();
  
//   // Performance tracking
//   private metrics = {
//     totalGenerations: 0,
//     averageTime: 0,
//     successRate: 0,
//     cacheHitRate: 0,
//   };

//   constructor(config: {
//     openaiApiKey: string;
//     anthropicApiKey: string;
//     defaultModel?: 'openai' | 'anthropic';
//   }) {
//     this.openai = new OpenAI({
//       apiKey: config.openaiApiKey,
//       timeout: 5000, // 5s timeout for AI calls
//     });

//     this.anthropic = new Anthropic({
//       apiKey: config.anthropicApiKey,
//     });
//   }

//   /**
//    * 🚀 GENERATE COMPONENT (Main Method)
//    * 
//    * Target: <2s generation time as per checklist
//    */
//   async generateComponent(
//     prompt: string,
//     context: GenerationContext,
//     options: GenerationOptions = {}
//   ): Promise<GenerationResult> {
//     const startTime = performance.now();
//     const cacheKey = this.generateCacheKey(prompt, context);

//     try {
//       // Check rate limits
//       if (!this.checkRateLimit()) {
//         throw new Error('Rate limit exceeded. Please try again later.');
//       }

//       // Check cache first
//       if (options.useCache !== false && this.cache.has(cacheKey)) {
//         const cached = this.cache.get(cacheKey)!;
//         cached.performance.cacheHit = true;
//         this.updateMetrics(performance.now() - startTime, true, true);
//         return cached;
//       }

//       // Generate component with retry logic
//       const result = await this.generateWithRetry(prompt, context, options);
      
//       // Cache successful results
//       if (options.useCache !== false) {
//         this.cache.set(cacheKey, result);
        
//         // Cleanup old cache entries (keep last 100)
//         if (this.cache.size > 100) {
//           const firstKey = this.cache.keys().next().value;
//           this.cache.delete(firstKey);
//         }
//       }

//       const generationTime = performance.now() - startTime;
//       result.performance.generationTime = generationTime;
//       result.performance.cacheHit = false;

//       // Update metrics
//       this.updateMetrics(generationTime, true, false);

//       // Performance warning if > 2s
//       if (generationTime > 2000) {
//         console.warn(
//           `AI generation exceeded 2s target: ${generationTime.toFixed(0)}ms for prompt: "${prompt.substring(0, 50)}..."`
//         );
//       }

//       return result;

//     } catch (error) {
//       const generationTime = performance.now() - startTime;
//       this.updateMetrics(generationTime, false, false);
      
//       console.error('AI component generation failed:', error);
//       throw new Error(`Failed to generate component: ${error instanceof Error ? error.message : 'Unknown error'}`);
//     }
//   }

//   /**
//    * 🔄 GENERATE WITH RETRY LOGIC
//    * 
//    * Handles retries and fallbacks for reliability
//    */
//   private async generateWithRetry(
//     prompt: string,
//     context: GenerationContext,
//     options: GenerationOptions
//   ): Promise<GenerationResult> {
//     const maxRetries = options.maxRetries || 3;
//     let lastError: Error | null = null;

//     for (let attempt = 1; attempt <= maxRetries; attempt++) {
//       try {
//         // Try primary model first (OpenAI GPT-4)
//         if (attempt === 1) {
//           return await this.generateWithOpenAI(prompt, context, options);
//         }
        
//         // Fallback to Anthropic Claude
//         if (attempt === 2) {
//           return await this.generateWithAnthropic(prompt, context, options);
//         }
        
//         // Final fallback to simpler prompt
//         if (attempt === 3 && options.fallbackToSimpler) {
//           const simplifiedPrompt = this.simplifyPrompt(prompt);
//           return await this.generateWithOpenAI(simplifiedPrompt, context, options);
//         }

//       } catch (error) {
//         lastError = error as Error;
//         console.warn(`AI generation attempt ${attempt} failed:`, error);
        
//         // Wait before retry (exponential backoff)
//         if (attempt < maxRetries) {
//           await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 100));
//         }
//       }
//     }

//     throw lastError || new Error('All generation attempts failed');
//   }

//   /**
//    * 🤖 GENERATE WITH OPENAI
//    * 
//    * Primary generation method using GPT-4
//    */
//   private async generateWithOpenAI(
//     prompt: string,
//     context: GenerationContext,
//     options: GenerationOptions
//   ): Promise<GenerationResult> {
//     const systemPrompt = this.buildSystemPrompt(context);
//     const userPrompt = this.buildUserPrompt(prompt, context);

//     const startTime = performance.now();

//     const response = await this.openai.chat.completions.create({
//       model: process.env.AI_MODEL_PRIMARY || 'gpt-4-turbo-preview',
//       messages: [
//         { role: 'system', content: systemPrompt },
//         { role: 'user', content: userPrompt }
//       ],
//       temperature: Number(process.env.AI_TEMPERATURE) || 0.7,
//       max_tokens: Number(process.env.AI_MAX_TOKENS) || 2000,
//       response_format: { type: 'json_object' },
//     });

//     const content = response.choices[0]?.message?.content;
//     if (!content) {
//       throw new Error('Empty response from OpenAI');
//     }

//     const generationTime = performance.now() - startTime;
//     const parsedComponent = this.parseAndValidateComponent(content, prompt, 'gpt-4-turbo-preview', generationTime);

//     return {
//       component: parsedComponent,
//       performance: {
//         generationTime,
//         model: 'openai-gpt-4',
//         tokensUsed: response.usage?.total_tokens || 0,
//         cacheHit: false,
//       },
//       confidence: this.calculateConfidence(parsedComponent, prompt),
//       suggestions: this.generateSuggestions(parsedComponent, context),
//     };
//   }

//   /**
//    * 🔮 GENERATE WITH ANTHROPIC
//    * 
//    * Fallback generation method using Claude
//    */
//   private async generateWithAnthropic(
//     prompt: string,
//     context: GenerationContext,
//     options: GenerationOptions
//   ): Promise<GenerationResult> {
//     const systemPrompt = this.buildSystemPrompt(context);
//     const userPrompt = this.buildUserPrompt(prompt, context);

//     const startTime = performance.now();

//     const response = await this.anthropic.messages.create({
//       model: 'claude-3-haiku-20240307', // Faster model for fallback
//       max_tokens: Number(process.env.AI_MAX_TOKENS) || 2000,
//       temperature: Number(process.env.AI_TEMPERATURE) || 0.7,
//       system: systemPrompt,
//       messages: [
//         { role: 'user', content: userPrompt }
//       ],
//     });

//     const content = response.content[0]?.type === 'text' ? response.content[0].text : '';
//     if (!content) {
//       throw new Error('Empty response from Anthropic');
//     }

//     const generationTime = performance.now() - startTime;
//     const parsedComponent = this.parseAndValidateComponent(content, prompt, 'claude-3-haiku', generationTime);

//     return {
//       component: parsedComponent,
//       performance: {
//         generationTime,
//         model: 'anthropic-claude',
//         tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
//         cacheHit: false,
//       },
//       confidence: this.calculateConfidence(parsedComponent, prompt),
//       suggestions: this.generateSuggestions(parsedComponent, context),
//     };
//   }

//   /**
//    * 🏗️ BUILD SYSTEM PROMPT
//    * 
//    * Creates comprehensive system prompt for AI
//    */
//   private buildSystemPrompt(context: GenerationContext): string {
//     const accessibility = context.userPreferences?.accessibility || 'wcag-aa';
//     const complexity = context.userPreferences?.complexity || 'moderate';

//     return `You are an expert React TypeScript developer creating components for Eternal UI, a professional website builder.

// CRITICAL REQUIREMENTS:
// - Generate ONLY valid JSON matching the exact schema provided
// - Use ONLY Tailwind CSS utility classes (no custom CSS)
// - Ensure WCAG ${accessibility.toUpperCase()} accessibility compliance
// - Follow React best practices with TypeScript interfaces
// - Create mobile-first responsive designs
// - Include proper ARIA labels and semantic HTML
// - Component complexity level: ${complexity}

// BRAND CONTEXT:
// - Brand colors: ${context.brandColors.join(', ')}
// - Target framework: ${context.framework}
// - Target device: ${context.targetDevice || 'responsive'}
// - Industry: ${context.industry || 'general'}

// EXISTING COMPONENTS:
// ${context.existingComponents.map(c => `- ${c.type}: ${c.props.title || c.props.text || c.id}`).join('\n')}

// PERFORMANCE REQUIREMENTS:
// - Generate components that render in <16ms
// - Use efficient Tailwind classes
// - Minimize DOM complexity
// - Optimize for Core Web Vitals

// RESPONSE FORMAT:
// Return ONLY a valid JSON object with this exact structure:
// {
//   "type": "component-name",
//   "props": {
//     "title": "string",
//     "subtitle": "string",
//     "text": "string",
//     "href": "string",
//     "src": "string",
//     "alt": "string"
//   },
//   "styles": {
//     "className": "tailwind-classes-here"
//   },
//   "children": [],
//   "metadata": {
//     "aiGenerated": true,
//     "prompt": "original-prompt",
//     "model": "model-name",
//     "generationTime": 0,
//     "confidence": 0.95
//   }
// }`;
//   }

//   /**
//    * 👤 BUILD USER PROMPT
//    * 
//    * Creates specific user prompt with context
//    */
//   private buildUserPrompt(prompt: string, context: GenerationContext): string {
//     let enhancedPrompt = `Generate a React component: ${prompt}

// SPECIFIC REQUIREMENTS:
// - Use these brand colors: ${context.brandColors[0]} (primary), ${context.brandColors[1] || '#6B7280'} (secondary)
// - Make it ${context.userPreferences?.complexity || 'moderate'} complexity
// - Include ${context.userPreferences?.accessibility || 'WCAG-AA'} accessibility features
// - Target device: ${context.targetDevice || 'all devices'}`;

//     if (context.industry) {
//       enhancedPrompt += `\n- Industry context: ${context.industry}`;
//     }

//     if (context.existingComponents.length > 0) {
//       enhancedPrompt += `\n- Match the style of existing components: ${context.existingComponents.map(c => c.type).join(', ')}`;
//     }

//     enhancedPrompt += `\n\nReturn only the JSON object, no markdown formatting or explanations.`;

//     return enhancedPrompt;
//   }

//   /**
//    * ✅ PARSE AND VALIDATE COMPONENT
//    * 
//    * Parses AI response and validates against schema
//    */
//   private parseAndValidateComponent(
//     content: string,
//     originalPrompt: string,
//     model: string,
//     generationTime: number
//   ): GeneratedComponent {
//     try {
//       // Clean content - remove any markdown formatting
//       const cleanContent = content
//         .replace(/```json\n?/g, '')
//         .replace(/```\n?/g, '')
//         .trim();

//       const parsed = JSON.parse(cleanContent);

//       // Add metadata
//       parsed.metadata = {
//         aiGenerated: true,
//         prompt: originalPrompt,
//         model,
//         generationTime,
//         confidence: this.calculateRawConfidence(parsed),
//       };

//       // Validate against schema
//       const validated = GeneratedComponentSchema.parse(parsed);

//       return validated;

//     } catch (error) {
//       console.error('Failed to parse AI response:', content);
//       throw new Error(`Invalid AI response format: ${error instanceof Error ? error.message : 'Parse error'}`);
//     }
//   }

//   /**
//    * 🎯 CALCULATE CONFIDENCE SCORE
//    * 
//    * Determines confidence in generated component
//    */
//   private calculateConfidence(component: GeneratedComponent, prompt: string): number {
//     let confidence = 0.5; // Base confidence

//     // Check if component type matches prompt intent
//     const promptLower = prompt.toLowerCase();
//     if (promptLower.includes(component.type)) confidence += 0.2;

//     // Check for required props
//     if (component.props && Object.keys(component.props).length > 0) confidence += 0.1;

//     // Check for proper Tailwind classes
//     if (component.styles.className && component.styles.className.length > 10) confidence += 0.1;

//     // Check for accessibility indicators in className
//     const hasAccessibility = /aria-|sr-only|focus:|hover:|active:/.test(component.styles.className);
//     if (hasAccessibility) confidence += 0.1;

//     return Math.min(confidence, 1.0);
//   }

//   /**
//    * 📊 CALCULATE RAW CONFIDENCE
//    * 
//    * Raw confidence calculation for metadata
//    */
//   private calculateRawConfidence(parsed: any): number {
//     let score = 0;

//     if (parsed.type && typeof parsed.type === 'string') score += 0.25;
//     if (parsed.props && typeof parsed.props === 'object') score += 0.25;
//     if (parsed.styles?.className && typeof parsed.styles.className === 'string') score += 0.25;
//     if (parsed.styles?.className?.includes('tailwind') || parsed.styles?.className?.includes('bg-') || parsed.styles?.className?.includes('text-')) score += 0.25;

//     return score;
//   }

//   /**
//    * 💡 GENERATE SUGGESTIONS
//    * 
//    * Creates helpful suggestions for component improvement
//    */
//   private generateSuggestions(component: GeneratedComponent, context: GenerationContext): string[] {
//     const suggestions: string[] = [];

//     // Accessibility suggestions
//     if (!component.styles.className.includes('aria-') && !component.props.hasOwnProperty('aria-label')) {
//       suggestions.push('Consider adding ARIA labels for better accessibility');
//     }

//     // Performance suggestions
//     if (component.styles.className.split(' ').length > 15) {
//       suggestions.push('Component has many CSS classes - consider simplifying for better performance');
//     }

//     // Brand consistency
//     if (context.brandColors.length > 0) {
//       const hasValidColor = context.brandColors.some(color => 
//         component.styles.className.includes(color.replace('#', ''))
//       );
//       if (!hasValidColor) {
//         suggestions.push('Consider using brand colors for better consistency');
//       }
//     }

//     // Mobile responsiveness
//     if (!component.styles.className.includes('sm:') && !component.styles.className.includes('md:')) {
//       suggestions.push('Add responsive classes for better mobile experience');
//     }

//     return suggestions;
//   }

//   /**
//    * 🔑 GENERATE CACHE KEY
//    * 
//    * Creates unique cache key for component generation
//    */
//   private generateCacheKey(prompt: string, context: GenerationContext): string {
//     const contextHash = JSON.stringify({
//       colors: context.brandColors,
//       framework: context.framework,
//       device: context.targetDevice,
//       complexity: context.userPreferences?.complexity,
//     });

//     return `${prompt.toLowerCase().replace(/\s+/g, '-')}-${btoa(contextHash).substring(0, 8)}`;
//   }

//   /**
//    * ⏱️ CHECK RATE LIMIT
//    * 
//    * Ensures we don't exceed API rate limits
//    */
//   private checkRateLimit(): boolean {
//     const now = Date.now();
//     const minute = Math.floor(now / 60000);
//     const hour = Math.floor(now / 3600000);

//     // Clean old entries
//     this.rateLimiter.forEach((timestamps, key) => {
//       this.rateLimiter.set(key, timestamps.filter(t => now - t < 3600000)); // Keep last hour
//     });

//     const minuteKey = `minute-${minute}`;
//     const hourKey = `hour-${hour}`;

//     const minuteRequests = this.rateLimiter.get(minuteKey) || [];
//     const hourRequests = this.rateLimiter.get(hourKey) || [];

//     const perMinuteLimit = Number(process.env.AI_RATE_LIMIT_REQUESTS_PER_MINUTE) || 60;
//     const perHourLimit = Number(process.env.AI_RATE_LIMIT_REQUESTS_PER_HOUR) || 1000;

//     if (minuteRequests.length >= perMinuteLimit || hourRequests.length >= perHourLimit) {
//       return false;
//     }

//     // Add current request
//     this.rateLimiter.set(minuteKey, [...minuteRequests, now]);
//     this.rateLimiter.set(hourKey, [...hourRequests, now]);

//     return true;
//   }

//   /**
//    * 📈 UPDATE METRICS
//    * 
//    * Tracks performance metrics
//    */
//   private updateMetrics(generationTime: number, success: boolean, cacheHit: boolean): void {
//     this.metrics.totalGenerations++;
    
//     if (success) {
//       this.metrics.averageTime = (this.metrics.averageTime + generationTime) / 2;
//       this.metrics.successRate = (this.metrics.successRate + 1) / Math.max(this.metrics.totalGenerations, 1);
//     }

//     if (cacheHit) {
//       this.metrics.cacheHitRate = (this.metrics.cacheHitRate + 1) / Math.max(this.metrics.totalGenerations, 1);
//     }
//   }

//   /**
//    * 🔄 SIMPLIFY PROMPT
//    * 
//    * Creates simpler prompt for fallback generation
//    */
//   private simplifyPrompt(prompt: string): string {
//     // Extract key components from complex prompts
//     const keywords = prompt.toLowerCase().match(/\b(button|hero|header|footer|form|card|nav|text|image)\b/g);
    
//     if (keywords && keywords.length > 0) {
//       return `Create a simple ${keywords[0]} component`;
//     }

//     return 'Create a simple UI component';
//   }

//   /**
//    * 🎨 GENERATE VARIATIONS
//    * 
//    * Creates multiple variations of a component
//    */
//   async generateVariations(
//     baseComponent: Component,
//     variationTypes: string[],
//     context: GenerationContext
//   ): Promise<GenerationResult[]> {
//     const variations = await Promise.all(
//       variationTypes.map(async (variation) => {
//         const prompt = `Create a ${variation} variation of this ${baseComponent.type} component with similar functionality but different styling`;
//         return this.generateComponent(prompt, {
//           ...context,
//           existingComponents: [baseComponent, ...context.existingComponents],
//         });
//       })
//     );

//     return variations;
//   }

//   /**
//    * 📊 GET PERFORMANCE METRICS
//    * 
//    * Returns current performance metrics
//    */
//   getMetrics() {
//     return {
//       ...this.metrics,
//       cacheSize: this.cache.size,
//       meetsTargetTime: this.metrics.averageTime < 2000, // 2s target
//     };
//   }

//   /**
//    * 🗑️ CLEAR CACHE
//    * 
//    * Clears the generation cache
//    */
//   clearCache(): void {
//     this.cache.clear();
//   }

//   /**
//    * 🔍 ANALYZE PROMPT
//    * 
//    * Analyzes prompt for better generation
//    */
//   analyzePrompt(prompt: string): {
//     componentType: string;
//     complexity: 'simple' | 'moderate' | 'complex';
//     keywords: string[];
//     confidence: number;
//   } {
//     const promptLower = prompt.toLowerCase();
    
//     // Detect component type
//     const componentTypes = ['hero', 'button', 'card', 'form', 'nav', 'header', 'footer', 'text', 'image'];
//     const detectedType = componentTypes.find(type => promptLower.includes(type)) || 'component';
    
//     // Detect complexity
//     const complexityKeywords = {
//       simple: ['simple', 'basic', 'minimal', 'clean'],
//       complex: ['advanced', 'complex', 'detailed', 'comprehensive', 'interactive'],
//     };
    
//     let complexity: 'simple' | 'moderate' | 'complex' = 'moderate';
//     if (complexityKeywords.simple.some(kw => promptLower.includes(kw))) complexity = 'simple';
//     if (complexityKeywords.complex.some(kw => promptLower.includes(kw))) complexity = 'complex';
    
//     // Extract keywords
//     const keywords = prompt.match(/\b\w{3,}\b/g) || [];
    
//     // Calculate confidence
//     const confidence = Math.min(0.3 + (keywords.length * 0.1) + (detectedType !== 'component' ? 0.3 : 0), 1.0);
    
//     return {
//       componentType: detectedType,
//       complexity,
//       keywords,
//       confidence,
//     };
//   }
// }

// /**
//  * 🏭 AI GENERATOR FACTORY
//  * 
//  * Creates and configures AI generator instances
//  */
// export class AIGeneratorFactory {
//   private static instance: AIComponentGenerator | null = null;

//   static create(config?: {
//     openaiApiKey?: string;
//     anthropicApiKey?: string;
//   }): AIComponentGenerator {
//     if (!this.instance) {
//       this.instance = new AIComponentGenerator({
//         openaiApiKey: config?.openaiApiKey || process.env.OPENAI_API_KEY || '',
//         anthropicApiKey: config?.anthropicApiKey || process.env.ANTHROPIC_API_KEY || '',
//       });
//     }

//     return this.instance;
//   }

//   static getInstance(): AIComponentGenerator | null {
//     return this.instance;
//   }

//   static reset(): void {
//     this.instance = null;
//   }
// }

// export default AIComponentGenerator;