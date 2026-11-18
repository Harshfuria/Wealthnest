import React, { useState } from 'react';
import { Check, Copy, Mail, MessageSquare, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../data/servicesData';

export const ContactSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Tax Preparation & Planning');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email).catch(() => {});
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!emailPattern.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch('/api/signups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail.toLowerCase(),
          phone: phone.trim(),
          company: '',
          service,
          scopeDetails: message.trim().slice(0, 200),
          estimatedBudget: 'Consultation Request',
          source: 'Website Contact Form',
          notes: message.trim() || 'Inquiry submitted via website contact form.',
        }),
      });
    } catch (err) {
      console.warn('Could not save inquiry to backend:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSubmitted(false);
    setErrorMessage('');
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-24 bg-white border-t border-slate-200 scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Firm Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <p className="text-sm font-medium text-[#1E3F35]">Contact Us</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-serif leading-tight [text-wrap:balance]">
                Let’s talk about your accounting or tax needs.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Call, message on WhatsApp, or send a note using the form. We respond to all inquiries within one business day.
              </p>
            </div>

            <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
              <div className="py-4 space-y-1">
                <p className="text-xs font-medium text-slate-500">Phone</p>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="inline-flex items-center gap-2 text-base font-semibold text-slate-900 hover:text-[#1E3F35] transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#1E3F35]" />
                  <span>{CONTACT_INFO.phoneDisplay}</span>
                </a>
              </div>

              <div className="py-4 space-y-1">
                <p className="text-xs font-medium text-slate-500">Email</p>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="inline-flex items-center gap-2 text-base font-semibold text-slate-900 hover:text-[#1E3F35] transition-colors break-all"
                  >
                    <Mail className="w-4 h-4 text-[#1E3F35] shrink-0" />
                    <span>{CONTACT_INFO.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#1E3F35]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="py-4 space-y-1">
                <p className="text-xs font-medium text-slate-500">WhatsApp</p>
                <a
                  href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                    'Hello Wealthnest Advisory, I would like to schedule a consultation.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base font-semibold text-[#1E3F35] hover:text-[#152E27] transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Message us on WhatsApp</span>
                </a>
              </div>

              <div className="py-4 space-y-1">
                <p className="text-xs font-medium text-slate-500">Location &amp; Hours</p>
                <p className="text-sm font-medium text-slate-900">
                  New Jersey <span aria-hidden="true" className="mx-1 text-slate-400">·</span> Serving All 50 States
                </p>
                <p className="text-sm text-slate-600">{CONTACT_INFO.hours}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Consultation Form */}
          <div className="lg:col-span-7 bg-[#F7F8F7] border border-slate-200 rounded-lg p-7 sm:p-9">
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#1E3F35] text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-serif">
                  Thank you, {fullName}.
                </h3>
                <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                  We have received your inquiry regarding <strong className="font-semibold text-slate-900">{service}</strong> and will reply to <span className="font-medium text-slate-900">{email}</span> within one business day.
                </p>
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-2.5 text-sm font-semibold text-[#1E3F35] border border-slate-300 bg-white hover:bg-slate-50 rounded-md transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="space-y-1 pb-2 border-b border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 font-serif">
                    Request a Consultation or Quote
                  </h3>
                  <p className="text-sm text-slate-600">
                    Share a few details and we’ll follow up to schedule a brief introductory call.
                  </p>
                </div>

                {errorMessage && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-md bg-red-50 border border-red-200 text-sm text-red-800"
                  >
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      Service Needed
                    </label>
                    <select
                      id="contact-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                    >
                      <option value="Tax Preparation & Planning">Tax Preparation &amp; Planning</option>
                      <option value="Bookkeeping & Monthly Accounting">Bookkeeping &amp; Monthly Accounting</option>
                      <option value="Payroll & Sales Tax Compliance">Payroll &amp; Sales Tax Compliance</option>
                      <option value="US Business Formation & Structuring">US Business Formation &amp; Structuring</option>
                      <option value="Virtual CFO & Financial Advisory">Virtual CFO &amp; Financial Advisory</option>
                      <option value="Cross-Border & IRS Notice Support">Cross-Border &amp; IRS Notice Support</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-slate-800 mb-1.5"
                  >
                    How can we help?
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your business, entity type, or tax questions..."
                    className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-white bg-[#1E3F35] hover:bg-[#152E27] rounded-md transition-colors disabled:opacity-60 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1E3F35]"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
