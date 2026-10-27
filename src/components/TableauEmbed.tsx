import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, RefreshCw, AlertCircle, Maximize2 } from 'lucide-react';

interface TableauEmbedProps {
  id: string;
  src: string;
  title: string;
  toolbar?: 'top' | 'bottom' | 'hidden';
  hideTabs?: boolean;
  minHeight?: string;
  shareUrl?: string;
}

export const TableauEmbed: React.FC<TableauEmbedProps> = ({
  id,
  src,
  title,
  toolbar = 'bottom',
  hideTabs = true,
  minHeight = '850px',
  shareUrl,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [key, setKey] = useState(0);

  const directUrl = shareUrl || src;

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    const container = containerRef.current;
    if (!container) return;

    // Clear previous children
    container.innerHTML = '';

    // Create the <tableau-viz> custom element
    const viz = document.createElement('tableau-viz');
    viz.setAttribute('id', id);
    viz.setAttribute('src', src);
    viz.setAttribute('toolbar', toolbar);
    if (hideTabs) {
      viz.setAttribute('hide-tabs', '');
    }
    viz.style.width = '100%';
    viz.style.minHeight = minHeight;
    viz.style.height = '100%';
    viz.style.border = 'none';

    // Listen to firstinteractive event
    const handleFirstInteractive = () => {
      setIsLoading(false);
    };

    viz.addEventListener('firstinteractive', handleFirstInteractive);
    container.appendChild(viz);

    // Timeout fallback after 6s in case public.tableau.com blocks embedding or takes time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      viz.removeEventListener('firstinteractive', handleFirstInteractive);
      container.innerHTML = '';
    };
  }, [id, src, toolbar, hideTabs, minHeight, key]);

  return (
    <div className="relative w-full border border-[#c6b89f] bg-[#fdfbf7] shadow-[0_4px_30px_-6px_rgba(38,35,33,0.08)]">
      {/* Embed Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#e4dbcc]/50 border-b border-[#c6b89f]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#b69355]"></span>
          <span className="text-xs uppercase tracking-[0.16em] font-medium text-[#262321]">
            Tableau API v3: {title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setKey((k) => k + 1)}
            className="flex items-center gap-1.5 px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#5f5750] hover:text-[#262321] hover:bg-[#e4dbcc]/60 transition-colors"
            title="Reload Visualization"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reload</span>
          </button>

          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 bg-[#262321] text-[#f3eee4] hover:bg-[#302c29] text-xs uppercase tracking-[0.14em] font-medium transition-colors"
          >
            <span>Open in Tableau Public</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#d2b071]" />
          </a>
        </div>
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 top-12 z-10 flex flex-col items-center justify-center bg-[#fdfbf7]/80 backdrop-blur-xs p-6 text-center">
          <div className="w-8 h-8 border-2 border-[#b69355] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="font-serif text-lg text-[#262321]">
            Initializing Tableau Web Component...
          </p>
          <p className="text-xs text-[#5f5750] max-w-sm mt-1">
            Loading Tableau Embedding API v3 asset directly from Tableau Public repository.
          </p>
        </div>
      )}

      {/* Tableau Container */}
      <div
        ref={containerRef}
        className="w-full overflow-hidden transition-opacity duration-300"
        style={{ minHeight }}
      />

      {/* Embed Footer with Direct URL helper */}
      <div className="px-4 py-2.5 bg-[#fdfbf7] border-t border-[#d5cab8] flex flex-wrap items-center justify-between text-[11px] text-[#5f5750] gap-2">
        <div>
          <span>Target Resource: </span>
          <code className="text-[#76591f] bg-[#e4dbcc]/40 px-1 py-0.5 font-mono text-[10px]">
            {src.slice(0, 75)}...
          </code>
        </div>
        <div className="flex items-center gap-1 text-[#76591f]">
          <span>Interactive Zoom &amp; Filtering Enabled</span>
        </div>
      </div>
    </div>
  );
};
