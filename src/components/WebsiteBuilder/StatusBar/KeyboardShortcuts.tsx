import React from 'react';

export const KeyboardShortcuts: React.FC = () => {
  return (
    <span className="text-gray-400 hidden lg:block">
      ⌘C Copy • ⌘V Paste • ⌘Z Undo • ⌘D Duplicate • ⌘+ Zoom In • ⌘- Zoom Out • ⌘A Select All
    </span>
  );
};