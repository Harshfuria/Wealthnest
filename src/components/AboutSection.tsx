import React, { useState } from 'react';
import aboutWorkspaceImg from '../assets/images/about_advisor_workspace_1795040947256.jpg';

interface AboutSectionProps {
  onOpenBooking: (topic?: string) => void;
}

const CERTIFICATIONS = [
  {
    title: 'QuickBooks Online Level 1',
    subtitle: 'Intuit Certified ProAdvisor',
    description:
      'Verified proficiency in company setup, bank feeds, reconciliations, and day-to-day cloud accounting.',
    badgeImg: '/intuit-quickbooks-certification-level-1.png',
  },
  {
    title: 'QuickBooks Online Level 2',
    subtitle: 'Advanced Certified ProAdvisor',
    description:
      'Advanced mastery of multi-entity workflows, inventory tracking, custom reporting, and troubleshooting.',
    badgeImg: '/intuit-quickbooks-certification-level-2.png',
  },
  {
    title: 'QuickBooks Payroll & Workforce',
    subtitle: 'Certified Payroll Specialist',
    description:
      'Specialized training in automated payroll runs, multi-state tax filings, and W-2/1099 administration.',
    badgeImg: '/quickbooks-workforce-certification.png',
  },
];

const INDUSTRIES = [
  'Small & Mid-Sized Businesses',
  'E-Commerce & Retail Brands',
  'Healthcare & Medical Practices',
  'Real Estate & Property Investors',
  'Technology & Consulting Firms',
  'Cross-Border & Global Founders',
];

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="py-20 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        {/* Firm Overview Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          {/* Left: Workspace Photo */}
          <div className="lg:col-span-5">
            <div className="w-full h-full min-h-[280px] sm:min-h-[340px] rounded-lg overflow-hidden border border-slate-200 bg-[#F4F6F5]">
              {!imgError ? (
                <img
                  src={aboutWorkspaceImg}
                  alt="Wealthnest Advisory workspace in New Jersey"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8 text-center">
                  <p className="font-serif text-lg font-bold text-[#1E3F35]">
                    Wealthnest Advisory LLC
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Firm Story */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-medium text-[#1E3F35]">About Wealthnest Advisory LLC</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-serif leading-tight [text-wrap:balance]">
                A straightforward practice built on trust, precision, and real relationships.
              </h2>
            </div>

            <div className="space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                We are a full-service strategic accounting, tax planning, and business advisory firm based in New Jersey, serving clients nationwide across all 50 states. We bridge the gap between traditional accounting rigor and modern, cloud-first financial agility.
              </p>
              <p>
                Many accounting firms only reach out when tax deadlines arrive. We work alongside our clients throughout the year—keeping books clean every month, reviewing tax positions ahead of year-end, and answering your questions directly without layers of bureaucracy.
              </p>
            </div>

            {/* Who We Serve & How We Work */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900">Who We Serve</h3>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  {INDUSTRIES.map((industry) => (
                    <li key={industry}>{industry}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900">How We Work</h3>
                <ul className="space-y-2 text-sm text-slate-600 leading-relaxed">
                  <li>
                    <strong className="font-semibold text-slate-800">Direct communication:</strong>{' '}
                    Speak directly with your advisor by phone, email, or video call.
                  </li>
                  <li>
                    <strong className="font-semibold text-slate-800">Cloud accounting:</strong>{' '}
                    Seamless integration with QuickBooks Online, Xero, Gusto, and ADP.
                  </li>
                  <li>
                    <strong className="font-semibold text-slate-800">Upfront proposals:</strong>{' '}
                    Clear deliverables and fixed monthly or project fees.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Official Intuit QuickBooks Certifications (No Download Buttons) */}
        <div id="certifications" className="mt-20 pt-16 border-t border-slate-200 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="max-w-2xl space-y-2">
              <p className="text-sm font-medium text-[#1E3F35]">Credentials</p>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-serif">
                Certified Intuit QuickBooks ProAdvisors
              </h3>
              <p className="text-sm sm:text-base text-slate-600">
                Our team holds verified Intuit certifications across bookkeeping, advanced cloud accounting, and payroll management.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenBooking('QuickBooks Setup or Cleanup')}
              className="text-sm font-semibold text-[#1E3F35] hover:text-[#152E27] underline underline-offset-4 decoration-[#1E3F35]/40 hover:decoration-[#1E3F35] whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
            >
              Need QuickBooks setup or cleanup?
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.title}
                className="p-6 rounded-lg border border-slate-200 bg-[#F7F8F7] flex flex-col items-center text-center space-y-4"
              >
                <div className="h-28 flex items-center justify-center">
                  <img
                    src={cert.badgeImg}
                    alt={cert.title}
                    className="max-h-24 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-[#1E3F35]">{cert.subtitle}</p>
                  <h4 className="text-base font-bold text-slate-900 font-serif">{cert.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
