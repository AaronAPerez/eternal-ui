import { useCallback, useState } from "react";

/**
 * Advanced Clipboard System
 */
export function useAdvancedClipboard() {
  const [clipboard, setClipboard] = useState<{
    items: any[];
    operation: 'copy' | 'cut' | null;
    source: string | null;
  }>({
    items: [],
    operation: null,
    source: null
  });

  const copyItems = useCallback((items: any[], source: string) => {
    setClipboard({
      items: JSON.parse(JSON.stringify(items)), // Deep clone
      operation: 'copy',
      source
    });
  }, []);

  const cutItems = useCallback((items: any[], source: string) => {
    setClipboard({
      items: JSON.parse(JSON.stringify(items)), // Deep clone
      operation: 'cut',
      source
    });
  }, []);

  const pasteItems = useCallback((targetPosition?: { x: number; y: number }) => {
    if (clipboard.items.length === 0) return [];

    const offset = targetPosition || { x: 20, y: 20 };
    
    return clipboard.items.map((item, index) => ({
      ...item,
      id: `${item.id}-copy-${Date.now()}-${index}`,
      position: {
        x: item.position.x + offset.x + (index * 10),
        y: item.position.y + offset.y + (index * 10)
      },
      metadata: {
        ...item.metadata,
        copiedFrom: item.id,
        copiedAt: new Date().toISOString()
      }
    }));
  }, [clipboard]);

  const canPaste = clipboard.items.length > 0;

  return {
    clipboard,
    copyItems,
    cutItems,
    pasteItems,
    canPaste
  };
}