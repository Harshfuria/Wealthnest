import React, { useState } from 'react';
import { MessageSquare, Phone, Menu, X, Sparkles, MapPin, Film, Cpu } from 'lucide-react';
import { CONTACT_INFO } from '../data/servicesData';

interface NavbarProps {
  onOpenBooking: () => void;
  onNavigateToCalculator: () => void;
  onNavigateToResources?: () => void;
  onOpenChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onNavigateToCalculator,
  onNavigateToResources,
  onOpenChat,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 hover:text-[#1E3F35] transition-colors"
          >
            Wealthnest Advisory
          </a>

          {/* Zone 2: Clean navigation links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-600">
            <a href="#services" className="hover:text-[#1E3F35] transition-colors">
              Services
            </a>
            <a href="#business-architecture" className="hover:text-[#1E3F35] transition-colors flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-[#1E3F35]" />
              <span>Visual Architecture</span>
            </a>
            <a href="#rates" className="hover:text-[#1E3F35] transition-colors">
              Engagement Models
            </a>
            <a
              href="#calculator"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToCalculator();
              }}
              className="hover:text-[#1E3F35] transition-colors"
            >
              Scope Configurator
            </a>
            <a href="#locator" className="hover:text-[#1E3F35] transition-colors flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#1E3F35]" />
              <span>Tax & Bank Locator</span>
            </a>
            <a href="#video-studio" className="hover:text-[#1E3F35] transition-colors flex items-center gap-1">
              <Film className="w-3.5 h-3.5 text-[#1E3F35]" />
              <span>Video Studio</span>
            </a>
            <a
              href="#resources"
              onClick={(e) => {
                if (onNavigateToResources) {
                  e.preventDefault();
                  onNavigateToResources();
                }
              }}
              className="hover:text-[#1E3F35] transition-colors"
            >
              Resources & News
            </a>
            <a href="#faq" className="hover:text-[#1E3F35] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Zone 3: Primary actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1E3F35] bg-[#EBF4EE] border border-[#C2DFCF] rounded-lg hover:bg-[#DCEEE3] transition-all whitespace-nowrap"
              aria-label="Open AI Advisor Chat"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#1E3F35]" />
              <span>AI Advisor</span>
            </button>
            <a
              href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Wealthnest Advisory, I would like to inquire about your accounting and advisory services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-all whitespace-nowrap"
              aria-label="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#1E3F35] rounded-lg hover:bg-[#152E27] active:scale-98 transition-all whitespace-nowrap shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>Book Call</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenChat}
              className="p-2 text-[#1E3F35] bg-[#EBF4EE] rounded-lg border border-[#C2DFCF]"
              aria-label="Open Gemini Chat"
            >
              <Sparkles className="w-5 h-5" />
            </button>
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-emerald-800 bg-emerald-50 rounded-lg border border-emerald-200"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-base font-medium text-slate-700">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Services
            </a>
            <a
              href="#business-architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-[#1E3F35]"
            >
              <Cpu className="w-4 h-4 text-[#1E3F35]" />
              <span>Visual Capital Architecture</span>
            </a>
            <a
              href="#rates"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Engagement Models
            </a>
            <a
              href="#calculator"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToCalculator();
              }}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Scope Configurator
            </a>
            <a
              href="#locator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-[#1E3F35]" />
              <span>Tax & Bank Locator (Google Maps)</span>
            </a>
            <a
              href="#video-studio"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2"
            >
              <Film className="w-4 h-4 text-[#1E3F35]" />
              <span>Video Briefing Studio (Veo 3)</span>
            </a>
            <a
              href="#resources"
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (onNavigateToResources) {
                  e.preventDefault();
                  onNavigateToResources();
                }
              }}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Resources & News
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              FAQ
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full py-2.5 px-4 text-center font-semibold text-xs text-[#1E3F35] bg-[#EBF4EE] border border-[#C2DFCF] rounded-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#1E3F35]" />
              <span>Launch Gemini AI Advisor</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 px-4 text-center font-semibold text-xs text-white bg-[#1E3F35] rounded-lg hover:bg-[#152E27]"
            >
              Book Free Consultation
            </button>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="w-full py-2 px-4 text-center font-medium text-xs text-slate-700 bg-slate-100 rounded-lg"
            >
              Direct Call: {CONTACT_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
