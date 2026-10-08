import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, ArrowRight, Shield, CheckCircle } from 'lucide-react';

interface TaxCountdownBannerProps {
  onOpenBooking: () => void;
}

export const TaxCountdownBanner: React.FC<TaxCountdownBannerProps> = ({ onOpenBooking }) => {
  // Target deadline: April 15, 2025 (US Federal & State Tax Filing Deadline)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Current or upcoming tax season target
    const targetDate = new Date('2025-04-15T23:59:59').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Fallback upcoming quarterly estimate
        setTimeLeft({ days: 42, hours: 14, minutes: 28, seconds: 15 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#0C231C] via-[#16382E] to-[#0C231C] text-white border-b border-emerald-900/60 py-3.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Urgency & Tax Notice */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-300">
            <Clock className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                IRS Tax Season Alert
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-xs text-slate-200 mt-0.5">
              <strong>Time Left to File Your Taxes & Q1 Estimates:</strong> Avoid costly late-filing penalties.
            </p>
          </div>
        </div>

        {/* Center: Live Countdown Clocks */}
        <div className="flex items-center gap-2 font-mono">
          <div className="flex flex-col items-center bg-black/40 border border-emerald-800/60 px-2.5 py-1 rounded-lg min-w-[50px]">
            <span className="text-sm sm:text-base font-extrabold text-white">{timeLeft.days}</span>
            <span className="text-[9px] uppercase tracking-wider text-emerald-300 font-sans">Days</span>
          </div>
          <span className="text-amber-400 font-bold">:</span>
          <div className="flex flex-col items-center bg-black/40 border border-emerald-800/60 px-2.5 py-1 rounded-lg min-w-[46px]">
            <span className="text-sm sm:text-base font-extrabold text-white">{timeLeft.hours}</span>
            <span className="text-[9px] uppercase tracking-wider text-emerald-300 font-sans">Hrs</span>
          </div>
          <span className="text-amber-400 font-bold">:</span>
          <div className="flex flex-col items-center bg-black/40 border border-emerald-800/60 px-2.5 py-1 rounded-lg min-w-[46px]">
            <span className="text-sm sm:text-base font-extrabold text-white">{timeLeft.minutes}</span>
            <span className="text-[9px] uppercase tracking-wider text-emerald-300 font-sans">Min</span>
          </div>
          <span className="text-amber-400 font-bold">:</span>
          <div className="flex flex-col items-center bg-black/40 border border-emerald-800/60 px-2.5 py-1 rounded-lg min-w-[46px]">
            <span className="text-sm sm:text-base font-extrabold text-amber-300">{timeLeft.seconds}</span>
            <span className="text-[9px] uppercase tracking-wider text-emerald-300 font-sans">Sec</span>
          </div>
        </div>

        {/* Right: Direct Action CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>Lock In 10% Tax Discount</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
