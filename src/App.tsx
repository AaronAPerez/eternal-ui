// Generate App.tsx/jsx
    files[`src/App.${config.typescript ? 'tsx' : 'jsx'}`] = this.generateReactApp(components, template, config);
    
    // Generate components
    components.forEach(component => {
      const componentCode = this.generateComponent(component, config);
      files[`src/components/${component.type}.${config.typescript ? 'tsx' : 'jsx'}`] = componentCode;
    });
    
    // Generate pages
    template.pages.forEach(page => {
      const pageComponents = components.filter(c => page.components.includes(c.id));
      const pageCode = this.generatePage(pageComponents, config);
      files[`src/pages/${page.name}.${config.typescript ? 'tsx' : 'jsx'}`] = pageCode;
    });
    
    // Generate routing
    if (config.features.routing) {
      files[`src/router.${config.typescript ? 'tsx' : 'jsx'}`] = this.generateRouting(template.pages, config);
    }
    
    // Generate state management
    if (config.features.stateManagement) {
      files[`src/store/index.${config.typescript ? 'ts' : 'js'}`] = this.generateStateManagement(config);
    }
    
    // Generate styles
    files['src/index.css'] = this.generateGlobalStyles(template, config);
    
    // Generate main entry point
    files[`src/main.${config.typescript ? 'tsx' : 'jsx'}`] = this.generateReactMain(config);

    const packageJson = this.generateReactPackageJson(config, template);
    
    return {
      files,
      packageJson,
      configFiles: {},
      assets: [],
      instructions: this.generateReactInstructions(config),
      deploymentCommands: this.generateReactDeploymentCommands(config),
      estimatedBuildTime: 0,
      estimatedBundleSize: 0,
    };
  }

  generateComponent(component: Component, config: ExportConfig): string {
    const isTS = config.typescript;
    const componentName = this.pascalCase(component.type);
    
    const propsInterface = isTS ? `
interface ${componentName}Props {
  ${Object.keys(component.props).map(key => `${key}?: any;`).join('\n  ')}
  className?: string;
  children?: React.ReactNode;
}
` : '';

    const propsType = isTS ? `: React.FC<${componentName}Props>` : '';
    const propsParam = isTS ? `props: ${componentName}Props` : 'props';

    const componentCode = `import React from 'react';
${config.cssFramework === 'tailwind' ? "import { cn } from '../utils/cn';" : ''}

${propsInterface}

export const ${componentName}${propsType} = (${propsParam}) => {
  return (
    <div
      className={${config.cssFramework === 'tailwind' ? 
        `cn('${component.styles.className}', props.className)` : 
        `'${component.styles.className} ' + (props.className || '')`
      }}
      ${Object.entries(component.props).map(([key, value]) => 
        `${key}={props.${key} || '${value}'}`
      ).join('\n      ')}
    >
      ${this.generateComponentContent(component, config)}
      {props.children}
    </div>
  );
};

export default ${componentName};
`;

    return this.formatCode(componentCode, 'typescript');
  }

  generatePage(components: Component[], config: ExportConfig): string {
    const imports = components.map(c => 
      `import ${this.pascalCase(c.type)} from '../components/${c.type}';`
    ).join('\n');

    const pageCode = `import React from 'react';
${imports}

const Page${config.typescript ? ': React.FC' : ''} = () => {
  return (
    <div className="min-h-screen">
      ${components.map(c => `<${this.pascalCase(c.type)} />`).join('\n      ')}
    </div>
  );
};

export default Page;
`;

    return this.formatCode(pageCode, 'typescript');
  }

  generateRouting(pages: any[], config: ExportConfig): string {
    const routingCode = `import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
${pages.map(page => 
  `import ${this.pascalCase(page.name)} from './pages/${page.name}';`
).join('\n')}

const AppRouter${config.typescript ? ': React.FC' : ''} = () => {
  return (
    <Router>
      <Routes>
        ${pages.map(page => 
          `<Route path="${page.path}" element={<${this.pascalCase(page.name)} />} />`
        ).join('\n        ')}
      </Routes>
    </Router>
  );
};

export default AppRouter;
`;

    return this.formatCode(routingCode, 'typescript');
  }

  generateStateManagement(config: ExportConfig): string {
    return `import { create } from 'zustand';

interface AppState {
  theme: 'light' | 'dark';
  user: any;
  setTheme: (theme: 'light' | 'dark') => void;
  setUser: (user: any) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  user: null,
  setTheme: (theme) => set({ theme }),
  setUser: (user) => set({ user }),
}));
`;
  }

  private generateReactApp(components: Component[], template: Template, config: ExportConfig): string {
    const hasRouting = config.features.routing;
    
    const appCode = `import React from 'react';
${hasRouting ? "import AppRouter from './router';" : ''}
${config.features.stateManagement ? "import { useAppStore } from './store';" : ''}
${config.cssFramework === 'tailwind' ? "import './index.css';" : ''}
${!hasRouting ? components.map(c => `import ${this.pascalCase(c.type)} from './components/${c.type}';`).join('\n') : ''}

function App() {
  ${config.features.stateManagement ? 'const { theme } = useAppStore();' : ''}
  
  return (
    <div className="App${config.features.darkMode ? ' ' + '${theme === "dark" ? "dark" : ""}' : ''}">
      ${hasRouting ? 
        '<AppRouter />' : 
        components.map(c => `<${this.pascalCase(c.type)} />`).join('\n        ')
      }
    </div>
  );
}

export default App;
`;

    return this.formatCode(appCode, 'typescript');
  }

  private generateReactMain(config: ExportConfig): string {
    return `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
${config.cssFramework === 'tailwind' ? "import './index.css';" : ''}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;
  }

  private generateGlobalStyles(template: Template, config: ExportConfig): string {
    if (config.cssFramework === 'tailwind') {
      return `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: ${template.styles.colors.primary};
  --color-secondary: ${template.styles.colors.secondary};
  --color-accent: ${template.styles.colors.accent};
}

