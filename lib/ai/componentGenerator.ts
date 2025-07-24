import OpenAI from 'openai';

interface ComponentGenerationRequest {
  prompt: string;
  style?: 'modern' | 'minimal' | 'bold' | 'classic';
  category?: string;
  framework?: 'react' | 'vue' | 'angular';
}

interface GeneratedComponent {
  id: string;
  name: string;
  description: string;
  code: string;
  props: Record<string, any>;
  style: Record<string, any>;
  category: string;
  metadata: {
    prompt: string;
    generatedAt: string;
    confidence: number;
    estimatedComplexity: 'simple' | 'medium' | 'complex';
  };
}

export class AIComponentGenerator {
  private openai: OpenAI;
  
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true // Only for demo - use server-side in production
    });
  }

  async generateComponent(request: ComponentGenerationRequest): Promise<GeneratedComponent> {
    try {
      const systemPrompt = this.buildSystemPrompt(request);
      const userPrompt = this.buildUserPrompt(request);

      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      });

      const generatedData = JSON.parse(response.choices[0].message.content || '{}');
      
      return {
        id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: generatedData.name || 'AI Component',
        description: generatedData.description || 'AI generated component',
        code: generatedData.code || '',
        props: generatedData.props || {},
        style: generatedData.style || {},
        category: generatedData.category || request.category || 'ui',
        metadata: {
          prompt: request.prompt,
          generatedAt: new Date().toISOString(),
          confidence: generatedData.confidence || 0.8,
          estimatedComplexity: generatedData.complexity || 'medium'
        }
      };
    } catch (error) {
      console.error('AI Generation Error:', error);
      throw new Error('Failed to generate component. Please try again.');
    }
  }

  private buildSystemPrompt(request: ComponentGenerationRequest): string {
    return `You are an expert React component generator for a visual website builder.

Your task is to generate high-quality, production-ready React components based on user descriptions.

Requirements:
1. Generate clean, modern React functional components
2. Use Tailwind CSS for styling
3. Ensure accessibility (ARIA labels, semantic HTML)
4. Make components responsive by default
5. Include proper TypeScript interfaces
6. Follow React best practices

Style preferences: ${request.style || 'modern'}
Target framework: ${request.framework || 'react'}
Category: ${request.category || 'ui'}

Return response as JSON with this exact structure:
{
  "name": "ComponentName",
  "description": "Brief description of what this component does",
  "category": "ui|layout|forms|navigation|marketing",
  "code": "Complete React component code with TypeScript",
  "props": {
    "propName": "defaultValue",
    "example": "of all props"
  },
  "style": {
    "backgroundColor": "#ffffff",
    "padding": "16px"
  },
  "confidence": 0.9,
  "complexity": "simple|medium|complex"
}

Focus on creating practical, reusable components that work well in a visual builder.`;
  }

  private buildUserPrompt(request: ComponentGenerationRequest): string {
    return `Generate a React component: ${request.prompt}

Make it visually appealing, functional, and ready for production use.
Include interactive states (hover, focus, active) where appropriate.
Ensure it works well in both light and dark modes.`;
  }

  async optimizeComponent(component: GeneratedComponent): Promise<GeneratedComponent> {
    const optimizationPrompt = `Optimize this React component for better performance and accessibility:

${component.code}

Improvements needed:
1. Add React.memo if beneficial
2. Optimize re-renders
3. Improve accessibility
4. Reduce bundle size
5. Add error boundaries if needed

Return the optimized component in the same JSON format.`;

    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a React performance optimization expert." },
        { role: "user", content: optimizationPrompt }
      ],
      response_format: { type: "json_object" }
    });

    const optimizedData = JSON.parse(response.choices[0].message.content || '{}');
    
    return {
      ...component,
      code: optimizedData.code || component.code,
      metadata: {
        ...component.metadata,
        optimized: true,
        optimizedAt: new Date().toISOString()
      }
    };
  }
}
