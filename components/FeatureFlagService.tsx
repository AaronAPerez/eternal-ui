
// =================================================================
// FEATURE FLAG SERVICE
// =================================================================

import { FEATURE_FLAGS, FeatureFlag, FeatureFlagContext } from "@/lib/feature-flags";

export class FeatureFlagService {
  private static instance: FeatureFlagService;
  private flags: Map<string, FeatureFlag> = new Map();
  private context: FeatureFlagContext;
  private overrides: Map<string, boolean> = new Map();

  constructor(context: FeatureFlagContext) {
    this.context = context;
    this.loadFlags();
  }

  static getInstance(context?: FeatureFlagContext): FeatureFlagService {
    if (!FeatureFlagService.instance && context) {
      FeatureFlagService.instance = new FeatureFlagService(context);
    }
    return FeatureFlagService.instance;
  }

  private loadFlags(): void {
    Object.values(FEATURE_FLAGS).forEach(flag => {
      this.flags.set(flag.key, flag);
    });
  }

  // Check if a feature is enabled for the current context
  isEnabled(flagKey: string): boolean {
    // Check for local overrides first (for development/testing)
    if (this.overrides.has(flagKey)) {
      return this.overrides.get(flagKey)!;
    }

    const flag = this.flags.get(flagKey);
    if (!flag) {
      console.warn(`Feature flag '${flagKey}' not found`);
      return false;
    }

    // Check environment
    if (flag.environments && !flag.environments.includes(this.context.environment)) {
      return false;
    }

    // Check date range
    const now = new Date();
    if (flag.startDate && now < flag.startDate) {
      return false;
    }
    if (flag.endDate && now > flag.endDate) {
      return false;
    }

    // Check dependencies
    if (flag.dependencies) {
      for (const dependency of flag.dependencies) {
        if (!this.isEnabled(dependency)) {
          return false;
        }
      }
    }

    // Check user segments
    if (flag.userSegments && flag.userSegments.length > 0) {
      if (!this.context.userSegment || !flag.userSegments.includes(this.context.userSegment)) {
        return false;
      }
    }

    // Check rollout percentage
    if (flag.rolloutPercentage !== undefined && flag.rolloutPercentage < 100) {
      if (!this.context.userId) {
        return flag.rolloutPercentage >= 100;
      }
      
      // Consistent rollout based on user ID hash
      const hash = this.hashUserId(this.context.userId, flagKey);
      const userPercentile = hash % 100;
      return userPercentile < flag.rolloutPercentage;
    }

    return flag.enabled;
  }

  // Get all enabled flags
  getEnabledFlags(): string[] {
    return Array.from(this.flags.keys()).filter(key => this.isEnabled(key));
  }

  // Get flag metadata
  getFlag(flagKey: string): FeatureFlag | undefined {
    return this.flags.get(flagKey);
  }

  // Override flag (for development/testing)
  override(flagKey: string, enabled: boolean): void {
    this.overrides.set(flagKey, enabled);
    console.log(`Feature flag '${flagKey}' overridden to ${enabled}`);
  }

  // Clear override
  clearOverride(flagKey: string): void {
    this.overrides.delete(flagKey);
    console.log(`Feature flag '${flagKey}' override cleared`);
  }

  // Clear all overrides
  clearAllOverrides(): void {
    this.overrides.clear();
    console.log('All feature flag overrides cleared');
  }

  // Update context (e.g., when user logs in)
  updateContext(newContext: Partial<FeatureFlagContext>): void {
    this.context = { ...this.context, ...newContext };
  }

  // Hash user ID for consistent rollout
  private hashUserId(userId: string, flagKey: string): number {
    const str = `${userId}-${flagKey}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  // Get feature flag statistics
  getStats(): {
    total: number;
    enabled: number;
    disabled: number;
    rolloutFlags: number;
    overrides: number;
  } {
    const allFlags = Array.from(this.flags.values());
    const enabledFlags = this.getEnabledFlags();
    
    return {
      total: allFlags.length,
      enabled: enabledFlags.length,
      disabled: allFlags.length - enabledFlags.length,
      rolloutFlags: allFlags.filter(f => f.rolloutPercentage && f.rolloutPercentage < 100).length,
      overrides: this.overrides.size
    };
  }
}
