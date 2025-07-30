import React from 'react';

interface PerformanceIndicatorProps {
  metrics: {
    renderTime: number;
    memoryUsage: number;
    domNodes: number;
  };
}

export const PerformanceIndicator: React.FC<PerformanceIndicatorProps> = ({ metrics }) => {
  const getPerformanceColor = (renderTime: number) => {
    if (renderTime < 16) return 'text-green-400';
    if (renderTime < 33) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <span className={`${getPerformanceColor(metrics.renderTime)}`}>
      {metrics.renderTime.toFixed(1)}ms
    </span>
  );
};