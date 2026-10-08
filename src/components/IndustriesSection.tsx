import React, { useState } from 'react';
import { 
  Cpu, 
  Stethoscope, 
  ShoppingBag, 
  Building, 
  Briefcase, 
  UtensilsCrossed,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { INDUSTRIES } from '../data/servicesData';
import { IndustryItem } from '../types';

interface IndustriesSectionProps {
  onOpenBooking: (industryName?: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onOpenBooking }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryItem>(INDUSTRIES[0]);

  const getIndustryIcon = (id: string) => {
    switch (id) {
      case 'tech-saas':
        return <Cpu className="w-5 h-5 text-[#1E3F35]" />;
      case 'healthcare-medical':
        return <Stethoscope className="w-5 h-5 text-[#1E3F35]" />;
      case 'ecommerce-retail':
        return <ShoppingBag className="w-5 h-5 text-[#1E3F35]" />;
      case 'real-estate':
        return <Building className="w-5 h-5 text-[#1E3F35]" />;
      case 'professional-services':
        return <Briefcase className="w-5 h-5 text-[#1E3F35]" />;
      case 'hospitality':
        return <UtensilsCrossed className="w-5 h-5 text-[#1E3F35]" />;
      default:
        return <Briefcase className="w-5 h-5 text-[#1E3F35]" />;
    }
  };

  return (
    <section id="industries" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E3F35] block">
            Specialized Industry Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-serif">
            Deep Domain Expertise Across Key Economic Sectors
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Accounting and tax regulations vary drastically across business models. We deliver proven, sector-specific strategies that address your exact compliance hurdles and unit economics.
          </p>
        </div>

        {/* Master Industry Interactive Grid & Focus Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Industry Selector List */}
          <div className="lg:col-span-5 space-y-2.5">
            {INDUSTRIES.map((ind) => {
              const isSelected = selectedIndustry.id === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#0C231C] text-white border-emerald-950 shadow-md'
                      : 'bg-[#F8FAF9] text-slate-800 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-emerald-900 text-amber-300 border border-emerald-700'
                        : 'bg-white text-[#1E3F35] border border-slate-200'
                    }`}>
                      {getIndustryIcon(ind.id)}
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold font-serif ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {ind.title}
                      </h3>
                      <p className={`text-xs line-clamp-1 ${isSelected ? 'text-emerald-200/80' : 'text-slate-500'}`}>
                        {ind.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-amber-300 translate-x-1' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Industry Focus Detail Showcase */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAFBF9] rounded-2xl border border-slate-200 p-7 sm:p-9 shadow-sm space-y-6">
              
              <div className="space-y-2 border-b border-slate-200 pb-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E3F35]">
                  {getIndustryIcon(selectedIndustry.id)}
                  <span>Industry Practice Blueprint</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
                  {selectedIndustry.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedIndustry.description}
                </p>
              </div>

              {/* Problem Solved */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
                <span className="font-bold text-amber-900 uppercase tracking-wide block text-[11px]">
                  Sector Pain Points Resolved:
                </span>
                <p className="leading-relaxed">
                  {selectedIndustry.painPointsSolved}
                </p>
              </div>

              {/* Specific Capabilities */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Tailored Practice Advisory for This Sector:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedIndustry.keyServices.map((serv, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white border border-slate-200 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-slate-800">{serv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 text-center sm:text-left">
                  Discuss your specific industry requirements with our senior financial advisors.
                </div>
                <button
                  onClick={() => onOpenBooking(selectedIndustry.title)}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-[#1E3F35] hover:bg-[#152E27] rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Schedule {selectedIndustry.title.split(' ')[0]} Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
