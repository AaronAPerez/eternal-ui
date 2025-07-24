import React from "react";
import { useState, useCallback } from "react";

/**
 * Advanced History System - 50+ Actions
 */
export function useAdvancedHistory() {
  const [history, setHistory] = useState<{
    past: HistoryAction[];
    present: HistoryAction | null;
    future: HistoryAction[];
    maxHistory: number;
  }>({
    past: [],
    present: null,
    future: [],
    maxHistory: 50
  });

  const addHistoryAction = useCallback((action: Omit<HistoryAction, 'id' | 'timestamp'>) => {
    const newAction: HistoryAction = {
      ...action,
      id: `action-${Date.now()}-${Math.random()}`,
      timestamp: Date.now()
    };

    setHistory(prev => ({
      ...prev,
      past: [...prev.past, prev.present].filter(Boolean).slice(-prev.maxHistory),
      present: newAction,
      future: []
    }));
  }, []);

  const undo = useCallback(() => {
    setHistory(prev => {
      if (prev.past.length === 0) return prev;
      
      const previous = prev.past[prev.past.length - 1];
      const newPast = prev.past.slice(0, -1);
      
      return {
        ...prev,
        past: newPast,
        present: previous,
        future: prev.present ? [prev.present, ...prev.future] : prev.future
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory(prev => {
      if (prev.future.length === 0) return prev;
      
      const next = prev.future[0];
      const newFuture = prev.future.slice(1);
      
      return {
        ...prev,
        past: prev.present ? [...prev.past, prev.present] : prev.past,
        present: next,
        future: newFuture
      };
    });
  }, []);

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  return {
    history,
    addHistoryAction,
    undo,
    redo,
    canUndo,
    canRedo
  };
}