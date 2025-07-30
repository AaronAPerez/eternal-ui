import React from 'react';

export const StatusIndicator: React.FC = () => {
  return (
    <span className="flex items-center gap-1">
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      Ready
    </span>
  );
};
