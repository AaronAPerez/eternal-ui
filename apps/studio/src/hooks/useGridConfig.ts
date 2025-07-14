'use client';

import { useState, useCallback } from 'react';
import { GridConfig } from '@/types/grid';

export const useGridConfig = (initialTheme: 'light' | 'dark' = 'light') => {
  const [gridConfig, setGridConfig] = useState<GridConfig>({
    visible: true,
    snapEnabled: true,
    columns: 12,
    rows: 24,
    cellSize: 60,
    gap: 16,
    opacity: 0.3,
    color: initialTheme === 'dark' ? '#6366f1' : '#3b82f6',
    style: 'lines'
  });

  const updateGridConfig = useCallback((updates: Partial<GridConfig>) => {
    setGridConfig(prev => ({ ...prev, ...updates }));
  }, []);

  return { gridConfig, setGridConfig, updateGridConfig };
};