import puppeteer from 'puppeteer';
import sharp from 'sharp';
import { EnhancedComponent } from '../components/studio/ComponentLibrary/ComponentLibrary';

export class ComponentImageGenerator {
  private browser: puppeteer.Browser | null = null;

  async initialize() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async generateComponentPreview(
    component: EnhancedComponent,
    variant: string = 'default',
    props: Record<string, any> = {},
    options: {
      width?: number;
      height?: number;
      theme?: 'light' | 'dark';
      responsive?: boolean;
    } = {}
  ): Promise<string> {
    if (!this.browser) await this.initialize();

    const page = await this.browser!.newPage();
    
    try {
      // Set viewport
      await page.setViewport({
        width: options.width || 800,
        height: options.height || 600,
        deviceScaleFactor: 2, // High DPI
      });

      // Generate HTML content for the component
      const html = this.generateComponentHTML(component, variant, props, options.theme);
      
      await page.setContent(html, { waitUntil: 'networkidle0' });

      // Wait for any animations to complete
      await page.waitForTimeout(1000);

      // Take screenshot
      const screenshot = await page.screenshot({
        type: 'png',
        clip: {
          x: 0,
          y: 0,
          width: options.width || 800,
          height: options.height || 600,
        },
      });

      // Optimize image with sharp
      const optimizedImage = await sharp(screenshot)
        .resize(400, 300, { fit: 'inside', withoutEnlargement: true })
        .png({ quality: 90 })
        .toBuffer();

      // Save to file system or cloud storage
      const filename = `${component.id}-${variant}-preview.png`;
      const filepath = `public/component-previews/${filename}`;
      
      await sharp(optimizedImage).toFile(filepath);

      return `/component-previews/${filename}`;
    } finally {
      await page.close();
    }
  }

  private generateComponentHTML(
    component: EnhancedComponent,
    variant: string,
    props: Record<string, any>,
    theme: 'light' | 'dark' = 'light'
  ): string {
    const themeClass = theme === 'dark' ? 'dark' : '';
    
    return `
      <!DOCTYPE html>
      <html class="${themeClass}">
        <head>
          <meta charset="utf-8">
          <title>${component.name} Preview</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <script>
            tailwind.config = {
              darkMode: 'class',
              theme: {
                extend: {
                  colors: {
                    indigo: {
                      50: '#eef2ff',
                      500: '#6366f1',
                      600: '#4f46e5',
                    }
                  }
                }
              }
            }
          </script>
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
          </style>
        </head>
        <body class="${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}">
          <div id="component-container" class="w-full h-full flex items-center justify-center">
            ${this.renderComponentCode(component, variant, props)}
          </div>
          
          <!-- Add any necessary JavaScript for interactivity -->
          <script>
            // Component-specific JavaScript would go here
            ${this.getComponentScript(component, props)}
          </script>
        </body>
      </html>
    `;
  }

  private renderComponentCode(
    component: EnhancedComponent,
    variant: string,
    props: Record<string, any>
  ): string {
    // This would render the actual component HTML
    // For demo purposes, we'll use the component's example code
    const variantConfig = component.examples.variants.find(v => v.name.toLowerCase() === variant);
    const mergedProps = { ...component.defaultProps, ...props, ...(variantConfig?.props || {}) };
    
    // Convert props to HTML attributes
    const propsString = Object.entries(mergedProps)
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? key : '';
        }
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        }
        return `${key}='${JSON.stringify(value)}'`;
      })
      .filter(Boolean)
      .join(' ');

    // Generate component HTML based on type
    switch (component.category) {
      case 'ui':
        return this.renderUIComponent(component, mergedProps);
      case 'layout':
        return this.renderLayoutComponent(component, mergedProps);
      case 'forms':
        return this.renderFormComponent(component, mergedProps);
      default:
        return this.renderGenericComponent(component, mergedProps);
    }
  }

  private renderUIComponent(component: EnhancedComponent, props: Record<string, any>): string {
    switch (component.id) {
      case 'button':
        return `
          <button class="px-4 py-2 rounded-lg font-medium transition-colors
            ${props.variant === 'primary' ? 'bg-indigo-500 text-white hover:bg-indigo-600' : ''}
            ${props.variant === 'secondary' ? 'bg-gray-200 text-gray-900 hover:bg-gray-300' : ''}
            ${props.variant === 'outline' ? 'border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-50' : ''}
            ${props.size === 'sm' ? 'text-sm px-3 py-1' : ''}
            ${props.size === 'lg' ? 'text-lg px-6 py-3' : ''}
          ">
            ${props.children || 'Button'}
          </button>
        `;
      case 'input':
        return `
          <div class="w-64">
            <input 
              type="${props.type || 'text'}"
              placeholder="${props.placeholder || 'Enter text...'}"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        `;
      case 'card':
        return `
          <div class="w-80 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Card Title</h3>
            <p class="text-gray-600 text-sm">This is a sample card component with some content to demonstrate the layout and styling.</p>
            <button class="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
              Action
            </button>
          </div>
        `;
      default:
        return this.renderGenericComponent(component, props);
    }
  }

  private renderLayoutComponent(component: EnhancedComponent, props: Record<string, any>): string {
    switch (component.id) {
      case 'container':
        return `
          <div class="max-w-4xl mx-auto px-4">
            <div class="bg-gray-100 p-8 rounded-lg text-center">
              <h2 class="text-xl font-semibold text-gray-900">Container Component</h2>
              <p class="text-gray-600 mt-2">Content is centered with max-width constraints</p>
            </div>
          </div>
        `;
      case 'grid':
        return `
          <div class="grid grid-cols-3 gap-4 w-full max-w-2xl">
            ${Array.from({ length: 6 }).map((_, i) => `
              <div class="bg-indigo-100 p-4 rounded-lg text-center">
                <div class="text-indigo-900 font-medium">Item ${i + 1}</div>
              </div>
            `).join('')}
          </div>
        `;
      default:
        return this.renderGenericComponent(component, props);
    }
  }

  private renderFormComponent(component: EnhancedComponent, props: Record<string, any>): string {
    // Form component rendering logic
    return this.renderGenericComponent(component, props);
  }

  private renderGenericComponent(component: EnhancedComponent, props: Record<string, any>): string {
    return `
      <div class="w-80 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
        <div class="text-center">
          <div class="text-lg font-medium text-gray-900">${component.name}</div>
          <div class="text-sm text-gray-600 mt-1">${component.description}</div>
        </div>
      </div>
    `;
  }

  private getComponentScript(component: EnhancedComponent, props: Record<string, any>): string {
    // Component-specific JavaScript for interactivity
    return `
      // Add any component-specific JavaScript here
      console.log('Component: ${component.name}');
    `;
  }

  async generateBulkPreviews(components: EnhancedComponent[]): Promise<void> {
    for (const component of components) {
      try {
        await this.generateComponentPreview(component);
        
        // Generate variants
        for (const variant of component.examples.variants) {
          await this.generateComponentPreview(
            component,
            variant.name.toLowerCase(),
            variant.props
          );
        }
      } catch (error) {
        console.error(`Failed to generate preview for ${component.id}:`, error);
      }
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
