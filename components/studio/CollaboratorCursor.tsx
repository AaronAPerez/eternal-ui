'use client';

import React, { useEffect, useState } from 'react';

interface CollaboratorCursorProps {
  collaborator: {
    id: string;
    name: string;
    cursor: { x: number; y: number };
    color: string;
    lastSeen: number;
    isActive: boolean;
  };
  zoom: number;
}

export const CollaboratorCursor: React.FC<CollaboratorCursorProps> = ({ 
  collaborator, 
  zoom 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    if (!collaborator.isActive) {
      setIsVisible(false);
      return;
    }

    // Hide label after 3 seconds
    const labelTimer = setTimeout(() => {
      setShowLabel(false);
    }, 3000);

    // Show label on cursor movement
    setShowLabel(true);

    return () => {
      clearTimeout(labelTimer);
    };
  }, [collaborator.cursor.x, collaborator.cursor.y, collaborator.isActive]);

  // Check if collaborator is still active (within last 30 seconds)
  useEffect(() => {
    const now = Date.now();
    const isRecentlyActive = now - collaborator.lastSeen < 30000; // 30 seconds
    setIsVisible(collaborator.isActive && isRecentlyActive);
  }, [collaborator.lastSeen, collaborator.isActive]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute pointer-events-none z-50 transition-all duration-100 ease-out"
      style={{
        left: collaborator.cursor.x * zoom,
        top: collaborator.cursor.y * zoom,
        transform: `scale(${Math.max(0.5, Math.min(1, zoom))})`,
        transformOrigin: 'top left'
      }}
    >
      {/* Cursor SVG */}
      <div className="relative">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          className="drop-shadow-lg"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
        >
          {/* Cursor shape */}
          <path
            d="M5 3L21 12L13 14L10 21L5 3Z"
            fill={collaborator.color}
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Inner highlight */}
          <path
            d="M7 5L17 11L12 12L10 17L7 5Z"
            fill="rgba(255,255,255,0.3)"
          />
        </svg>
        
        {/* Name Label */}
        {showLabel && (
          <div
            className="absolute top-6 left-2 px-2 py-1 rounded-md text-xs text-white font-medium whitespace-nowrap animate-fadeIn shadow-lg"
            style={{ 
              backgroundColor: collaborator.color,
              maxWidth: '120px',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {collaborator.name}
            
            {/* Label arrow */}
            <div
              className="absolute -top-1 left-2 w-2 h-2 transform rotate-45"
              style={{ backgroundColor: collaborator.color }}
            />
          </div>
        )}

        {/* Active indicator pulse */}
        <div
          className="absolute -top-1 -left-1 w-6 h-6 rounded-full opacity-30 animate-ping"
          style={{ backgroundColor: collaborator.color }}
        />
      </div>

      {/* Selection indicator (if collaborator has something selected) */}
      {collaborator.isActive && (
        <div
          className="absolute top-0 left-0 w-1 h-6 animate-pulse"
          style={{ backgroundColor: collaborator.color }}
        />
      )}
    </div>
  );
};