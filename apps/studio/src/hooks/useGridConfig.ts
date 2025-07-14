import { useState, useCallback } from 'react';
import { GridConfig } from '../types/grid';

export const useGridConfig = () => {
  const [gridConfig, setGridConfig] = useState<GridConfig>({
    visible: true,
    snapEnabled: true,
    columns: 12,
    rows: 8,
    cellSize: 60,
    gap: 16,
    opacity: 0.3,
    color: '#6366f1',
    style: 'lines'
  });

  const updateGridConfig = useCallback((updates: Partial<GridConfig>) => {
    setGridConfig(prev => ({ ...prev, ...updates }));
  }, []);

  return { gridConfig, setGridConfig, updateGridConfig };
};