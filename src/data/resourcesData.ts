export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string[];
  category: 'Tax Law' | 'Virtual CFO' | 'Compliance' | 'Payroll & HR';
  publishedDate: string;
  sourceAuthority: string;
  readTime: string;
  actionItem: string;
}

export interface ResourceGuide {
  id: string;
  title: string;
  description: string;
  category: string;
  fileFormat: string;
  keyTakeaways: string[];
  downloadName: string;
}

export interface TaxDeadlineItem {
  date: string;
  title: string;
  applicableTo: string;
  formNumber: string;
  urgency: 'critical' | 'upcoming' | 'standard';
}

export const RECENT_NEWS: NewsArticle[] = [
  {
    id: 'fincen-boi-alert',
    title: 'FinCEN Beneficial Ownership Information (BOI) Filing Requirements & Updates',
    summary: 'The Corporate Transparency Act mandates registered entities to report beneficial owners. Non-compliance carries civil penalties of up to $500 per day.',
    category: 'Compliance',
    publishedDate: 'September 2026',
    sourceAuthority: 'FinCEN / Dept of Treasury',
    readTime: '3 min read',
    actionItem: 'Confirm if your LLC or Corporation meets reporting exemptions or file Form BOI immediately.',
    content: [
      'Under the Corporate Transparency Act (CTA), millions of small business corporations, LLCs, and other registered entities must report identifying information about their beneficial owners to the Financial Crimes Enforcement Network (FinCEN).',
      'A beneficial owner is any individual who, directly or indirectly, exercises substantial control over the company or owns/controls at least 25 percent of the ownership interests.',
      'Wealthnest Advisory assists entities in determining exemption qualification (e.g., 20+ full-time employees, $5M+ in gross receipts) or preparing secure compliance filings with FinCEN to avoid severe penalties.'
    ]
  },
  {
    id: 'section-174-rd-amortization',
    title: 'Section 174 R&D Expense Capitalization: Mitigating High Startup Tax Liabilities',
    summary: 'Software and technology companies face mandatory 5-year capitalization of domestic research expenses instead of immediate deduction.',
    category: 'Tax Law',
    publishedDate: 'August 2026',
    sourceAuthority: 'IRS Internal Revenue Code §174',
    readTime: '4 min read',
    actionItem: 'Review software engineering payroll allocations to separate pure R&D from standard maintenance.',
    content: [
      'Under IRS Code Section 174 rules, businesses developing new products, software architectures, or patents can no longer expense domestic R&D costs in the current tax year. Instead, they must amortize these expenses over five years (or fifteen years for foreign research).',
      'For venture-backed startups and growing tech firms, this frequently triggers unexpected phantom taxable income despite having a negative net cash flow.',
      'Wealthnest Advisory implements precision ledger tracking to properly bifurcate routine maintenance from core R&D, and pairs this with Federal & State R&D payroll tax credit offsets up to $500,000 annually.'
    ]
  },
  {
    id: 'remote-work-state-nexus',
    title: 'Multi-State Remote Employees: Triggering Unintended Corporate & Payroll Nexus',
    summary: 'Hiring a single remote employee in states like California, New York, or Texas can establish legal tax presence and multi-state filing obligations.',
    category: 'Payroll & HR',
    publishedDate: 'July 2026',
    sourceAuthority: 'Multistate Tax Commission (MTC)',
    readTime: '4 min read',
    actionItem: 'Perform a workforce geographical audit to ensure proper state payroll tax registrations and franchise filings.',
    content: [
      'As remote and hybrid work becomes permanent, companies often overlook that having one full-time remote worker in another state establishes "physical nexus".',
      'This triggers mandatory state unemployment insurance (SUI) account registration, state income tax withholding, and in many jurisdictions, corporate income or franchise tax apportionment.',
      'Wealthnest Advisory reviews employee domicile lists, manages multi-state payroll registration, and ensures your tax returns properly apportion revenue using standard single-sales or 3-factor formulas.'
    ]
  },
  {
    id: 'scorp-reasonable-compensation',
    title: 'IRS Heightens Scrutiny on S-Corporation Officer Wages vs. Dividend Distributions',
    summary: 'The IRS has deployed automated audit checks targeting S-Corp owners who pay themselves artificially low salaries to evade FICA payroll taxes.',
    category: 'Virtual CFO',
    publishedDate: 'June 2026',
    sourceAuthority: 'IRS Small Business & Self-Employed Division',
    readTime: '5 min read',
    actionItem: 'Benchmark your officer compensation using Bureau of Labor Statistics (BLS) salary datasets.',
    content: [
      'A primary incentive for electing S-Corporation tax status is minimizing self-employment taxes by splitting profits between W-2 salary and pass-through distributions.',
      'However, IRS guidelines strictly require owner-operators to receive "reasonable compensation" for the fair market value of services rendered before taking profit distributions.',
      'Wealthnest Advisory models defensible compensation benchmarks utilizing industry wage surveys, historical court rulings, and gross profit ratios to protect your business against audit reclassifications and back taxes.'
    ]
  }
];

