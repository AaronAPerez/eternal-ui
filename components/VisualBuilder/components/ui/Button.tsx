import { useTheme } from '@/lib/theme/context';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-primary disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white focus:ring-primary-500",
        secondary: "bg-background-tertiary hover:bg-border-primary text-text-primary border border-border-primary focus:ring-primary-500",
        outline: "border border-border-primary hover:bg-background-tertiary text-text-primary focus:ring-primary-500",
        ghost: "hover:bg-background-tertiary text-text-primary focus:ring-primary-500",
        destructive: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export function Button({ className, variant, size, children, ...props }: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
}