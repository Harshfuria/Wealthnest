import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onOpenBooking: (topic: string) => void;
}

interface CoreService {
  number: string;
  title: string;
  summary: string;
  includes: string[];
}

const CORE_SERVICES: CoreService[] = [
  {
    number: '01.',
    title: 'Tax Preparation & Planning',
    summary:
      'Accurate federal and multi-state tax filing for businesses and individuals, paired with proactive quarterly planning so there are no April surprises.',
    includes: [
      'Business returns (Form 1120-S, 1120, 1065 & K-1s)',
      'Individual returns (Form 1040, Schedules C & E)',
      'Quarterly estimated tax projections & deduction planning',
    ],
  },
  {
    number: '02.',
    title: 'Bookkeeping & Monthly Accounting',
    summary:
      'Orderly, GAAP-aligned monthly closes that give you clear Profit & Loss statements, Balance Sheets, and cash flow visibility every month.',
    includes: [
      'Bank, credit card & merchant reconciliations',
      'Accounts payable, receivable & general ledger cleanup',
      'Monthly financial reporting in QuickBooks Online or Xero',
    ],
  },
  {
    number: '03.',
    title: 'Payroll & Sales Tax Compliance',
    summary:
      'Reliable payroll administration and multi-state sales tax filing handled on schedule across all jurisdictions where you operate.',
    includes: [
      'Direct deposits, W-2s, 1099-NECs & Form 941/940 filings',
      'Multi-state payroll withholdings & new-hire reporting',
      'Economic nexus tracking & monthly sales tax returns',
    ],
  },
  {
    number: '04.',
    title: 'US Business Formation & Structuring',
    summary:
      'Practical guidance on choosing the right entity structure and getting your US business formed and compliant from day one.',
    includes: [
      'LLC, S-Corp & C-Corp formation & state registration',
      'Federal EIN setup & Form 2553 S-Corp elections',
      'Entity formation support for US and international founders',
    ],
  },
  {
    number: '05.',
    title: 'Virtual CFO & Financial Advisory',
    summary:
      'Experienced financial leadership on a fractional basis to help growing businesses plan cash flow, improve margins, and prepare for financing.',
    includes: [
      'Cash flow forecasting, budgeting & margin analysis',
      'Board and lender-ready financial packages',
      'Commercial financing & working capital guidance',
    ],
  },
  {
    number: '06.',
    title: 'Cross-Border & IRS Notice Support',
    summary:
      'Dedicated assistance for international taxpayers, visa holders, and businesses responding to IRS or state tax notices.',
    includes: [
      'US-India & cross-border tax planning (H-1B, L-1, NRIs)',
      'FBAR (FinCEN 114) & FATCA Form 8938 compliance',
      'IRS and state tax notice review & resolution support',
    ],
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  return (
    <section
      id="services"
      className="py-20 sm:py-24 bg-[#F7F8F7] border-t border-slate-200"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-14">
          <p className="text-sm font-medium text-[#1E3F35]">Our Services</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-serif leading-tight [text-wrap:balance]">
            Practical accounting and tax services built around your business.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Every engagement is scoped clearly upfront with fixed, transparent pricing tailored to your entity and transaction volume.
          </p>
        </div>

        {/* 2-Column Editorial Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CORE_SERVICES.map((service) => (
            <div
              key={service.title}
              className="bg-white border border-slate-200 rounded-lg p-7 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-semibold text-[#1E3F35] tabular-nums">
                    {service.number}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-serif leading-snug">
                    {service.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {service.summary}
                </p>

                <ul className="space-y-2 pt-2 border-t border-slate-100 text-sm text-slate-700">
                  {service.includes.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1E3F35] shrink-0"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenBooking(service.title)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3F35] hover:text-[#152E27] transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3F35] rounded"
                >
                  <span>Request a quote</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
