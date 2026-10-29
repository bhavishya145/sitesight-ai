import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  lightMode?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
  lightMode = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Geometric Logo: Building Silhouette + Viewfinder Aperture + Progress Bars */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Outer Viewfinder / Aperture Marks */}
          <path
            d="M 6 16 V 8 A 2 2 0 0 1 8 6 H 16"
            stroke="#FF8A32"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 32 6 H 40 A 2 2 0 0 1 42 8 V 16"
            stroke="#FF8A32"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 42 32 V 40 A 2 2 0 0 1 40 42 H 32"
            stroke="#FF8A32"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 16 42 H 8 A 2 2 0 0 1 6 40 V 32"
            stroke="#FF8A32"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Building Silhouette (Three Step Superstructure Blocks) */}
          {/* Left Tower */}
          <rect
            x="13"
            y="22"
            width="6"
            height="14"
            rx="1"
            fill={lightMode ? '#FFFFFF' : '#101A2C'}
            opacity="0.85"
          />
          {/* Central High-Rise Tower */}
          <rect
            x="21"
            y="14"
            width="7"
            height="22"
            rx="1"
            fill="#36C6B0"
          />
          {/* Right Tower */}
          <rect
            x="30"
            y="18"
            width="6"
            height="18"
            rx="1"
            fill={lightMode ? '#E2E8F0' : '#1E293B'}
          />

          {/* Precision Sensor Crosshair / Progress Line */}
          <circle cx="24.5" cy="18" r="1.5" fill="#FF8A32" />
          <line
            x1="10"
            y1="38"
            x2="38"
            y2="38"
            stroke="#FF8A32"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-extrabold tracking-tight ${textSizes[size]} ${
              lightMode ? 'text-white' : 'text-[#101A2C]'
            }`}
          >
            SiteSight
          </span>
          <span className="text-[#FF8A32] font-black text-sm tracking-widest px-1.5 py-0.5 rounded bg-[#FF8A32]/10 border border-[#FF8A32]/30">
            AI
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[11px] font-medium tracking-wide uppercase ${
              lightMode ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            See Progress · Prove Progress
          </span>
        )}
      </div>
    </div>
  );
};
