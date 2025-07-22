
// =================================================================
// FEATURE FLAG ANALYTICS
// =================================================================

export class FeatureFlagAnalytics {
  private static instance: FeatureFlagAnalytics;
  private events: Array<{
    timestamp: Date;
    userId?: string;
    flagKey: string;
    enabled: boolean;
    action: 'check' | 'conversion' | 'error';
    metadata?: Record<string, any>;
  }> = [];

  static getInstance(): FeatureFlagAnalytics {
    if (!FeatureFlagAnalytics.instance) {
      FeatureFlagAnalytics.instance = new FeatureFlagAnalytics();
    }
    return FeatureFlagAnalytics.instance;
  }

  // Track flag usage
  trackFlagCheck(flagKey: string, enabled: boolean, userId?: string): void {
    this.events.push({
      timestamp: new Date(),
      userId,
      flagKey,
      enabled,
      action: 'check'
    });
  }

  // Track conversion events
  trackConversion(flagKey: string, userId?: string, metadata?: Record<string, any>): void {
    this.events.push({
      timestamp: new Date(),
      userId,
      flagKey,
      enabled: true,
      action: 'conversion',
      metadata
    });
  }

  // Track errors related to feature flags
  trackError(flagKey: string, error: Error, userId?: string): void {
    this.events.push({
      timestamp: new Date(),
      userId,
      flagKey,
      enabled: false,
      action: 'error',
      metadata: { error: error.message, stack: error.stack }
    });
  }

  // Get analytics data
  getAnalytics(flagKey?: string): {
    totalChecks: number;
    enabledChecks: number;
    disabledChecks: number;
    conversions: number;
    errors: number;
    conversionRate: number;
    uniqueUsers: number;
  } {
    const relevantEvents = flagKey 
      ? this.events.filter(e => e.flagKey === flagKey)
      : this.events;

    const checks = relevantEvents.filter(e => e.action === 'check');
    const conversions = relevantEvents.filter(e => e.action === 'conversion');
    const errors = relevantEvents.filter(e => e.action === 'error');
    const uniqueUsers = new Set(relevantEvents.map(e => e.userId).filter(Boolean)).size;

    return {
      totalChecks: checks.length,
      enabledChecks: checks.filter(e => e.enabled).length,
      disabledChecks: checks.filter(e => !e.enabled).length,
      conversions: conversions.length,
      errors: errors.length,
      conversionRate: checks.length > 0 ? (conversions.length / checks.length) * 100 : 0,
      uniqueUsers
    };
  }

  // Export analytics data
  exportData(startDate?: Date, endDate?: Date): any[] {
    return this.events.filter(event => {
      if (startDate && event.timestamp < startDate) return false;
      if (endDate && event.timestamp > endDate) return false;
      return true;
    });
  }
}