import React from 'react';
import { 
  Globe, 
  Sparkles, 
  Compass, 
  Building2, 
  Coins, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu
} from 'lucide-react';

interface SpecializedSolutionsSectionProps {
  onOpenBooking: (serviceTitle?: string) => void;
}

export const SpecializedSolutionsSection: React.FC<SpecializedSolutionsSectionProps> = ({ onOpenBooking }) => {
  const specialties = [
    {
      id: 'us-business-india',
      icon: Globe,
      badge: 'High Demand',
      title: 'Run Your U.S. Business from India & Abroad',
      desc: 'End-to-end tax and accounting architecture for founders managing U.S. entities from India or abroad. We coordinate registered agents, corporate banking, DTAA tax treaties, and state filings.',
      points: [
        'U.S. LLC & C-Corp formation with remote EIN',
        'US-India Double Tax Avoidance Agreement (DTAA)',
        'Virtual office & banking compliance setup',
        'Repatriation of business profits without dual taxation',
      ],
      action: 'Consult on Remote U.S. Business',
    },
    {
      id: 'cross-border-visas',
      icon: Compass,
      badge: 'Immigrant & NRI Advisory',
      title: 'Cross-Border Wealth & Visa Holder Tax Strategy',
      desc: 'Specialized tax planning for H-1B, L-1, F-1 OPT visa holders, green card holders, and NRIs managing assets, real estate, and equity compensation across borders.',
      points: [
        'Mandatory FBAR (FinCEN 114) & FATCA Form 8938 reporting',
        'RSU, ESPP, and ISO stock equity cross-border taxation',
        'Substantial Presence Test & Dual-Status tax returns',
        'Indian mutual funds (PFIC) & foreign property sales',
      ],
      action: 'Consult on Visa Holder Tax',
    },
    {
      id: 'first-90-days',
      icon: Briefcase,
      badge: 'Newcomer Kit',
      title: 'First 90 Days in U.S. Finance & Formation Kit',
      desc: 'Fast-track your transition to the U.S. financial system. We help newcomers and foreign founders establish clean bookkeeping, business credit, bank accounts, and tax registrations quickly.',
      points: [
        'Guidance on business bank accounts (Mercury, Brex, Chase)',
        'State franchise tax & annual report calendar',
        'QuickBooks Online chart of accounts initialization',
        'FinCEN Beneficial Ownership (BOI) compliance filing',
      ],
      action: 'Explore Newcomer Kit',
    },
    {
      id: 'automation-accounting',
      icon: Cpu,
      badge: 'Modern Technology',
      title: 'Cloud Accounting & Smart Automation',
      desc: 'Modern, automated bookkeeping designed to save business owners 20+ hours each month. Reconcile transactions daily and get live financial dashboards on your phone.',
      points: [
        'Automated bank feeds with zero manual data entry errors',
        'Digital receipt capture & instant vendor categorization',
        '13-week rolling cash flow & runway dashboards',
        'Multi-currency and Stripe/Shopify payout reconciliations',
      ],
      action: 'Explore Smart Bookkeeping',
    },
    {
      id: 'crypto-web3',
      icon: Coins,
      badge: 'Digital Economy',
      title: 'Crypto & Digital Nomad Tax Advisory',
      desc: 'Proactive tax optimization for digital nomads, freelancers, Web3 developers, and crypto traders dealing with complex multi-wallet staking, airdrops, and foreign income.',
      points: [
        'Multi-exchange wallet reconciliation & FIFO/HIFO optimization',
        'IRS Form 8949 capital gain/loss schedules',
        'State residency domicile defense for remote nomads',
        'Foreign earned income exclusion (FEIE Form 2555)',
      ],
      action: 'Consult on Crypto Tax',
    },
    {
      id: 'virtual-cfo-scale',
      icon: Building2,
      badge: 'Executive Advisory',
      title: 'Virtual CFO Leadership for Growing Enterprises',
      desc: 'Fractional CFO guidance to scale your business sustainably. We attend board meetings, structure bank financing, improve unit economics, and prepare corporate data rooms.',
      points: [
        'Dynamic 3-statement financial models for board & lenders',
        'Asset-based lending (ABL) & commercial invoice factoring',
        'Pricing restructuring and gross margin improvement',
        'Bi-weekly strategic leadership syncs with our partners',
      ],
      action: 'Inquire About Virtual CFO',
    },
  ];

  return (
    <section id="specializations" className="py-20 md:py-28 bg-[#F4F7F5] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E3F35]">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Specialized Client Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-serif leading-tight">
            Tailored Advisory for Cross-Border Founders, Visa Holders & Growing Businesses
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Standard tax accountants only report historical numbers. At Wealthnest Advisory, we specialize in high-impact international, immigrant, and growth-stage scenarios where proactive structuring saves thousands.
          </p>
        </div>

        {/* 6 Specialized Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {specialties.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-[#EBF4EE] border border-[#C2DFCF] flex items-center justify-center text-[#1E3F35] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-serif leading-snug group-hover:text-[#1E3F35] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2 pt-2 border-t border-slate-100">
                    {item.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3F35] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100">
                  <button
                    onClick={() => onOpenBooking(item.title)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-800 bg-slate-50 hover:bg-[#1E3F35] hover:text-white border border-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs group-hover:bg-[#1E3F35] group-hover:text-white"
                  >
                    <span>{item.action}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