${config.features.darkMode ? `
.dark {
  --color-primary: ${this.darkenColor(template.styles.colors.primary)};
  --color-secondary: ${this.darkenColor(template.styles.colors.secondary)};
}
` : ''}
`;
    }

    return `/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: ${template.styles.typography.body}, sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
`;
  }

  private generateReactPackageJson(config: ExportConfig, template: Template): any {
    const dependencies: Record<string, string> = {
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
    };

    if (config.features.routing) {
      dependencies["react-router-dom"] = "^6.8.0";
    }

    if (config.features.stateManagement) {
      dependencies["zustand"] = "^4.3.0";
    }

    if (config.cssFramework === 'tailwind') {
      dependencies["tailwindcss"] = "^3.3.0";
      dependencies["autoprefixer"] = "^10.4.0";
      dependencies["postcss"] = "^8.4.0";
    }

    const devDependencies: Record<string, string> = {
      "@vitejs/plugin-react": "^4.0.0",
      "vite": "^4.4.0",
      "eslint": "^8.45.0",
      "eslint-plugin-react": "^7.32.0",
      "eslint-plugin-react-hooks": "^4.6.0",
    };

    if (config.typescript) {
      devDependencies["typescript"] = "^5.0.0";
      devDependencies["@types/react"] = "^18.2.0";
      devDependencies["@types/react-dom"] = "^18.2.0";
    }

    return {
      name: template.config.name,
      version: "1.0.0",
      type: "module",
      scripts: {
        dev: "vite",
        build: "vite build",
        preview: "vite preview",
        lint: "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
      },
      dependencies,
      devDependencies
    };
  }

  private generateReactInstructions(config: ExportConfig): string {
    return `# React Project Setup

