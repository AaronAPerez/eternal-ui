import React from 'react';
import { useUIStore } from '@/stores/uiStore';

export const SelectionBox: React.FC = () => {
  const selectionBox = useUIStore(state => state.selectionBox);
  
  if (!selectionBox) return null;
  
  return (
    <div
      className="absolute border-2 border-blue-500 bg-blue-100 bg-opacity-20 pointer-events-none z-40"
      style={{
        left: `${Math.min(selectionBox.start.x, selectionBox.end.x)}px`,
        top: `${Math.min(selectionBox.start.y, selectionBox.end.y)}px`,
        width: `${Math.abs(selectionBox.end.x - selectionBox.start.x)}px`,
        height: `${Math.abs(selectionBox.end.y - selectionBox.start.y)}px`
      }}
    />
  );
};