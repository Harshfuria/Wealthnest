import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/servicesData';
import { MessageSquare, Mail, Layers, CheckCircle2, ArrowRight, Scale, Coins } from 'lucide-react';

interface RateEstimatorProps {
  onPreFillContact: (quoteSummary: string) => void;
}

export const RateEstimator: React.FC<RateEstimatorProps> = ({ onPreFillContact }) => {
  // State for scope customization
  const [bookkeepingTier, setBookkeepingTier] = useState<'none' | 'junior' | 'senior'>('junior');
  const [bookkeepingHours, setBookkeepingHours] = useState<number>(15);
  const [taxFilingType, setTaxFilingType] = useState<string>('business');
  const [cfoHours, setCfoHours] = useState<number>(5);
  const [payrollSize, setPayrollSize] = useState<string>('team_small');
  const [salesTaxStates, setSalesTaxStates] = useState<string>('single');
  const [collectionsTier, setCollectionsTier] = useState<string>('none');
  const [financingNeed, setFinancingNeed] = useState<string>('none');

  // Generate Scope summary text
  const getSelectedServicesList = () => {
    const list: string[] = [];

    if (bookkeepingTier === 'junior') {
      list.push(`Standard Bookkeeper (~${bookkeepingHours} hrs/month)`);
    } else if (bookkeepingTier === 'senior') {
      list.push(`Sr. Bookkeeper (~${bookkeepingHours} hrs/month, accruals & audit ready)`);
    }

    if (taxFilingType === 'individual') {
      list.push('Individual Tax Filing (Form 1040, schedules, federal + state)');
    } else if (taxFilingType === 'business') {
      list.push('Business Tax Filing (S-Corp 1120-S / LLC / C-Corp 1120 / 1065)');
    } else if (taxFilingType === 'both') {
      list.push('Combined Tax Filing (Business Corporate Return + Owner Personal 1040)');
    }

    if (cfoHours > 0) {
      list.push(`Virtual CFO Advisory (~${cfoHours} hrs/month, forecasting & cash runway)`);
    }

    if (payrollSize !== 'none') {
      const payrollLabel =
        payrollSize === 'team_small' ? '1–5 Employees / Contractors' :
        payrollSize === 'team_medium' ? '6–15 Employees / Contractors' : '16+ Employees / Multi-State';
      list.push(`Full-Fledged Payroll (${payrollLabel})`);
    }

    if (salesTaxStates !== 'none') {
      const stateLabel =
        salesTaxStates === 'single' ? '1 Home State' :
        salesTaxStates === 'regional' ? '2–5 Economic Nexus States' : '6+ Multi-State Jurisdictions';
      list.push(`Sales Tax Compliance (${stateLabel})`);
    }

    if (collectionsTier === 'maintenance') {
      list.push('AR Collections: Ongoing Ledger Maintenance & Preventive Dunning (<60 days)');
    } else if (collectionsTier === 'recovery') {
      list.push('AR Collections: Stale Bad Debt Recovery & Dispute Resolution (60–120+ days)');
    }

    if (financingNeed === 'invoice_factoring') {
      list.push('Commercial Financing: Invoice Factoring (Immediate liquidity on unpaid AR)');
    } else if (financingNeed === 'abl') {
      list.push('Commercial Financing: Asset-Based Lending (ABL Revolving Credit Facility)');
    } else if (financingNeed === 'hard_money') {
      list.push('Commercial Financing: Hard Money & Asset-Backed Bridge Lending');
    }

    return list;
  };

  const selectedServices = getSelectedServicesList();

  const generatedBlueprintText = `WEALTHNEST ADVISORY - SCOPE ESTIMATE INQUIRY
Selected Scope Requirements:
${selectedServices.map((s, idx) => `• ${s}`).join('\n')}

Please provide a tailored proposal and engagement scope for our company.`;

  const handleSendViaWhatsApp = () => {
    const url = `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(generatedBlueprintText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePreFillForm = () => {
    onPreFillContact(generatedBlueprintText);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="calculator" className="py-20 md:py-28 bg-[#F8FAF9] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs font-semibold text-[#1E3F35] tracking-wider uppercase">
            03. Interactive Scope Configurator
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
            Build Your Custom Advisory Scope
          </h2>
          <p className="text-base text-slate-600">
            Select the services and volume criteria corresponding to your business needs to generate an itemized Scope Blueprint. We will review your profile and provide a bespoke engagement proposal.
          </p>
        </div>

        {/* Builder Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-7 shadow-sm">
            
            {/* Control 1: Bookkeeping Support */}
            <div className="space-y-3 pb-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#1E3F35]" />
                  <span>1. Bookkeeping & Account Reconciliation</span>
                </label>
              </div>

              {/* Tier Selection */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setBookkeepingTier('none')}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                    bookkeepingTier === 'none'
                      ? 'bg-[#1E3F35] text-white font-bold border-[#1E3F35]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  No Bookkeeping
                </button>
                <button
                  type="button"
                  onClick={() => setBookkeepingTier('junior')}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                    bookkeepingTier === 'junior'
                      ? 'bg-[#1E3F35] text-white font-bold border-[#1E3F35]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Standard Bookkeeper
                </button>
                <button
                  type="button"
                  onClick={() => setBookkeepingTier('senior')}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                    bookkeepingTier === 'senior'
                      ? 'bg-[#1E3F35] text-white font-bold border-[#1E3F35]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Sr. Bookkeeper (Accruals)
                </button>
              </div>

              {/* Hours Slider if tier active */}
              {bookkeepingTier !== 'none' && (
                <div className="pt-2 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Estimated Monthly Hours:</span>
                    <span className="font-semibold text-[#1E3F35]">
                      {bookkeepingHours} hours / month
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    value={bookkeepingHours}
                    onChange={(e) => setBookkeepingHours(Number(e.target.value))}
                    className="w-full cursor-pointer accent-[#1E3F35]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>5 hrs (Light volume)</span>
                    <span>30 hrs (Moderate)</span>
                    <span>60+ hrs (High volume)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Control 2: Tax Preparation */}
            <div className="space-y-3 pb-6 border-b border-slate-100">
              <label className="text-sm font-bold text-slate-900 block">
                2. Tax Preparation & Filing Requirements
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'none', label: 'None' },
                  { id: 'individual', label: 'Individual 1040' },
                  { id: 'business', label: 'Business Entity' },
                  { id: 'both', label: 'Business + Personal' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTaxFilingType(item.id)}
                    className={`py-2 px-2.5 text-xs rounded-lg border transition-all text-center ${
                      taxFilingType === item.id
                        ? 'bg-[#1E3F35] text-white font-bold border-[#1E3F35]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Virtual CFO Strategic Advisory */}
            <div className="space-y-3 pb-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-900 block">
                  3. Virtual CFO Leadership & Financial Modeling
                </label>
                <span className="text-xs font-semibold text-[#1E3F35]">
                  {cfoHours === 0 ? 'None selected' : `${cfoHours} hrs / month`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="5"
                value={cfoHours}
                onChange={(e) => setCfoHours(Number(e.target.value))}
                className="w-full cursor-pointer accent-[#1E3F35]"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>0 hrs</span>
                <span>5 hrs (Runway check)</span>
                <span>15 hrs (Active CFO)</span>
                <span>25 hrs (Full Fractional)</span>
              </div>
            </div>

            {/* Control 4: Payroll & Team Size */}
            <div className="space-y-3 pb-6 border-b border-slate-100">
              <label className="text-sm font-bold text-slate-900 block">
                4. Full-Fledged Payroll Service (Direct Deposit & Filings)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'none', label: 'None' },
                  { id: 'team_small', label: '1–5 Staff' },
                  { id: 'team_medium', label: '6–15 Staff' },
                  { id: 'team_large', label: '16+ Staff' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPayrollSize(item.id)}
                    className={`py-2 px-2.5 text-xs rounded-lg border transition-all text-center ${
                      payrollSize === item.id
                        ? 'bg-[#1E3F35] text-white font-bold border-[#1E3F35]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 5: Sales Tax States */}
            <div className="space-y-3 pb-6 border-b border-slate-100">
              <label className="text-sm font-bold text-slate-900 block">
                5. Sales Tax Compliance (Nexus Filings)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'none', label: 'None' },
                  { id: 'single', label: '1 State' },
                  { id: 'regional', label: '2–5 States' },
                  { id: 'multi', label: '6+ States' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSalesTaxStates(item.id)}
                    className={`py-2 px-2.5 text-xs rounded-lg border transition-all text-center ${
                      salesTaxStates === item.id
                        ? 'bg-[#1E3F35] text-white font-bold border-[#1E3F35]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 6: AR Collections & Debt Recovery */}
            <div className="space-y-3 pb-6 border-b border-slate-100">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#1E3F35]" />
                <span>6. AR Collections & Bad Debt Recovery</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'none', label: 'None' },
                  { id: 'maintenance', label: 'Active AR (<60 Days)' },
                  { id: 'recovery', label: 'Stale Recovery (60–120+ Days)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCollectionsTier(item.id)}
                    className={`py-2 px-2.5 text-xs rounded-lg border transition-all text-center ${
                      collectionsTier === item.id
                        ? 'bg-[#1E3F35] text-white font-bold border-[#1E3F35]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 7: Commercial Financing & Capital */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Coins className="w-4 h-4 text-[#1E3F35]" />
                <span>7. Commercial Financing & Capital Needs</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'none', label: 'None' },
                  { id: 'invoice_factoring', label: 'Invoice Factoring' },
                  { id: 'abl', label: 'Asset-Based Lending (ABL)' },
                  { id: 'hard_money', label: 'Hard Money / Bridge' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFinancingNeed(item.id)}
                    className={`py-2 px-2 text-xs rounded-lg border transition-all text-center ${
                      financingNeed === item.id
                        ? 'bg-[#1E3F35] text-white font-bold border-[#1E3F35]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Scope Blueprint Preview & Dispatch */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm sticky top-24">
            
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F35]">
                  Scope Blueprint
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  Status: Open-Ended Proposal
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Your Custom Advisory Plan</h3>
              <p className="text-xs text-slate-500 mt-1">
                Calibrated to your exact operational parameters.
              </p>
            </div>

            {/* Selected Breakdown List */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider block">
                Configured Services ({selectedServices.length}):
              </span>

              {selectedServices.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-50 text-center text-xs text-slate-500">
                  Select at least one service option on the left to configure your scope blueprint.
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedServices.map((service, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#F8FAF9] border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#1E3F35] shrink-0 mt-0.5" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Advisory Guarantee Box */}
            <div className="p-3.5 rounded-xl bg-[#EBF4EE] border border-[#D5E7DC] text-xs text-slate-700 space-y-1">
              <div className="font-semibold text-[#1E3F35] flex items-center gap-1.5">
                <span>Wealthnest Transparent Engagement Guarantee</span>
              </div>
              <p className="text-slate-600">
                No hidden overhead or surprise charges. We provide transparent timesheets, signed NDAs, and clear milestone deliverables before initiating work.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleSendViaWhatsApp}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-[#1E3F35] rounded-lg hover:bg-[#163028] transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Send Scope to WhatsApp ({CONTACT_INFO.phoneDisplay})</span>
              </button>

              <button
                type="button"
                onClick={handlePreFillForm}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#1E3F35]" />
                <span>Email Scope to {CONTACT_INFO.email}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
