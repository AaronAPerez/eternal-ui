import { FeatureFlagService } from "@/components/FeatureFlagService";
import { useContext, useEffect, useState } from "react";

// Hook to check if a feature is enabled
export const useFeatureFlag = (flagKey: string): boolean => {
  const service = useContext(FeatureFlagContext);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (service) {
      setIsEnabled(service.isEnabled(flagKey));
    }
  }, [service, flagKey]);

  if (!service) {
    console.warn('useFeatureFlag must be used within a FeatureFlagProvider');
    return false;
  }

  return isEnabled;
};

// Hook to get multiple feature flags
export const useFeatureFlags = (flagKeys: string[]): Record<string, boolean> => {
  const service = useContext(FeatureFlagContext);
  const [flags, setFlags] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (service) {
      const newFlags = flagKeys.reduce((acc, key) => {
        acc[key] = service.isEnabled(key);
        return acc;
      }, {} as Record<string, boolean>);
      setFlags(newFlags);
    }
  }, [service, flagKeys]);

  return flags;
};

// Hook to get feature flag service
export const useFeatureFlagService = (): FeatureFlagService | null => {
  return useContext(FeatureFlagContext);
};



// =================================================================
// INTEGRATION WITH UI BUILDER
// =================================================================

export const useUIBuilderFeatures = () => {
  const flags = useFeatureFlags([
    'ENHANCED_COMPONENT_REGISTRY',
    'GRID_SNAP_SYSTEM',
    'ADVANCED_GRID_FEATURES',
    'MULTI_FRAMEWORK_CODEGEN',
    'ADVANCED_CODE_FEATURES',
    'INLINE_TEXT_EDITING',
    'ADVANCED_PROPERTY_EDITOR',
    'COMPONENT_VARIANTS',
    'PERFORMANCE_MONITORING',
    'CANVAS_VIRTUALIZATION',
    'REAL_TIME_COLLABORATION',
    'AI_DESIGN_ASSISTANT'
  ]);

  return {
    // Phase 1 features
    hasEnhancedRegistry: flags.ENHANCED_COMPONENT_REGISTRY,
    
    // Phase 2 features
    hasGridSystem: flags.GRID_SNAP_SYSTEM,
    hasAdvancedGrid: flags.ADVANCED_GRID_FEATURES,
    
    // Phase 3 features
    hasCodeGeneration: flags.MULTI_FRAMEWORK_CODEGEN,
    hasAdvancedCodeFeatures: flags.ADVANCED_CODE_FEATURES,
    
    // Phase 4 features
    hasInlineEditing: flags.INLINE_TEXT_EDITING,
    hasAdvancedProperties: flags.ADVANCED_PROPERTY_EDITOR,
    hasComponentVariants: flags.COMPONENT_VARIANTS,
    
    // Phase 5 features
    hasPerformanceMonitoring: flags.PERFORMANCE_MONITORING,
    hasVirtualization: flags.CANVAS_VIRTUALIZATION,
    
    // Future features
    hasCollaboration: flags.REAL_TIME_COLLABORATION,
    hasAIAssistant: flags.AI_DESIGN_ASSISTANT,
    
    // Computed flags
    canUseAdvancedFeatures: flags.ENHANCED_COMPONENT_REGISTRY && flags.GRID_SNAP_SYSTEM,
    canExportCode: flags.MULTI_FRAMEWORK_CODEGEN,
    canUseAI: flags.AI_DESIGN_ASSISTANT
  };
};