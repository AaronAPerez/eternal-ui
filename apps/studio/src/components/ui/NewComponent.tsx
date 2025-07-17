interface NewComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const NewComponent: React.FC<NewComponentProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children 
}) => {
  return (
    <div className={`new-component ${variant} ${size}`}>
      {children}
    </div>
  );
};