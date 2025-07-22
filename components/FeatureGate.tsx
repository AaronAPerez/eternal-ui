
// =================================================================
// FEATURE FLAG COMPONENTS
// =================================================================

import { useFeatureFlag, useFeatureFlagService, useFeatureFlags } from "@/hooks/useFeatureFlag";

interface FeatureGateProps {
  flag: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loading?: React.ReactNode;
}

export const FeatureGate: React.FC<FeatureGateProps> = ({
  flag,
  children,
  fallback = null,
  loading = null
}) => {
  const isEnabled = useFeatureFlag(flag);
  const service = useFeatureFlagService();

  if (!service) {
    return loading || fallback;
  }

  return isEnabled ? <>{children}</> : <>{fallback}</>;
};

interface ConditionalFeatureProps {
  flags: Record<string, boolean>;
  children: (enabledFlags: Record<string, boolean>) => React.ReactNode;
}

export const ConditionalFeature: React.FC<ConditionalFeatureProps> = ({
  flags,
  children
}) => {
  const enabledFlags = useFeatureFlags(Object.keys(flags));
  
  // Check if all required flags match the expected values
  const shouldRender = Object.entries(flags).every(([key, expectedValue]) => {
    return enabledFlags[key] === expectedValue;
  });

  return shouldRender ? <>{children(enabledFlags)}</> : null;
};
