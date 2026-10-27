import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<number[]>([1]); // First item open by default

  const toggleItem = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const faqItems: FaqItem[] = [
    {
      id: 1,
      question: 'What dataset is used in this analytics platform?',
      answer:
        'The analysis is built on the Smart Healthcare dataset containing 5,000 anonymized patient records structured across 17 clinical and behavioral attributes including blood pressure, cholesterol, BMI, smoking, and exercise levels.',
    },
    {
      id: 2,
      question: 'How are patient age groups categorized?',
      answer:
        'Patients are grouped using custom calculated fields into 6 cohorts: Teenager (18-30), Young Adult (31-40), Adult (41-50), Middle Age (51-60), Senior (61-70), and Old (>70).',
    },
    {
      id: 3,
      question: 'What clinical roles benefit from this system?',
      answer:
        'The platform provides tailored views for Clinical Risk Officers (rapid patient triage), Healthcare Data Analysts (lifestyle risk correlation), and Public Health Researchers (population health policy design).',
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Margin with Roman Numeral V */}
          <div className="hidden lg:flex lg:col-span-2 flex-col items-end pr-8 border-r border-[#b69355]/40 select-none">
            <span className="font-serif text-3xl font-normal text-[#76591f] tracking-widest">
              V
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#5f5750] mt-2 text-right">
              Inquiries &amp;<br />Governance
            </span>
            <div className="mt-16 w-3 h-px bg-[#b69355]/60"></div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-10">
            <div className="mb-10">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#76591f]">
                Documentation &amp; Validation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#262321] mt-1">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-[#5f5750] mt-2">
                Essential technical questions regarding dataset schema, cohort segmentation, and clinical stakeholder utility
              </p>
            </div>

            {/* Collapsible Accordion */}
            <div className="divide-y divide-[#d5cab8] border-y border-[#d5cab8]">
              {faqItems.map((item) => {
                const isOpen = openIds.includes(item.id);
                return (
                  <div key={item.id} className="py-6 transition-colors">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full flex items-center justify-between text-left group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b69355]"
                      aria-expanded={isOpen}
                    >
                      <span className="font-serif text-xl sm:text-2xl font-normal text-[#262321] group-hover:text-[#76591f] transition-colors pr-4">
                        {item.question}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-[#c6b89f] flex items-center justify-center shrink-0 text-[#76591f] group-hover:border-[#b69355] transition-colors">
                        {isOpen ? (
                          <Minus className="w-4 h-4 text-[#76591f]" />
                        ) : (
                          <Plus className="w-4 h-4 text-[#76591f]" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="mt-4 pr-12 text-sm sm:text-base text-[#5f5750] leading-relaxed animate-fadeIn">
                        <p>{item.answer}</p>
                      </div>
                    )}
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
