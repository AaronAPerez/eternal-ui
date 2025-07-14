import { render, screen, fireEvent } from '@testing-library/react';
import DarkModeEnhancedGridSystem from '../components/grid/DarkModeEnhancedGridSystem';

describe('GridSystem', () => {
  test('renders grid controls', () => {
    render(<DarkModeEnhancedGridSystem />);
    expect(screen.getByText('Enhanced Grid System')).toBeInTheDocument();
  });

  test('toggles grid visibility', () => {
    render(<DarkModeEnhancedGridSystem />);
    const gridToggle = screen.getByLabelText('Toggle grid visibility');
    fireEvent.click(gridToggle);
    // Assert grid visibility change
  });
});