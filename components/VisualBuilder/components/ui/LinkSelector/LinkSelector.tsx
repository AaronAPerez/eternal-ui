import { FileText, ExternalLink, Target, Square, Download } from "lucide-react";
import { useCallback, useState } from "react";
import { generateId } from "../../../lib/utils";

// components/ui/LinkSelector/LinkSelector.tsx
interface LinkSelectorProps {
  currentLink?: LinkConfiguration;
  onLinkChange: (link: LinkConfiguration) => void;
  availablePages: PageDefinition[];
  currentPageId?: string;
}

export const LinkSelector: React.FC<LinkSelectorProps> = ({
  currentLink,
  onLinkChange,
  availablePages,
  currentPageId
}) => {
  const [linkType, setLinkType] = useState<LinkConfiguration['type']>(
    currentLink?.type || 'internal'
  );
  const [selectedPage, setSelectedPage] = useState<string>(
    currentLink?.type === 'internal' ? currentLink.target : ''
  );
  const [externalUrl, setExternalUrl] = useState<string>(
    currentLink?.type === 'external' ? currentLink.target : ''
  );
  const [scrollTarget, setScrollTarget] = useState<string>(
    currentLink?.type === 'scroll' ? currentLink.target : ''
  );

  const linkTypes = [
    { value: 'internal', label: 'Page Link', icon: FileText },
    { value: 'external', label: 'External URL', icon: ExternalLink },
    { value: 'scroll', label: 'Scroll to Section', icon: Target },
    { value: 'modal', label: 'Open Modal', icon: Square },
    { value: 'download', label: 'Download File', icon: Download }
  ];

  const handleLinkUpdate = useCallback(() => {
    let linkConfig: LinkConfiguration;

    switch (linkType) {
      case 'internal':
        const page = availablePages.find(p => p.id === selectedPage);
        linkConfig = {
          id: generateId(),
          type: 'internal',
          target: selectedPage,
          label: page?.name || 'Unknown Page'
        };
        break;
      
      case 'external':
        linkConfig = {
          id: generateId(),
          type: 'external',
          target: externalUrl,
          label: externalUrl,
          openInNewTab: true
        };
        break;
      
      case 'scroll':
        linkConfig = {
          id: generateId(),
          type: 'scroll',
          target: scrollTarget,
          label: `Scroll to ${scrollTarget}`
        };
        break;
      
      default:
        return;
    }

    onLinkChange(linkConfig);
  }, [linkType, selectedPage, externalUrl, scrollTarget, availablePages, onLinkChange]);

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium text-gray-900">Link Configuration</h4>
      
      {/* Link Type Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Link Type
        </label>
        <select
          value={linkType}
          onChange={(e) => setLinkType(e.target.value as LinkConfiguration['type'])}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {linkTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Internal Page Selection */}
      {linkType === 'internal' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Page
          </label>
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a page...</option>
            {availablePages
              .filter(page => page.id !== currentPageId)
              .map(page => (
                <option key={page.id} value={page.id}>
                  {page.name} ({page.slug})
                </option>
              ))
            }
          </select>
        </div>
      )}

      {/* External URL Input */}
      {linkType === 'external' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            External URL
          </label>
          <input
            type="url"
            value={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Scroll Target Selection */}
      {linkType === 'scroll' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section ID
          </label>
          <input
            type="text"
            value={scrollTarget}
            onChange={(e) => setScrollTarget(e.target.value)}
            placeholder="section-id"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter the ID of the section to scroll to
          </p>
        </div>
      )}

      {/* Preview */}
      {currentLink && (
        <div className="p-3 bg-white border border-gray-200 rounded-md">
          <p className="text-sm font-medium text-gray-700 mb-1">Preview:</p>
          <p className="text-sm text-gray-600">
            {currentLink.type} → {currentLink.target}
          </p>
        </div>
      )}

      <button
        onClick={handleLinkUpdate}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Update Link
      </button>
    </div>
  );
};