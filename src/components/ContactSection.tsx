import React, { useState, useEffect } from 'react';
import { CONTACT_INFO } from '../data/servicesData';
import { MessageSquare, Mail, Phone, Clock, Send, CheckCircle2, Copy } from 'lucide-react';

interface ContactSectionProps {
  prefilledMessage?: string;
  onClearPrefill?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefilledMessage = '',
  onClearPrefill,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [selectedService, setSelectedService] = useState('Bookkeeper ($12/hr)');
  const [message, setMessage] = useState(prefilledMessage);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (prefilledMessage) {
      setMessage(prefilledMessage);
    }
  }, [prefilledMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim()) {
      setErrorMessage('Please provide both your name and a valid email address.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch('/api/signups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          company: companyName.trim() || `${fullName.trim()}'s Business`,
          service: selectedService,
          scopeDetails: message.slice(0, 200),
          estimatedBudget: 'Proposal Request',
          source: 'Website Contact Section',
          notes: message || 'Inquiry sent via contact section form.',
        }),
      });
    } catch (err) {
      console.warn('Could not record contact lead to backend:', err);
    }

    // Client-side confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleOpenMailClient = () => {
    const subject = encodeURIComponent(`Inquiry for Wealthnest Advisory - ${fullName || 'Client Inquiry'}`);
    const body = encodeURIComponent(
      `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${companyName}\nService: ${selectedService}\n\nProject Scope / Notes:\n${message}`
    );
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F8FAF9] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs font-semibold text-[#1E3F35] tracking-wider uppercase">
            07. Initiate Engagement
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
            Let’s Discuss Your Accounting, Tax & CFO Requirements
          </h2>
          <p className="text-base text-slate-600">
            Reach out directly through WhatsApp for immediate response or submit a project proposal request below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Direct Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EBF4EE] border border-[#D5E7DC] flex items-center justify-center text-[#1E3F35]">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Direct WhatsApp</h3>
                  <p className="text-xs text-slate-500">Fastest channel for immediate inquiries</p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-mono text-xl font-bold text-[#1E3F35]">
                  {CONTACT_INFO.phoneDisplay}
                </div>
                <div className="text-xs text-slate-500">
                  Direct Line: <span className="font-mono text-slate-800 font-semibold">2016162843</span>
                </div>
              </div>

              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Wealthnest Advisory, I would like to schedule an introductory consultation for my business.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-[#1E3F35] rounded-lg hover:bg-[#163028] transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Launch WhatsApp Chat Now</span>
              </a>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#1E3F35]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Direct Email Inquiries</h3>
                  <p className="text-xs text-slate-500">Detailed RFPs, tax notices & financials</p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-mono text-sm sm:text-base font-bold text-slate-900 break-all">
                  {CONTACT_INFO.email}
                </div>
                <div className="text-xs text-slate-500">
                  Monitored continuously during business hours
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold text-white bg-[#1E3F35] rounded-lg hover:bg-[#163028] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Direct Email</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2.5 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
                  title="Copy email address"
                >
                  {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-[#1E3F35]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Practice Operating Hours */}
            <div className="p-5 rounded-xl bg-[#EBF4EE]/70 border border-[#D5E7DC] space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2 text-[#1E3F35] font-semibold">
                <Clock className="w-4 h-4 text-[#1E3F35]" />
                <span>Advisory Office Hours</span>
              </div>
              <p className="text-slate-600">{CONTACT_INFO.hours}</p>
              <p className="text-slate-600">Serving clients nationwide across all US time zones.</p>
            </div>

          </div>

          {/* Right Column: Interactive Proposal Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-[#EBF4EE] text-[#1E3F35] border border-[#D5E7DC] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Proposal Request Received</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-slate-900">{fullName}</span>. We have recorded your project inquiry for <span className="text-[#1E3F35] font-semibold">{selectedService}</span>. A Wealthnest advisor will review your scope and reply to <span className="text-slate-900 font-mono">{email}</span> within 24 hours.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleOpenMailClient}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#1E3F35] rounded-lg hover:bg-[#163028]"
                  >
                    <Mail className="w-4 h-4 text-white" />
                    <span>Also Dispatch via Your Email App</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-4"
                  >
                    Submit another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-3 mb-4">
                  <h3 className="text-lg font-bold text-slate-900">Request a Detailed Service Proposal</h3>
                  <p className="text-xs text-slate-500">
                    Receive a personalized pricing breakdown and implementation roadmap for your company.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Business or Entity Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Acme Holdings LLC"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Primary Service of Interest
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                  >
                    <option value="Bookkeeper Services">Bookkeeper Services (Hourly / Monthly Retainer)</option>
                    <option value="Sr. Bookkeeper Services">Sr. Bookkeeper Services (Dedicated Senior Scope)</option>
                    <option value="Individual Tax Filing">Individual Tax Filing (Form 1040 & Schedules)</option>
                    <option value="Business Tax Filing">Business Tax Filing (S-Corp, C-Corp, 1065, LLC)</option>
                    <option value="Virtual CFO Advisory">Virtual CFO Advisory (Fractional Financial Leadership)</option>
                    <option value="Full-Fledged Payroll">Full-Fledged Payroll Service (Direct Deposit & Filings)</option>
                    <option value="Sales Tax Compliance">Sales Tax Compliance & Nexus Filings</option>
                    <option value="AR Collections & Recovery">AR Collections & Bad Debt Recovery</option>
                    <option value="Commercial Financing (ABL, Factoring, Hard Lending)">Commercial Financing (ABL, Invoice Factoring, Hard Money)</option>
                    <option value="All-Inclusive Practice Retainer">Comprehensive All-in-One Practice Retainer</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Project Scope, Requirements or Rate Estimate
                    </label>
                    {message && (
                      <button
                        type="button"
                        onClick={() => {
                          setMessage('');
                          if (onClearPrefill) onClearPrefill();
                        }}
                        className="text-[11px] text-slate-500 hover:text-slate-800"
                      >
                        Clear prefill
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your current accounting software, monthly volume, business entity type, or paste your requirements here..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35] font-sans"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-sm font-bold text-white bg-[#1E3F35] rounded-lg hover:bg-[#163028] active:scale-98 transition-all disabled:opacity-50 shadow-sm"
                  >
                    {isSubmitting ? (
                      <span>Processing Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-white" />
                        <span>Submit Proposal Request</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-slate-500 text-center">
                  Confidentiality Guaranteed. We strictly execute NDAs prior to receiving accounting credentials or financial data.
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
