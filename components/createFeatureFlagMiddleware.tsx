

// =================================================================
// FEATURE FLAG MIDDLEWARE
// =================================================================

import { FeatureFlagAnalytics } from "./FeatureFlagAnalytics";
import { FeatureFlagService } from "./FeatureFlagService";

export const createFeatureFlagMiddleware = (service: FeatureFlagService) => {
  return (store: any) => (next: any) => (action: any) => {
    // Track feature flag usage in Redux actions
    if (action.type && action.featureFlag) {
      const analytics = FeatureFlagAnalytics.getInstance();
      analytics.trackFlagCheck(
        action.featureFlag,
        service.isEnabled(action.featureFlag),
        action.userId
      );
    }

    return next(action);
  };
};
