import React from 'react';
import { Database, BarChart3, Stethoscope, Compass, Layers, Target } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const metadataItems = [
    {
      label: 'Domain',
      value: 'Healthcare Analytics',
      icon: Stethoscope,
      detail: 'Epidemiological risk stratification and clinical outcome triage'
    },
    {
      label: 'Tool',
      value: 'Tableau Public',
      icon: BarChart3,
      detail: 'Embedding API v3 web components & dynamic interactive views'
    },
    {
      label: 'Dataset',
      value: 'Patient Health Records',
      icon: Database,
      detail: 'N = 5,000 standardized records across 17 physiological attributes'
    },
    {
      label: 'Focus Areas',
      value: 'Risk Factors & Lifestyle',
      icon: Compass,
      detail: 'BMI, blood pressure, tobacco, alcohol, and physical activity'
    },
    {
      label: 'Visualizations',
      value: 'Dashboard & Story',
      icon: Layers,
      detail: 'Operational executive dashboard + sequential narrative scenes'
    },
    {
      label: 'Objective',
      value: 'Predictive Health Insights',
      icon: Target,
      detail: 'Empower clinicians and researchers with preventative foresight'
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-[#e4dbcc]/30 border-y border-[#d5cab8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Columns 1-2: Margin with Roman Numeral II */}
          <div className="hidden lg:flex lg:col-span-2 flex-col items-end pr-8 border-r border-[#b69355]/40 select-none">
            <span className="font-serif text-3xl font-normal text-[#76591f] tracking-widest">
              II
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#5f5750] mt-2 text-right">
              Project &<br />Methodology
            </span>
            <div className="mt-16 w-3 h-px bg-[#b69355]/60"></div>
          </div>

          {/* Columns 3-12: Content */}
          <div className="lg:col-span-10">
            
            {/* Section Header */}
            <div className="text-center sm:text-left mb-10">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#76591f]">
                Overview &amp; Architecture
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#262321] mt-2">
                About
              </h2>
              <p className="text-sm sm:text-base text-[#5f5750] mt-2 max-w-2xl">
                Understanding the data behind patient health risks, lifestyle choices, and clinical outcomes
              </p>
            </div>

            {/* Subsection Card with Description */}
            <div className="bg-[#fdfbf7] p-6 sm:p-8 md:p-10 border border-[#c6b89f] shadow-[0_4px_24px_-4px_rgba(38,35,33,0.06)] relative">
              <div className="absolute top-0 left-0 w-24 h-0.5 bg-[#b69355]"></div>
              
              <span className="text-xs uppercase tracking-[0.18em] font-medium text-[#76591f]">
                About This Project
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#262321] mt-1 mb-4">
                Smart Healthcare &amp; Risk Factor Analysis
              </h3>
              
              <p className="text-sm sm:text-base text-[#5f5750] leading-relaxed">
                This project explores a comprehensive healthcare dataset to identify key risk factors associated with patient outcomes. Using Tableau for interactive visualization, we analyze how lifestyle habits, demographics, and medical history contribute to health risks such as heart disease, diabetes, and hypertension. The analysis covers patient data across multiple dimensions — including BMI, blood pressure, smoking status, physical activity, and more — to reveal actionable insights that can support healthcare professionals in making data-driven decisions.
              </p>
            </div>

            {/* Project Metadata Grid (2 Rows x 3 Columns) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {metadataItems.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#fdfbf7] p-5 sm:p-6 border border-[#c6b89f]/70 hover:border-[#b69355] transition-all group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#76591f] font-semibold">
                        {item.label}
                      </span>
                      <IconComponent className="w-4 h-4 text-[#b69355] group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="font-serif text-lg sm:text-xl font-normal text-[#262321]">
                      {item.value}
                    </div>
                    <p className="text-xs text-[#5f5750] mt-2 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
