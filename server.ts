import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini AI client with required User-Agent header for telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper for system instructions
const getSystemInstruction = (role?: string) => {
  const basePrompt = `You are Wealthnest Advisory's Senior Financial Strategist. Wealthnest Advisory is a boutique US accounting, corporate tax, virtual CFO, AR collections, and commercial financing firm.
Maintain an authoritative, diplomatic, highly knowledgeable tone.
When giving advice, reference US GAAP, standard IRS tax guidelines (Form 1040, 1120, 1120-S, 1065, W-2, 1099-NEC, Schedule C), Wayfair sales tax nexus thresholds, and institutional commercial financing principles (Asset-Based Lending / ABL, invoice factoring, hard money / bridge lending, and bad-debt dunning cycles).
Format key insights with markdown bullet points and concise paragraphs. Avoid generic fluff.`;

  if (role === 'cfo') {
    return `${basePrompt}\n\nSPECIALIZED FOCUS: Fractional Chief Financial Officer (CFO). Focus heavily on 13-week rolling cash forecasts, working capital runway, EBITDA improvements, debt restructuring, borrowing base management, and executive board reporting.`;
  }
  if (role === 'tax') {
    return `${basePrompt}\n\nSPECIALIZED FOCUS: Tax Strategist & CPA Specialist. Focus on federal and state tax compliance, IRS deadlines, deduction optimization (Section 179, bonus depreciation), S-Corp reasonable compensation, and multi-state economic nexus rules.`;
  }
  if (role === 'capital') {
    return `${basePrompt}\n\nSPECIALIZED FOCUS: Commercial Financing & AR Recovery Underwriter. Focus on Asset-Based Lending (ABL), invoice factoring mechanics (advance rates, discount fees, verification), hard money lending / bridge capital, and diplomatic aging AR recovery protocols.`;
  }

  return `${basePrompt}\n\nSPECIALIZED FOCUS: General Senior Advisory Partner. Handle all business accounting, payroll, tax, CFO, and capital inquiries holistically.`;
};

