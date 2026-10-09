import React, { useState } from 'react';
import { 
  FileText, 
  Calculator, 
  TrendingUp, 
  Users, 
  Building2, 
  ShieldAlert, 
  Percent, 
  Coins, 
  ArrowRight, 
  CheckCircle2, 
  Check, 
  Lock,
  ChevronRight
} from 'lucide-react';
import { SERVICES } from '../data/servicesData';
import { ServiceItem } from '../types';

interface PracticeAreasProps {
  onOpenBooking: (serviceTitle?: string) => void;
}

export const PracticeAreas: React.FC<PracticeAreasProps> = ({ onOpenBooking }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'tax' | 'accounting' | 'cfo' | 'capital'>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const filteredServices = SERVICES.filter((s) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'tax') return s.category === 'tax' || s.id.includes('tax') || s.id.includes('irs');
    if (activeFilter === 'accounting') return s.category === 'accounting' || s.id.includes('bookkeeper') || s.id.includes('payroll');
    if (activeFilter === 'cfo') return s.category === 'cfo' || s.id.includes('cfo');
    if (activeFilter === 'capital') return s.category === 'capital' || s.id.includes('financing') || s.id.includes('formation');
    return true;
  });

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'corporate-tax':
        return <FileText className="w-5 h-5 text-[#1E3F35]" />;
      case 'accounting-bookkeeping':
        return <Calculator className="w-5 h-5 text-[#1E3F35]" />;
      case 'virtual-cfo':
        return <TrendingUp className="w-5 h-5 text-[#1E3F35]" />;
      case 'payroll-compliance':
        return <Users className="w-5 h-5 text-[#1E3F35]" />;
      case 'business-formation':
        return <Building2 className="w-5 h-5 text-[#1E3F35]" />;
      case 'irs-representation':
        return <ShieldAlert className="w-5 h-5 text-[#1E3F35]" />;
      case 'sales-tax':
        return <Percent className="w-5 h-5 text-[#1E3F35]" />;
      case 'commercial-financing':
        return <Coins className="w-5 h-5 text-[#1E3F35]" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-[#1E3F35]" />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-[#F8FAF9] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3F35] block">
              Core Practice Areas & Scope
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-serif">
              Comprehensive Accounting, Tax & Strategic Financial Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every client engagement is tailored by experienced tax advisors and financial directors to eliminate tax friction, guarantee filing accuracy, and provide institutional clarity.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-2xs self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#1E3F35] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All Practice Areas
            </button>
            <button
              onClick={() => setActiveFilter('tax')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeFilter === 'tax'
                  ? 'bg-[#1E3F35] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Tax Preparation & Strategy
            </button>
            <button
              onClick={() => setActiveFilter('accounting')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeFilter === 'accounting'
                  ? 'bg-[#1E3F35] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Accounting & Payroll
            </button>
            <button
              onClick={() => setActiveFilter('cfo')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeFilter === 'cfo'
                  ? 'bg-[#1E3F35] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Virtual CFO Advisory
            </button>
            <button
              onClick={() => setActiveFilter('capital')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeFilter === 'capital'
                  ? 'bg-[#1E3F35] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Formation & Capital
            </button>
          </div>
        </div>

        {/* Practice Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between p-6 sm:p-7 group hover:border-[#1E3F35]/40"
            >
              <div className="space-y-4">
                {/* Card Top: Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#EBF4EE] border border-[#C2DFCF] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getServiceIcon(service.id)}
                  </div>
                  {service.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#1E3F35] border border-emerald-200">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Title & Short Description */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-serif group-hover:text-[#1E3F35] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Key Practice Features list */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Core Capabilities
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#1E3F35] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables snippet */}
                <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 border border-slate-100">
                  <span className="font-semibold text-slate-800 block text-[11px] mb-0.5">
                    Primary Deliverable:
                  </span>
                  <span className="text-[11px] leading-tight">
                    {service.deliverables[0]}
                  </span>
                </div>

                {/* QuickBooks ProAdvisor Certified Accreditation Callout */}
                {service.id === 'accounting-bookkeeping' && (
                  <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/90 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center -space-x-2 shrink-0">
                        <img src="/intuit-quickbooks-certification-level-1.png" alt="QuickBooks Level 1" className="w-7 h-7 object-contain" />
                        <img src="/intuit-quickbooks-certification-level-2.png" alt="QuickBooks Level 2" className="w-8 h-8 object-contain scale-105 z-10" />
                      </div>
                      <div className="text-[11px] leading-tight">
                        <span className="font-bold text-emerald-950 block">QuickBooks Level 1 & 2 Certified</span>
                        <span className="text-emerald-700 text-[10px]">Intuit ProAdvisor Verified</span>
                      </div>
                    </div>
                    <a href="#certifications" className="text-[10px] font-bold text-emerald-800 hover:underline">
                      Badges →
                    </a>
                  </div>
                )}

                {service.id === 'payroll-compliance' && (
                  <div className="p-2.5 rounded-xl bg-cyan-50/80 border border-cyan-200/90 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <img src="/quickbooks-workforce-certification.png" alt="Workforce Certified" className="w-7 h-7 object-contain shrink-0" />
                      <div className="text-[11px] leading-tight">
                        <span className="font-bold text-cyan-950 block">QuickBooks Workforce Certified</span>
                        <span className="text-cyan-800 text-[10px]">Payroll & Portal Specialist</span>
                      </div>
                    </div>
                    <a href="#certifications" className="text-[10px] font-bold text-cyan-800 hover:underline">
                      Badges →
                    </a>
                  </div>
                )}
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-semibold text-[#1E3F35] hover:text-[#152E27] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Detailed Scope</span>
                  <ChevronRight className="w-3 h-3" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenBooking(service.title)}
                  className="px-3.5 py-2 text-xs font-bold text-white bg-[#1E3F35] hover:bg-[#152E27] rounded-lg transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Consult</span>
                  <ArrowRight className="w-3 h-3 text-amber-300" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Global Bottom Consultation Banner */}
        <div className="mt-14 p-8 rounded-2xl bg-[#0C231C] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-950">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Need a Custom Multi-Service Engagement?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl">
              We frequently bundle corporate tax planning, monthly bookkeeping, and payroll into a seamless, fixed-fee monthly advisory package tailored to your transaction volume.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenBooking('Comprehensive Multi-Service Engagement')}
              className="px-6 py-3 text-xs font-bold text-[#0C231C] bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              Schedule Tailored Consultation
            </button>
          </div>
        </div>

      </div>

      {/* DETAILED SERVICE SCOPE MODAL */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E3F35]">
                  Practice Area Details
                </span>
                <h3 className="text-2xl font-bold text-slate-900 font-serif mt-1">
                  {selectedService.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedService.fullDesc}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Detailed Scope of Capabilities
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {selectedService.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3F35] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Delivered Workpapers & Documentation
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {selectedService.deliverables.map((deliv, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#EBF4EE] border border-[#C2DFCF] text-xs text-[#1E3F35] flex items-center justify-between gap-4">
              <div>
                <span className="font-bold block">Ideal Client Posture:</span>
                <span className="text-slate-700">{selectedService.idealFor}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onOpenBooking(title);
                }}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#1E3F35] hover:bg-[#152E27] rounded-lg shadow-sm"
              >
                Schedule Consultation on {selectedService.title}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
