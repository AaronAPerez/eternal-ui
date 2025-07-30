import { useCallback, useState } from 'react';
import { Component, HistoryState } from '../types';

export const useHistory = (initialComponents: Component[]) => {
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const saveToHistory = useCallback((action: string, components: Component[], selectedComponent: string | null) => {
    const historyState: HistoryState = {
      components,
      selectedComponent,
      timestamp: Date.now(),
      action
    };

    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(historyState);
      
      if (newHistory.length > 50) {
        newHistory.shift();
      }
      
      return newHistory;
    });
    
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      return history[historyIndex - 1];
    }
    return null;
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      return history[historyIndex + 1];
    }
    return null;
  }, [history, historyIndex]);

  return {
    history,
    historyIndex,
    saveToHistory,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1
  };
};