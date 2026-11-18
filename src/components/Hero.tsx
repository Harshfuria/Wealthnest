import React, { useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../data/servicesData';
import heroMeetingImg from '../assets/images/hero_advisory_meeting_1795041072526.jpg';

interface HeroProps {
  onOpenBooking: (topic?: string) => void;
  onNavigateToServices: () => void;
}

const HIGHLIGHTS = [
  { value: '10+ Years', label: 'Accounting, tax & advisory experience' },
  { value: '50 States', label: 'Federal & multi-state tax coverage' },
  { value: 'Fixed Scope', label: 'Clear upfront pricing with no surprises' },
  { value: 'ProAdvisor', label: 'Certified Intuit QuickBooks specialists' },
];

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onNavigateToServices,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="top" className="bg-white">
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          {/* Left Column: Clear Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <p className="text-sm font-medium text-[#1E3F35]">
              New Jersey <span aria-hidden="true" className="mx-1.5 text-slate-400">·</span> Serving Clients Across All 50 States
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 font-serif leading-[1.15] [text-wrap:balance]">
              Focus on growing your business. We’ll handle the numbers.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Wealthnest Advisory LLC provides dependable tax preparation, monthly bookkeeping, payroll, US business formation, and fractional CFO support for business owners and individuals nationwide.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => onOpenBooking('General Accounting & Tax Consultation')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#1E3F35] hover:bg-[#152E27] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1E3F35]"
              >
                <span>Schedule a Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-slate-700 hover:text-[#1E3F35] transition-colors whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 text-[#1E3F35]" />
                <span className="tabular-nums">{CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onNavigateToServices}
                className="text-sm font-medium text-slate-500 hover:text-slate-900 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-600 transition-colors cursor-pointer"
              >
                Explore our services
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Photography Anchor */}
          <div className="lg:col-span-6">
            <div className="w-full h-full min-h-[280px] sm:min-h-[360px] rounded-lg overflow-hidden border border-slate-200 bg-[#F4F6F5]">
              {!imgError ? (
                <img
                  src={heroMeetingImg}
                  alt="Wealthnest Advisory advisors reviewing financial reports with a business client"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center bg-[#F4F6F5]">
                  <p className="font-serif text-xl font-bold text-[#1E3F35]">
                    Wealthnest Advisory LLC
                  </p>
                  <p className="text-sm text-slate-600 mt-2">
                    Accounting, Tax Planning &amp; Business Advisory
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Practice Summary Row */}
        <div className="mt-16 pt-10 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {HIGHLIGHTS.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="text-xl sm:text-2xl font-bold text-slate-900 font-serif tabular-nums">
                {item.value}
              </div>
              <p className="text-sm text-slate-600 leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
