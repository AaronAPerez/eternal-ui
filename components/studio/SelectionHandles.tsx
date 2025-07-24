import React, { useState } from 'react'


// ====================================
// SELECTION HANDLES COMPONENT
// ====================================

interface SelectionHandlesProps {
  element: any;
  onResize: (newSize: { width: number; height: number }) => void;
}

const SelectionHandles: React.FC<SelectionHandlesProps> = ({ element, onResize }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: element.size?.width || 200,
      height: element.size?.height || 100
    });

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - resizeStart.x;
      const deltaY = moveEvent.clientY - resizeStart.y;

      let newWidth = resizeStart.width;
      let newHeight = resizeStart.height;

      switch (direction) {
        case 'se': // Southeast
          newWidth = Math.max(50, resizeStart.width + deltaX);
          newHeight = Math.max(30, resizeStart.height + deltaY);
          break;
        case 'sw': // Southwest
          newWidth = Math.max(50, resizeStart.width - deltaX);
          newHeight = Math.max(30, resizeStart.height + deltaY);
          break;
        case 'ne': // Northeast
          newWidth = Math.max(50, resizeStart.width + deltaX);
          newHeight = Math.max(30, resizeStart.height - deltaY);
          break;
        case 'nw': // Northwest
          newWidth = Math.max(50, resizeStart.width - deltaX);
          newHeight = Math.max(30, resizeStart.height - deltaY);
          break;
        case 'e': // East
          newWidth = Math.max(50, resizeStart.width + deltaX);
          break;
        case 'w': // West
          newWidth = Math.max(50, resizeStart.width - deltaX);
          break;
        case 'n': // North
          newHeight = Math.max(30, resizeStart.height - deltaY);
          break;
        case 's': // South
          newHeight = Math.max(30, resizeStart.height + deltaY);
          break;
      }

      onResize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handlePositions = [
    { position: 'nw', cursor: 'nw-resize', style: { top: -4, left: -4 } },
    { position: 'n', cursor: 'n-resize', style: { top: -4, left: '50%', transform: 'translateX(-50%)' } },
    { position: 'ne', cursor: 'ne-resize', style: { top: -4, right: -4 } },
    { position: 'e', cursor: 'e-resize', style: { top: '50%', right: -4, transform: 'translateY(-50%)' } },
    { position: 'se', cursor: 'se-resize', style: { bottom: -4, right: -4 } },
    { position: 's', cursor: 's-resize', style: { bottom: -4, left: '50%', transform: 'translateX(-50%)' } },
    { position: 'sw', cursor: 'sw-resize', style: { bottom: -4, left: -4 } },
    { position: 'w', cursor: 'w-resize', style: { top: '50%', left: -4, transform: 'translateY(-50%)' } },
  ];

  return (
    <>
      {handlePositions.map(handle => (
        <div
          key={handle.position}
          className="absolute w-2 h-2 bg-indigo-500 border border-white rounded-sm"
          style={{
            ...handle.style,
            cursor: handle.cursor,
            zIndex: 1000
          }}
          onMouseDown={(e) => handleResizeStart(e, handle.position)}
        />
      ))}
    </>
  );
};

export default SelectionHandles