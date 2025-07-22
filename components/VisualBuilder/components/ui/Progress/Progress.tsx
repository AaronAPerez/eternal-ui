"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number
  max?: number
  showValue?: boolean
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "h-1",
  md: "h-2", 
  lg: "h-3"
}

/**
 * Progress bar component with customizable styling
 * Shows completion percentage with smooth animations
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, max = 100, showValue = false, size = "md", ...props }, ref) => {
  const percentage = Math.round((value / max) * 100)
  
  return (
    <div className="w-full space-y-2">
      {showValue && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{percentage}%</span>
        </div>
      )}
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-full bg-secondary",
          sizeClasses[size],
          className
        )}
        style={{
          transform: 'translateZ(0)',
        }}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1 bg-primary transition-all duration-500 ease-out"
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }