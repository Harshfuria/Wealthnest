import { ServiceItem, CaseStudy, FAQItem, IndustryItem, PillarItem } from '../types';

export const CONTACT_INFO = {
  companyName: 'Wealthnest Advisory LLC',
  tagline: 'Strategic Accounting, Tax & Business Advisory Services',
  phone: '2016162843',
  phoneDisplay: '+1 (201) 616-2843',
  whatsappUrl: 'https://wa.me/12016162843',
  email: 'wealthnestadvisoryllc@gmail.com',
  hours: 'Mon – Fri: 8:00 AM – 7:00 PM EST | Sat: 9:00 AM – 3:00 PM EST',
  location: 'Jersey City, New Jersey • Serving Clients Nationwide Across All 50 States',
  addressDisplay: 'Jersey City, NJ • Nationwide Virtual Advisory Practice',
};

export const ADVISORY_STATS = [
  { value: '10+', label: 'Years of Advisory Excellence', subtext: 'In accounting, tax & business strategy' },
  { value: '50', label: 'States Covered Nationwide', subtext: 'Multi-state tax & nexus mastery' },
  { value: '$45M+', label: 'Client Tax Savings & Assets', subtext: 'Protected through proactive planning' },
  { value: '100%', label: 'Secure Client Vault', subtext: 'Bank-grade client confidentiality' },
];

export const CPA_STATS = ADVISORY_STATS;
export const STATS = ADVISORY_STATS;

export const SERVICES: ServiceItem[] = [
  {
    id: 'corporate-tax',
    title: 'Tax Preparation & Strategic Planning',
    shortDesc: 'Comprehensive federal and multi-state tax returns prepared with proactive, year-round optimization.',
    fullDesc: 'End-to-end federal and multi-state tax compliance and proactive wealth preservation. We analyze your corporate structure, maximize allowable business deductions, coordinate shareholder K-1s, and deliver quarterly estimated tax roadmaps to eliminate year-end tax surprises.',
    rateLabel: 'Custom Scope by Entity Complexity',
    rateModel: 'Transparent Fixed Proposals',
    idealFor: 'S-Corporations, C-Corporations, Partnerships, LLCs, and High-Net-Worth Individuals.',
    badge: 'Core Practice',
    category: 'tax',
    features: [
      'Corporate Tax Filings (Form 1120, 1120-S & 1065 Partnerships)',
      'High-Net-Worth Individual Returns (Form 1040, Schedules C, E & SE)',
      'Multi-State Apportionment & Composite State Tax Returns',
      'Shareholder & Partner K-1 Generation & Basis Tracking',
      'Section 179 & Bonus Depreciation Optimization',
      'Proactive Quarterly Tax Projections & Voucher Schedules'
    ],
    deliverables: [
      'Complete Federal & State e-Filed Returns with IRS Confirmation',
      'Executive Tax Strategy & Deductions Optimization Memorandum',
      'Next-Year Quarterly Estimated Tax Payment Voucher Calendar'
    ]
  },
  {
    id: 'accounting-bookkeeping',
    title: 'Accounting & Monthly Bookkeeping',
    shortDesc: 'Spotless, GAAP-compliant monthly closes, accounts reconciliation, and executive financial statements.',
    fullDesc: 'We handle your end-to-end general ledger, transaction categorization, multi-account reconciliations, and monthly financial closes. Get pristine, audit-ready Balance Sheets, Income Statements, and Cash Flow summaries to make confident executive decisions.',
    rateLabel: 'Monthly Retainers & Custom Scope',
    rateModel: 'Sized to Transaction & Account Volume',
    idealFor: 'Growing businesses, startups, and multi-entity enterprises seeking reliable accounting leadership.',
    badge: 'Essential Advisory',
    category: 'accounting',
    features: [
      'Monthly General Ledger Closing & Journal Entries',
      'Bank, Credit Card & Merchant Account Reconciliations',
      'Accounts Payable (AP) & Bill Pay Workflow Management',
      'Accounts Receivable (AR) Invoicing & Aging Analysis',
      'Accrual vs. Cash Basis Financial Statement Adjustments',
      'Year-End Audit-Ready Financial Closing Package'
    ],
    deliverables: [
      'Monthly Executive Financial Packet (P&L, Balance Sheet, Cash Flow)',
      'Variance Analysis & Management Commentary',
      'Clean, Tagged QuickBooks Online or Xero General Ledger'
    ]
  },
  {
    id: 'virtual-cfo',
    title: 'Virtual CFO & Strategic Financial Advisory',
    shortDesc: 'Senior executive financial leadership, 13-week cash flow modeling, and capital growth guidance.',
    fullDesc: 'High-caliber Chief Financial Officer leadership on an agile fractional basis. We build dynamic 3-statement financial models, forecast rolling liquidity, evaluate unit economics, optimize pricing structures, and prepare comprehensive board and lender presentations.',
    rateLabel: 'Fractional Executive Retainer',
    rateModel: 'Custom Tailored to Growth Milestones',
    idealFor: 'Growth-stage companies, venture-backed startups, and mid-market enterprises navigating expansion.',
    badge: 'Executive Advisory',
    category: 'cfo',
    features: [
      '13-Week Rolling Cash Flow Forecasting & Runway Preservation',
      '3-Statement Dynamic Financial Modeling & Scenario Planning',
      'Unit Economics, Margin Restructuring & CAC/LTV Calibration',
      'Board Deck Preparation & Investor Financial Reporting',
      'Banking Relationships, Debt Covenant Monitoring & Capital Readiness',
      'Bi-Weekly Strategic Executive Leadership Sync Calls'
    ],
    deliverables: [
      'Custom Rolling 13-Week Cash Flow & Runway Forecast Model',
      'Monthly CFO Executive Commentary & KPI Scorecard',
      'Board-Ready Financial Presentations and Capital Roadmaps'
    ]
  },
  {
    id: 'payroll-compliance',
    title: 'Full-Service Payroll Management',
    shortDesc: 'Automated direct deposits, multi-state payroll tax withholdings, and guaranteed timely filings.',
    fullDesc: 'Eliminate employment compliance stress with automated payroll management. We manage salaried and hourly staff, contractor 1099s, health and 401(k) deductions, multi-state tax withholding, and all quarterly and annual government filings.',
    rateLabel: 'Predictable Monthly Tier',
    rateModel: 'Based on Team Headcount',
    idealFor: 'Employers with 1 to 100+ team members across single or multi-state jurisdictions.',
    category: 'accounting',
    features: [
      'Direct Deposit Processing for W-2 Employees & 1099 Contractors',
      'Automated Federal, State & Local Tax Withholdings',
      'Quarterly Form 941 & Annual Form 940 Compliance Filings',
      'Year-End W-2 and 1099-NEC Distribution & E-Filing',
      'New Hire State Reporting & State Unemployment (SUI) Management',
      'Self-Service Employee Portal for Paystubs & Year-End Tax Forms'
    ],
    deliverables: [
      'Per-Pay-Period Payroll Registers & Tax Summary Breakdown',
      'Guaranteed Agency Filing Confirmations (Federal, State & Local)',
      'Annual Compliance & Form W-2 / 1099 Filing Package'
    ]
  },
  {
    id: 'business-formation',
    title: 'US Business Formation & Entity Structuring',
    shortDesc: 'Strategic entity selection, LLC & Corporation formation, EIN issuance, and S-Corp tax elections.',
    fullDesc: 'Setting up your business correctly from day one protects your personal assets and minimizes long-term tax exposure. We guide entrepreneurs through state selection (Delaware, Wyoming, or Home State), prepare corporate articles, secure federal EINs, draft operating agreements, and execute Form 2553 S-Corporation elections.',
    rateLabel: 'One-Time Formation Package',
    rateModel: 'Fixed Package + State Filing Fees',
    idealFor: 'New business founders, foreign entrepreneurs launching in the US, and sole proprietors converting to corporate entities.',
    badge: 'Startup Advisory',
    category: 'tax',
    features: [
      'Entity Selection Strategy (LLC vs. S-Corp vs. C-Corp Analysis)',
      'State Articles of Organization / Incorporation Drafting',
      'Federal Employer Identification Number (EIN) Procurement',
      'IRS Form 2553 S-Corporation Election Preparation & Submission',
      'Custom Operating Agreement & Corporate Bylaws Framework',
      'FinCEN Beneficial Ownership Information (BOI) Reporting'
    ],
    deliverables: [
      'Official Certified State Formation Documents & Certificate of Status',
      'Official IRS EIN Assignment Confirmation Letter',
      'Executed Operating Agreement & Initial Corporate Minutes Packet'
    ]
  },
  {
    id: 'irs-representation',
    title: 'IRS & State Tax Audit Representation',
    shortDesc: 'Experienced Circular 230 representation, IRS notice resolution, penalty abatements, and audit defense.',
    fullDesc: 'Facing an IRS or state tax inquiry can be stressful. As authorized representatives under IRS Circular 230 guidelines, we step between you and the tax authorities, handle all communications, audit meetings, and negotiations, and seek penalty abatements or structured resolutions on your behalf.',
    rateLabel: 'Representation Retainer',
    rateModel: 'Scoped by Notice Severity & Scope',
    idealFor: 'Businesses and individuals who received IRS CP2000, audit notices, state tax assessments, or unfiled returns.',
    badge: 'Representation Shield',
    category: 'tax',
    features: [
      'IRS Form 2848 Power of Attorney Representation',
      'IRS & State Department of Revenue Audit Defense',
      'Notice & Deficiency Resolution (CP2000, CP504, State Letters)',
      'First-Time Penalty Abatement & Reasonable Cause Petitions',
      'Unfiled Back Tax Preparation & Voluntary Compliance Programs',
      'Installment Agreements & Offer in Compromise (OIC) Evaluation'
    ],
    deliverables: [
      'Comprehensive Case Audit Evaluation & Strategy Memo',
      'Direct Representation with IRS / State Revenue Officers',
      'Official Written Settlement, Notice Closure, or Abatement Letter'
    ]
  },
  {
    id: 'sales-tax',
    title: 'Multi-State Sales Tax & Economic Nexus',
    shortDesc: 'Wayfair economic nexus monitoring, sales tax registration, and automated monthly state filings.',
    fullDesc: 'Protect your e-commerce and multi-state company from crippling state audit penalties. We monitor economic nexus thresholds across all 50 states, register permits when triggers are met, classify product taxability, and prepare on-time monthly and quarterly returns.',
    rateLabel: 'Jurisdiction Retainer',
    rateModel: 'Tailored to Active State Nexus Footprint',
    idealFor: 'E-commerce brands (Shopify, Amazon, Walmart), wholesalers, and multi-state digital service providers.',
    category: 'tax',
    features: [
      '50-State Economic Nexus Threshold Exposure Evaluation',
      'State Sales Tax Permit Applications & Registrations',
      'Marketplace Facilitator Exemption Reconciliation',
      'Timely Monthly, Quarterly & Annual Return Filings',
      'Resale & Exemption Certificate Compliance Management',
      'State Sales Tax Audit & Letter of Inquiry Defense'
    ],
    deliverables: [
      'Timely Return Filing Receipts & Electronic State Confirmations',
      'Continuous Nexus Exposure & Threshold Monitoring Dashboard',
      'Reconciled Sales Tax Remittance Summary Reports'
    ]
  },
  {
    id: 'commercial-financing',
    title: 'Commercial Financing & Capital Advisory',
    shortDesc: 'Strategic guidance on Asset-Based Lending (ABL), invoice factoring, and debt structuring.',
    fullDesc: 'Unlock operational liquidity without diluting company ownership. We prepare borrowing base models, underwrite financial packages, and advise leadership on Asset-Based Lending (ABL) secured by receivables and inventory, invoice factoring to bridge customer net-terms, and corporate credit lines.',
    rateLabel: 'Capital Advisory Engagement',
    rateModel: 'Performance & Advisory Retainer',
    idealFor: 'B2B companies, distributors, contractors, and manufacturers requiring $50k to $10M+ in operational debt.',
    badge: 'Capital Solutions',
    category: 'capital',
    features: [
      'Invoice Factoring: Advance up to 90% against outstanding invoices in 24–48 hours',
      'Asset-Based Lending (ABL): Credit lines backed by AR, inventory & equipment',
      'Commercial Bridge & Collateral Facilities for Opportunistic Expansion',
      'Borrowing Base Certificate (BBC) Modeling & Collateral Tracking',
      'Underwriting Data Room Preparation & Institutional Lender Negotiations',
      'AR Collections Governance & Trapped Cash Flow Recovery'
    ],
    deliverables: [
      'Comparative Capital Term Sheet Analysis & Fee Breakdown',
      'Institutional Underwriting Data Room & Financial Model',
      'Immediate Working Capital Disbursement & Covenant Oversight'
    ]
  },
  {
    id: 'cross-border-tax',
    title: 'Cross-Border Wealth & Visa Holder Tax Strategy',
    shortDesc: 'Specialized tax planning for H-1B, L-1, F-1 visa holders, NRIs, and global asset coordination.',
    fullDesc: 'Navigating dual-country tax treaties (DTAA), foreign bank reporting (FBAR / FinCEN 114), Form 8938, and cross-border asset transfers between the US, India, and worldwide jurisdictions requires specialized precision. We optimize residency status, foreign tax credits, and overseas investments.',
    rateLabel: 'Cross-Border Advisory Retainer',
    rateModel: 'Fixed Engagement Package',
    idealFor: 'H-1B/L-1 visa holders, green card holders, non-resident aliens, and entrepreneurs managing US-India ventures.',
    badge: 'Specialized Advisory',
    category: 'tax',
    features: [
      'FBAR (FinCEN 114) & FATCA Form 8938 Foreign Asset Reporting',
      'US-India Double Tax Avoidance Agreement (DTAA) Optimization',
      'First-Year Choice & Dual-Status Tax Return Filings',
      'Global Stock Compensation (RSU, ESPP, ISO) Cross-Border Treatment',
      'Running a U.S. Business Remotely from India or Abroad',
      'Repatriation of Overseas Funds & Tax-Efficient Remittances'
    ],
    deliverables: [
      'Comprehensive Cross-Border Dual-Country Tax Filing Package',
      'Foreign Asset Compliance & Exemption Certification Memo',
      'Global Asset Structuring & Remittance Strategy Roadmap'
    ]
  },
  {
    id: 'crypto-digital-nomad',
    title: 'Crypto & Digital Economy Tax Consulting',
    shortDesc: 'DeFi, multi-exchange cost-basis reconciliation, staking income, and digital nomad residency.',
    fullDesc: 'Cryptocurrency and Web3 transactions trigger complex capital gain and ordinary income events. We reconcile hundreds of wallet transactions, optimize specific-identification cost basis methods (HIFO/FIFO), and advise digital nomads on multi-state and international tax residency rules.',
    rateLabel: 'Digital Economy Package',
    rateModel: 'Scoped to Wallet & Transaction Volume',
    idealFor: 'Crypto investors, Web3 founders, digital nomads, and remote global contractors.',
    badge: 'Modern Economy',
    category: 'tax',
    features: [
      'Multi-Wallet & Exchange Reconciliations (Coinbase, Binance, Kraken, MetaMask)',
      'DeFi Yield, Staking Rewards & Airdrop Income Classification',
      'HIFO / Specific ID Cost-Basis Maximization for Tax Loss Harvesting',
      'Foreign Digital Asset Disclosures & Form 8949 Schedules',
      'State Domicile & Digital Nomad Residency Planning',
      'Web3 Corporate Entity & DAO Advisory'
    ],
    deliverables: [
      'Audit-Ready IRS Form 8949 & Schedule D Gain/Loss Reports',
      'Digital Asset Tax Loss Harvesting Execution Schedule',
      'State Residency Defense Documentation Packet'
    ]
  }
];

export const INDUSTRIES: IndustryItem[] = [
  {
    id: 'tech-saas',
    title: 'Technology & SaaS Companies',
    description: 'High-growth software startups, recurring subscription models, and digital engineering firms.',
    keyServices: [
      'Federal R&D Tax Credit Studies',
      'ASC 606 Revenue Recognition',
      'Cap Table & Stock Option Advisory',
      '13-Week Cash Burn & Runway Modeling'
    ],
    painPointsSolved: 'Preventing burn-rate blindness, eliminating deferred revenue reconciliation errors, and capturing six-figure R&D tax credits to extend runway.'
  },
  {
    id: 'healthcare-medical',
    title: 'Healthcare, Medical & Dental Practices',
    description: 'Private medical clinics, multi-doctor dental practices, physical therapy groups, and wellness centers.',
    keyServices: [
      'Practice Entity Structuring (S-Corp / PLLC)',
      'Section 179 Medical Equipment Depreciation',
      'Multi-Doctor Partner Allocations & K-1s',
      'HIPAA-Compliant Financial Workflows'
    ],
    painPointsSolved: 'Separating personal and practice wealth, avoiding owner payroll audit penalties, and maximizing write-offs for expensive capital medical equipment.'
  },
  {
    id: 'ecommerce-retail',
    title: 'E-Commerce & Multi-Channel Retail',
    description: 'Shopify brands, Amazon FBA sellers, wholesale importers, and direct-to-consumer merchants.',
    keyServices: [
      'Multi-State Sales Tax Economic Nexus',
      'Inventory Accounting & True COGS Tracking',
      'Marketplace Payout Reconciliations',
      'Supply Chain & Inventory Financing Advisory'
    ],
    painPointsSolved: 'Navigating aggressive state sales tax audits, reconciling messy payout deposits from Stripe/Amazon, and achieving real-time visibility into landed product margins.'
  },
  {
    id: 'real-estate',
    title: 'Real Estate Investors & Developers',
    description: 'Commercial property developers, rental portfolio owners, syndicators, and property managers.',
    keyServices: [
      'Cost Segregation & Accelerated Depreciation',
      'Section 1031 Like-Kind Exchanges',
      'Multi-Tier LLC Asset Protection Structures',
      'Passive Activity Loss Limitation Planning'
    ],
    painPointsSolved: 'Eliminating passive tax drag, structuring tax-deferred property rollovers, and maintaining pristine rental income ledgers for commercial lenders.'
  },
  {
    id: 'professional-services',
    title: 'Professional Services & Consulting',
    description: 'Law practices, management consultancies, engineering firms, creative agencies, and architecture studios.',
    keyServices: [
      'Cash-to-Accrual Basis Transitions',
      'Partner Distribution & Capital Accounting',
      'Work-in-Progress (WIP) & Client Retainer Reconciliations',
      'Year-Round Executive Tax Reduction Strategies'
    ],
    painPointsSolved: 'Managing seasonal revenue lulls, maintaining clean partner capital accounts, and ensuring compliance with complex trust and client retainer accounting rules.'
  },
  {
    id: 'hospitality',
    title: 'Hospitality, Restaurants & Franchises',
    description: 'Independent dining establishments, multi-location restaurant groups, cafes, and franchise operators.',
    keyServices: [
      'Section 45B FICA Tip Tax Credit Calculation',
      'Daily POS & Merchant Batch Reconciliations',
      'Food, Beverage & Labor Prime Cost Monitoring',
      'Franchise Royalty & Multi-Unit Consolidated P&Ls'
    ],
    painPointsSolved: 'Capturing underutilized FICA tip tax credits, controlling razor-thin food and labor margins, and consolidating multi-location payroll seamlessly.'
  }
];

export const WHY_CHOOSE_US: PillarItem[] = [
  {
    id: 'partner-led',
    title: 'Dedicated Partner-Level Attention',
    description: 'Direct collaboration with seasoned tax directors and financial strategists.',
    detail: 'Unlike massive corporate accounting mills where your file is passed down to entry-level clerks or automated bots, every client at Wealthnest Advisory receives direct partner involvement and bespoke counsel.'
  },
  {
    id: 'proactive-tax',
    title: 'Proactive Year-Round Strategy',
    description: 'Quarterly reviews that legally minimize tax liabilities before year-end.',
    detail: 'Filing taxes in April is historical reporting. True wealth protection happens year-round through disciplined quarterly tax projections, entity optimization, and timely deductions planning.'
  },
  {
    id: 'nationwide',
    title: 'Nationwide 50-State Practice Reach',
    description: 'Seamless multi-state tax filing, economic nexus, and federal IRS coverage.',
    detail: 'Whether you operate in New York, New Jersey, Texas, California, Florida, or across all 50 states simultaneously, our firm manages multi-jurisdictional compliance with zero state penalty exposure.'
  },
  {
    id: 'secure-vault',
    title: '256-Bit Encrypted Client Vault',
    description: 'Bank-grade document exchange with zero reliance on insecure email attachments.',
    detail: 'Your financial statements, tax records, and private identity files are housed inside our 256-bit AES encrypted client portal, strictly protected behind two-factor identity controls.'
  },
  {
    id: 'transparent-pricing',
    title: 'Fixed, Transparent Engagements',
    description: 'Predictable value proposals with agreed deliverables and zero surprise bills.',
    detail: 'We eliminate the anxiety of unpredictable hourly billing. Every engagement is scoped clearly upfront with transparent proposals, milestone check-ins, and clear expectations.'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    clientType: 'Multi-Channel E-Commerce Brand',
    industry: 'Consumer Goods / Shopify & Amazon (National)',
    challenge: 'Unreconciled inventory ledgers across 14 states created severe sales tax audit exposure and an 8-week delay in year-end corporate filing.',
    solution: 'Rebuilt chart of accounts, automated multi-state nexus returns, reconciled landed COGS, and restructured from LLC to S-Corporation.',
    impactMetrics: [
      { label: 'Uncovered Tax Deductions', value: '$38,400' },
      { label: 'Monthly Close Timeline', value: '4 Days (from 24)' },
      { label: 'State Audit Penalty Assessments', value: '$0 Assessed' }
    ]
  },
  {
    clientType: 'B2B Software & AI Firm (Series A)',
    industry: 'Technology / Enterprise SaaS',
    challenge: 'Lack of runway visibility and burn rate tracking created severe investor friction before a major equity round.',
    solution: 'Delivered Virtual CFO 13-week rolling cash model, claimed federal R&D tax credits against payroll taxes, and structured clean GAAP books.',
    impactMetrics: [
      { label: 'Cash Runway Extended', value: '+7.5 Months' },
      { label: 'Federal R&D Tax Credit Claimed', value: '$54,000' },
      { label: 'Investor Board Prep Time', value: '-80% Reduced' }
    ]
  },
  {
    clientType: 'Multi-Doctor Medical Practice',
    industry: 'Healthcare & Specialized Surgery',
    challenge: 'Disjointed owner tax returns and manual staff payroll caused IRS penalties and confusion regarding partner profit distributions.',
    solution: 'Consolidated medical payroll, executed Section 179 accelerated equipment write-offs, and instituted clean quarterly partner K-1 distributions.',
    impactMetrics: [
      { label: 'Owner Tax Savings Achieved', value: '$22,600' },
      { label: 'Payroll Filing Accuracy', value: '100% Guaranteed' },
      { label: 'Admin Hours Saved Monthly', value: '28 Hours' }
    ]
  }
];

