import React from 'react';

interface WealthnestLogoProps {
  variant?: 'nav' | 'full' | 'icon' | 'footer' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  theme?: 'dark' | 'light';
  showSubtitle?: boolean;
}

export const WealthnestLogo: React.FC<WealthnestLogoProps> = ({
  variant = 'nav',
  size = 'md',
  className = '',
  theme = 'light',
  showSubtitle = true,
}) => {
  // Dimension mappings for the logo emblem image
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-20 h-20',
  };

  const imageSrc = '/wealthnest-logo-600.jpg';

  if (variant === 'icon') {
    return (
      <div
        className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl shadow-sm border border-emerald-950/20 bg-[#0C231C] ${sizeMap[size]} ${className}`}
      >
        <img
          src={imageSrc}
          alt="Wealthnest Advisory LLC Emblem"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  if (variant === 'nav') {
    return (
      <div className={`flex items-center gap-2.5 sm:gap-3 group ${className}`}>
        {/* Emblem */}
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden shadow-sm border border-emerald-900/30 bg-[#0C231C] shrink-0 group-hover:scale-105 transition-transform duration-200">
          <img
            src={imageSrc}
            alt="Wealthnest Advisory Logo"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Wordmark */}
        <div className="flex flex-col text-left">
          <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-[#1E3F35] transition-colors leading-tight font-serif">
            Wealthnest
          </span>
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] uppercase text-emerald-800/90 leading-none">
            Advisory LLC
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md border border-emerald-600/30 bg-[#0C231C] shrink-0">
          <img
            src={imageSrc}
            alt="Wealthnest Advisory Logo"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xl font-bold tracking-tight text-white leading-tight font-serif">
            Wealthnest Advisory
          </span>
          <span className="text-[10px] tracking-[0.18em] uppercase text-emerald-400 font-semibold leading-none mt-0.5">
            Accounting • Corporate Tax • Virtual CFO
          </span>
        </div>
      </div>
    );
  }

  // Full / Badge presentation
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-lg border border-amber-500/30 bg-[#0C231C] mb-3">
        <img
          src="/wealthnest-logo.jpg"
          alt="Wealthnest Advisory Master Logo"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-serif">
        Wealthnest Advisory
      </h3>
      {showSubtitle && (
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-800 mt-1">
          Safeguarding Assets • Structuring Growth
        </p>
      )}
    </div>
  );
};
