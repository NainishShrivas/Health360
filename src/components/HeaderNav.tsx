import React from 'react';
import { Activity, LayoutDashboard, BookOpen, Info, HelpCircle } from 'lucide-react';

export type PageViewMode = 'all' | 'dashboard' | 'story';

interface HeaderNavProps {
  activeSection: string;
  onNavigate: (sectionId: string, pageMode?: PageViewMode) => void;
  pageMode: PageViewMode;
  setPageMode: (mode: PageViewMode) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeSection,
  onNavigate,
  pageMode,
  setPageMode,
}) => {
  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 w-full max-w-5xl mx-auto">
      <div className="bg-[#fdfbf7]/90 backdrop-blur-md border border-[#c6b89f]/60 rounded-full py-2.5 px-4 sm:px-6 flex items-center justify-between shadow-[0_10px_30px_-10px_rgba(38,35,33,0.12)] transition-all">
        {/* Brand Zone */}
        <button
          onClick={() => {
            setPageMode('all');
            onNavigate('home');
          }}
          className="flex items-center gap-2.5 text-left group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b69355]"
          aria-label="Health360 Home"
        >
          <div className="w-8 h-8 rounded-full bg-[#262321] flex items-center justify-center text-[#d2b071] border border-[#b69355]/40 group-hover:scale-105 transition-transform">
            <Activity className="w-4 h-4 text-[#d2b071]" />
          </div>
          <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-[#262321] whitespace-nowrap">
            Health360
          </span>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-xs uppercase tracking-[0.16em] font-medium text-[#5f5750]">
          <button
            onClick={() => {
              setPageMode('all');
              onNavigate('home');
            }}
            className={`px-3 py-1.5 rounded-full transition-all ${
              activeSection === 'home' && pageMode === 'all'
                ? 'text-[#262321] font-semibold bg-[#e4dbcc]/60'
                : 'hover:text-[#262321] hover:bg-[#e4dbcc]/30'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => {
              setPageMode('all');
              onNavigate('about');
            }}
            className={`px-3 py-1.5 rounded-full transition-all ${
              activeSection === 'about' && pageMode === 'all'
                ? 'text-[#262321] font-semibold bg-[#e4dbcc]/60'
                : 'hover:text-[#262321] hover:bg-[#e4dbcc]/30'
            }`}
          >
            About
          </button>

          <button
            onClick={() => {
              setPageMode('dashboard');
              onNavigate('dashboard', 'dashboard');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
              pageMode === 'dashboard' || activeSection === 'dashboard'
                ? 'bg-[#262321] text-[#f3eee4] shadow-sm font-semibold'
                : 'hover:text-[#262321] hover:bg-[#e4dbcc]/40'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#d2b071]" />
            Dashboard
          </button>

          <button
            onClick={() => {
              setPageMode('story');
              onNavigate('story', 'story');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
              pageMode === 'story' || activeSection === 'story'
                ? 'bg-[#262321] text-[#f3eee4] shadow-sm font-semibold'
                : 'hover:text-[#262321] hover:bg-[#e4dbcc]/40'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#d2b071]" />
            Story
          </button>

          <button
            onClick={() => {
              setPageMode('all');
              onNavigate('faq');
            }}
            className={`px-3 py-1.5 rounded-full transition-all ${
              activeSection === 'faq' && pageMode === 'all'
                ? 'text-[#262321] font-semibold bg-[#e4dbcc]/60'
                : 'hover:text-[#262321] hover:bg-[#e4dbcc]/30'
            }`}
          >
            FAQ
          </button>
        </nav>

        {/* Action / View Switcher */}
        <div className="flex items-center gap-2">
          {pageMode !== 'all' ? (
            <button
              onClick={() => setPageMode('all')}
              className="text-xs uppercase tracking-[0.14em] font-medium text-[#76591f] hover:text-[#262321] underline underline-offset-4 decoration-[#b69355] transition-colors"
            >
              Full Portal
            </button>
          ) : (
            <button
              onClick={() => {
                setPageMode('dashboard');
                onNavigate('dashboard', 'dashboard');
              }}
              className="bg-[#262321] hover:bg-[#302c29] text-[#f3eee4] text-xs uppercase tracking-[0.16em] px-4 py-2 rounded-full transition-all border border-[#b69355]/30 shadow-sm"
            >
              Explore Dashboard
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
