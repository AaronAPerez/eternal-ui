import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

/**
 * 📊 Web Vitals and Performance Monitoring
 * 
 * Track Core Web Vitals to meet performance targets:
 * - LCP < 2.5s
 * - FID < 100ms  
 * - CLS < 0.1
 */
export function trackWebVitals() {
  getCLS((metric) => {
    console.log('CLS:', metric);
    // Send to analytics service
    sendToAnalytics('CLS', metric.value);
  });

  getFID((metric) => {
    console.log('FID:', metric);
    sendToAnalytics('FID', metric.value);
  });

  getFCP((metric) => {
    console.log('FCP:', metric);
    sendToAnalytics('FCP', metric.value);
  });

  getLCP((metric) => {
    console.log('LCP:', metric);
    sendToAnalytics('LCP', metric.value);
  });

  getTTFB((metric) => {
    console.log('TTFB:', metric);
    sendToAnalytics('TTFB', metric.value);
  });
}

function sendToAnalytics(metricName: string, value: number) {
  // Send to Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', metricName, {
      event_category: 'Web Vitals',
      event_label: metricName,
      value: Math.round(value),
      non_interaction: true,
    });
  }

  // Send to custom analytics
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      metric: metricName,
      value,
      timestamp: Date.now(),
      url: window.location.href,
    }),
  });
}

// Component performance tracking
export function trackComponentPerformance(componentName: string) {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    sendToAnalytics(`Component_${componentName}_Render`, renderTime);
    
    // Alert if component is slow
    if (renderTime > 16) { // 60fps threshold
      console.warn(`Slow component detected: ${componentName} (${renderTime}ms)`);
    }
  };
}