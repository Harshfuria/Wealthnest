import React, { useState } from 'react';
import { FAQS } from '../data/servicesData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFaqs =
    activeCategory === 'all'
      ? FAQS
      : FAQS.filter((faq) => faq.category === activeCategory);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#F8FAF9] border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 space-y-3">
          <div className="text-xs font-semibold text-[#1E3F35] tracking-wider uppercase">
            06. Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
            Direct Answers on Rates, Scope & Security
          </h2>
          <p className="text-base text-slate-600">
            Have questions about how we handle on-boarding, hourly tracking, or IRS representations?
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'pricing', label: 'Rates & Pricing' },
            { id: 'cfo', label: 'Virtual CFO' },
            { id: 'process', label: 'Process & Timelines' },
            { id: 'security', label: 'Security & NDA' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                activeCategory === tab.id
                  ? 'bg-[#1E3F35] text-white border-[#1E3F35] font-semibold'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#1E3F35] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-5 rounded-xl bg-[#EBF4EE]/70 border border-[#D5E7DC] text-center space-y-2">
          <div className="text-xs text-slate-800 font-medium">
            Have a specialized tax question or an active IRS notice?
          </div>
          <div className="text-xs text-slate-600">
            Reach out directly via WhatsApp at <span className="text-[#1E3F35] font-mono font-bold">+1 (201) 616-2843</span> or email <span className="text-[#1E3F35] font-mono font-bold">wealthnestadvisoryllc@gmail.com</span>.
          </div>
        </div>

      </div>
    </section>
  );
};
