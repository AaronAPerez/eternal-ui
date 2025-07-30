import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Component } from '@/types';

interface HistoryState {
  components: Component[];
  timestamp: number;
  action: string;
}

interface HistoryStore {
  history: HistoryState[];
  historyIndex: number;
  
  // Computed properties (derived state)
  canUndo: () => boolean;
  canRedo: () => boolean;
  
  // Actions
  saveToHistory: (components: Component[], action: string) => void;
  undo: () => Component[] | null;
  redo: () => Component[] | null;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryStore>()(
  devtools(
    (set, get) => ({
      history: [],
      historyIndex: -1,

      // Computed properties - WHY? Avoids re-computing in components
      canUndo: () => get().historyIndex > 0,
      canRedo: () => get().historyIndex < get().history.length - 1,

      saveToHistory: (components, action) => set((state) => {
        // Remove any future history if we're not at the end
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        
        // Add new state
        newHistory.push({
          components: JSON.parse(JSON.stringify(components)), // Deep clone
          timestamp: Date.now(),
          action
        });

        // Limit history size for memory management
        if (newHistory.length > 50) {
          newHistory.shift();
        }

        return {
          history: newHistory,
          historyIndex: newHistory.length - 1
        };
      }),

      undo: () => {
        const state = get();
        if (state.historyIndex > 0) {
          const newIndex = state.historyIndex - 1;
          set({ historyIndex: newIndex });
          return state.history[newIndex].components;
        }
        return null;
      },

      redo: () => {
        const state = get();
        if (state.historyIndex < state.history.length - 1) {
          const newIndex = state.historyIndex + 1;
          set({ historyIndex: newIndex });
          return state.history[newIndex].components;
        }
        return null;
      },

      clearHistory: () => set({ history: [], historyIndex: -1 })
    })
  )
);