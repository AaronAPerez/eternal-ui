import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Info, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  HelpCircle,
  Settings,
  Maximize2,
  Minimize2
} from 'lucide-react';

// Types for CollapsibleSection
interface CollapsibleSectionProps {
  id: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onToggle?: (id: string, expanded: boolean) => void;
  children: React.ReactNode;
  action?: React.ReactNode;
  variant?: 'default' | 'info' | 'warning' | 'success' | 'error';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  collapsible?: boolean;
  className?: string;
  theme?: 'light' | 'dark';
  animationDuration?: number;
  showCount?: boolean;
  count?: number;
  description?: string;
  level?: number;
}

/**
 * Professional Collapsible Section Component
 * 
 * Features:
 * - Smooth expand/collapse animations
 * - Multiple visual variants (info, warning, success, error)
 * - Customizable icons and actions
 * - Accessibility support with ARIA attributes
 * - Keyboard navigation (Enter, Space to toggle)
 * - Nested sections support with proper indentation
 * - Theme-aware styling (light/dark mode)
 * - Size variants (small, medium, large)
 * - Optional descriptions and count badges
 * - Custom animation durations
 * - Disabled state support
 * - Professional styling with hover effects
 * 
 * Usage:
 * ```tsx
 * <CollapsibleSection
 *   id="example"
 *   title="Example Section"
 *   icon={Settings}
 *   expanded={isExpanded}
 *   onToggle={(id, expanded) => setExpanded(expanded)}
 *   variant="info"
 *   description="This is an example section"
 * >
 *   <p>Section content goes here</p>
 * </CollapsibleSection>
 * ```
 */
