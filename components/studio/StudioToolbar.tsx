'use client';

import React from 'react';
import { 
  Monitor, Tablet, Smartphone, Save,
  Undo, Redo, Users, Layers,
  Badge,
  Copy,
  Trash2,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { Button, Separator, Tooltip } from '@/components/ui';


// ====================================
// TOOLBAR COMPONENT
// ====================================

interface StudioToolbarProps {
  canvasMode: 'desktop' | 'tablet' | 'mobile';
  onCanvasModeChange: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  canPaste: boolean;
  onPaste: () => void;
  hasSelection: boolean;
  onCopy: () => void;
  onDelete: () => void;
  onSave: () => void;
  collaborators: any[];
  elementsCount: number;
}

const StudioToolbar: React.FC<StudioToolbarProps> = ({
  canvasMode,
  onCanvasModeChange,
  zoom,
  onZoomChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  canPaste,
  onPaste,
  hasSelection,
  onCopy,
  onDelete,
  onSave,
  collaborators,
  elementsCount
}) => {
  return (
    <div className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
      {/* Left Section - Project Info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <span className="font-semibold text-gray-900 dark:text-white">Eternal UI Studio</span>
        </div>
        <Badge variant="secondary" className="text-xs">
          {elementsCount} elements
        </Badge>
      </div>

      {/* Center Section - Canvas Controls */}
      <div className="flex items-center gap-2">
        {/* Device Mode Toggle */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <Tooltip content="Desktop View">
            <Button
              variant={canvasMode === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onCanvasModeChange('desktop')}
              className="p-2"
            >
              <Monitor className="w-4 h-4" />
            </Button>
          </Tooltip>
          <Tooltip content="Tablet View">
            <Button
              variant={canvasMode === 'tablet' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onCanvasModeChange('tablet')}
              className="p-2"
            >
              <Tablet className="w-4 h-4" />
            </Button>
          </Tooltip>
          <Tooltip content="Mobile View">
            <Button
              variant={canvasMode === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onCanvasModeChange('mobile')}
              className="p-2"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <Tooltip content="Zoom Out">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onZoomChange(Math.max(0.1, zoom - 0.1))}
              className="p-2"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
          </Tooltip>
          <span className="text-sm font-medium w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Tooltip content="Zoom In">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onZoomChange(Math.min(5, zoom + 0.1))}
              className="p-2"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2">
        {/* History Controls */}
        <Tooltip content="Undo (Ctrl+Z)">
          <Button
            variant="ghost"
            size="sm"
            onClick={onUndo}
            disabled={!canUndo}
            className="p-2"
          >
            <Undo className="w-4 h-4" />
          </Button>
        </Tooltip>
        <Tooltip content="Redo (Ctrl+Y)">
          <Button
            variant="ghost"
            size="sm"
            onClick={onRedo}
            disabled={!canRedo}
            className="p-2"
          >
            <Redo className="w-4 h-4" />
          </Button>
        </Tooltip>

        <Separator orientation="vertical" className="h-6" />

        {/* Clipboard Controls */}
        <Tooltip content="Copy (Ctrl+C)">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCopy}
            disabled={!hasSelection}
            className="p-2"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </Tooltip>
        <Tooltip content="Paste (Ctrl+V)">
          <Button
            variant="ghost"
            size="sm"
            onClick={onPaste}
            disabled={!canPaste}
            className="p-2"
          >
            <Paste className="w-4 h-4" />
          </Button>
        </Tooltip>
        <Tooltip content="Delete (Del)">
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            disabled={!hasSelection}
            className="p-2"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </Tooltip>

        <Separator orientation="vertical" className="h-6" />

        {/* Collaboration */}
        {collaborators.length > 0 && (
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">{collaborators.length}</span>
          </div>
        )}

        {/* Save Button */}
        <Button onClick={onSave} className="gap-2">
          <Save className="w-4 h-4" />
          Save
        </Button>
      </div>
    </div>
  );
};

export default StudioToolbar;