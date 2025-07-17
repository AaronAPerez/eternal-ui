import React from 'react'


// Stats Counter Component
const StatsCounter: React.FC<{
  title: string;
  subtitle: string;
  layout: string;
  accentColor: string;
  backgroundColor?: string;
  textColor?: string;
}> = ({ title, subtitle, layout, accentColor, backgroundColor = '#FFFFFF', textColor = '#111827' }) => {
  const stats = [
    { label: 'Happy Customers', value: 10000, suffix: '+' },
    { label: 'Projects Completed', value: 2500, suffix: '+' },
    { label: 'Years Experience', value: 15, suffix: '' },
    { label: 'Team Members', value: 50, suffix: '+' }
  ];

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
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className={`text-center ${layout === 'cards' ? 
              'bg-white bg-opacity-80 p-6 rounded-lg shadow-lg' : ''}`}>
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: accentColor }}>
                {stat.value.toLocaleString()}{stat.suffix}
              </div>
              <div className="font-medium opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter