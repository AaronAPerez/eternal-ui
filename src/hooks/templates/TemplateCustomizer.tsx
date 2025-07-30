import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Palette, Type, Image, Save, RefreshCw } from 'lucide-react';
import { useTemplateEngine } from '@/hooks/templates/useTemplateEngine';
import { Template } from '@/services/templates/advancedTemplateEngine';

/**
 * 📝 CUSTOMIZATION FORM SCHEMA
 */
const CustomizationFormSchema = z.object({
  brandName: z.string().min(1, 'Brand name is required'),
  brandColors: z.array(z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format')).min(1),
  logo: z.string().optional(),
  fonts: z.array(z.string()).optional(),
  content: z.record(z.string()).optional(),
});

type CustomizationFormData = z.infer<typeof CustomizationFormSchema>;

interface TemplateCustomizerProps {
  template: Template;
  onCustomized?: (customizedTemplate: Template) => void;
  className?: string;
}

export const TemplateCustomizer: React.FC<TemplateCustomizerProps> = ({
  template,
  onCustomized,
  className,
}) => {
  const { customizeTemplate, isGenerating } = useTemplateEngine();
  const [previewColors, setPreviewColors] = useState(template.styles.colors);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<CustomizationFormData>({
    resolver: zodResolver(CustomizationFormSchema),
    defaultValues: {
      brandName: 'Your Brand',
      brandColors: [
        template.styles.colors.primary,
        template.styles.colors.secondary,
        template.styles.colors.accent,
      ],
      fonts: [template.styles.typography.headings],
      content: {},
    },
  });

  const watchedValues = watch();

  // Update preview when colors change
  React.useEffect(() => {
    setPreviewColors({
      ...template.styles.colors,
      primary: watchedValues.brandColors[0] || template.styles.colors.primary,
      secondary: watchedValues.brandColors[1] || template.styles.colors.secondary,
      accent: watchedValues.brandColors[2] || template.styles.colors.accent,
    });
  }, [watchedValues.brandColors, template.styles.colors]);

  const onSubmit = async (data: CustomizationFormData) => {
    const customized = await customizeTemplate(template.metadata.id, {
      brandName: data.brandName,
      brandColors: data.brandColors,
      logo: data.logo,
      fonts: data.fonts,
      content: data.content,
    });

    if (customized) {
      onCustomized?.(customized);
    }
  };

  const popularColors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1',
  ];

  const popularFonts = [
    'Inter', 'Roboto', 'Open Sans', 'Poppins', 'Montserrat',
    'Playfair Display', 'Source Sans Pro', 'Lato', 'Nunito', 'Work Sans',
  ];

  return (
    <div className={cn('bg-white rounded-lg shadow-lg border border-gray-200', className)}>
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Customize Template</h2>
        <p className="text-gray-600">{template.metadata.name}</p>
      </div>

      <div className="flex">
        {/* Customization Form */}
        <div className="flex-1 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Brand Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Name
              </label>
              <input
                {...register('brandName')}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your Company Name"
              />
              {errors.brandName && (
                <p className="mt-1 text-sm text-red-600">{errors.brandName.message}</p>
              )}
            </div>

            {/* Brand Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Colors
              </label>
              <div className="space-y-3">
                {['Primary', 'Secondary', 'Accent'].map((colorType, index) => (
                  <div key={colorType} className="flex items-center gap-3">
                    <div className="w-16 text-sm text-gray-600">{colorType}</div>
                    <input
                      type="color"
                      value={watchedValues.brandColors[index] || '#3B82F6'}
                      onChange={(e) => {
                        const newColors = [...watchedValues.brandColors];
                        newColors[index] = e.target.value;
                        setValue('brandColors', newColors);
                      }}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <input
                      type="text"
                      value={watchedValues.brandColors[index] || '#3B82F6'}
                      onChange={(e) => {
                        const newColors = [...watchedValues.brandColors];
                        newColors[index] = e.target.value;
                        setValue('brandColors', newColors);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="#3B82F6"
                    />
                  </div>
                ))}
              </div>

              {/* Color Presets */}
              <div className="mt-4">
                <div className="text-sm text-gray-600 mb-2">Popular Colors</div>
                <div className="flex flex-wrap gap-2">
                  {popularColors.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        const newColors = [color, ...watchedValues.brandColors.slice(1)];
                        setValue('brandColors', newColors);
                      }}
                      className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Typography */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Typography
              </label>
              <select
                value={watchedValues.fonts?.[0] || 'Inter'}
                onChange={(e) => setValue('fonts', [e.target.value])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {popularFonts.map(font => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Image className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <div className="text-sm text-gray-600">
                  <label className="cursor-pointer text-blue-600 hover:text-blue-700">
                    Click to upload logo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // In a real implementation, upload to storage and get URL
                          const url = URL.createObjectURL(file);
                          setValue('logo', url);
                        }
                      }}
                    />
                  </label>
                </div>
                {watchedValues.logo && (
                  <div className="mt-3">
                    <img
                      src={watchedValues.logo}
                      alt="Logo preview"
                      className="max-w-32 max-h-16 mx-auto rounded"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Content Customization */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Customization
              </label>
              <div className="space-y-3">
                {['title', 'subtitle', 'ctaText', 'description'].map(field => (
                  <div key={field}>
                    <label className="block text-xs text-gray-600 mb-1 capitalize">
                      {field.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <input
                      type="text"
                      placeholder={`Custom ${field}`}
                      onChange={(e) => {
                        const content = watchedValues.content || {};
                        content[field] = e.target.value;
                        setValue('content', content);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isGenerating || !isValid}
              className={cn(
                'w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all',
                'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                isGenerating || !isValid
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'
              )}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Customizing...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Apply Customization
                </>
              )}
            </button>
          </form>
        </div>

        {/* Preview Panel */}
        <div className="w-80 bg-gray-50 border-l border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 mb-4">Live Preview</h3>
          
          {/* Template Preview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4">
            {/* Preview Header */}
            <div 
              className="h-12 flex items-center px-4"
              style={{ backgroundColor: previewColors.primary }}
            >
              <div className="w-6 h-6 bg-white bg-opacity-20 rounded mr-3"></div>
              <span className="text-white font-medium" style={{ fontFamily: watchedValues.fonts?.[0] || 'Inter' }}>
                {watchedValues.brandName}
              </span>
            </div>
            
            {/* Preview Content */}
            <div className="p-4 space-y-3">
              <div 
                className="h-4 rounded"
                style={{ backgroundColor: previewColors.secondary + '40' }}
              ></div>
              <div 
                className="h-3 w-3/4 rounded"
                style={{ backgroundColor: previewColors.secondary + '20' }}
              ></div>
              <div 
                className="w-24 h-8 rounded flex items-center justify-center text-white text-sm font-medium"
                style={{ 
                  backgroundColor: previewColors.accent,
                  fontFamily: watchedValues.fonts?.[0] || 'Inter'
                }}
              >
                Button
              </div>
            </div>
          </div>

          {/* Color Palette Preview */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Color Palette</h4>
            <div className="flex gap-2">
              {Object.entries(previewColors).slice(0, 3).map(([name, color], index) => (
                <div key={name} className="flex-1">
                  <div 
                    className="h-12 rounded-lg border border-gray-200"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div className="text-xs text-gray-600 mt-1 capitalize">{name}</div>
                  <div className="text-xs text-gray-400 font-mono">{color}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography Preview */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Typography</h4>
            <div className="space-y-2">
              <div 
                className="text-lg font-bold text-gray-900"
                style={{ fontFamily: watchedValues.fonts?.[0] || 'Inter' }}
              >
                Heading Text
              </div>
              <div 
                className="text-sm text-gray-600"
                style={{ fontFamily: watchedValues.fonts?.[0] || 'Inter' }}
              >
                Body text and paragraph content will use this font family for consistency across the design.
              </div>
            </div>
          </div>

          {/* Customization Summary */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Changes</h4>
            <div className="space-y-1 text-xs text-blue-800">
              <div>✓ Brand name: {watchedValues.brandName}</div>
              <div>✓ Colors: {watchedValues.brandColors.length} custom</div>
              <div>✓ Font: {watchedValues.fonts?.[0] || 'Default'}</div>
              {watchedValues.logo && <div>✓ Custom logo added</div>}
              {watchedValues.content && Object.keys(watchedValues.content).length > 0 && (
                <div>✓ Content: {Object.keys(watchedValues.content).length} fields</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCustomizer;