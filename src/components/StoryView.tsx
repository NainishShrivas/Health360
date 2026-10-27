import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Quote,
  Activity,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Layers
} from 'lucide-react';
import { STORY_CHAPTERS, TABLEAU_CONFIG, AGE_COHORTS, BMI_DATA, HEATMAP_MATRIX } from '../data/healthcareData';
import { TableauEmbed } from './TableauEmbed';

interface StoryViewProps {
  isDedicatedPage?: boolean;
}

export const StoryView: React.FC<StoryViewProps> = ({ isDedicatedPage = false }) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [storyMode, setStoryMode] = useState<'both' | 'embedded' | 'narrative'>('both');

  const currentChapter = STORY_CHAPTERS[activeChapterIndex];

  const handleNext = () => {
    if (activeChapterIndex < STORY_CHAPTERS.length - 1) {
      setActiveChapterIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeChapterIndex > 0) {
      setActiveChapterIndex((prev) => prev - 1);
    }
  };

  return (
    <section id="story" className={`py-12 md:py-20 bg-[#e4dbcc]/20 border-t border-[#d5cab8] ${isDedicatedPage ? 'pt-8' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Margin & Header with Roman Numeral IV */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8">
          <div className="hidden lg:flex lg:col-span-2 flex-col items-end pr-8 border-r border-[#b69355]/40 select-none">
            <span className="font-serif text-3xl font-normal text-[#76591f] tracking-widest">
              IV
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#5f5750] mt-2 text-right">
              Narrative &amp;<br />Epidemiology
            </span>
            <div className="mt-16 w-3 h-px bg-[#b69355]/60"></div>
          </div>

          <div className="lg:col-span-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#76591f]">
                  Clinical Narrative
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#262321] mt-1">
                  Story
                </h2>
                <p className="text-sm sm:text-base text-[#5f5750] mt-2 max-w-2xl">
                  Data story presented in narrative scenes showcasing sequential analytical findings
                </p>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1 p-1 bg-[#e4dbcc]/60 border border-[#c6b89f] rounded-none sm:rounded-md text-xs font-medium">
                <button
                  onClick={() => setStoryMode('both')}
                  className={`px-3 py-1.5 transition-all ${
                    storyMode === 'both'
                      ? 'bg-[#262321] text-[#f3eee4] shadow-xs'
                      : 'text-[#5f5750] hover:text-[#262321]'
                  }`}
                >
                  Dual View
                </button>
                <button
                  onClick={() => setStoryMode('narrative')}
                  className={`px-3 py-1.5 transition-all ${
                    storyMode === 'narrative'
                      ? 'bg-[#262321] text-[#f3eee4] shadow-xs'
                      : 'text-[#5f5750] hover:text-[#262321]'
                  }`}
                >
                  Clinical Reader
                </button>
                <button
                  onClick={() => setStoryMode('embedded')}
                  className={`px-3 py-1.5 transition-all ${
                    storyMode === 'embedded'
                      ? 'bg-[#262321] text-[#f3eee4] shadow-xs'
                      : 'text-[#5f5750] hover:text-[#262321]'
                  }`}
                >
                  Tableau Story Embed
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Tableau Story Embed (shown in 'embedded' or 'both' view) */}
        {(storyMode === 'embedded' || storyMode === 'both') && (
          <div className="mb-14">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.18em] font-semibold text-[#76591f]">
                  Live Story Embed
                </span>
                <span className="text-xs text-[#5f5750]">
                  · Shared Story H49YQ3N5D
                </span>
              </div>
            </div>

            <TableauEmbed
              id="tableauStory"
              src={TABLEAU_CONFIG.storyUrl}
              title="Tableau Healthcare Story Presentation"
              toolbar="bottom"
              hideTabs={false}
              minHeight="850px"
              shareUrl={TABLEAU_CONFIG.storyUrl}
            />
          </div>
        )}

        {/* High-Fidelity Narrative Reader (shown in 'narrative' or 'both' view) */}
        {(storyMode === 'narrative' || storyMode === 'both') && (
          <div className="space-y-6">
            
            {/* Story Navigation Timeline Bar */}
            <div className="bg-[#fdfbf7] p-4 sm:p-5 border border-[#c6b89f] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                {STORY_CHAPTERS.map((chap, idx) => (
                  <button
                    key={chap.id}
                    onClick={() => setActiveChapterIndex(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-serif transition-all ${
                      idx === activeChapterIndex
                        ? 'bg-[#262321] text-[#f3eee4] font-medium shadow-xs'
                        : 'text-[#5f5750] hover:text-[#262321] bg-[#e4dbcc]/40'
                    }`}
                  >
                    <span className="text-[#d2b071] font-sans font-semibold text-[11px]">
                      {chap.romanNumeral}.
                    </span>
                    <span className="hidden md:inline truncate max-w-[140px]">
                      {chap.title}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={activeChapterIndex === 0}
                  className="p-2 border border-[#c6b89f] bg-[#f3eee4] text-[#262321] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#e4dbcc] transition-colors"
                  aria-label="Previous Chapter"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-[#5f5750] px-2 tabular-nums">
                  {activeChapterIndex + 1} / {STORY_CHAPTERS.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={activeChapterIndex === STORY_CHAPTERS.length - 1}
                  className="p-2 border border-[#c6b89f] bg-[#f3eee4] text-[#262321] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#e4dbcc] transition-colors"
                  aria-label="Next Chapter"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Chapter Card */}
            <div className="bg-[#fdfbf7] border border-[#c6b89f] p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_-4px_rgba(38,35,33,0.06)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-1 bg-[#b69355]"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Chapter Left Column: Narrative Prose */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Investigator & Chapter Header */}
                  <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#76591f] font-semibold mb-1">
                      <span>Scene {currentChapter.romanNumeral}</span>
                      <span>·</span>
                      <span>Lead: {currentChapter.leadInvestigator} ({currentChapter.role})</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#262321] font-normal leading-tight">
                      {currentChapter.title}
                    </h3>

                    <p className="text-sm font-medium text-[#76591f] mt-1 italic font-serif">
                      {currentChapter.subtitle}
                    </p>
                  </div>

                  {/* Key Finding Highlight */}
                  <div className="p-4 bg-[#e4dbcc]/30 border-l-2 border-[#b69355] text-sm text-[#262321]">
                    <div className="flex items-start gap-2.5">
                      <Quote className="w-4 h-4 text-[#76591f] shrink-0 mt-0.5" />
                      <p className="font-medium">
                        {currentChapter.keyFinding}
                      </p>
                    </div>
                  </div>

                  {/* Detailed Analysis */}
                  <div className="text-sm sm:text-base text-[#5f5750] leading-relaxed space-y-3">
                    <p>{currentChapter.detailedAnalysis}</p>
                  </div>

                  {/* Clinical Impact */}
                  <div className="pt-4 border-t border-[#d5cab8]">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#76591f] block mb-1">
                      Clinical Action Protocol
                    </span>
                    <p className="text-xs sm:text-sm text-[#262321]">
                      {currentChapter.clinicalImpact}
                    </p>
                  </div>

                </div>

                {/* Chapter Right Column: Synchronized Visual Data Asset */}
                <div className="lg:col-span-5 bg-[#e4dbcc]/40 p-6 border border-[#c6b89f]/80 space-y-6">
                  
                  {/* Focal Metric Counter */}
                  <div className="bg-[#fdfbf7] p-5 border border-[#c6b89f] text-center">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#76591f] font-semibold">
                      {currentChapter.metricLabel}
                    </span>
                    <div className="font-serif text-3xl sm:text-4xl text-[#262321] my-1 tabular-nums">
                      {currentChapter.metricValue}
                    </div>
                    <div className="text-xs text-[#5f5750]">
                      {currentChapter.metricComparison}
                    </div>
                  </div>

                  {/* Contextual Visual representation based on chapter */}
                  {currentChapter.chartHighlight === 'hypertension' && (
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-[#5f5750] font-semibold block">
                        Systolic Baseline Bounds
                      </span>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span>Old (&gt; 70)</span>
                          <span className="font-mono font-semibold">135.67 mmHg</span>
                        </div>
                        <div className="w-full bg-[#fdfbf7] h-2">
                          <div className="bg-[#b69355] h-full" style={{ width: '99%' }}></div>
                        </div>

                        <div className="flex justify-between">
                          <span>Young Adult (31-40)</span>
                          <span className="font-mono font-semibold">134.67 mmHg</span>
                        </div>
                        <div className="w-full bg-[#fdfbf7] h-2">
                          <div className="bg-[#b69355] h-full" style={{ width: '98%' }}></div>
                        </div>

                        <div className="flex justify-between">
                          <span>Teenager (18-30)</span>
                          <span className="font-mono font-semibold">134.50 mmHg</span>
                        </div>
                        <div className="w-full bg-[#fdfbf7] h-2">
                          <div className="bg-[#b69355] h-full" style={{ width: '97.8%' }}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentChapter.chartHighlight === 'toxins' && (
                    <div className="space-y-2 text-xs">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-[#5f5750] font-semibold block">
                        Substance Exposure Peak
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-3 bg-[#fdfbf7] border border-[#c6b89f]">
                          <div className="font-serif text-2xl text-[#262321]">514</div>
                          <div className="text-[11px] text-[#5f5750]">Teen Alcohol Cases</div>
                        </div>
                        <div className="p-3 bg-[#fdfbf7] border border-[#c6b89f]">
                          <div className="font-serif text-2xl text-[#262321]">526</div>
                          <div className="text-[11px] text-[#5f5750]">Teen Tobacco Cases</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentChapter.chartHighlight === 'exercise' && (
                    <div className="space-y-2 text-xs">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-[#5f5750] font-semibold block">
                        Protective Buffer (Obese Cohort)
                      </span>
                      <div className="p-3 bg-[#fdfbf7] border border-[#c6b89f] space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Sedentary Risk</span>
                          <span className="font-mono font-bold text-[#76591f]">42.86%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Active Regimen</span>
                          <span className="font-mono font-bold text-[#b69355]">37.68%</span>
                        </div>
                        <div className="w-full bg-[#e4dbcc] h-2 relative overflow-hidden">
                          <div className="bg-[#b69355] h-full" style={{ width: '88%' }}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentChapter.chartHighlight === 'metabolic' && (
                    <div className="space-y-2 text-xs">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-[#5f5750] font-semibold block">
                        Obesity Co-morbidity Surge
                      </span>
                      <div className="p-3 bg-[#fdfbf7] border border-[#c6b89f] space-y-1.5">
                        <div className="flex justify-between">
                          <span>Heart Disease (Obese)</span>
                          <span className="font-mono font-bold">39.98%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Diabetes (Obese)</span>
                          <span className="font-mono font-bold">41.50%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentChapter.chartHighlight === 'fatigue' && (
                    <div className="space-y-2 text-xs">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-[#5f5750] font-semibold block">
                        Sentinel Warning Indicator
                      </span>
                      <div className="p-3 bg-[#fdfbf7] border border-[#c6b89f] text-center">
                        <div className="font-serif text-2xl text-[#262321]">2,530 / 5,000</div>
                        <div className="text-[11px] text-[#5f5750]">Patients reporting chronic fatigue</div>
                      </div>
                    </div>
                  )}

                  {/* Stepper Buttons */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={handlePrev}
                      disabled={activeChapterIndex === 0}
                      className="px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-[#5f5750] hover:text-[#262321] disabled:opacity-30"
                    >
                      &larr; Previous Scene
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={activeChapterIndex === STORY_CHAPTERS.length - 1}
                      className="px-4 py-1.5 bg-[#262321] text-[#f3eee4] hover:bg-[#302c29] text-xs uppercase tracking-[0.14em] font-medium disabled:opacity-30"
                    >
                      Next Scene &rarr;
                    </button>
                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
