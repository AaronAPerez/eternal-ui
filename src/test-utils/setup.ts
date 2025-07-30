import '@testing-library/jest-dom';

// Mock performance API for tests
Object.defineProperty(window, 'performance', {
  value: {
    now: jest.fn(() => Date.now()),
    memory: {
      usedJSHeapSize: 1000000,
    },
  },
});