export const FAQS: FAQItem[] = [
  {
    category: 'process',
    question: 'How does Wealthnest Advisory work with clients virtually across all 50 states?',
    answer: 'We operate as a fully digital, high-touch modern accounting and financial advisory practice. Through our secure Client Portal, scheduled Zoom/Google Meet video strategy sessions, secure electronic signatures, and direct phone/WhatsApp communication, we serve clients seamlessly nationwide with faster turnaround times and personalized attention compared to traditional local brick-and-mortar firms.'
  },
  {
    category: 'pricing',
    question: 'How do you price your Accounting, Tax, and Virtual CFO services?',
    answer: 'We believe in transparent, value-based pricing. Unlike traditional firms that bill by the six-minute increment, we provide clear, fixed proposals scoped to your entity type, transaction volume, and advisory needs. You will always know your investment upfront before work begins.'
  },
  {
    category: 'process',
    question: 'What is the onboarding process and how long does it take to get started?',
    answer: 'Getting started takes just three simple steps: 1) Schedule a complimentary 30-minute discovery call so we understand your business and tax posture. 2) Review your tailored proposal with clear deliverables. 3) Access your encrypted Client Portal to securely upload prior-year returns and connect your accounting software. Most clients are fully onboarded within 3 to 5 business days.'
  },
  {
    category: 'cfo',
    question: 'When should a growing business consider a Virtual CFO?',
    answer: 'If your business is generating $500k+ in revenue, experiencing rapid growth, managing complex cash flow, preparing for a capital raise, or needing deeper unit-economics clarity, a Virtual CFO delivers executive-level financial leadership at a fraction of the cost of a $250k+ full-time in-house CFO.'
  },
  {
    category: 'security',
    question: 'How is sensitive financial and tax data protected?',
    answer: 'Client confidentiality is our highest priority. All documents are stored in bank-grade 256-bit AES encrypted vaults compliant with IRS Publication 4557 and GLBA data security standards. We never send sensitive documents as unencrypted email attachments, and we sign mutual Non-Disclosure Agreements (NDAs).'
  },
  {
    category: 'tax',
    question: 'Can you help resolve past-due tax returns or IRS notices?',
    answer: 'Yes. As authorized practitioners under IRS Circular 230 guidelines, we have extensive experience in audit defense, penalty abatements, unfiled back returns, and official notice resolution with both the IRS and state Departments of Revenue.'
  }
];

export const TECH_STACK = [
  { name: 'QuickBooks Online', category: 'General Ledger', description: 'Certified ProAdvisor workflow' },
  { name: 'Xero', category: 'Cloud Accounting', description: 'Real-time bank feeds & reconciliation' },
  { name: 'Gusto', category: 'Payroll & HR', description: 'Automated tax filing & contractor pay' },
  { name: 'ADP', category: 'Enterprise Payroll', description: 'Multi-jurisdiction compliance' },
  { name: 'NetSuite', category: 'ERP & Consolidation', description: 'Mid-market & enterprise systems' },
  { name: 'Bill.com', category: 'AP / AR Automation', description: 'Streamlined approval workflows' },
  { name: 'Stripe', category: 'Payment Gateway', description: 'SaaS & e-commerce revenue matching' },
  { name: 'Avalara', category: 'Sales Tax Engine', description: 'Automated multi-state tax rates' }
];

