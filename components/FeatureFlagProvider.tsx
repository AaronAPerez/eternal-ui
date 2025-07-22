'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { FeatureFlagService } from './FeatureFlagService';

const FeatureFlagContext = createContext<FeatureFlagService | null>(null);

export const FeatureFlagProvider: React.FC<{
  children: React.ReactNode;
  context: FeatureFlagContext;
}> = ({ children, context }) => {
  const [service] = useState(() => FeatureFlagService.getInstance(context));

  return (
    <FeatureFlagContext.Provider value={service}>
      {children}
    </FeatureFlagContext.Provider>
  );
};