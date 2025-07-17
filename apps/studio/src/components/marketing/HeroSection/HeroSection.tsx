import React from 'react';


// Hero Section Component
const HeroSection: React.FC<{
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
  variant: string;
}> = ({ title, subtitle, ctaText, ctaUrl, backgroundImage, backgroundColor = '#6366F1', textColor = '#FFFFFF', variant }) => {
  const backgroundStyle = backgroundImage 
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor };

  return (
    <section 
      className={`relative py-20 px-6 text-center ${variant === 'minimal' ? 'py-12' : 'py-20'}`}
      style={{ ...backgroundStyle, color: textColor }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className={`font-bold mb-6 ${variant === 'minimal' ? 'text-2xl md:text-3xl' : 'text-4xl md:text-6xl'}`}>
          {title}
        </h1>
        <p className={`mb-8 opacity-90 ${variant === 'minimal' ? 'text-base' : 'text-xl md:text-2xl'}`}>
          {subtitle}
        </p>
        <button 
          className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          style={{ backgroundColor: textColor, color: backgroundColor }}
        >
          {ctaText}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;