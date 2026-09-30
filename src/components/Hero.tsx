import React, { useState } from 'react';
import { 
  ArrowRight, 
  MessageSquare, 
  Shield, 
  CheckCircle2, 
  Newspaper, 
  Calendar, 
  BookOpen, 
  AlertTriangle, 
  Sparkles,
  Cpu,
  Layers,
  Coins,
  TrendingUp,
  Zap,
  Scale,
  Activity
} from 'lucide-react';
import { CONTACT_INFO } from '../data/servicesData';
import { RECENT_NEWS, TAX_DEADLINES } from '../data/resourcesData';

interface HeroProps {
  onOpenBooking: () => void;
  onNavigateToCalculator: () => void;
  onNavigateToResources?: () => void;
  onOpenChat?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onNavigateToCalculator,
  onNavigateToResources,
  onOpenChat,
}) => {
  const [heroMode, setHeroMode] = useState<'graphic' | 'dispatch'>('graphic');
  const [activeHeroNode, setActiveHeroNode] = useState<'abl' | 'factoring' | 'hardmoney' | 'recovery'>('abl');

  const latestNews = RECENT_NEWS[0];
  const upcomingDeadline = TAX_DEADLINES[4]; // e.g. September 15

  const handleScrollToResources = () => {
    if (onNavigateToResources) {
      onNavigateToResources();
    } else {
      const el = document.getElementById('resources');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToArchitecture = () => {
    const el = document.getElementById('business-architecture');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200 bg-[#F8FAF9]">
      {/* Background radial atmosphere - subtle money saver wash */}
      <div 
        className="absolute top-0 right-1/4 -z-10 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-10 -z-10 w-[400px] h-[400px] bg-slate-100/60 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Regulatory Alert Kicker */}
            <div 
              onClick={handleScrollToResources}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 cursor-pointer hover:bg-emerald-100 transition-colors"
            >
              <Newspaper className="w-3.5 h-3.5 text-emerald-700" />
              <span>Latest Advisory: FinCEN Beneficial Ownership Compliance</span>
              <span className="text-emerald-700 font-bold">→</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] [text-wrap:balance]">
              Scalable Financial Clarity with Flexible, Scope-Based Advisory
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
              Wealthnest Advisory provides rigorous corporate accounting, customized tax compliance, fractional CFO leadership, AR debt collections, and commercial financing solutions (ABL, invoice factoring, hard lending).
            </p>

            {/* Direct engagement anchors - unboxed, scannable descriptors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 pb-1 text-left">
              <div className="border-l-2 border-[#1E3F35] pl-3 py-1">
                <span className="block text-xs text-slate-500 font-medium">Accounting & CFO</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">Full Practice</span>
              </div>
              <div className="border-l-2 border-[#1E3F35] pl-3 py-1">
                <span className="block text-xs text-slate-500 font-medium">Tax & Sales Tax</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">Custom Entity</span>
              </div>
              <div className="border-l-2 border-[#1E3F35] pl-3 py-1">
                <span className="block text-xs text-slate-500 font-medium">AR Collections</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">Debt Recovery</span>
              </div>
              <div className="border-l-2 border-[#1E3F35] pl-3 py-1">
                <span className="block text-xs text-slate-500 font-medium">Commercial Financing</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">ABL · Factoring</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onNavigateToCalculator}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#1E3F35] rounded-lg hover:bg-[#152E27] active:scale-98 transition-all shadow-sm whitespace-nowrap"
              >
                <span>Build Your Custom Scope</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              {onOpenChat && (
                <button
                  type="button"
                  onClick={onOpenChat}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#1E3F35] bg-[#EBF4EE] border border-[#C2DFCF] rounded-lg hover:bg-[#DCEEE3] transition-all whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 text-[#1E3F35]" />
                  <span>Launch Gemini AI Advisor</span>
                </button>
              )}

              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Wealthnest Advisory, I would like to discuss financial advisory and bookkeeping services for my business.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all whitespace-nowrap shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Institutional Trust markers */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#1E3F35]" />
                <span>Bank-Grade 256-Bit Encryption</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1E3F35]" />
                <span>Strict Client NDA Protected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1E3F35]" />
                <span>QuickBooks & Xero Certified</span>
              </div>
            </div>

          </div>

          {/* Right column: Varite-Inspired Interactive Capital Graphic & Advisory Dispatch */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-7 shadow-sm relative overflow-hidden space-y-4">
              
              {/* Card Header: Mode Switcher */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200">
                  <button
                    onClick={() => setHeroMode('graphic')}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                      heroMode === 'graphic'
                        ? 'bg-[#1E3F35] text-white shadow-sm font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Capital Visual Radar</span>
                  </button>
                  <button
                    onClick={() => setHeroMode('dispatch')}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                      heroMode === 'dispatch'
                        ? 'bg-[#1E3F35] text-white shadow-sm font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Newspaper className="w-3.5 h-3.5" />
                    <span>Advisory Dispatch</span>
                  </button>
                </div>

                <span className="text-[10px] font-mono text-emerald-800 font-medium hidden sm:inline-block">
                  Live Engine 2026
                </span>
              </div>

              {/* MODE 1: VARITE-STYLE CATCHY BUSINESS GRAPHIC - SUBTLE MONEY SAVER PALETTE */}
              {heroMode === 'graphic' && (
                <div className="space-y-4">
                  {/* SVG Isometric Financial Network Graphic */}
                  <div className="relative rounded-xl bg-[#F6F9F7] p-3 border border-slate-200 overflow-hidden">
                    <svg
                      viewBox="0 0 400 210"
                      className="w-full h-auto"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="heroGradientSubtle" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#4E876A" />
                          <stop offset="50%" stopColor="#1E3F35" />
                          <stop offset="100%" stopColor="#2D6A4F" />
                        </linearGradient>
                      </defs>

                      {/* Connection Conduits */}
                      <path d="M 70 105 L 180 65" stroke="#CBD5E1" strokeWidth="2" />
                      <path d="M 70 105 L 180 65" stroke="url(#heroGradientSubtle)" strokeWidth="2.5" strokeDasharray="5 5">
                        <animate attributeName="stroke-dashoffset" values="20;0" dur="1.2s" repeatCount="indefinite" />
                      </path>

                      <path d="M 70 105 L 180 145" stroke="#CBD5E1" strokeWidth="2" />
                      <path d="M 70 105 L 180 145" stroke="url(#heroGradientSubtle)" strokeWidth="2.5" strokeDasharray="5 5">
                        <animate attributeName="stroke-dashoffset" values="20;0" dur="1.2s" repeatCount="indefinite" />
                      </path>

                      <path d="M 180 65 L 310 105" stroke="#CBD5E1" strokeWidth="2" />
                      <path d="M 180 65 L 310 105" stroke="url(#heroGradientSubtle)" strokeWidth="2.5" strokeDasharray="5 5">
                        <animate attributeName="stroke-dashoffset" values="20;0" dur="1.2s" repeatCount="indefinite" />
                      </path>

                      <path d="M 180 145 L 310 105" stroke="#CBD5E1" strokeWidth="2" />
                      <path d="M 180 145 L 310 105" stroke="url(#heroGradientSubtle)" strokeWidth="2.5" strokeDasharray="5 5">
                        <animate attributeName="stroke-dashoffset" values="20;0" dur="1.2s" repeatCount="indefinite" />
                      </path>

                      {/* NODE 1: Hard Money (Left) */}
                      <g onClick={() => setActiveHeroNode('hardmoney')} className="cursor-pointer">
                        <circle cx="70" cy="105" r="30" fill={activeHeroNode === 'hardmoney' ? '#1E3F35' : '#FFFFFF'} stroke={activeHeroNode === 'hardmoney' ? '#152E27' : '#94A3B8'} strokeWidth="2" />
                        <circle cx="70" cy="105" r="12" fill={activeHeroNode === 'hardmoney' ? '#2D6A4F' : '#E2E8F0'} fillOpacity="0.6" />
                        <text x="70" y="102" textAnchor="middle" fill={activeHeroNode === 'hardmoney' ? '#FFFFFF' : '#0F172A'} fontSize="9" fontWeight="bold">Hard</text>
                        <text x="70" y="113" textAnchor="middle" fill={activeHeroNode === 'hardmoney' ? '#A7F3D0' : '#475569'} fontSize="8" fontWeight="bold">Money</text>
                      </g>

                      {/* NODE 2: ABL Revolver (Top Middle) */}
                      <g onClick={() => setActiveHeroNode('abl')} className="cursor-pointer">
                        <circle cx="180" cy="65" r="34" fill={activeHeroNode === 'abl' ? '#1E3F35' : '#FFFFFF'} stroke={activeHeroNode === 'abl' ? '#152E27' : '#94A3B8'} strokeWidth="2.5" />
                        <circle cx="180" cy="65" r="14" fill={activeHeroNode === 'abl' ? '#2D6A4F' : '#E2E8F0'} fillOpacity="0.6" />
                        <text x="180" y="62" textAnchor="middle" fill={activeHeroNode === 'abl' ? '#FFFFFF' : '#0F172A'} fontSize="10" fontWeight="bold">ABL Line</text>
                        <text x="180" y="74" textAnchor="middle" fill={activeHeroNode === 'abl' ? '#A7F3D0' : '#475569'} fontSize="8" fontWeight="bold">75-85% LTV</text>
                      </g>

                      {/* NODE 3: Invoice Factoring (Bottom Middle) */}
                      <g onClick={() => setActiveHeroNode('factoring')} className="cursor-pointer">
                        <circle cx="180" cy="145" r="34" fill={activeHeroNode === 'factoring' ? '#1E3F35' : '#FFFFFF'} stroke={activeHeroNode === 'factoring' ? '#152E27' : '#94A3B8'} strokeWidth="2.5" />
                        <circle cx="180" cy="145" r="14" fill={activeHeroNode === 'factoring' ? '#2D6A4F' : '#E2E8F0'} fillOpacity="0.6" />
                        <text x="180" y="142" textAnchor="middle" fill={activeHeroNode === 'factoring' ? '#FFFFFF' : '#0F172A'} fontSize="10" fontWeight="bold">Factoring</text>
                        <text x="180" y="154" textAnchor="middle" fill={activeHeroNode === 'factoring' ? '#A7F3D0' : '#475569'} fontSize="8" fontWeight="bold">90% in 24h</text>
                      </g>

                      {/* NODE 4: Cash Treasury (Right) */}
                      <g onClick={() => setActiveHeroNode('recovery')} className="cursor-pointer">
                        <circle cx="315" cy="105" r="32" fill={activeHeroNode === 'recovery' ? '#1E3F35' : '#EBF4EE'} stroke="#1E3F35" strokeWidth="2.5" />
                        <circle cx="315" cy="105" r="16" fill="#1E3F35" fillOpacity="0.15" />
                        <text x="315" y="102" textAnchor="middle" fill="#1E3F35" fontSize="13" fontWeight="bold">$</text>
                        <text x="315" y="115" textAnchor="middle" fill={activeHeroNode === 'recovery' ? '#FFFFFF' : '#1E3F35'} fontSize="8" fontWeight="bold">LIQUIDITY</text>
                      </g>

                      {/* Floating Indicator */}
                      <rect x="250" y="170" width="135" height="24" rx="12" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
                      <circle cx="262" cy="182" r="4" fill="#1E3F35" />
                      <text x="320" y="186" textAnchor="middle" fill="#1E3F35" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
                        94% Velocity Index
                      </text>
                    </svg>

                    {/* Quick Node Selector Pills */}
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                      {[
                        { id: 'hardmoney', label: 'Hard Money' },
                        { id: 'abl', label: 'ABL Revolver' },
                        { id: 'factoring', label: 'Invoice Factoring' },
                        { id: 'recovery', label: 'AR Recovery' },
                      ].map((node) => (
                        <button
                          key={node.id}
                          onClick={() => setActiveHeroNode(node.id as any)}
                          className={`px-2 py-1 text-[10px] font-mono rounded transition-colors ${
                            activeHeroNode === node.id
                              ? 'bg-[#1E3F35] text-white font-bold'
                              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                          }`}
                        >
                          {node.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Node Live Status Box */}
                  <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-slate-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-900 uppercase tracking-wider">
                        {activeHeroNode === 'hardmoney' && 'Bridge & Hard Money Facility'}
                        {activeHeroNode === 'abl' && 'Asset-Based Revolving Line (ABL)'}
                        {activeHeroNode === 'factoring' && 'Spot & Whole Ledger Invoice Factoring'}
                        {activeHeroNode === 'recovery' && 'Commercial Debt Recovery Engine'}
                      </span>
                      <span className="text-[#1E3F35] font-mono font-bold">
                        {activeHeroNode === 'hardmoney' && '65-75% LTV'}
                        {activeHeroNode === 'abl' && '$500K-$25M+'}
                        {activeHeroNode === 'factoring' && '24h Funding'}
                        {activeHeroNode === 'recovery' && 'Contingency Only'}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {activeHeroNode === 'hardmoney' && 'Short-term non-bank liquidity secured by commercial real estate and heavy machinery.'}
                      {activeHeroNode === 'abl' && 'Revolving facility pegged to eligible receivables and inventory with weekly borrowing base compliance.'}
                      {activeHeroNode === 'factoring' && 'Instant 90% capital advances on verified B2B customer invoices to eliminate cash flow drag.'}
                      {activeHeroNode === 'recovery' && 'Intelligent 4-stage debt collection with skip-tracing and multi-state legal enforcement.'}
                    </p>
                  </div>

                  {/* Graphic Hub Action */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={handleScrollToArchitecture}
                      className="text-xs text-[#1E3F35] hover:text-[#152E27] font-bold inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Explore Interactive Visual Hub</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={onOpenBooking}
                      className="text-xs font-semibold text-emerald-800 hover:underline"
                    >
                      Request Facility Terms →
                    </button>
                  </div>
                </div>
              )}

              {/* MODE 2: ADVISORY NEWSROOM & DEADLINES */}
              {heroMode === 'dispatch' && (
                <div className="space-y-4">
                  {/* Top Item: Latest Regulatory Alert */}
                  <div className="p-4 rounded-xl bg-[#F8FAF9] border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-mono text-emerald-800 font-semibold uppercase">
                        {latestNews.category} Alert
                      </span>
                      <span>{latestNews.sourceAuthority}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {latestNews.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {latestNews.summary}
                    </p>
                    <div className="pt-1 flex items-center justify-between">
                      <button
                        onClick={handleScrollToResources}
                        className="text-xs text-[#1E3F35] hover:text-[#152E27] font-semibold inline-flex items-center gap-1"
                      >
                        <span>Read Advisory Briefing</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <span className="text-[11px] text-slate-500">{latestNews.readTime}</span>
                    </div>
                  </div>

                  {/* Middle Item: Upcoming Compliance Milestone */}
                  <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{upcomingDeadline.date}</span>
                        <span className="text-[10px] font-mono text-emerald-800 font-semibold">Upcoming Milestone</span>
                      </div>
                      <div className="text-slate-800 font-medium">{upcomingDeadline.title}</div>
                      <div className="text-slate-600 text-[11px]">{upcomingDeadline.applicableTo}</div>
                    </div>
                  </div>

                  {/* Bottom Quick Hub Action */}
                  <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      onClick={handleScrollToResources}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-800 bg-white rounded-lg hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#1E3F35]" />
                      <span>Access Resource Hub</span>
                    </button>

                    <button
                      onClick={onOpenBooking}
                      className="text-xs font-semibold text-emerald-800 hover:underline whitespace-nowrap"
                    >
                      Schedule Review →
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
