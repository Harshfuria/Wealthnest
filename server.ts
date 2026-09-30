import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';

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

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config: {
        systemInstruction: getSystemInstruction(role),
      },
    });

    res.json({
      text: response.text || 'I could not generate a response at this time.',
      modelUsed: selectedModel,
    });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    res.status(500).json({
      error: error?.message || 'An error occurred while contacting Gemini API.',
    });
  }
});

// 2. Google Maps Grounding Endpoint using gemini-3.5-flash with googleMaps tool
app.post('/api/maps-grounding', async (req, res) => {
  try {
    const { query, lat, lng } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required.' });
    }

    const config: any = {
      tools: [{ googleMaps: {} }],
    };

    // If user coordinates provided, pass in retrievalConfig
    if (lat !== undefined && lng !== undefined && !isNaN(Number(lat)) && !isNaN(Number(lng))) {
      config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: Number(lat),
            longitude: Number(lng),
          },
        },
      };
    }

    // Call gemini-3.5-flash with googleMaps tool
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: query,
      config,
    });

    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;
    const groundingChunks = groundingMetadata?.groundingChunks || [];
    const webSearchQueries = groundingMetadata?.webSearchQueries || [];

    res.json({
      text: response.text || '',
      groundingChunks,
      webSearchQueries,
    });
  } catch (error: any) {
    console.error('Maps grounding error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to retrieve Google Maps grounded information.',
    });
  }
});

// 3. Veo 3 Video Generation: Start (POST /api/generate-video)
app.post('/api/generate-video', async (req, res) => {
  try {
    const { prompt, aspectRatio } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required for video generation.' });
    }

    const targetAspectRatio = aspectRatio === '9:16' ? '9:16' : '16:9';

    // Model requirement: veo-3.1-fast-generate-preview
    const operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: targetAspectRatio,
      },
    });

    res.json({
      operationName: operation.name,
      aspectRatio: targetAspectRatio,
    });
  } catch (error: any) {
    console.error('Veo video generation error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to start video generation.',
    });
  }
});

// 4. Veo 3 Video Generation: Poll Status (POST /api/video-status)
app.post('/api/video-status', async (req, res) => {
  try {
    const { operationName } = req.body;

    if (!operationName) {
      return res.status(400).json({ error: 'operationName is required.' });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;

    const updated = await ai.operations.getVideosOperation({ operation: op });

    res.json({
      done: Boolean(updated.done),
      error: updated.error ? updated.error.message : null,
    });
  } catch (error: any) {
    console.error('Video status error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to check video status.',
    });
  }
});

// 5. Veo 3 Video Generation: Download / Stream (POST /api/video-download)
app.post('/api/video-download', async (req, res) => {
  try {
    const { operationName } = req.body;

    if (!operationName) {
      return res.status(400).json({ error: 'operationName is required.' });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;

    const updated = await ai.operations.getVideosOperation({ operation: op });
    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;

    if (!uri) {
      return res.status(404).json({ error: 'Generated video URI was not found.' });
    }

    const videoRes = await fetch(uri, {
      headers: {
        'x-goog-api-key': process.env.GEMINI_API_KEY || '',
      },
    });

    if (!videoRes.ok) {
      return res.status(videoRes.status).json({
        error: `Failed to download video stream from Google storage (${videoRes.statusText})`,
      });
    }

    const arrayBuffer = await videoRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Length', buffer.length.toString());
    res.setHeader('Content-Disposition', 'inline; filename="wealthnest-video.mp4"');
    res.send(buffer);
  } catch (error: any) {
    console.error('Video download error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to download generated video.',
    });
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
