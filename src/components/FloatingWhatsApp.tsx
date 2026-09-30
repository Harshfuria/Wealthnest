import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { CONTACT_INFO } from '../data/servicesData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-end gap-2">
      {/* Small dismissed tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-slate-900/95 border border-emerald-500/40 text-slate-200 text-xs px-3 py-2 rounded-xl shadow-xl backdrop-blur-md max-w-xs animate-in fade-in slide-in-from-bottom-2">
          <span>Need quick pricing or tax assistance? Chat with us.</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Circle */}
      <a
        href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Wealthnest Advisory, I would like to inquire about your services.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#0B132B]"
        aria-label="Contact Wealthnest Advisory on WhatsApp at 2016162843"
      >
        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950" />
      </a>
    </div>
  );
};
