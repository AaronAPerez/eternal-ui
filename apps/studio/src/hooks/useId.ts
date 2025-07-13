
/**
 * Generate unique IDs for accessibility attributes
 */
let idCounter = 0;

export const useId = (prefix = 'eternal-ui'): string => {
  const idRef = useRef<string>();
  
  if (!idRef.current) {
    idRef.current = `${prefix}-${++idCounter}`;
  }
  
  return idRef.current;
};
