import React from 'react'
// Glass Card Component
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hover = true, glow = false }) => {
  return (
    <div className={`
      relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6
      shadow-xl transition-all duration-300
      ${hover ? 'hover:bg-white/15 hover:-translate-y-1 hover:shadow-2xl' : ''}
      ${glow ? 'shadow-blue-500/25' : ''}
      ${className}
    `}>
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl -z-10" />
      )}
      {children}
    </div>
  )
}

export default GlassCard