const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  id,
  title,
  icon: Icon,
  expanded: controlledExpanded,
  defaultExpanded = false,
  onToggle,
  children,
  action,
  variant = 'default',
  size = 'md',
  disabled = false,
  collapsible = true,
  className = '',
  theme = 'light',
  animationDuration = 300,
  showCount = false,
  count,
  description,
  level = 0
}) => {
  // State management - controlled vs uncontrolled
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : internalExpanded;

  // Refs for animation
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  // Handle toggle
  const handleToggle = () => {
    if (disabled || !collapsible) return;

    const newExpanded = !expanded;
    
    if (!isControlled) {
      setInternalExpanded(newExpanded);
    }
    
    onToggle?.(id, newExpanded);
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled || !collapsible) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  // Measure content height for smooth animations
  useEffect(() => {
    if (contentRef.current) {
      if (expanded) {
        setContentHeight(contentRef.current.scrollHeight);
      } else {
        setContentHeight(0);
      }
    }
  }, [expanded, children]);

  // Get variant-specific styling
  const getVariantStyles = () => {
    const baseStyles = "border rounded-lg overflow-hidden transition-all duration-200";
    
    switch (variant) {
      case 'info':
        return `${baseStyles} border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10`;
      case 'warning':
        return `${baseStyles} border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10`;
      case 'success':
        return `${baseStyles} border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10`;
      case 'error':
        return `${baseStyles} border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10`;
      default:
        return `${baseStyles} border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900`;
    }
  };

  // Get header styling based on variant
  const getHeaderStyles = () => {
    const baseHover = !disabled && collapsible ? "hover:bg-opacity-80 dark:hover:bg-opacity-80" : "";
    const cursor = !disabled && collapsible ? "cursor-pointer" : "cursor-default";
    
    switch (variant) {
      case 'info':
        return `bg-blue-100 dark:bg-blue-900/20 ${baseHover} ${cursor}`;
      case 'warning':
        return `bg-yellow-100 dark:bg-yellow-900/20 ${baseHover} ${cursor}`;
      case 'success':
        return `bg-green-100 dark:bg-green-900/20 ${baseHover} ${cursor}`;
      case 'error':
        return `bg-red-100 dark:bg-red-900/20 ${baseHover} ${cursor}`;
      default:
        return `bg-gray-50 dark:bg-gray-800 ${baseHover} ${cursor}`;
    }
  };

  // Get icon color based on variant
  const getIconColor = () => {
    switch (variant) {
      case 'info':
        return "text-blue-600 dark:text-blue-400";
      case 'warning':
        return "text-yellow-600 dark:text-yellow-400";
      case 'success':
        return "text-green-600 dark:text-green-400";
      case 'error':
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  // Get size-specific styling
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: 'px-3 py-2',
          titleSize: 'text-sm',
          iconSize: 'w-4 h-4',
          chevronSize: 'w-3 h-3'
        };
      case 'lg':
        return {
          padding: 'px-5 py-4',
          titleSize: 'text-lg',
          iconSize: 'w-5 h-5',
          chevronSize: 'w-5 h-5'
        };
      default: // md
        return {
          padding: 'px-4 py-3',
          titleSize: 'text-base',
          iconSize: 'w-4 h-4',
          chevronSize: 'w-4 h-4'
        };
    }
  };

  // Get variant icon if no custom icon provided
  const getVariantIcon = () => {
    if (Icon) return Icon;
    
    switch (variant) {
      case 'info':
        return Info;
      case 'warning':
        return AlertCircle;
      case 'success':
        return CheckCircle;
      case 'error':
        return XCircle;
      default:
        return null;
    }
  };

  const sizeStyles = getSizeStyles();
  const VariantIcon = getVariantIcon();
  const indentationStyle = level > 0 ? { marginLeft: `${level * 16}px` } : {};

  return (
    <div 
      className={`${getVariantStyles()} ${className} ${disabled ? 'opacity-50' : ''}`}
      style={indentationStyle}
      role="region"
      aria-labelledby={`section-header-${id}`}
    >
      {/* Header */}
      <div
        id={`section-header-${id}`}
        className={`${getHeaderStyles()} ${sizeStyles.padding} transition-all duration-200 ${
          !disabled && collapsible ? 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500' : ''
        }`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={!disabled && collapsible ? 0 : -1}
        role={collapsible ? "button" : "heading"}
        aria-expanded={collapsible ? expanded : undefined}
        aria-controls={collapsible ? `section-content-${id}` : undefined}
        aria-disabled={disabled}
        aria-level={level + 1}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            {/* Chevron Icon (only show if collapsible) */}
            {collapsible && (
              <div className={`transform transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}>
                <ChevronRight className={`${sizeStyles.chevronSize} ${getIconColor()}`} />
              </div>
            )}
            
            {/* Section Icon */}
            {VariantIcon && (
              <VariantIcon className={`${sizeStyles.iconSize} ${getIconColor()} flex-shrink-0`} />
            )}
            
            {/* Title and Description */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <h3 className={`${sizeStyles.titleSize} font-medium text-gray-900 dark:text-gray-100 truncate`}>
                  {title}
                </h3>
                
                {/* Count Badge */}
                {showCount && count !== undefined && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    {count}
                  </span>
                )}
                
                {/* Disabled Indicator */}
                {disabled && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    (Disabled)
                  </span>
                )}
              </div>
              
              {/* Description */}
              {description && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2 ml-2">
            {action && (
              <div 
                className="flex items-center space-x-1"
                onClick={(e) => e.stopPropagation()}
              >
                {action}
              </div>
            )}
            
            {/* Expand/Collapse All Button (for nested sections) */}
            {level === 0 && collapsible && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // This would be handled by parent component
                  console.log('Toggle all nested sections');
                }}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded"
                title={expanded ? "Collapse all" : "Expand all"}
                aria-label={expanded ? "Collapse all nested sections" : "Expand all nested sections"}
              >
                {expanded ? (
                  <Minimize2 className="w-3 h-3" />
                ) : (
                  <Maximize2 className="w-3 h-3" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div
        id={`section-content-${id}`}
        ref={contentRef}
        className="overflow-hidden transition-all ease-in-out"
        style={{
          height: contentHeight,
          transitionDuration: `${animationDuration}ms`
        }}
        aria-hidden={!expanded}
      >
        <div className={`${variant !== 'default' ? 'bg-white dark:bg-gray-900' : ''} border-t border-gray-200 dark:border-gray-700`}>
          {children}
        </div>
      </div>
      
      {/* Loading State */}
      {expanded && contentHeight === undefined && (
        <div className="flex items-center justify-center p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Loading...</span>
        </div>
      )}
    </div>
  );
};

// Helper Components for Enhanced Functionality

// Nested CollapsibleSection Group
interface CollapsibleGroupProps {
  children: React.ReactNode;
  expandAll?: boolean;
  onExpandAllChange?: (expandAll: boolean) => void;
  className?: string;
  spacing?: 'tight' | 'normal' | 'loose';
}

export const CollapsibleGroup: React.FC<CollapsibleGroupProps> = ({
  children,
  expandAll,
  onExpandAllChange,
  className = '',
  spacing = 'normal'
}) => {
  const spacingStyles = {
    tight: 'space-y-1',
    normal: 'space-y-2',
    loose: 'space-y-4'
  };

  return (
    <div className={`${spacingStyles[spacing]} ${className}`}>
      {expandAll !== undefined && (
        <div className="flex justify-end mb-2">
          <button
            onClick={() => onExpandAllChange?.(!expandAll)}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors"
          >
            {expandAll ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      )}
      {children}
    </div>
  );
};

// Section with Help Tooltip
interface HelpCollapsibleSectionProps extends CollapsibleSectionProps {
  helpText?: string;
  helpLink?: string;
}

export const HelpCollapsibleSection: React.FC<HelpCollapsibleSectionProps> = ({
  helpText,
  helpLink,
  action,
  ...props
}) => {
  const [showHelp, setShowHelp] = useState(false);

  const helpAction = (
    <div className="flex items-center space-x-1">
      {action}
      {helpText && (
        <div className="relative">
          <button
            onMouseEnter={() => setShowHelp(true)}
            onMouseLeave={() => setShowHelp(false)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded"
            aria-label="Show help"
          >
            <HelpCircle className="w-3 h-3" />
          </button>
          
          {showHelp && (
            <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-50">
              {helpText}
              {helpLink && (
                <a
                  href={helpLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-100 underline ml-1"
                >
                  Learn more
                </a>
              )}
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return <CollapsibleSection {...props} action={helpAction} />;
};

// Animated Section Counter
interface CounterSectionProps extends CollapsibleSectionProps {
  currentCount: number;
  maxCount?: number;
  countLabel?: string;
}

export const CounterSection: React.FC<CounterSectionProps> = ({
  currentCount,
  maxCount,
  countLabel = 'items',
  title,
  ...props
}) => {
  const percentage = maxCount ? (currentCount / maxCount) * 100 : 0;
  const countDisplay = maxCount ? `${currentCount}/${maxCount}` : currentCount;

  const enhancedTitle = (
    <div className="flex items-center space-x-2">
      <span>{title}</span>
      <div className="flex items-center space-x-1">
        <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
          {countDisplay} {countLabel}
        </span>
        {maxCount && (
          <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <CollapsibleSection 
      {...props} 
      title={enhancedTitle as any}
      showCount={false}
    />
  );
};

export default CollapsibleSection;