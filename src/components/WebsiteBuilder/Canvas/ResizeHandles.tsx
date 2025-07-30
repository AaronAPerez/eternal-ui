import React from 'react';
import { useResize } from '@/hooks/useResize';

interface ResizeHandlesProps {
  componentId: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isSelected: boolean;
  isLocked?: boolean;
}

export const ResizeHandles: React.FC<ResizeHandlesProps> = ({
  componentId,
  position,
  size,
  isSelected,
  isLocked = false
}) => {
  const { handleResizeStart } = useResize();

  if (!isSelected || isLocked) return null;

  const handles = [
    { id: 'nw', style: { left: -4, top: -4, cursor: 'nw-resize' } },
    { id: 'n', style: { left: size.width / 2 - 4, top: -4, cursor: 'n-resize' } },
    { id: 'ne', style: { right: -4, top: -4, cursor: 'ne-resize' } },
    { id: 'e', style: { right: -4, top: size.height / 2 - 4, cursor: 'e-resize' } },
    { id: 'se', style: { right: -4, bottom: -4, cursor: 'se-resize' } },
    { id: 's', style: { left: size.width / 2 - 4, bottom: -4, cursor: 's-resize' } },
    { id: 'sw', style: { left: -4, bottom: -4, cursor: 'sw-resize' } },
    { id: 'w', style: { left: -4, top: size.height / 2 - 4, cursor: 'w-resize' } }
  ];

  return (
    <>
      {handles.map(handle => (
        <div
          key={handle.id}
          className="absolute w-2 h-2 bg-blue-500 border border-white rounded-sm z-30 hover:bg-blue-600 transition-colors"
          style={{
            left: position.x + (handle.style.left || 0),
            top: position.y + (handle.style.top || 0),
            right: handle.style.right ? position.x + size.width - handle.style.right : undefined,
            bottom: handle.style.bottom ? position.y + size.height - handle.style.bottom : undefined,
            cursor: handle.style.cursor
          }}
          onMouseDown={(e) => handleResizeStart(e, componentId, handle.id)}
        />
      ))}
    </>
  );
};
