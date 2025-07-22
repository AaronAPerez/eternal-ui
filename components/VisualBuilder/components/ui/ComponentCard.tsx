export function ComponentCard({ component }: { component: any }) {
  return (
    <div className="group relative bg-background-secondary border border-border-primary rounded-lg p-4 hover:border-border-secondary hover:shadow-md transition-all cursor-pointer">
      {/* Component icon */}
      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mb-3">
        <component.icon className="w-6 h-6 text-white" />
      </div>
      
      {/* Component info */}
      <h3 className="font-semibold text-text-primary group-hover:text-primary-600 transition-colors">
        {component.name}
      </h3>
      <p className="text-sm text-text-secondary mt-1 line-clamp-2">
        {component.description}
      </p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-3">
        {component.tags.slice(0, 2).map((tag: string) => (
          <span key={tag} className="px-2 py-1 text-xs bg-background-tertiary text-text-tertiary rounded-md">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}