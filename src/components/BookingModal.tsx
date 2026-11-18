import React, { useEffect, useState } from 'react';
import { Check, MessageSquare, X } from 'lucide-react';
import { CONTACT_INFO } from '../data/servicesData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialTopic,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [topic, setTopic] = useState(initialTopic || 'Tax Preparation & Planning');
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialTopic) {
      setTopic(initialTopic);
    }
  }, [initialTopic]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClose = () => {
    setConfirmed(false);
    setError('');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!emailPattern.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch('/api/signups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          service: topic,
          scopeDetails: `Requested consultation for ${preferredTime.trim() || 'next available time'}`,
          estimatedBudget: 'Consultation Call',
          source: 'Consultation Modal',
          notes: `Preferred time: ${preferredTime.trim() || 'Not specified'}`,
        }),
      });
    } catch (err) {
      console.warn('Could not record booking on backend:', err);
    } finally {
      setIsSubmitting(false);
      setConfirmed(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close consultation dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmed ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#1E3F35] text-white flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3
              id="booking-modal-title"
              className="text-2xl font-bold text-slate-900 font-serif"
            >
              Consultation Requested
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Thank you, <strong className="font-semibold text-slate-900">{name}</strong>. We will send a calendar invite to <span className="font-medium text-slate-900">{email}</span> within one business day.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-[#1E3F35] hover:bg-[#152E27] rounded-md transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="pr-8 space-y-1 border-b border-slate-200 pb-4">
              <p className="text-sm font-medium text-[#1E3F35]">Free Introductory Call</p>
              <h3
                id="booking-modal-title"
                className="text-2xl font-bold text-slate-900 font-serif"
              >
                Schedule a Consultation
              </h3>
              <p className="text-sm text-slate-600">
                Tell us what you need help with and when you’re available.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-800"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="booking-name"
                    className="block text-sm font-medium text-slate-800 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-email"
                    className="block text-sm font-medium text-slate-800 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    id="booking-email"
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
                    htmlFor="booking-phone"
                    className="block text-sm font-medium text-slate-800 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-time"
                    className="block text-sm font-medium text-slate-800 mb-1"
                  >
                    Preferred Day / Time
                  </label>
                  <input
                    id="booking-time"
                    type="text"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    placeholder="e.g. Weekdays after 2 PM EST"
                    className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="booking-topic"
                  className="block text-sm font-medium text-slate-800 mb-1"
                >
                  Topic
                </label>
                <select
                  id="booking-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                >
                  <option value="Tax Preparation & Planning">Tax Preparation &amp; Planning</option>
                  <option value="Bookkeeping & Monthly Accounting">Bookkeeping &amp; Monthly Accounting</option>
                  <option value="Payroll & Sales Tax Compliance">Payroll &amp; Sales Tax Compliance</option>
                  <option value="US Business Formation & Structuring">US Business Formation &amp; Structuring</option>
                  <option value="Virtual CFO & Financial Advisory">Virtual CFO &amp; Financial Advisory</option>
                  <option value="Cross-Border & IRS Notice Support">Cross-Border &amp; IRS Notice Support</option>
                  <option value="QuickBooks Setup or Cleanup">QuickBooks Setup or Cleanup</option>
                  <option value="General Accounting & Tax Consultation">General Accounting &amp; Tax Consultation</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#1E3F35] hover:bg-[#152E27] rounded-md transition-colors disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? 'Submitting...' : 'Request Consultation'}
              </button>

              <div className="pt-3 border-t border-slate-100 text-center">
                <a
                  href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                    'Hello Wealthnest Advisory, I would like to schedule a consultation.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#1E3F35] hover:text-[#152E27]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Or message us directly on WhatsApp ({CONTACT_INFO.phoneDisplay})</span>
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
