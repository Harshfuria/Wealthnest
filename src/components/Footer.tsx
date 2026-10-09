import React from 'react';
import { CONTACT_INFO } from '../data/servicesData';
import { MessageSquare, Mail, Shield, Lock, Download, Image as ImageIcon, Phone } from 'lucide-react';
import { WealthnestLogo } from './WealthnestLogo';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenClientPortal?: () => void;
  onNavigateToSection?: (sectionId: string) => void;
  onOpenBrandKit?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenClientPortal,
  onNavigateToSection,
  onOpenBrandKit,
}) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (onNavigateToSection) {
      onNavigateToSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0F1F1A] text-slate-300 text-xs border-t border-[#1E3F35]/50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-950/60">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <WealthnestLogo variant="footer" />
            <p className="text-slate-300/90 max-w-sm leading-relaxed text-xs">
              Premier strategic accounting, proactive tax planning, full-cycle bookkeeping, and virtual CFO leadership delivering institutional-grade accuracy for businesses and individuals nationwide.
            </p>
            <div className="pt-2 flex flex-col space-y-2 text-slate-300">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Office: {CONTACT_INFO.phoneDisplay}</span>
              </a>
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: {CONTACT_INFO.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Email: {CONTACT_INFO.email}</span>
              </a>
            </div>

            {/* Quick Logo Download & Brand Kit Action */}
            <div className="pt-3 flex flex-wrap items-center gap-2">
              <a
                href="/wealthnest-logo.jpg"
                download="wealthnest-advisory-logo.jpg"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/50 hover:bg-emerald-800/60 text-emerald-200 border border-emerald-700/40 text-[11px] font-semibold transition-all cursor-pointer"
                title="Download High-Res 1200x1200px JPEG Logo"
              >
                <Download className="w-3 h-3 text-amber-300" />
                <span>Download Official Logo (.JPG)</span>
              </a>
              {onOpenBrandKit && (
                <button
                  type="button"
                  onClick={onOpenBrandKit}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-[11px] font-medium transition-all cursor-pointer"
                >
                  <ImageIcon className="w-3 h-3 text-amber-300" />
                  <span>Brand Kit & Assets</span>
                </button>
              )}
            </div>
          </div>

          {/* Practice Areas Column */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white block">
              Core Practice Areas
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-white transition-colors">
                  Tax Preparation & Strategy
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-white transition-colors">
                  Accounting & Monthly Closes
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-white transition-colors">
                  Virtual CFO Advisory
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-white transition-colors">
                  Full-Service Payroll
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-white transition-colors">
                  US Business Formation
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-white transition-colors">
                  IRS & State Representation
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-white transition-colors">
                  Multi-State Sales Tax Nexus
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-white transition-colors">
                  Commercial Financing Advisory
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white block">
              Firm Overview
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-white transition-colors">
                  About Our Practice
                </a>
              </li>
              <li>
                <a href="#industries" onClick={(e) => handleNavClick(e, 'industries')} className="hover:text-white transition-colors">
                  Industries We Specialize In
                </a>
              </li>
              <li>
                <a href="#why-us" onClick={(e) => handleNavClick(e, 'why-us')} className="hover:text-white transition-colors">
                  Why Choose Wealthnest
                </a>
              </li>
              <li>
                <a href="#news" onClick={(e) => handleNavClick(e, 'news')} className="hover:text-white transition-colors">
                  Tax Calendar & Bulletins
                </a>
              </li>
              <li>
                <a href="#case-studies" onClick={(e) => handleNavClick(e, 'case-studies')} className="hover:text-white transition-colors">
                  Client Case Studies
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="hover:text-white transition-colors">
                  Compliance FAQ
                </a>
              </li>
              {onOpenClientPortal && (
                <li>
                  <button
                    onClick={onOpenClientPortal}
                    className="text-amber-300 hover:text-amber-200 transition-colors text-left font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Lock className="w-3 h-3 text-amber-300" />
                    <span>Access Client Portal Vault</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors text-left font-medium cursor-pointer"
                >
                  Schedule Free Discovery Call
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Representation Standards */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white block">
              Standards & Security
            </span>
            <div className="space-y-2 text-slate-300/80">
              <div className="flex items-center gap-1.5 text-white">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Strict Client NDA Protected</span>
              </div>
              <p>All client datasets encrypted via 256-bit AES protocols in our secure vault.</p>
              <p>QuickBooks ProAdvisor & Xero Certified Partner practices.</p>
              <p>IRS Circular 230 ethical representation guidelines strictly maintained.</p>
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold text-emerald-300 block mb-2">
                  Verified Intuit ProAdvisor
                </span>
                <div className="flex items-center gap-2.5">
                  <a href="#certifications" title="QuickBooks Level 1 Certified">
                    <img
                      src="/intuit-quickbooks-certification-level-1.png"
                      alt="QuickBooks Level 1"
                      className="w-9 h-9 object-contain hover:scale-110 transition-transform"
                    />
                  </a>
                  <a href="#certifications" title="QuickBooks Level 2 Certified">
                    <img
                      src="/intuit-quickbooks-certification-level-2.png"
                      alt="QuickBooks Level 2"
                      className="w-10 h-10 object-contain hover:scale-110 transition-transform"
                    />
                  </a>
                  <a href="#certifications" title="QuickBooks Workforce Certified">
                    <img
                      src="/quickbooks-workforce-certification.png"
                      alt="QuickBooks Workforce"
                      className="w-9 h-9 object-contain hover:scale-110 transition-transform"
                    />
                  </a>
                </div>
              </div>
              <p className="text-slate-400 text-[11px] pt-1">
                Serving businesses in all 50 US states and international entities.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Circular 230 Notice */}
        <div className="pt-8 space-y-4 text-[11px] text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              © {new Date().getFullYear()} Wealthnest Advisory LLC. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span aria-hidden="true">·</span>
              <span>Terms of Engagement</span>
              <span aria-hidden="true">·</span>
              <span>Circular 230 Disclosure</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 leading-normal border-t border-emerald-950/40 pt-3">
            IRS Circular 230 Notice: To ensure compliance with requirements imposed by the IRS, any U.S. federal tax advice contained on this website is not intended or written to be used, and cannot be used, for the purpose of (i) avoiding penalties under the Internal Revenue Code or (ii) promoting, marketing, or recommending to another party any transaction or matter addressed herein.
          </p>
        </div>

      </div>
    </footer>
  );
};
