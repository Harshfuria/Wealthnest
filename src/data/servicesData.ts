import { ServiceItem, CaseStudy, FAQItem } from '../types';

export const CONTACT_INFO = {
  companyName: 'Wealthnest Advisory',
  phone: '2016162843',
  phoneDisplay: '+1 (201) 616-2843',
  whatsappUrl: 'https://wa.me/12016162843',
  email: 'wealthnestadvisoryllc@gmail.com',
  hours: 'Mon – Fri: 8:00 AM – 7:00 PM EST | Sat: 9:00 AM – 3:00 PM EST',
  location: 'Serving Clients Nationwide (US & Global)',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'bookkeeper',
    title: 'Bookkeeper Services',
    shortDesc: 'Reliable transaction classification, journal entries, and bank & credit card reconciliations.',
    fullDesc: 'Dedicated bookkeeping tailored for day-to-day transaction records, vendor bills, customer invoicing, and monthly account reconciliations in QuickBooks, Xero, or your preferred software.',
    rateLabel: 'Hourly & Monthly Retainers',
    rateModel: 'Flexible Scope Based on Transaction Volume',
    idealFor: 'Small businesses, freelancers, and startups seeking spotless daily books on an efficient budget.',
    features: [
      'Bank & credit card reconciliation',
      'Accounts payable (AP) & bill entry',
      'Accounts receivable (AR) invoicing',
      'Expense receipts & categorization',
      'Monthly trial balance preparation',
      'Clean chart of accounts organization'
    ],
    deliverables: [
      'Monthly reconciled bank reports',
      'Categorized transaction ledgers',
      'Standard P&L and Balance Sheet snapshots'
    ]
  },
  {
    id: 'sr-bookkeeper',
    title: 'Sr. Bookkeeper Services',
    shortDesc: 'Advanced ledger management, accruals, multi-entity consolidation, and audit-ready closes.',
    fullDesc: 'Senior-level accounting oversight specializing in complex accrual accounting, deferred revenue, depreciation schedules, multi-currency transactions, and supervisory reconciliation.',
    rateLabel: 'Senior Dedicated Rate',
    rateModel: 'Custom Scope for Multi-Entity & Accruals',
    idealFor: 'Mid-sized companies, multi-entity groups, and high-volume e-commerce or SaaS operations.',
    features: [
      'Accrual vs. cash basis reconciliations',
      'Fixed asset schedules & depreciation',
      'Prepaid expenses & deferred revenue',
      'Multi-currency & intercompany balancing',
      'Month-end adjusting journal entries',
      'Year-end CPA audit prep & package'
    ],
    deliverables: [
      'Audit-ready trial balance packets',
      'Variance analysis & review notes',
      'Consolidated multi-account reconciliations'
    ]
  },
  {
    id: 'tax-filing',
    title: 'Tax Filing & Planning',
    shortDesc: 'Individual and corporate tax returns filed accurately with maximum legal deductions.',
    fullDesc: 'End-to-end federal and state income tax preparation, compliance reviews, quarterly estimated tax schedules, and proactive tax strategy for individuals and corporate entities.',
    rateLabel: 'Individual & Corporate Tiers',
    rateModel: 'Custom Quote by Filing Complexity',
    idealFor: 'Individual taxpayers, sole proprietors, LLCs, S-Corporations, and C-Corporations.',
    features: [
      'Individual Tax Filing (W-2, 1099, investments, schedules)',
      'Corporate Returns (Form 1120, 1120-S, 1065 partnerships)',
      'Multi-state apportionment & filings',
      'Shareholder / Partner K-1 preparation',
      'R&D tax credits & depreciation optimization',
      'IRS & State correspondence assistance'
    ],
    deliverables: [
      'Complete Federal & State e-filed returns',
      'Deduction optimization summary report',
      'Next year quarterly estimated tax voucher guide'
    ]
  },
  {
    id: 'virtual-cfo',
    title: 'Virtual CFO Advisory',
    shortDesc: 'Fractional executive financial leadership, runway management, and strategic capital modeling.',
    fullDesc: 'High-caliber Chief Financial Officer advisory on an agile fractional basis. We evaluate your unit economics, build dynamic 3-way financial models, optimize cash flow, and prepare board presentations.',
    rateLabel: 'Fractional Executive Retainer',
    rateModel: 'Tailored Based on Industry & Scope',
    idealFor: 'Growth-stage companies, venture-backed startups, and established enterprises needing senior finance leadership.',
    badge: 'Executive Advisory',
    features: [
      'Dynamic 3-statement financial forecasting',
      'Cash burn, runway & working capital control',
      'Board decks & investor financial packets',
      'KPI scorecard & unit economics analysis (LTV/CAC)',
      'Pricing model restructuring & margin enhancement',
      'Industry-specific financial health roadmaps'
    ],
    deliverables: [
      'Monthly executive CFO commentary & scorecard',
      'Scenario models (base, aggressive, conservative)',
      'Bi-weekly strategic executive sync calls'
    ]
  },
  {
    id: 'payroll',
    title: 'Full-Fledged Payroll Service',
    shortDesc: 'Automated payroll processing, multi-state tax withholding, and guaranteed tax filings.',
    fullDesc: 'Comprehensive payroll management eliminating compliance risks. We handle salary, hourly wages, bonus payouts, contractor 1099s, benefits withholding, and automatic tax remittances.',
    rateLabel: 'Flexible Monthly Plans',
    rateModel: 'Custom Sized by Team Headcount',
    idealFor: 'Employers with 1 to 100+ team members across single or multi-state jurisdictions.',
    features: [
      'Direct deposit for W-2 employees & 1099 contractors',
      'Automated federal, state & local tax withholdings',
      'Quarterly Form 941 & annual Form 940 filings',
      'Year-end W-2 and 1099-NEC distribution',
      'Employee onboarding portal & paystub access',
      'State unemployment insurance (SUI) management'
    ],
    deliverables: [
      'Per-pay-period payroll register & tax breakdown',
      'Direct filing confirmations with IRS & state agencies',
      'Year-end compliance reporting package'
    ]
  },
  {
    id: 'sales-tax',
    title: 'Sales Tax Compliance',
    shortDesc: 'Economic nexus monitoring, sales tax registration, and timely multi-state returns.',
    fullDesc: 'Keep your e-commerce and multi-state business completely insulated from state penalties. We track economic nexus thresholds, classify product taxability, and submit monthly or quarterly returns.',
    rateLabel: 'Jurisdiction-Based Retainers',
    rateModel: 'Customized to Active Nexus Footprint',
    idealFor: 'E-commerce merchants (Shopify, Amazon, Walmart), wholesalers, and multi-state service providers.',
    features: [
      'State-by-state economic nexus evaluation',
      'Sales tax permit registration in required states',
      'Marketplace facilitator exemption reconciliation',
      'Monthly, quarterly, and annual return filings',
      'Exemption certificate compliance management',
      'State tax audit & notice representation'
    ],
    deliverables: [
      'Timely return filing receipts & state confirmations',
      'Updated nexus exposure monitoring log',
      'Tax remittance reconciliation reports'
    ]
  },
  {
    id: 'ar-collections',
    title: 'AR Collections & Debt Recovery',
    shortDesc: 'Accelerate cash conversions, resolve aged invoices, and recover delinquent receivables professionally.',
    fullDesc: 'Comprehensive Accounts Receivable management and ethical debt recovery. We institute systematic dunning workflows, dispute mediation, customized installment agreements, and legal escalation to restore trapped working capital without damaging client goodwill.',
    rateLabel: 'Contingency & Retainer Models',
    rateModel: 'Custom Sized by Aging Bracket & Ledger Volume',
    idealFor: 'B2B companies, distributors, service agencies, and medical practices with trapped capital in 60+ day unpaid invoices.',
    badge: 'Cash Flow Recovery',
    category: 'capital',
    features: [
      '30 / 60 / 90 / 120+ day aging ledger audit & prioritization',
      'Multichannel professional dunning (email, phone, certified notices)',
      'Invoice dispute mediation and balance reconciliations',
      'Structured promissory notes and payment plan drafting',
      'Customer credit scoring & credit hold policy design',
      'Attorney escalation and litigation evidence preparation'
    ],
    deliverables: [
      'Bi-weekly recovered cash reports & ledger reconciliation',
      'Dispute resolution logs & settled account releases',
      'Preventive credit terms & onboarding recommendations'
    ]
  },
  {
    id: 'commercial-financing',
    title: 'Commercial Financing & Capital Solutions',
    shortDesc: 'Asset-Based Lending (ABL), Invoice Factoring, and Hard Money credit facilities tailored for rapid liquidity.',
    fullDesc: 'Unlock immediate liquidity without equity dilution. We advise, structure, and connect businesses to Asset-Based Lending (ABL) backed by receivables and inventory, immediate invoice factoring to eliminate net-60 terms, and short-term hard money/bridge debt for opportunistic acquisitions or real estate.',
    rateLabel: 'Facility Sized to Capital Need',
    rateModel: 'Custom Terms based on Collateral, Advance Rates & Velocity',
    idealFor: 'High-growth companies, wholesalers, contractors, manufacturers, and asset owners seeking $50k to $10M+ in flexible debt.',
    badge: 'Institutional Liquidity',
    category: 'capital',
    features: [
      'Invoice Factoring: Advance up to 90% of unpaid invoices within 24–48 hours',
      'Asset-Based Lending (ABL): Revolving lines secured by AR, inventory & machinery',
      'Hard Money & Bridge Loans: Fast-close asset-backed financing for commercial transitions',
      'Borrowing Base Certificate (BBC) modeling & collateral tracking',
      'Refinancing & restructuring of high-interest Merchant Cash Advances (MCAs)',
      'Direct syndication with specialty credit funds and commercial banks'
    ],
    deliverables: [
      'Comparative capital term sheets & advance rate breakdown',
      'Underwriting data room preparation & lender negotiation',
      'Immediate liquidity disbursement and ongoing covenant monitoring'
    ]
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

export const CASE_STUDIES: CaseStudy[] = [
  {
    clientType: 'Multi-Channel E-Commerce Retailer',
    industry: 'Consumer Goods / Shopify & Amazon',
    challenge: 'Unreconciled inventory ledgers across 11 states created massive sales tax audit liability and an 8-week delay in year-end financial reporting.',
    solution: 'Deployed dedicated Sr. Bookkeeper support to overhaul COGS and reconciliations, instituted automated multi-state sales tax filings, and consolidated 1099 payroll.',
    impactMetrics: [
      { label: 'Uncovered Deductions & Savings', value: '$34,200' },
      { label: 'Monthly Close Acceleration', value: '4 Days (from 22)' },
      { label: 'Multi-State Tax Penalties', value: '$0 Assessed' }
    ]
  },
  {
    clientType: 'Series-A B2B SaaS Startup',
    industry: 'Software / Recurring Revenue',
    challenge: 'Burn rate was unmonitored with no visibility into customer acquisition costs (CAC) or runway, causing severe friction with venture investors before Series-B.',
    solution: 'Engaged Virtual CFO advisory for dynamic 3-statement cash forecasting, restructured chart of accounts, and claimed $52,000 in federal R&D payroll tax credits.',
    impactMetrics: [
      { label: 'Runway Extended', value: '+7.5 Months' },
      { label: 'R&D Tax Credits Realized', value: '$52,000' },
      { label: 'Board Reporting Prep Time', value: '-80% Reduced' }
    ]
  },
  {
    clientType: 'Regional Medical & Dental Practice',
    industry: 'Healthcare Services',
    challenge: 'Manual payroll for 32 healthcare staff caused repetitive withholding errors, while disjointed individual and S-Corp tax returns triggered IRS notices.',
    solution: 'Transitioned to Wealthnest full-fledged payroll and streamlined S-Corp corporate tax filing coupled with individual owner filings.',
    impactMetrics: [
      { label: 'Payroll Filing Accuracy', value: '100% Guaranteed' },
      { label: 'Owner Tax Efficiency Saved', value: '$18,600' },
      { label: 'Admin Hours Saved Monthly', value: '26 Hours' }
    ]
  }
];

export const FAQS: FAQItem[] = [
  {
    category: 'pricing',
    question: 'How do you determine the fees for Bookkeeping and Accounting?',
    answer: 'Our bookkeeping pricing is open-ended and tailored to your specific monthly transaction volume, accounts count, and reconciliation complexity. We provide both transparent hourly tracking and fixed monthly retainers so you only pay for the exact level of support your business requires.'
  },
  {
    category: 'pricing',
    question: 'How are Individual and Business Tax Filings priced?',
    answer: 'Tax filing quotes are scoped according to entity type (Individual 1040, Single-member LLC, S-Corp 1120-S, C-Corp 1120, or Partnership 1065), number of state filings, K-1 generation, and schedule complexity. We provide an exact, upfront proposal before starting work.'
  },
  {
    category: 'cfo',
    question: 'How does the Virtual CFO engagement operate?',
    answer: 'Our Virtual CFO advisory is structured around your growth stage and strategic priorities. Engagements can range from focused hourly advisory (e.g. dynamic cash forecasting or runway extensions) to comprehensive monthly fractional leadership supporting board decks, fundraising prep, and capital budgeting.'
  },
  {
    category: 'process',
    question: 'How is pricing structured for Full-Fledged Payroll and Sales Tax?',
    answer: 'Payroll is sized according to active employee/contractor headcount and filing frequency, while sales tax compliance depends on the number of active nexus jurisdictions. We bundle these into predictable recurring plans with zero penalty guarantees.'
  },
  {
    category: 'process',
    question: 'How quickly can I reach Wealthnest Advisory via WhatsApp or Email?',
    answer: 'You can message us directly on WhatsApp at 2016162843 (+1 201-616-2843) for rapid responses, or email wealthnestadvisoryllc@gmail.com. We typically respond to incoming WhatsApp inquiries within 15–30 minutes during business hours.'
  },
  {
    category: 'security',
    question: 'How do you safeguard our sensitive financial and tax documents?',
    answer: 'We utilize bank-grade 256-bit SSL encryption, SOC-2 compliant cloud software, and strict role-based access protocols. We execute bilateral Non-Disclosure Agreements (NDAs) prior to onboarding any proprietary financial records.'
  },
  {
    category: 'financing',
    question: 'How does Invoice Financing and Factoring work through Wealthnest?',
    answer: 'Instead of waiting 30 to 90 days for clients to settle invoices, invoice financing allows you to advance up to 90% of the invoice value within 24 to 48 hours. When your customer pays, the remaining balance is released minus a modest discount fee. We handle both spot factoring (individual large invoices) and whole-ledger revolving facilities.'
  },
  {
    category: 'financing',
    question: 'What is the difference between Asset-Based Lending (ABL) and Hard Money Lending?',
    answer: 'Asset-Based Lending (ABL) is a revolving line of credit secured by operational business assets such as accounts receivable, inventory, and equipment, ideal for scaling working capital. Hard Money lending is short-term, bridge financing secured by real property or tangible hard collateral, used for rapid turnaround transactions, property acquisition, or opportunistic business recapitalization.'
  },
  {
    category: 'process',
    question: 'How does your AR Collections practice operate without alienating clients?',
    answer: 'We deploy an institutional, diplomacy-first approach. We first audit aging ledgers to distinguish between genuine invoicing disputes, administrative oversight, and true delinquency. We mediate discrepancies, establish structured payment arrangements, and escalate legally only when required, preserving your commercial relationships wherever possible.'
  }
];
