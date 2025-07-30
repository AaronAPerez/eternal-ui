import React from 'react';

interface RulerOverlayProps {
  zoom: number;
  deviceWidth: number;
}

export const RulerOverlay: React.FC<RulerOverlayProps> = ({ zoom, deviceWidth }) => {
  const zoomFactor = zoom / 100;
  
  return (
    <>
      {/* Horizontal Ruler */}
      <div className="h-6 bg-gray-100 border-b border-gray-200 relative" style={{ marginLeft: '24px' }}>
        <svg className="w-full h-full">
          {Array.from({ length: Math.ceil(deviceWidth / 50) }, (_, i) => (
            <g key={i}>
              <line
                x1={i * 50 * zoomFactor}
                y1="0"
                x2={i * 50 * zoomFactor}
                y2="24"
                stroke="#9ca3af"
                strokeWidth="1"
              />
              <text
                x={i * 50 * zoomFactor + 2}
                y="16"
                fontSize="10"
                fill="#6b7280"
              >
                {i * 50}
              </text>
            </g>
          ))}
        </svg>
      </div>
      
      {/* Vertical Ruler */}
      <div 
        className="absolute left-0 top-16 w-6 bg-gray-100 border-r border-gray-200" 
        style={{ height: 'calc(100vh - 64px)' }}
      >
        <svg className="w-full h-full">
          {Array.from({ length: 40 }, (_, i) => (
            <g key={i}>
              <line
                x1="0"
                y1={i * 50 * zoomFactor}
                x2="24"
                y2={i * 50 * zoomFactor}
                stroke="#9ca3af"
                strokeWidth="1"
              />
              <text
                x="2"
                y={i * 50 * zoomFactor + 12}
                fontSize="10"
                fill="#6b7280"
                transform={`rotate(-90 2 ${i * 50 * zoomFactor + 12})`}
              >
                {i * 50}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </>
  );
};
