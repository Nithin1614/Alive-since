import React from 'react';
import { formatNumber } from '../utils/timeCalculations';

export const LiveCounter = ({ stats }) => {
  if (!stats) return null;

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div id="seconds-counter" className="pt-8 pb-12 sm:pt-12 sm:pb-16 border-t border-[var(--border)] mt-12 transition-all duration-500 animate-fadeIn scroll-mt-24">
      {/* Label */}
      <p className="text-[var(--muted)] text-[11px] tracking-[0.3em] uppercase mb-6 font-medium">
        You have been alive for
      </p>

      {/* Main Giant Seconds Counter */}
      <div className="mb-12 sm:mb-16">
        <h2 className="font-display text-[var(--text)] font-normal text-6xl sm:text-8xl md:text-9xl leading-[1.05] tracking-tight">
          {formatNumber(stats.totalSeconds)}
        </h2>
        <p className="text-[var(--muted)] text-xs tracking-[0.3em] uppercase mt-4 font-medium">
          Seconds
        </p>
      </div>

      <div className="border-t border-[var(--border)] pt-8 space-y-8">
        {/* Years, Months, Days breakdown */}
        <div className="flex items-baseline flex-wrap gap-y-2 text-3xl sm:text-4xl font-display text-[var(--text)]">
          <div className="flex items-baseline">
            <span className="font-normal">{stats.years}</span>
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] text-[var(--muted)] ml-1.5 mr-3 font-normal">Years</span>
          </div>

          <span className="text-[var(--muted)] text-sm mx-1 font-sans">·</span>

          <div className="flex items-baseline">
            <span className="font-normal">{stats.months}</span>
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] text-[var(--muted)] ml-1.5 mr-3 font-normal">Months</span>
          </div>

          <span className="text-[var(--muted)] text-sm mx-1 font-sans">·</span>

          <div className="flex items-baseline">
            <span className="font-normal">{stats.days}</span>
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] text-[var(--muted)] ml-1.5 font-normal">Days</span>
          </div>
        </div>

        {/* Digital Clock format (Hours : Minutes : Seconds) */}
        <div>
          <div className="flex items-center gap-2 sm:gap-3 font-display text-4xl sm:text-5xl text-[var(--gold)]">
            <span>{pad(stats.hours)}</span>
            <span className="text-[var(--gold)]">:</span>
            <span>{pad(stats.minutes)}</span>
            <span className="text-[var(--gold)]">:</span>
            <span>{pad(stats.seconds)}</span>
          </div>
          <p className="text-[var(--muted)] text-[10px] sm:text-xs tracking-[0.3em] uppercase mt-2 font-medium">
            Hours · Minutes · Seconds
          </p>
        </div>
      </div>
    </div>
  );
};
