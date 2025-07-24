interface ComponentMetrics {
  id: string;
  name: string;
  renderTimes: number[];
  bundleSize: number;
  memoryUsage: number;
  rerenderCount: number;
  lastUpdated: string;
}

export interface PerformanceMetrics {
  componentCount: number;
  estimatedRenderTime: string;
  memoryUsage: string;
  bundleSize: string;
}

interface PerformanceAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  component: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

export class PerformanceMonitor {
  private metrics: Map<string, ComponentMetrics> = new Map();
  private alerts: PerformanceAlert[] = [];
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers(): void {
    // Performance Observer for timing
    if (typeof PerformanceObserver !== 'undefined') {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name.startsWith('eternal-ui-component-')) {
            this.recordRenderTime(entry.name, entry.duration);
          }
        }
      });
      
      observer.observe({ entryTypes: ['measure'] });
      this.observers.push(observer);
    }
  }

  startComponentRender(componentId: string): string {
    const markName = `eternal-ui-component-${componentId}-start`;
    performance.mark(markName);
    return markName;
  }

  endComponentRender(componentId: string, startMark: string): void {
    const endMark = `eternal-ui-component-${componentId}-end`;
    const measureName = `eternal-ui-component-${componentId}`;
    
    performance.mark(endMark);
    performance.measure(measureName, startMark, endMark);
  }

  private recordRenderTime(componentId: string, renderTime: number): void {
    const cleanId = componentId.replace('eternal-ui-component-', '');
    const metrics = this.metrics.get(cleanId) || this.createEmptyMetrics(cleanId);
    
    metrics.renderTimes.push(renderTime);
    metrics.lastUpdated = new Date().toISOString();
    
    // Keep only last 100 measurements
    if (metrics.renderTimes.length > 100) {
      metrics.renderTimes = metrics.renderTimes.slice(-100);
    }
    
    this.metrics.set(cleanId, metrics);
    
    // Check for performance issues
    this.checkPerformanceThresholds(cleanId, renderTime);
  }

  private createEmptyMetrics(componentId: string): ComponentMetrics {
    return {
      id: componentId,
      name: componentId,
      renderTimes: [],
      bundleSize: 0,
      memoryUsage: 0,
      rerenderCount: 0,
      lastUpdated: new Date().toISOString()
    };
  }

  private checkPerformanceThresholds(componentId: string, renderTime: number): void {
    // Alert if render time > 16ms (60fps threshold)
    if (renderTime > 16) {
      this.createAlert('warning', componentId, 
        `Render time ${renderTime.toFixed(2)}ms exceeds 60fps threshold`);
    }
    
    // Alert if render time > 33ms (30fps threshold)
    if (renderTime > 33) {
      this.createAlert('error', componentId,
        `Render time ${renderTime.toFixed(2)}ms is severely impacting performance`);
    }
  }

  private createAlert(type: 'warning' | 'error' | 'info', component: string, message: string): void {
    const alert: PerformanceAlert = {
      id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      component,
      message,
      timestamp: new Date().toISOString(),
      resolved: false
    };
    
    this.alerts.unshift(alert);
    
    // Keep only last 50 alerts
    if (this.alerts.length > 50) {
      this.alerts = this.alerts.slice(0, 50);
    }
  }

  getComponentMetrics(componentId: string): ComponentMetrics | null {
    return this.metrics.get(componentId) || null;
  }

  getAllMetrics(): ComponentMetrics[] {
    return Array.from(this.metrics.values());
  }

  getAlerts(): PerformanceAlert[] {
    return this.alerts.filter(alert => !alert.resolved);
  }

  resolveAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.resolved = true;
    }
  }

  generateReport(): PerformanceReport {
    const allMetrics = this.getAllMetrics();
    
    return {
      overview: {
        totalComponents: allMetrics.length,
        averageRenderTime: this.calculateAverageRenderTime(allMetrics),
        slowestComponent: this.findSlowestComponent(allMetrics),
        totalAlerts: this.alerts.filter(a => !a.resolved).length
      },
      componentBreakdown: allMetrics.map(metric => ({
        id: metric.id,
        name: metric.name,
        averageRenderTime: metric.renderTimes.length > 0 
          ? metric.renderTimes.reduce((a, b) => a + b, 0) / metric.renderTimes.length 
          : 0,
        maxRenderTime: Math.max(...metric.renderTimes, 0),
        rerenderCount: metric.rerenderCount,
        status: this.getComponentStatus(metric)
      })),
      alerts: this.getAlerts(),
      recommendations: this.generateRecommendations(allMetrics)
    };
  }

  private calculateAverageRenderTime(metrics: ComponentMetrics[]): number {
    const allRenderTimes = metrics.flatMap(m => m.renderTimes);
    return allRenderTimes.length > 0 
      ? allRenderTimes.reduce((a, b) => a + b, 0) / allRenderTimes.length 
      : 0;
  }

  private findSlowestComponent(metrics: ComponentMetrics[]): string | null {
    let slowest = null;
    let maxTime = 0;
    
    metrics.forEach(metric => {
      if (metric.renderTimes.length > 0) {
        const maxRenderTime = Math.max(...metric.renderTimes);
        if (maxRenderTime > maxTime) {
          maxTime = maxRenderTime;
          slowest = metric.name;
        }
      }
    });
    
    return slowest;
  }

  private getComponentStatus(metric: ComponentMetrics): 'excellent' | 'good' | 'warning' | 'critical' {
    if (metric.renderTimes.length === 0) return 'good';
    
    const avgRenderTime = metric.renderTimes.reduce((a, b) => a + b, 0) / metric.renderTimes.length;
    
    if (avgRenderTime < 5) return 'excellent';
    if (avgRenderTime < 16) return 'good';
    if (avgRenderTime < 33) return 'warning';
    return 'critical';
  }

  private generateRecommendations(metrics: ComponentMetrics[]): PerformanceRecommendation[] {
    const recommendations: PerformanceRecommendation[] = [];
    
    metrics.forEach(metric => {
      const avgRenderTime = metric.renderTimes.length > 0 
        ? metric.renderTimes.reduce((a, b) => a + b, 0) / metric.renderTimes.length 
        : 0;
      
      if (avgRenderTime > 16) {
        recommendations.push({
          id: `rec-${metric.id}`,
          component: metric.name,
          type: 'performance',
          severity: avgRenderTime > 33 ? 'high' : 'medium',
          title: 'Slow Render Time',
          description: `Component renders in ${avgRenderTime.toFixed(2)}ms on average`,
          suggestion: 'Consider using React.memo() or optimizing component logic',
          impact: 'High',
          effort: 'Medium'
        });
      }
      
      if (metric.rerenderCount > 10) {
        recommendations.push({
          id: `rec-rerender-${metric.id}`,
          component: metric.name,
          type: 'optimization',
          severity: 'medium',
          title: 'Frequent Re-renders',
          description: `Component re-rendered ${metric.rerenderCount} times`,
          suggestion: 'Check prop dependencies and consider memoization',
          impact: 'Medium',
          effort: 'Low'
        });
      }
    });
    
    return recommendations;
  }

  destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
    this.alerts = [];
  }
}