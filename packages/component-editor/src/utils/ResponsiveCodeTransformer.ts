export class ResponsiveCodeTransformer {
  static makeResponsive(code: string): string {
    // Basic responsive transformations
    let responsiveCode = code
    
    // Replace common patterns with responsive versions
    const replacements = [
      { from: /text-xl/g, to: 'text-lg md:text-xl lg:text-2xl' },
      { from: /text-2xl/g, to: 'text-xl md:text-2xl lg:text-3xl' },
      { from: /text-3xl/g, to: 'text-2xl md:text-3xl lg:text-4xl' },
      { from: /p-6/g, to: 'p-4 md:p-6' },
      { from: /p-8/g, to: 'p-6 md:p-8' },
      { from: /py-8/g, to: 'py-6 md:py-8' },
      { from: /px-8/g, to: 'px-4 md:px-6 lg:px-8' },
      { from: /grid-cols-3/g, to: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' },
      { from: /grid-cols-4/g, to: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' },
      { from: /flex-row/g, to: 'flex-col md:flex-row' },
    ]

    replacements.forEach(({ from, to }) => {
      responsiveCode = responsiveCode.replace(from, to)
    })

    return responsiveCode
  }

  static addResponsiveUtils(componentCode: string): string {
    const utilsCode = `
// Responsive utility hook
const useResponsive = () => {
  const [breakpoint, setBreakpoint] = React.useState('desktop')
  
  React.useEffect(() => {
    const checkBreakpoint = () => {
      if (window.innerWidth < 640) setBreakpoint('mobile')
      else if (window.innerWidth < 1024) setBreakpoint('tablet')
      else setBreakpoint('desktop')
    }
    
    checkBreakpoint()
    window.addEventListener('resize', checkBreakpoint)
    return () => window.removeEventListener('resize', checkBreakpoint)
  }, [])
  
  return breakpoint
}

${componentCode}
    `
    
    return utilsCode
  }
}