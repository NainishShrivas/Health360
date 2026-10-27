import React from 'react';
import { LayoutDashboard, BookOpen, ArrowRight, Activity, ShieldCheck, Database } from 'lucide-react';

interface HeroSectionProps {
  onGoToDashboard: () => void;
  onGoToStory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGoToDashboard,
  onGoToStory,
}) => {
  return (
    <section id="home" className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* 12-Column Grid Container with Luxury Spine */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
          
          {/* Columns 1-2: Architectural Margin with Roman Numeral I & Vertical Gold Rule */}
          <div className="hidden lg:flex lg:col-span-2 flex-col items-end pr-8 border-r border-[#b69355]/40 select-none">
            <span className="font-serif text-3xl font-normal text-[#76591f] tracking-widest">
              I
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#5f5750] mt-2 text-right">
              Introduction &<br />Population
            </span>
            <div className="mt-16 w-3 h-px bg-[#b69355]/60"></div>
          </div>

          {/* Columns 3-12: Main Hero Content */}
          <div className="lg:col-span-10 flex flex-col justify-center">
            
            {/* Clinical kicker */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#76591f]">
                Epidemiological Intelligence
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#b69355]"></span>
              <span className="text-xs uppercase tracking-[0.16em] text-[#5f5750]">
                Tableau Public Embedded Suite
              </span>
            </div>

            {/* Headline (EB Garamond) */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#262321] tracking-tight leading-[1.05] max-w-4xl text-balance">
              Smart Healthcare &amp; <span className="italic font-normal">Risk Factor</span> Analysis
            </h1>

            {/* Sub-headline (Instrument Sans) */}
            <p className="mt-6 text-base sm:text-lg md:text-xl text-[#5f5750] leading-relaxed max-w-3xl">
              Leveraging data analytics and interactive visualizations to uncover patient risk patterns, lifestyle factors, and healthcare outcomes — empowering smarter clinical decisions.
            </p>

            {/* Dual Call-to-Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
              <button
                onClick={onGoToDashboard}
                className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-full bg-[#262321] text-[#f3eee4] hover:bg-[#302c29] text-xs uppercase tracking-[0.18em] font-medium border border-[#b69355]/40 shadow-sm transition-all luxury-btn-press focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b69355]"
              >
                <LayoutDashboard className="w-4 h-4 text-[#d2b071]" />
                <span>View Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#d2b071]" />
              </button>

              <button
                onClick={onGoToStory}
                className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-full bg-[#e4dbcc]/60 hover:bg-[#e4dbcc] text-[#262321] text-xs uppercase tracking-[0.18em] font-medium border border-[#c6b89f] transition-all luxury-btn-press focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b69355]"
              >
                <BookOpen className="w-4 h-4 text-[#76591f]" />
                <span>Explore Story</span>
              </button>
            </div>

            {/* Key Metrics Summary Counter Bar (3 Columns) */}
            <div className="mt-12 sm:mt-16 pt-8 border-t border-[#d5cab8]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                
                {/* Metric Card 1 */}
                <div className="bg-[#fdfbf7] p-5 sm:p-6 border border-[#c6b89f]/60 shadow-[0_4px_20px_-4px_rgba(38,35,33,0.05)] relative group hover:border-[#b69355] transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#76591f] font-medium">
                      Cohort Size
                    </span>
                    <Database className="w-4 h-4 text-[#b69355]/70" />
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl font-normal text-[#262321] tabular-nums">
                    10K+
                  </div>
                  <div className="text-xs uppercase tracking-[0.14em] text-[#5f5750] mt-1">
                    Patient Records Analyzed
                  </div>
                </div>

                {/* Metric Card 2 */}
                <div className="bg-[#fdfbf7] p-5 sm:p-6 border border-[#c6b89f]/60 shadow-[0_4px_20px_-4px_rgba(38,35,33,0.05)] relative group hover:border-[#b69355] transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#76591f] font-medium">
                      Multivariate Scope
                    </span>
                    <ShieldCheck className="w-4 h-4 text-[#b69355]/70" />
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl font-normal text-[#262321] tabular-nums">
                    15+
                  </div>
                  <div className="text-xs uppercase tracking-[0.14em] text-[#5f5750] mt-1">
                    Risk Factors Identified
                  </div>
                </div>

                {/* Metric Card 3 */}
                <div className="bg-[#fdfbf7] p-5 sm:p-6 border border-[#c6b89f]/60 shadow-[0_4px_20px_-4px_rgba(38,35,33,0.05)] relative group hover:border-[#b69355] transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#76591f] font-medium">
                      Analytics Deployment
                    </span>
                    <Activity className="w-4 h-4 text-[#b69355]/70" />
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl font-normal text-[#262321] tabular-nums">
                    1
                  </div>
                  <div className="text-xs uppercase tracking-[0.14em] text-[#5f5750] mt-1">
                    Interactive Dashboards
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
