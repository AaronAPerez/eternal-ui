'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap,
  BarChart3,
  PieChart,
  Settings
} from 'lucide-react';

interface PerformanceDashboardProps {
  monitor: PerformanceMonitor;
  isOpen: boolean;
  onClose: () => void;
}

interface PerformanceReport {
  overview: {
    totalComponents: number;
    averageRenderTime: number;
    slowestComponent: string | null;
    totalAlerts: number;
  };
  componentBreakdown: Array<{
    id: string;
    name: string;
    averageRenderTime: number;
    maxRenderTime: number;
    rerenderCount: number;
    status: 'excellent' | 'good' | 'warning' | 'critical';
  }>;
  alerts: PerformanceAlert[];
  recommendations: PerformanceRecommendation[];
}

interface PerformanceRecommendation {
  id: string;
  component: string;
  type: 'performance' | 'optimization' | 'memory';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  suggestion: string;
  impact: string;
  effort: string;
}

export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  monitor,
  isOpen,
  onClose
}) => {
  const [report, setReport] = useState<PerformanceReport | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'components' | 'alerts' | 'recommendations'>('overview');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      refreshReport();
      
      // Auto-refresh every 5 seconds
      const interval = setInterval(refreshReport, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const refreshReport = async () => {
    setRefreshing(true);
    try {
      const newReport = monitor.generateReport();
      setReport(newReport);
    } catch (error) {
      console.error('Failed to generate performance report:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-indigo-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Performance Dashboard
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Real-time performance monitoring and optimization insights
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={refreshReport}
                disabled={refreshing}
                className="gap-2"
              >
                {refreshing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Activity className="w-4 h-4" />
                )}
                Refresh
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                ×
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 mt-4">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'components', label: 'Components', icon: PieChart },
              { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
              { id: 'recommendations', label: 'Recommendations', icon: Settings }
            ].map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                  {tab.id === 'alerts' && report.alerts.length > 0 && (
                    <Badge variant="danger" className="text-xs">
                      {report.alerts.length}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
                      Components
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {report.overview.totalComponents}
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-900 dark:text-green-300">
                      Avg Render Time
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                    {report.overview.averageRenderTime.toFixed(2)}ms
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-900 dark:text-yellow-300">
                      Slowest Component
                    </span>
                  </div>
                  <div className="text-lg font-bold text-yellow-900 dark:text-yellow-100">
                    {report.overview.slowestComponent || 'None'}
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-medium text-red-900 dark:text-red-300">
                      Active Alerts
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-red-900 dark:text-red-100">
                    {report.overview.totalAlerts}
                  </div>
                </div>
              </div>

              {/* Performance Chart Placeholder */}
              <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Performance Chart
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Real-time performance visualization coming soon
                </p>
              </div>
            </div>
          )}

          {activeTab === 'components' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Component Performance Breakdown
              </h3>
              
              <div className="space-y-2">
                {report.componentBreakdown.map(component => (
                  <div
                    key={component.id}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {component.name}
                        </h4>
                        <Badge className={`text-xs ${getStatusColor(component.status)}`}>
                          {component.status}
                        </Badge>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>Avg: {component.averageRenderTime.toFixed(2)}ms</span>
                        <span>Max: {component.maxRenderTime.toFixed(2)}ms</span>
                        <span>Re-renders: {component.rerenderCount}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {component.status === 'excellent' && <CheckCircle className="w-5 h-5 text-green-600" />}
                      {component.status === 'good' && <Zap className="w-5 h-5 text-blue-600" />}
                      {component.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                      {component.status === 'critical' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Performance Alerts
              </h3>
              
              {report.alerts.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                    No Active Alerts
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    All components are performing within optimal thresholds
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {report.alerts.map(alert => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border-l-4 ${
                        alert.type === 'error' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                        alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                        'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className={`w-5 h-5 ${
                              alert.type === 'error' ? 'text-red-600' :
                              alert.type === 'warning' ? 'text-yellow-600' :
                              'text-blue-600'
                            }`} />
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {alert.component}
                            </h4>
                            <span className="text-sm text-gray-500">
                              {new Date(alert.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {alert.message}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => monitor.resolveAlert(alert.id)}
                        >
                          Resolve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Optimization Recommendations
              </h3>
              
              {report.recommendations.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                    No Recommendations
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Your components are already well optimized!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {report.recommendations.map(rec => (
                    <div
                      key={rec.id}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {rec.title}
                            </h4>
                            <Badge className={`text-xs ${getSeverityColor(rec.severity)}`}>
                              {rec.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Component: {rec.component}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        {rec.description}
                      </p>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-3">
                        <h5 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">
                          Suggestion:
                        </h5>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          {rec.suggestion}
                        </p>
                      </div>
                      
                      <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>Impact: {rec.impact}</span>
                        <span>Effort: {rec.effort}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
