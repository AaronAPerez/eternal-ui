"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTheme = void 0;
const tokens_1 = require("../tokens");
exports.defaultTheme = {
    name: 'default',
    colors: {
        ...tokens_1.tokens.colors,
        // Theme-specific semantic mappings
        background: tokens_1.tokens.colors.neutral[0],
        foreground: tokens_1.tokens.colors.neutral[950],
        muted: tokens_1.tokens.colors.neutral[100],
        'muted-foreground': tokens_1.tokens.colors.neutral[500],
        border: tokens_1.tokens.colors.neutral[200],
        input: tokens_1.tokens.colors.neutral[200],
        ring: tokens_1.tokens.colors.primary[500],
        accent: tokens_1.tokens.colors.neutral[100],
        'accent-foreground': tokens_1.tokens.colors.neutral[900]
    },
    typography: tokens_1.tokens.typography,
    spacing: tokens_1.tokens.spacing,
    shadows: tokens_1.tokens.shadows
};
