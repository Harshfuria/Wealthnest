import React from 'react';
import { CASE_STUDIES } from '../data/servicesData';
import { TrendingUp, ArrowRight, Quote, Star, CheckCircle2 } from 'lucide-react';

interface ProofAndCaseStudiesProps {
  onOpenBooking: () => void;
}

export const ProofAndCaseStudies: React.FC<ProofAndCaseStudiesProps> = ({ onOpenBooking }) => {
  return (
    <section id="case-studies" className="py-20 md:py-28 bg-[#F8FAF9] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="text-xs font-bold text-[#1E3F35] tracking-wider uppercase block">
            Proven Client Outcomes
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-serif">
            Measurable Financial Returns & Tax Reduction Case Studies
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Real outcomes delivered by Wealthnest Advisory through disciplined monthly bookkeeping, legal tax deduction optimization, and strategic fractional CFO stewardship.
          </p>
        </div>

        {/* 3 Case Study Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {CASE_STUDIES.map((study, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 hover:border-[#1E3F35]/40 hover:shadow-md transition-all"
            >
              <div>
                {/* Meta details with zero pills */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 pb-3 border-b border-slate-100">
                  <span className="text-[#1E3F35] font-mono font-bold">Case Study 0{idx + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-700">{study.industry}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-serif mb-4">
                  {study.clientType}
                </h3>

                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      The Challenge
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[#1E3F35] uppercase tracking-wider block mb-1">
                      Wealthnest Solution
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {study.solution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantified Metrics Box */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                  Quantified Return:
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {study.impactMetrics.map((metric, mIdx) => (
                    <div
                      key={mIdx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs"
                    >
                      <span className="text-slate-600 font-medium">{metric.label}</span>
                      <span className="text-xs font-bold text-[#1E3F35] font-mono">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Testimonials Quote Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <Quote className="w-8 h-8 text-emerald-800/20" />
            <p className="text-sm text-slate-700 italic leading-relaxed">
              "Switching to Wealthnest Advisory completely transformed our accounting. They uncovered over $38,000 in missed deductions from our previous firm and automated our 14-state sales tax returns. Having direct partner access via our portal gives us true peace of mind."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900 block font-serif">Marcus Vance</span>
                <span className="text-slate-500">Managing Partner, Logistics Group</span>
              </div>
              <span className="text-emerald-800 font-bold">50-State Engagement</span>
            </div>
          </div>

          <div className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <Quote className="w-8 h-8 text-emerald-800/20" />
            <p className="text-sm text-slate-700 italic leading-relaxed">
              "Their Virtual CFO leadership gave our board clear 13-week cash projections before our venture capital raise. They don't just record historical numbers; they actively help us make forward-looking capital decisions. Highly recommended for any serious business."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900 block font-serif">Elena Rostova</span>
                <span className="text-slate-500">Co-Founder & CEO, HealthTech Solutions</span>
              </div>
              <span className="text-emerald-800 font-bold">Virtual CFO Client</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
