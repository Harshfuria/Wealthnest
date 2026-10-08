import React, { useState } from 'react';
import { 
  ExternalLink, 
  Search, 
  CreditCard, 
  FileText, 
  Landmark, 
  Calculator, 
  HelpCircle, 
  CheckCircle, 
  ArrowRight,
  Shield
} from 'lucide-react';

interface IRSQuickToolsSectionProps {
  onOpenBooking: () => void;
}

export const IRSQuickToolsSection: React.FC<IRSQuickToolsSectionProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'refund' | 'pay' | 'ein' | 'calendar'>('refund');

  const tools = [
    {
      id: 'refund',
      title: 'Where’s My Refund?',
      desc: 'Check the official real-time status of your federal IRS tax return and refund amount.',
      link: 'https://www.irs.gov/refunds',
      agency: 'IRS Official Portal',
      icon: Search,
      tag: 'Federal Tax Status',
    },
    {
      id: 'pay',
      title: 'IRS Direct Pay',
      desc: 'Make electronic tax payments directly from your bank account with zero processing fees.',
      link: 'https://www.irs.gov/payments/direct-pay',
      agency: 'IRS Official Portal',
      icon: CreditCard,
      tag: 'Safe Electronic Payment',
    },
    {
      id: 'ein',
      title: 'Apply for an EIN Online',
      desc: 'Official IRS system to secure your federal Employer Identification Number for business operations.',
      link: 'https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online',
      agency: 'IRS Official Portal',
      icon: FileText,
      tag: 'Entity Identification',
    },
    {
      id: 'nj-taxes',
      title: 'NJ Division of Taxation',
      desc: 'Direct state portal for New Jersey state income tax, sales tax returns, and corporate business filings.',
      link: 'https://www.state.nj.us/treasury/taxation/',
      agency: 'State Revenue Portal',
      icon: Landmark,
      tag: 'New Jersey State',
    },
    {
      id: 'eftps',
      title: 'EFTPS Payment System',
      desc: 'Electronic Federal Tax Payment System for business payroll taxes and quarterly 1120-S / 1065 payments.',
      link: 'https://www.eftps.gov/',
      agency: 'US Dept of the Treasury',
      icon: Calculator,
      tag: 'Corporate & Payroll Tax',
    },
    {
      id: 'fbar',
      title: 'FinCEN FBAR (Report 114)',
      desc: 'Mandatory annual disclosure for foreign bank accounts exceeding $10,000 aggregate balance.',
      link: 'https://bsaefiling.fincen.treas.gov/NoRegFBARFiler.html',
      agency: 'FinCEN BSA E-Filing',
      icon: Shield,
      tag: 'Cross-Border Compliance',
    },
  ];

  return (
    <section id="tools" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3F35] block">
              Helpful Client Resources & Portals
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-serif">
              IRS Official Links & Client Tools
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Quick access to essential official government portals, refund status trackers, and electronic tax payment systems. Need help navigating an IRS letter or notice? Our advisors are here for you.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="self-start md:self-auto px-5 py-3 text-xs font-bold text-white bg-[#1E3F35] hover:bg-[#152E27] rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span>Have an IRS Notice? Get Help</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="p-6 rounded-2xl bg-[#FAFBF9] border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#1E3F35] shadow-2xs group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-200">
                      {tool.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-serif group-hover:text-[#1E3F35] transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-medium">{tool.agency}</span>
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#1E3F35] hover:underline"
                  >
                    <span>Launch Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Reassurance Banner */}
        <div className="mt-10 p-5 rounded-2xl bg-[#0C231C] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-lg bg-emerald-800/80 text-amber-300 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                IRS Circular 230 Notice Defense & Penalty Abatement
              </div>
              <div className="text-[11px] text-emerald-200/80">
                Never call the IRS alone without experienced representation. We negotiate on your behalf.
              </div>
            </div>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl transition-all shrink-0 cursor-pointer"
          >
            Schedule Notice Review
          </button>
        </div>

      </div>
    </section>
  );
};
