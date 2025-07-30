import React from 'react';
import { Smartphone, Tablet, Monitor } from 'lucide-react';
import { useBuilderStore } from '@/stores/builderStore';

const devices = [
  { id: 'mobile', icon: Smartphone, label: 'Mobile', width: 375 },
  { id: 'tablet', icon: Tablet, label: 'Tablet', width: 768 },
  { id: 'desktop', icon: Monitor, label: 'Desktop', width: 1200 },
  { id: 'wide', icon: Monitor, label: '4K/Wide', width: 1920 }
];

export const DeviceToggle: React.FC = () => {
  const device = useBuilderStore(state => state.device);
  const setDevice = useBuilderStore(state => state.setDevice);

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      {devices.map((d) => (
        <button
          key={d.id}
          onClick={() => setDevice(d.id as any)}
          className={`p-2 rounded transition-all group relative ${
            device === d.id
              ? 'bg-white shadow-sm text-blue-600 scale-105'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          title={`${d.label} (${d.width}px)`}
        >
          <d.icon className="w-4 h-4" />
          
          {/* Tooltip */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {d.label} ({d.width}px)
          </div>
        </button>
      ))}
    </div>
  );
};