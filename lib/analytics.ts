import { FeatureFlagAnalytics } from "@/components/FeatureFlagAnalytics";


export const trackFeatureUsage = (feature: string, action: string) => {
  const analytics = FeatureFlagAnalytics.getInstance();
  analytics.trackConversion(feature, getCurrentUserId(), { action });
  
  // Also send to your analytics platform
  gtag('event', 'feature_usage', {
    feature_name: feature,
    action: action,
    user_id: getCurrentUserId()
  });
};