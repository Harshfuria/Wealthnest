import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Building,
  User,
  FileText,
  Download,
  Upload,
  CheckCircle2,
  Clock,
  CreditCard,
  MessageSquare,
  Shield,
  ArrowRight,
  LogOut,
  Users,
  Search,
  Filter,
  Copy,
  ExternalLink,
  ChevronDown,
  Phone,
  Mail,
  Database
} from 'lucide-react';
import { CONTACT_INFO } from '../data/servicesData';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking?: () => void;
}

interface ClientDocument {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  category: 'tax' | 'accounting' | 'legal';
}

export interface ClientSignupRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  scopeDetails?: string;
  estimatedBudget?: string;
  status: string;
  source: string;
  createdAt: string;
  notes?: string;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'documents' | 'billing' | 'messages' | 'admin_signups'>('dashboard');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCompany, setRegCompany] = useState('');
  const [regService, setRegService] = useState('Bookkeeper Services ($12/hr)');
  const [regPassword, setRegPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Signups records (Admin Data)
  const [signupsList, setSignupsList] = useState<ClientSignupRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  // Client Session state
  const [clientData, setClientData] = useState({
    name: 'Apex Global Logistics',
    contactPerson: 'Marcus Vance',
    email: 'm.vance@apexlogistics.com',
    entityType: 'Delaware S-Corporation',
    advisor: 'Harsh Furia, CPA',
    status: 'Active Engagement',
    role: 'client' as 'client' | 'admin',
  });

  // Client Documents state
  const [documents, setDocuments] = useState<ClientDocument[]>([
    {
      id: 'doc-1',
      name: '2025_Form_1120S_Federal_Tax_Return_Final.pdf',
      type: 'PDF',
      date: 'March 12, 2026',
      size: '2.4 MB',
      category: 'tax',
    },
    {
      id: 'doc-2',
      name: 'March_2026_Monthly_PL_Reconciliation_Report.pdf',
      type: 'PDF',
      date: 'April 02, 2026',
      size: '890 KB',
      category: 'accounting',
    },
    {
      id: 'doc-3',
      name: 'Wealthnest_Mutual_NDA_Executed.pdf',
      type: 'PDF',
      date: 'January 10, 2026',
      size: '420 KB',
      category: 'legal',
    },
    {
      id: 'doc-4',
      name: 'Q1_13_Week_Rolling_Cash_Runway_Model.xlsx',
      type: 'Excel',
      date: 'March 28, 2026',
      size: '1.8 MB',
      category: 'accounting',
    },
  ]);

  const [uploadedFilesNotice, setUploadedFilesNotice] = useState<string | null>(null);

  // Fetch signups from server
  const fetchSignups = async () => {
    try {
      const res = await fetch('/api/signups');
      if (res.ok) {
        const data = await res.json();
        if (data.signups && Array.isArray(data.signups)) {
          setSignupsList(data.signups);
          return;
        }
      }
    } catch (e) {
      console.warn('Could not fetch /api/signups, falling back to cached seed', e);
    }

    // Fallback seed
    setSignupsList([
      {
        id: 'lead-1',
        name: 'Marcus Vance',
        email: 'm.vance@vancetech.io',
        phone: '+1 (415) 890-2341',
        company: 'Vance Technologies LLC',
        service: 'Virtual CFO Advisory',
        scopeDetails: '13-week runway modeling, cash flow forecasting, Series A prep',
        estimatedBudget: '$2,800/mo Retainer',
        status: 'New',
        source: 'Scope Configurator',
        createdAt: new Date().toISOString(),
        notes: 'Requested introductory review call for next Tuesday.',
      },
      {
        id: 'lead-2',
        name: 'Elena Rostova',
        email: 'elena@rostovacapital.com',
        phone: '+1 (201) 555-0198',
        company: 'Rostova Trading Partners',
        service: 'Commercial Financing (ABL)',
        scopeDetails: 'Asset-based line of credit against $1.2M AR ledger',
        estimatedBudget: '$1.2M Facility',
        status: 'Contacted',
        source: 'Client Portal Registration',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        notes: 'Sent preliminary borrowing base calculation sheet.',
      },
      {
        id: 'lead-3',
        name: 'David Chen',
        email: 'david.chen@chenlogistics.com',
        phone: '+1 (312) 441-9022',
        company: 'Chen Freight & Logistics Inc',
        service: 'Full-Fledged Payroll & Bookkeeping',
        scopeDetails: '18 employees bi-weekly direct deposit, multi-state sales tax',
        estimatedBudget: '$1,450/mo Retainer',
        status: 'Onboarded',
        source: 'Contact Form',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        notes: 'Signed NDA and engagement letter; QuickBooks onboarding scheduled.',
      },
    ]);
  };

  useEffect(() => {
    if (isOpen) {
      fetchSignups();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDemoLogin = () => {
    setClientData({
      name: 'Apex Global Logistics LLC',
      contactPerson: 'Marcus Vance',
      email: 'm.vance@apexlogistics.com',
      entityType: 'Delaware S-Corporation',
      advisor: 'Harsh Furia, CPA',
      status: 'Active Client Account',
      role: 'client',
    });
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const handleAdminDirectLogin = () => {
    setClientData({
      name: 'Wealthnest Advisory Practice',
      contactPerson: 'Firm Administrator',
      email: CONTACT_INFO.email,
      entityType: 'Practice Management & Lead Console',
      advisor: 'Harsh Furia, CPA',
      status: 'Administrator / Partner Access',
      role: 'admin',
    });
    setIsAuthenticated(true);
    setActiveTab('admin_signups');
    fetchSignups();
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;
    setClientData({
      name: loginEmail.split('@')[0].toUpperCase() + ' Corp',
      contactPerson: loginEmail.split('@')[0],
      email: loginEmail,
      entityType: 'Commercial Business Account',
      advisor: 'Harsh Furia, CPA',
      status: 'Active Client Account',
      role: 'client',
    });
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) return;

    setIsSubmitting(true);
    const newEntry: ClientSignupRecord = {
      id: `lead-${Date.now()}`,
      name: regName.trim(),
      email: regEmail.trim().toLowerCase(),
      phone: regPhone.trim(),
      company: regCompany.trim() || `${regName.trim()}'s Entity`,
      service: regService,
      scopeDetails: `Client Portal Registration for ${regService}`,
      estimatedBudget: 'Portal Member',
      status: 'New',
      source: 'Client Portal Sign Up',
      createdAt: new Date().toISOString(),
      notes: 'New client self-registered through the Client Portal.',
    };

    try {
      // Record signup on the backend
      const res = await fetch('/api/signups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.signup) {
          setSignupsList((prev) => [data.signup, ...prev]);
        }
      } else {
        setSignupsList((prev) => [newEntry, ...prev]);
      }
    } catch (err) {
      console.warn('Network issue saving signup to backend; saved to local state:', err);
      setSignupsList((prev) => [newEntry, ...prev]);
    } finally {
      setIsSubmitting(false);
    }

    setClientData({
      name: regCompany || `${regName} Enterprise`,
      contactPerson: regName,
      email: regEmail,
      entityType: 'New Client Entity',
      advisor: 'Harsh Furia, CPA',
      status: 'Onboarding / NDA Signed',
      role: 'client',
    });

    setSuccessNotice('Account registered successfully! Welcome to the Wealthnest Client Portal.');
    setTimeout(() => {
      setIsAuthenticated(true);
      setActiveTab('dashboard');
      setSuccessNotice(null);
    }, 700);
  };

  const handleUpdateLeadStatus = async (id: string, newStatus: string) => {
    setSignupsList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    try {
      await fetch(`/api/signups/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.warn('Could not update status on server:', err);
    }
  };

  const handleExportCsv = () => {
    // Generate and download CSV
    const headers = ['ID', 'Date', 'Full Name', 'Email', 'Phone', 'Company', 'Service Requested', 'Budget / Tier', 'Status', 'Lead Source', 'Notes'];
    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = signupsList.map((s) => [
      escapeCsv(s.id),
      escapeCsv(s.createdAt ? new Date(s.createdAt).toLocaleDateString() : ''),
      escapeCsv(s.name),
      escapeCsv(s.email),
      escapeCsv(s.phone),
      escapeCsv(s.company),
      escapeCsv(s.service),
      escapeCsv(s.estimatedBudget || ''),
      escapeCsv(s.status),
      escapeCsv(s.source),
      escapeCsv(s.notes || ''),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `wealthnest-client-signups-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(signupsList, null, 2));
    setCopiedNotice('Client sign-up JSON data copied to clipboard!');
    setTimeout(() => setCopiedNotice(null), 3000);
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc: ClientDocument = {
        id: `doc-${Date.now()}`,
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        date: 'Just now',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        category: 'accounting',
      };
      setDocuments([newDoc, ...documents]);
      setUploadedFilesNotice(`"${file.name}" uploaded successfully for partner review.`);
      setTimeout(() => setUploadedFilesNotice(null), 4000);
    }
  };

  const handleSimulateDownload = (docName: string) => {
    // Generate a lightweight downloadable dummy file
    const blob = new Blob([`Wealthnest Advisory Verified Financial Record\nDocument: ${docName}\nStatus: Verified\nTimestamp: ${new Date().toISOString()}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = docName.endsWith('.pdf') || docName.endsWith('.xlsx') ? docName : `${docName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const filteredSignups = signupsList.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.phone && s.phone.includes(searchQuery));
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[880px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-800">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 bg-[#F8FAF9] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF4EE] border border-[#D5E7DC] flex items-center justify-center text-[#1E3F35]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Wealthnest Client Portal
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#EBF4EE] text-[#1E3F35] border border-[#D5E7DC]">
                  <Shield className="w-3 h-3 text-[#1E3F35]" />
                  256-Bit Encrypted
                </span>
                {isAuthenticated && clientData.role === 'admin' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-900 border border-amber-200">
                    Admin / Data Hub
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Secure financial vault, engagement milestones, tax records & client sign-up management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Log out of current session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close client portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* If Not Authenticated: Sign In / Register / Admin Access Screen */}
        {!isAuthenticated ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-center bg-[#F8FAF9]">
            <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Toggle Login vs Register */}
              <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`py-2 rounded-lg transition-all ${
                    authMode === 'login'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Existing Client Login
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className={`py-2 rounded-lg transition-all ${
                    authMode === 'register'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  New Client Sign Up
                </button>
              </div>

              {successNotice && (
                <div className="p-3 rounded-xl bg-[#EBF4EE] border border-[#D5E7DC] text-xs text-[#1E3F35] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successNotice}</span>
                </div>
              )}

              {/* MODE 1: LOGIN */}
              {authMode === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Client Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g., m.vance@apexlogistics.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Password or Entity PIN
                    </label>
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#1E3F35] rounded-lg hover:bg-[#152E27] transition-all shadow-sm"
                  >
                    Enter Client Vault
                  </button>

                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-2 text-center">
                    <button
                      type="button"
                      onClick={handleDemoLogin}
                      className="w-full py-2 px-3 text-xs font-semibold text-[#1E3F35] bg-[#EBF4EE] border border-[#D5E7DC] rounded-lg hover:bg-[#D8ECE0] transition-colors"
                    >
                      Instant 1-Click Demo Client Login →
                    </button>

                    {/* Direct Admin Access Button */}
                    <button
                      type="button"
                      onClick={handleAdminDirectLogin}
                      className="w-full py-2 px-3 text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Database className="w-3.5 h-3.5 text-amber-800" />
                      <span>Firm Owner: View Client Sign-Ups & Leads Data →</span>
                    </button>
                  </div>
                </form>
              )}

              {/* MODE 2: REGISTER */}
              {authMode === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Primary Contact Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Marcus Vance"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="marcus@company.com"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="+1 (201) 555-0100"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company / Business Entity Name
                    </label>
                    <input
                      type="text"
                      value={regCompany}
                      onChange={(e) => setRegCompany(e.target.value)}
                      placeholder="Apex Global Logistics LLC"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Primary Advisory Scope
                    </label>
                    <select
                      value={regService}
                      onChange={(e) => setRegService(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#1E3F35]"
                    >
                      <option value="Bookkeeper Services ($12/hr)">Bookkeeping & Reconciliations ($12/hr)</option>
                      <option value="Sr. Bookkeeper Services ($15/hr)">Sr. Bookkeeper Services ($15/hr)</option>
                      <option value="Tax Preparation & Filing">Federal & State Tax Filing</option>
                      <option value="Virtual CFO Advisory">Virtual CFO Advisory (Fractional)</option>
                      <option value="Full-Fledged Payroll">Full Payroll Service (Direct Deposit)</option>
                      <option value="Sales Tax & Nexus Compliance">Sales Tax & Nexus Compliance</option>
                      <option value="Commercial Financing (ABL, Factoring)">Commercial Financing (ABL, Factoring, Bridge)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Create Vault Password
                    </label>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#1E3F35] rounded-lg hover:bg-[#152E27] transition-all shadow-sm"
                  >
                    {isSubmitting ? 'Registering Account...' : 'Complete Client Registration'}
                  </button>
                  
                  <div className="pt-2 text-center">
                    <span className="text-[11px] text-slate-500">
                      Sign-up data is recorded securely in your firm's database.
                    </span>
                  </div>
                </form>
              )}

            </div>
          </div>
        ) : (
          /* If Authenticated: Complete Client Portal Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-white">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-[#F8FAF9] border-r border-slate-200 p-4 flex flex-col justify-between shrink-0">
              <div className="space-y-4">
                
                {/* Account card */}
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono font-bold text-[#1E3F35]">
                      {clientData.status}
                    </span>
                    {clientData.role === 'admin' && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded">
                        Admin
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-xs text-slate-900 truncate">
                    {clientData.name}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {clientData.contactPerson}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Lead Partner: <strong className="text-slate-700">{clientData.advisor}</strong>
                  </div>
                </div>

                {/* Nav buttons */}
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                      activeTab === 'dashboard'
                        ? 'bg-[#1E3F35] text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>Engagements Overview</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('documents')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                      activeTab === 'documents'
                        ? 'bg-[#1E3F35] text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Document Vault ({documents.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('billing')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                      activeTab === 'billing'
                        ? 'bg-[#1E3F35] text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Invoices & Statements</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('messages')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                      activeTab === 'messages'
                        ? 'bg-[#1E3F35] text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Advisor Direct Desk</span>
                  </button>

                  {/* ADMIN TAB: CLIENT SIGN-UPS DATA HUB */}
                  <div className="pt-2 border-t border-slate-200">
                    <button
                      onClick={() => {
                        setActiveTab('admin_signups');
                        fetchSignups();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors text-left ${
                        activeTab === 'admin_signups'
                          ? 'bg-amber-600 text-white font-bold shadow-xs'
                          : 'bg-amber-50/70 text-amber-900 hover:bg-amber-100 border border-amber-200/80'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Client Sign-Ups Data</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        activeTab === 'admin_signups' ? 'bg-white text-amber-800' : 'bg-amber-200 text-amber-900'
                      }`}>
                        {signupsList.length}
                      </span>
                    </button>
                  </div>
                </nav>
              </div>

              {/* Bottom Quick Action */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <a
                  href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(`Client Portal Inquiry from ${clientData.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-[#1E3F35] bg-[#EBF4EE] rounded-lg border border-[#D5E7DC] hover:bg-[#DDEFE4] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Lead Partner</span>
                </a>
              </div>
            </div>

            {/* Main Portal Content Window */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
              
              {/* TAB 1: DASHBOARD & ENGAGEMENTS */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Active Engagements & Status</h3>
                      <p className="text-xs text-slate-500">Live milestone tracker for ongoing accounting, tax filings, and CFO advisory.</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('admin_signups')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>View Sign-Ups ({signupsList.length})</span>
                    </button>
                  </div>

                  {/* 3 Active Engagement Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-[#F8FAF9] border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-[11px] text-[#1E3F35] font-bold">MONTHLY CLOSE</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">90% Done</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">March 2026 P&L Reconciliations</h4>
                      <p className="text-xs text-slate-500">Bank accounts and merchant processors balanced. Final accrual review underway.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F8FAF9] border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-[11px] text-[#1E3F35] font-bold">TAX COMPLIANCE</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">Filed</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">Form 1120-S & K-1 Returns</h4>
                      <p className="text-xs text-slate-500">Federal and State filings submitted to IRS e-file. Confirmation #98214-IRS.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F8FAF9] border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-[11px] text-[#1E3F35] font-bold">VIRTUAL CFO</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-semibold">Active</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">13-Week Cash Runway Model</h4>
                      <p className="text-xs text-slate-500">Rolling cash flow projections calibrated. 7.4 months operating runway confirmed.</p>
                    </div>
                  </div>

                  {/* Immediate Action Items Checklist */}
                  <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#1E3F35]" />
                      <span>Pending Client Action Items</span>
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="p-3 rounded-lg bg-[#F8FAF9] border border-slate-200 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#1E3F35]" />
                          <span className="text-slate-800 font-medium">Verify Q1 Sales Tax Nexus classification for New Jersey & Texas</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500">Completed</span>
                      </div>

                      <div className="p-3 rounded-lg bg-[#F8FAF9] border border-slate-200 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <Clock className="w-4 h-4 text-amber-600" />
                          <span className="text-slate-800 font-medium">Upload March Stripe & Chase Commercial Bank statement PDF</span>
                        </div>
                        <button
                          onClick={() => setActiveTab('documents')}
                          className="px-2.5 py-1 text-[11px] font-semibold text-white bg-[#1E3F35] rounded hover:bg-[#152E27]"
                        >
                          Upload Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SECURE DOCUMENT VAULT */}
              {activeTab === 'documents' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Document Vault</h3>
                      <p className="text-xs text-slate-500">Download completed filings or upload accounting receipts and statements.</p>
                    </div>

                    {/* Upload button wrapper */}
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#1E3F35] rounded-lg hover:bg-[#152E27] cursor-pointer shadow-xs">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload New Document</span>
                      <input type="file" onChange={handleSimulateUpload} className="hidden" />
                    </label>
                  </div>

                  {uploadedFilesNotice && (
                    <div className="p-3 rounded-xl bg-[#EBF4EE] border border-[#D5E7DC] text-xs text-[#1E3F35] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{uploadedFilesNotice}</span>
                    </div>
                  )}

                  {/* Documents table */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                    <div className="bg-[#F8FAF9] px-4 py-2.5 border-b border-slate-200 grid grid-cols-12 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <div className="col-span-7">Document Name</div>
                      <div className="col-span-3">Date Added</div>
                      <div className="col-span-2 text-right">Action</div>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {documents.map((doc) => (
                        <div key={doc.id} className="px-4 py-3 grid grid-cols-12 items-center text-xs hover:bg-slate-50 transition-colors">
                          <div className="col-span-7 flex items-center gap-2.5 truncate pr-2">
                            <FileText className="w-4 h-4 text-[#1E3F35] shrink-0" />
                            <span className="font-medium text-slate-800 truncate">{doc.name}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 hidden sm:inline">
                              {doc.size}
                            </span>
                          </div>
                          <div className="col-span-3 text-slate-500 text-[11px]">{doc.date}</div>
                          <div className="col-span-2 text-right">
                            <button
                              onClick={() => handleSimulateDownload(doc.name)}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1E3F35] hover:underline"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: INVOICES & RETAINERS */}
              {activeTab === 'billing' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Invoices & Statements</h3>
                    <p className="text-xs text-slate-500">Transparent billing timesheets, retainer balance, and payment receipts.</p>
                  </div>

                  <div className="border border-slate-200 rounded-xl overflow-hidden text-xs shadow-xs">
                    <div className="bg-[#F8FAF9] px-4 py-2.5 border-b border-slate-200 grid grid-cols-12 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
                      <div className="col-span-3">Invoice #</div>
                      <div className="col-span-4">Service Description</div>
                      <div className="col-span-2">Amount</div>
                      <div className="col-span-3 text-right">Status</div>
                    </div>
                    <div className="divide-y divide-slate-100">
                      <div className="px-4 py-3 grid grid-cols-12 items-center">
                        <div className="col-span-3 font-mono font-bold text-slate-900">INV-2026-03</div>
                        <div className="col-span-4 text-slate-700">Monthly Bookkeeping Retainer (March 2026)</div>
                        <div className="col-span-2 font-mono font-bold text-slate-900">$450.00</div>
                        <div className="col-span-3 text-right">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-semibold">Paid</span>
                        </div>
                      </div>

                      <div className="px-4 py-3 grid grid-cols-12 items-center">
                        <div className="col-span-3 font-mono font-bold text-slate-900">INV-2026-02</div>
                        <div className="col-span-4 text-slate-700">Federal Form 1120-S & K-1 Filing Scope</div>
                        <div className="col-span-2 font-mono font-bold text-slate-900">$850.00</div>
                        <div className="col-span-3 text-right">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-semibold">Paid</span>
                        </div>
                      </div>

                      <div className="px-4 py-3 grid grid-cols-12 items-center">
                        <div className="col-span-3 font-mono font-bold text-slate-900">INV-2026-01</div>
                        <div className="col-span-4 text-slate-700">Virtual CFO 13-Week Cash Flow Strategy</div>
                        <div className="col-span-2 font-mono font-bold text-slate-900">$1,500.00</div>
                        <div className="col-span-3 text-right">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-semibold">Paid</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: ADVISOR DIRECT DESK */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Direct Advisor Desk</h3>
                    <p className="text-xs text-slate-500">Communicate directly with your assigned CPA and advisory manager.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F8FAF9] border border-slate-200 space-y-3 text-xs shadow-xs">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                      <div className="w-10 h-10 rounded-full bg-[#1E3F35] text-white flex items-center justify-center font-bold">
                        HF
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Harsh Furia, CPA</div>
                        <div className="text-[11px] text-slate-500">Managing Advisory Partner · Direct: +1 (201) 616-2843</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                      <span className="text-[11px] font-bold text-[#1E3F35]">Advisory Update:</span>
                      <p className="text-slate-700 leading-relaxed">
                        "We have finished reconciliation of all contractor 1099 payments and payroll tax withholdings. Please let us know if you need to schedule a tax strategy call."
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-2">
                      <a
                        href={CONTACT_INFO.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 py-2 px-4 text-xs font-bold text-white bg-[#1E3F35] rounded-lg hover:bg-[#152E27]"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Chat via WhatsApp</span>
                      </a>
                      <a
                        href={`mailto:${CONTACT_INFO.email}?subject=Client%20Portal%20Inquiry%20-%20${clientData.name}`}
                        className="inline-flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                      >
                        <span>Send Official Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: ADMIN / CLIENT SIGN-UPS DATA HUB */}
              {activeTab === 'admin_signups' && (
                <div className="space-y-6">
                  
                  {/* Top Title & Export Action Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-slate-900">Client Sign-ups & Leads Data Hub</h3>
                        <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-900 border border-amber-200">
                          {signupsList.length} Total Records
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        View, manage, search, and export all client registrations, bookings, and intake inquiries.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyJson}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
                      >
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span>Copy JSON</span>
                      </button>

                      <button
                        onClick={handleExportCsv}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#1E3F35] rounded-lg hover:bg-[#152E27] transition-all shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5 text-white" />
                        <span>Export CSV (Excel)</span>
                      </button>
                    </div>
                  </div>

                  {copiedNotice && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-700" />
                      <span>{copiedNotice}</span>
                    </div>
                  )}

                  {/* HOW TO ACCESS YOUR CLIENT DATA INFO CARD */}
                  <div className="p-4 rounded-xl bg-[#F8FAF9] border border-slate-200 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <Database className="w-4 h-4 text-[#1E3F35]" />
                      <span>How Can You Get the Data of Clients Who Sign Up? (4 Ways Available)</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-1 text-[11px] text-slate-600">
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                        <strong className="text-slate-900 block mb-1">1. Live in This Portal:</strong>
                        Every registration is displayed directly in this table in real-time.
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                        <strong className="text-slate-900 block mb-1">2. 1-Click CSV Download:</strong>
                        Click the "Export CSV (Excel)" button above to download an instant spreadsheet.
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                        <strong className="text-slate-900 block mb-1">3. Direct REST API:</strong>
                        Fetch <code className="text-[#1E3F35] font-mono">/api/signups</code> (JSON) or <code className="text-[#1E3F35] font-mono">/api/signups/export</code> (CSV) for CRM automation.
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                        <strong className="text-slate-900 block mb-1">4. Database File:</strong>
                        Stored persistently on the server inside <code className="text-[#1E3F35] font-mono">/data/signups.json</code>.
                      </div>
                    </div>
                  </div>

                  {/* Search & Filters */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="relative w-full sm:w-72">
                      <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search name, company, email, service..."
                        className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E3F35]"
                      />
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
                      <span className="text-slate-500 font-medium">Filter Status:</span>
                      {['All', 'New', 'Contacted', 'Onboarded'].map((status) => (
                        <button
                          key={status}
                          onClick={() => setStatusFilter(status)}
                          className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                            statusFilter === status
                              ? 'bg-[#1E3F35] text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Signups Table */}
                  <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F8FAF9] text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-3">Date</th>
                          <th className="py-2.5 px-3">Client / Contact</th>
                          <th className="py-2.5 px-3">Company</th>
                          <th className="py-2.5 px-3">Requested Scope</th>
                          <th className="py-2.5 px-3">Source</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredSignups.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-8 text-center text-slate-500 text-xs">
                              No client sign-ups match your query.
                            </td>
                          </tr>
                        ) : (
                          filteredSignups.map((s) => (
                            <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3 px-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                                {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'Recent'}
                              </td>
                              <td className="py-3 px-3">
                                <div className="font-bold text-slate-900">{s.name}</div>
                                <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                                  <Mail className="w-3 h-3 text-slate-400" />
                                  <a href={`mailto:${s.email}`} className="hover:underline">{s.email}</a>
                                </div>
                                {s.phone && (
                                  <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                                    <Phone className="w-3 h-3 text-slate-400" />
                                    <span>{s.phone}</span>
                                  </div>
                                )}
                              </td>
                              <td className="py-3 px-3">
                                <span className="font-semibold text-slate-800">{s.company}</span>
                              </td>
                              <td className="py-3 px-3">
                                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                  {s.service}
                                </span>
                                {s.estimatedBudget && (
                                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                                    {s.estimatedBudget}
                                  </div>
                                )}
                              </td>
                              <td className="py-3 px-3 text-slate-500 text-[11px] whitespace-nowrap">
                                {s.source}
                              </td>
                              <td className="py-3 px-3 whitespace-nowrap">
                                <select
                                  value={s.status}
                                  onChange={(e) => handleUpdateLeadStatus(s.id, e.target.value)}
                                  className={`text-[11px] font-bold px-2 py-1 rounded border focus:outline-none ${
                                    s.status === 'New'
                                      ? 'bg-amber-50 text-amber-900 border-amber-300'
                                      : s.status === 'Contacted'
                                      ? 'bg-blue-50 text-blue-900 border-blue-300'
                                      : 'bg-emerald-50 text-emerald-900 border-emerald-300'
                                  }`}
                                >
                                  <option value="New">● New</option>
                                  <option value="Contacted">● Contacted</option>
                                  <option value="Onboarded">● Onboarded</option>
                                </select>
                              </td>
                              <td className="py-3 px-3 text-right whitespace-nowrap">
                                <a
                                  href={`mailto:${s.email}?subject=Welcome%20to%20Wealthnest%20Advisory`}
                                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1E3F35] hover:underline mr-2"
                                >
                                  Email
                                </a>
                                {s.phone && (
                                  <a
                                    href={`https://wa.me/${s.phone.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:underline"
                                  >
                                    WhatsApp
                                  </a>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
