import { EnhancedAIGenerator } from '../enhanced-generator';
import { EnhancedComponentRequest } from '../types';

describe('EnhancedAIGenerator', () => {
  let generator: EnhancedAIGenerator;
  
  beforeEach(() => {
    generator = new EnhancedAIGenerator('test-api-key');
  });

  describe('generateComponent', () => {
    it('should generate a React component with TypeScript', async () => {
      const request: EnhancedComponentRequest = {
        description: 'Create a simple button component',
        framework: 'react',
        styling: 'tailwind',
        complexity: 'simple',
        accessibility: true,
        responsive: true
      };

      const component = await generator.generateComponent(request);
      
      expect(component).toBeDefined();
      expect(component.name).toContain('Button');
      expect(component.code).toContain('interface');
      expect(component.code).toContain('export');
      expect(component.performance.score).toBeGreaterThan(0);
      expect(component.accessibility.score).toBeGreaterThan(0);
    });

    it('should apply brand guidelines when provided', async () => {
      const request: EnhancedComponentRequest = {
        description: 'Create a branded button component',
        framework: 'react',
        styling: 'tailwind',
        complexity: 'simple',
        accessibility: true,
        responsive: true,
        brandGuidelines: {
          colors: {
            primary: '#6366F1',
            secondary: '#8B5CF6',
            neutral: ['#F3F4F6', '#E5E7EB']
          },
          typography: {
            fontFamily: 'Inter',
            headingScale: '1.25',
            bodySize: '16px'
          },
          spacing: {
            scale: '8px',
            rhythm: '1.5'
          },
          borderRadius: '8px',
          shadows: {
            small: '0 1px 3px rgba(0,0,0,0.1)',
            medium: '0 4px 6px rgba(0,0,0,0.1)',
            large: '0 10px 15px rgba(0,0,0,0.1)'
          },
          brandVoice: 'Professional and approachable'
        }
      };

      const component = await generator.generateComponent(request);
      
      expect(component.brandCompliance?.score).toBeGreaterThan(85);
      expect(component.code).toContain('#6366F1');
    });

    it('should generate accessible components', async () => {
      const request: EnhancedComponentRequest = {
        description: 'Create an accessible form component',
        framework: 'react',
        styling: 'tailwind',
        complexity: 'intermediate',
        accessibility: true,
        responsive: true
      };

      const component = await generator.generateComponent(request);
      
      expect(component.accessibility.compliance.wcag_aa).toBe(true);
      expect(component.accessibility.compliance.keyboard_navigation).toBe(true);
      expect(component.accessibility.compliance.screen_reader).toBe(true);
      expect(component.code).toContain('aria-');
    });

    it('should generate tests when requested', async () => {
      const request: EnhancedComponentRequest = {
        description: 'Create a component with tests',
        framework: 'react',
        styling: 'tailwind',
        complexity: 'simple',
        accessibility: true,
        responsive: true,
        testing: true
      };

      const component = await generator.generateComponent(request);
      
      expect(component.tests).toBeDefined();
      expect(component.tests).toContain('describe');
      expect(component.tests).toContain('it');
      expect(component.tests).toContain('expect');
    });
  });
});