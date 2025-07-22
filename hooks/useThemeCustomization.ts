import { useTheme } from '@/lib/theme/context';

export function useThemeCustomization() {
  const { tokens, actualTheme } = useTheme();
  
  const getCustomProperty = (property: string) => {
    return tokens.colors[property] || property;
  };
  
  const isDark = actualTheme === 'dark';
  
  return {
    tokens,
    isDark,
    getCustomProperty,
    // Helper functions for component styling
    cardStyles: `bg-background-secondary border border-border-primary ${isDark ? 'shadow-lg' : 'shadow-sm'}`,
    buttonStyles: 'bg-primary-500 hover:bg-primary-600 text-white',
    inputStyles: 'bg-background-secondary border border-border-primary focus:border-primary-500',
  };
}