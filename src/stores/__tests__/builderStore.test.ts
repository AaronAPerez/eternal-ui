import { renderHook, act } from '@testing-library/react';
import { useBuilderStore } from '../builderStore';
import { resetStores, createTestComponent, getStoreState } from '@/test-utils/store-utils';

describe('BuilderStore', () => {
  beforeEach(() => {
    resetStores();
  });

  describe('Tool Selection', () => {
    it('should update selected tool', () => {
      const { result } = renderHook(() => useBuilderStore());
      
      act(() => {
        result.current.setSelectedTool('text');
      });
      
      expect(result.current.selectedTool).toBe('text');
    });

    it('should start with select tool', () => {
      const { result } = renderHook(() => useBuilderStore());
      expect(result.current.selectedTool).toBe('select');
    });
  });

  describe('Component Management', () => {
    it('should add component', () => {
      const { result } = renderHook(() => useBuilderStore());
      const testComponent = createTestComponent();
      
      act(() => {
        result.current.addComponent(testComponent);
      });
      
      expect(result.current.project.components).toHaveLength(1);
      expect(result.current.project.components[0]).toEqual(testComponent);
    });

    it('should update component', () => {
      const { result } = renderHook(() => useBuilderStore());
      const testComponent = createTestComponent();
      
      act(() => {
        result.current.addComponent(testComponent);
      });
      
      act(() => {
        result.current.updateComponent(testComponent.id, {
          styles: { fontSize: '24px', color: '#ff0000' }
        });
      });
      
      const updatedComponent = result.current.project.components[0];
      expect(updatedComponent.styles.fontSize).toBe('24px');
      expect(updatedComponent.styles.color).toBe('#ff0000');
    });

    it('should delete component', () => {
      const { result } = renderHook(() => useBuilderStore());
      const testComponent = createTestComponent();
      
      act(() => {
        result.current.addComponent(testComponent);
        result.current.selectComponent(testComponent.id);
      });
      
      expect(result.current.project.components).toHaveLength(1);
      expect(result.current.selectedComponent).toBe(testComponent.id);
      
      act(() => {
        result.current.deleteComponent(testComponent.id);
      });
      
      expect(result.current.project.components).toHaveLength(0);
      expect(result.current.selectedComponent).toBeNull();
    });

    it('should delete multiple components', () => {
      const { result } = renderHook(() => useBuilderStore());
      const component1 = createTestComponent({ id: 'test-1' });
      const component2 = createTestComponent({ id: 'test-2' });
      const component3 = createTestComponent({ id: 'test-3' });
      
      act(() => {
        result.current.addComponent(component1);
        result.current.addComponent(component2);
        result.current.addComponent(component3);
        result.current.selectMultipleComponents(['test-1', 'test-2']);
      });
      
      expect(result.current.project.components).toHaveLength(3);
      
      act(() => {
        result.current.deleteMultipleComponents(['test-1', 'test-2']);
      });
      
      expect(result.current.project.components).toHaveLength(1);
      expect(result.current.project.components[0].id).toBe('test-3');
      expect(result.current.selectedComponents).toEqual([]);
    });
  });

  describe('Selection Management', () => {
    it('should select single component', () => {
      const { result } = renderHook(() => useBuilderStore());
      
      act(() => {
        result.current.selectComponent('test-1');
      });
      
      expect(result.current.selectedComponent).toBe('test-1');
      expect(result.current.selectedComponents).toEqual([]);
    });

    it('should select multiple components', () => {
      const { result } = renderHook(() => useBuilderStore());
      
      act(() => {
        result.current.selectMultipleComponents(['test-1', 'test-2']);
      });
      
      expect(result.current.selectedComponents).toEqual(['test-1', 'test-2']);
      expect(result.current.selectedComponent).toBeNull();
    });

    it('should toggle component selection', () => {
      const { result } = renderHook(() => useBuilderStore());
      
      // Add to selection
      act(() => {
        result.current.toggleComponentSelection('test-1');
      });
      
      expect(result.current.selectedComponents).toEqual(['test-1']);
      
      // Add another
      act(() => {
        result.current.toggleComponentSelection('test-2');
      });
      
      expect(result.current.selectedComponents).toEqual(['test-1', 'test-2']);
      
      // Remove one
      act(() => {
        result.current.toggleComponentSelection('test-1');
      });
      
      expect(result.current.selectedComponents).toEqual(['test-2']);
    });
  });

  describe('Device and Zoom', () => {
    it('should change device', () => {
      const { result } = renderHook(() => useBuilderStore());
      
      act(() => {
        result.current.setDevice('mobile');
      });
      
      expect(result.current.device).toBe('mobile');
    });

    it('should update zoom within limits', () => {
      const { result } = renderHook(() => useBuilderStore());
      
      act(() => {
        result.current.setZoom(150);
      });
      
      expect(result.current.zoom).toBe(150);
      
      // Test upper limit
      act(() => {
        result.current.setZoom(500);
      });
      
      expect(result.current.zoom).toBe(300); // Should be capped at 300
      
      // Test lower limit
      act(() => {
        result.current.setZoom(10);
      });
      
      expect(result.current.zoom).toBe(25); // Should be capped at 25
    });

    it('should toggle grid', () => {
      const { result } = renderHook(() => useBuilderStore());
      
      expect(result.current.showGrid).toBe(true);
      
      act(() => {
        result.current.toggleGrid();
      });
      
      expect(result.current.showGrid).toBe(false);
    });
  });
});
