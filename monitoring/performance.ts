export const measureComponentPerformance = (componentName: string) => {
  const startTime = performance.now();
  
  return {
    finish: () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Report to monitoring service
      performance.measure(`${componentName}-render`, {
        start: startTime,
        end: endTime,
      });
      
      console.log(`${componentName} rendered in ${duration}ms`);
    }
  };
};