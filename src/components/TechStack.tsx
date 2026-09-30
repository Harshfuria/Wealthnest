import React from 'react';
import { TECH_STACK } from '../data/servicesData';
import { CheckCircle2, Layers } from 'lucide-react';

export const TechStack: React.FC = () => {
  return (
    <section id="tech-stack" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs font-semibold text-[#1E3F35] tracking-wider uppercase">
            04. Software & Integration Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
            Seamless Integration with Your Financial Stack
          </h2>
          <p className="text-base text-slate-600">
            We do not require you to migrate systems or change platforms. Our accounting and virtual CFO team embeds natively into your current enterprise and cloud software.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              className="p-5 rounded-xl bg-[#F8FAF9] border border-slate-200 hover:border-[#1E3F35]/50 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-medium text-[#1E3F35]">
                  {tech.category}
                </span>
                <CheckCircle2 className="w-4 h-4 text-[#1E3F35] group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">{tech.name}</h3>
              <p className="text-xs text-slate-600">{tech.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-[#EBF4EE]/70 border border-[#D5E7DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#1E3F35] shrink-0" />
            <span>Using a proprietary internal database or custom ERP like SAP or Sage? We support custom API and spreadsheet ingestion.</span>
          </div>
          <span className="text-[#1E3F35] font-semibold whitespace-nowrap">Bank-Grade 256-Bit Security</span>
        </div>

      </div>
    </section>
  );
};
