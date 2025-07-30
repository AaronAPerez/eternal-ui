import { renderHook, act, fireEvent } from '@testing-library/react';
import { useDragAndDrop } from '../useDragAndDrop';
import { resetStores, createTestComponent } from '@/test-utils/store-utils';

// Mock canvas element
const mockCanvas = {
  getBoundingClientRect: jest.fn(() => ({
    left: 0,
    top: 0,
    width: 1200,
    height: 800
  }))
};

describe('useDragAndDrop', () => {
  beforeEach(() => {
    resetStores();
    // Mock canvas ref
    jest.spyOn(React, 'useRef').mockReturnValue({ current: mockCanvas });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should handle drag start', () => {
    const { result } = renderHook(() => useDragAndDrop());
    
    const mockEvent = {
      dataTransfer: {
        setData: jest.fn(),
        effectAllowed: '',
        setDragImage: jest.fn()
      },
      currentTarget: {
        cloneNode: jest.fn(() => ({
          style: {}
        }))
      }
    } as any;

    // Mock document.body.appendChild and removeChild
    const appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation();
    const removeChildSpy = jest.spyOn(document.body, 'removeChild').mockImplementation();

    act(() => {
      result.current.handleDragStart(mockEvent, 'text');
    });

    expect(mockEvent.dataTransfer.setData).toHaveBeenCalledWith('componentType', 'text');
    expect(mockEvent.dataTransfer.effectAllowed).toBe('copy');
    expect(appendChildSpy).toHaveBeenCalled();

    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });

  it('should handle component drop', () => {
    const { result } = renderHook(() => useDragAndDrop());
    
    const mockEvent = {
      preventDefault: jest.fn(),
      dataTransfer: {
        getData: jest.fn(() => 'text')
      },
      clientX: 100,
      clientY: 200
    } as any;

    act(() => {
      result.current.handleDrop(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    // Component should be added to store - test this through store state
  });

  it('should handle drag over', () => {
    const { result } = renderHook(() => useDragAndDrop());
    
    const mockEvent = {
      preventDefault: jest.fn(),
      dataTransfer: {
        dropEffect: ''
      }
    } as any;

    act(() => {
      result.current.handleDragOver(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.dataTransfer.dropEffect).toBe('copy');
  });
});
