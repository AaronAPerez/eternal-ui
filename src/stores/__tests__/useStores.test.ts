import { renderHook, act } from '@testing-library/react';
import { useStores } from '../useStores';
import { resetStores, createTestComponent } from '@/test-utils/store-utils';

describe('useStores Integration', () => {
  beforeEach(() => {
    resetStores();
  });

  describe('Integrated Actions', () => {
    it('should add component with history', () => {
      const { result } = renderHook(() => useStores());
      const testComponent = createTestComponent();
      
      act(() => {
        result.current.actions.addComponentWithHistory(testComponent);
      });
      
      // Check builder store
      expect(result.current.builder.project.components).toContain(testComponent);
      
      // Check history store
      expect(result.current.history.history).toHaveLength(1);
      expect(result.current.history.history[0].action).toBe('Add Component');
    });

    it('should update component with history', () => {
      const { result } = renderHook(() => useStores());
      const testComponent = createTestComponent();
      
      act(() => {
        result.current.builder.addComponent(testComponent);
      });
      
      act(() => {
        result.current.actions.updateComponentWithHistory(testComponent.id, {
          styles: { color: '#ff0000' }
        });
      });
      
      // Check component was updated
      const updatedComponent = result.current.builder.project.components[0];
      expect(updatedComponent.styles.color).toBe('#ff0000');
      
      // Check history was saved
      expect(result.current.history.history).toHaveLength(1);
      expect(result.current.history.history[0].action).toBe('Update Component');
    });

    it('should handle undo/redo integration', () => {
      const { result } = renderHook(() => useStores());
      const component1 = createTestComponent({ id: 'test-1' });
      const component2 = createTestComponent({ id: 'test-2' });
      
      act(() => {
        result.current.actions.addComponentWithHistory(component1);
        result.current.actions.addComponentWithHistory(component2);
      });
      
      expect(result.current.builder.project.components).toHaveLength(2);
      
      act(() => {
        result.current.actions.undo();
      });
      
      expect(result.current.builder.project.components).toHaveLength(1);
      expect(result.current.builder.project.components[0].id).toBe('test-1');
      
      act(() => {
        result.current.actions.redo();
      });
      
      expect(result.current.builder.project.components).toHaveLength(2);
    });
  });
});
