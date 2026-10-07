import React from 'react';
import { CONTACT_INFO } from '../data/servicesData';
import { MessageSquare, Mail, Shield, Lock } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenClientPortal?: () => void;
  onNavigateToCalculator: () => void;
  onNavigateToResources?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenClientPortal,
  onNavigateToCalculator,
  onNavigateToResources,
}) => {
  return (
    <footer className="bg-[#0F1F1A] text-slate-300 text-xs border-t border-[#1E3F35]/50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-950/60">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xl font-bold tracking-tight text-white block">
              Wealthnest Advisory
            </span>
            <p className="text-slate-300/90 max-w-sm leading-relaxed text-xs">
              Premier accounting, payroll, corporate tax filing, and virtual CFO practice delivering institutional-grade accuracy and transparent unit economics for growing businesses.
            </p>
            <div className="pt-2 flex flex-col space-y-2 text-slate-300">
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: {CONTACT_INFO.phoneDisplay} (Direct: {CONTACT_INFO.phone})</span>
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Email: {CONTACT_INFO.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white block">
              Practice Areas
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Bookkeeper Services ($12/hr)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Sr. Bookkeeper Services ($15/hr)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Corporate & Federal Tax Filing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Virtual CFO Practice (Fractional)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Full-Fledged Payroll Service
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Sales Tax & Nexus Compliance
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  AR Collections & Debt Recovery
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Commercial Financing (ABL & Factoring)
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Mirrors */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white block">
              Navigation
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#rates" className="hover:text-white transition-colors">
                  Engagement Models
                </a>
              </li>
              <li>
                <a
                  href="#calculator"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateToCalculator();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Scope Configurator
                </a>
              </li>
              <li>
                <a
                  href="#resources"
                  onClick={(e) => {
                    if (onNavigateToResources) {
                      e.preventDefault();
                      onNavigateToResources();
                    }
                  }}
                  className="hover:text-white transition-colors"
                >
                  Resources & Regulatory News
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-white transition-colors">
                  Client Case Studies
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Compliance FAQ
                </a>
              </li>
              {onOpenClientPortal && (
                <li>
                  <button
                    onClick={onOpenClientPortal}
                    className="text-emerald-400 hover:text-emerald-300 transition-colors text-left font-semibold inline-flex items-center gap-1.5"
                  >
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>Access Client Portal Vault</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors text-left font-medium"
                >
                  Book Discovery Call
                </button>
              </li>
            </ul>
          </div>

          {/* Security & Regulatory Notes */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white block">
              Standards & Security
            </span>
            <div className="space-y-2 text-slate-300/80">
              <div className="flex items-center gap-1.5 text-white">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Strict Client NDA Protected</span>
              </div>
              <p>All financial datasets are encrypted via 256-bit TLS protocols.</p>
              <p>QuickBooks ProAdvisor & Xero Certified Partner practices.</p>
              <p>IRS Circular 230 ethical representation guidelines strictly maintained.</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Wealthnest Advisory. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Engagement</span>
            <span aria-hidden="true">·</span>
            <span>IRS Circular 230 Notice</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
