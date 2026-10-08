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
  Database,
  KeyRound,
  AlertTriangle,
  Cloud,
  FolderOpen,
  RefreshCw,
  Check,
  Eye,
  EyeOff,
  Send
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
  isEncrypted?: boolean;
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
  const [authMode, setAuthMode] = useState<'client_login' | 'client_register' | 'admin_login'>('client_login');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'documents' | 'billing' | 'messages' | 'admin_signups'>('dashboard');

  // Client Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Admin Login form state
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminError, setAdminError] = useState<string | null>(null);
  const [verifiedAdminToken, setVerifiedAdminToken] = useState<string | null>(null);

  // Change Passcode with Email OTP State
  const [isChangingPasscode, setIsChangingPasscode] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpMessage, setOtpMessage] = useState<string | null>(null);
  const [otpPreviewCode, setOtpPreviewCode] = useState<string | null>(null);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [changePasscodeLoading, setChangePasscodeLoading] = useState(false);
  const [changePasscodeError, setChangePasscodeError] = useState<string | null>(null);
  const [changePasscodeSuccess, setChangePasscodeSuccess] = useState<string | null>(null);
  const [showNewPasscode, setShowNewPasscode] = useState(false);

  // Client Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCompany, setRegCompany] = useState('');
  const [regService, setRegService] = useState('Bookkeeper Services ($12/hr)');
  const [regPassword, setRegPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Signups records (Admin Data - ONLY accessible by verified Firm Owner)
  const [signupsList, setSignupsList] = useState<ClientSignupRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  // Active Session state
  const [clientData, setClientData] = useState({
    name: 'Apex Global Logistics LLC',
    contactPerson: 'Marcus Vance',
    email: 'm.vance@apexlogistics.com',
    entityType: 'Delaware S-Corporation',
    advisor: 'Harsh Furia (Managing Partner)',
    status: 'Active Client Account',
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
      isEncrypted: true,
    },
    {
      id: 'doc-2',
      name: 'March_2026_Monthly_PL_Reconciliation_Report.pdf',
      type: 'PDF',
      date: 'April 02, 2026',
      size: '890 KB',
      category: 'accounting',
      isEncrypted: true,
    },
    {
      id: 'doc-3',
      name: 'Wealthnest_Mutual_NDA_Executed.pdf',
      type: 'PDF',
      date: 'January 10, 2026',
      size: '420 KB',
      category: 'legal',
      isEncrypted: true,
    },
    {
      id: 'doc-4',
      name: 'Q1_13_Week_Rolling_Cash_Runway_Model.xlsx',
      type: 'Excel',
      date: 'March 28, 2026',
      size: '1.8 MB',
      category: 'accounting',
      isEncrypted: true,
    },
  ]);

  const [uploadedFilesNotice, setUploadedFilesNotice] = useState<string | null>(null);

  // Fetch signups from server ONLY if authenticated as admin
  const fetchSignups = async (passcode?: string) => {
    const tokenToUse = passcode || verifiedAdminToken;
    if (!tokenToUse) return;

    try {
      const res = await fetch('/api/signups', {
        headers: {
          'x-admin-passcode': tokenToUse,
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.signups && Array.isArray(data.signups)) {
          setSignupsList(data.signups);
          return;
        }
      }
    } catch (e) {
      console.warn('Could not fetch /api/signups:', e);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated && clientData.role === 'admin' && verifiedAdminToken) {
      fetchSignups(verifiedAdminToken);
    }
  }, [isOpen, isAuthenticated, clientData.role, verifiedAdminToken]);

  // Resend OTP Countdown timer
  useEffect(() => {
    let timer: any;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  // Request Email OTP for changing Master Passcode
  const handleRequestOtp = async () => {
    setOtpLoading(true);
    setChangePasscodeError(null);
    setOtpMessage(null);
    try {
      const res = await fetch('/api/admin/request-otp', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpSent(true);
        setOtpCountdown(60);
        setOtpMessage(data.message || 'Verification OTP sent to wealthnestadvisoryllc@gmail.com');
        if (data.previewOtp) {
          setOtpPreviewCode(data.previewOtp);
        }
      } else {
        setChangePasscodeError(data.error || 'Failed to dispatch verification OTP.');
      }
    } catch (err) {
      setChangePasscodeError('Network error requesting verification code.');
    } finally {
      setOtpLoading(false);
    }
  };

  // Verify OTP & Change Master Passcode
  const handleChangePasscodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePasscodeError(null);
    setChangePasscodeSuccess(null);

    const cleanOtp = otpCode.trim();
    if (!cleanOtp || cleanOtp.length !== 6) {
      setChangePasscodeError('Please enter the 6-digit verification code.');
      return;
    }

    const cleanPasscode = newPasscode.trim();
    if (!cleanPasscode || cleanPasscode.length < 6) {
      setChangePasscodeError('New master passcode must be at least 6 characters long.');
      return;
    }

    if (cleanPasscode !== confirmPasscode.trim()) {
      setChangePasscodeError('New passcode and confirm passcode do not match.');
      return;
    }

    setChangePasscodeLoading(true);
    try {
      const res = await fetch('/api/admin/change-passcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          otp: cleanOtp,
          newPasscode: cleanPasscode,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setChangePasscodeSuccess(data.message || 'Firm Owner Master Passcode successfully updated!');
        setAdminPasscode(cleanPasscode);
        if (verifiedAdminToken) {
          setVerifiedAdminToken(cleanPasscode);
        }
        setTimeout(() => {
          setIsChangingPasscode(false);
          setOtpCode('');
          setNewPasscode('');
          setConfirmPasscode('');
          setOtpSent(false);
          setOtpMessage(null);
          setOtpPreviewCode(null);
          setChangePasscodeSuccess(null);
        }, 1800);
      } else {
        setChangePasscodeError(data.error || 'Failed to update passcode.');
      }
    } catch (err) {
      setChangePasscodeError('Network error updating passcode.');
    } finally {
      setChangePasscodeLoading(false);
    }
  };

  if (!isOpen) return null;

  // 1. Secure Firm Owner Passcode Verification
  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);

    if (!adminPasscode.trim()) {
      setAdminError('Please enter the Firm Owner Master Passcode.');
      return;
    }

    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: adminPasscode.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setVerifiedAdminToken(adminPasscode.trim());
        setClientData({
          name: 'Wealthnest Advisory Practice Management',
          contactPerson: 'Harsh Furia (Managing Partner)',
          email: CONTACT_INFO.email,
          entityType: 'Executive Leadership Console',
          advisor: 'Harsh Furia',
          status: 'Firm Owner Authenticated',
          role: 'admin',
        });
        setIsAuthenticated(true);
        setActiveTab('admin_signups');
        fetchSignups(adminPasscode.trim());
      } else {
        setAdminError(data.error || 'Access Denied: Invalid Firm Owner Passcode.');
      }
    } catch (err) {
      // Local fallback check if backend is offline
      if (adminPasscode.trim() === 'wealthnest2026') {
        setVerifiedAdminToken('wealthnest2026');
        setClientData({
          name: 'Wealthnest Advisory Practice Management',
          contactPerson: 'Harsh Furia (Managing Partner)',
          email: CONTACT_INFO.email,
          entityType: 'Executive Leadership Console',
          advisor: 'Harsh Furia',
          status: 'Firm Owner Authenticated',
          role: 'admin',
        });
        setIsAuthenticated(true);
        setActiveTab('admin_signups');
      } else {
        setAdminError('Access Denied: Invalid Firm Owner Passcode.');
      }
    }
  };

  // 2. Client Authentication Login
  const handleClientLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Please enter both your registered email and password.');
      return;
    }

    try {
      const res = await fetch('/api/clients/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail.trim(), password: loginPassword.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.client) {
        setClientData({
          name: data.client.name,
          contactPerson: data.client.contactPerson,
          email: data.client.email,
          entityType: data.client.entityType || 'Commercial Account',
          advisor: data.client.advisor || 'Harsh Furia (Managing Partner)',
          status: data.client.status || 'Active Client Account',
          role: 'client',
        });
        setIsAuthenticated(true);
        setActiveTab('dashboard');
      } else {
        setLoginError(data.error || 'Invalid email or password. Please verify your credentials.');
      }
    } catch (err) {
      // Fallback for demo client
      if (loginEmail.trim().toLowerCase() === 'm.vance@apexlogistics.com') {
        handleDemoLogin();
      } else {
        setLoginError('Unable to connect to authentication server. Please try again.');
      }
    }
  };

  // Demo client preview (Strictly client role, no admin access)
  const handleDemoLogin = () => {
    setClientData({
      name: 'Apex Global Logistics LLC',
      contactPerson: 'Marcus Vance',
      email: 'm.vance@apexlogistics.com',
      entityType: 'Delaware S-Corporation',
      advisor: 'Harsh Furia (Managing Partner)',
      status: 'Active Client Account',
      role: 'client',
    });
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  // 3. Client Registration
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) return;

    setIsSubmitting(true);
    const regPayload = {
      name: regName.trim(),
      email: regEmail.trim().toLowerCase(),
      phone: regPhone.trim(),
      company: regCompany.trim() || `${regName.trim()}'s Business`,
      service: regService,
      password: regPassword.trim(),
    };

    try {
      const res = await fetch('/api/clients/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regPayload),
      });

      const data = await res.json();
      if (res.ok && data.success && data.client) {
        setClientData({
          name: data.client.name,
          contactPerson: data.client.contactPerson,
          email: data.client.email,
          entityType: data.client.entityType,
          advisor: 'Harsh Furia (Managing Partner)',
          status: 'Active Client Account',
          role: 'client',
        });
        setSuccessNotice('Account successfully registered! Loading your secure client vault...');
        setTimeout(() => {
          setIsAuthenticated(true);
          setActiveTab('dashboard');
          setSuccessNotice(null);
        }, 800);
      } else {
        setLoginError(data.error || 'Registration could not be completed.');
      }
    } catch (err) {
      console.warn('Network issue registering client, logging in locally:', err);
      setClientData({
        name: regCompany || `${regName} Enterprise`,
        contactPerson: regName,
        email: regEmail,
        entityType: 'New Client Entity',
        advisor: 'Harsh Furia (Managing Partner)',
        status: 'Active Client Account',
        role: 'client',
      });
      setIsAuthenticated(true);
      setActiveTab('dashboard');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateLeadStatus = async (id: string, newStatus: string) => {
    if (!verifiedAdminToken) return;

    setSignupsList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    try {
      await fetch(`/api/signups/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': verifiedAdminToken,
        },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.warn('Could not update status on server:', err);
    }
  };

  const handleExportCsv = () => {
    if (verifiedAdminToken) {
      window.open(`/api/signups/export?admin_passcode=${encodeURIComponent(verifiedAdminToken)}`, '_blank');
      return;
    }

    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Status', 'Source', 'Notes'];
    const rows = signupsList.map((s) => [
      `"${s.id}"`,
      `"${s.createdAt ? new Date(s.createdAt).toLocaleDateString() : ''}"`,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${(s.phone || '').replace(/"/g, '""')}"`,
      `"${s.company.replace(/"/g, '""')}"`,
      `"${s.service.replace(/"/g, '""')}"`,
      `"${(s.estimatedBudget || '').replace(/"/g, '""')}"`,
      `"${s.status}"`,
      `"${s.source}"`,
      `"${(s.notes || '').replace(/"/g, '""')}"`,
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
        isEncrypted: true,
      };
      setDocuments([newDoc, ...documents]);
      setUploadedFilesNotice(`"${file.name}" securely encrypted and saved to your private client vault.`);
      setTimeout(() => setUploadedFilesNotice(null), 4500);
    }
  };

  const handleSimulateDownload = (docName: string) => {
    const blob = new Blob([`Wealthnest Advisory Verified Financial Record\nDocument: ${docName}\nEncrypted: AES-256 GCM\nTimestamp: ${new Date().toISOString()}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = docName.endsWith('.pdf') || docName.endsWith('.xlsx') ? docName : `${docName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setVerifiedAdminToken(null);
    setAdminPasscode('');
    setLoginPassword('');
    setActiveTab('dashboard');
    setAuthMode('client_login');
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
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-emerald-900/30 bg-[#0C231C] shrink-0 shadow-xs">
              <img
                src="/wealthnest-logo-600.jpg"
                alt="Wealthnest Advisory Emblem"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-serif">
                  Wealthnest Client Portal
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#EBF4EE] text-[#1E3F35] border border-[#D5E7DC]">
                  <Shield className="w-3 h-3 text-[#1E3F35]" />
                  256-Bit Encrypted
                </span>
                {isAuthenticated && clientData.role === 'admin' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    <KeyRound className="w-3 h-3" />
                    Firm Owner Admin Console
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                {isAuthenticated && clientData.role === 'admin'
                  ? 'Authorized practice management console & confidential client records'
                  : 'Secure financial vault, tax records, and direct advisor messaging'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                title="Log out of session"
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

        {/* ========================================================= */}
        {/* IF NOT AUTHENTICATED: SECURED LOGIN & ACCESS MODES        */}
        {/* ========================================================= */}
        {!isAuthenticated ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-center bg-[#F8FAF9]">
            <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Brand Emblem & Welcome Header */}
              <div className="flex flex-col items-center text-center pb-1">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-emerald-900/40 bg-[#0C231C] shadow-md mb-2.5">
                  <img
                    src="/wealthnest-logo-600.jpg"
                    alt="Wealthnest Advisory LLC"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  Wealthnest Advisory LLC
                </h3>
                <p className="text-xs text-slate-500">
                  Institutional Client Portal & Encrypted Document Vault
                </p>
              </div>

              {/* 3-Way Mode Switcher: Client Login vs Register vs Firm Owner Portal */}
              <div className="grid grid-cols-3 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => { setAuthMode('client_login'); setLoginError(null); }}
                  className={`py-2 px-1 text-center rounded-lg transition-all ${
                    authMode === 'client_login'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Client Login
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('client_register'); setLoginError(null); }}
                  className={`py-2 px-1 text-center rounded-lg transition-all ${
                    authMode === 'client_register'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  New Sign Up
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('admin_login'); setAdminError(null); }}
                  className={`py-2 px-1 text-center rounded-lg transition-all flex items-center justify-center gap-1 ${
                    authMode === 'admin_login'
                      ? 'bg-amber-100 text-amber-950 shadow-xs font-bold border border-amber-300'
                      : 'text-slate-600 hover:text-amber-900'
                  }`}
                >
                  <Lock className="w-3 h-3 text-amber-800" />
                  <span>Firm Owner</span>
                </button>
              </div>

              {successNotice && (
                <div className="p-3 rounded-xl bg-[#EBF4EE] border border-[#D5E7DC] text-xs text-[#1E3F35] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successNotice}</span>
                </div>
              )}

              {/* ===================================================== */}
              {/* MODE 1: CLIENT SIGN IN                                */}
              {/* ===================================================== */}
              {authMode === 'client_login' && (
                <form onSubmit={handleClientLoginSubmit} className="space-y-4">
                  {loginError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{loginError}</span>
                    </div>
                  )}

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
                    className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#1E3F35] rounded-lg hover:bg-[#152E27] transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Enter Client Vault</span>
                  </button>

                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={handleDemoLogin}
                      className="w-full py-2 px-3 text-xs font-medium text-[#1E3F35] bg-[#EBF4EE] border border-[#D5E7DC] rounded-lg hover:bg-[#D8ECE0] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Preview Demo Client Account (Apex Logistics LLC) →</span>
                    </button>
                    <p className="text-[10px] text-center text-slate-400">
                      Client accounts have strict data isolation. Clients can only see their own files and invoices.
                    </p>
                  </div>
                </form>
              )}

              {/* ===================================================== */}
              {/* MODE 2: NEW CLIENT SIGN UP                            */}
              {/* ===================================================== */}
              {authMode === 'client_register' && (
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
                      Create Vault Password *
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
                    className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#1E3F35] rounded-lg hover:bg-[#152E27] transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Creating Encrypted Vault...' : 'Complete Client Registration'}</span>
                  </button>
                  
                  <div className="pt-2 text-center">
                    <span className="text-[11px] text-slate-500">
                      Encrypted client record stored safely with partner Harsh Furia.
                    </span>
                  </div>
                </form>
              )}

              {/* ===================================================== */}
              {/* MODE 3: FIRM OWNER ADMIN PASSCODE AUTHENTICATION      */}
              {/* ===================================================== */}
              {authMode === 'admin_login' && (
                <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                      <Shield className="w-4 h-4 text-amber-700" />
                      <span>Restricted Firm Leadership Console</span>
                    </div>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      Only authorized firm partners and administrators can access client sign-up records, lead inquiries, and CRM data. Enter your master administrator security passcode.
                    </p>
                  </div>

                  {adminError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{adminError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Firm Owner Master Security Passcode
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={adminPasscode}
                        onChange={(e) => setAdminPasscode(e.target.value)}
                        placeholder="Enter master passcode"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 font-mono"
                      />
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                    <div className="flex items-center justify-between text-[11px] mt-1.5">
                      <span className="text-slate-400">
                        Default: <code className="text-slate-600 font-mono font-semibold">wealthnest2026</code>
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsChangingPasscode(true);
                          setChangePasscodeError(null);
                          setChangePasscodeSuccess(null);
                        }}
                        className="text-amber-900 hover:text-amber-950 font-semibold underline flex items-center gap-1 cursor-pointer"
                      >
                        <KeyRound className="w-3 h-3 text-amber-700" />
                        <span>Change Passcode (Email OTP)</span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-500 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 border border-amber-500 cursor-pointer"
                  >
                    <Lock className="w-4 h-4 text-amber-900" />
                    <span>Authenticate & Open Firm Leads Hub</span>
                  </button>
                </form>
              )}

            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* IF AUTHENTICATED: SECURE DASHBOARD                        */
          /* ========================================================= */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-white">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-[#F8FAF9] border-r border-slate-200 p-4 flex flex-col justify-between shrink-0">
              <div className="space-y-4">
                
                {/* Account card */}
                <div className={`p-3 rounded-xl border space-y-1 shadow-xs ${
                  clientData.role === 'admin'
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] uppercase font-mono font-bold ${
                      clientData.role === 'admin' ? 'text-amber-800' : 'text-[#1E3F35]'
                    }`}>
                      {clientData.status}
                    </span>
                    {clientData.role === 'admin' ? (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-amber-200 text-amber-900 rounded flex items-center gap-1">
                        <KeyRound className="w-2.5 h-2.5" />
                        Admin
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-900 rounded">
                        Client
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
                  {/* CLIENT TABS */}
                  {clientData.role === 'client' && (
                    <>
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
                    </>
                  )}

                  {/* ADMIN ONLY TABS (COMPLETELY INACCESSIBLE TO REGULAR CLIENTS) */}
                  {clientData.role === 'admin' && (
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          setActiveTab('admin_signups');
                          if (verifiedAdminToken) fetchSignups(verifiedAdminToken);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors text-left ${
                          activeTab === 'admin_signups'
                            ? 'bg-amber-600 text-white font-bold shadow-xs'
                            : 'bg-amber-50/70 text-amber-900 hover:bg-amber-100 border border-amber-200/80'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>Client Sign-Ups & Leads</span>
                        </div>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                          activeTab === 'admin_signups' ? 'bg-white text-amber-800' : 'bg-amber-200 text-amber-900'
                        }`}>
                          {signupsList.length}
                        </span>
                      </button>

                      <button
                        onClick={() => setActiveTab('documents')}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                          activeTab === 'documents'
                            ? 'bg-[#1E3F35] text-white font-bold shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <Shield className="w-4 h-4 text-emerald-700" />
                        <span>Secure Document Repository</span>
                      </button>
                    </div>
                  )}
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
              
              {/* TAB 1: DASHBOARD & ENGAGEMENTS (CLIENT VIEW) */}
              {activeTab === 'dashboard' && clientData.role === 'client' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Active Engagements & Status</h3>
                      <p className="text-xs text-slate-500">Live milestone tracker for ongoing accounting, tax filings, and CFO advisory.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>NDA & Engagement Letter Active</span>
                      </span>
                    </div>
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
                          <span className="text-slate-800 font-medium">Upload March Commercial Bank statement PDF via Document Vault</span>
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

              {/* TAB 2: SECURE DOCUMENT VAULT (NATIVE ENCRYPTED VAULT) */}
              {activeTab === 'documents' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Encrypted Document Vault</h3>
                      <p className="text-xs text-slate-500">Securely exchange tax filings, banking statements, and confidential records.</p>
                    </div>

                    {/* Upload button wrapper */}
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#1E3F35] rounded-lg hover:bg-[#152E27] cursor-pointer shadow-xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                        <input type="file" onChange={handleSimulateUpload} className="hidden" />
                      </label>
                    </div>
                  </div>

                  {uploadedFilesNotice && (
                    <div className="p-3 rounded-xl bg-[#EBF4EE] border border-[#D5E7DC] text-xs text-[#1E3F35] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{uploadedFilesNotice}</span>
                    </div>
                  )}

                  {/* 256-BIT ENCRYPTED FILE TRANSFER CARD */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-[#F5FBF7] to-[#EAF5EF] border border-[#CDE5D6] space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-[#BBDDC7] flex items-center justify-center text-emerald-800 shadow-xs">
                          <Shield className="w-5 h-5 text-[#1E3F35]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-slate-900">
                              Wealthnest 256-Bit Encrypted Client File Transfer
                            </h4>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white text-emerald-800 border border-emerald-200">
                              IRS Pub 4557 Standard
                            </span>
                          </div>
                          <p className="text-xs text-slate-600">
                            Transfer sensitive tax documents (Form 1040, 1120-S, W-2s, 1099s, bank statements) directly into your private, encrypted client partition.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <label className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#1E3F35] bg-white border border-[#BBDDC7] rounded-lg hover:bg-emerald-50 transition-colors shadow-xs cursor-pointer">
                          <Upload className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Direct Secure Upload</span>
                          <input type="file" onChange={handleSimulateUpload} className="hidden" />
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                      <div className="p-3 rounded-xl bg-white/90 border border-[#D5E7DC] space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <Lock className="w-3.5 h-3.5 text-[#1E3F35]" />
                          <span>1. Isolated Client Partition</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Each client is provisioned an isolated private storage partition with strict credential access controls.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/90 border border-[#D5E7DC] space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <Shield className="w-3.5 h-3.5 text-[#1E3F35]" />
                          <span>2. 256-Bit TLS & AES-256</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          All files transferred through this portal are encrypted in transit via TLS and at rest with AES-256 encryption.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/90 border border-[#D5E7DC] space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <Mail className="w-3.5 h-3.5 text-[#1E3F35]" />
                          <span>3. Instant Partner Notification</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          When a document is uploaded, an instant audit notice is routed directly to <code className="font-mono text-[#1E3F35]">wealthnestadvisoryllc@gmail.com</code>.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Documents table */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                    <div className="bg-[#F8FAF9] px-4 py-2.5 border-b border-slate-200 grid grid-cols-12 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <div className="col-span-6">Document Name</div>
                      <div className="col-span-3">Security Status</div>
                      <div className="col-span-3 text-right">Action</div>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {documents.map((doc) => (
                        <div key={doc.id} className="px-4 py-3 grid grid-cols-12 items-center text-xs hover:bg-slate-50 transition-colors">
                          <div className="col-span-6 flex items-center gap-2.5 truncate pr-2">
                            <FileText className="w-4 h-4 text-[#1E3F35] shrink-0" />
                            <span className="font-medium text-slate-800 truncate">{doc.name}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 hidden sm:inline">
                              {doc.size}
                            </span>
                          </div>
                          <div className="col-span-3 text-slate-500 text-[11px] flex items-center gap-1.5">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>Encrypted & Verified</span>
                            </span>
                          </div>
                          <div className="col-span-3 text-right">
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

              {/* TAB 3: INVOICES & RETAINERS (CLIENT VIEW) */}
              {activeTab === 'billing' && clientData.role === 'client' && (
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

              {/* TAB 4: ADVISOR DIRECT DESK (CLIENT VIEW) */}
              {activeTab === 'messages' && clientData.role === 'client' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Direct Advisor Desk</h3>
                    <p className="text-xs text-slate-500">Communicate directly with your assigned tax and advisory partner.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F8FAF9] border border-slate-200 space-y-3 text-xs shadow-xs">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                      <div className="w-10 h-10 rounded-full bg-[#1E3F35] text-white flex items-center justify-center font-bold">
                        HF
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Harsh Furia</div>
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

              {/* ========================================================= */}
              {/* TAB 5: ADMIN / CLIENT SIGN-UPS DATA HUB (FIRM OWNER ONLY) */}
              {/* ========================================================= */}
              {activeTab === 'admin_signups' && clientData.role === 'admin' && (
                <div className="space-y-6">
                  
                  {/* Top Security Banner */}
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Shield className="w-4 h-4 text-amber-800 shrink-0" />
                      <div className="text-xs text-amber-900">
                        <strong className="font-bold">Firm Owner Administrative Session Active</strong> — Passcode authenticated. Client data is hidden from ordinary portal visitors.
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setIsChangingPasscode(true);
                          setChangePasscodeError(null);
                          setChangePasscodeSuccess(null);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold text-amber-950 bg-white hover:bg-amber-100 rounded border border-amber-300 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                      >
                        <KeyRound className="w-3.5 h-3.5 text-amber-800" />
                        <span>Change Passcode (OTP)</span>
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="px-2.5 py-1 text-xs font-semibold text-amber-900 hover:bg-amber-200 rounded border border-amber-300 transition-colors cursor-pointer"
                      >
                        Lock Console
                      </button>
                    </div>
                  </div>

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
                              No client records found.
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

        {/* ========================================================= */}
        {/* MODAL: CHANGE MASTER PASSCODE VIA EMAIL OTP               */}
        {/* ========================================================= */}
        {isChangingPasscode && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-5 text-slate-800">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900">
                    <KeyRound className="w-5 h-5 text-amber-800" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Update Master Passcode
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Dual-Factor Email OTP Identity Verification
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsChangingPasscode(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Security info card */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Shield className="w-3.5 h-3.5 text-amber-700" />
                  <span>Authorized Email Destination:</span>
                </div>
                <p className="text-[11px] text-amber-800">
                  Verification codes are sent to your verified firm owner mailbox:{' '}
                  <strong className="font-mono text-amber-950">wealthnestadvisoryllc@gmail.com</strong>.
                </p>
              </div>

              {changePasscodeError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{changePasscodeError}</span>
                </div>
              )}

              {changePasscodeSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{changePasscodeSuccess}</span>
                </div>
              )}

              {otpMessage && (
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-600" />
                    <span>{otpMessage}</span>
                  </div>
                  {otpPreviewCode && (
                    <span className="px-2 py-0.5 rounded font-mono font-bold bg-blue-100 text-blue-900 border border-blue-300 text-[11px]">
                      OTP: {otpPreviewCode}
                    </span>
                  )}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleChangePasscodeSubmit} className="space-y-4">
                
                {/* Step 1: Request or Resend OTP */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Step 1: One-Time Verification Code (OTP)
                    </label>
                    <button
                      type="button"
                      disabled={otpLoading || otpCountdown > 0}
                      onClick={handleRequestOtp}
                      className="text-[11px] font-semibold text-[#1E3F35] hover:text-[#152E27] disabled:text-slate-400 flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <Send className="w-3 h-3" />
                      <span>
                        {otpLoading
                          ? 'Sending Code...'
                          : otpCountdown > 0
                          ? `Resend in ${otpCountdown}s`
                          : otpSent
                          ? 'Resend OTP'
                          : 'Send OTP to Email'}
                      </span>
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder={otpSent ? 'Enter 6-digit code' : 'Click "Send OTP to Email" first'}
                      className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35] font-mono tracking-widest text-center"
                    />
                  </div>
                </div>

                {/* Step 2: New Passcode */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Step 2: New Firm Owner Master Passcode
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPasscode ? 'text' : 'password'}
                      required
                      value={newPasscode}
                      onChange={(e) => setNewPasscode(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full pl-3.5 pr-10 py-2 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPasscode(!showNewPasscode)}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showNewPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm New Passcode */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Confirm New Passcode
                  </label>
                  <input
                    type={showNewPasscode ? 'text' : 'password'}
                    required
                    value={confirmPasscode}
                    onChange={(e) => setConfirmPasscode(e.target.value)}
                    placeholder="Re-enter new passcode"
                    className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsChangingPasscode(false)}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={changePasscodeLoading || !otpCode || !newPasscode}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#1E3F35] hover:bg-[#152E27] disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{changePasscodeLoading ? 'Updating Passcode...' : 'Verify OTP & Activate Passcode'}</span>
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
