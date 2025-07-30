import React from 'react';
import { Grid, Ruler } from 'lucide-react';
import { useBuilderStore } from '@/stores/builderStore';
import { useUIStore } from '@/stores/uiStore';

export const ViewControls: React.FC = () => {
  const showGrid = useBuilderStore(state => state.showGrid);
  const toggleGrid = useBuilderStore(state => state.toggleGrid);
  const showRulers = useUIStore(state => state.showRulers);
  const toggleRulers = useUIStore(state => state.toggleRulers);

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={toggleGrid}
        className={`p-2 rounded transition-all group ${
          showGrid ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900'
        }`}
        title="Toggle Grid (⌘')"
      >
        <Grid className="w-4 h-4" />
        
        {/* Tooltip */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {showGrid ? 'Hide Grid' : 'Show Grid'}
        </div>
      </button>
      
      <button
        onClick={toggleRulers}
        className={`p-2 rounded transition-all group ${
          showRulers ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900'
        }`}
        title="Toggle Rulers (⌘R)"
      >
        <Ruler className="w-4 h-4" />
        
        {/* Tooltip */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {showRulers ? 'Hide Rulers' : 'Show Rulers'}
        </div>
      </button>
    </div>
  );
};