const { colors, typography, spacing } = require('./dist/tokens');

console.log('✅ Design System Test');
console.log('Colors loaded:', Object.keys(colors).length, 'color scales');
console.log('Typography loaded:', Object.keys(typography).length, 'properties');
console.log('Spacing loaded:', Object.keys(spacing).length, 'values');
console.log('Primary brand color:', colors.primary[500]);
console.log('Success! Design system is working 🎨');