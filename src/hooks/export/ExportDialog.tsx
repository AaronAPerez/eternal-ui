import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Download, 
  Code, 
  Settings, 
  Zap, 
  Globe, 
  Smartphone, 
  Monitor,
  Package,
  CheckCircle,
  AlertCircle,
  X,
  ExternalLink
} from 'lucide-react';
import { useMultiFrameworkExport } from '@/hooks/export/useMultiFrameworkExport';
import { Template } from '@/services/templates/advancedTemplateEngine';
import { ExportConfig } from '@/services/export/multiFrameworkExporter';
import { cn } from '@/lib/utils';

/**
 * 📝 EXPORT FORM SCHEMA
 */
const ExportFormSchema = z.object({
  framework: z.enum(['react', 'vue', 'angular', 'svelte', 'html']),
  typescript: z.boolean(),
  cssFramework: z.enum(['tailwind', 'bootstrap', 'css-modules', 'styled-components', 'emotion']),
  bundler: z.enum(['vite', 'webpack', 'nextjs', 'nuxt', 'angular-cli', 'sveltekit', 'parcel']),
  deployment: z.enum(['vercel', 'netlify', 'aws', 'azure', 'gcp', 'github-pages']),
  features: z.object({
    routing: z.boolean(),
    stateManagement: z.boolean(),
    darkMode: z.boolean(),
    i18n: z.boolean(),
    pwa: z.boolean(),
    ssr: z.boolean(),
    ssg: z.boolean(),
    api: z.boolean(),
  }),
  optimization: z.object({
    minify: z.boolean(),
    treeshaking: z.boolean(),
    codeSplitting: z.boolean(),
    lazyLoading: z.boolean(),
    imageOptimization: z.boolean(),
  }),
});

type ExportFormData = z.infer<typeof ExportFormSchema>;

/**
 * 🎯 EXPORT DIALOG PROPS
 */
interface ExportDialogProps {
  template: Template;
  isOpen: boolean;
  onClose: () => void;
  onExportComplete?: (downloadUrl: string) => void;
}

/**
 * 📤 EXPORT DIALOG COMPONENT
 * 
 * Comprehensive multi-framework export interface
 */
