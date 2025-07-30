import React from 'react';
import { Sparkles, Play, Download, Palette, Info } from 'lucide-react';
import { useBuilderStore } from '@/stores/builderStore';
import { useUIStore } from '@/stores/uiStore';
import { ProjectInfo } from './ProjectInfo';
import { ToolGroup } from './ToolGroup';
import { HistoryControls } from './HistoryControls';
import { ZoomControls } from './ZoomControls';
import { ViewControls } from './ViewControls';
import { DeviceToggle } from './DeviceToggle';
import { ActionButtons } from './ActionButtons';

interface ToolbarProps {
  projectName: string;
  selectedTool: string;
  onToolChange: (tool: string) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitToCanvas: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  showRulers: boolean;
  onToggleRulers: () => void;
  device: 'mobile' | 'tablet' | 'desktop' | 'wide';
  onDeviceChange: (device: 'mobile' | 'tablet' | 'desktop' | 'wide') => void;
  showDesignGuide: boolean;
  onToggleDesignGuide: () => void;
  onTogglePreview: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  projectName,
  selectedTool,
  onToolChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  zoom,
  onZoomIn,
  onZoomOut,
  onFitToCanvas,
  showGrid,
  onToggleGrid,
  showRulers,
  onToggleRulers,
  device,
  onDeviceChange,
  showDesignGuide,
  onToggleDesignGuide,
  onTogglePreview
}) => {
  const componentCount = useBuilderStore(state => state.project.components.length);
  const toggleTemplateLibrary = useUIStore(state => state.toggleTemplateLibrary);

  return (
    <div className="h-16 max-w-7x1 bg-white border-b border-gray-200 flex items-center justify-between shadow-sm">
      {/* Left Section */}
     {/* <div className="flex items-center gap-2">
         {/* Brand 
         <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-blue-600" />
          <span className="font-bold text-gray-900">Studio Pro</span>
        </div>  */}
        
        {/* <div className="h-6 w-px bg-gray-300" />
        
        {/* Project Info */}
         {/* <ProjectInfo name={projectName} componentCount={componentCount} />
      </div>  */}

      {/* Center Section */}
      <div className="flex items-center gap-2">
        {/* Tools */}
        <ToolGroup />
        
        <div className="h-6 w-px bg-gray-300" />
        
        {/* History Controls */}
        <HistoryControls />
        
        <div className="h-6 w-px bg-gray-300" />
        
        {/* Zoom Controls */}
        <ZoomControls />
        
        <div className="h-6 w-px bg-gray-300" />
        
        {/* View Controls */}
        <ViewControls />
        
        <div className="h-6 w-px bg-gray-300" />
        
        {/* Device Toggle */}
        <DeviceToggle />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1">
        {/* Design Guide */}
        <button
          onClick={onToggleDesignGuide}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            showDesignGuide
              ? 'bg-purple-100 text-purple-800'
              : 'bg-sky-500 hover:bg-sky-400 text-gray-200'
          }`}
        >
          <Info className="w-4 h-4" />
          Guide
        </button>

        {/* Action Buttons */}
        <ActionButtons 
          onToggleTemplateLibrary={toggleTemplateLibrary}
          onTogglePreview={onTogglePreview}
        />
      </div>
    </div>
  );
};