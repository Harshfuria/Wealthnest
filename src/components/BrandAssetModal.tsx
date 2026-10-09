import React, { useState } from 'react';
import { X, Download, Check, Copy, ExternalLink, Image as ImageIcon, Sparkles, Shield, Palette } from 'lucide-react';

interface BrandAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandAssetModal: React.FC<BrandAssetModalProps> = ({ isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<'dark' | 'light'>('dark');

  if (!isOpen) return null;

  const currentImg = selectedVariant === 'dark' ? '/wealthnest-logo.jpg' : '/wealthnest-logo-light.jpg';
  const downloadFilename = selectedVariant === 'dark' ? 'wealthnest-advisory-logo.jpg' : 'wealthnest-advisory-logo-white.jpg';

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}${currentImg}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh] animate-scale-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="brand-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#0C231C] to-[#163B2F] text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg overflow-hidden border border-amber-400/40 bg-black/20 shrink-0">
              <img
                src="/wealthnest-logo-600.jpg"
                alt="Wealthnest Logo Emblem"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 id="brand-modal-title" className="text-base sm:text-lg font-bold tracking-tight">
                Official Firm Logo & Brand Kit
              </h2>
              <p className="text-xs text-emerald-200/80">
                Wealthnest Advisory LLC • High-Resolution JPEG & Vector Assets
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Close brand kit modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Variant Selector Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSelectedVariant('dark')}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  selectedVariant === 'dark'
                    ? 'bg-[#0C231C] text-amber-300 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-[#0C231C] border border-amber-400" />
                <span>Primary Dark Emerald (Official)</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedVariant('light')}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  selectedVariant === 'light'
                    ? 'bg-white text-emerald-950 shadow-sm border border-slate-300'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-white border border-slate-400" />
                <span>White Stationery Edition</span>
              </button>
            </div>

            <span className="text-[11px] font-mono text-slate-500">
              Format: High-Res JPEG (1200 × 1200 px)
            </span>
          </div>

          {/* Logo Showcase Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Visual Display Card */}
            <div className={`p-4 rounded-2xl border flex items-center justify-center transition-all ${
              selectedVariant === 'dark'
                ? 'bg-slate-900 border-slate-800 shadow-inner'
                : 'bg-slate-100 border-slate-200'
            }`}>
              <div className="relative max-w-[280px] sm:max-w-[320px] rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src={currentImg}
                  alt={`Wealthnest Advisory Logo (${selectedVariant})`}
                  className="w-full h-auto object-contain block transition-transform duration-300 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Download & Asset Specs */}
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  {selectedVariant === 'dark' ? 'Primary Emblem & Wordmark' : 'Print & Letterhead Stationery'}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {selectedVariant === 'dark'
                    ? 'Features our signature geometric nesting arch and ascending golden growth facet on deep British racing emerald. Ideal for web, social profiles, mobile apps, and digital signatures.'
                    : 'Rendered with precision emerald lines and gold accents on crisp pure white. Perfect for physical print, formal contracts, invoices, letterheads, and partner decks.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <a
                  href={currentImg}
                  download={downloadFilename}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#1E3F35] hover:bg-[#16332B] text-white transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>Download JPEG File (1200 × 1200 px)</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="/wealthnest-logo.svg"
                    download="wealthnest-advisory-logo.svg"
                    className="py-2 px-3 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center gap-1.5 border border-slate-200 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Download SVG</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="py-2 px-3 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center gap-1.5 border border-slate-200 cursor-pointer"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy JPEG Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Specs pill */}
              <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-950 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#1E3F35]">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Certified High-Resolution Master File</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-normal">
                  JPEG Color Space: sRGB, 96% sub-sampled sharpness, lossless vector geometry source. Compatible with LinkedIn, Google Workspace, QuickBooks, and print printers.
                </p>
              </div>
            </div>
          </div>

          {/* Color Palette & Guidelines */}
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-emerald-700" />
              <span>Firm Official Brand Color Codes</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#0C231C] shrink-0 border border-slate-200" />
                <div>
                  <div className="text-[11px] font-bold text-slate-800">Racing Emerald</div>
                  <div className="text-[10px] font-mono text-slate-500">#0C231C</div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#1E3F35] shrink-0 border border-slate-200" />
                <div>
                  <div className="text-[11px] font-bold text-slate-800">Firm Pine</div>
                  <div className="text-[10px] font-mono text-slate-500">#1E3F35</div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#D4AF37] shrink-0 border border-slate-200" />
                <div>
                  <div className="text-[11px] font-bold text-slate-800">Imperial Gold</div>
                  <div className="text-[10px] font-mono text-slate-500">#D4AF37</div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#FFF5C8] shrink-0 border border-slate-200" />
                <div>
                  <div className="text-[11px] font-bold text-slate-800">Champagne</div>
                  <div className="text-[10px] font-mono text-slate-500">#FFF5C8</div>
                </div>
              </div>
            </div>
          </div>

          {/* Official Intuit QuickBooks Certification Badges */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-50/60 to-slate-50 border border-emerald-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-800" />
                <h3 className="text-sm font-bold text-slate-900 font-serif">
                  Intuit QuickBooks ProAdvisor Certifications
                </h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                3 Badges Verified
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Official certification badges issued by Intuit ProAdvisor Academy. Available in full-resolution PNG formats for email signatures, proposals, invoices, and social media profiles.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              {/* Badge 1: Level 1 */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col items-center text-center space-y-3 shadow-2xs">
                <img
                  src="/intuit-quickbooks-certification-level-1.png"
                  alt="QuickBooks Level 1 Certified"
                  className="w-24 h-24 object-contain drop-shadow-sm"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">QuickBooks Level 1</div>
                  <div className="text-[10px] text-slate-500">Core Bookkeeping Certified</div>
                </div>
                <a
                  href="/intuit-quickbooks-certification-level-1.png"
                  download="intuit-quickbooks-certification-level-1.png"
                  className="w-full py-1.5 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#1E3F35] font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors border border-emerald-200/80"
                >
                  <Download className="w-3 h-3" />
                  <span>Download (.PNG)</span>
                </a>
              </div>

              {/* Badge 2: Level 2 */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col items-center text-center space-y-3 shadow-2xs">
                <img
                  src="/intuit-quickbooks-certification-level-2.png"
                  alt="QuickBooks Level 2 Certified"
                  className="w-24 h-24 object-contain drop-shadow-sm"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">QuickBooks Level 2</div>
                  <div className="text-[10px] text-slate-500">Advanced Advisory Certified</div>
                </div>
                <a
                  href="/intuit-quickbooks-certification-level-2.png"
                  download="intuit-quickbooks-certification-level-2.png"
                  className="w-full py-1.5 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#1E3F35] font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors border border-emerald-200/80"
                >
                  <Download className="w-3 h-3" />
                  <span>Download (.PNG)</span>
                </a>
              </div>

              {/* Badge 3: Workforce */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col items-center text-center space-y-3 shadow-2xs">
                <img
                  src="/quickbooks-workforce-certification.png"
                  alt="QuickBooks Workforce Certified"
                  className="w-24 h-24 object-contain drop-shadow-sm"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">QuickBooks Workforce</div>
                  <div className="text-[10px] text-slate-500">Payroll Specialist Certified</div>
                </div>
                <a
                  href="/quickbooks-workforce-certification.png"
                  download="quickbooks-workforce-certification.png"
                  className="w-full py-1.5 px-3 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-900 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors border border-cyan-200/80"
                >
                  <Download className="w-3 h-3" />
                  <span>Download (.PNG)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Wealthnest Advisory LLC • Brand Identity Assets</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
