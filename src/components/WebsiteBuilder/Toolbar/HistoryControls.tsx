import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useHistoryStore } from '@/stores/historyStore';
import { useStores } from '@/hooks/useStores';

export const HistoryControls: React.FC = () => {
  const canUndo = useHistoryStore(state => state.canUndo());
  const canRedo = useHistoryStore(state => state.canRedo());
  const historyIndex = useHistoryStore(state => state.historyIndex);
  const { actions } = useStores();

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={actions.undo}
        disabled={!canUndo}
        className={`p-2 rounded transition-all group ${
          !canUndo
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:scale-105'
        }`}
        title={`Undo (⌘Z) - ${historyIndex} actions`}
      >
        <RotateCcw className="w-4 h-4" />
        
        {/* Tooltip */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Undo (⌘Z)
        </div>
      </button>
      
      <button
        onClick={actions.redo}
        disabled={!canRedo}
        className={`p-2 rounded transition-all group ${
          !canRedo
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:scale-105'
        }`}
        title="Redo (⌘Y)"
      >
        <RotateCcw className="w-4 h-4 scale-x-[-1]" />
        
        {/* Tooltip */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Redo (⌘Y)
        </div>
      </button>
    </div>
  );
};