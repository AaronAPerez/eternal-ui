import React from 'react';
import { Lock, Unlock } from 'lucide-react';
import { useBuilderStore } from '@/stores/builderStore';
import { Component } from '@/types';

interface ComponentInfoProps {
  component: Component;
}

export const ComponentInfo: React.FC<ComponentInfoProps> = ({ component }) => {
  const updateComponent = useBuilderStore(state => state.updateComponent);

  const toggleLock = () => {
    updateComponent(component.id, { locked: !component.locked });
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Component Type
      </label>
      <div className="px-3 py-2 bg-gray-100 rounded text-sm flex items-center justify-between">
        <span className="capitalize">{component.type}</span>
        <button
          onClick={toggleLock}
          className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
        >
          {component.locked ? (
            <>
              <Lock className="w-3 h-3" />
              Locked
            </>
          ) : (
            <>
              <Unlock className="w-3 h-3" />
              Unlocked
            </>
          )}
        </button>
      </div>
    </div>
  );
};