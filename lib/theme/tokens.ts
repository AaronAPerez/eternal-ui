import { colors } from "./colors";

export interface ThemeTokens {
  colors: {
    // Background colors
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
    };
    
    // Text colors
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
      link: string;
    };
    
    // Border colors
    border: {
      primary: string;
      secondary: string;
      focus: string;
      error: string;
    };
    
    // Interactive colors
    interactive: {
      primary: string;
      primaryHover: string;
      primaryActive: string;
      secondary: string;
      secondaryHover: string;
      ghost: string;
      ghostHover: string;
    };
    
    // Status colors
    status: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  };
  
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    focus: string;
  };
  
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  
  typography: {
    fontFamily: {
      sans: string;
      mono: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    fontWeight: {
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
  };
}

// Light Theme
export const lightTheme: ThemeTokens = {
  colors: {
    background: {
      primary: colors.gray[50],      // Main background
      secondary: '#FFFFFF',          // Cards, panels
      tertiary: colors.gray[100],    // Subtle backgrounds
      inverse: colors.gray[900],     // Dark elements
    },
    text: {
      primary: colors.gray[900],     // Main text
      secondary: colors.gray[600],   // Secondary text
      tertiary: colors.gray[500],    // Muted text
      inverse: '#FFFFFF',            // Text on dark backgrounds
      link: colors.primary[600],     // Links
    },
    border: {
      primary: colors.gray[200],     // Default borders
      secondary: colors.gray[300],   // Hover borders
      focus: colors.primary[500],    // Focus rings
      error: colors.error[500],      // Error states
    },
    interactive: {
      primary: colors.primary[500],
      primaryHover: colors.primary[600],
      primaryActive: colors.primary[700],
      secondary: colors.gray[100],
      secondaryHover: colors.gray[200],
      ghost: 'transparent',
      ghostHover: colors.gray[100],
    },
    status: {
      success: colors.success[500],
      warning: colors.warning[500],
      error: colors.error[500],
      info: colors.info[500],
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    focus: `0 0 0 3px ${colors.primary[500]}40`,
  },
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '0.75rem',  // 12px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
  },
  borderRadius: {
    sm: '0.375rem', // 6px
    md: '0.5rem',   // 8px
    lg: '0.75rem',  // 12px
    xl: '1rem',     // 16px
    full: '9999px',
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
      mono: 'JetBrains Mono, Menlo, Monaco, monospace',
    },
    fontSize: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      base: '1rem',    // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
};

// Dark Theme
export const darkTheme: ThemeTokens = {
  colors: {
    background: {
      primary: colors.gray[950],     // Main background
      secondary: colors.gray[900],   // Cards, panels
      tertiary: colors.gray[800],    // Subtle backgrounds
      inverse: colors.gray[50],      // Light elements
    },
    text: {
      primary: colors.gray[50],      // Main text
      secondary: colors.gray[300],   // Secondary text
      tertiary: colors.gray[400],    // Muted text
      inverse: colors.gray[900],     // Text on light backgrounds
      link: colors.primary[400],     // Links (lighter in dark mode)
    },
    border: {
      primary: colors.gray[700],     // Default borders
      secondary: colors.gray[600],   // Hover borders
      focus: colors.primary[400],    // Focus rings
      error: colors.error[500],      // Error states
    },
    interactive: {
      primary: colors.primary[500],
      primaryHover: colors.primary[400],
      primaryActive: colors.primary[600],
      secondary: colors.gray[800],
      secondaryHover: colors.gray[700],
      ghost: 'transparent',
      ghostHover: colors.gray[800],
    },
    status: {
      success: colors.success[500],
      warning: colors.warning[500],
      error: colors.error[500],
      info: colors.info[500],
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
    focus: `0 0 0 3px ${colors.primary[400]}40`,
  },
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
  typography: lightTheme.typography,
};
