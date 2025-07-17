import React from 'react'

// Feature Grid Component (Enhanced)
const FeatureGrid: React.FC<{
  title: string;
  subtitle: string;
  features: number;
  layout: string;
  style: string;
  accentColor: string;
  backgroundColor?: string;
  textColor?: string;
}> = ({ title, subtitle, features, layout, style, accentColor, backgroundColor = '#F9FAFB', textColor = '#111827' }) => {
  const defaultFeatures = [
    { icon: '🚀', title: 'Lightning Fast', description: 'Optimized for speed and performance' },
    { icon: '🎨', title: 'Beautiful Design', description: 'Modern and clean interface' },
    { icon: '🔧', title: 'Easy to Use', description: 'Intuitive drag-and-drop builder' },
    { icon: '📱', title: 'Mobile Ready', description: 'Responsive on all devices' },
    { icon: '⚡', title: 'Real-time Sync', description: 'Collaborate with your team' },
    { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security' },
    { icon: '🎯', title: 'Targeted', description: 'Built for your specific needs' },
    { icon: '💰', title: 'Cost Effective', description: 'Save time and money' }
  ];

  const gridCols = layout === 'grid-2' ? 'grid-cols-1 md:grid-cols-2' : 
                   layout === 'grid-3' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                   'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';

  return (
    <section 
      className="py-16 px-6"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">{subtitle}</p>
        </div>
        
        <div className={`grid ${gridCols} gap-8`}>
          {defaultFeatures.slice(0, features).map((feature, index) => (
            <div
              key={index}
              className={
                style === 'cards' 
                  ? 'bg-white bg-opacity-80 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow'
                  : style === 'minimal'
                  ? 'text-center'
                  : 'bg-white bg-opacity-60 p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors'
              }
            >
              {style === 'icons' && (
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto"
                  style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                >
                  <span className="text-2xl">{feature.icon}</span>
                </div>
              )}
              <div className={style === 'minimal' ? 'text-center' : ''}>
                {style !== 'icons' && (
                  <span className="text-3xl mb-4 block">{feature.icon}</span>
                )}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="opacity-80">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid