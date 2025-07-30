import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Star, Download, Eye, Heart, Zap } from 'lucide-react';
import { useTemplateEngine } from '@/hooks/templates/useTemplateEngine';
import { Template, INDUSTRY_TEMPLATES } from '@/services/templates/advancedTemplateEngine';
import { cn } from '@/lib/utils';

interface TemplateMarketplaceProps {
  onTemplateSelect?: (template: Template) => void;
  onTemplateApply?: (template: Template) => void;
  className?: string;
}

export const TemplateMarketplace: React.FC<TemplateMarketplaceProps> = ({
  onTemplateSelect,
  onTemplateApply,
  className,
}) => {
  const {
    templates,
    isGenerating,
    progress,
    currentStep,
    searchTemplates,
    applyTemplate,
    getAnalytics,
    generateMarketplaceTemplates,
    templateCount,
  } = useTemplateEngine({
    autoGenerateMarketplace: true,
    cacheTemplates: true,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    industry: '',
    style: '',
    complexity: '',
    featured: false,
    trending: false,
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'rating' | 'downloads' | 'newest'>('rating');

  // Filter and search templates
  const filteredTemplates = useMemo(() => {
    let filtered = templates;

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(template =>
        template.metadata.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.metadata.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.metadata.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply filters
    if (selectedFilters.industry) {
      filtered = filtered.filter(t => t.metadata.industry === selectedFilters.industry);
    }
    if (selectedFilters.style) {
      filtered = filtered.filter(t => t.metadata.style === selectedFilters.style);
    }
    if (selectedFilters.complexity) {
      filtered = filtered.filter(t => t.metadata.complexity === selectedFilters.complexity);
    }
    if (selectedFilters.featured) {
      filtered = filtered.filter(t => t.metadata.featured);
    }
    if (selectedFilters.trending) {
      filtered = filtered.filter(t => t.metadata.trending);
    }

    // Sort templates
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.metadata.rating - a.metadata.rating);
        break;
      case 'downloads':
        filtered.sort((a, b) => b.metadata.downloads - a.metadata.downloads);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.metadata.created).getTime() - new Date(a.metadata.created).getTime());
        break;
    }

    return filtered;
  }, [templates, searchQuery, selectedFilters, sortBy]);

  const handleTemplateSelect = (template: Template) => {
    onTemplateSelect?.(template);
  };

  const handleTemplateApply = async (template: Template) => {
    await applyTemplate(template);
    onTemplateApply?.(template);
  };

  const analytics = getAnalytics();

  return (
    <div className={cn('bg-white rounded-lg shadow-lg border border-gray-200', className)}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Template Marketplace</h2>
            <p className="text-gray-600">
              {templateCount.toLocaleString()} professional templates • Average rating: {analytics?.averageRating?.toFixed(1) || 'N/A'}
            </p>
          </div>
          
          {isGenerating && (
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">{currentStep}</div>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={selectedFilters.industry}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, industry: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Industries</option>
              {Object.entries(INDUSTRY_TEMPLATES).map(([key, industry]) => (
                <option key={key} value={industry.name}>{industry.name}</option>
              ))}
            </select>

            <select
              value={selectedFilters.style}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, style: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Styles</option>
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="minimal">Minimal</option>
              <option value="bold">Bold</option>
              <option value="elegant">Elegant</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="rating">Top Rated</option>
              <option value="downloads">Most Downloaded</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => setSelectedFilters(prev => ({ ...prev, featured: !prev.featured }))}
            className={cn(
              'px-3 py-1 rounded-full text-sm transition-colors',
              selectedFilters.featured
                ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            <Star className="w-4 h-4 inline mr-1" />
            Featured
          </button>
          
          <button
            onClick={() => setSelectedFilters(prev => ({ ...prev, trending: !prev.trending }))}
            className={cn(
              'px-3 py-1 rounded-full text-sm transition-colors',
              selectedFilters.trending
                ? 'bg-orange-100 text-orange-800 border border-orange-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            <Zap className="w-4 h-4 inline mr-1" />
            Trending
          </button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="p-6">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            {templates.length === 0 && (
              <button
                onClick={() => generateMarketplaceTemplates(50)}
                disabled={isGenerating}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isGenerating ? 'Generating...' : 'Generate Templates'}
              </button>
            )}
          </div>
        ) : (
          <div className={cn(
            'grid gap-6',
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          )}>
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.metadata.id}
                template={template}
                viewMode={viewMode}
                onSelect={() => handleTemplateSelect(template)}
                onApply={() => handleTemplateApply(template)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * 🃏 TEMPLATE CARD COMPONENT
 */
interface TemplateCardProps {
  template: Template;
  viewMode: 'grid' | 'list';
  onSelect: () => void;
  onApply: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  viewMode,
  onSelect,
  onApply,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        'bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-gray-300 cursor-pointer',
        viewMode === 'list' && 'flex'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
    >
      {/* Preview Image */}
      <div className={cn(
        'relative bg-gradient-to-br from-blue-50 to-purple-50',
        viewMode === 'grid' ? 'h-48' : 'w-48 h-32'
      )}>
        {/* Template Preview Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-lg shadow-sm mb-2 mx-auto flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
            </div>
            <div className="text-xs text-gray-500">{template.metadata.industry}</div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {template.metadata.featured && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
              Featured
            </span>
          )}
          {template.metadata.trending && (
            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
              Trending
            </span>
          )}
        </div>

        {/* Hover Actions */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              className="px-3 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 flex items-center gap-1"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onApply();
              }}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1"
            >
              <Download className="w-4 h-4" />
              Use
            </button>
          </div>
        )}
      </div>

      {/* Template Info */}
      <div className="p-4 flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-1">
            {template.metadata.name}
          </h3>
          <button className="p-1 hover:bg-gray-100 rounded">
            <Heart className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {template.metadata.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span>{template.metadata.rating.toFixed(1)}</span>
            <span>({template.metadata.reviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            <span>{template.metadata.downloads.toLocaleString()}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {template.metadata.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {template.metadata.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{template.metadata.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateMarketplace;