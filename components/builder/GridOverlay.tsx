// Grid overlay component
import React from 'react';
import { GRID_SIZE } from '@/lib/grid-snap';

interface GridOverlayProps {
  show: boolean;
  className?: string;
}

export function GridOverlay({ show, className = '' }: GridOverlayProps) {
  if (!show) return null;
  
  return (
    <div 
      className={`absolute inset-0 pointer-events-none opacity-10 z-0 ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, #6366f1 1px, transparent 1px),
          linear-gradient(to bottom, #6366f1 1px, transparent 1px)
        `,
        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
      }}
    />
  );
}