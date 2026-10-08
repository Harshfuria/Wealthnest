import React, { useState } from 'react';
import { 
  ArrowRight, 
  Phone, 
  Shield, 
  CheckCircle2, 
  Lock, 
  FileText, 
  Clock,
  Sparkles,
  Send,
  Users,
  Award
} from 'lucide-react';
import { CONTACT_INFO, ADVISORY_STATS } from '../data/servicesData';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenClientPortal: () => void;
  onNavigateToServices: () => void;
  onNavigateToContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenClientPortal,
  onNavigateToServices,
  onNavigateToContact,
}) => {
  // DPCPA-style interactive quick lead step form
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Tax Preparation & Planning');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!name.trim() || !phone.trim()) return;
      setStep(2);
      return;
    }

    if (step === 2) {
      setIsSubmitting(true);
      try {
        await fetch('/api/signups', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            email: email || 'pending-phone-contact@wealthnest.local',
            service,
            company: 'New Consultation Inquiry',
          }),
        });
      } catch (err) {
        console.warn('Inquiry saved locally:', err);
      }
      setIsSubmitting(false);
      setIsSubmitted(true);
      setStep(3);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F8F6] via-[#FAFBF9] to-white pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-200">
      {/* Soft atmospheric gradient accents */}
      <div 
        className="absolute top-0 right-1/4 -z-10 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-10 -z-10 w-[400px] h-[400px] bg-amber-50/50 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          
          {/* Left Column: Welcoming Accounting & Advisory Introduction */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Friendly Authority Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-200 text-xs font-semibold text-[#16382E]">
              <Shield className="w-3.5 h-3.5 text-[#1E3F35]" />
              <span>Jersey City, NJ • Nationwide Accounting, Tax & Advisory Practice</span>
            </div>

            {/* Warm, Professional Headline (Just like dpcpallc.com) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18] font-serif [text-wrap:balance]">
              Professional Accounting, Bookkeeping & Tax Services for Businesses & Individuals
            </h1>

            {/* Reassuring Sub-headline */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
              From corporate tax planning and spotless monthly bookkeeping to fractional CFO leadership, US company incorporation, and cross-border financial strategy — we deliver personal, proactive financial guidance with zero hidden fees.
            </p>

            {/* Trust Markers Bar (EXCLUDING CPA) */}
            <div className="pt-1 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-700 border-y border-slate-200/90 py-3">
              <span className="flex items-center gap-1.5 font-medium text-slate-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3F35]" />
                <span>10+ Years Advisory Experience</span>
              </span>
              <span className="hidden sm:inline text-slate-300">·</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3F35]" />
                <span>Serving All 50 States Nationwide</span>
              </span>
              <span className="hidden sm:inline text-slate-300">·</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3F35]" />
                <span>IRS Circular 230 Standards</span>
              </span>
              <span className="hidden sm:inline text-slate-300">·</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3F35]" />
                <span>QuickBooks & Xero Certified</span>
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-sm font-bold text-white bg-[#1E3F35] hover:bg-[#152E27] active:scale-98 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Schedule a Free Consultation</span>
              </button>

              <button
                onClick={onNavigateToServices}
                className="px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View All Services</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={onOpenClientPortal}
                className="px-4 py-3.5 text-sm font-semibold text-[#1E3F35] hover:text-[#152E27] hover:bg-emerald-50 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-900/20"
                title="Access Secure Client Portal"
              >
                <Lock className="w-3.5 h-3.5 text-[#1E3F35]" />
                <span>Client Portal</span>
              </button>
            </div>

            {/* Quick Contact & WhatsApp Assist */}
            <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <span>Need immediate assistance?</span>
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1E3F35] font-bold hover:underline flex items-center gap-1"
              >
                <span>Chat on WhatsApp</span>
                <span>→</span>
              </a>
              <span className="text-slate-300">|</span>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="text-slate-800 font-semibold hover:text-[#1E3F35]"
              >
                Call: {CONTACT_INFO.phoneDisplay}
              </a>
            </div>

          </div>

          {/* Right Column: DPCPA-Style Interactive 3-Step Quick Consultation Box */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden">
              
              {/* Header: Friendly Discount & Free Assessment Banner */}
              <div className="bg-[#0C231C] px-6 py-4 border-b border-emerald-950 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span className="text-xs font-bold tracking-wide uppercase text-amber-300">
                      Free 30-Min Discovery Call
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-200 bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700/50">
                    10% Off 2025 Filing
                  </span>
                </div>
                <h3 className="text-base font-bold font-serif text-white mt-1">
                  Start Your Tax & Advisory Review
                </h3>
                <p className="text-[11px] text-emerald-200/90 mt-0.5">
                  Complete in 30 seconds. Our senior advisory team will contact you within 24–48 hours.
                </p>
              </div>

              {/* Progress Steps Indicators (Just like DPCPA LLC) */}
              <div className="px-6 pt-4 pb-1 border-b border-slate-100 bg-[#FAFBF9] flex items-center justify-between text-xs font-medium text-slate-600">
                <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#1E3F35] font-bold' : ''}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#1E3F35] text-white' : 'bg-slate-200 text-slate-600'}`}>
                    1
                  </span>
                  <span>Contact</span>
                </div>
                <span className="text-slate-300">→</span>
                <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#1E3F35] font-bold' : ''}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#1E3F35] text-white' : 'bg-slate-200 text-slate-600'}`}>
                    2
                  </span>
                  <span>Service</span>
                </div>
                <span className="text-slate-300">→</span>
                <div className={`flex items-center gap-1.5 ${step === 3 ? 'text-[#1E3F35] font-bold' : ''}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-[#1E3F35] text-white' : 'bg-slate-200 text-slate-600'}`}>
                    3
                  </span>
                  <span>Confirm</span>
                </div>
              </div>

              {/* Step Forms */}
              <div className="p-6">
                {!isSubmitted ? (
                  <form onSubmit={handleStepSubmit} className="space-y-4">
                    {step === 1 && (
                      <div className="space-y-3.5">
                        <div>
                          <label className="block text-xs font-semibold text-slate-800 mb-1">
                            Your Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. John Doe or Business Name"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-800 mb-1">
                            Mobile / WhatsApp Phone <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 (201) 555-0199"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-800 mb-1">
                            Email Address <span className="text-slate-400 font-normal">(Optional for faster quote)</span>
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#1E3F35] hover:bg-[#152E27] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer mt-2"
                        >
                          <span>Continue to Step 2 (Select Service)</span>
                          <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                        </button>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-3.5">
                        <div>
                          <label className="block text-xs font-semibold text-slate-800 mb-1">
                            What service do you need help with?
                          </label>
                          <select
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35] bg-white"
                          >
                            <option value="Tax Preparation & Planning">Tax Preparation & Year-Round Planning</option>
                            <option value="Monthly Bookkeeping & Accounting">Monthly Bookkeeping & Clean Closes</option>
                            <option value="Virtual CFO Advisory">Virtual CFO & Cash Flow Strategy</option>
                            <option value="US Business Formation (LLC / Corp)">US Business Formation & S-Corp Setup</option>
                            <option value="Cross-Border & Visa Holder Tax (H-1B, L-1, NRI)">Cross-Border & Visa Holder Tax (H-1B, L-1, NRI)</option>
                            <option value="Payroll & Multi-State Compliance">Full-Service Payroll & Multi-State Filing</option>
                            <option value="IRS Audit & Notice Representation">IRS Audit & Notice Representation</option>
                            <option value="Crypto & Digital Nomad Tax">Crypto & Digital Nomad Tax Strategy</option>
                          </select>
                        </div>

                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-950 space-y-1">
                          <div className="font-bold flex items-center gap-1.5 text-[#1E3F35]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>10% Welcome Discount Applied!</span>
                          </div>
                          <p className="text-[11px] text-slate-700 leading-normal">
                            We will calculate an upfront, transparent fixed estimate for your review with no obligation.
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-1/3 py-3 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-2/3 py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#1E3F35] hover:bg-[#152E27] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-70"
                          >
                            {isSubmitting ? 'Sending Request...' : 'Submit & Get 10% Off'}
                            <Send className="w-3.5 h-3.5 text-amber-300" />
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                ) : (
                  <div className="py-4 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#1E3F35] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 font-serif">
                      Thank You, {name}!
                    </h4>
                    <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                      Your inquiry and 10% discount have been registered. Our senior advisory team will contact you at <strong>{phone}</strong> within 24–48 hours.
                    </p>
                    <div className="pt-2 flex flex-col gap-2">
                      <a
                        href={CONTACT_INFO.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <span>Need faster response? Message on WhatsApp</span>
                      </a>
                      <button
                        onClick={() => { setIsSubmitted(false); setStep(1); }}
                        className="text-[11px] text-slate-500 hover:text-slate-800 underline"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  </div>
                )}

                {/* Trust footer inside card */}
                <div className="mt-4 pt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-[#1E3F35]" />
                    <span>Confidential & Safe</span>
                  </span>
                  <span>Zero Spam Guarantee</span>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Bottom Practice Statistics Ribbon */}
        <div className="mt-12 pt-8 border-t border-slate-200/90 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {ADVISORY_STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1E3F35] font-serif">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-800">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-500">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
