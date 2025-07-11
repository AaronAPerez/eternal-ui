export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';
export declare const tokens: {
    readonly colors: {
        readonly primary: {
            readonly 50: "#eff6ff";
            readonly 100: "#dbeafe";
            readonly 200: "#bfdbfe";
            readonly 300: "#93c5fd";
            readonly 400: "#60a5fa";
            readonly 500: "#3b82f6";
            readonly 600: "#2563eb";
            readonly 700: "#1d4ed8";
            readonly 800: "#1e40af";
            readonly 900: "#1e3a8a";
            readonly 950: "#172554";
        };
        readonly success: {
            readonly 50: "#f0fdf4";
            readonly 100: "#dcfce7";
            readonly 200: "#bbf7d0";
            readonly 300: "#86efac";
            readonly 400: "#4ade80";
            readonly 500: "#22c55e";
            readonly 600: "#16a34a";
            readonly 700: "#15803d";
            readonly 800: "#166534";
            readonly 900: "#14532d";
            readonly 950: "#052e16";
        };
        readonly danger: {
            readonly 50: "#fef2f2";
            readonly 100: "#fee2e2";
            readonly 200: "#fecaca";
            readonly 300: "#fca5a5";
            readonly 400: "#f87171";
            readonly 500: "#ef4444";
            readonly 600: "#dc2626";
            readonly 700: "#b91c1c";
            readonly 800: "#991b1b";
            readonly 900: "#7f1d1d";
            readonly 950: "#450a0a";
        };
        readonly warning: {
            readonly 50: "#fffbeb";
            readonly 100: "#fef3c7";
            readonly 200: "#fde68a";
            readonly 300: "#fcd34d";
            readonly 400: "#fbbf24";
            readonly 500: "#f59e0b";
            readonly 600: "#d97706";
            readonly 700: "#b45309";
            readonly 800: "#92400e";
            readonly 900: "#78350f";
            readonly 950: "#451a03";
        };
        readonly neutral: {
            readonly 0: "#ffffff";
            readonly 50: "#fafafa";
            readonly 100: "#f5f5f5";
            readonly 200: "#e5e5e5";
            readonly 300: "#d4d4d4";
            readonly 400: "#a3a3a3";
            readonly 500: "#737373";
            readonly 600: "#525252";
            readonly 700: "#404040";
            readonly 800: "#262626";
            readonly 900: "#171717";
            readonly 950: "#0a0a0a";
        };
    };
    readonly typography: {
        readonly fontFamily: {
            readonly sans: readonly ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"];
            readonly mono: readonly ["JetBrains Mono", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"];
            readonly heading: readonly ["Cal Sans", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"];
        };
        readonly fontSize: {
            readonly xs: readonly ["0.75rem", {
                readonly lineHeight: "1rem";
            }];
            readonly sm: readonly ["0.875rem", {
                readonly lineHeight: "1.25rem";
            }];
            readonly base: readonly ["1rem", {
                readonly lineHeight: "1.5rem";
            }];
            readonly lg: readonly ["1.125rem", {
                readonly lineHeight: "1.75rem";
            }];
            readonly xl: readonly ["1.25rem", {
                readonly lineHeight: "1.75rem";
            }];
            readonly '2xl': readonly ["1.5rem", {
                readonly lineHeight: "2rem";
            }];
            readonly '3xl': readonly ["1.875rem", {
                readonly lineHeight: "2.25rem";
            }];
            readonly '4xl': readonly ["2.25rem", {
                readonly lineHeight: "2.5rem";
            }];
            readonly '5xl': readonly ["3rem", {
                readonly lineHeight: "1";
            }];
            readonly '6xl': readonly ["3.75rem", {
                readonly lineHeight: "1";
            }];
            readonly '7xl': readonly ["4.5rem", {
                readonly lineHeight: "1";
            }];
            readonly '8xl': readonly ["6rem", {
                readonly lineHeight: "1";
            }];
            readonly '9xl': readonly ["8rem", {
                readonly lineHeight: "1";
            }];
        };
        readonly fontWeight: {
            readonly thin: "100";
            readonly extralight: "200";
            readonly light: "300";
            readonly normal: "400";
            readonly medium: "500";
            readonly semibold: "600";
            readonly bold: "700";
            readonly extrabold: "800";
            readonly black: "900";
        };
        readonly letterSpacing: {
            readonly tighter: "-0.05em";
            readonly tight: "-0.025em";
            readonly normal: "0em";
            readonly wide: "0.025em";
            readonly wider: "0.05em";
            readonly widest: "0.1em";
        };
    };
    readonly spacing: {
        readonly px: "1px";
        readonly 0: "0px";
        readonly 0.5: "0.125rem";
        readonly 1: "0.25rem";
        readonly 1.5: "0.375rem";
        readonly 2: "0.5rem";
        readonly 2.5: "0.625rem";
        readonly 3: "0.75rem";
        readonly 3.5: "0.875rem";
        readonly 4: "1rem";
        readonly 5: "1.25rem";
        readonly 6: "1.5rem";
        readonly 7: "1.75rem";
        readonly 8: "2rem";
        readonly 9: "2.25rem";
        readonly 10: "2.5rem";
        readonly 11: "2.75rem";
        readonly 12: "3rem";
        readonly 14: "3.5rem";
        readonly 16: "4rem";
        readonly 20: "5rem";
        readonly 24: "6rem";
        readonly 28: "7rem";
        readonly 32: "8rem";
        readonly 36: "9rem";
        readonly 40: "10rem";
        readonly 44: "11rem";
        readonly 48: "12rem";
        readonly 52: "13rem";
        readonly 56: "14rem";
        readonly 60: "15rem";
        readonly 64: "16rem";
        readonly 72: "18rem";
        readonly 80: "20rem";
        readonly 96: "24rem";
    };
    readonly shadows: {
        readonly none: "none";
        readonly sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)";
        readonly base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)";
        readonly md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
        readonly lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
        readonly xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
        readonly '2xl': "0 25px 50px -12px rgb(0 0 0 / 0.25)";
        readonly inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)";
        readonly outline: "0 0 0 3px rgb(59 130 246 / 0.5)";
        readonly 'outline-danger': "0 0 0 3px rgb(239 68 68 / 0.5)";
        readonly 'outline-success': "0 0 0 3px rgb(34 197 94 / 0.5)";
        readonly elevation: {
            readonly 0: "none";
            readonly 1: "0 1px 3px rgb(0 0 0 / 0.12), 0 1px 2px rgb(0 0 0 / 0.24)";
            readonly 2: "0 3px 6px rgb(0 0 0 / 0.16), 0 3px 6px rgb(0 0 0 / 0.23)";
            readonly 3: "0 10px 20px rgb(0 0 0 / 0.19), 0 6px 6px rgb(0 0 0 / 0.23)";
            readonly 4: "0 14px 28px rgb(0 0 0 / 0.25), 0 10px 10px rgb(0 0 0 / 0.22)";
            readonly 5: "0 19px 38px rgb(0 0 0 / 0.30), 0 15px 12px rgb(0 0 0 / 0.22)";
        };
    };
};
export type DesignTokens = typeof tokens;
//# sourceMappingURL=index.d.ts.map