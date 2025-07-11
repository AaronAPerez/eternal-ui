import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, type BuilderComponentProps, setDisplayName } from '../../lib/utils'

const gridVariants = cva(
  'grid',
  {
    variants: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        12: 'grid-cols-12'
      },
      gap: {
        0: 'gap-0',
        1: 'gap-1',
        2: 'gap-2',
        3: 'gap-3',
        4: 'gap-4',
        6: 'gap-6',
        8: 'gap-8',
        12: 'gap-12'
      },
      responsive: {
        true: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        false: ''
      }
    },
    defaultVariants: {
      cols: 3,
      gap: 4,
      responsive: false
    }
  }
)

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants>,
    BuilderComponentProps {}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ 
    className, 
    cols, 
    gap, 
    responsive, 
    id,
    children,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        id={id}
        className={cn(gridVariants({ cols, gap, responsive }), className)}
        data-builder-id={id}
        data-builder-type="grid"
        data-builder-editable={true}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export { Grid, gridVariants }
export default setDisplayName(Grid, 'Grid')