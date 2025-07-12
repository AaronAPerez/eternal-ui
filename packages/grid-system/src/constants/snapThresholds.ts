//  /**
//    * Handle snap threshold adjustment
//    * Validates threshold values for optimal user experience
//    */
//   const handleThresholdChange = useCallback((threshold: number) => {
//     const clampedThreshold = Math.max(1, Math.min(50, threshold))
//     onConfigUpdate({ 
//       snap: { ...config.snap, threshold: clampedThreshold }
//     })
//   }, [config.snap, onConfigUpdate])