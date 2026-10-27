import React from 'react';
import { Activity, Shield, ExternalLink, Heart } from 'lucide-react';
import { TABLEAU_CONFIG } from '../data/healthcareData';

interface FooterSectionProps {
  onGoToSection: (sectionId: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onGoToSection }) => {
  return (
    <footer className="bg-[#262321] text-[#f3eee4] border-t border-[#b69355]/50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#46403a]">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#302c29] flex items-center justify-center text-[#d2b071] border border-[#b69355]/40">
                <Activity className="w-4 h-4 text-[#d2b071]" />
              </div>
              <span className="font-serif text-2xl font-normal tracking-tight text-[#f3eee4]">
                Health360 Analytics
              </span>
            </div>
            
            <p className="text-sm text-[#c6bdb0] leading-relaxed max-w-sm">
              Comprehensive Healthcare Risk &amp; Disease Analytics system converting complex biometric records into actionable, interactive web intelligence to support early clinical intervention.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#d2b071]">
              <Shield className="w-3.5 h-3.5" />
              <span>Tableau Embedding API v3 Standard · N = 5,000 Cohort</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#d2b071] block">
              Analytical Modules
            </span>
            <ul className="space-y-2 text-xs uppercase tracking-[0.14em] text-[#c6bdb0]">
              <li>
                <button
                  onClick={() => onGoToSection('home')}
                  className="hover:text-[#f3eee4] transition-colors"
                >
                  Overview (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onGoToSection('about')}
                  className="hover:text-[#f3eee4] transition-colors"
                >
                  Project &amp; Methodology
                </button>
              </li>
              <li>
                <button
                  onClick={() => onGoToSection('dashboard')}
                  className="hover:text-[#f3eee4] transition-colors"
                >
                  Interactive Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onGoToSection('story')}
                  className="hover:text-[#f3eee4] transition-colors"
                >
                  Epidemiological Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onGoToSection('faq')}
                  className="hover:text-[#f3eee4] transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* External Tableau Resources */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#d2b071] block">
              Tableau Public Endpoints
            </span>
            <div className="space-y-2.5">
              <a
                href={TABLEAU_CONFIG.dashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-[#302c29] border border-[#46403a] hover:border-[#b69355] text-xs text-[#f3eee4] transition-all group"
              >
                <div>
                  <div className="font-medium">Tableau Dashboard Endpoint</div>
                  <div className="text-[10px] text-[#c6bdb0] mt-0.5 truncate max-w-[220px]">
                    SmartHealthcareRiskDiseaseDashboard_
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#d2b071] group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={TABLEAU_CONFIG.storyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-[#302c29] border border-[#46403a] hover:border-[#b69355] text-xs text-[#f3eee4] transition-all group"
              >
                <div>
                  <div className="font-medium">Tableau Story Endpoint</div>
                  <div className="text-[10px] text-[#c6bdb0] mt-0.5">
                    H49YQ3N5D Story Presentation
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#d2b071] group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#c6bdb0] gap-4">
          <p>
            &copy; 2026 Health360 Smart Healthcare Analytics. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Standard HIPAA/GDPR Compliant</span>
            <span>·</span>
            <span>Tableau v3 API Integration</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
