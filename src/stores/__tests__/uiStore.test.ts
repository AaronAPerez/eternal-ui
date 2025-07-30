import { renderHook, act } from '@testing-library/react';
import { useUIStore } from '../uiStore';
import { resetStores } from '@/test-utils/store-utils';

describe('UIStore', () => {
  beforeEach(() => {
    resetStores();
  });

  describe('Panel Toggles', () => {
    it('should toggle template library', () => {
      const { result } = renderHook(() => useUIStore());
      
      expect(result.current.showTemplateLibrary).toBe(false);
      
      act(() => {
        result.current.toggleTemplateLibrary();
      });
      
      expect(result.current.showTemplateLibrary).toBe(true);
    });

    it('should toggle design guide', () => {
      const { result } = renderHook(() => useUIStore());
      
      act(() => {
        result.current.toggleDesignGuide();
      });
      
      expect(result.current.showDesignGuide).toBe(true);
    });

    it('should set style panel', () => {
      const { result } = renderHook(() => useUIStore());
      
      act(() => {
        result.current.setStylePanel('layout');
      });
      
      expect(result.current.selectedStylePanel).toBe('layout');
    });
  });

  describe('Drag and Drop State', () => {
    it('should set drag state', () => {
      const { result } = renderHook(() => useUIStore());
      
      act(() => {
        result.current.setDragState(true, 'component-1');
      });
      
      expect(result.current.isDragging).toBe(true);
      expect(result.current.draggedComponent).toBe('component-1');
      
      act(() => {
        result.current.setDragState(false);
      });
      
      expect(result.current.isDragging).toBe(false);
      expect(result.current.draggedComponent).toBeNull();
    });

    it('should set resize state', () => {
      const { result } = renderHook(() => useUIStore());
      
      act(() => {
        result.current.setResizeState(true);
      });
      
      expect(result.current.isResizing).toBe(true);
    });
  });

  describe('Performance Metrics', () => {
    it('should update performance metrics', () => {
      const { result } = renderHook(() => useUIStore());
      
      act(() => {
        result.current.updatePerformanceMetrics({
          renderTime: 15.5,
          memoryUsage: 25.3
        });
      });
      
      expect(result.current.performanceMetrics.renderTime).toBe(15.5);
      expect(result.current.performanceMetrics.memoryUsage).toBe(25.3);
      expect(result.current.performanceMetrics.domNodes).toBe(0); // Should keep existing value
    });
  });
});