import { ComponentPreviewErrorBoundary } from "./ComponentPreviewErrorBoundary";

// Safe component preview wrapper
export const SafeComponentPreview: React.FC<{ 
  component: React.ComponentType<any>; 
  props: any;
  className?: string;
}> = ({ component: Component, props, className }) => {
  return (
    <ComponentPreviewErrorBoundary>
      <div className={className}>
        <Component {...props} />
      </div>
    </ComponentPreviewErrorBoundary>
  );
};
