import { useTheme } from "./context";

// Button component with theme support
export function ThemedButton({ 
  variant = 'primary', 
  children, 
  ...props 
}: {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { tokens } = useTheme();
  
  const variants = {
    primary: `
      bg-primary-500 hover:bg-primary-600 active:bg-primary-700
      text-white border-transparent
      focus:ring-primary-500
    `,
    secondary: `
      bg-background-secondary hover:bg-background-tertiary
      text-text-primary border-border-primary
      focus:ring-primary-500
    `,
    ghost: `
      bg-transparent hover:bg-background-tertiary
      text-text-primary border-transparent
      focus:ring-primary-500
    `,
  };

  return (
    <button
      className={`
        px-4 py-2 rounded-lg border font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-primary
        ${variants[variant]}
      `}
      {...props}
    >
      {children}
    </button>
  );
}