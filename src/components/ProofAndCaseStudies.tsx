import React from 'react';
import { CASE_STUDIES } from '../data/servicesData';
import { TrendingUp, ArrowRight } from 'lucide-react';

interface ProofAndCaseStudiesProps {
  onOpenBooking: () => void;
}

export const ProofAndCaseStudies: React.FC<ProofAndCaseStudiesProps> = ({ onOpenBooking }) => {
  return (
    <section id="case-studies" className="py-20 md:py-28 bg-[#F8FAF9] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs font-semibold text-[#1E3F35] tracking-wider uppercase">
            05. Verified Operational Impact
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
            Measurable Financial Returns Across Real Client Engagements
          </h2>
          <p className="text-base text-slate-600">
            Real outcomes delivered by Wealthnest Advisory through disciplined bookkeeping, aggressive legal tax deductions, and strategic CFO stewardship.
          </p>
        </div>

        {/* 3 Case Study Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <div>
                {/* Meta details with zero pills */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 pb-3 border-b border-slate-100">
                  <span className="text-[#1E3F35] font-mono font-bold">Case 0{idx + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-700">{study.industry}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-4">
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
                <div className="space-y-2">
                  {study.impactMetrics.map((metric, mIdx) => (
                    <div
                      key={mIdx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-[#F8FAF9] border border-slate-200"
                    >
                      <span className="text-xs text-slate-600">{metric.label}</span>
                      <span className="font-mono text-sm font-bold text-[#1E3F35] tabular-nums">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Adjacency prompt */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E3F35] hover:text-[#163028] underline underline-offset-4"
          >
            <span>Discuss your company’s financial situation during a 20-minute discovery call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
