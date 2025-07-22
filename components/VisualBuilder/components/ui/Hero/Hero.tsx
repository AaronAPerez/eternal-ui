import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { BaseComponentProps } from '@/types/component'

const heroVariants = cva(
  ['relative flex items-center justify-center text-center overflow-hidden'],
  {
    variants: {
      size: {
        sm: 'min-h-[40vh] py-16',
        md: 'min-h-[60vh] py-24',
        lg: 'min-h-[80vh] py-32',
        xl: 'min-h-screen py-40'
      },
      variant: {
        default: 'bg-background',
        gradient: 'bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900',
        image: 'bg-cover bg-center bg-no-repeat',
        video: 'bg-black'
      },
      overlay: {
        none: '',
        light: 'before:absolute before:inset-0 before:bg-black/20 before:z-10',
        medium: 'before:absolute before:inset-0 before:bg-black/40 before:z-10',
        dark: 'before:absolute before:inset-0 before:bg-black/60 before:z-10'
      }
    },
    defaultVariants: {
      size: 'lg',
      variant: 'default',
      overlay: 'none'
    }
  }
)

export interface HeroProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof heroVariants>,
    BaseComponentProps {
  backgroundImage?: string
  backgroundVideo?: string
}

export const Hero = forwardRef<HTMLElement, HeroProps>(
  ({ className, size, variant, overlay, backgroundImage, backgroundVideo, children, style, ...props }, ref) => {
    const backgroundStyle = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}
    
    return (
      <section
        ref={ref}
        className={cn(heroVariants({ size, variant, overlay }), className)}
        style={{ ...backgroundStyle, ...style }}
        {...props}
      >
        {backgroundVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        )}
        
        <div className="relative z-20 max-w-4xl mx-auto px-4">
          {children}
        </div>
      </section>
    )
  }
)

Hero.displayName = 'Hero'