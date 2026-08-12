import React from 'react';
import { formatNumber } from '../utils/timeCalculations';

export const QuickStatsGrid = ({ stats }) => {
  if (!stats) return null;

  return (
    <div id="quick-stats" className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] my-12 overflow-hidden scroll-mt-24">
      {/* Box 1: Born On A */}
      <div id="born-on-day" className="bg-[var(--bg)] p-6 sm:p-8 flex flex-col justify-between">
        <p className="text-[var(--muted)] text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-4 font-medium">
          Born on a
        </p>
        <p className="font-display text-2xl sm:text-3xl font-normal text-[var(--text)]">
          {stats.dayOfWeek}
        </p>
      </div>

      {/* Box 2: Next Birthday */}
      <div id="birthday-countdown-card" className="bg-[var(--bg)] p-6 sm:p-8 flex flex-col justify-between">
        <p className="text-[var(--muted)] text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-4 font-medium">
          {stats.nextBirthdayTitle}
        </p>
        <p className="font-display text-2xl sm:text-3xl font-normal text-[var(--text)]">
          in {formatNumber(stats.daysToNextBirthday)} days
        </p>
      </div>

      {/* Box 3: Age in Weeks */}
      <div id="weeks-old-card" className="bg-[var(--bg)] p-6 sm:p-8 flex flex-col justify-between">
        <p className="text-[var(--muted)] text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-4 font-medium">
          Age in weeks
        </p>
        <p className="font-display text-2xl sm:text-3xl font-normal text-[var(--text)]">
          {formatNumber(stats.totalWeeks)}
        </p>
      </div>
    </div>
  );
};
