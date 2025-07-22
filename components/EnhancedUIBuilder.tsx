import React from 'react';
import { CodeGenerationPanel } from './VisualBuilder/components/CodeGenerationPanel';
import { PropertyEditor } from './builder/PropertyEditor';
import { Canvas } from './VisualBuilder/components/Canvas/Canvas';
import { GridControls } from './VisualBuilder/components/GridControls';
import { ComponentPalette } from './VisualBuilder/components/ComponentPalette';
import { useUIBuilderFeatures } from '@/hooks/useFeatureFlag';

export function EnhancedUIBuilder() {
  const features = useUIBuilderFeatures();

  return (
    <div className="ui-builder">
      {/* Always available */}
      <BasicComponentPalette />

      {/* Feature-gated enhancements */}
      <FeatureGate flag="ENHANCED_COMPONENT_REGISTRY">
        <ComponentPalette />
      </FeatureGate>

      <FeatureGate flag="GRID_SNAP_SYSTEM">
        <GridControls />
      </FeatureGate>

      <FeatureGate flag="MULTI_FRAMEWORK_CODEGEN">
        <CodeGenerationPanel components={[]} />
      </FeatureGate>

      <FeatureGate flag="ADVANCED_PROPERTY_EDITOR" fallback={<BasicPropertyEditor />}>
        <PropertyEditor />
      </FeatureGate>

      {/* Canvas with conditional features */}
      <Canvas 
        gridEnabled={features.hasGridSystem}
        snapEnabled={features.hasGridSystem}
        inlineEditingEnabled={features.hasInlineEditing}
      />
    </div>
  );
}