This project was generated by Eternal UI and uses ${config.bundler} as the build tool.

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Build for production:
   \`\`\`bash
   npm run build
   \`\`\`

## Project Structure

- \`src/components/\` - Reusable React components
- \`src/pages/\` - Page components
${config.features.routing ? '- `src/router.tsx` - React Router configuration' : ''}
${config.features.stateManagement ? '- `src/store/` - Zustand state management' : ''}

## Features Included

${config.features.routing ? '✅ React Router for navigation' : ''}
${config.features.stateManagement ? '✅ Zustand for state management' : ''}
${config.features.darkMode ? '✅ Dark mode support' : ''}
${config.cssFramework === 'tailwind' ? '✅ Tailwind CSS for styling' : ''}
${config.typescript ? '✅ TypeScript support' : ''}

## Deployment

This project is configured for deployment to ${config.deployment}.

Run the deployment command:
\`\`\`bash
${config.deployment === 'vercel' ? 'vercel --prod' : 
  config.deployment === 'netlify' ? 'netlify deploy --prod' : 'npm run build'}
\`\`\`
`;
  }

  private generateReactDeploymentCommands(config: ExportConfig): string[] {
    const commands = ['npm run build'];
    
    switch (config.deployment) {
      case 'vercel':
        commands.push('vercel --prod');
        break;
      case 'netlify':
        commands.push('netlify deploy --prod');
        break;
      case 'github-pages':
        commands.push('gh-pages -d build');
        break;
    }
    
    return commands;
  }

  // Helper methods
  private pascalCase(str: string): string {
    return str.replace(/(^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1);
    }).replace(/\s+/g, '');
  }

  private generateComponentContent(component: Component, config: ExportConfig): string {
    // Generate component-specific content based on type
    switch (component.type) {
      case 'hero':
        return `
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{props.title || '${component.props.title || 'Welcome'}'}</h1>
        <p className="text-xl mb-8">{props.subtitle || '${component.props.subtitle || 'Subtitle'}'}</p>
        <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
          {props.ctaText || '${component.props.ctaText || 'Get Started'}'}
        </button>
      </div>`;
      
      case 'button':
        return `{props.children || '${component.props.text || 'Button'}'}`;
      
      case 'text':
        return `<p>{props.content || '${component.props.content || 'Text content'}'}</p>`;
      
      default:
        return `{/* ${component.type} component content */}`;
    }
  }

  private formatCode(code: string, parser: string): string {
    try {
      return prettier.format(code, {
        parser,
        semi: true,
        singleQuote: true,
        trailingComma: 'es5',
        printWidth: 80,
        tabWidth: 2,
      });
    } catch (error) {
      console.warn('Code formatting failed:', error);
      return code;
    }
  }

  private darkenColor(color: string): string {
    // Simple color darkening for dark mode
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    return `#${Math.floor(r * 0.7).toString(16).padStart(2, '0')}${Math.floor(g * 0.7).toString(16).padStart(2, '0')}${Math.floor(b * 0.7).toString(16).padStart(2, '0')}`;
  }
}

/**
 * 🟢 VUE GENERATOR
 */
class VueGenerator implements FrameworkGenerator {
  async generateProject(components: Component[], template: Template, config: ExportConfig): Promise<ExportResult> {
    const files: Record<string, string> = {};
    
    // Generate App.vue
    files['src/App.vue'] = this.generateVueApp(components, template, config);
    
    // Generate components
    components.forEach(component => {
      files[`src/components/${this.pascalCase(component.type)}.vue`] = this.generateComponent(component, config);
    });
    
    // Generate pages
    template.pages.forEach(page => {
      const pageComponents = components.filter(c => page.components.includes(c.id));
      files[`src/views/${this.pascalCase(page.name)}.vue`] = this.generatePage(pageComponents, config);
    });
    
    // Generate router
    if (config.features.routing) {
      files[`src/router/index.${config.typescript ? 'ts' : 'js'}`] = this.generateRouting(template.pages, config);
    }
    
    // Generate store
    if (config.features.stateManagement) {
      files[`src/store/index.${config.typescript ? 'ts' : 'js'}`] = this.generateStateManagement(config);
    }
    
    // Generate main entry
    files[`src/main.${config.typescript ? 'ts' : 'js'}`] = this.generateVueMain(config);
    
    const packageJson = this.generateVuePackageJson(config, template);
    
    return {
      files,
      packageJson,
      configFiles: {},
      assets: [],
      instructions: this.generateVueInstructions(config),
      deploymentCommands: ['npm run build'],
      estimatedBuildTime: 0,
      estimatedBundleSize: 0,
    };
  }

  generateComponent(component: Component, config: ExportConfig): string {
    const componentName = this.pascalCase(component.type);
    
    return `<template>
  <div :class="computedClasses">
    ${this.generateVueComponentContent(component)}
    <slot />
  </div>
</template>

<script${config.typescript ? ' lang="ts"' : ''}>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: '${componentName}',
  props: {
    ${Object.keys(component.props).map(key => 
      `${key}: { type: String, default: '${component.props[key]}' }`
    ).join(',\n    ')},
    className: { type: String, default: '' }
  },
  setup(props) {
    const computedClasses = computed(() => 
      '${component.styles.className} ' + props.className
    );
    
    return {
      computedClasses
    };
  }
});
</script>

<style scoped>
/* Component-specific styles */
</style>
`;
  }

