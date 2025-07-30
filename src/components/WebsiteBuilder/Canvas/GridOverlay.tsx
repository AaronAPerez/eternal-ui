import React from 'react';
import { useBuilderStore } from '@/stores/builderStore';

export const GridOverlay: React.FC = () => {
  const gridSize = useBuilderStore(state => state.gridSize);
  
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <svg width="100%" height="100%" className="opacity-20">
        <defs>
          <pattern
            id="grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="0.5"
            />
            {/* Major grid lines every 5th line */}
            {gridSize >= 20 && (
              <path
                d={`M ${gridSize * 5} 0 L 0 0 0 ${gridSize * 5}`}
                fill="none"
                stroke="#1d4ed8"
                strokeWidth="1"
                opacity="0.5"
              />
            )}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};