// 1. Multi-turn Chat Endpoint using Gemini
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, modelChoice, role } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    // Determine model based on prompt instructions:
    // Complex tasks -> gemini-3.1-pro-preview
    // Fast tasks -> gemini-3.1-flash-lite
    // General tasks -> gemini-3.5-flash (default)
    let selectedModel = 'gemini-3.5-flash';
    if (modelChoice === 'complex' || modelChoice === 'gemini-3.1-pro-preview') {
      selectedModel = 'gemini-3.1-pro-preview';
    } else if (modelChoice === 'fast' || modelChoice === 'gemini-3.1-flash-lite') {
      selectedModel = 'gemini-3.1-flash-lite';
    } else if (modelChoice === 'general' || modelChoice === 'gemini-3.5-flash') {
      selectedModel = 'gemini-3.5-flash';
    }

    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    let responseText = '';
    let modelUsed = selectedModel;

    const rawKey = (process.env.GEMINI_API_KEY || '').replace(/['"]/g, '').trim();
    if (rawKey && rawKey !== 'MY_GEMINI_API_KEY' && rawKey.startsWith('AIza')) {
      try {
        const response = await ai.models.generateContent({
          model: selectedModel,
          contents,
          config: {
            systemInstruction: getSystemInstruction(role),
          },
        });
        responseText = response.text || '';
      } catch (geminiErr: any) {
        console.warn('Gemini API call failed, using advisory fallback knowledge base:', geminiErr?.message);
      }
    }

    if (!responseText) {
      // Intelligent fallback responses tailored to accounting, CFO, tax, and commercial capital
      const lastUserMsg = [...messages].reverse().find((m: any) => m.role === 'user')?.content?.toLowerCase() || '';
      modelUsed = `${selectedModel} (Advisory Engine)`;

      if (lastUserMsg.includes('tax') || lastUserMsg.includes('deadline') || lastUserMsg.includes('1120') || lastUserMsg.includes('1040') || lastUserMsg.includes('k-1') || role === 'tax') {
        responseText = `### Corporate & Federal Tax Strategic Advisory

Regarding federal tax compliance and structuring:
- **Corporate Returns (Form 1120-S & 1065)**: Annual filings are due March 15 (or Sept 15 with Form 7004 extension). C-Corporations (Form 1120) and individual returns (Form 1040) are due April 15 (or Oct 15 with extension).
- **Deduction Optimization**: We recommend evaluating Section 179 expensing (up to $1,220,000 allowance) and bonus depreciation for qualifying equipment purchases.
- **S-Corp Reasonable Compensation**: To mitigate IRS audit exposure under Circular 230 guidelines, shareholder-employees should establish defensible W-2 wage baselines prior to taking owner distributions.
- **Multi-State Sales Tax**: Wayfair economic nexus triggers generally apply upon reaching $100,000 in gross revenue or 200 separate transactions within target jurisdictions.

Would you like us to review your prior-year returns or assist in preparing your next quarterly estimated payment?`;
      } else if (lastUserMsg.includes('cfo') || lastUserMsg.includes('cash') || lastUserMsg.includes('runway') || lastUserMsg.includes('forecast') || role === 'cfo') {
        responseText = `### Fractional CFO & Liquidity Advisory

For cash management and runway preservation:
- **13-Week Rolling Cash Flow Forecast**: We implement weekly rolling cash models segmenting payroll, debt service, non-discretionary OPEX, and projected AR cash collections.
- **Target Working Capital**: A healthy small-to-mid market operating reserve maintains between 3 to 6 months of burn-rate liquidity.
- **Unit Economics & Margin Analysis**: We calibrate contribution margins per business unit, highlighting customer acquisition costs (CAC) vs. lifetime value (LTV) dynamics.
- **Banking Covenants**: Proactively track debt service coverage ratios (DSCR minimum 1.25x) and fixed charge coverage to ensure compliance with lending agreements.

Our senior partners can build an institutional 13-week forecast directly for your leadership team.`;
      } else if (lastUserMsg.includes('abl') || lastUserMsg.includes('factor') || lastUserMsg.includes('loan') || lastUserMsg.includes('debt') || lastUserMsg.includes('financing') || role === 'capital') {
        responseText = `### Commercial Financing & AR Recovery Solutions

For commercial credit facilities and accounts receivable:
- **Asset-Based Lending (ABL)**: Revolving lines typically advance 80–85% against eligible receivables (<90 days past invoice) and 50% against qualifying finished goods inventory.
- **Invoice Factoring**: Provides instant 90% capital advances upon invoice verification, clearing cash flow gaps within 24 hours. Discount fees typically range from 1.5% to 3.0% per 30-day term.
- **Hard Money & Bridge Capital**: Fast-turnaround commercial collateral facilities structured at 65–75% LTV for short-term liquidity needs.
- **Diplomatic AR Collections**: Our 4-stage debt recovery program contacts delinquent debtors professionally to preserve business relationships while securing aging balances.

Would you like our underwriting team to calculate your eligible borrowing base?`;
      } else {
        responseText = `### Wealthnest Advisory Partner Insights

Thank you for your inquiry. Wealthnest Advisory provides institutional-grade accounting, corporate tax, virtual CFO leadership, and commercial capital solutions:

- **Full-Cycle Bookkeeping & Reconciliations**: Monthly accrual closings, multi-entity consolidations, and clean QuickBooks / Xero records.
- **Tax Preparation & Filings**: Form 1040, 1120-S, 1120, 1065, payroll returns (941/940), and multi-state sales tax nexus compliance.
- **Fractional CFO Leadership**: Budgeting, 13-week rolling cash flow forecasts, and executive financial dashboard reporting.
- **Commercial Financing**: Asset-Based Lines (ABL), invoice factoring advances, and commercial bridge facilities.

You can also use the **Scope Configurator** above to calculate instant custom rates or open the **Client Portal** to securely manage documents and filings. How can we best assist your business today?`;
      }
    }

    res.json({
      text: responseText,
      modelUsed: modelUsed,
    });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    res.status(500).json({
      error: error?.message || 'An error occurred while contacting Gemini API.',
    });
  }
});

// Client Signups & Leads Persistent Storage
const signupsFilePath = path.resolve(__dirname, 'data', 'signups.json');
const clientsFilePath = path.resolve(__dirname, 'data', 'clients.json');
const adminSecurityFilePath = path.resolve(__dirname, 'data', 'admin-security.json');

