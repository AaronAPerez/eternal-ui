import { useStudio } from "./useStudio";

/**
 * Hook for history operations
 */
export function useStudioHistory() {
  const { state, undo, redo, clearHistory, addHistoryAction } = useStudio();
  
  return {
    canUndo: state.history.past.length > 0,
    canRedo: state.history.future.length > 0,
    historyCount: state.history.past.length,
    undo,
    redo,
    clearHistory,
    addHistoryAction,
  };
}