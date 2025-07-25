import { colors } from "./colors";

export interface ThemeTokens {
  colors: {
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
    };
    
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
      link: string;
    };
    
    interactive: {
      primary: string;
      primaryHover: string;
      primaryActive: string;
      secondary: string;
      secondaryHover: string;
    };
  };
  
  shadows: {
    sm: string;
    md: string;
    lg: string;
    glow: string;
  };
  
  animation: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
  };
}

// Light Theme
export const lightTheme: ThemeTokens = {
  colors: {
    background: {
      primary: colors.gray[50],
      secondary: '#FFFFFF',
      tertiary: colors.gray[100],
      inverse: colors.gray[900],
    },
    text: {
      primary: colors.gray[900],
      secondary: colors.gray[600],
      tertiary: colors.gray[500],
      inverse: '#FFFFFF',
      link: colors.primary[600],
    },
    interactive: {
      primary: colors.primary[500],
      primaryHover: colors.primary[600],
      primaryActive: colors.primary[700],
      secondary: colors.gray[100],
      secondaryHover: colors.gray[200],
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    glow: `0 0 20px ${colors.primary[500]}40`,
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
  },
};