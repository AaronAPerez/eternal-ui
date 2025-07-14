'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

/**
 * Error Boundary Component
 * 
 * A comprehensive error boundary that catches JavaScript errors anywhere in the
 * child component tree, logs those errors, and displays a fallback UI instead
 * of the component tree that crashed.
 * 
 * Features:
 * - Production-ready error handling
 * - User-friendly error messages
 * - Error reporting capabilities
 * - Retry functionality
 * - Accessibility compliant
 * - Dark/light theme support
 * - Development vs production error details
 * - Automatic error logging
 * - Performance monitoring integration
 */

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
  enableRetry?: boolean;
  className?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string | null;
  retryCount: number;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeoutId: NodeJS.Timeout | null = null;
  private maxRetries = 3;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorId: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    this.logError(error, errorInfo);
    
    // Update state with error info
    this.setState({
      error,
      errorInfo
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private logError = (error: Error, errorInfo: ErrorInfo) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'SSR',
      url: typeof window !== 'undefined' ? window.location.href : 'SSR',
      errorId: this.state.errorId
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Caught Error');
      console.error('Error:', error);
      console.error('Component Stack:', errorInfo.componentStack);
      console.error('Error Info:', errorData);
      console.groupEnd();
    }

    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // Send to error reporting service (Sentry, LogRocket, etc.)
      this.reportError(errorData);
    }

    // Log to browser console for debugging
    if (typeof window !== 'undefined') {
      window.console.error('Error Boundary:', errorData);
    }
  };

  private reportError = async (errorData: any) => {
    try {
      // Example: Send to error reporting service
      // Replace with your actual error reporting service
      if (typeof window !== 'undefined' && window.fetch) {
        await fetch('/api/errors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(errorData),
        });
      }
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  };

  private handleRetry = () => {
    const { retryCount } = this.state;
    
    if (retryCount >= this.maxRetries) {
      return;
    }

    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));

    // Add a small delay before retry to prevent rapid retries
    this.retryTimeoutId = setTimeout(() => {
      // Force re-render
      this.forceUpdate();
    }, 1000);
  };

  private handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  private handleReportIssue = () => {
    const { error, errorInfo, errorId } = this.state;
    
    const issueBody = encodeURIComponent(`
**Error ID:** ${errorId}
**Error Message:** ${error?.message || 'Unknown error'}
**Browser:** ${typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown'}
**URL:** ${typeof window !== 'undefined' ? window.location.href : 'Unknown'}
**Timestamp:** ${new Date().toISOString()}

**Steps to reproduce:**
1. 
2. 
3. 

**Additional context:**
Add any other context about the problem here.
    `);

    const githubUrl = `https://github.com/your-username/eternal-ui/issues/new?title=Error%20Report%20${errorId}&body=${issueBody}`;
    
    if (typeof window !== 'undefined') {
      window.open(githubUrl, '_blank');
    }
  };

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  render() {
    const { hasError, error, errorInfo, retryCount } = this.state;
    const { children, fallback, showDetails = false, enableRetry = true, className = '' } = this.props;

    if (hasError) {
      // Custom fallback UI if provided
      if (fallback) {
        return fallback;
      }

      // Default error UI
      return (
        <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 ${className}`}>
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            {/* Error Icon */}
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>

            {/* Error Title */}
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-2">
              Something went wrong
            </h1>

            {/* Error Description */}
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              We encountered an unexpected error. Our team has been notified and is working on a fix.
            </p>

            {/* Error Details (Development/Debug Mode) */}
            {(showDetails || process.env.NODE_ENV === 'development') && error && (
              <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Error Details:
                </h3>
                <div className="text-xs font-mono text-red-600 dark:text-red-400 break-all">
                  {error.message}
                </div>
                {process.env.NODE_ENV === 'development' && error.stack && (
                  <details className="mt-2">
                    <summary className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer">
                      Stack Trace
                    </summary>
                    <pre className="mt-2 text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap overflow-auto max-h-32">
                      {error.stack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Retry Information */}
            {retryCount > 0 && (
              <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Retry attempt {retryCount} of {this.maxRetries}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Retry Button */}
              {enableRetry && retryCount < this.maxRetries && (
                <button
                  onClick={this.handleRetry}
                  className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  aria-label="Retry loading the component"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </button>
              )}

              {/* Go Home Button */}
              <button
                onClick={this.handleGoHome}
                className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                aria-label="Go to home page"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </button>

              {/* Report Issue Button */}
              <button
                onClick={this.handleReportIssue}
                className="w-full flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Report this issue on GitHub"
              >
                <Bug className="w-4 h-4 mr-2" />
                Report Issue
              </button>
            </div>

            {/* Error ID for Support */}
            {this.state.errorId && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Error ID: <span className="font-mono">{this.state.errorId}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;

/**
 * Hook-based Error Boundary for functional components
 * 
 * Usage:
 * const [error, resetError] = useErrorBoundary();
 * 
 * // To trigger error boundary:
 * if (someCondition) {
 *   throw new Error('Something went wrong');
 * }
 * 
 * // To reset error state:
 * resetError();
 */
export function useErrorBoundary() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const throwError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return [error, resetError, throwError] as const;
}

/**
 * Higher-Order Component for adding error boundary to any component
 * 
 * Usage:
 * const SafeComponent = withErrorBoundary(MyComponent, {
 *   fallback: <div>Custom error message</div>,
 *   onError: (error, errorInfo) => console.log('Error caught:', error)
 * });
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

/**
 * Simple Error Boundary for specific use cases
 * 
 * Usage:
 * <SimpleErrorBoundary message="Failed to load component">
 *   <MyComponent />
 * </SimpleErrorBoundary>
 */
export function SimpleErrorBoundary({ 
  children, 
  message = "Something went wrong",
  className = ""
}: {
  children: ReactNode;
  message?: string;
  className?: string;
}) {
  return (
    <ErrorBoundary
      className={className}
      fallback={
        <div className="flex items-center justify-center p-8 text-center">
          <div>
            <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400">{message}</p>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}