import { useEffect } from 'react';
import { GridConfig, CanvasComponent } from '../types/grid';

export const useGridPersistence = (
  gridConfig: GridConfig,
  components: CanvasComponent[],
  projectId?: string
) => {
  // Save to localStorage
  useEffect(() => {
    const data = { gridConfig, components, savedAt: Date.now() };
    localStorage.setItem(`grid-project-${projectId || 'default'}`, JSON.stringify(data));
  }, [gridConfig, components, projectId]);

  // Load from localStorage
  const loadProject = (id: string) => {
    const saved = localStorage.getItem(`grid-project-${id}`);
    if (saved) {
      return JSON.parse(saved);
    }
    return null;
  };

  return { loadProject };
};