  generatePage(components: Component[], config: ExportConfig): string {
    const imports = components.map(c => 
      `import ${this.pascalCase(c.type)} from '@/components/${this.pascalCase(c.type)}.vue';`
    ).join('\n');

    return `<template>
  <div class="page">
    ${components.map(c => `<${this.pascalCase(c.type)} />`).join('\n    ')}
  </div>
</template>

<script${config.typescript ? ' lang="ts"' : ''}>
import { defineComponent } from 'vue';
${imports}

export default defineComponent({
  name: 'Page',
  components: {
    ${components.map(c => this.pascalCase(c.type)).join(',\n    ')}
  }
});
</script>
`;
  }

  generateRouting(pages: any[], config: ExportConfig): string {
    return `import { createRouter, createWebHistory } from 'vue-router';
${pages.map(page => 
  `import ${this.pascalCase(page.name)} from '@/views/${this.pascalCase(page.name)}.vue';`
).join('\n')}

const routes = [
  ${pages.map(page => `{
    path: '${page.path}',
    name: '${page.name}',
    component: ${this.pascalCase(page.name)}
  }`).join(',\n  ')}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
`;
  }

  generateStateManagement(config: ExportConfig): string {
    return `import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'light' as 'light' | 'dark',
    user: null as any
  }),
  
  actions: {
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme;
    },
    
    setUser(user: any) {
      this.user = user;
    }
  }
});
`;
  }

  private generateVueApp(components: Component[], template: Template, config: ExportConfig): string {
    return `<template>
  <div id="app" :class="{ 'dark': isDark }">
    <router-view v-if="hasRouting" />
    <div v-else>
      ${components.map(c => `<${this.pascalCase(c.type)} />`).join('\n      ')}
    </div>
  </div>
</template>

<script${config.typescript ? ' lang="ts"' : ''}>
import { defineComponent } from 'vue';
${config.features.stateManagement ? "import { useAppStore } from './store';" : ''}
${!config.features.routing ? components.map(c => `import ${this.pascalCase(c.type)} from './components/${this.pascalCase(c.type)}.vue';`).join('\n') : ''}

export default defineComponent({
  name: 'App',
  ${!config.features.routing ? `components: {
    ${components.map(c => this.pascalCase(c.type)).join(',\n    ')}
  },` : ''}
  setup() {
    ${config.features.stateManagement ? `
    const store = useAppStore();
    const isDark = computed(() => store.theme === 'dark');
    
    return { isDark };` : `
    return {};`}
  }
});
</script>

<style>
${config.cssFramework === 'tailwind' ? '@import "tailwindcss/base";' : ''}
</style>
`;
  }

  private generateVueMain(config: ExportConfig): string {
    return `import { createApp } from 'vue';
import App from './App.vue';
${config.features.routing ? "import router from './router';" : ''}
${config.features.stateManagement ? "import { createPinia } from 'pinia';" : ''}

const app = createApp(App);

${config.features.routing ? 'app.use(router);' : ''}
${config.features.stateManagement ? 'app.use(createPinia());' : ''}

app.mount('#app');
`;
  }

  private generateVuePackageJson(config: ExportConfig, template: Template): any {
    const dependencies: Record<string, string> = {
      "vue": "^3.3.0",
    };

    if (config.features.routing) {
      dependencies["vue-router"] = "^4.2.0";
    }

    if (config.features.stateManagement) {
      dependencies["pinia"] = "^2.1.0";
    }

    return {
      name: template.config.name,
      version: "1.0.0",
      scripts: {
        dev: "vite",
        build: "vite build",
        preview: "vite preview"
      },
      dependencies,
      devDependencies: {
        "@vitejs/plugin-vue": "^4.2.0",
        "vite": "^4.4.0",
        ...(config.typescript && {
          "typescript": "^5.0.0",
          "vue-tsc": "^1.8.0"
        })
      }
    };
  }

  private generateVueInstructions(config: ExportConfig): string {
    return `# Vue.js Project

Generated by Eternal UI with Vue 3 and ${config.bundler}.

## Development

\`\`\`bash
npm install
npm run dev
\`\`\`

## Build

\`\`\`bash
npm run build
\`\`\`

## Features

${config.features.routing ? '✅ Vue Router' : ''}
${config.features.stateManagement ? '✅ Pinia Store' : ''}
${config.typescript ? '✅ TypeScript' : ''}
`;
  }

  private generateVueComponentContent(component: Component): string {
    switch (component.type) {
      case 'hero':
        return `
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">{{ title }}</h1>
      <p class="text-xl mb-8">{{ subtitle }}</p>
      <button class="px-6 py-3 bg-primary text-white rounded-lg">
        {{ ctaText }}
      </button>
    </div>`;
      case 'button':
        return `{{ text }}`;
      default:
        return `<!-- ${component.type} content -->`;
    }
  }

