export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  rateLabel: string;
  rateModel: string;
  features: string[];
  deliverables: string[];
  idealFor: string;
  badge?: string;
  category?: 'accounting' | 'cfo' | 'tax' | 'capital';
}

export interface QuoteEstimate {
  bookkeeperHours: number;
  bookkeeperType: 'none' | 'junior' | 'senior';
  taxFilingType: 'none' | 'individual' | 'business' | 'both';
  cfoHours: number;
  payrollEnabled: boolean;
  salesTaxFilings: number;
  collectionsEnabled?: boolean;
  financingType?: 'none' | 'invoice_factoring' | 'abl' | 'hard_money';
}

export interface CaseStudy {
  clientType: string;
  industry: string;
  challenge: string;
  solution: string;
  impactMetrics: {
    label: string;
    value: string;
  }[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'pricing' | 'process' | 'security' | 'cfo' | 'financing';
}
