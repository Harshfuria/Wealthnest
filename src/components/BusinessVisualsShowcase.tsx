import React, { useState } from 'react';
import { 
  Building2, 
  Coins, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Scale, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Lock, 
  Clock, 
  DollarSign, 
  PieChart, 
  Cpu,
  BarChart3,
  Globe2,
  RefreshCw,
  Search,
  Check
} from 'lucide-react';

interface BusinessVisualsShowcaseProps {
  onOpenBooking: () => void;
  onOpenChat?: (role: 'general' | 'cfo' | 'tax' | 'capital') => void;
}

export const BusinessVisualsShowcase: React.FC<BusinessVisualsShowcaseProps> = ({
  onOpenBooking,
  onOpenChat,
}) => {
  const [activeTab, setActiveTab] = useState<'capital' | 'recovery' | 'nexus'>('capital');
  const [selectedNode, setSelectedNode] = useState<string>('abl');
  
  // Interactive Capital Calculator state inside the graphic
  const [invoicedAmount, setInvoicedAmount] = useState<number>(450000);
  const [collateralValue, setCollateralValue] = useState<number>(1200000);
  const [recoveryDebtAmount, setRecoveryDebtAmount] = useState<number>(185000);
  const [debtAge, setDebtAge] = useState<number>(45);

  // Computed values
  const ablCapacity = Math.round(collateralValue * 0.75);
  const factoringInstantCash = Math.round(invoicedAmount * 0.90);
  const recoveryLikelihood = debtAge <= 30 ? 94 : debtAge <= 60 ? 82 : debtAge <= 90 ? 65 : 48;
  const estimatedRecovered = Math.round(recoveryDebtAmount * (recoveryLikelihood / 100));

  return (
    <section id="business-architecture" className="py-20 md:py-28 bg-[#F8FAF9] border-t border-slate-200 relative overflow-hidden">
      {/* Dynamic Background Glows - subtle money saver ambiance */}
      <div 
        className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-100/40 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-1/4 -right-48 w-96 h-96 bg-slate-100/60 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#1E3F35] bg-[#EBF4EE] px-3 py-1 rounded-md border border-[#C2DFCF]">
              <Cpu className="w-3.5 h-3.5 text-[#1E3F35]" />
              <span>Interactive Enterprise Visual Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
              Intelligent Financing, Debt Recovery & Capital Architecture
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore dynamic visual flowcharts modeled after leading enterprise financial ecosystems. Interact with live nodes to simulate institutional debt facilities, invoice velocity, and commercial collection pipelines.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-100 border border-slate-200 shrink-0">
            <button
              onClick={() => { setActiveTab('capital'); setSelectedNode('abl'); }}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'capital'
                  ? 'bg-[#1E3F35] text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>Commercial Capital</span>
            </button>
            <button
              onClick={() => { setActiveTab('recovery'); setSelectedNode('funnel2'); }}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'recovery'
                  ? 'bg-[#1E3F35] text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>AR Debt Recovery</span>
            </button>
            <button
              onClick={() => { setActiveTab('nexus'); setSelectedNode('nexus1'); }}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'nexus'
                  ? 'bg-[#1E3F35] text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Globe2 className="w-4 h-4" />
              <span>Nexus & Tax Routing</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: COMMERCIAL CAPITAL SPECTRUM (HARD LENDING -> ABL -> FACTORING) */}
        {/* ========================================================================= */}
        {activeTab === 'capital' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Interactive Visual Canvas (Left 7 Cols) */}
            <div className="lg:col-span-8 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
              {/* Header inside graphic */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1E3F35] animate-pulse" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1E3F35]">
                    Live Commercial Capital Node Engine
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium">
                    Active Pipeline: $250K – $25M+
                  </span>
                </div>
              </div>

              {/* Dynamic SVG Graphic Diagram */}
              <div className="py-6 relative">
                <svg
                  viewBox="0 0 740 360"
                  className="w-full h-auto"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="moneyLine" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4E876A" />
                      <stop offset="50%" stopColor="#1E3F35" />
                      <stop offset="100%" stopColor="#2D6A4F" />
                    </linearGradient>
                    <linearGradient id="nodeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#F8FAF9" />
                    </linearGradient>
                    <linearGradient id="activeNodeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EBF4EE" />
                      <stop offset="100%" stopColor="#DCEEE3" />
                    </linearGradient>
                  </defs>

                  {/* Grid background dots */}
                  <pattern id="gridDots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#E2E8F0" />
                  </pattern>
                  <rect width="740" height="360" fill="url(#gridDots)" rx="16" />

                  {/* Interconnecting Energy Data Conduits */}
                  <path
                    d="M 130 180 L 260 180"
                    stroke="#CBD5E1"
                    strokeWidth="3"
                  />
                  <path
                    d="M 130 180 L 260 180"
                    stroke="url(#moneyLine)"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                  >
                    <animate attributeName="stroke-dashoffset" values="24;0" dur="1.2s" repeatCount="indefinite" />
                  </path>

                  <path
                    d="M 370 180 L 490 180"
                    stroke="#CBD5E1"
                    strokeWidth="3"
                  />
                  <path
                    d="M 370 180 L 490 180"
                    stroke="url(#moneyLine)"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                  >
                    <animate attributeName="stroke-dashoffset" values="24;0" dur="1.2s" repeatCount="indefinite" />
                  </path>

                  <path
                    d="M 600 180 L 670 180"
                    stroke="#CBD5E1"
                    strokeWidth="3"
                  />
                  <path
                    d="M 600 180 L 670 180"
                    stroke="url(#moneyLine)"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                  >
                    <animate attributeName="stroke-dashoffset" values="24;0" dur="1.2s" repeatCount="indefinite" />
                  </path>

                  {/* Branching Lines from Nodes */}
                  <path d="M 315 130 L 315 70 L 400 70" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 545 230 L 545 290 L 440 290" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* NODE 1: Hard Money Lending (Real Estate & Machinery) */}
                  <g 
                    onClick={() => setSelectedNode('hardmoney')}
                    className="cursor-pointer transition-transform hover:scale-105"
                  >
                    <rect
                      x="30"
                      y="125"
                      width="110"
                      height="110"
                      rx="16"
                      fill={selectedNode === 'hardmoney' ? 'url(#activeNodeGlow)' : 'url(#nodeGlow)'}
                      stroke={selectedNode === 'hardmoney' ? '#1E3F35' : '#CBD5E1'}
                      strokeWidth={selectedNode === 'hardmoney' ? '2.5' : '1.5'}
                    />
                    <circle cx="85" cy="160" r="18" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.5" />
                    {/* Isometric Building/Asset Icon */}
                    <path d="M 77 165 L 85 152 L 93 165 Z" fill="#1E3F35" />
                    <rect x="80" y="165" width="10" height="7" fill="#4E876A" />
                    <text x="85" y="195" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="700" fontFamily="sans-serif">
                      Hard Money
                    </text>
                    <text x="85" y="210" textAnchor="middle" fill="#64748B" fontSize="9" fontFamily="monospace">
                      Asset Backed
                    </text>
                    {/* Floating pill badge */}
                    <rect x="42" y="112" width="86" height="18" rx="9" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
                    <text x="85" y="124" textAnchor="middle" fill="#334155" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">
                      1st Lien / 65-75%
                    </text>
                  </g>

                  {/* NODE 2: Asset-Based Lending (ABL Revolver) */}
                  <g 
                    onClick={() => setSelectedNode('abl')}
                    className="cursor-pointer transition-transform hover:scale-105"
                  >
                    <rect
                      x="255"
                      y="115"
                      width="125"
                      height="130"
                      rx="18"
                      fill={selectedNode === 'abl' ? 'url(#activeNodeGlow)' : 'url(#nodeGlow)'}
                      stroke={selectedNode === 'abl' ? '#1E3F35' : '#CBD5E1'}
                      strokeWidth={selectedNode === 'abl' ? '2.5' : '1.5'}
                    />
                    <circle cx="317" cy="155" r="22" fill="#EBF4EE" stroke="#1E3F35" strokeWidth="2" />
                    {/* Isometric Layers Icon */}
                    <path d="M 317 143 L 329 150 L 317 157 L 305 150 Z" fill="#1E3F35" />
                    <path d="M 305 155 L 317 162 L 329 155" stroke="#4E876A" strokeWidth="1.5" fill="none" />
                    <path d="M 305 160 L 317 167 L 329 160" stroke="#1E3F35" strokeWidth="1.5" fill="none" />
                    <text x="317" y="195" textAnchor="middle" fill="#0F172A" fontSize="12" fontWeight="700" fontFamily="sans-serif">
                      ABL Revolver
                    </text>
                    <text x="317" y="210" textAnchor="middle" fill="#1E3F35" fontSize="10" fontWeight="600" fontFamily="monospace">
                      ${(ablCapacity / 1000000).toFixed(2)}M Avail
                    </text>
                    <text x="317" y="225" textAnchor="middle" fill="#64748B" fontSize="8.5" fontFamily="monospace">
                      Inventory + AR
                    </text>
                    {/* Top Status */}
                    <rect x="270" y="102" width="95" height="18" rx="9" fill="#1E3F35" stroke="#1E3F35" strokeWidth="1" />
                    <text x="317" y="114" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="700" fontFamily="sans-serif">
                      ★ CORE REVOLVER
                    </text>
                  </g>

                  {/* NODE 3: Invoice Financing / Factoring */}
                  <g 
                    onClick={() => setSelectedNode('factoring')}
                    className="cursor-pointer transition-transform hover:scale-105"
                  >
                    <rect
                      x="485"
                      y="115"
                      width="125"
                      height="130"
                      rx="18"
                      fill={selectedNode === 'factoring' ? 'url(#activeNodeGlow)' : 'url(#nodeGlow)'}
                      stroke={selectedNode === 'factoring' ? '#1E3F35' : '#CBD5E1'}
                      strokeWidth={selectedNode === 'factoring' ? '2.5' : '1.5'}
                    />
                    <circle cx="547" cy="155" r="22" fill="#EBF4EE" stroke="#1E3F35" strokeWidth="2" />
                    {/* Fast Bolt / Dollar Icon */}
                    <path d="M 549 144 L 541 155 L 547 155 L 545 166 L 554 154 L 548 154 Z" fill="#1E3F35" />
                    <text x="547" y="195" textAnchor="middle" fill="#0F172A" fontSize="12" fontWeight="700" fontFamily="sans-serif">
                      Invoice Factoring
                    </text>
                    <text x="547" y="210" textAnchor="middle" fill="#1E3F35" fontSize="10" fontWeight="600" fontFamily="monospace">
                      90% In 24 Hours
                    </text>
                    <text x="547" y="225" textAnchor="middle" fill="#64748B" fontSize="8.5" fontFamily="monospace">
                      Spot or Whole Ledger
                    </text>
                    {/* Top Status */}
                    <rect x="500" y="102" width="95" height="18" rx="9" fill="#EBF4EE" stroke="#CBD5E1" strokeWidth="1" />
                    <text x="547" y="114" textAnchor="middle" fill="#1E3F35" fontSize="8.5" fontWeight="700" fontFamily="sans-serif">
                      ⚡ FAST LIQUIDITY
                    </text>
                  </g>

                  {/* NODE 4: Cash Vault / Operating Velocity */}
                  <g className="cursor-default">
                    <rect
                      x="660"
                      y="135"
                      width="60"
                      height="90"
                      rx="12"
                      fill="#EBF4EE"
                      stroke="#1E3F35"
                      strokeWidth="1.5"
                    />
                    <circle cx="690" cy="165" r="14" fill="#FFFFFF" stroke="#1E3F35" strokeWidth="1.5" />
                    <text x="690" y="170" textAnchor="middle" fill="#1E3F35" fontSize="13" fontWeight="bold">
                      $
                    </text>
                    <text x="690" y="200" textAnchor="middle" fill="#0F172A" fontSize="8.5" fontWeight="700">
                      CASH
                    </text>
                    <text x="690" y="212" textAnchor="middle" fill="#1E3F35" fontSize="7.5" fontWeight="600">
                      VAULT
                    </text>
                  </g>

                  {/* Upper Callout Card in SVG */}
                  <g>
                    <rect x="400" y="50" width="180" height="42" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
                    <circle cx="415" cy="71" r="5" fill="#1E3F35" />
                    <text x="428" y="66" fill="#64748B" fontSize="9" fontFamily="sans-serif">Collateral Valuation Base</text>
                    <text x="428" y="81" fill="#0F172A" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      ${(collateralValue / 1000000).toFixed(2)}M Physical Assets
                    </text>
                  </g>

                  {/* Lower Callout Card in SVG */}
                  <g>
                    <rect x="250" y="270" width="190" height="42" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
                    <circle cx="265" cy="291" r="5" fill="#4E876A" />
                    <text x="278" y="286" fill="#64748B" fontSize="9" fontFamily="sans-serif">Monthly B2B Invoices</text>
                    <text x="278" y="301" fill="#0F172A" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      ${(invoicedAmount / 1000).toFixed(0)}K AR Outstanding
                    </text>
                  </g>
                </svg>
              </div>

              {/* Interactive Sliders under the graphic */}
              <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F8FAF9] p-3.5 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-600 font-medium">Simulate Collateral Value (ABL):</span>
                    <span className="text-[#1E3F35] font-mono font-bold">${(collateralValue / 1000).toLocaleString()}K</span>
                  </div>
                  <input
                    type="range"
                    min="250000"
                    max="5000000"
                    step="50000"
                    value={collateralValue}
                    onChange={(e) => setCollateralValue(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3F35]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                    <span>$250K (Base)</span>
                    <span>$5M (Enterprise)</span>
                  </div>
                </div>

                <div className="bg-[#F8FAF9] p-3.5 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-600 font-medium">Monthly Invoiced Receivables:</span>
                    <span className="text-[#1E3F35] font-mono font-bold">${(invoicedAmount / 1000).toLocaleString()}K</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="2000000"
                    step="25000"
                    value={invoicedAmount}
                    onChange={(e) => setInvoicedAmount(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3F35]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                    <span>$50K (Growth)</span>
                    <span>$2M (Scale)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deep-Dive Inspection Panel (Right 4 Cols) */}
            <div className="lg:col-span-4 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                  Selected Node Spec
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 border border-emerald-200 text-emerald-800">
                  {selectedNode === 'hardmoney' && 'Asset Collateral'}
                  {selectedNode === 'abl' && 'Asset-Based Revolver'}
                  {selectedNode === 'factoring' && 'Receivables Velocity'}
                </span>
              </div>

              {/* Node Details */}
              {selectedNode === 'hardmoney' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Hard Money & Commercial Bridge</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Short-to-medium term debt secured by commercial real estate, heavy equipment, or inventory. Backed by appraised collateral with expedited underwriting.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Target LTV:</span>
                      <span className="text-slate-900 font-mono font-bold">60% – 75% LTV</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Closing Speed:</span>
                      <span className="text-[#1E3F35] font-mono font-bold">5 – 10 Business Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Facility Size:</span>
                      <span className="text-slate-900 font-mono font-bold">$250K to $15M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Lien Position:</span>
                      <span className="text-slate-900 font-mono font-bold">1st Senior Secured Lien</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-700">Underwriting Requirements:</div>
                    {['Certified independent asset appraisal', 'Clear title & UCC search', 'Personal/Corporate guarantee', 'Exit strategy documentation'].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-[#1E3F35] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedNode === 'abl' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Asset-Based Lending (ABL Revolver)</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Dynamic revolving credit facility governed by a borrowing base certificate. Expands organically as your accounts receivable and verified inventory grow.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Simulated Credit Line:</span>
                      <span className="text-[#1E3F35] font-mono font-bold text-sm">
                        ${(ablCapacity).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Advance on AR:</span>
                      <span className="text-slate-900 font-mono font-bold">80% – 85% of Eligible AR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Advance on Inventory:</span>
                      <span className="text-slate-900 font-mono font-bold">50% – 65% of Cost/NOLV</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Covenant Structure:</span>
                      <span className="text-slate-900 font-mono font-bold">Springing Fixed Charge Coverage</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-700">Practice Deliverables:</div>
                    {['Weekly/Monthly Borrowing Base Certificate (BBC)', 'Field exam audit readiness & reconciliation', 'AR aging dilution monitoring', 'Lender syndication support'].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-[#1E3F35] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedNode === 'factoring' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Invoice Factoring & Discounting</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Immediate liquidity for pending B2B receivables without taking on balance sheet debt. Convert 30-90 day payment cycles into same-day wire transfers.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Instant Advance (90%):</span>
                      <span className="text-[#1E3F35] font-mono font-bold text-sm">
                        ${factoringInstantCash.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Reserve Held (10%):</span>
                      <span className="text-slate-700 font-mono font-bold">
                        ${(invoicedAmount - factoringInstantCash).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Turnaround Time:</span>
                      <span className="text-[#1E3F35] font-mono font-bold">12 – 24 Hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Credit Criteria:</span>
                      <span className="text-slate-900 font-mono font-bold">Based on Debtor Credit Rating</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-700">Key Advantages:</div>
                    {['Non-recourse options available', 'No personal balance-sheet debt liability', 'Seamless ERP/QuickBooks integration', 'Immediate payroll & supplier funding'].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-[#1E3F35] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1E3F35] hover:bg-[#152E27] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Apply for Capital Facility</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                {onOpenChat && (
                  <button
                    onClick={() => onOpenChat('capital')}
                    className="w-full py-2 px-3 rounded-xl bg-[#EBF4EE] hover:bg-[#DCEEE3] text-[#1E3F35] text-xs font-semibold border border-[#C2DFCF] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Cpu className="w-3.5 h-3.5 text-[#1E3F35]" />
                    <span>Ask AI Financing Underwriter</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: AR RECOVERY & DEBT COLLECTION FUNNEL GRAPHIC */}
        {/* ========================================================================= */}
        {activeTab === 'recovery' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Visual Funnel Graphic (Left 8 Cols) */}
            <div className="lg:col-span-8 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1E3F35] animate-pulse" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1E3F35]">
                    4-Stage Commercial AR Recovery & Legal Funnel
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  No Recovery, No Contingency Fee
                </div>
              </div>

              {/* Graphic Stages */}
              <div className="py-6 space-y-4">
                {[
                  {
                    id: 'funnel1',
                    stage: 'Stage 01',
                    title: 'Soft Resolution & Early Reconciliation',
                    days: '1 – 30 Days Aging',
                    rate: '94% Recovery Probability',
                    desc: 'Professional white-glove dispute resolution, duplicate billing reconciliation, and automated remittance reminders.',
                    color: 'from-emerald-50/50 to-white',
                    border: 'border-emerald-300',
                    badgeColor: 'text-emerald-800 bg-emerald-50 border-emerald-200',
                    width: 'w-full',
                  },
                  {
                    id: 'funnel2',
                    stage: 'Stage 02',
                    title: 'Intensive Pre-Legal Demand & Skip-Tracing',
                    days: '31 – 60 Days Aging',
                    rate: '82% Recovery Probability',
                    desc: 'Corporate entity deep-search, officer locate reports, formal attorney-drafted demand notice, and structured repayment plans.',
                    color: 'from-slate-50/70 to-white',
                    border: 'border-slate-300',
                    badgeColor: 'text-slate-800 bg-slate-100 border-slate-200',
                    width: 'w-[92%]',
                  },
                  {
                    id: 'funnel3',
                    stage: 'Stage 03',
                    title: 'Multi-Jurisdiction Legal Nexus Filing',
                    days: '61 – 90 Days Aging',
                    rate: '68% Recovery Probability',
                    desc: 'Litigation forwarding to affiliated bar attorneys in debtor state, breach of contract pleadings, and formal court summons.',
                    color: 'from-amber-50/40 to-white',
                    border: 'border-amber-300',
                    badgeColor: 'text-amber-800 bg-amber-50 border-amber-200',
                    width: 'w-[84%]',
                  },
                  {
                    id: 'funnel4',
                    stage: 'Stage 04',
                    title: 'Judgment Enforcement & UCC Lien Attachment',
                    days: '90+ Days Aging',
                    rate: '48% Complex Recovery',
                    desc: 'Post-judgment bank garnishment, domesticating foreign judgments, UCC-1 lien attachment, and sheriff writ executions.',
                    color: 'from-slate-50/80 to-white',
                    border: 'border-slate-300',
                    badgeColor: 'text-slate-800 bg-slate-100 border-slate-200',
                    width: 'w-[76%]',
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedNode(item.id)}
                    className={`cursor-pointer transition-all duration-200 rounded-xl p-4 border bg-gradient-to-r ${item.color} ${
                      selectedNode === item.id ? `${item.border} ring-2 ring-emerald-600/15 shadow-sm` : 'border-slate-200 hover:border-slate-300'
                    } ${item.width} mx-auto`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-slate-500">{item.stage}</span>
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-600">{item.days}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${item.badgeColor}`}>
                          {item.rate}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Live Scrubber for Recovery Yield */}
              <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F8FAF9] p-3.5 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-600 font-medium">Delinquent Debt Balance:</span>
                    <span className="text-slate-900 font-mono font-bold">${recoveryDebtAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="1000000"
                    step="5000"
                    value={recoveryDebtAmount}
                    onChange={(e) => setRecoveryDebtAmount(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3F35]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                    <span>$10K</span>
                    <span>$1M+</span>
                  </div>
                </div>

                <div className="bg-[#F8FAF9] p-3.5 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-600 font-medium">Aging Bucket:</span>
                    <span className="text-[#1E3F35] font-mono font-bold">{debtAge} Days Past Due</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="120"
                    step="5"
                    value={debtAge}
                    onChange={(e) => setDebtAge(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3F35]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                    <span>15 Days</span>
                    <span>120+ Days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recovery Yield Card (Right 4 Cols) */}
            <div className="lg:col-span-4 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                  Recovery Forecast
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 border border-emerald-200 text-emerald-800">
                  {recoveryLikelihood}% Projected Yield
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAF9] border border-slate-200 space-y-3">
                <div>
                  <div className="text-xs text-slate-500">Projected Cash Recovered:</div>
                  <div className="text-2xl font-bold font-mono text-[#1E3F35] mt-0.5">
                    ${estimatedRecovered.toLocaleString()}
                  </div>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1E3F35] h-full rounded-full transition-all duration-300"
                    style={{ width: `${recoveryLikelihood}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>Current Aging: {debtAge}d</span>
                  <span>Probability: {recoveryLikelihood}%</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="font-semibold text-slate-700">Why Wealthnest Collections:</div>
                {[
                  '100% Contingency-Based (No Recovery = No Fee)',
                  'FDCPA & State Commercial Regulation Compliant',
                  'Dedicated In-House Skip Tracing & Asset Search',
                  'Reputation Preservation (Strict Corporate Etiquette)'
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3F35] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1E3F35] hover:bg-[#152E27] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Submit Debt for Placement</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: GLOBAL CORPORATE NEXUS & MULTI-STATE TAX ROUTING */}
        {/* ========================================================================= */}
        {activeTab === 'nexus' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Visual Nexus Map Diagram (Left 8 Cols) */}
            <div className="lg:col-span-8 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1E3F35] animate-pulse" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1E3F35]">
                    Multi-State Economic Nexus & Apportionment Radar
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  50 States Covered + Wayfair Compliance
                </div>
              </div>

              {/* Graphic Nexus Grid */}
              <div className="py-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: 'nexus1',
                    state: 'Delaware / Wyoming HQ',
                    role: 'Holding Company & IP Treasury',
                    rate: '0% State Corp Tax on Out-of-State',
                    signals: ['Zero franchise tax exposure on non-resident IP', 'Corporate shield protection', 'Centralized dividend pooling'],
                    tag: 'Primary Vault',
                  },
                  {
                    id: 'nexus2',
                    state: 'California / New York',
                    role: 'High-Tax Operating Nexus',
                    rate: '8.84% – 9.0% Corporate Rate',
                    signals: ['Single-sales factor apportionment', 'Market-based sourcing rules', 'P.L. 86-272 safe harbor analysis'],
                    tag: 'High Scrutiny',
                  },
                  {
                    id: 'nexus3',
                    state: 'Texas / Florida / Washington',
                    role: 'Gross Receipts & No-Income Hub',
                    rate: '0% Personal / 0.75% Margin Tax',
                    signals: ['Franchise tax margin deductions', 'No personal income tax withholding', 'Remote workforce domicile optimization'],
                    tag: 'Growth Hub',
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedNode(item.id)}
                    className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 bg-white ${
                      selectedNode === item.id
                        ? 'border-[#1E3F35] ring-2 ring-emerald-600/15 bg-[#F8FAF9]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-slate-900">{item.state}</span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.tag}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-[#1E3F35] mb-1">{item.role}</div>
                    <div className="text-[11px] font-mono text-slate-500 mb-3">{item.rate}</div>
                    <div className="space-y-1.5">
                      {item.signals.map((sig, sIdx) => (
                        <div key={sIdx} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                          <Check className="w-3 h-3 text-[#1E3F35] shrink-0 mt-0.5" />
                          <span>{sig}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Wayfair Threshold Notice */}
              <div className="mt-2 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between text-xs text-amber-900">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-700" />
                  <span><strong>South Dakota v. Wayfair Alert:</strong> Automated tracking of $100K sales or 200 transaction economic thresholds across all 45 sales-tax states.</span>
                </div>
              </div>
            </div>

            {/* Nexus Action Card (Right 4 Cols) */}
            <div className="lg:col-span-4 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                  Nexus Assessment
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 border border-emerald-200 text-emerald-800">
                  Audit Defense
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">Multi-State Nexus Review</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Protect your business against retroactive state tax audits, unfiled sales tax assessments, and multi-state franchise penalties.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Economic Thresholds:</span>
                  <span className="text-slate-900 font-mono font-bold">50-State Monitored</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payroll / Remote Workers:</span>
                  <span className="text-[#1E3F35] font-mono font-bold">Physical Nexus Cleared</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Voluntary Disclosure (VDA):</span>
                  <span className="text-slate-900 font-mono font-bold">Penalty Abatement</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1E3F35] hover:bg-[#152E27] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Request Multi-State Nexus Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
