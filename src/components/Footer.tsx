import React from 'react';
import { CONTACT_INFO } from '../data/servicesData';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onOpenBooking: (topic?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToSection,
  onOpenBooking,
}) => {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Certifications', id: 'certifications' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="bg-[#132620] text-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          {/* Firm Summary */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/wealthnest-logo-600.jpg"
                alt="Wealthnest Advisory LLC"
                className="w-8 h-8 rounded object-cover border border-white/15 shrink-0"
                referrerPolicy="no-referrer"
              />
              <span className="text-lg font-bold tracking-tight text-white font-serif">
                Wealthnest Advisory LLC
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Strategic accounting, tax planning, and business advisory firm based in New Jersey, serving clients nationwide across all 50 states.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold text-white">Navigation</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onNavigateToSection(link.id)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-sm font-semibold text-white">Get in Touch</h3>
            <div className="space-y-2 text-sm text-slate-300">
              <p>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="hover:text-white transition-colors tabular-nums"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {CONTACT_INFO.email}
                </a>
              </p>
              <p className="text-slate-400">New Jersey · Serving All 50 States</p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="text-sm font-semibold text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors cursor-pointer"
              >
                Schedule a Free Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {currentYear} Wealthnest Advisory LLC. All rights reserved.</p>
          <p>Accounting · Tax Planning · Business Advisory</p>
        </div>
      </div>
    </footer>
  );
};
