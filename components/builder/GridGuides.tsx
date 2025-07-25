'use client';

interface GridGuidesProps {
  vertical: number[];
  horizontal: number[];
  width: number;
  height: number;
}

export function GridGuides({ vertical, horizontal, width, height }: GridGuidesProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Vertical lines */}
      {vertical.map((x, index) => (
        <div
          key={`v-${index}`}
          className="absolute top-0 w-px h-full bg-blue-200 dark:bg-blue-800 opacity-30"
          style={{ left: x }}
        />
      ))}
      
      {/* Horizontal lines */}
      {horizontal.map((y, index) => (
        <div
          key={`h-${index}`}
          className="absolute left-0 w-full h-px bg-blue-200 dark:bg-blue-800 opacity-30"
          style={{ top: y }}
        />
      ))}
    </div>
  );
}