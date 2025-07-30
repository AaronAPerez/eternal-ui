import React from 'react';
import { useUIStore } from '@/stores/uiStore';

export const SnapGuides: React.FC = () => {
  const showSnapGuides = useUIStore(state => state.showSnapGuides);
  const snapGuides = useUIStore(state => state.snapGuides);
  
  if (!showSnapGuides) return null;
  
  return (
    <>
      {/* Vertical guides */}
      {snapGuides.x.map((x, index) => (
        <div
          key={`guide-x-${index}`}
          className="absolute pointer-events-none z-50"
          style={{
            left: `${x}px`,
            top: 0,
            width: '1px',
            height: '100%',
            background: 'linear-gradient(to bottom, #10b981, #3b82f6)',
            boxShadow: '0 0 4px rgba(16, 185, 129, 0.5)'
          }}
        />
      ))}
      
      {/* Horizontal guides */}
      {snapGuides.y.map((y, index) => (
        <div
          key={`guide-y-${index}`}
          className="absolute pointer-events-none z-50"
          style={{
            left: 0,
            top: `${y}px`,
            width: '100%',
            height: '1px',
            background: 'linear-gradient(to right, #10b981, #3b82f6)',
            boxShadow: '0 0 4px rgba(16, 185, 129, 0.5)'
          }}
        />
      ))}
    </>
  );
};
