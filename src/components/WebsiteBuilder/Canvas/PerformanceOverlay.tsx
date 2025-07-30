import React from 'react';

interface PerformanceOverlayProps {
  metrics: {
    renderTime: number;
    memoryUsage: number;
    domNodes: number;
  };
  zoom: number;
  showGrid: boolean;
  componentCount: number;
}

export const PerformanceOverlay: React.FC<PerformanceOverlayProps> = ({
  metrics,
  zoom,
  showGrid,
  componentCount
}) => {
  return (
    <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-white p-2 rounded shadow">
      <div>Zoom: {zoom}%</div>
      <div>Grid: {showGrid ? 'On' : 'Off'}</div>
      <div>Components: {componentCount}</div>
      <div className="text-green-600">Render: {metrics.renderTime.toFixed(1)}ms</div>
      <div className="text-blue-600">Memory: {metrics.memoryUsage.toFixed(1)}MB</div>
      <div className="text-purple-600">DOM: {metrics.domNodes}</div>
    </div>
  );
};
