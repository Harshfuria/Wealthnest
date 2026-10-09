import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Zap,
  Clock,
  Layers,
  FileCheck
} from 'lucide-react';

interface QuickBooksCertificationsSectionProps {
  onOpenBooking: (serviceTitle?: string) => void;
}

export const QuickBooksCertificationsSection: React.FC<QuickBooksCertificationsSectionProps> = ({
  onOpenBooking,
}) => {
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  const certifications = [
    {
      id: 'level-1',
      title: 'QuickBooks Level 1',
      subtitle: 'Core Bookkeeping & General Ledger',
      badgeImg: '/intuit-quickbooks-certification-level-1.png',
      badgeColor: 'border-emerald-300 bg-emerald-50/50',
      tag: 'Core Certification',
      accentColor: 'text-emerald-800',
      issuer: 'Intuit ProAdvisor Academy',
      description: 'Validates thorough mastery of foundational QuickBooks accounting architecture, automated bank feeds, and reliable monthly closing procedures.',
      skills: [
        'Chart of Accounts Architecture & Customization',
        'Daily Bank & Credit Card Feed Categorization',
        'Accounts Receivable (Invoicing & Aging Collections)',
        'Accounts Payable (Bill Pay & Vendor Management)',
        'Monthly Bank, Card & Merchant Reconciliations',
        'Standard Management Financial Statements (P&L, Balance Sheet)',
      ],
    },
    {
      id: 'level-2',
      title: 'QuickBooks Level 2',
      subtitle: 'Advanced Accounting & Multi-Entity Control',
      badgeImg: '/intuit-quickbooks-certification-level-2.png',
      badgeColor: 'border-green-400 bg-green-50/50',
      tag: 'Advanced Certification',
      accentColor: 'text-green-800',
      issuer: 'Intuit ProAdvisor Academy',
      description: 'Validates advanced proficiency in complex general ledger troubleshooting, multi-entity consolidations, accrual adjustments, and audit-ready reporting.',
      skills: [
        'Multi-Entity & Inter-Company Elimination Ledgers',
        'Inventory Accounting, Landed COGS & Work-in-Progress',
        'Accrual Basis vs. Cash Basis Year-End Adjustments',
        'Prepaid Expenses & Deferred Revenue Amortization',
        'Historical Data Cleanup & Ledger Anomaly Rectification',
        'Year-End Audit-Ready Financial Packages & Trial Balances',
      ],
    },
    {
      id: 'workforce',
      title: 'QuickBooks Workforce',
      subtitle: 'Payroll, Employee Portal & Compliance',
      badgeImg: '/quickbooks-workforce-certification.png',
      badgeColor: 'border-cyan-400 bg-cyan-50/50',
      tag: 'Workforce Specialist',
      accentColor: 'text-cyan-800',
      issuer: 'Intuit ProAdvisor Academy',
      description: 'Validates certified expertise in automated multi-state payroll, contractor disbursements, self-service employee workforce portals, and employment tax filings.',
      skills: [
        'Automated Direct Deposit Processing (Salaried & Hourly)',
        'Multi-State & Local Payroll Tax Withholding Compliance',
        'Employee Self-Service Paystub & Tax Form Access',
        'Contractor 1099-NEC & 1099-MISC E-Filing',
        'PTO, Sick Leave & Benefits Deductions Architecture',
        'Quarterly Form 941 & Annual Form 940 Government Reporting',
      ],
    },
  ];

  return (
    <section id="certifications" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E3F35]">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Official Professional Accreditations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-serif leading-tight">
              Certified Intuit QuickBooks ProAdvisor Practice
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Our firm is officially certified across all tiers of the Intuit ProAdvisor program. We don't just record transactions — we engineer clean, automated accounting systems that give you total confidence in your financial data.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <button
              onClick={() => onOpenBooking('QuickBooks Setup, Cleanup & Reconciliations')}
              className="px-6 py-3.5 text-xs font-bold text-white bg-[#1E3F35] hover:bg-[#152E27] rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Request QuickBooks Cleanup</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
            </button>
          </div>
        </div>

        {/* 3 Badges Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className={`rounded-2xl border ${cert.badgeColor} p-7 bg-gradient-to-b from-white to-[#FAFBF9] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden`}
            >
              {/* Subtle decorative background glow */}
              <div 
                className="absolute top-0 right-0 w-36 h-36 bg-emerald-100/30 rounded-full blur-2xl -z-0 pointer-events-none group-hover:bg-emerald-100/60 transition-colors"
                aria-hidden="true"
              />

              <div className="relative z-10 space-y-6">
                
                {/* Badge Header & Image Display */}
                <div className="flex flex-col items-center text-center space-y-4 pt-2">
                  <div className="relative">
                    <img
                      src={cert.badgeImg}
                      alt={`${cert.title} Certified ProAdvisor Badge`}
                      className="w-36 h-36 sm:w-40 sm:h-40 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => setSelectedBadge(cert.badgeImg)}
                      title="Click to view high-resolution badge"
                    />
                    <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white px-2.5 py-0.5 rounded-full shadow-xs">
                        Verified
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase text-[#1E3F35]">
                      {cert.issuer}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 font-serif mt-1">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500">
                      {cert.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed text-center sm:text-left border-t border-slate-200/80 pt-4">
                  {cert.description}
                </p>

                {/* Verified Skills Checklist */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800 block">
                    Certified Competencies:
                  </span>
                  <ul className="space-y-2">
                    {cert.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3F35] shrink-0 mt-0.5" />
                        <span className="leading-snug">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Card Action Footer */}
              <div className="relative z-10 pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <div className="inline-flex items-center gap-1.5 text-slate-500 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Credential</span>
                </div>

                <button
                  onClick={() => onOpenBooking(`${cert.title} Consultation`)}
                  className="font-bold text-[#1E3F35] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Book with Certified Advisor</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Why QuickBooks Certification Matters Banner */}
        <div className="mt-14 p-8 rounded-2xl bg-[#0C231C] text-white border border-emerald-950 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>The Value of an Accredited ProAdvisor</span>
              </div>
              <h3 className="text-2xl font-bold font-serif text-white leading-tight">
                Why Work with a QuickBooks Certified Accounting Partner?
              </h3>
              <p className="text-sm text-emerald-100/90 leading-relaxed">
                Many businesses struggle with unorganized books, double-counted expenses, and incorrect bank reconciliations done by uncertified staff. Our certified advisors guarantee clean general ledgers, customized tax mappings, and automated workflows that eliminate year-end tax stress.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>20+ Hours Saved</span>
                  </div>
                  <span className="text-slate-300 text-[11px]">Eliminate manual invoice and receipt data entry completely.</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Audit-Ready Books</span>
                  </div>
                  <span className="text-slate-300 text-[11px]">Clean monthly closes prepared to strict GAAP standards.</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Zero Tax Surprises</span>
                  </div>
                  <span className="text-slate-300 text-[11px]">Seamless K-1 and tax return prep with zero missing deductions.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4 border-t lg:border-t-0 lg:border-l border-emerald-900/80 pt-6 lg:pt-0 lg:pl-8 text-center">
              <div className="flex items-center justify-center -space-x-4">
                <img src="/intuit-quickbooks-certification-level-1.png" alt="Level 1" className="w-16 h-16 object-contain drop-shadow-md z-10" />
                <img src="/intuit-quickbooks-certification-level-2.png" alt="Level 2" className="w-20 h-20 object-contain drop-shadow-lg z-20 scale-105" />
                <img src="/quickbooks-workforce-certification.png" alt="Workforce" className="w-16 h-16 object-contain drop-shadow-md z-10" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-bold text-white">Full-Stack Intuit ProAdvisor</div>
                <div className="text-xs text-emerald-300 font-mono">Harsh Furia & Advisory Team</div>
              </div>
              <button
                onClick={() => onOpenBooking('QuickBooks Accounting & Advisory')}
                className="w-full py-3 px-5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                Schedule Free Accounting Review
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Lightbox Modal for Full-Size Badge Inspection */}
      {selectedBadge && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedBadge(null)}
        >
          <div 
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              ✕
            </button>

            <img
              src={selectedBadge}
              alt="QuickBooks Certification Badge"
              className="w-64 h-64 mx-auto object-contain drop-shadow-xl"
            />

            <div>
              <h4 className="text-lg font-bold text-slate-900 font-serif">
                Official Intuit ProAdvisor Badge
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Verified certification credential for Wealthnest Advisory LLC
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Intuit ProAdvisor Credential</span>
              </div>
              <button
                onClick={() => setSelectedBadge(null)}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