export const RESOURCE_GUIDES: ResourceGuide[] = [
  {
    id: 'close-checklist',
    title: 'Year-End Financial & Tax Close Checklist',
    description: 'A 28-point operational audit list for reconciling balance sheets, verifying 1099 vendor thresholds, closing AP/AR, and auditing depreciation schedules.',
    category: 'Accounting & Bookkeeping',
    fileFormat: 'Interactive PDF / Notion Sheet',
    downloadName: 'Wealthnest_YearEnd_Close_Checklist.pdf',
    keyTakeaways: [
      'Step-by-step bank and credit card zero-variance protocol',
      '1099-NEC & 1099-MISC identification for contractor payouts above $600',
      'Prepaid expense amortization & unearned revenue adjustments',
      'Fixed asset additions and Section 179 expensing verification'
    ]
  },
  {
    id: 'scorp-vs-llc-calculator',
    title: 'S-Corp vs. LLC Tax Optimization Blueprint',
    description: 'An executive breakdown illustrating at what net income threshold an LLC should make the IRS Form 2553 S-Corporation election to maximize tax savings.',
    category: 'Corporate Tax Strategy',
    fileFormat: 'Financial Model / Guide',
    downloadName: 'Wealthnest_SCorp_Election_Playbook.pdf',
    keyTakeaways: [
      'The exact $60,000–$80,000 net profit break-even tipping point',
      'FICA tax savings calculation model (15.3% self-employment tax reduction)',
      'Added compliance overhead calculation (payroll, 1120-S return, state franchise)',
      'Timeline for filing Form 2553 within 75 days of taxable year'
    ]
  },
  {
    id: 'cfo-runway-model',
    title: 'Startup 18-Month Cash Runway & Burn Rate Template',
    description: 'Fractional CFO framework designed for founders to monitor dynamic monthly burn, scenario-test hiring plans, and project runway before capital raises.',
    category: 'Virtual CFO Leadership',
    fileFormat: 'Dynamic Spreadsheet Blueprint',
    downloadName: 'Wealthnest_CFO_Runway_Model.pdf',
    keyTakeaways: [
      '3-Statement dynamic cash burn formula',
      'Hiring sensitivity levers with burden rate multipliers (1.25x salary)',
      'Gross margin trend lines (COGS vs operating expenses)',
      'Investor-ready runway presentation snapshot'
    ]
  }
];

export const TAX_DEADLINES: TaxDeadlineItem[] = [
  {
    date: 'January 31',
    title: 'W-2 & 1099-NEC Filing Deadline',
    applicableTo: 'All Employers & Businesses paying contractors >$600',
    formNumber: 'Forms W-2, W-3 & 1099-NEC',
    urgency: 'critical'
  },
  {
    date: 'March 15',
    title: 'S-Corporation & Partnership Tax Returns',
    applicableTo: 'S-Corps & Multi-Member LLCs / Partnerships',
    formNumber: 'Form 1120-S & Form 1065',
    urgency: 'critical'
  },
  {
    date: 'April 15',
    title: 'Individual 1040 & C-Corporation Returns',
    applicableTo: 'Individual Taxpayers, Sole Props, & C-Corps',
    formNumber: 'Form 1040, Form 1120, Q1 1040-ES',
    urgency: 'critical'
  },
  {
    date: 'June 15',
    title: 'Q2 Estimated Federal Tax Payment',
    applicableTo: 'Self-employed individuals & corporate entities',
    formNumber: 'Form 1040-ES & 1120-W (Q2)',
    urgency: 'upcoming'
  },
  {
    date: 'September 15',
    title: 'Q3 Estimated Tax & S-Corp Extension Deadline',
    applicableTo: 'S-Corps on 6-month extension & Q3 estimated tax',
    formNumber: 'Form 1120-S (Extended) & Q3 1040-ES',
    urgency: 'upcoming'
  },
  {
    date: 'October 15',
    title: 'Individual & C-Corp Final Extension Deadline',
    applicableTo: 'Individuals & C-Corps with 6-month extensions',
    formNumber: 'Form 1040 & Form 1120 (Extended)',
    urgency: 'standard'
  }
];
