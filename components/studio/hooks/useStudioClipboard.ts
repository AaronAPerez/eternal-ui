import { useStudio } from "./useStudio";

/**
 * Hook for clipboard operations
 */
export function useStudioClipboard() {
  const { state, copyElements, cutElements, pasteElements, clearClipboard } = useStudio();
  
  return {
    canPaste: state.clipboard.items.length > 0,
    clipboardCount: state.clipboard.items.length,
    lastOperation: state.clipboard.operation,
    copyElements,
    cutElements,
    pasteElements,
    clearClipboard,
  };
}
