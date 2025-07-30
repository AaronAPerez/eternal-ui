import React from 'react';
import { Palette, Grid3X3, Type, Sparkles } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';

const tabs = [
  { id: 'design', label: 'Design', icon: Palette },
  { id: 'layout', label: 'Layout', icon: Grid3X3 },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'effects', label: 'Effects', icon: Sparkles }
] as const;

export const StylePanelTabs: React.FC = () => {
  const selectedStylePanel = useUIStore(state => state.selectedStylePanel);
  const setStylePanel = useUIStore(state => state.setStylePanel);

  return (
    <div className="border-b border-gray-200">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStylePanel(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1 py-3 text-sm transition-colors ${
              selectedStylePanel === tab.id
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};