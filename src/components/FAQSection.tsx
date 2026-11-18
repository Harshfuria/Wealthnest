import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Do you work with clients outside of New Jersey?',
    answer:
      'Yes. While we are based in New Jersey, we serve business owners, families, and entrepreneurs across all 50 states as well as international founders running US entities. We handle consultations via phone, Zoom, or Google Meet and exchange documents securely online.',
  },
  {
    question: 'How is your pricing structured?',
    answer:
      'We provide clear, fixed-fee proposals before any work begins—based on your entity structure, transaction volume, and filing requirements. We do not bill surprise six-minute hourly increments for routine questions.',
  },
  {
    question: 'How long does it take to get started?',
    answer:
      'Onboarding typically takes 3 to 5 business days. We begin with a complimentary introductory call to review your needs, share a written proposal with exact deliverables, and then connect your accounting software and review prior-year tax returns.',
  },
  {
    question: 'What accounting and payroll software do you support?',
    answer:
      'We are certified Intuit QuickBooks Online ProAdvisors (Level 1, Level 2, and Payroll/Workforce) and also work smoothly with Xero, Gusto, ADP, Bill.com, and Stripe.',
  },
  {
    question: 'Can you help if my books are behind or I received an IRS notice?',
    answer:
      'Yes. We regularly help business owners clean up backlogged bookkeeping, file overdue federal or state returns, and review or respond to IRS and state tax notices.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="py-20 sm:py-24 bg-[#F7F8F7] border-t border-slate-200"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Header */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-sm font-medium text-[#1E3F35]">Common Questions</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-serif leading-tight [text-wrap:balance]">
              Straightforward answers before we begin.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Have a question specific to your business or tax situation? Reach out directly below and we’ll be glad to help.
            </p>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-8 divide-y divide-slate-200 border-t border-b border-slate-200">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className="w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3F35] rounded"
                  >
                    <span className="text-base font-semibold text-slate-900">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#1E3F35]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-5 pr-8 text-sm sm:text-base text-slate-600 leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
