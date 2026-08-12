import React from 'react';
import { formatNumber } from '../utils/timeCalculations';

export const LifeInNumbers = ({ stats }) => {
  if (!stats) return null;

  const rows = [
    { label: 'Days lived', value: stats.totalDays, id: 'days-old-row' },
    { label: 'Hours lived', value: stats.totalHours, id: 'hours-old-row' },
    { label: 'Minutes lived', value: stats.totalMinutes, id: 'minutes-old-row' },
    { label: 'Seconds lived', value: stats.totalSeconds, id: 'seconds-old-row' },
    { label: 'Heartbeats', value: stats.heartbeats, id: 'heartbeats-row' },
    { label: 'Breaths drawn', value: stats.breaths, id: 'breaths-row' },
    { label: 'Nights slept', value: stats.nightsSlept, id: 'nights-slept-row' },
    { label: 'Hours slept', value: stats.hoursSlept, id: 'hours-slept-row' },
  ];

  return (
    <div id="life-in-numbers" className="mt-20 sm:mt-24 scroll-mt-24">
      <p className="text-[var(--muted)] text-xs tracking-[0.3em] uppercase mb-8 font-medium">
        Your life in numbers
      </p>

      <div className="divide-y divide-[var(--border)] border-t border-b border-[var(--border)]">
        {rows.map((row, idx) => (
          <div key={idx} id={row.id} className="py-3.5 flex items-center justify-between gap-4 transition-colors duration-300">
            <span className="text-xs sm:text-sm text-[var(--muted)] font-normal">
              {row.label}
            </span>
            <span className="font-display text-lg sm:text-xl font-normal text-[var(--text)] tracking-tight tabular-nums">
              {formatNumber(row.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
