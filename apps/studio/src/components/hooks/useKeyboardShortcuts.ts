import { useEffect } from "react";

// Keyboard shortcuts hook
export const useKeyboardShortcuts = (
  setSearchFocus: () => void,
  copyCode: () => void,
  toggleBuildMode: () => void,
  closeModals: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Escape key
      if (e.key === 'Escape') {
        closeModals();
        return;
      }

      // Handle Ctrl/Cmd combinations
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            setSearchFocus();
            break;
          case 'c':
            e.preventDefault();
            copyCode();
            break;
          case 'b':
            e.preventDefault();
            toggleBuildMode();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setSearchFocus, copyCode, toggleBuildMode, closeModals]);
};
