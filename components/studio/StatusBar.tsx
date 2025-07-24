'use client';

import React from 'react';
import { 
  Users, 
  Layers, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Grid, 
  Zap, 
  Wifi, 
  WifiOff,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface StatusBarProps {
  elementsCount: number;
  selectedCount: number;
  canvasMode: 'desktop' | 'tablet' | 'mobile';
  zoom: number;
  gridEnabled: boolean;
  collaborators: any[];
  isOnline?: boolean;
  lastSaved?: string;
  hasUnsavedChanges?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  elementsCount,
  selectedCount,
  canvasMode,
  zoom,
  gridEnabled,
  collaborators,
  isOnline = true,
  lastSaved,
  hasUnsavedChanges = false
}) => {
  const formatLastSaved = (timestamp?: string) => {
    if (!timestamp) return 'Never';
    
    const now = new Date();
    const saved = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - saved.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return saved.toLocaleDateString();
  };

  const getCanvasIcon = () => {
    switch (canvasMode) {
      case 'desktop': return Monitor;
      case 'tablet': return Tablet;
      case 'mobile': return Smartphone;
      default: return Monitor;
    }
  };

  const CanvasIcon = getCanvasIcon();

  return (
    <div className="h-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 text-xs text-gray-600 dark:text-gray-400">
      {/* Left Side - Project Stats */}
      <div className="flex items-center gap-4">
        {/* Elements Count */}
        <div className="flex items-center gap-1">
          <Layers className="w-3 h-3" />
          <span>{elementsCount} element{elementsCount !== 1 ? 's' : ''}</span>
        </div>

        {/* Selection Count */}
        {selectedCount > 0 && (
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            <span>{selectedCount} selected</span>
          </div>
        )}

        {/* Canvas Mode */}
        <div className="flex items-center gap-1 capitalize">
          <CanvasIcon className="w-3 h-3" />
          <span>{canvasMode}</span>
        </div>

        {/* Grid Status */}
        {gridEnabled && (
          <div className="flex items-center gap-1">
            <Grid className="w-3 h-3" />
            <span>Grid</span>
          </div>
        )}

        {/* Zoom Level */}
        <div className="flex items-center gap-1">
          <span>{Math.round(zoom * 100)}%</span>
        </div>
      </div>

      {/* Center - Save Status */}
      <div className="flex items-center gap-2">
        {hasUnsavedChanges ? (
          <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <span>Unsaved changes</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <CheckCircle className="w-3 h-3" />
            <span>Saved {formatLastSaved(lastSaved)}</span>
          </div>
        )}
      </div>

      {/* Right Side - Collaboration & Connection */}
      <div className="flex items-center gap-4">
        {/* Collaborators */}
        {collaborators.length > 0 && (
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{collaborators.length} online</span>
            {collaborators.length > 0 && (
              <div className="flex -space-x-1 ml-1">
                {collaborators.slice(0, 3).map((collaborator, index) => (
                  <div
                    key={collaborator.id}
                    className="w-4 h-4 rounded-full border border-white dark:border-gray-800 flex-shrink-0"
                    style={{ 
                      backgroundColor: collaborator.color,
                      zIndex: collaborators.length - index
                    }}
                    title={collaborator.name}
                  />
                ))}
                {collaborators.length > 3 && (
                  <div className="w-4 h-4 bg-gray-400 rounded-full border border-white dark:border-gray-800 flex items-center justify-center text-xs text-white font-medium">
                    +{collaborators.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Connection Status */}
        <div className="flex items-center gap-1">
          {isOnline ? (
            <>
              <Wifi className="w-3 h-3 text-green-500" />
              <span className="text-green-600 dark:text-green-400">Online</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3 text-red-500" />
              <span className="text-red-600 dark:text-red-400">Offline</span>
            </>
          )}
        </div>

        {/* Performance Indicator */}
        <div className="flex items-center gap-1">
          <Zap className="w-3 h-3" />
          <Badge variant="secondary" className="text-xs px-1 py-0">
            Ready
          </Badge>
        </div>
      </div>
    </div>
  );
};