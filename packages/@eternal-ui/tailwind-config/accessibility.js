const baseConfig = require('./base.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme.extend,
      // High contrast colors for accessibility
      colors: {
        ...baseConfig.theme.extend.colors,
        'a11y-focus': '#ffbf47',
        'a11y-error': '#d73502',
        'a11y-success': '#00703c',
        'a11y-warning': '#f47738',
        'a11y-info': '#1d70b8',
      },
      // Focus ring utilities
      ringWidth: {
        3: '3px',
        4: '4px',
      },
      // Screen reader only utility
      spacing: {
        'sr': '1px',
      },
    },
  },
  plugins: [
    ...baseConfig.plugins,
    function({ addUtilities }) {
      const newUtilities = {
        '.sr-only': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: '0',
        },
        '.not-sr-only': {
          position: 'static',
          width: 'auto',
          height: 'auto',
          padding: '0',
          margin: '0',
          overflow: 'visible',
          clip: 'auto',
          whiteSpace: 'normal',
        },
        '.focus-visible': {
          '&:focus-visible': {
            outline: '2px solid var(--a11y-focus)',
            outlineOffset: '2px',
          },
        },
        '.skip-link': {
          position: 'absolute',
          left: '-10000px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          '&:focus': {
            position: 'static',
            width: 'auto',
            height: 'auto',
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};