/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HeaderNav, PageViewMode } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { DashboardView } from './components/DashboardView';
import { StoryView } from './components/StoryView';
import { FaqSection } from './components/FaqSection';
import { FooterSection } from './components/FooterSection';
import { LayoutDashboard, BookOpen, Home, ChevronRight } from 'lucide-react';

export default function App() {
  const [pageMode, setPageMode] = useState<PageViewMode>('all');
  const [activeSection, setActiveSection] = useState<string>('home');

  // Handle URL hash changes or internal navigations
  const handleNavigate = (sectionId: string, targetMode?: PageViewMode) => {
    if (targetMode) {
      setPageMode(targetMode);
    }
    setActiveSection(sectionId);

    // Scroll smoothly to target element if in 'all' mode
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  // Synchronize active section based on scroll position in 'all' mode
  useEffect(() => {
    if (pageMode !== 'all') return;

    const sections = ['home', 'about', 'dashboard', 'story', 'faq'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageMode]);

  return (
    <div className="min-h-screen bg-[#f3eee4] text-[#262321] selection:bg-[#b69355]/30 flex flex-col font-sans">
      
      {/* Floating Pill Navigation Bar */}
      <HeaderNav
        activeSection={activeSection}
        onNavigate={handleNavigate}
        pageMode={pageMode}
        setPageMode={setPageMode}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {pageMode === 'all' && (
          <>
            <HeroSection
              onGoToDashboard={() => handleNavigate('dashboard', 'all')}
              onGoToStory={() => handleNavigate('story', 'all')}
            />
            <AboutSection />
            <DashboardView />
            <StoryView />
            <FaqSection />
          </>
        )}

        {pageMode === 'dashboard' && (
          <div className="pt-4">
            {/* Dedicated Page Breadcrumb Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#5f5750]">
                <button
                  onClick={() => setPageMode('all')}
                  className="hover:text-[#262321] transition-colors flex items-center gap-1"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Portal</span>
                </button>
                <ChevronRight className="w-3 h-3 text-[#b69355]" />
                <span className="text-[#76591f] font-semibold flex items-center gap-1">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Clinical Dashboard Workstation</span>
                </span>
              </div>
            </div>

            <DashboardView isDedicatedPage={true} />
          </div>
        )}

        {pageMode === 'story' && (
          <div className="pt-4">
            {/* Dedicated Page Breadcrumb Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#5f5750]">
                <button
                  onClick={() => setPageMode('all')}
                  className="hover:text-[#262321] transition-colors flex items-center gap-1"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Portal</span>
                </button>
                <ChevronRight className="w-3 h-3 text-[#b69355]" />
                <span className="text-[#76591f] font-semibold flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Epidemiological Story Narrative</span>
                </span>
              </div>
            </div>

            <StoryView isDedicatedPage={true} />
          </div>
        )}
      </main>

      {/* Luxury Footer */}
      <FooterSection onGoToSection={(sec) => handleNavigate(sec, 'all')} />

    </div>
  );
}
