import React from 'react';
import { useBuilderStore } from '@/stores/builderStore';
import { useUIStore } from '@/stores/uiStore';
import { StylePanelTabs } from './StylePanelTabs';
import { DesignPanel } from './panels/DesignPanel';
import { LayoutPanel } from './panels/LayoutPanel';
import { TextPanel } from './panels/TextPanel';
import { EffectsPanel } from './panels/EffectsPanel';
import { MultiSelectPanel } from './MultiSelectPanel';
import { EmptyStatePanel } from './EmptyStatePanel';
import { DesignSystemPanel } from './DesignSystemPanel';
import { ComponentInfo } from './ComponentInfo';

export const PropertiesPanel: React.FC = () => {
  const selection = useBuilderStore(state => state.selection);
  const project = useBuilderStore(state => state.project);
  const selectedStylePanel = useUIStore(state => state.selectedStylePanel);

  const component = selection?.selectedComponents?.length > 0
    ? project.components.find(c => c.id === selection.selectedComponents[0])
    : null;

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Style Panel Navigation */}
      <StylePanelTabs />

      <div className="flex-1 overflow-y-auto">
        {selection?.selectedComponents?.length === 1 && component ? (
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Properties</h3>
            
            {/* Component Info */}
            <ComponentInfo component={component as any} />
            
            {/* Style Panels */}
            {selectedStylePanel === 'design' && <DesignPanel component={component as any} />}
            {selectedStylePanel === 'layout' && <LayoutPanel component={component as any} />}
            {selectedStylePanel === 'text' && <TextPanel component={component as any} />}
            {selectedStylePanel === 'effects' && <EffectsPanel component={component as any} />}
          </div>
        ) : selection?.selectedComponents && selection.selectedComponents.length > 1 ? (
          <MultiSelectPanel selectedComponents={selection.selectedComponents} />
        ) : (
          <EmptyStatePanel />
        )}
        
        {/* Design System Panel - Always visible at bottom */}
        <DesignSystemPanel />
      </div>
    </div>
  );
};
