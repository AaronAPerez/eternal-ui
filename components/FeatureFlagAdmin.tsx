
// =================================================================
// FEATURE FLAG ADMIN PANEL COMPONENT
// =================================================================

import { useFeatureFlagService } from '@/hooks/useFeatureFlag';
import { FeatureFlag, FEATURE_FLAGS } from '@/lib/feature-flags';
import React, { useState, useEffect } from 'react';
import { FeatureFlagAnalytics } from './FeatureFlagAnalytics';

interface FeatureFlagAdminProps {
  showInProduction?: boolean;
}

export const FeatureFlagAdmin: React.FC<FeatureFlagAdminProps> = ({ 
  showInProduction = false 
}) => {
  const service = useFeatureFlagService();
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [stats, setStats] = useState<any>({});
  const [analytics] = useState(() => FeatureFlagAnalytics.getInstance());

  useEffect(() => {
    if (service) {
      setFlags(Array.from(FEATURE_FLAGS).map(([key, flag]) => flag));
      setStats(service.getStats());
    }
  }, [service]);

  // Don't show in production unless explicitly allowed
  if (process.env.NODE_ENV === 'production' && !showInProduction) {
    return null;
  }

  if (!service) {
    return <div>Feature flag service not available</div>;
  }

  const handleToggleOverride = (flagKey: string, currentValue: boolean) => {
    service.override(flagKey, !currentValue);
    // Trigger re-render by updating stats
    setStats(service.getStats());
  };

  const handleClearOverride = (flagKey: string) => {
    service.clearOverride(flagKey);
    setStats(service.getStats());
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Feature Flag Admin</h3>
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div className="bg-blue-50 p-3 rounded">
            <div className="font-medium text-blue-900">Total Flags</div>
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          </div>
          <div className="bg-green-50 p-3 rounded">
            <div className="font-medium text-green-900">Enabled</div>
            <div className="text-2xl font-bold text-green-600">{stats.enabled}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-900">Disabled</div>
            <div className="text-2xl font-bold text-gray-600">{stats.disabled}</div>
          </div>
          <div className="bg-yellow-50 p-3 rounded">
            <div className="font-medium text-yellow-900">Overrides</div>
            <div className="text-2xl font-bold text-yellow-600">{stats.overrides}</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">Feature Flags</h4>
          <button
            onClick={() => service.clearAllOverrides()}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Clear All Overrides
          </button>
        </div>

        <div className="space-y-3">
          {flags.map(flag => {
            const isEnabled = service.isEnabled(flag.key);
            const hasOverride = service['overrides'].has(flag.key);
            const flagAnalytics = analytics.getAnalytics(flag.key);

            return (
              <div key={flag.key} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h5 className="font-medium text-gray-900">{flag.name}</h5>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        isEnabled 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {isEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                      {hasOverride && (
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                          Override
                        </span>
                      )}
                      {flag.rolloutPercentage !== undefined && flag.rolloutPercentage < 100 && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                          {flag.rolloutPercentage}% Rollout
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{flag.description}</p>
                    
                    {flag.dependencies && flag.dependencies.length > 0 && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">Depends on: </span>
                        {flag.dependencies.map((dep, i) => (
                          <span key={dep} className="text-xs text-blue-600">
                            {dep}{i < flag.dependencies!.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                    )}

                    {flagAnalytics.totalChecks > 0 && (
                      <div className="mt-2 flex gap-4 text-xs text-gray-500">
                        <span>Checks: {flagAnalytics.totalChecks}</span>
                        <span>Conversions: {flagAnalytics.conversions}</span>
                        <span>Rate: {flagAnalytics.conversionRate.toFixed(1)}%</span>
                        <span>Users: {flagAnalytics.uniqueUsers}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {hasOverride && (
                      <button
                        onClick={() => handleClearOverride(flag.key)}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Clear
                      </button>
                    )}
                    <button
                      onClick={() => handleToggleOverride(flag.key, isEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        isEnabled ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
