export const trackComponentUsage = (componentId: string, action: string) => {
  // Google Analytics 4
  gtag('event', 'component_interaction', {
    component_id: componentId,
    action: action,
    timestamp: Date.now(),
  });

  // Custom analytics
  analytics.track('Component Used', {
    componentId,
    action,
    timestamp: new Date().toISOString(),
  });
};