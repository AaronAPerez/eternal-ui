import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WebsiteBuilderStudio } from '@/components/WebsiteBuilder/WebsiteBuilderStudio';

describe('Performance Validation', () => {
  it('meets Phase 1 performance targets', async () => {
    // Test drag & drop performance
    const startTime = performance.now();
    
    render(<WebsiteBuilderStudio />);
    
    const renderTime = performance.now() - startTime;
    
    // Should render in under 100ms (60fps target)
    expect(renderTime).toBeLessThan(100);
  });
  
  it('AI generation meets <2s target', async () => {
    render(<WebsiteBuilderStudio />);
    
    const aiButton = screen.getByText(/AI Generate/);
    fireEvent.click(aiButton);
    
    const promptInput = screen.getByPlaceholderText(/describe your component/i);
    fireEvent.change(promptInput, { target: { value: 'Create a hero section' } });
    
    const generateButton = screen.getByText(/Generate Component/);
    
    const startTime = performance.now();
    fireEvent.click(generateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Generated Successfully/)).toBeInTheDocument();
    }, { timeout: 2000 }); // 2s timeout
    
    const generationTime = performance.now() - startTime;
    expect(generationTime).toBeLessThan(2000); // <2s target
  });
});