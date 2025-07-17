// import React from 'react';
// import { Button } from '@/components/ui/Button';
// import { HeroVariantProps } from './HeroSection.types';

// export const HeroVariant: React.FC<HeroVariantProps> = ({
//   variant,
//   title,
//   subtitle,
//   ctaText,
//   ctaUrl,
//   secondaryCTA,
//   showVideo,
// }) => {
//   switch (variant) {
//     case 'centered':
//       return (
//         <div className="hero-centered">
//           <h1 className="hero-title">{title}</h1>
//           <p className="hero-subtitle">{subtitle}</p>
//           <div className="hero-actions">
//             <Button href={ctaUrl}>{ctaText}</Button>
//             {secondaryCTA && (
//               <Button variant="outline">{secondaryCTA}</Button>
//             )}
//           </div>
//         </div>
//       );
    
//     case 'split':
//       return (
//         <div className="hero-split">
//           <div className="hero-content">
//             <h1>{title}</h1>
//             <p>{subtitle}</p>
//             <Button href={ctaUrl}>{ctaText}</Button>
//           </div>
//           <div className="hero-visual">
//             {showVideo ? <VideoPlayer /> : <HeroImage />}
//           </div>
//         </div>
//       );
    
//     default:
//       return null;
//   }
// };