export const ExportDialog: React.FC<ExportDialogProps> = ({
  template,
  isOpen,
  onClose,
  onExportComplete,
}) => {
  const {
    isExporting,
    progress,
    currentStep,
    result,
    error,
    downloadUrl,
    exportProject,
    downloadPackage,
    cleanup,
  } = useMultiFrameworkExport();

  const [selectedFramework, setSelectedFramework] = useState<string>('react');
  const [estimatedMetrics, setEstimatedMetrics] = useState({
    buildTime: 30,
    bundleSize: 150,
    features: 8,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<ExportFormData>({
    resolver: zodResolver(ExportFormSchema),
    defaultValues: {
      framework: 'react',
      typescript: true,
      cssFramework: 'tailwind',
      bundler: 'vite',
      deployment: 'vercel',
      features: {
        routing: true,
        stateManagement: true,
        darkMode: true,
        i18n: false,
        pwa: false,
        ssr: false,
        ssg: true,
        api: false,
      },
      optimization: {
        minify: true,
        treeshaking: true,
        codeSplitting: true,
        lazyLoading: true,
        imageOptimization: true,
      },
    },
  });

  const watchedValues = watch();

  // Update estimates when configuration changes
  useEffect(() => {
    const framework = watchedValues.framework;
    const features = Object.values(watchedValues.features).filter(Boolean).length;
    
    let buildTime = 30;
    let bundleSize = 50;

    // Framework impact
    switch (framework) {
      case 'react': bundleSize += 130; break;
      case 'vue': bundleSize += 80; break;
      case 'angular': bundleSize += 200; buildTime += 20; break;
      case 'svelte': bundleSize += 20; break;
      case 'html': bundleSize += 10; break;
    }

    // CSS Framework impact
    if (watchedValues.cssFramework === 'tailwind') bundleSize += 15;
    if (watchedValues.cssFramework === 'bootstrap') bundleSize += 25;

    // Features impact
    bundleSize += features * 10;
    buildTime += features * 2;

    // TypeScript impact
    if (watchedValues.typescript) buildTime += 5;

    setEstimatedMetrics({
      buildTime: Math.round(buildTime),
      bundleSize: Math.round(bundleSize),
      features,
    });
  }, [watchedValues]);

  /**
   * 🚀 HANDLE EXPORT SUBMIT
   */
  const onSubmit = async (data: ExportFormData) => {
    const config: ExportConfig = {
      framework: data.framework,
      typescript: data.typescript,
      cssFramework: data.cssFramework,
      bundler: data.bundler,
      deployment: data.deployment,
      features: data.features,
      optimization: data.optimization,
    };

    const exportResult = await exportProject(template, config);
    
    if (exportResult?.downloadUrl) {
      onExportComplete?.(exportResult.downloadUrl);
    }
  };

  /**
   * 💾 HANDLE DOWNLOAD
   */
  const handleDownload = () => {
    const filename = `${template.metadata.name.toLowerCase().replace(/\s+/g, '-')}-${watchedValues.framework}.zip`;
    downloadPackage(filename);
  };

  // Framework configurations
  const frameworkConfigs = {
    react: {
      name: 'React',
      description: 'Modern React with hooks and functional components',
      icon: '⚛️',
      bundlers: ['vite', 'webpack', 'nextjs'],
      deployments: ['vercel', 'netlify', 'aws', 'github-pages'],
      features: ['routing', 'stateManagement', 'ssr', 'ssg'],
    },
    vue: {
      name: 'Vue.js',
      description: 'Vue 3 with Composition API and modern tooling',
      icon: '🟢',
      bundlers: ['vite', 'webpack', 'nuxt'],
      deployments: ['vercel', 'netlify', 'aws', 'github-pages'],
      features: ['routing', 'stateManagement', 'ssr', 'ssg'],
    },
    angular: {
      name: 'Angular',
      description: 'Enterprise-grade Angular with TypeScript',
      icon: '🅰️',
      bundlers: ['angular-cli'],
      deployments: ['vercel', 'netlify', 'aws', 'azure'],
      features: ['routing', 'stateManagement', 'ssr', 'pwa'],
    },
    svelte: {
      name: 'Svelte',
      description: 'Lightweight Svelte with SvelteKit',
      icon: '🔥',
      bundlers: ['sveltekit', 'vite'],
      deployments: ['vercel', 'netlify', 'github-pages'],
      features: ['routing', 'ssr', 'ssg'],
    },
    html: {
      name: 'HTML',
      description: 'Pure HTML, CSS, and vanilla JavaScript',
      icon: '📄',
      bundlers: ['parcel'],
      deployments: ['netlify', 'github-pages', 'aws'],
      features: [],
    },
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-4xl mx-4 bg-white rounded-lg shadow-xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Export Project</h2>
              <p className="text-sm text-gray-500">{template.metadata.name}</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close Export Dialog"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-80px)]">
          {/* Configuration Panel */}
          <div className="flex-1 p-6 overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Framework Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose Framework
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(frameworkConfigs).map(([key, config]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setValue('framework', key as any)}
                      className={cn(
                        'p-4 border rounded-lg text-left transition-all',
                        watchedValues.framework === key
                          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{config.icon}</span>
                        <span className="font-medium text-gray-900">{config.name}</span>
                      </div>
                      <p className="text-xs text-gray-600">{config.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Configuration Options */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Build Configuration */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Build Configuration
                  </h3>

                  {/* TypeScript */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">TypeScript</label>
                    <input
                      {...register('typescript')}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>

                  {/* CSS Framework */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">CSS Framework</label>
                    <select
                      {...register('cssFramework')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="tailwind">Tailwind CSS</option>
                      <option value="bootstrap">Bootstrap</option>
                      <option value="css-modules">CSS Modules</option>
                      <option value="styled-components">Styled Components</option>
                      <option value="emotion">Emotion</option>
                    </select>
                  </div>

                  {/* Bundler */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Bundler</label>
                    <select
                      {...register('bundler')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {frameworkConfigs[watchedValues.framework as keyof typeof frameworkConfigs]?.bundlers.map(bundler => (
                        <option key={bundler} value={bundler}>
                          {bundler.charAt(0).toUpperCase() + bundler.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Features
                  </h3>

                  {[
                    { key: 'routing', label: 'Routing', icon: '🛣️' },
                    { key: 'stateManagement', label: 'State Management', icon: '📊' },
                    { key: 'darkMode', label: 'Dark Mode', icon: '🌙' },
                    { key: 'i18n', label: 'Internationalization', icon: '🌍' },
                    { key: 'pwa', label: 'Progressive Web App', icon: '📱' },
                    { key: 'ssr', label: 'Server-Side Rendering', icon: '⚡' },
                    { key: 'ssg', label: 'Static Site Generation', icon: '🏗️' },
                    { key: 'api', label: 'API Integration', icon: '🔌' },
                  ].map(feature => (
                    <div key={feature.key} className="flex items-center justify-between">
                      <label className="text-sm text-gray-700 flex items-center gap-2">
                        <span>{feature.icon}</span>
                        {feature.label}
                      </label>
                      <input
                        {...register(`features.${feature.key}` as any)}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Deployment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Deployment Platform
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {['vercel', 'netlify', 'aws', 'azure', 'gcp', 'github-pages'].map(platform => (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => setValue('deployment', platform as any)}
                      className={cn(
                        'p-3 border rounded-lg text-center transition-all',
                        watchedValues.deployment === platform
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <Globe className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                      <span className="text-sm font-medium capitalize">{platform}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Export Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isExporting || !isValid}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all',
                    'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                    isExporting || !isValid
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'
                  )}
                >
                  {isExporting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Code className="w-5 h-5" />
                      Export Project
                    </>
                  )}
                </button>

                {result && downloadUrl && (
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Preview Panel */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 p-6">
            <h3 className="font-medium text-gray-900 mb-4">Export Preview</h3>

            {/* Estimated Metrics */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Build Time</span>
                <span className="text-sm font-medium text-gray-900">~{estimatedMetrics.buildTime}s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Bundle Size</span>
                <span className="text-sm font-medium text-gray-900">~{estimatedMetrics.bundleSize}KB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Features</span>
                <span className="text-sm font-medium text-gray-900">{estimatedMetrics.features}</span>
              </div>
            </div>

            {/* Export Progress */}
            {isExporting && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">Progress</span>
                  <span className="text-sm text-gray-600">{progress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600">{currentStep}</p>
              </div>
            )}

            {/* Export Result */}
            {result && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Export Successful!</span>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Package Contents</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>📁 src/ - Source code</div>
                    <div>📁 public/ - Static assets</div>
                    <div>📄 package.json</div>
                    <div>📄 README.md</div>
                    <div>⚙️ Configuration files</div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">Quick Start</h4>
                  <div className="space-y-1 text-sm text-blue-800 font-mono">
                    <div>npm install</div>
                    <div>npm run dev</div>
                  </div>
                </div>

                {result.deploymentCommands.length > 0 && (
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h4 className="font-medium text-purple-900 mb-2">Deploy</h4>
                    <div className="space-y-1 text-sm text-purple-800 font-mono">
                      {result.deploymentCommands.map((cmd, index) => (
                        <div key={index}>{cmd}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="flex items-start gap-2 text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Export Failed</div>
                  <div className="text-sm mt-1">{error}</div>
                </div>
              </div>
            )}

            {/* Template Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Template Info</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Components: {template.components.length}</div>
                <div>Pages: {template.pages.length}</div>
                <div>Industry: {template.metadata.industry}</div>
                <div>Style: {template.metadata.style}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