  private pascalCase(str: string): string {
    return str.replace(/(^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1);
    }).replace(/\s+/g, '');
  }
}

/**
 * 🅰️ ANGULAR GENERATOR
 */
class AngularGenerator implements FrameworkGenerator {
  async generateProject(components: Component[], template: Template, config: ExportConfig): Promise<ExportResult> {
    // Angular implementation would go here
    // Similar structure to React/Vue but with Angular-specific syntax
    return {
      files: {},
      packageJson: {},
      configFiles: {},
      assets: [],
      instructions: 'Angular generator implementation pending',
      deploymentCommands: [],
      estimatedBuildTime: 0,
      estimatedBundleSize: 0,
    };
  }

  generateComponent(component: Component, config: ExportConfig): string {
    return `// Angular component for ${component.type}`;
  }

  generatePage(components: Component[], config: ExportConfig): string {
    return `// Angular page component`;
  }

  generateRouting(pages: any[], config: ExportConfig): string {
    return `// Angular routing module`;
  }

  generateStateManagement(config: ExportConfig): string {
    return `// Angular state management with NgRx`;
  }
}

/**
 * 🔥 SVELTE GENERATOR
 */
class SvelteGenerator implements FrameworkGenerator {
  async generateProject(components: Component[], template: Template, config: ExportConfig): Promise<ExportResult> {
    // Svelte implementation would go here
    return {
      files: {},
      packageJson: {},
      configFiles: {},
      assets: [],
      instructions: 'Svelte generator implementation pending',
      deploymentCommands: [],
      estimatedBuildTime: 0,
      estimatedBundleSize: 0,
    };
  }

  generateComponent(component: Component, config: ExportConfig): string {
    return `<!-- Svelte component for ${component.type} -->`;
  }

  generatePage(components: Component[], config: ExportConfig): string {
    return `<!-- Svelte page component -->`;
  }

  generateRouting(pages: any[], config: ExportConfig): string {
    return `// Svelte routing`;
  }

  generateStateManagement(config: ExportConfig): string {
    return `// Svelte stores`;
  }
}

/**
 * 📄 HTML GENERATOR
 */
class HTMLGenerator implements FrameworkGenerator {
  async generateProject(components: Component[], template: Template, config: ExportConfig): Promise<ExportResult> {
    const files: Record<string, string> = {};
    
    // Generate main HTML file
    files['index.html'] = this.generateMainHTML(components, template, config);
    
    // Generate CSS
    files['styles.css'] = this.generateCSS(template, config);
    
    // Generate JavaScript
    files['script.js'] = this.generateJS(components, config);
    
    return {
      files,
      packageJson: { name: template.config.name, version: "1.0.0" },
      configFiles: {},
      assets: [],
      instructions: 'Open index.html in your browser',
      deploymentCommands: [],
      estimatedBuildTime: 0,
      estimatedBundleSize: 0,
    };
  }

  generateComponent(component: Component, config: ExportConfig): string {
    return `<div class="${component.styles.className}">
      ${this.generateHTMLContent(component)}
    </div>`;
  }

  generatePage(components: Component[], config: ExportConfig): string {
    return components.map(c => this.generateComponent(c, config)).join('\n');
  }

  generateRouting(pages: any[], config: ExportConfig): string {
    return '// HTML routing with JavaScript';
  }

  generateStateManagement(config: ExportConfig): string {
    return '// Vanilla JavaScript state management';
  }

  private generateMainHTML(components: Component[], template: Template, config: ExportConfig): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${template.metadata.name}</title>
    <meta name="description" content="${template.metadata.description}">
    <link rel="stylesheet" href="styles.css">
    ${config.cssFramework === 'tailwind' ? '<script src="https://cdn.tailwindcss.com"></script>' : ''}
</head>
<body>
    <div id="app">
        ${components.map(c => this.generateComponent(c, config)).join('\n        ')}
    </div>
    <script src="script.js"></script>
</body>
</html>`;
  }

  private generateCSS(template: Template, config: ExportConfig): string {
    return `/* Generated styles for ${template.metadata.name} */
:root {
  --color-primary: ${template.styles.colors.primary};
  --color-secondary: ${template.styles.colors.secondary};
  --color-accent: ${template.styles.colors.accent};
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: ${template.styles.typography.body}, sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
`;
  }

  private generateJS(components: Component[], config: ExportConfig): string {
    return `// Generated JavaScript for interactive components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    ${components.map(c => `init${this.pascalCase(c.type)}();`).join('\n    ')}
});

