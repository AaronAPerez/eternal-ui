import { useEffect, useCallback } from 'react';
import { useUIStore } from '@/stores/uiStore';

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  domNodes: number;
  fps: number;
  componentCount: number;
}

export const usePerformanceMonitor = () => {
  const updatePerformanceMetrics = useUIStore(state => state.updatePerformanceMetrics);

  const measurePerformance = useCallback(() => {
    const startTime = performance.now();
    
    // Measure DOM complexity
    const domNodes = document.querySelectorAll('*').length;
    
    // Estimate memory usage (if available)
    const memory = (performance as any).memory;
    const memoryUsage = memory ? memory.usedJSHeapSize / 1024 / 1024 : 0;
    
    // Calculate render time
    const renderTime = performance.now() - startTime;
    
    // Estimate FPS (simplified)
    const fps = renderTime < 16 ? 60 : renderTime < 33 ? 30 : 15;
    
    const metrics: Partial<PerformanceMetrics> = {
      renderTime,
      memoryUsage,
      domNodes,
      fps
    };

    updatePerformanceMetrics(metrics);
  }, [updatePerformanceMetrics]);

  // Monitor performance every second
  useEffect(() => {
    const interval = setInterval(measurePerformance, 1000);
    
    // Initial measurement
    measurePerformance();
    
    return () => clearInterval(interval);
  }, [measurePerformance]);

  // Monitor frame rate
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        updatePerformanceMetrics({ fps });
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    const animationId = requestAnimationFrame(measureFPS);
    
    return () => cancelAnimationFrame(animationId);
  }, [updatePerformanceMetrics]);

  return {
    measurePerformance
  };
};