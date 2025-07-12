// /**
//  * GridSystem - Main grid layout component with responsive design and accessibility features
//  * 
//  * This component provides a comprehensive grid system that:
//  * - Follows mobile-first responsive design principles
//  * - Implements WCAG accessibility guidelines
//  * - Supports TypeScript with robust type safety
//  * - Optimized for SEO and Core Web Vitals
//  * 
//  * @example
//  * <GridSystem columns={12} gap="4" className="my-layout">
//  *   <GridItem span={6} md={4} lg={3}>Content 1</GridItem>
//  *   <GridItem span={6} md={8} lg={9}>Content 2</GridItem>
//  * </GridSystem>
//  */

// import { forwardRef, useMemo } from 'react'
// import { cn } from '../../utils'
// import type { GridSystemProps } from '../../types'

// /**
//  * GridSystem component with mobile-first responsive design
//  * Implements CSS Grid with fallback support for older browsers
//  */
// const GridSystem = forwardRef<HTMLDivElement, GridSystemProps>(
//   ({
//     children,
//     columns = 12,
//     gap = '4',
//     rowGap,
//     columnGap,
//     className,
//     as: Component = 'div',
//     breakpoints = {
//       sm: '640px',
//       md: '768px',
//       lg: '1024px',
//       xl: '1280px',
//       '2xl': '1536px'
//     },
//     autoRows = 'auto',
//     autoFlow = 'row',
//     placeItems = 'stretch',
//     role = 'grid',
//     'aria-label': ariaLabel = 'Grid layout',
//     ...props
//   }, ref) => {
    
//     /**
//      * Generate responsive grid CSS classes based on props
//      * Uses Tailwind's responsive prefixes for mobile-first design
//      */
//     const gridClasses = useMemo(() => {
//       const baseClasses = [
//         'grid', // CSS Grid display
//         'w-full', // Full width by default
//       ]

//       // Handle responsive columns
//       if (typeof columns === 'object') {
//         Object.entries(columns).forEach(([breakpoint, cols]) => {
//           if (breakpoint === 'base') {
//             baseClasses.push(`grid-cols-${cols}`)
//           } else {
//             baseClasses.push(`${breakpoint}:grid-cols-${cols}`)
//           }
//         })
//       } else {
//         baseClasses.push(`grid-cols-${columns}`)
//       }

//       // Handle gap spacing with mobile-first approach
//       if (typeof gap === 'object') {
//         Object.entries(gap).forEach(([breakpoint, gapValue]) => {
//           if (breakpoint === 'base') {
//             baseClasses.push(`gap-${gapValue}`)
//           } else {
//             baseClasses.push(`${breakpoint}:gap-${gapValue}`)
//           }
//         })
//       } else if (gap) {
//         baseClasses.push(`gap-${gap}`)
//       }

//       // Handle row gap if different from general gap
//       if (rowGap) {
//         if (typeof rowGap === 'object') {
//           Object.entries(rowGap).forEach(([breakpoint, gapValue]) => {
//             if (breakpoint === 'base') {
//               baseClasses.push(`gap-y-${gapValue}`)
//             } else {
//               baseClasses.push(`${breakpoint}:gap-y-${gapValue}`)
//             }
//           })
//         } else {
//           baseClasses.push(`gap-y-${rowGap}`)
//         }
//       }

//       // Handle column gap if different from general gap
//       if (columnGap) {
//         if (typeof columnGap === 'object') {
//           Object.entries(columnGap).forEach(([breakpoint, gapValue]) => {
//             if (breakpoint === 'base') {
//               baseClasses.push(`gap-x-${gapValue}`)
//             } else {
//               baseClasses.push(`${breakpoint}:gap-x-${gapValue}`)
//             }
//           })
//         } else {
//           baseClasses.push(`gap-x-${columnGap}`)
//         }
//       }

//       // Auto rows sizing
//       if (autoRows !== 'auto') {
//         baseClasses.push(`auto-rows-${autoRows}`)
//       }

//       // Grid auto flow direction
//       if (autoFlow !== 'row') {
//         baseClasses.push(`grid-flow-${autoFlow}`)
//       }

//       // Place items alignment
//       if (placeItems !== 'stretch') {
//         baseClasses.push(`place-items-${placeItems}`)
//       }

//       return baseClasses
//     }, [columns, gap, rowGap, columnGap, autoRows, autoFlow, placeItems])

//     /**
//      * Generate CSS custom properties for advanced grid features
//      * This provides fallback support and additional customization
//      */
//     const gridStyles = useMemo(() => {
//       const styles: React.CSSProperties = {}

//       // Set CSS custom properties for responsive breakpoints
//       Object.entries(breakpoints).forEach(([key, value]) => {
//         styles[`--grid-breakpoint-${key}` as any] = value
//       })

//       return styles
//     }, [breakpoints])

//     return (
//       <Component
//         ref={ref}
//         className={cn(gridClasses, className)}
//         style={gridStyles}
//         role={role}
//         aria-label={ariaLabel}
//         {...props}
//       >
//         {children}
//       </Component>
//     )
//   }
// )

// // Set display name for debugging and React DevTools
// GridSystem.displayName = 'GridSystem'

// export default GridSystem
// export { GridSystem }