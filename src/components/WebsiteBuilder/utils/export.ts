// import { Component } from '../types';

// export const exportToReact = (components: Component[], projectName: string) => {
//   const componentCode = generateReactComponents(components);
//   const indexFile = generateIndexFile(projectName, components);
  
//   return {
//     'components/': componentCode,
//     'pages/index.tsx': indexFile,
//     'package.json': generatePackageJson(projectName),
//     'README.md': generateReadme(projectName)
//   };
// };

// const generateReactComponents = (components: Component[]) => {
//   return components.map(component => {
//     return `
// // ${component.type}Component.tsx
// import React from 'react';

// interface ${component.type}Props {
//   ${Object.keys(component.props).map(key => `${key}?: any;`).join('\n  ')}
// }

// export const ${component.type}Component: React.FC<${component.type}Props> = (props) => {
//   return (
//     <div 
//       style={{
//         ${Object.entries(component.styles).map(([key, value]) => 
//           `${key}: '${value}'`
//         ).join(',\n        ')}
//       }}
//     >
//       {/* Component content */}
//     </div>
//   );
// };
// `;
//   }).join('\n\n');
// };

// // Add more export functions...