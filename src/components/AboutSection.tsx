import React from 'react';
import { Shield, CheckCircle2, ArrowRight, Award, Users, Lock, Sparkles, Scale } from 'lucide-react';
import { CONTACT_INFO } from '../data/servicesData';

interface AboutSectionProps {
  onOpenBooking: () => void;
  onOpenClientPortal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenBooking,
  onOpenClientPortal,
}) => {
  return (
    <section id="about" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E3F35]">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>About Wealthnest Advisory LLC</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-serif leading-tight">
            A Strategic Accounting & Business Advisory Practice Built on Precision, Trust & Real Relationships
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            We are a full-service strategic accounting, tax planning, and business advisory firm based in Jersey City, New Jersey, serving clients nationwide across all 50 states. We bridge the gap between traditional accounting rigor and modern, cloud-first financial agility.
          </p>
        </div>

        {/* Narrative & Value Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Our Philosophy & Story */}
          <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            <p>
              At <strong>Wealthnest Advisory</strong>, we believe every business owner, startup founder, and high-net-worth family deserves proactive, partner-level financial leadership. Traditional accounting firms often treat clients like once-a-year tax numbers, reaching out only when deadlines loom in April.
            </p>
            <p>
              We take a radically different approach: <strong>continuous, year-round strategic partnership</strong>. We actively monitor your cash flow, analyze multi-state tax exposures, review quarterly distributions, and structure your corporate entity to legally minimize liabilities before the year closes.
            </p>

            {/* Key Firm Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#F8FAF9] border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1 font-serif">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3F35]" />
                  <span>Partner-Led Involvement</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  You work directly with seasoned tax strategists, enrolled advisors, and senior financial directors. No junior handoffs or opaque communication.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAF9] border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1 font-serif">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3F35]" />
                  <span>Proactive Tax Shield</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  Quarterly strategy sessions and projected voucher adjustments to prevent unexpected IRS penalties.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAF9] border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1 font-serif">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3F35]" />
                  <span>50-State Practice Reach</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  Seamless multi-state tax returns, economic nexus compliance, and foreign corporate registrations nationwide.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAF9] border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1 font-serif">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3F35]" />
                  <span>256-Bit Encrypted Vault</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  Bank-grade digital portal ensuring your confidential tax files and identity documents remain private.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-5 py-3 text-xs font-bold text-white bg-[#1E3F35] hover:bg-[#152E27] rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Schedule a Discovery Call</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </button>

              <button
                onClick={onOpenClientPortal}
                className="px-4 py-3 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#1E3F35]" />
                <span>Client Portal Access</span>
              </button>
            </div>
          </div>

          {/* Right: Institutional Credentials & Quality Assurances */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-2xl bg-[#0F261E] text-white border border-emerald-950 shadow-xl space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                  Professional Practice Standards
                </span>
                <h3 className="text-xl font-bold font-serif text-white">
                  Our Professional Pledge
                </h3>
              </div>

              <ul className="space-y-3.5 text-xs text-emerald-100/90 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-800/80 flex items-center justify-center shrink-0 mt-0.5 text-amber-300">
                    ✓
                  </div>
                  <span>
                    <strong>IRS Circular 230 Standards:</strong> Strict adherence to ethical federal tax representation rules, ensuring lawful advocacy and transparent client disclosures.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-800/80 flex items-center justify-center shrink-0 mt-0.5 text-amber-300">
                    ✓
                  </div>
                  <span>
                    <strong>Bilateral Confidentiality & NDA:</strong> Every client relationship is governed by comprehensive non-disclosure protections from day one.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-800/80 flex items-center justify-center shrink-0 mt-0.5 text-amber-300">
                    ✓
                  </div>
                  <span>
                    <strong>QuickBooks & Xero Certified:</strong> Certified ProAdvisor practices utilizing modern, automated reconciliation workflows for real-time accuracy.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-800/80 flex items-center justify-center shrink-0 mt-0.5 text-amber-300">
                    ✓
                  </div>
                  <span>
                    <strong>Zero-Penalty Guarantee:</strong> We stand behind the timeliness and filing accuracy of our managed payroll and tax returns.
                  </span>
                </li>
              </ul>

              <div className="pt-2 border-t border-emerald-800/60 flex items-center justify-between text-[11px] text-emerald-300/80 font-mono">
                <span>Direct Contact:</span>
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-amber-300 hover:underline">
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
