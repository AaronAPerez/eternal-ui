import { useState } from 'react';
import DarkModeEnhancedGridSystem from './grid/DarkModeEnhancedGridSystem';

const Dashboard = () => {
  const [showBuilder, setShowBuilder] = useState(false);

  return (
    <div className="dashboard">
      <nav>
        <button onClick={() => setShowBuilder(!showBuilder)}>
          Toggle Grid Builder
        </button>
      </nav>
      
      {showBuilder && (
        <div className="grid-builder-container">
          <DarkModeEnhancedGridSystem />
        </div>
      )}
    </div>
  );
};