import React, { useState } from 'react';
import { SERVICES, CONTACT_INFO } from '../data/servicesData';
import { Check, ArrowUpRight, MessageSquare, Calculator, Layers, Landmark, Scale, Coins } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesBentoProps {
  onSelectServiceForCalculator: (serviceId: string) => void;
  onOpenBooking: () => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({
  onSelectServiceForCalculator,
  onOpenBooking,
}) => {
  const [filter, setFilter] = useState<'all' | 'accounting' | 'tax' | 'cfo' | 'capital'>('all');

  const filteredServices = SERVICES.filter((service) => {
    if (filter === 'all') return true;
    if (filter === 'accounting') return service.id === 'bookkeeper' || service.id === 'sr-bookkeeper' || service.id === 'payroll';
    if (filter === 'tax') return service.id === 'tax-filing' || service.id === 'sales-tax';
    if (filter === 'cfo') return service.id === 'virtual-cfo';
    if (filter === 'capital') return service.id === 'ar-collections' || service.id === 'commercial-financing';
    return true;
  });

  return (
    <section id="services" className="py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with editorial style */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="text-xs font-semibold text-[#1E3F35] tracking-wider uppercase">
            01. Core Capabilities & Practice Scope
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
            Full-Spectrum Accounting, Tax, Virtual CFO & Commercial Capital
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From spotless daily ledgers and multi-state compliance to AR debt recovery and institutional debt facilities (ABL, invoice factoring, hard lending), our practice delivers comprehensive fiscal control.
          </p>
        </div>

        {/* Practice Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-slate-200 pb-4">
          {[
            { id: 'all', label: 'All Practice Areas' },
            { id: 'accounting', label: 'Accounting & Payroll' },
            { id: 'tax', label: 'Federal & Sales Tax' },
            { id: 'cfo', label: 'Virtual CFO Leadership' },
            { id: 'capital', label: 'Collections & Commercial Financing' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                filter === tab.id
                  ? 'bg-[#1E3F35] text-white border-[#152E27] shadow-sm'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service: ServiceItem, index: number) => {
            const isFeatured = service.id === 'virtual-cfo' || service.id === 'commercial-financing' || service.id === 'ar-collections';

            return (
              <div
                key={service.id}
                className={`relative flex flex-col justify-between rounded-2xl bg-[#F8FAF9] border transition-all duration-200 hover:border-emerald-300 hover:bg-white hover:shadow-md ${
                  isFeatured
                    ? 'border-emerald-300/80 shadow-sm'
                    : 'border-slate-200'
                } p-6 sm:p-8`}
              >
                <div>
                  {/* Clean unboxed kicker with index and category */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-200">
                    <span className="font-mono text-[#1E3F35] font-semibold">
                      0{index + 1}
                    </span>
                    <span className="text-slate-700 font-mono text-xs font-medium">
                      {service.rateLabel}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Catchy Domain-Specific Mini Graphics - Subtle Money Saver Palette */}
                  {service.id === 'commercial-financing' && (
                    <div className="mb-5 p-3 rounded-xl bg-white border border-slate-200 overflow-hidden shadow-xs">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#1E3F35] mb-1.5 font-bold uppercase">
                        <span>Capital Spectrum</span>
                        <span>$250K - $25M+</span>
                      </div>
                      <svg viewBox="0 0 280 44" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="35" y1="22" x2="135" y2="22" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />
                        <line x1="145" y1="22" x2="245" y2="22" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />
                        <g>
                          <rect x="5" y="6" width="60" height="32" rx="6" fill="#F8FAF9" stroke="#94A3B8" strokeWidth="1" />
                          <text x="35" y="21" textAnchor="middle" fill="#0F172A" fontSize="8" fontWeight="bold">Hard Loan</text>
                          <text x="35" y="31" textAnchor="middle" fill="#475569" fontSize="7" fontFamily="monospace">65-75%</text>
                        </g>
                        <g>
                          <rect x="110" y="6" width="60" height="32" rx="6" fill="#EBF4EE" stroke="#1E3F35" strokeWidth="1.5" />
                          <text x="140" y="21" textAnchor="middle" fill="#1E3F35" fontSize="8" fontWeight="bold">ABL Line</text>
                          <text x="140" y="31" textAnchor="middle" fill="#1E3F35" fontSize="7" fontFamily="monospace">Revolver</text>
                        </g>
                        <g>
                          <rect x="215" y="6" width="60" height="32" rx="6" fill="#F8FAF9" stroke="#94A3B8" strokeWidth="1" />
                          <text x="245" y="21" textAnchor="middle" fill="#0F172A" fontSize="8" fontWeight="bold">Factoring</text>
                          <text x="245" y="31" textAnchor="middle" fill="#475569" fontSize="7" fontFamily="monospace">90% 24h</text>
                        </g>
                      </svg>
                    </div>
                  )}

                  {service.id === 'ar-collections' && (
                    <div className="mb-5 p-3 rounded-xl bg-white border border-slate-200 overflow-hidden shadow-xs">
                      <div className="flex items-center justify-between text-[10px] font-mono text-emerald-800 mb-1.5 font-bold uppercase">
                        <span>Recovery Pipeline</span>
                        <span>Contingency 100%</span>
                      </div>
                      <svg viewBox="0 0 280 44" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5" y="10" width="80" height="24" rx="4" fill="#EBF4EE" stroke="#1E3F35" strokeWidth="1" />
                        <text x="45" y="25" textAnchor="middle" fill="#1E3F35" fontSize="8" fontWeight="bold">1-30d (94%)</text>
                        <path d="M 85 22 L 100 22" stroke="#CBD5E1" strokeWidth="2" />
                        <rect x="100" y="10" width="80" height="24" rx="4" fill="#F8FAF9" stroke="#94A3B8" strokeWidth="1" />
                        <text x="140" y="25" textAnchor="middle" fill="#334155" fontSize="8" fontWeight="bold">Skip-Trace (82%)</text>
                        <path d="M 180 22 L 195 22" stroke="#CBD5E1" strokeWidth="2" />
                        <rect x="195" y="10" width="80" height="24" rx="4" fill="#F8FAF9" stroke="#94A3B8" strokeWidth="1" />
                        <text x="235" y="25" textAnchor="middle" fill="#334155" fontSize="8" fontWeight="bold">Legal Nexus</text>
                      </svg>
                    </div>
                  )}

                  {service.id === 'virtual-cfo' && (
                    <div className="mb-5 p-3 rounded-xl bg-white border border-slate-200 overflow-hidden shadow-xs">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#1E3F35] mb-1.5 font-bold uppercase">
                        <span>Executive Velocity</span>
                        <span>Burn & Runway</span>
                      </div>
                      <svg viewBox="0 0 280 44" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 10 36 Q 70 30 140 18 T 270 8" stroke="#1E3F35" strokeWidth="2.5" fill="none" />
                        <circle cx="10" cy="36" r="3" fill="#4E876A" />
                        <circle cx="140" cy="18" r="3" fill="#1E3F35" />
                        <circle cx="270" cy="8" r="3.5" fill="#1E3F35" />
                        <text x="235" y="28" fill="#1E3F35" fontSize="8" fontWeight="bold" fontFamily="monospace">+32% Margin</text>
                      </svg>
                    </div>
                  )}

                  {/* Highlights list */}
                  <div className="space-y-2.5 mb-6">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Scope Includes:
                    </div>
                    {service.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-[#1E3F35] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Ideal for note */}
                  <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200 mb-6">
                    <span className="text-[#1E3F35] font-semibold">Best suited for: </span>
                    {service.idealFor}
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectServiceForCalculator(service.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3F35] hover:text-[#152E27] transition-colors"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Configure Scope</span>
                  </button>

                  <a
                    href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(`Hi Wealthnest Advisory, I would like to inquire about ${service.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    <MessageSquare className="w-3 h-3 text-emerald-700" />
                    <span>Inquire</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global CTA Banner beneath Bento Grid */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#EBF4EE] border border-[#C2DFCF] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-slate-900">Need an Integrated Capital & Accounting Retainer?</h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Combine routine bookkeeping, corporate tax preparation, and ABL / invoice financing advisory under a single engagement.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-5 py-3 text-xs font-bold text-white bg-[#1E3F35] rounded-lg hover:bg-[#152E27] transition-colors whitespace-nowrap shadow-sm"
          >
            Schedule Discovery Consultation
          </button>
        </div>

      </div>
    </section>
  );
};
