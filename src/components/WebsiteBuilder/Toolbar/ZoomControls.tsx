import React from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useBuilderStore } from '@/stores/builderStore';

export const ZoomControls: React.FC = () => {
  const zoom = useBuilderStore(state => state.zoom);
  const setZoom = useBuilderStore(state => state.setZoom);

  const handleZoomIn = () => setZoom(Math.min(zoom + 25, 300));
  const handleZoomOut = () => setZoom(Math.max(zoom - 25, 25));
  const handleFitToCanvas = () => setZoom(100);

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={handleZoomOut}
        disabled={zoom <= 25}
        className="p-2 rounded text-gray-600 hover:text-gray-900 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Zoom Out (⌘-)"
      >
        <ZoomOut className="w-4 h-4" />
      </button>
      
      <button
        onClick={handleFitToCanvas}
        className="px-2 text-sm font-medium text-gray-700 min-w-[60px] text-center hover:bg-gray-200 rounded"
        title="Fit to Canvas (⌘0)"
      >
        {zoom}%
      </button>
      
      <button
        onClick={handleZoomIn}
        disabled={zoom >= 300}
        className="p-2 rounded text-gray-600 hover:text-gray-900 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Zoom In (⌘+)"
      >
        <ZoomIn className="w-4 h-4" />
      </button>
      
      <button
        onClick={handleFitToCanvas}
        className="p-2 rounded text-gray-600 hover:text-gray-900 hover:bg-gray-200"
        title="Fit to Canvas (⌘0)"
      >
        <Maximize2 className="w-4 h-4" />
      </button>
    </div>
  );
};