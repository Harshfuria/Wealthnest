import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Zap,
  Brain,
  Gauge,
  ExternalLink,
  ChevronDown,
  Building,
  Scale,
  DollarSign
} from 'lucide-react';
import { CONTACT_INFO } from '../data/servicesData';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

interface GeminiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: 'general' | 'cfo' | 'tax' | 'capital';
}

export const GeminiChatModal: React.FC<GeminiChatModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'general',
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content:
        'Welcome to **Wealthnest Advisory AI**. I can assist you with US accounting compliance, corporate & sales tax filings, fractional CFO modeling, AR debt recovery, and commercial financing (Asset-Based Lending, Invoice Factoring, and Hard Money).\n\nHow can I help optimize your financial operations today?',
      timestamp: 'Just now',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'general' | 'cfo' | 'tax' | 'capital'>(initialRole);
  const [modelChoice, setModelChoice] = useState<'general' | 'complex' | 'fast'>('general');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    setErrorMsg(null);
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          modelChoice,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to get advisory response from Gemini.');
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Network error communicating with advisory engine.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'model',
        content: `Reset complete. Operating in **${
          role === 'cfo' ? 'Fractional CFO' : role === 'tax' ? 'Tax Strategist' : role === 'capital' ? 'Commercial Financing & Capital' : 'General Advisory'
        }** mode using **${
          modelChoice === 'complex' ? 'gemini-3.1-pro-preview' : modelChoice === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-3.5-flash'
        }**. What would you like to evaluate?`,
        timestamp: 'Just now',
      },
    ]);
    setErrorMsg(null);
  };

  const samplePrompts = [
    {
      label: 'Compare Factoring vs ABL',
      query: 'What is the structural difference between Invoice Factoring and an Asset-Based Lending (ABL) facility for a $1M B2B ledger?',
    },
    {
      label: 'S-Corp 2026 Deadlines',
      query: 'What are the federal filing deadlines and extension rules for Form 1120-S and K-1 distributions for the 2026 tax year?',
    },
    {
      label: 'AR Collections Protocol',
      query: 'What diplomatic dunning sequence and settlement structure do you recommend for recovering 90+ day stale B2B invoices?',
    },
    {
      label: '13-Week Cash Flow Model',
      query: 'How does a Fractional CFO construct a 13-week rolling cash runway forecast for high-burn growth companies?',
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl h-[88vh] max-h-[850px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-[#F8FAF9] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF4EE] border border-[#D5E7DC] flex items-center justify-center text-[#1E3F35] shadow-xs">
              <Sparkles className="w-5 h-5 text-[#1E3F35]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Wealthnest Advisory AI Desk
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#EBF4EE] text-[#1E3F35] border border-[#D5E7DC]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E3F35] animate-pulse" />
                  Live Engine
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Multi-turn intelligence for Accounting, Tax, Virtual CFO, AR Collections & Commercial Debt
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetChat}
              title="Reset Conversation"
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors text-xs flex items-center gap-1"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden md:inline">Reset</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Configuration Bar: Role Persona & Model Choice */}
        <div className="px-4 py-2.5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Persona selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Advisor Role:</span>
            <div className="inline-flex rounded-lg bg-[#F8FAF9] p-0.5 border border-slate-200">
              {[
                { id: 'general', label: 'All Practice', icon: Building },
                { id: 'cfo', label: 'Virtual CFO', icon: Gauge },
                { id: 'tax', label: 'Tax & Nexus', icon: Scale },
                { id: 'capital', label: 'Financing & AR', icon: DollarSign },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setRole(tab.id as any)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-all ${
                      role === tab.id
                        ? 'bg-[#1E3F35] text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Model Choice selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Gemini Model:</span>
            <div className="inline-flex rounded-lg bg-[#F8FAF9] p-0.5 border border-slate-200">
              <button
                onClick={() => setModelChoice('fast')}
                title="gemini-3.1-flash-lite: optimized for ultra-fast instant answers"
                className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-all ${
                  modelChoice === 'fast'
                    ? 'bg-[#1E3F35] text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Zap className="w-3 h-3" />
                <span>Fast (3.1 Lite)</span>
              </button>
              <button
                onClick={() => setModelChoice('general')}
                title="gemini-3.5-flash: balanced performance for general advisory tasks"
                className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-all ${
                  modelChoice === 'general'
                    ? 'bg-[#1E3F35] text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Bot className="w-3 h-3" />
                <span>General (3.5 Flash)</span>
              </button>
              <button
                onClick={() => setModelChoice('complex')}
                title="gemini-3.1-pro-preview: deep reasoning for complex tax & financial modeling"
                className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-all ${
                  modelChoice === 'complex'
                    ? 'bg-[#1E3F35] text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Brain className="w-3 h-3" />
                <span>Complex (3.1 Pro)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#F8FAF9]">
          {messages.map((message) => {
            const isUser = message.role === 'user';
            return (
              <div
                key={message.id}
                className={`flex gap-3 max-w-[88%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isUser
                      ? 'bg-[#1E3F35] text-white'
                      : 'bg-white text-[#1E3F35] border border-slate-200 shadow-xs'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`flex flex-col space-y-1.5 ${
                    isUser ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? 'bg-[#1E3F35] text-white font-medium rounded-tr-none shadow-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-xs'
                    }`}
                  >
                    {message.content}
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-slate-400 px-1">
                    <span>{message.timestamp}</span>
                    {message.modelUsed && (
                      <span className="font-mono text-[#1E3F35] font-semibold">
                        · {message.modelUsed}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 max-w-[80%] mr-auto items-center">
              <div className="w-8 h-8 rounded-full bg-white text-[#1E3F35] border border-slate-200 flex items-center justify-center shrink-0 shadow-xs animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-slate-700 flex items-center gap-2 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#1E3F35] animate-ping" />
                <span>Advisor formulating rigorous analysis...</span>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center justify-between">
              <span>{errorMsg}</span>
              <button
                onClick={() => setErrorMsg(null)}
                className="text-red-600 hover:text-red-800 font-bold ml-2"
              >
                Dismiss
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompt Chips */}
        {messages.length <= 3 && (
          <div className="px-4 py-2 bg-white border-t border-slate-200 overflow-x-auto flex items-center gap-2 scrollbar-none">
            <span className="text-[11px] text-slate-500 whitespace-nowrap font-medium">
              Quick Inquiries:
            </span>
            {samplePrompts.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(item.query)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-[#F8FAF9] hover:bg-[#EBF4EE] text-slate-700 hover:text-[#1E3F35] border border-slate-200 hover:border-[#1E3F35]/40 transition-colors whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#F8FAF9] border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask ${
                role === 'cfo' ? 'CFO advisory' : role === 'tax' ? 'tax questions' : role === 'capital' ? 'about ABL, factoring, or collections' : 'our advisory practice'
              }...`}
              className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`p-2.5 sm:px-4 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                input.trim() && !isLoading
                  ? 'bg-[#1E3F35] text-white hover:bg-[#163028] shadow-sm'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>

          {/* Bottom direct escalate strip */}
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 px-1">
            <span>Confidential client advisory session.</span>
            <a
              href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent('Hi Wealthnest Advisory, I would like to schedule a formal partner consultation.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#1E3F35] hover:text-[#163028] font-medium transition-colors"
            >
              <span>Escalate to Partner on WhatsApp</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
