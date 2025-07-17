import { PropSchema } from "@/components/ComponentsPage";

// Utility functions
export const generateComponentId = (prefix: string = 'component') => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const validateComponentProps = (
  props: Record<string, any>, 
  schema: Record<string, PropSchema>
) => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  Object.entries(schema).forEach(([key, propSchema]) => {
    const value = props[key];
    
    // Check required fields
    if (propSchema.required && (value === undefined || value === null || value === '')) {
      errors.push(`${propSchema.label} is required`);
      return;
    }
    
    // Skip validation if value is not provided and not required
    if (value === undefined || value === null) return;
    
    // Type-specific validation
    switch (propSchema.type) {
      case 'number':
        const numValue = Number(value);
        if (isNaN(numValue)) {
          errors.push(`${propSchema.label} must be a number`);
        } else {
          if (propSchema.min !== undefined && numValue < propSchema.min) {
            errors.push(`${propSchema.label} must be at least ${propSchema.min}`);
          }
          if (propSchema.max !== undefined && numValue > propSchema.max) {
            errors.push(`${propSchema.label} must be at most ${propSchema.max}`);
          }
        }
        break;
        
      case 'string':
        if (typeof value !== 'string') {
          errors.push(`${propSchema.label} must be a string`);
        } else if (value.length === 0) {
          warnings.push(`${propSchema.label} is empty`);
        }
        break;
        
      case 'color':
        const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        if (!colorRegex.test(value)) {
          errors.push(`${propSchema.label} must be a valid hex color`);
        }
        break;
        
      case 'boolean':
        if (typeof value !== 'boolean') {
          errors.push(`${propSchema.label} must be a boolean`);
        }
        break;
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

