import React from 'react';
import { Check, MessageSquare, ArrowRight, Layers, FileCheck, Users, BarChart3, Receipt, Scale, Coins } from 'lucide-react';
import { CONTACT_INFO } from '../data/servicesData';

interface PricingMatrixProps {
  onOpenBooking: () => void;
  onNavigateToCalculator: () => void;
}

export const PricingMatrix: React.FC<PricingMatrixProps> = ({
  onOpenBooking,
  onNavigateToCalculator,
}) => {
  return (
    <section id="rates" className="py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-semibold text-[#1E3F35] tracking-wider uppercase">
            02. Engagement Models & Scope Framework
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
            Flexible Pricing Tailored to Your Business Scale
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Every company operates at a distinct stage and transaction volume. We provide open-ended, customized pricing structures—from tracked hourly support to all-inclusive monthly retainers.
          </p>
        </div>

        {/* 6 Key Engagement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* 1. Bookkeeper */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#F8FAF9] border border-slate-200 p-6 sm:p-8 hover:border-emerald-300 hover:bg-white hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500">Daily Operations</span>
                <Layers className="w-4 h-4 text-[#1E3F35]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Bookkeeper</h3>
              
              <div className="mb-6 pb-6 border-b border-slate-200">
                <div className="text-xl sm:text-2xl font-bold text-slate-900">
                  Hourly or Monthly Retainer
                </div>
                <p className="text-xs text-[#1E3F35] mt-1.5 font-medium">
                  Scoped to monthly transaction volume & active accounts
                </p>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>General ledger updates & categorization</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Bank & credit card feed reconciliations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Accounts Payable (AP) & receipt matching</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Accounts Receivable (AR) customer billing</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent('Hi Wealthnest Advisory, I would like to inquire about Bookkeeper support for my business.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span>Discuss Bookkeeper Scope</span>
              </a>
            </div>
          </div>

          {/* 2. Sr. Bookkeeper */}
          <div className="flex flex-col justify-between rounded-2xl bg-white border border-emerald-300 p-6 sm:p-8 relative shadow-sm">
            <div className="absolute -top-3 right-6 bg-[#1E3F35] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
              Senior Oversight
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500">Complex Accounting</span>
                <FileCheck className="w-4 h-4 text-[#1E3F35]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Sr. Bookkeeper</h3>
              
              <div className="mb-6 pb-6 border-b border-slate-200">
                <div className="text-xl sm:text-2xl font-bold text-slate-900">
                  Dedicated Senior Scope
                </div>
                <p className="text-xs text-[#1E3F35] mt-1.5 font-medium">
                  Custom plans for multi-entity, accruals & audit prep
                </p>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Accrual adjustments, prepaid & deferred rev</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Fixed asset capitalization & depreciation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Multi-currency & inter-entity reconciliations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Year-end CPA audit package & schedule creation</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent('Hi Wealthnest Advisory, I would like to inquire about dedicated Sr. Bookkeeper support.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-[#1E3F35] rounded-lg hover:bg-[#152E27] transition-colors shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 text-white" />
                <span>Discuss Sr. Bookkeeper Scope</span>
              </a>
            </div>
          </div>

          {/* 3. Tax Filing */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#F8FAF9] border border-slate-200 p-6 sm:p-8 hover:border-emerald-300 hover:bg-white hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500">Federal & State Compliance</span>
                <Scale className="w-4 h-4 text-[#1E3F35]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Tax Preparation & Filing</h3>
              
              <div className="mb-6 pb-6 border-b border-slate-200">
                <div className="text-xl sm:text-2xl font-bold text-slate-900">
                  Individual & Corporate Tiers
                </div>
                <p className="text-xs text-slate-500 mt-1.5">
                  Scoped by entity structure, multi-state reach & schedules
                </p>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Individual returns (Form 1040, schedules A/B/D)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Corporate Form 1120, 1120-S & 1065 partnerships</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Owner K-1 statements & multi-state filings</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Free prior-year return diagnostic check</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent('Hi Wealthnest Advisory, I would like to request a tax filing quotation.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span>Request Tax Quote</span>
              </a>
            </div>
          </div>

          {/* 4. Virtual CFO */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#F8FAF9] border border-slate-200 p-6 sm:p-8 hover:border-emerald-300 hover:bg-white hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500">Executive Financial Leadership</span>
                <BarChart3 className="w-4 h-4 text-[#1E3F35]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Virtual CFO Practice</h3>
              
              <div className="mb-6 pb-6 border-b border-slate-200">
                <div className="text-xl sm:text-2xl font-bold text-slate-900">
                  Fractional Executive Scope
                </div>
                <p className="text-xs text-[#1E3F35] mt-1.5 font-medium">
                  Customized based on industry, stage & growth complexity
                </p>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>3-way dynamic cash forecasting & runway modeling</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Investor pitch financials & board presentations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>SaaS metrics, unit economics, gross margin lift</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Banking & debt refinancing advisory</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent('Hi Wealthnest Advisory, I would like to discuss Virtual CFO advisory for my organization.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span>Consult Virtual CFO</span>
              </a>
            </div>
          </div>

          {/* 5. Full-fledged Payroll */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#F8FAF9] border border-slate-200 p-6 sm:p-8 hover:border-emerald-300 hover:bg-white hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500">Automated Pay Runs & Compliance</span>
                <Users className="w-4 h-4 text-[#1E3F35]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Full-Fledged Payroll</h3>
              
              <div className="mb-6 pb-6 border-b border-slate-200">
                <div className="text-xl sm:text-2xl font-bold text-slate-900">
                  Headcount-Based Monthly Plans
                </div>
                <p className="text-xs text-[#1E3F35] mt-1.5 font-medium">
                  Direct deposit, multi-state tax withholding & year-end forms
                </p>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Guaranteed timely direct deposit payouts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Federal 941/940 and state unemployment filings</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Contractor 1099-NEC & Employee W-2 year-end</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Multi-state employee tax registrations</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent('Hi Wealthnest Advisory, I would like to arrange payroll management services.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span>Discuss Payroll Scope</span>
              </a>
            </div>
          </div>

          {/* 6. Sales Tax */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#F8FAF9] border border-slate-200 p-6 sm:p-8 hover:border-emerald-300 hover:bg-white hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500">Nexus & Multi-State Reporting</span>
                <Receipt className="w-4 h-4 text-[#1E3F35]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Sales Tax Filing</h3>
              
              <div className="mb-6 pb-6 border-b border-slate-200">
                <div className="text-xl sm:text-2xl font-bold text-slate-900">
                  Jurisdiction-Based Retainer
                </div>
                <p className="text-xs text-[#1E3F35] mt-1.5 font-medium">
                  Customized to active state economic nexus registrations
                </p>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>State economic nexus exposure monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Monthly, quarterly, and annual return filings</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Marketplace facilitator reconciliation (Amazon/Shopify)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Resale and exemption certificate management</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent('Hi Wealthnest Advisory, I would like to arrange Sales Tax and nexus compliance services.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span>Discuss Sales Tax Scope</span>
              </a>
            </div>
          </div>

          {/* 7. AR Collections & Debt Recovery */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#F8FAF9] border border-slate-200 p-6 sm:p-8 hover:border-emerald-300 hover:bg-white hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500">Aging AR Acceleration</span>
                <Scale className="w-4 h-4 text-[#1E3F35]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">AR Collections & Recovery</h3>
              
              <div className="mb-6 pb-6 border-b border-slate-200">
                <div className="text-xl sm:text-2xl font-bold text-slate-900">
                  Contingency or Retainer
                </div>
                <p className="text-xs text-[#1E3F35] mt-1.5 font-medium">
                  Sized by ledger aging brackets (30, 60, 90, 120+ days)
                </p>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Diplomatic dunning workflows to preserve relationships</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Disputed invoice mediation & balance settlement</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Promissory notes & automated installment schedules</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Legal escalation & counsel coordination when required</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent('Hi Wealthnest Advisory, I would like to discuss AR Collections and debt recovery support for our receivables.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span>Discuss Collections Scope</span>
              </a>
            </div>
          </div>

          {/* 8. Commercial Financing (Hard Lending, ABL, Invoice Financing) */}
          <div className="flex flex-col justify-between rounded-2xl bg-white border border-emerald-300 p-6 sm:p-8 relative shadow-sm">
            <div className="absolute -top-3 right-6 bg-[#1E3F35] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
              Capital Advisory
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500">Hard Lending · ABL · Factoring</span>
                <Coins className="w-4 h-4 text-[#1E3F35]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Commercial Financing</h3>
              
              <div className="mb-6 pb-6 border-b border-slate-200">
                <div className="text-xl sm:text-2xl font-bold text-slate-900">
                  Custom Facility Sizing
                </div>
                <p className="text-xs text-[#1E3F35] mt-1.5 font-medium">
                  $50K to $10M+ via ABL, Invoice Factoring, or Bridge Debt
                </p>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Invoice Factoring: Up to 90% advance in 24–48 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Asset-Based Lending (ABL) on receivables & inventory</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Hard money & bridge lending for fast capital needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                  <span>Borrowing base certification & MCA debt restructuring</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent('Hi Wealthnest Advisory, I am seeking commercial financing (ABL / Invoice Factoring / Hard Money Lending) for my business.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-[#1E3F35] rounded-lg hover:bg-[#152E27] transition-colors shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 text-white" />
                <span>Discuss Financing Facility</span>
              </a>
            </div>
          </div>

        </div>

        {/* Action strip to interactive calculator / scope builder */}
        <div className="mt-12 text-center">
          <button
            onClick={onNavigateToCalculator}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#1E3F35] bg-[#EBF4EE] border border-[#C2DFCF] rounded-lg hover:bg-[#DCEEE3] transition-all"
          >
            <span>Have custom multi-service requirements? Build your Custom Scope Blueprint</span>
            <ArrowRight className="w-4 h-4 text-[#1E3F35]" />
          </button>
        </div>

      </div>
    </section>
  );
};
