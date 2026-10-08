import React from 'react';
import { Shield, Check, X, Users, Award, Lock, Clock, HeartHandshake, PhoneCall } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/servicesData';

interface WhyChooseUsProps {
  onOpenBooking: () => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsProps> = ({ onOpenBooking }) => {
  return (
    <section id="why-us" className="py-20 md:py-28 bg-[#F8FAF9] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E3F35] block">
            The Wealthnest Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-serif">
            Why Discerning Businesses Choose Wealthnest Advisory
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            We built Wealthnest Advisory to deliver what business owners have long asked for: personal partner involvement, proactive tax mitigation before year-end, and predictable engagements without the fear of an hourly clock ticking.
          </p>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {WHY_CHOOSE_US.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-[#1E3F35]/40 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EBF4EE] border border-[#C2DFCF] flex items-center justify-center text-[#1E3F35] font-serif font-bold text-sm">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                {pillar.title}
              </h3>
              <p className="text-xs font-semibold text-emerald-800">
                {pillar.description}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {pillar.detail}
              </p>
            </div>
          ))}

          {/* 6th Card: Direct Availability */}
          <div className="p-6 rounded-2xl bg-[#0C231C] text-white border border-emerald-950 shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300">
                Direct Communication
              </span>
              <h3 className="text-lg font-bold font-serif text-white">
                Direct WhatsApp & Phone Line to Your Advisor
              </h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                No tickets, no automated phone trees, and no waiting weeks for a simple reply. Communicate directly through your client vault or WhatsApp.
              </p>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#0C231C] bg-amber-400 hover:bg-amber-300 transition-all text-center cursor-pointer"
            >
              Experience the Difference
            </button>
          </div>
        </div>

        {/* Comparison Matrix: Wealthnest vs Traditional Firms vs Automated Apps */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 bg-slate-50 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 font-serif">
              How We Compare to Traditional Alternatives
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              A side-by-side evaluation of practice models.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-[#FAFBF9] border-b border-slate-200 font-serif text-slate-900 text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6 font-bold">Advisory Feature</th>
                  <th className="py-3.5 px-6 font-bold text-[#1E3F35] bg-emerald-50/60">
                    Wealthnest Advisory
                  </th>
                  <th className="py-3.5 px-6 font-medium text-slate-500">
                    Traditional Accounting Firms
                  </th>
                  <th className="py-3.5 px-6 font-medium text-slate-500">
                    Automated Tax / DIY Apps
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3.5 px-6 font-semibold text-slate-900">
                    Advisor Level
                  </td>
                  <td className="py-3.5 px-6 text-[#1E3F35] font-bold bg-emerald-50/30">
                    Direct Partner & Senior Advisor
                  </td>
                  <td className="py-3.5 px-6 text-slate-600">
                    Passed to Junior Clerks
                  </td>
                  <td className="py-3.5 px-6 text-slate-600">
                    Algorithms & General Call Center
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-semibold text-slate-900">
                    Tax Planning Frequency
                  </td>
                  <td className="py-3.5 px-6 text-[#1E3F35] font-bold bg-emerald-50/30">
                    Proactive Year-Round & Quarterly
                  </td>
                  <td className="py-3.5 px-6 text-slate-600">
                    Once-a-Year in March / April
                  </td>
                  <td className="py-3.5 px-6 text-slate-600">
                    None (Historical form filling only)
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-semibold text-slate-900">
                    Billing Structure
                  </td>
                  <td className="py-3.5 px-6 text-[#1E3F35] font-bold bg-emerald-50/30">
                    Fixed, Transparent Agreed Scope
                  </td>
                  <td className="py-3.5 px-6 text-slate-600">
                    Unpredictable Hourly Invoices
                  </td>
                  <td className="py-3.5 px-6 text-slate-600">
                    Subscription with Aggressive Upsells
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-semibold text-slate-900">
                    Multi-State & Nexus Reach
                  </td>
                  <td className="py-3.5 px-6 text-[#1E3F35] font-bold bg-emerald-50/30">
                    Full 50-State Practice
                  </td>
                  <td className="py-3.5 px-6 text-slate-600">
                    Often Local State Only
                  </td>
                  <td className="py-3.5 px-6 text-slate-600">
                    Fragmented / Unsupported
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-semibold text-slate-900">
                    Document Security
                  </td>
                  <td className="py-3.5 px-6 text-[#1E3F35] font-bold bg-emerald-50/30">
                    256-Bit Encrypted Client Portal
                  </td>
                  <td className="py-3.5 px-6 text-slate-600">
                    Insecure Email Attachments
                  </td>
                  <td className="py-3.5 px-6 text-slate-600">
                    Data Monetization Exposure
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
