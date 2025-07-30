import { renderHook, act } from '@testing-library/react';
import { useHistoryStore } from '../historyStore';
import { resetStores, createTestComponent } from '@/test-utils/store-utils';

describe('HistoryStore', () => {
  beforeEach(() => {
    resetStores();
  });

  describe('History Management', () => {
    it('should save to history', () => {
      const { result } = renderHook(() => useHistoryStore());
      const components = [createTestComponent()];
      
      act(() => {
        result.current.saveToHistory(components, 'Add Component');
      });
      
      expect(result.current.history).toHaveLength(1);
      expect(result.current.history[0].action).toBe('Add Component');
      expect(result.current.history[0].components).toEqual(components);
      expect(result.current.historyIndex).toBe(0);
    });

    it('should limit history size', () => {
      const { result } = renderHook(() => useHistoryStore());
      
      // Add 55 history entries (more than the 50 limit)
      act(() => {
        for (let i = 0; i < 55; i++) {
          result.current.saveToHistory([createTestComponent({ id: `test-${i}` })], `Action ${i}`);
        }
      });
      
      expect(result.current.history).toHaveLength(50);
      expect(result.current.history[0].action).toBe('Action 5'); // First 5 should be removed
    });

    it('should handle undo', () => {
      const { result } = renderHook(() => useHistoryStore());
      const components1 = [createTestComponent({ id: 'test-1' })];
      const components2 = [createTestComponent({ id: 'test-2' })];
      
      act(() => {
        result.current.saveToHistory(components1, 'Add Component 1');
        result.current.saveToHistory(components2, 'Add Component 2');
      });
      
      expect(result.current.canUndo()).toBe(true);
      expect(result.current.canRedo()).toBe(false);
      
      act(() => {
        const undoResult = result.current.undo();
        expect(undoResult).toEqual(components1);
      });
      
      expect(result.current.historyIndex).toBe(0);
      expect(result.current.canRedo()).toBe(true);
    });

    it('should handle redo', () => {
      const { result } = renderHook(() => useHistoryStore());
      const components1 = [createTestComponent({ id: 'test-1' })];
      const components2 = [createTestComponent({ id: 'test-2' })];
      
      act(() => {
        result.current.saveToHistory(components1, 'Add Component 1');
        result.current.saveToHistory(components2, 'Add Component 2');
        result.current.undo();
      });
      
      expect(result.current.canRedo()).toBe(true);
      
      act(() => {
        const redoResult = result.current.redo();
        expect(redoResult).toEqual(components2);
      });
      
      expect(result.current.historyIndex).toBe(1);
      expect(result.current.canRedo()).toBe(false);
    });

    it('should clear future history when saving new state', () => {
      const { result } = renderHook(() => useHistoryStore());
      const components1 = [createTestComponent({ id: 'test-1' })];
      const components2 = [createTestComponent({ id: 'test-2' })];
      const components3 = [createTestComponent({ id: 'test-3' })];
      
      act(() => {
        result.current.saveToHistory(components1, 'Add Component 1');
        result.current.saveToHistory(components2, 'Add Component 2');
        result.current.undo(); // Go back to components1
        result.current.saveToHistory(components3, 'Add Component 3'); // This should clear components2
      });
      
      expect(result.current.history).toHaveLength(2);
      expect(result.current.history[1].components).toEqual(components3);
      expect(result.current.canRedo()).toBe(false);
    });
  });
});