import { AlertCircle, RotateCcw, Info } from "lucide-react";
import React from "react";

// Error boundary for component previews
export class ComponentPreviewErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component preview error:', error, errorInfo);
    
    // Send error to monitoring service
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        contexts: {
          errorInfo,
          component: 'ComponentPreviewErrorBoundary'
        }
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center h-64 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-red-800 font-medium mb-2">Component Error</h3>
              <p className="text-red-600 text-sm mb-4">
                There was an error rendering this component preview. This might be due to missing props or invalid configuration.
              </p>
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => this.setState({ hasError: false })}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 inline mr-1" />
                  Retry
                </button>
                <button
                  onClick={() => console.log('Error details:', this.state.error)}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
                >
                  <Info className="w-4 h-4 inline mr-1" />
                  Details
                </button>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
