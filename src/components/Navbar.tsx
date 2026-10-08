import React, { useState } from 'react';
import { Phone, Menu, X, Lock, Image as ImageIcon, Shield, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../data/servicesData';
import { WealthnestLogo } from './WealthnestLogo';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenClientPortal: () => void;
  onNavigateToSection?: (sectionId: string) => void;
  onOpenBrandKit?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenClientPortal,
  onNavigateToSection,
  onOpenBrandKit,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigateToSection) {
      onNavigateToSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-slate-200 shadow-2xs transition-all">
      {/* Top micro-bar: Trust signals & direct phone */}
      <div className="hidden md:block bg-[#0C231C] text-slate-300 text-[11px] py-1.5 px-4 sm:px-6 lg:px-8 border-b border-emerald-950">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-emerald-100/90">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-amber-400" />
              <span>Strategic Accounting, Tax & Advisory Practice • Jersey City, NJ & Nationwide (50 States)</span>
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5 font-medium text-white"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>Direct: {CONTACT_INFO.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3 h-3 text-emerald-400" />
              <span>{CONTACT_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <a
            href="/"
            className="flex items-center transition-opacity hover:opacity-95"
            aria-label="Wealthnest Advisory LLC Home"
          >
            <WealthnestLogo variant="nav" />
          </a>

          {/* Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="hover:text-[#1E3F35] transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="hover:text-[#1E3F35] transition-colors"
            >
              Services
            </a>
            <a
              href="#specializations"
              onClick={(e) => handleNavClick(e, 'specializations')}
              className="hover:text-[#1E3F35] transition-colors"
            >
              Specializations
            </a>
            <a
              href="#industries"
              onClick={(e) => handleNavClick(e, 'industries')}
              className="hover:text-[#1E3F35] transition-colors"
            >
              Industries
            </a>
            <a
              href="#tools"
              onClick={(e) => handleNavClick(e, 'tools')}
              className="hover:text-[#1E3F35] transition-colors font-medium text-emerald-800"
            >
              IRS Tools
            </a>
            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, 'faq')}
              className="hover:text-[#1E3F35] transition-colors"
            >
              FAQ
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="hover:text-[#1E3F35] transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Action cluster: Client Portal & Schedule Consultation */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Secure Client Portal Button */}
            <button
              onClick={onOpenClientPortal}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-300 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer shadow-2xs whitespace-nowrap"
              aria-label="Access Encrypted Client Portal"
            >
              <Lock className="w-3.5 h-3.5 text-[#1E3F35]" />
              <span>Client Portal</span>
            </button>

            {/* Schedule Consultation Call Button */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#1E3F35] hover:bg-[#152E27] active:scale-98 rounded-lg transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>Schedule Consultation</span>
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenClientPortal}
              className="p-2 text-slate-700 bg-slate-100 rounded-lg border border-slate-200"
              aria-label="Open Client Portal"
              title="Client Portal"
            >
              <Lock className="w-4 h-4 text-[#1E3F35]" />
            </button>
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
        <div className="lg:hidden border-b border-slate-200 bg-white px-5 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#1E3F35]"
            >
              About Firm
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#1E3F35]"
            >
              Services & Accounting
            </a>
            <a
              href="#specializations"
              onClick={(e) => handleNavClick(e, 'specializations')}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#1E3F35]"
            >
              Cross-Border & Specializations
            </a>
            <a
              href="#industries"
              onClick={(e) => handleNavClick(e, 'industries')}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#1E3F35]"
            >
              Industries We Serve
            </a>
            <a
              href="#tools"
              onClick={(e) => handleNavClick(e, 'tools')}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#1E3F35]"
            >
              IRS Tools & Links
            </a>
            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, 'faq')}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#1E3F35]"
            >
              Frequently Asked Questions
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#1E3F35]"
            >
              Contact Us
            </a>
            {onOpenBrandKit && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBrandKit();
                }}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 text-left flex items-center gap-2 text-slate-600 cursor-pointer"
              >
                <ImageIcon className="w-4 h-4 text-amber-600" />
                <span>Official Brand Logo Kit (.JPG)</span>
              </button>
            )}
          </nav>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenClientPortal();
              }}
              className="w-full py-2.5 px-4 text-center font-bold text-xs text-slate-800 bg-slate-100 border border-slate-300 rounded-lg flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-[#1E3F35]" />
              <span>Access Encrypted Client Portal</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 px-4 text-center font-bold text-xs text-white bg-[#1E3F35] hover:bg-[#152E27] rounded-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>Schedule Free Consultation</span>
            </button>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="w-full py-2 px-4 text-center font-medium text-xs text-slate-700 bg-slate-50 rounded-lg border border-slate-200 block"
            >
              Direct Office Line: {CONTACT_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
