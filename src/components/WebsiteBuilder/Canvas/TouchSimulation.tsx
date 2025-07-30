import React from 'react';
import { useUIStore } from '@/stores/uiStore';

export const TouchSimulation: React.FC = () => {
  const touchGestures = useUIStore(state => state.touchGestures || []);
  
  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {touchGestures.map((gesture, index) => (
        <div
          key={`${gesture.timestamp}-${index}`}
          className="absolute w-8 h-8 rounded-full border-2 animate-ping"
          style={{
            left: gesture.x - 16,
            top: gesture.y - 16,
            borderColor: gesture.type === 'tap' ? '#10b981' : 
                       gesture.type === 'swipe' ? '#f59e0b' :
                       gesture.type === 'pinch' ? '#ef4444' : '#8b5cf6',
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );
};