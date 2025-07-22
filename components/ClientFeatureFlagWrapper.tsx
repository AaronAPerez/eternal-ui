'use client';

import { useEffect, useState } from 'react';
import { FeatureFlagProvider } from './FeatureFlagProvider';


export function ClientFeatureFlagWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>{children}</div>;
  }

  const featureFlagContext = {
    userId: 'dev-user-123', // Static for now
    userSegment: 'beta' as const,
    environment: 'development' as const,
    beta: true
  };

  return (
    <FeatureFlagProvider context={featureFlagContext}>
      {children}
    </FeatureFlagProvider>
  );
}