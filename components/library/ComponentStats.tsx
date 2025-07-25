'use client';

import { BarChart3, Star, Download } from 'lucide-react';

interface ComponentStatsProps {
  components: any[];
}

export function ComponentStats({ components }: ComponentStatsProps) {
  const totalComponents = components.length;
  const avgRating = components.reduce((sum, comp) => sum + (comp.metadata?.rating || 4.5), 0) / totalComponents;
  const totalDownloads = components.reduce((sum, comp) => sum + (comp.metadata?.downloads || 1000), 0);

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-gray-600" />
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">{totalComponents}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Components</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-500 fill-current" />
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">{avgRating.toFixed(1)}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Avg Rating</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Download className="w-5 h-5 text-green-600" />
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">{(totalDownloads / 1000).toFixed(0)}k</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Downloads</div>
        </div>
      </div>
    </div>
  );
}