import React from 'react';
import { Users, Wifi, Save, AlertCircle } from 'lucide-react';
import { useBuilderStore } from '@/hooks/useBuilderStore';
import { useUIStore } from '@/stores/uiStore';
import { PerformanceIndicator } from './PerformanceIndicator';
import { StatusIndicator } from './StatusIndicator';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { CollaborationIndicator } from './CollaborationIndicator';
import { AutoSaveIndicator } from './AutoSaveIndicator';

interface StatusBarProps {
  componentCount?: number;
  device?: 'mobile' | 'tablet' | 'desktop' | 'wide';
  zoom?: number;
  performanceMetrics?: {
    renderTime: number;
    memoryUsage: number;
    domNodes: number;
    fps: number;
  };
}

export const StatusBar: React.FC<StatusBarProps> = ({
  componentCount: propComponentCount,
  device: propDevice,
  zoom: propZoom,
  performanceMetrics: propPerformanceMetrics
}) => {
  const storeComponentCount = useBuilderStore(state => state.project.components.length);
  const selection = useBuilderStore(state => state.selection);
  const storeDevice = useBuilderStore(state => state.device);
  const storeZoom = useBuilderStore(state => state.zoom);
  const storePerformanceMetrics = useUIStore(state => state.performanceMetrics);

  // Use props or fallback to store values
  const componentCount = propComponentCount ?? storeComponentCount;
  const device = propDevice ?? storeDevice;
  const zoom = propZoom ?? storeZoom;
  const performanceMetrics = propPerformanceMetrics ?? storePerformanceMetrics;

  const getDeviceWidth = () => {
    const widths = { mobile: 375, tablet: 768, desktop: 1200, wide: 1920 };
    return widths[device as keyof typeof widths] || 1200;
  };

  return (
    <div className="h-8 bg-gray-800 text-gray-300 text-xs flex items-center justify-between px-4">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <StatusIndicator />
        <span>{componentCount} components</span>
        <span>{device} view ({getDeviceWidth()}px)</span>
        <span>Zoom: {zoom}%</span>
        {selection?.selectedComponents?.length === 1 && <span>1 selected</span>}
        {selection?.selectedComponents && selection.selectedComponents.length > 1 && <span>{selection.selectedComponents.length} selected</span>}
        <PerformanceIndicator metrics={performanceMetrics} />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <AutoSaveIndicator />
        <CollaborationIndicator />
        <KeyboardShortcuts />
      </div>
    </div>
  );
};