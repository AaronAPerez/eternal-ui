import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { BaseComponentProps } from '@/types/component'

const gridVariants = cva(
  ['grid'],
  {
    variants: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        6: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6',
        12: 'grid-cols-12'
      },
      gap: {
        none: 'gap-0',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8'
      }
    },
    defaultVariants: {
      cols: 3,
      gap: 'md'
    }
  }
)

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants>,
    BaseComponentProps {}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(gridVariants({ cols, gap }), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Grid.displayName = 'Grid'

/**
 * 🏗️ RESPONSIVE GRID SYSTEM
 * 
 * Flexible grid component for responsive layouts
 */
// import React from 'react'
// import { cn } from '@/lib/utils'

// interface GridProps {
//   children: React.ReactNode
//   className?: string
//   cols?: {
//     base?: number
//     sm?: number
//     md?: number
//     lg?: number
//     xl?: number
//     '2xl'?: number
//   }
//   gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
//   align?: 'start' | 'center' | 'end' | 'stretch'
//   justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
// }

// const gapClasses = {
//   none: 'gap-0',
//   xs: 'gap-2',
//   sm: 'gap-4',
//   md: 'gap-6',
//   lg: 'gap-8',
//   xl: 'gap-12'
// }

// const alignClasses = {
//   start: 'items-start',
//   center: 'items-center',
//   end: 'items-end',
//   stretch: 'items-stretch'
// }

// const justifyClasses = {
//   start: 'justify-start',
//   center: 'justify-center',
//   end: 'justify-end',
//   between: 'justify-between',
//   around: 'justify-around',
//   evenly: 'justify-evenly'
// }

// export function Grid({
//   children,
//   className,
//   cols = { base: 1, md: 2, lg: 3 },
//   gap = 'md',
//   align = 'stretch',
//   justify = 'start'
// }: GridProps) {
//   const gridCols = {
//     'grid-cols-1': cols.base === 1,
//     'grid-cols-2': cols.base === 2,
//     'grid-cols-3': cols.base === 3,
//     'grid-cols-4': cols.base === 4,
//     'sm:grid-cols-1': cols.sm === 1,
//     'sm:grid-cols-2': cols.sm === 2,
//     'sm:grid-cols-3': cols.sm === 3,
//     'sm:grid-cols-4': cols.sm === 4,
//     'md:grid-cols-1': cols.md === 1,
//     'md:grid-cols-2': cols.md === 2,
//     'md:grid-cols-3': cols.md === 3,
//     'md:grid-cols-4': cols.md === 4,
//     'lg:grid-cols-1': cols.lg === 1,
//     'lg:grid-cols-2': cols.lg === 2,
//     'lg:grid-cols-3': cols.lg === 3,
//     'lg:grid-cols-4': cols.lg === 4,
//     'xl:grid-cols-1': cols.xl === 1,
//     'xl:grid-cols-2': cols.xl === 2,
//     'xl:grid-cols-3': cols.xl === 3,
//     'xl:grid-cols-4': cols.xl === 4,
//     '2xl:grid-cols-1': cols['2xl'] === 1,
//     '2xl:grid-cols-2': cols['2xl'] === 2,
//     '2xl:grid-cols-3': cols['2xl'] === 3,
//     '2xl:grid-cols-4': cols['2xl'] === 4,
//   }

//   return (
//     <div
//       className={cn(
//         'grid',
//         gridCols,
//         gapClasses[gap],
//         alignClasses[align],
//         justifyClasses[justify],
//         className
//       )}
//     >
//       {children}
//     </div>
//   )
// }