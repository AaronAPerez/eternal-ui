import React from 'react';
import { Target, MousePointer, Move, CornerDownRight } from 'lucide-react';

export const EmptyStatePanel: React.FC = () => {
  return (
    <div className="p-4 text-gray-500 text-sm text-center">
      <div className="mb-4">
        <Target className="w-12 h-12 mx-auto text-gray-300 mb-2" />
        <p className="font-medium text-gray-700 mb-2">Select a component to edit its properties</p>
      </div>
      
      <div className="text-xs space-y-2 bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center gap-2">
          <MousePointer className="w-3 h-3" />
          <span>Click to select</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-gray-200 px-1 rounded">Ctrl</span>
          <span>+ Click for multi-select</span>
        </div>
        <div className="flex items-center gap-2">
          <Move className="w-3 h-3" />
          <span>Drag to move</span>
        </div>
        <div className="flex items-center gap-2">
          <CornerDownRight className="w-3 h-3" />
          <span>Drag corners to resize</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-gray-200 px-1 rounded">←→↑↓</span>
          <span>Arrow keys for precise movement</span>
        </div>
      </div>
    </div>
  );
};