import { componentRegistry } from "../ComponentLibrary/ComponentLibrary";


describe('Enhanced Component Registry', () => {
  it('should load 120+ components', () => {
    const components = componentRegistry.getAllComponents();
    expect(components.length).toBeGreaterThanOrEqual(120);
  });

  it('should maintain your existing components', () => {
    const heroSection = componentRegistry.getComponent('hero-section');
    expect(heroSection).toBeDefined();
    expect(heroSection?.name).toBe('Hero Section');
  });
});