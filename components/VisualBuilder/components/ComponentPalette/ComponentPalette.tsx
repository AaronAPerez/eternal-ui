import { componentRegistry } from '@/lib/enhanced-component-registry';

export function ComponentPalette() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredComponents = useMemo(() => {
    if (searchQuery) {
      return componentRegistry.searchComponents(searchQuery);
    }
    return componentRegistry.getComponentsByCategory(selectedCategory);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="component-palette">
      {/* Your existing UI with enhanced filtering */}
      {filteredComponents.map(component => (
        <ComponentCard key={component.id} component={component} />
      ))}
    </div>
  );
}