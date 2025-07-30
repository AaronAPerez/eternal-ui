import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { AIGeneratorPanel } from "./AIGeneratorPanel";
import { Component as BuilderComponent } from "@/types/builder";

interface AIGeneratorButtonProps {
  onGenerate?: (component: BuilderComponent) => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

export const AIGeneratorButton: React.FC<AIGeneratorButtonProps> = ({
  onGenerate,
  className,
  variant = 'primary',
  size = 'md',
}) => {
  const [showPanel, setShowPanel] = useState(false);

  const handleComponentGenerated = (component: BuilderComponent) => {
    onGenerate?.(component);
    setShowPanel(false);
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg',
    secondary: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700',
    icon: 'p-2 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-full',
  };

  if (variant === 'icon') {
    return (
      <>
        <button
          onClick={() => setShowPanel(true)}
          className={cn(
            'transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
            variantClasses[variant],
            className
          )}
          aria-label="Open AI Generator"
        >
          <Sparkles className="w-5 h-5" />
        </button>

        {showPanel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-2xl mx-4">
              <AIGeneratorPanel
                onComponentGenerated={handleComponentGenerated}
                onClose={() => setShowPanel(false)}
              />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowPanel(true)}
        className={cn(
          'flex items-center gap-2 rounded-lg font-medium transition-all duration-200',
          'focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
      >
        <Sparkles className="w-5 h-5" />
        AI Generate
      </button>

      {showPanel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl mx-4">
            <AIGeneratorPanel
              onComponentGenerated={handleComponentGenerated}
              onClose={() => setShowPanel(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AIGeneratorPanel;