${components.map(c => this.generateComponentJS(c)).join('\n\n')}
`;
  }

  private generateHTMLContent(component: Component): string {
    switch (component.type) {
      case 'hero':
        return `
        <h1>${component.props.title || 'Welcome'}</h1>
        <p>${component.props.subtitle || 'Subtitle'}</p>
        <button onclick="handleCTA()">${component.props.ctaText || 'Get Started'}</button>`;
      case 'button':
        return `<button onclick="handleClick()">${component.props.text || 'Button'}</button>`;
      default:
        return `<!-- ${component.type} content -->`;
    }
  }

  private generateComponentJS(component: Component): string {
    const componentName = this.pascalCase(component.type);
    return `function init${componentName}() {
    // Initialize ${component.type} component
    console.log('${componentName} initialized');
}`;
  }

  private pascalCase(str: string): string {
    return str.replace(/(^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1);
    }).replace(/\s+/g, '');
  }
}

export default MultiFrameworkExporter;// =============================================================================
// 📁 src/services/export/multiFrameworkExporter.ts
// Advanced Multi-Framework Code Export Engine
// Supports: React, Vue, Angular, Svelte, Vanilla HTML
// =============================================================================

import * as babel from '@babel/parser';
import generate from '@babel/generator';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
import prettier from 'prettier';
import JSZip from 'jszip';
import { Component } from '@/types/builder';
import { Template } from '@/services/templates/advancedTemplateEngine';

/**
 * 🎯 EXPORT CONFIGURATION
 */
export interface ExportConfig {
  framework: 'react' | 'vue' | 'angular' | 'svelte' | 'html';
  typescript: boolean;
  cssFramework: 'tailwind' | 'bootstrap' | 'css-modules' | 'styled-components' | 'emotion';
  bundler: 'vite' | 'webpack' | 'nextjs' | 'nuxt' | 'angular-cli' | 'sveltekit' | 'parcel';
  deployment: 'vercel' | 'netlify' | 'aws' | 'azure' | 'gcp' | 'github-pages';
  features: {
    routing: boolean;
    stateManagement: boolean;
    darkMode: boolean;
    i18n: boolean;
    pwa: boolean;
    ssr: boolean;
    ssg: boolean;
    api: boolean;
  };
  optimization: {
    minify: boolean;
    treeshaking: boolean;
    codeSplitting: boolean;
    lazyLoading: boolean;
    imageOptimization: boolean;
  };
}

/**
 * 📦 EXPORT RESULT
 */
export interface ExportResult {
  files: Record<string, string>;
  packageJson: any;
  configFiles: Record<string, string>;
  assets: { name: string; content: Blob }[];
  instructions: string;
  deploymentCommands: string[];
  estimatedBuildTime: number; // seconds
  estimatedBundleSize: number; // KB
}

/**
 * 🏗️ FRAMEWORK GENERATORS
 */
interface FrameworkGenerator {
  generateProject(components: Component[], template: Template, config: ExportConfig): Promise<ExportResult>;
  generateComponent(component: Component, config: ExportConfig): string;
  generatePage(components: Component[], config: ExportConfig): string;
  generateRouting(pages: any[], config: ExportConfig): string;
  generateStateManagement(config: ExportConfig): string;
}

/**
 * 🚀 MULTI-FRAMEWORK EXPORT ENGINE
 * 
 * Advanced code generation supporting multiple frameworks with optimization
 */
export class MultiFrameworkExporter {
  private generators: Map<string, FrameworkGenerator> = new Map();

  constructor() {
    // Register framework generators
    this.generators.set('react', new ReactGenerator());
    this.generators.set('vue', new VueGenerator());
    this.generators.set('angular', new AngularGenerator());
    this.generators.set('svelte', new SvelteGenerator());
    this.generators.set('html', new HTMLGenerator());
  }

  /**
   * 🎯 EXPORT PROJECT
   * 
   * Main export method supporting all frameworks
   */
  async exportProject(
    template: Template,
    config: ExportConfig
  ): Promise<ExportResult> {
    const startTime = performance.now();

    try {
      const generator = this.generators.get(config.framework);
      if (!generator) {
        throw new Error(`Framework ${config.framework} not supported`);
      }

      // Generate project files
      const result = await generator.generateProject(
        template.components,
        template,
        config
      );

      // Add common configuration files
      result.configFiles = {
        ...result.configFiles,
        ...this.generateCommonConfigFiles(config),
      };

      // Add deployment configurations
      result.configFiles = {
        ...result.configFiles,
        ...this.generateDeploymentConfigs(config),
      };

      // Calculate metrics
      const generationTime = performance.now() - startTime;
      result.estimatedBuildTime = this.estimateBuildTime(config, template);
      result.estimatedBundleSize = this.estimateBundleSize(config, template);

      console.log(`✅ ${config.framework} project exported in ${generationTime.toFixed(0)}ms`);
      
      return result;

    } catch (error) {
      console.error('Export failed:', error);
      throw new Error(`Failed to export ${config.framework} project: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * 📁 CREATE DOWNLOADABLE PACKAGE
   * 
   * Creates a ZIP file with the complete project
   */
  async createDownloadablePackage(
    template: Template,
    config: ExportConfig
  ): Promise<Blob> {
    const exportResult = await this.exportProject(template, config);
    const zip = new JSZip();

    // Add project files
    Object.entries(exportResult.files).forEach(([path, content]) => {
      zip.file(path, content);
    });

    // Add configuration files
    Object.entries(exportResult.configFiles).forEach(([path, content]) => {
      zip.file(path, content);
    });

    // Add package.json
    zip.file('package.json', JSON.stringify(exportResult.packageJson, null, 2));

    // Add README with instructions
    zip.file('README.md', exportResult.instructions);

    // Add assets
    for (const asset of exportResult.assets) {
      zip.file(`public/${asset.name}`, asset.content);
    }

    return await zip.generateAsync({ type: 'blob' });
  }

  /**
   * ⚙️ GENERATE COMMON CONFIG FILES
   */
  private generateCommonConfigFiles(config: ExportConfig): Record<string, string> {
    const files: Record<string, string> = {};

    // TypeScript configuration
    if (config.typescript) {
      files['tsconfig.json'] = this.generateTSConfig(config);
    }

    // Tailwind CSS configuration
    if (config.cssFramework === 'tailwind') {
      files['tailwind.config.js'] = this.generateTailwindConfig();
    }

    // ESLint configuration
    files['.eslintrc.json'] = this.generateESLintConfig(config);

    // Prettier configuration
    files['.prettierrc'] = this.generatePrettierConfig();

    // Environment variables template
    files['.env.example'] = this.generateEnvTemplate(config);

    // Git ignore
    files['.gitignore'] = this.generateGitignore(config);

    return files;
  }

  /**
   * 🚀 GENERATE DEPLOYMENT CONFIGS
   */
  private generateDeploymentConfigs(config: ExportConfig): Record<string, string> {
    const files: Record<string, string> = {};

    switch (config.deployment) {
      case 'vercel':
        files['vercel.json'] = this.generateVercelConfig(config);
        break;
      case 'netlify':
        files['netlify.toml'] = this.generateNetlifyConfig(config);
        break;
      case 'aws':
        files['aws-config.yml'] = this.generateAWSConfig(config);
        break;
      case 'github-pages':
        files['.github/workflows/deploy.yml'] = this.generateGitHubActionsConfig(config);
        break;
    }

    return files;
  }

  // Helper methods for configuration generation
  private generateTSConfig(config: ExportConfig): string {
    const tsConfig = {
      compilerOptions: {
        target: "es5",
        lib: ["dom", "dom.iterable", "es6"],
        allowJs: true,
        skipLibCheck: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        moduleResolution: "node",
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: config.framework === 'nextjs' ? true : false,
        jsx: config.framework === 'react' ? "react-jsx" : "preserve"
      },
      include: [
        "src",
        "next-env.d.ts"
      ],
      exclude: [
        "node_modules"
      ]
    };

    return JSON.stringify(tsConfig, null, 2);
  }

  private generateTailwindConfig(): string {
    return `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}`;
  }

  private generateESLintConfig(config: ExportConfig): string {
    const eslintConfig = {
      extends: [
        "eslint:recommended",
        ...(config.typescript ? ["@typescript-eslint/recommended"] : []),
        ...(config.framework === 'react' ? ["react-hooks/recommended"] : []),
        ...(config.framework === 'vue' ? ["plugin:vue/vue3-essential"] : []),
        ...(config.framework === 'angular' ? ["@angular-eslint/recommended"] : []),
      ],
      parser: config.typescript ? "@typescript-eslint/parser" : undefined,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ...(config.framework === 'react' && { ecmaFeatures: { jsx: true } }),
      },
      plugins: [
        ...(config.typescript ? ["@typescript-eslint"] : []),
        ...(config.framework === 'react' ? ["react", "react-hooks"] : []),
      ],
      rules: {
        "no-unused-vars": "warn",
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
      },
    };

    return JSON.stringify(eslintConfig, null, 2);
  }

  private generatePrettierConfig(): string {
    return JSON.stringify({
      semi: true,
      trailingComma: "es5",
      singleQuote: true,
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
    }, null, 2);
  }

  private generateEnvTemplate(config: ExportConfig): string {
    let envVars = `# Environment Variables Template
NODE_ENV=development

# App Configuration
NEXT_PUBLIC_APP_NAME=Eternal UI App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API Configuration
API_URL=http://localhost:3000/api
`;

    if (config.features.api) {
      envVars += `
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mydb

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
`;
    }

    if (config.features.i18n) {
      envVars += `
# Internationalization
DEFAULT_LOCALE=en
SUPPORTED_LOCALES=en,es,fr,de
`;
    }

    return envVars;
  }

  private generateGitignore(config: ExportConfig): string {
    return `# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production builds
build/
dist/
.next/
out/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Framework specific
${config.framework === 'angular' ? '.angular/' : ''}
${config.framework === 'svelte' ? '.svelte-kit/' : ''}
${config.framework === 'vue' ? '.nuxt/' : ''}
`;
  }

  private generateVercelConfig(config: ExportConfig): string {
    return JSON.stringify({
      version: 2,
      builds: [
        {
          src: config.framework === 'nextjs' ? 'package.json' : 'build/**',
          use: config.framework === 'nextjs' ? '@vercel/next' : '@vercel/static'
        }
      ],
      routes: config.features.routing ? [
        { src: '/(.*)', dest: '/' }
      ] : undefined
    }, null, 2);
  }

  private generateNetlifyConfig(config: ExportConfig): string {
    return `[build]
  publish = "${config.framework === 'react' ? 'build' : 'dist'}"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
`;
  }

  private generateAWSConfig(config: ExportConfig): string {
    return `# AWS Configuration for S3 + CloudFront deployment
# Use with AWS CLI or CDK

Resources:
  S3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub "\${AWS::StackName}-website"
      WebsiteConfiguration:
        IndexDocument: index.html
        ErrorDocument: error.html
  
  CloudFrontDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Origins:
          - DomainName: !GetAtt S3Bucket.RegionalDomainName
            Id: S3Origin
            S3OriginConfig:
              OriginAccessIdentity: ""
        DefaultRootObject: index.html
        Enabled: true
`;
  }

  private generateGitHubActionsConfig(config: ExportConfig): string {
    return `name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./${config.framework === 'react' ? 'build' : 'dist'}
`;
  }

  private estimateBuildTime(config: ExportConfig, template: Template): number {
    let baseTime = 30; // seconds
    
    // Framework complexity
    if (config.framework === 'angular') baseTime += 20;
    if (config.framework === 'vue' && config.bundler === 'nuxt') baseTime += 15;
    
    // Features
    if (config.features.ssr) baseTime += 10;
    if (config.features.pwa) baseTime += 5;
    if (config.typescript) baseTime += 5;
    
    // Component count
    baseTime += template.components.length * 0.5;
    
    return Math.round(baseTime);
  }

  private estimateBundleSize(config: ExportConfig, template: Template): number {
    let baseSize = 50; // KB
    
    // Framework base sizes
    switch (config.framework) {
      case 'react': baseSize += 130; break;
      case 'vue': baseSize += 80; break;
      case 'angular': baseSize += 200; break;
      case 'svelte': baseSize += 20; break;
      case 'html': baseSize += 10; break;
    }
    
    // CSS Framework
    if (config.cssFramework === 'tailwind') baseSize += 15;
    if (config.cssFramework === 'bootstrap') baseSize += 25;
    
    // Components
    baseSize += template.components.length * 2;
    
    // Features
    if (config.features.routing) baseSize += 10;
    if (config.features.stateManagement) baseSize += 15;
    if (config.features.i18n) baseSize += 20;
    
    return Math.round(baseSize);
  }
}

/**
 * ⚛️ REACT GENERATOR
 */
class ReactGenerator implements FrameworkGenerator {
  async generateProject(components: Component[], template: Template, config: ExportConfig): Promise<ExportResult> {
    const files: Record<string, string> = {};
    
    // Generate App.tsx/jsx
    files[`src/App.${config.typescript ? 'tsx' :