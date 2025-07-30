import { Component, Project } from '../types';

// Why this interface? It defines our store's shape and makes TypeScript happy
export interface BuilderState {
  // STATE - What data we're tracking
  project: Project;
  selectedTool: string;
  selectedComponent: string | null;
  selectedComponents: string[]; // For multi-select
  device: 'mobile' | 'tablet' | 'desktop' | 'wide';
  zoom: number;
  showGrid: boolean;
  gridSize: number;
  isPreviewMode: boolean;
  
  // ACTIONS - Functions that modify state
  // Why separate actions? Makes it clear what operations are available
  setSelectedTool: (tool: string) => void;
  selectComponent: (id: string | null) => void;
  selectMultipleComponents: (ids: string[]) => void;
  toggleComponentSelection: (id: string) => void;
  updateComponent: (id: string, updates: Partial<Component>) => void;
  addComponent: (component: Component) => void;
  deleteComponent: (id: string) => void;
  deleteMultipleComponents: (ids: string[]) => void;
  duplicateComponent: (id: string) => void;
  moveComponent: (id: string, position: { x: number; y: number }) => void;
  resizeComponent: (id: string, size: { width: number; height: number }) => void;
  setZoom: (zoom: number) => void;
  setGridSize: (size: number) => void;
  toggleGrid: () => void;
  setDevice: (device: BuilderState['device']) => void;
  togglePreviewMode: () => void;
  updateProjectName: (name: string) => void;
}

// Default project to start with
export const defaultProject: Project = {
  id: '1',
  name: 'My Website',
  components: [
    {
      id: 'hero-1',
      type: 'hero',
      props: {
        title: 'Welcome to the Future',
        subtitle: 'Build amazing websites',
        ctaText: 'Get Started'
      },
      styles: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center',
      },
      position: { x: 0, y: 0 },
      size: { width: 1200, height: 400 }
    }
  ],
  styles: {
    colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4ecdc4', '#45b7d1'],
    fonts: ['Inter', 'Playfair Display', 'Source Sans Pro', 'Roboto'],
    spacing: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96]
  }
};

// Export the hook from the actual implementation
export { useBuilderStore } from '../hooks/useBuilderStore';
