import React from 'react';
import { Copy, Clipboard } from 'lucide-react';
import { useBuilderStore } from '@/stores/builderStore';
import { useStores } from '@/hooks/useStores';

export const DesignSystemPanel: React.FC = () => {
  const selectedComponent = useBuilderStore(state => state.selectedComponent);
  const updateComponent = useBuilderStore(state => state.updateComponent);
  const project = useBuilderStore(state => state.project);
  const { actions } = useStores();

  return (
    <div className="border-t bg-gray-50 p-4">
      <h4 className="font-semibold text-gray-900 mb-4">Design System</h4>
      
      {/* Brand Colors */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Brand Colors
        </label>
        <div className="grid grid-cols-6 gap-2">
          {project.styles.colors.map((color, index) => (
            <button
              key={index}
              onClick={() => selectedComponent && updateComponent(selectedComponent, {
                styles: { backgroundColor: color }
              })}
              className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform relative group"
              style={{ backgroundColor: color }}
              title={color}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {color}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Spacing Scale */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Spacing Scale
        </label>
        <div className="grid grid-cols-6 gap-1">
          {project.styles.spacing.map((space, index) => (
            <button
              key={index}
              onClick={() => selectedComponent && updateComponent(selectedComponent, {
                styles: { padding: `${space}px` }
              })}
              className="px-1 py-1 bg-gray-100 rounded text-xs hover:bg-gray-200 transition-colors relative group"
              title={`${space}px padding`}
            >
              {space}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {space}px
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <button
          onClick={actions.copySelected}
          disabled={!selectedComponent && !actions.hasSelection()}
          className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Copy className="w-4 h-4" />
          Copy Selected (⌘C)
        </button>
        <button
          onClick={actions.paste}
          disabled={!actions.hasClipboard()}
          className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Clipboard className="w-4 h-4" />
          Paste (⌘V)
        </button>
      </div>
    </div>
  );
};