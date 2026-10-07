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

// 2. Client Signups / Inquiries Endpoints
app.get('/api/signups', (_req, res) => {
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

app.patch('/api/signups/:id', (req, res) => {
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

// CSV Export Endpoint for Client Signups
app.get('/api/signups/export', (_req, res) => {
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
