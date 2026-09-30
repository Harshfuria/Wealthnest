import React, { useState } from 'react';
import { X, MessageSquare, Mail, Phone, Calendar, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO } from '../data/servicesData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [topic, setTopic] = useState('Accounting & Bookkeeping');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmed ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 bg-[#EBF4EE] text-[#1E3F35] border border-[#D5E7DC] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 text-[#1E3F35]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Consultation Requested</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              We have reserved your request for <span className="font-semibold text-slate-900">{name}</span>. A calendar invitation and Google Meet / Zoom link will be dispatched to <span className="text-[#1E3F35] font-mono font-bold">{email}</span>.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2 text-xs font-semibold text-white bg-[#1E3F35] rounded-lg hover:bg-[#163028] transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-semibold text-[#1E3F35] tracking-wider uppercase">
                Free 20-Minute Financial Discovery Call
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Schedule Time with a Senior Advisor
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Review your current chart of accounts, tax deadlines, and cost savings opportunities.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Discussion Focus
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#1E3F35]"
                  >
                    <option value="Accounting & Bookkeeping">Bookkeeping (Hourly / Retainer)</option>
                    <option value="Tax Filing & Deductions">Tax Filing (Individual & Business)</option>
                    <option value="Virtual CFO Advisory">Virtual CFO Advisory (Fractional)</option>
                    <option value="Payroll & Compliance">Payroll Service (Direct Deposit & Filings)</option>
                    <option value="Sales Tax & Nexus">Sales Tax & Nexus Compliance</option>
                    <option value="AR Collections & Recovery">AR Collections & Bad Debt Recovery</option>
                    <option value="Commercial Financing">Commercial Financing (ABL, Invoice Factoring, Hard Money)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Day / Time
                  </label>
                  <input
                    type="text"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    placeholder="e.g. Tomorrow 2 PM EST"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#1E3F35] rounded-lg hover:bg-[#163028] transition-colors shadow-sm"
                >
                  Confirm Discovery Call
                </button>
              </div>

              {/* Direct Instant WhatsApp Alternative */}
              <div className="pt-3 border-t border-slate-100 text-center">
                <span className="text-[11px] text-slate-500 block mb-2">Need an immediate answer?</span>
                <a
                  href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent('Hi Wealthnest Advisory, I would like to quickly chat about an advisory consultation.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E3F35] hover:text-[#163028]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#1E3F35]" />
                  <span>Connect Instantly on WhatsApp ({CONTACT_INFO.phoneDisplay})</span>
                </a>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
