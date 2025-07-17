import { EnhancedAIGenerator } from '../enhanced-generator';
import { performance } from 'perf_hooks';

describe('Performance Benchmarks', () => {
  let generator: EnhancedAIGenerator;
  
  beforeEach(() => {
    generator = new EnhancedAIGenerator('test-api-key');
  });

  it('should generate simple components in under 10 seconds', async () => {
    const startTime = performance.now();
    
    const component = await generator.generateComponent({
      description: 'Create a simple button',
      framework: 'react',
      styling: 'tailwind',
      complexity: 'simple',
      accessibility: true,
      responsive: true
    });
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    expect(duration).toBeLessThan(10000); // 10 seconds
    expect(component).toBeDefined();
  });

  it('should generate complex components in under 30 seconds', async () => {
    const startTime = performance.now();
    
    const component = await generator.generateComponent({
      description: 'Create a complex dashboard with charts, tables, and interactive elements',
      framework: 'react',
      styling: 'tailwind',
      complexity: 'complex',
      accessibility: true,
      responsive: true,
      animations: true,
      testing: true
    });
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    expect(duration).toBeLessThan(30000); // 30 seconds
    expect(component).toBeDefined();
  });
});