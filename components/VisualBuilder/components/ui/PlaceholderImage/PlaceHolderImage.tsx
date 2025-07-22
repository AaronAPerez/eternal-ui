import { useCallback, useState } from "react";
import { cn } from "../../../utils/cn";
import { Edit3, ImageIcon } from "lucide-react";

// components/ui/PlaceholderImage/PlaceholderImage.tsx
interface PlaceholderImageProps {
  width: number | string;
  height: number | string;
  aspectRatio?: string;
  showDimensions?: boolean;
  responsive?: boolean;
  breakpointSizes?: {
    mobile: { width: number; height: number };
    tablet: { width: number; height: number };
    desktop: { width: number; height: number };
  };
  alt?: string;
  className?: string;
  onClick?: () => void;
  editable?: boolean;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  width,
  height,
  aspectRatio,
  showDimensions = true,
  responsive = false,
  breakpointSizes,
  alt = "Placeholder image",
  className,
  onClick,
  editable = false
}) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  // Calculate responsive dimensions
  const getDimensions = useCallback(() => {
    if (responsive && breakpointSizes) {
      return breakpointSizes[currentBreakpoint];
    }
    return { width: Number(width), height: Number(height) };
  }, [responsive, breakpointSizes, currentBreakpoint, width, height]);

  const dimensions = getDimensions();
  
  return (
    <div 
      className={cn(
        "relative bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden transition-colors",
        editable && "hover:border-blue-400 hover:bg-gray-100 cursor-pointer",
        className
      )}
      style={{
        width: responsive ? '100%' : dimensions.width,
        height: dimensions.height,
        aspectRatio: aspectRatio || `${dimensions.width}/${dimensions.height}`
      }}
      onClick={onClick}
      role={editable ? "button" : undefined}
      tabIndex={editable ? 0 : undefined}
      aria-label={editable ? "Click to edit image" : alt}
    >
      {/* Placeholder Content */}
      <div className="text-center p-4">
        <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        {showDimensions && (
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600">
              {dimensions.width} × {dimensions.height}
            </p>
            {responsive && (
              <p className="text-xs text-gray-500 capitalize">
                {currentBreakpoint} View
              </p>
            )}
            {aspectRatio && (
              <p className="text-xs text-gray-500">
                Ratio: {aspectRatio}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Edit Overlay */}
      {editable && (
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity flex items-center justify-center">
          <div className="bg-white rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity">
            <Edit3 className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      )}

      {/* Responsive Indicators */}
      {responsive && (
        <div className="absolute top-2 right-2">
          <div className="flex gap-1">
            {Object.keys(breakpointSizes || {}).map((bp) => (
              <div
                key={bp}
                className={cn(
                  "w-2 h-2 rounded-full",
                  currentBreakpoint === bp ? "bg-blue-500" : "bg-gray-300"
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};