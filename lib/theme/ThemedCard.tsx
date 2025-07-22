// Card component with theme support
export function ThemedCard({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <div className={`
      bg-background-secondary border border-border-primary rounded-lg shadow-sm
      ${className}
    `}>
      {children}
    </div>
  );
}