import { useBuilderStore } from "./useBuilderStore";

/**
 * 📊 PERFORMANCE MONITORING HOOK
 * 
 * Tracks real-time performance metrics
 */
export const useBuilderPerformance = () => {
  const { performanceMetrics } = useBuilderStore();
  
  const measureComponentRender = (componentId: string) => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Log slow components (targeting 60fps = 16.67ms per frame)
      if (renderTime > 16) {
        console.warn(`Slow component render detected: ${componentId} (${renderTime.toFixed(2)}ms)`);
      }
      
      return renderTime;
    };
  };
  
  return {
    metrics: performanceMetrics,
    measureComponentRender,
    isPerformant: performanceMetrics.renderTime < 16
  };
};