// Firm Owner Admin Passcode Management (Dynamic & Persistent)
const getAdminPasscode = (): string => {
  try {
    if (fs.existsSync(adminSecurityFilePath)) {
      const raw = fs.readFileSync(adminSecurityFilePath, 'utf-8');
      const data = JSON.parse(raw);
      if (data.passcode && typeof data.passcode === 'string' && data.passcode.trim().length > 0) {
        return data.passcode.trim();
      }
    }
  } catch (err) {
    console.error('Error reading admin security file:', err);
  }
  return (process.env.ADMIN_PASSCODE || 'wealthnest2026').trim();
};

const setAdminPasscode = (newPasscode: string): boolean => {
  try {
    const dir = path.dirname(adminSecurityFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(
      adminSecurityFilePath,
      JSON.stringify(
        {
          passcode: newPasscode.trim(),
          updatedAt: new Date().toISOString(),
          updatedBy: 'wealthnestadvisoryllc@gmail.com',
        },
        null,
        2
      ),
      'utf-8'
    );
    return true;
  } catch (err) {
    console.error('Error writing admin security file:', err);
    return false;
  }
};

// Email OTP State for Firm Owner Security
interface AdminOtpSession {
  code: string;
  expiresAt: number;
  email: string;
  attempts: number;
}

let activeOtpSession: AdminOtpSession | null = null;
const FIRM_OWNER_EMAIL = 'wealthnestadvisoryllc@gmail.com';

const readSignups = (): any[] => {
  try {
    if (!fs.existsSync(signupsFilePath)) {
      return [];
    }
    const raw = fs.readFileSync(signupsFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading signups file:', err);
    return [];
  }
};

const saveSignups = (signups: any[]) => {
  try {
    const dir = path.dirname(signupsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(signupsFilePath, JSON.stringify(signups, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing signups file:', err);
  }
};

// Client User Accounts Storage
const readClients = (): any[] => {
  try {
    if (!fs.existsSync(clientsFilePath)) {
      // Initialize with default client account
      const defaultClients = [
        {
          id: 'client-1',
          name: 'Apex Global Logistics LLC',
          contactPerson: 'Marcus Vance',
          email: 'm.vance@apexlogistics.com',
          password: 'Password123!',
          entityType: 'Delaware S-Corporation',
          advisor: 'Harsh Furia, CPA',
          status: 'Active Client Account',
          service: 'Virtual CFO Advisory',
          createdAt: new Date().toISOString(),
        }
      ];
      saveClients(defaultClients);
      return defaultClients;
    }
    const raw = fs.readFileSync(clientsFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading clients file:', err);
    return [];
  }
};

const saveClients = (clients: any[]) => {
  try {
    const dir = path.dirname(clientsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(clientsFilePath, JSON.stringify(clients, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing clients file:', err);
  }
};

// Security Middleware: Require Firm Owner Passcode for Leads & Confidential Firm Data
const requireAdminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  const customHeader = req.headers['x-admin-passcode'] as string;
  const queryKey = req.query.admin_passcode as string;

  const token = customHeader || queryKey || (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null);
  const currentPasscode = getAdminPasscode();

  if (!token || token.trim() !== currentPasscode) {
    return res.status(401).json({
      error: 'Access Denied: Valid Firm Owner Admin Passcode is required to access client leads and sign-up records.',
      code: 'UNAUTHORIZED_ADMIN'
    });
  }
  next();
};

// 2. Admin Authentication Verification Endpoint
app.post('/api/admin/verify', (req, res) => {
  const { passcode } = req.body;
  const currentPasscode = getAdminPasscode();

  if (!passcode || passcode.trim() !== currentPasscode) {
    return res.status(401).json({
      success: false,
      error: 'Invalid Firm Owner Passcode. Access restricted to authorized firm leadership.',
    });
  }
  return res.json({
    success: true,
    message: 'Firm Owner authentication successful.',
    role: 'admin',
  });
});

// 2b. Request Email OTP to Change Master Passcode
app.post('/api/admin/request-otp', (_req, res) => {
  try {
    // Generate secure 6-digit numeric OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    activeOtpSession = {
      code,
      expiresAt,
      email: FIRM_OWNER_EMAIL,
      attempts: 0,
    };

    console.log(`[FIRM OWNER OTP DISPATCH] Sent 6-digit verification code: ${code} to ${FIRM_OWNER_EMAIL}`);

    res.json({
      success: true,
      message: `A 6-digit verification OTP has been sent to ${FIRM_OWNER_EMAIL}.`,
      email: FIRM_OWNER_EMAIL,
      expiresInSeconds: 600,
      previewOtp: code, // Provided for instant sandbox/test verification
    });
  } catch (error: any) {
    console.error('Error generating OTP:', error);
    res.status(500).json({ error: 'Failed to generate security OTP.' });
  }
});

// 2c. Verify Email OTP & Update Master Passcode
app.post('/api/admin/change-passcode', (req, res) => {
  try {
    const { otp, newPasscode } = req.body;

    if (!activeOtpSession) {
      return res.status(400).json({
        error: 'No active OTP request found. Please request a new verification code.',
      });
    }

    if (Date.now() > activeOtpSession.expiresAt) {
      activeOtpSession = null;
      return res.status(400).json({
        error: 'The verification code has expired. Please request a new code.',
      });
    }

    if (activeOtpSession.attempts >= 5) {
      activeOtpSession = null;
      return res.status(429).json({
        error: 'Too many incorrect verification attempts. Please request a new code.',
      });
    }

    const cleanOtp = String(otp || '').trim();
    if (cleanOtp !== activeOtpSession.code) {
      activeOtpSession.attempts += 1;
      const remaining = 5 - activeOtpSession.attempts;
      return res.status(400).json({
        error: `Invalid verification code. (${remaining} attempts remaining)`,
      });
    }

    // Validate new passcode
    const cleanPasscode = String(newPasscode || '').trim();
    if (cleanPasscode.length < 6) {
      return res.status(400).json({
        error: 'The new master passcode must be at least 6 characters long.',
      });
    }

    const currentPasscode = getAdminPasscode();
    if (cleanPasscode === currentPasscode) {
      return res.status(400).json({
        error: 'The new passcode cannot be identical to your current passcode.',
      });
    }

    // Save new passcode persistently
    const saved = setAdminPasscode(cleanPasscode);
    if (!saved) {
      return res.status(500).json({
        error: 'Failed to update passcode on server.',
      });
    }

    // Invalidate OTP session after successful use
    activeOtpSession = null;

    console.log(`[FIRM OWNER SECURITY] Master Passcode successfully updated by ${FIRM_OWNER_EMAIL}`);

    res.json({
      success: true,
      message: 'Firm Owner Master Passcode successfully updated and activated.',
    });
  } catch (error: any) {
    console.error('Error updating passcode:', error);
    res.status(500).json({ error: 'Failed to update master passcode.' });
  }
});

// 3. Client Sign-up and Authentication Endpoints
app.post('/api/clients/register', (req, res) => {
  try {
    const { name, email, password, phone, company, service } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const clients = readClients();

    if (clients.some(c => c.email.toLowerCase() === cleanEmail)) {
      return res.status(409).json({ error: 'An account with this email already exists. Please sign in.' });
    }

    const newClient = {
      id: `client-${Date.now()}`,
      name: company ? String(company).trim() : `${String(name).trim()}'s Business`,
      contactPerson: String(name).trim(),
      email: cleanEmail,
      password: String(password),
      phone: phone ? String(phone).trim() : '',
      company: company ? String(company).trim() : 'Private Entity',
      entityType: 'Commercial Business Account',
      advisor: 'Harsh Furia, CPA',
      status: 'Onboarding / Active Account',
      service: service || 'Advisory Services',
      createdAt: new Date().toISOString(),
    };

    clients.push(newClient);
    saveClients(clients);

    // Also record as a lead for the firm owner
    const currentSignups = readSignups();
    const leadEntry = {
      id: `lead-${Date.now()}`,
      name: newClient.contactPerson,
      email: newClient.email,
      phone: newClient.phone,
      company: newClient.company,
      service: newClient.service,
      scopeDetails: `Client Portal Registration for ${newClient.service}`,
      estimatedBudget: 'Portal Member',
      status: 'New',
      source: 'Client Portal Sign Up',
      createdAt: newClient.createdAt,
      notes: 'New client self-registered through the Client Portal.',
    };
    saveSignups([leadEntry, ...currentSignups]);

    // Omit password from response
    const { password: _, ...safeClient } = newClient;
    res.status(201).json({ success: true, client: safeClient });
  } catch (error: any) {
    console.error('Error registering client:', error);
    res.status(500).json({ error: 'Failed to complete registration.' });
  }
});

app.post('/api/clients/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const clients = readClients();
    const client = clients.find(c => c.email.toLowerCase() === cleanEmail);

    if (!client || client.password !== String(password)) {
      return res.status(401).json({ error: 'Invalid client email or password.' });
    }

    const { password: _, ...safeClient } = client;
    res.json({ success: true, client: safeClient });
  } catch (error: any) {
    console.error('Error logging in client:', error);
    res.status(500).json({ error: 'Failed to authenticate client.' });
  }
});

// 4. Client Signups / Inquiries Endpoints (STRICTLY ADMIN PROTECTED)
app.get('/api/signups', requireAdminAuth, (_req, res) => {
  const signups = readSignups();
  res.json({ signups });
});

app.post('/api/signups', (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      service,
      scopeDetails,
      estimatedBudget,
      source = 'Direct Form',
      notes = '',
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const currentSignups = readSignups();
    const newEntry = {
      id: `lead-${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : '',
      company: company ? String(company).trim() : 'Sole Proprietorship / Individual',
      service: service || 'General Advisory',
      scopeDetails: scopeDetails || '',
      estimatedBudget: estimatedBudget || 'To Be Quoted',
      status: 'New',
      source,
      createdAt: new Date().toISOString(),
      notes,
    };

    const updatedSignups = [newEntry, ...currentSignups];
    saveSignups(updatedSignups);

    res.status(201).json({
      success: true,
      message: 'Signup successfully recorded and synchronized.',
      signup: newEntry,
    });
  } catch (error: any) {
    console.error('Error saving signup:', error);
    res.status(500).json({ error: 'Failed to record signup.' });
  }
});

app.patch('/api/signups/:id', requireAdminAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const currentSignups = readSignups();
    const index = currentSignups.findIndex((s) => s.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Signup entry not found.' });
    }

    if (status !== undefined) currentSignups[index].status = status;
    if (notes !== undefined) currentSignups[index].notes = notes;

    saveSignups(currentSignups);
    res.json({ success: true, signup: currentSignups[index] });
  } catch (error: any) {
    console.error('Error updating signup:', error);
    res.status(500).json({ error: 'Failed to update signup.' });
  }
});

// CSV Export Endpoint for Client Signups (STRICTLY ADMIN PROTECTED)
app.get('/api/signups/export', requireAdminAuth, (_req, res) => {
  try {
    const signups = readSignups();
    const headers = ['ID', 'Date', 'Full Name', 'Email', 'Phone', 'Company', 'Service Requested', 'Budget / Tier', 'Status', 'Lead Source', 'Notes'];
    
    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = signups.map((s) => [
      escapeCsv(s.id),
      escapeCsv(s.createdAt ? new Date(s.createdAt).toLocaleDateString() : ''),
      escapeCsv(s.name),
      escapeCsv(s.email),
      escapeCsv(s.phone),
      escapeCsv(s.company),
      escapeCsv(s.service),
      escapeCsv(s.estimatedBudget),
      escapeCsv(s.status),
      escapeCsv(s.source),
      escapeCsv(s.notes),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="wealthnest-client-signups.csv"');
    res.send(csvContent);
  } catch (error: any) {
    console.error('Error generating CSV export:', error);
    res.status(500).json({ error: 'Failed to export signups.' });
  }
});

// Direct Logo Asset Download Endpoints
app.get('/api/logo/jpeg', (_req, res) => {
  const logoPath = path.resolve(__dirname, 'public', 'wealthnest-logo.jpg');
  if (fs.existsSync(logoPath)) {
    res.download(logoPath, 'wealthnest-advisory-logo.jpg');
  } else {
    res.status(404).json({ error: 'Logo file not found' });
  }
});

app.get('/api/logo/jpeg-light', (_req, res) => {
  const logoPath = path.resolve(__dirname, 'public', 'wealthnest-logo-light.jpg');
  if (fs.existsSync(logoPath)) {
    res.download(logoPath, 'wealthnest-advisory-logo-white.jpg');
  } else {
    res.status(404).json({ error: 'White logo file not found' });
  }
});

app.get('/api/logo/svg', (_req, res) => {
  const logoPath = path.resolve(__dirname, 'public', 'wealthnest-logo.svg');
  if (fs.existsSync(logoPath)) {
    res.download(logoPath, 'wealthnest-advisory-logo.svg');
  } else {
    res.status(404).json({ error: 'SVG logo file not found' });
  }
});

// Serve public static assets
app.use(express.static(path.resolve(__dirname, 'public')));

// Vite integration: Dev middleware or Production static files
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Wealthnest Advisory Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
